import { Label, Node, Sprite } from "cc";
import { SloUILoadingAdapterConfig } from "../../constants/SloUIAdapterConfig";
import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { MessageComponent } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { GAME_ID } from "../../../../../../sharing.base/consts";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";

@CocosDecorators.ClassNameRegister("SloUILoadingComponent")
export class SloUILoadingComponent extends MessageComponent {
    ClientVersion: Label;
    ServerVersion: Label;
    UILine: Node;
    Load: Node;
    Progress: Sprite;
    Status: Label;
    pageContent: Node;
    CheckBox: Node;
    uiconfig: DicObject<SloUILoadingAdapterConfig>;
    targetevent: any;
    isLogined: boolean = false;
    isLoaded: boolean = false;
    gameId: GAME_ID;
}
