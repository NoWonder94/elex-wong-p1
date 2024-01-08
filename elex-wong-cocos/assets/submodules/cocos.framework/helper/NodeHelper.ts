import { isValid, Sprite, SpriteFrame, Node, __private, SpriteAtlas } from "cc";
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
import { ResourcesComponentSystem } from '../service/resloader/ResourcesComponentSytem';

/** 自动创建型单件 */
export class NodeHelper {
    /** 
     * 设置节点图片精灵
     */
    static async setNodeSprite(node: Node, assetUrl: string, options?: { type?: __private.cocos_2d_components_sprite_SpriteType, trim?: boolean, sizeMode?: __private.cocos_2d_components_sprite_SizeMode }, cb?: FunctionCaller): Promise<void> {
        if (!node || isValid(node)) {
            return;
        }
        return await new Promise(async (resolve, reject) => {
            let spRes = await ResourcesComponentSystem.loadAsset<SpriteFrame>(assetUrl, SpriteFrame);
            let sprite = node.getComponent(Sprite);
            if (!sprite) {
                sprite = node.addComponent(Sprite);
            }
            sprite.spriteFrame = spRes;
            if (options) {
                for (let opt in options) {
                    let v = options[opt];
                    if (null != v) {
                        sprite[opt] = v;
                    }
                }
            }
            resolve();
            cb && cb.exec();
        });
    }

    /** 
     * 设置节点图集图片精灵
     */
    static async setNodeSpriteAtlas(node: Node, spriteAtlasAssetUrl: string, spriteFrameName: string, options?: { type?: __private.cocos_2d_components_sprite_SpriteType, trim?: boolean, sizeMode?: __private.cocos_2d_components_sprite_SizeMode }, cb?: FunctionCaller): Promise<void> {
        if (!node || isValid(node)) {
            return;
        }
        return await new Promise(async (resolve, reject) => {
            let spriteAtlas = await ResourcesComponentSystem.loadAsset<SpriteAtlas>(spriteAtlasAssetUrl, SpriteAtlas);
            let sprite = node.getComponent(Sprite);
            if (!sprite) {
                sprite = node.addComponent(Sprite);
            }
            sprite.spriteAtlas = spriteAtlas
            sprite.spriteFrame = spriteAtlas.getSpriteFrame(spriteFrameName);
            if (options) {
                for (let opt in options) {
                    let v = options[opt];
                    if (null != v) {
                        sprite[opt] = v;
                    }
                }
            }
            resolve();
            cb && cb.exec();
        });
    }
}

