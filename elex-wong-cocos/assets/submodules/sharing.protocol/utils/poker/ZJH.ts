import { ObjectHelper } from '../../../sharing.base/helper/ObjectHelper';
import * as Poker from './poker';

function getZJHPoint(card) {
    let point = Poker.getPoint(card);
    if (Poker.Point.A === point) {
        point = 14;
    }
    return point;
}

function sortCardByValue(cards) {
    cards.sort((c1, c2) => {
        const p1 = getZJHPoint(c1);
        const p2 = getZJHPoint(c2);
        return p1 > p2 ? -1 : 1;
    });
    return cards;
}

function sortPairCards(cards) {
    const sameCardArray: any = {};
    for (let index = 0; index < cards.length; ++index) {
        const point = getZJHPoint(cards[index]);
        if (sameCardArray[point]) {
            sameCardArray[point] += 1;
        } else {
            sameCardArray[point] = 1;
        }
    }

    let pairPoint: any = 0;
    for (const point of Object.keys(sameCardArray)) {
        let num = sameCardArray[point]
        if (num === 2) {
            pairPoint = point;
        }
    }

    let pairCards = cards.filter((card) => {
        return getZJHPoint(card) === pairPoint;
    });

    const freeCards = cards.filter((card) => {
        return getZJHPoint(card) !== pairPoint;
    });

    pairCards = sortCardColorAndPoint(pairCards);
    return pairCards.concat(freeCards);
}

function sortCardPointAndColor(cards) {
    cards.sort((c1, c2) => {
        const p1 = getZJHPoint(c1);
        const p2 = getZJHPoint(c2);
        if (p1 === p2) {
            const color1 = Poker.getColor(c1);
            const color2 = Poker.getColor(c2);
            return color1 > color2 ? 1 : -1;
        } else {
            return p1 > p2 ? -1 : 1;
        }
    });
    return cards;
}

function sortCardColorAndPoint(cards) {
    cards.sort((c1, c2) => {
        const color1 = Poker.getColor(c1);
        const color2 = Poker.getColor(c2);
        if (color1 === color2) {
            const p1 = getZJHPoint(c1);
            const p2 = getZJHPoint(c2);
            return p1 > p2 ? -1 : 1;
        } else {
            return color1 > color2 ? 1 : -1;
        }
    });
    return cards;
}

function isA32(cards) {
    const tmp = sortCardPointAndColor(cards);
    if (getZJHPoint(tmp[0]) === 14 && getZJHPoint(tmp[1]) === 3 && getZJHPoint(tmp[2]) === 2) {
        return true;
    }
    return false;
}

/**
 * 花色不参与牌大小比较的计算器
 * 牌值越大，牌越大
 */

const PATTERN_MAX_VALUE = {
    LEOPARD: 7881, // 最大值AAA=14，加上同花顺6867=7881
    STRAIGHT_GOLD: 7867, // 最大值AKQ=12，加上同花7855=7867
    GOLD_FLOWER: 7855, // 最大值AKJ，14*16*16+13*16+11=3803，加上顺子4052=7855
    STRAIGHT: 4052, // 最大值AKQ=12，加上对子的最大值基数4040=4052
    PAIR: 4040, // 最大值AAK=14*16+13=237,加上普通牌的基数3803=4040
    SCATTERED: 3803, // 最大值AKJ=14*16*16+13*16+11=3803
};


/**
 * 花色参与牌值大小比较的计算器，牌值越大，牌越大
 * 牌大小计算算法
 * 花色不参与大小比较:
 * 首先对到手的牌按照牌数字按照由大到小排序
 * 牌大小按照牌型分级
 * 对于普通牌型，每张牌视为16进制的一个数，A对应14，2对应2，以此类推。牌值即为这幅此16进制牌的大小。
 * 比如最大的普通牌为AKJ，其16进制数值为AKJ=14x16x16+13x16+11=3803
 * 对于对子，先将对子放在牌的前两位，则在最大普通牌大小的基础上，加上对子牌的本身大小。 对子的本身大小计算方法：比如最大的对子为AAK，则AAK=14x16+13=237，加上最大的普通牌值3803，即为4040
 * 对于顺子，取最小的那个数，加上最大的对子牌值，比如最大的顺子AKQ=12+4040=4052。最小的顺子A32，A取1，值4041
 * 对于同花，先按照普通牌型计算大小，再加上最大的对子牌值。
 * 比如最大的同花AKJ=3803+4052=7855
 * 对于同花顺，取最小的那个数，加上最大的同花牌值，比如：
 * AKQ=12+7855=7867,最小的同花顺A32，A取1，A32=1+7855=7856
 * 对于炸弹，取第一个数，加上最大的同花顺牌值。
 * 比如AAA=14+7867=7881
 * 花色参与大小比较:
 * 比较规则：在牌数字完全一样的情况下，从最大的牌开始比较，黑桃>红桃>梅花>方片，遇到一个较大的，则结束比较。如：红桃A+红桃Q+方片3>梅花A+黑桃Q+黑桃3。如遇顺子时，数字3最大，从3开始比较花色。
 * 花色值设定：黑桃=3红桃=2梅花=1方片=0。
 * 牌值计算原理：在上面花色不参与大小比较算法的基础上，增加对每副计算出来的牌值乘以64再加上对三张牌花色按照4进制进行花色值计算作为附加值。比如：不考虑花色时，红桃6+方片4+方片2的值为6x256+4x16+2=1602，考虑花色时，红桃+方片+方片对应的4进制就是200，其10进制值为32，然后这副牌的牌值即为：1602x64+32=102560。为什么乘以64？因为三个花色4进制值的范围为63~0。乘以64，就是把原来每组牌值大小相邻的牌型拉开63个的间隔，以便于让花色值有发挥的空间哈哈，用来区别数字完全相同但花色不同的牌型。
 * 如果是炸弹，先将炸弹按花色从大到小排序，保证比如黑桃A红桃A方片A会>红桃A梅花A方片A
 */

// 比牌算法
export class CompareCardAlgorithm {
    static getZJHColor(card) {
        const color = Poker.getColor(card);
        return Poker.ColorCompareValue[color] - 1;
    }

    static getZJHPoint(card) {
        let point = Poker.getPoint(card);
        if (Poker.Point.A === point) {
            point = 14;
        }

        return point;
    }

    static getFlowerValue(cards) {
        const tmp = sortCardColorAndPoint(cards);
        return CompareCardAlgorithm.getZJHColor(tmp[0]) * 16 + CompareCardAlgorithm.getZJHColor(tmp[1]) * 4 + CompareCardAlgorithm.getZJHColor(tmp[2]);
    }

    static getA32FlowerValue(cards) {
        const tmp = sortCardColorAndPoint(cards);
        return CompareCardAlgorithm.getZJHColor(tmp[0]) * 16 + CompareCardAlgorithm.getZJHColor(tmp[1]) * 4 + CompareCardAlgorithm.getZJHColor(tmp[2]);
    }

    // 获取炸弹牌值绝对大小
    static getLeopardbValue(cards, isFocusColor) {
        // 炸弹需要先对牌按花色大小排序，保证比如黑桃A红桃A方片A会> 红桃A梅花A方片A
        const sortCard = sortCardPointAndColor(cards);
        return (CompareCardAlgorithm.getZJHPoint(sortCard[0]) + PATTERN_MAX_VALUE.STRAIGHT_GOLD) * 64 + (isFocusColor ? CompareCardAlgorithm.getFlowerValue(cards) : 0);
    }

    // 获取同花顺牌值绝对大小,A32也是同花顺，是最小的同花顺(参考自百度百科)
    static getStraightGoldValue(cards, isFocusColor) {
        if (isA32(cards)) {
            return (1 + PATTERN_MAX_VALUE.GOLD_FLOWER) * 64 + (isFocusColor ? CompareCardAlgorithm.getA32FlowerValue(cards) : 0);
        }
        const tmp = sortCardPointAndColor(cards);
        return (CompareCardAlgorithm.getZJHPoint(tmp[2]) + PATTERN_MAX_VALUE.GOLD_FLOWER) * 64 + (isFocusColor ? CompareCardAlgorithm.getFlowerValue(cards) : 0);
    }

    // 获取金花牌值绝对大小
    static getGoldFlowerValue(cards, isFocusColor) {
        const tmp = sortCardPointAndColor(cards);
        return (CompareCardAlgorithm.getZJHPoint(tmp[0]) * 256 + CompareCardAlgorithm.getZJHPoint(tmp[1]) * 16 + CompareCardAlgorithm.getZJHPoint(tmp[2]) +
            PATTERN_MAX_VALUE.STRAIGHT) * 64 + (isFocusColor ? CompareCardAlgorithm.getFlowerValue(cards) : 0);
    }

    // 获取顺子牌值绝对大小
    static getStraightValue(cards, isFocusColor) {
        if (isA32(cards)) {
            return (1 + PATTERN_MAX_VALUE.PAIR) * 64 + (isFocusColor ? CompareCardAlgorithm.getA32FlowerValue(cards) : 0);
        }

        const tmp = sortCardPointAndColor(cards);
        return (CompareCardAlgorithm.getZJHPoint(tmp[2]) + PATTERN_MAX_VALUE.PAIR) * 64 + (isFocusColor ? CompareCardAlgorithm.getFlowerValue(cards) : 0);
    }

    // 获取对子牌值绝对大小
    // 在判断牌型时，如果是对子，则将对子放在数组前面两位
    static getPairValue(cards, isFocusColor) {
        const sortCard = sortPairCards(cards);
        return (CompareCardAlgorithm.getZJHPoint(sortCard[1]) * 16 + CompareCardAlgorithm.getZJHPoint(sortCard[2]) + PATTERN_MAX_VALUE.SCATTERED) * 64 +
            (isFocusColor ? CompareCardAlgorithm.getFlowerValue(sortCard) : 0);
    }

    static getScatteredCardPoint(cards) {
        const tmp = sortCardByValue(cards);
        return (CompareCardAlgorithm.getZJHPoint(tmp[0]) * 256 + CompareCardAlgorithm.getZJHPoint(tmp[1]) * 16 + CompareCardAlgorithm.getZJHPoint(tmp[2])) * 64;
    }

    // 获取普通牌值绝对大小
    static getScatteredValue(cards, isFocusColor) {
        return CompareCardAlgorithm.getScatteredCardPoint(cards) + (isFocusColor ? CompareCardAlgorithm.getFlowerValue(cards) : 0);
    }
}

// 牌型定义
export const PATTERN = {
    SCATTERED: 0, // 散牌\单张
    PAIR: 1, // 对子
    STRAIGHT: 2, // 顺子
    GOLD_FLOWER: 3, // 金花
    STRAIGHT_GOLD: 4, // 顺金、同花顺
    LEOPARD: 5, // 豹子
};

// tslint:disable-next-line: max-classes-per-file
export class Utils {
    static sortCardColorAndPoint: (cards: any) => any;
    /**
     * 分析当前牌型
     * @param handCards
     * @param rule
     * @returns {*}
     */
    static analysisPattern(handCards) {

        let pattern: number = PATTERN.SCATTERED;
        // 获取花色
        const colorNum = Utils.getMaxColorNum(handCards);

        // 获取相同牌数
        const sameCard = Utils.getSamePointCardNum(handCards);

        // 获取当前是否是顺子
        const isStraight = Utils.getIsStraight(handCards);

        // 当前是金花
        if (colorNum === 3 && isStraight) {
            pattern = PATTERN.STRAIGHT_GOLD;
        } else if (sameCard === 2) {
            pattern = PATTERN.PAIR;
        } else if (sameCard === 3) {
            pattern = PATTERN.LEOPARD;
        } else if (isStraight) {
            pattern = PATTERN.STRAIGHT;
        } else if (colorNum === 3) {
            pattern = PATTERN.GOLD_FLOWER;
        }

        return pattern;
    }

    /**
     * 获取手牌中最多牌的花色
     * @param handCards
     * @returns
     */
    static getColorList(handCards) {
        const colorList = {};
        // 用于获取对应的花色
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < handCards.length; ++index) {
            const color = Poker.getColor(handCards[index]);
            // 获取当前手牌中花色
            if (colorList[color]) {
                colorList[color] += 1;
            } else {
                colorList[color] = 1;
            }
        }
        return colorList;
    }

    /**
     * 获取最多花色牌张数
     * @param handCards
     * @returns {*}
     */
    static getMaxColorNum(handCards) {
        const colorList = Utils.getColorList(handCards);
        let ColorNum = 1;

        for (const color in colorList) {
            if (color != null && colorList[color] > ColorNum) {
                ColorNum = colorList[color];
            }
        }
        return ColorNum;
    }

    /**
     * 获取最多相同牌值张数
     * @param handCards
     * @returns {number}
     */
    static getSamePointCardNum(handCards) {
        let SameCard = 1;
        const sameCardValue = Utils.getSamePointCard(handCards);
        // 用于获取相同卡牌的数量
        for (const index in sameCardValue) {
            if (index != null && sameCardValue[index] && sameCardValue[index] > SameCard) {
                SameCard = sameCardValue[index];
            }
        }
        return SameCard;
    }

    /**
     * 获取相同牌值的数组
     * @param handCards
     * @returns
     */
    static getSamePointCard(handCards) {
        const sameCardArray = {};
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < handCards.length; ++index) {
            const point = Poker.getPoint(handCards[index]);
            if (sameCardArray[point]) {
                sameCardArray[point] += 1;
            } else {
                sameCardArray[point] = 1;
            }
        }
        return sameCardArray;
    }

    /**
     * 获取是否是顺子
     * @param handCards
     * @returns {boolean}
     */
    static getIsStraight(handCards) {
        // 获取对应玩家手牌中的牌
        const list = Utils.sortPokerByPoint(handCards, true);
        // 特殊情况
        // A23
        if (Poker.getPoint(list[0]) === 2 &&
            Poker.getPoint(list[1]) === 3 &&
            Poker.getPoint(list[2]) === 14) {
            return true;
        }

        for (let index = 1; index < list.length; ++index) {
            if (list[index - 1] !== list[index] - 1) {
                return false;
            }
        }
        return true;
    }

    /**
     * 根据扑克点数排序
     * @param handCards
     * @param byMax
     * @returns {Array}
     */
    static sortPokerByPoint(handCards, byMax) {
        const list = [];
        if (byMax == null) {
            byMax = true;
        }

        // 获取对应玩家手牌中的牌
        ObjectHelper.eachKeyNum(handCards, (k, v) => {
            if (v > 0) {
                if (Poker.getPoint(v) === Poker.Point.A) {
                    list.push(14);
                } else {
                    list.push(Poker.getPoint(v));
                }
            }
        });

        // 进行排序
        if (byMax) {
            list.sort((a, b) => {
                return a - b;
            });
        } else {
            list.sort((a, b) => {
                return b - a;
            });
        }
        return list;
    }

    /**
     * 根据扑克花色和点数排序
     * @param handCards
     * @param byMax
     * @returns {Array}
     */
    static sortPoker(handCards, byMax) {
        const list = [];
        if (byMax == null) {
            byMax = true;
        }

        for (const card of handCards) {
            if (card > 0) {
                if (Poker.getPoint(card) === Poker.Point.A) {
                    list.push({
                        card,
                        point: 14,
                        color: Poker.getColor(card)
                    });
                } else {
                    list.push({
                        card,
                        point: Poker.getPoint(card),
                        color: Poker.getColor(card)
                    });
                }
            }
        }

        // 进行排序
        list.sort((a, b) => {
            if (a.color > b.color) {
                return byMax ? -1 : 1;
            } else if (a.color === b.color && a.point > b.point) {
                return byMax ? -1 : 1;
            } else {
                return byMax ? 1 : -1;
            }
        });

        const cards = [];
        for (const item of list) {
            cards.push(item.card);
        }

        return cards;
    }

    static getPatternValue(roundPattern, cards, isFocusColor = true) {
        let v = 0;
        switch (roundPattern) {
            case PATTERN.SCATTERED:
                v = CompareCardAlgorithm.getScatteredValue(cards, isFocusColor);
                break;
            case PATTERN.PAIR:
                v = CompareCardAlgorithm.getPairValue(cards, isFocusColor);
                break;
            case PATTERN.STRAIGHT:
                v = CompareCardAlgorithm.getStraightValue(cards, isFocusColor);
                break;
            case PATTERN.GOLD_FLOWER:
                v = CompareCardAlgorithm.getGoldFlowerValue(cards, isFocusColor);
                break;
            case PATTERN.STRAIGHT_GOLD:
                v = CompareCardAlgorithm.getStraightGoldValue(cards, isFocusColor);
                break;
            case PATTERN.LEOPARD:
                v = CompareCardAlgorithm.getLeopardbValue(cards, isFocusColor);
                break;
            default:
                break;
        }

        return v;
    }
}

Utils.sortCardColorAndPoint = sortCardColorAndPoint;