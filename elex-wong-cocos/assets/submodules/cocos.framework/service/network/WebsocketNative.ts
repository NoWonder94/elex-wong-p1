import { ISocket, MessageFunc, NetCmd, NetData } from "./NetInterface";
import { NetConnectOptions } from "./NetworkComponent";

/*
*   WebSocket封装
*   1. 连接/断开相关接口
*   2. 网络异常回调
*   3. 数据发送与接收
*/
export class WebsocketNative implements ISocket {
    /** websocket对象 */
    private ws: WebSocket | null = null;

    onConnected = null;
    onMessage = null;
    onError = null;
    onClosed = null;

    connect(options: NetConnectOptions) {
        if (this.ws) {
            if (this.ws.readyState === WebSocket.CONNECTING) {
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

        this.ws = new WebSocket(url);
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

    send(buffer: NetData): any {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            this.ws.send(buffer);
            return true;
        }
        return false;
    }

    close(code?: number, reason?: string) {
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }
}