import BigNumber from "bignumber.js";
import { abi as erc20ABI } from "../../contracts/build/contracts/ERC20.json";
import { logger } from "../logger";
import { Network } from "../networks/model/network";
import { evmService } from "./evm.service";

class ERC20Service {

  /**
   * Fetches the ERC20 balance of a ERC20 contract for a given address,
   * in chain amount.
   */
  public async fetchERC20TokenBalance(network: Network, tokenAddress: string, walletAddress: string): Promise<BigNumber> {
    try {

      const erc20Contract = new (await evmService.getWeb3(network)).eth.Contract(<any>erc20ABI, tokenAddress, { from: walletAddress });

      const rawBalance = await erc20Contract.methods.balanceOf(walletAddress).call();
      return new BigNumber(rawBalance);
    } catch (error) {
      logger.info('Failed to retrieve ERC20 token balance', network, "Token", tokenAddress, "Wallet", walletAddress, error);
      throw (error);
    }
  }
}

export const erc20Service = new ERC20Service();