import { game, Game as CCGame, view, macro, ResolutionPolicy } from 'cc';
import { AwakeSystem } from '../../sharing.base/core/object/IAwakeSystem';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
import Config, { OrientationId } from '../config';
import { SubscibeEvent } from '../SubscibeEvent';
import { EventGlobalComponentSystem } from '../../sharing.base/service/event/EventGlobalComponentSystem';
import { Entity } from '../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../CocosDecorators';
import { TimerGlobalComponentSystem } from '../../sharing.base/service/timer/TimerGlobalComponentSystem';

// 横竖屏切换组件
@CocosDecorators.ClassNameRegister('OrientationComponent')
export class OrientationComponent extends Entity {}

@CocosDecorators.SystemRegister()
export class OrientationComponentAwakeSystem extends AwakeSystem<OrientationComponent> {
    constructor() {
        super(OrientationComponent);
    }

    awake(self: OrientationComponent) {
        let platformConfig = window['PlatformConfig'] as Config;
        if (platformConfig.Orientation == OrientationId.landscape) {
            platformConfig.CurOrientation = OrientationId.landscape;
            view.setOrientation(macro.ORIENTATION_LANDSCAPE);
            view.setDesignResolutionSize(platformConfig.DesignResolutionSize.width, platformConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_HEIGHT);
        } else if (platformConfig.Orientation == OrientationId.portrait) {
            platformConfig.CurOrientation = OrientationId.portrait;
            view.setOrientation(macro.ORIENTATION_PORTRAIT);
            view.setDesignResolutionSize(platformConfig.DesignResolutionSize.height, platformConfig.DesignResolutionSize.width, ResolutionPolicy.FIXED_WIDTH);
        } else {
            view.setOrientation(macro.ORIENTATION_AUTO);
            let frameSize = view.getFrameSize();
            if (frameSize.width > frameSize.height) {
                // 横屏
                platformConfig.CurOrientation = OrientationId.landscape;
                view.setDesignResolutionSize(platformConfig.DesignResolutionSize.width, platformConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_HEIGHT);
            } else {
                // 竖屏
                platformConfig.CurOrientation = OrientationId.portrait;
                view.setDesignResolutionSize(platformConfig.DesignResolutionSize.height, platformConfig.DesignResolutionSize.width, ResolutionPolicy.FIXED_WIDTH);
            }

            view.setResizeCallback(() => {
                let frameSize = view.getFrameSize();
                let canvasSize = view.getCanvasSize();
                let designResolutionSize = view.getDesignResolutionSize();
                let visibleSize = view.getVisibleSize();
                let resolutionPolicy = view.getResolutionPolicy();

                logger.info('setResizeCallback frameSize =', JSON.stringify(frameSize));
                logger.info('setResizeCallback canvasSize =', JSON.stringify(canvasSize));
                logger.info('setResizeCallback designResolutionSize =', JSON.stringify(designResolutionSize));
                logger.info('setResizeCallback visibleSize =', JSON.stringify(visibleSize));
                logger.info('setResizeCallback resolutionPolicy =', JSON.stringify(resolutionPolicy));
                logger.info('setResizeCallback getScaleX =', view.getScaleX());
                logger.info('setResizeCallback getScaleY =', view.getScaleY());

                let oldorientation = platformConfig.CurOrientation;
                let orientation = platformConfig.CurOrientation;
                if (frameSize.width > frameSize.height) {
                    // 横屏
                    orientation = OrientationId.landscape;
                    view.setDesignResolutionSize(platformConfig.DesignResolutionSize.width, platformConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_HEIGHT);
                } else {
                    // 竖屏
                    orientation = OrientationId.portrait;
                    view.setDesignResolutionSize(platformConfig.DesignResolutionSize.height, platformConfig.DesignResolutionSize.width, ResolutionPolicy.FIXED_WIDTH);
                }
                platformConfig.CurOrientation = orientation;
                logger.info('是否发通知', oldorientation, orientation);

                if (orientation !== oldorientation) {
                    logger.info('是否发通知111', oldorientation, orientation);
                    TimerGlobalComponentSystem.once(
                        0.1,
                        FunctionCaller.create(() => {
                            EventGlobalComponentSystem.emit(SubscibeEvent.DevOrientationChange, platformConfig.CurOrientation);
                        })
                    );
                }
            });
        }
    }
}
