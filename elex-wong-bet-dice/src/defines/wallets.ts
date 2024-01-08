import { getBitKeepWallet } from '@solana/wallet-adapter-bitkeep';
import { getBitpieWallet } from '@solana/wallet-adapter-bitpie';
import { getCloverWallet } from '@solana/wallet-adapter-clover';
import { getCoin98Wallet } from '@solana/wallet-adapter-coin98';
import { getCoinhubWallet } from '@solana/wallet-adapter-coinhub';
import { getLedgerWallet } from '@solana/wallet-adapter-ledger';
import { getMathWallet } from '@solana/wallet-adapter-mathwallet';
import { getPhantomWallet } from '@solana/wallet-adapter-phantom';
import { getSafePalWallet } from '@solana/wallet-adapter-safepal';
import { getSlopeWallet } from '@solana/wallet-adapter-slope';
import { getSolflareWallet } from '@solana/wallet-adapter-solflare';
import { getSolletWallet, getSolletExtensionWallet } from '@solana/wallet-adapter-sollet';
import { getSolongWallet } from '@solana/wallet-adapter-solong';
import { getTokenPocketWallet } from '@solana/wallet-adapter-tokenpocket';

export const WALLETS = [
  {
    url: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
    status: true,
    wallet: getPhantomWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic',
    status: true,
    wallet: getSolflareWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/clover-wallet/nhnkbkgjikgcigadomkphalanndcapjk',
    status: true,
    wallet: getCloverWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
    status: true,
    wallet: getCoin98Wallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/slope-wallet/pocmplpaccanhmnllbbkpgfliimjljgo',
    status: true,
    wallet: getSlopeWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/solong/memijejgibaodndkimcclfapfladdchj',
    status: true,
    wallet: getSolongWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
    status: true,
    wallet: getMathWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno',
    status: true,
    wallet: getSolletExtensionWallet(),
  },
  {
    url: '',
    status: true,
    wallet: getSolletWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak',
    status: true,
    wallet: getBitKeepWallet(),
  },
  {
    url: 'https://chrome.google.com/webstore/detail/coinhub/jgaaimajipbpdogpdglhaphldakikgef',
    status: true,
    wallet: getCoinhubWallet(),
  },
  {
    url: '',
    status: true,
    wallet: getLedgerWallet(),
  },
  {
    url: '',
    status: true,
    wallet: getSafePalWallet(),
  },
  {
    url: '',
    status: true,
    wallet: getTokenPocketWallet(),
  },
  {
    url: '',
    status: true,
    wallet: getBitpieWallet()
  }
];

