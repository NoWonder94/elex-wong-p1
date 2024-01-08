/**
 * 孤注一掷
 */
import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';

export interface game_pokzjhHandler_s_guZhuYiZhi {
    /** 玩家座位号 */
    seatId: SEAT_ID,
    /** 0.失败  1.成功 */
    result: number
    cards: number[],
    pattern: number,
}