import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { Network } from '../model/networks/network';
import { Logger } from '../utils/logger';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class ERC20Service {
  constructor(
    private web3Service: Web3Service
  ) { }

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

  /**
   * Fetches the ERC20 balance of a ERC20 contract for a given address,
   * in chain amount.
   */
  public async fetchERC20TokenBalance(network: Network, tokenAddress: string, walletAddress: string): Promise<BigNumber> {
    try {
      let { abi: erc20ABI } = await import("../../assets/contracts/ERC20WithSupply.json");

      const erc20Contract = new (await this.web3Service.getCustomWeb3(network)).eth.Contract(<any>erc20ABI, tokenAddress, { from: walletAddress });

      const rawBalance = await erc20Contract.methods.balanceOf(walletAddress).call();
      return new BigNumber(rawBalance);
    } catch (error) {
      Logger.log('erc20service', 'Failed to retrieve ERC20 token balance', network, tokenAddress, walletAddress, error);
      return new BigNumber(0);
    }
  }
}
