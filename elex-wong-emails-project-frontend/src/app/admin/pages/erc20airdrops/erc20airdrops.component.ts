import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERC20TokenAirdropEvent } from '../../model/erc20airdropevent';
import { AdminERC20AirdropsService } from '../../services/erc20airdrops.service';

@Component({
  selector: 'erc20airdrops',
  templateUrl: './erc20airdrops.component.html',
  styleUrls: ['./erc20airdrops.component.scss']
})
export class AdminERC20airdropsComponent implements OnInit {
  public airdrops: ERC20TokenAirdropEvent[] = [];

  constructor(
    private router: Router,
    private adminERC20AirdropService: AdminERC20AirdropsService
  ) {
  }

  async ngOnInit() {
    this.adminERC20AirdropService.fetchUnhandledAirdrops().then(airdrops => this.airdrops = airdrops);
  }

  public goBackToAdminHome() {
    this.router.navigateByUrl("/admin/home");
  }
}
