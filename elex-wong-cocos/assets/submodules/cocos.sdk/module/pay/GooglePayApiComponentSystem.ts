import { sys } from "cc";
import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";
import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { GooglePayApiComponent } from "./GooglePayApiComponent";

@CocosDecorators.SystemRegister()
export class GooglePayApiComponentAwakeSystem extends AwakeSystem<GooglePayApiComponent>{
    constructor() {
        super(GooglePayApiComponent)
    }

    awake(self: GooglePayApiComponent, packagename: string) {
        GooglePayApiComponent.instance = self;
        self.packagename = packagename.replace(/\./g, '/');
        GooglePayApiComponentSystem.init(self);
    }
}

export class GooglePayApiComponentSystem {
    /**
     * 初始化
     */
    public static init(self: GooglePayApiComponent) {
        if (sys.isNative && sys.os == sys.OS.ANDROID) {
            let className = `${self.packagename}/google/GooglePayApp`;
            let methodName = "init";
            let singine = "()V";
            jsb.reflection.callStaticMethod(className, methodName, singine);
        }
    }

    /**
     * 购买
     * @param goodsId 商品id
     */
    public static buy(goodsId: string) {
        if (sys.isNative && sys.os == sys.OS.ANDROID) {
            let className = `${GooglePayApiComponent.instance.packagename}/google/GooglePlayManager`;
            let methodName = "purchase";
            let methodSiglture = "(Ljava/lang/String;)V";
            jsb.reflection.callStaticMethod(className, methodName, methodSiglture, goodsId);
        }
    }

    /**
     * 消耗购买
     * @param receipt 购买凭证
     */
    public static cost(receipt: string) {
        if (sys.isNative && sys.os == sys.OS.ANDROID) {
            let className = `${GooglePayApiComponent.instance.packagename}/google/GooglePlayManager`;
            let methodName = "Consume";
            let signle = "(Ljava/lang/String;)V"
            jsb.reflection.callStaticMethod(className, methodName, signle, receipt);
        }
    }
}