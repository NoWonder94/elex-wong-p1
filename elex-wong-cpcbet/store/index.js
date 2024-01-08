export const state = () => ({
  version: 'v1.0.11',
  user: [],
  isLogin: false,
  bulletins: [],
  langs: {},
  currencys: {},
  currencyList: [],
  langList: [],
  countrys: [],
  coins: [],
  language: 'en',
  currency: 'PHP',
  countryCode: null,
})

export const mutations = {
  updateUserInfo(state, data) {
    if (data&&data.id) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }

    state.user = data;
  },

  updateConfig(state, data) {
    Object.assign(state, data);
    if (data.currencys != null) {
      Object.keys(data.currencys).forEach((key) => {
        state.currencyList.push({
          code: key,
          name: data.currencys[key],
        });
      })

    }
    if (data.langs != null) {
      Object.keys(data.langs).forEach((key) => {
        state.langList.push({
          code: key,
          name: data.langs[key],
        });
      })
    }
    if (data.bulletins != null) {
      localStorage.setItem('bulletins', JSON.stringify(data.bulletins));
    }
  },

  updateIslogin(state, data) {
    state.isLogin = data
  },
  updateLanguage(state, data) {
    state.language = data
  },
  updateCurrency(state, data) {
    state.currency = data;
  },
  updateCountryCode(state, data) {
    state.countryCode = data;
  }
}

export const actions = {
  updateUserInfo(context, data) {
    context.commit('updateUserInfo', data);
  },

  updateConfig(context, data) {
    context.commit('updateConfig', data);
  },

  updateIslogin(context, data) {
    context.commit('updateIslogin', data);
  },

  updateCurrency(context, data) {
    localStorage.setItem('selected_currency', data);
    context.commit('updateCurrency', data);
  },

  updateLanguage(context, data) {
    if (data == '' || data == null) {
      return false
    }
    localStorage.setItem('selected_language', data);
    var code = 'en';
    switch (data) {
      case 'en':
        code = 'en';
        break;
      case 'vn':
        code = 'vi';
        break;
      case 'th':
        code = 'th';
        break;
      case 'id':
        code = 'id';
        break;
      case 'pt':
        code = 'pt';
        break;
      case 'es':
        code = 'es';
        break;
      case 'ph':
        code = 'tl';
        break;
      default:
        break;
    }
    this.$i18n.setLocale(code);
    context.commit('updateLanguage', data);
  },

  updateCountryCode(context, data) {
    localStorage.setItem('selected_country', data);
    context.commit('updateCountryCode', data);
  },
}
