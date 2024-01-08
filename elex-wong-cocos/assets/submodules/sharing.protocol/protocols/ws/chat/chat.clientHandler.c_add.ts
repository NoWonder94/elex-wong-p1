import { ChatChannelType } from '../../../../sharing.base/constants/ChatConst';
import { ERROR } from '../../common';
/**
 * 加入聊天
 */
export interface chat_clientHandler_c_add_Req {
    /** 频道 */
    channel: ChatChannelType;
    /** 频道id */
    channel_id?: number;
}

/**
 * 加入聊天响应
 */
export interface chat_clientHandler_c_add_Res {
    error: ERROR;
    /**
     * 选项定制
     * @TJS-type message
     */
    data?: any;
}