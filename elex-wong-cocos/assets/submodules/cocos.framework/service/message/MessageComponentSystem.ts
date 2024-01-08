import { AnswerResponse } from '../../../sharing.base/protocols/ProtocolConst';
import { EventGlobalComponentSystem } from '../../../sharing.base/service/event/EventGlobalComponentSystem';
import { NetworkManagerComponentSystem } from '../network/NetworkManagerComponentSystem';
import { OK } from '../../../sharing.base/consts';
import { MessageComponent, MessageEventType } from './MessageComponent';
import { UIToastComponentSystem } from '../../ui/UIToast/UIToastComponentSystem';
import { SubscibeEvent } from '../../SubscibeEvent';

/**
 * 消息代理
 */
export abstract class MessageComponentSystem {
    public static onListener(self: MessageComponent) {
        self.localcmds = this.listLocalNotifications(self);
        for (let item of self.localcmds) {
            EventGlobalComponentSystem.on(item.name, item.callback);
        }
        self.netcmds = this.listNetNotifications(self);
        for (let item of self.netcmds) {
            NetworkManagerComponentSystem.on(item.name, item.callback);
        }
    }

    public static offListener(self: MessageComponent) {
        for (let item of self.localcmds) {
            EventGlobalComponentSystem.off(item.name, item.callback.cb, item.callback.target);
        }

        for (let item of self.netcmds) {
            NetworkManagerComponentSystem.off(item.name, item.callback.cb, item.callback.target);
        }
    }

    /** 监听本地消息 */
    protected static listLocalNotifications(self: MessageComponent): MessageEventType[] {
        return [];
    }

    /** 监听网络消息 */
    protected static listNetNotifications(self: MessageComponent): MessageEventType[] {
        return [];
    }

    public static sendNotification(name: string, ...args: any[]): void {
        EventGlobalComponentSystem.emit.apply(null, [name].concat(Array.prototype.slice.call(arguments, 1)));
    }

    public static sendResponseNotification(name: string, body?: any): void {
        this.sendNotification(SubscibeEvent.getResp(name), body);
    }

    public static async execute(method, msg) {
        const handler = this[method];
        if (!handler) {
            this.sendNotification(SubscibeEvent.SetCommonTopTipInfo, '接口未实现');
            return;
        }

        try {
            let resp = await handler.call(this, msg);
            this.sendNotification(SubscibeEvent.getResp(method), resp);
        } catch (err) {
            this.sendNotification(SubscibeEvent.SetCommonTopTipInfo, '接口调用失败');
            logger.error(`接口调用失败 err=${err}`);
        }
    }

    public static async requestData(route: string, msg: any = {}): Promise<any> {
        const resp = await this.requestAsync(route, msg);
        if (resp && resp.error.code === OK) {
            return resp.data;
        }
    }

    public static async requestAsync(route: string, msg: any = {}, showTips: boolean = true, force: boolean = false): Promise<AnswerResponse> {
        let resp: AnswerResponse = null;
        try {
            resp = await NetworkManagerComponentSystem.send(msg, route, force);
            logger.info(`Request ${route} msg=${JSON.stringify(msg)} resp=${JSON.stringify(resp)}`);
        } catch (err) {
            logger.error(`Request ${route} err ${err}`);
            resp = err;
        } finally {
            if (resp.error.code !== OK && showTips) {
                // this.sendNotification(tipType, resp.data);
                UIToastComponentSystem.show(resp.error.msg);
            }
        }
        return resp;
    }
}
