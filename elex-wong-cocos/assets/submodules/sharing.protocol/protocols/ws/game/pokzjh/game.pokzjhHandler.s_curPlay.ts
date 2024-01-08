import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 当前玩家
 */
export interface game_pokzjhHandler_s_curPlay {
    /** 座位号 */
    seatId: SEAT_ID,
    /** 当前游戏的轮数 */
    curGameTurn: number,
    /** 玩家操作轮数 */
    playerGameTurn: number,
    /** 当前低分 */
    betBase: number
}