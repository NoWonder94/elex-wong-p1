import {
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';

import { 
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token
} from '@solana/spl-token';

import { WalletProgram } from "./wallet";
import * as State from "./state";
import { CONFIG } from "@/defines";
import { Upline, Common } from '@/utils';
import { useToast } from "vue-toastification";

export class ServiceProgram extends WalletProgram {
  
  async getWalletData() {
    const dataKey = await this.getWalletDataKey(this.loginKey);
    const dataAccount = await this.connection.getAccountInfo(dataKey);
    if (dataAccount) {
      return State.WalletData.decode(dataAccount.data);
    }
    return null;
  }

  async getAccounts(accounts:any) {
    accounts.data_pubkey = null;
    accounts.data_account = null;
    accounts.data_lamports = 0;
    accounts.referral_url = '';
    accounts.lcd_pubkeys = {};
    accounts.lcd_accounts = {};
    accounts.lcd_nulls = 0;
    accounts.risk_pubkeys = {};
    accounts.risk_accounts = {};
    accounts.risk_nulls = 0;
    
    const key = ServiceProgram.LOGIN_KEY;
    if (key) {
      accounts.data_pubkey = await this.getWalletDataKey(key);
      accounts.data_account = await this.connection.getAccountInfo(accounts.data_pubkey);
      if (accounts.data_account) {
        accounts.referral_url = CONFIG.siteUrl + `?upline=${key.toBase58()}`;
      } else {
        const lamports = await this.connection.getMinimumBalanceForRentExemption(CONFIG.service.dataSpace);
        accounts.data_lamports = Common.lamportToAmount(lamports, 'sol');
      }
    }
  
    const lcds = CONFIG.tokens.lcds as any;
    for (const name in lcds) {
      if (key) {
        accounts.lcd_pubkeys[name] = await this.getWalletTokenKey(lcds[name], key);
        accounts.lcd_accounts[name] = await this.connection.getAccountInfo(accounts.lcd_pubkeys[name]);
      } else {
        accounts.lcd_accounts[name] = null;
      }

      if (!accounts.lcd_accounts[name] && name == 'sol') {
        accounts.lcd_nulls++;
      }
    }

    const risks = CONFIG.tokens.risks as any;
    for (const name in risks) {
      if (key) {
        accounts.risk_pubkeys[name] = await this.getWalletTokenKey(risks[name], key);
        accounts.risk_accounts[name] = await this.connection.getAccountInfo(accounts.risk_pubkeys[name]);
      } else {
        accounts.risk_accounts[name] = null;
      }

      if (!accounts.risk_accounts[name] && name == 'sol') {
        accounts.risk_nulls++;
      }
    }
    return accounts;
  }

  async referralInit(accounts:any, createLcds:any, callback:any) {
    const transaction = new Transaction();
    if (!accounts.data_account) {
      const dataLamports = await this.connection.getMinimumBalanceForRentExemption(CONFIG.service.dataSpace);
      transaction.add(SystemProgram.createAccountWithSeed({
        fromPubkey: this.loginKey,
        basePubkey: this.loginKey,
        seed: CONFIG.service.dataSeed,
        newAccountPubkey: accounts.data_pubkey,
        lamports: dataLamports,
        space: CONFIG.service.dataSpace,
        programId: CONFIG.service.key
      }));

      const oldKey = await this.getOldWalletDataKey();
      if (oldKey) {
        transaction.add(new TransactionInstruction({
          keys: [
            {pubkey: this.loginKey, isSigner: true, isWritable: false},
            {pubkey: oldKey, isSigner: false, isWritable: true},
            {pubkey: accounts.data_pubkey, isSigner: false, isWritable: true}
          ],
          programId: CONFIG.service.key,
          data: Buffer.alloc(1, 4)
        }));
      } else {
        let isUpline = 0;
        const keys = [
          {pubkey: this.loginKey, isSigner: true, isWritable: false},
          {pubkey: accounts.data_pubkey, isSigner: false, isWritable: true}
        ];

        const uplinePubkey = Upline.get();

        if (uplinePubkey) {
          const uplineDataPubkey = await this.getWalletDataKey(uplinePubkey);
          isUpline = 1;
          keys.push(
            {pubkey: uplinePubkey, isSigner: false, isWritable: false},
            {pubkey: uplineDataPubkey, isSigner: false, isWritable: true}
          );
        }

        transaction.add(new TransactionInstruction({
          keys: keys,
          programId: CONFIG.service.key,
          data: Buffer.from([3, isUpline])
        }));
      }
    }

    for (const name in createLcds) {
      if (!createLcds[name] || accounts.lcd_accounts[name]) {
        continue;
      }

      transaction.add(Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        CONFIG.get(`tokens.lcds.${name}`),
        accounts.lcd_pubkeys[name],
        this.loginKey,
        this.loginKey
      ));
    }

    if (transaction.instructions.length > 0) {
      const signature = await this.sendTransaction(transaction);
      this.checkTransactionBySignature(signature, callback);
    } else {
      callback(null);
    }
  }

  async referralRewardWithdraw(tokenType:string, tokens:any) {
    await this.setRelateKeys();

    if (tokenType != 'sol' && !tokens[tokenType].key) {
      useToast().error((window as any).$i18n.t('noTokenAccountNotWithdraw', [Common.formatAddress(this.loginKey), tokenType.toUpperCase()]));
      return;
    }

    const instruction = new State.ServiceTypeInstruction({
      action: 5,
      token_type: tokenType
    });

    const transaction = new Transaction();

    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: true},
      {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.key, isSigner: false, isWritable: true},
      {pubkey: CONFIG.service.risky.fundpools.sol, isSigner: false, isWritable: true}
    ];

    if (tokenType != 'sol') {
      keys.push(
        {pubkey: tokens[tokenType].key, isSigner: false, isWritable: true},
        {pubkey: CONFIG.get(`service.risky.fundpools.${tokenType}`), isSigner: false, isWritable: true},
        {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}
      );
    } else {
      keys.push(
        {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
      );
    }

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: CONFIG.service.key,
      data: instruction.encode()
    }));
    return await this.sendTransaction(transaction);
  }
}