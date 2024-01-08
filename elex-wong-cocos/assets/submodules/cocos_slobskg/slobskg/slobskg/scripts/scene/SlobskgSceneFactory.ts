import { EntitySceneFactory } from "../../../../../sharing.base/core/entity/EntitySceneFactory";
import { Game } from "../../../../../sharing.base/core/entity/Game";
import { Scene } from "../../../../../sharing.base/core/entity/Scene";
import { SceneType } from "../../../../../sharing.base/core/entity/SceneType";
import { Entity } from '../../../../../sharing.base/core/object/Entity';
import { ZoneSceneFlagComponent } from "../../../../../sharing.base/core/scene/ZoneSceneFlagComponent";
import { SlobskgEventType } from "../SlobskgEventType";

export class SlobskgSceneFactory {
    public static async createScene(zone: number, name: string): Promise<Scene> {
        let scene: Scene = EntitySceneFactory.createScene(Entity.genId(), null, zone, SceneType.Zone, name, Game.Scene);
        scene.addComponent(ZoneSceneFlagComponent);
        // UI层的初始化
        await Game.EventSystem.publish(new SlobskgEventType.AfterCreateSlobskgZoneScene(scene));
        return scene;
    }

    public static disposeScene(zone: number) {
    }

}