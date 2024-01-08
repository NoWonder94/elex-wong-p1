/**
 * 转出货币
 */
export interface gm_client_coinTransferOut_Req {
    /**
     * 用户id
     */
    uid: number,
    /**
     * 货币编码
     */
    coinCode: string,
    /**
     * 转出数量
     */
    number: number,
}

export interface gm_client_coinTransferOut_Res {
    /**
     * 转出前的余额
     */
    originalBalance: number,

    /**
     * 转出后的余额
     */
    currentBalance: number
}