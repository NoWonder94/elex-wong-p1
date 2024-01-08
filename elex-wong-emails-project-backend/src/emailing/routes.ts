/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, invalidParamError } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { EmailTemplate } from "../generated/prisma/main-schema/index";
import { authMiddleware } from "../middleware/auth.middleware";
import { emailingService } from "./service";

type GetProjectCampaignsRequest = {
}

type GetEmailTemplatesResponse = {
  templates: EmailTemplate[]
}

type CreateTemplateResponse = {
  template: EmailTemplate
}

type CreateCampaignBody = {
  name: string;
}

type GetTemplateByIdResponse = {
  template: EmailTemplate;
}

type UpdateTemplateResponse = {
}

export const configureEmailingRoutes = (router: Router): void => {
  /**
   * Gets email templates of a project
   */
  router.get<any, any, GetEmailTemplatesResponse, GetProjectCampaignsRequest>('/projects/:projectId/emailtemplates', authMiddleware, async (req, res) => {
    let projectId = parseInt(req.params.projectId);
    let templatesOrError = await emailingService.getProjectEmailTemplates(req.account, projectId);
    if (hasError(templatesOrError))
      return apiError(res, templatesOrError);

    res.json({ templates: templatesOrError.data });
  });

  /**
   * Creates a new template
   */
  router.post<any, CreateTemplateResponse, CreateCampaignBody>('/projects/:projectId/emailtemplates', authMiddleware, async (req, res) => {
    let projectId = parseInt(req.params.projectId);
    let templateName = req.body.name;

    if (!templateName)
      return apiError(res, invalidParamError("Template name is missing"));

    let templateOrError = await emailingService.createEmailTemplate(req.account, projectId, templateName);
    if (hasError(templateOrError))
      return apiError(res, templateOrError);

    res.json({ template: templateOrError.data });
  });

  /**
   * Gets a template by id
   */
  router.get<any, { templateId: string }, GetTemplateByIdResponse>('/emailtemplates/:templateId', authMiddleware, async (req, res) => {
    let templateId = parseInt(req.params.templateId);

    let templateOrError = await emailingService.getEmailTemplateByID(req.account, templateId);
    if (hasError(templateOrError))
      return apiError(res, templateOrError);

    res.json({ template: templateOrError.data });
  });

  /**
  * Updates campaign fields (by owner)
  */
  router.post<any, any, UpdateTemplateResponse>('/projects/:projectId/emailtemplates/:templateId/update', authMiddleware, async (req, res) => {
    let updatedEntry = <UpdatedEntry>req.body;
    let projectId = parseInt(req.params.projectId);
    let templateId = parseInt(req.params.templateId);

    let resultOrError = await emailingService.updateTemplateField(req.account, projectId, templateId, updatedEntry);
    if (hasError(resultOrError))
      return apiError(res, resultOrError);

    res.json({});
  });
}
