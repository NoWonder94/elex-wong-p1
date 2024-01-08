import { BehaviorSubject } from "rxjs";
import { CampaignService } from "../services/campaign.service";
import { ProjectService } from "../services/project.service";
import { JoinedCampaign } from "./campaigns/joinedcampaign";
import { Project } from "./project";

export type AccountJson = {
  address: string;
  forwarding_email: string;
  forwarding_email_verified: boolean;
  twitter: string;
  discord: string;
  is_admin: boolean;
}

export type UpdatedAccount = {
  forwarding_email: string;
}

export class Account implements AccountJson {
  public address: string;
  public forwarding_email: string;
  public forwarding_email_verified: boolean;
  public twitter: string;
  public discord: string;
  public is_admin: boolean;

  // Subjects
  public projects = new BehaviorSubject<Project[]>(null);
  public joinedCampaigns = new BehaviorSubject<JoinedCampaign[]>(null);

  constructor() {
    this.loadData();
  }

  public static fromJson(json: AccountJson): Account {
    let account = new Account();
    Object.assign(account, json);
    return account;
  }

  /**
   * Initial data loaded every time an account object is created.
   * Eg: list of projects owned by the account. This data is shared all over the app.
   */
  private async loadData() {
    // Projects
    ProjectService.instance.fetchProjects().then(projects => {
      this.projects.next(projects);
    });

    // Joined campaigns
    CampaignService.instance.getJoinedCampaigns().then(joinedCampaigns => {
      this.joinedCampaigns.next(joinedCampaigns);
    })
  }

  public get emailAddress(): string {
    return this.address + "@emails.com";
  }

  /**
   * Finds a project by ID in the list of loaded projects
   */
  public getProjectById(id: number): Project {
    let projects = this.projects.value;
    if (!projects)
      return null;

    return projects.find(p => p.id === id);
  }

  // TODO: move to project class with archival subject subscribed by this account class to update the projects list
  public async archiveProject(project: Project) {
    await ProjectService.instance.updateProjectInfo(project.id, 'is_archived', 'true');

    // Remove project from the list of visible projects
    let projects = this.projects.value;
    this.projects.next(projects.filter(p => p.id !== project.id));
  }
}