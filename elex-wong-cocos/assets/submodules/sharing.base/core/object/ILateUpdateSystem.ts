import { ILateUpdateSystem } from "./ISystem";

export abstract class LateUpdateSystem<T> extends ILateUpdateSystem {
    constructor(private CLASS: new () => T) {
        super();
    }

    run(o: any, deltaTime: number): void {
        this.lateUpdate(o, deltaTime);
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    abstract lateUpdate(self: T, deltaTime: number);
}