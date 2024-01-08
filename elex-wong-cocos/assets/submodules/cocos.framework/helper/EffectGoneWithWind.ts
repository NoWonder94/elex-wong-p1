import { Camera, Component, Node, Quat, Sprite, SpriteFrame, Texture2D, tween, UIOpacity, UITransform, Vec2, Vec3, _decorator } from 'cc';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';
import { GlobalComponentSystem } from '../service/global/GlobalComponentSystem';
const { ccclass, property, executeInEditMode, requireComponent, menu } = _decorator;

/**
 * - 随风而逝的效果
 * - 第一段: 被风吹似乎要掉的感觉
 * - 第二段: 朝右上角所有的纸片全部飞散
 * - ps:在播放完毕后会自动删除掉
 */
@ccclass('EffectGoneWithWind')
export default class EffectGoneWithWind extends Component {
    @property({
        type: SpriteFrame,
        tooltip: 'sprite将会用到帧图片',
    })
    spriteItem: SpriteFrame = null;

    protected time = 0;

    /** 纸片 */
    private paperNodes: {
        [row: number]: {
            [col: number]: Node;
        };
    };

    start() {
        this.paperNodes = {};

        this.generatePaper();
    }

    update(t) {
        this.time++;
        if (this.time == 1500) {
            logger.info('**************');
            this.playStage1();
        }
    }

    /** 生成 40*40 的小图块 */
    private generatePaper() {
        let width = Math.floor(1680);
        let height = Math.floor(1680);
        let unitWidth = width / 40;
        let unitHeight = height / 40;
        for (let row = 1; row <= 40; row++) {
            for (let col = 1; col <= 40; col++) {
                let node = new Node();
                node.parent = this.node;
                node.position = new Vec3(0, 0, 0);
                let sprite = node.addComponent(Sprite);
                sprite.spriteFrame = this.spriteItem;
                let nodeSize = node.getComponent(UITransform);
                nodeSize.setContentSize(unitWidth, unitHeight);
                node.addComponent(UIOpacity).opacity = 255;

                if (!this.paperNodes[row]) this.paperNodes[row] = {};
                this.paperNodes[row][col] = node;

                node.active = true;

                logger.info('**************11');
            }
        }
    }

    /** 摇动 */
    public static roke(node: Node, interval = 1, tag = 1) {
        if (!node) return;
        tween(node)
            .parallel(
                tween()
                    .by(0.1, { rotation: new Quat(0, 5, 0, 0) })
                    .by(0.2, { rotation: new Quat(0, -10, 0, 0) })
                    .by(0.1, { rotation: new Quat(0, 5, 0, 0) })
            )
            .delay(interval)
            .call(() => {
                node.rotation = new Quat(0, 0, 0, 0);
            });
    }

    /** 让所有的块都晃动起来 */
    public playStage1() {
        for (let row = 1; row <= 20; row++) {
            for (let col = 1; col <= 30; col++) {
                let node = this.paperNodes[row][col];
                EffectGoneWithWind.roke(node);
            }
        }
        return this;
    }

    public playStage2(callback?: () => void) {
        let nodes: Node[] = [];
        for (let row = 40; row >= 1; row--) {
            for (let col = 1; col <= 40; col++) {
                let node = this.paperNodes[row][col];
                nodes.push(node);
            }
        }
        let callbackCount = 0;

        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];

            let op = node.getComponent(UIOpacity);
            let tw_1 = tween(op).to(0.3, { opacity: 0 });

            tween(node)
                .delay(Math.random() * 0.25)
                .parallel(
                    tween()
                        .to(0.3, { scale: new Vec3(0, 0, 0) })
                        .then(tw_1)
                )
                .removeSelf()
                .call(() => {
                    callbackCount++;
                    if (callbackCount == nodes.length) {
                        // this.node.active = false;
                    }
                })
                .start();
        }
    }
}
