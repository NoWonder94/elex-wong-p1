import { Router } from "express";
import { campaignRewardsService } from "../../campaignrewards/service";
import { apiError } from "../../common/api";
import { hasError } from "../../common/dataorerror";
import { Campaign, ERC20Token, ERC20TokenAirdropEvent } from "../../generated/prisma/main-schema/index";
import { adminAuthMiddleware } from "../../middleware/admin.auth.middleware";

type GetUnhandledERC20AirdropsResponse = {
	airdrops: ERC20TokenAirdropEvent[];
}

type GrabUnhandledERC20AirdropResponse = {
	airdrop: ERC20TokenAirdropEvent & { campaign: Campaign & { token: ERC20Token } };
}

export const configureAdminCampaignRewardsRoutes = (router: Router): void => {
	/**
	 * Gets ERC20 airdrop events that are not handled yet
	 */
	router.get<any, GetUnhandledERC20AirdropsResponse, any>('/erc20airdrops/unhandled', adminAuthMiddleware, async (req, res) => {
		let airdropsOrError = await campaignRewardsService.getUnhandledERC20AirdropEvents();
		if (hasError(airdropsOrError))
			return apiError(res, airdropsOrError);

		res.json({ airdrops: airdropsOrError.data });
	});

	/**
	 * Returns the next unhandled airdrop event to handle to an admin dashboard that will try to publish it
	 * as a transaction to release the airdrop tokens.
	 */
	router.post<any, GrabUnhandledERC20AirdropResponse, any>('/erc20airdrops/grabnextunhandled', adminAuthMiddleware, async (req, res) => {
		let airdropOrError = await campaignRewardsService.grabNextUnhandledERC20Airdrop();
		if (hasError(airdropOrError))
			return apiError(res, airdropOrError);

		res.json({ airdrop: airdropOrError.data });
	});
}

