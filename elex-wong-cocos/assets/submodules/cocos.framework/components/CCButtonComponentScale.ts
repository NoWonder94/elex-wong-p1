import { _decorator, Button } from 'cc';
import { CCButtonComponent } from './CCButtonComponent';
const { ccclass, property } = _decorator;

@ccclass('CCButtonComponentScale')
export class CCButtonComponentScale extends CCButtonComponent {
    onLoad(): void {
        super.onLoad();
        this.btn.transition = Button.Transition.SCALE;
        this.btn.zoomScale = 1.1;
        this.btn.duration = 0.1;
    }
}
