import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AnimationOptions } from 'ngx-lottie';
import sleep from 'sleep-promise';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { FilesService } from 'src/app/services/files.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { RefCodeService } from 'src/app/services/refcode.service';
import { ToastService } from 'src/app/services/toast.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/106457-logo-dropbox.json'
  }

  public walletAddress: string = null;
  public accountExists = false;
  public activeAccount: Account = null;
  public verificationKey: string = null;

  public fetchingInformation = true;
  public invalidKey = false;
  public emailSuccessfullyVerified = false;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectsService: ProjectService,
    private campaignsService: CampaignService,
    private refCodeService: RefCodeService,
    private clipboard: ClipboardService,
    private toast: ToastService,
    private filesService: FilesService,
    private networksService: NetworksService) {
  }

  async ngOnInit() {
    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      if (accounts.length > 0)
        this.walletAddress = accounts[0];
      else
        this.walletAddress = null;
    });

    this.accountService.accountStatus.subscribe(accountStatus => {
      this.accountExists = (accountStatus.statusChecked && accountStatus.exists);
    });

    this.accountService.activeAccount.subscribe(account => {
      this.activeAccount = account;
    });

    this.route.queryParamMap.subscribe(async params => {
      this.verificationKey = params.get('key');

      if (!this.verificationKey) {
        this.invalidKey = true;
        this.fetchingInformation = false;
        return;
      }

      await this.verifyEmailWithDelay();

      this.fetchingInformation = false;

      if (this.emailSuccessfullyVerified) {
        setTimeout(() => {
          this.router.navigateByUrl(`/account-info`);
        }, 2000);
      }
    });
  }

  private verifyEmailWithDelay() {
    return Promise.all([
      sleep(2000), // Wait min 2s to show the spinner
      this.verifyEmail()
    ]);
  }

  /**
   * Check on the backend if the verification key is valid.
   */
  private async verifyEmail(): Promise<void> {
    this.emailSuccessfullyVerified = await this.accountService.checkEmailVerificationKey(this.verificationKey);
    if (!this.emailSuccessfullyVerified)
      this.invalidKey = true;
  }
}
