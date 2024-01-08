import { CampaignActionType } from "./actions/campaignactiontype";
import { TwitterFollowConfiguration } from "./actions/twitterfollowconfiguration";
import { TwitterLikeConfiguration } from "./actions/twitterlikeconfiguration";
import { TwitterRTConfiguration } from "./actions/twitterrtconfiguration";

export type CampaignAction = {
  id: number;
  type: CampaignActionType;
  configuration: TwitterFollowConfiguration | TwitterRTConfiguration | TwitterLikeConfiguration;
}