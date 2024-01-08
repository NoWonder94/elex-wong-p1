import { instantiate, Prefab, Node } from "cc";
import { AUIEvent } from "../AUIEvent";
import { UI, UILevel } from "../UI";
import { UIComponent } from "../UIComponent";
import { UIType } from "../UIType";
import { EntityFactory } from "../../../sharing.base/core/object/EntityFactory";
import { EventType } from "../../EventType";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../../CocosDecorators";
import { UIToastComponent } from "./UIToastComponent";
import { CCUILayerScript, UILayer } from "../../components/CCUILayerScript";

@CocosDecorators.UIEventRegister(UIType.UIToast)
export class ToastAUIEvent extends AUIEvent<EventType.UIToastStart, null> {

    public async onCreate(uiComponent: UIComponent, a: EventType.UIToastStart) {
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(a.prefabURL);
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UIToast, instantiate(prefab));
        ui.level = UILevel.Popup;
        let layerScript = ui.node.addComponent(CCUILayerScript);
        layerScript.UILayer = UILayer.High;
        ui.addComponent(UIToastComponent);
        ui.node.active = false;
        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
    }
}


