/**
 * 用于绑定回调函数this指针
 */
export class FunctionCaller {
    public cb: Function;
    public target: any;
    public fn: any;
    protected args: any[];

    /** Check and invoke callback function */
    public static invoke(cb: Function, ...args: any[]) {
        if (!!cb && typeof cb === 'function') {
            cb.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }

    public static create(cb: Function, target: any = null, ...args: any[]): FunctionCaller {
        let caller: FunctionCaller = new FunctionCaller()
        // 这里要展开args, 否则会将args当数组传给wrapper, 导致其args参数变成2维数组[[]]
        caller.init(cb, target, ...args);
        return caller;
    }

    public exec(...extras) {
        return this.cb.apply(this.target, this.args.concat(extras));
    }

    public equal(cb: Function, target?: any) {
        return cb === this.cb && target === this.target;
    }

    protected init(cb: Function, target = null, ...args) {
        this.cb = cb;
        this.target = target;
        if (1 === args.length && null == args[0]) {
            args = [];
        }
        this.args = args;
    }
}