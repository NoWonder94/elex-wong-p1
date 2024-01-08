export abstract class IEvent {
    abstract get type(): string;
}

export abstract class AEvent<A> extends IEvent {
    constructor(private CLASS: new (...args) => A) {
        super()
    }

    get type(): string {
        return this.CLASS && this.CLASS.name;
    }

    protected abstract run(a: A);

    public async handle(a: A) {
        try {
            await this.run(a);
        }
        catch (e) {
            logger.error('AEvent run err=', e);
        }
    }
}
