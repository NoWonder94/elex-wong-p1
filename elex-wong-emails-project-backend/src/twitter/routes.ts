/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, invalidParamError } from "../common/dataorerror";
import { authMiddleware } from "../middleware/auth.middleware";
import { PublicTwitterAuthLink, twitterService } from "./service";

type RequestTokenBody = {
	callbackUrl: string;
}

type RequestTokenResponse = {
	authLink: PublicTwitterAuthLink;
}

type AuthorizedBody = {
	oAuthToken: string;
	oAuthVerifier: string;
}

type AuthorizedResponse = {
	twitterIdVerified: boolean;
	userName: string;
}

export const configureTwitterRoutes = (router: Router): void => {
	/**
	 * Request an oauth token in order to ask the user to authorize our app for his twitter (step 1 of the oauth flow)
	 */
	router.post<any, RequestTokenResponse, RequestTokenBody>('/twitter/oauth/request_token', authMiddleware, async (req, res) => {
		let callbackUrl = req.body.callbackUrl;
		if (!callbackUrl)
			return apiError(res, invalidParamError("callbackUrl is missing"));

		let authLinkOrError = await twitterService.requestAuthToken(req.account, req, callbackUrl);
		if (hasError(authLinkOrError))
			return apiError(res, authLinkOrError);

		res.json({
			authLink: {
				url: authLinkOrError.data.url
			}
		});
	});

	/**
	 * After a client side user authorization, the client submits his twitter authentication keys so that we can verify them and
	 * access the twitter ID.
	 */
	router.post<any, AuthorizedResponse, AuthorizedBody>('/twitter/oauth/authorized', authMiddleware, async (req, res) => {
		let oAuthToken = req.body.oAuthToken;
		if (!oAuthToken)
			return apiError(res, invalidParamError("oAuthToken is missing"));

		let oAuthVerifier = req.body.oAuthVerifier;
		if (!oAuthVerifier)
			return apiError(res, invalidParamError("oAuthVerifier is missing"));

		let resultOrError = await twitterService.handleAuthorized(req.account, req, oAuthToken, oAuthVerifier);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({
			twitterIdVerified: true,
			userName: resultOrError.data.userName
		});
	});
}

