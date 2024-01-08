import { LANG } from '../../sharing.base/consts';
import { AuthType } from '../../sharing.base/protocols/AuthProtocolConst';

export enum StorageConfigTable {
    /** 音频配置 */
    Audio = 'audio',
    /** 系统配置 */
    Sys = 'sys',
}
export interface SysTable {
    /** 最后登录方式 */
    last_login_type: AuthType;
    /** 语言 */
    lang: LANG;
}

export interface WidgetConfigItem {
    type: string,
    value: number;
}

export const GlobalOptionsKey = {
    /** 获取Label配置方法 */
    GetLabelValue: 'GetLabelValue',
    /** 按鈕點擊音效 */
    ButtonHitSound: 'ButtonHitSound',
    /** 授权Token */
    Token: 'Token',
}

