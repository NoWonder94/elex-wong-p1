import { MatrixReel, SpinType } from '../../../../games/slo/SloConst';
import { BOOLEAN, COIN_CODE } from '../../../../../sharing.base/consts';
import { ERROR } from '../../../common';

/** Spin请求 */
export interface game_sloHandler_c_spin_Req {
    /**
     * 旋转类型
     */
    type: SpinType;
    /**
     * 币种
     */
    coin: COIN_CODE;
    /**
     * 投注倍数
     * @TJS-type sInt32
     */
    bet: number;
    /**
     * 模拟矩阵(测试环境开放)
     */
    wheel?: MatrixReel[];
}

export interface SloAwardItemInfo {
    /**
     * 线奖励
     * @TJS-type float
     */
    award: number;
    /**
     * 中奖线路坐标
     * [1, 1, 1, 1, 1]
     */
    line: number[];
    /**
     * 线路上中奖图标位置索引
     * [2, 3, 4]
     */
    pos: number[];
}

export interface SloAwardItem {
    /**
     * 总奖励
     * @TJS-type float
     */
    award: number;
    /**
     * 奖励信息
     */
    info: SloAwardItemInfo[];
}

interface SpinDataDetail {
    /**
     * 普通奖励
     */
    normal?: SloAwardItem;
    /**
     * wild奖励
     */
    wild?: SloAwardItem;
    /**
     * scatter奖励
     */
    scatter?: SloAwardItem;
    /**
     * bonus奖励
     */
    bonus?: SloAwardItem;
}

interface SpinData {
    /**
     * 旋转类型
     */
    type: SpinType;
    /**
     * 矩阵
     */
    matrix: MatrixReel[];
    /**
     * 中奖详情
     */
    detail?: SpinDataDetail;
}

export interface game_sloHandler_c_spin_Res_Data {
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
    /**
     * 旋转数据
     */
    spin_data: SpinData;
}

/** Spin响应 */
export interface game_sloHandler_c_spin_Res {
    error: ERROR;
    data?: game_sloHandler_c_spin_Res_Data;
}
