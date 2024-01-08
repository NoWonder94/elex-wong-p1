import { Label, Node } from 'cc';
import { UI } from '../UI';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { UICircleLoadingComponent } from './UICircleLoadingComponent';
import { CocosDecorators } from '../../CocosDecorators';
import { SubscibeEvent } from '../../SubscibeEvent';
import { NumberFormatHelper } from '../../helper/NumberFormatHelper';
import { TweenAnimationHelper } from '../../effect/TweenAnimHelper';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { MessageComponentSystem } from '../../service/message/MessageComponentSystem';
import { DestroySystem } from '../../../sharing.base/core/object/IDestroySystem';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { MessageEventType } from '../../service/message/MessageComponent';

@CocosDecorators.SystemRegister()
export class UICircleLoadingComponentAwakeSystem extends AwakeSystem<UICircleLoadingComponent> {
    constructor() {
        super(UICircleLoadingComponent);
    }

    public awake(self: UICircleLoadingComponent, status: string) {
        logger.info('UICircleLoadingComponentAwakeSystem awake');
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.Circle = rc.get('Circle');
        self.Value = rc.get<Node>('Value').getComponent(Label);

        if (status) {
            self.Value.string = status;
        } else {
            self.Value.string = '';
        }

        UICircleLoadingComponentSystem.awake(self);
        UICircleLoadingComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class PokzjhUILoginComponentDestroySystem extends DestroySystem<UICircleLoadingComponent> {
    constructor() {
        super(UICircleLoadingComponent);
    }

    destroy(self: UICircleLoadingComponent) {
        UICircleLoadingComponentSystem.offListener(self);
    }
}

export class UICircleLoadingComponentSystem extends MessageComponentSystem {
    public static awake(self: UICircleLoadingComponent) {
        TweenAnimationHelper.circleRotation(self.Circle, 1);
    }

    protected static listLocalNotifications(self: UICircleLoadingComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([{ name: SubscibeEvent.UILoadingProgress, callback: FunctionCaller.create(this.setProgress, this, self) }]);
    }

    public static setProgress(self: UICircleLoadingComponent, p: number) {
        if (!self.Value) {
            return;
        }
        self.Value.string = NumberFormatHelper.progress2Percent(p);
    }
}
