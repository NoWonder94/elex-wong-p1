import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家加注(玩家加注、跟注都返回这个消息)
 */
export interface game_pokzjhHandler_s_addBet {
    /** 座位号 */
    seatId: SEAT_ID,
    /** 本次押注金额 */
    addBet: number,
    /** 是否加注 */
    type: number,
    /** 是否是底分(1.底分  0.不是) */
    isBaseBet: number,
    /** 玩家总押注 */
    playerTotalBet: number,
    /** 房间玩家总押注 */
    roomTotalBet: number,
    /** 玩家金币
     * @TJS-type double
     */
    ownGold: number,
    /**
     * 加注序号
     * @TJS-type int32
     */
    addIndex: number,

    /** 事件  0:没有事件   1孤注一掷 */
    event: number
}