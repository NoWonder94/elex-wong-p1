import { Component, NgZone } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent {
  public connectingWallet = false;

  constructor(
    private accountService: AccountService,
    private web3Service: Web3Service,
    private zone: NgZone
  ) {
    /* accountService.activeAccount.subscribe(user => {
      this.signedIn = !!user;
    }) */
  }

  public async connectWallet() {
    this.connectingWallet = true;
    await this.web3Service.connectWallet();
    this.connectingWallet = false;
  }
}
