import { config_model_base } from './config_model';
import { lang_model_map } from './lang_model_map';

/**
 * 多语言文本相关配置。
 */
export class const_string_lang_model extends config_model_base {
	/** 不支持此登录方式 */
	auth_not_support_login_type: string;
	/** 开始游戏 */
	slo_loading_status_continue: string;
	/** 加载中 */
	slo_loading_status_loading: string;
	/** 登录中 */
	slo_loading_status_login: string;
	/** 声音开 */
	game_sound_on: string;
	/** 声音关 */
	game_sound_off: string;
	/** 设置 */
	game_setting: string;
	/** 音乐 */
	game_music: string;
	/** 音效 */
	game_effect: string;
	/** 通用设置 */
	game_currency_setting: string;
	/** 赔付表 */
	game_paid_table: string;
	/** 自动游戏局数 */
	auto_num: string;
	/** 单次游戏赢取超过 */
	auto_exceed: string;
	/** 余额减少至当前余额 */
	auto_offline: string;
	/** 余额增加至当前余额 */
	auto_online: string;
	/** 自动游戏默认选择次数 */
	auto_default_num: string;
	/** 同桌玩家 */
	deskmate_palyer: string;
	/** 客户端 v{{0}} */
	client_version: string;
	/** 服务器 v{{0}} */
	server_version: string;
	/** 免费次数： */
	free_num: string;
	/** 赢得分数： */
	win_fraction: string;
	/** 网络请求超时 */
	network_timeout: string;
	/** 网络请求错误 */
	network_error: string;
	/** 开始 */
	start_game: string;
	/** 配置加载中 */
	system_load_ing: string;
	/** 配置加载完成 */
	system_lond_ed: string;
	/** 登录授权中 */
	system_auth_ing: string;
	/** 登录授权完成 */
	system_auth_ed: string;
	/** 余额不足 */
	tip_msg_1: string;
	/** 单局赢得超过设置上限值，推出自动游戏 */
	tip_msg_2: string;
	/** 游戏出现故障时，所有赔付都无效。 */
	pay_msg_1: string;
	/** 规则 */
	pay_msg_2: string;
	/** 共有243条赔付线。\n\n只赔付最高的中奖线.\n\n所有奖励按照从左至右赔付，除了scatter图案。\n\n根据从左至右相邻符号的组合判定组合奖励。 */
	pay_msg_3: string;
	/** 只会出现在1，3，5列，当出现3个scatter图案时，获得1次免费游戏机会。 */
	pay_msg_4: string;
	/** 能替代除了scatter以外的所有图案。 */
	pay_msg_5: string;
	/** 进入免费游戏之前，你可以选择1项免费游戏玩法以开始游戏。\n\n在免费游戏中，每次中奖将会随机乘以一个倍数。 */
	pay_msg_6: string;

	public static readonly FIELDS = {
		/** 不支持此登录方式 */
		AUTH_NOT_SUPPORT_LOGIN_TYPE: 'auth_not_support_login_type',
		/** 开始游戏 */
		SLO_LOADING_STATUS_CONTINUE: 'slo_loading_status_continue',
		/** 加载中 */
		SLO_LOADING_STATUS_LOADING: 'slo_loading_status_loading',
		/** 登录中 */
		SLO_LOADING_STATUS_LOGIN: 'slo_loading_status_login',
		/** 声音开 */
		GAME_SOUND_ON: 'game_sound_on',
		/** 声音关 */
		GAME_SOUND_OFF: 'game_sound_off',
		/** 设置 */
		GAME_SETTING: 'game_setting',
		/** 音乐 */
		GAME_MUSIC: 'game_music',
		/** 音效 */
		GAME_EFFECT: 'game_effect',
		/** 通用设置 */
		GAME_CURRENCY_SETTING: 'game_currency_setting',
		/** 赔付表 */
		GAME_PAID_TABLE: 'game_paid_table',
		/** 自动游戏局数 */
		AUTO_NUM: 'auto_num',
		/** 单次游戏赢取超过 */
		AUTO_EXCEED: 'auto_exceed',
		/** 余额减少至当前余额 */
		AUTO_OFFLINE: 'auto_offline',
		/** 余额增加至当前余额 */
		AUTO_ONLINE: 'auto_online',
		/** 自动游戏默认选择次数 */
		AUTO_DEFAULT_NUM: 'auto_default_num',
		/** 同桌玩家 */
		DESKMATE_PALYER: 'deskmate_palyer',
		/** 客户端 v{{0}} */
		CLIENT_VERSION: 'client_version',
		/** 服务器 v{{0}} */
		SERVER_VERSION: 'server_version',
		/** 免费次数： */
		FREE_NUM: 'free_num',
		/** 赢得分数： */
		WIN_FRACTION: 'win_fraction',
		/** 网络请求超时 */
		NETWORK_TIMEOUT: 'network_timeout',
		/** 网络请求错误 */
		NETWORK_ERROR: 'network_error',
		/** 开始 */
		START_GAME: 'start_game',
		/** 配置加载中 */
		SYSTEM_LOAD_ING: 'system_load_ing',
		/** 配置加载完成 */
		SYSTEM_LOND_ED: 'system_lond_ed',
		/** 登录授权中 */
		SYSTEM_AUTH_ING: 'system_auth_ing',
		/** 登录授权完成 */
		SYSTEM_AUTH_ED: 'system_auth_ed',
		/** 余额不足 */
		TIP_MSG_1: 'tip_msg_1',
		/** 单局赢得超过设置上限值，推出自动游戏 */
		TIP_MSG_2: 'tip_msg_2',
		/** 游戏出现故障时，所有赔付都无效。 */
		PAY_MSG_1: 'pay_msg_1',
		/** 规则 */
		PAY_MSG_2: 'pay_msg_2',
		/** 共有243条赔付线。\n\n只赔付最高的中奖线.\n\n所有奖励按照从左至右赔付，除了scatter图案。\n\n根据从左至右相邻符号的组合判定组合奖励。 */
		PAY_MSG_3: 'pay_msg_3',
		/** 只会出现在1，3，5列，当出现3个scatter图案时，获得1次免费游戏机会。 */
		PAY_MSG_4: 'pay_msg_4',
		/** 能替代除了scatter以外的所有图案。 */
		PAY_MSG_5: 'pay_msg_5',
		/** 进入免费游戏之前，你可以选择1项免费游戏玩法以开始游戏。\n\n在免费游戏中，每次中奖将会随机乘以一个倍数。 */
		PAY_MSG_6: 'pay_msg_6',
	}

	public static getClassName(): string {
        return 'const_string_lang_model'
    }

    public static getConfigName(filename?: string): string {
		return `const_string_lang-${filename}.json`;
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

lang_model_map.add(const_string_lang_model);