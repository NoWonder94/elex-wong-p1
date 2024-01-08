import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ClipboardService } from 'ngx-clipboard';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { Account } from 'src/app/model/account';
import { JoinedCampaign } from 'src/app/model/campaigns/joinedcampaign';
import { Project } from 'src/app/model/project';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { DiscordService } from 'src/app/services/discord.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { TwitterService } from 'src/app/services/twitter.service';
import { Web3Service } from 'src/app/services/web3.service';

type JoinedCampaignWithStats = JoinedCampaign & {
  tokens: number;
}
@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  public projects: Project[] = [];
  public joinedCampaigns: JoinedCampaignWithStats[] = [];
  public isVerifyingAccount = false;
  public isConnectingTwitter = false;
  public isConnectingDiscord = false;

  public account: Account = null;
  public twitterUrl = null;
  public emailsent = false;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private accountService: AccountService,
    private projectService: ProjectService,
    private campaignsService: CampaignService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private twitter: TwitterService,
    private discord: DiscordService,
    private sanitizer: DomSanitizer,
    private networksService: NetworksService,
    private route: ActivatedRoute,) {
  }

  async ngOnInit() {
    let emailsent = this.route.snapshot.paramMap.get('emailsent');
    if (emailsent != null) {
      this.emailsent = emailsent == 'true';
    }

    // Get active account
    this.accountService.activeAccount.subscribe(account => {
      this.zone.run(() => {
        this.account = account;
        if (account) {
          // Get projects
          this.account.projects.subscribe(projects => {
            this.zone.run(() => {
              this.projects = projects;
            });
          });

          // Get joined campaigns
          this.account.joinedCampaigns.subscribe(joinedCampaigns => {
            if (joinedCampaigns)
              this.prepareJoinedCampaigns(joinedCampaigns);
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
  }

  public editProject(project: Project) {
    this.router.navigateByUrl("/project/" + project.id);
  }

  public openJoinedCampaign(jc: JoinedCampaign) {
    this.router.navigateByUrl("/r/" + jc.referral_code);
  }

  async createProject() {
    let project = await this.projectService.createProject("My project X");
    if (project) {
      this.router.navigateByUrl(`/project/${project.id}`);
    }
  }

  async verifyAccount() {
    this.isVerifyingAccount = true;
    await this.accountService.verifyAccount();
    this.isVerifyingAccount = false;
  }

  public getShortDate(date: Date): string {
    return moment(date).format("MMM DD");
  }

  private prepareJoinedCampaigns(joinedCampaigns: JoinedCampaign[]) {
    this.joinedCampaigns = [];
    for (let joinedCampaign of joinedCampaigns) {
      this.joinedCampaigns.push({
        ...joinedCampaign,
        tokens: this.getJoinedCampaignTotalTokens(joinedCampaign)
      });
    }
  }

  private getJoinedCampaignTotalTokens(joinedCampaign: JoinedCampaign): number {
    return joinedCampaign.campaign.initial_amount +
      joinedCampaign.l1_user_count * joinedCampaign.campaign.l1_token_amount +
      joinedCampaign.l2_user_count * joinedCampaign.campaign.l2_token_amount +
      joinedCampaign.l3_user_count * joinedCampaign.campaign.l3_token_amount;
  }

  private getJoinedCampaignUrl(jc: JoinedCampaign): string {
    return `${window.location.origin}/r/${jc.referral_code}`;
  }

  public copyJoinedCampaignLink(jc: JoinedCampaign, event) {
    if (!event) { event = window.event; }
    event.stopPropagation();

    this.clipboard.copy(this.getJoinedCampaignUrl(jc));
    this.toast.info("Copied to clipboard!");
  }

  public getCampaignLink(jc: JoinedCampaign) {
    return this.getJoinedCampaignUrl(jc);
  }

  public async onForwardingEmailAddressEdited(editBox: SimpleBoxEditComponent) {
    this.saveForwardingEmailAddressField(editBox, "forwarding_email", editBox.value.toString());
  }

  private async saveForwardingEmailAddressField(editBox: SimpleBoxEditComponent, key: string, value: string) {
    editBox.setSaving(true);
    await this.accountService.updateAccountInfo("forwarding_email", value);
    editBox.setSaving(false);
  }

  public async connectTwitter() {
    if (this.isConnectingTwitter)
      return;

    this.isConnectingTwitter = true;
    await this.twitter.authenticate();
    this.isConnectingTwitter = false;
  }

  public async connectDiscord() {
    if (this.isConnectingDiscord)
      return;

    this.isConnectingDiscord = true;
    await this.discord.authenticate();
    this.isConnectingDiscord = false;
  }

  async archiveProject(project: Project) {
    this.account.archiveProject(project);
  }
}
