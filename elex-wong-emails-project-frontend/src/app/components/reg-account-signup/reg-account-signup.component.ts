import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'reg-account-signup',
  templateUrl: './reg-account-signup.component.html',
  styleUrls: ['./reg-account-signup.component.scss']
})
export class RegularAccountSignupComponent {
  @Output()
  public registered = new EventEmitter<void>();

  public walletAddress = "";
  public networkName = "";
  public signingUp = false;
  public forwardEmail = "";
  public referCode = "";

  constructor(
    private accountService: AccountService,
    private web3Service: Web3Service
  ) {
    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      if (accounts && accounts.length > 0)
        this.walletAddress = accounts[0];
    });
  }


  public readyToCreateAccount(): boolean {
    return !!this.forwardEmail;
  }

  public async signUp() {
    this.signingUp = true;
    let createdAccount = await this.accountService.createAccount(this.forwardEmail);
    this.signingUp = false;

    if (createdAccount)
      this.registered?.emit();
  }
}
