import { ERROR } from '../../common';

/**
 * 离开游戏匹配请求
 */
export interface chess_clientHandler_c_leaveMatch_Req {
    /** 离开原因 */
    reason: string;
}

/**
 * 离开游戏匹配响应
 */
export interface chess_clientHandler_c_leaveMatch_Res {
    error: ERROR;
    /**
     * 场景ID
     * @TJS-type message
     */
    data?: any;
}