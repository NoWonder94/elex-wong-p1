import { INetworkTips, IProtocolHelper, ISocket, RequestObject, NetCmd } from './NetInterface';
import { Entity } from '../../../sharing.base/core/object/Entity';
import { EventComponent } from '../../../sharing.base/service/event/EventComponent';
import { CocosDecorators } from '../../CocosDecorators';
import HTTP from './HTTP';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { UINetworkTipComponent } from '../../ui/UINetworkTip/UINetworkTipComponent';

export type CheckFunc = (checkedFunc: VoidFunc) => void;
export type VoidFunc = () => void;
export type BoolFunc = () => boolean;

export enum NetTipsType {
    Connecting,
    ReConnecting,
    Requesting,
}

export enum NetNodeState {
    Closed,                     // 已关闭
    Connecting,                 // 连接中
    Checking,                   // 验证中
    Working,                    // 可传输数据
}

export interface NetConnectOptions {
    /** 协议 */
    protocol?: string;
    /** 地址 */
    host?: string,
    /** 端口 */
    port?: number,
    /** url，与协议+地址+端口二选一 */
    url?: string,
    /** -1 永久重连，0不自动重连，其他正整数为自动重试次数 */
    autoReconnect?: number,
    /** Buffer类型 */
    binaryType?: BinaryType;
    /** 所有监听cmd */
    netCmds?: NetCmd[]
}

@CocosDecorators.ClassNameRegister('NetworkComponent')
export class NetworkComponent extends Entity {
    public connectOptions: NetConnectOptions | null = null;
    public autoReconnect: number = 0;
    /** Socket是否初始化过 */
    public isSocketInit: boolean = false;
    /** Socket是否连接成功过 */
    public isSocketOpen: boolean = false;
    /** 节点当前状态 */
    public state: NetNodeState = NetNodeState.Closed;
    /** Socket对象（可能是原生socket、websocket、wx.socket...) */
    public socket: ISocket | null = null;
    public http: HTTP | null = null;
    /** 提示组件 */
    public tips: UINetworkTipComponent | null = null;
    /** 包解析对象 */
    public protocolHelper: IProtocolHelper | null = null;
    /** 连接完成回调 */
    public connectedCallback: FunctionCaller | null = null;
    /** 连接失败回调 */
    public failedCallback: FunctionCaller | null = null;
    /** 断线回调 */
    public disconnectCallback: FunctionCaller | null = null;
    /** 是否重连中 */
    public isReconnect: boolean = false;
    /** 事件分发组件 */
    public eventEventComponent: EventComponent | null = null;
    /** 心跳定时器 */
    public keepAliveTimer: any = null;
    /** 接收数据定时器 */
    public receiveMsgTimer: any = null;
    /** 重连定时器 */
    public reconnectTimer: any = null;
    /** 心跳间隔 */
    public heartTime: number = 10000;
    /** 多久没收到数据断开 */
    public receiveTime: number = 6000000;
    /** 重连间隔 */
    public reconnetTimeOut: number = 3000;
    /** 请求列表 */
    public requests: RequestObject[] = Array<RequestObject>();
}