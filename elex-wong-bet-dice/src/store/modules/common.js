import { CONFIG } from "@/defines";
import { Common } from '@/utils';
import { BigNumber } from "bignumber.js";
import { cloneDeep } from "lodash";

const baseAmounts = {};
for (const name in CONFIG.tokens.moneys) {
    baseAmounts[name] = 0;
}

const state = () => ({
  dividend: null,
  riskyStats: null,
  riskySupplys: cloneDeep(baseAmounts),
  riskyLamports: cloneDeep(baseAmounts),
})

const getters = {
  dividend: (state) => {
    return state.dividend;
  },
  risky: (state) => {
    return state.riskyStats;
  }
}

const actions = {
  init ({ commit }) {
    window.$bus.on('Dividend', (data) => {
      commit('setDividend', data);
    });

    window.$bus.on('RiskyStats', (data) => {
      commit('setRiskyStats', data);
    });

    window.$bus.on('RiskyTokenSupply', (data) => {
      commit('setRiskyTokenSupply', data);
    });

    window.$bus.on('RiskyTokenLamports', (data) => {
      commit('setRiskyTokenLamports', data);
    });
  }
}

const formatRiskyStats = (state) => {
  if (state.riskyStats === null) {
    return;
  }

  const indexs = CONFIG.tokens.indexs;
  for (const name in indexs) {
    const index = indexs[name];
    if (state.riskySupplys[name] == 0 || state.riskyLamports[name] == 0) {
      state.riskyStats.tokens[index].price = 1;
    } else { 
      const price = new BigNumber(state.riskyLamports[name]).dividedBy(state.riskySupplys[name]);
      state.riskyStats.tokens[index].price = parseFloat(price.toFixed(CONFIG.decimals[name].fixed, 3));
    }
    state.riskyStats.tokens[index].lamports = parseFloat(state.riskyLamports[name] + '');
    state.riskyStats.tokens[index].lamports_show = Common.lamportToAmount(state.riskyLamports[name], name);
    state.riskyStats.tokens[index].supply = parseFloat(state.riskySupplys[name] + '');
    state.riskyStats.tokens[index].supply_show = Common.lamportToAmount(state.riskySupplys[name], name);
  }
}

const mutations = {
  setDividend (state, data) {
    state.dividend = data;
  },
  setRiskyStats (state, data) {
    state.riskyStats = data;
    formatRiskyStats(state);
  },
  setRiskyTokenSupply (state, data) {
    state.riskySupplys[data.name] = data.amount;
    formatRiskyStats(state);
  },
  setRiskyTokenLamports (state, data) {
    state.riskyLamports[data.name] = data.amount;
    formatRiskyStats(state);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}