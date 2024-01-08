/* import spawnAsync from "@expo/spawn-async";
import { format } from 'date-fns';
import { PoolConnection } from "mysql2";
import { randomHex } from "web3-utils";
import { promisePool } from "../db"; */

import { Account } from "../generated/prisma/main-schema";

class IRedmailService {
  /**
   * Creates required information into iredmail's mysql database to create the real mail account
   * for the given emails.com account.
   */
  public async setupAccount(account: Account): Promise<void> {
    /* TODO - RESTORE const conn: PoolConnection = await promisePool.getConnection()

    await conn.beginTransaction(() => { });
    try {
      let { stdout } = await spawnAsync('doveadm', ['pw', '-s', 'ssha512', '-p', randomHex(16)]);

      //const hotFix = convertChain(airdrop.chain);
      //if (!hotFix) {
      //    return Promise.reject("Unknown chain network!");
      //}
      const emailSuffix = "emails.com";

      const email = `${account.address}@${emailSuffix}`;

      let err = ""
      const passwordSHA512 = stdout;
      const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      await conn.execute(`INSERT INTO mailbox (username, password, name,storagebasedirectory,storagenode, maildir, quota, domain, active, passwordlastchange, created)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [email, passwordSHA512, account.address,
          '/var/vmail', 'vmail1', `${emailSuffix}/t/e/s/app-${format(new Date, "yyyy.MM.dd.HH.mm.ss")}/`,
          '1024', emailSuffix, '1', now, now])
      await conn.execute(`INSERT INTO forwardings (address, forwarding, domain, dest_domain, is_forwarding)  VALUES (?,?,?,?,?)`,
        [email, account.forwardingEmail ? account.forwardingEmail : email, emailSuffix, emailSuffix, 1])
    } catch (e) {
      err = "Error";
      console.log(e);
      await conn.rollback();
    } finally {
      await conn.release();
    } */
  }
}

export const iRedmailService = new IRedmailService();