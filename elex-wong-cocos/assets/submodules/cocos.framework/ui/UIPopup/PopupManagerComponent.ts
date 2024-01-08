import { Prefab, Node } from "cc";
import { PopupBaseComponent } from "./PopupBaseComponent";
import { Entity } from "../../../sharing.base/core/object/Entity";
import { CocosDecorators } from "../../CocosDecorators";

/** 弹窗展示参数 */
export class PopupParams {
    /** 缓存模式 */
    mode?: PopupCacheMode = PopupCacheMode.Normal;
    /** 优先级 */
    priority?: number = 0;
    /** 立刻展示（将会挂起当前展示中的弹窗） */
    immediately?: boolean = false;
    /** 组件 */
    CLASS?: any;
    /** 组件System */
    comSys?: any;
}

/** 弹窗请求 */
export interface PopupRequest {
    /** 弹窗预制体相对路径 */
    path: string;
    /** 弹窗选项 */
    options: any;
    /** 缓存模式 */
    params: PopupParams;
    /** 弹窗组件 */
    popup?: PopupBaseComponent;
    /** 弹窗节点 */
    node?: Node;
}

/** 弹窗请求结果 */
export enum PopupShowResult {
    /** 展示成功（已关闭） */
    Done = 1,
    /** 展示失败（加载失败） */
    Fail,
    /** 等待中（已加入等待队列） */
    Wait,
}

/** 弹窗缓存模式 */
export enum PopupCacheMode {
    /** 一次性的（立即销毁节点，预制体资源随即释放） */
    Once = 1,
    /** 正常的（立即销毁节点，但是保留预制体资源） */
    Normal = 2,
    /** 频繁的（只关闭节点，且保留预制体资源） */
    Frequent = 3,
}

/**
 * 弹窗管理器
 */
@CocosDecorators.ClassNameRegister("PopupManagerComponent")
export class PopupManagerComponent extends Entity {
    public static instance: PopupManagerComponent;
    /** 预制体缓存 */
    public prefabCache: Map<string, Prefab> = new Map<string, Prefab>();
    /** 节点缓存 */
    public nodeCache: Map<string, Node> = new Map<string, Node>();
    /** 当前弹窗请求 */
    public current: PopupRequest = null;
    /** 等待队列 */
    public queue: PopupRequest[] = [];
    /** 被挂起的弹窗队列 */
    public suspended: PopupRequest[] = [];
    /** 锁定状态（是否已有候选弹窗） */
    public locked: boolean = false;
    /** 连续展示弹窗的时间间隔（秒） */
    public interval: number = 0.1;
    /**
     * 弹窗动态加载开始回调
     * @example
     * PopupManager.loadStartCallback = () => {
     *     LoadingTip.show();
     * }
     */
    public loadStartCallback: Function = null;

    /**
     * 弹窗动态加载结束回调
     * @example
     * PopupManager.loadFinishCallback = () => {
     *     LoadingTip.hide();
     * }
     */
    public loadFinishCallback: Function = null;
}
