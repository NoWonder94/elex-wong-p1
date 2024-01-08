/* eslint-disable @typescript-eslint/no-misused-promises */
import { randomUUID } from 'crypto';
import { recoverTypedSignature_v4 } from 'eth-sig-util';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { accountService } from '../accounts/service';
import { apiError } from '../common/api';
import { accessForbiddenError, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError } from '../common/dataorerror';
import { getClientIPAddress } from '../common/utils';
import { SecretConfig } from '../config/env-secret';
import { logger } from '../logger';
import { evmService } from '../services/evm.service';
import { AuthChallengeToken, HandshakeRequest, HandshakeResponse, RegisterRequest, RegisterResponse, SignInRequest, SignInResponse } from './model/api';

/**
 * Payload of the final auth token JWT
 */
export type AuthToken = {
    accountId: number; // Database id of the authenticated user account
    address: string; // EVM address
}

export const configureAuthRoutes = (router: Router): void => {
    /**
     * Returns an authentication challenge that has to be signed by user's wallet (metamask)
     * and returned by calling /signin
     */
    router.post<null, HandshakeResponse, HandshakeRequest>('/auth/handshake', (req, res) => {
        const metaTransactionType = [
            { name: "Challenge", type: "string" }
        ];

        let message = {
            Challenge: randomUUID()
        };

        const domainType = [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            // { name: "chainId", type: "uint256" },
        ];

        const domainData = {
            name: "Address authentication",
            version: "1",
            //chainId: chainId,
        };

        if (!evmService.isValidEVMAddress(req.body.account))
            return apiError(res, invalidParamError("Account address format is invalid"));

        let challengeToken = jwt.sign({
            account: req.body.account,
            dataToSign: JSON.stringify({
                types: {
                    EIP712Domain: domainType,
                    MetaTransaction: metaTransactionType
                },
                domain: domainData,
                primaryType: "MetaTransaction",
                message: message
            })
        } as AuthChallengeToken, SecretConfig.Auth.jwtSecret, { expiresIn: 2 * 60 }); // 2 minutes short expiration

        res.json({
            token: challengeToken
        });
    });

    router.post<null, SignInResponse, SignInRequest>('/auth/signin', async (req, res) => {
        try {
            let decodedChallengeToken = <AuthChallengeToken>jwt.verify(req.body.challengeToken, SecretConfig.Auth.jwtSecret);

            // The challenge token is valid, now check the wallet signature
            const signingAddress = recoverTypedSignature_v4({
                data: JSON.parse(decodedChallengeToken.dataToSign),
                sig: req.body.challengeResult
            });

            if (!signingAddress)
                return apiError(res, accessForbiddenError("Failed to recover challenge signer"));

            if (signingAddress.toLowerCase() === decodedChallengeToken.account.toLowerCase()) {
                // Ok, the handshake account is the one who signed the challenge.

                let user = await accountService.getAccountByAddress(decodedChallengeToken.account);
                if (!user)
                    return apiError(res, displayableError(ErrorType.FORBIDDEN_ACCESS, ErrorCode.INEXISTING_ACCOUNT, "Please sign up first"));

                logger.info("Signed in user:", user);

                let authToken: AuthToken = {
                    accountId: user.id,
                    address: decodedChallengeToken.account.toLowerCase()
                };

                let jwtToken = jwt.sign(authToken, SecretConfig.Auth.jwtSecret, { expiresIn: 60 * 60 * 24 * 7 }); // One week expiration

                res.json({
                    token: jwtToken
                });
            }
            else {
                // Account address mismatch, rejecting the authentication
                return apiError(res, accessForbiddenError("Active wallet address doesn't match challenge signing address"));
            }
        } catch (e) {
            return apiError(res, accessForbiddenError("Authentication token expired, need to reconnect"), e);
        }
    });

    router.post<null, RegisterResponse, RegisterRequest>('/auth/register', async (req, res) => {
        let signingAddress: string;
        let decodedChallengeToken: AuthChallengeToken;

        try {
            decodedChallengeToken = <AuthChallengeToken>jwt.verify(req.body.challengeToken, SecretConfig.Auth.jwtSecret);

            // The challenge token is valid, now check the wallet signature
            signingAddress = recoverTypedSignature_v4({
                data: JSON.parse(decodedChallengeToken.dataToSign),
                sig: req.body.challengeResult
            });
        } catch (e) {
            return apiError(res, accessForbiddenError("Authentication token expired, need to reconnect"), e);
        }

        if (!signingAddress)
            return apiError(res, accessForbiddenError("Failed to recover challenge signer"));

        signingAddress = signingAddress.toLowerCase();

        // Account address mismatch, rejecting the authentication
        if (signingAddress.toLowerCase() !== decodedChallengeToken.account.toLowerCase())
            return apiError(res, accessForbiddenError("Active wallet address doesn't match challenge signing address"));

        let address = decodedChallengeToken.account.toLowerCase();

        try {
            let registerRequest = req.body;

            if (!("accountInfo" in registerRequest))
                return apiError(res, invalidParamError("Missing account info"));

            /* if (!("refercode" in registerRequest.accountInfo))
                return apiError(res, invalidParamError("Refer code is required!")); */

            if (!("forwardEmail" in registerRequest.accountInfo))
                return apiError(res, invalidParamError("Forward email address is required!"));

            let accountOrError = await accountService.createAccount({
                address,
                forwardEmail: registerRequest.accountInfo.forwardEmail,
                ipAddress: getClientIPAddress(req)
            });

            if (hasError(accountOrError))
                return apiError(res, accountOrError);

            let registeredAccount = accountOrError.data;
            logger.info("Newly registered account:", registeredAccount);

            let authToken: AuthToken = {
                accountId: registeredAccount.id,
                address
            };

            let jwtToken = jwt.sign(authToken, SecretConfig.Auth.jwtSecret, { expiresIn: 60 * 60 * 24 * 7 }); // One week expiration

            res.json({
                token: jwtToken,
                accountInfo: accountService.getPublicAccountInfo(registeredAccount)
            });
        } catch (e) {
            logger.error("Server error during account registration:", e);
            return apiError(res, serverError("Internal server error"));
        }
    });
}
