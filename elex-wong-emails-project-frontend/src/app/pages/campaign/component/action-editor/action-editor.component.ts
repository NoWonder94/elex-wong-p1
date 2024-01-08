import { Component, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignActionType } from 'src/app/model/campaigns/actions/campaignactiontype';
import { TwitterFollowConfiguration } from 'src/app/model/campaigns/actions/twitterfollowconfiguration';
import { TwitterRTConfiguration } from 'src/app/model/campaigns/actions/twitterrtconfiguration';
import { CampaignAction } from 'src/app/model/campaigns/campaignaction';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignActionService } from 'src/app/services/campaignactions.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { Web3Service } from 'src/app/services/web3.service';

type AvailableCampaignActionType = {
  type: CampaignActionType;
  title: string;
}

export type ActionEditionCompletionEvent = { status: "done" | "cancelled" | "deleted", action?: CampaignAction };

@Component({
  selector: 'action-editor',
  templateUrl: './action-editor.component.html',
  styleUrls: ['./action-editor.component.scss']
})
export class CampaignActionEditor implements OnInit {
  @ViewChildren("input") inputElements: QueryList<any>;

  public editedAction: CampaignAction
  get action(): CampaignAction {
    return this.editedAction;
  }
  @Input() set action(value: CampaignAction) {
    this.editedAction = Object.assign({}, value); // Clone the input to not modify it directly
  }

  @Output()
  public completed = new EventEmitter<ActionEditionCompletionEvent>();

  /*  = {
    type: "twitter_follow",
    configuration: this.campaignActionsService.createTwitterFollowConfiguration()
  } */

  public availableActionTypes: AvailableCampaignActionType[] = [{
    type: "twitter_follow",
    title: "Follow on twitter"
  },
  {
    type: "twitter_rt",
    title: "Retweet on twitter"
  }];

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private campaignActionsService: CampaignActionService,
    private sanitizer: DomSanitizer,
    private networksService: NetworksService) {
  }

  async ngOnInit() {
  }

  public onCampaignTypeBlur() {

  }

  public cancelEdition() {
    this.completed.emit({
      status: "cancelled"
    });
  }

  public saveEdition() {
    this.completed.emit({
      status: "done",
      action: this.editedAction
    });
  }

  public deleteEdition() {
    this.completed.emit({
      status: "deleted",
      action: this.editedAction
    });
  }

  public getTwitterFollowConfiguration(): TwitterFollowConfiguration {
    return <TwitterFollowConfiguration>this.editedAction.configuration;
  }

  public getTwitterRTConfiguration(): TwitterRTConfiguration {
    return <TwitterRTConfiguration>this.editedAction.configuration;
  }
}
