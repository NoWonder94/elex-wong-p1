import { BOOLEAN, SEAT_ID } from '../../../../../sharing.base/consts';


/**
 * 通知玩家操作
 */
export interface game_pokblackjackHandler_s_notifyPlayerAction_Res {
    /** 代理座位号 */
    proxySeatId: SEAT_ID
    /** 玩家座位号 */
    playerSeatId: SEAT_ID
    /** 操作项 [要牌，分牌，双倍、停牌] */
    actions: BOOLEAN[]
    /** 牌组序号 */
    cardGroupIndex: number
}