import { EntityCreateStatus } from './Entity';
import { IStartSystem } from './ISystem';

export abstract class StartSystem<T> extends IStartSystem {
    constructor(private CLASS: new () => T) {
        super();
    }

    async run(o: any) {
        await this.start(o);
        o.createStatus = EntityCreateStatus.Started;
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract start(self: T);
}