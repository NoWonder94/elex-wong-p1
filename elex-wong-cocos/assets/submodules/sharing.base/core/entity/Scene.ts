import { Entity } from '../object/Entity';
import { SceneType } from './SceneType';

export class Scene extends Entity {
    public name: string;

    private zone: number;

    private sceneType: SceneType;

    constructor(zone: number, sceneType: SceneType, name: string) {
        super();
        this.zone = zone;
        this.sceneType = sceneType;
        this.name = name;
        this.IsCreate = true;
    }

    get Zone() {
        return this.zone;
    }

    get SceneType() {
        return this.sceneType;
    }

    set Parent(value: Entity) {
        if (value == null) {
            this.parent = this;
            return;
        }
        this.parent = value;
        this.parent.Children.maps.set(this.id, this);
    }

    set Domain(value: Entity) {
        this.domain = value;
    }

    dispose() {
        if (this.IsDisposed) {
            return;
        }

        logger.info(`scene dispose: ${this.SceneType} ${this.name} ${this.id} ${this.instanceId} ${this.Zone}`);

        super.dispose();
    }
}