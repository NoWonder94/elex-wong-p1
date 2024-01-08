import { SEAT_ID } from '../../../../../sharing.base/consts';


/**
 * 停牌
 */
export interface game_pokblackjackHandler_s_stopCard_Res {
    /** 代理座位号 */
    proxySeatId: SEAT_ID,
    /** 玩家座位号 */
    playerSeatId: SEAT_ID,
}