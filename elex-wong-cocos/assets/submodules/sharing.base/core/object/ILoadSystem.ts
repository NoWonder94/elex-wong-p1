import { Entity, EntityCreateStatus } from './Entity';
import { ILoadSystem } from './ISystem';

export abstract class LoadSystem<T extends Entity> extends ILoadSystem {
    constructor(private CLASS: new () => T) {
        super();
    }

    async run(o: T) {
        await this.load(o);
        o.createStatus = EntityCreateStatus.Loaded;
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract load(self: T);
}