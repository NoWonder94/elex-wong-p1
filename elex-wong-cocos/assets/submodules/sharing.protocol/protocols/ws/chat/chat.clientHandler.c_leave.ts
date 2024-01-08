import { ChatChannelType } from '../../../../sharing.base/constants/ChatConst';
import { ERROR } from '../../common';

/**
 * 离开聊天
 */
export interface chat_clientHandler_c_leave_Req {
    channel: ChatChannelType;
}

/**
 * 离开聊天响应
 */
export interface chat_clientHandler_c_leave_Res {
    error: ERROR;
    /**
     * 选项定制
     * @TJS-type message
     */
    data?: any;
}