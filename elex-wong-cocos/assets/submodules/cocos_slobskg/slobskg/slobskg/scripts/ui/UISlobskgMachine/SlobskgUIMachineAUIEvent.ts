import { instantiate, Prefab, Node } from "cc";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { AUIEvent } from "../../../../../../cocos.framework/ui/AUIEvent";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { UIComponent } from "../../../../../../cocos.framework/ui/UIComponent";
import { UIComponentSystem } from "../../../../../../cocos.framework/ui/UIComponentSystem";
import { EntityFactory } from "../../../../../../sharing.base/core/object/EntityFactory";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { SlobskgUIType } from "../../SlobskgUIType";
import { BskgResConfig } from "../../constants/SlobskgResConfig";
import { BskgMachineConfig } from "../../constants/SlobskgMachineConfig";
import { UISlobskgComponent } from "./UISlobskgComponent";
import { BskgUISlotConfig } from "../../constants/SlobskgUIAdapterConfig";

@CocosDecorators.UIEventRegister(SlobskgUIType.UISloMachine)
export class SlobskgUIMachineAUIEvent extends AUIEvent<null, null> {
    public async onCreate(uiComponent: UIComponent) {
        logger.info("UISlobskgMachine create");
        const UIPrefabUrl = "slobskg/prefabs/UISlot";
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(UIPrefabUrl);
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, SlobskgUIType.UISloMachine, instantiate(prefab));

        let component = ui.addComponent(UISlobskgComponent, {
            resConfigs: BskgResConfig,
            machineConfig: BskgMachineConfig,
            uiconfig: BskgUISlotConfig,
        });
        component.nodePrefabURL = UIPrefabUrl;

        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
        logger.info("UISlobskgMachine remove");
        let ui = UIComponentSystem.get(uiComponent, SlobskgUIType.UISloMachine);
        let component = ui.getComponent(UISlobskgComponent);
        ResourcesComponentSystem.releaseAsset(component.nodePrefabURL);
    }
}
