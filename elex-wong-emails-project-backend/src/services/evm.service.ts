import BigNumber from 'bignumber.js';
import { isValidAddress } from 'ethereumjs-util';
import { readFileSync } from 'fs';
import Web3 from 'web3';
import { logger } from '../logger';
import { Network } from '../networks/model/network';

export type UnsignedTransactionInfo = {
  encodedABI: string;
  chainId: number;
  gas: number;
  gasPrice: string;
  to?: string;
}

class EVMService {
  private web3Instances: { [chainId: number]: Web3 } = {};

  public isValidEVMAddress(address: string): boolean {
    return isValidAddress(address);
  }

  public getWeb3(network: Network): Web3 {
    if (!this.web3Instances[network.chainId])
      this.web3Instances[network.chainId] = new Web3(network.rpcUrl);

    return this.web3Instances[network.chainId];
  }

  /**
   * Returns ABI and bytcode from a compiled contract JSON file (compiled with truffle for instance).
   */
  public loadABI(compiledContractPath: string): { abi: any, bytecode: any } {
    let source = readFileSync(compiledContractPath);
    let sourceJson = JSON.parse(source.toString("utf-8"));
    let contract = sourceJson;
    return {
      abi: contract.abi,
      bytecode: contract.bytecode
    };
  }

  /* public async getCurrentBlockInfo(): Promise<{ blockNumber: number, blockTimestamp: number }> {
      console.log("Getting current block information...");

      var blockNumber = await this.getWeb3().eth.getBlockNumber();
      var block = await this.getWeb3().eth.getBlock(blockNumber);
      var blockTimestamp = parseInt("" + block.timestamp);

      return { blockNumber, blockTimestamp };
  } */

  /**
   * Deploys a contract and returns its address
   */
  /* public async deployContract(compiledContractPath: string, args: unknown[]): Promise<string> {
    // Load the compiled contract code
    console.log("Loading contract at:", compiledContractPath);
    let { abi, bytecode } = this.loadABI(compiledContractPath);

    let contractAddress = await this.deploy(abi, bytecode, args);
    // Let this method forward the error if thrown.

    console.log("Contract deployment completed at address", contractAddress);

    return contractAddress;
  } */

  /**
   * Returns the unsigned transaction to deploy a given contract
   */
  public async createUnsignedDeployTransaction(network: Network, abi: any, bytecode: any, contractConstructorArgs: unknown[]): Promise<UnsignedTransactionInfo> {
    const web3 = this.getWeb3(network);
    let contract = new web3.eth.Contract(abi);

    logger.info("Creating encoded contract ABI for deployment with arguments:", contractConstructorArgs, "Chain:", network.chainId);
    let deployMethod = contract.deploy({
      data: bytecode,
      arguments: contractConstructorArgs
    });

    let gasPrice = await web3.eth.getGasPrice();
    let gas = await deployMethod.estimateGas();

    // Add margin to the estimated gas because it's sometimes inaccurate. Using the exact estimates fails to publish contracts sometimes.
    gas = Math.round(gas * 1.3); // 30% more

    const gasPriceWithMargin = new BigNumber(gasPrice).multipliedBy(1.5).integerValue().toString(10);

    let encodedABI = deployMethod.encodeABI();

    console.log(gasPrice, gas, encodedABI);
    return {
      encodedABI,
      gas,
      gasPrice: gasPriceWithMargin,
      chainId: network.chainId
    };
  }

  public async createUnsignedMethodTransaction(network: Network, web3Method: any, callParams: { from: string }): Promise<UnsignedTransactionInfo> {
    const web3 = this.getWeb3(network);

    logger.info("Creating encoded deposit ABI", "Chain:", network.chainId);

    let gasPrice = await web3.eth.getGasPrice();
    let gas = await web3Method.estimateGas(callParams);

    const gasPriceWithMargin = new BigNumber(gasPrice).multipliedBy(1.5).integerValue().toString(10);

    let encodedABI = web3Method.encodeABI();

    //console.log(gasPrice, gas, encodedABI);
    return {
      encodedABI,
      gas,
      gasPrice: gasPriceWithMargin,
      chainId: network.chainId
    };
  }
}

export const evmService = new EVMService();