import { PublicKey } from '@solana/web3.js';
import { CONFIG } from "@/defines";
import { BigNumber } from "bignumber.js";
import moment from "moment";
import BN from "bn.js";

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

export const formatAddress = (key:PublicKey) => {
  const address = key.toBase58();
  const length = address.length;
  return `${address.substring(0, 6)}...${address.substring(length - 4, length)}`;
};

export const formatAddressByStr = (key:string) => {
  const length = key.length;
  return `${key.substring(0, 5)}..${key.substring(length - 3, length)}`;
};

export const formatSignature = (signature:string) => {
  const length = signature.length;
  return `${signature.substring(0, 5)}..${signature.substring(length - 3, length)}`;
};

export const formatAddressByBuffer = (key:Uint8Array) => {
  const address = new PublicKey(key).toBase58();
  const length = address.length;
  return `${address.substring(0, 6)}...${address.substring(length - 4, length)}`;
};

//https://explorer.solana.com/tx
//https://solanabeach.io/
//https://solscan.io/
export const getExplorerAddressUrl = (key:PublicKey) => {
  return formatExplorerUrl('https://explorer.solana.com/address/' + key.toBase58());
};

export const getExplorerAddressUrlByStr = (key:string) => {
  return formatExplorerUrl('https://explorer.solana.com/address/' + key);
};

export const getExplorerTokenUrl = (key:PublicKey) => {
  return formatExplorerUrl('https://explorer.solana.com/address/' + key.toBase58());
};

export const getExplorerTxUrl = (signature:string) => {
  return formatExplorerUrl('https://explorer.solana.com/tx/' + signature);
};

export const formatExplorerUrl = (url:string) => {
  const cluster = CONFIG.cluster == '' ? '' : `?cluster=${CONFIG.cluster}`;
  return url + cluster;
};

export const amountToLamport = (amount:any, type:string) => {
  if (typeof amount !== "number") {
    if (isNaN(amount)) {
      return 0;
    }
    amount = parseFloat(amount);
  }

  if (isNaN(amount) || amount <= 0) {
    return 0;
  }

  const decimal = CONFIG.get(`decimals.${type}`);
  return parseFloat(new BigNumber(amount).multipliedBy(decimal.num).toFixed(0, 3));
};

export const lamportToAmount = (lamport:number, type:string) => {
  if (lamport == 0) {
    return 0;
  }

  const decimal = CONFIG.get(`decimals.${type}`);
  if (decimal) {
    const amount = new BigNumber(lamport).dividedBy(decimal.num).toFixed(decimal.fixed, 3);
    return parseFloat(amount);
  }
  return 0;
};

export const formatAmount = (amount:any, type:string) => {
  if (typeof amount !== "number") {
    if (isNaN(amount)) {
      return 0;
    }
    amount = parseFloat(amount);
  }

  if (isNaN(amount) || amount <= 0) {
    return 0;
  }

  amount = parseFloat(amount);
  if (amount <= 0) {
    return 0;
  }

  const decimal = CONFIG.get(`decimals.${type}`);
  return parseFloat(new BigNumber(amount).toFixed(decimal.fixed, 3));
};

export const dividendCompute = (amount:BN, frozens:BN, lamports:BN, type:string) => {
  if (frozens.isZero() || lamports.isZero() || amount.isZero()) {
    return 0;
  }
  let mine = amount.mul(lamports).div(frozens);
  const dev = mine.mul(CONFIG.dev.dividendRate).div(CONFIG.bn100);
  mine = mine.sub(dev);
  return lamportToAmount(mine.toNumber(), type);
};

export const formatPayout = (payout:number) => {
  const val = new BigNumber(payout);
  return val.dividedBy(1000).toNumber();
};

export const formatTimestamp = (time:BN) => {
  const date = moment.unix(time.toNumber());
  return date.format("DD MMM HH:mm");
};

export const formatDate = (time:number) => {
  const date = moment.unix(time);
  return date.format("YYYY-MM-DD");
};

export const sendInit = async () => {
  return new Promise((res, rej) => setTimeout(res, 1200));
};

export const clientSeed = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let crypto:any = null;
  try {
      crypto = new Uint8Array(40);
      window.crypto.getRandomValues(crypto);
  } catch (e) {
    console.log(e);
  }

  if (crypto === undefined || (crypto[0] == 0 && crypto[1] == 0 && crypto[2] == 0)) {
      crypto = null;
  }

  let result = "";
  let rnum;
  for (let i = 0; i < 40; i++) {
      if (crypto != null) {
          rnum = crypto[i] % chars.length;
      }
      else {
          rnum = Math.floor(Math.random() * chars.length);
      }
      result += chars.substring(rnum, rnum + 1);
  }
  return result;
};