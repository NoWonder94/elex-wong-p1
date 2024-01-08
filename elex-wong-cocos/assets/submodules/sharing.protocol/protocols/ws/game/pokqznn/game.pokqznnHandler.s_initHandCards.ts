import { QZNNPattern } from '../../../../games/pokqznn/QZNNConst';
import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 发牌
 */
export interface game_pokqznnHandler_s_initHandCards {
    /** 座位号 */
    seatId: SEAT_ID;
    /**
     * 手牌
     * @additionalProperties uInt32
     * @TJS-type array
     */
    handCards: number[];
    /**
     * 牌型
     * @TJS-type uInt32
     */
    pattern: QZNNPattern;
}