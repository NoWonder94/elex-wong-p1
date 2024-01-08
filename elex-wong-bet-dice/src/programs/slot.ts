import { GameProgram } from "./game";
import * as State from "./state";
import { CONFIG } from "@/defines";

export class SlotProgram extends GameProgram {
  protected emitName:string = 'SlotBet';
  protected gameConfig:any = CONFIG.slot;

  async bet(amount:number) {
    return await this.submitBet(amount, new State.SlotBetInstruction({
      action:0,
      token_type: this.loginType,
      amount:amount
    }));
  }
}