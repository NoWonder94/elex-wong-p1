import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { ERC20Token } from 'src/app/model/erc20token';
import { Network } from 'src/app/model/networks/network';
import { Project } from 'src/app/model/project';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokensService } from 'src/app/services/tokens.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  // Params
  private projectId: number;
  private tokenId: number;
  public initiatingCampaignId: number = null; // Campaign ID that opened this screen to easily go back to it

  public project: Project;
  public token: ERC20Token;
  public availableNetworks: Network[] = [];
  public savingToken = false;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private tokensService: TokensService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private networksService: NetworksService) {
  }

  async ngOnInit() {
    this.availableNetworks = this.networksService.getAllNetworks();

    this.route.params.subscribe(params => {
      this.projectId = parseInt(params['projectId']);
      this.tokenId = parseInt(params['tokenId']);

      // Fetch the latest project info (this url can be opened directly)
      this.projectsService.fetchProjects().then(async projects => {
        this.project = projects.find(p => p.id === this.projectId);

        let tokens = await this.tokensService.fetchProjectTokens(this.project.id);
        this.token = tokens.find(c => c.id === this.tokenId);
      });
    });

    this.route.queryParamMap.subscribe(params => {
      if (params.has("ic"))
        this.initiatingCampaignId = parseInt(params.get("ic"));
    })
  }

  public goBackToProject() {
    this.router.navigateByUrl(`/project/${this.project.id}`);
  }

  public goBackToCampaign() {
    this.router.navigateByUrl(`/project/${this.project.id}/campaign/${this.initiatingCampaignId}`);
  }

  public async onTitleEdited(editBox: SimpleBoxEditComponent) {
    this.saveTokenField(editBox, "title", editBox.value);
  }

  public onSymbolEdited(editBox: SimpleBoxEditComponent) {
    this.saveTokenField(editBox, "symbol", editBox.value);
  }

  // Example of token address:
  // on elastos mainnet: 0xeceefC50f9aAcF0795586Ed90a8b9E24f55Ce3F3 (Ht on Elastos)
  public async onContractAddressEdited(editBox: SimpleBoxEditComponent) {
    this.token.contract_address = <string>editBox.value;
    this.discoverTokenInfo();
    this.saveTokenField(editBox, "contract_address", editBox.value);
  }

  public onDecimalsEdited(editBox: SimpleBoxEditComponent) {
    this.saveTokenField(editBox, "decimals", editBox.value);
  }

  public selectNetwork(network: Network) {
    this.token.chain_id = network.chainId;
    this.discoverTokenInfo();
    this.saveTokenField(null, "chain_id", this.token.chain_id);
  }

  private async saveTokenField(editBox: SimpleBoxEditComponent = null, key: string, value: number | string | Date) {
    editBox?.setSaving(true);
    await this.tokensService.updateTokenInfo(this.projectId, this.tokenId, key, value);
    editBox?.setSaving(false);
  }

  private async discoverTokenInfo() {
    // Don't try to fetch if not address set yet
    if (!this.token.contract_address)
      return;

    // Try to auto fill the contract information by fetching ERC20 token info from  chain
    let tokenInfo = await this.tokensService.fetchOnChainToken(this.token.chain_id, this.token.contract_address);
    if (tokenInfo) {
      this.token.decimals = tokenInfo.coinDecimals;
      this.saveTokenField(null, "decimals", this.token.decimals);

      this.token.symbol = tokenInfo.coinSymbol;
      this.saveTokenField(null, "symbol", this.token.symbol);

      this.token.title = tokenInfo.coinName;
      this.saveTokenField(null, "title", this.token.title);

      this.toast.info("Token found on chain and info updated");
    }
    else {
      this.toast.warning("Token not found on chain");
    }

  }

  public getNetworkName(chainId: number): string {
    let network = this.networksService.getNetworkById(chainId);
    if (network)
      return network.name;

    return "Uknown network";
  }

  public saveToken() {
    this.savingToken = true;
    this.saveTokenField(null, "activated_at", new Date);

    // Fetch the latest project info (this url can be opened directly)
    this.projectsService.fetchProjects().then(async projects => {
      this.project = projects.find(p => p.id === this.projectId);

      let tokens = await this.tokensService.fetchProjectTokens(this.project.id);
      this.token = tokens.find(c => c.id === this.tokenId);
    });

    this.savingToken = false;
  }
}
