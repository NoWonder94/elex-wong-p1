import { PayType } from '../../../../sharing.base/protocols/AuthProtocolConst';
import { ERROR, ItemsId } from '../../common';

/** google支付 */
export interface GooglePayData {
  /**
   * 支付凭证token
   */
  purchaseToken: string,
  /**
   * BundleId
   */
  bundleId: string,
  /**
   * 产品id
   */
  productId: string
}

/** ios支付 */
export interface IOSPayData {
  /**
   * 支付凭证
   */
  receipt: string,
}

export interface api_payClientHandler_c_buy_Req {
  /**
   * 支付类型
   * @TJS-type sInt32
   */
  pay_type: PayType;
  /**
   * 支付数据
   * @TJS-type string
   */
  pay_data: string;
}

export interface api_payClientHandler_c_buy_Res_data {
  /** 物品id */
  item_id: ItemsId;
  /** 物品数量 */
  item_num: number;
  /** 额外赠送 */
  extra: string[];
  /** 拥有物品数量 */
  own_gold: number
}

export interface api_payClientHandler_c_buy_Res {
  error: ERROR;
  data?: api_payClientHandler_c_buy_Res_data;
}
