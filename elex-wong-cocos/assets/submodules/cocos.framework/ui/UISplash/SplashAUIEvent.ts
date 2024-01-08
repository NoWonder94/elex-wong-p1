import { instantiate, Prefab, Node } from "cc";
import { AUIEvent } from "../AUIEvent";
import { UI } from "../UI";
import { UIComponent } from "../UIComponent";
import { UIComponentSystem } from "../UIComponentSystem";
import { UIType } from "../UIType";
import { EntityFactory } from "../../../sharing.base/core/object/EntityFactory";
import { EventType } from "../../EventType";
import { UISplashComponent } from "./UISplashComponent";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.UIEventRegister(UIType.UISplash)
export class SplashAUIEvent extends AUIEvent<EventType.SplashStart, null> {

    public async onCreate(uiComponent: UIComponent, a: EventType.SplashStart) {
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(a.prefabURL);
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UISplash, instantiate(prefab));
        let component = ui.addComponent(UISplashComponent, a.waitEvents);
        component.nodePrefabURL = a.prefabURL;
        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
        let ui = UIComponentSystem.get(uiComponent, UIType.UISplash);
        let component = ui.getComponent(UISplashComponent);
        ResourcesComponentSystem.releaseAsset(component.nodePrefabURL);
    }
}


