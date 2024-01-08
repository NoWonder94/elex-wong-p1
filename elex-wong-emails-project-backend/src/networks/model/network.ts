export class Network {
  constructor(
    public key: string, // Unique identifier among networks
    public name: string,
    public chainId: number,
    public rpcUrl: string,
    public nativeTokenSymbol: string,
    public pricingApiSymbol: string // ie ELA, BNB, etc. Normally, that's the main token symbol.
  ) { }
}
