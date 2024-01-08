import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';
import {BLACKJACKPattern} from '../../../../games/pokblackjack/BLACKJACKConst';

/**
 * 分牌
 */
export interface game_pokblackjackHandler_s_splitCard_Res {
    /** 代理座位号 */
    proxySeatId: SEAT_ID,
    /** 玩家座位号 */
    playerSeatId: SEAT_ID,
    /** 牌组1信息 */
    cardGroup1: number[],
    /** 点数 */
    point1: number[],
    /** 牌型 */
    pattern1: BLACKJACKPattern,

    /** 牌组2信息 */
    cardGroup2: number[],
    /** 点数 */
    point2: number[],
    /** 牌型 */
    pattern2: BLACKJACKPattern,

    /** 操作 [要牌，分牌，双倍、停牌] */
    actions: BOOLEAN[],
}