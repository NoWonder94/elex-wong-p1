import CCList from '../../components/list/CCList';
import { PopupBaseComponent } from '../UIPopup/PopupBaseComponent';
import { EditBox } from 'cc';
import { ChatMsgType, ProtoChatFromInfo } from '../../../sharing.base/constants/ChatConst';
import { CocosDecorators } from '../../CocosDecorators';

export enum DataPosType {
    Left = 1,
    Right = 2,
    Middle = 3
}


export interface ChatMsgData {
    posType: DataPosType,
    content: {
        type: ChatMsgType,
        msg: string,
        time?: number;
        from?: ProtoChatFromInfo,
    }
}

/** 资源弹窗选项类型 */
export type ChatPopupOptions = {
    datas?: ChatMsgData[],
}

@CocosDecorators.ClassNameRegister('UIChatComponent')
export class UIChatComponent extends PopupBaseComponent {
    /** 列表组件 */
    list: CCList;
    /** 数据 */
    datas: ChatMsgData[] = [];
    /** 输入框 */
    input: EditBox;
    /** 消息条目最小高度 */
    itemMinHeight: number;
    /** 显示消息最大宽度 */
    msgRichtextMaxWidth: number;
}