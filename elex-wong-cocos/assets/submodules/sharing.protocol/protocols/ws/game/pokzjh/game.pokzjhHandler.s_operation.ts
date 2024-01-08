/**
 * 玩家操作(检查玩家具体任务并进行对应的任务发送)
 */
import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';

export interface game_pokzjhHandler_s_operation {
    /** 座位号 */
    seatId: SEAT_ID,
    /** 当前游戏轮数 */
    curGameTurn: number,
    /** 玩家操作轮数 */
    playerGameTurn: number,

    /** 弃牌 */
    canAbandonCard: BOOLEAN,
    /** 看牌 */
    canLookCard: BOOLEAN,
    /** 跟注 */
    canFollowBet: BOOLEAN,
    /** 加注 */
    canAddBet: BOOLEAN,
    /** 比牌 */
    canCompareCard: BOOLEAN,
}