
export type JsonLoaderHander = (filename: string) => any;

/** 配置模型基础类 */
export abstract class config_model_base {
    private static loaderHander: JsonLoaderHander;

    /** 获取文件链接 */
    public static getUrl(filename: string, lang?: string): string {
        let configUrl = null;
        let dir = this.isPublic() ? 'config_common' : `config_${window['PubPlatform']}`;

        if (window['RemoteConfigURL']) {
            configUrl = `${window['RemoteConfigURL']}/${dir}/${filename}`
        } else {
            configUrl = `${dir}/${filename}`
        }

        return configUrl;
    }

    /** 加载文件 */
    public static loadJson(configUrl: string): any {
        return this.loaderHander(configUrl)
    }

    /** 公共配置 */
    public static isPublic(): boolean {
        return false;
    }

    /** 设置配置加载器 */
    public static setJsonLoaderHandler(handler: JsonLoaderHander) {
        this.loaderHander = handler;
    }
}

export interface ConfigClass<T extends config_model_base> {
    new(): T;
    FIELDS?: any;
    getUrl(filename: string, lang?: string): string;
    loadJson(configUrl: string): any;
    getConfigName(filename?: string): string;
    getClassName(): string;
    /** 公共配置 */
    isPublic(): boolean;
}