// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Button, Enum, Color, color, SpriteFrame, EventHandler } from "cc";

const { ccclass, property, menu } = _decorator;

enum PARAM_TYPE {
    CHILDREN_INDEX,
    CHILDREN_NAME,
}

/**
 * 群体事件，适合绑定节点组的回调信息
 * 将该组件的所处节点的 所有子节点，绑定相同的回调对象
 */
@ccclass("CCButtonGroup")
@menu("自定义组件/UI/CCButtonGroup(一组按钮控制)")
export default class CCButtonGroup extends Component {
    @property({
        type: Enum(Button.Transition),
    })
    transition: number = Button.Transition.NONE;

    @property({
        visible: function () {
            return this.transition === Button.Transition.COLOR;
        },
    })
    hoverColor: Color = color(255, 255, 255);

    @property({
        visible: function () {
            return this.transition === Button.Transition.COLOR;
        },
    })
    normalColor: Color = color(214, 214, 214);

    @property({
        visible: function () {
            return this.transition === Button.Transition.COLOR;
        },
    })
    pressedColor: Color = color(211, 211, 211);

    @property({
        visible: function () {
            return this.transition === Button.Transition.COLOR;
        },
    })
    disabledColor: Color = color(124, 124, 124);

    @property({
        type: SpriteFrame,
        visible: function () {
            return this.transition === Button.Transition.SPRITE;
        },
    })
    normalSprite: SpriteFrame = null;

    @property({
        type: SpriteFrame,
        visible: function () {
            return this.transition === Button.Transition.SPRITE;
        },
    })
    pressedSprite: SpriteFrame = null;

    @property({
        type: SpriteFrame,
        visible: function () {
            return this.transition === Button.Transition.SPRITE;
        },
    })
    hoverSprite: SpriteFrame = null;

    @property({
        type: SpriteFrame,
        visible: function () {
            return this.transition === Button.Transition.SPRITE;
        },
    })
    disabledSprite: SpriteFrame = null;

    @property({
        visible: function () {
            return this.transition === Button.Transition.SCALE || this.transition === Button.Transition.COLOR;
        },
    })
    duration: number = 1.0;

    @property({
        visible: function () {
            return this.transition === Button.Transition.SCALE;
        },
    })
    zoomScale: number = 1.1;

    @property({
        type: Enum(PARAM_TYPE),
    })
    paramType: PARAM_TYPE = PARAM_TYPE.CHILDREN_INDEX;

    @property([EventHandler])
    touchEvents: EventHandler[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.children.forEach((node, nodeIndex) => {
            let comp = node.getComponent(Button);
            if (!comp) {
                comp = node.addComponent(Button);
            }

            //同步属性
            comp.target = node;
            comp.transition = this.transition;

            if (comp.transition == Button.Transition.COLOR) {
                comp.hoverColor = this.hoverColor;
                comp.normalColor = this.normalColor;
                comp.pressedColor = this.pressedColor;
                comp.disabledColor = this.disabledColor;
            } else if (comp.transition == Button.Transition.SPRITE) {
                comp.disabledSprite = this.disabledSprite;
                comp.hoverSprite = this.hoverSprite;
                comp.normalSprite = this.normalSprite;
                comp.pressedSprite = this.pressedSprite;
            } else if (comp.transition == Button.Transition.SCALE) {
                comp.zoomScale = this.zoomScale;
            }

            //绑定回调事件
            this.touchEvents.forEach((event) => {
                //克隆数据，每个节点获取的都是不同的回调
                let hd = new EventHandler(); //copy对象
                hd.target = event.target;
                hd.handler = event.handler;
                hd.component = event.component;
                hd["_componentId"] = event["_componentId"];
                // 参数
                if (this.paramType === PARAM_TYPE.CHILDREN_INDEX) {
                    hd.customEventData = nodeIndex.toString();
                } else {
                    hd.customEventData = node.name;
                }
                comp.clickEvents.push(hd);
            });
        });
    }

    // update (dt) {}
}
