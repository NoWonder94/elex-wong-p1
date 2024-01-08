import {
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';

import { WalletProgram } from "./wallet";
import { CONFIG } from "@/defines";
import { Api } from '@/utils';
import * as State from "./state";

export class PlatformProgram extends WalletProgram {
  async login(callback:any) {
    Api.post('Account/login', {
      address: this.loginKey.toBase58()
    }).then((data:any) => {
      const instruction = new State.PlatformLoginInstruction({
        action: 0,
        token: data.transaction_token
      });

      const transaction = new Transaction();
      transaction.add(new TransactionInstruction({
        keys: [
          {pubkey: this.loginKey, isSigner: false, isWritable: false}
        ],
        programId: CONFIG.platform.key,
        data: instruction.encode()
      }));

      this.sendTransaction(transaction).then((signature:string) => {
        this.checkTransactionBySignature(signature, (err:any) => {
          if (err) {
            callback(err);
          }

          Api.post('Account/check', {
            signature: signature,
            token: data.check_token
          }).then((data:any) => {
            console.log(data);
            callback(null);
          });
        });
      }).catch((e:any) => {
        callback(e);
      });
    }).catch((e:any) => {
      callback(e);
    });
  }
}