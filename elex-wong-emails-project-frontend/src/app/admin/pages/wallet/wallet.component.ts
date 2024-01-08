import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleBoxEditComponent } from 'src/app/components/simple-box-edit/simple-box-edit.component';
import { AdminWalletService, WalletInfo } from '../../services/wallet.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class AdminWalletComponent implements OnInit {

  public walletInfo: WalletInfo = null;

  constructor(private router: Router,
    private adminWalletservice: AdminWalletService) {
  }

  async ngOnInit() {
    this.walletInfo = this.adminWalletservice.loadWalletInfo();
  }

  public onPrivateKeyEdited(editBox: SimpleBoxEditComponent) {
    this.adminWalletservice.savePrivateKey(<string>editBox.value);
  }

  public onAddressEdited(editBox: SimpleBoxEditComponent) {
    this.adminWalletservice.saveAddress(<string>editBox.value);
  }

  public goBackToAdminHome() {
    this.router.navigateByUrl("/admin/home");
  }
}
