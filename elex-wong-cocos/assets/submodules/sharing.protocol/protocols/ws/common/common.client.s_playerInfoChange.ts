import { UID } from '../../../../sharing.base/consts';
import { ItemCostType, Item } from '../../common';
/** 玩家信息变化 */
export interface common_client_s_playerInfoChange {
    /**
    * 用户ID
    */
    uid: UID;
    /**
     * 类型
     */
    type: ItemCostType;
    /**
     * 消耗物品
     */
    cost?: Item[]
    /**
     * 获得物品
     */
    gain?: Item[]
    /**
     * @TJS-type string
     */
    change: string
}