import {ProtoRankRoomInfo} from '../impl/game.rank';
import {ProtoPlayerTEXASPOKERInfo} from './impl/game.texaspoker';

/**
 * 房间信息
 */
export interface game_poktexaspokerHandler_s_roomInfo extends ProtoRankRoomInfo {
    /** 房间总投注 */
    totalBet: number;
    /** 小盲位底注 */
    sb: number;
    /** 大盲位底注 */
    bb: number;
    /** 已发送的公共牌 */
    sendPublicCard: number[];
    /** 玩家信息 */
    players: ProtoPlayerTEXASPOKERInfo[];
}