import { SEX } from '../../../sharing.base/constants/PlayerBaseConst';
import { PlatIdentify } from '../../../sharing.base/consts';
import { AgentAuthData, AppleSignData, DeviceGuestAuthData, AuthType, FacebookAuthData, GooglePlusData, InnerAuthData, PayType, WechatAuthData, TokenSignData } from '../../../sharing.base/protocols/AuthProtocolConst';

export interface gate_client_auth_Req {
    /**
     * 支付类型
     * @TJS-type number
     */
    pay_type?: PayType;

    /**
    * 授权渠道
    * @TJS-type number
    */
    auth_type: AuthType;

    /**
     * 平台标识
     */
    plat_id: PlatIdentify;
    /**
     * 授权数据
     */
    auth_data: DeviceGuestAuthData | InnerAuthData | AgentAuthData | WechatAuthData | FacebookAuthData | AppleSignData | GooglePlusData | TokenSignData;
    /**
     * 定制选项(可选)
     */
    options?: any;
}

export interface UserCoin {
    /**
     * 货币编码
     */
    code: string;

    /**
     * 货币数量
     * @TJS-type number
     */
    quantity: number;
}

/** 用户基本信息 */
export interface UserInfo {
    /**
     * 用户id
     */
    id: number;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 性别
     */
    sex: SEX;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 国家编码
     */
    country_code: string;
    /**
     * 金币
     * @TJS-type number
     */
    gold: number;
    /**
     * 币余额
     */
    coins: UserCoin[];
    /**
     * 当前使用币种
     */
    coin_used: string;
    /**
     * 会话
     */
    token?: string;
}

/** 连接信息 */
export interface ConnectInfo {
    /**
     * 服务器版本
     */
    version: string;
    /**
     * 连接服务器
     */
    connector: string;
}

export interface gate_client_auth_Res {
    /**
     * 用户基本信息
     */
    user_info: UserInfo;
    /**
     * 连接信息
     */
    connect_info: ConnectInfo;
}