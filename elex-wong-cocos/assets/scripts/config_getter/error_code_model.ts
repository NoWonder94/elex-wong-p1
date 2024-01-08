import { error_code_base, error_code_base_obj} from './error_code_base_model';
import { config_model_base } from './config_model';

/**
 * 错误码多语言文本配置。
 */
export class error_code_model extends config_model_base {

	public static getClassName(): string {
        return 'error_code_model'
    }

    public static getConfigName(filename?: string): string {
		return `error_code-${filename}.json`;
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
export const error_code = {
	...error_code_base,
	/** 挂机次数超过上限 */
	MATCH_PLAYER_LEAVE_REASON_HANGUP : -1101,
	/** 服务器繁忙，稍后重试 */
	MATCH_PLAYER_LEAVE_REASON_SERVER_ERROR : -1102,
	/** 金币不足，无法继续游戏 */
	MATCH_PLAYER_LEAVE_REASON_LOW_GOLD : -1103,
	/** 玩家掉线离开游戏 */
	MATCH_PLAYER_LEAVE_REASON_OFFLINE : -1104,
	/** 邮件不存在 */
	MAIL_NOT_EXIST : -1201,
	/** 邮件已领取 */
	MAIL_RECEIVED : -1202,
	/** 邮件不存在附件 */
	MAIL_ANNEX_EMPTY : -1203,
	/** 邮件已经发送 */
	MAIL_SENDED : -1204,
	/** 邮件已过期 */
	MAIL_EXPIRE : -1205,
	/** 已经是好友 */
	FRIEND_ADD_REPEAT : -1301,
	/** 好友超过最大上限，请先删除其他好友 */
	FRIEND_MAX_LIMIT : -1302,
	/** 等待好友通过 */
	FRIEND_REQUESTING : -1303,
	/** 好友ID无效 */
	FRIEND_ID_INVALID : -1304,
	/** 已经邀请好友对局，等待好友回应 */
	FRIEND_INVITE_GAME_REPEAT : -1305,
	/** 不是好友 */
	FRIEND_NOT_ADD : -1306,
	/** 对局不存在 */
	FRIEND_ROUND_FINISH : -1307,
	/** 好友对局人数已满 */
	FRIEND_ROUND_FULL : -1308,
	/** 好友已离开对局 */
	FRIEND_ROUND_LEAVED : -1309,
	/** 好友对局邀请已过期 */
	FRIEND_INVITE_EXPIRE : -1310,
	/** 不支持此好友组局模式 */
	FRIEND_UNSUPPORT_MODE : -1311,
	/** 对局邀请ID无效 */
	FRIEND_ROOM_CODE_INVALID : -1312,
	/** 好友已经在当前房间 */
	FRIEND_ROOM_AREADY_IN : -1313,
	/** 活动奖励已经领取 */
	ACTIVITY_REWARD_RECEIVED : -1401,
	/** 活动已经关闭 */
	ACTIVITY_CLOSED : -1402,
	/** 活动已经结束 */
	ACTIVITY_OVER : -1403,
	/** 活动次数已经用完 */
	ACTIVITY_COUNT_OVER : -1404,
	/** 未获得活动奖励 */
	ACTIVITY_REWARD_EMPTY : -1405,
	/** 活动任务未达成 */
	ACTIVITY_TASK_NOT_FINISH : -1406,
	/** 奖励未配置 */
	ACTIVITY_REWARD_NOT_EXIST : -1407,
	/** 游戏类型无效 */
	GAME_TYPE_INVALID : -10000,
	/** 游戏场景无效 */
	GAME_SCENE_INVALID : -10001,
	/** 游戏ID无效 */
	GAME_ID_INVALID : -10002,
	/** 游戏维护中,敬请期待 */
	GAME_MAINTENANCE : -10003,
	/** 游戏组件未加载 */
	GAME_PLUGIN_NOT_LOAD : -10004,
	/** 游戏回放记录过期 */
	GAME_RECORD_EXPIRE : -10005,
	/** 正式版不支持测试登录 */
	GAME_PUBLISH_NOT_TEST : -10006,
	/** 正在游戏 */
	GAME_PLAYING : -10007,
	/** 游戏已开始 */
	GAME_STARTED : -10008,
	/** 游戏未开始 */
	GAME_NOT_PLAYING : -10010,
	/** 玩家已经在游戏中 */
	GAME_PLAYER_ALREADY_IN : -10011,
	/** 对局分配失败 */
	GAME_ALLOC_FAILED : -10012,
	/** 对局已经存在 */
	GAME_EXIST : -10013,
	/** 对局不存在 */
	GAME_NOT_EXIST : -10014,
	/** 对局异常 */
	GAME_CHECK_FAILED : -10015,
	/** 对局无效 */
	GAME_INVALID : -10016,
	/** 对局人数已满 */
	GAME_FULL : -10017,
	/** 玩家不在对局中 */
	GAME_PLAYER_NOT_IN : -10018,
	/** 对局已经结束 */
	GAME_ROUND_FINISHED : -10019,
	/** 加入游戏失败，请重试 */
	GAME_JOIN_FAIL : -10020,
	/** 游戏已经解散 */
	GAME_ALREADY_DESTROY : -10021,
	/** 游戏异常结束 */
	GAME_EXCEPTION_DESTROY : -10022,
	/** 游戏结算异常 */
	GAME_SETTLEMENT_EXCEPTION : -10023,
	/** 游戏场景超时销毁 */
	GAME_EMPTY_TIMEOUT_DESTROY : -10024,
	/** 游戏记录不存在 */
	GAME_GAME_RECORD_NOT_EXIST : -10025,
	/** 正在游戏中，无法加入其它游戏 */
	GAME_PLAYING_NOT_ENTER_OTHER : -10026,
	/** 金币超过游戏上限 */
	GAME_GOLD_MAX_LIMIT : -10027,
	/** 金币低于游戏准入 */
	GAME_GOLD_NOT_ENOUGH : -10028,
	/** 游戏结束 */
	GAME_OVER : -10029,
	/** 加注不能低于当前底注 */
	ZJH_NOT_LOWER_CURRATE : -10701,
	/** 当前还没有到玩家看牌的轮数 */
	ZJH_NOT_OVER_PLAYER_MEN : -10702,
	/** 玩家已经看牌 */
	ZJH_PLAYER_IS_LOOKCARD : -10703,
	/** 当前还没有到玩家比牌的轮数 */
	ZJH_NOT_OVER_PLAYER_COMPARE : -10704,
	/** 不能和自己比较 */
	ZJH_NOT_COMPARE_OWN : -10705,
	/** 当前玩家不能操作 */
	ZJH_PLAYER_NOT_OPERATOR : -10706,
	/** 当前还没有到玩家弃牌的轮数 */
	ZJH_NOT_OVER_PLAYER_ABANDON_CARD : -10707,
	/** 玩家不在游戏中 */
	ZJH_PLAY_NOT_PLAYING : -10708,
	/** 不可操作 */
	ZJH_NOT_OPERATOR : -10709,
	/** 没有轮到自己 */
	ZJH_NOT_CHANGED_ME : -10710,
	/** 无效玩家 */
	ZJH_PLAYER_INVALID : -10711,
	/** 加注的金币不足 */
	ZJH_ADD_BET_NOT_ENOUGH : -10712,
	/** 已经操作过了 */
	ZJH_RECUR_OPERATOR : -10713,
	/** 操作等待 */
	ZJH_OPERATOR_WAIT : -10714,
	/** 最后一个剩余玩家不能弃牌 */
	ZJH_NOT_ALL_PLAYER_ABANDON : -10715,
	/** 操作无效 */
	BLACKJACK_NOT_INVALID : -10801,
	/** 押注太频繁 */
	BLACKJACK_BETTING_TOO_FREQUENT : -10802,
	/** 投注金额无效 */
	BLACKJACK_BET_AMOUNT_INVALID : -10803,
	/** 金币不足 */
	BLACKJACK_BET_NOT_ENOUGH : -10804,
	/** 错误的座位号 */
	BLACKJACK_ERROR_INDEX : -10805,
	/** 投注超过最大限额 */
	BLACKJACK_BET_OVERLOAD : -10806,
	/** 操作无效 */
	TEXASPOKE__NOT_INVALID : -10901,
}
export const error_code_key = {};
for (let [k, v] of Object.entries(error_code)) {
	error_code_key[v] = k;
}

export const error_code_obj = {
	...error_code_base_obj,
	/** 挂机次数超过上限 */
	MATCH_PLAYER_LEAVE_REASON_HANGUP: {
		code: -1101,
		msg: '挂机次数超过上限'
	},
	/** 服务器繁忙，稍后重试 */
	MATCH_PLAYER_LEAVE_REASON_SERVER_ERROR: {
		code: -1102,
		msg: '服务器繁忙，稍后重试'
	},
	/** 金币不足，无法继续游戏 */
	MATCH_PLAYER_LEAVE_REASON_LOW_GOLD: {
		code: -1103,
		msg: '金币不足，无法继续游戏'
	},
	/** 玩家掉线离开游戏 */
	MATCH_PLAYER_LEAVE_REASON_OFFLINE: {
		code: -1104,
		msg: '玩家掉线离开游戏'
	},
	/** 邮件不存在 */
	MAIL_NOT_EXIST: {
		code: -1201,
		msg: '邮件不存在'
	},
	/** 邮件已领取 */
	MAIL_RECEIVED: {
		code: -1202,
		msg: '邮件已领取'
	},
	/** 邮件不存在附件 */
	MAIL_ANNEX_EMPTY: {
		code: -1203,
		msg: '邮件不存在附件'
	},
	/** 邮件已经发送 */
	MAIL_SENDED: {
		code: -1204,
		msg: '邮件已经发送'
	},
	/** 邮件已过期 */
	MAIL_EXPIRE: {
		code: -1205,
		msg: '邮件已过期'
	},
	/** 已经是好友 */
	FRIEND_ADD_REPEAT: {
		code: -1301,
		msg: '已经是好友'
	},
	/** 好友超过最大上限，请先删除其他好友 */
	FRIEND_MAX_LIMIT: {
		code: -1302,
		msg: '好友超过最大上限，请先删除其他好友'
	},
	/** 等待好友通过 */
	FRIEND_REQUESTING: {
		code: -1303,
		msg: '等待好友通过'
	},
	/** 好友ID无效 */
	FRIEND_ID_INVALID: {
		code: -1304,
		msg: '好友ID无效'
	},
	/** 已经邀请好友对局，等待好友回应 */
	FRIEND_INVITE_GAME_REPEAT: {
		code: -1305,
		msg: '已经邀请好友对局，等待好友回应'
	},
	/** 不是好友 */
	FRIEND_NOT_ADD: {
		code: -1306,
		msg: '不是好友'
	},
	/** 对局不存在 */
	FRIEND_ROUND_FINISH: {
		code: -1307,
		msg: '对局不存在'
	},
	/** 好友对局人数已满 */
	FRIEND_ROUND_FULL: {
		code: -1308,
		msg: '好友对局人数已满'
	},
	/** 好友已离开对局 */
	FRIEND_ROUND_LEAVED: {
		code: -1309,
		msg: '好友已离开对局'
	},
	/** 好友对局邀请已过期 */
	FRIEND_INVITE_EXPIRE: {
		code: -1310,
		msg: '好友对局邀请已过期'
	},
	/** 不支持此好友组局模式 */
	FRIEND_UNSUPPORT_MODE: {
		code: -1311,
		msg: '不支持此好友组局模式'
	},
	/** 对局邀请ID无效 */
	FRIEND_ROOM_CODE_INVALID: {
		code: -1312,
		msg: '对局邀请ID无效'
	},
	/** 好友已经在当前房间 */
	FRIEND_ROOM_AREADY_IN: {
		code: -1313,
		msg: '好友已经在当前房间'
	},
	/** 活动奖励已经领取 */
	ACTIVITY_REWARD_RECEIVED: {
		code: -1401,
		msg: '活动奖励已经领取'
	},
	/** 活动已经关闭 */
	ACTIVITY_CLOSED: {
		code: -1402,
		msg: '活动已经关闭'
	},
	/** 活动已经结束 */
	ACTIVITY_OVER: {
		code: -1403,
		msg: '活动已经结束'
	},
	/** 活动次数已经用完 */
	ACTIVITY_COUNT_OVER: {
		code: -1404,
		msg: '活动次数已经用完'
	},
	/** 未获得活动奖励 */
	ACTIVITY_REWARD_EMPTY: {
		code: -1405,
		msg: '未获得活动奖励'
	},
	/** 活动任务未达成 */
	ACTIVITY_TASK_NOT_FINISH: {
		code: -1406,
		msg: '活动任务未达成'
	},
	/** 奖励未配置 */
	ACTIVITY_REWARD_NOT_EXIST: {
		code: -1407,
		msg: '奖励未配置'
	},
	/** 游戏类型无效 */
	GAME_TYPE_INVALID: {
		code: -10000,
		msg: '游戏类型无效'
	},
	/** 游戏场景无效 */
	GAME_SCENE_INVALID: {
		code: -10001,
		msg: '游戏场景无效'
	},
	/** 游戏ID无效 */
	GAME_ID_INVALID: {
		code: -10002,
		msg: '游戏ID无效'
	},
	/** 游戏维护中,敬请期待 */
	GAME_MAINTENANCE: {
		code: -10003,
		msg: '游戏维护中,敬请期待'
	},
	/** 游戏组件未加载 */
	GAME_PLUGIN_NOT_LOAD: {
		code: -10004,
		msg: '游戏组件未加载'
	},
	/** 游戏回放记录过期 */
	GAME_RECORD_EXPIRE: {
		code: -10005,
		msg: '游戏回放记录过期'
	},
	/** 正式版不支持测试登录 */
	GAME_PUBLISH_NOT_TEST: {
		code: -10006,
		msg: '正式版不支持测试登录'
	},
	/** 正在游戏 */
	GAME_PLAYING: {
		code: -10007,
		msg: '正在游戏'
	},
	/** 游戏已开始 */
	GAME_STARTED: {
		code: -10008,
		msg: '游戏已开始'
	},
	/** 游戏未开始 */
	GAME_NOT_PLAYING: {
		code: -10010,
		msg: '游戏未开始'
	},
	/** 玩家已经在游戏中 */
	GAME_PLAYER_ALREADY_IN: {
		code: -10011,
		msg: '玩家已经在游戏中'
	},
	/** 对局分配失败 */
	GAME_ALLOC_FAILED: {
		code: -10012,
		msg: '对局分配失败'
	},
	/** 对局已经存在 */
	GAME_EXIST: {
		code: -10013,
		msg: '对局已经存在'
	},
	/** 对局不存在 */
	GAME_NOT_EXIST: {
		code: -10014,
		msg: '对局不存在'
	},
	/** 对局异常 */
	GAME_CHECK_FAILED: {
		code: -10015,
		msg: '对局异常'
	},
	/** 对局无效 */
	GAME_INVALID: {
		code: -10016,
		msg: '对局无效'
	},
	/** 对局人数已满 */
	GAME_FULL: {
		code: -10017,
		msg: '对局人数已满'
	},
	/** 玩家不在对局中 */
	GAME_PLAYER_NOT_IN: {
		code: -10018,
		msg: '玩家不在对局中'
	},
	/** 对局已经结束 */
	GAME_ROUND_FINISHED: {
		code: -10019,
		msg: '对局已经结束'
	},
	/** 加入游戏失败，请重试 */
	GAME_JOIN_FAIL: {
		code: -10020,
		msg: '加入游戏失败，请重试'
	},
	/** 游戏已经解散 */
	GAME_ALREADY_DESTROY: {
		code: -10021,
		msg: '游戏已经解散'
	},
	/** 游戏异常结束 */
	GAME_EXCEPTION_DESTROY: {
		code: -10022,
		msg: '游戏异常结束'
	},
	/** 游戏结算异常 */
	GAME_SETTLEMENT_EXCEPTION: {
		code: -10023,
		msg: '游戏结算异常'
	},
	/** 游戏场景超时销毁 */
	GAME_EMPTY_TIMEOUT_DESTROY: {
		code: -10024,
		msg: '游戏场景超时销毁'
	},
	/** 游戏记录不存在 */
	GAME_GAME_RECORD_NOT_EXIST: {
		code: -10025,
		msg: '游戏记录不存在'
	},
	/** 正在游戏中，无法加入其它游戏 */
	GAME_PLAYING_NOT_ENTER_OTHER: {
		code: -10026,
		msg: '正在游戏中，无法加入其它游戏'
	},
	/** 金币超过游戏上限 */
	GAME_GOLD_MAX_LIMIT: {
		code: -10027,
		msg: '金币超过游戏上限'
	},
	/** 金币低于游戏准入 */
	GAME_GOLD_NOT_ENOUGH: {
		code: -10028,
		msg: '金币低于游戏准入'
	},
	/** 游戏结束 */
	GAME_OVER: {
		code: -10029,
		msg: '游戏结束'
	},
	/** 加注不能低于当前底注 */
	ZJH_NOT_LOWER_CURRATE: {
		code: -10701,
		msg: '加注不能低于当前底注'
	},
	/** 当前还没有到玩家看牌的轮数 */
	ZJH_NOT_OVER_PLAYER_MEN: {
		code: -10702,
		msg: '当前还没有到玩家看牌的轮数'
	},
	/** 玩家已经看牌 */
	ZJH_PLAYER_IS_LOOKCARD: {
		code: -10703,
		msg: '玩家已经看牌'
	},
	/** 当前还没有到玩家比牌的轮数 */
	ZJH_NOT_OVER_PLAYER_COMPARE: {
		code: -10704,
		msg: '当前还没有到玩家比牌的轮数'
	},
	/** 不能和自己比较 */
	ZJH_NOT_COMPARE_OWN: {
		code: -10705,
		msg: '不能和自己比较'
	},
	/** 当前玩家不能操作 */
	ZJH_PLAYER_NOT_OPERATOR: {
		code: -10706,
		msg: '当前玩家不能操作'
	},
	/** 当前还没有到玩家弃牌的轮数 */
	ZJH_NOT_OVER_PLAYER_ABANDON_CARD: {
		code: -10707,
		msg: '当前还没有到玩家弃牌的轮数'
	},
	/** 玩家不在游戏中 */
	ZJH_PLAY_NOT_PLAYING: {
		code: -10708,
		msg: '玩家不在游戏中'
	},
	/** 不可操作 */
	ZJH_NOT_OPERATOR: {
		code: -10709,
		msg: '不可操作'
	},
	/** 没有轮到自己 */
	ZJH_NOT_CHANGED_ME: {
		code: -10710,
		msg: '没有轮到自己'
	},
	/** 无效玩家 */
	ZJH_PLAYER_INVALID: {
		code: -10711,
		msg: '无效玩家'
	},
	/** 加注的金币不足 */
	ZJH_ADD_BET_NOT_ENOUGH: {
		code: -10712,
		msg: '加注的金币不足'
	},
	/** 已经操作过了 */
	ZJH_RECUR_OPERATOR: {
		code: -10713,
		msg: '已经操作过了'
	},
	/** 操作等待 */
	ZJH_OPERATOR_WAIT: {
		code: -10714,
		msg: '操作等待'
	},
	/** 最后一个剩余玩家不能弃牌 */
	ZJH_NOT_ALL_PLAYER_ABANDON: {
		code: -10715,
		msg: '最后一个剩余玩家不能弃牌'
	},
	/** 操作无效 */
	BLACKJACK_NOT_INVALID: {
		code: -10801,
		msg: '操作无效'
	},
	/** 押注太频繁 */
	BLACKJACK_BETTING_TOO_FREQUENT: {
		code: -10802,
		msg: '押注太频繁'
	},
	/** 投注金额无效 */
	BLACKJACK_BET_AMOUNT_INVALID: {
		code: -10803,
		msg: '投注金额无效'
	},
	/** 金币不足 */
	BLACKJACK_BET_NOT_ENOUGH: {
		code: -10804,
		msg: '金币不足'
	},
	/** 错误的座位号 */
	BLACKJACK_ERROR_INDEX: {
		code: -10805,
		msg: '错误的座位号'
	},
	/** 投注超过最大限额 */
	BLACKJACK_BET_OVERLOAD: {
		code: -10806,
		msg: '投注超过最大限额'
	},
	/** 操作无效 */
	TEXASPOKE__NOT_INVALID: {
		code: -10901,
		msg: '操作无效'
	},
}