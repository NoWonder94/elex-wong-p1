// TODO 等待官方支持npm模块 import * as _ from 'lodash';
import { DicObject } from './Interfaces';

export class ObjectHelper {
    static objSize(obj) {
        if (!obj) {
            return 0;
        }

        let size = 0;
        for (const f in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, f)) {
                size++;
            }
        }

        return size;
    }

    static objToMap(obj) {
        const strMap = new Map();
        for (const k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    static mapToObj(strMap) {
        const obj = Object.create(null);
        for (const [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    static array2Dic<T>(array: T[], key: string) {
        let obj: DicObject<T> = {};
        if (!array) {
            return obj;
        }

        array.forEach((item) => {
            if (null !== item[key]) {
                obj[item[key]] = item;
            } else {
                logger.warn('ObjectHelper array2Dic data item exception', key, item);
            }
        });

        return obj;
    }

    /** 对象动态绑定对象prototype */
    static attach(instObj, originPrototypeObj, attachPrototypeObj) {
        const attachPrototypeObjNames = Object.getOwnPropertyNames(attachPrototypeObj.prototype);
        const originPrototypeObjNames = Object.getOwnPropertyNames(originPrototypeObj.prototype);

        for (const i in attachPrototypeObjNames) {
            const key = attachPrototypeObjNames[i];
            if (originPrototypeObjNames.indexOf(key) !== -1) {
                if (!instObj.__super__) {
                    instObj.__super__ = {};
                }
                instObj.__super__[key] = originPrototypeObj.prototype[key].bind(instObj);
            }
            if (key !== 'constructor') {
                instObj[key] = attachPrototypeObj.prototype[key];
            }
        }
    }

    /** 对象动态移除对象prototype */
    static detach(instObj, originPrototypeObj, attachPrototypeObj) {
        const prototypeNames = Object.getOwnPropertyNames(attachPrototypeObj.prototype);
        for (const i in prototypeNames) {
            const key = prototypeNames[i];
            if (key !== 'constructor') {
                delete instObj[key];
            }
        }

        delete instObj.__super__;

        const prototypeNames1 = Object.getOwnPropertyNames(originPrototypeObj);
        for (const i in prototypeNames1) {
            const key = prototypeNames1[i];
            if (key !== 'constructor' && typeof originPrototypeObj[key] === 'function') {
                instObj[key] = originPrototypeObj[key];
            }
        }
    }

    static build(k, v) {
        const obj = {};
        obj[k] = v;
        return obj;
    }

    /**
     * 遍历obj对象的成员
     * @param obj
     * @param callback(key, value) 返回true则退出遍历
     */
    static each(obj, callback) {
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            const k = keys[i];
            if (callback(k, obj[k]) === false) break;
        }
    }

    /**
     * 遍历obj对象的成员，将key作为数字
     * @param obj
     * @param callback(key, value) 返回true则退出遍历
     */
    static eachKeyNum(obj, callback) {
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            const k = keys[i];
            if (callback(+k, obj[k]) === false) break;
        }
    }

    /**
     * 将obj的key转换为数字数组
     * @param obj
     * @returns {Array}
     */
    static numberKeys(obj) {
        const keys = Object.keys(obj);
        const keyNums: number[] = [];
        for (let i = 0, l = keys.length; i < l; ++i) {
            keyNums.push(+(keys[i]));
        }
        return keyNums;
    }

    /**
     * 检查是否是对象
     * @param obj
     * @returns {boolean}
     */
    static isObject(obj) {
        return (typeof (obj) === 'object');
    }

    static isArray(obj) {
        return (obj instanceof Array);
    }

    static isNumber(obj) {
        return isNaN(obj) ? false : true;
    }

    /**
     * 当obj的key的值当作数字 +value，如果没有该key则会自动添加
     * @param obj
     * @param key
     * @param value
     */
    static addNumber(obj, key, value) {
        obj[key] = (+obj[key] || 0) + value;
    }

    /**
     * 当obj的key的值当作数字 +value，如果没有该key则会自动添加，最小值限定为0
     * @param obj
     * @param key
     * @param value
     */
    static addNumber0(obj, key, value) {
        obj[key] = Math.max(0, (+obj[key] || 0) + value);
    }

    /**
     * 将obj的所有数字类型的值进行累加
     * @param obj
     * @returns {number}
     */
    static sumValue(obj) {
        let sum = 0;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            const value = obj[keys[i]];
            if (!isNaN(value)) {
                sum += (+value);
            }
        }
        return sum;
    }

    /**
     * 合并多个对象，新的字段则赋值，数字字段则相加
     * params 参数为需要进行合并的对象，比如merge(obj1, obj2, ...)
     * @returns {*}
     */
    static merge(...params) {
        const args = arguments;
        const obj = args[0];
        for (let i = 1; i < args.length; ++i) {
            this.each(args[i], (k, v) => {
                if (Object.prototype.hasOwnProperty.call(obj, k)) {
                    if (!isNaN(obj[k]) && !isNaN(v)) {
                        obj[k] += v;
                    }
                } else {
                    obj[k] = v;
                }
            });
        }
        return obj;
    }

    /**
     * 将数值乘以value并四舍五入取整
     * @param obj
     * @param value
     */
    static mul(obj, value, handler) {
        if (!handler) {
            handler = Math.round;
        }

        this.each(obj, (k, v) => {
            if (!isNaN(v)) {
                obj[k] = handler(v * value);
            }
        });
    }

    static mulNew(obj, value, handler) {
        if (!handler) {
            handler = Math.round;
        }

        const newObj = {};
        this.each(obj, (k, v) => {
            if (!isNaN(v)) {
                newObj[k] = handler(v * value);
            }
        });

        return newObj;
    }


    /**
     * 将数值取负号
     * @param obj
     */
    static minus(obj) {
        this.each(obj, (k, v) => {
            if (!isNaN(v)) {
                obj[k] = -v;
            }
        });
        return obj;
    }

    /**
     * 是否有大于value的元素
     * @param obj
     * @param value
     * @returns {boolean}
     */
    static existGT(obj, value) {
        let exist = false;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (obj[keys[i]] > value) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * 是否有大于等于value的元素
     * @param obj
     * @param value
     * @returns {boolean}
     */
    static existGTE(obj, value) {
        let exist = false;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (obj[keys[i]] >= value) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * 是否有小于value的元素
     * @param obj
     * @param value
     * @returns {boolean}
     */
    static existLT(obj, value) {
        let exist = false;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (obj[keys[i]] < value) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * 是否有小于等于value的元素
     * @param obj
     * @param value
     * @returns {boolean}
     */
    static existLTE(obj, value) {
        let exist = false;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (obj[keys[i]] <= value) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * 是否有等于value的元素
     * @param obj
     * @param value
     * @returns {boolean}
     */
    static existEQ(obj, value) {
        let exist = false;
        const keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (obj[keys[i]] === value) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * 统计元素数量
     * @param obj
     */
    static count(obj: any) {
        return Object.keys(obj).length;
    }

    /** 是否是空对象 */
    static isEmpty(obj: any) {
        return !obj || Object.keys(obj).length === 0;
    }
    /**
     * 等于value的元素数量
     * @param obj
     * @param value
     */
    static countEQ(obj, value) {
        let count = 0;
        this.each(obj, (k, v) => {
            if (v === value) {
                count++;
            }
        });
        return count;
    }

    /**
     * 等于value的元素
     * @param obj
     * @param value
     */
    static partEQ(obj, value) {
        const parts = {};
        this.each(obj, (k, v) => {
            if (v === value) {
                parts[k] = v;
            }
        });
        return parts;
    }

    /**
     * 大于value的元素
     * @param obj
     * @param value
     */
    static partGT(obj, value) {
        const parts = {};
        this.each(obj, (k, v) => {
            if (v > value) {
                parts[k] = v;
            }
        });
        return parts;
    }

    /**
     * obj2的元素都是数字，obj1对应的元素是否都大于等于obj2中的元素
     * @param obj1
     * @param obj2
     * @constructor
     */
    static numberGTE(obj1, obj2) {
        let result = true;
        const keys = Object.keys(obj2);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (isNaN(obj2[keys[i]]) || isNaN(obj1[keys[i]])) {
                result = false;
                break;
            }

            if (obj1[keys[i]] < obj2[keys[i]]) {
                result = false;
                break;
            }
        }

        return result;
    }

    /**
     * obj2的元素都是数字，obj1对应的元素是否都大于obj2中的元素
     * @param obj1
     * @param obj2
     * @constructor
     */
    static numberGT(obj1, obj2) {
        let result = true;
        const keys = Object.keys(obj2);
        for (let i = 0, len = keys.length; i < len; ++i) {
            const key = keys[i];
            if (isNaN(obj2[key]) || isNaN(obj1[key])) {
                result = false;
                break;
            }

            if (obj1[key] <= obj2[key]) {
                result = false;
                break;
            }
        }

        return result;
    }

    /** 数组集合元素求和 */
    public static ArraySum(arr: number[]) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(arr[i])) {
                total += +arr[i];
            }
        }
        return total;
    }

    /** 数组集合移除元素 */
    public static ArrayRemove(arr: any[], item: any) {
        let index = arr.indexOf(item);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }

    /** 数组集合取交集 */
    public static ArrayIntersect() {
        let result = new Array();
        let obj = {};
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                let str = arguments[i][j];
                if (!obj[str]) {
                    obj[str] = 1;
                }
                else {
                    obj[str]++;
                    if (obj[str] === arguments.length) {
                        result.push(str);
                    }
                }
            }
        }
        return result;
    }

    /** 数组集合取并集 */
    public static ArrayUnion() {
        let arr = new Array();
        let obj = {};
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                let str = arguments[i][j];
                if (!obj[str]) {
                    obj[str] = 1;
                    arr.push(str);
                }
            }
        }
        return arr;
    };
}