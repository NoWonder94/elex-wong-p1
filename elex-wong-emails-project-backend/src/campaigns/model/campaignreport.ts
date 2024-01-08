
type Account = {
  id: number;
  creationDate: string; // ISO
  walletAddress: string;
  forwardEmail: {
    verified: boolean;
  }
}

type AccountStats = {
  refCode: string;
  l1RefCode: string;
  l2RefCode: string;
  l3RefCode: string;
  l1UserCount: number;
  l2UserCount: number;
  l3UserCount: number;
  balance: number;
}

export type AccountWithStats = {
  account: Account;
  stats: AccountStats;
}

export type CampaignReport = {
  campaign: {
    name: string;
    token: {
      symbol: string;
      name: string;
      chainId: number;
    };
    startDate: string; // ISO
    endDate: string; // ISO
    refCode: string;
  },
  accounts: AccountWithStats[]
}

/*
select

a.id,
a.created_at,
a.address,
a.forwarding_email_verified as verified,
a.creation_ip_Address,

b.referral_code,
b.l1_referral_code as l1code,
b.l2_referral_code as l2code,
b.l3_referral_code as l3code,
b.l1_user_count,
b.l2_user_count,
b.l3_user_count

c.balance,

  from
Account a
  left join
JoinedCampaign b on a.id=b.accountUid
  left join
(select accountUid, sum(amount) as balance from TokenAccounting where campaignCid=3 group by accountUid) as c
on a.id=c.accountUid
where b. campaignCid =3 limit 10;
*/