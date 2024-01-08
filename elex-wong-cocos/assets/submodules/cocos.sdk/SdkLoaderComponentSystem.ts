import { AwakeSystem } from "../sharing.base/core/object/IAwakeSystem";
import { FaceBookApiComponent } from "./module/auth/FaceBookApiComponent";
import { SceneHelper } from "../sharing.base/core/scene/SceneHelper";
import { IOSApiComponent } from "./module/auth/IOSApiComponent";
import { GlobalComponentSystem } from '../cocos.framework/module/global/GlobalComponentSystem';
import { AuthType } from "../sharing.base/protocols/AuthProtocolConst";
import { SdkLoaderComponent } from "./SdkLoaderComponent";
import { CocosDecorators } from "../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class SdkLoaderComponentAwakeSystem extends AwakeSystem<SdkLoaderComponent> {

    constructor() {
        super(SdkLoaderComponent)
    }

    awake(self: SdkLoaderComponent) {
        SdkLoaderComponent.instance = self;
        this.loadAuthComponent();
        this.loadPayComponent();
    }

    private loadAuthComponent() {
        for (let type of GlobalComponentSystem.envConfig.SupportLoginTypes) {
            switch (type) {
                case AuthType.WeChat:
                    break;
                case AuthType.Facebook:
                    SceneHelper.domainScene(SdkLoaderComponent.instance).addComponent(FaceBookApiComponent, GlobalComponentSystem.envConfig.Packagename);
                    break;
                case AuthType.AppleSign:
                    SceneHelper.domainScene(SdkLoaderComponent.instance).addComponent(IOSApiComponent);
                    break;
                case AuthType.Inner:
                    break;
                case AuthType.GoogleSignIn:
                    break;
            }
        }
    }

    private loadPayComponent() {

    }
}

export class SdkLoaderComponentSystem {

}