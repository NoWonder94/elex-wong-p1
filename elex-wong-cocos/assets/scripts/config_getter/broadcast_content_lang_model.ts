import { config_model_base } from './config_model';
import { lang_model_map } from './lang_model_map';

/**
 * 多语言文本相关配置。
 */
export class broadcast_content_lang_model extends config_model_base {
	public static readonly FIELDS = {
		/** 玩家<color=#00ff00>%s</color>在游戏中取得了<color=#ff0000>%s</color>连胜，谁来终结这位嚣张的玩家. */
		BROADCAST_WINS: 'BROADCAST_WINS',
		/** 富豪榜名人堂成员<color=#00ff00>%s</>上线啦，土豪我们做个朋友吧. */
		BROADCAST_GOLD_FIRST: 'BROADCAST_GOLD_FIRST',
		/** 玩家<color=#00ff00>%s</color>鸿运当头，在游戏中赢取<color=#ffd700>%s</color>筹码. */
		BROADCAST_BIG_WIN: 'BROADCAST_BIG_WIN',
		/** 玩家<color=#00ff00>%s</color>幸运女神眷顾，在每日装盘中获得<color=#ffd700>%s</color>筹码大奖。 */
		TURNTABLE_AWARD: 'TURNTABLE_AWARD',
		/** 玩家<color=#00ff00>%s</color>赌神附体，在游戏中拿到三条A,大杀四方。 */
		THREE_OF_A_KIND: 'THREE_OF_A_KIND',
		/** 玩家<color=#00ff00>%s</color>赌神附体，在游戏中拿到黑杰克,大杀四方。 */
		BLACK_JACK: 'BLACK_JACK',
	}

	public static getClassName(): string {
        return 'broadcast_content_lang_model'
    }

    public static getConfigName(filename?: string): string {
		return `broadcast_content_lang-${filename}.json`;
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

lang_model_map.add(broadcast_content_lang_model);