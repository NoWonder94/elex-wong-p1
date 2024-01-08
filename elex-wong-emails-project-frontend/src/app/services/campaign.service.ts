import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign, CampaignJson } from '../model/campaigns/campaign';
import { CampaignStats } from '../model/campaigns/campaignstats';
import { JoinedCampaign } from '../model/campaigns/joinedcampaign';
import { RewardsStatus } from '../model/campaigns/rewardsstatus';
import { hasError } from '../model/dataorerror';
import { Project } from '../model/project';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { AuthTokenService } from './authtoken.service';
import { HttpService } from './http.service';
import { SocketService } from './sockets.service';
import { ToastService } from './toast.service';
import { Web3Service } from './web3.service';

type AvailableRewardType = {
  id: string;
  name: string;
  disabled: boolean;
}

type AvailableDistributionMode = {
  id: string;
  name: string;
  disabled: boolean;
}

type AvailableMedium = {
  id: string;
  name: string;
  disabled: boolean;
}

type CampaignCreationFields = {
  name: string;
  rewardType: string;
  distribution: string;
  medium: string;
}

type CreateCampaignRequest = CampaignCreationFields;

type CreateCampaignResponse = {
  campaign: CampaignJson;
}

type FetchProjectCampaignsResponse = {
  campaigns: CampaignJson[];
}

type FetchPublicCampaignInfoResponse = {
  campaign: CampaignJson; // Partial info (public only)
}

type JoinCampaignResponse = {
  joinedCampaign: JoinedCampaign;
}

type JoinedCampaignResponse = JoinedCampaignWithInfo;

type ClaimERC20TokensResponse = {
  newRewardStatus: RewardsStatus;
}

/**
 * Joined campaign entry with additional computed info such
 * as rewards status
 */
export type JoinedCampaignWithInfo = {
  campaign?: Campaign;
  joinedCampaign: JoinedCampaign;
  rewardsStatus: RewardsStatus;
}

type JoinedCampaignsResponse = {
  joinedCampaigns: JoinedCampaign[];
}

type CampaignStatsResponse = {
  stats: CampaignStats;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public static instance: CampaignService = null;

  constructor(
    private http: HttpService,
    private authTokenService: AuthTokenService,
    private toastService: ToastService,
    private web3Service: Web3Service,
    private router: Router,
    private toast: ToastService,
    private socketsService: SocketService) {
    CampaignService.instance = this;
  }

  public async init(): Promise<void> {
    Logger.log("account", "Campaign service is initializing");
    return;
  }

  /**
   * Retrieves signed in user campaigns for a given project from the backend
   */
  public async fetchCampaigns(project: Project): Promise<Campaign[]> {
    let campaignsOrError = await this.http.backEndJsonGet<FetchProjectCampaignsResponse>(`/projects/${project.id}/campaigns`);
    if (!hasError(campaignsOrError)) {
      return campaignsOrError.data.campaigns.map(c => Campaign.fromJson(c));
    }
    else {
      return [];
    }
  }

  public async createCampaign(projectId: number, campaignCreationFields: CampaignCreationFields): Promise<Campaign> {
    let body: CreateCampaignRequest = campaignCreationFields;

    let campaignOrError = await this.http.backEndJsonPost<CreateCampaignResponse>(`/projects/${projectId}/campaigns`, body);
    if (!hasError(campaignOrError)) {
      return Campaign.fromJson(campaignOrError.data.campaign);
    }
    else {
      return null;
    }
  }

  /**
   * Retrieves a public campaign info from its ref code
   */
  public async fetchPublicCampaignInfoByRefCode(code: string): Promise<Campaign> {
    let campaignOrError = await this.http.backEndJsonGet<FetchPublicCampaignInfoResponse>(`/campaigns/bycode/${code}`);
    if (!hasError(campaignOrError)) {
      return Campaign.fromJson(campaignOrError.data.campaign);
    }
    else {
      return null;
    }
  }

  public async joinCampaignByRefCode(code: string): Promise<JoinedCampaign> {
    let joinedCampaignOrError = await this.http.backEndJsonPost<JoinCampaignResponse>(`/campaigns/${code}/join`);
    if (!hasError(joinedCampaignOrError)) {
      return joinedCampaignOrError.data.joinedCampaign;
    }
    else {
      return null;
    }
  }

  /**
   * Gets a user's joined campaign entry from a campaign ID
   */
  public async getJoinedCampaignInfoForCampaign(campaignId: number): Promise<JoinedCampaignWithInfo> {
    let joinedInfoOrError = await this.http.backEndJsonGet<JoinedCampaignResponse>(`/campaigns/${campaignId}/joined`);
    if (!hasError(joinedInfoOrError)) {
      return joinedInfoOrError.data;
    }
    else {
      return null;
    }
  }

  /**
   * Gets all user's joined campaign, including campaign info
   */
  public async getJoinedCampaigns(): Promise<JoinedCampaign[]> {
    let joinedInfoOrError = await this.http.backEndJsonGet<JoinedCampaignsResponse>(`/campaigns/joined`);
    if (!hasError(joinedInfoOrError)) {
      Logger.log("campaigns", "Got joined campaigns:", joinedInfoOrError.data);
      return joinedInfoOrError.data.joinedCampaigns;
    }
    else {
      return null;
    }
  }

  public async getCampaignStats(projectId: number, campaignId: number): Promise<CampaignStats> {
    // TODO: change url to /campaigns/id/stats, no project
    let statsOrError = await this.http.backEndJsonGet<CampaignStatsResponse>(`/projects/${projectId}/campaigns/${campaignId}/stats`);
    if (!hasError(statsOrError)) {
      Logger.log("campaigns", "Got campaign stats:", statsOrError.data.stats);
      return statsOrError.data.stats;
    }
    else {
      return null;
    }
  }

  public async updateCampaignInfo(projectId: number, campaignId: number, key: string, value: number | string): Promise<boolean> {
    Logger.log("campaigns", "Updating campaign entry:", key, value);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    // TODO: change url to /campaigns/id/update, no project
    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/campaigns/${campaignId}/update`, updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return true;
    }
    else {
      return null; // TODO: forward errors
    }
  }

  /**
   * Claims all possible erc20 tokens for a user's joined campaign and returns the updated reward status info.
   */
  public async claimERC20RewardTokens(joinedCampaignId: number): Promise<RewardsStatus> {
    Logger.log("campaigns", "Claiming joined campaign ERC20 tokens");

    let claimedOrError = await this.http.backEndJsonPost<ClaimERC20TokensResponse>(`/joinedcampaigns/${joinedCampaignId}/claimERC20Tokens`);
    if (!hasError(claimedOrError)) {
      return claimedOrError.data.newRewardStatus;
    }
    else {
      return null;
    }
  }

  public async downloadReport(projectId: number, campaignId: number): Promise<JSON> {
    Logger.log("campaigns", "Downloading campaign report");

    // TODO: change url to /campaigns/id/report, no project
    let resultOrError = await this.http.backEndJsonGet<JSON>(`/projects/${projectId}/campaigns/${campaignId}/report`);
    console.log(resultOrError)
    if (!hasError(resultOrError)) {
      return resultOrError.data;
    }
    else {
      return null; // TODO: forward errors
    }
  }

  public getAvailableRewardTypes(): AvailableRewardType[] {
    return [
      { id: 'erc20_tokens', name: 'ERC20 Tokens', disabled: false },
      { id: 'nfts', name: 'NFTs (Not yet available)', disabled: true }
    ];
  }

  public getAvailableDistributionModes(): AvailableDistributionMode[] {
    return [
      { id: 'all_users', name: 'All users', disabled: false },
      { id: 'random_users', name: 'Random (Not yet available)', disabled: true },
      { id: 'first_users', name: 'First users (Not yet available)', disabled: true }
    ];
  }

  public getAvailableMediums(): AvailableMedium[] {
    return [
      { id: 'link_sharing', name: 'Social link sharing', disabled: false },
      { id: 'emailing', name: 'Emails.com emailing (Not yet available)', disabled: true }
    ];
  }
}
