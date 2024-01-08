export const wsLocalRoutes = {
  api: {
    payClient: { request: { c_buy: 'c_buy', c_getGoodsList: 'c_getGoodsList' } }
  },
  chat: {
    client: {
      request: {
        c_add: 'c_add',
        c_getLastmsg: 'c_getLastmsg',
        c_leave: 'c_leave',
        c_send: 'c_send'
      }
    }
  },
  chess: {
    client: {
      request: {
        c_enterMatch: 'c_enterMatch',
        c_getGameList: 'c_getGameList',
        c_getSceneConfig: 'c_getSceneConfig',
        c_getWinRateStatInfo: 'c_getWinRateStatInfo',
        c_leaveMatch: 'c_leaveMatch'
      },
      notify: { n_triggerUpdate: 'n_triggerUpdate' },
      push: {
        s_broadcastGame: 's_broadcastGame',
        s_broadcastSys: 's_broadcastSys',
        s_matchFail: 's_matchFail',
        s_playerEnter: 's_playerEnter',
        s_playerLeave: 's_playerLeave',
        s_pushExchangeRate: 's_pushExchangeRate',
        s_startCountdown: 's_startCountdown'
      }
    }
  },
  common: {
    client: {
      push: {
        s_playerInfoChange: 's_playerInfoChange',
        s_playerStatusEventNotity: 's_playerStatusEventNotity',
        s_redDotChange: 's_redDotChange'
      }
    }
  },
  connector: {
    client: {
      request: {
        c_getPlayerState: 'c_getPlayerState',
        c_login: 'c_login',
        c_setLanguage: 'c_setLanguage'
      }
    }
  },
  game: {
    chessRank: {
      request: {
        c_playerReady: 'c_playerReady',
        c_playerUnReady: 'c_playerUnReady'
      },
      push: {
        s_countdown: 's_countdown',
        s_playerEnter: 's_playerEnter',
        s_playerLeave: 's_playerLeave',
        s_playerOffline: 's_playerOffline',
        s_playerReady: 's_playerReady',
        s_playerReconnect: 's_playerReconnect',
        s_playerUnReady: 's_playerUnReady',
        s_roomStateChanged: 's_roomStateChanged'
      }
    },
    mulfish: { push: { s_playerFire: 's_playerFire' } },
    muljoyfish: { request: { c_fire: 'c_fire' } },
    pokblackjack: {
      request: {
        c_action: 'c_action',
        c_bet: 'c_bet',
        c_finishBet: 'c_finishBet'
      },
      push: {
        s_actionsCardsIndex: 's_actionsCardsIndex',
        s_addCard: 's_addCard',
        s_cardsNumInfo: 's_cardsNumInfo',
        s_dealHandCard: 's_dealHandCard',
        s_doubleBet: 's_doubleBet',
        s_finishBet: 's_finishBet',
        s_notifyPlayerAction: 's_notifyPlayerAction',
        s_playerBet: 's_playerBet',
        s_playerHandCard: 's_playerHandCard',
        s_roomInfo: 's_roomInfo',
        s_roundSettlement: 's_roundSettlement',
        s_sendDealLastCards: 's_sendDealLastCards',
        s_splitCard: 's_splitCard',
        s_startBet: 's_startBet',
        s_startNewRound: 's_startNewRound',
        s_stopBet: 's_stopBet',
        s_stopCard: 's_stopCard'
      }
    },
    pokqznn: {
      request: {
        c_addBet: 'c_addBet',
        c_robBanker: 'c_robBanker',
        c_selectCard: 'c_selectCard'
      },
      push: {
        s_betMulti: 's_betMulti',
        s_initHandCards: 's_initHandCards',
        s_playerAddBet: 's_playerAddBet',
        s_playerRobBanker: 's_playerRobBanker',
        s_playerSelectedCard: 's_playerSelectedCard',
        s_robBankerMulti: 's_robBankerMulti',
        s_roomInfo: 's_roomInfo',
        s_roundSettlement: 's_roundSettlement',
        s_setBanker: 's_setBanker',
        s_showCard: 's_showCard'
      }
    },
    poktexaspoker: {
      request: { c_operate: 'c_operate' },
      push: {
        s_finalSettlement: 's_finalSettlement',
        s_notifyPlayerOperate: 's_notifyPlayerOperate',
        s_playerHandCard: 's_playerHandCard',
        s_pushPlayerBaseBet: 's_pushPlayerBaseBet',
        s_pushPlayerOperate: 's_pushPlayerOperate',
        s_roomInfo: 's_roomInfo',
        s_roundSettlement: 's_roundSettlement',
        s_sbBaseChange: 's_sbBaseChange',
        s_sbSeatIdChange: 's_sbSeatIdChange',
        s_sendPublicCard: 's_sendPublicCard',
        s_startNewRound: 's_startNewRound',
        s_startNewTurn: 's_startNewTurn'
      }
    },
    pokzjh: {
      request: {
        c_abandonCard: 'c_abandonCard',
        c_addBet: 'c_addBet',
        c_compareCard: 'c_compareCard',
        c_followBet: 'c_followBet',
        c_lookCard: 'c_lookCard',
        c_timeOutProject: 'c_timeOutProject'
      },
      push: {
        s_abandonCard: 's_abandonCard',
        s_addBet: 's_addBet',
        s_compareCardResult: 's_compareCardResult',
        s_curPlay: 's_curPlay',
        s_guZhuYiZhi: 's_guZhuYiZhi',
        s_initHandCards: 's_initHandCards',
        s_lookCard: 's_lookCard',
        s_notify: 's_notify',
        s_operation: 's_operation',
        s_playerHandCard: 's_playerHandCard',
        s_roomInfo: 's_roomInfo',
        s_roundMaxTurn: 's_roundMaxTurn',
        s_roundSettlement: 's_roundSettlement',
        s_startNewRound: 's_startNewRound',
        s_timeOutProject: 's_timeOutProject'
      }
    },
    slo: {
      request: { c_spin: 'c_spin' },
      push: {
        s_playerEnter: 's_playerEnter',
        s_playerLeave: 's_playerLeave',
        s_pushGameSceneConfig: 's_pushGameSceneConfig',
        s_pushUserWallet: 's_pushUserWallet'
      }
    }
  },
  ranking: {
    client: {
      request: {
        c_getRankingList: 'c_getRankingList',
        c_receiveRankingReward: 'c_receiveRankingReward'
      }
    }
  },
  verify: { client: { request: { c_getAdConfig: 'c_getAdConfig' } } }
}