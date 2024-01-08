import { Injectable } from '@angular/core';
import { hasError } from '../model/dataorerror';
import { Project } from '../model/project';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type CreateProjectRequest = {
  name: string;
}

type CreateProjectResponse = {
  project: Project;
}

type FetchProjectsResponse = {
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public static instance: ProjectService;

  constructor(
    private http: HttpService,
    private toast: ToastService
  ) {
    ProjectService.instance = this;
  }

  public async init(): Promise<void> {
    Logger.log("projects", "Project service is initializing");
    return;
  }

  /**
   * Retrieves signed in user existing projects from the backend
   */
  public async fetchProjects(): Promise<Project[]> {
    Logger.log("projects", "Fetching projects");

    let projectsOrError = await this.http.backEndJsonGet<FetchProjectsResponse>("/projects");
    if (!hasError(projectsOrError)) {
      return projectsOrError.data.projects;
    }
    else {
      return [];
    }
  }

  public async createProject(name: string): Promise<Project> {
    let body: CreateProjectRequest = {
      name
    };

    let projectOrError = await this.http.backEndJsonPost<CreateProjectResponse>("/projects", body);
    console.log("create project", projectOrError)
    if (!hasError(projectOrError)) {
      return projectOrError.data.project;
    }
    else {
      return null;
    }
  }

  public async updateProjectInfo(projectId: number, key: string, value: number | string): Promise<void> {
    Logger.log("projects", "Updating project entry:", key, value);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/update`, updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return;
    }
    else {
      return; // TODO: forward errors
    }
  }

  public async createAPIKey(projectId: number): Promise<string> {
    let resultOrError = await this.http.backEndJsonPost<{ apiKey: string }>(`/projects/${projectId}/apikey/renew`);
    if (!hasError(resultOrError)) {
      this.toast.saved();

      Logger.log("projects", "Created API key:", resultOrError.data.apiKey)

      return resultOrError.data.apiKey;
    }
    else {
      return null; // TODO: forward errors
    }
  }
}