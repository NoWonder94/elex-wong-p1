import {SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 推送玩家操作
 */
export interface game_poktexaspokerHandler_s_pushPlayerOperate {
    /** 操作类型 */
    type: number;
    /** 房间总下注 */
    totalBet: number;
    /** 玩家座位号 */
    playerSeatId: SEAT_ID;
    /** 当前轮玩家下注 */
    curTurnGold: number;
}