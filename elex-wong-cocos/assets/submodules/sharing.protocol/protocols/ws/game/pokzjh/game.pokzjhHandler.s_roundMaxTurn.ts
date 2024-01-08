import {ZJHPattern} from '../../../../games/pokzjh/ZJHConst';
import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 最大轮数上限
 */
export interface game_pokzjhHandler_s_roundMaxTurn {
    /** 玩家座位号 */
    seatId: SEAT_ID,
    /** 0.失败  1.成功 */
    result: number,
    /** 扑克 */
    cards: number[],
    /** 牌型 */
    pattern: ZJHPattern
}