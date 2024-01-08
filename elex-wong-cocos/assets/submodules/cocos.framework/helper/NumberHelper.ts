const NumberPrototype: any = Number.prototype;

let floatPrecision: number = 2;

export class NumberHelper {
    static init(precision: number = floatPrecision) {
        // 解决四维运算,js计算失去精度的问题
        BigNumber.set({
            DECIMAL_PLACES: precision,
            ROUNDING_MODE: BigNumber.ROUND_DOWN,
        });
        floatPrecision = precision;
    }
}

NumberPrototype.toFixedValue = function (precision = floatPrecision): number {
    const x = new BigNumber(this);
    if (null != precision) {
        return Number(x.toFixed(precision));
    }
    return x.toNumber();
};

NumberPrototype.toFixed = function (precision = floatPrecision) {
    const x = new BigNumber(this);
    if (null != precision) {
        return x.toFixed(precision);
    }
    return x.toString();
};

// 加法
NumberPrototype.add = function (arg, precision = floatPrecision) {
    const x = new BigNumber(this);
    const y = new BigNumber(arg);
    if (null != precision) {
        return Number(x.plus(y).toFixed(precision));
    }
    return x.plus(y).toNumber();
};
// 减法
NumberPrototype.sub = function (arg, precision = floatPrecision) {
    const x = new BigNumber(this);
    const y = new BigNumber(arg);
    if (null != precision) {
        return Number(x.minus(y).toFixed(precision));
    }
    return x.minus(y).toNumber();
};
// 乘法
NumberPrototype.mul = function (arg, precision = floatPrecision) {
    const x = new BigNumber(this);
    const y = new BigNumber(arg);
    if (null != precision) {
        return Number(x.multipliedBy(y).toFixed(precision));
    }
    return x.multipliedBy(y).toNumber();
};
// 除法
NumberPrototype.div = function (arg, precision = floatPrecision) {
    const x = new BigNumber(this);
    const y = new BigNumber(arg);
    if (null != precision) {
        return Number(x.dividedBy(y).toFixed(precision));
    }
    return x.dividedBy(y).toNumber();
};

// 格式化
NumberPrototype.format = function (precision?: number): string {
    let fmt = new BigNumber(this);
    return fmt.toFormat();
}
