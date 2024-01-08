/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { hasError } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { Project } from "../generated/prisma/main-schema";
import { authMiddleware } from "../middleware/auth.middleware";
import { projectsService } from "./service";

type GetProjectsRequest = {
}

type GetProjectsResponse = {
	projects: Project[];
}

type CreateProjectRequest = {
	name: string;
}

type CreateProjectResponse = {
	project: Project;
}

type UpdateProjectRequest = {
}

type UpdateProjectResponse = {
}

type RenewProjectAPIKeyResponse = {
	apiKey: string;
}

export const configureProjectsRoutes = (router: Router): void => {
	/**
	 * Gets account projects
	 */
	router.get<any, GetProjectsResponse, GetProjectsRequest>('/projects', authMiddleware, async (req, res) => {
		let projectsOrError = await projectsService.getAccountProjects(req.account);
		if (hasError(projectsOrError))
			return apiError(res, projectsOrError);

		res.json({ projects: projectsOrError.data });
	});

	/**
	 * Creates a new project
	 */
	router.post<any, CreateProjectResponse, CreateProjectRequest>('/projects', authMiddleware, async (req, res) => {
		let projectCreationData = req.body;

		let projectOrError = await projectsService.createProject(req.account, projectCreationData.name);
		if (hasError(projectOrError))
			return apiError(res, projectOrError);

		res.json({ project: projectOrError.data });
	});

	/**
	 * Updates project fields (by owner)
	 */
	router.post<any, any, UpdateProjectResponse>('/projects/:projectId/update', authMiddleware, async (req, res) => {
		let updatedEntry = <UpdatedEntry>req.body;
		let projectId = parseInt(req.params.projectId);

		let resultOrError = await projectsService.updateProjectField(req.account, projectId, updatedEntry);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({});
	});

	/**
	 * Renew the project api key
	 */
	router.post<any, any, RenewProjectAPIKeyResponse>('/projects/:projectId/apikey/renew', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);

		let apiKeyOrError = await projectsService.renewProjectApiKey(req.account, projectId);
		if (hasError(apiKeyOrError))
			return apiError(res, apiKeyOrError);

		res.json({
			apiKey: apiKeyOrError.data
		});
	});
}

