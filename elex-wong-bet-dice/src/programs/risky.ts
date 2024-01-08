import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';

import { 
  Token,
  MintLayout,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token';

import { WalletProgram } from "./wallet";
import * as State from "./state";
import { CONFIG } from "@/defines";
import { Common, UInt64 } from "@/utils";

export class RiskyProgram extends WalletProgram {
  static formatStats(data:any) {
    const risky = State.Risky.decode(data);
    const indexs = CONFIG.tokens.indexs as any;
    for (const name in indexs) {
      const index = indexs[name];
      risky.tokens[index].total_deposit = Common.lamportToAmount(risky.tokens[index].total_deposit, name);
      risky.tokens[index].total_withdraw = Common.lamportToAmount(risky.tokens[index].total_withdraw, name);
      risky.tokens[index].total_income = Common.lamportToAmount(risky.tokens[index].total_income, name);
      risky.tokens[index].total_outlay = Common.lamportToAmount(risky.tokens[index].total_outlay, name);
    }
    return risky;
  }

  static formatMint(data:any) {
    const token:any = MintLayout.decode(Buffer.from(data));
    token.supply = UInt64.fromBuffer(token.supply); 
    return token;
  }

  protected static RELATE_RISK_LOGIN_TYPE:string;
  protected static IS_RESET_RELATE_RISK:boolean = true;
  protected async setRelateRisk() {
    const type = this.loginType;
    if (!await this.setRelateKeys() && !RiskyProgram.IS_RESET_RELATE_RISK && type == RiskyProgram.RELATE_RISK_LOGIN_TYPE) {
      return;
    }
    RiskyProgram.IS_RESET_RELATE_RISK = false;
    RiskyProgram.RELATE_RISK_LOGIN_TYPE = type;

    RiskyProgram.RELATE_KEYS.riskKey = await this.getWalletTokenKey(CONFIG.get(`tokens.risks.${type}`), this.loginKey);
    RiskyProgram.RELATE_KEYS.riskAccount = await this.connection.getAccountInfo(RiskyProgram.RELATE_KEYS.riskKey);
  }

  setRiskInstruction(transaction:Transaction) {
    if (!this.relateKeys.riskAccount) {
      transaction.add(Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        CONFIG.get(`tokens.risks.${this.loginType}`),
        this.relateKeys.riskKey,
        this.loginKey,
        this.loginKey,
      ));
      RiskyProgram.IS_RESET_RELATE_RISK = true;
    }
  }

  async deposit(amount:number) {
    await this.setRelateRisk();
    
    const transaction = new Transaction();
    this.setRiskInstruction(transaction);

    const instruction = new State.RiskyActionInstruction({
      action: 1,
      instruction: 2,
      amount: Common.amountToLamport(amount, this.loginType),
      token_type: this.loginType
    });

    let depositKey;
    if (this.loginType == 'sol') {
      depositKey = await PublicKey.findProgramAddress([this.loginKey.toBuffer(), CONFIG.service.risky.depositSeed], CONFIG.service.key);
      depositKey = depositKey[0];
      transaction.add(SystemProgram.transfer({
        fromPubkey: this.loginKey,
        lamports: Common.amountToLamport(amount, this.loginType),
        toPubkey: depositKey
      }));
    } else {
      depositKey = this.loginToken;
    }

    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: depositKey, isSigner: false, isWritable: true},
      {pubkey: this.relateKeys.riskKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.fundpools.sol, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`tokens.risks.${this.loginType}`), isSigner: false, isWritable: true}
    ];

    if (this.loginType != 'sol') {
      keys.push({pubkey: CONFIG.get(`service.risky.fundpools.${this.loginType}`), isSigner: false, isWritable: true});
    }

    keys.push(
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
    );
    
    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));

    return await this.sendTransaction(transaction);
  }

  async withdraw(amount:number) {
    await this.setRelateRisk();

    const instruction = new State.RiskyActionInstruction({
      action: 1,
      instruction: 3,
      amount: Common.amountToLamport(amount, this.loginType),
      token_type: this.loginType
    });

    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: this.relateKeys.riskKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`dev.fees.${this.loginType}`), isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.fundpools.sol, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`tokens.risks.${this.loginType}`), isSigner: false, isWritable: true},
    ];

    if (this.loginType != 'sol') {
      keys.push(
        {pubkey: this.loginToken, isSigner: false, isWritable: true},
        {pubkey: CONFIG.get(`service.risky.fundpools.${this.loginType}`), isSigner: false, isWritable: true}
      );
    }

    keys.push(
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
    );

    const transaction = new Transaction();
    transaction.add(new TransactionInstruction({
      keys:keys,
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));

    return await this.sendTransaction(transaction);
  }

  async close() {
    await this.setRelateRisk();

    const transaction = new Transaction();
    transaction.add(new TransactionInstruction({
      keys: [
        {pubkey: this.loginKey, isSigner: true, isWritable: false},
        {pubkey: this.relateKeys.riskKey, isSigner: false, isWritable: true},
        {pubkey: CONFIG.get(`dev.fees.${this.loginType}`), isSigner: false, isWritable: true},
        {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
        {pubkey: CONFIG.service.risky.fundpools.sol, isSigner: false, isWritable: true},
        {pubkey: CONFIG.tokens.risks.sol, isSigner: false, isWritable: true},
        {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
        {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
      ],
      programId: CONFIG.service.key,
      data: Buffer.from([1, 4])
    }));

    const result = await this.sendTransaction(transaction);
    RiskyProgram.IS_RESET_RELATE_RISK = true;
    return result;
  }
}