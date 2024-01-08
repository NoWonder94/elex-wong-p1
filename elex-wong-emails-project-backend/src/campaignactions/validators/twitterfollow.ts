import { DataOrError } from "../../common/dataorerror";
import { Account, Campaign, CampaignAction, JoinedCampaign, RealizedCampaignAction } from "../../generated/prisma/main-schema/index";
import { CampaignActionValidator } from "../model/validator";

class TwitterFollowValidator implements CampaignActionValidator {
  checkActionRealization(account: Account, campaign: Campaign, joinedCampaign: JoinedCampaign, campaignAction: CampaignAction): Promise<DataOrError<RealizedCampaignAction>> {
    return null;
  }
}

export const twitterFollowValidator = new TwitterFollowValidator();