import { SEX } from '../constants/PlayerBaseConst';
import { DeviceType } from '../consts';
import { CURRENCY } from '../currency';
import { LANGUAGE } from '../languages';

// 支付渠道定义
export enum PayType {
    /** 内部支付 */
    InnerPay = 1,
    /** 苹果商店支付 */
    IOSPay = 2,
    /** google商店支付 */
    GooglePay = 3,
    /** 微信支付 */
    WeChatPay = 4,
}

// 授权类型定义
export enum AuthType {
    /** 内部授权(游客、自定义账号) */
    Inner = 1,
    /** 微信授权 */
    WeChat = 2,
    /** facebook授权 */
    Facebook = 3,
    /** google授权 */
    GoogleSignIn = 4,
    /** 苹果登录 */
    AppleSign = 5,
    /** 设备关联游客账号登录 */
    DeviceGuest = 6,
    /** token登录 */
    TokenSignIn = 7,
    /** 授权商户登录 */
    Agency = 8,
};

/** 基础shou */
export interface BaseAuthData {
    /**
     * 设备类型
     */
    device_type?: DeviceType;
    /** 设备信息 */
    device?: string;
    /** 浏览器信息/设备sn */
    device_sn?: string;
    /**
     * 语言
     * @TJS-type string
     */
    language?: LANGUAGE;
}

export interface InnerAuthData extends BaseAuthData {
    /**
     * 昵称
     */
    nickname?: string;
    /**
     * 玩家账号
     */
    account_id: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 性别
     * @TJS-type number
     */
    sex?: SEX;
    /**
     * 币种
     * @TJS-type string
     */
    currency?: CURRENCY;
    /**
     * 国家
     */
    country?: string;
    /**
     * 城市
     */
    city?: string;
}

export interface AgentAuthData extends BaseAuthData {
    /**
     * 玩家账号
     */
    account_id: string,
    /**
     * 密码
     */
    game_code: string,
}

/**
 * 微信授权数据
 */
export interface WechatAuthData extends BaseAuthData {
    /**
     * 授权code
     */
    code: string;
}

/**
 * facebook授权数据
 */
export interface FacebookAuthData extends BaseAuthData {
    /**
     * facebook授权token
     */
    access_token: string;
}

/**
 * google plus授权数据
 */
export interface GooglePlusData extends BaseAuthData {
    /**
     * google plus授权token
     */
    id_token: string;
}

/**
 * apple授权数据
 */
export interface AppleSignData extends BaseAuthData {
    /**
     * apple授权token
     */
    identityToken: string;
    /**
     * 昵称
     */
    nickname?: string;
}

export interface DeviceGuestAuthData extends BaseAuthData {
    /**
     * 昵称
     */
    nickname?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 性别
     * @TJS-type number
     */
    sex?: SEX;
    /**
     * 币种
     * @TJS-type string
     */
    currency?: CURRENCY;
    /**
     * 国家
     */
    country?: string;
    /**
     * 城市
     */
    city?: string;
}

export interface TokenSignData extends BaseAuthData {
    /**
     * apple授权token
     */
    token: string;
}