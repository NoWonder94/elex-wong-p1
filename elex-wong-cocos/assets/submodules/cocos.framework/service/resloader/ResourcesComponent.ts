import { AnimationClip, Asset, assetManager, AssetManager, AudioClip, dragonBones, Font, ImageAsset, JsonAsset, ParticleAsset, Prefab, SceneAsset, sp, SpriteAtlas, SpriteFrame, TextAsset } from "cc";
import { Entity } from "../../../sharing.base/core/object/Entity";
import { CocosDecorators } from "../../CocosDecorators";

export interface AssetBundleConfig {
    bundle: AssetManager.Bundle;
    assetType: string;
    uuid: string;
}

// export interface AssetBundleGroupConfig {
//     config: AssetBundleConfig,
//     assetUrl: string;
// }

/** 资源类型映射 */
export const AssetTypeLink = {
    AudioClip: AudioClip,
    Prefab: Prefab,
    SpriteAtlas: SpriteAtlas,
    SpriteFrame: SpriteFrame,
    SceneAsset: SceneAsset,
    TextAsset: TextAsset,
    JsonAsset: JsonAsset,
    ImageAsset: ImageAsset,
    Font: Font,
    AnimationClip: AnimationClip,
    ParticleAsset: ParticleAsset,
    DragonBonesAsset: dragonBones.DragonBonesAsset,
    DragonBonesAtlasAsset: dragonBones.DragonBonesAtlasAsset,
    SkeletonData: sp.SkeletonData,
}

export class ABInfo {
    constructor(public name: string, public bundle: AssetManager.Bundle) {
    }

    public refCount: number = 0;

    public alreadyLoadAssets: boolean;

    public destroy() {
        if (this.bundle != null) {
            this.bundle.releaseAll();
            assetManager.removeBundle(this.bundle);
            this.bundle = null;
        }
    }
}

@CocosDecorators.ClassNameRegister('ResourcesComponent')
export class ResourcesComponent extends Entity {
    public static instance: ResourcesComponent;

    /** 资源配置 */
    public assetConfigs = new Map<string, AssetBundleConfig>();

    public resourceCache = new Map<string, Set<string>>();

    public readonly bundles = new Map<string, ABInfo>();

    public Dispose() {
        if (this.IsDisposed) {
            return;
        }

        super.dispose();

        for (let item of this.bundles.values()) {
            item.destroy();
        }
        this.bundles.clear();
        this.resourceCache.clear();
    }
}