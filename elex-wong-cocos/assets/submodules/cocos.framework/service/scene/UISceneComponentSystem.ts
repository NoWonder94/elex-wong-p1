import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { DestroySystem } from "../../../sharing.base/core/object/IDestroySystem";
import { CocosDecorators } from "../../CocosDecorators";
import { UISceneComponent } from "./UISceneComponent";
import { SceneHelper } from '../../../sharing.base/core/scene/SceneHelper';
import { UI } from '../../ui/UI';
import { Game } from "../../../sharing.base/core/entity/Game";
import { UIHelper } from '../../ui/UIHelper';
import { ObjectHelper } from '../../../sharing.base/helper/ObjectHelper';

@CocosDecorators.SystemRegister()
export class UISceneComponentAwakeSystem extends AwakeSystem<UISceneComponent>{
    constructor() {
        super(UISceneComponent);
    }
    awake(self: UISceneComponent) {
        UISceneComponent.instance = self;
    }
}

@CocosDecorators.SystemRegister()
export class UISceneComponentDestroySystem extends DestroySystem<UISceneComponent>{
    constructor() {
        super(UISceneComponent);
    }
    destroy(self: UISceneComponent) {
        // self.zoneScenes.clear();
    }
}

export class UISceneComponentSystem {

    public static get curZone() {
        return SceneHelper.domainZone(UISceneComponent.instance.curUIScene || Game.Scene);
    }

    public static addUIScene(ui: UI) {
        let self = UISceneComponent.instance;
        self.curUIScene = ui;
    }

    public static delUIScene(ui: UI) {
        let self = UISceneComponent.instance;
        ObjectHelper.ArrayRemove(self.historyScene, ui);
    }

    /** 移除当前场景级别UI */
    public static removeCurUIScene() {
        let self = UISceneComponent.instance;
        if (!self.curUIScene) {
            return;
        }

        UIHelper.remove(SceneHelper.domainScene(self.curUIScene), self.curUIScene.Name);
    }
}