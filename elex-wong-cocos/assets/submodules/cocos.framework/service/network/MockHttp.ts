import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { AnswerResponse } from "../../../sharing.base/protocols/ProtocolConst";
import { IHttp, NetCmd, NetData } from "./NetInterface";

export class MockHttp implements IHttp {
    /** 模拟数据 */
    private mockData: any | null = null;

    constructor(mockData: any) {
        this.mockData = mockData;
    }
    get(url: string, params: any, cb?: FunctionCaller, headers: any = {}, timeout: number = 5000): Promise<AnswerResponse> {
        throw new Error("Method not implemented.");
    }
    post(url: string, params: any, cb?: FunctionCaller, headers: any = {}, timeout: number = 5000): Promise<AnswerResponse> {
        throw new Error("Method not implemented.");
    }
}