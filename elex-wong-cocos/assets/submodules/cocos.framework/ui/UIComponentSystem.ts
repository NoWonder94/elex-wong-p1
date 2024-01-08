import { AwakeSystem } from "../../sharing.base/core/object/IAwakeSystem";
import { UI } from "./UI";
import { UIComponent } from "./UIComponent";
import { UIEventComponentSystem } from './UIEventComponentSystem';
import { UISceneFlagComponent } from '../service/scene/UISceneFlagComponent';
import { UISceneComponentSystem } from '../service/scene/UISceneComponentSystem';

export class UIComponentAwakeSystem extends AwakeSystem<UIComponent>
{
    public awake(self: UIComponent) {
    }
}

/**
 * 管理Scene上的UI
 */
export class UIComponentSystem {
    public static async create<C>(self: UIComponent, uiType: string, c: C) {
        let ui: UI = await UIEventComponentSystem.onCreate(self, uiType, c);
        self.UIs.set(uiType, ui);
        ui.addComponent(UISceneFlagComponent);
        return ui;
    }

    public static remove<R>(self: UIComponent, uiType: string, r: R) {
        let ui = self.UIs.get(uiType);
        if (!ui) {
            return;
        }

        UIEventComponentSystem.onRemove(self, uiType, r);

        self.UIs.delete(uiType);
        UISceneComponentSystem.delUIScene(ui);
        ui.dispose();
    }

    public static get(self: UIComponent, uiType: string): UI {
        let ui: UI = self.UIs.get(uiType);
        return ui;
    }
}