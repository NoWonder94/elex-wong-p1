import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { AnswerResponse } from '../../../sharing.base/protocols/ProtocolConst';
import { IProtocolHelper, ISocket, NetCmd, NetData, NetworkTip } from './NetInterface';
import { NetConnectOptions, NetNodeState, NetTipsType, NetworkComponent } from './NetworkComponent';
import { EventComponent } from '../../../sharing.base/service/event/EventComponent';
import { EventComponentSystem } from '../../../sharing.base/service/event/EventComponentSystem';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import HTTP from './HTTP';
import { CocosDecorators } from '../../CocosDecorators';
import { UIHelper } from '../../ui/UIHelper';
import { SceneHelper } from '../../../sharing.base/core/scene/SceneHelper';
import { UIType } from '../../ui/UIType';
import { EventType } from '../../EventType';
import { UINetworkTipComponent } from '../../ui/UINetworkTip/UINetworkTipComponent';
import { UINetworkTipComponentSystem } from '../../ui/UINetworkTip/UINetworkTipComponentSystem';
/*
 *   CocosCreator网络节点基类，以及网络相关接口定义
 *   1. 网络连接、断开、请求发送、数据接收等基础功能
 *   2. 心跳机制
 *   3. 断线重连 + 请求重发
 *   4. 调用网络屏蔽层
 *   5. 请求超时（TODO）
 */
@CocosDecorators.SystemRegister()
export class NetworkComponentAwakeSystem extends AwakeSystem<NetworkComponent> {
    constructor() {
        super(NetworkComponent);
    }

    awake(self: NetworkComponent, http: HTTP, socket: ISocket, protocol: IProtocolHelper, networkTip: NetworkTip) {
        self.eventEventComponent = self.addComponent(EventComponent);
        self.http = http;
        NetworkComponentSystem.awake(self, socket, protocol, networkTip);
    }
}

export class NetworkComponentSystem {
    /********************** 网络相关处理 *********************/
    public static async awake(self: NetworkComponent, socket: ISocket, protocol: IProtocolHelper, networkTip: NetworkTip) {
        console.log(`NetworkComponentSystem awake socket`);
        self.socket = socket;
        self.protocolHelper = protocol;

        if (networkTip) {
            let CLASS = networkTip.CLASS || UINetworkTipComponent;
            let ui = await UIHelper.create(SceneHelper.domainScene(self), UIType.UINetworkTip, new EventType.UINetworkTipCreate(SceneHelper.domainScene(self), networkTip.prefabUrl, CLASS));
            self.tips = ui.getComponent(CLASS);
        }
    }

    public static connect(self: NetworkComponent, options: NetConnectOptions): boolean {
        if (self.socket && self.state == NetNodeState.Closed) {
            if (!self.isSocketInit) {
                this.initSocket(self);
            }
            self.state = NetNodeState.Connecting;
            if (!self.socket.connect(options)) {
                this.updateNetTips(self, NetTipsType.Connecting, false);
                return false;
            }
            if (self.connectOptions == null && typeof options.autoReconnect == 'number') {
                self.autoReconnect = options.autoReconnect;
            }
            self.connectOptions = options;
            this.updateNetTips(self, NetTipsType.Connecting, true);
            return true;
        }
        return false;
    }

    protected static initSocket(self: NetworkComponent) {
        if (self.socket) {
            self.socket.onConnected = (event) => {
                this.onConnected(self, event);
            };
            self.socket.onMessage = (msg) => {
                this.onMessage(self, msg);
            };
            self.socket.onError = (event) => {
                this.onError(self, event);
            };
            self.socket.onClosed = (event) => {
                this.onClosed(self, event);
            };
            self.isSocketInit = true;
        }
    }

    protected static updateNetTips(self: NetworkComponent, tipsType: NetTipsType, isShow: boolean) {
        if (self.tips) {
            if (tipsType == NetTipsType.Requesting) {
                UINetworkTipComponentSystem.requestTips(self.tips, isShow);
            } else if (tipsType == NetTipsType.Connecting) {
                UINetworkTipComponentSystem.connectTips(self.tips, isShow);
            } else if (tipsType == NetTipsType.ReConnecting) {
                UINetworkTipComponentSystem.reconnectTips(self.tips, isShow);
            }
        }
    }

    // 网络连接成功
    protected static onConnected(self: NetworkComponent, event: any) {
        this.listenAllMsg(self);
        console.log('NetNode onConnected!');
        self.isSocketOpen = true;
        // 如果设置了鉴权回调，在连接完成后进入鉴权阶段，等待鉴权结束
        if (self.connectedCallback !== null) {
            self.state = NetNodeState.Checking;
            self.connectedCallback.exec(
                FunctionCaller.create(() => {
                    this.onChecked(self);
                }, this)
            );
        } else {
            this.onChecked(self);
        }
        console.log('NetNode onConnected! state =' + self.state);
    }

    protected static listenAllMsg(self: NetworkComponent) {
        for (let cmd of self.connectOptions.netCmds) {
            self.socket.on(cmd);
        }
    }

    // 连接验证成功，进入工作状态
    protected static onChecked(self: NetworkComponent) {
        console.log('NetNode onChecked!');
        self.state = NetNodeState.Working;
        // 关闭连接或重连中的状态显示
        this.updateNetTips(self, NetTipsType.Connecting, false);
        this.updateNetTips(self, NetTipsType.ReConnecting, false);
        self.isReconnect = false;

        // 重发待发送信息
        console.log(`NetNode flush ${self.requests.length} request`);
        if (self.requests.length > 0) {
            for (var i = 0; i < self.requests.length;) {
                let req = self.requests[i];
                self.socket!.send(req.buffer, req.rspCmd);
                if (req.rspObject == null || req.rspCmd <= 0) {
                    self.requests.splice(i, 1);
                } else {
                    ++i;
                }
            }
            // 如果还有等待返回的请求，启动网络请求层
            this.updateNetTips(self, NetTipsType.Requesting, this.request.length > 0);
        }
    }

    // 接收到一个完整的消息包
    protected static onMessage(self: NetworkComponent, resp: any): void {
        // console.log(`NetNode onMessage status = ` + this._state);
        // 进行头部的校验（实际包长与头部长度是否匹配）
        if (!self.protocolHelper!.checkPackage(resp)) {
            console.error(`NetNode checkHead Error`);
            return;
        }
        // 接受到数据，重新定时收数据计时器
        this.resetReceiveMsgTimer(self);
        // 重置心跳包发送器
        this.resetHearbeatTimer(self);
        // 触发消息执行
        let rspCmd = self.protocolHelper!.getPackageId(resp);
        console.log(`NetNode onMessage rspCmd = ` + rspCmd);
        // 优先触发request队列
        if (self.requests.length > 0) {
            for (let reqIdx in self.requests) {
                let req = self.requests[reqIdx];
                if (req.rspCmd == rspCmd && req.rspObject) {
                    console.log(`NetNode execute request rspcmd ${rspCmd}`);
                    req.rspObject!.exec(resp.msg);
                    self.requests.splice(parseInt(reqIdx), 1);
                    break;
                }
            }
            console.log(`NetNode still has ${self.requests.length} request watting`);
            if (self.requests.length == 0) {
                this.updateNetTips(self, NetTipsType.Requesting, false);
            }
        }

        logger.info('收到网络消息', rspCmd, JSON.stringify(resp.msg));

        EventComponentSystem.emit(self.eventEventComponent, rspCmd as string, resp.msg);
    }

    protected static onError(self: NetworkComponent, event: any) {
        console.error(event);
        console.log('NetNode onError!');
        if (self.isReconnect) {
            return;
        }

        self.failedCallback && self.failedCallback.exec();
    }

    protected static onClosed(self: NetworkComponent, event: any) {
        this.clearTimer(self);

        // 执行断线回调，返回false表示不进行重连
        // if (self.disconnectCallback && !self.disconnectCallback()) {
        //     console.log(`disconnect return!`)
        //     return;
        // }

        // 自动重连
        if (this.isAutoReconnect(self)) {
            this.updateNetTips(self, NetTipsType.ReConnecting, true);
            self.reconnectTimer = setTimeout(() => {
                self.socket!.close();
                self.state = NetNodeState.Closed;
                self.isReconnect = true;
                this.connect(self, self.connectOptions!);
                if (self.autoReconnect > 0) {
                    self.autoReconnect -= 1;
                }
            }, self.reconnetTimeOut);
        } else {
            self.state = NetNodeState.Closed;
            self.disconnectCallback && self.disconnectCallback.exec();
        }
    }

    public static close(self: NetworkComponent, code?: number, reason?: string) {
        this.clearTimer(self);
        // EventComponentSystem.removeAll(self.eventEventComponent);
        self.requests.length = 0;
        if (self.tips) {
            UINetworkTipComponentSystem.requestTips(self.tips, false);
            UINetworkTipComponentSystem.connectTips(self.tips, false);
            UINetworkTipComponentSystem.reconnectTips(self.tips, false);
        }
        if (self.socket) {
            self.socket.close(code, reason);
        }
        self.state = NetNodeState.Closed;
    }

    // 只是关闭Socket套接字（仍然重用缓存与当前状态）
    public static closeSocket(self: NetworkComponent, code?: number, reason?: string) {
        if (self.socket) {
            self.socket.close(code, reason);
        }
    }

    // 发起请求，如果当前处于重连中，进入缓存列表等待重连完成后发送
    public static async send(self: NetworkComponent, buf: NetData, cmd?: NetCmd, force: boolean = false): Promise<AnswerResponse> {
        if (self.state == NetNodeState.Working || force) {
            return await self.socket!.send(buf, cmd);
        } else if (self.state == NetNodeState.Checking || self.state == NetNodeState.Connecting) {
            self.requests.push({
                buffer: buf,
                rspCmd: cmd,
                rspObject: null,
            });
            console.log('NetNode socket is busy, push to send buffer, current state is ' + self.state);
        } else {
            console.error('NetNode request error! current state is ' + self.state);
        }
    }

    // 发起请求，如果当前处于重连中，进入缓存列表等待重连完成后发送
    public static async notify(self: NetworkComponent, buf: NetData, cmd?: NetCmd) {
        if (self.state == NetNodeState.Working) {
            console.log(`socket notify ...`);
            self.socket!.notify(buf, cmd);
        }
    }

    public static async httpPost(self: NetworkComponent, url: string, params: any, rspObject?: FunctionCaller, showTips: boolean = true, headers: any = {}, timeout: number = 5000) {
        if (!rspObject) {
            return await self.http.post(url, params, null, headers, timeout);
        }

        self.http.post(
            url,
            params,
            FunctionCaller.create((msg) => {
                this.onMessage(self, { cmd: url, msg });
            }, this),
            headers,
            timeout
        );

        // 进入发送缓存列表
        self.requests.push({
            buffer: params,
            rspCmd: url,
            rspObject,
        });

        // 启动网络请求层
        if (showTips) {
            this.updateNetTips(self, NetTipsType.Requesting, true);
        }
    }

    // 发起请求，并进入缓存列表
    public static request(self: NetworkComponent, buf: NetData, rspCmd: NetCmd, rspObject: FunctionCaller, showTips: boolean = true, force: boolean = false) {
        if (self.state == NetNodeState.Working || force) {
            self.socket!.send(
                buf,
                rspCmd,
                (msg) => {
                    this.onMessage(self, { cmd: rspCmd, msg });
                },
                this
            );
        }
        console.log(`NetNode request with timeout for ${rspCmd}`);
        // 进入发送缓存列表
        self.requests.push({
            buffer: buf,
            rspCmd,
            rspObject,
        });
        // 启动网络请求层
        if (showTips) {
            this.updateNetTips(self, NetTipsType.Requesting, true);
        }
    }

    // 唯一request，确保没有同一响应的请求（避免一个请求重复发送，netTips界面的屏蔽也是一个好的方法）
    public static requestUnique(self: NetworkComponent, buf: NetData, rspCmd: NetCmd, rspObject: FunctionCaller, showTips: boolean = true, force: boolean = false): boolean {
        for (let i = 0; i < self.requests.length; ++i) {
            if (self.requests[i].rspCmd == rspCmd) {
                console.log(`NetNode requestUnique faile for ${rspCmd}`);
                return false;
            }
        }
        this.request(self, buf, rspCmd, rspObject, showTips, force);
        return true;
    }

    /********************** 心跳、超时相关处理 *********************/
    protected static resetReceiveMsgTimer(self: NetworkComponent) {
        if (self.receiveMsgTimer !== null) {
            clearTimeout(self.receiveMsgTimer);
        }

        self.receiveMsgTimer = setTimeout(() => {
            logger.warn('NetNode recvieMsgTimer close socket!');
            self.socket!.close();
        }, self.receiveTime);
    }

    protected static resetHearbeatTimer(self: NetworkComponent) {
        if (self.keepAliveTimer !== null) {
            clearTimeout(self.keepAliveTimer);
        }

        self.keepAliveTimer = setTimeout(() => {
            if (self.protocolHelper!.getHearbeat()) {
                this.send(self, self.protocolHelper!.getHearbeat());
                logger.debug('NetNode keepAliveTimer send Hearbeat');
            }
        }, self.heartTime);
    }

    protected static clearTimer(self: NetworkComponent) {
        if (self.receiveMsgTimer !== null) {
            clearTimeout(self.receiveMsgTimer);
        }
        if (self.keepAliveTimer !== null) {
            clearTimeout(self.keepAliveTimer);
        }
        if (self.reconnectTimer !== null) {
            clearTimeout(self.reconnectTimer);
        }
    }

    public static isAutoReconnect(self: NetworkComponent) {
        return self.autoReconnect != 0;
    }

    public static rejectReconnect(self: NetworkComponent) {
        self.autoReconnect = 0;
        this.clearTimer(self);
    }
}
