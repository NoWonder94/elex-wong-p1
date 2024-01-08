import { Entity } from '../object/Entity';
import { Scene } from './Scene';
import { SceneType } from './SceneType';

export class EntitySceneFactory {
    public static createScene(id: number, instanceId: number, zone: number, sceneType: SceneType, name: string, parent: Entity = null): Scene {
        let scene: Scene = new Scene(zone, sceneType, name);
        if (null == id && null == instanceId) {
            id = instanceId = Entity.genId();
        } else if (null == instanceId) {
            instanceId = id;
        }

        scene.id = id;
        scene.instanceId = instanceId;

        scene.IsRegister = true;
        scene.Parent = parent;
        scene.Domain = scene;

        return scene;
    }
}