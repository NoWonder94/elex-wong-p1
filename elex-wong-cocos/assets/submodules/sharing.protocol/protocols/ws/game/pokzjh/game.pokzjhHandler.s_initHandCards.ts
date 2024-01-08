import { ZJHPattern } from '../../../../games/pokzjh/ZJHConst';
import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 发牌
 */
export interface game_pokzjhHandler_s_initHandCards {
    /** 座位号 */
    seatId: SEAT_ID;
    /**
     * 手牌
     * @additionalProperties uInt32
     * @TJS-type array
     */
    cards: number[];
    /**
     * 牌型
     * @TJS-type uInt32
     */
    pattern: ZJHPattern;
}