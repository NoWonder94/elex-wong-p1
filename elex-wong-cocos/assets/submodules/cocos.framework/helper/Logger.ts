function printf(message?: any, ...optionalParams: any[]) { }

/** 日志等级定义 */
export enum LogLevel {
    /** 关闭 */
    CLOSE = 0,
    /** 错误 */
    ERROR = 1,
    /** 警告 */
    WARN = 2,
    /** 信息 */
    INFO = 3,
    /** 调试 */
    DEBUG = 4,
}

export default class Logger {
    /** 日志开关 */
    public static level: number = LogLevel.DEBUG;
    public static debug: (message?: any, ...optionalParams: any[]) => void = Logger.level >= LogLevel.DEBUG ? console.debug : printf;
    public static info: (message?: any, ...optionalParams: any[]) => void = Logger.level >= LogLevel.INFO ? console.info : printf;
    public static warn: (message?: any, ...optionalParams: any[]) => void = Logger.level >= LogLevel.WARN ? console.warn : printf;
    public static error: (message?: any, ...optionalParams: any[]) => void = Logger.level >= LogLevel.ERROR ? console.error : printf;
}