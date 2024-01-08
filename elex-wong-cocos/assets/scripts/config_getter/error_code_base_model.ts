import { config_model_base } from './config_model';

/**
 * 错误码多语言文本配置。
 */
export class error_code_base_model extends config_model_base {

	public static getClassName(): string {
        return 'error_code_base_model'
    }

    public static getConfigName(filename?: string): string {
		return `error_code_base-${filename}.json`;
    }

    public static getUrl(filename: string, lang?: string): string {
		let configUrl = null;
        if (window['RemoteConfigURL']) {
            configUrl = `${window['RemoteConfigURL']}/config_i18n_${lang}/${filename}`
        } else {
            configUrl = `config_i18n_${lang}/${filename}`
        }
		return configUrl;
	}
}
export const error_code_base = {
	/** 成功 */
	OK : 0,
	/** 失败 */
	FAIL : -1,
	/** 系统错误 */
	SYSTEM_ERROR : -2,
	/** 网络错误 */
	NETWORK_ERROR : -3,
	/** 数据库错误 */
	DB_ERROR : -4,
	/** 参数无效 */
	PARAM_INVALID : -5,
	/** 参数缺失 */
	PARAM_MISSING : -6,
	/** 服务器内部错误 */
	SERVER_INTERNAL_ERROR : -7,
	/** 服务器未准备就绪 */
	SERVER_NOT_READY : -8,
	/** 消息路由不可达 */
	MSG_ROUTE_INVALID : -9,
	/** 不支持此接口 */
	INTERFACE_NOT_SUPPORT : -10,
	/** 游戏数据已过期 */
	DATA_IS_EXPIRE : -11,
	/** 系统维护中,敬请期待 */
	SYSTEM_MAINTENANCE : -12,
	/** 接口维护中,敬请期待 */
	INTERFACE_MAINTENANCE : -13,
	/** 配置文件异常 */
	CONFIG_EXCEPTION : -14,
	/** 接口调用太频繁 */
	CALL_TOO_OFTEN : -15,
	/** 即将开放，敬请期待 */
	WILL_OPEN_GAME : -16,
	/** 不支持此游戏 */
	NOT_SUPPORT_GAME : -17,
	/** 第三方授权失败 */
	THIRD_PARTY_AUTH_ERROR : -18,
	/** 网络超时 */
	NETWORK_TIMEOUT : -19,
	/** 第三方SDK接口调用失败 */
	SDK_INTERFACE_ERROR : -20,
	/** 本地区用户暂时不开放 */
	REGION_NOT_SUPPORT : -21,
	/** 外部服务未准备就绪 */
	SERVER_OUT_NOT_READY : -22,
	/** 配置已变更，请刷新游戏 */
	SYS_CONFIG_REFRESH : -23,
	/** 响应数据异常 */
	RESPONSE_DATA_EXCEPTION : -24,
	/** 游戏中无法消耗物品 */
	GAMING_NOT_COST_ITEM : -24,
	/** 用户不存在 */
	USER_NOT_EXIST : -200,
	/** 用户token无效 */
	USER_TOKEN_INVALID : -201,
	/** 不支持此渠道用户 */
	USER_NOT_SUPPORT_CHANNEL : -202,
	/** 手机验证码无效 */
	USER_CODE_INVALID : -203,
	/** 手机验证码过期 */
	USER_CODE_EXPIRES : -204,
	/** 邀请人无效 */
	USER_INVITER_INVALID : -205,
	/** 玩家数据异常 */
	USER_DATA_EXCEPTION : -206,
	/** 账号锁定 */
	USER_LOCK : -207,
	/** 用户token过期 */
	USER_TOKEN_EXPIRES : -208,
	/** 用户名或者密码错误 */
	USERNAME_PASSWORD_ERROR : -209,
	/** 用户非法登录 */
	USER_ILLEGAL : -210,
	/** 异地登录 */
	USER_ROB_LOGIN : -211,
	/** 用户缓存过期 */
	USER_CACHE_EXPIRE : -212,
	/** 用户第三方token无效 */
	USER_SDK_TOKEN_INVALID : -213,
	/** 用户未连接服务器 */
	USER_NOT_CONNECT : -214,
	/** GMToken无效 */
	USER_GM_TOKEN_INVALID : -215,
	/** 余额不足 */
	PAY_AMOUNT_NOT_ENOUGH : -501,
	/** 支付参数无效 */
	PAY_PARAM_INVALID : -502,
	/** 支付渠道商品ID无效 */
	PAY_SDK_GOODS_ID_INVALID : -503,
	/** 订单创建失败 */
	PAY_ORDER_CREATE_FAIL : -504,
	/** 支付订单非法 */
	PAY_ORDER_ILLEGAL : -505,
	/** 支付订单渠道校验失败 */
	PAY_SDK_ORDER_CHECK_FAIL : -506,
	/** 订单重复使用 */
	PAY_ORDER_REPEAT : -507,
	/** 不支持此支付方式 */
	PAY_TYPE_NOT_SUPPORT : -508,
}
export const error_code_base_key = {};
for (let [k, v] of Object.entries(error_code_base)) {
	error_code_base_key[v] = k;
}

export const error_code_base_obj = {
	/** 成功 */
	OK: {
		code: 0,
		msg: '成功'
	},
	/** 失败 */
	FAIL: {
		code: -1,
		msg: '失败'
	},
	/** 系统错误 */
	SYSTEM_ERROR: {
		code: -2,
		msg: '系统错误'
	},
	/** 网络错误 */
	NETWORK_ERROR: {
		code: -3,
		msg: '网络错误'
	},
	/** 数据库错误 */
	DB_ERROR: {
		code: -4,
		msg: '数据库错误'
	},
	/** 参数无效 */
	PARAM_INVALID: {
		code: -5,
		msg: '参数无效'
	},
	/** 参数缺失 */
	PARAM_MISSING: {
		code: -6,
		msg: '参数缺失'
	},
	/** 服务器内部错误 */
	SERVER_INTERNAL_ERROR: {
		code: -7,
		msg: '服务器内部错误'
	},
	/** 服务器未准备就绪 */
	SERVER_NOT_READY: {
		code: -8,
		msg: '服务器未准备就绪'
	},
	/** 消息路由不可达 */
	MSG_ROUTE_INVALID: {
		code: -9,
		msg: '消息路由不可达'
	},
	/** 不支持此接口 */
	INTERFACE_NOT_SUPPORT: {
		code: -10,
		msg: '不支持此接口'
	},
	/** 游戏数据已过期 */
	DATA_IS_EXPIRE: {
		code: -11,
		msg: '游戏数据已过期'
	},
	/** 系统维护中,敬请期待 */
	SYSTEM_MAINTENANCE: {
		code: -12,
		msg: '系统维护中,敬请期待'
	},
	/** 接口维护中,敬请期待 */
	INTERFACE_MAINTENANCE: {
		code: -13,
		msg: '接口维护中,敬请期待'
	},
	/** 配置文件异常 */
	CONFIG_EXCEPTION: {
		code: -14,
		msg: '配置文件异常'
	},
	/** 接口调用太频繁 */
	CALL_TOO_OFTEN: {
		code: -15,
		msg: '接口调用太频繁'
	},
	/** 即将开放，敬请期待 */
	WILL_OPEN_GAME: {
		code: -16,
		msg: '即将开放，敬请期待'
	},
	/** 不支持此游戏 */
	NOT_SUPPORT_GAME: {
		code: -17,
		msg: '不支持此游戏'
	},
	/** 第三方授权失败 */
	THIRD_PARTY_AUTH_ERROR: {
		code: -18,
		msg: '第三方授权失败'
	},
	/** 网络超时 */
	NETWORK_TIMEOUT: {
		code: -19,
		msg: '网络超时'
	},
	/** 第三方SDK接口调用失败 */
	SDK_INTERFACE_ERROR: {
		code: -20,
		msg: '第三方SDK接口调用失败'
	},
	/** 本地区用户暂时不开放 */
	REGION_NOT_SUPPORT: {
		code: -21,
		msg: '本地区用户暂时不开放'
	},
	/** 外部服务未准备就绪 */
	SERVER_OUT_NOT_READY: {
		code: -22,
		msg: '外部服务未准备就绪'
	},
	/** 配置已变更，请刷新游戏 */
	SYS_CONFIG_REFRESH: {
		code: -23,
		msg: '配置已变更，请刷新游戏'
	},
	/** 响应数据异常 */
	RESPONSE_DATA_EXCEPTION: {
		code: -24,
		msg: '响应数据异常'
	},
	/** 游戏中无法消耗物品 */
	GAMING_NOT_COST_ITEM: {
		code: -24,
		msg: '游戏中无法消耗物品'
	},
	/** 用户不存在 */
	USER_NOT_EXIST: {
		code: -200,
		msg: '用户不存在'
	},
	/** 用户token无效 */
	USER_TOKEN_INVALID: {
		code: -201,
		msg: '用户token无效'
	},
	/** 不支持此渠道用户 */
	USER_NOT_SUPPORT_CHANNEL: {
		code: -202,
		msg: '不支持此渠道用户'
	},
	/** 手机验证码无效 */
	USER_CODE_INVALID: {
		code: -203,
		msg: '手机验证码无效'
	},
	/** 手机验证码过期 */
	USER_CODE_EXPIRES: {
		code: -204,
		msg: '手机验证码过期'
	},
	/** 邀请人无效 */
	USER_INVITER_INVALID: {
		code: -205,
		msg: '邀请人无效'
	},
	/** 玩家数据异常 */
	USER_DATA_EXCEPTION: {
		code: -206,
		msg: '玩家数据异常'
	},
	/** 账号锁定 */
	USER_LOCK: {
		code: -207,
		msg: '账号锁定'
	},
	/** 用户token过期 */
	USER_TOKEN_EXPIRES: {
		code: -208,
		msg: '用户token过期'
	},
	/** 用户名或者密码错误 */
	USERNAME_PASSWORD_ERROR: {
		code: -209,
		msg: '用户名或者密码错误'
	},
	/** 用户非法登录 */
	USER_ILLEGAL: {
		code: -210,
		msg: '用户非法登录'
	},
	/** 异地登录 */
	USER_ROB_LOGIN: {
		code: -211,
		msg: '异地登录'
	},
	/** 用户缓存过期 */
	USER_CACHE_EXPIRE: {
		code: -212,
		msg: '用户缓存过期'
	},
	/** 用户第三方token无效 */
	USER_SDK_TOKEN_INVALID: {
		code: -213,
		msg: '用户第三方token无效'
	},
	/** 用户未连接服务器 */
	USER_NOT_CONNECT: {
		code: -214,
		msg: '用户未连接服务器'
	},
	/** GMToken无效 */
	USER_GM_TOKEN_INVALID: {
		code: -215,
		msg: 'GMToken无效'
	},
	/** 余额不足 */
	PAY_AMOUNT_NOT_ENOUGH: {
		code: -501,
		msg: '余额不足'
	},
	/** 支付参数无效 */
	PAY_PARAM_INVALID: {
		code: -502,
		msg: '支付参数无效'
	},
	/** 支付渠道商品ID无效 */
	PAY_SDK_GOODS_ID_INVALID: {
		code: -503,
		msg: '支付渠道商品ID无效'
	},
	/** 订单创建失败 */
	PAY_ORDER_CREATE_FAIL: {
		code: -504,
		msg: '订单创建失败'
	},
	/** 支付订单非法 */
	PAY_ORDER_ILLEGAL: {
		code: -505,
		msg: '支付订单非法'
	},
	/** 支付订单渠道校验失败 */
	PAY_SDK_ORDER_CHECK_FAIL: {
		code: -506,
		msg: '支付订单渠道校验失败'
	},
	/** 订单重复使用 */
	PAY_ORDER_REPEAT: {
		code: -507,
		msg: '订单重复使用'
	},
	/** 不支持此支付方式 */
	PAY_TYPE_NOT_SUPPORT: {
		code: -508,
		msg: '不支持此支付方式'
	},
}