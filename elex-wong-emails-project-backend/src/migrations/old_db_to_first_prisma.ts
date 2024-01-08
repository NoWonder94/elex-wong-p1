import { prisma, prismaLegacy } from "../db";
import { logger } from "../logger";

/**
 * Converts all entries from the very first PoC done with only a single "airdrop" database
 * into the initial "clean" database format, multi tables, with account management.
 *
 * Algorithm:
 * - create project Emails.com
 * - create a EMLS token (with only symbol, polygon chain, no address)
 * - create a EMLS campaign (use the EMLS token)
 * - create accounts (wallet, forward email, ip)
 * - create one "joined campaign" entry for each old 'airdrop" entry
 *  - with one referral code
 *
 * Later:
 * - update email addresses like eth.emails.com to simply emails.com
 */
class OldDBToFirstPrismaMigration {
  public async run() {
    let allOldAirdrops = await prismaLegacy.airdrop.findMany();

    // Load the root account that will "own" the emails.com project - must have been created first
    let rootAccount = await prisma.account.findFirst({
      where: {
        address: "0xbA1ddcB94B3F8FE5d1C0b2623cF221e099f485d1" // For now, ben's wallet
      }
    });

    if (!rootAccount)
      throw new Error("Root account not found!");

    // Create emails.com root project
    let rootProject = await prisma.project.create({
      data: {
        name: "Emails.com",
        url: "https://emails.com",
        owner: { connect: { id: rootAccount.id } },
        twitter_id: "",
        category: ""
      }
    });
    logger.info("Root emails.com project created");

    // Create EMLS token
    let emlsToken = await prisma.eRC20Token.create({
      data: {
        title: "EMLS Token",
        project: { connect: { id: rootProject.id } },
        contract_address: "",
        symbol: "EMLS",
        decimals: 18,
        chain_id: 137 // Polygon
      }
    });
    logger.info("EMLS token created");

    // Create the EMLS main campaign
    let campaignRefCode = "EMAIL3COM";
    await this.upsertRefCode(campaignRefCode);

    let rootCampaign = await prisma.campaign.create({
      data: {
        name: "Emails.com EMLS campaign",
        type: "",
        referral_code: campaignRefCode,
        project: { connect: { id: rootProject.id } },
        token: { connect: { id: emlsToken.id } },
        token_amount: 1000000,
        // Commissions
        initial_amount: 1000,
        l1_token_amount: 500,
        l2_token_amount: 200,
        l3_token_amount: 100
      }
    });
    logger.info("Root campaign created");

    logger.info("Creating account and making join the EMLS campaign");
    let creationCount = 0;
    let failedImports = 0;
    for (let oldAirdrop of allOldAirdrops) {
      // Wallet address
      let atIndex = oldAirdrop.username.indexOf("@");
      if (atIndex === -1)
        throw new Error(`Invalid username ${oldAirdrop.username}`);

      let walletAddress = oldAirdrop.username.substring(0, atIndex).toLowerCase();

      // Create an account
      let account = await prisma.account.create({
        data: {
          address: walletAddress,
          forwarding_email: oldAirdrop.forwarding || "",
          creation_ip_Address: oldAirdrop.ip || ""
        }
      });

      try {
        // Create referral code instances
        await this.upsertRefCode(oldAirdrop.refercode);
        await this.upsertRefCode(oldAirdrop.level1);
        await this.upsertRefCode(oldAirdrop.level2);
        await this.upsertRefCode(oldAirdrop.level3);

        // Create joined campaign
        let joinedCampaign = await prisma.joinedCampaign.create({
          data: {
            account: { connect: { id: account.id } },
            campaign: { connect: { id: rootCampaign.id } },
            referral_code: oldAirdrop.refercode,

            // Tracking / Stats of referred users (users (3 levels) invited by this user)
            l1_referral_code: oldAirdrop.level1,
            l2_referral_code: oldAirdrop.level2,
            l3_referral_code: oldAirdrop.level3,
            l1_user_count: oldAirdrop.count1 || 0,
            l2_user_count: oldAirdrop.count2 || 0,
            l3_user_count: oldAirdrop.count3 || 0
          }
        });

        creationCount++;

        if (creationCount % 100 === 0)
          logger.info(`Created ${creationCount} accounts`);
      }
      catch (e) {
        logger.warn("Failed to create joined campaign for account", account, oldAirdrop, e);
        failedImports++;
      }
    }

    logger.info("Migration completed");
    logger.warn(`${failedImports} accounts failed to be imported`);
  }

  private async upsertRefCode(refCode: string) {
    if (!refCode)
      return;

    await prisma.referralCode.upsert({
      where: { code: refCode },
      update: { code: refCode },
      create: {
        code: refCode,
        purpose: "campaign"
      },
    });
  }
}

const migration = new OldDBToFirstPrismaMigration();
migration.run();