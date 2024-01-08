import * as Poker from './poker';
import { ObjectHelper } from '../../../sharing.base/helper/ObjectHelper';
const ColorCompareValue = Poker.ColorCompareValue;

export const BASE = 10;

export function getPoint(card) {
    let point = Poker.getPoint(card);
    if (point > BASE) {
        point = BASE;
    }
    return point;
}

export function calcNiuCards(cardsArr) {
    const results = [];
    if (!cardsArr || !(cardsArr instanceof Array)) {
        return results;
    }

    const len = cardsArr.length;
    for (let c1 = 0; c1 < len - 2; ++c1) {
        for (let c2 = c1 + 1; c2 < len - 1; ++c2) {
            for (let c3 = c2 + 1; c3 < len; ++c3) {
                const point = getPoint(cardsArr[c1]) + getPoint(cardsArr[c2]) + getPoint(cardsArr[c3]);
                if (point % BASE === 0) {
                    results.push([cardsArr[c1], cardsArr[c2], cardsArr[c3]]);
                }
            }
        }
    }
    return results;
}

export function calcNNScore(cardsArr) {
    let niuScore = 0;
    const len = cardsArr.length;
    for (let c1 = 0; c1 < len - 2; ++c1) {
        for (let c2 = c1 + 1; c2 < len - 1; ++c2) {
            for (let c3 = c2 + 1; c3 < len; ++c3) {
                const point = getPoint(cardsArr[c1]) + getPoint(cardsArr[c2]) + getPoint(cardsArr[c3]);
                if (point % BASE === 0) {
                    niuScore = point;
                    break;
                }
            }
        }
    }
    return niuScore;
}

export function cardGT(card1, card2) {
    const point1 = Poker.getPoint(card1);
    const point2 = Poker.getPoint(card2);

    if (point1 === point2) {
        const color1 = Poker.getColor(card1);
        const color2 = Poker.getColor(card2);
        return ColorCompareValue[color1] > ColorCompareValue[color2];
    } else {
        return point1 > point2;
    }
}

/**
 * 检查炸弹牛
 * @param cards
 * @returns {boolean}
 */
export function checkBoomNiu(cards) {
    let isBoom = false;
    const length = cards.length;
    const cardsObj = Poker.buildPointObjectFromArray(cards);
    ObjectHelper.each(cardsObj, (k, v) => {
        if (k && v === 4 && length === 5) {
            isBoom = true;
        }
    });
    return isBoom;
}

export function getSumCard(cards) {
    let sum = 0;
    for (let index = 0; index < cards.length; ++index) {
        sum += getPoint(cards[index]);
    }
    return sum;
}

export function checkFiveSmallNN(cards) {
    let allLT5 = true;
    for (const card of cards) {
        if (getPoint(card) >= 5) {
            allLT5 = false;
            break;
        }
    }
    // 获取当前所有牌值的总和
    const sumValue = getSumCard(cards);
    if (sumValue <= 10 && allLT5) {
        return true;
    }
    return false;
}

// 获取花牌数量
export function getColorNum(cards) {
    let colorNum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < cards.length; ++index) {
        if (Poker.getPoint(cards[index]) > 10) {
            colorNum += 1;
        }
    }
    return colorNum;
}

export function getTenNum(cards) {
    let tenNum = 0;
    for (let index = 0; index < cards.length; ++index) {
        if (Poker.getPoint(cards[index]) === 10) {
            tenNum += 1;
        }
    }
    return tenNum;
}

export function getMaxCard(cards) {
    let maxCard = 0;
    cards.forEach((card) => {
        if (!maxCard || cardGT(card, maxCard)) {
            maxCard = card;
        }
    });
    return maxCard;
}

