import { Node, tween, UIOpacity, v3, Vec3 } from 'cc';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';

export class TweenAnimationHelper {
    /** 环形旋转 */
    public static circleRotation(target: Node, timed: number) {
        tween(target)
            .by(timed, { eulerAngles: new Vec3(0, 0, -360) })
            .repeatForever()
            .start();
    }

    /** 淡入动画 */
    public static fadeIn(target: Node, finish: FunctionCaller, timed: number) {
        target.getComponent(UIOpacity).opacity = 0;
        tween(target.getComponent(UIOpacity))
            .to(timed, { opacity: 255 })
            .call(() => {
                finish.exec();
            })
            .start();
    }

    /** 淡出动画 */
    public static fadeOut(target: Node, finish: FunctionCaller, timed: number, opacity: number = 0) {
        tween(target.getComponent(UIOpacity))
            .to(timed, { opacity: opacity })
            .call(() => {
                finish.exec();
            })
            .start();
    }

    /** 震屏效果 */
    public static createShockEff(layer: Node, times: number, strength: number = 1) {
        if (!layer) {
            return;
        }

        let pre = layer.position;

        let action = tween().sequence(tween().by(0.05, { position: v3(2 * strength, 2 * strength, 0) }), tween().by(0.1, { position: v3(-4 * strength, -4 * strength, 0) }), tween().by(0.05, { position: v3(2 * strength, 2 * strength, 0) }));

        const repeat = tween(layer).repeat(times, action);
        const checkEnd = tween().call(() => {
            layer.position = pre;
        });
        repeat.then(checkEnd).start();
    }

    /** 文字抖动 */
    public static scalePop(node: Node, timed: number) {
        tween(node)
            .to(timed + 0.1, { scale: new Vec3(0.7, 0.7, 0.7) })
            .to(timed - 0.1, { scale: new Vec3(0.6, 0.6, 0.6) })
            .start();
    }

    /** 呼吸动画 */
    public static breath(node: Node, min = 0.9, max = 1.1) {
        tween(node)
            .repeatForever(tween().sequence(tween().to(0.6, { scale: new Vec3(max, max, max) }), tween().to(0.6, { scale: new Vec3(min, min, min) })))
            .start();
    }

    /** 呼吸动画 */
    public static breathOnce(node: Node, times = 1, min = 0.9, max = 1.1) {
        tween(node)
            .repeatForever(tween().sequence(tween().to(0.6, { scale: new Vec3(max, max, max) }), tween().to(0.6, { scale: new Vec3(min, min, min) })))
            .repeat(times)
            .start();
    }
}
