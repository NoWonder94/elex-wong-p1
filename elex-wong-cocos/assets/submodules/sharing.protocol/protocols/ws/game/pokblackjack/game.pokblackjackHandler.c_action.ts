import { SEAT_ID } from '../../../../../sharing.base/consts';
import { PLAYER_ACTION_TYPE } from '../../../../games/pokblackjack/BLACKJACKConst';

/**
 * 玩家操作
 */
export interface game_pokblackjackHandler_c_action_Req {
    /** 操作类型 */
    type: PLAYER_ACTION_TYPE
    /**
     * 座位号
     * @TJS-type sInt32
     */
    seatId: SEAT_ID
    /** 分牌的时候使用：默认0，分离出去的牌为1 */
    index: number
}