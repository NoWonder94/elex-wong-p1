import BigNumber from "bignumber.js";
import moment from "moment";
import { campaignsService } from "../campaigns/service";
import { convertedError, DataOrError, dataOrErrorData, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { prisma } from "../db/index";
import { environment } from "../generated/environment";
import { Account, ERC20Token } from "../generated/prisma/main-schema/index";
import { logger } from "../logger";
import { Network } from "../networks/model/network";
import { networksService } from "../networks/service";
import { projectsService } from "../projects/service";
import { evmService, UnsignedTransactionInfo } from "../services/evm.service";

export type CheckedAirdropDeposit = {
  depositConfirmed: boolean;
  erc20_airdrop_deposit_discovered_at: string; // ISO date
}

class TokensService {
  public async getProjectTokens(account: Account, projectId: number): Promise<DataOrError<ERC20Token[]>> {
    try {
      let tokens = await prisma.eRC20Token.findMany({
        where: {
          project: {
            accountUid: account.id
          },
          projectPid: projectId
        }
      });

      return dataOrErrorData(tokens);
    }
    catch (e) {
      return serverError("Get project tokens prisma query error");
    }
  }

  public async getProjectToken(account: Account, projectId: number, tokenId: number): Promise<DataOrError<ERC20Token>> {
    try {
      let token = await prisma.eRC20Token.findFirst({
        where: {
          id: tokenId,
          project: {
            accountUid: account.id
          },
          projectPid: projectId
        }
      });

      return dataOrErrorData(token);
    }
    catch (e) {
      return serverError("Get project token prisma query error");
    }
  }

  public async createToken(account: Account, projectId: number, title: string): Promise<DataOrError<ERC20Token>> {
    // Make sure the project belongs to the signed in user
    let accountProjectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(accountProjectOrError))
      return convertedError(accountProjectOrError);

    if (!accountProjectOrError.data)
      return invalidParamError("Project not found, or doesn't belong to this user");

    let token = await prisma.eRC20Token.create({
      data: {
        title,
        symbol: "",
        project: { connect: { id: projectId } },
        contract_address: "",
        decimals: 18,
        chain_id: 1 // Default - ethereum
      }
    });

    return dataOrErrorData(token);
  }

  public async updateTokenField(account: Account, projectId: number, tokenId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
    try {
      // Get the token and make sure it belongs to current user
      let token = await prisma.eRC20Token.findFirst({
        where: {
          id: tokenId,
          projectPid: projectId,
          project: {
            accountUid: account.id
          }
        }
      });

      if (!token)
        return invalidParamError("Token not found, or doesn't belong to this user");

      const allowedEditionKeys: TypedEditionKeyEntry[] = [
        { key: "title", type: "string" },
        { key: "chain_id", type: "int" },
        { key: "contract_address", type: "string" },
        { key: "symbol", type: "string" },
        { key: "decimals", type: "int" },
        { key: "activated_at", type: "string" }
      ];

      let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);
      if (hasError(finalValueOrError))
        return convertedError(finalValueOrError);

      // Update in database
      let updateData = {};
      updateData[updatedEntry.key] = finalValueOrError.data;

      await prisma.eRC20Token.update({
        data: updateData,
        where: {
          id: token.id
        }
      });

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Update token prisma error", e);
    }
  }

  /**
   * Create an airdrop contract for a given campaign configured to use ERC20 rewards.
   * The unsigned contract transaction is returned and must be published by the account on the client side.
   */
  public async createAirdropContractPayload(account: Account, projectId: number, campaignId: number, network: Network): Promise<DataOrError<UnsignedTransactionInfo>> {
    logger.info(`Request to create airdrop contract with client network ${network.chainId}`);

    // Ensure owned campaign
    const campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    const campaign = campaignOrError.data;

    // Make sure the campaign token is on the target network
    const token = campaign.token;
    if (token.chain_id !== network.chainId)
      return invalidParamError(`Token on chain ${token.chain_id} cannot be used to create a aidrop contract on chain ${network.chainId}`);

    let airdropConstructorArgs = [
      token.contract_address, // Token contract address
      environment.wallets.airdropsOperatorAddress // Operator address (the one that can release the tokens from the contract)
    ]

    const loadedContract = await evmService.loadABI("./contracts/build/contracts/Airdrop.json");
    let deploymentResult = await evmService.createUnsignedDeployTransaction(network, loadedContract.abi, loadedContract.bytecode, airdropConstructorArgs);

    return dataOrErrorData(deploymentResult);
  }

  /**
   * Verifies that the airdrop contract has been created as we hoped, by the client side.
   */
  public async validateCreatedAirdropContract(account: Account, projectId: number, campaignId: number, transactionHash: string): Promise<DataOrError<boolean>> {
    // Ensure owned campaign
    const campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    const campaign = campaignOrError.data;

    try {
      let network = networksService.findNetworkByEVMChainId(campaign.token.chain_id);

      // From the transaction hash, retrieve the created contract address
      let web3 = evmService.getWeb3(network);
      let receipt = await web3.eth.getTransactionReceipt(transactionHash);
      if (!receipt)
        return invalidParamError("The given transaction hash cannot be found on the target blockchain");

      let contractAddress = receipt.contractAddress;
      if (!contractAddress)
        return invalidParamError("The given transaction hash does not represent a published contract");

      let contractCreator = receipt.from;

      // Make sure the creator is the signed in account
      if (contractCreator.toLowerCase() !== account.address.toLowerCase())
        return invalidParamError("Contract creator address is different from the signed in account address")

      // Make sure the contract address is not already in use
      let existingCampaignWithSameAirdropContract = await prisma.campaign.findMany({
        where: {
          erc20_airdrop_contract_address: contractAddress.toLowerCase()
        }
      });
      if (existingCampaignWithSameAirdropContract.length > 0)
        return invalidParamError("Another campaign already uses this airdrop contract address");

      // All good, save the contract address in the campaign
      await prisma.campaign.update({
        data: {
          erc20_airdrop_contract_address: contractAddress.toLowerCase(),
          erc20_airdrop_contract_tx_hash: transactionHash,
          erc20_airdrop_contract_discovered_at: moment().toDate()
        },
        where: {
          id: campaign.id
        }
      });

      return dataOrErrorData(true);
    }
    catch (e) {
      return serverError("validateCreatedAirdropContract() server error", e);
    }
  }

  /**
   * Create an unsigned transaction that will make the project owner deposit airdrop tokens into the airdrop contract.
   * The unsigned contract transaction is returned and must be published by the account on the client side.
   */
  public async createAirdropContractDepositTokensPayload(account: Account, projectId: number, campaignId: number, network: Network): Promise<DataOrError<UnsignedTransactionInfo>> {
    // Ensure owned campaign
    const campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    const campaign = campaignOrError.data;

    // Make sure the campaign token is on the target network
    const token = campaign.token;
    if (token.chain_id !== network.chainId)
      return invalidParamError(`Current user network ${network.chainId} cannot be used to create token deposit transaction on chain ${token.chain_id}`);

    try {
      const loadedContract = await evmService.loadABI("./contracts/build/contracts/ERC20.json");

      const web3 = await evmService.getWeb3(network);
      let erc20Contract = new web3.eth.Contract(loadedContract.abi, token.contract_address);

      let depositChainAmount = this.toChainAmount(campaign.erc20_expected_tokens_count, token.decimals);

      // Ensure enough tokens in project wallet
      let chainAccountBalanceStr = await erc20Contract.methods.balanceOf(account.address).call();
      if (!chainAccountBalanceStr)
        return serverError("Unable to fetch project token balance");

      const chainAccountBalance = new BigNumber(chainAccountBalanceStr);
      if (chainAccountBalance.lt(depositChainAmount))
        return displayableError(ErrorType.STATE_ERROR, ErrorCode.NOT_ENOUGH_TOKENS, "Not enough tokens in your wallet");

      logger.info(`OK - ERC20 tokens deposit: user has ${chainAccountBalance.toString(10)} ${token.symbol}, deposit requires ${depositChainAmount.toString(10)}`)

      const transferMethod = erc20Contract.methods.transfer(campaign.erc20_airdrop_contract_address, depositChainAmount);
      let transactionInfo = await evmService.createUnsignedMethodTransaction(network, transferMethod, {
        from: account.address
      });

      console.log(transactionInfo)

      return dataOrErrorData({ ...transactionInfo, to: token.contract_address });
    }
    catch (e) {
      return serverError("createAirdropContractDepositTokensPayload() error", e);
    }
  }

  /**
   * Client side requests us to check if the tokens deposit has been done in the airdrop contract
   * so this is checked here and the campaign gets updated accordingly.
   */
  public async checkAirdropDeposit(account: Account, projectId: number, campaignId: number, transactionHash: string): Promise<DataOrError<CheckedAirdropDeposit>> {
    try {
      // Ensure owned campaign
      const campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
      if (hasError(campaignOrError))
        return convertedError(campaignOrError);

      const campaign = campaignOrError.data;

      // If the campaign deposit was already found, we're done
      if (campaign.erc20_airdrop_deposit_discovered_at)
        return dataOrErrorData({
          depositConfirmed: true,
          erc20_airdrop_deposit_discovered_at: campaign.erc20_airdrop_deposit_discovered_at.toISOString()
        }); // deposit confirmed

      // Deposit not discovered yet, so we check the token balance in the contract
      let token = campaign.token;

      const loadedERC20Contract = await evmService.loadABI("./contracts/build/contracts/ERC20.json");

      let network = networksService.findNetworkByEVMChainId(campaign.token.chain_id);
      const web3 = await evmService.getWeb3(network);
      let erc20Contract = new web3.eth.Contract(loadedERC20Contract.abi, token.contract_address);

      let expectedTokenDepositedAmount = this.toChainAmount(campaign.erc20_expected_tokens_count, token.decimals);

      // The airdrop contract itself must hold the right number of campaign tokens
      let chainAirdropAccountBalanceStr = await erc20Contract.methods.balanceOf(campaign.erc20_airdrop_contract_address).call();
      if (!chainAirdropAccountBalanceStr)
        return serverError("Unable to fetch airdrop contract token balance");

      console.log("expectedTokenDepositedAmount", expectedTokenDepositedAmount)
      console.log("chainAirdropAccountBalanceStr", chainAirdropAccountBalanceStr)

      let chainAirdropAccountBalance = new BigNumber(chainAirdropAccountBalanceStr);
      if (chainAirdropAccountBalance.gte(expectedTokenDepositedAmount)) {
        // Balance is enough - save the discovery info
        const discoveryDate = moment().toDate();

        await prisma.campaign.update({
          where: {
            id: campaign.id
          },
          data: {
            erc20_airdrop_deposit_discovered_at: discoveryDate,
            erc20_airdrop_ready: true
          }
        });

        return dataOrErrorData({
          depositConfirmed: true,
          erc20_airdrop_deposit_discovered_at: discoveryDate.toISOString()
        });
      }
      else {
        // Balance is not enough
        return dataOrErrorData({
          depositConfirmed: false,
          erc20_airdrop_deposit_discovered_at: null
        });
      }
    }
    catch (e) {
      return serverError("checkAirdropDeposit() error", e);
    }
  }

  /**
   * From a human readable amount (short) to a chain amount (long)
   */
  public toChainAmount(readableAmount: BigNumber | string, decimals: number): BigNumber {
    return new BigNumber(readableAmount).times(new BigNumber(10).pow(decimals));
  }

  /**
   * From a chain amount (long) to a human readable amount (short)
   */
  public toHumanReadableAmount(chainAmount: string | BigNumber, decimals = 18): BigNumber {
    return new BigNumber(chainAmount).dividedBy(new BigNumber(10).pow(decimals));
  }
}

export const erc20TokensService = new TokensService();