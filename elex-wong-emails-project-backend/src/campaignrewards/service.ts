import BigNumber from "bignumber.js";
import moment from "moment";
import Queue from "promise-queue";
import { campaignsService } from "../campaigns/service";
import { DataOrError, dataOrErrorData, serverError } from "../common/dataorerror";
import { prisma } from "../db/index";
import { erc20TokensService } from "../erc20tokens/service";
import { Account, Campaign, ERC20Token, ERC20TokenAirdropEvent, ERC20TokenCampaignClaim } from "../generated/prisma/main-schema/index";
import { logger } from "../logger";
import { networksService } from "../networks/service";
import { erc20Service } from "../services/erc20.service";

const CHECKED_ERC20_CLAIMS_INTERVAL_SEC = 10; // TMP DEV 60;
const MAX_ERC20_TRANSFER_PER_TRANSACTION = 60; // Max 60 different addresses

type ERC20AccountClaim = {
  account: Account,
  claims: ERC20TokenCampaignClaim[]
};

type ERC20AccountClaims = { // Claims grouped by account
  [accountId: number]: ERC20AccountClaim;
}

type ERC20CampaignWithAccountClaims = {
  campaign: Campaign & { token: ERC20Token },
  accountClaims: ERC20AccountClaims
};

type ERC20AirdropTransferInfo = {
  walletAddress: string;
  tokensAmount: BigNumber;
};

/**
 * type for "transfers" JSON entry in ERC20TokenAirdropEvent prisma items.
 */
type ERC20TokenAirdropEventTransfer = {
  address: string; // Wallet address
  tokensAmount: string; // Chain amount, using token decimals
}

class CampaignRewardsService {
  private erc20AirdropGrabQueue = new Queue(1);

  /**
   * Starts the campaign reward service that periodically checks if some rewards are
   * to be distributed, such as ERC20 airdrops.
   */
  public start() {
    // When starting the server, wait a few seconds for other things to be ready then run a check
    setTimeout(() => {
      this.checkERC20Claims();
    }, 5000);
  }

  private reamERC20ClaimsCheck() {
    setTimeout(() => {
      this.checkERC20Claims();
    }, CHECKED_ERC20_CLAIMS_INTERVAL_SEC * 1000);
  }

  /**
   * Checks campaigns that have ERC20 claim requests made by users.
   * When there are claims, there are 2 reasons why we can generate a airdrop transaction on chain:
   * - either more than N user addresses are involved for the same campaign / airdrop contract (when a campaign has a lot of activity).
   * - or the max time to wait between 2 airdrops for a campaign has elapsed (to not let users wait too long even if there are not many users).
   */
  private async checkERC20Claims() {
    logger.info("Checking ERC20 claims");

    // Find all claims that are not packed in an airdrop yet
    let pendingClaims = await prisma.eRC20TokenCampaignClaim.findMany({
      where: {
        packed_in_airdrop: null,
      },
      include: {
        campaign: {
          include: {
            token: true
          }
        },
        account: true,
      }
    });

    // Group claims by campaign
    let campaignsWithClaims: {
      // Claims grouped by campaign
      [campaignId: number]: ERC20CampaignWithAccountClaims
    } = {};

    logger.info("ERC20 claims check: pending claims count: " + pendingClaims.length);

    pendingClaims.forEach(claim => {
      // Create campaign entry if not existing
      if (!(claim.campaignId in campaignsWithClaims)) {
        campaignsWithClaims[claim.campaignId] = {
          campaign: claim.campaign,
          accountClaims: []
        };
      }

      const campaignEntry = campaignsWithClaims[claim.campaignId];

      // Create account entry if not existing
      if (!(claim.accountId in campaignEntry.accountClaims)) {
        campaignEntry.accountClaims[claim.accountId] = {
          account: claim.account,
          claims: []
        }
      }

      const accountEntry = campaignEntry.accountClaims[claim.accountId];

      accountEntry.claims.push(claim);
    });

    logger.info("ERC20 claims check: campaigns with claims count: " + Object.keys(campaignsWithClaims).length);

    // For each campaign, check if there are at least N unique addresses, or if the max delay for an airdrop is elapsed
    for (let campaignEntry of Object.values(campaignsWithClaims)) {
      let shouldCreateAirdrop = false;

      // Many destination addresses are awaiting tokens? Send an airdrop
      if (Object.keys(campaignEntry.accountClaims).length >= MAX_ERC20_TRANSFER_PER_TRANSACTION) {
        shouldCreateAirdrop = true;
      }
      else {
        // Get the most recent airdrop event with field "packed_at" set for this campaign
        // (meaning that the airdrop creation has succeeded, as it contains a list of token transfers)
        const mostRecentAirdrop = await prisma.eRC20TokenAirdropEvent.findFirst({
          where: {
            campaignId: campaignEntry.campaign.id,
            packed_at: { not: undefined }
          },
          orderBy: {
            created_at: "desc"
          }
        });

        // Max time elapsed? Send an airdrop if at least one receiver
        if (!mostRecentAirdrop || moment(mostRecentAirdrop.created_at).add(campaignEntry.campaign.erc20_airdrop_time_trigger, "minutes").isBefore(moment())) {
          await this.createERC20AirdropEventForCampaignEntry(campaignEntry);
        }
        else {
          logger.info(`ERC20 claims check: campaign ${campaignEntry.campaign.id} airdrop event too recently created, skipping.`);
        }
      }
    }

    this.reamERC20ClaimsCheck();
  }

  /**
   * Creates a new airdrop event database entry for a given campaign with claims context.
   */
  private async createERC20AirdropEventForCampaignEntry(campaignEntry: ERC20CampaignWithAccountClaims): Promise<DataOrError<void>> {
    logger.info("Creating ERC20 airdrop event for campaign: " + campaignEntry.campaign.id);

    try {
      // Compute the list of unique addresses to send tokens to (max MAX_ERC20_TRANSFER_PER_TRANSACTION)
      // with amount of tokens and claim ids involved
      let transfers: ERC20AirdropTransferInfo[] = [];
      let involvedClaimIds: number[] = []; // Claims packed in the upcoming airdrop event

      const accountClaims = Object.values(campaignEntry.accountClaims);
      const campaignToken = campaignEntry.campaign.token;

      for (let accountClaim of accountClaims) {
        let transfer: ERC20AirdropTransferInfo = {
          walletAddress: accountClaim.account.address,
          tokensAmount: new BigNumber(0),
        };

        // Sum up tokens (in case several claims were done by the same user).
        // Also save claim ids involved to be able to mark them as packed later
        accountClaim.claims.forEach(c => {
          let claimedChainAmount = erc20TokensService.toChainAmount(new BigNumber(c.tokens_claimed), campaignToken.decimals);

          transfer.tokensAmount = transfer.tokensAmount.plus(claimedChainAmount);
          transfers.push(transfer);

          involvedClaimIds.push(c.id);
        });
      }

      // IMPORTANT: Atomic operation requirement: Make sure the airdrop event is created AND the claims marked has packed atomically
      // As we cannot create an entry and use the created id in the same $transaction operation, we first create an empty airdrop to get its ID.
      // It's ok is we get "lost airdrops" without any useful info inside.
      const airdropEvent = await prisma.eRC20TokenAirdropEvent.create({
        data: {
          transfers: [],
          campaign: { connect: { id: campaignEntry.campaign.id } },
          token: { connect: { id: campaignEntry.campaign.eRC20TokenTid } }
        }
      });

      let airdropEventTransferEntry = transfers.map(t => {
        return {
          address: t.walletAddress,
          tokensAmount: t.tokensAmount.toString(10)
        }
      });

      console.log("airdropEventTransferEntry", airdropEventTransferEntry)

      // Update the airdrop event and the packed claims during the same transaction
      await prisma.$transaction([
        // Save TODO
        prisma.eRC20TokenAirdropEvent.update({
          where: { id: airdropEvent.id },
          data: {
            packed_at: moment().toDate(),
            transfers: airdropEventTransferEntry
          }
        }),
        prisma.eRC20TokenCampaignClaim.updateMany({
          where: {
            id: { in: involvedClaimIds }
          },
          data: {
            eRC20TokenAirdropEventId: airdropEvent.id
          }
        })
      ]);

      // IN prisma $transaction (auto rollback if any error) - Create an airdrop event, mark claimed as packed

      // TEST PHASE: IN PROD, PACK AIRDROPS, MONITOR ON ADMIN PAGE, but do NOT send actual tokens for now.

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Failed to create ERC20 airdrop event", e);
    }
  }

  public async getUnhandledERC20AirdropEvents(): Promise<DataOrError<ERC20TokenAirdropEvent[]>> {
    try {
      let airdrops = await prisma.eRC20TokenAirdropEvent.findMany({
        where: {
          handled_at: null
        }
      });

      return dataOrErrorData(airdrops);
    }
    catch (e) {
      return serverError("getUnhandledERC20AirdropEvents() error", e);
    }
  }

  public grabNextUnhandledERC20Airdrop(): Promise<DataOrError<ERC20TokenAirdropEvent & { campaign: Campaign & { token: ERC20Token } }>> {
    // Use a queue to make sure 2 admins don't grab the same airdrop and publish it twice
    return this.erc20AirdropGrabQueue.add(async () => {
      try {
        let airdrop = await prisma.eRC20TokenAirdropEvent.findFirst({
          where: {
            handled_at: null,
            campaign: {
              is_paused_by_system: false // Try to airdrop only campaigns that are not paused (manually, or because no more tokens in the contract)
            }
            // TODO: Use a handle expiration date, to make sure that if a client side looses a "handled" airdrop, it can be retried some day.
          },
          include: {
            campaign: {
              include: {
                token: true
              }
            }
          }
        });

        if (!airdrop)
          return dataOrErrorData(null);

        // Ensure token balance in the contract is enough to handle the tokens to be airdropped
        // If not enough, campaign get paused and will need manual resume by project owner
        const network = networksService.findNetworkByEVMChainId(airdrop.campaign.token.chain_id);
        const tokensChainAmountInAirdropContract = await erc20Service.fetchERC20TokenBalance(network, airdrop.campaign.token.contract_address, airdrop.campaign.erc20_airdrop_contract_address);
        const requiredChainTokensForAirdrop = this.numberOfChainTokenAmountInAirdrop(airdrop);

        if (requiredChainTokensForAirdrop.gt(tokensChainAmountInAirdropContract)) {
          logger.info(`Not enough tokens in campaign ${airdrop.campaign.id} to do the airdrop. Pausing the campaign`);

          // No more tokens in the airdrop contract, Pause the campaign.
          await campaignsService.pauseCampaign(airdrop.campaign, true);
          return dataOrErrorData(null); // Return nothing, admin client side will try again just after.
        }

        // Mark the airdrop as handled
        await prisma.eRC20TokenAirdropEvent.update({
          where: {
            id: airdrop.id
          },
          data: {
            handled_at: moment().toDate()
          }
        });

        return dataOrErrorData(airdrop);
      }
      catch (e) {
        return serverError("grabNextUnhandledERC20Airdrop() error", e);
      }
    });
  }

  /**
   * Returns the number of tokens required for all the transfers expected in an airdrop.
   */
  private numberOfChainTokenAmountInAirdrop(airdrop: ERC20TokenAirdropEvent): BigNumber {
    let totalTokens = new BigNumber(0);

    let transfers = airdrop.transfers as ERC20TokenAirdropEventTransfer[];
    for (let transfer of transfers) {
      totalTokens = totalTokens.plus(transfer.tokensAmount);
    }

    return totalTokens;
  }
}

export const campaignRewardsService = new CampaignRewardsService();