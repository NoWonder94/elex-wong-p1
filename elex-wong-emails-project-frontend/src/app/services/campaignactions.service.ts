import { Injectable } from '@angular/core';
import { CampaignActionType } from '../model/campaigns/actions/campaignactiontype';
import { TwitterFollowConfiguration } from '../model/campaigns/actions/twitterfollowconfiguration';
import { TwitterRTConfiguration } from '../model/campaigns/actions/twitterrtconfiguration';
import { CampaignJson } from '../model/campaigns/campaign';
import { CampaignAction } from '../model/campaigns/campaignaction';
import { hasError } from '../model/dataorerror';
import { Project } from '../model/project';
import { Logger } from '../utils/logger';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type CreateCampaignActionRequest = {
  type: string;
}

type CreateCampaignActionResponse = {
  action: CampaignAction;
}

type FetchCampaignActionsResponse = {
  actions: CampaignAction[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignActionService {
  public static instance: CampaignActionService;

  constructor(
    private http: HttpService,
    private toast: ToastService) {
    CampaignActionService.instance = this;
  }

  public async init(): Promise<void> {
    Logger.log("account", "Campaign actions service is initializing");
    return;
  }

  /**
   * Retrieves campaign actions for a given campaign.
   * No auth required
   */
  public async fetchCampaignActions(projectId: number, campaignId: number): Promise<CampaignAction[]> {
    let campaignsOrError = await this.http.backEndJsonGet<FetchCampaignActionsResponse>(`/projects/${projectId}/campaigns/${campaignId}/actions`);
    if (!hasError(campaignsOrError)) {
      Logger.log("campaignactions", "Got campaign actions", campaignsOrError.data.actions);
      return campaignsOrError.data.actions;
    }
    else {
      return [];
    }
  }

  public async createCampaignAction(project: Project, campaign: CampaignJson, actionType: CampaignActionType): Promise<CampaignAction> {
    let body: CreateCampaignActionRequest = {
      type: actionType
    };

    let campaignActionOrError = await this.http.backEndJsonPost<CreateCampaignActionResponse>(`/projects/${project.id}/campaigns/${campaign.id}/actions`, body);
    if (!hasError(campaignActionOrError)) {
      return campaignActionOrError.data.action;
    }
    else {
      return null;
    }
  }

  public getCampaignActionSummary(action: CampaignAction): string {
    switch (action.type) {
      case "twitter_follow":
        let twitterFollowConfig = <TwitterFollowConfiguration>action.configuration;
        if (twitterFollowConfig.twitterAccount)
          return `Follow @${twitterFollowConfig.twitterAccount} on Twitter`;
        else
          return `[Not configured] Follow an account on Twitter`;
      case "twitter_rt":
        let twitterRTConfig = <TwitterRTConfiguration>action.configuration;
        if (twitterRTConfig.tweetUrl)
          return "Retweet a post on Twitter";
        else
          return "[Not configured] Retweet a post on Twitter";
      default:
        return "";
    }
  }

  public createTwitterFollowConfiguration(): TwitterFollowConfiguration {
    return {
      twitterAccount: null
    };
  }

  public async updateCampaignAction(projectId: number, campaignId: number, action: CampaignAction): Promise<boolean> {
    Logger.log("campaignactions", "Updating campaign action entry:", action);

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/campaigns/${campaignId}/actions/${action.id}/update`, {
      action
    });
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return true;
    }
    else {
      return null; // TODO: forward errors
    }
  }

  public async deleteCampaignAction(projectId: number, campaignId: number, action: CampaignAction): Promise<boolean> {
    Logger.log("campaignactions", "Deleting campaign action entry:", action);

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/campaigns/${campaignId}/actions/${action.id}/delete`, {
      action
    });
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return true;
    }
    else {
      return null; // TODO: forward errors
    }
  }
}
