export type ERC20Token = {
  id: number;
  title: string; // UI user friendly title
  symbol: string;
  contract_address: string;
  decimals: number;
  chain_id: number;
  activated_at: Date;
}
