/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { configureAdminCampaignRewardsRoutes } from './campaignrewards/routes';
import { configureStatsRoutes as configureAdminStatsRoutes } from './stats/routes';

let adminRouter = Router();

// Simple ping route
adminRouter.get("/ping", (req, res) => {
  res.json({
    pong: true
  });
});

configureAdminStatsRoutes(adminRouter);
configureAdminCampaignRewardsRoutes(adminRouter);

export default adminRouter;
