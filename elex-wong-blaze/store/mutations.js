import Vue from "vue";
import state from "./state";
export default {
  SET_NOTICE: (state, data) => {
    state.maintenceNotice = data
  },
  SET_TOKEN: (state, data) => {
    state.token = data
  },
  GET_USER_COIN(state, value) {
    state.coinList = value;
  },
  SET_USER_ISLOGIN(state, data) {
    state.user_login = data
  },
  SET_USER_AVATARANDNAME(state, data) {
    state.user_avatarAndName = data
  },
  USER_COIN_CHANGE(state, data) {
    state.user_coin = data
  },
  GET_COINS(state, data) {
    state.conins = data
  },
  SET_GAME_ID(state, data) {
    state.gameId = data
    sessionStorage.setItem('game_id', JSON.stringify(data))
  },
  SLOTS_GAME_ID(state, data) {
    state.slotsGameID = data
  },
  GAME_ORDER(state, data) {
    state.gameOrder = data
  },
  LIMB_ORDER(state, data) {
    state.limboOrder = data
  },
  WHEEL_ORDER(state, data) {
    state.wheelOrder = data
  },
  Hash_Dice_ORDER(state, data) {
    state.hashDiceOrder = data
  },
  Classic_Dice_ORDER(state, data) {
    state.classicDiceOrder = data
  },

  CHAT_MSG(state, data) {
    state.chartRoomMessage = data
  },
  CHAT_ONLIN(state, data) {
    state.onlineNum = data
  },
  SOCKET_SEND_MESSAGE(state, data) {
    state.sendMessage = data
  },

  KENO_SIGN_ORDER(state, data) {
    state.kenoSignOrder = data
  },
  Mines_ORDER(state, data) {
    state.minesOrder = data
  },
  Keno(state, data) {
    state.KenoOrder = data
  },

  CHAT_CLOSE(sate, data) {
    sate.closeStatus = data
  },

  WALL_TYPE(state, data) {
    state.wallType = data
  },

  Wheel_Socket(state, data) {
    state.wheelSocket = data
  },
  CLASS_DICE(state, data) {
    state.classDice = data
  },
  House_List(state, data) {
    state.HouseList = data
  },
  Ultimate_Dice_ORDER(state, data) {
    state.UltimateDice = data
  },
  Notice_Mes(state, data) {
    state.NoticeMes = data
  },
  langu_age(state, data) {
    state.language = data
  },
  mail_status(state, data) {
    state.mailStatus = data
  },
  // SET_CHANNELID (state, data) {
  //   state.channelId = data
  // },
  SET_LOGINSTATUS(state, data) {
    state.loginStatus = data
  },
  SET_NEXT_LOGIN_TIME(state, data) {
    state.nextLogTime = data
  },
  SET_USER_LEVEL: (state, data) => {
    state.userLevel = data
  },
  SET_USER_encryption: (state, data) => {
    state.encryption = data
  },
  FIRST_CHARGED: (state, data) => {
    state.firstCharged = data
  },
  SET_DALIY_TABLE: (state, data) => {
    state.isPlayDaliyTable = data
  },
  SET_CHANNEL_CURRENCY: (state, data) => {
    state.channelCurrency = data
  },
  SET_CHANNEL_INFO: (state, data) => {
    state.channelInfo = data
  },
  SET_CHANNEL_CONFIG: (state, data) => {
    let obj = {};
    let arr = [];
    const socialKey = ['twitter', 'instagram', 'facebook', 'telegram', 'email'];
    if (data.length > 0) {
      data.forEach(item => {
        if (item.name === 'gtm_id') {
          $nuxt.$config.gtm_id = item.jumpAddress;
        }
        if (item.name === 'telegram') {
          $nuxt.$config.telegram = item.jumpAddress;
        }
        if (socialKey.includes(item.name)) {
          arr.push(item)
        }
        obj[item.name] = item
      })
    }
    state.socialConfig = arr;
    state.channelConfig = obj;
  },
  SET_SPORT_CHANNEL: (state, data) => {
    state.sportChannel = data
  },
  SET_REGISTER_CONFIG: (state, data) => {
    state.registerItemsData = data
  },
  SET_LOGIN_CONFIG: (state, data) => {
    state.loginItemsData = data
  },
  SET_EMAIL_DETAILS: (state, data) => {
    state.emailDetails = data
  },
  SET_ORIGINAL_GAMES: (state, data) => {
    state.originalGames = data
  }
}
