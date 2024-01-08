import {ROOM_ID} from '../../../../../sharing.base/consts';
import {ProtoPushTEXASPOKERSettlementPlayer} from './impl/game.texaspoker';


/**
 * 结算
 */
export interface game_poktexaspokerHandler_s_roundSettlement {
    /** 牌局状态 */
    status: number;
    /** 房间号 */
    roomId: ROOM_ID;
    /** 信息 */
    info: ProtoPushTEXASPOKERSettlementPlayer[];
}