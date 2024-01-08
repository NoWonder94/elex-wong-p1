import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家弃牌
 */
export interface game_pokzjhHandler_s_abandonCard {
    /** 座位号 */
    seatId: SEAT_ID,
    /** 本次押注金额 */
    addBet: number,
    /** 玩家总押注 */
    playerTotalBet: number,
    /** 房间玩家总押注 */
    roomTotalBet: number,
}