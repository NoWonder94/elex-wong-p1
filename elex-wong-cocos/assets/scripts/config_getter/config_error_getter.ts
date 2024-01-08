import { config_model_base, ConfigClass } from './config_model';
export class config_error_getter {
    /** 配置数据 */
    private modelDatas = new Map<string, any>();

    private static _instance: config_error_getter = null;

    public static get instance() {
        if (null == config_error_getter._instance) {
            config_error_getter._instance = new config_error_getter();
        }

        return config_error_getter._instance;
    }

    /**
    * 读取配置
    * @param configClass 数据模型类
    * @param lang 语言标识
    */
    public getLangMsg<T extends config_model_base>(configClass: ConfigClass<T>, code: string, lang: string = 'zh-CN'): string {
        let configData = this.getConfigData(configClass, lang);
        return configData[code];
    }

    private getConfigData<T extends config_model_base>(uiClass: ConfigClass<T>, filename: string) {
        let cfgFileName = uiClass.getConfigName(filename);
        let configData = this.modelDatas.get(cfgFileName)
        if (!configData) {
            let configUrl = uiClass.getUrl(cfgFileName, filename);
            configData = config_model_base.loadJson(configUrl);
            this.modelDatas.set(cfgFileName, configData);
        }

        if (!configData) {
            console.log(`配置文件${cfgFileName}不存在, 请检查`);
        }

        return configData;
    }
}