import { campaignsService } from "../campaigns/service";
import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { prisma } from "../db/index";
import { Account, Campaign, CampaignAction, JoinedCampaign, Prisma, RealizedCampaignAction } from "../generated/prisma/main-schema/index";
import { TwitterFollowConfiguration } from "./model/twitterfollowconfiguration";
import { CampaignActionValidator } from "./model/validator";
import { twitterFollowValidator } from "./validators/twitterfollow";

class CampaignActionService {
  private validators: { [actionType: string]: CampaignActionValidator } = {
    twitter_follow: twitterFollowValidator
  };

  /**
   * Gets actions for a campaign ID.
   * This API is public, no sign in required.
   */
  public async getCampaignActions(account: Account, projectId: number, campaignId: number): Promise<DataOrError<CampaignAction[]>> {
    try {
      let campaignActions = await prisma.campaignAction.findMany({
        where: {
          campaign: {
            id: campaignId,
            project: {
              id: projectId,
              //accountUid: account.id
            }
          }
        }
      });

      return dataOrErrorData(campaignActions);
    }
    catch (e) {
      return serverError("getCampaignActions() prisma query error", e);
    }
  }

  public async createCampaignAction(account: Account, projectId: number, campaignId: number, actionType: string): Promise<DataOrError<CampaignAction>> {
    // Make sure the campaign and project belong to the signed in user
    let campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    let configuration: Prisma.InputJsonObject;
    switch (actionType) {
      case "twitter_follow":
        configuration = this.createTwitterFollowConfiguration();
        break;
      default:
        return invalidParamError(`Unsupported campaign action type ${actionType} at creation time`);
    }

    let campaignAction = await prisma.campaignAction.create({
      data: {
        type: actionType,
        campaign: { connect: { id: campaignId } },
        configuration
      }
    });

    return dataOrErrorData(campaignAction);
  }

  private createTwitterFollowConfiguration(): TwitterFollowConfiguration {
    return {
      twitterAccount: null
    };
  }

  public async updateCampaignAction(account: Account, projectId: number, campaignId: number, actionId: number, updatedAction: CampaignAction): Promise<DataOrError<boolean>> {
    // Make sure the campaign and project belong to the signed in user
    let campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    let updated = await prisma.campaignAction.updateMany({
      where: {
        id: actionId,
        campaignCid: campaignId
      },
      data: {
        type: updatedAction.type,
        configuration: updatedAction.configuration
      }
    });

    if (updated.count === 0)
      return invalidParamError("Campaign action not found");
    else
      return dataOrErrorData(true);
  }

  public async deleteCampaignAction(account: Account, projectId: number, campaignId: number, actionId: number): Promise<DataOrError<boolean>> {
    // Make sure the campaign and project belong to the signed in user
    let campaignOrError = await campaignsService.ensureOwnedCampaign(account, projectId, campaignId);
    if (hasError(campaignOrError))
      return convertedError(campaignOrError);

    let deleted = await prisma.campaignAction.deleteMany({
      where: {
        id: actionId,
        campaignCid: campaignId
      }
    });

    if (deleted.count === 0)
      return invalidParamError("Campaign action not found");
    else
      return dataOrErrorData(true);
  }

  /**
   * Checks if a given account has realized an expected campaign action.
   */
  public async checkActionRealization(account: Account, campaign: Campaign, joinedCampaign: JoinedCampaign, campaignAction: CampaignAction): Promise<DataOrError<RealizedCampaignAction>> {
    if (campaignAction.type in this.validators)
      return this.validators[campaignAction.type].checkActionRealization(account, campaign, joinedCampaign, campaignAction);
    else
      return invalidParamError(`checkActionRealization(): unsupported campaign action type ${campaignAction.type}`);
  }
}

export const campaignActionsService = new CampaignActionService();