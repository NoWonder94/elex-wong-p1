import { Component, RichText, Node, _decorator, UITransform, math, CCString } from 'cc';

const { ccclass, property } = _decorator;
import { DEV } from 'cc/env';

/**
 * 滚动文字
 */
@ccclass('CCMarquee')
export default class CCMarquee extends Component {

    @property({ type: Node, tooltip: DEV && '容器节点' })
    private view: Node = null;

    @property({ type: RichText, tooltip: DEV && '文本组件' })
    private label: RichText = null;

    @property({ type: CCString, tooltip: '文本队列' })
    private texts: string[] = [];

    @property({ tooltip: DEV && '每帧移动的像素' })
    private speed: number = 1;

    @property({ tooltip: DEV && '循环播放' })
    private loop: boolean = false;

    @property({ tooltip: DEV && '自动播放' })
    private playOnLoad: boolean = false;

    private index: number = 0;

    private isPlaying: boolean = false;

    private endCallback: Function = null;

    protected onLoad() {
        this.init();
        this.playOnLoad && this.play(0, this.loop);
    }

    protected update(dt: number) {
        if (!this.isPlaying || this.texts.length === 0) return;
        this.updatePosition();
    }

    private init() {
        this.label.node.getComponent(UITransform).anchorX = 0;
        this.setLabel('');
    }

    private updatePosition() {
        this.label.node.position.set(this.label.node.position.x - this.speed);
        this.label.node.setPosition(this.label.node.position.add(math.v3(- this.speed)))
        if (this.label.node.position.x <= -(this.view.getComponent(UITransform).width / 2 + this.label.node.getComponent(UITransform).width)) this.next();
    }

    private setLabel(text: string) {
        this.label.string = text;
        this.label.node.position.set(this.view.getComponent(UITransform).width / 2);
    }

    private next() {
        this.index++;
        if (this.index >= this.texts.length) {
            if (this.loop) {
                this.index = 0;
                this.setLabel(this.texts[0]);
            } else {
                if (this.endCallback) {
                    this.endCallback();
                    this.endCallback = null;
                }
                this.clean();
            }
        } else {
            this.setLabel(this.texts[this.index]);
        }
    }

    public push(texts: string | string[]) {
        if (Array.isArray(texts)) this.texts.push(...texts);
        else this.texts.push(texts);
    }

    public play(index: number = 0, loop: boolean = false, callback: Function = null) {
        if (this.texts.length === 0) return;

        this.index = index < this.texts.length ? index : 0;
        this.setLabel(this.texts[this.index]);

        this.loop = loop;
        this.endCallback = callback;

        this.isPlaying = true;
    }

    public stop() {
        this.isPlaying = false;
        this.index = 0;
    }

    public pause() {
        this.isPlaying = false;
    }

    public resume() {
        this.isPlaying = true;
    }

    public clean() {
        this.stop();
        this.index = 0;
        this.texts = [];
        this.endCallback = null;
    }
}
