import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'wallet-sign-in',
  templateUrl: './wallet-sign-in.component.html',
  styleUrls: ['./wallet-sign-in.component.scss']
})
export class WalletSignInComponent {
  @Output()
  public connected = new EventEmitter<void>();

  public signingIn = false;
  public walletAddress = null;

  constructor(
    private accountService: AccountService,
    private web3Service: Web3Service,
    private zone: NgZone
  ) {
    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      this.zone.run(() => {
        if (accounts && accounts.length > 0) {
          this.walletAddress = accounts[0];
          Logger.log("signin", "Updated wallet address to:", this.walletAddress);
        }
      });
    });
  }

  public async signIn() {
    this.signingIn = true;
    let signedIn = await this.accountService.signIn();
    this.signingIn = false;

    if (signedIn)
      this.connected?.emit();
  }
}
