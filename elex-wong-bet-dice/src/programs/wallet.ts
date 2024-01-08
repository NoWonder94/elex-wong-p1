import { 
  Signer,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  ConfirmedTransaction
} from '@solana/web3.js';

import { 
  AccountLayout,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token
} from '@solana/spl-token';

import { Connection, Upline, Common, UInt64 } from '@/utils';
import { CONFIG } from '@/defines';
import { BaseProgram } from "./base";
import * as State from "./state";

export class WalletProgram extends BaseProgram {
  protected connection:any;

  constructor() {
    super();
    this.init();
    this.connection = Connection.get();
  }

  protected static WALLET:any;
  get wallet() {
    return WalletProgram.WALLET;
  }

  protected static LOGIN_KEY:any;
  get loginKey():any {
    if (!WalletProgram.LOGIN_KEY) {
      throw new Error((window as any).$i18n.t('loginWallet'));
    }
    return WalletProgram.LOGIN_KEY;
  }

  protected static LOGIN_TYPE:string = "sol";
  get loginType():any {
    return WalletProgram.LOGIN_TYPE;
  }

  protected static LOGIN_TOKEN:any;
  get loginToken():any {
    if (!WalletProgram.LOGIN_TOKEN) {
      throw new Error((window as any).$i18n.t('loginWallet'));
    }
    return WalletProgram.LOGIN_TOKEN;
  }

  protected static RELATE_KEYS:any;
  get relateKeys() {
    return WalletProgram.RELATE_KEYS;
  }

  static formatWalletData(data:any) {
    return State.WalletData.decode(data);
  }

  static formatWalletTokenAmount(data:any) {
    if (data < 1) {
      return 0;
    }
    const info = AccountLayout.decode(Buffer.from(data));
    return UInt64.fromBuffer(info.amount).toNumber(); 
  }

  protected static IS_INIT:boolean = false;
  protected init() {
    if (WalletProgram.IS_INIT) {
      return;
    }
    WalletProgram.IS_INIT = true;

    const storeAccount = (window as any).$store.state.account;
    if (storeAccount.wallet) {
      WalletProgram.WALLET = storeAccount.wallet;
      WalletProgram.LOGIN_KEY = storeAccount.wallet.publicKey;
      WalletProgram.LOGIN_TYPE = storeAccount.token_type;
      WalletProgram.LOGIN_TOKEN = storeAccount.tokens[WalletProgram.LOGIN_TYPE].key;
    }

    (window as any).$bus.on('TokenTypeChange', (name:string) => {
      WalletProgram.LOGIN_TYPE = storeAccount.token_type;
      WalletProgram.LOGIN_TOKEN = storeAccount.tokens[WalletProgram.LOGIN_TYPE].key;
    });

    (window as any).$bus.on('WalletConnected', (status:boolean) => {
      if (status) {
        WalletProgram.WALLET = storeAccount.wallet;
        const loginKey = storeAccount.wallet.publicKey;
        if (!WalletProgram.LOGIN_KEY || !WalletProgram.LOGIN_KEY.equals(loginKey)) {
          WalletProgram.LOGIN_KEY = loginKey;
          WalletProgram.IS_RESET_RELATE_KEYS = true;
        }
      } else {
        WalletProgram.WALLET = null;
        WalletProgram.LOGIN_KEY = null;
        WalletProgram.LOGIN_TOKEN = null;
        WalletProgram.RELATE_KEYS = null;
      }
    });
  }

  protected static IS_RESET_RELATE_KEYS:boolean = true;
  protected static RELATE_LOGIN_KEY:PublicKey;

  protected async setRelateKeys() {
    const key = this.loginKey;
    if (!WalletProgram.IS_RESET_RELATE_KEYS && key.equals(WalletProgram.RELATE_LOGIN_KEY)) {
      return false;
    }
    WalletProgram.IS_RESET_RELATE_KEYS = false;
    WalletProgram.RELATE_LOGIN_KEY = key;

    const relateKeys:any = {};
    relateKeys.uplineKey = null;
    relateKeys.dataKey = await this.getWalletDataKey(key);
    relateKeys.dataAccount = await this.connection.getAccountInfo(relateKeys.dataKey);
    
    if (relateKeys.dataAccount == null) {
      const uplineKey = Upline.get();
      if (uplineKey && !uplineKey.equals(key)) {
        relateKeys.uplineKey = uplineKey;
      }
    } else {
      const walletData = State.WalletData.decode(relateKeys.dataAccount.data);
      if (walletData.upline) {
        relateKeys.uplineKey = new PublicKey(walletData.upline);
      }
    }

    if (!relateKeys.uplineKey) {
      WalletProgram.RELATE_KEYS = relateKeys;
      return true;
    }

    relateKeys.uplineDataKey = await this.getWalletDataKey(relateKeys.uplineKey);
    relateKeys.uplineDataAccount = await this.connection.getAccountInfo(relateKeys.uplineDataKey);
    if (relateKeys.uplineDataAccount == null) {
      relateKeys.uplineKey = null;
    }
    WalletProgram.RELATE_KEYS = relateKeys;
    return true;
  }

  protected static RELATE_LCD_LOGIN_TYPE:string;
  protected static IS_RESET_RELATE_LCD:boolean = true;
  protected async setRelateLcd() {
    const type = this.loginType;
    if (!await this.setRelateKeys() && !WalletProgram.IS_RESET_RELATE_LCD && type == WalletProgram.RELATE_LCD_LOGIN_TYPE) {
      return;
    }

    WalletProgram.IS_RESET_RELATE_LCD = false;
    WalletProgram.RELATE_LCD_LOGIN_TYPE = type;

    WalletProgram.RELATE_KEYS.lcdKey = await this.getWalletTokenKey(CONFIG.get(`tokens.lcds.${type}`), this.loginKey);
    WalletProgram.RELATE_KEYS.lcdAccount = await this.connection.getAccountInfo(WalletProgram.RELATE_KEYS.lcdKey);

    if (!WalletProgram.RELATE_KEYS.uplineKey) {
      return;
    }

    WalletProgram.RELATE_KEYS.uplineLcdKey = await this.getWalletTokenKey(CONFIG.get(`tokens.lcds.${type}`), WalletProgram.RELATE_KEYS.uplineKey);
    WalletProgram.RELATE_KEYS.uplineLcdAccount = await this.connection.getAccountInfo(WalletProgram.RELATE_KEYS.uplineLcdKey);
  }

  async getWalletDataKey(key: PublicKey) {
    return await PublicKey.createWithSeed(key, CONFIG.service.dataSeed, CONFIG.service.key);
  }

  async getWalletTokenKey(mint: PublicKey, owner: PublicKey) {
    return await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      owner
    );
  }

  async getOldWalletDataKey() {
    for (const seed of CONFIG.service.dataSeedOlds) {
      const oldkey = await PublicKey.createWithSeed(this.loginKey, seed, CONFIG.service.key);
      const account = await Connection.get().getAccountInfo(oldkey);
      if (account != null) {
        return oldkey;
      }
    }
    return null;
  }

  async setAccountInstruction(transaction:Transaction) {
    if (this.relateKeys.dataAccount) {
      return;
    }

    const dataLamports = await this.connection.getMinimumBalanceForRentExemption(CONFIG.service.dataSpace);
    transaction.add(SystemProgram.createAccountWithSeed({
      fromPubkey: this.loginKey,
      basePubkey: this.loginKey,
      seed: CONFIG.service.dataSeed,
      newAccountPubkey: this.relateKeys.dataKey,
      lamports: dataLamports,
      space: CONFIG.service.dataSpace,
      programId: CONFIG.service.key
    }));

    WalletProgram.IS_RESET_RELATE_KEYS = true;

    const oldKey = await this.getOldWalletDataKey();
    if (oldKey) {
      transaction.add(new TransactionInstruction({
        keys: [
          {pubkey: this.loginKey, isSigner: true, isWritable: false},
          {pubkey: oldKey, isSigner: false, isWritable: true},
          {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true}
        ],
        programId: CONFIG.service.key,
        data: Buffer.alloc(1, 4)
      }));
      return;
    }

    let isUpline = 0;
    const keys = [
      {pubkey: this.loginKey, isSigner: true, isWritable: false},
      {pubkey: this.relateKeys.dataKey, isSigner: false, isWritable: true}
    ];

    if (this.relateKeys.uplineKey) {
      isUpline = 1;
      keys.push(
        {pubkey: this.relateKeys.uplineKey, isSigner: false, isWritable: false},
        {pubkey: this.relateKeys.uplineDataKey, isSigner: false, isWritable: true}
      );
    }

    transaction.add(new TransactionInstruction({
      keys: keys,
      programId: CONFIG.service.key,
      data: Buffer.from([3, isUpline])
    }));

    WalletProgram.IS_RESET_RELATE_KEYS = true;
  }

  async setLcdInstruction(transaction:Transaction) {
    if (this.relateKeys.lcdAccount) {
      return;
    }
    
    transaction.add(Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      CONFIG.get(`tokens.lcds.${this.loginType}`),
      this.relateKeys.lcdKey,
      this.loginKey,
      this.loginKey
    ));
    WalletProgram.IS_RESET_RELATE_LCD = true;
  }

  async sendTransaction(transaction:Transaction, signers?:Signer[], sleep?:boolean) {
    transaction.feePayer = this.loginKey;
    
    //const keypair = Keypair.fromSecretKey(new Uint8Array([]));

    for (;;) {
      transaction.recentBlockhash = await this.connection._pollNewBlockhash();

      if (signers && signers.length > 0) {
        transaction.partialSign(...signers);
      }
      //transaction.sign(keypair);break;

      transaction = await this.wallet.signTransaction(transaction);
      if (!transaction.signature) {
        throw new Error((window as any).$i18n.t('signTransactionError')); // should never happen
      }

      const signature = transaction.signature.toString('base64');
      if (!this.connection._blockhashInfo.transactionSignatures.includes(signature)) {
        this.connection._blockhashInfo.transactionSignatures.push(signature);
        break;
      }
    }

    const rawTransaction = transaction.serialize();

    if (sleep) {
      await Common.sendInit();
    }

    const signature = await this.connection.sendRawTransaction(
      rawTransaction, {
        preflightCommitment: "processed",
        skipPreflight: true,
      }
    );

    console.log('signature:', signature);

    const status = (await this.connection.confirmTransaction(signature, "processed")).value;

    if (status.err) {
      throw new Error((window as any).$i18n.t('transactionFailed', [signature, JSON.stringify(status)]));
    }

    return signature;
  }

  async checkTransactionBySignature(signature:string, callback:any) {
    const retryFun = () => {
      setTimeout(() => {
        this.checkTransactionBySignature(signature, callback);
      }, 100);
    }

    this.connection.getConfirmedTransaction(signature, "confirmed").then((result: null | ConfirmedTransaction) => {
      if (!result || !result.meta || !result.meta.logMessages || !result.transaction || !result.transaction.feePayer) {
        retryFun();
        return;
      }

      console.log(result);

      if (result.meta.err) {
        callback(result.meta.err);
        return;
      }
      
      callback(null);
    }).catch((err:Error) => {
      retryFun();
    });
  }
}