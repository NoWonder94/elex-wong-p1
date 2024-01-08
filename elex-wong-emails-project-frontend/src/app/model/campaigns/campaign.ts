import { BehaviorSubject } from "rxjs";
import { CampaignService } from "src/app/services/campaign.service";
import { CampaignActionService } from "src/app/services/campaignactions.service";
import { ERC20Token } from "../erc20token";
import { File } from "../file";
import { CampaignAction } from "./campaignaction";
import { CampaignStats } from "./campaignstats";

export interface CampaignJson {
  id: number;
  name: string;
  presentation: string;
  referral_code: string;
  token?: ERC20Token;
  banner?: File;
  start_date?: number;
  end_date?: number;
  logo?: File;
  promo_link?: string;
  rules: string;
  pid: number;
  reward_type: string;
  medium: string;
  distribution: string;
  initial_amount: number;
  l1_token_amount: number;
  l2_token_amount: number;
  l3_token_amount: number;
  erc20_airdrop_contract_address?: string; // Contract address of the created airdrop contract, on the token chain
  erc20_airdrop_contract_discovered_at?: Date; // Date at which the backend confirms that the airdrop contract is found and valid
  erc20_airdrop_contract_tx_hash?: string; // Trasaction ID that created the airdrop contract
  erc20_airdrop_deposit_discovered_at?: Date; // Date at which the airdrop tokens where found as
  erc20_expected_tokens_count?: string; // Total number of tokens too airdrop, human readable form. As string, to support garbage tokens with many digits...
  erc20_airdrop_ready: boolean;
  projectPid: number; // Project ID
}

export class Campaign implements CampaignJson {
  // RAW
  id: number;
  name: string;
  presentation: string;
  referral_code: string;
  token?: ERC20Token;
  banner?: File;
  start_date?: number;
  end_date?: number;
  logo?: File;
  promo_link?: string;
  rules: string;
  pid: number;
  reward_type: string;
  medium: string;
  distribution: string;
  initial_amount: number;
  l1_token_amount: number;
  l2_token_amount: number;
  l3_token_amount: number;
  erc20_airdrop_contract_address?: string;
  erc20_airdrop_contract_discovered_at?: Date;
  erc20_airdrop_contract_tx_hash?: string;
  erc20_airdrop_deposit_discovered_at?: Date;
  erc20_expected_tokens_count?: string;
  erc20_airdrop_ready: boolean;
  projectPid: number;

  // FETCHED DETAILS
  public campaignStats = new BehaviorSubject<CampaignStats>(null);
  public campaignActions = new BehaviorSubject<CampaignAction[]>(null);

  private detailsLoaded = false;

  public static fromJson(json: CampaignJson): Campaign {
    let campaign = new Campaign();
    Object.assign(campaign, json);
    return campaign;
  }

  /**
   * If not already loaded, loaded campaign details (to display campaign details), as when first loaded, campaigns
   * instances don't have all details.
   */
  public loadCampaignDetails() {
    if (this.detailsLoaded)
      return;

    this.detailsLoaded = true; // Mark as loaded before loading to avoid multiple fetches

    CampaignService.instance.getCampaignStats(this.projectPid, this.id).then(campaignStats => this.campaignStats.next(campaignStats));
    CampaignActionService.instance.fetchCampaignActions(this.projectPid, this.id).then(actions => {
      this.campaignActions.next(actions);
    });
  }

  public hasERC20Reward(): boolean {
    return this.reward_type === 'erc20_tokens';
  }

  public distributedToAllUsers(): boolean {
    return this.distribution === 'all_users';
  }

  public getMediumDisplayValue(): string {
    const allentries = CampaignService.instance.getAvailableMediums();
    let entry = allentries.find(t => t.id === this.medium);
    if (!entry)
      return "Unknown";
    else
      return entry.name;
  }

  public getDistributionModeDisplayValue(): string {
    const allentries = CampaignService.instance.getAvailableDistributionModes();
    let entry = allentries.find(t => t.id === this.distribution);
    if (!entry)
      return "Unknown";
    else
      return entry.name;
  }

  public getRewardTypeDisplayValue(): string {
    const allentries = CampaignService.instance.getAvailableRewardTypes();
    let entry = allentries.find(t => t.id === this.reward_type);
    if (!entry)
      return "Unknown";
    else
      return entry.name;
  }
}