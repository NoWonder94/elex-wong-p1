import { SEX } from '../../../../sharing.base/constants/PlayerBaseConst';
import { UID } from '../../../../sharing.base/consts';

/** 用户基本信息 */
export interface ProtoUserBaseInfo {
    /** 用户id */
    uid: UID;
    /**
     * 拥有金币
     * @TJS-type double
     */
    ownGold: number;
    /** 昵称 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 性别 */
    sex: SEX;
    /** 国家编码 */
    country_code: string;
}