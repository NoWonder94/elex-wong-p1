import { _decorator, Sprite, SpriteFrame, assetManager } from 'cc';
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CCI18nBase } from "./CCI18nBase";
const { ccclass, requireComponent, property } = _decorator;

@ccclass("CCI18nSpriteFrame")
@requireComponent(Sprite)
export class CCI18nSpriteFrame extends CCI18nBase<SpriteFrame> {
    private sprite: Sprite | null = null;
    protected onLoad() {
        super.onLoad();
        this.sprite = this.node.getComponent(Sprite);
        this.setRes();
    }

    // protected onEnable() {
    //     this.setRes();
    // }

    protected async getRes(): Promise<SpriteFrame> {
        logger.info('CCI18nSpriteFrame name=', this.node.name, this.node.parent.name)
        if (!this.resId) {
            assetManager.bundles.find((bundle) => {
                let assetInfo = bundle.config.getAssetInfo(this.sprite.spriteFrame!._uuid) as any;
                if (assetInfo) {
                    this.resId = assetInfo.path;
                    return true;
                }
                return false;
            })
        }

        if (!this.resId) {
            logger.warn('CCI18nSpriteFrame resId not config');
            return;
        }

        let spriteFrame = await ResourcesComponentSystem.loadAsset(this.resId, SpriteFrame);
        return spriteFrame;
    }

    protected async setRes() {
        let res = await this.getRes();
        if (!res) {
            return;
        }
        if (this.sprite) this.sprite.spriteFrame = res;
    }
}
