import { GAME_ID, SCENE_ID, ROOM_ID } from '../../../../sharing.base/consts';
import { GAME_MATCH_TYPE } from '../../../../sharing.base/constants/GameBaseConst';
import { ERROR } from '../../common';
/**
 * 进入游戏匹配请求包
 */
export interface chess_clientHandler_c_enterMatch_Req {
    /** 游戏id */
    gameId: GAME_ID;
    /** 场景id */
    sceneId: SCENE_ID;
    /** 匹配类型，默认FIXED */
    matchType?: GAME_MATCH_TYPE;
    /** 房间id */
    roomId?: ROOM_ID;
    /**
     * 选项定制
     * @TJS-type message
     */
    options?: any;
}

/**
 * 进入游戏匹配响应
 */
export interface chess_clientHandler_c_enterMatch_Res {
    error: ERROR;
    /**
     * 选项定制
     * @TJS-type message
     */
    data?: any;
}