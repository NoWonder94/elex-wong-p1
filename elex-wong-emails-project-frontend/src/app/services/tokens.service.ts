import { Injectable } from '@angular/core';
import { hasError } from '../model/dataorerror';
import { ERC20Token } from '../model/erc20token';
import { Project } from '../model/project';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { AccountService } from './account.service';
import { HttpService } from './http.service';
import { NetworksService } from './networks.service';
import { ToastService } from './toast.service';
import { Web3Service } from './web3.service';

type FetchTokensResponse = {
  tokens: ERC20Token[];
}

type CreateTokenRequest = {
  title: string;
}

type CreateTokenResponse = {
  token: ERC20Token;
}

export type TokenChainInfo = {
  coinName: string;
  coinSymbol: string;
  coinDecimals: number;
}

export type CreateAirdropContractResponse = {
  encodedABI: string;
  chainId: number;
  gas: number;
  gasPrice: string;
}

export type CreateDepositTransactionResponse = {
  encodedABI: string;
  to: string;
  chainId: number;
  gas: number;
  gasPrice: string;
}

type AirdropContractCreatedResponse = {
  creationConfirmed: boolean;
}

export type AirdropDepositCheckResponse = {
  depositConfirmed: boolean;
  erc20_airdrop_deposit_discovered_at?: string; // ISO date
}

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  constructor(
    private http: HttpService,
    private toast: ToastService,
    private web3Service: Web3Service,
    private accountService: AccountService,
    private networksService: NetworksService
  ) { }

  public async init(): Promise<void> {
    Logger.log("tokens", "Tokens service is initializing");
    return;
  }

  /**
   * Retrieves all tokens created for a project
   */
  public async fetchProjectTokens(projectId: number): Promise<ERC20Token[]> {
    Logger.log("tokens", "Fetching tokens");

    let tokensOrError = await this.http.backEndJsonGet<FetchTokensResponse>(`/projects/${projectId}/tokens`);
    if (!hasError(tokensOrError)) {
      return tokensOrError.data.tokens;
    }
    else {
      return [];
    }
  }

  public async createProjectToken(project: Project, title: string): Promise<ERC20Token> {
    let body: CreateTokenRequest = {
      title
    };

    let tokenOrError = await this.http.backEndJsonPost<CreateTokenResponse>(`/projects/${project.id}/tokens`, body);
    if (!hasError(tokenOrError)) {
      return tokenOrError.data.token;
    }
    else {
      return null;
    }
  }

  public async updateTokenInfo(projectId: number, tokenId: number, key: string, value: number | string | Date): Promise<void> {
    Logger.log("tokens", "Updating token entry:", key, value);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/tokens/${tokenId}/update`, updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return;
    }
    else {
      return; // TODO: forward errors
    }
  }

  /**
   * Tries to retrieve ERC20 token info from chain
   */
  public async fetchOnChainToken(chainID: number, tokenContractAddress: string): Promise<TokenChainInfo> {
    let network = this.networksService.getNetworkById(chainID);
    if (!network) { // We don't support this chain id / network
      console.log(typeof chainID)
      Logger.log("tokens", "Unsupported network for chain ID " + chainID);
      return null;
    }

    try {
      let erc20Contract = await this.web3Service.getERC20TokenContract(network, tokenContractAddress);

      const coinName = await erc20Contract.methods.name().call();
      Logger.log('tokens', 'Coin name:', coinName);

      const coinSymbol = await erc20Contract.methods.symbol().call();
      Logger.log('tokens', 'Coin symbol:', coinSymbol);

      const coinDecimals = await erc20Contract.methods.decimals().call();
      Logger.log('tokens', 'Coin decimals:', coinDecimals);

      return { coinName, coinSymbol, coinDecimals };
    } catch (err) {
      Logger.warn('tokens', 'fetchOnChainToken', err);
      return null;
    }
  }

  public async createAirdropContract(projectId: number, campaignId: number): Promise<{ contractAddress: string }> {
    Logger.log("tokens", "Requesting to create airdrop contract");

    let resultOrError = await this.http.backEndJsonPost<CreateAirdropContractResponse>(`/projects/${projectId}/campaign/${campaignId}/airdropcontract/create`, {
      chainId: this.web3Service.chainIdEvent.value // active chain id
    });
    if (!hasError(resultOrError)) {
      let contractInfo = resultOrError.data;

      let web3 = this.web3Service.getUserWeb3();
      let accountAddress = this.accountService.activeAccount.value.address;

      // Publish the airdrop contract through user's wallet
      const receipt = await web3.eth.sendTransaction({
        from: accountAddress,
        data: contractInfo.encodedABI,
        gas: contractInfo.gas,
        gasPrice: contractInfo.gasPrice,
        value: 0
      });

      Logger.log("tokens", "Got airdrop contract transaction receipt", receipt);

      // Contract successfully created, let the backend know so it can validate the contract and user can continue with the deposit step
      let createdResultOrError = await this.http.backEndJsonPost<AirdropContractCreatedResponse>(`/projects/${projectId}/campaign/${campaignId}/airdropcontract/created`, {
        transactionHash: receipt.transactionHash
      });
      if (!hasError(createdResultOrError)) {
        Logger.log("tokens", "Airdrop contract creation confirmed by the backend");
        return { contractAddress: receipt.contractAddress };
      }
      else {
        this.toast.error("Airdrop contract creation could not be confirmed...");
        return null;
      }
    }
    else {
      return null;
    }
  }

  /**
   * @returns Whether the deposit was confirmed by the backend or not.
   */
  public async depositTokensToAirdropContract(projectId: number, campaignId: number): Promise<AirdropDepositCheckResponse> {
    Logger.log("tokens", "Requesting to create deposit tokens transaction");

    let resultOrError = await this.http.backEndJsonPost<CreateDepositTransactionResponse>(`/projects/${projectId}/campaign/${campaignId}/airdropcontract/createdeposit`, {
      chainId: this.web3Service.chainIdEvent.value // active chain id
    });
    if (!hasError(resultOrError)) {
      let transactionInfo = resultOrError.data;

      Logger.log("tokens", "Got deposit transaction info", transactionInfo);

      let web3 = this.web3Service.getUserWeb3();
      let accountAddress = this.accountService.activeAccount.value.address;

      // Publish the deposit transaction through user's wallet
      const receipt = await web3.eth.sendTransaction({
        from: accountAddress,
        to: transactionInfo.to,
        data: transactionInfo.encodedABI,
        gas: transactionInfo.gas,
        gasPrice: transactionInfo.gasPrice,
        value: 0
      });

      if (receipt) {
        // Right after receiving the receipt, save the info locally to be able to be more resilient in case of backend api failure.
        this.saveTempAirdropDeposit(projectId, campaignId, receipt.transactionHash);

        Logger.log("tokens", "Got deposit transaction receipt", receipt);

        // Deposit successfully created, let the backend know so it can validate the deposit and get the campaign ready.
        return this.notifyDepositToBackend(projectId, campaignId, receipt.transactionHash);
      }
      else {
        Logger.error("tokens", "No deposit receipt");
        return { depositConfirmed: false };
      }
    }
    else {
      Logger.error("tokens", "Failed to get raw deposit transaction info from the backend");
      return { depositConfirmed: false };
    }
  }

  /**
   * Check if we have a temporary airdrop deposit info locally that is not handled by the backend yet
   * and retry it.
   */
  public async retryToConfirmTokensDepositIfNeeded(projectId: number, campaignId: number): Promise<AirdropDepositCheckResponse> {
    let existingDepositHash = localStorage.getItem(`campaign_erc20_airdrop_deposit_${projectId}_${campaignId}`);
    if (!existingDepositHash)
      return { depositConfirmed: true };

    return this.notifyDepositToBackend(projectId, campaignId, existingDepositHash);
  }

  private async notifyDepositToBackend(projectId: number, campaignId: number, txHash: string): Promise<AirdropDepositCheckResponse> {
    let confirmedOrError = await this.http.backEndJsonPost<AirdropDepositCheckResponse>(`/projects/${projectId}/campaign/${campaignId}/airdropcontract/checkdeposit`, {
      transactionHash: txHash
    });
    if (!hasError(confirmedOrError)) {
      if (confirmedOrError.data.depositConfirmed) {
        Logger.log("tokens", "Airdrop tokens deposit confirmed by the backend");

        this.deleteTempAirdropDeposit(projectId, campaignId);

        return confirmedOrError.data;
      }
      else {
        // Not confirmed
        return confirmedOrError.data;
      }
    }
    else {
      this.toast.error("Airdrop tokens deposit could not be confirmed, need to retry later");
      return { depositConfirmed: false };
    }
  }

  /**
   * Saves deposit tx info in local storage temporarily.
   */
  private saveTempAirdropDeposit(projectId: number, campaignId: number, txHash: string) {
    localStorage.setItem(`campaign_erc20_airdrop_deposit_${projectId}_${campaignId}`, txHash);
  }

  private deleteTempAirdropDeposit(projectId: number, campaignId: number) {
    localStorage.removeItem(`campaign_erc20_airdrop_deposit_${projectId}_${campaignId}`);
  }
}
