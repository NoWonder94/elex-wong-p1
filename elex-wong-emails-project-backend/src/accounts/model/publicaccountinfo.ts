export type PublicAccountInfo = {
  address: string;
  forwarding_email: string;
  forwarding_email_verified: boolean;
  twitter: string;
  discord: string;
  is_admin: boolean;
}

export type UpdatedAccountInfo = {
  forwarding_email: string;
}