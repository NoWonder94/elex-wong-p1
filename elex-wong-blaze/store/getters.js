const getters = {
  isLogin: (state) => state.isLogin,
  getMaintenceNotice(state) {
    return state.maintenceNotice;
  },
  getUserCoinInfo(state) {
    return state.coinList;
  },
  getGameId(state) {
    return state.gameId;
  },
  getCoin(state) {
    return state.user_coin;
  },
  getSlotsGameId(state) {
    return state.slotsGameID
  },
  getOnline(state) {
    return state.onlie
  },
  getChatMessage(state) {
    return state.chartRoomMessage
  },
  getIsLogin(state) {
    return state.user_login
  },
  getAvatarAndName(state) {
    return state.user_avatarAndName
  },
  isH5() {
    let isH5 = false
    let num = document.documentElement.clientWidth;
    let arr = [];
    if (num > 780) {
      isH5 = false;
    } else {
      isH5 = true;
    }
    return isH5
  },
  // getChannelId (state) {
  //   return state.channelId
  // },
  getLoginStatus(state) {
    return state.loginStatus
  },
  getNextLoginTime(state) {
    return state.nextLogTime
  },
  getUserLevel(state) {
    return state.userLevel
  },
  getUserGameInfo(state) {
    return state.gameOrder
  },
  firstChargedStatus(state) {
    return state.firstCharged
  },
  getChannelCurrency(state) {
    return state.channelCurrency
  },
  getLanguage(state) {
    return state.language
  },
  getChannelInfo(state) {
    return state.channelInfo
  },
  getSportChannel(state) {
    return state.sportChannel
  },
  getSocialConfig(state) {
    return state.socialConfig
  },
  getRegisterConfig(state) {
    return state.registerItemsData
  },
  getLoginConfig(state) {
    return state.loginItemsData
  },
  getEmailDetails(state) {
    return state.emailDetails
  },
  getOriginalGames(state) {
    return state.originalGames
  }
}
export default getters
