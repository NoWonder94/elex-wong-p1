import { GAME_ID } from './consts';

export enum GameActId {
    /** 棋牌ACT */
    actChess = 'actChess',
}

export enum GameId {
    // 麻将 START

    /** 血战到底 */
    // mjxzdd = 'mjxzdd',
    // mjxlch = 11002, // 血流成河
    // mjgd = 11003, // 广东麻将
    // mjhnhz = 110004, // 湖南红中麻将
    // mjhz = 11005, // 杭州麻将
    // mjhbkwx = 11006, // 湖北卡五星麻将
    // mjgyzj = 11007, // 贵阳捉鸡麻将
    // mjer = 11008, // 二人麻将
    // mjdz = 11009, // 大众麻将

    // 麻将 END

    // 扑克 START

    /** 抢庄牛牛 */
    pokqznn = 'pokqznn',
    /** 扎金花*/
    pokzjh = 'pokzjh',
    /** 21点 */
    pokblackjack = 'pokblackjack',
    /** 德州 */
    poktexaspoker = 'poktexaspoker',
    // poksangong = 'poksangong', // 三公
    // pokzjh = 'pokzjh', // 扎金花
    // pokbdz = 'pokbdz', // 百得之
    // pokbaicao = 'pokbaicao', // 百草
    // poktexasholdem = 'poktexasholdem', // 德州扑克

    // 扑克 END

    // 百人 START

    // mulrbwar = 'mulrbwar', // 红黑大战
    // mulbaccarat = 'mulbaccarat', // 百家乐
    // mulsicbo = 'mulsicbo', // 骰宝
    // muldtwar = 'muldtwar', // 龙虎斗
    muljoyfish = 'muljoyfish', // 欢乐捕鱼

    // 百人 END

    // 老虎机 START

    /** 宝石矿工 */
    slobskg = 'slobskg',
    /** 横竖屏参考案例 */
    slowarrio = 'slowarrio',

    // 老虎机 END
}

export const GameName = {
    // mjxzdd: '血战到底麻将',
    // mjxlch: '血流成河麻将',
    // mjgd: '广东麻将',
    // mjhnhz: '湖南红中麻将',
    // mjhz: '杭州麻将',
    // mjhbkwx: '湖北卡五星麻将',
    // mjgyzj: '贵阳捉鸡麻将',
    // mjer: '二人麻将',
    // mjdz: '大众麻将',

    pokqznn: '抢庄牛牛',
    pokzjh: '扎金花',
    pokblackjack: '21点',
    poktexaspoker: '德州扑克',
    // poksangong: '三公',
    // pokzjh: '炸金花',
    // pokblackjack: '21点',
    // pokbdz: '百得之扑克',
    // pokbaicao: '百草',

    slobskg: '宝石矿工',
    slowarrio: '王室战争',

    // mulslot: '老虎机',
    // mulrbwar: '红黑大战',
    // mulbaccarat: '百家乐',
    // mulsicbo: '骰宝',
    // muldtwar: '龙虎斗',
    muljoyfish: '欢乐捕鱼',

    // actarena: '竞技场',
    // actclub: '俱乐部',
    // actluckypool: '幸运奖池赛',
}

function loadGameId() {
    let ids = new Set<string>();
    for (const item of Object.values(GameId)) {
        ids.add(item);
    }

    return [...ids];
}
export const gameIds = loadGameId();

function loadGameActId() {
    let ids = new Set<string>();
    for (const item of Object.values(GameActId)) {
        ids.add(item);
    }
    return [...ids];
}
export const gameActIds = loadGameActId();

export function gameIdIsValid(gameId: GAME_ID): boolean {
    return GameId[gameId] != null;
}

