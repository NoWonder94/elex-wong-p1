import { VM } from "../../../../../cocos.framework/components/mvvm/ViewModel";
import { connector_clientHandler_c_getPlayerState_Res_data } from "../../../../../sharing.protocol/protocols/ws/connector/connector.clientHandler.c_getPlayerState";
import { ConnectInfo, UserInfo } from "../../../../../sharing.protocol/protocols/http/gate.client.auth";
import { GamePlayway } from "../../../../../sharing.base/constants/GameBaseConst";
import { PlayerState, SEX } from "../../../../../sharing.base/constants/PlayerBaseConst";
import { NONE } from "../../../../../sharing.base/consts";
import { CocosDecorators } from "../../../../../cocos.framework/CocosDecorators";

@CocosDecorators.ClassNameRegister("user")
export class UserModel {
    /** 玩家基础信息 */
    base: UserInfo = {
        /**
         * 用户id
         */
        id: 0,
        /**
         * 昵称
         */
        nickname: NONE,
        /**
         * 性别
         */
        sex: SEX.SECRET,
        /**
         * 头像
         */
        avatar: NONE,
        /**
         * 国家编码
         */
        country_code: "CN",
        /**
         * 币余额
         */
        coins: [
            {
                code: 'xx',
                quantity: 0
            }
        ],
        coin_used: NONE,
        /**
         * 金币
         */
        gold: 15000,
    };

    /** 玩家游戏状态 */
    state: connector_clientHandler_c_getPlayerState_Res_data = {
        /** 游戏状态(gameState) */
        state: PlayerState.Online,
        /** 游戏房间类型（roomType） */
        roomType: GamePlayway.None,
        /** 游戏id(gameId) */
        gameId: NONE,
        /** 场景id(sceneId) */
        sceneId: 0,
        /** 房间id(roomId) */
        targetId: 0,
    };

    /** 连接信息 */
    connect: ConnectInfo = {
        /**
         * 服务器版本
         */
        version: "0.0.0",
        /**
         * 连接服务器
         */
        connector: NONE,
    };
}

VM.add(new UserModel(), UserModel.name);
