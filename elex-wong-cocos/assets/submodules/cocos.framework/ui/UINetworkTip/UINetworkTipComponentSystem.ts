import { Label, Node } from 'cc';
import { UI } from '../UI';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { CocosDecorators } from '../../CocosDecorators';
import { TweenAnimationHelper } from '../../effect/TweenAnimHelper';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { UINetworkTipComponent } from './UINetworkTipComponent';
import { TimerGlobalComponentSystem } from '../../../sharing.base/service/timer/TimerGlobalComponentSystem';

@CocosDecorators.SystemRegister()
export class UINetworkTipComponentAwakeSystem extends AwakeSystem<UINetworkTipComponent>{
    constructor() {
        super(UINetworkTipComponent);
    }

    public awake(self: UINetworkTipComponent) {
        logger.info('UINetworkTipComponentAwakeSystem awake');
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.Circle = rc.get('Circle');
        self.Value = rc.get<Node>('Value').getComponent(Label);

        self.show = false;

        self.Value.string = '';
        TweenAnimationHelper.circleRotation(self.Circle, 1)
    }
}

export class UINetworkTipComponentSystem {
    private static async showTip(self: UINetworkTipComponent, status: string) {
        self.show = true;
        // 200ms以内延时不显示
        await TimerGlobalComponentSystem.sleep(0.2)
        if (!self.show) {
            return;
        }
        self.getParent<UI>().node.active = true;
    }

    private static hideTip(self: UINetworkTipComponent) {
        self.show = false;
        // self.Value.string = '';
        self.getParent<UI>().node.active = false;
    }

    public static connectTips(self: UINetworkTipComponent, isShow: boolean): void {
        if (isShow) {
            this.showTip(self, 'connecting');
        } else {
            this.hideTip(self);
        }
    }

    public static reconnectTips(self: UINetworkTipComponent, isShow: boolean): void {
        if (isShow) {
            this.showTip(self, 'reconnecting');
        } else {
            this.hideTip(self);
        }
    }

    public static requestTips(self: UINetworkTipComponent, isShow: boolean): void {
        if (isShow) {
            this.showTip(self, 'requesting');
        } else {
            this.hideTip(self);
        }
    }
}