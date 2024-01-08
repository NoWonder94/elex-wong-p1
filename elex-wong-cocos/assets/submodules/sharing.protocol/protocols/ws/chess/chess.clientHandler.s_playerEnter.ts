import {ROOM_ID, SEAT_ID, ROOM_CODE} from '../../../../sharing.base/consts';
import {PlayerEventType} from '../game/impl/game.base';
import {ProtoUserBaseInfo} from '../impl/chessApp.base';
import {chess_clientHandler_s_startCountdown} from './chess.clientHandler.s_startCountdown';

/** 用户基本信息 */
export interface ProtoPlayerMatchBaseInfo extends ProtoUserBaseInfo {
    /**
     * 等级
     * @TJS-type uInt32
     */
    level: number;
    /**
     * 拥有金币
     * @TJS-type double
     */
    exp: number;
    /**
     * 座位号
     */
    seatId: SEAT_ID;
    /**
     * 直播code
     */
    liveCode?: string;

    /** 桌子上的钱 */
    tableGold?: number
}


/**
 * 玩家进入
 */
export interface chess_clientHandler_s_playerEnter {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 房间编号 */
    roomCode?: ROOM_CODE;
    /** 当前进入玩家座位号 */
    seatId: SEAT_ID;
    /** 开局倒计时 */
    countdown: chess_clientHandler_s_startCountdown;
    /** 底注 */
    betBase?: number;
    /** 事件 0:正常，1：重连，2：进入观战 */
    event: PlayerEventType;
    /** 信息 */
    players: ProtoPlayerMatchBaseInfo[];
}