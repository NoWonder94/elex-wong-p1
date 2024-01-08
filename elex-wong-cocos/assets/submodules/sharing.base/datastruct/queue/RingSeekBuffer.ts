/**
 * 环形Buffer
 */
export class RingSeekBuffer<T> {
    private elements: Array<T>;
    /** 队头 */
    private first: number;
    /** 队尾 */
    private end: number;
    /** 容量 */
    private size: number;

    constructor(capacity: number, private evictedCb?: (element: T) => void) {
        this.elements = new Array(capacity || 50);
        this.first = 0;
        this.size = 0;
    }

    public capacity() {
        return this.elements.length;
    }

    public isEmpty() {
        return this.size === 0;
    }

    public isFull() {
        return this.size === this.capacity();
    }

    /**
     * Peeks at the top element of the queue
     */
    public peek() {
        if (this.isEmpty()) throw new Error('RingBuffer is empty');

        return this.elements[this.first];
    }

    public peekN(count: number) {
        if (count > this.size) throw new Error('Not enough elements in RingBuffer');

        const end = Math.min(this.first + count, this.capacity());
        const firstHalf = this.elements.slice(this.first, end);
        if (end < this.capacity()) {
            return firstHalf;
        }
        const secondHalf = this.elements.slice(0, count - firstHalf.length);
        return firstHalf.concat(secondHalf);
    }

    /** Dequeues the top element of the queue */
    public deq() {
        const element = this.peek();

        this.size--;
        this.first = (this.first + 1) % this.capacity();

        return element;
    }

    /** Dequeues multiple elements of the queue */
    public deqN(count: number) {
        const elements = this.peekN(count);

        this.size -= count;
        this.first = (this.first + count) % this.capacity();

        return elements;
    }

    /** add element */
    public enq(element: T) {
        this.end = (this.first + this.size) % this.capacity();
        const full = this.isFull()
        if (full && this.evictedCb) {
            this.evictedCb(this.elements[this.end]);
        }
        this.elements[this.end] = element;

        if (full) {
            this.first = (this.first + 1) % this.capacity();
        } else {
            this.size++;
        }

        return this.size;
    }

    public get Size() {
        return this.size;
    }
}