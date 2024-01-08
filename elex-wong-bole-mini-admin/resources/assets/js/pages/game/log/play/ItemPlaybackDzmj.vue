<template>
    <el-dialog class="dialog-playback" :title="$t('game.log.replayDzmj.title')" width="690px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="detail-container" v-loading="recordLoading">
                    <div v-if="!recordLoading">
                        <div class="detail-content">
                            <el-row v-if="recordData.data.length > 0">
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayDzmj.gameName')">{{ data.game_name }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayDzmj.roomId')">{{ data.room_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayDzmj.reportId')">{{ data.report_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayDzmj.startDate')">
                                            <component-page-timestamp :timestamp="recordData.data[0].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                        <el-form-item :label="$t('game.log.replayDzmj.endDate')">
                                            <component-page-timestamp :timestamp="recordData.data[recordData.data.length - 1].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayDzmj.betBase')">{{ data.bet_base | numeral('0,0.[0000]') }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayDzmj.seat'+index)" v-for="(item, index) in playersByPlayback" :key="index">
                                            <span v-html="playerBySeat[index].account_id"></span>
                                            ({{ playerBySeat[index].gold | numeral('0,0.[0000]') }}
                                            <font-awesome-icon class="icon-coins" icon="coins"></font-awesome-icon>)
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="list-space"></div>
                        <div class="detail-content">
                            <div class="action-list-item" v-for="(item, index) in recordData.data" :key="index" v-if="routeActive.indexOf(item.route) >= 0">
                                【
                                <component-page-timestamp :timestamp="item.timestamp"></component-page-timestamp>
                                】
                                <span v-html="$options.filters.mahjongPlayback(item, playerBySeat, $options.filters, t)"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemPlaybackDzmj",
        props: ['visible', 'data'],
        data() {
            return {
                dialogVisible: false,
                recordLoading: false,
                recordData: {
                    data: [],
                    player: {}
                },
                recordDataLIst: [],
                routeActive: ['s_startNewRound', 's_initHandCards', 's_playerSelectHSZ', 's_HSZCardExchanged', 's_playerSelectColor',
                    's_playerColorSelected', 's_playCard', 's_newCard', 's_hangupTask', 's_playerGangCard', 's_playerPengCard',
                    's_playerHu', 's_syncGold', 's_passTask', 's_trustee', 's_roundSettlement', 's_playerOffline', 's_playerReconnect',
                    's_playerChiCard', 's_playerBaoTing', 's_playHua']
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
                        // 加星账号
                        players[seat].account_id = players[seat].nickname;
                        // 完整账号
                        if (players[seat].uid == this.data.account_id) {
                            players[seat].account_id = players[seat].uid;
                        } else if (typeof (dbPlayer[players[seat].uid]) != 'undefined' && dbPlayer[players[seat].uid].account_id == this.data.account_id) {
                            players[seat].account_id = dbPlayer[players[seat].uid].account_id;
                        }
                        // 账号加色
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].account_id + '</span>';
                    }
                    playerBySeat = players;
                }
                return playerBySeat;
            },
        },
        filters: {
            mahjongPlayback: function (item, playerBySeat, $filters, $t) {
                // 数字转麻将牌【单张】
                function cardToColor(card) {
                    if (10 < card && card < 20) {
                        return card % 10 + $t('game.log.replayDzmj.dot')
                    } else if (20 < card && card < 30) {
                        return card % 10 + $t('game.log.replayDzmj.bamboo')
                    } else if (30 < card && card < 40) {
                        return card % 10 + $t('game.log.replayDzmj.character')
                    } else if (40 < card && card < 50) {
                        return $t('game.log.replayDzmj.zi')[(card % 10) - 1]
                    } else if (50 < card && card < 60) {
                        return $t('game.log.replayDzmj.hua')[(card % 10) - 1]
                    }
                }

                // 番型转换
                function makeRoundPattern(patterns) {
                    let data = [];
                    for (let pattern of patterns) {
                        data.push($t('game.log.replayDzmj.patternList')[pattern]);
                    }
                    return data.join();
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
                            return $t('game.log.replayDzmj.clockwise')
                        case 1:
                            return $t('game.log.replayDzmj.counterclockwise')
                        case 2:
                            return $t('game.log.replayDzmj.opposite')
                    }
                }

                // 【玩家定缺牌】
                function s_playerColorSelected(msg, playerBySeat) {
                    let playerColors = [];
                    for (let seat in msg.players) {
                        let color = '';
                        switch (msg.players[seat]) {
                            case 1:
                                color = $t('game.log.replayDzmj.dot');
                                break;
                            case 2:
                                color = $t('game.log.replayDzmj.bamboo');
                                break;
                            case 3:
                                color = $t('game.log.replayDzmj.character');
                                break;
                        }
                        playerColors.push(
                            playerBySeat[seat].account_id + `${$t('game.log.replayDzmj.exclude')}【` + color + '】'
                        );
                    }
                    return $t('game.log.replayDzmj.playerExcludes') + playerColors.join();
                }

                // 【挂起任务】
                function s_hangupTask(playerIndex, msg, playerBySeat) {
                    let hangupTasks = [];
                    for (let type in msg.task) {
                        switch (type) {
                            case '1':
                                hangupTasks.push(
                                    playerBySeat[playerIndex].account_id + `${$t('game.log.replayDzmj.win')}【` + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】'
                                );
                                break;
                            case '2':
                                let gangArray = msg.task[type].gangArray;
                                for (let i in gangArray) {
                                    hangupTasks.push(
                                        playerBySeat[playerIndex].account_id + `${$t('game.log.replayDzmj.kong')}【` + cardToColor(gangArray[i].card) + '】【' + playerBySeat[gangArray[i].from].account_id + '】'
                                    );
                                }
                                break;
                            case '3':
                                hangupTasks.push(
                                    playerBySeat[playerIndex].account_id + `${$t('game.log.replayDzmj.pong')}【` + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】'
                                );
                                break;
                            case '4':
                                let maxCards = msg.task[type].maxCards;
                                for (let card of maxCards) {
                                    hangupTasks.push(
                                        playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.playerChiCard') + '【' + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】' +
                                        '【' + cardToColor(card - 2) + cardToColor(card - 1) + cardToColor(card) + '】'
                                    );
                                }
                                break;
                            case '5':
                                let tings = msg.task[type].tings;
                                for (let i in tings) {
                                    for (let j in tings[i].tings) {
                                        hangupTasks.push(
                                            playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.discard') + '【' + cardToColor(tings[i].out) + '】' + $t('game.log.replayDzmj.playerTingCard') + '【' + cardToColor(tings[i].tings[j].card) + '】' +
                                            tings[i].tings[j].fan + $t('game.log.replayDzmj.unitMultiple') + '【' + makeRoundPattern(tings[i].tings[j].pattern) + '】'
                                        );
                                    }
                                }
                                break;
                        }
                    }
                    return $t('game.log.replayDzmj.playerOperate') + hangupTasks.join();
                }

                // 【杠牌】
                function s_playerGangCard(msg, playerBySeat) {
                    let windy = msg.gang == 1 ? $t('game.log.replayDzmj.windy-b') : $t('game.log.replayDzmj.windy-s');
                    let raining = $t('game.log.replayDzmj.raining');
                    let infoString = playerBySeat[msg.playerIndex].account_id + `${$t('game.log.replayDzmj.kong')}【` + cardToColor(msg.card) + '】【' + ([1, 3].indexOf(msg.gang) >= 0 ? windy : raining) + '】：';
                    let players = [];
                    for (let i in msg.targets) {
                        players.push(playerBySeat[msg.targets[i]].account_id);
                    }
                    return infoString + players.join();
                }

                // 【胡牌】
                function s_playerHu(msg, playerBySeat) {
                    let infoString = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayDzmj.win')}【` + cardToColor(item.msg.card) + '】';
                    if (item.msg.gsh) {
                        infoString += `【${$t('game.log.replayDzmj.kongWin')}】`;
                    }
                    if (item.msg.isZM) {
                        infoString += `【${$t('game.log.replayDzmj.ownDraw')}】`;
                    }
                    return infoString + '：' + playerBySeat[item.msg.from].account_id;
                }

                // 【金币飘分】
                function s_syncGold(msg, playerBySeat, $filters) {
                    let playerGolds = [];
                    for (let seat in msg) {
                        let billType = $t('game.log.replayDzmj.billType')[msg[seat].type];
                        playerGolds.push(
                            playerBySeat[seat].account_id + billType + '【' + $filters.numeral((msg[seat].info.gainGold + msg[seat].info.pumpGold), '0,0.[0000]') + `${$t('game.log.replayDzmj.coins')}】`
                        )
                    }
                    return playerGolds.join();
                }

                // 【吃牌】
                function s_playerChiCard(chiCards, playerBySeat) {
                    return playerBySeat[chiCards.playerIndex].account_id + '【' + cardToColor(chiCards.selectCard) + '】' + $t('game.log.replayDzmj.playerChiCard') + playerBySeat[chiCards.from].account_id + '【' + cardToColor(chiCards.card) + '】';
                }

                // 【补花】
                function s_playHua(playerIndex, msg, playerBySeat) {
                    let huaInfo = [];
                    for (let v of msg.huaInfo) {
                        huaInfo.push(
                            playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.playHua', {
                                cards: cardToColor(v.cards[0]),
                                newCards: cardToColor(v.newCards[0])
                            })
                        )
                    }
                    return huaInfo.join();
                }

                // 【牌局结算】
                function s_roundSettlement(msg, playerBySeat, $filters) {
                    let dataPlayerList = [];
                    for (let seat in msg.players) {
                        let [totalGold, gainGold, pumpGold] = [0, 0, 0];
                        let [initGold, ownGold] = [0, 0];
                        let [handCards, chiCards, huaCards, huCards, pengCards, gangCards] = ['', '', '', '', '', ''];
                        let [roundPattern, roundPatternScoreArray, roundPatternScore] = ['', '', ''];
                        // 玩家手牌
                        handCards = '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.cards') + s_initHandCards_cards(msg.players[seat].handCards).join() + '</p>';
                        // 赢家数据
                        if (seat == msg.winPlayer) {
                            // 吃牌
                            chiCards = !msg.players[seat].chiCards.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.playerChiCard') + '：' + s_HSZCardExchanged_cards(_.map(msg.players[seat].chiCards, 'card')).join() + '</p>');
                            // 花牌
                            huaCards = !msg.players[seat].huaCards.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.huaCard') + '：' + s_HSZCardExchanged_cards(msg.players[seat].huaCards).join() + '</p>');
                            // 胡牌
                            huCards = !msg.players[seat].huCards.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.win') + '：' + s_HSZCardExchanged_cards(msg.players[seat].huCards).join() + '</p>');
                            // 碰牌
                            pengCards = !msg.players[seat].pengCards.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.pong') + '：' + s_HSZCardExchanged_cards(msg.players[seat].pengCards).join() + '</p>');
                            // 杠牌
                            gangCards = !msg.players[seat].gangCards.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.kong') + '：' + s_HSZCardExchanged_cards(_.map(msg.players[seat].gangCards, 'card')).join() + '</p>');
                            // 番型
                            roundPattern = !msg.players[seat].roundPattern.length ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.roundPattern') + makeRoundPattern(msg.players[seat].roundPattern) + '</p>');
                            // 总倍数
                            roundPatternScore = !msg.players[seat].roundPatternScore ? '' : ('<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.roundPatternScore') + msg.players[seat].roundPatternScore + $t('game.log.replayDzmj.unitMultiple') + '</p>');
                        }
                        // 金币盈亏
                        gainGold = $filters.numeral(msg.players[seat].gainGold, '0,0.[0000]');
                        pumpGold = $filters.numeral(msg.players[seat].pumpGold, '0,0.[0000]');
                        totalGold = $filters.numeral(msg.players[seat].gainGold + msg.players[seat].pumpGold, '0,0.[0000]');
                        // 玩家金币
                        initGold = $filters.numeral(playerBySeat[seat].gold, '0,0.[0000]');
                        ownGold = $filters.numeral(msg.players[seat].ownGold, '0,0.[0000]');
                        // 制作一个玩家数据
                        dataPlayerList.push(
                            handCards + chiCards + huaCards + huCards + pengCards + gangCards + roundPattern + roundPatternScoreArray + roundPatternScore +
                            '<p class="text-warning-custom">' + $t('game.log.replayDzmj.total') + totalGold + $t('game.log.replayDzmj.gainGold') + gainGold + $t('game.log.replayDzmj.pumpGold') + pumpGold + '</p>' +
                            '<p class="text-warning-custom">' + $t('game.log.replayDzmj.initGold') + initGold + $t('game.log.replayDzmj.ownGold') + ownGold + '</p>'
                        );
                    }

                    return $t('game.log.replayDzmj.settlement') + '<div class="mt-3">' + dataPlayerList.join('<div/><div class="mt-3">') + '<div/>';
                }

                // 解析后的字符串
                let msgDesc = '';
                // 每步行为
                item.route = item.route instanceof Object ? item.route.route : item.route;
                switch (item.route) {
                    case 's_roomInfo':
                        msgDesc = $t('game.log.replayDzmj.roomInfo');
                        break;
                    case 's_startNewRound':
                        // return '开始游戏'
                        msgDesc = $t('game.log.replayDzmj.startNewRound') + '（' + playerBySeat[item.msg.dealer].account_id + '）';
                        break;
                    case 's_initHandCards':
                        // return '发手牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.cards') + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_playerSelectHSZ':
                        // return '玩家选择换三张'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.cardExchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                        break;
                    case 's_HSZCardExchanged':
                        // return '交换牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + ' ' + s_HSZCardExchanged_type(item.msg.type) + $t('game.log.replayDzmj.exchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                        break;
                    case 's_roomHSZFinished':
                        msgDesc = $t('game.log.replayDzmj.doneExcluded');
                        break;
                    case 's_playerSelectColor':
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerSelectColor');
                        break;
                    case 's_playerColorSelected':
                        // return '玩家定缺牌'
                        msgDesc = s_playerColorSelected(item.msg, playerBySeat);
                        break;
                    case 's_curPlay':
                        msgDesc = $t('game.log.replayDzmj.curPlayer');
                        break;
                    case 's_playCard':
                        // return '玩家打牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayDzmj.discard')}【` + cardToColor(item.msg.card) + '】';
                        break;
                    case 's_newCard':
                        // return '玩家摸牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayDzmj.draw')}【` + cardToColor(item.msg.card) + '】';
                        break;
                    case 's_hangupTask':
                        // return '挂起任务（胡杠碰）'
                        msgDesc = s_hangupTask(item.playerIndex, item.msg, playerBySeat);
                        // 最后加入【过】选项
                        if (!item.msg.hidePass) {
                            msgDesc = msgDesc + ',' + playerBySeat[item.playerIndex].account_id + `【${$t('game.log.replayDzmj.pass')}】`;
                        }
                        break;
                    case 's_playerGangCard':
                        // return '玩家杠牌'
                        msgDesc = s_playerGangCard(item.msg, playerBySeat);
                        break;
                    case 's_playerPengCard':
                        // return '金币飘分'
                        msgDesc = playerBySeat[item.playerIndex].account_id + `${$t('game.log.replayDzmj.pong')}【` + cardToColor(item.msg.card) + '】：' + playerBySeat[item.msg.from].account_id;
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
                        msgDesc = playerBySeat[item.playerIndex].account_id + `【${$t('game.log.replayDzmj.pass')}】`;
                        break;
                    case 's_trustee':
                        // return '玩家托管、取消托管'
                        msgDesc = playerBySeat[item.playerIndex].account_id + (item.msg.isTrustee ? `【${$t('game.log.replayDzmj.AIControl')}】` : `【${$t('game.log.replayDzmj.cancelAIControl')}】`);
                        break;
                    case 's_roundSettlement':
                        // return '牌局结算'
                        msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
                        break;
                    case 's_playerOffline':
                        // return '离线'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerOffline');
                        break;
                    case 's_playerReconnect':
                        // return '重连'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerReconnect');
                        break;
                    case 's_playerChiCard':
                        // return '吃牌'
                        msgDesc = s_playerChiCard(item.msg, playerBySeat);
                        break;
                    case 's_playerBaoTing':
                        // return '报听'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerBaoTing');
                        break;
                    case 's_playHua':
                        // return '补花'
                        msgDesc = s_playHua(item.playerIndex, item.msg, playerBySeat);
                        break;
                }
                if (item.isTrustee) {
                    msgDesc += `【${$t('game.log.replayDzmj.system')}】`;
                }
                return msgDesc;
            }
        },
        watch: {
            visible: function (n, o) {
                // 初始化参数
                n && this.initData(this.data);
                // 变量赋值
                this.dialogVisible = n;
            }
        },
        methods: {
            t(...params) {
                return this.$t.apply(this, params)
            },
            initData(data) {
                // 读取缓存数据
                let key = data.uid + '.' + data.report_id;
                if (this.recordDataLIst[key]) {
                    this.recordData = this.recordDataLIst[key];
                    return
                }
                // 获取游戏详情
                this.getDetailMahjong(key, data);
            },
            getDetailMahjong(key, data) {
                this.recordLoading = true;
                axios.get('/app/log/getPlayback', {
                    params: {
                        operator_id: data.operator_id,
                        account_id: data.account_id,
                        report_id: data.report_id,
                    }
                }).then((response) => {
                    this.recordLoading = false;
                    if (response.data.resp_msg.code == 200) {
                        this.recordDataLIst[key] = response.data.resp_data;
                        this.recordData = response.data.resp_data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message,
                            showClose: true
                        });
                        this.dialogVisible = false;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__body {
        padding: 0;
        overflow: auto;
        height: 540px;
    }

    .detail-container {
        min-height: 540px;
    }

    .detail-content {
        padding: 15px 20px 30px;
    }

    .detail-container .el-form-item {
        margin-bottom: 0;
    }

    .detail-container /deep/ label {
        color: $font-color-third;
    }

    .icon-coins {
        color: #FFA500;
    }

    .action-list-item {
        padding: 7px 0;
    }
</style>
