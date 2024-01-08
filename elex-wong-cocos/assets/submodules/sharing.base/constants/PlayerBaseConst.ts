import { GAME_ID, SCENE_ID, ROOM_ID } from '../consts';
import { GamePlayway, GAME_MATCH_TYPE } from './GameBaseConst';

/** 性别 */
export enum SEX {
    /** 保密 */
    SECRET = 0,
    /** 男 */
    MALE = 1,
    /** 女 */
    FEMALE = 2,
}

export const SEXS: SEX[] = [SEX.FEMALE, SEX.MALE];

/** 玩家状态 */
export enum PlayerState {
    /** 离线 */
    Offline = 1,
    /** 在线 */
    Online = 2,
    /** 匹配中 */
    Matching = 4,
    /** 启动中 */
    Starting = 8,
    /** 准备 */
    Ready = 16,
    /** 游戏中 */
    Gaming = 32,
    /** 认输 */
    Defeat = 64,
    /** 踢出 */
    Kick = 128,
    /** 离开 */
    Leave = 256,
}

/** 玩家游戏状态 */
export interface PlayerStateInfo {
    /** 状态(gameState) */
    state: PlayerState;
    /** 游戏房间类型（roomType） */
    roomType?: GamePlayway;
    /** 游戏id(gameId) */
    gameId?: GAME_ID;
    /** 场景id(sceneId) */
    sceneId?: SCENE_ID;
    /** 房间id(roomId) */
    targetId?: ROOM_ID;
    /** 匹配模式 */
    matchType?: GAME_MATCH_TYPE;
}