import { CardInfo } from './impl/game.blackjack';


/**
 * 广播玩家手牌
 */
export interface game_pokblackjackHandler_s_playerHandCard_Res {
    /** 牌信息 */
    cardInfos: CardInfo[]
}