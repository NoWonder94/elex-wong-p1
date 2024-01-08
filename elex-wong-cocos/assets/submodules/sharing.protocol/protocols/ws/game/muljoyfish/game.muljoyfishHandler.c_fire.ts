import { BOOLEAN } from '../../../../../sharing.base/consts';
import { ERROR } from '../../../common';

/** Spin请求 */
export interface game_muljoyfishHandler_c_fire_Req {
    /**
     * 子弹
     */
    bullet_id: number;
    /**
     * 投注倍数
     * @TJS-type sInt32
     */
    bet: number;
}

export interface game_muljoyfishHandler_c_fire_Res_Data {
    /**
     * 中奖总金额
     * @TJS-type float
     */
    win_gold: number;
    /**
     * 拥有金币
     * @TJS-type double
     */
    own_gold: number;
    /**
     * 是否中Scatter游戏
     */
    is_scatter: BOOLEAN;
    /**
     * 是否中Wild游戏
     */
    is_wild: BOOLEAN;
    /**
     * 是否中Bonus游戏
     */
    is_bonus: BOOLEAN;
    /**
     * Scatter奖励
     * @TJS-type float
     */
    scatter_award?: number;
    /**
     * Wild奖励
     * @TJS-type float
     */
    wild_award?: number;
    /**
     * Bonus奖励
     * @TJS-type float
     */
    bonus_award?: number;
    /**
     * 奖池金额
     * @TJS-type float
     */
    pool?: number;
}

/** Spin响应 */
export interface game_muljoyfishHandler_c_fire_Res {
    error: ERROR;
    data?: game_muljoyfishHandler_c_fire_Res_Data;
}
