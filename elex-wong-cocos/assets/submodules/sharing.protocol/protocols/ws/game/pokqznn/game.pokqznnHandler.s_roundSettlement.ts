import { ProtoPushSettlementPlayer } from '../impl/game.base';
import { ROOM_ID } from '../../../../../sharing.base/consts';

/**
 * 结算
 */
export interface game_pokqznnHandler_s_roundSettlement {
    /** 牌局状态 */
    status: number;
    /** 房间号 */
    roomId: ROOM_ID;
    /** 信息 */
    info: ProtoPushSettlementPlayer[];
}