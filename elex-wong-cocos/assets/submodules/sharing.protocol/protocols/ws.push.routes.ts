export const wsPushRoutes = {
  api: {
    payClient: {
      request: {
        c_buy: 'api.payClientHandler.c_buy',
        c_getGoodsList: 'api.payClientHandler.c_getGoodsList'
      }
    }
  },
  chat: {
    client: {
      request: {
        c_add: 'chat.clientHandler.c_add',
        c_getLastmsg: 'chat.clientHandler.c_getLastmsg',
        c_leave: 'chat.clientHandler.c_leave',
        c_send: 'chat.clientHandler.c_send'
      }
    }
  },
  chess: {
    client: {
      request: {
        c_enterMatch: 'chess.clientHandler.c_enterMatch',
        c_getGameList: 'chess.clientHandler.c_getGameList',
        c_getSceneConfig: 'chess.clientHandler.c_getSceneConfig',
        c_getWinRateStatInfo: 'chess.clientHandler.c_getWinRateStatInfo',
        c_leaveMatch: 'chess.clientHandler.c_leaveMatch'
      },
      notify: { n_triggerUpdate: 'chess.clientHandler.n_triggerUpdate' },
      push: {
        s_broadcastGame: 'chess.clientHandler.s_broadcastGame',
        s_broadcastSys: 'chess.clientHandler.s_broadcastSys',
        s_matchFail: 'chess.clientHandler.s_matchFail',
        s_playerEnter: 'chess.clientHandler.s_playerEnter',
        s_playerLeave: 'chess.clientHandler.s_playerLeave',
        s_pushExchangeRate: 'chess.clientHandler.s_pushExchangeRate',
        s_startCountdown: 'chess.clientHandler.s_startCountdown'
      }
    }
  },
  common: {
    client: {
      push: {
        s_playerInfoChange: 'common.client.s_playerInfoChange',
        s_playerStatusEventNotity: 'common.client.s_playerStatusEventNotity',
        s_redDotChange: 'common.client.s_redDotChange'
      }
    }
  },
  connector: {
    client: {
      request: {
        c_getPlayerState: 'connector.clientHandler.c_getPlayerState',
        c_login: 'connector.clientHandler.c_login',
        c_setLanguage: 'connector.clientHandler.c_setLanguage'
      }
    }
  },
  game: {
    chessRank: {
      request: {
        c_playerReady: 'game.chessRankHandler.c_playerReady',
        c_playerUnReady: 'game.chessRankHandler.c_playerUnReady'
      },
      push: {
        s_countdown: 'game.chessRankHandler.s_countdown',
        s_playerEnter: 'game.chessRankHandler.s_playerEnter',
        s_playerLeave: 'game.chessRankHandler.s_playerLeave',
        s_playerOffline: 'game.chessRankHandler.s_playerOffline',
        s_playerReady: 'game.chessRankHandler.s_playerReady',
        s_playerReconnect: 'game.chessRankHandler.s_playerReconnect',
        s_playerUnReady: 'game.chessRankHandler.s_playerUnReady',
        s_roomStateChanged: 'game.chessRankHandler.s_roomStateChanged'
      }
    },
    mulfish: { push: { s_playerFire: 'game.mulfishHandler.s_playerFire' } },
    muljoyfish: { request: { c_fire: 'game.muljoyfishHandler.c_fire' } },
    pokblackjack: {
      request: {
        c_action: 'game.pokblackjackHandler.c_action',
        c_bet: 'game.pokblackjackHandler.c_bet',
        c_finishBet: 'game.pokblackjackHandler.c_finishBet'
      },
      push: {
        s_actionsCardsIndex: 'game.pokblackjackHandler.s_actionsCardsIndex',
        s_addCard: 'game.pokblackjackHandler.s_addCard',
        s_cardsNumInfo: 'game.pokblackjackHandler.s_cardsNumInfo',
        s_dealHandCard: 'game.pokblackjackHandler.s_dealHandCard',
        s_doubleBet: 'game.pokblackjackHandler.s_doubleBet',
        s_finishBet: 'game.pokblackjackHandler.s_finishBet',
        s_notifyPlayerAction: 'game.pokblackjackHandler.s_notifyPlayerAction',
        s_playerBet: 'game.pokblackjackHandler.s_playerBet',
        s_playerHandCard: 'game.pokblackjackHandler.s_playerHandCard',
        s_roomInfo: 'game.pokblackjackHandler.s_roomInfo',
        s_roundSettlement: 'game.pokblackjackHandler.s_roundSettlement',
        s_sendDealLastCards: 'game.pokblackjackHandler.s_sendDealLastCards',
        s_splitCard: 'game.pokblackjackHandler.s_splitCard',
        s_startBet: 'game.pokblackjackHandler.s_startBet',
        s_startNewRound: 'game.pokblackjackHandler.s_startNewRound',
        s_stopBet: 'game.pokblackjackHandler.s_stopBet',
        s_stopCard: 'game.pokblackjackHandler.s_stopCard'
      }
    },
    pokqznn: {
      request: {
        c_addBet: 'game.pokqznnHandler.c_addBet',
        c_robBanker: 'game.pokqznnHandler.c_robBanker',
        c_selectCard: 'game.pokqznnHandler.c_selectCard'
      },
      push: {
        s_betMulti: 'game.pokqznnHandler.s_betMulti',
        s_initHandCards: 'game.pokqznnHandler.s_initHandCards',
        s_playerAddBet: 'game.pokqznnHandler.s_playerAddBet',
        s_playerRobBanker: 'game.pokqznnHandler.s_playerRobBanker',
        s_playerSelectedCard: 'game.pokqznnHandler.s_playerSelectedCard',
        s_robBankerMulti: 'game.pokqznnHandler.s_robBankerMulti',
        s_roomInfo: 'game.pokqznnHandler.s_roomInfo',
        s_roundSettlement: 'game.pokqznnHandler.s_roundSettlement',
        s_setBanker: 'game.pokqznnHandler.s_setBanker',
        s_showCard: 'game.pokqznnHandler.s_showCard'
      }
    },
    poktexaspoker: {
      request: { c_operate: 'game.poktexaspokerHandler.c_operate' },
      push: {
        s_finalSettlement: 'game.poktexaspokerHandler.s_finalSettlement',
        s_notifyPlayerOperate: 'game.poktexaspokerHandler.s_notifyPlayerOperate',
        s_playerHandCard: 'game.poktexaspokerHandler.s_playerHandCard',
        s_pushPlayerBaseBet: 'game.poktexaspokerHandler.s_pushPlayerBaseBet',
        s_pushPlayerOperate: 'game.poktexaspokerHandler.s_pushPlayerOperate',
        s_roomInfo: 'game.poktexaspokerHandler.s_roomInfo',
        s_roundSettlement: 'game.poktexaspokerHandler.s_roundSettlement',
        s_sbBaseChange: 'game.poktexaspokerHandler.s_sbBaseChange',
        s_sbSeatIdChange: 'game.poktexaspokerHandler.s_sbSeatIdChange',
        s_sendPublicCard: 'game.poktexaspokerHandler.s_sendPublicCard',
        s_startNewRound: 'game.poktexaspokerHandler.s_startNewRound',
        s_startNewTurn: 'game.poktexaspokerHandler.s_startNewTurn'
      }
    },
    pokzjh: {
      request: {
        c_abandonCard: 'game.pokzjhHandler.c_abandonCard',
        c_addBet: 'game.pokzjhHandler.c_addBet',
        c_compareCard: 'game.pokzjhHandler.c_compareCard',
        c_followBet: 'game.pokzjhHandler.c_followBet',
        c_lookCard: 'game.pokzjhHandler.c_lookCard',
        c_timeOutProject: 'game.pokzjhHandler.c_timeOutProject'
      },
      push: {
        s_abandonCard: 'game.pokzjhHandler.s_abandonCard',
        s_addBet: 'game.pokzjhHandler.s_addBet',
        s_compareCardResult: 'game.pokzjhHandler.s_compareCardResult',
        s_curPlay: 'game.pokzjhHandler.s_curPlay',
        s_guZhuYiZhi: 'game.pokzjhHandler.s_guZhuYiZhi',
        s_initHandCards: 'game.pokzjhHandler.s_initHandCards',
        s_lookCard: 'game.pokzjhHandler.s_lookCard',
        s_notify: 'game.pokzjhHandler.s_notify',
        s_operation: 'game.pokzjhHandler.s_operation',
        s_playerHandCard: 'game.pokzjhHandler.s_playerHandCard',
        s_roomInfo: 'game.pokzjhHandler.s_roomInfo',
        s_roundMaxTurn: 'game.pokzjhHandler.s_roundMaxTurn',
        s_roundSettlement: 'game.pokzjhHandler.s_roundSettlement',
        s_startNewRound: 'game.pokzjhHandler.s_startNewRound',
        s_timeOutProject: 'game.pokzjhHandler.s_timeOutProject'
      }
    },
    slo: {
      request: { c_spin: 'game.sloHandler.c_spin' },
      push: {
        s_playerEnter: 'game.sloHandler.s_playerEnter',
        s_playerLeave: 'game.sloHandler.s_playerLeave',
        s_pushGameSceneConfig: 'game.sloHandler.s_pushGameSceneConfig',
        s_pushUserWallet: 'game.sloHandler.s_pushUserWallet'
      }
    }
  },
  ranking: {
    client: {
      request: {
        c_getRankingList: 'ranking.clientHandler.c_getRankingList',
        c_receiveRankingReward: 'ranking.clientHandler.c_receiveRankingReward'
      }
    }
  },
  verify: {
    client: {
      request: { c_getAdConfig: 'verify.clientHandler.c_getAdConfig' }
    }
  }
}