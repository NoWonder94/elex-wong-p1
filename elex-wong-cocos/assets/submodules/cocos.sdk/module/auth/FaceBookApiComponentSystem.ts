import { sys } from "cc";
import NativeCallHelper from "../../helper/NativeCallHelper";
import { SHARE_TYPE, FaceBookApiComponent } from './FaceBookApiComponent';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class FaceBookApiComponentAwakeSystem extends AwakeSystem<FaceBookApiComponent>{
    constructor() {
        super(FaceBookApiComponent)
    }

    awake(self: FaceBookApiComponent, packagename: string) {
        FaceBookApiComponent.instance = self;
        self.packagename = packagename.replace(/\./g, '/');

    }
}

export class FaceBookApiComponentSystem {
    /**
     * 登录
     */
    public static login() {
        if (sys.isNative) {
            if (sys.os == sys.OS.ANDROID) {
                let className = `${FaceBookApiComponent.instance.packagename}/facebook/FacebookApp`;
                let methodName = "facebookLogin";
                let methodSignature = "()V";

                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            } else if (sys.os == sys.OS.IOS) {
                let className = "FacebookApp";
                let methodName = "facebookLogin";
                jsb.reflection.callStaticMethod(className, methodName, null);
            }
        }
    }


    /**
     * 获取授权Token
     * @returns string
     */
    public static getLastAccessToken() {
        let className = `com/game/livepoker/FacebookApp1`;
        // let methodName = "getLastAccessToken";
        let methodName = "facebookLogin";
        // let methodSiglture = "()Ljava/lang/String;";
        // let methodSiglture = "()Ljava/lang/String;";
        let methodSignature = "()V";
        logger.info('================================= getLastAccessToken className = ', className, methodName);
        let res = jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        logger.info('res=', res);
        return;



        if (sys.os == sys.OS.ANDROID) {
            let className = `${FaceBookApiComponent.instance.packagename}/facebook/FacebookApp`;
            let methodName = "getLastAccessToken";
            logger.info('================================= getLastAccessToken className = ', className, methodName);
            return NativeCallHelper.send2NativeByReturn(className, methodName);
        } else if (sys.os == sys.OS.IOS) {
            let className = "FacebookApp";
            let methodName = "getLastAccessToken";
            return NativeCallHelper.send2NativeByReturn(className, methodName);
        }
        return null;
    }

    /**
     * 登出
     */
    public static logout() {
        if (sys.isNative) {
            if (sys.os == sys.OS.ANDROID) {
                let className = `${FaceBookApiComponent.instance.packagename}/facebook/FacebookApp`;
                let methodName = "facebookLogout";
                let methodSignature = "()V";
                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            } else if (sys.os == sys.OS.IOS) {
                let className = "FacebookApp";
                let methodName = "facebookLogout";
                jsb.reflection.callStaticMethod(className, methodName, null);
            }
        }
    }

    /**
     * 分享
     * @param shareType 分享类型 SHARE_TYPE
     * @param shareUrl 分享链接
     * @param imgPath 图片路径
     * @example
     * Facebook.share(Facebook.SHARE_TYPE.LINK, 'https://www.cocos.com/', '');
     */
    public static share(shareType: SHARE_TYPE, shareUrl: string, imgPath: string) {
        let data = {
            shareType: shareType,
            shareUrl: shareUrl,
            imgPath: imgPath
        };
        let shareInfo = JSON.stringify(data);

        if (sys.isNative) {
            if (sys.os == sys.OS.ANDROID) {
                let className = `${FaceBookApiComponent.instance.packagename}/facebook/FacebookApp`;
                let methodName = "facebookShare";
                let methodSignature = "(Ljava/lang/String;)V";
                jsb.reflection.callStaticMethod(className, methodName, methodSignature, shareInfo);
            } else if (sys.os == sys.OS.IOS) {
                let className = "FacebookApp";
                let methodName = "facebookShare:";
                jsb.reflection.callStaticMethod(className, methodName, shareInfo);
            }
        } else {
            window['onFacebookShareSuccess']('test');
        }
    }
}