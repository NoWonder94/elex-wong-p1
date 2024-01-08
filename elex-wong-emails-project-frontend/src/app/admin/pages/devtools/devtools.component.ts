import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from 'src/app/model/networks/network';
import { NetworksService } from 'src/app/services/networks.service';
import { TransactionReceipt } from 'web3-core';
import { AdminERC20Service } from '../../services/erc20.service';
import { AdminWalletService } from '../../services/wallet.service';

@Component({
  selector: 'devtools',
  templateUrl: './devtools.component.html',
  styleUrls: ['./devtools.component.scss']
})
export class AdminDevToolsComponent implements OnInit {
  public erc20TokenSymbol: string = "TOK";
  public erc20TokenName: string = "My Token";
  public erc20TokenAmount: string = "100000000";

  public network: Network = null;
  public createdERC20TokenReceipt: TransactionReceipt = null;
  public creatingERC20Token = false;

  constructor(private router: Router,
    private networkService: NetworksService,
    private adminERC20Service: AdminERC20Service,
    private adminWalletservice: AdminWalletService) {
  }

  async ngOnInit() {
    this.networkService.activeNetwork.subscribe(network => {
      this.network = network;
    });
  }

  public goBackToAdminHome() {
    this.router.navigateByUrl("/admin/home");
  }

  public canCreateERC20Token(): boolean {
    return !!this.erc20TokenAmount && !!this.erc20TokenSymbol && !!this.erc20TokenName;
  }

  public async createERC20Token() {
    this.creatingERC20Token = true;
    this.createdERC20TokenReceipt = await this.adminERC20Service.createERC20Token(this.erc20TokenSymbol, this.erc20TokenName, this.erc20TokenAmount);
    this.creatingERC20Token = false;
  }

  public getERC20ButtonTitle(): string {
    return 'Create ERC20 token on ' + this.network.name;
  }
}
