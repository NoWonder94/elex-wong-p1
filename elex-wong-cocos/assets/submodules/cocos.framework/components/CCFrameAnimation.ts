import { SpriteFrame, Sprite, Component, _decorator, CCBoolean } from "cc";
import { FunctionCaller } from "../../sharing.base/helper/FunctionCaller";
const { ccclass, property, executeInEditMode, requireComponent, menu } = _decorator;

/**
 * 帧动画播放组件
 */
@ccclass('CCFrameAnimation')
@executeInEditMode
@requireComponent(Sprite)
@menu("自定义组件/UI/CCFrameAnimation(帧动画组件)")
export default class CCFrameAnimation extends Component {
    /** 帧动画图集 */
    @property({ type: [SpriteFrame], tooltip: '帧动画图集' })
    spriteFrames: Array<SpriteFrame> = [];

    /** 帧的时间间隔 */
    @property({ tooltip: '帧的时间间隔' })
    public duration: number = 0.1;

    /** 是否循环播放 */
    @property({ tooltip: '是否循环播放' })
    public loop: boolean = false;

    /** 是否在组件加载的时候播放 */
    @property({ tooltip: '是否在组件加载的时候播放' })
    public isPlayOnload: boolean = false;

    @property({
        tooltip: '当前显示的帧图',
        override: true,
        step: 1,
    })
    get index() {
        return this._index;
    }
    set index(value: number) {
        this.setIndex(value);
    }
    @property
    private _index: number = 0;

    /** 是否正在播放 */
    private isPlaying: boolean = false;
    /** 播放时间 */
    private playTime: number = 0;
    /** 精灵组件 */
    private sprite: Sprite = null;
    /** 播放结束回调 */
    private endFunc: FunctionCaller = null;
    /** 是否已经再循环播放 */
    private isLoop: boolean = false;

    onLoad() {
        let spriteCom = this.node.getComponent(Sprite);
        if (!spriteCom) {
            spriteCom = this.node.addComponent(Sprite);
        }

        this.sprite = spriteCom;
        // 显示第0个frame;
        if (this.isPlayOnload) {
            this.sprite.spriteFrame = this.spriteFrames[0];
            if (!this.loop) {
                this.play();
            } else {
                this.play(true);
            }
        }
    }

    /**
     * 播放
     * @param loop 释放循环播放
     * @param endFunc 播放结束
     */
    public play(loop?: boolean, handler?: FunctionCaller) {
        this.playTime = 0;
        this.isPlaying = true;
        this.isLoop = loop || false;
        this.endFunc = handler;
    }

    public stop() {
        this.playTime = 0;
        this.isPlaying = false;
        this.isLoop = false;
    }

    /**
     * 每帧刷新
     * @param dt 距离上一次刷新过去的时间
     */
    update(dt: number) {
        // 没有启动播放，不做处理
        if (!this.isPlaying) {
            return;
        }

        //累积播放的时间
        this.playTime += dt;

        // 计算时间，应当播放第几帧，而不是随便的下一帧，
        // 否则的话，同样的动画1, 60帧，你在30FPS的机器上你会播放2秒，
        // 你在60FPS的机器上你会播放1秒，动画就不同步;
        let index = Math.floor(this.playTime / this.duration); // 向下取整数
        if (this.isLoop == false) {
            if (index >= this.spriteFrames.length) {
                // this.sprite.spriteFrame = this.spriteFrames[this.spriteFrames.length - 1];
                this.setIndex(this.spriteFrames.length - 1)
                this.isPlaying = false;
                this.playTime = 0;
                if (this.endFunc) {
                    this.endFunc.exec();
                }
                return;
            } else {
                // this.sprite.spriteFrame = this.spriteFrames[index];
                this.setIndex(index)
            }
        } else {
            while (index >= this.spriteFrames.length) {
                index -= this.spriteFrames.length;
                this.playTime -= (this.duration * this.spriteFrames.length);
            }

            // this.sprite.spriteFrame = this.spriteFrames[index];
            this.setIndex(index)
        }
    }

    protected setIndex(value: number) {
        if (value < 0) return;
        this._index = value % this.spriteFrames.length;
        //设置 Sprite 组件的spriteFrame属性，变换图片               
        this.sprite.spriteFrame = this.spriteFrames[this._index];
    }

}