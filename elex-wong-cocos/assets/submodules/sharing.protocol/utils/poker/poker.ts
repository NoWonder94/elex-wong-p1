import { ObjectHelper } from '../../../sharing.base/helper/ObjectHelper';

export const COLOR_CARD_NUM = 13;

export const Color = {
    SPEC: 0,           // 特殊牌
    SPADE: 1,          // 黑桃
    HEART: 2,          // 红桃
    PLUM: 3,            // 梅花
    DIAMOND: 4,        // 方块
};

export const SpecPoint = {
    ANY: 1,               // 赖子
    JOKER_S: 2,          // 小鬼
    JOKER_B: 3,          // 大鬼
};

export const ColorCompareValue = {};
ColorCompareValue[Color.DIAMOND] = 1;
ColorCompareValue[Color.PLUM] = 2;
ColorCompareValue[Color.HEART] = 3;
ColorCompareValue[Color.SPADE] = 4;

export const Value: any = {};
Value.ANY = SpecPoint.ANY;
Value.JOKER_S = SpecPoint.JOKER_S;
Value.JOKER_B = SpecPoint.JOKER_B;
Value.HEART_A = 101;
Value.SPADE_A = 201;
Value.DIAMOND_A = 301;
Value.CLUB_A = 401;

export const Point = {
    J: 11,
    Q: 12,
    K: 13,
    A: 1,

    MIN: 2,
    MAX: 13
};

// 根据花色和点数 计算牌数值
export function getValue(color: number, point: number) {
    return color * 100 + point;
}

// 根据牌数值 计算点数
export function getPoint(value: number) {
    return (+value) % 100;
}

// 根据牌数值 计算花色
export function getColor(value: number) {
    return Math.floor((+value) / 100);
}

export function isBasicColor(color: number) {
    return color !== Color.SPEC;
}

// 是否是特殊牌
export function isSpecValue(value: number) {
    return value < 100;
}

export function buildFromArray(cardsArray) {
    const cards: any = {};
    cardsArray.forEach((card) => {
        ObjectHelper.addNumber(cards, card, 1);
    });
    return cards;
}

export function buildPointObjectFromArray(cardsArray) {
    const points: any = {};
    cardsArray.forEach((card) => {
        ObjectHelper.addNumber(points, getPoint(card), 1);
    });
    return points;
}

export function isSameCards(cards1, cards2) {
    const keys1 = Object.keys(cards1);
    const keys2 = Object.keys(cards2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    let isSame = true;
    for (let i = 0, l = keys1.length; i < l; ++i) {
        if (cards1[keys1[i]] !== cards2[keys1[i]]) {
            isSame = false;
            break;
        }
    }

    return isSame;
}

/**
 * 计算牌组中牌的张数
 * @param cards
 * @returns {*}
 */
export function sumCardsNum(cards) {
    return ObjectHelper.sumValue(cards);
}

export function existCard(cards, card) {
    return cards[card] > 0;
}

/**
 * 判断牌级中是否有指定花色的牌
 * @param cards
 * @param color
 * @returns {boolean}
 */
export function existColor(cards, color) {
    let exist = false;
    ObjectHelper.each(cards, (card, num) => {
        if (getColor(card) === color) {
            exist = true;
            return false;
        }
    });
    return exist;
}

export function delCard(cards, card, delNum) {
    const num = cards[card] || 0;
    delNum = delNum || 1;

    if (num < delNum) {
        return false;
    } else if (num === delNum) {
        delete cards[card];
    } else {
        cards[card] = num - delNum;
    }
    return true;
}

export function addCard(cards, card, num) {
    ObjectHelper.addNumber(cards, card, num);
}

// 数组牌排序
export function sortCardArray(cardArray) {
    if (!cardArray || !(cardArray instanceof Array)) {
        return;
    }

    cardArray.sort((c1, c2) => {
        const color1 = getColor(c1);
        const color2 = getColor(c2);
        if (color1 === color2) {
            const p1 = getPoint(c1);
            const p2 = getPoint(c2);
            return p1 > p2 ? 1 : -1;
        } else {
            return color1 > color2 ? 1 : -1;
        }
    });

    return cardArray;
}

export function cardObj2Array(cardsObj) {
    const cards = [];
    for (const k of Object.keys(cardsObj)) {
        let n = cardsObj[k];
        for (let i = 0; i < n; ++i) {
            cards.push(+k);
        }
    }
    return cards;
}