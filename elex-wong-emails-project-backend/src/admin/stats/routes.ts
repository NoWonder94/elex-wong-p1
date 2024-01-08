import { Router } from "express";
import { apiError } from "../../common/api";
import { hasError } from "../../common/dataorerror";
import { adminAuthMiddleware } from "../../middleware/admin.auth.middleware";
import { GlobalStats } from "./model/globalstats";
import { adminStatsService } from "./service";

type GetAdminStatsResponse = {
	stats: GlobalStats;
}

export const configureStatsRoutes = (router: Router): void => {
	/**
	 * Gets global admin stats
	 */
	router.get<any, GetAdminStatsResponse, any>('/stats', adminAuthMiddleware, async (req, res) => {
		let statsOrError = await adminStatsService.getGlobalStats();
		if (hasError(statsOrError))
			return apiError(res, statsOrError);

		res.json({ stats: statsOrError.data });
	});
}

