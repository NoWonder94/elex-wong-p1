export type Network = {
  key: string; // Unique identifier among networks
  name: string;
  chainId: number;
  rpcUrl: string;
  pricingApiSymbol: string; // ie ELA, BNB, etc. Normally, that's the main token symbol.
  nativeTokenSymbol: string;
}