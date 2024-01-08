import moment from "moment";
import { DataOrError, dataOrErrorData } from "../../common/dataorerror";
import { prisma } from "../../db/index";
import { GlobalStats } from "./model/globalstats";

class AdminStatsService {
  public async getGlobalStats(): Promise<DataOrError<GlobalStats>> {
    let globalStats: GlobalStats = {
      accounts: {
        total: 0,
        totalVerified: 0,
        last24h: 0,
        totalVerifiedLast24h: 0
      },
      projects: {
        total: 0,
        last24h: 0
      },
      campaigns: {
        created: {
          total: 0,
          last24h: 0
        },
        joined: {
          total: 0,
          last24h: 0
        }
      }
    };

    const ago24hours = moment().subtract(24, "hours").toDate(); // 24 hours ago

    // Accounts
    globalStats.accounts.total = await prisma.account.count();
    globalStats.accounts.last24h = await prisma.account.count({ where: { created_at: { gt: ago24hours } } });
    globalStats.accounts.totalVerified = await prisma.account.count({ where: { forwarding_email_verified: true } });
    globalStats.accounts.totalVerifiedLast24h = await prisma.account.count({ where: { forwarding_email_verified: true, created_at: { gt: ago24hours } } });

    // Projects
    globalStats.projects.total = await prisma.project.count();
    globalStats.projects.last24h = await prisma.project.count({ where: { created_at: { gt: ago24hours } } });

    // Campaigns
    globalStats.campaigns.created.total = await prisma.campaign.count();
    globalStats.campaigns.created.last24h = await prisma.campaign.count({ where: { created_at: { gt: ago24hours } } });
    globalStats.campaigns.joined.total = await prisma.joinedCampaign.count();
    globalStats.campaigns.joined.last24h = await prisma.joinedCampaign.count({ where: { created_at: { gt: ago24hours } } });

    return dataOrErrorData(globalStats);
  }
}

export const adminStatsService = new AdminStatsService();