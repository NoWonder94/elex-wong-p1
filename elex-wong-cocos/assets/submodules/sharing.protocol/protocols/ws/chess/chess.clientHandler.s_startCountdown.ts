/** 开局倒计时 */
export interface chess_clientHandler_s_startCountdown {
    /** 启动时间 */
    startup: number;
    /** 总时间 */
    total: number
    /** 服务器当前时间 */
    now: number;
}