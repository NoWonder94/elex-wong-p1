import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { AccountService } from 'src/app/services/account.service';
import { ERC20Service } from 'src/app/services/erc20service';
import { ToastService } from 'src/app/services/toast.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';
import { TransactionReceipt } from 'web3-core';

@Injectable({
  providedIn: 'root'
})
export class AdminERC20Service {
  constructor(
    private toast: ToastService,
    private web3Service: Web3Service,
    private erc20Service: ERC20Service,
    private accountService: AccountService
  ) { }

  public async createERC20Token(symbol: string, name: string, humanReadableAmount: string, decimals = 18): Promise<TransactionReceipt> {
    Logger.log("adminerc20service", "Requesting to create ERC20 contract", symbol, name, humanReadableAmount, decimals);

    return new Promise(async (resolve, reject) => {
      let web3 = this.web3Service.getUserWeb3();
      let accountAddress = this.accountService.activeAccount.value.address;

      // Publish the token contract through user's wallet
      let { abi, bytecode } = (await import("../../../assets/contracts/ERC20WithSupply.json"));

      //console.log("ABI", abi);
      //console.log("bytecode", bytecode);

      let gasPrice = await web3.eth.getGasPrice();
      const gasPriceWithMargin = new BigNumber(gasPrice).multipliedBy(1.5).toString(10);

      let contract = new web3.eth.Contract(<any>abi, null, {
        from: accountAddress,
        gasPrice: gasPriceWithMargin
      });

      let chainAmount = this.erc20Service.toChainAmount(humanReadableAmount, decimals); // Number of initial tokens, chain format

      let deployMethod = contract.deploy({
        data: bytecode,
        arguments: [
          name,
          symbol,
          chainAmount.toString(10)
        ]
      });

      let gas = await deployMethod.estimateGas();

      // Add margin to the estimated gas because it's sometimes inaccurate. Using the exact estimates fails to publish contracts sometimes.
      gas = Math.round(gas * 1.3); // 50% more

      deployMethod.send({
        from: accountAddress,
        gas,
        gasPrice: gasPriceWithMargin
      }).on("error", (error) => {
        Logger.error("adminerc20service", "Failed to created ERC20 token", error);
        resolve(null);
      }).on("receipt", (receipt) => {
        resolve(receipt);
      });
    });
  }
}
