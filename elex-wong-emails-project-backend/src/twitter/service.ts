import { Request } from "express";
import { Agent } from "https";
import { SocksProxyAgent } from "socks-proxy-agent";
import { IClientSettings, TwitterApi } from "twitter-api-v2";
import { accountService } from "../accounts/service";

import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { environment } from "../generated/environment";
import { Account } from "../generated/prisma/main-schema/index";

// TwitterApiV2Settings.debug = true; // To get verbose network calls and info from the twitter lib

export type PublicTwitterAuthLink = {
  url: string;
}

/*
  authLink {
    url: 'https://api.twitter.com/oauth/authorize?oauth_token=LjYcrgAAAAABd7haAAABgXxJFfg',
    oauth_token: 'LjYcrgAAAAABd7haAAABgXxJFfg',
    oauth_token_secret: 'ONXVWNJGrJ9UTEpnRelP2tWeCu4uMVWp',
    oauth_callback_confirmed: 'true'
  }
*/
export type TwitterAuthLink = PublicTwitterAuthLink & {
  oauth_token: string;
  oauth_token_secret: string;
}

class TwitterService {
  // Simple memory cache for twitter authentication logic.
  private authKeys: { [accountId: number]: TwitterAuthLink } = {};

  public async requestAuthToken(account: Account, req: Request, callbackUrl: string): Promise<DataOrError<TwitterAuthLink>> {
    const client = new TwitterApi({ appKey: environment.twitter.appKey, appSecret: environment.twitter.appSecret }, this.getTwitterApiSettings());

    // By default, oauth/authenticate are used for auth links, we can change with linkMode
    // property in second parameter to 'authorize' to use oauth/authorize
    const authLink = await client.generateAuthLink(callbackUrl, { linkMode: 'authorize' });

    // Save keys in memory for reuse in the authorized method.
    this.authKeys[account.id] = authLink;

    return dataOrErrorData(authLink);
  }

  public async handleAuthorized(account: Account, req: Request, oAuthToken: string, oAuthVerifier: string): Promise<DataOrError<{ userName: string }>> {
    if (!(this.authKeys[account.id]))
      return invalidParamError("Twitter auth token not found. Was requestAuthToken() called?");

    const savedToken = this.authKeys[account.id].oauth_token;
    const savedSecret = this.authKeys[account.id].oauth_token_secret;

    if (!oAuthToken || !oAuthVerifier || !savedToken || !savedSecret || oAuthToken != savedToken)
      return invalidParamError("Invalid twitter auth state, some mandatory logic data is missing, try again.");

    try {
      // Obtain the persistent tokens
      // Create a client from temporary tokens
      const client = new TwitterApi({
        appKey: environment.twitter.appKey,
        appSecret: environment.twitter.appSecret,
        accessToken: oAuthToken,
        accessSecret: savedSecret,
      }, this.getTwitterApiSettings());

      // Ask for definitive access token and user info - NOTE: not stored for now, we just want the user name
      const { client: loggedClient, accessToken, accessSecret, screenName, userId } = await client.login(oAuthVerifier);

      // Store the twitter ID in the account info
      let updatedOrError = await accountService.updateAccountField(account, {
        key: "twitter",
        value: screenName
      }, true);
      if (hasError(updatedOrError))
        return convertedError(updatedOrError);

      return dataOrErrorData({
        userName: screenName
      });
    }
    catch (e) {
      return serverError("Twitter authorized error", e);
    }
  }

  private getTwitterApiSettings(): Partial<IClientSettings> {
    // The twitter api lib can't work over proxy by default. Need to configure it if needed (eg: from china...)
    let httpAgent: Agent = null;
    if (environment.twitter.socksProxy)
      httpAgent = new SocksProxyAgent(environment.twitter.socksProxy);

    return { httpAgent };
  }
}

export const twitterService = new TwitterService();