import { MessageComponentSystem } from "../../../../../cocos.framework/module/message/MessageComponentSystem";
import { CocosDecorators } from "../../../../../cocos.framework/CocosDecorators";
import { DestroySystem } from "../../../../../sharing.base/core/object/IDestroySystem";
import { SloMessageComponent } from "./SloMessageComponent";
import { AwakeSystem } from "../../../../../sharing.base/core/object/IAwakeSystem";
import { MessageComponent, MessageEventType } from "../../../../../cocos.framework/module/message/MessageComponent";
import { SloSubscibeEvent } from "../SloSubscibeEvent";
import { FunctionCaller } from "../../../../../sharing.base/helper/FunctionCaller";
import { game_sloHandler_c_spin_Req } from "../../../../../sharing.protocol/protocols/ws/game/slo/game.sloHandler.c_spin";
import { SpinType } from "../../../../../sharing.protocol/games/slo/SloConst";
import { wsPushRoutes } from "../../../../../sharing.protocol/protocols/ws.push.routes";
import { SubscibeEvent } from "../../../../../cocos.framework/SubscibeEvent";
import { BOOLEAN, OK, SCENE_ID } from "../../../../../sharing.base/consts";
import { chess_clientHandler_c_enterMatch_Req } from "../../../../../sharing.protocol/protocols/ws/chess/chess.clientHandler.c_enterMatch";
import { GameId } from "../../../../../sharing.base/gameplugins";
import { GAME_MATCH_TYPE } from "../../../../../sharing.base/constants/GameBaseConst";
import { game_sloHandler_s_pushGameSceneConfig } from "../../../../../sharing.protocol/protocols/ws/game/slo/game.sloHandler.s_pushGameSceneConfig";
import { VM } from "../../../../../cocos.framework/components/mvvm/ViewModel";
import { SloModel } from "../ui/UISlo/SloModel";
import { Game } from "../../../../../sharing.base/core/entity/Game";
import { EventType } from "../../../../../cocos.framework/EventType";
import { SceneHelper } from "../../../../../sharing.base/core/scene/SceneHelper";

@CocosDecorators.SystemRegister()
export class SloUILoginComponentAwakeSystem extends AwakeSystem<SloMessageComponent> {
    constructor() {
        super(SloMessageComponent);
    }

    public awake(self: SloMessageComponent) {
        SloMessageComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class SloMessageComponentDestroySystem extends DestroySystem<SloMessageComponent> {
    constructor() {
        super(SloMessageComponent);
    }

    destroy(self: SloMessageComponent) {
        SloMessageComponentSystem.offListener(self);
    }
}

export default class SloMessageComponentSystem extends MessageComponentSystem {
    public static listLocalNotifications(self: SloMessageComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SloSubscibeEvent.ReqGetSpinResult, callback: FunctionCaller.create(this.reqGetSpinResult, this, self) },
            { name: SloSubscibeEvent.ReqEnterGame, callback: FunctionCaller.create(this.reqEnterGame, this, self) },
        ]);
    }

    public static listNetNotifications(self: SloMessageComponent): MessageEventType[] {
        return super.listNetNotifications(self).concat([{ name: wsPushRoutes.game.slo.push.s_pushGameSceneConfig, callback: FunctionCaller.create(this.s_pushGameSceneConfig, this, self) }]);
    }

    protected static s_pushGameSceneConfig(self: SloMessageComponent, data: game_sloHandler_s_pushGameSceneConfig) {
        self.gameSceneConfig = data;
        this.sendNotification(SloSubscibeEvent.StartupGame);
    }

    /**
     * 进入游戏
     * @param reqData
     */
    public static async reqEnterGame(self: SloMessageComponent, gameId: GameId, sceneId: SCENE_ID) {
        self.gameId = gameId;
        self.sceneId = sceneId;

        let msg: chess_clientHandler_c_enterMatch_Req = {
            gameId,
            sceneId,
            matchType: GAME_MATCH_TYPE.SLO,
        };

        // 加入游戏失败，tip
        await this.requestAsync(wsPushRoutes.chess.client.request.c_enterMatch, msg, true, true);
    }
    /**
     * 获取旋转结果
     * @param reqData
     */
    public static async reqGetSpinResult(self: SloMessageComponent) {
        let sloModel = VM.get<SloModel>(SloModel.name).$data;
        let msg: game_sloHandler_c_spin_Req = {
            type: sloModel.spin_type,
            coin: sloModel.use_coin_code,
            bet: sloModel.bet,
        };

        let resp = await this.requestAsync(wsPushRoutes.game.slo.request.c_spin, msg, false, true);
        if (!resp.data) {
            // 为获取到数据，停止旋转
            // 定制弹窗事件，返货等率或者大厅
            return;
        }
        this.sendResponseNotification(SloSubscibeEvent.ReqGetSpinResult, resp.data);
    }
}
