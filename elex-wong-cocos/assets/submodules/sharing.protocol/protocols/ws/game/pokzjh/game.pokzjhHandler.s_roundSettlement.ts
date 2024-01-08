import {ROOM_ID} from '../../../../../sharing.base/consts';
import {ProtoPushSettlementPlayer} from '../impl/game.base';

/**
 * 结算
 */
export interface game_pokzjhHandler_s_roundSettlement {
    /** 牌局状态 */
    status: number;
    /** 房间号 */
    roomId: ROOM_ID;
    /** 信息 */
    info: ProtoPushSettlementPlayer[];
}