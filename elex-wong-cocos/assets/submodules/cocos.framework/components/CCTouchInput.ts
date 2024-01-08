import { _decorator, Component, Node, EventTouch, EventMouse, misc, Vec2, v2, view, UITransform, Vec3, director } from 'cc';
const { ccclass, property, disallowMultiple } = _decorator;

const GESTURE_HOLD_TIMEOUT = 0.5;			// 按住多久才能算是 长按呢
const GESTURE_TAP_TIMEOUT = 0.333;		    // time for tap gesture to register
const GESTURE_HOLD_THRESHOLD = 15;		    // 持续按住时，手指允许偏离多少像素(防止误差)
const GESTURE_DOUBLE_TAP_THRESHOLD = 25;	// 轻触时，允许在start/ end 之间的坐标偏差
const GESTURE_SWIPE_DISTANCE_MIN = 50;      //滑动超过多少距离才算生效
const GESTURE_SWIPE_TIMEOUT = 0.2;          //滑动超过多少时间无效

/**
 * 方向对应枚举值
 */
export enum DIRECTION {
    NONE = 0,
    LEFT_DOWN = 1,
    DOWN = 2,
    RIGHT_DOWN = 3,
    LEFT = 4,
    CENTER = 5,
    RIGHT = 6,
    LEFT_UP = 7,
    UP = 8,
    RIGHT_UP = 9,
}

/**
 * 屏幕触摸区域划分
 */
enum SCREEN_DIV_TYPE {
    LEFT_RIGHT,
    LEFT_MIDDLE_RIGHT,
    UP_DOWN,
    UP_MIDDLE_DOWN
}

export enum CCTouchType {
    /** 滑动方向 */
    TouchDirection = 'TouchDirection',
    /** 轻触 */
    TouchTap = 'TouchTap',
    /** 长安 */
    TouchHold = 'TouchHold',
}

/**
 * Cocos Touch 输入事件
 * 封装节点touch 事件，让 触摸能够在全局环境中使用
 * 兼容鼠标输入操作方式
 */
@ccclass('CCTouchInput')
@disallowMultiple
export class CCTouchInput extends Component {
    /**
     * 监听触摸的节点，这样才能接收到正确的冒泡事件
     */
    @property({
        tooltip: '接受触摸的节点(从对应节点寻找)',
        type: Node
    })
    private listenNode: Node = null;

    @property({
        tooltip: '是否允许 长按触发事件 (略微消耗性能)',
    })
    private allowHold: boolean = false;

    @property({
        tooltip: '测试绘图模式, 可以监控触摸点所在位置',
    })
    private debug: boolean = false;
    private pressure = 0;

    private ctrl = {
        left: false,
        right: false,
        up: false,
        down: false,
        middle: false
    }

    /**计时器时间(标记touch 的时间) */
    private timer: number = 0;

    /**记录不同触摸点信息的数组 */
    private touchArray: Array<{
        triggeredHold: boolean,
        isTouch: boolean,
        startTime: number,
        curTime: number,
        lastTapTime: number,
        lastTapPos: Vec2
    }> = [];


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.listenNode = this.listenNode || this.node;
        //初始化触摸数据(10点触摸)
        let array = this.touchArray;
        for (let i = 0; i < 10; i++) {
            array.push({
                triggeredHold: false,
                isTouch: false,
                startTime: 0,
                curTime: 0,
                lastTapTime: -1000,
                lastTapPos: v2(-1000, -1000)
            })
        }
    }

    start() {
        this.bindNode(this.listenNode);
    }

    onEnable() {
    }

    onDisable() {
        this.unbindNode();
    }

    /** 正在触摸中 (默认触摸点) */
    get isInTouch() {
        return 0;
    }

    /** 触摸速度 (默认触摸点) */
    get touchSpeed() {
        return 0;
    }

    /**
     * 将角度(0~360) 转换为 direction ;
     */
    public getAngleDirection4(angle: number): DIRECTION {
        angle = (angle + 360) % 360;
        if (Math.abs(angle - 270) < 45) {
            return DIRECTION.UP;
        } else if (Math.abs(angle - 180) < 45) {
            return DIRECTION.LEFT;
        } else if (Math.abs(angle - 90) < 45) {
            return DIRECTION.DOWN;
        } else {
            return DIRECTION.RIGHT;
        }
    }

    /**
     * 将角度（0~360 ） 转换为 direction
     */
    public getAngleDirection8(angle: number): DIRECTION {
        angle = (angle + 360) % 360;
        if (Math.abs(angle - 315) < 22.5) {
            return DIRECTION.RIGHT_UP;
        } else if (Math.abs(angle - 270) < 22.5) {
            return DIRECTION.UP;
        } else if (Math.abs(angle - 225) < 22.5) {
            return DIRECTION.LEFT_UP;
        } else if (Math.abs(angle - 180) < 22.5) {
            return DIRECTION.LEFT;
        } else if (Math.abs(angle - 135) < 22.5) {
            return DIRECTION.LEFT_DOWN;
        } else if (Math.abs(angle - 90) < 22.5) {
            return DIRECTION.DOWN;
        } else if (Math.abs(angle - 45) < 22.5) {
            return DIRECTION.RIGHT_DOWN;
        } else {
            return DIRECTION.RIGHT;
        }
    }


    /** 绑定触摸时间所在的节点, 一般是绑定UI层 */
    bindNode(node: Node) {
        if (node == null) return;
        //如果绑定过了节点，那么就先解除原节点的绑定事件

        if (this.listenNode) this.unbindNode();
        this.listenNode = node;
        node.on(Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, true);
        node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        node.on(Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this, true);

        node.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
        node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    /** 解除绑定触摸事件所在的节点 */
    unbindNode() {
        let node = this.listenNode;
        if (!node.isValid) return;
        node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    /** 检查是否触发 Hold 事件 */
    private checkTriggerHold(id: number, duration: number) {
        let info = this.touchArray[id];
        if (info.triggeredHold) return;// 触发了 trigger hold 以后 不能再触发了
        if (duration >= GESTURE_HOLD_TIMEOUT) {
            console.log("触发 长按！");
            info.triggeredHold = true;
        }
    }

    /**检查是否触发 tap 事件 */
    private checkTriggerTap(e: EventTouch, duration: number) {
        let id = e.getID();
        let info = this.touchArray[id];
        if (info.triggeredHold) return;

        let offsetTimer = duration;
        let touchMag = e.getStartLocation().subtract(e.getLocation()).length();

        if (offsetTimer <= GESTURE_TAP_TIMEOUT && touchMag < GESTURE_HOLD_THRESHOLD) {

            let tapMag = info.lastTapPos.subtract(e.getLocation()).length();
            // 上一次点击的距离和时间范围内:触发二连击
            if ((offsetTimer <= GESTURE_TAP_TIMEOUT * 2) && tapMag < GESTURE_DOUBLE_TAP_THRESHOLD) {
                console.log("双击轻触 事件！", e.getID());
                // TODO
                // let event = new EventCustom('double-tap-gesture', true); 
                // this.node.dispatchEvent(event);


                info.lastTapPos = v2(-1000, -1000);
                info.lastTapTime = -10000;
            }
            // Otherwise trigger single tap
            else {
                console.log("轻触！事件", e.getID());
                // TODO
                // let event = new Event.EventCustom('tap-gesture', true);
                // this.node.dispatchEvent(event)

                info.lastTapPos = e.getLocation();
                info.lastTapTime = this.timer;
            }
        }
    }

    /** 检查滑动操作 */
    private checkSwipe(e: EventTouch, duration: number) {
        let id = e.getID();
        let offset = e.getStartLocation().subtract(e.getLocation());
        let dis = offset.length();
        if (dis > GESTURE_SWIPE_DISTANCE_MIN && duration < GESTURE_SWIPE_TIMEOUT) {
            let angle = misc.radiansToDegrees(v2(Vec3.RIGHT.x, Vec3.RIGHT.y).signAngle(offset.normalize()));
            angle = 180 - angle; //调整角度范围到 0~ 360 度
            console.log("滑动！事件", id, "距离：", dis, "角度：", this.getAngleDirection8(angle));
            director.emit(CCTouchType.TouchDirection, this.getAngleDirection8(angle), dis);
        }
    }

    /**
     *  检查不同区域范围的点击(以 屏幕为基准)
     */
    private checkTouchArea(e: EventTouch) {
    }

    private onTouchStart(e: EventTouch) {
        let id = e.getID();
        let info = this.touchArray[id];
        if (info) {
            info.startTime = this.timer;
            info.curTime = this.timer;
            info.triggeredHold = false;
            info.isTouch = true;
        }
    }

    private onTouchMove(e: EventTouch) {
        let id = e.getID();
        let info = this.touchArray[id];
        if (info) {
            info.curTime = this.timer;
        }
    }

    private onTouchEnd(e: EventTouch) {
        let id = e.getID();
        let info = this.touchArray[id];
        if (info) {
            info.curTime = this.timer;
            let duration = info.curTime - info.startTime;
            //检查是否为 tap
            this.checkTriggerTap(e, duration);
            this.checkSwipe(e, duration);
            info.isTouch = false;
        }
    }

    private onTouchCancel(e: EventTouch) {
        let id = e.getID();
        let info = this.touchArray[id];
        if (info) {
            info.curTime = this.timer;
            let duration = info.curTime - info.startTime;
            this.checkSwipe(e, duration);
            info.isTouch = false;
        }
    }

    /**鼠标抬起时 */
    private onMouseUp(e: EventMouse) {
    }

    /**鼠标按下时 */
    private onMouseDown(e: EventMouse) {
    }

    /**鼠标移动时 */
    private onMouseMove(e: EventMouse) {
    }

    /**鼠标滚动时 */
    private onMouseWheel(e: EventMouse) {
    }

    update(dt) {
        this.timer += dt;
        if (this.allowHold) {
            let array = this.touchArray
            array.forEach((e, index) => {
                if (e.isTouch == true) {
                    // this.checkTriggerHold(index, this.timer - e.startTime);
                }
            });
        }
    }
}


