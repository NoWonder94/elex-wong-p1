import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { accountService } from "../accounts/service";
import { AuthToken } from "../auth/routes";
import { apiError } from "../common/api";
import { accessForbiddenError, displayableError, ErrorCode, ErrorType } from "../common/dataorerror";
import { SecretConfig } from "../config/env-secret";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['token'] as string;
    if (token) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        jwt.verify(token, SecretConfig.Auth.jwtSecret, async (error, decoded: AuthToken) => {
            if (error || !decoded) {
                return apiError(res, displayableError(ErrorType.FORBIDDEN_ACCESS, ErrorCode.INVALID_ACCESS_TOKEN, "Authentication expired, please connect again"));
            } else {
                let account = await accountService.getAccountById(decoded.accountId)
                if (account) {
                    req.account = account;
                    next();
                }
                else {
                    return apiError(res, accessForbiddenError("Inexisting account"));
                }
            }
        });
    } else {
        return apiError(res, accessForbiddenError("No access token found"));
    }
}
