import { Decorators } from "../Decorators";
import { Scene } from "../entity/Scene";
import { Entity } from "../object/Entity";
import { AwakeSystem } from "../object/IAwakeSystem";
import { DestroySystem } from "../object/IDestroySystem";
import { SceneHelper } from "./SceneHelper";
import { ZoneSceneManagerComponent } from "./ZoneSceneManagerComponent";

@Decorators.SystemRegister()
export class ZoneSceneManagerComponentAwakeSystem extends AwakeSystem<ZoneSceneManagerComponent>{
    constructor() {
        super(ZoneSceneManagerComponent);
    }
    awake(self: ZoneSceneManagerComponent) {
        ZoneSceneManagerComponent.instance = self;
    }
}

@Decorators.SystemRegister()
export class ZoneSceneManagerComponentDestroySystem extends DestroySystem<ZoneSceneManagerComponent>{
    constructor() {
        super(ZoneSceneManagerComponent);
    }
    destroy(self: ZoneSceneManagerComponent) {
        self.zoneScenes.clear();
    }
}

export class ZoneSceneManagerComponentSystem {
    public static ZoneScene(entity: Entity): Scene {
        return ZoneSceneManagerComponent.instance.zoneScenes.get(SceneHelper.domainZone(entity));
    }

    public static add(zoneScene: Scene) {
        ZoneSceneManagerComponent.instance.curZoneScene = zoneScene;
        ZoneSceneManagerComponent.instance.zoneScenes.set(zoneScene.Zone, zoneScene);
    }

    public static get(zone: number): Scene {
        return ZoneSceneManagerComponent.instance.zoneScenes.get(zone);
    }

    public static remove(zone: number) {
        ZoneSceneManagerComponent.instance.zoneScenes.delete(zone);
    }
}