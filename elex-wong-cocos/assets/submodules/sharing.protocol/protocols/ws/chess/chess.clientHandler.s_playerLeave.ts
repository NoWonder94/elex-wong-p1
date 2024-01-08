import { ROOM_ID, SEAT_ID } from '../../../../sharing.base/consts';
import { ERROR } from '../../common';

/** 玩家离开 */
export interface chess_clientHandler_s_playerLeave {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 座位号 */
    seatId: SEAT_ID;
    /** 金币 */
    ownGold: number
    /**
    * 离开原因
    */
    reason?: ERROR;
}