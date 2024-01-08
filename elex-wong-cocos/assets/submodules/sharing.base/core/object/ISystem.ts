export abstract class IAwakeSystem {
    abstract get type(): string;
    abstract run(o: any, ...args): void;
}

export abstract class IStartSystem {
    abstract get type(): string;
    abstract run(o: any): void;
}

export abstract class ILoadSystem {
    abstract get type(): string;
    abstract run(o: any): void;
}

export abstract class ILateUpdateSystem {
    abstract get type(): string;
    abstract run(o: any, deltaTime: number): void;
}

export abstract class IDestroySystem {
    abstract get type(): string;
    abstract run(o: any): void;
}

export abstract class IChangeSystem {
    abstract get type(): string;
    abstract run(o: any): void;
}

export abstract class IUpdateSystem {
    abstract get type(): string;
    abstract run(o: any, deltaTime: number): void;
}