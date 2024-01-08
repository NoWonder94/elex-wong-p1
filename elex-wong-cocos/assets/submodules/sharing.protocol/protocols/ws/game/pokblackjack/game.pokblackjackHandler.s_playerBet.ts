import {SEAT_ID} from '../../../../../sharing.base/consts';


/**
 * 玩家下注
 */
export interface game_pokblackjackHandler_s_playerBet_Res {
    /** 代理座位号 */
    proxySeatId: SEAT_ID
    /** 玩家座位号 */
    playerSeatId: SEAT_ID
    /** 总下注 */
    totalBet: number,
    /** 当前下注 */
    playerBet: number,
    /** 当前金币 */
    ownGold: number,
    /**
     * index
     * @TJS-type int32
     */
    index: number
}