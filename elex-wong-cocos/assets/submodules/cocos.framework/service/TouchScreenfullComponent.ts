import { game, view, director, screen } from 'cc';
import { AwakeSystem } from '../../sharing.base/core/object/IAwakeSystem';
import { Entity } from '../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../CocosDecorators';
import { CCTouchType, DIRECTION } from '../components/CCTouchInput';

// 横竖屏切换组件
@CocosDecorators.ClassNameRegister("TouchScreenfullComponent")
export class TouchScreenfullComponent extends Entity {
    enableRef: Set<string>;
}

@CocosDecorators.SystemRegister()
export class TouchScreenfullComponentAwakeSystem extends AwakeSystem<TouchScreenfullComponent> {
    constructor() {
        super(TouchScreenfullComponent);
    }

    awake(self: TouchScreenfullComponent) {
        self.enableRef = new Set<string>();

        view.resizeWithBrowserSize(true);
        view.enableAutoFullScreen(true);
        view.enableRetina(true);

        director.on('CCTouchScreenfullSwitch', (enable: boolean, id: string) => {
            if (enable) {
                self.enableRef.add(id);
            } else {
                self.enableRef.delete(id);
            }
        }, self)

        director.on(CCTouchType.TouchDirection, (dir: DIRECTION, dis: number) => {
            if (self.enableRef.size > 0) {
                return;
            }

            switch (dir) {
                case DIRECTION.UP:
                case DIRECTION.LEFT_UP:
                case DIRECTION.RIGHT_UP:
                    !screen.fullScreen() && screen.requestFullScreen(game.canvas);
                    break;
                case DIRECTION.DOWN:
                case DIRECTION.LEFT_DOWN:
                case DIRECTION.RIGHT_DOWN:
                    screen.fullScreen() && screen.exitFullScreen();
                    break;
            }
        })
    }

}