export const state = () => ({
  version: 'v1.0.31',
  account: null,
  isLogin: false,
  connectedAddress: '',
  walletAmount: '',
  config: null,
  language: 'cn',
  langs: [],
  signing: false,
})

export const mutations = {
  updateUserInfo(state, data) {
    if (data.id) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }

    state.user = data;
  },
  updateIsLogin(state, data) {
    state.isLogin = data;
  },
  updateSigning(state, data) {
    state.signing = data;
  },
  updateConnectedAddress(state, data) {
    state.connectedAddress = data;
  },
  updateWalletAmount(state, data) {
    state.walletAmount = data;
  },
  updateInitConfig(state, data) {
    if (data.langs != null) {
      state.langs = [];
      Object.keys(data.langs).forEach((e) => {
        state.langs.push({
          title: data.langs[e],
          key: e,
        })
      });
    }
    state.config = data;
  },
  updateAccount(state, data) {
    state.account = data;
  },
  updateLanguage(state, data) {
    state.language = data
  },
}

export const actions = {
  updateUserInfo(context, data) {
    context.commit('updateUserInfo', data);
  },
  updateIsLogin(context, data) {
    context.commit('updateIsLogin', data);
  },
  updateSigning(context, data) {
    context.commit('updateSigning', data);
  },
  updateConnectedAddress(context, data) {
    context.commit('updateConnectedAddress', data);
  },
  updateWalletAmount(context, data) {
    context.commit('updateWalletAmount', data);
  },
  updateInitConfig(context, data) {
    context.commit('updateInitConfig', data);
  },
  updateAccount(context, data) {
    context.commit('updateAccount', data);
  },
  updateLanguage(context, data) {
    localStorage.setItem('selected_language', data);
    var code = 'en';
    switch (data) {
      case 'en':
        code = 'en';
        break;
      case 'zh-TW':
        code = 'ft';
        break;
      case 'zh-CN':
        code = 'cn';
        break;
      default:
        code = data;
        break;
    }
    this.$i18n.setLocale(code);
    context.commit('updateLanguage', code);
  },
}
