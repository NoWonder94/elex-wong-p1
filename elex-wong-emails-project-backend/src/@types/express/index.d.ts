import { Account } from "../../generated/prisma/main-schema";

declare global {
  declare namespace Express {
    export interface Request {
      account: Account;
    }
    export interface Response {
      account: Account;
    }
  }
}
