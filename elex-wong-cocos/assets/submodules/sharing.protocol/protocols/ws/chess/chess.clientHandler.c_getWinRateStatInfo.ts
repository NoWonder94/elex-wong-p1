import {ERROR} from '../../common';
import {GAME_ID, UID} from '../../../../sharing.base/consts';

/** 玩家统计信息结构 */
export interface WinRateStatInfoStruct {
    max_card: number[],
    max_card_pattern: number,
    max_win_gold: number,
    total_count: number,
    win_count: number,
}

/** 玩家统计信息结构 */
export interface PoktexaspokerWinRateStatInfoStruct {
    /** 最大牌 */
    max_card: number[],
    /** 游戏总次数 */
    total_count: number,
    /** 赢牌次数 */
    win_count: number,
    /** 最近五局输赢情况  0 输   1赢*/
    last_five_game: number[]
    /** 弃牌次数 */
    abandon: number
}

/**
 * 获取玩家游戏统计信息
 */
export interface chess_ClientHandler_c_getWinRateStatInfo_Req {
    gameId: GAME_ID;
    uid: UID;
}


/**
 * 获取玩家游戏统计信息
 */
export interface chess_ClientHandler_c_getWinRateStatInfo_Res {
    error: ERROR;
    data?: WinRateStatInfoStruct;
}