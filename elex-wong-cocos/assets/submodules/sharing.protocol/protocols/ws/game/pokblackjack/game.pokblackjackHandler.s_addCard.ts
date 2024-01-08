import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts'
import {BLACKJACKPattern} from '../../../../games/pokblackjack/BLACKJACKConst';

/**
 * 加牌
 */
export interface game_pokblackjackHandler_s_addCard_Res {
    /** 添加的牌 */
    card: number,
    /** 牌组序号 */
    cardGroupIndex: number,
    /** 座位号 */
    proxySeatId: SEAT_ID,
    /** 玩家座位号 */
    playerSeatId: SEAT_ID,
    /** 点数 */
    point: number[],
    /** 牌型 */
    pattern: BLACKJACKPattern,
    /** 是否爆牌 */
    isAllBurstCard: BOOLEAN,
    /** 操作 [要牌，分牌，双倍、停牌]*/
    actions: BOOLEAN[],
}