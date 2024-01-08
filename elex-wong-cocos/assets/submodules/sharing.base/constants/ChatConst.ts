import { UID } from "../consts";
import { SEX } from "./PlayerBaseConst";

/** 聊天频道类型 */
export enum ChatChannelType {
    /** 好友p2p */
    Friend = 1,
    /** 团队频道 */
    Team = 2,
    /** 世界频道 */
    World = 3,
}

export enum ChatMsgType {
    /** 文本 */
    Text = 1,
    /** 表情 */
    Emoji = 2,
    /** 音频 */
    Audio = 3,
    /** 组队信息 */
    MakeTeam = 4,
    /** 系统消息 */
    Sys = 5,
}

export interface ProtoChatFromInfo {
    id: UID;
    nickname: string;
    sex: SEX;
    avatar: string;
}