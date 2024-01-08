import {
  walletType, getChannelId, getCurrency, getSportsByChannel
} from "@/api/api.js"
import Cookie from "js-cookie";
import livechat from '@/utils/livechat.js'
const actions = {
  getUserCoinList({
    commit
  }) {
    walletType().then((res) => {
      let list = res.rows ? res.rows.map((item) => {
        return {
          ...item,
          id: item.currencyId,
          name: item.currencyName,
          icon: item.currencyIcon,
        }
      }) : []
      localStorage.setItem("walletInfo", JSON.stringify(list))
      commit("GET_USER_COIN", list)
      var coinType = localStorage.getItem('coinType');
      if (list != null && list.length > 0) {
        if (coinType) {
          var a = list.filter((v) => v.id == coinType.currencyId);
        }
        commit("USER_COIN_CHANGE", list[0])
      }
    })
  },
  getChannelCurrency({
    commit
  }) {
    getCurrency({ channelId: localStorage.getItem("channelId") }).then((res) => {
      let list = res.rows ? res.rows.map((item) => {
        return {
          ...item,
          id: item.currencyId,
          name: item.currencyName,
          icon: item.currencyIcon,
        }
      }) : []
      commit("SET_CHANNEL_CURRENCY", list)
    })
  },
  getUserCoin({
    commit
  }, data) {
    commit('USER_COIN_CHANGE', data)
  },
  getChannelInfo({ commit }) {
    getChannelId().then((res) => {
      Cookie.set('logo_url', res.info.logoSmall);
      Cookie.set('mini_logo_url', res.info.logoMini);
      commit('SET_CHANNEL_INFO', res.info)
    })
  },
  getSportChannel({ commit }) {
    getSportsByChannel().then((res) => {
      if (res.code == 200) {
        commit('SET_SPORT_CHANNEL', res.data)
      }
    })
  },
  getRegisterConfig({ commit}, data) {
    $nuxt.$api
      .requestByPost("/hall/v2/playHall/getUserRegisterConfig")
      .then((result) => {
        const { code, msg, data } = result;

        if (code != 200) {
          this.$notify({
            title: "Warning",
            message: msg,
            type: "warning",
            duration: 2000,
          });
          return false;
        }
        var types = {};
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          types[element.dataType] = element;
        }
        var regtype = types["1"];
        var logintype = types["2"];
        if (regtype == null) {
          return;
        }
        commit('SET_REGISTER_CONFIG', regtype)
        commit('SET_LOGIN_CONFIG', logintype)
      });
  },
  setEmailDetails({ commit }, data) {
    commit('SET_EMAIL_DETAILS', data)
  },
  setOriginalGames({ commit }, data) {
    if (data != null && data.length > 0) {
      var list = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.gameType == 0) {
          list.push(element);
        }
      }
      commit('SET_ORIGINAL_GAMES', list)
    }
  }
  //获取channel信息
  // queryChannelInfo({
  //   commit
  // }) {
  //   //首页加载获取channle
  //   let url = document.location.href
  //   let p = url.split('?')[1]
  //   let params = new URLSearchParams(p)
  //   // let channel = params.get('channel')
  //   let channel = 'test1'
  //   if (url.indexOf("channel") > 0) {
  //     getChannelInfo({ channel: channel }).then(res => {
  //       if (res.code === 200) {
  //         commit('SET_CHANNELID', res.data.id)
  //       }
  //     })
  //   }
  // },
}
export default actions
