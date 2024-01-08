import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { DestroySystem } from "../../../sharing.base/core/object/IDestroySystem";
import { CocosDecorators } from "../../CocosDecorators";
import { UISceneComponentSystem } from "./UISceneComponentSystem";
import { UISceneFlagComponent } from "./UISceneFlagComponent";
import { UI, UILevel } from '../../ui/UI';

@CocosDecorators.SystemRegister()
export class ZoneSceneFlagComponentAwakeSystem extends AwakeSystem<UISceneFlagComponent> {
    constructor() {
        super(UISceneFlagComponent);
    }

    awake(self: UISceneFlagComponent) {
        let ui = self.getParent<UI>();
        if (ui.level != UILevel.Scene) {
            return;
        }
        UISceneComponentSystem.addUIScene(self.getParent<UI>())
    }
}

@CocosDecorators.SystemRegister()
export class ZoneSceneFlagComponentDestroySystem extends DestroySystem<UISceneFlagComponent> {
    constructor() {
        super(UISceneFlagComponent);
    }

    destroy(self: UISceneFlagComponent) {
        // UISceneComponentSystem.tag(null);
        // ZoneSceneManagerComponentSystem.remove(SceneHelper.domainZone(self));
    }
}