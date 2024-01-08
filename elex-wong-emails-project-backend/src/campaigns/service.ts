import { readFileSync } from "fs";
import moment from "moment";
import Queue from "promise-queue";
import { accessForbiddenError, convertedError, DataOrError, dataOrErrorData, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError, stateError, successfulData } from "../common/dataorerror";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { prisma } from "../db";
import { emailPlannerService } from "../emailplanner/service";
import { erc20TokensService } from "../erc20tokens/service";
import { filesService } from "../files/service";
import { environment } from "../generated/environment";
import { Account, Campaign, ERC20Token, JoinedCampaign } from "../generated/prisma/main-schema";
import { projectsService } from "../projects/service";
import { refCodesServices } from "../refcodes/service";
import { AccountWithStats, CampaignReport } from "./model/campaignreport";
import { CampaignStats } from "./model/campaignstats";
import { CampaignWithProject, CampaignWithToken, PopulatedCampaign } from "./model/campaignsubtypes";
import { PublicCampaignInfo } from "./model/publiccampaigninfo";
import { JoinedCampaignRewardsStatus } from "./model/rewardsstatus";
class CampaignsService {
  private campaignWelcomeTemplateHtml: string = null;
  private joinCampaignQueue = new Queue(1); // Max concurrent: one - make sure no quick api call doubles the join requests at the same time
  private claimTokensQueue = new Queue(1); // Max concurrent: one - make sure no quick api call doubles the claim requests

  constructor() {
    this.campaignWelcomeTemplateHtml = readFileSync("./assets/email-templates/campaign-welcome.html").toString("utf-8");
  }

  public getPublicCampaignInfo(campaign: PopulatedCampaign): PublicCampaignInfo {
    return {
      id: campaign.id,
      name: campaign.name,
      presentation: campaign.presentation,
      referral_code: campaign.referral_code,
      token: campaign.token,
      banner: campaign.banner,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      logo: campaign.project.logo,
      promo_link: campaign.promo_link,
      rules: campaign.rules,
      pid: campaign.project.id,
      medium: campaign.medium,
      distribution: campaign.distribution,
      reward_type: campaign.reward_type
    }
  }

  public async getProjectCampaigns(account: Account, projectId: number): Promise<DataOrError<Campaign[]>> {
    try {
      let campaigns = await prisma.campaign.findMany({
        where: {
          project: {
            id: projectId,
            accountUid: account.id // Make sure the user owns the project
          },
          is_archived: false // Only show unarchived campaigns
        },
        include: {
          token: true,
          banner: true
        }
      });

      return dataOrErrorData(campaigns);
    }
    catch (e) {
      return serverError("getProjectCampaigns() prisma query error", e);
    }
  }

  /**
   * Returns a campaign entry after making sure it belongs to the given user and given project id
   */
  public async ensureOwnedCampaign(account: Account, projectId: number, campaignId: number): Promise<DataOrError<CampaignWithProject & CampaignWithToken>> {
    try {
      let campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          project: {
            id: projectId,
            accountUid: account.id
          }
        },
        include: {
          project: true,
          token: true
        }
      });

      if (!campaign)
        return accessForbiddenError(`Campaign with ID ${campaignId} not found or does not belong to the requested account/project`);

      return dataOrErrorData(campaign);
    }
    catch (e) {
      return serverError("ensureOwnedCampaign() prisma query error", e);
    }
  }

  public async createCampaign(account: Account, projectId: number, name: string, rewardType: string, distribution: string, medium: string): Promise<DataOrError<Campaign>> {
    if (!account.forwarding_email_verified)
      return displayableError(ErrorType.STATE_ERROR, ErrorCode.VERIFY_ACCOUNT, "Cannot create the campaign because the account has not been verified");

    // Make sure the project belongs to the signed in user
    let accountProjectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(accountProjectOrError))
      return convertedError(accountProjectOrError);

    if (!accountProjectOrError.data)
      return invalidParamError("Project not found, or doesn't belong to this user");

    let codeOrError = await refCodesServices.generateUniqueRefCode("campaign");
    if (hasError(codeOrError))
      return convertedError(codeOrError);

    let campaign = await prisma.campaign.create({
      data: {
        name,
        reward_type: rewardType,
        distribution,
        medium,
        type: "external",
        project: { connect: { id: projectId } },
        referral_code: codeOrError.data,
        token_amount: 10,
        initial_amount: 1000, // TMP
        l1_token_amount: 500, // TMP
        l2_token_amount: 200, // TMP
        l3_token_amount: 100, // TMP
        start_date: Math.floor(new Date().getTime() / 1000),
        end_date: Math.floor(new Date().setMonth(new Date().getMonth() + 1) / 1000) // 1 month later
      }
    });

    return dataOrErrorData(campaign);
  }

  /**
   * Temporary method to fill a new campaign with a token
   */
  private async TMP_createFakeToken(projectID: number,): Promise<ERC20Token> {
    return await prisma.eRC20Token.create({
      data: {
        projectPid: projectID,
        contract_address: "0xfake_token",
        symbol: "FKTK",
        decimals: 18,
        chain_id: 128
      }
    });
  }

  public async getCampaignByRefCode(code: string): Promise<DataOrError<PopulatedCampaign>> {
    try {
      let campaign = await prisma.campaign.findFirst({
        where: {
          referral_code: code
        },
        include: {
          token: true,
          banner: true,
          project: {
            include: {
              logo: true
            }
          }
        },

      });

      // Code not found as root referral code for a campaign? Try in users codes (joined campaigns).
      if (!campaign) {
        let joinedCampaign = await prisma.joinedCampaign.findFirst({
          where: {
            referral_code: code
          },
          include: {
            campaign: {
              include: {
                token: true,
                banner: true,
                project: {
                  include: {
                    logo: true
                  }
                }
              }
            }
          }
        });

        if (joinedCampaign)
          campaign = joinedCampaign.campaign;
      }

      return dataOrErrorData(campaign);
    }
    catch (e) {
      return serverError("getCampaignByRefCode() prisma query error", e);
    }
  }

  /**
   * Process to let an account join a campaign and get airdrops
   */
  public async joinCampaignByRefCode(account: Account, code: string): Promise<DataOrError<JoinedCampaign>> {
    return this.joinCampaignQueue.add(async () => {
      try {
        // Find the campaign related to the target code
        let campaignOrError = await this.getCampaignByRefCode(code);
        if (hasError(campaignOrError))
          return convertedError(campaignOrError);

        let campaign = campaignOrError.data;
        if (!campaign)
          return invalidParamError(`No campaign found for given code ${code}`);

        // User cannot join archived campaign
        if (campaign.is_archived)
          return displayableError(ErrorType.STATE_ERROR, ErrorCode.INVALID_REFER_CODE, "This campaign is not available.");

        if (!campaign.token)
          return stateError(`Campaign ${campaign.id} has no token configured, this should not have happened...`);

        // Ensure the user is not in the campaign yet
        let joinedCount = await prisma.joinedCampaign.count({
          where: {
            campaignCid: campaign.id,
            account: {
              id: account.id
            }
          }
        });

        if (joinedCount > 0)
          return accessForbiddenError("User already joined the campaign earlier");

        // Possibly (could be none), find the existing parent joined campaign from the referring user
        let parentJoinedCampaign = await prisma.joinedCampaign.findFirst({
          where: {
            referral_code: code
          }
        });

        // Generate a unique referral code for this account, for this campaign
        let newRefCodeOrError = await refCodesServices.generateUniqueRefCode("campaign");
        if (hasError(newRefCodeOrError))
          return convertedError(newRefCodeOrError);

        let newRefCode = newRefCodeOrError.data;

        // Insert a new joined campaign entry for the current user
        // WAS:
        // await conn.execute(`INSERT INTO airdrop (username, level1, level2, level3,count1,count2, count3, emls_total, refercode, forwarding,ip,daoid)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        // [email, airdrop.refercode, level2, level3, 0, 0, 0, 1000, (maxId * 10 + 3).toString(16).toUpperCase(), airdrop.forwarding ? airdrop.forwarding : email, ipAddress, airdrop.daoid]
        let joinedCampaign = await prisma.joinedCampaign.create({
          data: {
            account: { connect: { id: account.id } },
            campaign: { connect: { id: campaign.id } },
            referral_code: newRefCode, // user's referral code for this campaign, to share with others
            l1_referral_code: parentJoinedCampaign ? parentJoinedCampaign.referral_code : campaign.referral_code,
            l2_referral_code: parentJoinedCampaign ? parentJoinedCampaign.l1_referral_code : null,
            l3_referral_code: parentJoinedCampaign ? parentJoinedCampaign.l2_referral_code : null
          }
        });

        // Update the FIRST LEVEL referrer (direct parent) - Will update something only if the code is from a joined
        // campaign entry, not from a campaign.
        if (joinedCampaign.l1_referral_code) {
          await prisma.joinedCampaign.updateMany({ // "many" to avoid error if no record found
            data: { l1_user_count: { increment: 1 } },
            where: { referral_code: joinedCampaign.l1_referral_code }
          });
        }

        // Update the SECOND LEVEL referrer
        if (joinedCampaign.l2_referral_code) {
          await prisma.joinedCampaign.updateMany({ // "many" to avoid error if no record found
            data: { l2_user_count: { increment: 1 } },
            where: { referral_code: joinedCampaign.l2_referral_code }
          });
        }

        // Update the THIRD LEVEL referrer
        if (joinedCampaign.l3_referral_code) {
          await prisma.joinedCampaign.updateMany({ // "many" to avoid error if no record found
            data: { l3_user_count: { increment: 1 } },
            where: { referral_code: joinedCampaign.l3_referral_code }
          });
        }

        // TODO LATER: Don't use static email, use a created email template from our own editor

        // Customize the template with user data
        let bannerPictureUrl: string;
        if (campaign.banner)
          bannerPictureUrl = `${environment.nodeJS.rootUrl}/uploads/${campaign.banner.storage_folder}/${campaign.banner.filename}`;
        else // Placeholder if no campaign banner set
          bannerPictureUrl = `${environment.nodeJS.rootUrl}/static/email-templates/campaign-welcome/welcome-default.jpg`;

        let templateHtml = emailPlannerService.fillEmailContentPlaceholders(this.campaignWelcomeTemplateHtml, {
          bannerPictureUrl
        });

        // Send a welcome email for this campaign - for now, we use a default message for all campaign.
        // This can be customized by campaigns later on.
        void emailPlannerService.sendEmailNow(
          "Emails.com <welcome@emails.com>",
          account.forwarding_email,
          `Welcome to ${campaign.name}`,
          templateHtml);

        return dataOrErrorData(joinedCampaign);
      }
      catch (e) {
        return serverError("joinCampaignByRefCode() prisma query error", e);
      }
    });
  }

  public async getAccountJoinedCampaignForCampaign(account: Account, campaignId: number): Promise<DataOrError<{ campaign: Campaign, joinedCampaign: JoinedCampaign }>> {
    let joinedCampaign = await prisma.joinedCampaign.findFirst({
      where: {
        accountUid: account.id,
        campaignCid: campaignId
      },
      include: {
        campaign: {
          include: {
            token: true
          }
        }
      }
    });

    if (!joinedCampaign)
      return dataOrErrorData(null);

    return dataOrErrorData({
      joinedCampaign: joinedCampaign,
      campaign: joinedCampaign.campaign
    });
  }

  /**
   * Gets a joined campaign by ID, but only if it belongs to the target account
   */
  public async getAccountJoinedCampaignById(account: Account, joinedCampaignId: number): Promise<DataOrError<JoinedCampaign & { campaign: Campaign }>> {
    let joinedCampaign = await prisma.joinedCampaign.findFirst({
      where: {
        accountUid: account.id,
        id: joinedCampaignId
      },
      include: {
        campaign: true
      }
    });

    return dataOrErrorData(joinedCampaign);
  }

  /**
   * Returns all joined campaigns for a user, including campaign details
   */
  public async getAccountJoinedCampaigns(account: Account): Promise<DataOrError<JoinedCampaign[]>> {
    let joinedCampaigns = await prisma.joinedCampaign.findMany({
      where: {
        accountUid: account.id,
        campaign: {
          is_archived: false,
        }
      },
      include: {
        campaign: {
          include: {
            token: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return dataOrErrorData(joinedCampaigns);
  }

  /**
   * Computes and returns reward status for a joined campaign.
   */
  public async getJoinedCampaignRewardsStatus(joinedCampaign: JoinedCampaign, campaign: Campaign | number): Promise<DataOrError<JoinedCampaignRewardsStatus>> {
    // Fetch the campaign if a campaign id is given
    if (typeof campaign === "number") {
      campaign = await prisma.campaign.findUnique({ where: { id: campaign } });
    }

    ///////////
    // ERC20 //
    ///////////

    // Tokens earned = referral * tokens per referral
    const tokensEarned = this.getJoinedCampaignEarnedERC20Tokens(joinedCampaign, campaign);

    // Claimed tokens
    const claims = await prisma.eRC20TokenCampaignClaim.findMany({
      where: {
        joinedCampaignId: joinedCampaign.id
      }
    });

    const claimedTokens = claims.reduce((prev, cur) => prev + cur.tokens_claimed, 0);

    // Claimable tokens = tokens earned minus previously claimed tokens
    const claimableTokens = tokensEarned - claimedTokens;

    let status: JoinedCampaignRewardsStatus = {
      erc20: {
        claimableTokens,
        claimedTokens,
        airdroppedTokens: 0 // TODO
      }
    };

    return dataOrErrorData(status);
  }

  private getJoinedCampaignEarnedERC20Tokens(jc: JoinedCampaign, campaign: Campaign): number {
    return campaign.initial_amount +
      jc.l1_user_count * campaign.l1_token_amount +
      jc.l2_user_count * campaign.l2_token_amount +
      jc.l3_user_count * campaign.l3_token_amount;
  }

  public async getCampaignStats(account: Account, projectId: number, campaignId: number): Promise<DataOrError<CampaignStats>> {
    // Get the campaign and make sure it belongs to current user
    let campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
        projectPid: projectId,
        project: {
          accountUid: account.id
        }
      }
    });

    if (!campaign)
      return invalidParamError("Campaign not found, or doesn't belong to this user");

    // TODO: need speed/memory optimization here

    let joinedCampaigns = await prisma.joinedCampaign.findMany({
      where: {
        campaignCid: campaign.id
      }
    });

    let count = 0;
    let spentTokens = 0;
    for (let jc of joinedCampaigns) {
      spentTokens += campaign.initial_amount +
        jc.l1_user_count * campaign.l1_token_amount +
        jc.l2_user_count * campaign.l2_token_amount +
        jc.l3_user_count * campaign.l3_token_amount;

      count++;
    }

    return dataOrErrorData({
      accounts: count,
      spentTokens
    })
  }

  public async updateCampaignField(account: Account, projectId: number, campaignId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
    if (!account.forwarding_email_verified)
      return displayableError(ErrorType.STATE_ERROR, ErrorCode.VERIFY_ACCOUNT, "Cannot update the campaign because the account has not been verified");

    try {
      // Get the campaign and make sure it belongs to current user
      let campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          projectPid: projectId,
          project: {
            accountUid: account.id
          }
        }
      });

      if (!campaign)
        return invalidParamError("Campaign not found, or doesn't belong to this user");

      const allowedEditionKeys: TypedEditionKeyEntry[] = [
        { key: "name", type: "string" },
        { key: "presentation", type: "string" },
        { key: "initial_amount", type: "int" },
        { key: "l1_token_amount", type: "int" },
        { key: "l2_token_amount", type: "int" },
        { key: "l3_token_amount", type: "int" },
        {
          key: "tokenId", type: "int", initialCheck: async value => {
            // Make sure the new token ID belongs to this project
            let tokenOrError = await erc20TokensService.getProjectToken(account, projectId, <number>value);
            if (hasError(tokenOrError))
              return convertedError(tokenOrError);
            else
              return dataOrErrorData();
          }
        },
        {
          key: "bannerId", type: "int", initialCheck: async value => {
            // Make sure the new banner file ID belongs to this project
            let fileOrError = await filesService.getProjectFile(account, projectId, <number>value);
            if (hasError(fileOrError))
              return convertedError(fileOrError);
            else {
              // Delete the previous banner file
              if (campaign.bannerId) {
                await filesService.deleteFileById(campaign.bannerId);
              }

              return dataOrErrorData();
            }
          }
        },
        { key: "is_archived", type: 'boolean' },
        { key: "start_date", type: 'int' },
        { key: "end_date", type: 'int' },
        { key: "promo_link", type: 'string' },
        { key: "rules", type: 'string' },
        //{ key: "reward_type", type: 'string' },
        { key: "medium", type: 'string' },
        //{ key: "distribution", type: 'string' },
        { key: "erc20_expected_tokens_count", type: 'string' } // TODO: allow only if not deposit yet
      ];
      let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);
      if (hasError(finalValueOrError))
        return convertedError(finalValueOrError);

      // Update in database
      let updateData = {};
      // HACKY: special cases
      if (updatedEntry.key === "tokenId")
        updateData["token"] = { connect: { id: finalValueOrError.data } };
      else
        updateData[updatedEntry.key] = finalValueOrError.data;

      await prisma.campaign.update({
        data: updateData,
        where: {
          id: campaign.id
        }
      });

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Update campaign prisma error", e);
    }
  }

  public async generateCampaignReport(account: Account, projectId: number, campaignId: number): Promise<DataOrError<CampaignReport>> {
    // Get the campaign and make sure it belongs to current user
    let campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
        projectPid: projectId,
        project: {
          accountUid: account.id
        }
      },
      include: {
        token: true
      }
    });

    if (!campaign)
      return invalidParamError("Campaign not found, or doesn't belong to this user");

    let report: CampaignReport = {
      campaign: {
        name: campaign.name,
        token: {
          symbol: campaign.token.symbol,
          name: campaign.token.title,
          chainId: campaign.token.chain_id
        },
        startDate: moment.unix(campaign.start_date).toString(),
        endDate: moment.unix(campaign.end_date).toString(),
        refCode: campaign.referral_code
      },
      accounts: []
    }

    // TODO: need speed/memory optimization here

    let joinedCampaigns = await prisma.joinedCampaign.findMany({
      where: {
        campaignCid: campaign.id
      },
      include: {
        account: true
      }
    });

    let accounts: AccountWithStats[] = [];
    for (let jc of joinedCampaigns) {
      let balance = campaign.initial_amount +
        jc.l1_user_count * campaign.l1_token_amount +
        jc.l2_user_count * campaign.l2_token_amount +
        jc.l3_user_count * campaign.l3_token_amount;

      accounts.push({
        account: {
          id: jc.account.id,
          creationDate: moment(jc.account.created_at).toString(),
          walletAddress: jc.account.address,
          forwardEmail: {
            verified: jc.account.forwarding_email_verified
          }
        },
        stats: {
          refCode: jc.referral_code,
          l1RefCode: jc.l1_referral_code,
          l2RefCode: jc.l2_referral_code,
          l3RefCode: jc.l3_referral_code,
          l1UserCount: jc.l1_user_count,
          l2UserCount: jc.l2_user_count,
          l3UserCount: jc.l3_user_count,
          balance
        }
      });
    }

    report.accounts = accounts;

    return dataOrErrorData(report);
  }

  /**
   * Claims all the possible tokens for a user for his joined campaign, meaning that a new claim database
   * entry is created with the number of claimable tokens left at the moment.
   * This claim entry will be used to be packed into real on chain batched airdrops.
   */
  public claimJoinedCampaignERC20Tokens(account: Account, joinedCampaignId: number): Promise<DataOrError<JoinedCampaignRewardsStatus>> {
    return this.claimTokensQueue.add(async () => {
      // Find the joined campaign
      let jcOrError = await this.getAccountJoinedCampaignById(account, joinedCampaignId);
      if (hasError(jcOrError))
        return convertedError(jcOrError);

      let joinedCampaign = successfulData(jcOrError);

      // Get current reward status, including the number of claimable tokens
      let rewardStatusOrError = await this.getJoinedCampaignRewardsStatus(joinedCampaign, joinedCampaign.campaign);
      if (hasError(rewardStatusOrError))
        return convertedError(rewardStatusOrError);

      let rewardsStatus = successfulData(rewardStatusOrError);
      if (rewardsStatus.erc20.claimableTokens <= 0)
        return stateError("No claimable tokens");

      // Create a new claim entry
      await prisma.eRC20TokenCampaignClaim.create({
        data: {
          account: { connect: { id: account.id } },
          campaign: { connect: { id: joinedCampaign.campaignCid } },
          joined_campaign: { connect: { id: joinedCampaignId } },
          tokens_claimed: rewardsStatus.erc20.claimableTokens
        }
      });

      // Compute the rewards status again to return the latest value
      return this.getJoinedCampaignRewardsStatus(joinedCampaign, joinedCampaign.campaign);
    });
  }

  /**
   * Marks a campaign as paused, meaning that users cannot join it any more, rewards are not sent, etc.
   *
   * @param pausedBySystem means that out backend is doing this forced pause for some reason (lack of rewards, etc). Opposite to "paused by project"
   */
  public async pauseCampaign(campaign: Campaign, pausedBySystem: boolean): Promise<DataOrError<void>> {
    try {
      await prisma.campaign.update({
        where: {
          id: campaign.id
        },
        data: {
          is_paused: true,
          is_paused_by_system: pausedBySystem
        }
      });
      return dataOrErrorData();
    }
    catch (e) {
      return serverError("pauseCampaign() error", e);
    }
  }
}

export const campaignsService = new CampaignsService();