import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { FilePickerAdapter, FilePreviewModel } from 'ngx-awesome-uploader';
import { ClipboardService } from 'ngx-clipboard';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { Campaign } from 'src/app/model/campaigns/campaign';
import { CampaignAction } from 'src/app/model/campaigns/campaignaction';
import { CampaignStats } from 'src/app/model/campaigns/campaignstats';
import { ERC20Token } from 'src/app/model/erc20token';
import { File } from 'src/app/model/file';
import { Project } from 'src/app/model/project';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignActionService } from 'src/app/services/campaignactions.service';
import { FilesService } from 'src/app/services/files.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { AirdropDepositCheckResponse, TokensService } from 'src/app/services/tokens.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';
import { ActionEditionCompletionEvent } from './component/action-editor/action-editor.component';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  // Params
  private projectId: number;
  private campaignId: number;

  public project: Project;
  public campaign: Campaign;
  public campaignStats: CampaignStats;
  public campaignActions: CampaignAction[] = [];
  public tokens: ERC20Token[] = [];
  public editingBanner = false;
  public fetchingCampaignActions = false;
  private creatingCampaignAction = false;
  public editedCampaignAction: CampaignAction = null;
  public downloadingReport = false;
  public creatingAirdropContract = false;
  public depositingERC20Tokens = false;
  public erc20TokensInContract = -1 // Number of ERC20 tokens currently in the airdrop contract, if published.

  public uploadAdapter: FilePickerAdapter;

  private locationOrigin: string;

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;

  public modelToDate: NgbDateStruct;
  public modelFromDate: NgbDateStruct;
  public minDate = null;

  public rewardTypes = this.campaignsService.getAvailableRewardTypes();
  public distributionModes = this.campaignsService.getAvailableDistributionModes();
  public mediums = this.campaignsService.getAvailableMediums();

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private campaignActionsService: CampaignActionService,
    private tokensService: TokensService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private filesService: FilesService,
    private networksService: NetworksService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = parseInt(params['projectId']);
      this.campaignId = parseInt(params['campaignId']);

      this.locationOrigin = window.location.origin;

      // Fetch the latest project info (this url can be opened directly)
      this.projectsService.fetchProjects().then(async projects => {
        this.project = projects.find(p => p.id === this.projectId);

        if (this.project) {
          // Prepare the file uploader
          this.uploadAdapter = this.filesService.createGenericPictureUploadAdapter(this.projectId);

          let campaigns = await this.campaignsService.fetchCampaigns(this.project);
          this.campaign = campaigns.find(c => c.id === this.campaignId);
          Logger.log("campaign", "Found campaign:", this.campaign);

          if (this.campaign) {
            this.campaign.loadCampaignDetails();

            this.campaign.campaignStats.subscribe(stats => this.campaignStats = stats);
            this.campaign.campaignActions.subscribe(actions => {
              this.campaignActions = actions;
              if (this.campaignActions != null)
                this.fetchingCampaignActions = false;
            });

            var startDateUnixTime = new Date(this.campaign.start_date * 1000); // get milliseconds convert to NgbDate
            var endDateUnixTime = new Date(this.campaign.end_date * 1000); // get milliseconds convert to NgbDate

            this.fromDate = new NgbDate(startDateUnixTime.getFullYear(), startDateUnixTime.getMonth() + 1, startDateUnixTime.getDate());
            this.toDate = new NgbDate(endDateUnixTime.getFullYear(), endDateUnixTime.getMonth() + 1, endDateUnixTime.getDate());
          }

          this.tokens = await this.tokensService.fetchProjectTokens(this.project.id);

          this.tokensService.retryToConfirmTokensDepositIfNeeded(this.projectId, this.campaignId).then(depositConfirmed => {
            this.handleDepositConfirmed(depositConfirmed);
          })
        }
      });
    });
  }

  public getCampaignUrl(): string {
    return `${this.locationOrigin}/r/${this.campaign.referral_code}`;
  }

  public goBack() {
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }

  public async onNameEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "name", editBox.value);
  }

  public async onPresentationEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "presentation", editBox.value);
  }

  public onInitAmountEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "initial_amount", editBox.value);
  }

  public onL1TokenAmountEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "l1_token_amount", editBox.value);
  }

  public onL2TokenAmountEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "l2_token_amount", editBox.value);
  }

  public onL3TokenAmountEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "l3_token_amount", editBox.value);
  }

  public async onPromoLinkEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "promo_link", editBox.value);
  }

  public async onRulesEdited(editBox: SimpleBoxEditComponent) {
    this.saveCampaignField(editBox, "rules", editBox.value);
  }

  public async onRewardTypeEdited(editBox: SimpleBoxEditComponent) {
    this.campaign.reward_type = <string>editBox.value;
    this.saveCampaignField(editBox, "reward_type", editBox.value);
  }

  public async onMediumEdited(editBox: SimpleBoxEditComponent) {
    this.campaign.medium = <string>editBox.value;
    this.saveCampaignField(editBox, "medium", editBox.value);
  }

  public async onDistributionEdited(editBox: SimpleBoxEditComponent) {
    this.campaign.distribution = <string>editBox.value;
    this.saveCampaignField(editBox, "distribution", editBox.value);
  }

  public async onERC20AirdropTotalAmountEdited(editBox: SimpleBoxEditComponent) {
    this.campaign.erc20_expected_tokens_count = <string>editBox.value;
    this.saveCampaignField(editBox, "erc20_expected_tokens_count", editBox.value);
  }

  private async saveCampaignField(editBox: SimpleBoxEditComponent, key: string, value: number | string) {
    if (editBox)
      editBox.setSaving(true);

    await this.campaignsService.updateCampaignInfo(this.projectId, this.campaignId, key, value);

    if (editBox)
      editBox.setSaving(false);
  }

  public copyCampaignUrlToClipboard() {
    this.clipboard.copy(this.getCampaignUrl());
    this.toast.info("Copied to clipboard!");
  }

  public async createToken() {
    let token = await this.tokensService.createProjectToken(this.project, "Project token");
    if (token) // "ic" stands for "initiating campaign"
      this.router.navigateByUrl(`/project/${this.project.id}/token/${token.id}?ic=${this.campaignId}`)
  }

  public async selectToken(token: ERC20Token) {
    this.campaign.token = token;
    this.campaignsService.updateCampaignInfo(this.projectId, this.campaignId, "tokenId", token.id);
  }

  public hasBanner(): boolean {
    return !!this.campaign.banner;
  }

  public getBannerPath(): string {
    return this.filesService.getFileDownloadPath(this.campaign.banner);
  }

  public toggleEditBanner() {
    this.editingBanner = !this.editingBanner;
  }

  public async onBannerUploaded(successResponse: FilePreviewModel) {
    if (successResponse && successResponse.uploadResponse) {
      let uploadedFile: File = successResponse.uploadResponse.file;
      Logger.log("campaign", "Banner picture was uploaded", uploadedFile);

      this.campaign.banner = uploadedFile;

      await this.saveCampaignField(null, "bannerId", uploadedFile.id);

      this.editingBanner = false;
    }
  }

  /*
    Select start and end date and save it in db
  */
  public async onDateSelection(selectedDate: NgbDate, from: string) {
    var date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).getTime() / 1000; // from milliseconds to seconds

    if (from == 'startdate') {
      this.fromDate = selectedDate;
      await this.campaignsService.updateCampaignInfo(this.projectId, this.campaignId, 'start_date', date);
      if (selectedDate.after(this.toDate)) {
        var newEndDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day + 1).getTime() / 1000; // from milliseconds to seconds
        this.toDate = this.calendar.getNext(selectedDate, 'm', 1);
        await this.campaignsService.updateCampaignInfo(this.projectId, this.campaignId, 'end_date', newEndDate);
      }
    } else {
      if (!this.fromDate) {
        this.toast.error("Please select start date");
      } else if (this.fromDate && selectedDate.after(this.fromDate)) {
        this.toDate = selectedDate;
        await this.campaignsService.updateCampaignInfo(this.projectId, this.campaignId, 'end_date', date);
      } else {
        this.modelToDate = { day: this.toDate.day, year: this.toDate.year, month: this.toDate.month };
        this.toast.error("End date cannot early than start date");
      }

    }
  }

  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  public async createCampaignAction() {
    if (this.creatingCampaignAction)
      return;

    this.creatingCampaignAction = true;

    // TODO: dropdown to pick the type
    let campaignAction = await this.campaignActionsService.createCampaignAction(this.project, this.campaign, "twitter_follow");
    if (campaignAction)
      this.campaignActions.push(campaignAction);

    this.creatingCampaignAction = false;
  }

  public async onActionEditionCompleted(event: ActionEditionCompletionEvent) {
    if (event.status === "done") {
      await this.updateCampaignAction(event.action);
    }
    else if (event.status === "deleted") {
      await this.deleteCampaignAction(event.action);
    }

    this.editedCampaignAction = null;
  }

  private async updateCampaignAction(action: CampaignAction): Promise<void> {
    // Save
    await this.campaignActionsService.updateCampaignAction(this.projectId, this.campaignId, action);

    // Update local entry
    this.campaignActions = this.campaignActions.map(a => {
      if (a.id !== action.id) {
        return a;
      }
      else {
        return Object.assign({}, a, {
          type: action.type,
          configuration: action.configuration
        });
      }
    })
  }

  private async deleteCampaignAction(action: CampaignAction): Promise<void> {
    // Delete on the backend
    await this.campaignActionsService.deleteCampaignAction(this.projectId, this.campaignId, action);

    // Update local entry
    this.campaignActions.splice(this.campaignActions.findIndex(a => a.id === action.id), 1);
  }

  public getCampaignActionSummary(action: CampaignAction): string {
    return this.campaignActionsService.getCampaignActionSummary(action);
  }

  public editCampaignAction(action: CampaignAction) {
    this.editedCampaignAction = action;
  }

  public isERC20TokensCampaign() {
    return this.campaign.reward_type == 'erc20_tokens';
  }

  public async downloadReport() {
    if (this.downloadingReport)
      return;

    // Download the report
    this.downloadingReport = true;
    let report = await this.campaignsService.downloadReport(this.projectId, this.campaignId);
    this.downloadingReport = false;

    // Create downloadable blob
    let theJSON = JSON.stringify(report, null, 2);
    let blob = new Blob([theJSON], { type: 'text/json' });
    let url = window.URL.createObjectURL(blob);

    // Download in browser
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    a.click();
  }

  public async createCampaignERC20AirdropContract() {
    this.creatingAirdropContract = true;
    let createdContractInfo = await this.tokensService.createAirdropContract(this.projectId, this.campaignId);
    if (createdContractInfo) {
      this.campaign.erc20_airdrop_contract_address = createdContractInfo.contractAddress;
    }
    this.creatingAirdropContract = false;
  }

  public async depositAirdropERC20Tokens() {
    this.depositingERC20Tokens = true;
    let depositConfirmed = await this.tokensService.depositTokensToAirdropContract(this.projectId, this.campaignId);
    this.handleDepositConfirmed(depositConfirmed);
    this.depositingERC20Tokens = false;
  }

  private handleDepositConfirmed(depositConfirmed: AirdropDepositCheckResponse) {
    if (depositConfirmed.depositConfirmed)
      this.campaign.erc20_airdrop_contract_discovered_at = moment(depositConfirmed.erc20_airdrop_deposit_discovered_at).toDate();
  }

  public getDisplayableTokenNetwork(token: ERC20Token): string {
    return this.networksService.getNetworkById(token.chain_id).name;
  }
}
