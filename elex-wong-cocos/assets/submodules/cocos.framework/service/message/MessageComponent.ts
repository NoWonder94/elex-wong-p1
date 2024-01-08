import { Entity } from "../../../sharing.base/core/object/Entity";
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../CocosDecorators";

export type MessageEventType = { name: string; callback: FunctionCaller };

/**
 * 消息代理
 */
@CocosDecorators.ClassNameRegister("MessageComponent")
export abstract class MessageComponent extends Entity {
    /** 本地消息 */
    public localcmds: MessageEventType[] = [];
    /** 网路消息 */
    public netcmds: MessageEventType[] = [];
}
