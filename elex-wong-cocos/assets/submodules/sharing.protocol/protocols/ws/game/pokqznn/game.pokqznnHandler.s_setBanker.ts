import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 定庄
 */
export interface game_pokqznnHandler_s_setBanker {
    /** 庄家座位号 */
    bankerSeatId: SEAT_ID;
    /**
     * 随机成员
     * @additionalProperties sInt32
     * @TJS-type array
     */
    randomSeatIds: number[];
}