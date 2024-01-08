import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';
import {BLACKJACKPattern} from '../../../../games/pokblackjack/BLACKJACKConst';

/**
 * 双倍下注
 */
export interface game_pokblackjackHandler_s_doubleBet_Res {
    /** 代理座位号 */
    proxySeatId: SEAT_ID,
    /** 玩家座位号 */
    playerSeatId: SEAT_ID,
    /** 所加的牌 */
    card: number,
    /** 牌组序号 */
    cardGroupIndex: number,
    /** 是否所有代理爆牌 */
    isAllBurstCard: BOOLEAN,
    /** 点数 */
    point: number[],
    /** 操作 [要牌，分牌，双倍、停牌] */
    actions: BOOLEAN[],
    /** 加注金币 */
    addBet: number,
    /** 牌型 */
    pattern: BLACKJACKPattern
}