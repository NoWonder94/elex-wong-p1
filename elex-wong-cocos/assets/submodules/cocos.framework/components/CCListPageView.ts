import { _decorator, Component, Node, Event, ToggleContainer, EventHandler, ToggleComponent, PageView, UITransform, view } from "cc";
import CCList, { SlideType, TemplateType } from "./list/CCList";
import CCReferenceCollector from "./CCReferenceCollector";
import { FunctionCaller } from "../../sharing.base/helper/FunctionCaller";
import CCSwitchPage from "./CCSwitchPage";
import { CCButtonComponentScale } from "./CCButtonComponentScale";
const { ccclass, property } = _decorator;

enum NavType {
    Pre = "Pre",
    Next = "Next",
}

@ccclass("CCListPageView")
export class CCListPageView extends Component {
    /** 列表组件 */
    list: CCList;
    /** 指示器 */
    toggleContainer: ToggleContainer;
    /** 最近滚动时间 */
    private lastScrollTime: number;

    setAutoPlay(enable: boolean, autoIntervalS: number = 3) {
        if (enable) {
            this.schedule(this.autoPlayPage, autoIntervalS);
        } else {
            this.unschedule(this.autoPlayPage);
        }
        return this;
    }

    onLoad() {
        this.initList();
        this.initNav();
    }

    onDestroy() {
        this.setAutoPlay(false);
    }

    private autoPlayPage() {
        if (this.list.isAutoScrolling) {
            return;
        }

        if (this.lastScrollTime && Date.now() - this.lastScrollTime < 5000) {
            return;
        }

        if (this.list.curPageNum == this.list.numItems - 1) {
            this.list.skipPage(0, 0);
            return;
        }
        this.list.nextPage(1);
    }

    private initList() {
        let rc = this.node.getComponent(CCReferenceCollector);
        let listnode = rc.get<Node>("List");
        let listrc = listnode.getComponent(CCReferenceCollector);
        this.list = listnode.getComponent(CCList);
        this.list.numItems = listrc.get<Node>("ItemTmp").children.length;
        this.list.setRenderEvent(FunctionCaller.create(this.onListRender, this));
        this.list.setPageEvent(FunctionCaller.create(this.onListPageChange, this));
    }

    private initNav() {
        let rc = this.node.getComponent(CCReferenceCollector);
        let navnode = rc.get<Node>("Nav");
        if (!navnode) {
            return;
        }
        let navrc = navnode.getComponent(CCReferenceCollector);
        navrc.get<Node>(NavType.Next) &&
            navrc
                .get<Node>(NavType.Next)
                .addComponent(CCButtonComponentScale)
                .setClickHandler(
                    FunctionCaller.create((ev: Event) => {
                        if (this.list.curPageNum == this.list.numItems - 1) {
                            this.list.skipPage(0, 0);
                            return;
                        }
                        this.list.nextPage(0.5);
                    }, this)
                );

        navrc.get<Node>(NavType.Pre) &&
            navrc
                .get<Node>(NavType.Pre)
                .addComponent(CCButtonComponentScale)
                .setClickHandler(
                    FunctionCaller.create((ev: Event) => {
                        this.list.prePage(0.5);
                    }, this)
                );

        this.toggleContainer = navrc.get<Node>("Indicator").getComponent(ToggleContainer);

        let toggleContainerHandler = new EventHandler();
        toggleContainerHandler.target = this.node;
        toggleContainerHandler.component = CCListPageView.name;
        toggleContainerHandler.handler = "onToggleContainer";
        toggleContainerHandler.customEventData = "";
        this.toggleContainer.checkEvents.push(toggleContainerHandler);
    }

    onToggleContainer(toggle: ToggleComponent) {
        let index = this.toggleContainer.toggleItems.indexOf(toggle);
        if (-1 === index) {
            return;
        }
        this.list.skipPage(index, 0.5);
    }

    onListRender(item: Node, idx: number) {
        let csp = item.getComponent(CCSwitchPage);
        csp.index = idx;
        let uiTransf = item.getComponent(UITransform);
        // uiTransf.width = view.getDesignResolutionSize().width;
        console.log("111当前是第 idx=" + idx + "页");
    }

    onListPageChange(pageNum: number) {
        this.lastScrollTime = Date.now();
        console.log("222当前是第" + pageNum + "页");
        let toggle = this.toggleContainer.toggleItems[pageNum];
        toggle.isChecked = true;
    }
}
