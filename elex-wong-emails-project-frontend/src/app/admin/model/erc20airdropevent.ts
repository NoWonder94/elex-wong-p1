import { Campaign } from "src/app/model/campaigns/campaign";
import { ERC20Token } from "src/app/model/erc20token";

type ERC20TokenAirdropEventTransfer = {
  address: string; // Wallet address
  tokensAmount: string; // Chain amount, using token decimals
}

export type ERC20TokenAirdropEvent = {
  id: number;
  created_at: string;
  transfers: ERC20TokenAirdropEventTransfer[];
  packed_at?: string;
  handled_at?: string | null
  transaction_confirmed_at?: string;
}

export type ERC20TokenAirdropEventWithCampaignAndToken = ERC20TokenAirdropEvent & { campaign: Campaign & { token: ERC20Token } }

/**
 * Serializable version of a ERC20TokenAirdropEvent
 */
/* export type JsonERC20TokenAirdropEvent = {
  id: number;
  created_at: string;
  transfers: ERC20TokenAirdropEventTransfer[];
  packed_at?: string;
  handled_at?: string | null
  transaction_confirmed_at?: string;
}

export const erc20TokenAirdropEventToJson = (airdropEvent: ERC20TokenAirdropEvent): JsonERC20TokenAirdropEvent => {
  return {
    id: airdropEvent.id,
    created_at: airdropEvent.created_at.toISOString(),
    transfers: airdropEvent.transfers,
    packed_at: airdropEvent.packed_at ? airdropEvent.packed_at.toISOString() : null,
    handled_at: airdropEvent.handled_at ? airdropEvent.handled_at.toISOString() : null,
    transaction_confirmed_at: airdropEvent.transaction_confirmed_at ? airdropEvent.transaction_confirmed_at.toISOString() : null,
  }
} */