import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  public walletAddress: string = null;
  public forwardEmail = "";
  public referCode: string = null;
  public accountExists = false;

  private routeSub: Subscription;

  // Expected url: https://www.emails.com/register/?referCode=123
  constructor(private router: Router,
    private web3Service: Web3Service,
    private accountService: AccountService,
    private zone: NgZone,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.routeSub = this.route
      .queryParamMap
      .subscribe(params => {
        if (params.has("referCode"))
          this.referCode = params.get("referCode");
      });

    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      this.zone.run(() => {
        if (accounts.length > 0)
          this.walletAddress = accounts[0];
        else
          this.walletAddress = null;
      });
    });

    this.accountService.accountStatus.subscribe(accountStatus => {
      this.accountExists = (accountStatus.statusChecked && accountStatus.exists);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public async onAccountCreated() {
    let emailsent = await this.accountService.verifyAccount();
    this.router.navigate(['/account-info', { emailsent: emailsent }]);
  }

  public onConnected() {
    this.router.navigateByUrl("/account-info");
  }
}
