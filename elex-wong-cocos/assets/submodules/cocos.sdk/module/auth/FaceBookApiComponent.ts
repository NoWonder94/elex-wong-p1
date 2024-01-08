import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";
import { Entity } from '../../../sharing.base/core/object/Entity';

/**
 * 分享类型
 */
export enum SHARE_TYPE {
    /**
     * 链接
     */
    LINK = 0,
    /**
     * 图片
     */
    PHOTO = 1
}

export enum FaceBookNotity {
    FacebookLoginResult = 'FacebookLoginResult',
    FacebookShareResult = 'FacebookShareResult',
}

@CocosDecorators.ClassNameRegister('FaceBookApiComponent')
export class FaceBookApiComponent extends Entity {
    public static instance: FaceBookApiComponent;
    public packagename: string;
}