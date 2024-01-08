import {ZJHPattern} from '../../../../games/pokzjh/ZJHConst';
import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 广播玩家手牌(比牌)
 */
export interface game_pokzjhHandler_s_playerHandCard {
    /** 玩家座位号 */
    seatId: SEAT_ID
    /** 扑克 */
    cards: number[],
    /** 牌型 */
    pattern: ZJHPattern,
    /** 是否弃牌 */
    isAbandon: BOOLEAN
}