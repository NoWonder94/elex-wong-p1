/// <reference types="dayjs" />
/// <reference types="lodash" />

declare const _: typeof _;
declare let BigNumber: any;
declare const CC_EDITOR;
declare const CC_DEBUG;
declare const CC_DEV;
declare const CC_JSB;

declare interface Number {
    div: (arg: number, precision?: number) => number;
    mul: (arg: number, precision?: number) => number;
    sub: (arg: number, precision?: number) => number;
    add: (arg: number, precision?: number) => number;
    toFixed: (precision?: number) => string;
    toFixedValue: (precision?: number) => number;
    format: (precision?: number) => string;
}

declare class logger {
    public static level: number;
    public static debug: (message?: any, ...optionalParams: any[]) => void;
    public static info: (message?: any, ...optionalParams: any[]) => void;
    public static warn: (message?: any, ...optionalParams: any[]) => void;
    public static error: (message?: any, ...optionalParams: any[]) => void;
}

/** 全局方法声明 */
// declare const GlobalFunction: () => any;