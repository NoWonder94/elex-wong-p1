import { instantiate, Prefab, Node } from "cc";
import { EventType } from "../../cocos.framework/EventType";
import { AUIEvent } from "../../cocos.framework/ui/AUIEvent";
import { UI } from "../../cocos.framework/ui/UI";
import { UIComponent } from "../../cocos.framework/ui/UIComponent";
import { UIType } from "../../cocos.framework/ui/UIType";
import { EntityFactory } from "../../sharing.base/core/object/EntityFactory";
import { UIHotUpdateComponent } from "./UIHotUpdateComponent";
import { ResourcesComponentSystem } from "../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../../cocos.framework/CocosDecorators";

@CocosDecorators.UIEventRegister(UIType.UIHotupdate)
export class UIHotUpdateEvent extends AUIEvent<EventType.AppStartHotUpdate, null> {

    public async onCreate(uiComponent: UIComponent, a: EventType.AppStartHotUpdate) {
        logger.info('UIHotupdate create 1');
        let prefab = await ResourcesComponentSystem.loadAsset<Prefab>(a.prefabURL);
        logger.info('UIHotupdate create 2', a.prefabURL);
        // 创建热更界面
        let ui: UI = EntityFactory.createWithParent<UI, string, Node>(uiComponent, UI, UIType.UILogin, instantiate(prefab));
        logger.info('UIHotupdate create 3', a.prefabURL);
        ui.addComponent(UIHotUpdateComponent);
        logger.info('UIHotupdate create 4', a.prefabURL);
        return ui;
    }
    public onRemove(uiComponent: UIComponent) {
        logger.info('UIHotupdate remove');
    }
}