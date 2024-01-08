import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'top-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {
  public signedIn = false;
  public account: Account = null;

  constructor(
    private accountService: AccountService,
    private zone: NgZone,
    private router: Router
  ) {
    accountService.activeAccount.subscribe(account => {
      this.account = account;
      this.signedIn = !!account;
    })
  }

  public myAccount() {
    this.router.navigateByUrl("/account-info");
  }

  public connect() {
    this.router.navigateByUrl("/connect");
  }

  public signOut() {
    this.accountService.signOut();
  }

  public openAdminDashboard() {
    this.router.navigateByUrl("/admin/home");
  }
}
