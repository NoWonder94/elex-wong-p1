import { DataOrError } from "../../common/dataorerror";
import { Account, Campaign, CampaignAction, JoinedCampaign, RealizedCampaignAction } from "../../generated/prisma/main-schema/index";

export interface CampaignActionValidator {
  checkActionRealization(account: Account, campaign: Campaign, joinedCampaign: JoinedCampaign, campaignAction: CampaignAction): Promise<DataOrError<RealizedCampaignAction>>;
}