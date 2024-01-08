import { PLAT_CODE } from '../../../sharing.base/consts';

export interface gm_client_getRealtimeInfo_Req {
    /**
     * 平台编码
     * @TJS-type string
     */
    plat_code: PLAT_CODE;
}

/** 实时数据信息 */
export interface RealtimeInfo {
    /** 在线玩家 */
    online: number;
    /** 在线AI */
    online_ai: number;
    /** 游戏中玩家 */
    gaming: number;
    /** 游戏中AI */
    gaming_ai: number;
    /** 匹配局房间数 */
    room_num_matching: number;
    /** 好友局房间数 */
    room_num_friend: number;
    /** 每日活跃 */
    dau_sign: number;
    /** 每日新增活跃 */
    ndau_sign: number;
    /** 每周活跃 */
    wau_sign: number;
    /** 每月活跃 */
    mau_sign: number;
    /** 每日游戏活跃 */
    dau_game: number;
    /** 每日新增游戏活跃 */
    ndau_game: number;
    /** 每周游戏活跃 */
    wau_game: number;
    /** 每月游戏活跃 */
    mau_game: number;
}

export interface gm_client_getRealtimeInfo_Res extends RealtimeInfo {
}