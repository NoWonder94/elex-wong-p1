import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { Project } from 'src/app/model/project';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  // Params
  public project: Project;

  // Selectable items
  public rewardTypes = this.campaignsService.getAvailableRewardTypes();
  public distributionModes = this.campaignsService.getAvailableDistributionModes();
  public mediums = this.campaignsService.getAvailableMediums();

  // Model
  public rewardType = 'erc20_tokens';
  public distribution = 'all_users';
  public medium = 'link_sharing';
  public creatingCampaign = false;

  constructor(private router: Router,
    private zone: NgZone,
    private accountService: AccountService,
    private campaignsService: CampaignService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      let projectId = parseInt(params['projectId']);

      // Get account
      this.accountService.activeAccount.subscribe(activeAccount => {
        if (activeAccount) { // Wait until account is loaded
          activeAccount.projects.subscribe(projects => {
            if (projects) { // Wait until projects are loaded
              this.project = activeAccount.getProjectById(projectId);
            }
          });
        }
      });
    });
  }

  public goBack() {
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }

  public async onRewardTypeEdited(editBox: SimpleBoxEditComponent) {
    this.rewardType = <string>editBox.value;
  }

  public async onDistributionEdited(editBox: SimpleBoxEditComponent) {
    this.distribution = <string>editBox.value;
  }

  public async onMediumEdited(editBox: SimpleBoxEditComponent) {
    this.medium = <string>editBox.value;
  }

  public async createCampaign() {
    if (this.creatingCampaign)
      return;

    this.creatingCampaign = true;

    let campaign = await this.campaignsService.createCampaign(this.project.id, {
      name: "My campaign",
      rewardType: this.rewardType,
      distribution: this.distribution,
      medium: this.medium
    });
    if (campaign) {
      //this.campaigns.push(campaign);
      this.router.navigateByUrl(`/project/${this.project.id}/campaign/${campaign.id}`);
    }

    this.creatingCampaign = false;
  }
}
