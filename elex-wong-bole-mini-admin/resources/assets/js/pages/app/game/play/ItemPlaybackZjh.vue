<template>
    <el-dialog class="dialog-playback" :title="$t('game.log.replayZjh.title')" width="690px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="detail-container" v-loading="recordLoading">
                    <div v-if="!recordLoading">
                        <div class="detail-content">
                            <el-row v-if="recordData.data.length > 0">
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayZjh.gameName')">{{ data.game_name }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayZjh.roomId')">{{ data.room_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayZjh.reportId')">{{ data.report_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayZjh.startDate')">
                                            <component-page-timestamp :timestamp="recordData.data[0].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                        <el-form-item :label="$t('game.log.replayZjh.endDate')">
                                            <component-page-timestamp :timestamp="recordData.data[recordData.data.length - 1].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayZjh.betBase')">{{ data.bet_base | numeral('0,0.[0000]') }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayZjh.seat'+index)" v-for="(item, index) in playersByPlayback" :key="index">
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
                            <div class="action-list-item" v-for="(item, index) in recordData.data" :key="index" v-if="routeExcept.indexOf(item.route) < 0">
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
        name: "ItemPlaybackZjh",
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
                routeExcept: ['s_roomInfo', 's_curPlay', 's_notifyCardsForTest', 's_operation']
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
                let playerBySeat = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}};
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
                    let numbers = {1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K'}
                    if (100 < card && card < 200) {
                        return $t('game.log.replayZjh.blackhead') + numbers[card % 100]
                    } else if (200 < card && card < 300) {
                        return $t('game.log.replayZjh.redHeart') + numbers[card % 100]
                    } else if (300 < card && card < 400) {
                        return $t('game.log.replayZjh.plum') + numbers[card % 100]
                    } else if (400 < card && card < 500) {
                        return $t('game.log.replayZjh.square') + numbers[card % 100]
                    }
                }

                // 数字转扑克【手牌】
                function s_initHandCards_cards(cards) {
                    let colors = [];
                    for (let i in cards.value) {
                        if (cards.type == 2) {
                            colors.push(cardToColor(i));
                        } else {
                            colors.push('*');
                        }
                    }
                    return colors;
                }

                // 【牌局结算】
                function s_roundSettlement(msg, playerBySeat, $filters) {
                    let [totalGold, gainGold, pumpGold] = [0, 0, 0];
                    let [initGold, ownGold] = [0, 0];
                    let playerCoins = [];
                    for (let seat in msg) {
                        if (isNaN(seat)) {
                            continue
                        }
                        // 金币盈亏
                        gainGold = $filters.numeral(msg[seat].gainGold, '0,0.[0000]');
                        pumpGold = $filters.numeral(msg[seat].pumpGold, '0,0.[0000]');
                        totalGold = $filters.numeral(msg[seat].gainGold + msg[seat].pumpGold, '0,0.[0000]');
                        // 玩家金币
                        initGold = $filters.numeral(playerBySeat[seat].gold, '0,0.[0000]');
                        ownGold = $filters.numeral(msg[seat].ownGold, '0,0.[0000]');

                        playerCoins.push(
                            `<p class="mt-3">${$t('game.log.replayZjh.player')}` + playerBySeat[seat].account_id + '</p>' +
                            '<p class="text-warning-custom">' + $t('game.log.replayZjh.total') + totalGold + $t('game.log.replayZjh.gainGold') + gainGold + $t('game.log.replayZjh.pumpGold') + pumpGold + '</p>' +
                            '<p class="text-warning-custom">' + $t('game.log.replayZjh.initGold') + initGold + $t('game.log.replayZjh.ownGold') + ownGold + '</p>'
                        );
                    }
                    return $t('game.log.replayZjh.settlement') + playerCoins.join('');
                }

                // 解析后的字符串
                let msgDesc = '';
                // 每步行为
                switch (item.route) {
                    case 's_roomInfo':
                        // 房间信息（游戏、玩家信息）
                        msgDesc = $t('game.log.replayZjh.roomInfo');
                        break;
                    case 's_startNewRound':
                        // 开始游戏
                        msgDesc = $t('game.log.replayZjh.startNewRound');
                        break;
                    case 's_playerHandCard':
                        // 玩家手牌
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.cards') + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_addBet':
                        // 1 跟注   2 加注  3比牌   4 底分
                        msgDesc = playerBySeat[item.playerIndex].account_id + '【' + $t('game.log.replayZjh.addBet' + item.msg.type) + '】' + item.msg.addBet + $t('game.log.replayZjh.coins');
                        break;
                    case 's_curPlay':
                        // 切换到下一家
                        msgDesc = $t('game.log.replayZjh.curPlay') + playerBySeat[item.playerIndex].account_id;
                        break;
                    case 's_operation':
                        // 玩家操作
                        msgDesc = $t('game.log.replayZjh.operation');
                        break;
                    case 's_abandonCard':
                        // 玩家弃牌
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.abandonCard');
                        break;
                    case 's_lookCard':
                        // 玩家看牌
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.lookCard') + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_compareCardResult':
                        // 比牌结果
                        msgDesc = $t('game.log.replayZjh.compareCardResult') +
                            playerBySeat[item.msg.sourceIndex].account_id + $t('game.log.replayZjh.compareCard') + playerBySeat[item.msg.targetIndex].account_id + '，' +
                            playerBySeat[item.msg.winIndex].account_id + '【' + $t('game.log.replayZjh.win') + '】' + playerBySeat[item.msg.FailIndex].account_id + '【' + $t('game.log.replayZjh.lose') + '】'
                        break;
                    case 's_notify':
                        // 孤注一掷通知
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.notify');
                        break;
                    case 's_guZhuYiZhi':
                        // 孤注一掷
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.guZhuYiZhi') + '【' + (item.msg.result == 1 ? $t('game.log.replayZjh.succeed') : $t('game.log.replayZjh.failed')) + '】';
                        break;
                    case 's_roundMaxTurn':
                        // 最大轮数上限
                        msgDesc = $t('game.log.replayZjh.roundMaxTurn') + playerBySeat[item.playerIndex].account_id + '【' + (item.msg.result == 1 ? $t('game.log.replayZjh.succeed') : $t('game.log.replayZjh.failed')) + '】' + '，' + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_timeOutProject':
                        // 超时保护
                        msgDesc = playerBySeat[item.playerIndex].account_id + '【' + (item.msg.project == 1 ? $t('game.log.replayZjh.on') : $t('game.log.replayZjh.off')) + '】' + $t('game.log.replayZjh.timeOutProject');
                        break;
                    case 's_roundSettlement':
                        // return '牌局结算'
                        msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
                        break;
                    case 's_playerOffline':
                        // return '离线
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.playerOffline');
                        break;
                    case 's_playerReconnect':
                        // return '重连
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.playerReconnect');
                        break;
                }
                if (item.isTrustee) {
                    msgDesc += `【${$t('game.log.replayZjh.system')}】`;
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
                axios.get('/game/record/getPlayback', {
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
                    } else if (response.data.resp_msg.code == 401) {
                        this.$message({
                            type: 'error',
                            message: this.$t('error.401'),
                            showClose: true
                        });
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