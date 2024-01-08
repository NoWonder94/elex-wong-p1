import { Label } from 'cc';
import { UI } from '../UI';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { UIToastComponent } from './UIToastComponent';
import { CocosDecorators } from '../../CocosDecorators';
import { TweenAnimationHelper } from '../../effect/TweenAnimHelper';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { TimerGlobalComponentSystem } from '../../../sharing.base/service/timer/TimerGlobalComponentSystem';

@CocosDecorators.SystemRegister()
export class UIToastComponentAwakeSystem extends AwakeSystem<UIToastComponent>{
    constructor() {
        super(UIToastComponent);
    }

    public awake(self: UIToastComponent) {
        UIToastComponent.instance = self;
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        logger.info('UIToastComponentAwakeSystem awake');
        self.Value = rc.get('Value');
        self.Root = self.Value.parent;
    }
}

@CocosDecorators.SystemRegister()
export class UIToastComponentSystem {
    /** 显示Toast */
    public static show(text: string, showTimed: number = 1) {
        let self: UIToastComponent = UIToastComponent.instance;
        self.Root.active = true;
        self.Value.getComponent(Label).string = text;
        TweenAnimationHelper.fadeIn(self.Root, FunctionCaller.create(() => {
            TimerGlobalComponentSystem.once(showTimed, FunctionCaller.create(() => {
                TweenAnimationHelper.fadeOut(self.Root, FunctionCaller.create(() => {
                    self.Root.active = false;
                }, this), 0.2)
            }, this))
        }, this), 0.2)
    }
}