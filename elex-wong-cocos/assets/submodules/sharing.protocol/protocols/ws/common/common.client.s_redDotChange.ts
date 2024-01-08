import { RedDotInfo } from '../../../../sharing.base/protocols/CommonBase';
import { RedDotPos } from '../../common';

export interface RedDotListItem {
    pos: RedDotPos,
    info: RedDotInfo
}

/**
 * 红点系统状态变化
 */
export interface common_client_s_redDotChange {
    /** 红点状态列表 */
    list: RedDotListItem[];
}