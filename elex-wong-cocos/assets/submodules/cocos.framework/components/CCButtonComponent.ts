import { _decorator, Component, Button, EventHandler, Event, math, color } from 'cc';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
import { CocosDecorators } from '../CocosDecorators';
import { GlobalOptionsKey } from '../constants/Constants';
import { GlobalComponentSystem } from '../service/global/GlobalComponentSystem';
import { SoundComponentSystem } from '../service/sound/SoundComponentSystem';
const { ccclass, property } = _decorator;

@ccclass('CCButtonComponent')
@CocosDecorators.ClassNameRegister('CCButtonComponent')
export class CCButtonComponent extends Component {
    protected btn: Button = null;
    protected handlers: FunctionCaller[] = [];
    protected clickName: string = 'onClick';
    protected clickEventHandlers: EventHandler[] = [];
    protected audioEffect: string;
    protected interactable: boolean = true;

    onLoad(): void {
        this.btn = this.node.getComponent(Button);
        if (!this.btn) {
            this.btn = this.node.addComponent(Button);
            this.btn.transition = Button.Transition.NONE;
        }
        this.btn.interactable = true;
        this.audioEffect = GlobalComponentSystem.getOptions<string>(GlobalOptionsKey.ButtonHitSound);
    }

    start() {
        if (!this.btn) {
            return;
        }
        this.btn.clickEvents = this.clickEventHandlers;

        this.Interactable = this.interactable;
    }

    public set Interactable(val: boolean) {
        if (this.btn) {
            this.btn.interactable = val;
        }
        this.interactable = val;
    }

    public setEffect(effect: any) {
        if (null != effect.interactable) {
            this.btn.interactable = effect.interactable;
        }
        if (null != effect.transition) {
            this.btn.transition = effect.transition;
        }
        if (null != effect.zoomScale) {
            this.btn.zoomScale = effect.zoomScale;
        }
        if (null != effect.duration) {
            this.btn.duration = effect.duration;
        }
        return this;
    }

    public setHitAudioEffect(url: string) {
        this.audioEffect = url;
    }

    public setInteractable(enable: boolean) {
        if (this.btn) {
            this.btn.interactable = enable;
        }
        this.interactable = enable;
    }

    public setClickHandler(handler: FunctionCaller) {
        this.handlers = [];
        let clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = CCButtonComponent.name;
        clickEventHandler.handler = this.clickName;
        clickEventHandler.customEventData = '';
        this.clickEventHandlers.push(clickEventHandler);
        this.handlers.push(handler);
        return this;
    }

    public addClickHandler(handler: FunctionCaller) {
        let clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = CCButtonComponent.name;
        clickEventHandler.handler = this.clickName;
        clickEventHandler.customEventData = '';
        this.clickEventHandlers.push(clickEventHandler);
        this.handlers.push(handler);
        return this;
    }

    public addEventComponent(component: string, handler: string, eventData: string) {
        let clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = component;
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = eventData;
        this.clickEventHandlers.push(clickEventHandler);
        return this;
    }

    protected onClick(event: Event) {
        if (this.audioEffect) {
            SoundComponentSystem.playEffect(this.audioEffect);
        }
        for (let handler of this.handlers) {
            handler.exec(event);
        }
    }
}
