import { ChatChannelType, ChatMsgType, ProtoChatFromInfo } from '../../../../sharing.base/constants/ChatConst';
import { ERROR } from '../../common';

/**
 * 获取最近消息
 */
export interface chat_clientHandler_c_getLastmsg_Req {
    /** 频道 */
    channel: ChatChannelType;
}



export interface ProtoChatLastMsgListItem {
    /** 频道 */
    channel: ChatChannelType;
    /** 消息类型 */
    type: ChatMsgType;
    /** 消息内容 */
    msg: string;
    /** 时间 */
    time: number;
    /** 来源 */
    from: ProtoChatFromInfo;
}

export interface ProtoChatLastMsgList {
    list: ProtoChatLastMsgListItem;
}

/**
 * 获取最近消息响应
 */
export interface chat_clientHandler_c_getLastmsg_Res {
    error: ERROR;
    /**
     * 最近消息
     */
    data?: ProtoChatLastMsgList;
}