import { Injectable } from '@angular/core';
import { hasError } from '../model/dataorerror';
import { Project } from '../model/project';
import { ProjectEmailing } from '../model/projectemailing';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type FetchProjectEmailingResponse = {
  emailing: ProjectEmailing[];
}

type CreateProjectEmailingRequest = {
  name: string;
}

type CreateProjectEmailingResponse = {
  emailing: ProjectEmailing;
}

@Injectable({
  providedIn: 'root'
})

export class ProjectEmailingService {
  constructor(
    private http: HttpService,
    private toast: ToastService
  ) { }

  public async init(): Promise<void> {
    Logger.log("projectsEmaling", "Project emaling service is initializing");
    return;
  }

  /**
   * Retrieves signed in user email templates for a given project
   */
  public async fetchEmailTemplates(project: Project): Promise<ProjectEmailing[]> {
    let emailingOrError = await this.http.backEndJsonGet<FetchProjectEmailingResponse>(`/projects/${project.id}/emailcommunication`);
    if (!hasError(emailingOrError)) {
      return emailingOrError.data.emailing;
    }
    else {
      return [];
    }
  }

  /**
   * Retrieves information about a ref code
   */
  public async createEmailTemplate(project: Project, name: string): Promise<ProjectEmailing> {
    let body: CreateProjectEmailingRequest = {
      name
    };

    let emailingOrError = await this.http.backEndJsonPost<CreateProjectEmailingResponse>(`/projects/${project.id}/emailcommunication`, body);
    if (!hasError(emailingOrError)) {
      return emailingOrError.data.emailing;
    }
    else {
      return null;
    }
  }

  public async fetchEmailTemplateById(emailingId: number): Promise<ProjectEmailing> {
    let resultOrError = await this.http.backEndJsonGet<{ emailing: ProjectEmailing }>(`/emailcommunication/${emailingId}`);
    if (!hasError(resultOrError)) {
      Logger.log("email communication", "Fetched project emailing:", resultOrError.data.emailing)

      return resultOrError.data.emailing;
    }
    else {
      return null; // TODO: forward errors
    }
  }

  public async updateEmailingInfo(projectId: number, emailingId: number, key: string, value: number | string): Promise<void> {
    Logger.log("email communication", "Updating project emailing entry:", key);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/emailcommunication/${emailingId}/update`, updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return;
    }
    else {
      return; // TODO: forward errors
    }
  }
}
