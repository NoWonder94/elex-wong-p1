import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";
import { UISloMachineComponentSystem } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloMachineComponentSystem";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { UISlobskgComponent } from "./UISlobskgComponent";
import { EventComponent } from "../../../../../../cocos.framework/module/event/EventComponent";
import { EventComponentSystem } from "../../../../../../cocos.framework/module/event/EventComponentSystem";
import { SloMachineEvent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/SloMachineEvent";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import { dragonBones } from "cc";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { SoundComponentSystem } from "../../../../../../cocos.framework/module/sound/SoundComponentSystem";

@CocosDecorators.ClassNameRegister("UISlobskgRoleComponent")
export class UISlobskgRoleComponent extends SceneNodeComponent {}

@CocosDecorators.SystemRegister()
export class UISlobskgRoleComponentAwakeSystem extends AwakeSystem<UISlobskgRoleComponent> {
    constructor() {
        super(UISlobskgRoleComponent);
    }

    awake(self: UISlobskgRoleComponent) {
        let parent = self.getParent<UISlobskgComponent>();
        let listener = parent.getComponent(EventComponent);
        EventComponentSystem.on(listener, SloMachineEvent.SpinResultGainNormal, FunctionCaller.create(UISlobskgRoleComponentSystem.onSpinResultGainNormal, UISlobskgRoleComponentSystem, self));
    }
}

export class UISlobskgRoleComponentSystem extends UISloMachineComponentSystem {
    /** 普通中奖 */
    public static async onSpinResultGainNormal(self: UISlobskgRoleComponent) {
        let parent = self.getParent<UISlobskgComponent>();

        let anim = self.node.getComponent(dragonBones.ArmatureDisplay);
        // 结束播放

        anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${parent.ResConfigs.BskgRole.Effect.gain1}_ske`, dragonBones.DragonBonesAsset);
        anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${parent.ResConfigs.BskgRole.Effect.gain1}_tex`, dragonBones.DragonBonesAtlasAsset);

        SoundComponentSystem.playEffect(parent.ResConfigs.BskgRole.Audios.gain1);

        CCHelper.playDrangonDefaultAnimation(
            anim,
            1,
            1,
            null,
            FunctionCaller.create(async () => {
                anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${parent.ResConfigs.BskgRole.Effect.default}_ske`, dragonBones.DragonBonesAsset);
                anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${parent.ResConfigs.BskgRole.Effect.default}_tex`, dragonBones.DragonBonesAtlasAsset);
                CCHelper.playDrangonDefaultAnimation(anim, 0);
            }, this)
        );
    }
}
