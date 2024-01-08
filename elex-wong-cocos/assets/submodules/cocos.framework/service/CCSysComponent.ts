import { game, Game as CCGame, view, director, screen, dynamicAtlasManager, macro } from 'cc';
import { AwakeSystem } from '../../sharing.base/core/object/IAwakeSystem';
import { Entity } from '../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../CocosDecorators';
import { CCTouchType, DIRECTION } from '../components/CCTouchInput';

// 横竖屏切换组件
@CocosDecorators.ClassNameRegister("CCSysComponent")
export class CCSysComponent extends Entity {
}

@CocosDecorators.SystemRegister()
export class CCSysComponentAwakeSystem extends AwakeSystem<CCSysComponent> {
    constructor() {
        super(CCSysComponent);
    }

    awake(self: CCSysComponent) {
        // 启用自动合批
        // macro.CLEANUP_IMAGE_CACHE = false;
        // dynamicAtlasManager.enabled = true;

        // 禁用合批
        dynamicAtlasManager.enabled = false;
        game.on(CCGame.EVENT_HIDE, () => {
            logger.info("Game hide");
        });

        game.on(CCGame.EVENT_SHOW, () => {
            logger.info("Game show");
        });

        view.resizeWithBrowserSize(true);
        view.enableAutoFullScreen(true);
        view.enableRetina(true);
    }

}