import moment from "moment";
import { campaignActionsService } from "../campaignactions/service";
import { convertedError, DataOrError, dataOrErrorData, hasError, successfulData } from "../common/dataorerror";
import { prisma } from "../db/index";
import { Account, Campaign, JoinedCampaign } from "../generated/prisma/main-schema/index";
import { logger } from "../logger";

const CHECKED_ENDED_CAMPAIGNS_INTERVAL_SEC = 60; // Interval to check ended campaigns to run the final validation of user campaign actions

/**
 * Globally checks campaign actions with the help of the campaign actions service.
 * Marks joined campaigns as completed when everything needed to be done by a user is done.
 */
class CampaignValidationService {
  public start() {
    // When starting the server, wait a few seconds for other things to be ready then run a first validation check
    setTimeout(() => {
      this.checkFinishedCampaignsValidation();
    }, 10000);
  }

  private rearmFinishedCampaignsValidationCheck() {
    setTimeout(() => {
      this.checkFinishedCampaignsValidation();
    }, CHECKED_ENDED_CAMPAIGNS_INTERVAL_SEC * 1000);
  }

  private async checkFinishedCampaignsValidation() {
    // Find the next ended but not checked campaign
    const nowTimestamp = moment().unix();
    let campaignToCheck = await prisma.campaign.findFirst({
      where: {
        end_date: { gt: nowTimestamp },
        final_validation_done: false
      }
    });

    if (!campaignToCheck)
      return; // Nothing to check

    await this.checkCampaign(campaignToCheck);

    this.rearmFinishedCampaignsValidationCheck();
  }

  private async checkCampaign(campaign: Campaign) {
    logger.info(`Checking ended campaign:`, campaign);

    let campaignJoinedCampaigns = await prisma.joinedCampaign.findMany({
      where: {
        campaignCid: campaign.id,
        all_actions_completed: false,
      },
      include: {
        campaign: true,
        account: true
      }
    });

    for (let jc of campaignJoinedCampaigns) {
      let resultOrError = await this.checkJoinedCampaign(jc);

      // Make sure to not have any failure during validation, otherwise some users would loose their rewards.
      // If there is a twitter, discord or database issue, it has to be solved first.
      if (hasError(resultOrError)) {
        logger.warn(`Failed to check joined campaign, campaign cannot be validated for now`, jc);
        return;
      }
    }

    // Mark the campaign as fully checked
    await prisma.campaign.update({
      where: {
        id: campaign.id
      },
      data: {
        final_validation_done: true
      }
    });
  }

  /**
   * For a given joined campaign, checks all campaign actions and updates the realized campaign actions accordingly.
   * When all the campaign actions are done, the joined campaign is marked as completed, making the user eligible for the
   * campaign reward.
   */
  public async checkJoinedCampaign(joinedCampaign: JoinedCampaign & { account: Account, campaign: Campaign }): Promise<DataOrError<void>> {
    /* const joinedCampaign = await prisma.joinedCampaign.findUnique({
      where: { id: joinedCampaignId },
      include: {
        campaign: true,
        account: true
      }
    });

    if (!joinedCampaign)
      return;*/

    if (joinedCampaign.all_actions_completed)
      return dataOrErrorData(); // All good, nothing more to check

    const account = joinedCampaign.account;
    const campaign = joinedCampaign.campaign;

    const campaignActionsOrError = await campaignActionsService.getCampaignActions(account, campaign.projectPid, campaign.id);
    if (hasError(campaignActionsOrError))
      return convertedError(campaignActionsOrError);

    // For all campaign actions, checks if the action is realized.
    let completedActionsCount = 0;
    for (let campaignAction of successfulData(campaignActionsOrError)) {
      // If already realized, don't check it any more (for now).
      // Note: an existing "realized" campaign action can be completed, or not (in case
      // it was checked, but the action was not realized).
      let realizedAction = await prisma.realizedCampaignAction.findFirst({
        where: {
          accountUid: account.id,
          joinedCampaignId: joinedCampaign.id
        }
      });

      if (!realizedAction || !realizedAction.completed) {
        // Never checked before or was checked but not done by the user.
        // So we let the action service check this now.
        let realizedActionOrError = await campaignActionsService.checkActionRealization(account, campaign, joinedCampaign, campaignAction);
        if (hasError(realizedActionOrError)) {
          realizedAction = successfulData(realizedActionOrError);
          if (!realizedAction || !realizedAction.completed) {
            // That will be a no for now... At least one action not completed
          }
          else {
            // Cool, just validated, score up.
            completedActionsCount++;
          }
        }
      }
      else {
        // The action was already completed. All good
        completedActionsCount++;
      }
    }

    // If the number of completed actions is equal the to number of required actions,
    // we can mark this joined campaign entry as completed
    if (completedActionsCount === successfulData(campaignActionsOrError).length) {
      // Mark the joined campaign as completed for this user.
      await prisma.joinedCampaign.update({
        where: {
          id: joinedCampaign.id
        },
        data: {
          all_actions_completed: true,
          all_actions_completed_at: moment().toDate()
        }
      });
    }

    return dataOrErrorData();
  }
}

export const campaignValidationService = new CampaignValidationService();