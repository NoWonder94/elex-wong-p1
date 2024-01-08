/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, invalidParamError, successfulData } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { Campaign, JoinedCampaign } from "../generated/prisma/main-schema";
import { authMiddleware } from "../middleware/auth.middleware";
import { CampaignStats } from "./model/campaignstats";
import { PublicCampaignInfo } from "./model/publiccampaigninfo";
import { JoinedCampaignRewardsStatus } from "./model/rewardsstatus";
import { campaignsService } from "./service";

/**
 * Joined campaign entry with additional computed info such
 * as rewards status
 */
export type JoinedCampaignWithInfo = {
	campaign?: Campaign;
	joinedCampaign: JoinedCampaign;
	rewardsStatus: JoinedCampaignRewardsStatus;
}

type GetProjectCampaignsRequest = {
	projectId: number;
}

type GetProjectCampaignsResponse = {
	campaigns: Campaign[];
}

type CreateCampaignBody = {
	name: string;
	rewardType: string;
	distribution: string;
	medium: string;
}

type CreateCampaignResponse = {
	campaign: Campaign;
}

type GetPublicCampaignByCodeResponse = {
	campaign: PublicCampaignInfo;
}

type JoinCampaignByCodeResponse = {
	joinedCampaign: JoinedCampaign;
}

type JoinedCampaignResponse = JoinedCampaignWithInfo;

type JoinedCampaignsResponse = {
	joinedCampaigns: JoinedCampaign[];
}

type GetCampaignsStatsResponse = {
	stats: CampaignStats;
}

type UpdateCampaignResponse = {
}

type ClaimERC20TokensResponse = {
	newRewardStatus: JoinedCampaignRewardsStatus;
}

export const configureCampaignsRoutes = (router: Router): void => {
	/**
	 * Gets campaigns of a project
	 */
	router.get<any, GetProjectCampaignsResponse, GetProjectCampaignsRequest>('/projects/:projectId/campaigns', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignsOrError = await campaignsService.getProjectCampaigns(req.account, projectId);
		if (hasError(campaignsOrError))
			return apiError(res, campaignsOrError);

		res.json({ campaigns: campaignsOrError.data });
	});

	/**
	 * Creates a new campaign
	 */
	router.post<any, CreateCampaignResponse, CreateCampaignBody>('/projects/:projectId/campaigns', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);

		if (!req.body.name)
			return apiError(res, invalidParamError("Campaign name is missing"));

		if (!req.body.rewardType)
			return apiError(res, invalidParamError("Campaign reward type is missing"));

		if (!req.body.distribution)
			return apiError(res, invalidParamError("Campaign distribution is missing"));

		if (!req.body.medium)
			return apiError(res, invalidParamError("Campaign medium is missing"));

		let campaignOrError = await campaignsService.createCampaign(req.account, projectId, req.body.name, req.body.rewardType, req.body.distribution, req.body.medium);
		if (hasError(campaignOrError))
			return apiError(res, campaignOrError);

		res.json({ campaign: campaignOrError.data });
	});

	/**
	 * Gets campaigns stats
	 */
	router.get<any, GetCampaignsStatsResponse, void>('/projects/:projectId/campaigns/:campaignId/stats', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);

		let statsOrError = await campaignsService.getCampaignStats(req.account, projectId, campaignId);
		if (hasError(statsOrError))
			return apiError(res, statsOrError);

		res.json({ stats: statsOrError.data });
	});

	/**
	 * Gets a campaign by referral code
	 */
	router.get<any, { code: string }, GetPublicCampaignByCodeResponse>('/campaigns/bycode/:code', async (req, res) => {
		let code = req.params.code;

		let campaignOrError = await campaignsService.getCampaignByRefCode(code);
		if (hasError(campaignOrError))
			return apiError(res, campaignOrError);

		res.json({ campaign: campaignsService.getPublicCampaignInfo(campaignOrError.data) });
	});

	/**
	 * Join a campaign by referral code. Code can be the campaign code of the joined campaign code of a referrer.
	 */
	router.post<any, { code: string }, JoinCampaignByCodeResponse>('/campaigns/:code/join', authMiddleware, async (req, res) => {
		let code = req.params.code;

		let joinedOrError = await campaignsService.joinCampaignByRefCode(req.account, code);
		if (hasError(joinedOrError))
			return apiError(res, joinedOrError);

		res.json({ joinedCampaign: joinedOrError.data });
	});

	/**
	 * Get a user's joined campaign info for a given campaign
	 */
	router.get<any, { campaignId: string }, JoinedCampaignResponse>('/campaigns/:campaignId/joined', authMiddleware, async (req, res) => {
		let campaignId = parseInt(req.params.campaignId);

		let joinedCampaignOrError = await campaignsService.getAccountJoinedCampaignForCampaign(req.account, campaignId);
		if (hasError(joinedCampaignOrError))
			return apiError(res, joinedCampaignOrError);

		const joinedCampaignWithCampaign = successfulData(joinedCampaignOrError);

		if (!joinedCampaignWithCampaign) {
			res.json({
				campaign: null,
				joinedCampaign: null,
				rewardsStatus: null
			});
		}
		else {
			let rewardsStatusOrError = await campaignsService.getJoinedCampaignRewardsStatus(joinedCampaignWithCampaign.joinedCampaign, joinedCampaignWithCampaign.campaign);
			if (hasError(rewardsStatusOrError))
				return apiError(res, rewardsStatusOrError);

			res.json({
				campaign: joinedCampaignOrError.data.campaign,
				joinedCampaign: joinedCampaignOrError.data.joinedCampaign,
				rewardsStatus: successfulData(rewardsStatusOrError)
			});
		}
	});

	/**
	* Get all user's joined campaigns
	*/
	router.get<any, JoinedCampaignsResponse, void>('/campaigns/joined', authMiddleware, async (req, res) => {
		let campaignOrError = await campaignsService.getAccountJoinedCampaigns(req.account);
		if (hasError(campaignOrError))
			return apiError(res, campaignOrError);

		res.json({
			joinedCampaigns: campaignOrError.data || []
		});
	});

	/**
	* Updates campaign fields (by owner)
	*/
	router.post<any, any, UpdateCampaignResponse>('/projects/:projectId/campaigns/:campaignId/update', authMiddleware, async (req, res) => {
		let updatedEntry = <UpdatedEntry>req.body;
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);

		let resultOrError = await campaignsService.updateCampaignField(req.account, projectId, campaignId, updatedEntry);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({});
	});

	/**
	* Downloads the campaign report as JSON.
	* Used by project owners to get a campaign status and the list of winning wallets, token numbers, etc.
	*/
	router.get<any, any, any>('/projects/:projectId/campaigns/:campaignId/report', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);

		let reportOrError = await campaignsService.generateCampaignReport(req.account, projectId, campaignId);
		if (hasError(reportOrError))
			return apiError(res, reportOrError);

		res.json(reportOrError.data);
	});

	/**
	 * Claims ERC20 tokens from a joined campaign
	 */
	router.post<any, any, ClaimERC20TokensResponse>('/joinedcampaigns/:joinedCampaignId/claimERC20Tokens', authMiddleware, async (req, res) => {
		let joinedCampaignId = parseInt(req.params.joinedCampaignId);

		let claimedOrError = await campaignsService.claimJoinedCampaignERC20Tokens(req.account, joinedCampaignId);
		if (hasError(claimedOrError))
			return apiError(res, claimedOrError);

		res.json({
			newRewardStatus: successfulData(claimedOrError)
		});
	});
}

