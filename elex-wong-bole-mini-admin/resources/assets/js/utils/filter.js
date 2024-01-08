import Vue from 'vue';

Vue.filter('hsFilterKeyword', function (string, keyword) {
    keyword = String(keyword).replace(/(^\s*)|(\s*$)/g, '');
    if (!string || !keyword) {
        return string;
    }
    keyword = keyword.replace(/\s+/g, ' ');
    let keys = keyword.split(' ');
    for (let i in keys) {
        let reg = new RegExp(keys[i], 'g');
        let em = '<em>' + keys[i] + '</em>';
        string = String(string).replace(reg, em);
    }
    return string;
})

// 制作麻将账单类型描述
Vue.filter('hsMahjongBillsType', function (type, info, seatIndex) {
    let others = Vue.prototype.$lang('mahjongBillsType.others');
    let lang = Vue.prototype.$cookie.get('lang') || 'zh-CN';

    switch (type) {
        case 0:
            return Vue.prototype.$lang('mahjongBillsType.fees');
        case 1:
            let windy = info.gangType == 1 ? Vue.prototype.$lang('mahjongBillsType.windy-b') : Vue.prototype.$lang('mahjongBillsType.windy-s');
            let raining = Vue.prototype.$lang('mahjongBillsType.raining');

            if(lang == "en"){
                return ([1, 3].indexOf(info.gangType) >=0 ? windy : raining) + (info.gainGold > 0 ? '' : others);
            } else {
                return (info.gainGold > 0 ? '' : others) + ([1, 3].indexOf(info.gangType) >=0 ? windy : raining);
            }
        case 2:
            if (info.gainGold > 0) {
                return seatIndex == info.from ? Vue.prototype.$lang('mahjongBillsType.ownDraw') : Vue.prototype.$lang('mahjongBillsType.win');
            } else {
                return seatIndex == info.from ? Vue.prototype.$lang('mahjongBillsType.loss') : Vue.prototype.$lang('mahjongBillsType.othersDraw');
            }
        case 3:
            return info.gainGold > 0 ? Vue.prototype.$lang('mahjongBillsType.checkTally') : Vue.prototype.$lang('mahjongBillsType.noTally');
        case 4:
            return info.gainGold > 0 ? Vue.prototype.$lang('mahjongBillsType.checkFlower') : Vue.prototype.$lang('mahjongBillsType.flower');
        case 5:
            let returnKong = Vue.prototype.$lang('mahjongBillsType.returnKong');
            
            if(lang == "en"){
                return returnKong + (info.gainGold > 0 ? '' : others);
            } else {
                return (info.gainGold > 0 ? '' : others) + returnKong;
            }
        case 6:
            return Vue.prototype.$lang('mahjongBillsType.forwardKong');
        case 7:
            return Vue.prototype.$lang('mahjongBillsType.settlement');
        case 8:
            return Vue.prototype.$lang('mahjongBillsType.bets');
        case 9:
            return Vue.prototype.$lang('mahjongBillsType.guzhuyizhiBack');
        case 10:
            return Vue.prototype.$lang('mahjongBillsType.luckMoney');
        case 11:
            return Vue.prototype.$lang('mahjongBillsType.settlementBack');
    }
})

// 制作扑克牌花色
Vue.filter('hsPokerCardToColor', function (card) {
    let numbers = {1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K'}
    if (100 < card && card < 200) {
        return Vue.prototype.$lang('game.cardPoker.blackhead') + numbers[card % 100]
    } else if (200 < card && card < 300) {
        return Vue.prototype.$lang('game.cardPoker.redHeart') + numbers[card % 100]
    } else if (300 < card && card < 400) {
        return Vue.prototype.$lang('game.cardPoker.plum') + numbers[card % 100]
    } else if (400 < card && card < 500) {
        return Vue.prototype.$lang('game.cardPoker.square') + numbers[card % 100]
    }
})
