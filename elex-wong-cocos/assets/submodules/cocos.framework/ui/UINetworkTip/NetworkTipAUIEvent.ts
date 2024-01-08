import { instantiate, Prefab, Node } from "cc";
import { AUIEvent } from "../AUIEvent";
import { UI } from "../UI";
import { UIComponent } from "../UIComponent";
import { UIType } from "../UIType";
import { EntityFactory } from "../../../sharing.base/core/object/EntityFactory";
import { EventType } from "../../EventType";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../../CocosDecorators";
import { CCUILayerScript, UILayer } from '../../components/CCUILayerScript';
import { UINetworkTipComponent } from "./UINetworkTipComponent";
import { Entity } from '../../../sharing.base/core/object/Entity';

@CocosDecorators.UIEventRegister(UIType.UINetworkTip)
export class LoadingAUIEvent extends AUIEvent<EventType.UINetworkTipCreate, null> {

    public async onCreate(uiComponent: UIComponent, a: EventType.UINetworkTipCreate) {
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(a.prefabURL);
        let CLASS = a.CLASS || UINetworkTipComponent;
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UINetworkTip, instantiate(prefab));
        let layerScript = ui.node.addComponent(CCUILayerScript);
        layerScript.UILayer = UILayer.High;
        let component = ui.addComponent(CLASS);
        component.nodePrefabURL = a.prefabURL;
        ui.node.active = false;
        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
    }
}


