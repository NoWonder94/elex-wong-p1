import {
  Injectable
} from '@angular/core';
import { hasError } from '../model/dataorerror';
import { TwitterAuthLink } from '../model/twitterauthlink';
import { Logger } from '../utils/logger';
import { AccountService } from './account.service';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type AuthenticateResponse = {
  authLink: TwitterAuthLink; // TODO: REMOVE THE TOKEN FROM THIS RESPONSE
}

type AuthorizedResponse = {
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  constructor(
    private toast: ToastService,
    private http: HttpService,
    private accountService: AccountService
  ) { }

  /**
   * Launches the twitter authentication flow by requesting authorization to the user to let the
   * emails.com app access his twitter ID
   */
  public async authenticate(): Promise<void> {
    Logger.log("twitter", "Starting twitter authentication flow");

    let currentUrl = new URL(window.location.href).origin;
    let resultOrError = await this.http.backEndJsonPost<AuthenticateResponse>(`/twitter/oauth/request_token`, {
      callbackUrl: `${currentUrl}/twitter/returned`
    });
    if (!hasError(resultOrError)) {
      let authLink = resultOrError.data.authLink;
      Logger.log("twitter", "Got authentication link", authLink.url);

      window.location.href = authLink.url;
    }
    else {
      this.toast.error("Failed to launch twitter authentication");
    }
  }

  /**
   * After a successful user authorization on twitter oauth, post user's oauth info to the backend
   * for verification and retrieval of the twitter ID
   */
  public async postAuthorizationCredentials(oAuthToken: string, oAuthVerifier: string): Promise<string> {
    let resultOrError = await this.http.backEndJsonPost<AuthorizedResponse>(`/twitter/oauth/authorized`, {
      oAuthToken,
      oAuthVerifier
    });
    if (!hasError(resultOrError)) {
      Logger.log("twitter", "Got authorized response");
      let twitterName = resultOrError.data.userName;
      this.accountService.activeAccount.value.twitter = twitterName;
      this.accountService.emitAccountModified();
      return twitterName;
    }
    else {
      this.toast.error("Failed to finalize twitter authentication");
      return null;
    }
  }
}
