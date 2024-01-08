import { Keypair, PublicKey } from '@solana/web3.js';

const CLIENT_SEED = 'client-seed';

export class Seed {
  static get() {
    const val = localStorage.getItem(CLIENT_SEED);
    if (val) {
      try {
        return new PublicKey(val);
      } catch(e) {
        console.log('Client Seed Error:' + e.message);
      }
    } 

    const keypair = Keypair.generate();
    localStorage.setItem(CLIENT_SEED, keypair.publicKey.toBase58());
    return keypair.publicKey;
  }

  static reset() {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();
    localStorage.setItem(CLIENT_SEED, publicKey);
    return publicKey;
  }

  static remove() {
    return localStorage.removeItem(CLIENT_SEED);
  }
}