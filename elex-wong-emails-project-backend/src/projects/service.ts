import { randomUUID } from "crypto";
import { convertedError, DataOrError, dataOrErrorData, displayableError, ErrorCode, ErrorType, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { prisma } from "../db";
import { Account, Project } from "../generated/prisma/main-schema";
import { filesService } from "../files/service";

class ProjectsService {
  public async getAccountProjects(account: Account): Promise<DataOrError<Project[]>> {
    try {
      let projects = await prisma.project.findMany({
        where: {
          accountUid: account.id,
          is_archived: false
        },
        include: {
          logo: true
        }
      });

      return dataOrErrorData(projects);
    }
    catch (e) {
      return serverError("Projects prisma query error");
    }
  }

  public async getAccountProjectById(account: Account, projectId: number): Promise<DataOrError<Project>> {
    try {
      let project = await prisma.project.findFirst({
        where: {
          accountUid: account.id,
          id: projectId
        }
      });

      return dataOrErrorData(project);
    }
    catch (e) {
      return serverError("Projects prisma query error");
    }
  }

  public async createProject(account: Account, name: string): Promise<DataOrError<Project>> {
    if (!account.forwarding_email_verified)
      return displayableError(ErrorType.STATE_ERROR, ErrorCode.VERIFY_ACCOUNT, "Cannot create a new project because your email address has not been verified yet");

    let project = await prisma.project.create({
      data: {
        name: name,
        twitter_id: "",
        url: "",
        accountUid: account.id,
        category: ""
      }
    });

    return dataOrErrorData(project);
  }

  public async updateProjectField(account: Account, projectId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
    if (!account.forwarding_email_verified)
      return displayableError(ErrorType.STATE_ERROR, ErrorCode.VERIFY_ACCOUNT, "Cannot update the project because your email address has not been verified yet");

    try {
      let project = await prisma.project.findFirst({
        where: {
          id: projectId,
          accountUid: account.id,
        }
      });

      if (!project)
        return invalidParamError("Project missing or doesn't belong to current user");

      const allowedEditionKeys: TypedEditionKeyEntry[] = [
        { key: "name", type: "string" },
        { key: "twitter_id", type: "string" },
        { key: "url", type: "string" },
        { key: "category", type: "string" },
        { key: "is_archived", type: "boolean" },
        {
          key: "logoId", type: "int", initialCheck: async value => {
            // Make sure the new logo file ID belongs to this project
            let fileOrError = await filesService.getProjectFile(account, projectId, <number>value);
            if (hasError(fileOrError))
              return convertedError(fileOrError);
            else {
              // Delete the previous logo file
              if (project.logoId) {
                await filesService.deleteFileById(project.logoId);
              }

              return dataOrErrorData();
            }
          }
        },
      ];

      let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);
      if (hasError(finalValueOrError))
        return convertedError(finalValueOrError);

      let validForUpdate = true;
      if (updatedEntry.key == "is_archived") {
        let campaign = await prisma.campaign.findMany({
          where: {
            projectPid: projectId,
            project: {
              accountUid: account.id
            }
          }
        });

        var getCampaignEndDate = campaign.map((obj) => obj.end_date);
        var dateNow = new Date().getTime() / 1000; //get in seconds

        for (var date of getCampaignEndDate) {
          if (dateNow < date) { //check for unstarted campaign
            validForUpdate = false;
          }
        }

      }
      if (!validForUpdate)
        return displayableError(ErrorType.STATE_ERROR, ErrorCode.INVALID_ACTION, "Cannot archive this project because the campaign is not over.");

      // Update in database
      let updateData = {};
      updateData[updatedEntry.key] = finalValueOrError.data;

      await prisma.project.update({
        data: updateData,
        where: {
          id: project.id
        }
      });

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Projects prisma query error");
    }
  }

  public async renewProjectApiKey(account: Account, projectId: number): Promise<DataOrError<string>> {
    if (!account.forwarding_email_verified)
      return displayableError(ErrorType.STATE_ERROR, ErrorCode.VERIFY_ACCOUNT, "Cannot renew the project api key because the account has not been verified");

    try {
      let project = await prisma.project.findFirst({
        where: {
          id: projectId,
          accountUid: account.id,
        }
      });

      if (!project)
        return invalidParamError("Project missing or doesn't belong to current user");

      // Generate project api key
      let newApiKey = randomUUID();

      await prisma.project.update({
        data: {
          api_key: newApiKey,
        },
        where: {
          id: project.id
        }
      });

      return dataOrErrorData(newApiKey);
    }
    catch (e) {
      return serverError("renewProjectApiKey error");
    }
  }

  public async getProjectAccounts(projectId: number): Promise<DataOrError<string[]>> {

    let joinCampaign = await prisma.joinedCampaign.findMany({
      where: {
        campaign: {
          projectPid: projectId
        }
      },
      select: {
        account: true,
      },
    });

    let emailList = [];
    joinCampaign.forEach(element => {
      emailList.push(element.account.forwarding_email);
    });

    return dataOrErrorData(emailList);
  }
}

export const projectsService = new ProjectsService();