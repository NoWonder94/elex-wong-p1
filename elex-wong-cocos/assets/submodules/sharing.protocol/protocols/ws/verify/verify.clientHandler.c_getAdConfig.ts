import { ERROR, AdUnitPosType, Item } from '../../common';
import { AdPlatType, AdType } from '../../../../sharing.base/protocols/CommonBase';
import { DeviceType } from '../../../../sharing.base/consts';

/** 获取签到配置 */
export interface verify_clientHandler_c_getAdConfig_Req {
    /** 广告平台类型 */
    ad_plat_type: AdPlatType;
    /** 设备类型 */
    device_type: DeviceType;
}

export interface ProtoAdConfigItem {
    /** 广告单元位置类型 */
    pos_type: AdUnitPosType;
    /** 广告类型 */
    ad_type: AdType;
    /** 广告ID */
    ad_id: string;
    /** 奖励物品 */
    items: Item[];
    /** 广告观看奖励次数限制 */
    ad_max_count: number;
    /** 广告已经观看次数 */
    ad_cost_count: number;
}

export interface verify_clientHandler_c_getAdConfig_Res_Data {
    /** 广告单元配置 */
    ad_units: ProtoAdConfigItem[];
    /** app id */
    app_id: string;
}

/**
 * 领取签到奖励
 */
export interface verify_clientHandler_c_getAdConfig_Res {
    error: ERROR;
    data?: verify_clientHandler_c_getAdConfig_Res_Data;
}