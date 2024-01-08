import {
  Injectable
} from '@angular/core';
import { hasError } from '../model/dataorerror';
import { Logger } from '../utils/logger';
import { AccountService } from './account.service';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type AuthenticateResponse = {
  callbackUrl: string;
}

type AuthorizedResponse = {
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  constructor(
    private toast: ToastService,
    private http: HttpService,
    private accountService: AccountService
  ) { }

  /**
   * Launches the discord authentication flow by requesting authorization to the user to let the
   * emails.com app access his discord ID
   */
  public async authenticate(): Promise<void> {
    Logger.log("discord", "Starting discord authentication flow");

    let currentUrl = new URL(window.location.href).origin;
    let resultOrError = await this.http.backEndJsonPost<AuthenticateResponse>(`/discord/oauth/request_token`, {
      callbackUrl: `${currentUrl}/discord/returned`
    });
    if (!hasError(resultOrError)) {
      let authLink = resultOrError.data.callbackUrl;
      Logger.log("discord", "Got authentication link", authLink);

      window.location.href = authLink;
    }
    else {
      this.toast.error("Failed to launch discord authentication");
    }
  }

  /**
   * After a successful user authorization on discord oauth, post user's oauth info to the backend
   * for verification and retrieval of the discord ID
   */
  public async postAuthorizationCredentials(oAuthToken: string,): Promise<string> {
    let currentUrl = new URL(window.location.href).origin;

    let resultOrError = await this.http.backEndJsonPost<AuthorizedResponse>(`/discord/oauth/authorized`, {
      oAuthToken,
      callbackUrl: `${currentUrl}/discord/returned`
    });
    if (!hasError(resultOrError)) {
      Logger.log("discord", "Got authorized response");
      let discordName = resultOrError.data.userName;
      this.accountService.activeAccount.value.discord = discordName;
      this.accountService.emitAccountModified();
      return discordName;
    }
    else {
      this.toast.error("Failed to finalize discord authentication");
      return null;
    }
  }
}
