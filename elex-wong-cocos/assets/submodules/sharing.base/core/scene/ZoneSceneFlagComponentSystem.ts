import { Decorators } from '../Decorators';
import { Scene } from '../entity/Scene';
import { AwakeSystem } from '../object/IAwakeSystem';
import { DestroySystem } from '../object/IDestroySystem';
import { SceneHelper } from './SceneHelper';
import { ZoneSceneFlagComponent } from './ZoneSceneFlagComponent';
import { ZoneSceneManagerComponentSystem } from './ZoneSceneManagerComponentSystem';
@Decorators.SystemRegister()
export class ZoneSceneFlagComponentAwakeSystem extends AwakeSystem<ZoneSceneFlagComponent> {
    constructor() {
        super(ZoneSceneFlagComponent);
    }

    awake(self: ZoneSceneFlagComponent) {
        ZoneSceneManagerComponentSystem.add(self.getParent<Scene>())
    }
}

@Decorators.SystemRegister()
export class ZoneSceneFlagComponentDestroySystem extends DestroySystem<ZoneSceneFlagComponent> {
    constructor() {
        super(ZoneSceneFlagComponent);
    }

    destroy(self: ZoneSceneFlagComponent) {
        ZoneSceneManagerComponentSystem.remove(SceneHelper.domainZone(self));
    }
}