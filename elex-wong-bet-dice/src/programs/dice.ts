import { PublicKey } from '@solana/web3.js';
import { GameProgram } from "./game";
import * as State from "./state";
import { CONFIG } from "@/defines";
import { Seed } from '@/utils';
import { createHash } from 'crypto';
import { BigNumber } from "bignumber.js";

export class DiceProgram extends GameProgram {
  protected emitName:string = 'DiceBet';
  protected gameConfig:any = CONFIG.dice;

  async bet(amount:number, predict:number, condition:number) {
    return await this.submitBet(amount, new State.DiceBetInstruction({
      action: 0,
      token_type: this.loginType,
      amount: amount,
      predict: predict,
      condition: condition
    }));
  }

  simulate(data:any) {
    const clientSeed = new PublicKey(data.clientSeed);
    const noncePubkey = new PublicKey(data.noncePubkey);
    const rollNonce = new PublicKey(data.rollNonce);
    const seedNum = parseInt(data.clockTime) + parseInt(data.clockSlot) + parseInt(data.rollTimes);
    const seedSha = createHash('sha256');
    seedSha.update(clientSeed.toBuffer());
    seedSha.update(noncePubkey.toBuffer());
    seedSha.update(data.predict.toString());
    seedSha.update(data.payout.toString());
    seedSha.update(seedNum.toString());

    const rollSeed = new PublicKey(seedSha.digest());

    const rollSha = createHash('sha512');
    rollSha.update(rollSeed.toBuffer());
    rollSha.update(rollNonce.toBuffer());

    const rollHexs = rollSha.digest('hex');
    const rollLen  = rollHexs.length;
    let rollIndex  = 0;
    let rollNum    = parseInt(rollHexs.substr(rollIndex, 5), 16);

    while (rollNum >= 1000000) {
        rollIndex += 5;
        if (rollLen - rollIndex < 5) {
            rollNum = 9999;
            break;
        }
        rollNum = parseInt(rollHexs.substr(rollIndex, 5), 16);
    }

    return rollNum % 10000;
  }
}