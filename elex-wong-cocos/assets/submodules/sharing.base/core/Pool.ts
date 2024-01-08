export class Pool<T> {

    private readonly pool = new Array<T>();

    public fetch(CLASS: new () => T): T {
        if (this.pool.length === 0) {
            return new CLASS();
        }
        return this.pool.shift() as any;
    }

    public recycle(t) {
        this.pool.push(t);
    }

    public clear() {
        this.pool.splice(0);
    }
}


