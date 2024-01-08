import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { prisma } from "../db/index";
import { Account, EmailTemplate } from "../generated/prisma/main-schema/index";
import { projectsService } from "../projects/service";

class EmailingService {
  public async getProjectEmailTemplates(account: Account, projectId: number): Promise<DataOrError<EmailTemplate[]>> {
    try {
      let emailTemplates = await prisma.emailTemplate.findMany({
        where: {
          project: {
            id: projectId,
            accountUid: account.id,// Make sure the user owns the template
          },
          is_archived: false,
        }
      });

      return dataOrErrorData(emailTemplates);
    }
    catch (e) {
      return serverError("getProjectEmailTemplates() error", e);
    }
  }

  public async createEmailTemplate(account: Account, projectId: number, name: string): Promise<DataOrError<EmailTemplate>> {
    // Make sure the project belongs to the signed in user
    let accountProjectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(accountProjectOrError))
      return convertedError(accountProjectOrError);

    if (!accountProjectOrError.data)
      return invalidParamError("Project not found, or doesn't belong to this user");

    let template = await prisma.emailTemplate.create({
      data: {
        name,
        project: { connect: { id: projectId } },
        template_json: "{}"
      }
    });

    return dataOrErrorData(template);
  }

  public async getEmailTemplateByID(account: Account, templateId: number): Promise<DataOrError<EmailTemplate>> {
    try {
      let template = await prisma.emailTemplate.findFirst({
        where: {
          id: templateId,
          project: {
            is: {
              accountUid: account.id,
            }
          },
          is_archived: false,
        }
      });

      return dataOrErrorData(template);
    }
    catch (e) {
      return serverError("getEmailTemplateByID() error", e);
    }
  }

  public async updateTemplateField(account: Account, projectId: number, templateId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
    try {
      // Get the template and make sure it belongs to current user
      let template = await prisma.emailTemplate.findFirst({
        where: {
          id: templateId,
          projectPid: projectId,
          project: {
            accountUid: account.id
          }
        }
      });

      if (!template)
        return invalidParamError("Template not found, or doesn't belong to this user");

      const allowedEditionKeys: TypedEditionKeyEntry[] = [
        { key: "name", type: "string" },
        {
          key: "template_json", type: "string", initialCheck: value => {
            // Make sure the received string is a valid json
            try {
              JSON.parse(<string>value);
              // Parse done, we can continue
              return dataOrErrorData();
            }
            catch (e) {
              return invalidParamError("String received as email template JSON is not a valid json");
            }
          }
        },
        { key: "html", type: 'string' },
        { key: "is_archived", type: 'boolean' },
      ];

      let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);
      if (hasError(finalValueOrError))
        return convertedError(finalValueOrError);

      // Update in database
      let updateData = {};
      updateData[updatedEntry.key] = finalValueOrError.data;

      await prisma.emailTemplate.update({
        data: updateData,
        where: {
          id: template.id
        }
      });

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Update email template error", e);
    }
  }
}

export const emailingService = new EmailingService();