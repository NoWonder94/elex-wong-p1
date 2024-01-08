import { sys } from "cc";
import { version } from "../../../scripts/version";
import { EventGlobalComponentSystem } from '../../cocos.framework/module/event/EventGlobalComponentSystem';

export default class NativeCallHelper {
    public static map = new Map<number, Function>();

    public static sequnce: number = 1;
    public static doNativeMsg(jsonData: any) {
        logger.debug("收到原生层消息: " + jsonData.notify + "<" + JSON.stringify(jsonData));

        let callback = null;
        if (sys.os == sys.OS.IOS) {
            jsonData = JSON.parse(jsonData);
            callback = this.map.get(Number(jsonData.sequence));
        } else {
            callback = this.map.get(jsonData.sequence);
        }
        if (callback) {
            callback(jsonData);
        } else {
            if (jsonData.notify) {
                EventGlobalComponentSystem.emit(jsonData.notify, jsonData);
            }
        }
    }

    /**
     * 检测是否又权限
     * @param callback 
     */
    public static checkCameraPermission() {
        if (sys.os === sys.OS.ANDROID) {
            let className = `${version.PlatformConfig.Packagename}/AppActivity`;
            let methodName = "checkPermission";
            this.send2Native(className, methodName);
        } else if (sys.os === sys.OS.IOS) {
            let className = "AppController";
            let methodName = "checkPermission";
            this.send2Native(className, methodName);
        }
    }

    public static send2Native(className, methodName, callback?) {
        if (sys.os === sys.OS.IOS) {
            jsb.reflection.callStaticMethod(className, methodName, null);
        } else {
            let methodSiglture = "()V";
            jsb.reflection.callStaticMethod(className, methodName, methodSiglture);
        }

        if (callback) {
            this.map.set(this.sequnce, callback);
        }
        this.sequnce++;
    }

    public static send2NativeByReturn(className, methodName) {
        if (sys.os == sys.OS.IOS) {
            return jsb.reflection.callStaticMethod(className, methodName, null);
        }
        let methodSiglture = "()Ljava/lang/String;";
        return jsb.reflection.callStaticMethod(className, methodName, methodSiglture);
    }
}