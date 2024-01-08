import { find } from "cc";
import { AwakeSystem } from "../../sharing.base/core/object/IAwakeSystem";
import { UILayer, CCUILayerScript } from "../components/CCUILayerScript";
import { AUIEvent } from "./AUIEvent";
import { UI } from "./UI";
import { UIComponent } from "./UIComponent";
import { UIEventComponent } from "./UIEventComponent";
import { UIEventSytem } from "./UIEventSytem";
import { CocosDecorators } from "../CocosDecorators";

@CocosDecorators.SystemRegister()
export class UIEventComponentAwakeSystem extends AwakeSystem<UIEventComponent> {
    constructor() {
        super(UIEventComponent);
    }

    public awake(self: UIEventComponent) {
        UIEventComponent.instance = self;
        let uiRoot = find("/Global/UI");
        self.UILayers.set(UILayer.Hidden, uiRoot.getChildByName("Hidden"));
        self.UILayers.set(UILayer.Low, uiRoot.getChildByName("Low"));
        self.UILayers.set(UILayer.Mid, uiRoot.getChildByName("Mid"));
        self.UILayers.set(UILayer.High, uiRoot.getChildByName("High"));
    }
}

/**
 * 管理所有UI Node 以及UI事件
 */
export class UIEventComponentSystem {
    public static async onCreate<C>(uiComponent: UIComponent, uiType: string, a: C) {
        try {
            let uiEvent = UIEventSytem.UIEvents.get(uiType) as AUIEvent<C, null>;
            let ui: UI = await uiEvent.onCreate(uiComponent, a);
            let layerScript = ui.node.getComponent(CCUILayerScript);
            if (!layerScript) {
                layerScript = ui.node.addComponent(CCUILayerScript);
                layerScript.UILayer = UILayer.Low;
            }
            ui.node.setParent(UIEventComponent.instance.UILayers.get(layerScript.UILayer));
            return ui;
        } catch (e) {
            throw new Error(`on create ui error: ${uiType}` + e);
        }
    }

    public static onRemove<R>(uiComponent: UIComponent, uiType: string, a: R) {
        try {
            let uiEvent = UIEventSytem.UIEvents.get(uiType) as AUIEvent<null, R>;
            uiEvent.onRemove(uiComponent, a);
        } catch (e) {
            throw new Error(`on remove ui error: ${uiType}` + e);
        }
    }
}
