import { FunctionCaller } from './FunctionCaller';
/**
 * 用于绑定回调函数this指针
 */
export class AsyncFunctionCaller extends FunctionCaller {
    public static create(cb: Function, target: any = null, ...args: any[]): AsyncFunctionCaller {
        let caller: AsyncFunctionCaller = new AsyncFunctionCaller()
        // 这里要展开args, 否则会将args当数组传给wrapper, 导致其args参数变成2维数组[[]]
        caller.init(cb, target, ...args);
        return caller;
    }

    public async exec(...extras) {
        return await this.cb.apply(this.target, this.args.concat(extras));
    }
}