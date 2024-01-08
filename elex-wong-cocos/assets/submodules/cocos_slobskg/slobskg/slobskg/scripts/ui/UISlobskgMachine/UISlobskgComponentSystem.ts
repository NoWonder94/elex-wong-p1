import { dragonBones, Layout, Node, ParticleSystem2D } from "cc";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import { GlobalComponent } from "../../../../../../cocos.framework/module/global/GlobalComponent";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { SoundComponentSystem } from "../../../../../../cocos.framework/module/sound/SoundComponentSystem";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { SloMachineEvent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/SloMachineEvent";
import { SloMachineConfig, SloResConfig } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/SloStructDefine";
import { UISloButtomAreaComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloButtomAreaComponent";
import { UISloMachineComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloMachineComponent";
import { UISloMachineComponentAwakeSystem, UISloMachineComponentStartSystem, UISloMachineComponentSystem } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloMachineComponentSystem";
import { UISloOperateComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloOperateComponent";
import { UISloReelComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloReelComponent";
import { UISloReelComponentSystem } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloReelComponentSystem";
import { UISloTileComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloTileComponent";
import { SloUISlotAdapterConfig } from "../../../../../../cocos_slo/slo/slo/scripts/constants/SloUIAdapterConfig";
import { UserModel } from "../../../../../../cocos_slo/slo/slo/scripts/model/UserModel";
import { DestroySystem } from "../../../../../../sharing.base/core/object/IDestroySystem";
import { UpdateSystem } from "../../../../../../sharing.base/core/object/IUpdateSystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { UISlobskgComponent } from "./UISlobskgComponent";
import { UISlobskgRoleComponent } from "./UISlobskgRoleComponent";
import { SubscibeEvent } from "../../../../../../cocos.framework/SubscibeEvent";
import { CCButtonComponentScale } from "../../../../../../cocos.framework/components/CCButtonComponentScale";
import { AppStart_Hotupdate } from "../../../../../../cocos.hotupdate/AppStart_Hotupdate";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { PopupManagerComponentSystem } from "../../../../../../cocos.framework/ui/UIPopup/PopupManagerComponentSystem";
import { UserMessageComponent } from "../../../../../../cocos_slo/slo/slo/scripts/model/UserMessageComponent";
import { PopupFreeSetComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/PopupFreeSetComponentSystem";
import { PopupCacheMode } from "../../../../../../cocos.framework/ui/UIPopup/PopupManagerComponent";
import VMNode from "../../../../../../cocos.framework/components/mvvm/VMNode";
import VMState, { VM_ACTION } from "../../../../../../cocos.framework/components/mvvm/VMState";
import { BOOLEAN } from "../../../../../../sharing.base/consts";
import { SpinType } from "../../../../../../sharing.protocol/games/slo/SloConst";
import { const_string_lang_model } from "../../../../../../../scripts/config_getter/const_string_lang_model";
@CocosDecorators.SystemRegister()
export class UISlobskgComponentAwakeSystem extends UISloMachineComponentAwakeSystem<UISlobskgComponent> {
    constructor() {
        super(UISlobskgComponent);
    }

    awake(self: UISlobskgComponent, options: { resConfigs: SloResConfig; machineConfig: SloMachineConfig; uiconfig: SloUISlotAdapterConfig }) {
        super.awake(self, options);

        self.userModel = VM.get<UserModel>(UserModel.name).$data;

        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        self.Main = rc.get("Main");
        self.Menu = rc.get("Menu");
        self.Start = rc.get("StartBtn");
        self.Logo = rc.get("Logo");
        self.Fast = rc.get("FastNode");
        self.Bill = rc.get("BillChoiceNode");
        self.BetChoice = rc.get("BetChoiceNode");
        self.Role = rc.get("Role");
        self.MachineEffect = rc.get("MachineEffect");
        // 免费游戏控制
        self.board = rc.get("board");
        self.board.active = true;
        self.board_des_1 = rc.get("board_des_1");
        self.board_value_1 = rc.get("board_value_1");
        self.board_des_2 = rc.get("board_des_2");
        self.board_value_2 = rc.get("board_value_2");
        self.icon_title = rc.get("icon_title");

        // 背景
        self.Main.addComponent(VMNode);
        let soundCheckBoxVMState = self.Main.addComponent(VMState);
        soundCheckBoxVMState.valueA = SpinType.FREE;
        soundCheckBoxVMState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        soundCheckBoxVMState.watchPath = "slo.spin_type";
        soundCheckBoxVMState.valueComponentName = "VMNode";
        soundCheckBoxVMState.valueComponentProperty = "indexSpriteFrame";
        soundCheckBoxVMState.valueComponentDefaultValue = 0;
        soundCheckBoxVMState.valueComponentActionValue = 1;

        // board
        let boardVMState = self.board.addComponent(VMState);
        boardVMState.valueAction = VM_ACTION.NODE_ACTIVE;
        boardVMState.valueA = SpinType.FREE;
        boardVMState.watchPath = "slo.spin_type";

        // Logo
        let normalLogo = self.Logo.getChildByName("icon_normal");
        normalLogo.active = true;
        let normalLogoVMState = normalLogo.addComponent(VMState);
        normalLogoVMState.valueAction = VM_ACTION.NODE_ACTIVE;
        normalLogoVMState.valueA = SpinType.Normal;
        normalLogoVMState.watchPath = "slo.spin_type";

        let freeLogo = self.Logo.getChildByName("icon_free");
        freeLogo.active = true;
        let freeLogoVMState = freeLogo.addComponent(VMState);
        freeLogoVMState.valueAction = VM_ACTION.NODE_ACTIVE;
        freeLogoVMState.valueA = SpinType.FREE;
        freeLogoVMState.watchPath = "slo.spin_type";

        // 翻译
        CCHelper.setLanguageResId(rc.get<Node>("board_des_1"), const_string_lang_model.FIELDS.GAME_5);
        CCHelper.setLanguageResId(rc.get<Node>("board_des_2"), const_string_lang_model.FIELDS.GAME_5);

        UISlobskgComponentSystem.setUseCoin(self, self.userModel.base.coin_used, self.userModel.base.coins);

        self.addComponent(UISloOperateComponent, rc.get("Operate")).doRotate(true);

        self.addComponent(UISloButtomAreaComponent, rc.get("UIBottomArea"));

        self.addComponent(UISlobskgRoleComponent).node = rc.get("Role");

        self.onDevOrientationChange(GlobalComponent.instance.version.PlatformConfig.CurOrientation);
    }
}

@CocosDecorators.SystemRegister()
export class UISlobskgComponentStartSystem extends UISloMachineComponentStartSystem<UISlobskgComponent> {
    constructor() {
        super(UISlobskgComponent);
    }

    start(self: UISlobskgComponent) {
        super.start(self);
        UISlobskgComponentSystem.createMachine(self, UISloReelComponent, UISloTileComponent);
        UISlobskgComponentSystem.onListener(self);
        UISlobskgComponentSystem.onSloListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class UISlobskgComponentUpdateSystem extends UpdateSystem<UISloMachineComponent> {
    constructor() {
        super(UISlobskgComponent);
    }

    update(self: UISlobskgComponent) {
        UISlobskgComponentSystem.update(self);
    }
}

export class UISlobskgComponentDestroySystem extends DestroySystem<UISlobskgComponent> {
    constructor() {
        super(UISlobskgComponent);
    }

    destroy(self: UISlobskgComponent) {
        UISlobskgComponentSystem.offListener(self);
        UISlobskgComponentSystem.offSloListener(self);
    }
}

export class UISlobskgComponentSystem extends UISloMachineComponentSystem {
    /** slo内部消息绑定 */
    protected static listSloNotifications(self: UISloMachineComponent): MessageEventType[] {
        return super
            .listSloNotifications(self)
            .concat(
                [{ name: SloMachineEvent.ReelStop, callback: FunctionCaller.create(UISlobskgComponentSystem.onReelStop, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.MachineOperteSpin, callback: FunctionCaller.create(UISlobskgComponentSystem.onOperateSpin, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.ReelTileStop, callback: FunctionCaller.create(UISlobskgComponentSystem.onReelTileStop, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.ReelAllStop, callback: FunctionCaller.create(UISlobskgComponentSystem.onReelAllStop, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.SpinResultGainNormal, callback: FunctionCaller.create(UISlobskgComponentSystem.onSpinResultGainNormal, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.MachineSpinStop, callback: FunctionCaller.create(UISlobskgComponentSystem.onMachineSpinStop, UISlobskgComponentSystem, self) }],
                [{ name: SloMachineEvent.SpinResultGainScatter, callback: FunctionCaller.create(UISlobskgComponentSystem.onSpinResultGainScatter, UISlobskgComponentSystem, self) }]
            );
    }

    /** Scatter中奖 */
    protected static onSpinResultGainScatter() {}

    protected static doSpinBefore(self: UISlobskgComponent) {
        // 检查余额

        VM.get<UserModel>(UserModel.name).$data.base.gold -= self.sloModel.bet;

        return true;
    }

    protected static async doStop(self: UISlobskgComponent) {
        let spinDelay = 0;
        self.randMod = Math.random() / 2;
        self.ScatterNum = 0;
        for (let i = 0; i < self.machineConfig.wheelCol; i += 1) {
            if (!self.preStop) {
                spinDelay = this.getReelStopDelay(self, i);
                logger.info("spinDelay=", spinDelay);
            }
            const theReel = self.reels[i];

            let reelTiles = self.result.spin_data.matrix[i].Reel.slice();

            if (-1 !== reelTiles.indexOf(self.machineConfig.scatter_id)) {
                self.ScatterNum++;
            }

            // 第三列开始，如果前两列scatter数量>=2
            if (i > 2 && self.ScatterNum >= 2) {
                // 最后两列加速，先不要设置结果，等前3列停止后，加速旋转
                await this.reelAddSpeedSpin(self, i);
            } else {
                GlobalComponentSystem.sleep(
                    spinDelay,
                    FunctionCaller.create(() => {
                        UISloReelComponentSystem.readyStop(theReel, reelTiles);
                    }, this)
                );
            }
        }
    }

    /** 卷轴加速旋转 */
    private static async reelAddSpeedSpin(self: UISlobskgComponent, reelIndex: number) {
        const theReel = self.reels[reelIndex];
        // 加速
        theReel.spinSpeedConfig = self.machineConfig.SpinSpeedConfig[1];
        await UISloReelComponentSystem.playReelEffect(theReel, self.ResConfigs.BskgEffects.reelFast);
        // 播放加速特效
        SoundComponentSystem.stopEffect(self.resConfigs.Audios.spin);
        SoundComponentSystem.playEffect(self.ResConfigs.BskgAudios.fastReel[0]);
        let reelTiles = self.result.spin_data.matrix[reelIndex].Reel.slice();
        await GlobalComponentSystem.sleepSync(4);
        UISloReelComponentSystem.readyStop(theReel, reelTiles);
    }

    /** 可视范围内一列的最后一个图标停止 */
    public static onReelStop(self: UISlobskgComponent, col: number) {
        const theReel = self.reels[col];
        // 置灰前三排
        if (col <= 3 && self.ScatterNum >= 2) {
            for (let j = 0; j <= self.machineConfig.WheelRow; j++) {
                UISloReelComponentSystem.showDoTileMask(theReel, j);
            }
        }
    }

    protected static reset(self: UISlobskgComponent) {
        super.reset(self);
        self.getComponent(UISloOperateComponent).doRotate(false);
        self.scatterAudioEffectCol = 0;
        logger.info("开始重置onMachineSpinStart");
    }

    /** 可视范围的Tile图标停止 */
    public static onReelTileStop(self: UISlobskgComponent, col: number, tileId: number) {
        const theReel = self.reels[col];
        theReel.Effect.active = false;
        if (self.ResConfigs.BskgAudios.scatters.length > 0) {
            // 播放scatter音效
            if (self.scatterAudioEffectCol <= col && tileId === self.machineConfig.scatter_id) {
                if (self.ResConfigs.BskgAudios.scatters[self.scatterAudioEffectCol]) {
                    SoundComponentSystem.playEffect(self.ResConfigs.BskgAudios.scatters[self.scatterAudioEffectCol]);
                    self.scatterAudioEffectCol++;
                }
            }
        }
    }

    /** 所有reel停止旋转 */
    public static onReelAllStop(self: UISlobskgComponent) {
        self.getComponent(UISloOperateComponent).doRotate(true);

        for (let i = 0; i < self.reels.length; i++) {
            let reel = self.reels[i];
            for (let j = 0; j <= self.machineConfig.WheelRow; j++) {
                UISloReelComponentSystem.hideDoTileMask(reel, j);
            }
        }

        VM.get<UserModel>(UserModel.name).$data.base.gold = self.result.own_gold;
    }

    /** 普通中奖 */
    public static async onSpinResultGainNormal(self: UISlobskgComponent) {
        for (let col = 0; col < self.reels.length; col++) {
            let reel = self.reels[col];
            for (let row = 0; row < self.machineConfig.WheelRow; row++) {
                let point = `${col}-${row}`;
                if (self.normalGainPoints.has(point)) {
                    continue;
                }
                UISloReelComponentSystem.showTileMask(reel, row);
            }
        }
        await this.playMachineEffect(self.MachineEffect, self.ResConfigs.BskgEffects.dustEffect_2, 1);
    }

    /** 机器停止旋转 */
    public static async onMachineSpinStop(self: UISlobskgComponent) {}

    /** 特效 */
    public static async playMachineEffect(effect: Node, effectRes: string, time: number = 1) {
        if (!effect) return;
        effect.active = true;
        let anim = effect.getComponent(dragonBones.ArmatureDisplay);
        if (!anim) {
            logger.info("playMachineEffect not exist dragonBones.ArmatureDisplay");
            return;
        }
        anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${effectRes}_ske`, dragonBones.DragonBonesAsset);
        anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${effectRes}_tex`, dragonBones.DragonBonesAtlasAsset);
        CCHelper.playDrangonDefaultAnimation(anim, time);
    }
}
