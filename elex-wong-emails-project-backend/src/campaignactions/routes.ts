/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, invalidParamError } from "../common/dataorerror";
import { CampaignAction } from "../generated/prisma/main-schema";
import { authMiddleware } from "../middleware/auth.middleware";
import { campaignActionsService } from "./service";

type GetCampaignActionsResponse = {
	actions: CampaignAction[];
}

type CreateCampaignActionRequest = {
	projectId: number;
	campaignId: number;
}

type CreateCampaignActionBody = {
	type: string; // action type
}

type CreateCampaignActionResponse = {
	action: CampaignAction;
}

type UpdateCampaignActionBody = {
	action: CampaignAction;
}

type UpdateCampaignActionResponse = {
	updated: boolean;
}

type DeleteCampaignActionResponse = {
	deleted: boolean;
}

export const configureCampaignActionsRoutes = (router: Router): void => {
	/**
	 * Gets campaign a actions (public)
	 */
	router.get<any, any, GetCampaignActionsResponse, any>('/projects/:projectId/campaigns/:campaignId/actions', async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		if (!projectId)
			return invalidParamError("Project ID is missing");

		let campaignId = parseInt(req.params.campaignId);
		if (!campaignId)
			return invalidParamError("Campaign ID is missing");

		let campaignActionsOrError = await campaignActionsService.getCampaignActions(req.account, projectId, campaignId);
		if (hasError(campaignActionsOrError))
			return apiError(res, campaignActionsOrError);

		res.json({ actions: campaignActionsOrError.data });
	});

	/**
	 * Creates a new campaign action
	 */
	router.post<any, CreateCampaignActionResponse, CreateCampaignActionBody>('/projects/:projectId/campaigns/:campaignId/actions', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		if (!projectId)
			return invalidParamError("Project ID is missing");

		let campaignId = parseInt(req.params.campaignId);
		if (!campaignId)
			return invalidParamError("Campaign ID is missing");

		let actionType = req.body.type;

		if (!actionType)
			return apiError(res, invalidParamError("Action type is missing"));

		let campaignActionOrError = await campaignActionsService.createCampaignAction(req.account, projectId, campaignId, actionType);
		if (hasError(campaignActionOrError))
			return apiError(res, campaignActionOrError);

		res.json({ action: campaignActionOrError.data });
	});

	/**
	 * Update a campaign action
	 */
	router.post<any, UpdateCampaignActionResponse, UpdateCampaignActionBody>('/projects/:projectId/campaigns/:campaignId/actions/:actionId/update', authMiddleware, async (req, res) => {
		let updatedAction = req.body.action;
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);
		let actionId = parseInt(req.params.actionId);

		let resultOrError = await campaignActionsService.updateCampaignAction(req.account, projectId, campaignId, actionId, updatedAction);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({
			updated: true
		});
	});

	/**
	 * Delete a campaign action
	 */
	router.post<any, DeleteCampaignActionResponse>('/projects/:projectId/campaigns/:campaignId/actions/:actionId/delete', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);
		let actionId = parseInt(req.params.actionId);

		let resultOrError = await campaignActionsService.deleteCampaignAction(req.account, projectId, campaignId, actionId);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({
			deleted: true
		});
	});
}
