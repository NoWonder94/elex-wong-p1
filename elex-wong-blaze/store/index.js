import gett from "./getters";
import act from "./actions";
import mutat from "./mutations"
import { getLangCode } from "@/utils"

export const mutations = {
  updateUserInfo(state, data) {
    if (data && data.id) {
      state.isLogin = true;
      state.user_login = true;
    } else {
      state.isLogin = false;
      state.user_login = false;
    }

    state.user = data;
    state.userInfo = data;
    localStorage.setItem('userInfo', JSON.stringify(data));
  },
  updateIslogin(state, data) {
    state.isLogin = data
  },
  updateLanguage(state, data) {
    state.language = data
  },
  updateCoinType(state, data) {
    state.coinType = data;
    localStorage.setItem('coinType', data);
  },
  updateWalletList(state, data) {
    state.walletList = data;
  },
  updateUnreadEmailCount(state, data) {
    state.unreadEmailCount = data;
  },
  updateUnreadNoticeCount(state, data) {
    state.unreadNoticeCount = data;
  },
  updateDepositBonus(state, data) {
    state.depositBonus = data;
  },
  updateDepositMethodItem(state, data) {
    state.depositMethodItem = data
  },
  updateWithdrawMethodItem(state, data) {
    state.withdrawMethodItem = data
  },
  ...mutat,
}

export const actions = {
  getUserInfo(context) {
    $nuxt.$api
      .requestByPost("/hall/v2/user/getUserInfo", {})
      .then((result) => {
        const { code, msg, data } = result;
        if (code != 200) {
          $nuxt.$notify({
            title: "Warning",
            message: msg,
            type: "warning",
            duration: 2000,
          });
          return false;
        }
        const { user } = data;
        if (user != null) {
          context.commit('updateUserInfo', user);
        } else {
          context.commit('updateUserInfo', []);
        }
      })
      .catch((error) => {
        // $nuxt.$notify({
        //   title: "Warning",
        //   message: error,
        //   type: "warning",
        //   duration: 2000,
        // });
      });
  },
  updateUserInfo(context, data) {
    context.commit('updateUserInfo', data);
  },
  updateIslogin(context, data) {
    if (data != null) {
      localStorage.setItem('authToken', data);
      localStorage.setItem('isLogin', true);
      context.commit('updateIslogin', true);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLogin');
      context.commit('updateIslogin', false);
    }
  },
  updateLanguage(context, data) {
    data = data.toLowerCase();
    var code = getLangCode(data);
    this.$i18n.setLocale(code);
    localStorage.setItem('selected_language', code);
    context.commit('updateLanguage', code);
  },
  setDefaultLang(context, data) {
    data = data.toLowerCase();
    var code = getLangCode(data);
    localStorage.setItem('selected_language', code);
    context.commit('updateLanguage', code);
  },
  updateCoinType(context, data) {
    context.commit('updateCoinType', data);
    context.commit("USER_COIN_CHANGE", JSON.parse(data));
  },
  getWalletList(context) {
    $nuxt.$api
      .requestByPost("/hall/v2/playGold/userWallet", {})
      .then((result) => {
        const { code, msg, rows } = result;
        if (code != 200) {
          $nuxt.$notify({
            title: "Warning",
            message: msg,
            type: "warning",
            duration: 2000,
          });
          return false;
        }
        if (rows != null) {
          var dd = {};
          rows.forEach((e) => {
            dd[e.currencyId] = e;
          });

          context.commit('GET_USER_COIN', rows);
          var coinTypeString = localStorage.getItem('coinType');
          if (coinTypeString != null) {
            var coinType = JSON.parse(coinTypeString);
            if (dd[coinType.currencyId] != null) {
              context.commit("USER_COIN_CHANGE", dd[coinType.currencyId])
              context.commit('updateCoinType', JSON.stringify(dd[coinType.currencyId]));
            }
          } else {
            context.commit("USER_COIN_CHANGE", rows[0])
            context.commit('updateCoinType', JSON.stringify(rows[0]));
          }
        }
      })
      .catch((error) => {
        // $nuxt.$notify({
        //   title: "Warning",
        //   message: error,
        //   type: "warning",
        //   duration: 2000,
        // });
      });
  },
  getUnreadEmailCount(context) {
    $nuxt.$api
      .requestByPost("/hall/v2/playUserEmail/getReadStatus", {})
      .then((result) => {
        const { code, msg, data } = result;
        if (code != 200) {
          $nuxt.$notify({
            title: "Warning",
            message: msg,
            type: "warning",
            duration: 2000,
          });
          return false;
        }
        if (data != null) {
          context.commit('updateUnreadEmailCount', data);
        }
      })
      .catch((error) => {
        // $nuxt.$notify({
        //   title: "Warning",
        //   message: error,
        //   type: "warning",
        //   duration: 2000,
        // });
      });


  },
  getUnreadNoticeCount(context, data) {
    $nuxt.$api
      .requestByPost("/hall/v2/playUserNotice/getReadStatus", {})
      .then((result) => {
        const { code, msg, data } = result;
        if (code != 200) {
          $nuxt.$notify({
            title: "Warning",
            message: msg,
            type: "warning",
            duration: 2000,
          });
          return false;
        }
        if (data != null) {
          context.commit('updateUnreadNoticeCount', data);
        }
      })
      .catch((error) => {
        // $nuxt.$notify({
        //   title: "Warning",
        //   message: error,
        //   type: "warning",
        //   duration: 2000,
        // });
      });


  },
  updateDepositBonus(context, data) {
    context.commit('updateDepositBonus', data);
  },
  updateDepositMethod(context, data) {
    context.commit('updateDepositMethodItem', data);
  },
  updateWithdrawMethod(context, data) {
    context.commit('updateWithdrawMethodItem', data);
  },
  ...act,
}

export const getters = gett;

export const strict = false
