/** 一天的秒数 */

import dayjs from 'dayjs';

export const SECONDS_IN_ONE_DAY = 86400;
/** 一天的毫秒数 */
export const MINISECONDS_IN_ONE_DAY = SECONDS_IN_ONE_DAY * 1000;

Date.prototype.format = function (fmt = TimeHelper.FORMATE.FMT_DT) {
    let o = {
        'M+': this.getMonth() + 1,               // 月份
        'd+': this.getDate(),                    // 日
        'h+': this.getHours(),                   // 小时
        'm+': this.getMinutes(),                 // 分
        's+': this.getSeconds(),                 // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

export class TimeHelper {
    /** 时间字符格式 */
    public static FORMATE = {
        /** 2006-07-02 08:09:04 */
        FMT_DT: 'YYYY-MM-DD HH:mm:ss',
        /** 2006-07-02 08:09:04.423 */
        FMT_DT_S: 'YYYY-MM-DD HH:mm:ss.S',
        /** 2006-07-02 */
        FMT_D: 'YYYY-MM-DD',
        /** 20060702 */
        FMT_DB: 'YYYYMMDD',
        /** 08:09:04 */
        FMT_T: 'HH:mm:ss',
        FMT_THM: 'HH:mm',
        FMT_mm: 'mm',
        FMT_UTC_4: 'YYYY-MM-DDTHH:mm:ss.SSS-04:00',
        /** 2009-03-10 二 20:09:04 */
        FMT_E: 'yyyy-MM-dd E HH:mm:ss',
        /** 2009-03-10 周二 20:09:04 */
        FMT_EE: 'yyyy-MM-dd EE HH:mm:ss',
        /** 2009-03-10 星期二 20:09:04 */
        FMT_EEE: 'yyyy-MM-dd EEE HH:mm:ss',
    }

    /** 获取本地时间戳(秒) */
    public static getTimestampS(time?: dayjs.ConfigType): number {
        return Math.floor(dayjs(time).valueOf() / 1000);
    }

    /** 获取本地时间戳(毫秒) */
    public static getTimestampMS(time?: dayjs.ConfigType): number {
        return dayjs(time).valueOf();
    }

    /** 获取本地时间字符串 */
    public static getTimeFormat(fmt: string, time?: dayjs.ConfigType) {
        return dayjs(time).format(fmt);
    }

    /** 获取时间差 */
    public static getTimeDiff(unit: dayjs.QUnitType, toTime: dayjs.ConfigType, fromTime?: dayjs.ConfigType) {
        return dayjs(fromTime).diff(dayjs(toTime), unit, true);
    }

    public static getTime(time?: dayjs.ConfigType) {
        return dayjs(time);
    }

}

