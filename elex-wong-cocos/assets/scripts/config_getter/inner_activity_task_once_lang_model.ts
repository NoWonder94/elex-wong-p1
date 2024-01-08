import { config_model_base } from './config_model';
import { lang_model_map } from './lang_model_map';

/**
 * 多语言文本相关配置。
 */
export class inner_activity_task_once_lang_model extends config_model_base {

	public static getClassName(): string {
        return 'inner_activity_task_once_lang_model'
    }

    public static getConfigName(filename?: string): string {
		return `inner_activity_task_once_lang-${filename}.json`;
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

lang_model_map.add(inner_activity_task_once_lang_model);