import { Label, Node, Sprite } from 'cc';
import { UI } from '../UI';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { UILoadingComponent } from './UILoadingComponent';
import { CocosDecorators } from '../../CocosDecorators';
import { SubscibeEvent } from '../../SubscibeEvent';
import { NumberFormatHelper } from '../../helper/NumberFormatHelper';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { MessageComponentSystem } from '../../service/message/MessageComponentSystem';
import { DestroySystem } from '../../../sharing.base/core/object/IDestroySystem';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { MessageEventType } from '../../service/message/MessageComponent';

@CocosDecorators.SystemRegister()
export class UILoadingComponentAwakeSystem extends AwakeSystem<UILoadingComponent> {
    constructor() {
        super(UILoadingComponent);
    }

    public awake(self: UILoadingComponent, status: string) {
        logger.info('UILoadingComponentAwakeSystem awake');
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.Value = rc.get<Node>('Value').getComponent(Label);

        self.Bar = rc.get<Sprite>('Bar', Sprite);

        UILoadingComponentSystem.setProgress(self, 0);

        UILoadingComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class PokzjhUILoginComponentDestroySystem extends DestroySystem<UILoadingComponent> {
    constructor() {
        super(UILoadingComponent);
    }

    destroy(self: UILoadingComponent) {
        UILoadingComponentSystem.offListener(self);
    }
}

export class UILoadingComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: UILoadingComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([{ name: SubscibeEvent.UILoadingProgress, callback: FunctionCaller.create(this.setProgress, this, self) }]);
    }

    public static setProgress(self: UILoadingComponent, p: number) {
        if (self.Value) {
            self.Value.string = NumberFormatHelper.progress2Percent(p);
        }

        if (self.Bar) {
            self.Bar.fillRange = p;
        }
    }
}
