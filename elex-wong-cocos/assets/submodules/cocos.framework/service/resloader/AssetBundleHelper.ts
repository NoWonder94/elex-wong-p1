import { AssetManager, assetManager, __private } from "cc";

export class AssetBundleHelper {
    public static getBundleNames(allBundles: string[], baseBundleNames: string[], lang: string, oem: string, styleId: string) {
        let bundles = [];

        for (let baseBundle of baseBundleNames) {
            bundles.push(baseBundle);
            bundles.push(`${baseBundle}_${lang}`);
            if (this.isAddStyle(styleId)) {
                bundles.push(`${baseBundle}_style_${styleId}`);
                bundles.push(`${baseBundle}_style_${styleId}_${lang}`);
            }

            if (this.isAddOem(oem)) {
                bundles.push(`${baseBundle}_oem_${oem}`);
                bundles.push(`${baseBundle}_oem_${oem}_${lang}`);
            }
        }

        return bundles.filter((item) => allBundles.indexOf(item) !== -1);
    }
    /**
     * 获取资源Bundle
     * @param bundleName 包名
     */
    public static async getAssetBundle(bundleName: string): Promise<AssetManager.Bundle> {
        return new Promise((resolve) => {
            let bundle = assetManager.getBundle(bundleName);
            if (!bundle) {
                assetManager.loadBundle(bundleName, (err, result) => {
                    bundle = result;
                    resolve(bundle);
                })
                return;
            }
            resolve(bundle);
        })
    }

    /**
     * 获取分包资源配置
     * @param bundleName 分包名
     */
    public static async getBundleConfig(bundleName: string): Promise<__private.cocos_core_asset_manager_config_IAddressableInfo[]> {
        let resConfig: __private.cocos_core_asset_manager_config_IAddressableInfo[] = [];
        let bundle = await this.getAssetBundle(bundleName);
        if (bundle) {
            resConfig = bundle?.getDirWithPath('./');
        }
        return resConfig;
    }

    private static isAddStyle(styleId: string) {
        return styleId && styleId !== '';
    }

    private static isAddOem(oem: string) {
        return oem && oem !== '';
    }
}