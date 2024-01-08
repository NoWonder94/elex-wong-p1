import { _decorator, Component, EventHandler, PageView } from 'cc';
import { GlobalOptionsKey } from '../constants/Constants';
import { GlobalComponentSystem } from '../service/global/GlobalComponentSystem';
import { SoundComponentSystem } from '../service/sound/SoundComponentSystem';
const { ccclass, property } = _decorator;

@ccclass('CCPageView')
export class CCPageView extends Component {
    /** 最近滚动时间 */
    private lastScrollTime: number;
    /** 自动滚动时间间隔 */
    private autoInterval: number = 10000;
    /** 当前页索引 */
    curPageIndex: number;
    /** page组件 */
    pageView: PageView;

    setAutoPlay(enable: boolean, autoIntervalS: number = 3) {
        this.autoInterval = autoIntervalS * 1000;
        if (enable) {
            this.schedule(this.autoPlayPage, 0.5);
        } else {
            this.unschedule(this.autoPlayPage);
        }
        return this;
    }

    onLoad() {
        this.curPageIndex = 0;
        this.pageView = this.getComponent(PageView);

        let clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = CCPageView.name;
        clickEventHandler.handler = 'onPageEvent';
        clickEventHandler.customEventData = '';

        this.pageView.pageEvents.push(clickEventHandler);

        this.pageView.setCurrentPageIndex(this.curPageIndex);
    }

    onDestroy() {
        this.setAutoPlay(false);
    }

    toLeftPage() {
        SoundComponentSystem.playEffect(GlobalComponentSystem.getOptions<string>(GlobalOptionsKey.ButtonHitSound));
        if (this.curPageIndex - 1 < 0) {
            this.curPageIndex = this.pageView.getPages().length - 1;
        } else {
            this.curPageIndex--;
        }
        this.pageView.scrollToPage(this.curPageIndex, 0.5);
        this.lastScrollTime = Date.now();
    }

    toRightPage() {
        SoundComponentSystem.playEffect(GlobalComponentSystem.getOptions<string>(GlobalOptionsKey.ButtonHitSound));
        if (this.curPageIndex + 1 > this.pageView.getPages().length - 1) {
            this.curPageIndex = 0;
        } else {
            this.curPageIndex++;
        }
        this.pageView.scrollToPage(this.curPageIndex, 0.5);
        this.lastScrollTime = Date.now();
    }

    setPageIndex(index: number) {
        this.curPageIndex = index;
        this.pageView.setCurrentPageIndex(this.curPageIndex);
    }

    private autoPlayPage() {
        if (this.lastScrollTime && Date.now() - this.lastScrollTime < this.autoInterval) {
            return;
        }
        if (this.curPageIndex == this.pageView.getPages().length - 1) {
            this.curPageIndex = 0;
            this.pageView.scrollToPage(this.curPageIndex, 0.5);
            this.lastScrollTime = Date.now();
            return;
        }
        this.pageView.scrollToPage(++this.curPageIndex, 0.5);
        this.lastScrollTime = Date.now();
    }

    // 监听事件
    onPageEvent(sender: PageView, eventType: typeof PageView.EventType) {
        // // 翻页事件
        // if (eventType !== PageView.EventType.PAGE_TURNING) {
        //     return;
        // }
        // PageView.EventType.PAGE_TURNING
        console.log('当前所在的页面索引:' + sender.getCurrentPageIndex());
    }
}
