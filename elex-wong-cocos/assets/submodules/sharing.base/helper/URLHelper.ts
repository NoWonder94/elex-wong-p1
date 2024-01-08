const UrlPattern = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%$#_]*)?/;
const IpPattern = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
/**
 * URL处理
 */
export class URLHelper {
    static check(url: string) {
        return UrlPattern.test(url);
    }

    static isIp(ip: string) {
        return IpPattern.test(ip);
    }

    /**
     * 查询url参数
     * @param key 
     * @param url 
     */
    static getParam(key: string, url: string): string {
        let reg = new RegExp("(^|&?)" + key + "=([^&]*)(&|$)", "i");
        let r = url.substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    }

    static getParamObject<T>(url: string): T {
        const keyValues = url.split('&');
        let retObj: any = {}
        for (let i = 0; i < keyValues.length; i++) {
            const strings = keyValues[i].split('=');
            retObj[decodeURIComponent(strings[0])] = decodeURIComponent(strings[1]);
        }
        return retObj;
    }

    /**
    * 设置当前 URL 的参数（修改历史记录，不会刷新当前网页）
    * @param param 参数
    */
    public static addLParam(key: string, value: string): void {
    }

    /**
    * 设置当前 URL 的参数（修改历史记录，不会刷新当前网页）
    * @param param 参数
    */
    public static delParam(key: string): void {
    }
}
