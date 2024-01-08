import { Decorators } from "../Decorators";
import { Scene } from "../entity/Scene";
import { Entity } from "../object/Entity";

@Decorators.ClassNameRegister('ZoneSceneManagerComponent')
export class ZoneSceneManagerComponent extends Entity {
    public static instance: ZoneSceneManagerComponent;
    public zoneScenes = new Map<number, Scene>();
    public curZoneScene: Scene;
}