import { CocosDecorators } from "../../../../../cocos.framework/CocosDecorators";
import { MessageComponent } from "../../../../../cocos.framework/module/message/MessageComponent";

@CocosDecorators.ClassNameRegister("UserMessageComponent")
export class UserMessageComponent extends MessageComponent {
    public static instance: UserMessageComponent;
    public loginUIEvent: any;
    public loadingUIEvent: any;
    public popupConfirmPrefabUrl: string;
    public debufPrefabUrl: string;
    public freeGamePrefabUrl: string;
}
