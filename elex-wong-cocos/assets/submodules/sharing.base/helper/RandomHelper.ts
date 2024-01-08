import _ from 'lodash';

export enum RandomStrType {
    number = 1,
    number0,
    string,
    mix,
}

const StringNumber = '123456789';
const StringNumber0 = '0123456789';
const StringABC = 'abcdefghijklmnpqrstuvwxyz';
const StringNumberABC = '0123456789abcdefghijklmnpqrstuvwxyz';

export class RandomHelper {
    // 随机排序
    public static shuffle(arr) {
        const len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            const idx = Math.floor(Math.random() * (len - i));
            const temp = arr[idx];
            arr[idx] = arr[len - i - 1];
            arr[len - i - 1] = temp;
        }
        return arr;
    }

    public static shuffleFisherYates(arrs) {
        return _.shuffle(arrs);
    }

    public static rand(max) {
        return Math.floor(Math.random() * max);
    }

    public static randInt(from: number | number[], to?: number) {
        if (from instanceof Array) {
            to = from[1];
            from = from[0];
        }

        let num = from + Math.random() * (to - from + 1);
        num = Math.floor(num);
        if (num > to) {
            num = to;
        }
        return num;
    }

    public static randFloat(from: number | number[], to?: number) {
        if (from instanceof Array) {
            to = from[1];
            from = from[0];
        }

        return from + Math.random() * (to - from);
    }

    public static randRange(from, to) {
        if (from instanceof Array) {
            to = from[1];
            from = from[0];
        }
        return from + Math.floor(Math.random() * (to - from + 1));
    }

    public static randArray(arr) {
        if (arr.length === 0) {
            return null;
        }
        return arr[this.rand(arr.length)];
    }

    public static randWeightIndex(weightArray) {
        if (!weightArray || weightArray.length === 0) {
            return -1;
        }

        const range = [];
        const total = weightArray.reduce((pre, item) => {
            range.push(pre + item);
            return pre + item;
        }, 0);

        if (total === 0) {
            return -1;
        }

        const rnd = this.randInt(0, total);

        let rndIndex = 0;
        for (let i = 0; i < range.length; i++) {
            if (0 !== range[i] && range[i] >= rnd) {
                rndIndex = i;
                break;
            }
        }

        return rndIndex;
    }

    /**
     * 生成随机字符串
     * @param length
     * @returns {string}
     */
    public static randomString(length: number, randType: RandomStrType) {
        let str = 'abcdefghijklmnpqrstuvwxyz123456789';
        if (typeof randType === 'number') {
            switch (randType) {
                case RandomStrType.number:
                    str = StringNumber;
                    break;
                case RandomStrType.number0:
                    str = StringNumber0;
                    break;
                case RandomStrType.string:
                    str = StringABC;
                    break;
                default:
                    str = StringNumberABC;
                    break;
            }
        }
        const maxPos = str.length;
        let code = '';
        for (let i = 0; i < length; i++) {
            const txt = str.charAt(Math.floor(Math.random() * maxPos));
            code += txt;
        }
        return code;
    }

    /**
     * 随机分配（微信红包算法）
     * @param total
     * @param min
     * @param max
     * @param length
     * @returns {Array}
     */
    public static randAlloc(total, min, max, length) {
        // 首先要判断是否符合 min 和 max 条件
        if (min * length > total || max * length < total) {
            throw Error(`没法满足最最少 ${min} 最大 ${max} total ${total} length ${length}的条件`);
        }

        const result = [];
        let restValue = total;
        let restLength = length;
        for (let i = 0; i < length - 1; i++) {
            restLength--;
            // 这一次要发的数量必须保证剩下的要足最小量
            // 同进要保证剩下的不能大于需要的最大量
            const restMin = restLength * min;
            const restMax = restLength * max;
            // 可发的量
            const usable = restValue - restMin;
            // 最少要发的量
            const minValue = Math.max(min, restValue - restMax);
            // 以 minValue 为最左，max 为中线来进行随机，即随机范围是 (max - minValue) * 2
            // 如果这个范围大于 usable - minValue，取 usable - minValue
            const limit = Math.min(usable - minValue, (max - minValue) * 2);
            // 随机部分加上最少要发的部分就是应该发的，但是如果大于 max，最大取到 max
            result[i] = Math.min(max, minValue + Math.floor(limit * Math.random()));
            restValue -= result[i];
        }
        result[length - 1] = restValue;

        return result;
    }
}
