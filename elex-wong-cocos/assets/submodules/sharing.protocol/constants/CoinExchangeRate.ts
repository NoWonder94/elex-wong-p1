/**
 * 货币兑美元的汇率对象
 */
export interface CoinExchangeRate {
    /**
     * 货币编码
     */
    code: string;

    /**
     * 货币兑美元的汇率
     */
    exchangeRate: number;
}