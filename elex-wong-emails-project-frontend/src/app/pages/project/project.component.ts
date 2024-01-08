import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerAdapter, FilePreviewModel } from 'ngx-awesome-uploader';
import { ClipboardService } from 'ngx-clipboard';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { CampaignJson } from 'src/app/model/campaigns/campaign';
import { CampaignType } from 'src/app/model/campaigns/campaigntype';
import { EmailTemplate } from 'src/app/model/emailtemplate';
import { ERC20Token } from 'src/app/model/erc20token';
import { File } from 'src/app/model/file';
import { Project } from 'src/app/model/project';
import { ProjectEmailing } from 'src/app/model/projectemailing';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { EmailingService } from 'src/app/services/emailing.service';
import { FilesService } from 'src/app/services/files.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectEmailingService } from 'src/app/services/project-emailing.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokensService } from 'src/app/services/tokens.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  private projectId: number;
  public project: Project = null;
  public fetchingProjects = true;

  public campaigns: CampaignJson[] = [];
  public fetchingCampaigns = true;

  public tokens: ERC20Token[] = [];
  public fetchingTokens = true;

  public emailTemplates: EmailTemplate[] = [];
  public fetchingEmailTemplates = true;

  public projectEmailing: ProjectEmailing[] = [];
  public fetchingProjectEmailing = true;

  private activeModalRef: NgbModalRef;

  public categories: CampaignType[] = [
    { id: 'defi', name: 'DeFi' },
    { id: 'gameFi', name: 'GameFi' },
    { id: 'socialfi', name: 'SocialFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'exchange', name: 'Exchange' },
    { id: 'nftexchange', name: 'NFT Exchange' },
    { id: 'publicchain', name: 'Public Chain' },
    { id: 'token', name: 'Token' },
    { id: 'other', name: 'Other' },
  ]
    ;

  public editingLogo = false;
  public uploadAdapter: FilePickerAdapter;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private tokensService: TokensService,
    private emailingService: EmailingService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private networksService: NetworksService,
    private modalService: NgbModal,
    private filesService: FilesService,
    private projectEmailingService: ProjectEmailingService,
  ) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = parseInt(params['projectId']);

      // Fetch the latest project info (this url can be opened directly)
      this.projectsService.fetchProjects().then(async projects => {
        this.fetchingProjects = false;
        this.project = projects.find(p => p.id === this.projectId);

        if (this.project) {
          this.campaigns = await this.campaignsService.fetchCampaigns(this.project);
          this.fetchingCampaigns = false;

          this.tokens = await this.tokensService.fetchProjectTokens(this.project.id);
          this.fetchingTokens = false;

          this.emailTemplates = await this.emailingService.fetchEmailTemplates(this.project);
          this.fetchingEmailTemplates = false;

          this.projectEmailing = await this.projectEmailingService.fetchEmailTemplates(this.project);
          this.fetchingProjectEmailing = false;

          this.uploadAdapter = this.filesService.createGenericPictureUploadAdapter(this.projectId);
        }
      });
    });
  }

  public editCampaign(campaign: CampaignJson) {
    this.router.navigateByUrl("/project/" + this.projectId + "/campaign/" + campaign.id);
  }

  async createCampaign() {
    this.router.navigateByUrl(`/project/${this.project.id}/create-campaign`);
  }
  async archiveCampign(campaign: CampaignJson) {
    this.fetchingCampaigns = true;
    let response = await this.campaignsService.updateCampaignInfo(this.projectId, campaign.id, 'is_archived', 'true');

    if (response)
      this.campaigns = await this.campaignsService.fetchCampaigns(this.project);
    this.fetchingCampaigns = false;

  }

  public goBack() {
    this.router.navigateByUrl(`/account-info`);
  }

  public async onNameEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "name", editBox.value);
  }

  public async onTwitterEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "twitter_id", editBox.value);
  }

  public async onURLEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "url", editBox.value);
  }

  public async onCategoryEdited(editBox: SimpleBoxEditComponent) {
    this.saveProjectField(editBox, "category", editBox.value);
  }

  private async saveProjectField(editBox: SimpleBoxEditComponent, key: string, value: number | string) {
    editBox.setSaving(true);
    await this.projectsService.updateProjectInfo(this.projectId, key, value);
    editBox.setSaving(false);
  }

  public async createToken() {
    let token = await this.tokensService.createProjectToken(this.project, "Project token");
    if (token)
      this.router.navigateByUrl(`/project/${this.project.id}/token/${token.id}`)
  }

  public editToken(token: ERC20Token) {
    this.router.navigateByUrl("/project/" + this.projectId + "/token/" + token.id);
  }

  public openPop(content) {
    this.activeModalRef = this.modalService.open(content);
  }

  public async createProjectAPIKey() {
    let newApiKey = await this.projectsService.createAPIKey(this.projectId);
    this.project.api_key = newApiKey;
  }

  public async renewProjectAPIKey() {
    await this.createProjectAPIKey();
    this.activeModalRef.close();
  }

  public copyProjectAPIKey() {
    this.clipboard.copy(this.project.api_key);
    this.toast.info("API key copied to clipboard!");
  }

  public async createEmailTemplate() {
    let newTemplate = await this.emailingService.createEmailTemplate(this.project, "My email template");
    if (newTemplate) {
      this.emailTemplates.push(newTemplate);
      this.router.navigateByUrl(`/project/${this.project.id}/emailtemplate/${newTemplate.id}`);
    }
  }

  public editEmailTemplate(template: EmailTemplate) {
    this.router.navigateByUrl("/project/" + this.projectId + "/emailtemplate/" + template.id);
  }

  public async createProjectEmailing() {
    let newEmailing = await this.projectEmailingService.createEmailTemplate(this.project, "My Email Communication");
    if (newEmailing) {
      this.projectEmailing.push(newEmailing);
      this.router.navigateByUrl(`/project/${this.project.id}/emailcommunication/${newEmailing.id}`);
    }
  }

  public editProjectEmailing(emailing: ProjectEmailing) {
    this.router.navigateByUrl("/project/" + this.projectId + "/emailcommunication/" + emailing.id);
  }

  public hasLogo(): boolean {
    return !!this.project.logo;
  }

  public getLogoPath(): string {
    return this.filesService.getFileDownloadPath(this.project.logo);
    return 'sd';
  }

  public toggleEditLogo() {
    this.editingLogo = !this.editingLogo;
  }

  public async onLogoUploaded(successResponse: FilePreviewModel) {
    if (successResponse && successResponse.uploadResponse) {
      let uploadedFile: File = successResponse.uploadResponse.file;
      console.log("campaign", "Logo was uploaded", uploadedFile);

      this.project.logo = uploadedFile;

      await this.projectsService.updateProjectInfo(this.projectId, 'logoId', uploadedFile.id);
      this.editingLogo = false;
    }
  }
}
