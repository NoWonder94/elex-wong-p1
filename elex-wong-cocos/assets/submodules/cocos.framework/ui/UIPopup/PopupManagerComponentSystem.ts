import { instantiate, Node, isValid, Prefab } from "cc";
import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { CocosDecorators } from "../../CocosDecorators";
import { PopupBaseComponent } from "./PopupBaseComponent";
import { PopupManagerComponent, PopupCacheMode, PopupParams, PopupRequest, PopupShowResult } from "./PopupManagerComponent";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { UIType } from "../UIType";
import { UIHelper } from "../UIHelper";
import { SceneHelper } from "../../../sharing.base/core/scene/SceneHelper";
import { UIPopupCreate, UIPopupRemove } from "./UIPopupAUIEvent";
import { PopupBaseComponentSystem } from "./PopupBaseComponentSystem";
import { PopupConfirmComponent } from "./PopupConfirmComponent";
import { TimerGlobalComponentSystem } from "../../../sharing.base/service/timer/TimerGlobalComponentSystem";
@CocosDecorators.SystemRegister()
export class PopupManagerComponentAwakeSystem extends AwakeSystem<PopupManagerComponent> {
    constructor() {
        super(PopupManagerComponent);
    }
    awake(self: PopupManagerComponent) {
        PopupManagerComponent.instance = self;
    }
}

/**
 * 弹窗管理器
 */
export class PopupManagerComponentSystem {
    /**
     * 展示弹窗，如果当前已有弹窗在展示中则加入等待队列
     * @param path 弹窗预制体相对路径（如：prefabs/MyPopup）
     * @param options 弹窗选项
     * @param mode 缓存模式
     * @param priority 是否优先展示
     */
    public static show<T>(path: string, options: T = null, params?: PopupParams): Promise<PopupShowResult> {
        let self = PopupManagerComponent.instance;
        return new Promise(async (res) => {
            // 解析处理参数
            params = this.parseParams(params);
            // 当前已有弹窗在展示中则加入等待队列
            if (self.current || self.locked) {
                // 是否立即强制展示
                if (params && params.immediately) {
                    self.locked = false;
                    // 挂起当前弹窗
                    await this.suspend();
                } else {
                    // 将请求推入等待队列
                    this.push(path, options, params);
                    res(PopupShowResult.Wait);
                    return;
                }
            }

            // 保存为当前弹窗，阻止新的弹窗请求
            self.current = {
                path,
                options,
                params,
            };

            // 先在缓存中获取
            let node = this.getNodeFromCache(path);

            logger.info("*************先在缓存中获取", node);

            // 缓存中没有，动态加载预制体资源
            if (!isValid(node)) {
                // 开始回调
                self.loadStartCallback && self.loadStartCallback();
                // 等待加载
                const prefab = await this.load(path);
                // 完成回调
                self.loadFinishCallback && self.loadFinishCallback();
                // 加载失败（一般是路径错误导致的）
                if (!isValid(prefab)) {
                    logger.warn("[PopupManagerComponent]", "弹窗加载失败", path);
                    self.current = null;
                    res(PopupShowResult.Fail);
                    return;
                }
                node = instantiate(prefab);
            }

            logger.info("*************先在缓存中获取2", node);

            // 添加到场景中
            let ui = await UIHelper.create(SceneHelper.domainScene(self), UIType.UIPopup, new UIPopupCreate(node, options, params.CLASS));
            const popup = ui.getComponent<PopupBaseComponent>(params.CLASS);
            ui.persist = params.mode === PopupCacheMode.Frequent;

            // 保存组件引用
            self.current.popup = popup;
            // 保存节点引用
            self.current.node = node;

            // 设置完成回调
            const finishCallback = async (suspended: boolean) => {
                if (suspended) {
                    return;
                }
                self.locked = self.suspended.length > 0 || self.queue.length > 0;
                this.recycle(path, node, params.mode, params.CLASS);
                self.current = null;
                res(PopupShowResult.Done);
                // 延迟
                await TimerGlobalComponentSystem.sleep(self.interval);
                // 下一个弹窗
                this.next();
            };

            params.comSys.setFinishCallback(popup, finishCallback);
            // 展示
            params.comSys.show(popup);
        });
    }

    /**
     * 隐藏当前弹窗
     */
    public static hide() {
        let self = PopupManagerComponent.instance;
        const current = self.current;
        if (current.popup) {
            current.params.comSys.hide(current.popup);
        }
    }

    /**
     * 从缓存中获取节点
     * @param path 路径
     */
    private static getNodeFromCache(path: string): Node {
        let self = PopupManagerComponent.instance;
        // 从节点缓存中获取
        const nodeCache = self.nodeCache;
        if (nodeCache.has(path)) {
            const node = nodeCache.get(path);
            if (isValid(node)) {
                return node;
            }
            nodeCache.delete(path);
        }
        // 从预制体缓存中获取
        const prefabCache = self.prefabCache;
        if (prefabCache.has(path)) {
            const prefab = prefabCache.get(path);
            if (isValid(prefab)) {
                return instantiate(prefab);
            }
            prefabCache.delete(path);
        }
        // 无
        return null;
    }

    /**
     * 展示等待队列中的下一个弹窗
     */
    private static next(): void {
        let self = PopupManagerComponent.instance;
        self.locked = false;
        if (self.current || (self.suspended.length === 0 && self.queue.length === 0)) {
            return;
        }
        // 取出一个请求
        let request: PopupRequest = null;
        if (self.suspended.length > 0) {
            // 挂起队列
            request = self.suspended.shift();
        } else if (self.queue.length > 0) {
            // 等待队列
            request = self.queue.shift();
        }
        // 展示
        this.show(request.path, request.options, request.params);
    }

    /**
     * 添加一个弹窗请求到等待队列中，如果当前没有展示中的弹窗则直接展示该弹窗。
     * @param path 弹窗预制体相对路径（如：prefabs/MyPopup）
     * @param options 弹窗选项
     * @param mode 缓存模式
     * @param priority 是否优先展示
     */
    private static push<Options>(path: string, options: Options = null, params?: PopupParams): void {
        let self = PopupManagerComponent.instance;
        // 直接展示
        if (!self.current && !self.locked) {
            this.show(path, options, params);
            return;
        }
        // 加入队列
        self.queue.push({ path, options, params });
        // 按照优先级从小到大排序
        self.queue.sort((a, b) => a.params.priority - b.params.priority);
    }

    /**
     * 挂起当前展示中的弹窗
     */
    private static async suspend() {
        let self = PopupManagerComponent.instance;
        if (!self.current) {
            return;
        }
        const request = self.current;
        // 将当前弹窗推入挂起队列
        self.suspended.push(request);
        // 关闭当前弹窗（挂起）
        await request.params.comSys.hide(request.popup, true);
        // 置空当前
        self.current = null;
    }

    /**
     * 回收弹窗
     * @param path 弹窗路径
     * @param node 弹窗节点
     * @param mode 缓存模式
     */
    private static recycle(path: string, node: Node, mode: PopupCacheMode, CLASS: any): void {
        let self = PopupManagerComponent.instance;
        UIHelper.remove(SceneHelper.domainScene(self), UIType.UIPopup, new UIPopupRemove(CLASS));

        const nodeCache = self.nodeCache;
        switch (mode) {
            // 一次性
            case PopupCacheMode.Once:
                node.destroy();
                nodeCache.delete(path);
                this.release(path);
                break;
            // 正常
            case PopupCacheMode.Normal:
                node.destroy();
                nodeCache.delete(path);
                break;
            // 频繁
            case PopupCacheMode.Frequent:
                node.removeFromParent();
                if (!nodeCache.has(path)) {
                    nodeCache.set(path, node);
                }
                break;
        }
    }

    /**
     * 加载并缓存弹窗预制体资源
     * @param path 弹窗路径
     */
    private static load(path: string): Promise<Prefab> {
        let self = PopupManagerComponent.instance;
        return new Promise((res) => {
            const prefabMap = self.prefabCache;
            // 先看下缓存里有没有，避免重复加载
            if (prefabMap.has(path)) {
                const prefab = prefabMap.get(path);
                // 缓存是否有效
                if (isValid(prefab)) {
                    res(prefab);
                    return;
                }
            }

            // 动态加载
            ResourcesComponentSystem.loadAsset(
                path,
                Prefab,
                FunctionCaller.create((prefab: Prefab) => {
                    if (!prefab) {
                        res(null);
                        return;
                    }
                    prefabMap.set(path, prefab); // 缓存预制体
                    prefab.addRef(); // 增加引用计数
                    res(prefab);
                }, this)
            );
        });
    }

    /**
     * 尝试释放弹窗资源（注意：弹窗内部动态加载的资源请自行释放）
     * @param path 弹窗路径
     */
    private static release(path: string): void {
        let self = PopupManagerComponent.instance;
        // 移除节点
        const nodeCache = self.nodeCache;
        let node = nodeCache.get(path);
        if (node) {
            nodeCache.delete(path);
            if (isValid(node)) {
                node.destroy();
            }
            node = null;
        }
        // 移除预制体
        const prefabCache = self.prefabCache;
        let prefab = prefabCache.get(path);
        if (prefab) {
            prefabCache.delete(path);
            prefab.decRef();
            prefab = null;
        }
    }

    /**
     * 解析参数
     * @param params 参数
     */
    private static parseParams(params: PopupParams) {
        if (params == undefined) {
            return new PopupParams();
        }
        // 是否为对象
        if (Object.prototype.toString.call(params) !== "[object Object]") {
            logger.warn("[PopupManagerComponent]", "弹窗参数无效，使用默认参数");
            return new PopupParams();
        }

        if (params.CLASS == null) {
            params.CLASS = PopupConfirmComponent;
        }
        // 缓存模式
        if (params.mode == undefined) {
            params.mode = PopupCacheMode.Normal;
        }
        // 优先级
        if (params.priority == undefined) {
            params.priority = 0;
        }
        // 立刻展示
        if (params.immediately == undefined) {
            params.immediately = false;
        }

        if (params.comSys == undefined) {
            params.comSys = PopupBaseComponentSystem;
        }
        return params;
    }
}
