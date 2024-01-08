import { Label, Node, dragonBones } from "cc";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { IconConfig } from "./SloStructDefine";
import { SloModel } from "./SloModel";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";

@CocosDecorators.ClassNameRegister("UISloTileComponent")
export class UISloTileComponent extends SceneNodeComponent {
    /** 图标配置 */
    public resConfigs: DicObject<IconConfig>;
    /** 图标背景节点 */
    public Background: Node;
    /** 图标精灵节点 */
    public Icon: Node;
    /** 图标帧组件 */
    public IconFrameIndex: CCFrameIndex;
    /** 图标中奖特效，Icon前面播放 */
    public EffectFront: Node;
    /** 图标中奖特效，Icon后面播放 */
    public EffectBack: Node;
    /** 图标中奖特效，显示节点 */
    public curIconEffectNode: Node;
    /** 图标中奖底板特效 */
    public EffectBackground: Node;
    /** 图标特殊信息显示节点 */
    public Special: Node;
    /** 图标特殊信息帧节点 */
    public SpecialFrameIndex: CCFrameIndex;
    /** 中奖线获得金币 */
    public Gain: Label;
    /** 未中奖图标显示遮罩 */
    public Mask: Node;
    public Label: Node;

    /** 图标ID */
    public tileId: number;
    /** slo model数据 */
    public sloModel: SloModel;

    public getTileCount() {
        return this.IconFrameIndex.spriteFrames.length;
    }

    public setTile(tileId: number): void {
        this.tileId = tileId;
        let iconConfig = this.resConfigs[tileId];
        if (iconConfig.special) {
            this.Special.active = true;
            this.SpecialFrameIndex.setName(iconConfig.special);
        } else {
            this.Special.active = false;
        }
        this.IconFrameIndex.setName(iconConfig.icon);

        if (iconConfig.background) {
            this.Background.getComponent(CCFrameIndex).setName(iconConfig.background);
        }

        if (iconConfig.effectIcon) {
            this.curIconEffectNode = iconConfig.effectIcon.back ? this.EffectBack : this.EffectFront;
        }
    }

    /** 播放中奖特效 */
    public async playNormalEffect() {
        this.Mask.active = false;
        let tasks: any[] = [];
        tasks.push(this.playBackgroundBombEffect());
        tasks.push(this.playIconEffect());
        await Promise.all(tasks);
    }

    public showMask() {
        this.Mask.active = true;
    }

    public hideMask() {
        this.Mask.active = false;
    }

    /** 播放中奖线特效 */
    public async playNormalLineEffect() {
        this.Gain.node.active = true;
        await this.playIconEffect();
        this.Gain.node.active = false;
        this.Gain.string = "";
    }

    public async setLineGain(gain: number) {
        this.Gain.string = gain.toFixed(0);
    }

    public async playIconEffect() {
        if (!this.curIconEffectNode) {
            return;
        }

        let iconConfig = this.resConfigs[this.tileId];
        this.curIconEffectNode.active = true;
        let anim = this.curIconEffectNode.getComponent(dragonBones.ArmatureDisplay);
        if (!anim) {
            logger.info("playIconEffect curIconEffectNode not exist dragonBones.ArmatureDisplay");
            return;
        }

        let name = iconConfig.effectIcon.back || iconConfig.effectIcon.front;
        anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${name}_ske`, dragonBones.DragonBonesAsset);
        anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${name}_tex`, dragonBones.DragonBonesAtlasAsset);
        return new Promise(async (resolve) => {
            // 结束播放
            // logger.info('Icon effect start', this.tileId)
            CCHelper.playDrangonDefaultAnimation(
                anim,
                1,
                this.sloModel.spin_speed,
                null,
                FunctionCaller.create(() => {
                    // 结束
                    // logger.info('Icon effect end', this.tileId)
                    this.curIconEffectNode.active = false;
                    resolve(null);
                })
            );
        });
    }

    public async playBackgroundBombEffect() {
        return new Promise(async (resolve) => {
            let iconConfig = this.resConfigs[this.tileId];
            if (!iconConfig.effectBackgroundBomb) {
                resolve(null);
                return;
            }

            this.EffectBackground.active = true;

            let anim = this.EffectBackground.getComponent(dragonBones.ArmatureDisplay);
            if (!anim) {
                logger.info("playBackgroundBombEffect EffectBackground not exist dragonBones.ArmatureDisplay");
                return;
            }

            anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${iconConfig.effectBackgroundBomb}_ske`, dragonBones.DragonBonesAsset);
            anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${iconConfig.effectBackgroundBomb}_tex`, dragonBones.DragonBonesAtlasAsset);

            logger.info("Background bom effect start", this.tileId);
            CCHelper.playDrangonDefaultAnimation(
                anim,
                1,
                this.sloModel.spin_speed,
                FunctionCaller.create(() => {
                    // 开始播放
                    this.Background.active = false;
                }, this),
                FunctionCaller.create(async () => {
                    // logger.info('Background bom effect end', this.tileId)
                    resolve(null);
                }, this)
            );
        });
    }

    public reset() {
        this.Background.active = true;
        this.Gain.node.active = false;
        this.Gain.string = "";
        this.Mask.active = false;

        if (this.curIconEffectNode) {
            this.curIconEffectNode.active = false;
            let anim = this.curIconEffectNode.getComponent(dragonBones.ArmatureDisplay);
            anim.dragonAsset = null;
            anim.dragonAtlasAsset = null;
        }
    }
}

@CocosDecorators.SystemRegister()
export class UISloTileComponentAwakeSystem extends AwakeSystem<UISloTileComponent> {
    constructor() {
        super(UISloTileComponent);
    }
    awake(self: UISloTileComponent, node: Node, resConfigs: DicObject<IconConfig>) {
        self.node = node;
        self.resConfigs = resConfigs;

        let rc = self.node.getComponent(CCReferenceCollector);
        self.Background = rc.get("Background");
        self.Icon = rc.get("Icon");
        self.EffectFront = rc.get("EffectFront");
        self.EffectBack = rc.get("EffectBack");
        self.EffectBackground = rc.get("EffectBackground");
        self.Special = rc.get("Special");
        self.Mask = rc.get("Mask");
        self.Mask.active = false;
        self.Gain = rc.get<Label>("Gain", Label);

        self.EffectFront.active = false;
        self.EffectBack.active = false;
        self.EffectBackground.active = false;
        self.Special.active = false;

        self.IconFrameIndex = rc.get("Icon", CCFrameIndex);
        self.SpecialFrameIndex = rc.get("Special", CCFrameIndex);

        self.sloModel = VM.get<SloModel>(SloModel.name).$data;
    }
}
