import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { hasError } from 'src/app/model/dataorerror';
import { AccountService } from 'src/app/services/account.service';
import { ERC20Service } from 'src/app/services/erc20service';
import { NetworksService } from 'src/app/services/networks.service';
import { StorageService } from 'src/app/services/storage.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';
import { TransactionReceipt } from 'web3-core';
import { HttpService } from '../../services/http.service';
import { ERC20TokenAirdropEvent, ERC20TokenAirdropEventWithCampaignAndToken } from '../model/erc20airdropevent';
import { AdminEVMService } from './evm.service';
import { AdminWalletService } from './wallet.service';

type GetUnhandledERC20AirdropsResponse = {
  airdrops: ERC20TokenAirdropEvent[];
}

type GrabUnhandledERC20AirdropResponse = {
  airdrop: ERC20TokenAirdropEventWithCampaignAndToken;
}

type ERC20TokenAirdropEventInfo = {
  airdrop: ERC20TokenAirdropEvent;
  airdropContractAddress: string;
  chainId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminERC20AirdropsService {
  private checkAirdropTimer: any = null;

  constructor(
    private http: HttpService,
    private accountService: AccountService,
    private web3Service: Web3Service,
    private erc20Service: ERC20Service,
    private adminEvmService: AdminEVMService,
    private adminWalletService: AdminWalletService,
    private networksService: NetworksService,
    private storageService: StorageService
  ) { }

  public async init(): Promise<void> {
    // Listen to account changes and when an admin user signs in or out, the airdrop sending mechanism is started/stopped.
    this.accountService.activeAccount.subscribe(activeAccount => {
      if (activeAccount && activeAccount.is_admin)
        this.startBackgroundAirdropProcess();
      else
        this.stopBackgroundAirdropProcess();
    });

    return;
  }

  private startBackgroundAirdropProcess() {
    Logger.log("adminerc20airdrops", "Starting background airdrop process");
    // Check once immediatelly
    void this.checkNextAirdropToProcess();
  }

  private stopBackgroundAirdropProcess() {
    Logger.log("adminerc20airdrops", "Stopping background airdrop process");

    if (this.checkAirdropTimer) {
      clearTimeout(this.checkAirdropTimer);
      this.checkAirdropTimer = null;
    }
  }

  /**
   * If there is an unprocessed airdrop stored locally, handle it. Otherwise,
   * grab a new airdrop from the backend and process it.
   */
  private async checkNextAirdropToProcess(): Promise<void> {
    let publishingAccountAddress = this.adminWalletService.getWalletAddress();
    if (!publishingAccountAddress) {
      Logger.log("adminerc20airdrops", "No admin wallet configured, not handling airdrops");
    }
    else {
      let airdropToHandle = <ERC20TokenAirdropEventInfo>this.storageService.getJson("erc20airdrop_to_handle", null);
      if (!airdropToHandle) {
        airdropToHandle = await this.grabNextUnhandledAirdrop();
      }

      // Process
      if (airdropToHandle) {
        await this.processAirdrop(airdropToHandle);
      }
    }

    this.rearmCheckNextAirdropToProcess();
  }

  private rearmCheckNextAirdropToProcess() {
    this.checkAirdropTimer = setTimeout(() => {
      void this.checkNextAirdropToProcess();
    }, 10000);
  }

  /**
   * Actually publishes the airdrop, after doing a few verifications
   *
   * RESILIENCE HOWTO (make sure we don't lost airdrops AND don't send multiple times):
   *
   *  CASES TO CONSIDER:
   *    - several admin backends could be running at the same time with same admin wallet
   *    - the admin frontend can crash or be reloaded at any time
   *    - the target blockchain or RPC API node can be offline
   *    - network interruption while sending a transaction
   *    - transaction received by the RPC node but pending (gas priority)
   *    - admin client restarted several hours/days later, with a handled airdrop not yet published but possibly published by someone else because of the recyclign timeout
   *
   *  SOLUTION ALGORITHM:
      - grab unhandled
          - client cancels all pending unpublished transactions on the RPC node (eg pending since more than 100 blocks, airdrop got recycled by the server)
          - server doesn't serve recently recycled airdrops (to avoid handling erroring airdrops in a loop)
              - admin backend shows the list of errored airdrops
          DONE - server ensures balance is enough
          DONE     - if not enough: campaign get paused. Needs manual resume by project owner
          - server saves the current block number
          - no matter what, client never sends airdrop if current block number = handle block number + 100
          - server resets handled date of all airdrops for which the handled block is older than 120 blocks (margin compared to 100 on client side)
              - when an airdrop times out, its errored date is saved
      - client tries to airdrop
          DONE - success: delete local entry
          DONE - fail: delete local entry
              - try to let the server know so it can mark the errored date (but not critical if not received, will wait blocks timeout)
      - server periodically (10 seconds) checks status of handled airdrops
          - find Airdrop events on contract after handle block number
              - find event that has topics that matches the airdrop event id
                  - TODO: send DB airdrop id to airdrop contract method to get it in the event
          - save confirmation date
   */
  private processAirdrop(info: ERC20TokenAirdropEventInfo) {
    Logger.log("adminerc20airdrops", "Processing airdrop", info);

    // send airdrop for real
    this.sendAirdrop(info);
  }

  /**
   * Requests to handle the next airdrop to process to the backend.
   * The grabbed airdrop is marked as handled server side, to make sure no other admin instance
   * tries to publish the same airdrop at the same time.
   */
  private async grabNextUnhandledAirdrop(): Promise<ERC20TokenAirdropEventInfo> {
    // TODO: cancel all pending unpublished transactions on the RPC node older than , if any

    // Grab
    let airdropOrError = await this.http.adminBackEndJsonPost<GrabUnhandledERC20AirdropResponse>(`/erc20airdrops/grabnextunhandled`);
    if (!hasError(airdropOrError)) {

      if (!airdropOrError.data || !airdropOrError.data.airdrop) {
        // Nothing to handle for now
        Logger.log("adminerc20airdrops", "No airdrop to handle");
        return null;
      }
      else {
        let airdropJson = airdropOrError.data.airdrop;

        Logger.log("adminerc20airdrops", "Grabbed ERC20 airdrop to handle", airdropJson);

        let info: ERC20TokenAirdropEventInfo = {
          airdrop: airdropJson,
          airdropContractAddress: airdropJson.campaign.erc20_airdrop_contract_address,
          chainId: airdropJson.campaign.token.chain_id
        };

        // Save locally in case or failure, to retry later
        this.storageService.setJson("erc20airdrop_to_handle", info);

        return info;
      }
    }
    else {
      return null;
    }
  }

  private deleteLocalAirdropToHandle() {
    this.storageService.delete("erc20airdrop_to_handle");
  }

  /**
   * Retrieves unhandled ERC20 airdrops
   */
  public async fetchUnhandledAirdrops(): Promise<ERC20TokenAirdropEvent[]> {
    let airdropsOrError = await this.http.adminBackEndJsonGet<GetUnhandledERC20AirdropsResponse>(`/erc20airdrops/unhandled`);
    if (!hasError(airdropsOrError)) {
      Logger.log("adminerc20airdrops", "Got unhandled ERC20 airdrops", airdropsOrError.data);
      return airdropsOrError.data.airdrops;
    }
    else {
      return null;
    }
  }

  /**
   * Sends an airdrop for real on chain.
   */
  private sendAirdrop(info: ERC20TokenAirdropEventInfo): Promise<TransactionReceipt> {
    Logger.log("adminerc20airdrops", "Sending airdrop", info);

    return new Promise(async (resolve, reject) => {
      const network = this.networksService.getNetworkById(info.chainId);
      let web3 = this.web3Service.getCustomWeb3(network);

      // Get admin wallet address from wallet service
      let publishingAccountAddress = this.adminWalletService.getWalletAddress();

      if (!publishingAccountAddress)
        return reject("No publishing account wallet configured");

      // Get the airdrop contract code
      let { abi } = await import("../../../assets/contracts/Airdrop.json");

      //console.log("ABI", abi);
      //console.log("bytecode", bytecode);

      let gasPrice = await web3.eth.getGasPrice();
      const gasPriceWithMargin = new BigNumber(gasPrice).multipliedBy(1.5).integerValue().toString(10);

      let contract = new web3.eth.Contract(<any>abi, info.airdropContractAddress, {
        from: publishingAccountAddress,
        gasPrice: gasPriceWithMargin
      });

      let recipients = info.airdrop.transfers.map(t => t.address);
      let amounts = info.airdrop.transfers.map(t => t.tokensAmount); // Already in chain format

      console.log("recipients", recipients);
      console.log("amounts", amounts);

      let airdropMethod = contract.methods.airdropTokens(recipients, amounts);

      try {
        let receipt = this.adminEvmService.sendMethod(airdropMethod, info.airdropContractAddress, publishingAccountAddress, network);

        // Forget the locally saved info, we won't retry this
        this.deleteLocalAirdropToHandle();

        return receipt;
      }
      catch (error) {
        Logger.error("adminerc20airdrops", "Failed to send the airdrop", error);

        // Sending can fail for various reasons: network error, blockchain error, not enough tokens left...
        // When the airdrop fails, we:
        // - let the backend know about this so he can unhandle it and do some checks
        // - forget it locally, we will request another one to handle
        this.deleteLocalAirdropToHandle();
        await this.notifyAirdropFailed(info.airdrop.id);
      }
    });
  }

  /**
   * Let the backend know that the airdrop attempt has failed.
   * We don't check the api result as it's ok if the server doesn't get it, it will recover.
   * See algorithm.
   */
  private async notifyAirdropFailed(airdropId: number): Promise<void> {
    try {
      await this.http.adminBackEndJsonPost(`/erc20airdrops/${airdropId}/failed`);
    }
    catch (e) {
      Logger.warn("adminerc20airdrops", "Failed to notify airdrop error to backend");
    }
  }
}