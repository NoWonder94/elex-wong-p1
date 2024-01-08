import { Entity, EntityCreateStatus } from './Entity';
import { IUpdateSystem } from './ISystem';

export abstract class UpdateSystem<T extends Entity> extends IUpdateSystem {
    constructor(private CLASS: new () => T) {
        super();
    }

    async run(o: T, deltaTime: number) {
        try {
            await this.update(o, deltaTime);
        } catch (error) {
            throw error;
        } finally {
            o.isUpdating = false;
            o.lastUpdateMS = Date.now();
            o.createStatus = EntityCreateStatus.Updating;
        }
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract update(self: T, deltaTime: number);
}