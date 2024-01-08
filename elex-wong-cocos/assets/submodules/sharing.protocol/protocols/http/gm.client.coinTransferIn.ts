/**
 * 转入货币
 */
export interface gm_client_coinTransferIn_Req {
    /**
     * 用户id
     */
    uid: number,
    /**
     * 货币编码
     */
    coinCode: string,
    /**
     * 转入数量
     */
    number: number,
}

export interface gm_client_coinTransferIn_Res {
    /**
     * 转入前的余额
     */
    originalBalance: number,

    /**
     * 转入后的余额
     */
    currentBalance: number
}