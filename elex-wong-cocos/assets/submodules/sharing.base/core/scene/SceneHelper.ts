import { Entity } from "../object/Entity";
import { Scene } from '../entity/Scene';

export class SceneHelper {
    public static domainZone(entity: Entity): number {
        let scene = entity as Scene;
        return scene.Zone || 0;
    }

    public static domainScene(entity: Entity): Scene {
        return entity.Domain as Scene;
    }
}