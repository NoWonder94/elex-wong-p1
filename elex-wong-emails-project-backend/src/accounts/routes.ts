/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { accessForbiddenError, hasError, invalidParamError } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { authMiddleware } from "../middleware/auth.middleware";
import { AccountInfoResponse, UpdatedAccountInfoResponse } from "./model/api";
import { accountService } from "./service";

type PublicAccountStatusResponse = {
	exists: boolean;
}

type VerifyEmailResponse = {}

type CheckEmailVerificationKeyBody = {
	verificationKey: string;
}

type CheckEmailVerificationKeyResponse = {
	emailVerified: boolean;
}

export const configureAccountsRoutes = (router: Router): void => {
	/**
	* Checks public status about any account, no auth required.
	*/
	router.get<any, { walletAddress: string }, PublicAccountStatusResponse>('/accounts/byaddress/:walletAddress', async (req, res) => {
		let walletAddress = req.params.walletAddress;

		if (!walletAddress)
			return apiError(res, accessForbiddenError("Wallet address is missing"));

		let account = await accountService.getAccountByAddress(walletAddress);

		res.json({
			exists: account !== null
		});
	});

	/**
	* Get signed in user's personal info.
	*/
	router.get<any, any, AccountInfoResponse>('/account/personalinfo', authMiddleware, (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("No signed in user to get personal info"));

		res.json({
			accountInfo: accountService.getPublicAccountInfo(req.account)
		});
	});

	/**
	* Updates account fields (by owner)
	*/
	router.post<any, any, UpdatedAccountInfoResponse>('/account/update', authMiddleware, async (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("No signed in user to update personal info"));

		let updatedEntry = <UpdatedEntry>req.body;

		let accountOrError = await accountService.updateAccountField(req.account, updatedEntry);
		if (hasError(accountOrError))
			return apiError(res, accountOrError);

		res.json({
			accountInfo: accountService.getUpdatedAccountInfo(accountOrError.data)
		});
	});

	/**
	 * Request account forwarding email verification
	 */
	router.post<any, any, VerifyEmailResponse>('/account/verifyemail', authMiddleware, async (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("No signed in user to send email verification"));

		let resultOrError = await accountService.verifyEmailAddress(req.account);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({});
	});

	/**
	 * Request account forwarding email verification
	 */
	router.post<any, CheckEmailVerificationKeyResponse, CheckEmailVerificationKeyBody>('/account/checkemailverificationkey', authMiddleware, async (req, res) => {
		if (!req.account)
			return apiError(res, accessForbiddenError("No signed in user to send email verification"));

		let verificationKey = <string>req.body.verificationKey;
		if (!verificationKey)
			return apiError(res, invalidParamError("Verification key is missing"));

		let resultOrError = await accountService.checkEmailVerificationKey(req.account, verificationKey);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({
			emailVerified: true
		});
	});
}