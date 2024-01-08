import { SEAT_ID } from '../../../../../sharing.base/consts';

/**
 * 操作牌组序号
 */
export interface game_pokblackjackHandler_s_actionsCardsIndex_Res {
    /** 牌的序号 */
    cardsIndex: number;
    /** 代理座位号 */
    proxySeatId: SEAT_ID
}