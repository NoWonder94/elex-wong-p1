import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { AnswerResponse } from '../../../sharing.base/protocols/ProtocolConst';
export type NetCmd = number | string;

/*
*   网络相关接口定义
*/
export type NetData = (string | ArrayBufferLike | Blob | ArrayBufferView | any);
export type NetCallFunc = (cmd: NetCmd, data: any) => void;

// 请求对象
export interface RequestObject {
    buffer: NetData,            // 请求的Buffer
    rspCmd: NetCmd,             // 等待响应指令
    rspObject: FunctionCaller | null,  // 等待响应的回调对象
}

// 协议辅助接口
export interface IProtocolHelper {
    getHeadlen(): number;                   // 返回包头长度
    getHearbeat(): NetData;                 // 返回一个心跳包
    getPackageLen(msg: NetData): number;    // 返回整个包的长度
    checkPackage(msg: NetData): boolean;    // 检查包数据是否合法
    getPackageId(msg: NetData): NetCmd;     // 返回包的id或协议类型
}

// 默认字符串协议对象
export class StringProtocol implements IProtocolHelper {
    getHeadlen(): number {
        return 0;
    }
    getHearbeat(): NetData {
        return "";
    }
    getPackageLen(msg: NetData): number {
        return msg.toString().length;
    }
    checkPackage(msg: NetData): boolean {
        return true;
    }
    getPackageId(msg: NetData): NetCmd {
        return 0;
    }
}

export type SocketFunc = (event: any) => void;
export type MessageFunc = (msg: NetData) => void;

/** http 接口 */
export interface IHttp {
    get(url: string, params: any, cb?: FunctionCaller, headers?: any, timeout?: number): Promise<AnswerResponse>;
    post(url: string, params: any, cb?: FunctionCaller, headers?: any, timeout?: number): Promise<AnswerResponse>;
}

/** Socket接口 */
export interface ISocket {
    /** 连接回调 */
    onConnected: SocketFunc | null;
    /** 消息回调 */
    onMessage: MessageFunc | null;
    /** 错误回调 */
    onError: SocketFunc | null;
    /** 关闭回调 */
    onClosed: SocketFunc | null;
    /** 连接接口 */
    connect(options: any): any;
    /** 数据发送接口 */
    send(buffer: NetData, cmd?: NetCmd, cb?: any, caller?: any): any;
    /** 无需响应数据 */
    notify?(buffer: NetData, cmd?: NetCmd): void
    /** 消息监听接口 */
    on?(cmd: NetCmd);
    /** 消息接收一次 */
    once?(cmd: NetCmd,);
    /** 消息监听接口 */
    off?(cmd: NetCmd, cb: any, caller?: any);
    /**  关闭接口 */
    close(code?: number, reason?: string): void;
}

// 网络提示接口
export interface INetworkTips {
    connectTips(isShow: boolean): void;
    reconnectTips(isShow: boolean): void;
    requestTips(isShow: boolean): void;
}

export interface NetworkTip {
    prefabUrl: string
    CLASS?: any
}

export interface IMockHttp {
}

export enum MockeSocketReadyState {
    CLOSED = 0,
    CLOSING = 1,
    CONNECTING = 2,
    OPEN = 3,
}

export interface IMockSocket {
    binaryType: BinaryType;
    readyState: MockeSocketReadyState;
    onmessage(event);
    onopen(event);
    onerror(event);
    onclose(event);
    /** 数据发送接口 */
    send(buffer: NetData, cmd?: NetCmd, cb?: any): any;
    notify(buffer: NetData, cmd?: NetCmd): any;
    once(cmd: NetCmd, cb: any, caller?: any): any;
    on(cmd: NetCmd, cb: any, caller?: any): any;
    off(cmd: NetCmd, cb: any, caller?: any): any;
    disconnect(code?: number, reason?: string, cb?: any): void
}
