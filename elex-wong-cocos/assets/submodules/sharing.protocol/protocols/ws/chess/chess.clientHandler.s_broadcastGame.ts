
export interface ProtoBroadcastItem {
    /** 公告内容 */
    content: string;
    /** 播放次数 */
    count: number
    /** 优先级 */
    priority: number;
}

/** 游戏公告 */
export interface chess_clientHandler_s_broadcastGame {
    /** 公告列表 */
    list: ProtoBroadcastItem[];
}