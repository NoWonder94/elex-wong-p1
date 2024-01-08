import { ERROR_BASE } from './CommonBase';

/**
 * 协议支持类型uInt32（number 默认）、sInt32、int32、double、string、message(结构)、float
 */

export interface AnswerResponse {
    error: ERROR_BASE;
    data?: any;
}