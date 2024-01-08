import { sys } from 'cc';
import { AnswerResponse } from '../../../sharing.base/protocols/ProtocolConst';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { IHttp } from './NetInterface';

export default class HTTP implements IHttp {
    constructor(private xhrBaseURL: string) {
    }

    public async get(url: string, params: any, cb?: FunctionCaller, headers: any = {}, timeout: number = 5000): Promise<AnswerResponse> {
        let xhr = new XMLHttpRequest();
        xhr.timeout = timeout;


        url = this.serializeUrl(url);

        if (params) {
            if (url.indexOf("?") == -1) {
                url += "?";
            }
            url += encodeURI(this.getQueryString(params));
        }

        return await this.doHttp(url, params, cb, headers, 'get', timeout);
    }

    public async post(url: string, params: any, cb?: FunctionCaller, headers: any = {}, timeout: number = 5000): Promise<AnswerResponse> {
        url = this.serializeUrl(url);

        headers = headers || {}
        // headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers['Content-Type'] = 'application/json';

        return this.doHttp(url, params, cb, headers, 'post', timeout);
    }

    private async doHttp(url: string, params: any, cb: FunctionCaller, headers: any, method: string, timeout: number = 5000): Promise<AnswerResponse> {
        headers = headers || {}
        let xhr = new XMLHttpRequest();
        xhr.timeout = timeout;
        xhr.open(method, url, true);

        if (headers) {
            this.setHttpHeaders(xhr, headers);
        }

        if (sys.isNative) {
            this.setHttpHeaders(xhr, { "Accept-Encoding": "gzip,deflate" });
        }

        return await new Promise((resolve, reject) => {
            let err = null;
            xhr.ontimeout = (e) => {
                logger.warn(`${url}, request ontimeout`);
                this.removeXhrEvent(xhr);
                err = { code: 500, msg: "网络请求超时" };
                cb ? cb.exec({ error: err }) : reject(err);
            };

            xhr.onerror = (e) => {
                logger.warn(`${url}, request onerror`);
                this.removeXhrEvent(xhr);
                err = { code: 500, msg: "网络请求错误" };
                cb ? cb.exec({ error: err }) : reject(err);
            }

            xhr.onabort = (e) => {
                logger.warn(`${url}, request onabort`);
                this.removeXhrEvent(xhr);
                err = { code: 500, msg: "网络请求错误" };
                cb ? cb.exec({ error: err }) : reject(err);
            }

            xhr.onreadystatechange = () => {
                logger.info(`Http ${method} ${url}, onReadyStateChange, readyState=${xhr.readyState}, status=${xhr.status}`);
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    try {
                        logger.info(`Http ${method} ${url}, onReadyStateChange, responseText=${xhr.responseText}`);
                        let result = JSON.parse(xhr.responseText) as AnswerResponse;
                        if (result && 0 == result.error.code) {
                            resolve(result);
                            cb ? cb.exec(result) : resolve(result);
                        } else {
                            cb ? cb.exec(result) : reject(result.error);
                        }
                    } catch (e) {
                        logger.error(`Http ${method} ${url} param=${JSON.stringify(params)} error=${e}`);
                        err = { code: 501, msg: "返回数据异常" };
                        cb ? cb.exec({ error: err }) : reject(err);
                    }
                    this.removeXhrEvent(xhr);
                }
            };
            if (params && typeof params === "object") {
                params = JSON.stringify(params);
            }
            xhr.send(params);
        });
    }

    private removeXhrEvent(xhr: XMLHttpRequest) {
        xhr.ontimeout = null;
        xhr.onerror = null;
        xhr.onabort = null;
        xhr.onreadystatechange = null;
    }

    private setHttpHeaders(xhr: XMLHttpRequest, headers) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    private getQueryString(params) {
        const tmps: string[] = [];
        for (let key in params) {
            tmps.push(`${key}=${params[key]}`);
        }
        return tmps.join("&");
    }

    private serializeUrl(url: string) {
        if (url.indexOf('http') === -1) {
            return this.xhrBaseURL + url;
        }
        return url;
    }
}