import { BOOLEAN } from '../../../../sharing.base/consts';

/** 系统公告 */
export interface chess_clientHandler_s_broadcastSys {
    /** 公告内容 */
    content: string;
    /** 状态(开关) */
    state: BOOLEAN;
    /** 过期时间 */
    expire_time: number;
}