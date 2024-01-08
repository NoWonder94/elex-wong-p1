import { CampaignJson } from "./campaign"

export type JoinedCampaign = {
  id: number
  created_at: Date
  referral_code: string
  l1_referral_code: string | null
  l2_referral_code: string | null
  l3_referral_code: string | null
  l1_user_count: number
  l2_user_count: number
  l3_user_count: number

  campaign?: CampaignJson;
}