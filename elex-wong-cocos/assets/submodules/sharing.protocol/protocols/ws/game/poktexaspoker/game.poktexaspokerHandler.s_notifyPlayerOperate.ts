import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 通知玩家操作
 */
export interface game_poktexaspokerHandler_s_notifyPlayerOperate {
    /** 玩家座位号 */
    playerSeatId: SEAT_ID;
    /** 最小押注 */
    minBet: number;
    /** 玩家操作 */
    operates: number[];
    /**玩家游戏可用金额 */
    tableGold: number,
    /** 当前轮下注 */
    curTurnGold: number
}