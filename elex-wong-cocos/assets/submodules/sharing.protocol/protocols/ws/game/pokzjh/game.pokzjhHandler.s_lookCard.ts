import {ZJHPattern} from '../../../../games/pokzjh/ZJHConst';
import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家看牌
 */
export interface game_pokzjhHandler_s_lookCard {
    /** 座位号 */
    seatId: SEAT_ID,
    /** 牌*/
    cards: number[],
    /** 牌型 */
    pattern: ZJHPattern;
}