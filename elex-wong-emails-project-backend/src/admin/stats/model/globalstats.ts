export type GlobalStats = {
  accounts: {
    total: number;
    totalVerified: number;
    last24h: number;
    totalVerifiedLast24h: number;
  },
  projects: {
    total: number;
    last24h: number;
  },
  campaigns: {
    created: {
      total: number;
      last24h: number;
    },
    joined: {
      total: number;
      last24h: number;
    }
  }
  // TODO: airdrops
}