import { ChatChannelType, ChatMsgType } from '../../../../sharing.base/constants/ChatConst';
import { ERROR } from '../../common';

/**
 * 发送聊天信息
 */
export interface chat_clientHandler_c_send_Req {
    channel: ChatChannelType;
    type: ChatMsgType;
    msg: string;
    target?: number;
}

/**
 * 离开聊天响应
 */
export interface chat_clientHandler_c_send_Res {
    error: ERROR;
    /**
     * 选项定制
     * @TJS-type message
     */
    data?: any;
}