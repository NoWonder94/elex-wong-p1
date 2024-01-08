/**
 * 比牌结果
 */
export interface game_pokzjhHandler_s_compareCardResult {
    /** 赢家座位号 */
    winIndex: number,
    /** 输家座位号 */
    FailIndex: number,
    /** 比牌发起者 */
    sourceIndex: number,
    /** 被比牌者 */
    targetIndex: number,
}