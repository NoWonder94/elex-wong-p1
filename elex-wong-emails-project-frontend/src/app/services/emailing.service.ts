import { Injectable } from '@angular/core';
import { hasError } from '../model/dataorerror';
import { EmailTemplate } from '../model/emailtemplate';
import { Project } from '../model/project';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

type CreateEmailTemplateRequest = {
  name: string;
}

type CreateEmailTemplateResponse = {
  template: EmailTemplate;
}

type FetchProjectEmailTemplatesResponse = {
  templates: EmailTemplate[];
}

@Injectable({
  providedIn: 'root'
})
export class EmailingService {
  constructor(
    private http: HttpService,
    private toast: ToastService
  ) { }

  public async init(): Promise<void> {
    Logger.log("emailing", "Emailing service is initializing");
    return;
  }

  /**
   * Retrieves signed in user email templates for a given project
   */
  public async fetchEmailTemplates(project: Project): Promise<EmailTemplate[]> {
    let templatesOrError = await this.http.backEndJsonGet<FetchProjectEmailTemplatesResponse>(`/projects/${project.id}/emailtemplates`);
    if (!hasError(templatesOrError)) {
      return templatesOrError.data.templates;
    }
    else {
      return [];
    }
  }

  /**
   * Retrieves information about a ref code
   */
  public async createEmailTemplate(project: Project, name: string): Promise<EmailTemplate> {
    let body: CreateEmailTemplateRequest = {
      name
    };

    let campaignOrError = await this.http.backEndJsonPost<CreateEmailTemplateResponse>(`/projects/${project.id}/emailtemplates`, body);
    if (!hasError(campaignOrError)) {
      return campaignOrError.data.template;
    }
    else {
      return null;
    }
  }


  public async fetchEmailTemplateById(templateId: number): Promise<EmailTemplate> {
    let resultOrError = await this.http.backEndJsonGet<{ template: EmailTemplate }>(`/emailtemplates/${templateId}`);
    if (!hasError(resultOrError)) {
      Logger.log("emailing", "Fetched email template:", resultOrError.data.template)

      return resultOrError.data.template;
    }
    else {
      return null; // TODO: forward errors
    }
  }

  public async updateTemplateInfo(projectId: number, templateId: number, key: string, value: number | string): Promise<void> {
    Logger.log("campaigns", "Updating email template entry:", key);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    let resultOrError = await this.http.backEndJsonPost<void>(`/projects/${projectId}/emailtemplates/${templateId}/update`, updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return;
    }
    else {
      return; // TODO: forward errors
    }
  }
}
