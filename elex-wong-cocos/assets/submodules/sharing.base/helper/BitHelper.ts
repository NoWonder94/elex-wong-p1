/** 位运算工具 */
export class BitHelper {
    /**
     * 添加状态值
     * @param state 当前状态
     * @param addState 添加状态
     */
    public static add(state: number, addState: number): number {
        return state & addState ? state : state | addState;
    }

    /**
     * 移除状态值
     * @param state 当前状态
     * @param delState 待添加状态
     */
    public static del(state: number, delState: number): number {
        return state & delState ? (state ^= delState) : state;
    }

    /**
     * 是否存在此状态
     * @param state 当前状态
     * @param checkState 待检查状态
     */
    public static has(state: number, checkState: number): boolean {
        return state & checkState ? true : false;
    }
}