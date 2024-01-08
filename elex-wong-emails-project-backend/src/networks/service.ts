import { Network } from "./model/network";

//const elastosMainnet = new Network("elastosmainnet", "Elastos Mainnet", 20, "https://api.trinity-tech.io/esc", "ELA", "ELA");
const elastosTestnet = new Network("elastostestnet", "Elastos Testnet", 21, "https://api-testnet.trinity-tech.io/esc", "ELA", "ELA");

export const supportedNetworks = [
  // Main nets
  //elastosMainnet,

  // Test nets
  elastosTestnet
];

class NetworksService {

  /**
   * Finds a network by chain id in our list of supported networks
   */
  public findNetworkByEVMChainId(chainId: number): Network {
    return supportedNetworks.find(n => n.chainId === chainId);
  }

  public getAllNetworks(): Network[] {
    return supportedNetworks;
  }
}

export const networksService = new NetworksService();