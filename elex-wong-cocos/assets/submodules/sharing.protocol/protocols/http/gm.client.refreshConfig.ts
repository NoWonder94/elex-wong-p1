/** 刷新配置 */
export interface gm_client_refreshConfig_Req {
    /**
     * 表
     * @TJS-type string
     */
    table: string;
    /**
     * 记录ID
     */
    id: number;
}