import { Component, NgZone } from '@angular/core';
import { AdminERC20AirdropsService } from './admin/services/erc20airdrops.service';
import { AccountService } from './services/account.service';
import { CampaignService } from './services/campaign.service';
import { NetworksService } from './services/networks.service';
import { ProjectService } from './services/project.service';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private networksService: NetworksService,
    private web3Service: Web3Service,
    private accountService: AccountService,
    private projectService: ProjectService,
    private campaignsService: CampaignService, // static instance init
    private adminERC20AirdropService: AdminERC20AirdropsService,
    private zone: NgZone
  ) {
    void this.web3Service.init();
    void this.networksService.init();
    void this.accountService.init();
    void this.projectService.init();

    // ADMIN
    void this.adminERC20AirdropService.init();
  }

  ngOnInit() {
  }

  public reachTop() {
    window.scrollTo(0, 0);
  }
}
