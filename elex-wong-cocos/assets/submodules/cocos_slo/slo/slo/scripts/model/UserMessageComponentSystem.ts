import { MessageComponentSystem } from "../../../../../cocos.framework/module/message/MessageComponentSystem";
import { AuthType, InnerAuthData, TokenSignData } from "../../../../../sharing.base/protocols/AuthProtocolConst";
import { AnswerResponse } from "../../../../../sharing.base/protocols/ProtocolConst";
import { gate_client_auth_Req, gate_client_auth_Res, UserInfo } from "../../../../../sharing.protocol/protocols/http/gate.client.auth";
import { GlobalComponentSystem } from "../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { httpRoutes } from "../../../../../sharing.protocol/protocols/http.routes";
import { OK } from "../../../../../sharing.base/consts";
import { VM } from "../../../../../cocos.framework/components/mvvm/ViewModel";
import { UserModel } from "./UserModel";
import { wsPushRoutes } from "../../../../../sharing.protocol/protocols/ws.push.routes";
import { NetworkManagerComponentSystem } from "../../../../../cocos.framework/module/network/NetworkManagerComponentSystem";
import { connector_clientHandler_c_getPlayerState_Res_data } from "../../../../../sharing.protocol/protocols/ws/connector/connector.clientHandler.c_getPlayerState";
import { CocosDecorators } from "../../../../../cocos.framework/CocosDecorators";
import { DestroySystem } from "../../../../../sharing.base/core/object/IDestroySystem";
import { AwakeSystem } from "../../../../../sharing.base/core/object/IAwakeSystem";
import { ConfigurationComponentSystem } from "../../../../../cocos.framework/module/configuration/ConfigurationComponentSystem";
import { StorageConfigTable, SysTable } from "../../../../../cocos.framework/constants/Constants";
import { MD5 } from "../../../../../cocos.framework/helper/MD5";
import { RandomHelper, RandomStrType } from "../../../../../sharing.base/helper/RandomHelper";
import { CCHelper } from "../../../../../cocos.framework/helper/CCHelper";
import { MessageEventType } from "../../../../../cocos.framework/module/message/MessageComponent";
import { FunctionCaller } from "../../../../../sharing.base/helper/FunctionCaller";
import { Game } from "../../../../../sharing.base/core/entity/Game";
import { NetConnectOptions } from "../../../../../cocos.framework/module/network/NetworkComponent";
import { ProtocolHelper } from "../../../../../sharing.protocol/helper/ProtocolHelper";
import { EventGlobalComponentSystem } from "../../../../../cocos.framework/module/event/EventGlobalComponentSystem";
import { SubscibeEvent } from "../../../../../cocos.framework/SubscibeEvent";
import { ConfirmPopupOptions } from "../../../../../cocos.framework/ui/UIPopup/PopupConfirmComponent";
import { PopupManagerComponentSystem } from "../../../../../cocos.framework/ui/UIPopup/PopupManagerComponentSystem";
import { PopupCacheMode } from "../../../../../cocos.framework/ui/UIPopup/PopupManagerComponent";
import { connector_clientHandler_c_login_Req } from "../../../../../sharing.protocol/protocols/ws/connector/connector.clientHandler.c_login";
import { UISceneComponentSystem } from "../../../../../cocos.framework/module/scene/UISceneComponentSystem";
import { UserMessageComponent } from "./UserMessageComponent";
import { GlobalOptionsKey } from "../../../../../cocos.framework/module/global/GlobalComponent";
import { const_string_lang_model } from "../../../../../../scripts/config_getter/const_string_lang_model";
import { BrowserParamComponentSystem } from "../module/BrowserParamComponentSystem";
import { chess_clientHandler_s_pushExchangeRate } from "../../../../../sharing.protocol/protocols/ws/chess/chess.clientHandler.s_pushExchangeRate";
import { common_client_s_redDotChange } from "../../../../../sharing.protocol/protocols/ws/common/common.client.s_redDotChange";

@CocosDecorators.SystemRegister()
export class UserMessageComponentAwakeSystem extends AwakeSystem<UserMessageComponent> {
    constructor() {
        super(UserMessageComponent);
    }

    public awake(self: UserMessageComponent, loginUIEvent: any, loadingUIEvent: any, popupConfirmPrefabUrl: string, debufPrefabUrl: string, freeGamePrefabUrl: string) {
        UserMessageComponent.instance = self;
        self.loginUIEvent = loginUIEvent;
        self.loadingUIEvent = loadingUIEvent;
        self.popupConfirmPrefabUrl = popupConfirmPrefabUrl;
        self.debufPrefabUrl = debufPrefabUrl;
        self.freeGamePrefabUrl = freeGamePrefabUrl;
        UserMessageComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class UserMessageComponentDestroySystem extends DestroySystem<UserMessageComponent> {
    constructor() {
        super(UserMessageComponent);
    }

    destroy(self: UserMessageComponent) {
        UserMessageComponentSystem.offListener(self);
    }
}

export class UserMessageComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: UserMessageComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SubscibeEvent.ReqGetResource, callback: FunctionCaller.create(this.reqGetResource, this, self) },
            { name: SubscibeEvent.ReqUserLogout, callback: FunctionCaller.create(this.reqUserLogout, this, self) },
            { name: SubscibeEvent.ReqSyncPlayerInfo, callback: FunctionCaller.create(this.reqSyncPlayerInfo, this, self) },
            { name: SubscibeEvent.ReqGetPlayerState, callback: FunctionCaller.create(this.getPlayerState, this, self) },
        ]);
    }

    protected static listNetNotifications(self: UserMessageComponent): MessageEventType[] {
        return super.listNetNotifications(self).concat([
            { name: wsPushRoutes.common.client.push.s_playerInfoChange, callback: FunctionCaller.create(this.s_playerInfoChange, this, self) },
            { name: wsPushRoutes.common.client.push.s_playerStatusEventNotity, callback: FunctionCaller.create(this.s_playerStatusEventNotity, this, self) },
            { name: wsPushRoutes.common.client.push.s_redDotChange, callback: FunctionCaller.create(this.s_redDotChange, this, self) },
            { name: wsPushRoutes.chess.client.push.s_pushExchangeRate, callback: FunctionCaller.create(this.s_pushExchangeRate, this, self) },
        ]);
    }

    /**
     * 启动授权
     */
    public static async startAuth(retry: boolean = false) {
        let SysTable = ConfigurationComponentSystem.getData<SysTable>(StorageConfigTable.Sys);
        if (!SysTable || !SysTable.last_login_type) {
            //进入登录场景
            logger.info("===================== startAuth11");
            await Game.EventSystem.publish(UserMessageComponent.instance.loadingUIEvent);
            return;
        }

        if (!retry) {
            // 首次授权，显示加载页面
            await Game.EventSystem.publish(UserMessageComponent.instance.loadingUIEvent);
        }

        if (GlobalComponentSystem.envConfig.SupportLoginTypes.indexOf(SysTable.last_login_type) < 0) {
            // 用户确认后返回登录界面
            PopupManagerComponentSystem.show<ConfirmPopupOptions>(
                UserMessageComponent.instance.popupConfirmPrefabUrl,
                {
                    yesHandler: FunctionCaller.create(() => {
                        logger.info("yes");
                        //进入登录场景
                        Game.EventSystem.publish(UserMessageComponent.instance.loadingUIEvent);
                    }),
                    value: GlobalComponentSystem.getOptions<FunctionCaller>(GlobalOptionsKey.GetLabelValue).exec(const_string_lang_model.FIELDS.AUTH_NOT_SUPPORT_LOGIN_TYPE),
                },
                {
                    mode: PopupCacheMode.Frequent,
                }
            );

            return;
        }

        switch (SysTable.last_login_type) {
            case AuthType.Inner:
                await this.reqGuestLogin();
                break;
            case AuthType.TokenSignIn:
                await this.reqTokenLogin();
                break;
            default:
                break;
        }
    }

    /**
     * 游客登录
     */
    public static async reqGuestLogin(accountId?: string) {
        if (accountId) {
            let auth_data: InnerAuthData = {
                account_id: accountId,
                password: MD5(accountId),
                device_type: CCHelper.getDeviceType(),
                language: GlobalComponentSystem.inst.language,
            };
            let loginData: gate_client_auth_Req = {
                auth_type: AuthType.Inner,
                plat_id: {
                    plat_code: BrowserParamComponentSystem.getPlatCode(),
                },
                auth_data: auth_data,
            };

            await this.sendLoginRequest(loginData);

            ConfigurationComponentSystem.setData<number>(StorageConfigTable.Sys, AuthType.Inner, "last_login_type");
            ConfigurationComponentSystem.setData<string>(StorageConfigTable.Sys, accountId, "last_login_data");
        } else {
            accountId = ConfigurationComponentSystem.getData<string>(StorageConfigTable.Sys, "last_login_data");
            if (!accountId) {
                // 随机生成账号
                accountId = RandomHelper.randomString(10, RandomStrType.mix);
            }
            this.reqGuestLogin(accountId);
        }
    }

    /**
     * Agency Token 登录
     */
    public static async reqTokenLogin(token?: string) {
        if (token) {
            let auth_data: TokenSignData = {
                token: token,
                language: GlobalComponentSystem.inst.language,
            };
            let loginData: gate_client_auth_Req = {
                auth_type: AuthType.TokenSignIn,
                plat_id: {
                    plat_code: GlobalComponentSystem.envConfig.Platform,
                },
                auth_data: auth_data,
            };

            await this.sendLoginRequest(loginData);

            ConfigurationComponentSystem.setData<number>(StorageConfigTable.Sys, AuthType.Inner, "last_login_type");
            ConfigurationComponentSystem.setData<string>(StorageConfigTable.Sys, token, "last_login_data");
        } else {
            token = GlobalComponentSystem.getOptions(GlobalOptionsKey.Token);
            if (!token) {
                // TODO 原生获取设备SN
            }
            this.reqTokenLogin(token);
        }
    }

    /**
     * 获取资源
     */
    public static async reqGetResource() {
        let resp: AnswerResponse = {
            error: {
                code: OK,
                msg: "",
            },
            data: {},
        };
        try {
            resp = await NetworkManagerComponentSystem.httpPost(httpRoutes.resource.client.getStaticResource, {
                language: GlobalComponentSystem.inst.language,
            });

            GlobalComponentSystem.setResouces(resp.data);

            // let testData: ProtoGameListItem[] = [];
            // let category: number[] = [GAME_CATEGORY.POKER, GAME_CATEGORY.MJ, GAME_CATEGORY.MULTI, GAME_CATEGORY.ESPORTS, GAME_CATEGORY.NEW, GAME_CATEGORY.HOT];
            // let grade: number[] = [GAME_GRADE.COMMON, GAME_GRADE.DEV, GAME_GRADE.HOT, GAME_GRADE.MAINTENANCE, GAME_GRADE.NEW, GAME_GRADE.PLAYED, GAME_GRADE.RECOMMEND]
            // let gameIds = [
            //     "hbby",
            //     "bjl",
            //     "black",
            //     "brnn", "bsxxl", "csd", 'cygj', "dcpkq", "ddz", "erba",
            //     "erren", "forestparty", "gflower", "gghz", "goldenshark", "gswz",
            //     "hbjl", "hcpy", "hhdz", "hhmf", "hlddz", "hlzjh", "holdem", "hyf", "jsgflower", "jssc", "ksznn",
            //     // "lh", "lznn", "mpnn", "pdk", "qzpj", "qzwxs",
            //     // "sang", "sdb", "sss", "sydht", "sydhtz", "syqznn", "syqzsg",
            //     // "sytbsg", "syxzdd", "szbrnn",
            //     // "tbnn", "thwj", "wrttz", "xlchq", "xzdd", "yydb",
            // ];

            // for (let gid of gameIds) {
            //     testData.push({
            //         /** 游戏名称 */
            //         gameName: 'aa',
            //         /** 游戏ID */
            //         gameId: gid,
            //         /** 是否使用游戏分组 */
            //         groupUse: 0,
            //         /** 分组ID */
            //         groupId: gid,
            //         /** 分组中包含游戏id */
            //         groupGameIds: [gid],
            //         /** 游戏分类 */
            //         category: Random.randArray(category),
            //         /** 游戏等级 */
            //         grade: Random.randArray(grade),
            //         /** 排序序号 */
            //         index: 0,
            //         /** 基础人数是否显示 */
            //         baseCountShow: 0,
            //         /** 在线人数 */
            //         onlineCount: Random.randRange(100, 5000)
            //     })
            // }

            // setInterval(() => {
            //     VM.get<UIModel>(UIModel.Name).$data.lobby.options.delay = Random.randRange(30, 200);
            // }, 15000);
            // VM.get<GlobalConfigModel>(GlobalConfigModel.Name).$data.gamelist = testData;
            // await ResManager.inst.loadAssetConfig(GlobalComponentSystem.getResouces().game_ids, GlobalComponentSystem.inst.language, GlobalComponentSystem.inst.oem, GlobalComponentSystem.inst.style);
        } catch (err) {
            logger.error("reqGetResource error", err);
            resp = err;
        } finally {
            if (resp.error.code !== OK) {
                this.sendNotification(SubscibeEvent.SetCommonTopTipInfo, resp.error.msg);
            } else {
                this.sendResponseNotification(SubscibeEvent.ReqGetResource, resp);
            }
        }
    }

    /**
     * 用户注销
     * @param reqData
     */
    public static async reqUserLogout(reqData: any) {}

    /**
     * 获取玩家游戏状态
     */
    public static async getPlayerState() {
        const resp = await NetworkManagerComponentSystem.send({}, wsPushRoutes.connector.client.request.c_getPlayerState);
        if (resp.error.code !== OK) {
            this.sendNotification(SubscibeEvent.SetCommonTopTipInfo, resp.error.msg);
            return;
        }
        VM.get<UserModel>(UserModel.name).$data.state = resp.data;
        this.sendResponseNotification(SubscibeEvent.ReqGetPlayerState, VM.get<UserModel>(UserModel.name).$data.state);
    }

    /**
     * 同步玩家基本信息
     */
    public static async reqSyncPlayerInfo(reqData: any) {
        let resp: AnswerResponse = null;
        try {
            resp = await NetworkManagerComponentSystem.httpPost("Global.appConfig.syncPlayerInfo", { token: VM.get<UserModel>(UserModel.name).$data.base.token });
            if (resp.error.code !== OK) {
                throw resp;
            }
            let data: gate_client_auth_Res = resp.data;
            VM.get<UserModel>(UserModel.name).$data.base = data.user_info;
        } catch (err) {
            logger.error("GlobalMsgProxy reqSyncPlayerInfo fail error", err);
            resp = err;
        } finally {
            if (resp.error.code !== OK) {
                this.sendNotification(SubscibeEvent.SetCommonTopTipInfo, resp.error.msg);
            } else {
                this.sendResponseNotification(SubscibeEvent.ReqSyncPlayerInfo, resp);
            }
        }
    }

    /**
     * 玩家信息变化变化
     */
    private static s_playerInfoChange(self: UserMessageComponent, data: any) {
        logger.info("s_playerInfoChange data=", data);
    }

    /**
     * 玩家状态变化
     */
    private static s_playerStatusEventNotity(self: UserMessageComponent, data: any) {
        logger.info("s_playerInfoChange data=", data);
    }

    /**
     * 红点更新
     */
    private static s_redDotChange(self: UserMessageComponent, data: common_client_s_redDotChange) {
        logger.info("s_redDotChange data=", data);
    }

    /**
     * 币汇率更新
     */
    private static s_pushExchangeRate(self: UserMessageComponent, data: chess_clientHandler_s_pushExchangeRate) {
        logger.info("s_pushExchangeRate data=", data);
    }

    /**
     * 抢占登录
     * @param data 数据
     */
    private static s_robLogin(self: UserMessageComponent, data: any) {
        logger.info("pushRobLogin data=", data);
    }

    /**
     * 获取用户基本信息
     */
    public static getPlayerVO(): UserInfo {
        return VM.get<UserModel>(UserModel.name).$data.base;
    }

    private static async sendLoginRequest(loginData: gate_client_auth_Req) {
        NetworkManagerComponentSystem.httpPost(
            httpRoutes.gate.client.auth,
            loginData,
            FunctionCaller.create((resp) => {
                if (resp.error.code !== OK) {
                    ConfigurationComponentSystem.delData<any>(StorageConfigTable.Sys, "last_login_data");
                    logger.error("Login auth fail error=", resp.error);

                    // 用户确认后返回登录界面
                    PopupManagerComponentSystem.show<ConfirmPopupOptions>(
                        UserMessageComponent.instance.popupConfirmPrefabUrl,
                        {
                            yesHandler: FunctionCaller.create(() => {
                                logger.info("yes");
                                //进入登录场景
                                EventGlobalComponentSystem.emit(SubscibeEvent.LoginFail);
                            }),
                            value: resp.error.msg,
                        },
                        {
                            mode: PopupCacheMode.Frequent,
                        }
                    );
                    return;
                }

                let data = resp.data as gate_client_auth_Res;
                let options: NetConnectOptions = {
                    url: data.connect_info.connector,
                    netCmds: ProtocolHelper.getPushCmds(wsPushRoutes),
                    autoReconnect: 3,
                };

                VM.get<UserModel>(UserModel.name).$data.base = data.user_info;
                VM.get<UserModel>(UserModel.name).$data.connect = data.connect_info;

                logger.info("Login auth ok resp=", resp);
                let netNode = NetworkManagerComponentSystem.getNetNode();
                netNode.connectedCallback = FunctionCaller.create(this.serverConected, this);
                netNode.failedCallback = FunctionCaller.create(this.serverConnectFailed, this);
                netNode.disconnectCallback = FunctionCaller.create(this.serverDisconnect, this);
                // 建立长连接
                NetworkManagerComponentSystem.connect(options);
            }, this),
            true
        );
    }

    private static async serverConected(checked: FunctionCaller) {
        let msg: connector_clientHandler_c_login_Req = {
            token: VM.get<UserModel>(UserModel.name).$data.base.token,
        };

        let resp = await this.requestAsync(wsPushRoutes.connector.client.request.c_login, msg, false, true);
        if (resp.error.code !== OK) {
            NetworkManagerComponentSystem.disconnect();
            // 用户确认后返回登录界面
            PopupManagerComponentSystem.show<ConfirmPopupOptions>(
                UserMessageComponent.instance.popupConfirmPrefabUrl,
                {
                    yesHandler: FunctionCaller.create(() => {
                        logger.info("yes");
                        //进入登录场景
                        EventGlobalComponentSystem.emit(SubscibeEvent.LoginFail);
                    }),
                    value: resp.error.msg,
                },
                {
                    mode: PopupCacheMode.Frequent,
                }
            );

            return;
        }
        checked.exec();
        NetworkManagerComponentSystem.notify({}, wsPushRoutes.chess.client.notify.n_triggerUpdate);
        EventGlobalComponentSystem.emit(SubscibeEvent.LoginSuccess);
    }

    private static serverConnectFailed() {
        NetworkManagerComponentSystem.disconnect();
        // 用户确认后返回登录界面
        PopupManagerComponentSystem.show<ConfirmPopupOptions>(
            UserMessageComponent.instance.popupConfirmPrefabUrl,
            {
                yesHandler: FunctionCaller.create(() => {
                    logger.info("yes");
                    //进入登录场景
                    EventGlobalComponentSystem.emit(SubscibeEvent.LoginFail);
                }),
                value: "网络连接错误",
            },
            {
                mode: PopupCacheMode.Frequent,
            }
        );
    }

    private static serverDisconnect() {
        NetworkManagerComponentSystem.disconnect();
        // 连接断开，用户确认后返回登录界面
        PopupManagerComponentSystem.show<ConfirmPopupOptions>(
            UserMessageComponent.instance.popupConfirmPrefabUrl,
            {
                yesHandler: FunctionCaller.create(() => {
                    logger.info("disconnect");
                    Game.EventSystem.publish(UserMessageComponent.instance.loginUIEvent);
                    // 销毁当前所处的UIScene;
                    UISceneComponentSystem.remove();
                }),
                value: "网络连接断开,请重新登录",
            },
            {
                mode: PopupCacheMode.Frequent,
            }
        );
    }
}
