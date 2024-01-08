/**
 * Required External Modules and Interfaces
 */
 import { Router } from "express";
 import { apiError } from "../common/api";
 import { hasError, invalidParamError } from "../common/dataorerror";
 import { authMiddleware } from "../middleware/auth.middleware";
 import { discordService } from "./service";
 
 type RequestTokenBody = {
     callbackUrl: string;
 }
 
 type RequestTokenResponse = {
      url: string;
 }
 
 type AuthorizedBody = {
     oAuthToken: string;
 }
 
 type AuthorizedResponse = {
     userName: string;
 }
 
 export const configureDiscordRoutes = (router: Router): void => {
     /**
      * Request an oauth token in order to ask the user to authorize our app for discord (step 1 of the oauth flow)
      */
     router.post<any, RequestTokenResponse, RequestTokenBody>('/discord/oauth/request_token', authMiddleware, async (req, res) => {
       
        let callbackUrl = req.body.callbackUrl;
		if (!callbackUrl)
             return apiError(res, invalidParamError("callbackUrl is missing"));
 
        let authLinkOrError = await discordService.requestAuthToken( callbackUrl);
        if (hasError(authLinkOrError))
            return apiError(res, authLinkOrError);
        res.json({callbackUrl:authLinkOrError.data.callbackUrl});
  
     });
 
     /**
      * After a client side user authorization, the client submits his discord authentication keys so that we can verify them and
      * access the discord ID.
      */
     router.post<any, AuthorizedBody, AuthorizedResponse >('/discord/oauth/authorized', authMiddleware, async (req, res) => {
      
        let oAuthToken = req.body.oAuthToken;
        let callbackUrl = req.body.callbackUrl;
        if (!oAuthToken)
            return apiError(res, invalidParamError("oAuthToken is missing"));
         let resultOrError = await discordService.handleAuthorized(req.account, req, oAuthToken,callbackUrl);
         if (hasError(resultOrError))
             return apiError(res, resultOrError);
 
         res.json({
             userName: resultOrError.data.userName
         });
     });
}
 
 