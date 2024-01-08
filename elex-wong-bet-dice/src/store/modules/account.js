import { CONFIG } from '@/defines';
import { PublicKey } from '@solana/web3.js';
import { AccountLayout } from '@solana/spl-token';
import { Connection, Common, UInt64 } from '@/utils';
import { cloneDeep } from "lodash";
import BN from "bn.js";

const baseTokens = {};
const tokenAmounts = {};
for (const name in CONFIG.tokens.moneys) {
    baseTokens[name] = {
        "key": null,
        "show": name.toUpperCase(),
        "amount": 0,
        "lamports": 0,
        "image": `assets/images/${name}.png`
    };
    tokenAmounts[name] = {
      "amount": 0,
      "lamports": 0
    };
}

const state = () => ({
  publicKey: '',
  data: null,
  lcds: cloneDeep(tokenAmounts),
  risks: cloneDeep(tokenAmounts),
  token_type: 'sol',
  tokens: cloneDeep(baseTokens),
  wallet: null,
  connected: false,
  autoConnect: false
})

const getters = {
  walletAddress: (state) => {
    let address = state.publicKey === '' ? 'Login' : state.publicKey;
    let length = address.length;
    return length > 20 ? `${address.substring(0, 6)}...${address.substring(length - 4, length)}` : address;
  },
  walletPublicKey: (state) => {
    return state.publicKey;
  },
  isConnected: (state) => {
    return state.connected;
  },
  walletData: (state) => {
    return state.data;
  },
  walletLcd: (state) => {
    return state.lcds[state.token_type];
  },
  walletRisk: (state) => {
    return state.risks[state.token_type];
  },
  walletTokens: (state) => {
    return state.tokens;
  },
  tokenType: (state) => {
    return state.token_type;
  },
  currentToken: (state) => {
    return state.tokens[state.token_type];
  }
}

const actions = {
  setWallet({ state, commit }, adapter) {
    const updateDataFunc = (data) => {
      commit('setData', data);
    };

    const updateLcdTokenAmountFunc = (data) => {
      commit('setLcdTokenAmount', data);
    };

    const updateRiskTokenAmountFunc = (data) => {
      commit('setRiskTokenAmount', data);
    };

    const updateTokenAmount = (info) => {
      commit('setTokenInfo', {'name':info.name, data:{'lamports':info.amount}});
    };

    const connectFunc = () => {
      if (!state.wallet || !state.wallet.publicKey || state.wallet.publicKey.equals(PublicKey.default) 
        || state.wallet.publicKey.toBase58() == state.publicKey) {
        return;
      }

      for (const name in CONFIG.tokens.moneys) {
        if (name == "sol") {
          continue;
        }

        Connection.get().getTokenAccountsByOwner(state.wallet.publicKey, {mint: CONFIG.tokens.moneys[name]}, "confirmed").then((result) => {
          let tokenPubkey = null;
          let tokenLamports = new BN(0);
          for (const info of result.value) {
            const data = AccountLayout.decode(info.account.data);
            const lamports = UInt64.fromBuffer(data.amount);
            if (lamports.gt(tokenLamports)) {
              tokenLamports = lamports;
              tokenPubkey = info.pubkey;
            }
          }
          commit('setTokenInfo', {'name':name, data:{'key':tokenPubkey, 'lamports':tokenLamports}});
          Connection.tokenBind(name, tokenPubkey);
        }).catch((err) => {
          console.log(err);
        });
      }

      commit('setConnected', true);
      window.$bus.on('WalletData', updateDataFunc);
      window.$bus.on('WalletLcdTokenAmount', updateLcdTokenAmountFunc);
      window.$bus.on('WalletRiskTokenAmount', updateRiskTokenAmountFunc);
      window.$bus.on('WalletTokenAmount', updateTokenAmount);

      Connection.accountBind(state.wallet.publicKey);
    }

    const disconnectFunc = () => {
      commit('setConnected', false);
      removeListener(state.wallet);
    }

    const removeListener = () => {
      if (!state.wallet) {
        return;
      }
      state.wallet.removeListener('connect', connectFunc);
      state.wallet.removeListener('disconnect', disconnectFunc);
      window.$bus.off('WalletData', updateDataFunc);
      window.$bus.off('WalletLcdTokenAmount', updateLcdTokenAmountFunc);
      window.$bus.off('WalletRiskTokenAmount', updateRiskTokenAmountFunc);
      window.$bus.off('WalletTokenAmount', updateTokenAmount);
    }

    removeListener();

    adapter.on('connect', connectFunc);
    adapter.on('disconnect', disconnectFunc);
    commit('setWallet', adapter);
  },
  setTokenType({ state, commit }, tokenType) {
    if (state.token_type == tokenType) {
      return;
    }
    commit('setTokenType', tokenType);
    window.$bus.emit('TokenTypeChange', tokenType);
  }
}

const mutations = {
  setWallet (state, adapter) {
    state.wallet = adapter;
    state.wallet.connect();
  },
  setData (state, data) {
    state.data = data;
  },
  setLcdTokenAmount (state, data) {
    state.lcds[data.name].lamports = data.amount;
    state.lcds[data.name].amount = Common.lamportToAmount(data.amount, data.name);
  },
  setRiskTokenAmount (state, data) {
    state.risks[data.name].lamports = data.amount;
    state.risks[data.name].amount = Common.lamportToAmount(data.amount, data.name);
  },
  setTokenType(state, data) {
    state.token_type = data;
  },
  setTokenInfo(state, info) {
    const token = state.tokens[info.name];
    for (const key in info.data) {
      token[key] = info.data[key];
    }
    token.amount = Common.lamportToAmount(token.lamports, info.name);
    state.tokens[info.name] = token;
  },
  setConnected (state, status) {
    if (status) {
      state.publicKey = state.wallet.publicKey.toBase58();
      state.tokens.sol.key = state.wallet.publicKey;
    } else {
      state.publicKey = "";
      state.wallet = null;
      state.tokens = cloneDeep(baseTokens);
      state.lcds = cloneDeep(tokenAmounts);
      state.risks = cloneDeep(tokenAmounts);
    }
    state.connected = status;
    window.$bus.emit('WalletConnected', status);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}