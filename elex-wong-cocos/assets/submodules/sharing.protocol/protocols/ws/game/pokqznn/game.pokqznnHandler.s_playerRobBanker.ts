import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家抢庄
 */
export interface game_pokqznnHandler_s_playerRobBanker {
    /** 座位号 */
    seatId: SEAT_ID;
    /** 抢庄倍数， 0不抢，其他为加注倍数 */
    multi: number;
}