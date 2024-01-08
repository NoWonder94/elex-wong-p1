import { IChangeSystem } from "./ISystem";

export abstract class ChangeSystem<T> extends IChangeSystem {
    constructor(private CLASS: new () => T) {
        super()
    }

    run(o: any): void {
        this.change(o);
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract change(self: T);
}