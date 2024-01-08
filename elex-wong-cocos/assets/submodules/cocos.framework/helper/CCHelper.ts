import { game, math, Node, sp, sys, UITransform, Vec3, dragonBones, Widget, EventTouch, RenderTexture, Camera, Rect, view, rect } from 'cc';
import { DeviceType } from '../../sharing.base/consts';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
import { StringHelper } from '../../sharing.base/helper/StringHelper';
import { CCI18nLabelString } from '../components/I18n/CCI18nLabelString';
import { WidgetConfigItem } from '../constants/Constants';

export class CCHelper {
    private static widgetAlignKeys = ['isAlignLeft', 'isAlignRight', 'isAlignTop', 'isAlignBottom', 'isAlignHorizontalCenter', 'isAlignVerticalCenter'];

    public static getDeviceType(): DeviceType {
        let devType = DeviceType.PC;
        switch (sys.os) {
            case sys.OS.ANDROID:
                devType = DeviceType.ANDROID;
                break;
            case sys.OS.IOS:
                devType = DeviceType.IOS;
                break;
            case sys.OS.WINDOWS:
            case sys.OS.WINRT:
            case sys.OS.LINUX:
            case sys.OS.OSX:
                devType = DeviceType.PC;
                break;
        }
        return devType;
    }

    /**
     * 相对父节点最大化等比显示目标节点
     */
    public static maxScaleNode(target: Node) {
        let parentTransform = target.parent.getComponent(UITransform);
        let targetTransform = target.getComponent(UITransform);
        if (targetTransform.width < parentTransform.width && targetTransform.height < parentTransform.height) {
            // 无需缩放
            return;
        }

        let scale = Math.min(parentTransform.width / targetTransform.width, parentTransform.height / targetTransform.height);
        target.scale = math.v3(scale);
    }

    public static restart() {
        // game.restart();
        game.end();
    }

    public static setWidget(widget: Widget, configs: WidgetConfigItem[]) {
        this.widgetAlignKeys.forEach((key) => {
            widget[key] = false;
        });
        configs.forEach((item) => {
            widget[`isAlign${item.type.toUpFirst()}`] = true;
            widget[item.type] = item.value;
        });
    }

    public static cancleSkeletonListener(anim: sp.Skeleton) {
        anim.setStartListener(null);
        anim.setCompleteListener(null);
    }

    public static playSkeletonDefaultAnimation(anim: sp.Skeleton, loop: boolean = false, speed: number = 1, start?: FunctionCaller, end?: FunctionCaller) {
        anim.loop = loop;

        start &&
            anim.setStartListener((x) => {
                start.exec();
            });

        end &&
            anim.setCompleteListener((x) => {
                end.exec();
            });

        if (speed) anim.timeScale = speed;

        let def = anim.skeletonData.getAnimsEnum() as any;
        anim.animation = def['1'];
    }

    /**
     * 播放龙骨默认动画
     * @param anim 动画组件
     * @param playTimes 播放次数.
     * -1 表示使用配置文件中的默认值;
     * 0 表示无限循环
     * >0 表示循环次数
     * @param speed
     * @param start
     * @param end
     */

    public static playDrangonDefaultAnimation(anim: dragonBones.ArmatureDisplay, playTimes: number = 1, speed: number = 1, start?: FunctionCaller, end?: FunctionCaller) {
        start && anim.once(dragonBones.EventObject.START, () => {
            start.exec();
        }, this);

        // LOOP_COMPLETE
        end && anim.once(dragonBones.EventObject.COMPLETE, () => {
            end.exec();
        }, this);

        if (speed) anim.timeScale = speed;

        if (anim.dragonAsset.dragonBonesJson) {
            let dragonBonesJson = JSON.parse(anim.dragonAsset.dragonBonesJson);
            anim.armatureName = dragonBonesJson.armature[0].name;
            anim.playAnimation(dragonBonesJson.armature[0].animation[0].name, playTimes);
        }
    }

    public static setLanguageResId(node: Node, resId: string) {
        if (!node) logger.warn('resId node is null!');
        return node.addComponent(CCI18nLabelString).setResId(resId);
    }

    /** 截图 */
    public static captureScreen(camera: Camera, prop?: Node | Rect) {
        // let newTexture = new RenderTexture();
        // let oldTexture = camera.targetTexture;
        // let visibleRect = view.getVisibleSize()
        // let rectV: Rect = rect(0, 0, visibleRect.width, visibleRect.height);
        // if (prop) {
        //     if (prop instanceof Node) {
        //         rectV = prop.getComponent(UITransform).getBoundingBoxToWorld();
        //     } else {
        //         rectV = prop;
        //     }
        // }
        // newTexture.initWithSize(visibleRect.width, visibleRect.height, game._renderContext.STENCIL_INDEX8);
        // camera.targetTexture = newTexture;
        // camera.render();
        // camera.targetTexture = oldTexture;
        // let buffer = new ArrayBuffer(rectV.width * rectV.height * 4);
        // let data = new Uint8Array(buffer);
        // newTexture.readPixels(data, rectV.x, rectV.y, rectV.width, rectV.height);
        // return data;
    }
}
