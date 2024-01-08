import {BOOLEAN, SEAT_ID} from '../../../../../sharing.base/consts';

/**
 * 玩家准备推送
 */
export interface game_chessRankHandler_s_playerReady {
    /** 座位号 */
    seatId: SEAT_ID;
}