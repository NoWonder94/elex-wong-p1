import { CocosDecorators } from "../../../../../cocos.framework/CocosDecorators";
import { MessageComponent } from "../../../../../cocos.framework/module/message/MessageComponent";
import { GAME_ID, SCENE_ID } from "../../../../../sharing.base/consts";
import { game_sloHandler_s_pushGameSceneConfig } from "../../../../../sharing.protocol/protocols/ws/game/slo/game.sloHandler.s_pushGameSceneConfig";

@CocosDecorators.ClassNameRegister('SloMessageComponent')
export class SloMessageComponent extends MessageComponent {
    public static instance: SloMessageComponent;
    /** 游戏id */
    gameId: GAME_ID;
    /** 场景id */
    sceneId: SCENE_ID;

    public gameSceneConfig: game_sloHandler_s_pushGameSceneConfig;
}