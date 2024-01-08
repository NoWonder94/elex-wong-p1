<template>
    <div class="playback-container">
        <component-page-loading :status="dataStatus" :errorMsg="msg.message"
                                @reload="getData" style="padding: 15px"></component-page-loading>
        <div class="playback-container-inner" v-if="dataStatus == 'dle' && recordData.data.length">
            <div class="detail-content">
                <el-row v-if="recordData.data.length > 0">
                    <el-col :md="12">
                        <el-form label-width="80px">
                            <el-form-item :label="$t('game.log.replayMahjong.gameName')">{{ $t('games.'+data.game_id) }}</el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.roomId')">{{ data.room_id }}</el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.reportId')">{{ data.report_id }}</el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.startDate')">
                                {{ recordData.data[recordData.data.length - 1].msg.startTime | timestampToView }}
                            </el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.endDate')">
                                {{ recordData.data[recordData.data.length - 1].msg.endTime | timestampToView }}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :md="12">
                        <el-form label-width="80px">
                            <el-form-item :label="$t('game.log.replayMahjong.betBase')">{{ data.bet_base | numeral('0,0.[0000]') }}</el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.seat1')">
                                <span v-html="playerBySeat[1].account_id"></span>
                                ({{ playerBySeat[1].gold | numeral('0,0.[0000]') }}
                                <font-awesome-icon class="icon-coins" icon="coins"></font-awesome-icon>
                                )
                            </el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.seat2')">
                                <span v-html="playerBySeat[2].account_id"></span>
                                ({{ playerBySeat[2].gold | numeral('0,0.[0000]') }}
                                <font-awesome-icon class="icon-coins" icon="coins"></font-awesome-icon>
                                )
                            </el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.seat3')">
                                <span v-html="playerBySeat[3].account_id"></span>
                                ({{ playerBySeat[3].gold | numeral('0,0.[0000]') }}
                                <font-awesome-icon class="icon-coins" icon="coins"></font-awesome-icon>
                                )
                            </el-form-item>
                            <el-form-item :label="$t('game.log.replayMahjong.seat4')">
                                <span v-html="playerBySeat[4].account_id"></span>
                                ({{ playerBySeat[4].gold | numeral('0,0.[0000]') }}
                                <font-awesome-icon class="icon-coins" icon="coins"></font-awesome-icon>
                                )
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div class="list-space"></div>
            <div class="detail-content">
                <div class="action-list-item" v-for="(item, index) in recordData.data" :key="index" v-if="routeActive.indexOf(item.route) >= 0">
                    【{{ item.timestamp | timestampToView }}】
                    <span v-html="$options.filters.mahjongPlayback(item, playerBySeat, $options.filters, t)"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import momentTimezone from 'moment-timezone'

    export default {
        name: "ItemPlaybackMahjong",
        props: ['data'],
        data() {
            return {
                dataStatus: 'dle',
                recordData: {
                    data: [],
                    player: {}
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                },
                routeActive: ['s_startNewRound', 's_initHandCards', 's_playerSelectHSZ', 's_HSZCardExchanged', 's_playerSelectColor',
                    's_playerColorSelected', 's_playCard', 's_newCard', 's_hangupTask', 's_playerGangCard', 's_playerPengCard',
                    's_playerHu', 's_syncGold', 's_passTask', 's_trustee', 's_roundSettlement', 's_playerOffline', 's_playerReconnect']
            }
        },
        computed: {
            playersByPlayback: function () {
                let players = [];
                if (this.recordData.data.length > 0) {
                    for (let v of this.recordData.data) {
                        if (v.route == 's_roomInfo') {
                            players = v.msg.players;
                            break;
                        }
                    }
                }
                return players;
            },
            playerBySeat: function () {
                let playerBySeat = {1: {}, 2: {}, 3: {}, 4: {}};
                if (this.recordData.data.length > 0) {
                    let players = this.playersByPlayback;
                    let dbPlayer = this.recordData.player;
                    for (let seat in players) {
                        // if (typeof (dbPlayer[players[seat].uid]) != 'undefined') {
                        //     players[seat].account_id = '<span class="text-primary-custom">' + dbPlayer[players[seat].uid].account_id + '</span>';
                        // } else {
                        //     players[seat].account_id = '<span class="text-primary-custom">' + players[seat].nickname + '</span>';
                        // }
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].nickname + '</span>';
                        playerBySeat[seat] = players[seat];
                    }
                }
                return playerBySeat;
            },
        },
        filters: {
            // 将时间戳转换为可视时间
            timestampToView: function (timestamp, format) {
                // 转换为数字
                timestamp = Number(timestamp);
                // 转换为毫秒
                timestamp = timestamp > 10000000000 ? timestamp : timestamp * 1000;
                // 转换时间戳
                return momentTimezone(timestamp).tz('Etc/GMT+4').format(format);
            },
            mahjongPlayback: function (item, playerBySeat, $filters, $t) {
                // 数字转麻将牌【单张】
                function cardToColor(card) {
                    if (10 < card && card < 20) {
                        return card % 10 + $t('game.log.replayMahjong.dot')
                    } else if (20 < card && card < 30) {
                        return card % 10 + $t('game.log.replayMahjong.bamboo')
                    } else if (30 < card && card < 40) {
                        return card % 10 + $t('game.log.replayMahjong.character')
                    }
                }

                // 数字转麻将牌【手牌】
                function s_initHandCards_cards(cards) {
                    let colors = [];
                    for (let card in cards) {
                        if (cards[card] > 1) {
                            for (let j = 0; j < cards[card]; j++) {
                                colors.push(cardToColor(card));
                            }
                        } else {
                            colors.push(cardToColor(card));
                        }
                    }
                    return colors;
                }

                // 数字转麻将牌【换三张】
                function s_HSZCardExchanged_cards(cards) {
                    let colors = [];
                    for (let i in cards) {
                        colors.push(cardToColor(cards[i]));
                    }
                    return colors;
                }

                // 换牌方向【换三张】
                function s_HSZCardExchanged_type(type) {
                    switch (type) {
                        case 0:
                            return $t('game.log.replayMahjong.clockwise')
                        case 1:
                            return $t('game.log.replayMahjong.counterclockwise')
                        case 2:
                            return $t('game.log.replayMahjong.opposite')
                    }
                }

                // 【玩家定缺牌】
                function s_playerColorSelected(msg, playerBySeat) {
                    let playerColors = [];
                    for (let seat in msg.players) {
                        let color = '';
                        switch (msg.players[seat]) {
                            case 1:
                                color = $t('game.log.replayMahjong.dot');
                                break;
                            case 2:
                                color = $t('game.log.replayMahjong.bamboo');
                                break;
                            case 3:
                                color = $t('game.log.replayMahjong.character');
                                break;
                        }
                        playerColors.push(
                            playerBySeat[seat].account_id + `${$t('game.log.replayMahjong.exclude')}【` + color + '】'
                        );
                    }
                    return $t('game.log.replayMahjong.playerExcludeds') + playerColors.join();
                }

                // 【挂起任务】
                function s_hangupTask(playerIndex, msg, playerBySeat) {
                    let hangupTasks = [];
                    for (let type in msg.task) {
                        switch (type) {
                            case '1':
                                hangupTasks.push(
                                    playerBySeat[playerIndex].account_id + `${$t('game.log.replayMahjong.win')}【` + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】'
                                );
                                break;
                            case '2':
                                let gangArray = msg.task[type].gangArray;
                                for (let i in gangArray) {
                                    hangupTasks.push(
                                        playerBySeat[playerIndex].account_id + `${$t('game.log.replayMahjong.kong')}【` + cardToColor(gangArray[i].card) + '】【' + playerBySeat[gangArray[i].from].account_id + '】'
                                    );
                                }
                                break;
                            case '3':
                                hangupTasks.push(
                                    playerBySeat[playerIndex].account_id + `${$t('game.log.replayMahjong.pong')}【` + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】'
                                );
                                break;
                        }
                    }
                    return $t('game.log.replayMahjong.playerOperate') + hangupTasks.join();
                }

                // 【杠牌】
                function s_playerGangCard(msg, playerBySeat) {
                    let windy = msg.gang == 1 ? $t('game.log.replayMahjong.windy-b') : $t('game.log.replayMahjong.windy-s');
                    let raining = $t('game.log.replayMahjong.raining');
                    let infoString = playerBySeat[msg.playerIndex].account_id + `${$t('game.log.replayMahjong.kong')}【` + cardToColor(msg.card) + '】【' + ([1, 3].indexOf(msg.gang) >= 0 ? windy : raining) + '】：';
                    let players = [];
                    for (let i in msg.targets) {
                        players.push(playerBySeat[msg.targets[i]].account_id);
                    }
                    return infoString + players.join();
                }

                // 【胡牌】
                function s_playerHu(msg, playerBySeat) {
                    let infoString = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayMahjong.win')}【` + cardToColor(item.msg.card) + '】';
                    if (item.msg.gsh) {
                        infoString += `【${$t('game.log.replayMahjong.kongWin')}】`;
                    }
                    if (item.msg.isZM) {
                        infoString += `【${$t('game.log.replayMahjong.ownDraw')}】`;
                    }
                    return infoString + '：' + playerBySeat[item.msg.from].account_id;
                }

                // 【金币飘分】
                function s_syncGold(msg, playerBySeat, $filters) {
                    let playerGolds = [];
                    for (let seat in msg) {
                        let billType = $t('game.log.replayMahjong.billType')[msg[seat].type];
                        playerGolds.push(
                            playerBySeat[seat].account_id + billType + '【' + $filters.numeral((msg[seat].info.gainGold + msg[seat].info.pumpGold), '0,0.[0000]') + `${$t('game.log.replayMahjong.coins')}】`
                        )
                    }
                    return playerGolds.join();
                }

                // 【牌局结算】
                function s_roundSettlement(playerIndex, msg, playerBySeat, $filters) {
                    let [totalGold, gainGold, pumpGold] = [0, 0, 0];
                    let [initGold, ownGold] = [0, 0];
                    let billsCoins = [];
                    let bills = msg.players[playerIndex].bills;
                    for (let i in bills) {
                        let itemString = playerBySeat[playerIndex].account_id;
                        if (typeof(bills[i].info.card) != 'undefined') {
                            itemString += '【' + cardToColor(bills[i].info.card) + '】';
                        }
                        itemString +=
                            '【' + $filters.hsMahjongBillsType(bills[i].type, bills[i].info, playerIndex) + '】' +
                            '【' + playerBySeat[bills[i].info.from].account_id + '】' +
                            (bills[i].info.gainGold + bills[i].info.pumpGold) + $t('game.log.replayMahjong.coins');
                        // 离开
                        if (bills[i].info.isLeave) {
                            itemString += '【' + $t('game.log.replayMahjong.isLeave') + '】';
                        }
                        billsCoins.push(itemString);
                    }
                    // 金币盈亏
                    gainGold = $filters.numeral(msg.players[playerIndex].gainGold, '0,0.[0000]');
                    pumpGold = $filters.numeral(msg.players[playerIndex].pumpGold, '0,0.[0000]');
                    totalGold = $filters.numeral(msg.players[playerIndex].gainGold + msg.players[playerIndex].pumpGold, '0,0.[0000]');
                    // 玩家金币
                    initGold = $filters.numeral(playerBySeat[playerIndex].gold, '0,0.[0000]');
                    ownGold = $filters.numeral(msg.players[playerIndex].ownGold, '0,0.[0000]');

                    return $t('game.log.replayMahjong.settlement') + '<p>' + billsCoins.join('<p/><p>') + '<p/>' +
                        '<p class="text-warning-custom">' + $t('game.log.replayMahjong.total') + totalGold + '</p>';
                    // '<p class="text-warning-custom">' + $t('game.log.replayMahjong.total') + totalGold + $t('game.log.replayMahjong.gainGold') + gainGold + $t('game.log.replayMahjong.pumpGold') + pumpGold + '</p>' +
                    // '<p class="text-warning-custom">' + $t('game.log.replayMahjong.initGold') + initGold + $t('game.log.replayMahjong.ownGold') + ownGold + '</p>';
                }

                // 解析后的字符串
                let msgDesc = '';
                // 每步行为
                item.route = item.route instanceof Object ? item.route.route : item.route;
                switch (item.route) {
                    case 's_roomInfo':
                        msgDesc = $t('game.log.replayMahjong.roomInfo');
                        break;
                    case 's_startNewRound':
                        // return '开始游戏'
                        msgDesc = $t('game.log.replayMahjong.startNewRound') + '（' + playerBySeat[item.msg.dealer].account_id + '）';
                        break;
                    case 's_initHandCards':
                        // return '发手牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.cards') + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_playerSelectHSZ':
                        // return '玩家选择换三张'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.cardExchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                        break;
                    case 's_HSZCardExchanged':
                        // return '交换牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + ' ' + s_HSZCardExchanged_type(item.msg.type) + $t('game.log.replayMahjong.exchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                        break;
                    case 's_roomHSZFinished':
                        msgDesc = $t('game.log.replayMahjong.doneExcluded');
                        break;
                    case 's_playerSelectColor':
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerSelectColor');
                        break;
                    case 's_playerColorSelected':
                        // return '玩家定缺牌'
                        msgDesc = s_playerColorSelected(item.msg, playerBySeat);
                        break;
                    case 's_curPlay':
                        msgDesc = $t('game.log.replayMahjong.curPlayer');
                        break;
                    case 's_playCard':
                        // return '玩家打牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayMahjong.discard')}【` + cardToColor(item.msg.card) + '】';
                        break;
                    case 's_newCard':
                        // return '玩家摸牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayMahjong.draw')}【` + cardToColor(item.msg.card) + '】';
                        break;
                    case 's_hangupTask':
                        // return '挂起任务（胡杠碰）'
                        msgDesc = s_hangupTask(item.playerIndex, item.msg, playerBySeat);
                        // 最后加入【过】选项
                        if (!item.msg.hidePass) {
                            msgDesc = msgDesc + ',' + playerBySeat[item.playerIndex].account_id + `【${$t('game.log.replayMahjong.pass')}】`;
                        }
                        break;
                    case 's_playerGangCard':
                        // return '玩家杠牌'
                        msgDesc = s_playerGangCard(item.msg, playerBySeat);
                        break;
                    case 's_playerPengCard':
                        // return '金币飘分'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayMahjong.pong')}【` + cardToColor(item.msg.card) + '】：' + playerBySeat[item.msg.from].account_id;
                        break;
                    case 's_playerHu':
                        // return '玩家胡牌'
                        msgDesc = s_playerHu(item.msg, playerBySeat);
                        break;
                    case 's_syncGold':
                        // return '金币飘分'
                        msgDesc = s_syncGold(item.msg, playerBySeat, $filters);
                        break;
                    case 's_passTask':
                        // return '点击跳过'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `【${$t('game.log.replayMahjong.pass')}】`;
                        break;
                    case 's_trustee':
                        // return '玩家托管、取消托管'
                        msgDesc = playerBySeat[item.playerIndex].account_id + (item.msg.isTrustee ? `【${$t('game.log.replayMahjong.AIControl')}】` : `【${$t('game.log.replayMahjong.cancelAIControl')}】`);
                        break;
                    case 's_roundSettlement':
                        // return '牌局结算'
                        msgDesc = s_roundSettlement(item.playerIndex, item.msg, playerBySeat, $filters);
                        break;
                    case 's_playerOffline':
                        // return '离线
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerOffline');
                        break;
                    case 's_playerReconnect':
                        // return '重连
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerReconnect');
                        break;
                }
                if (item.isTrustee) {
                    msgDesc += `【${$t('game.log.replayMahjong.system')}】`;
                }
                return msgDesc;
            }
        },
        methods: {
            t(...params) {
                return this.$t.apply(this, params)
            },
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            getData() {
                this.initMsg();
                this.dataStatus = 'loading';
                axios.get('/cq9/detail/getPlayback').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.recordData = response.data.resp_data;
                        this.dataStatus = !this.recordData.data.length ? 'nodata' : 'dle';
                        // 对外广播事件
                        this.finishEvents();
                    } else {
                        this.msg = response.data.resp_msg;
                        this.dataStatus = 'error-msg';
                        // 对外广播事件
                        this.$emit('error', {
                            loading: this.dataStatus,
                            message: this.msg.message,
                        });
                    }
                })
            },
            finishEvents() {
                let players = [];
                for (let v of this.recordData.data) {
                    if (v.route == 's_roomInfo') {
                        players = v.msg.players;
                        break;
                    }
                }
                let dbPlayer = this.recordData.player;
                for (let seat in players) {
                    if (typeof (dbPlayer[players[seat].uid]) != 'undefined') {
                        // 对外广播事件
                        this.$emit('finish', Object.assign(
                            this.recordData.data[this.recordData.data.length - 1].msg,
                            {playerIndex: Number(seat)}
                        ));
                        break;
                    }
                }
            }
        },
        mounted: function () {
            // 获取回放数据
            this.getData();
        }
    }
</script>

<style scoped>

</style>
