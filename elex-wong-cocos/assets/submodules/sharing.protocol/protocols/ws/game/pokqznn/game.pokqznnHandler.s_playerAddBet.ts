import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家加注
 */
export interface game_pokqznnHandler_s_playerAddBet {
    /** 座位号 */
    seatId: SEAT_ID;
    /** 加注倍数 */
    multi: number;
}