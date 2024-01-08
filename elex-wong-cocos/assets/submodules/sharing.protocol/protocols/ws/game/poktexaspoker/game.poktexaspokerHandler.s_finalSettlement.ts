import {ROOM_ID} from '../../../../../sharing.base/consts';
import {ProtoPushTEXASPOKERFinalSettlementPlayer} from './impl/game.texaspoker';


/**
 * 结算
 */
export interface game_poktexaspokerHandler_s_finalSettlement {
    /** 牌局状态 */
    status: number;
    /** 房间号 */
    roomId: ROOM_ID;
    /** 信息 */
    info: ProtoPushTEXASPOKERFinalSettlementPlayer[];
}