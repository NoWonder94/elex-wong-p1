import { sys } from "cc";
import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";
import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { IOSPayApiComponent } from "./IOSPayApiComponent";

@CocosDecorators.SystemRegister()
export class GooglePayApiComponentAwakeSystem extends AwakeSystem<IOSPayApiComponent>{
    constructor() {
        super(IOSPayApiComponent)
    }

    awake(self: IOSPayApiComponent, packagename: string) {
        IOSPayApiComponent.instance = self;
        IOSPayApiComponentSystem.init(self);
    }
}

export class IOSPayApiComponentSystem {
    /**
     * 初始化
     */
    public static init(self: IOSPayApiComponent) {
        if (sys.isNative && sys.os == sys.OS.IOS) {
            let className = "IAPApp";
            let methodName = "init";
            jsb.reflection.callStaticMethod(className, methodName, null);
        }
    }

    /**
     * 购买
     * @param goodsId 商品id
     */
    public static buy(goodsId: string) {
        if (sys.isNative && sys.os == sys.OS.IOS) {
            let className = "IAPApp";
            let methodName = "purchase:";
            jsb.reflection.callStaticMethod(className, methodName, goodsId);
        }
    }

    /**
     * 消耗购买
     * @param receipt 购买凭证
     */
    public static cost(receipt: string) {
        if (sys.isNative && sys.os == sys.OS.IOS) {
            let className = "IAPApp";
            let methodName = "consume:";
            jsb.reflection.callStaticMethod(className, methodName, receipt);
        }
    }

}