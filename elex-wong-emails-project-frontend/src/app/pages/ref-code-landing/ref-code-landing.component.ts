import { Component, NgZone, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { AnimationOptions } from 'ngx-lottie';
import { interval, Subscription } from 'rxjs';
import sleep from 'sleep-promise';
import { Account } from 'src/app/model/account';
import { Campaign } from 'src/app/model/campaigns/campaign';
import { CampaignAction } from 'src/app/model/campaigns/campaignaction';
import { JoinedCampaign } from 'src/app/model/campaigns/joinedcampaign';
import { RewardsStatus } from 'src/app/model/campaigns/rewardsstatus';
import { Project } from 'src/app/model/project';
import { ReferralCode } from 'src/app/model/referralcode';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignActionService } from 'src/app/services/campaignactions.service';
import { CountdownService } from 'src/app/services/countdown.service';
import { FilesService } from 'src/app/services/files.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { RefCodeService } from 'src/app/services/refcode.service';
import { ToastService } from 'src/app/services/toast.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'ref-code-landing',
  templateUrl: './ref-code-landing.component.html',
  styleUrls: ['./ref-code-landing.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class RefCodeLandingComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    //path: '/assets/animations/106843-splash-loader.json'
    //path: '/assets/animations/106640-loading-2.json'
    path: '/assets/animations/106457-logo-dropbox.json'
  }

  public walletAddress: string = null;
  public accountExists = false;
  public activeAccount: Account = null;
  public agreedToJoin = false;

  private code: string = null;
  private referralCode: ReferralCode = null;
  public fetchingInformation = true;
  public inexistingCode = false;
  public inexistingCampaign = false;
  public campaignInfo: Campaign = null;
  public alreadyJoinedBefore = true;
  public justJoined = false;
  public joinedCampaign: JoinedCampaign = null;
  public rewardsStatus: RewardsStatus = null;
  public project: Project;
  public campaignActions: CampaignAction[] = [];
  public fetchingCampaignActions = false;
  public claimingERC20Tokens = false;

  public startDate: number;
  public endDate: number;
  private timeinterval = interval;
  private subscription!: Subscription;
  public isEventStarted = true;
  public isEventEnded = false;

  public secondsToDday: number;
  public minutesToDday: number;
  public hoursToDday: number;
  public daysToDday: number;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private refCodeService: RefCodeService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private filesService: FilesService,
    private countdownService: CountdownService,
    private networksService: NetworksService,
    private meta: Meta,
    private campaignActionsService: CampaignActionService
  ) {
  }

  async ngOnInit() {
    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      if (accounts.length > 0)
        this.walletAddress = accounts[0];
      else
        this.walletAddress = null;
    });

    this.accountService.accountStatus.subscribe(accountStatus => {
      this.accountExists = (accountStatus.statusChecked && accountStatus.exists);
    });

    this.accountService.activeAccount.subscribe(account => {
      this.activeAccount = account;

      if (account)
        this.checkCampaignJoined();
    });

    this.route.params.subscribe(async params => {
      this.code = params['refCode'];

      if (!this.code) {
        // NOTE: maybe we will receive a legacy /register/index.html?refCode code, in the other callback
        Logger.warn("ref-landing", "No ref code received in the path.");
        return;
      }

      await this.fetchCodeInfo();

      this.fetchingInformation = false;
    });

    // LEGACY support for old style urls
    this.route.queryParamMap.subscribe(async params => {
      let code = params.get('refercode');
      if (code) {
        Logger.log("ref-landing", "Got old refer code in query params.");
        this.code = code;
        await this.fetchCodeInfo();
      }

      this.fetchingInformation = false;
    });
  }

  private fetchCodeInfo() {
    // Fetch code information (purpose)
    return Promise.all([
      sleep(1000), // Wait min 1s to show the spinner
      this.fetchAllInfo()
    ]);
  }

  private async fetchAllInfo(): Promise<void> {
    let referralCode = await this.refCodeService.fetchCodeInfo(this.code);
    Logger.log("joinedcampaign", "REF CODE", this.code, referralCode)
    if (!referralCode) {
      this.inexistingCode = true;
    }
    else {
      this.referralCode = referralCode;

      // Get the public campaign info (accessible to all users)
      this.campaignInfo = await this.campaignsService.fetchPublicCampaignInfoByRefCode(this.code)

      if (!this.campaignInfo) {
        this.inexistingCampaign = true;
        return;
      }

      this.startDate = this.campaignInfo.start_date;
      this.endDate = this.campaignInfo.end_date;
      if (this.startDate && this.endDate) {
        this.startInterval(this.endDate);
        this.getTimeDateComparison(this.startDate, this.endDate);
      }

      Logger.log("joinedcampaign", "Campaign info", this.campaignInfo);

      this.campaignActionsService.fetchCampaignActions(this.campaignInfo.pid, this.campaignInfo.id).then(actions => {
        this.campaignActions = actions;
        this.fetchingCampaignActions = false;
      });

      void this.checkCampaignJoined(); // Checked here and when account changed cause we don't know which one will come first

      this.generateOpenGraphMeta();
    }
  }

  private async checkCampaignJoined(): Promise<void> {
    if (!this.activeAccount || !this.campaignInfo) {
      this.joinedCampaign = null;
      this.alreadyJoinedBefore = false;
      return;
    }

    // Get joined information for the signed in user
    let jcInfo = await this.campaignsService.getJoinedCampaignInfoForCampaign(this.campaignInfo.id);
    if (jcInfo) {
      this.joinedCampaign = jcInfo.joinedCampaign;
      this.rewardsStatus = jcInfo.rewardsStatus;
    }

    this.alreadyJoinedBefore = !!this.joinedCampaign;

    Logger.log("joinedcampaign", "Joined campaign info", this.joinedCampaign);
  }

  public connectThenJoinCampaign() {
    this.agreedToJoin = true;
  }

  public joinCampaign() {
    this.agreedToJoin = true;
    this.joinCampaignReal();
  }

  public async joinCampaignReal() {
    let joinedCampaign = await this.campaignsService.joinCampaignByRefCode(this.referralCode.code);
    if (joinedCampaign) {
      this.justJoined = true;
      this.joinedCampaign = joinedCampaign;
    }
  }

  // Registered also means "connected"
  public async onRegistered() {
    await this.fetchAllInfo();

    if (!this.alreadyJoinedBefore)
      this.joinCampaignReal();
  }

  public async onConnected() {
    await this.fetchAllInfo();

    if (!this.alreadyJoinedBefore)
      this.joinCampaignReal();
  }

  public getPersonalSharingLink(): string {
    if (!this.joinedCampaign)
      return null;

    return `${window.location.origin}/r/${this.joinedCampaign.referral_code}`;
  }

  public getNetworkName(chainId: number): string {
    let network = this.networksService.getNetworkById(chainId);
    if (network)
      return network.name;

    return "Uknown network";
  }

  public copyLinkToClipboard() {
    this.clipboard.copy(this.getPersonalSharingLink());
    this.toast.info("Copied to clipboard!");
  }

  public hasBanner(): boolean {
    return !!this.campaignInfo && !!this.campaignInfo.banner;
  }

  public getBannerPath(): string {
    return this.filesService.getFileDownloadPath(this.campaignInfo.banner);
  }

  public getPresentationValue(): string {
    return this.campaignInfo.presentation ? this.escapeHtml(`${this.campaignInfo.presentation}`).replace(/\n/g, "<br/>") : "";
  }

  private escapeHtml(htmlStr: string): string {
    return htmlStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  public getTimeDateComparison(dateOne, dateTwo) {
    var dateNow = new Date().getTime() / 1000; //get in seconds
    if (dateNow > dateOne && dateNow < dateTwo) {
      this.isEventStarted = true;
      this.isEventEnded = false;

    }
    else if (dateNow > dateTwo) {
      this.isEventStarted = false;
      this.isEventEnded = true;

    }
    else if (dateNow < dateOne) {
      this.isEventStarted = false;
      this.isEventEnded = false;
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  /*
    Start countdown timer
  */
  public startInterval(countdownTime) {
    this.subscription = this.timeinterval(1000).subscribe(x => {
      this.countdownService.getTimeDifference(countdownTime);
      this.secondsToDday = this.countdownService.secondsToDday;
      this.minutesToDday = this.countdownService.minutesToDday;
      this.hoursToDday = this.countdownService.hoursToDday;
      this.daysToDday = this.countdownService.daysToDday;

      this.getTimeDateComparison(this.startDate, this.endDate);
    });
  }

  public hasLogo(): boolean {
    return !!this.campaignInfo && !!this.campaignInfo.logo;
  }

  public getLogoPath(): string {
    return this.filesService.getFileDownloadPath(this.campaignInfo.logo);
  }

  public openPromoLink() {
    let url = this.campaignInfo.promo_link;
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url, "_blank");
  }

  public generateOpenGraphMeta() {
    this.meta.addTags([
      //The card type, which will be one of “summary”, “summary_large_image”, “app”, or “player”.
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: this.campaignInfo.name },
      { name: 'twitter:description', content: this.campaignInfo.presentation },
      { name: 'twitter:image', content: this.getBannerPath() },
      //	@username for the content creator / author.
      { name: 'twitter:creator', content: '' },
      //  @username for the website used in the card footer
      { name: 'twitter:site', content: this.getPersonalSharingLink() },


      { name: 'og:url', content: this.getPersonalSharingLink() },
      { name: 'og:title', content: this.campaignInfo.name },
      { name: 'og:description', content: this.campaignInfo.presentation },
      { name: 'og:image', content: this.getBannerPath() }
    ]);
  }

  public getCampaignActionSummary(action: CampaignAction): string {
    return this.campaignActionsService.getCampaignActionSummary(action);
  }

  /**
   * Tells if this campaign is a campaign that has ERC20 tokens as rewards and
   * if all tokens get those tokens (meaning that tokens are claimable at any time).
   */
  public campaignHasERC20RewardForAll(): boolean {
    return this.campaignInfo.hasERC20Reward() && this.campaignInfo.distributedToAllUsers();
  }

  public canClaimERC20Tokens(): boolean {
    return this.campaignInfo && this.campaignInfo.hasERC20Reward() &&
      this.rewardsStatus && this.rewardsStatus.erc20.claimableTokens > 0;
  }

  public async claimERC20Tokens() {
    this.claimingERC20Tokens = true;

    let newRewardsStatus = await this.campaignsService.claimERC20RewardTokens(this.joinedCampaign.id);
    if (newRewardsStatus)
      this.rewardsStatus = newRewardsStatus;

    this.claimingERC20Tokens = false;
  }
}
