import { BOOLEAN } from '../../../../../sharing.base/consts';

export interface BillItem {
    /** 订单类型 */
    bill_type: number;
    /**
     * 获得金币
     * @TJS-type float
     */
    gain_gold: number;
    /**
     * 当前持有金币
     * @TJS-type double
     */
    own_gold: number;
    /** 牌型 */
    pattern?: number;
    /** 倍数 */
    pattern_score?: number;
    /** 金币来源 */
    from?: number[];
    /** 是否认输 */
    is_defeat: BOOLEAN;
    /** 订单创建时间 */
    create_at: number;
}

/** 结算详情字段定义 */
export interface SettlementDetailItem {
    /** 座位号 */
    seat_id: number;
}

/** 结算扩展字段定义 */
export interface SettlementExtItem {
    /** 座位号 */
    seat_id: number;
    /** 浏览器 */
    browser: string;
    /** 设备 */
    devices: string;
    /** 控制类型 */
    control_type: number;
}

/** 结算控制字段定义 */
export interface SettlementCtrlItem {
    seat_id: number;
}

