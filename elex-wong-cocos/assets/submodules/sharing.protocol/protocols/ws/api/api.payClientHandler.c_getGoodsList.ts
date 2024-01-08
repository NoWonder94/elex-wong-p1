import {PayType} from '../../../../sharing.base/protocols/AuthProtocolConst';
import {ERROR} from '../../common';

export interface api_payClientHandler_c_getGoodsList_Req {
    /**
     * 支付类型
     * @TJS-type sInt32
     */
    pay_type: PayType;
}

export interface api_payClientHandler_c_getGoodsList_Res_data {
    /** 图标 */
    icon: string;
    /** 显示排序索引 */
    index: number;
    /** 商品名称 */
    name: string;
    /** 支付渠道【商品ID】 */
    sdk_goods_id: string;
    /** 物品ID */
    item_id: number;
    /** 物品数量 */
    item_num: number;
    /** 额外附赠物品['1,100','2,10'] */
    extra: string[]
    /** 物品ID【赠送】 */
    give_item_id?: number;
    /** 物品数量【赠送】 */
    give_item_num?: number;
    /** 币种 */
    currency: string;
    /**
     * 售价
     * @TJS-type string
     */
    price: string;
    /**
     * 支付平台类型
     * @TJS-type sInt32
     */
    pay_type: PayType;
    /**
     * 原价
     * @TJS-type string
     */
    original_price?: string;
}

export interface api_payClientHandler_c_getGoodsList_Res {
    error: ERROR;
    data?: api_payClientHandler_c_getGoodsList_Res_data[];
}
