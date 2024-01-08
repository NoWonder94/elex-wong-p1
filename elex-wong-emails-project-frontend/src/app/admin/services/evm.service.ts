import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { Network } from 'src/app/model/networks/network';
import { AccountService } from 'src/app/services/account.service';
import { ERC20Service } from 'src/app/services/erc20service';
import { ToastService } from 'src/app/services/toast.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';
import { TransactionReceipt } from 'web3-core';
import { ContractSendMethod } from 'web3-eth-contract';
import { AdminWalletService } from './wallet.service';
//const Common = require('@ethereumjs/common').default;
import Common from "@ethereumjs/common";
import { TransactionFactory, TxData } from "@ethereumjs/tx";

@Injectable({
  providedIn: 'root'
})
export class AdminEVMService {

  constructor(
    private toast: ToastService,
    private web3Service: Web3Service,
    private erc20Service: ERC20Service,
    private adminWalletService: AdminWalletService,
    private accountService: AccountService
  ) { }

  public getAdminWalletNonce(network: Network): Promise<number> {
    return this.web3Service.getCustomWeb3(network).eth.getTransactionCount(this.adminWalletService.getWalletAddress());
  }

  /**
   * Publishes a web3 method using the admin wallet (eg: airdrops)
   */
  public async sendMethod(method: ContractSendMethod, contractAddress: string, from: string, network: Network): Promise<TransactionReceipt> {
    return new Promise(async (resolve, reject) => {
      try {

        const web3 = this.web3Service.getCustomWeb3(network);

        let gasPrice = await web3.eth.getGasPrice();
        const gasPriceWithMargin = new BigNumber(gasPrice).multipliedBy(1.5).integerValue().toString(10);

        //console.log("method", method)

        let gas = await method.estimateGas();
        gas = Math.ceil(gas * 1.3); // Some margin

        Logger.log("adminevmservice", "Required gas", gas, "Gas price", gasPrice);

        /* var transactionData: TransactionConfig = {
          nonce: await this.getAdminWalletNonce(network),
          gasPrice: web3.utils.toHex(gasPriceWithMargin),
          gas: web3.utils.toHex(gas),
          from,
          to: contractAddress,
          data: method.encodeABI(),
          value: "0x0" // No native token to send
        }; */

        var transactionData: TxData = {
          nonce: await this.getAdminWalletNonce(network),
          gasPrice: web3.utils.toHex(gasPriceWithMargin),
          gasLimit: web3.utils.toHex(gas),
          to: contractAddress,
          data: method.encodeABI(),
          value: "0x0" // No native token to send
        };

        //let signedTx = await web3.eth.accounts.signTransaction(transactionData, this.adminWalletService.getWalletPrivateKey());

        //console.log("Raw transactionData", transactionData);
        let unsignedTx = TransactionFactory.fromTxData(transactionData, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          common: Common.custom({ // Hack for https://github.com/ethereumjs/ethereumjs-monorepo/issues/1609
            networkId: network.chainId,
            chainId: network.chainId
          })
        });

        Logger.log("adminevmservice", "Signing transaction", "Chain ID", network.chainId);

        let privateKeyWithout0x = this.adminWalletService.getWalletPrivateKey().substr(2);
        let privKeyBuffer = Buffer.from(privateKeyWithout0x, 'hex');
        let signedTx = unsignedTx.sign(privKeyBuffer);
        let serializedTx = signedTx.serialize();

        // Note: don't catch errors, forward
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on("error", error => {
          Logger.error("adminevmservice", "sendSignedTransaction() error", error);
          resolve(null);
        })
          /* web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", error => {
            Logger.error("adminevmservice", "sendSignedTransaction() error", error);
            resolve(null);
          }) */
          .on("receipt", receipt => {
            resolve(receipt);
          });
      }
      catch (e) {
        Logger.error("adminevmservice", "Error", e);
        resolve(null);
      }
    });
  }
}
