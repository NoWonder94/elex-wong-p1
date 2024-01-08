import { IMockSocket, ISocket, MessageFunc, NetCmd, NetData } from "./NetInterface";
import { NetConnectOptions } from "./NetworkComponent";

export class MockSocket implements ISocket {

    onConnected = null;
    onMessage = null;
    onError = null;
    onClosed = null;

    constructor(private ws: IMockSocket) {
    }

    connect(options: NetConnectOptions) {
        if (this.ws) {
            if (this.ws.readyState === WebSocket.CONNECTING) {
                console.log("MockSocket connecting, wait for a moment...")
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

        this.ws.binaryType = options.binaryType ? options.binaryType : "arraybuffer";
        this.ws.onmessage = (event) => {
            let onMessage: MessageFunc = this.onMessage!;
            onMessage(event.data);
        };
        this.ws.onopen = this.onConnected;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClosed;

        return true;
    }

    send(buffer: NetData, cmd?: NetCmd, cb?: any, caller?: any): any {
        return new Promise((resolve, reject) => {
            if (this.ws && this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(cmd as string, buffer, (resp) => {
                    resolve(resp);
                    cb && cb.call(caller, resp);
                });
            } else {
                reject();
            }
        });
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

    close(code?: number, reason?: string) {
        this.ws.disconnect(code, reason, () => {
        })
    }
}