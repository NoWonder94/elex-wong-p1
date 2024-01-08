/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Web3Instance from 'web3/dist/web3.min.js'; // Use this import, not just "web3", to get the embedded polyfills (crypto, http, etc)
import { Network } from "../model/networks/network";
import { Logger } from "../utils/logger";
@Injectable({
    providedIn: 'root',
})
export class Web3Service {
    // Cached web3 instances per network, byt RPC> Not using Metamask or wallet connect.
    private web3s: {
        [networkName: string]: Web3;
    } = {}

    // User's connected web3 - Metamask, wallet connect instance...
    private userWeb3: Web3 = null;

    public connectedWalletAccounts = new BehaviorSubject<string[]>([]); // Accounts connected to a wallet in the browser (metamask, etc), not obviously signed in to emails.com
    public chainIdEvent: BehaviorSubject<number> = new BehaviorSubject(0);

    public init() {
    }

    public constructor() {
        Logger.log("web3", "Web3 service is starting");
        if (window.ethereum) {
            Logger.log("web3", "Injected EVM wallet detected");

            this.userWeb3 = new Web3Instance(window.ethereum) as Web3;

            window.ethereum.on('accountsChanged', (accounts) => {
                console.log('accountsChanges', accounts);
                this.connectedWalletAccounts.next(accounts);
            });

            // detect Network change
            window.ethereum.on('chainChanged', (chainId) => {
                this.handleChainChange(parseInt(chainId));
            });

            // Get the initial chain ID value
            this.userWeb3.eth.getChainId().then(chainId => {
                this.handleChainChange(chainId);
            });

            this.userWeb3.eth.getAccounts().then(accounts => {
                this.connectedWalletAccounts.next(accounts);
            });
        }
        else {
            // No injected EVM wallet
            this.connectedWalletAccounts.next([]);
        }
    }

    private handleChainChange(chainId: number) {
        Logger.log('web3', 'Chain ID changed:', chainId);
        this.chainIdEvent.next(chainId);
    }

    /**
     * Creates a new Web3 instance or return a cached one, for the given network.
     */
    public getCustomWeb3(network: Network): Web3 {
        if (network.name in this.web3s) {
            return this.web3s[network.name];
        }
        else {
            let web3 = new Web3(network.rpcUrl);
            this.web3s[network.name] = web3;
            return web3;
        }
    }

    public getUserWeb3(): Web3 {
        return this.userWeb3;
    }

    public async connectWallet(): Promise<string[]> {
        let accounts = await this.userWeb3.eth.getAccounts();
        if (accounts.length > 0)
            return accounts;

        // Not bound to the wallet - request authorization to get accounts
        try {
            accounts = await this.userWeb3.eth.requestAccounts();
            this.connectedWalletAccounts.next(accounts);
            return accounts;
        }
        catch (e) {
            // TODO
            Logger.warn("web3", "Failed to request accounts from wallet");
            return null;
        }
    }

    public async getERC20TokenABI(): Promise<AbiItem[]> {
        return (await import('src/assets/contracts/StandardErc20ABI.json')).default as AbiItem[];
    }

    public async getERC20TokenContract(network: Network, contractAddress: string): Promise<Contract> {
        let abi = await this.getERC20TokenABI();
        return new (new Web3(network.rpcUrl).eth.Contract)(abi, contractAddress);
    }

    /* public async checkAccountBalance(): Promise<void> {
        console.log("Checking account balance...");
        let balance = Web3.utils.fromWei(await this.web3.eth.getBalance(this.deployerAccount.address));
        console.log("Account balance:", balance);
    } */

    public async getCurrentBlockInfo(): Promise<{ blockNumber: number, blockTimestamp: number }> {
        console.log("Getting current block information...");

        var blockNumber = await this.userWeb3.eth.getBlockNumber();
        var block = await this.userWeb3.eth.getBlock(blockNumber);
        var blockTimestamp = parseInt("" + block.timestamp);

        return { blockNumber, blockTimestamp };
    }
}