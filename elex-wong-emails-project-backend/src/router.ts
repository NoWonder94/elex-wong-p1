/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { configureAccountsRoutes } from './accounts/routes';
import { configureAuthRoutes } from './auth/routes';
import { configureCampaignActionsRoutes } from './campaignactions/routes';
import { configureCampaignsRoutes } from './campaigns/routes';
import { configureEmailingRoutes } from './emailing/routes';
import { configureTokensRoutes } from './erc20tokens/routes';
import { configureFilesRoutes } from './files/routes';
import { configureProjectEmailingRoutes } from './projectemailing/routes';
import { configureProjectsRoutes } from './projects/routes';
import { configureRefCodeRoutes } from './refcodes/routes';
import { configureTwitterRoutes } from './twitter/routes';
import { configureDiscordRoutes } from './discord/routes';

let router = Router();

// Simple ping route
router.get("/ping", (req, res) => {
  res.json({
    pong: true
  });
});

configureAuthRoutes(router);
configureAccountsRoutes(router);
configureProjectsRoutes(router);
configureCampaignsRoutes(router);
configureRefCodeRoutes(router);
configureTokensRoutes(router);
configureEmailingRoutes(router);
configureFilesRoutes(router);
configureTwitterRoutes(router);
configureDiscordRoutes(router);
configureCampaignActionsRoutes(router);
configureProjectEmailingRoutes(router);

export default router;
