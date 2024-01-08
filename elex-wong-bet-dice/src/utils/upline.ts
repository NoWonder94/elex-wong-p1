import { PublicKey } from '@solana/web3.js';
import * as queryString from 'query-string'

const UPLINE_ADDRESS = 'upline-address'

export class Upline {
  static get() {
    const address = localStorage.getItem(UPLINE_ADDRESS);
    if (address) {
      const publicKey = new PublicKey(address);
      if (PublicKey.isOnCurve(publicKey.toBuffer())) {
        return publicKey;
      }
    }
    return null;
  }

  static init() {
    const query = queryString.parse(location.search);
    if (typeof query.upline === 'string') {
      Upline.set(query.upline);
    }
  }

  static set(address:string) {
    return localStorage.setItem(UPLINE_ADDRESS, address);
  }

  static remove() {
    return localStorage.removeItem(UPLINE_ADDRESS);
  }
}