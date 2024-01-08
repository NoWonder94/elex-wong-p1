import { UID } from '../../../../sharing.base/consts';

/** 玩家事件类型定义 */
export enum PlayerStatusEventType {
    /** 等级提升 */
    LevelUpgrade = 1,
}

/** 玩家信息变化 */
export interface common_client_s_playerStatusEventNotity {
    /**
    * 用户ID
    */
    uid: UID;
    /**
     * 类型
     */
    type: PlayerStatusEventType;
    /**
     * 变化前值
     */
    change_before?: number
    /**
     * 变化后
     */
    change_after?: number
    /**
     * 触发事件值
     */
    trigger_value?: number;
}