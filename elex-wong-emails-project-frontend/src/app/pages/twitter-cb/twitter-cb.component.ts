import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { FilesService } from 'src/app/services/files.service';
import { NetworksService } from 'src/app/services/networks.service';
import { ProjectService } from 'src/app/services/project.service';
import { RefCodeService } from 'src/app/services/refcode.service';
import { ToastService } from 'src/app/services/toast.service';
import { TwitterService } from 'src/app/services/twitter.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'twitter-callback',
  templateUrl: './twitter-cb.component.html',
  styleUrls: ['./twitter-cb.component.scss']
})
export class TwitterCallbackComponent implements OnInit {
  public activeAccount: Account = null;
  private queryParamsRetrieved = false;
  public fetchingInformation = true;

  // Twitter feedback
  public authDenied = false;
  public authCompleted = false;
  public twitterUserName: string = null;

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
    private twitterService: TwitterService,
    private networksService: NetworksService) {
  }

  async ngOnInit() {
    this.accountService.activeAccount.subscribe(account => {
      this.activeAccount = account;

      if (account) {
        if (this.queryParamsRetrieved)
          return;
        else
          this.queryParamsRetrieved = true;

        // Response types:
        // http://localhost:3220/twitter/returned?denied=mFAwYgAAAAABd7haAAABgYGE4hY
        // http://localhost:3220/twitter/returned?oauth_token=xxxxx&oauth_verifier=yyyyy
        //
        // More info about twitter auth: https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/auth.md
        this.route.queryParamMap.subscribe(async params => {
          let denied = params.get('denied');
          if (denied) {
            Logger.log("twitter-cb", "Authorization request was denied");
            this.authDenied = true;
          }
          else {
            let oauthToken = params.get('oauth_token');
            let oauthVerifier = params.get('oauth_verifier');

            if (oauthToken && oauthVerifier) {
              this.twitterUserName = await this.twitterService.postAuthorizationCredentials(oauthToken, oauthVerifier);
              if (this.twitterUserName) {
                // Redirect to dashboard after some time
                setTimeout(() => {
                  this.router.navigateByUrl(`/account-info`);
                }, 2000);
              }
            }

            this.authCompleted = true;
          }

          this.fetchingInformation = false;
        });
      }
    });
  }
}
