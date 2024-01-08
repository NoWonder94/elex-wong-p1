import { ObjectHelper } from '../../../sharing.base/helper/ObjectHelper';
import * as Poker from './poker';

const Cost = {};

Cost[3] = 1;
Cost[4] = 2;
Cost[5] = 3;
Cost[6] = 4;
Cost[7] = 5;
Cost[8] = 6;
Cost[9] = 7;
Cost[10] = 8;
Cost[11] = 9;
Cost[12] = 10;
Cost[13] = 11;
Cost[1] = 12;
Cost[2] = 16;

Cost[22] = 22;
Cost[23] = 33;

export function getCost(card) {
    if (card > 100) {
        return Cost[Poker.getPoint(card)];
    } else {
        return Cost[Poker.getPoint(card) + 20];
    }
}
export function getCostCards(cards) {
    const costCards: any = {};
    ObjectHelper.eachKeyNum(cards, (c, n) => {
        if (n > 0) {
            const cost = getCost(c);
            if (!costCards[cost]) {
                costCards[cost] = {
                    'num': 0,
                    'point': Poker.getPoint(c)
                };
            }
            costCards[cost].num += 1;
        }
    });
    return costCards;
}
export function getMaxCost(cards) {
    let maxCost = 0;
    ObjectHelper.eachKeyNum(cards, (c, v) => {
        if (getCost(c) > maxCost) {
            maxCost = getCost(c);
        }
    });
    return maxCost;
}
export function getCardsNum(cards) {
    return ObjectHelper.sumValue(cards);
}
export function checkKingBomb(cards) {
    const num = getCardsNum(cards);
    let resp = false;
    if (num === 2) {
        if (cards[Poker.SpecPoint.JOKER_B] === 1 && cards[Poker.SpecPoint.JOKER_S] === 1) {
            resp = true;
        }
    }
    return resp;
}
export function checkBomb(cards) {
    const num = getCardsNum(cards);
    let resp = false;
    if (num === 4) {
        const costCards = getCostCards(cards);
        ObjectHelper.eachKeyNum(costCards, (c, v) => {
            if (v.num >= 4) {
                resp = true;
                return false;
            }
        });
    }
    return resp;
}
export function checkSingle(cards) {
    if (getCardsNum(cards) !== 1) {
        return false;
    }
    return true;
}
export function checkPairs(cards) {
    const num = getCardsNum(cards);

    if (num % 2 !== 0) {
        return false;
    }
    if (num < 6) {
        return false;
    }
    const costCards = getCostCards(cards);
    const maxCost = getMaxCost(cards);

    let resp = true;
    for (let i = maxCost; i > maxCost - num / 2; i--) {
        if (!(costCards[i] && costCards[i].num === 2)) {
            resp = false;
        }
    }
    return resp;

}
export function checkPair(cards) {
    if (getCardsNum(cards) !== 2) {
        return false;
    }
    const costCards = getCostCards(cards);
    let resp = true;
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num !== 2) {
            resp = false;
            return false;
        }
    });
    return resp;
}
export function checkRun(cards) {
    const num = getCardsNum(cards);
    if (num < 5) {
        return false;
    }
    const costCards = getCostCards(cards);
    const maxCost = getMaxCost(cards);
    let resp = true;
    for (let i = maxCost; i > maxCost - num; i--) {
        if (!(costCards[i] && costCards[i].num === 1)) {
            resp = false;
        }
    }
    return resp;
}
export function checkTriple(cards) {
    if (getCardsNum(cards) !== 3) {
        return false;
    }
    const costCards = getCostCards(cards);
    let resp = true;
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num !== 3) {
            resp = false;
            return false;
        }
    });
    return resp;
}
export function checkTripleOne(cards) {
    if (getCardsNum(cards) !== 4) {
        return false;
    }
    const costCards = getCostCards(cards);
    let resp = false;
    const context = {
        'triple': 0,
        'single': 0
    };
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num === 3) {
            context.triple += 1;
        }
        if (v.num === 1) {
            context.single += 1;
        }
    });
    if (context.triple === 1 && context.single === 1) {
        resp = true;
    }
    return resp;
}

export function checkAirplane(cards) {
    const num = getCardsNum(cards);
    if (num % 4 !== 0) {
        return false;
    }
    if (num < 8) {
        return false;
    }
    const costCards = getCostCards(cards);

    let resp = false;
    const context = {
        'triple': 0,
        'triples': {},
        'single': 0
    };
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num === 3) {
            context.triple += 1;
            context.triples[c] = 1;
        } else if (v.num) {
            context.single += v.num;
        }
    });
    if (tripleIsRun(context.triples, num / 4)) {
        resp = true;
    }
    return resp;
}
export function checkRunTriple(cards) {
    const num = getCardsNum(cards);
    if (num % 3 !== 0) {
        return false;
    }
    if (num < 6) {
        return false;
    }
    const costCards = getCostCards(cards);

    let resp = false;
    const context = {
        'triple': 0,
        'triples': {},
        'single': 0
    };
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num === 3) {
            context.triple += 1;
            context.triples[c] = 1;
        } else if (v.num) {
            context.single += v.num;
        }
    });
    if (tripleIsRun(context.triples, num / 3)) {
        resp = true;
    }
    return resp;
}
export function tripleIsRun(triples, num) {
    let resp = true;
    let maxCost = 0;
    ObjectHelper.eachKeyNum(triples, (c, v) => {
        if (v > 0) {
            if (c > maxCost) {
                maxCost = c;
            }
        }
    });
    for (let i = maxCost; i > maxCost - num; i--) {
        if (triples[i] !== 1) {
            resp = false;
            break;
        }
    }
    if (resp) {
        return resp;
    } else {
        resp = true;
    }
    let minCost = maxCost;
    ObjectHelper.eachKeyNum(triples, (c, v) => {
        if (v > 0) {
            if (c < minCost) {
                minCost = c;
            }
        }
    });
    for (let j = minCost; j < minCost + num; j++) {
        if (triples[j] !== 1) {
            resp = false;
            break;
        }
    }
    return resp;
}

export function checkFourTwo(cards) {
    if (getCardsNum(cards) !== 6) {
        return false;
    }
    const costCards = getCostCards(cards);
    let resp = false;
    const context = {
        'four': 0,
        'two': 0
    };
    ObjectHelper.eachKeyNum(costCards, (c, v) => {
        if (v.num === 4) {
            context.four += 1;
        } else {
            context.two += v.num;

        }
    });
    if (context.four === 1 && context.two === 2) {
        resp = true;
    }
    return resp;
}