import { sys } from "cc";
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";
import { IOSApiComponent } from "./IOSApiComponent";

@CocosDecorators.SystemRegister()
export class IOSApiComponentAwakeSystem extends AwakeSystem<IOSApiComponent>{
    constructor() {
        super(IOSApiComponent)
    }

    awake(self: IOSApiComponent) {
        IOSApiComponent.instance = self;
    }
}

export class IOSApiComponentSystem {
    /**
     * 登录
     */
    public static login() {
        if (sys.isNative) {
            if (sys.os == sys.OS.IOS) {
                let className = "AppController";
                let methodName = "signInWithApple";
                jsb.reflection.callStaticMethod(className, methodName, null);
            }
        }
    }
}