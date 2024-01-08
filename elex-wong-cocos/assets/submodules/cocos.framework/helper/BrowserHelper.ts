import { URLHelper } from '../../sharing.base/helper/URLHelper';

export default class BrowserHelper {
    /**
     * 查询url参数
     * @param key 
     * @param url 
     */
    public static getParam(key: string): string {
        if (!window || !window.location) return;
        return URLHelper.getParam(key, window.location.href);
    }

    /**
    * 设置当前 URL 的参数（修改历史记录，不会刷新当前网页）
    * @param param 参数
    */
    public static setParam(param: string): void {
        if (!window || !window.history) return;
        window.history.replaceState({}, null, `?${param}`);
    }

    /**
     * 清除当前 URL 的参数（修改历史记录，不会刷新当前网页）
     */
    public static clearParam(): void {
        if (!window || !window.history) return;
        window.history.replaceState({}, null, '.');
    }

    /**
     * 复制文本至设备剪贴板
     * @param value 文本内容
     */
    public static copy(value: string): boolean {
        if (!document) return false;
        // 创建输入元素
        let element = document.createElement('textarea');
        element.readOnly = true;
        element.style.opacity = '0';
        element.value = value;
        document.body.appendChild(element);
        // 选择元素
        element.select();
        // 兼容低版本 iOS 的特殊处理
        let range = document.createRange();
        range.selectNodeContents(element);
        let selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 复制
        let result = document.execCommand('copy');
        element.remove();
        return result;
    }
}