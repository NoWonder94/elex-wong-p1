import { instantiate, Prefab, Node } from "cc";
import { AUIEvent } from "../AUIEvent";
import { UI } from "../UI";
import { UIComponent } from "../UIComponent";
import { UIComponentSystem } from "../UIComponentSystem";
import { UIType } from "../UIType";
import { EntityFactory } from "../../../sharing.base/core/object/EntityFactory";
import { EventType } from "../../EventType";
import { UICircleLoadingComponent } from "./UICircleLoadingComponent";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../../CocosDecorators";
import { CCUILayerScript, UILayer } from '../../components/CCUILayerScript';

@CocosDecorators.UIEventRegister(UIType.UILoading)
export class LoadingAUIEvent extends AUIEvent<EventType.UILoadingStart, null> {

    public async onCreate(uiComponent: UIComponent, a: EventType.UILoadingStart) {
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(a.prefabURL);
        let CLASS = a.CLASS || UICircleLoadingComponent;
        let ui: UI = EntityFactory.createWithParent<UI, string, Node, any>(uiComponent, UI, UIType.UILoading, instantiate(prefab), CLASS);
        let layerScript = ui.node.addComponent(CCUILayerScript);
        layerScript.UILayer = UILayer.Mid;
        let component = ui.addComponent(CLASS, a.options);
        component.nodePrefabURL = a.prefabURL;
        return ui;
    }

    public onRemove(uiComponent: UIComponent) {
        let ui = UIComponentSystem.get(uiComponent, UIType.UILoading);
        let component = ui.getComponent(ui.CLASS) as any;
        ResourcesComponentSystem.releaseAsset(component.nodePrefabURL);
    }
}


