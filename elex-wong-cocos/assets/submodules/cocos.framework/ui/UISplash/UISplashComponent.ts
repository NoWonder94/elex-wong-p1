import { Label, Node, Sprite } from 'cc';
import { CocosDecorators } from '../../CocosDecorators';
import { NodeComponent } from '../../service/NodeComponent';

@CocosDecorators.ClassNameRegister('UISplashComponent')
export class UISplashComponent extends NodeComponent {
    public static instance: UISplashComponent;
    /** 背景 */
    public Background: Node;
    /** 状态label */
    public StatusLabel: Label;
    /** 等待事件 */
    public waitEvents: Set<string>;
    /** 是否已经隐藏Splash */
    public isHide: boolean = false;

    /** 圆形 */
    public Bar: Sprite;
}

