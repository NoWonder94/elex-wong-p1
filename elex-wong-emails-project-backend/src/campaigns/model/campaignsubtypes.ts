import { Campaign, ERC20Token, File, Project } from "../../generated/prisma/main-schema";


export type CampaignWithToken = Campaign & {
  token: ERC20Token;
}

export type CampaignWithProject = Campaign & {
  project: Project;
}

export type PopulatedCampaign = CampaignWithToken & CampaignWithProject & {
  banner: File;
  project: Project & {
    logo: File;
  }
}
