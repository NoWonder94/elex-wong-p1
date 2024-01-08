/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Network } from "../model/networks/network";
import { HttpService } from "./http.service";
import { Web3Service } from "./web3.service";

const supportedNetworks: Network[] = [
    {
        key: "ethereum",
        name: "Ethereum",
        chainId: 1,
        rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        pricingApiSymbol: null, nativeTokenSymbol: null
    },
    {
        key: "bsc",
        name: "Binance Smart chain",
        chainId: 56,
        rpcUrl: "https://bsc-dataseed.binance.org",
        pricingApiSymbol: null, nativeTokenSymbol: null
    },
    {
        key: "esc",
        name: "Elastos Smart Chain",
        chainId: 20,
        rpcUrl: "https://api.elastos.io/esc",
        pricingApiSymbol: null, nativeTokenSymbol: null
    },
    {
        key: "esc-testnet",
        name: "Elastos Smart Chain (Testnet)",
        chainId: 21,
        //rpcUrl: "https://api-testnet.elastos.io/esc",
        rpcUrl: "http://localhost:8101",
        pricingApiSymbol: null, nativeTokenSymbol: null
    },
    {
        key: "matic",
        name: "Polygon Matic",
        chainId: 137,
        rpcUrl: "https://polygon-rpc.com",
        pricingApiSymbol: null, nativeTokenSymbol: null
    }
]

@Injectable({
    providedIn: 'root',
})
export class NetworksService {
    public activeNetwork = new BehaviorSubject<Network>(null);

    public constructor(private http: HttpService, private web3Service: Web3Service) { }

    public async init(): Promise<void> {
        //await this.fetchNetworksInfo();

        this.web3Service.chainIdEvent.subscribe(chainId => {
            this.activeNetwork.next(this.getNetworkById(chainId));
        })
    }

    public getDisplayableNetworkName(network: Network) {
        if (!network)
            return "Unsupported network";
        else
            return network.name;
    }

    /**
     * Fetches available networks, and related information
     */
    private async fetchNetworksInfo(): Promise<void> {
        /* let networksOrError = await this.http.backEndJsonGet<Network[]>("/networks");
        if (!hasError(networksOrError)) {
            this.availableNetworks = networksOrError.data;
        } */
    }

    public getNetworkById(chainId: number): Network {
        return supportedNetworks.find(n => n.chainId === chainId) || null;
    }

    public getActiveNetwork(): Network {
        let activeChainId = this.web3Service.chainIdEvent.value;
        if (activeChainId === 0)
            return null;
        return this.getNetworkById(activeChainId);
    }

    public getAllNetworks(): Network[] {
        return supportedNetworks;
    }

    public isActiveNetworkSupported(): boolean {
        return !!this.getActiveNetwork();
    }
}