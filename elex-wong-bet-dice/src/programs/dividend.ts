import {
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { WalletProgram } from "./wallet";
import * as State from "./state";
import { CONFIG } from "@/defines";

export class DividendProgram extends WalletProgram {

  static format(data:any) {
    return State.Dividend.decode(data);
  }

  async freeze() {
    await this.setRelateLcd();

    const instruction = new State.ServiceTokenInstruction({
      action: 0,
      instruction: 1,
      token_type: this.loginType
    });

    const transaction = new Transaction();
    transaction.add(new TransactionInstruction({
      keys: [
        {pubkey: this.loginKey, isSigner: true, isWritable: false},
        {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true},
        {pubkey: this.relateKeys.lcdKey, isSigner: false, isWritable: true},
        {pubkey: CONFIG.service.dividend.key, isSigner: false, isWritable: true},
        {pubkey: CONFIG.get(`tokens.lcds.${this.loginType}`), isSigner: false, isWritable: true},
        {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}
      ],
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));
    return await this.sendTransaction(transaction);
  }

  async unfreeze() {
    await this.setRelateLcd();

    const instruction = new State.ServiceTokenInstruction({
      action: 0,
      instruction: 2,
      token_type: this.loginType
    });

    const transaction = new Transaction();

    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true},
      {pubkey: this.relateKeys.lcdKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.fundpools.sol, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`tokens.lcds.${this.loginType}`), isSigner: false, isWritable: true},
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}
    ];

    if (this.loginKey != 'sol') {
      keys.push({pubkey: CONFIG.get(`service.dividend.fundpools.${this.loginType}`), isSigner: false, isWritable: true});
    }

    keys.push({pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false});

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));
    return await this.sendTransaction(transaction);
  }

  async claim() {
    await this.setRelateLcd();

    const instruction = new State.ServiceTokenInstruction({
      action: 0,
      instruction: 3,
      token_type: this.loginType
    });

    const transaction = new Transaction();

    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.fundpools.sol, isSigner: false, isWritable: true}
    ];

    if (this.loginKey != 'sol') {
      keys.push({pubkey: CONFIG.get(`service.dividend.fundpools.${this.loginType}`), isSigner: false, isWritable: true});
    }

    keys.push({pubkey: SystemProgram.programId, isSigner: false, isWritable: false});

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));
    return await this.sendTransaction(transaction);
  }
}