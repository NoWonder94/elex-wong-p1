import { Injectable } from '@angular/core';
import { Logger } from 'src/app/utils/logger';
import { HttpService } from '../../services/http.service';

export type WalletInfo = {
  address: string;
  privateKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminWalletService {

  constructor(
    private http: HttpService
  ) { }

  public async init(): Promise<void> {
    Logger.log("adminwallet", "Admin wallet service is initializing");
    return;
  }

  public loadWalletInfo(): WalletInfo {
    let storedInfo = localStorage.getItem("admin_wallet_info");
    if (storedInfo)
      return JSON.parse(storedInfo);
    else
      return {
        address: null,
        privateKey: null
      };
  }

  private saveWalletInfo(walletInfo: WalletInfo) {
    localStorage.setItem("admin_wallet_info", JSON.stringify(walletInfo));
  }

  public savePrivateKey(privateKey: string) {
    let walletInfo = this.loadWalletInfo();
    walletInfo.privateKey = privateKey;
    this.saveWalletInfo(walletInfo);
  }

  public saveAddress(address: string) {
    let walletInfo = this.loadWalletInfo();
    walletInfo.address = address;
    this.saveWalletInfo(walletInfo);
  }

  public getWalletAddress(): string {
    let walletInfo = this.loadWalletInfo();
    return walletInfo.address;
  }

  public getWalletPrivateKey(): string {
    let walletInfo = this.loadWalletInfo();
    return walletInfo.privateKey;
  }
}