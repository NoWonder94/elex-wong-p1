import { IAwakeSystem } from './ISystem';

export abstract class AwakeSystem<T> extends IAwakeSystem {
    constructor(private CLASS: new () => T) {
        super()
    }

    run(o: any, ...args): void {
        this.awake.apply(this, Array.prototype.slice.call(arguments, 0));
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract awake(self: T, ...args);
}