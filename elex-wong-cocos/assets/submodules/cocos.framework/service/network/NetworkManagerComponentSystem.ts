import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { AnswerResponse } from "../../../sharing.base/protocols/ProtocolConst";
import { NetData, NetCmd } from './NetInterface';
import { NetConnectOptions, NetworkComponent } from "./NetworkComponent";
import { NetworkManagerComponent } from "./NetworkManagerComponent";
import { EventComponentSystem } from '../../../sharing.base/service/event/EventComponentSystem';
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../CocosDecorators";
import { NetworkComponentSystem } from "./NetworkComponentSystem";

@CocosDecorators.SystemRegister()
export class NetworkManagerComponentAwakeSystem extends AwakeSystem<NetworkManagerComponent>{
    constructor() {
        super(NetworkManagerComponent);
    }

    awake(self: NetworkManagerComponent) {
        NetworkManagerComponent.instance = self;
    }
}

export class NetworkManagerComponentSystem {
    // 添加Node，返回ChannelID
    public static setNetNode(newNetwork: NetworkComponent, channelId: number = 0) {
        NetworkManagerComponent.instance.channels[channelId] = newNetwork;
    }

    // 移除Node
    public static removeNetNode(channelId: number) {
        delete NetworkManagerComponent.instance.channels[channelId];
    }

    // 获取Node
    public static getNetNode(channelId: number = 0) {
        return NetworkManagerComponent.instance.channels[channelId];
    }

    // 调用Node连接
    public static connect(options: NetConnectOptions, channelId: number = 0): boolean {
        let self = NetworkManagerComponent.instance;
        if (self.channels[channelId]) {
            return NetworkComponentSystem.connect(self.channels[channelId], options);
        }
        return false;
    }

    public static disconnect(channelId: number = 0) {
        let self = NetworkManagerComponent.instance;
        if (self.channels[channelId]) {
            return NetworkComponentSystem.close(self.channels[channelId]);
        }
    }

    public static on(cmd: NetCmd, callback: FunctionCaller, channelId: number = 0): boolean {
        let self = NetworkManagerComponent.instance;
        let node = self.channels[channelId];
        if (node) {
            EventComponentSystem.on(node.eventEventComponent, cmd as string, callback)
        }
        return false;
    }

    public static once(cmd: NetCmd, callback: FunctionCaller, channelId: number = 0): boolean {
        let self = NetworkManagerComponent.instance;
        let node = self.channels[channelId];
        if (node) {
            EventComponentSystem.once(node.eventEventComponent, cmd as string, callback)
        }
        return false;
    }

    public static off(cmd: NetCmd, callback: Function, target?: any, channelId: number = 0): boolean {
        let self = NetworkManagerComponent.instance;
        let node = self.channels[channelId];
        if (node) {
            EventComponentSystem.off(node.eventEventComponent, cmd as string, callback, target)
        }
        return false;
    }

    public static remove(cmd: NetCmd, channelId: number = 0): boolean {
        let self = NetworkManagerComponent.instance;
        let node = self.channels[channelId];
        if (node) {
            EventComponentSystem.remove(node.eventEventComponent, cmd as string)
        }
        return false;
    }

    // 调用Node发送
    public static async send(buf: NetData, cmd: NetCmd, force: boolean = false, channelId: number = 0): Promise<AnswerResponse> {
        let node = NetworkManagerComponent.instance.channels[channelId];
        if (node) {
            return await NetworkComponentSystem.send(node, buf, cmd, force)
        }
    }

    // 发送无需响应的通知
    public static async notify(buf: NetData, cmd?: NetCmd, channelId: number = 0) {
        let node = NetworkManagerComponent.instance.channels[channelId];
        if (node) {
            return await NetworkComponentSystem.notify(node, buf, cmd);
        }
    }

    public static async httpPost(url: string, params: any, rspObject?: FunctionCaller, showTips: boolean = false, channelId: number = 0, headers: any = {}, timeout: number = 5000) {
        let node = NetworkManagerComponent.instance.channels[channelId];
        if (node) {
            return await NetworkComponentSystem.httpPost(node, url, params, rspObject, showTips, headers, timeout);
        }
    }

    // 发起请求，并在在结果返回时调用指定好的回调函数
    public static request(buf: NetData, cmd: NetCmd, rspObject: FunctionCaller, showTips: boolean = true, force: boolean = false, channelId: number = 0) {
        let node = NetworkManagerComponent.instance.channels[channelId];
        if (node) {
            NetworkComponentSystem.request(node, buf, cmd, rspObject, showTips, force);
        }
    }

    // 同request，但在request之前会先判断队列中是否已有rspCmd，如有重复的则直接返回
    public static requestUnique(buf: NetData, cmd: NetCmd, rspObject: FunctionCaller, showTips: boolean = true, force: boolean = false, channelId: number = 0): boolean {
        let node = NetworkManagerComponent.instance.channels[channelId];
        if (node) {
            return NetworkComponentSystem.requestUnique(node, buf, cmd, rspObject, showTips, force);
        }
        return false;
    }

    // 调用Node关闭
    public static close(code?: number, reason?: string, channelId: number = 0) {
        let self = NetworkManagerComponent.instance;
        if (self.channels[channelId]) {
            return NetworkComponentSystem.closeSocket(self.channels[channelId], code, reason);
        }
    }
}