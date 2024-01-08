import Queue from "promise-queue";
import { DataOrError, dataOrErrorData, serverError } from "../common/dataorerror";
import { prisma } from "../db";
import { ReferralCode } from "../generated/prisma/main-schema";

/**
 * This services is used to generate unique referral codes. There are simpler ways to do such things,
 * though we have specific requirements in mind for the generated ref codes:
 * - Avoid randomness (no sequential generation to avoid airdrop guesses)
 * - Uniqueness
 * - Friendliness: not too short, not too long, as those codes are used in emails.com/r/CODE urls and shared a lot.
 * - Codes possibly shared by multiple databases
 *
 * Generation algorithm:
 * - Generate in a semaphore queue to ensure atomicity of operations.
 * - Get number of current ref codes
 * - if count < 200.000 (0xFFFFF max int is           1.048.575): gen random 5 (up to max 20% chance to generate a conflict)
 * - if count < 3.000.000 (0xFFFFFF max int is       16.777.215): gen random 6 (up to max 20% chance to generate a conflict)
 * - if count < 50.000.000 (0xFFFFFFF max int is    268.435.455): gen random 7 (up to max 20% chance to generate a conflict)
 * - if generated code exists in database, try again
 * - if it doesn't exists, save to db and exit
 */
class RefCodesService {
  private queue = new Queue(1); // Max concurrent: one

  public async generateUniqueRefCode(purpose: string): Promise<DataOrError<string>> {
    return this.queue.add(async () => {
      try {
        let count = await prisma.referralCode.count();
        //console.log("count", count)

        let numberOfCodeChars: number;
        if (count < (0xFFFFF / 5)) numberOfCodeChars = 5;
        else if (count < (0xFFFFFF / 5)) numberOfCodeChars = 6;
        else if (count < (0xFFFFFFF / 5)) numberOfCodeChars = 7;
        else if (count < (0xFFFFFFFF / 5)) numberOfCodeChars = 8;
        else
          throw new Error(`Too many existing referral codes! Implementation not done for more codes`);

        let code: string;
        while (true) {
          code = this.generateHexCode(numberOfCodeChars);

          // Check if the code exists
          let existingCode = await prisma.referralCode.findFirst({
            where: {
              code: code
            }
          });

          if (!existingCode) {
            // Save the new code
            await prisma.referralCode.create({
              data: {
                code,
                purpose
              }
            });

            break;
          }
        }

        //console.log("code", code);

        return dataOrErrorData(code);
      }
      catch (e) {
        return serverError("generateUniqueRefCode() failure", e);
      }
    });
  }

  /**
   * Generates a UPPERCASE hex code of 5 chars length
   * - First char can't be 0
   */
  private generateHexCode(numberOfChars: number) {
    let code = "";
    let char: string;
    for (let i = 0; i < numberOfChars; i++) {
      if (i == 0)
        char = Math.floor(1 + Math.random() * 14).toString(16); // 1 or above
      else
        char = Math.floor(Math.random() * 15).toString(16); // 0 or above

      code += char;
    }

    return code.toUpperCase();
  }

  public async getCodeInfo(code: string): Promise<DataOrError<ReferralCode>> {
    let refCode = await prisma.referralCode.findFirst({
      where: {
        code
      }
    });

    return dataOrErrorData(refCode);
  }
}

export const refCodesServices = new RefCodesService();