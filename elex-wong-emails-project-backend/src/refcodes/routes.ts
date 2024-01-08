/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, notFoundError } from "../common/dataorerror";
import { ReferralCode } from "../generated/prisma/main-schema";
import { refCodesServices } from "./service";

type GetCodeResponse = {
	code: ReferralCode;
}

export const configureRefCodeRoutes = (router: Router): void => {
	/**
	 * Gets code information
	 */
	router.get<any, { code: string }, GetCodeResponse>('/codes/:code', async (req, res) => {
		let code = req.params.code;

		let codeInfoOrError = await refCodesServices.getCodeInfo(code);
		if (hasError(codeInfoOrError))
			return apiError(res, codeInfoOrError);

		if (!codeInfoOrError.data)
			return apiError(res, notFoundError("This code doesn't exist"));

		res.json({ code: codeInfoOrError.data });
	});
}

