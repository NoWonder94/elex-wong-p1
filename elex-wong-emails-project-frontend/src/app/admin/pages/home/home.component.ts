import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStats } from 'src/app/admin/model/globalstats';
import { AdminStatsService } from 'src/app/admin/services/stats.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  public stats: GlobalStats = null;

  constructor(
    private adminStatsService: AdminStatsService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.adminStatsService.fetchGlobalStats().then(stats => this.stats = stats);
  }

  public showERC20Airdrops() {
    this.router.navigateByUrl("/admin/erc20airdrops");
  }

  public showWallet() {
    this.router.navigateByUrl("/admin/wallet");
  }

  public showDevTools() {
    this.router.navigateByUrl("/admin/devtools");
  }
}
