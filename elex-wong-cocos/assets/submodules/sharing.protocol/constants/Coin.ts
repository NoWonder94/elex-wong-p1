/**
 * 虚拟币对象
 */
export interface Coin {
    /**
     * 货币编码
     */
    code: string;

    /**
     * 货币数量
     * @TJS-type double
     */
    quantity: number;
}