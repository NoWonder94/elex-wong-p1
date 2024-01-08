import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { Account, ProjectEmailing } from "../generated/prisma/main-schema/index";
import { prisma } from "../db/index";
import { projectsService } from "../projects/service";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { months, now } from "moment";
import { emailPlannerService } from "../emailplanner/service";
class ProjectsEmailingService {

    public async getProjectEmailing(account: Account, projectId: number): Promise<DataOrError<ProjectEmailing[]>> {
        try {
            let emailing = await prisma.projectEmailing.findMany({
                where: {
                    project: {
                        id: projectId,
                        accountUid: account.id,// Make sure the user owns the emailing
                    },
                }
            });

            return dataOrErrorData(emailing);
        }
        catch (e) {
            return serverError("getProjectEmailing() error", e);
        }
    }

    public async createProjectEmailing(account: Account, projectId: number, title: string): Promise<DataOrError<ProjectEmailing>> {
        // Make sure the project belongs to the signed in user
        let accountProjectOrError = await projectsService.getAccountProjectById(account, projectId);

        if (hasError(accountProjectOrError))
            return convertedError(accountProjectOrError);

        if (!accountProjectOrError.data)
            return invalidParamError("Project not found, or doesn't belong to this user");


        let accountlist = await projectsService.getProjectAccounts(projectId);
        let emailing = await prisma.projectEmailing.create({
            data: {
                title: title,
                project: { connect: { id: projectId } },
                total_mail: accountlist.data.length,
            }
        });

        if (accountlist.data.length != 0) {
            await emailPlannerService.createProjectScheduleEmailing(accountlist.data, emailing.id);
        }
        return dataOrErrorData(emailing);
    }

    public async getProjectEmailingByID(account: Account, emailingId: number): Promise<DataOrError<ProjectEmailing>> {
        try {
            let emailing = await prisma.projectEmailing.findFirst({
                where: {
                    id: emailingId,
                    project: {
                        is: {
                            accountUid: account.id,
                        }
                    },
                }
            });

            return dataOrErrorData(emailing);
        }
        catch (e) {
            return serverError("getEmailTemplateByID() error", e);
        }
    }

    public async updateEmailingField(account: Account, projectId: number, emailingId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
        try {
            // Get the emailing and make sure it belongs to current user
            let emailing = await prisma.projectEmailing.findFirst({
                where: {
                    id: emailingId,
                    projectPid: projectId,
                    project: {
                        accountUid: account.id
                    }
                }
            });

            if (!emailing)
                return invalidParamError("emailing not found, or doesn't belong to this user");

            const allowedEditionKeys: TypedEditionKeyEntry[] = [
                { key: "title", type: "string" },
                { key: "status", type: 'int' },
                { key: "emailTemplateEid", type: 'int' },
            ];

            let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);

            if (hasError(finalValueOrError))
                return convertedError(finalValueOrError);

            // Update in database
            let updateData = {};
            updateData[updatedEntry.key] = finalValueOrError.data;

            await prisma.projectEmailing.update({
                data: updateData,
                where: {
                    id: emailing.id
                }
            });

            return dataOrErrorData();
        }
        catch (e) {
            return serverError("Update email emailing error", e);
        }
    }
}



export const projectsEmailingService = new ProjectsEmailingService();