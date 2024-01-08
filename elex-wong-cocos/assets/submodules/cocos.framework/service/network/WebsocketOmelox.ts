import { AnswerResponse } from '../../../sharing.base/protocols/ProtocolConst';
import { IProtocolHelper, ISocket, MessageFunc, NetCmd, NetData } from './NetInterface';
import { NetConnectOptions } from './NetworkComponent';

// 默认字符串协议对象
export class OmeloxProtocol implements IProtocolHelper {
    getHeadlen(): number {
        return 0;
    }
    getHearbeat(): NetData {
        return null;
    }
    getPackageLen(msg: NetData): number {
        return msg.toString().length;
    }
    checkPackage(msg: NetData): boolean {
        return true;
    }
    getPackageId(msg: NetData): NetCmd {
        return msg.cmd;
    }
}

/** 网络事件定义 */
const OmeloxNetEvent = {
    /** 网络错误 */
    onIOError: 'onIOError',
    /** 网络断开 */
    onDisconnect: 'onDisconnect',
    /** 重连中 */
    onReconnecting: 'onReconnecting',
    /** 重连成功 */
    onReconnected: 'onReconnected',
    /** 重连失败 */
    onReconnectFail: 'onReconnectFail',
    /** 异地登录 */
    onKick: 'onKick',
}

export class WebsocketOmelox implements ISocket {
    /** websocket对象 */
    private ws: omelox.Client | null = new omelox.Client();

    onConnected = null;
    onMessage = null;
    onError = null;
    onClosed = null;

    constructor() {
        this.ws.on("onReconnecting", () => {
            logger.debug("重连中");
        })

        this.ws.on("onReconnected", () => {
            logger.debug("重连成功");
        })
        this.ws.on("onReconnectFail", () => {
            logger.debug("重连失败");
        })

        this.ws.on(OmeloxNetEvent.onIOError, () => {
            logger.debug("网络错误");
            this.onError();
        })

        this.ws.on(OmeloxNetEvent.onDisconnect, () => {
            logger.debug("Omelox disconnect");
            this.onClosed();
        })
        this.ws.on(OmeloxNetEvent.onKick, () => {
            logger.debug("异地登录");
            // this.changeState(State.Fail);
        })
    }

    connect(options: NetConnectOptions) {
        if (this.ws && this.ws.socket) {
            if (this.ws.socket.readyState === WebSocket.CONNECTING) {
                console.log("websocket connecting, wait for a moment...")
                return false;
            }
        }

        let url = null;
        if (options.url) {
            url = options.url;
        } else {
            let ip = options.host;
            let port = options.port;
            let protocol = options.protocol;
            url = `${protocol}://${ip}:${port}`;
        }

        let param: omelox.NetConnectParam = {
            wsUrl: url,
            reconnect: false,
        }

        // param.reconnect = true;
        // param.maxReconnectAttempts = 5;
        this.ws.connect(param, (socket) => {
            logger.info(`WebsocketOmelox connect ${param.wsUrl} ok`);
            this.onConnected(socket);
        });

        return true;
    }

    send(buffer: NetData, cmd: NetCmd, cb?: any, caller?: any): Promise<AnswerResponse> {
        return new Promise((resolve, reject) => {
            if (this.ws && this.ws.socket.readyState == WebSocket.OPEN) {
                this.ws.request(cmd as string, buffer, (resp) => {
                    if (resp.code === 500 || (!resp.data && !resp.error)) {
                        resolve({ error: { code: 500, msg: "网络请求超时" } })
                        return;
                    }
                    resolve(resp);
                    cb && cb.call(caller, resp);
                });
            } else {
                reject();
            }
        });
    }

    notify(buffer: NetData, cmd?: NetCmd): void {
        this.ws.notify(cmd as string, buffer);
    }

    once(cmd: NetCmd) {
        this.ws.once(cmd as string, (msg) => {
            let onMessage: MessageFunc = this.onMessage!;
            onMessage({ cmd, msg });
        }, this);
    }

    /** 消息监听接口 */
    on(cmd: NetCmd) {
        this.ws.on(cmd as string, (msg) => {
            let onMessage: MessageFunc = this.onMessage!;
            onMessage({ cmd, msg });
        }, this);
    }

    off(cmd: NetCmd, cb: any, caller?: any) {
        this.ws.off(cmd as string, cb, caller);
    }

    close(code?: number, reason?: string): void {
        this.ws.disconnect(code, reason, () => {
        })
    }
}