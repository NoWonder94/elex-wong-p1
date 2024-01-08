import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { DiscordService } from 'src/app/services/discord.service';

@Component({
  selector: 'discord-callback',
  templateUrl: './discord-cb.component.html',
  styleUrls: ['./discord-cb.component.scss']
})
export class DiscordCallbackComponent implements OnInit {
  public activeAccount: Account = null;
  private queryParamsRetrieved = false;
  public fetchingInformation = true;

  // discord feedback
  public authDenied = false;
  public authCompleted = false;
  public discordUserName: string = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private discordService: DiscordService) {
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
        // http://localhost:3220/discord/returned?code=vRxDzUtax8icmA6VcI5f2nSvPUs8GD
        //
        this.route.queryParamMap.subscribe(async params => {

            let oauthToken = params.get('code');

            if (oauthToken) {
              this.discordUserName = await this.discordService.postAuthorizationCredentials(oauthToken);
              if (this.discordUserName) {
                // Redirect to dashboard after some time
                setTimeout(() => {
                  this.router.navigateByUrl(`/account-info`);
                }, 2000);
              }
            }

            this.authCompleted = true;


          this.fetchingInformation = false;
        });
      }
    });
  }
}
