import { Request } from "express";
import { accountService } from "../accounts/service";
import axios from 'axios';

import { convertedError, DataOrError, dataOrErrorData, hasError, serverError } from "../common/dataorerror";
import { environment } from "../generated/environment";
import { Account } from "../generated/prisma/main-schema/index";

type RequestTokenBody = {
    callbackUrl: string;
}

class DiscordService {

  public async requestAuthToken( callbackUrl: string): Promise<DataOrError<RequestTokenBody>> {
    const authLink =  `https://discord.com/api/oauth2/authorize?client_id=${environment.discord.clientId}&redirect_uri=${callbackUrl}&response_type=code&scope=identify`

    return dataOrErrorData({callbackUrl:authLink});
  }

  public async handleAuthorized(account: Account, req: Request, oAuthToken: string, callbackUrl: string): Promise<DataOrError<{ userName: string }>> {

    try {
        const params = new URLSearchParams({
            client_id: environment.discord.clientId,
            client_secret: environment.discord.clientSecret,
            code: oAuthToken,
            grant_type: 'authorization_code',
            redirect_uri: callbackUrl
        });
        const tokenRes = await axios.post('https://discordapp.com/api/oauth2/token', params, {});
        const token = tokenRes.data.access_token;

        const {data} = await axios.get(`https://discord.com/api/v6/users/@me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       
      // Store the discord ID in the account info
      let updatedOrError = await accountService.updateAccountField(account, {
        key: "discord",
        value: data.username
      }, true);
      if (hasError(updatedOrError))
        return convertedError(updatedOrError);

      return dataOrErrorData({
        userName:  data.username
      });
    }
    catch (e) {
      return serverError("Discord authorized error", e);
    }
  }
}

export const discordService = new DiscordService();