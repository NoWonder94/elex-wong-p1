export default class CircularArrayBuffer<T> {
    private buffer: T[] = [];

    constructor(public capacity: number, private evictedCb?: (element: T) => void) { }

    enq(...items: T[]) {
        items.forEach(item => {
            if (this.buffer.length + 1 > this.capacity) {
                let item = this.deq();
                if (item && this.evictedCb) {
                    this.evictedCb(item);
                }
            }
            this.buffer.unshift(item);
        });
    }

    deq(): T | undefined {
        return this.buffer.pop();
    }

    replace(...items: T[]) {
        this.buffer = [];
        items.forEach(item => this.enq(item));
    }

    toArray() {
        return [...this.buffer].reverse();
    }

    get size() {
        return this.buffer.length;
    }

    get length() {
        return this.size;
    }
}