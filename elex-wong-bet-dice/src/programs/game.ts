import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  ConfirmedTransaction,
  NONCE_ACCOUNT_LENGTH,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_RECENT_BLOCKHASHES_PUBKEY
} from '@solana/web3.js';

import { 
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

import { WalletProgram } from "./wallet";
import * as State from "./state";
import { CONFIG } from "@/defines";
import { Seed, Api } from '@/utils';
import { useToast } from "vue-toastification";

export class GameProgram extends WalletProgram {
  protected emitName:string = '';
  protected gameConfig:any = {};

  async setBetDataInstruction(transaction:Transaction, betKey:PublicKey, amount:number) {
    if (this.loginType != 'sol') {
      amount = await this.connection.getMinimumBalanceForRentExemption(this.gameConfig.betSpace);
    }

    const account = await this.connection.getAccountInfo(betKey);
    if (account === null) {
      transaction.add(SystemProgram.createAccountWithSeed({
        fromPubkey: this.loginKey,
        basePubkey: this.loginKey,
        seed: this.gameConfig.betSeed,
        newAccountPubkey: betKey,
        lamports: amount,
        space: this.gameConfig.betSpace,
        programId: this.gameConfig.key
      }));
    } else {
      transaction.add(SystemProgram.transfer({
        fromPubkey: this.loginKey,
        toPubkey: betKey,
        lamports: amount
      }));
    }
  }

  async submitBet(amount:number, betInstruction:any) {
    await this.setRelateLcd();

    const betKey = await PublicKey.createWithSeed(this.loginKey, this.gameConfig.betSeed, this.gameConfig.key);

    let transaction = new Transaction();
    const toast = useToast();
    let toastId = null;
    await this.setAccountInstruction(transaction);
    await this.setLcdInstruction(transaction);

    const nonceKey = await PublicKey.createWithSeed(this.loginKey, CONFIG.service.nonceSeed, SystemProgram.programId);
    const nonceAccount = await this.connection.getAccountInfo(nonceKey);
    if (nonceAccount == null) {
      const dataLamports = await this.connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH);
      transaction.add(SystemProgram.createNonceAccount({
        authorizedPubkey: CONFIG.service.manage,
        basePubkey: this.loginKey,
        fromPubkey: this.loginKey,
        lamports: dataLamports,
        noncePubkey: nonceKey,
        seed: CONFIG.service.nonceSeed
      }));
    }

    if (nonceAccount == null || (this.loginType != 'sol' && transaction.instructions.length > 1)) {
      toastId = toast.info((window as any).$i18n.t('createBetAccount'));
      await this.sendTransaction(transaction);
      toast.dismiss(toastId);

      toastId = toast.info((window as any).$i18n.t('createAccountOkBeginBet'));
      transaction = new Transaction();
    }

    await this.setBetDataInstruction(transaction, betKey, amount);

    //bet
    let keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: betKey, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.manage, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.config, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.service, isSigner: false, isWritable: false},
      {pubkey: CONFIG.service.manage, isSigner: false, isWritable: false},
      {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`service.risky.fundpools.${this.loginType}`), isSigner: false, isWritable: true},
      {pubkey: nonceKey, isSigner: false, isWritable: true},
      {pubkey: Seed.get(), isSigner: false, isWritable: false},
      {pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY, isSigner: false, isWritable: false}
    ];

    if (this.loginType != 'sol') {
      keys.push({pubkey: this.loginToken, isSigner: false, isWritable: true});
    }

    keys.push(
      {pubkey: this.gameConfig.key, isSigner: false, isWritable: false},
      {pubkey: CONFIG.service.key, isSigner: false, isWritable: false},
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
    );

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: this.gameConfig.key,
      data: betInstruction.encode()
    }));

    //payout
    keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: betKey, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.manage, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.config, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`service.dividend.fundpools.${this.loginType}`), isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.fundpools.sol, isSigner: false, isWritable: true},
      {pubkey: this.gameConfig.service, isSigner: false, isWritable: false}
    ];

    if (this.loginType != 'sol') {
      keys.push(
        {pubkey: this.loginToken, isSigner: false, isWritable: true},
        {pubkey: CONFIG.get(`service.risky.fundpools.${this.loginType}`), isSigner: false, isWritable: true}
      );
    }

    keys.push(
      {pubkey: CONFIG.service.key, isSigner: false, isWritable: false},
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
    );

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: this.gameConfig.key,
      data: Buffer.alloc(1, 2)
    }));

    //dividend
    keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: betKey, isSigner: false, isWritable: false},
      {pubkey: this.gameConfig.service, isSigner: false, isWritable: false},
      {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true},
      {pubkey: this.relateKeys.lcdKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.get(`dev.tokens.lcds.${this.loginType}`), isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.dividend.fundpools.sol, isSigner: false, isWritable: false},
      {pubkey: CONFIG.get(`tokens.lcds.${this.loginType}`), isSigner: false, isWritable: true}
    ];

    let is_upline = 0;
    if (this.relateKeys.uplineLcdAccount) {
      is_upline = 1;
      keys.push(
        {pubkey: this.relateKeys.uplineKey, isSigner: false, isWritable: false},
        {pubkey: this.relateKeys.uplineDataKey, isSigner: false, isWritable: true},
        {pubkey: this.relateKeys.uplineLcdKey, isSigner: false, isWritable: true}
      );
    }

    keys.push(
      {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: CONFIG.service.key, isSigner: false, isWritable: false}
    );

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: this.gameConfig.key,
      data: Buffer.from([3, is_upline])
    }));

    const result = await this.sendTransaction(transaction, [], true);
    if (toastId != null) {
      toast.dismiss(toastId);
    }
    return result;
  }

  async getSimulateNonces(data:any) {
    if (GameProgram.LOGIN_KEY) {
      const nonceKey = await PublicKey.createWithSeed(this.loginKey, CONFIG.service.nonceSeed, SystemProgram.programId);
      data.noncePubkey = nonceKey.toBase58();
      const nonceAccount = await this.connection.getNonce(nonceKey, 'confirmed');
      if (nonceAccount) {
        data.rollNonce = nonceAccount.nonce;
      }
    }
  }

  async getSimulateSeeds(data:any) {
    this.getSimulateNonces(data);
    data.clockSlot = await this.connection.getSlot('confirmed');
    data.clockTime = await this.connection.getBlockTime(data.clockSlot, 'confirmed');

    switch (this.emitName) {
      case 'DiceBet': {
        const dcAccount = await this.connection.getAccountInfo(CONFIG.dice.config);
        const diceConfig = State.DiceConfig.decode(dcAccount.data);
        data.rollTimes = diceConfig.total_times.toNumber();
        break;
      }
      case 'SlotBet': {
        const scAccount = await this.connection.getAccountInfo(CONFIG.slot.config);
        const slotConfig = State.SlotConfig.decode(scAccount.data);
        data.rollTimes = slotConfig.total_times.toNumber();
        break;
      }
    }
  }

  async getProgramTransactions(last: string | null) {
    return Api.get('Transaction/lists', {
      params: {
        program: this.gameConfig.key.toBase58(),
        payer: '',
        last: last
      }
    });
  }

  async getWalletTransactions(last: string | null) {
    return Api.get('Transaction/lists', {
      params: {
        program: this.gameConfig.key.toBase58(),
        payer: this.loginKey.toBase58(),
        last: last
      }
    });
  }

  async getProgramTransactionWins(page:number) {
    return Api.get('Transaction/wins', {
      params: {
        program: this.gameConfig.key.toBase58(),
        page: page
      }
    });
  }

  async getProgramRanks() {
    return Api.get('Transaction/ranks', {
      params: {
        program: this.gameConfig.key.toBase58()
      }
    });
  }

  async getProgramTransaction(keys:any) {
    return Api.post('Transaction/get', {
      program: this.gameConfig.key.toBase58(),
      payer: GameProgram.LOGIN_KEY ? GameProgram.LOGIN_KEY.toBase58() : '',
      keys: keys
    });
  }

  async getTransactionBySignature(signature:string, checkFun:any) {
    const retryFun = () => {
      if (checkFun(signature)) {
        setTimeout(() => {
          this.getTransactionBySignature(signature, checkFun);
        }, 100);
      }
    }

    this.connection.getConfirmedTransaction(signature, "confirmed").then((result: null | ConfirmedTransaction) => {
      if (!result || !result.meta || !result.meta.logMessages || !result.transaction || !result.transaction.feePayer) {
        retryFun();
        return;
      }

      if (result.meta.err) {
        return;
      }
      
      const info = GameProgram.getInfoByLog(result.meta.logMessages);
      if (!info.data) {
        retryFun();
        return;
      }

      const transactionData = {
        signature: signature,
        program: this.gameConfig.key.toBase58(),
        payer: result.transaction.feePayer.toBase58(),
        fee: result.meta.fee,
        create_time: result.blockTime,
        data: info.data
      };
      (window as any).$bus.emit(this.emitName, transactionData);
    }).catch((err:Error) => {
      retryFun();
    });
  }

  static logWalletKeyword = "Data::BetWallet::";
  static logDataKeyword = "Data::BetResult::";
  static getInfoByLog(logs:string[]) {
    const dataLen = GameProgram.logDataKeyword.length;
    const walletLen = GameProgram.logWalletKeyword.length;
    const result:any = {'data':null, 'wallet':null};
    let index;
    for (const log of logs) {
      if (result.wallet == null) {
        index = log.indexOf(GameProgram.logWalletKeyword);
        if (index > 0) {
          result.wallet = log.substr(index + walletLen);
          continue;
        }
      }

      if (result.data == null) {
        index = log.indexOf(GameProgram.logDataKeyword);
        if (index > 0) {
          result.data = JSON.parse(log.substr(index + dataLen));
        }
      }

      if (result.wallet != null && result.data != null) {
        break;
      }
    }
    return result;
  }
}