/**
 * 
 * Cyclist allows you to create a list of fixed size that is cyclic. 
 * In a cyclist list the element following the last one is the first one. 
 * This property can be really useful when for example trying to order data
 *  packets that can arrive out of order over a network stream
 * 
 */

function twoify(n) {
    if (n && !(n & (n - 1))) return n
    let p = 1
    while (p < n) p <<= 1
    return p
}

/**
 * 循环列表，用于组包
 */
export class Cyclist<T> {
    mask: number;
    size: number;
    values: Array<T>;

    constructor(size: number) {
        if (!(this instanceof Cyclist)) return new Cyclist(size)
        size = twoify(size)
        this.mask = size - 1
        this.size = size
        this.values = new Array<T>(size)
    }

    put(index: number, val: T) {
        const pos = index & this.mask
        this.values[pos] = val
        return pos
    }

    get(index: number) {
        return this.values[index & this.mask]
    }

    del(index: number) {
        const pos = index & this.mask
        const val = this.values[pos]
        this.values[pos] = undefined
        return val
    }
}