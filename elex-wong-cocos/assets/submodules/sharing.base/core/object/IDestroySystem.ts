import { IDestroySystem } from "./ISystem";

export abstract class DestroySystem<T> extends IDestroySystem {
    constructor(private CLASS: new () => T) {
        super();
    }

    run(o: any): void {
        this.destroy(o);
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract destroy(self: T);
}