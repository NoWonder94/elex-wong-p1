import { Label, Sprite } from 'cc';
import { UI } from '../UI';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { UISplashComponent } from './UISplashComponent';
import { UpdateSystem } from '../../../sharing.base/core/object/IUpdateSystem';
import { Game } from '../../../sharing.base/core/entity/Game';
import { GlobalComponentSystem } from '../../service/global/GlobalComponentSystem';
import { CocosDecorators } from '../../CocosDecorators';
import { TweenAnimationHelper } from '../../effect/TweenAnimHelper';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { MessageComponentSystem } from '../../service/message/MessageComponentSystem';
import { MessageEventType } from '../../service/message/MessageComponent';
import { SubscibeEvent } from '../../SubscibeEvent';
import { DestroySystem } from '../../../sharing.base/core/object/IDestroySystem';

@CocosDecorators.SystemRegister()
export class UISplashComponentAwakeSystem extends AwakeSystem<UISplashComponent>{
    constructor() {
        super(UISplashComponent);
    }

    public awake(self: UISplashComponent, waitEvents: string[]) {
        UISplashComponent.instance = self;
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        self.waitEvents = new Set(waitEvents);
        logger.info('UISplashComponentAwakeSystem awake');
        self.Background = rc.get('Background');
        self.StatusLabel = rc.get('StatusLabel', Label);
        self.Bar = rc.get<Sprite>('Bar', Sprite);
        self.Bar.fillRange = 0;
        UISplashComponentSystem.show();
        UISplashComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class UISplashComponentDestroySystem extends DestroySystem<UISplashComponent>{
    constructor() {
        super(UISplashComponent);
    }

    destroy(self: UISplashComponent) {
        UISplashComponentSystem.offListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class UISplashComponentUpdateSystem extends UpdateSystem<UISplashComponent>{
    constructor() {
        super(UISplashComponent);
    }

    public update(self: UISplashComponent) {
        if (self.waitEvents.size == 0) {
            UISplashComponentSystem.hide();
        }
    }
}

@CocosDecorators.SystemRegister()
export class UISplashComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: UISplashComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SubscibeEvent.UILoadingProgress, callback: FunctionCaller.create(this.setProgress, this, self) }
        ]);
    }

    protected static setProgress(self: UISplashComponent, p: number) {
        self.Bar.fillRange = p;
    }

    public static changeStatus(status: string) {
        let self: UISplashComponent = UISplashComponent.instance;
        if (!self.StatusLabel) {
            return;
        }
        self.StatusLabel.string = status;
    }

    public static delWaitEvent(eventName: string) {
        let self: UISplashComponent = UISplashComponent.instance;
        self.waitEvents.delete(eventName);
    }

    /** 显示Splash */
    public static show() {
        let self: UISplashComponent = UISplashComponent.instance;
        TweenAnimationHelper.fadeIn(self.Background, FunctionCaller.create(() => {
            if (self.waitEvents.size == 0) {
                this.hide();
            }
        }, this), 1)
    }

    /** 隐藏Splash */
    public static hide() {
        let self: UISplashComponent = UISplashComponent.instance;

        if (self.isHide) {
            return;
        }
        self.isHide = true;

        TweenAnimationHelper.fadeOut(self.Background, FunctionCaller.create(() => {
            // Splash 完成
            Game.EventSystem.publish(GlobalComponentSystem.getNextEvent());
        }, this), 2, 50)
    }
}