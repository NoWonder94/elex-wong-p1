import { QZNNRoomGameState } from '../../../../games/pokqznn/QZNNConst';
import { ProtoRankRoomInfo } from '../impl/game.rank';
import { ProtoPlayerQZNNInfo } from './impl/pokqznn.struct';

export interface game_pokqznnHandler_s_roomInfo extends ProtoRankRoomInfo {
    /** 游戏状态 */
    gameState: QZNNRoomGameState;
    players: ProtoPlayerQZNNInfo[]
}