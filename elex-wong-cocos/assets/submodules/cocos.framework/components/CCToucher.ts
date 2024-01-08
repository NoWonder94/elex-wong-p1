
import { _decorator, Component, systemEvent, SystemEventType, Touch, EventTouch } from 'cc';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
const { ccclass } = _decorator;

@ccclass('CCToucher')
export class CCToucher extends Component {
    startFunctionCaller: FunctionCaller;
    moveFunctionCaller: FunctionCaller;
    cancelFunctionCaller: FunctionCaller;
    endFunctionCaller: FunctionCaller;

    onLoad() {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(touch: Touch, event: EventTouch) {
        this.startFunctionCaller && this.startFunctionCaller.exec(touch, event);
    }

    onTouchMove(touch: Touch, event: EventTouch) {
        this.moveFunctionCaller && this.moveFunctionCaller.exec(touch, event);
    }

    onTouchCancel(touch: Touch, event: EventTouch) {
        this.cancelFunctionCaller && this.cancelFunctionCaller.exec(touch, event);
    }

    onTouchEnd(touch: Touch, event: EventTouch) {
        this.endFunctionCaller && this.endFunctionCaller.exec(touch, event);
    }
}
