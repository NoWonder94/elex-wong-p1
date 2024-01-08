import { Node } from "cc";
import { EntityFactory } from "../../../sharing.base/core/object/EntityFactory";
import { CocosDecorators } from "../../CocosDecorators";
import { UILayer, CCUILayerScript } from "../../components/CCUILayerScript";
import { AUIEvent } from "../AUIEvent";
import { UI, UILevel } from "../UI";
import { UIComponent } from "../UIComponent";
import { UIType } from "../UIType";

export class UIPopupCreate {
    constructor(public node: Node, public options: any, public CLASS: new () => any) { }
}

export class UIPopupRemove {
    constructor(public CLASS: new () => any) { }
}

@CocosDecorators.UIEventRegister(UIType.UIPopup)
export class UIPopupAUIEvent extends AUIEvent<UIPopupCreate, null> {
    public async onCreate(uiComponent: UIComponent, args: UIPopupCreate) {
        logger.info('UIPopup create');
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UIPopup, args.node);
        ui.level = UILevel.Popup;
        ui.node.addComponent(CCUILayerScript).UILayer = UILayer.Mid;
        ui.addComponent(args.CLASS, args.options);
        return ui;
    }
    public onRemove(uiComponent: UIComponent, args: UIPopupRemove) {
        logger.info('UIPopup remove');
    }
}