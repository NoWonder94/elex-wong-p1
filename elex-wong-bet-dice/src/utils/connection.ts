import { 
  Connection as SolanaConnection,
  PublicKey,
  Logs,
  Context,
  AccountInfo
} from '@solana/web3.js';
import { AccountLayout } from '@solana/spl-token';
import { CONFIG } from '@/defines';
import BN from "bn.js";
import { GameProgram, DiceProgram, SlotProgram, DividendProgram, RiskyProgram, ServiceProgram } from '@/programs';


let BASE_CONNECTION:SolanaConnection;
let BIND_ACCOUNT:PublicKey;
let ACCOUNT_EVENT_IDS:any = {};
const BIND_TOKENS:any = {};

export class Connection {

  static get():SolanaConnection {
    return BASE_CONNECTION;
  }

  static init() {
    BASE_CONNECTION = new SolanaConnection(CONFIG.endpoint, {'commitment':'confirmed', 'confirmTransactionInitialTimeout':60000});
    const bus = (window as any).$bus;

    const programLogsFunc = (programKey:PublicKey, emitName: string, logs: Logs) => {
      if (logs.err) {
        return;
      }

      const info = GameProgram.getInfoByLog(logs.logs);
      if (info.wallet == null || info.data == null) {
        return;
      }

      const transactionData = {
        signature: logs.signature,
        program: programKey.toBase58(),
        payer: info.wallet,
        fee: 5000,
        create_time: info.data.timestamp,
        data: info.data
      };

      bus.emit(emitName, transactionData);
    };

    BASE_CONNECTION.onLogs(CONFIG.dice.key, (logs: Logs, ctx: Context) => {
      programLogsFunc(CONFIG.dice.key, 'DiceBet', logs);
    }, "confirmed");

    BASE_CONNECTION.onLogs(CONFIG.slot.key, (logs: Logs, ctx: Context) => {
      programLogsFunc(CONFIG.slot.key, 'DiceBet', logs);
    }, "confirmed");

    const accounts:any = [{
      key: CONFIG.service.dividend.key,
      emit: (info: AccountInfo<Buffer>) => {
        bus.emit('Dividend', DividendProgram.format(info.data));
      }
    }, {
      key: CONFIG.service.risky.key,
      emit: (info: AccountInfo<Buffer>) => {
        bus.emit('RiskyStats', RiskyProgram.formatStats(info.data));
      }
    }];

    let tokens = CONFIG.service.risky.fundpools as any;
    for (const name in tokens) {
      accounts.push({
        key: tokens[name],
        emit: (info: AccountInfo<Buffer>) => {
          let amount;
          if (name == 'sol') {
            amount = info.lamports;
          } else {
            amount = ServiceProgram.formatWalletTokenAmount(info.data);
          }
          bus.emit('RiskyTokenLamports', {"name": name, "amount": amount});
        }
      });
    }

    tokens = CONFIG.tokens.risks as any;
    for (const name in tokens) {
      accounts.push({
        key: tokens[name],
        emit: (info: AccountInfo<Buffer>) => {
          const mint = RiskyProgram.formatMint(info.data);
          bus.emit('RiskyTokenSupply', {"name": name, "amount": mint.supply});
        }
      });
    }

    for (const account of accounts) {
      BASE_CONNECTION.getAccountInfo(account.key, 'confirmed').then((accountInfo:null | AccountInfo<Buffer>) => {
        if (!accountInfo) {
          return;
        }
        account.emit(accountInfo);
      });

      BASE_CONNECTION.onAccountChange(account.key, (accountInfo: AccountInfo<Buffer>, context: Context) => {
        account.emit(accountInfo);
      }, 'confirmed');
    }
  }

  static async tokenBind(name:string, key:null | PublicKey) {
    if (name == 'sol') {
      return;
    }

    if (typeof BIND_TOKENS[name] !== 'undefined' && (key == null || !BIND_TOKENS[name].key.equals(key))) {
        BASE_CONNECTION.removeAccountChangeListener(BIND_TOKENS[name].event_id);
    }

    if (key == null) {
      delete BIND_TOKENS[name];
      return;
    }

    const event_id = BASE_CONNECTION.onAccountChange(key, (accountInfo: AccountInfo<Buffer>, context: Context) => {
      const amount = ServiceProgram.formatWalletTokenAmount(accountInfo.data);
      (window as any).$bus.emit('WalletTokenAmount', {'name':name, 'amount':amount});
    }, 'confirmed');

    BIND_TOKENS[name] = {'key':key, 'event_id':event_id};
  }

  static async accountBind(key:PublicKey) {
    if (BIND_ACCOUNT && key.equals(BIND_ACCOUNT)) {
      return;
    }

    for (const name in ACCOUNT_EVENT_IDS) {
      BASE_CONNECTION.removeAccountChangeListener(ACCOUNT_EVENT_IDS[name]);
    }

    ACCOUNT_EVENT_IDS = {};
    BIND_ACCOUNT = key;

    const bus = (window as any).$bus;

    const accounts:any = [{
      'name':'wallet',
      'key': key,
      'emit': (info: AccountInfo<Buffer>) => {
        bus.emit('WalletTokenAmount', {'name':'sol', 'amount':info.lamports});
      }
    }];

    const data_key  = await ServiceProgram.instance().getWalletDataKey(key);
    accounts.push({
      'name':'wallet',
      'key': data_key,
      'emit': (info: AccountInfo<Buffer>) => {
        const data = ServiceProgram.formatWalletData(info.data);
        bus.emit('WalletData', data);
      }
    });

    const lcd_mints = CONFIG.tokens.lcds as any;
    for (const name in lcd_mints) {
      const token_key = await ServiceProgram.instance().getWalletTokenKey(lcd_mints[name], key);
      accounts.push({
        'name':'lcd_' + name,
        'key': token_key,
        'emit': (info: AccountInfo<Buffer>) => {
          const amount = ServiceProgram.formatWalletTokenAmount(info.data);
          bus.emit('WalletLcdTokenAmount', {'name':name, 'amount':amount});
        }
      });
    }

    const risk_mints = CONFIG.tokens.risks as any;
    for (const name in risk_mints) {
      const token_key = await ServiceProgram.instance().getWalletTokenKey(risk_mints[name], key);
      accounts.push({
        'name':'risk_' + name,
        'key': token_key,
        'emit': (info: AccountInfo<Buffer>) => {
          const amount = ServiceProgram.formatWalletTokenAmount(info.data);
          bus.emit('WalletRiskTokenAmount', {'name':name, 'amount':amount});
        }
      });
    }

    for (const account of accounts) {
      BASE_CONNECTION.getAccountInfo(account.key, 'confirmed').then((accountInfo:null | AccountInfo<Buffer>) => {
        if (!accountInfo) {
          return;
        }
        account.emit(accountInfo);
      });

      const event_id = BASE_CONNECTION.onAccountChange(account.key, (accountInfo: AccountInfo<Buffer>, context: Context) => {
        account.emit(accountInfo);
      }, 'confirmed');

      ACCOUNT_EVENT_IDS[account.name] = event_id;
    }
  }
}