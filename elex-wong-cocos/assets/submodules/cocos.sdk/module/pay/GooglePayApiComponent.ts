import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";

export enum GooglePayNotity {
    GooglePayInitSuccess = 'GooglePayInitSuccess',
    GooglePayInitFail = 'GooglePayInitFail',
    GooglePayFailed = 'GooglePayFailed',
    GooglePayConsumeSuccess = 'GooglePayConsumeSuccess',
    GooglePayConsumeFailed = 'GooglePayConsumeFailed',
    /** 支付商品未消耗 */
    GooglePayNotConsume = 'GooglePayNotConsume',
}
@CocosDecorators.ClassNameRegister('GooglePayApiComponent')
export class GooglePayApiComponent {
    public static instance: GooglePayApiComponent;
    public packagename: string;
}