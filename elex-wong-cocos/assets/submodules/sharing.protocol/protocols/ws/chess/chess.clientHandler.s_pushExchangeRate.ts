import {CoinExchangeRate} from '../../../constants/CoinExchangeRate';

/**
 * 虚拟货币兑美元的汇率
 */
export interface chess_clientHandler_s_pushExchangeRate {
    /**
     * 汇率数组
     */
    data: CoinExchangeRate[]
}