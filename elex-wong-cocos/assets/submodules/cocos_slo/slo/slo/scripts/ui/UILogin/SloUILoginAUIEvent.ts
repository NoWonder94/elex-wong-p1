import { instantiate, Prefab, Node } from "cc";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { AUIEvent } from "../../../../../../cocos.framework/ui/AUIEvent";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { UIComponent } from "../../../../../../cocos.framework/ui/UIComponent";
import { UIComponentSystem } from "../../../../../../cocos.framework/ui/UIComponentSystem";
import { UIType } from '../../../../../../cocos.framework/ui/UIType';
import { EntityFactory } from "../../../../../../sharing.base/core/object/EntityFactory";
import { SloUILoginComponent } from "./SloUILoginComponent";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";

@CocosDecorators.UIEventRegister(UIType.UILogin)
export class SloUILoginAUIEvent extends AUIEvent<null, null> {

    public async onCreate(uiComponent: UIComponent) {
        logger.info('Slo UILogin create');
        const UIPrefabUrl = 'slo/prefabs/UILogin';
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(UIPrefabUrl);
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UILogin, instantiate(prefab));
        ui.addComponent(SloUILoginComponent, UIPrefabUrl);
        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
        logger.info('Slo UILogin remove');
        let ui = UIComponentSystem.get(uiComponent, UIType.UILogin);
        let component = ui.getComponent(SloUILoginComponent);
        ResourcesComponentSystem.releaseAsset(component.nodePrefabURL);
    }
}