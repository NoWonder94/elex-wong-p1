import {BOOLEAN, GAME_ID, ROOM_ID, SCENE_ID, SEAT_ID} from '../../../../../sharing.base/consts';
import {GamePlayway} from '../../../../../sharing.base/constants/GameBaseConst';
import {PlayerState} from '../../../../../sharing.base/constants/PlayerBaseConst';
import {ProtoUserBaseInfo} from '../../impl/chessApp.base';

// 请求协议 START

// 请求协议 END


// 推送协议定义 START

/** 玩家进入游戏 */
export interface ProtoPlayerBaseInfo extends ProtoUserBaseInfo {
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
    /** 座位号 */
    seatId: SEAT_ID;
    /** 登录ip */
    lastLoginIp: string;
    /** 玩家状态 */
    playerState: number;
    /** 玩家战绩id */
    reportId: string;
}


export interface ProtoPushPlayerEnter {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 信息 */
    players: ProtoPlayerBaseInfo[];
}

/** 玩家离开 */
export interface ProtoPushPlayerLeave {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 座位号 */
    seatId: SEAT_ID;
    /** 玩家状态 */
    playerState: PlayerState;
}

/** 玩家掉线 */
export interface ProtoPushPlayerOffline {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 座位号 */
    seatId: SEAT_ID;
    /** 玩家状态 */
    playerState: PlayerState;
}

/** 玩家重连 */
export interface ProtoPushPlayerReconnect {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 座位号 */
    seatId: SEAT_ID;
    /** 玩家状态 */
    playerState: PlayerState;
}

export interface ProtoRoomInfoOptions {
    /** 房间人数 */
    roomPlayerNum?: number;
}

/** 玩家事件类型 */
export enum PlayerEventType {
    /** 正常 */
    normal = 1,
    /** 重连 */
    reconnect = 2,
    /** 观战 */
    watch = 3,
}

/** 房间信息 */
export interface ProtoRoomInfo {
    /** 房间号 */
    roomId: ROOM_ID;
    /** 游戏id */
    gameId: GAME_ID;
    /** 场景id */
    sceneId: SCENE_ID;
    /** 战绩id */
    reportId: string;
    /** 定制规则 */
    options: ProtoRoomInfoOptions;
    /** 玩法类型 */
    playwayType: GamePlayway;
    /** 房间状态 */
    roomState: number;
    /** 事件 0:正常，1：重连，2：进入观战 */
    event?: PlayerEventType;
}

/** 游戏倒计时 */
export interface ProtoPushCountdown {
    /**
     * @TJS-type string
     */
    gameState: string;
    /**
     * 服务器时间ms
     */
    serverTimeMS: number;
    /**
     * 倒计时开始时间
     */
    startTimeMS: number;
    /**
     * 倒计时总时间
     */
    totalTimeS: number;
    /**
     * 倒计时剩余时间
     */
    freeTimeS: number;
}

export interface ProtoSettlementPlayerBaseInfo {
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
     * 拥有金币
     * @TJS-type double
     */
    ownGold: number;
    /**
     * 获得金币
     * @TJS-type float
     */
    gainGold: number;
    /**
     * 是否认输
     */
    isDefeat: BOOLEAN;
}

export interface ProtoPushSettlementPlayer extends ProtoSettlementPlayerBaseInfo {

}

// 推送协议定义 END