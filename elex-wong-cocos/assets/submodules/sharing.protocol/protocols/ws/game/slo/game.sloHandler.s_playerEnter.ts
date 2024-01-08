import { GAME_ID, ROOM_ID, SCENE_ID, SEAT_ID } from '../../../../../sharing.base/consts';
import { ProtoSloPlayerInfo } from '../../../../games/slo/SloConst';
import { PlayerEventType } from '../impl/game.base';

/**
 * 玩家进入
 */
export interface game_sloHandler_s_playerEnter {
    /** 游戏id */
    gameId: GAME_ID;
    /** 场景id */
    sceneId: SCENE_ID;
    /** 房间号 */
    roomId: ROOM_ID;
    /** 当前进入玩家座位号 */
    seatId: SEAT_ID;
    /** 底注 */
    betBase?: number;
    /** 事件 0:正常，1：重连，2：进入观战 */
    event: PlayerEventType;
    /** 信息 */
    players: ProtoSloPlayerInfo[];
}