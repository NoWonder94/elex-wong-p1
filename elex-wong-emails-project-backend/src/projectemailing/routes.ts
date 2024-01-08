import { Router } from "express";
import { apiError } from "../common/api";
import { hasError, invalidParamError } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { ProjectEmailing } from "../generated/prisma/main-schema/index";
import { authMiddleware } from "../middleware/auth.middleware";
import { projectsEmailingService } from './service'

type GetProjectEmailingRequest = {
}

type GetProjectEmailingResponse = {
    emailing: ProjectEmailing[]
}

type CreateProjectEmailingResponse = {
    emailing: ProjectEmailing
}

type CreateProjectEmailingBody = {
    name: string;
}

type GetEmailingByIdResponse = {
    emailing: ProjectEmailing
}

type UpdateEamilingResponse = {

}

export const configureProjectEmailingRoutes = (router: Router): void => {

    /**
   * Get all project emailing of a project
   */
    router.get<any, GetProjectEmailingResponse, GetProjectEmailingRequest>('/projects/:projectId/emailcommunication', authMiddleware, async (req, res) => {
        let projectId = parseInt(req.params.projectId);
        let emailingOrError = await projectsEmailingService.getProjectEmailing(req.account, projectId);
        if (hasError(emailingOrError))
            return apiError(res, emailingOrError);

        res.json({ emailing: emailingOrError.data });
    });

    /**
  * Creates a new emailing
  */
    router.post<any, CreateProjectEmailingResponse, CreateProjectEmailingBody>('/projects/:projectId/emailcommunication', authMiddleware, async (req, res) => {
        let projectId = parseInt(req.params.projectId);
        let emailingTitle = req.body.name;

        if (!emailingTitle)
            return apiError(res, invalidParamError("Template name is missing"));

        let emailingOrError = await projectsEmailingService.createProjectEmailing(req.account, projectId, emailingTitle);
        if (hasError(emailingOrError))
            return apiError(res, emailingOrError);

        res.json({ emailing: emailingOrError.data });
    });

    /**
   * Gets a template by id
   */
    router.get<any, { emailingId: string }, GetEmailingByIdResponse>('/emailcommunication/:emailingId', authMiddleware, async (req, res) => {
        let emailingId = parseInt(req.params.emailingId);

        let emailingOrError = await projectsEmailingService.getProjectEmailingByID(req.account, emailingId);
        if (hasError(emailingOrError))
            return apiError(res, emailingOrError);

        res.json({ emailing: emailingOrError.data });
    });

    router.post<any, any, UpdateEamilingResponse>('/projects/:projectId/emailcommunication/:emailingId/update', authMiddleware, async (req, res) => {
        let updatedEntry = <UpdatedEntry>req.body;
        let projectId = parseInt(req.params.projectId);
        let templateId = parseInt(req.params.emailingId);
        let resultOrError = await projectsEmailingService.updateEmailingField(req.account, projectId, templateId, updatedEntry);
        if (hasError(resultOrError))
            return apiError(res, resultOrError);

        res.json({});
    });
}