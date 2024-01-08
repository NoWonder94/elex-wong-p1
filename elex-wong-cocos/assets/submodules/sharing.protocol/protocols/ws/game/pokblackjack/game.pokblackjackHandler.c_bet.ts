import { SEAT_ID } from '../../../../../sharing.base/consts';

/**
 * 玩家下注
 */
export interface game_pokblackjackHandler_c_bet_Req {
    /**
    * 座位号
    * @TJS-type sInt32
    */
    seatId: SEAT_ID;

    /** 下注携带的百分比 */
    addBetPercent: number;
}