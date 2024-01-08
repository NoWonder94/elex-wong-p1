import { Asset, assetManager, AssetManager, isValid } from 'cc';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { AssetBundleHelper } from './AssetBundleHelper';
import { ABInfo, AssetBundleConfig, AssetTypeLink, ResourcesComponent } from './ResourcesComponent';
import { DicObject } from '../../../sharing.base/helper/Interfaces';
import { CocosDecorators } from '../../CocosDecorators';

@CocosDecorators.SystemRegister()
export class ResourcesComponentAwakeSystem extends AwakeSystem<ResourcesComponent> {
    constructor() {
        super(ResourcesComponent);
    }

    awake(self: ResourcesComponent) {
        ResourcesComponent.instance = self;
    }
}

export class ResourcesComponentSystem {
    /** 加载Bundle配置 */
    public static async loadBundlesConfig(bundleNames: string[]) {
        for (let bundleName of bundleNames) {
            await this.loadBundleConfig(bundleName);
        }
    }

    /** 加载Bundle配置 */
    public static async loadBundleConfig(bundleName: string) {
        let bundle = await AssetBundleHelper.getAssetBundle(bundleName);
        let resInfos = await AssetBundleHelper.getBundleConfig(bundleName);

        let bundleAssets = ResourcesComponent.instance.resourceCache.get(bundleName);
        if (!bundleAssets) {
            bundleAssets = new Set();
            ResourcesComponent.instance.resourceCache.set(bundleName, bundleAssets);
        }

        for (let res of resInfos) {
            let assetConfig: AssetBundleConfig = {
                bundle,
                assetType: res.ctor.name,
                uuid: res.uuid,
            };

            // logger.info(bundle.config.name, '资源路径', res.path);

            ResourcesComponent.instance.assetConfigs.set(res.path, assetConfig);
            bundleAssets.add(res.path);
        }
    }

    /** 加载单个Asset */
    public static async loadAsset<T extends Asset>(url: string, assetType?: new () => T, cb?: FunctionCaller): Promise<T> {
        return await new Promise((resolve) => {
            let bundle: AssetManager.Bundle = this.getBundleByUrl(url);

            let assetRes = bundle.get(url, assetType) as T;
            if (assetRes && isValid(assetRes)) {
                assetRes.addRef();
                // 资源有了直接返回
                resolve(assetRes);
                cb && cb.exec(assetRes);
                return;
            }
            bundle.load(url, assetType, (error, asset: T) => {
                if (error) {
                    logger.error('load Res ' + url + ' error: ' + error);
                } else {
                    asset.addRef();
                }
                resolve(asset);
                cb && cb.exec(asset);
            });
        });
    }

    /**
     * 获取单个Asset
     */
    public static getAsset<T extends Asset>(url: string, assetType?: new () => T): T {
        let bundle: AssetManager.Bundle = this.getBundleByUrl(url);
        if (!bundle) {
            return;
        }
        return bundle.get(url, assetType) as T;
    }

    /**
     * 是否资源引用计数
     */
    public static releaseAsset<T extends Asset>(url: string, assetType?: new () => T) {
        let asset = this.getAsset(url, assetType);
        if (asset) {
            asset.decRef(true);
        }
    }

    /**
     * 销毁资源
     */
    public static destroyAsset<T extends Asset>(url: string, assetType?: new () => T) {
        let bundle: AssetManager.Bundle = this.getBundleByUrl(url);
        if (!bundle) {
            return;
        }
        bundle.release(url, assetType);
    }

    public static bundleIsLoaded(bundleName: string) {
        let bundle = assetManager.getBundle(bundleName);
        if (!bundle) {
            logger.warn('Bundle config unload');
            return false;
        }

        let bundleInfo = ResourcesComponent.instance.bundles.get(bundleName);
        if (bundleInfo) {
            return true;
        }

        return false;
    }

    public static loadBundles(bundleNames: string[], onProgress?: (p: number) => void, onFinished?: () => void) {
        let total = 0;
        let loaded = 0;
        let resUrls = new Set<string>();

        for (let bundleName of bundleNames) {
            let bundle = assetManager.getBundle(bundleName);
            if (!bundle) {
                logger.warn('Bundle config unload');
                continue;
            }

            let bundleInfo = ResourcesComponent.instance.bundles.get(bundleName);
            if (bundleInfo) {
                ++bundleInfo.refCount;
                continue;
            }

            let appendUrls = this.getBundleAssetUrls(bundleName);
            for (let url of appendUrls) {
                resUrls.add(url);
            }

            ResourcesComponent.instance.bundles.set(bundleName, new ABInfo(bundleName, bundle));
        }

        total += resUrls.size;
        for (let url of resUrls) {
            let urlConfig = ResourcesComponent.instance.assetConfigs.get(url);
            this.loadAssetItem(
                url,
                AssetTypeLink[urlConfig.assetType],
                FunctionCaller.create((asset) => {
                    loaded++;
                    FunctionCaller.invoke(onProgress, loaded.div(total));
                    if (loaded === total) {
                        FunctionCaller.invoke(onFinished);
                    }
                }, this)
            );
        }
    }

    /**
     * 加载Bundle所有资源
     * @param bundleName 名字
     * @param onProgress 进度回调
     * @param onFinished 完整回调
     */
    public static loadBundle(bundleName: string, onProgress?: (p: number) => void, onFinished?: () => void) {
        let bundle = assetManager.getBundle(bundleName);
        if (!bundle) {
            logger.warn('Bundle config unload');
            return;
        }

        let bundleInfo = ResourcesComponent.instance.bundles.get(bundleName);
        if (bundleInfo) {
            ++bundleInfo.refCount;
            FunctionCaller.invoke(onFinished);
            return;
        }

        let resUrls = this.getBundleAssetUrls(bundleName);
        let total = resUrls.size;
        let loaded = 0;
        for (let url of resUrls) {
            let urlConfig = ResourcesComponent.instance.assetConfigs.get(url);
            this.loadAssetItem(
                url,
                AssetTypeLink[urlConfig.assetType],
                FunctionCaller.create((asset) => {
                    loaded++;
                    FunctionCaller.invoke(onProgress, loaded.div(total));
                    if (loaded === total) {
                        FunctionCaller.invoke(onFinished);
                    }
                }, this)
            );
        }

        bundleInfo = new ABInfo(bundleName, bundle);
        ++bundleInfo.refCount;
        ResourcesComponent.instance.bundles.set(bundleName, bundleInfo);
    }

    /** 获取Bundle所有资源 */
    public static getBundleAsset(bundleName: string): DicObject<Asset> {
        let assets: DicObject<Asset> = {};
        let dicts = ResourcesComponent.instance.resourceCache.get(bundleName);
        for (let url of dicts.keys()) {
            assets[url] = this.getAsset(url);
        }
        return assets;
    }

    /** 加载Bundle配置 */
    public static unloadBundles(bundleNames: string[]) {
        for (let bundleName of bundleNames) {
            this.unloadBundle(bundleName);
        }
    }

    public static unloadBundle(bundleName: string) {
        let bundleInfo = ResourcesComponent.instance.bundles.get(bundleName);
        if (!bundleInfo) {
            return;
        }
        --bundleInfo.refCount;

        if (bundleInfo.refCount > 0) {
            return;
        }

        let resUrls = this.getBundleAssetUrls(bundleName);
        for (let resPath of resUrls) {
            ResourcesComponent.instance.assetConfigs.delete(resPath);
        }

        ResourcesComponent.instance.bundles.delete(bundleName);
        ResourcesComponent.instance.resourceCache.delete(bundleName);
        bundleInfo.destroy();
    }

    public static getBaseBundleNames() {
        let baseBundles: string[] = [];
        for (let item of ResourcesComponent.instance.resourceCache.keys()) {
            if (item.indexOf('_') === -1) {
                baseBundles.push(item);
            }
        }
        return baseBundles;
    }

    /**
     * 按分组加载资源
     * @param groups 资源组
     * @param onProgress 加载进度
     * @param onFinished 加载完成
     */
    public static loadAssetGroups(groups: string[], onProgress?: (p: number) => void, onFinished?: () => void) {
        let resUrls = this.getGroupAssetUrl(groups);
        let total = resUrls.length;
        let loaded = 0;
        for (let url of resUrls) {
            let urlConfig = ResourcesComponent.instance.assetConfigs.get(url);
            this.loadAssetItem(
                url,
                AssetTypeLink[urlConfig.assetType],
                FunctionCaller.create((asset) => {
                    loaded++;
                    FunctionCaller.invoke(onProgress, loaded.div(total));
                    if (loaded === total) {
                        FunctionCaller.invoke(onFinished);
                    }
                }, this)
            );
        }
    }

    /**
     * 按组释放资源
     * @param groups 资源组
     */
    public static releaseGroup(groups: string[]) {
        let resUrls = this.getGroupAssetUrl(groups);
        for (let i = 0; i < resUrls.length; i++) {
            let asset = this.getAsset(resUrls[i]);
            if (asset) {
                asset.decRef(true);
            }
        }
    }

    private static getBundleAssetUrls(bundleName: string) {
        let dicts = ResourcesComponent.instance.resourceCache.get(bundleName);
        return dicts;
    }

    private static getGroupAssetUrl(groups: string[]) {
        let resGroupUrl: string[] = [];
        for (let url of ResourcesComponent.instance.assetConfigs.keys()) {
            let g = url.substring(0, url.indexOf('/'));
            if (groups.indexOf(g) !== -1) {
                resGroupUrl.push(url);
            }
        }
        return resGroupUrl;
    }

    private static getBundleByUrl(url: string): AssetManager.Bundle {
        let bundle: AssetManager.Bundle = assetManager.resources;
        if (ResourcesComponent.instance.assetConfigs.has(url)) {
            bundle = ResourcesComponent.instance.assetConfigs.get(url).bundle;
        } else {
            logger.info('assetConfigs has not find url', url);
        }
        return bundle;
    }

    /** 加载资源组条目 */
    private static async loadAssetItem<T extends Asset>(url: string, assetType?: new () => T, cb?: FunctionCaller): Promise<T> {
        return await new Promise((resolve) => {
            let bundle: AssetManager.Bundle = this.getBundleByUrl(url);
            bundle.load(url, assetType, (error, asset: T) => {
                if (error) {
                    logger.error('load Res ' + url + ' error: ' + error);
                } else {
                    asset.addRef();
                }
                resolve(asset);
                cb && cb.exec(asset);
            });
        });
    }
}
