import { ERC20Token, File } from "../../generated/prisma/main-schema";

export type PublicCampaignInfo = {
  id: number;
  name: string;
  presentation: string;
  referral_code: string;
  token?: ERC20Token;
  banner?: File;
  start_date: number;
  end_date: number;
  logo?: File;
  promo_link: string;
  rules: string;
  pid: number;
  medium: string;
  reward_type: string;
  distribution: string;
}