<template>
    <el-dialog class="dialog-playback" :title="$t('game.log.replayNiuniu.title')" width="690px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="detail-container" v-loading="recordLoading">
                    <div v-if="!recordLoading">
                        <div class="detail-content">
                            <el-row v-if="recordData.data.length > 0">
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayNiuniu.gameName')">{{ data.game_name }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayNiuniu.roomId')">{{ data.room_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayNiuniu.reportId')">{{ data.report_id }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayNiuniu.startDate')">
                                            <component-page-timestamp :timestamp="recordData.data[0].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                        <el-form-item :label="$t('game.log.replayNiuniu.endDate')">
                                            <component-page-timestamp :timestamp="recordData.data[recordData.data.length - 1].timestamp"></component-page-timestamp>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12">
                                    <el-form label-width="80px">
                                        <el-form-item :label="$t('game.log.replayNiuniu.betBase')">{{ data.bet_base | numeral('0,0.[0000]') }}</el-form-item>
                                        <el-form-item :label="$t('game.log.replayNiuniu.seat'+index)" v-for="(item, index) in playersByPlayback" :key="index">
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
                                【<component-page-timestamp :timestamp="item.timestamp"></component-page-timestamp>】
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
        name: "ItemPlaybackNiuniu",
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
                routeExcept: ['s_roomInfo']
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
                    let numbers = {1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K'}
                    if (100 < card && card < 200) {
                        return $t('game.log.replayNiuniu.blackhead') + numbers[card % 100]
                    } else if (200 < card && card < 300) {
                        return $t('game.log.replayNiuniu.redHeart') + numbers[card % 100]
                    } else if (300 < card && card < 400) {
                        return $t('game.log.replayNiuniu.plum') + numbers[card % 100]
                    } else if (400 < card && card < 500) {
                        return $t('game.log.replayNiuniu.square') + numbers[card % 100]
                    }
                }

                // 数字转扑克【手牌】
                function s_initHandCards_cards(cards) {
                    let colors = [];
                    for (let i in cards) {
                        colors.push(cardToColor(cards[i]));
                    }
                    return colors;
                }

                // 【玩家可抢庄倍数】
                function s_robDealerMulti(playerIndex, msg, playerBySeat) {
                    let multiArray = [];
                    for (let i in msg) {
                        if (msg[i] && i > 0) {
                            multiArray.push('【' + i + `${$t('game.log.replayNiuniu.times')}】`)
                        }
                    }
                    return playerBySeat[playerIndex].account_id + $t('game.log.replayNiuniu.robDealerMulti') + multiArray.join()
                }

                // 【玩家可押注倍数】
                function s_addAnteMulti(playerIndex, msg, playerBySeat) {
                    let multiArray = [];
                    for (let i in msg) {
                        if (msg[i] && i > 0) {
                            multiArray.push('【' + i + `${$t('game.log.replayNiuniu.times')}】`)
                        }
                    }
                    return playerBySeat[playerIndex].account_id + $t('game.log.replayNiuniu.addAnteMulti') + multiArray.join()
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
                            `<p class="mt-3">${$t('game.log.replayNiuniu.player')}` + playerBySeat[seat].account_id + '</p>' +
                            '<p class="text-warning-custom">' + $t('game.log.replayNiuniu.total') + totalGold + $t('game.log.replayNiuniu.gainGold') + gainGold + $t('game.log.replayNiuniu.pumpGold') + pumpGold + '</p>' +
                            '<p class="text-warning-custom">' + $t('game.log.replayNiuniu.initGold') + initGold + $t('game.log.replayNiuniu.ownGold') + ownGold + '</p>'
                        );
                    }
                    return $t('game.log.replayNiuniu.settlement') + playerCoins.join('');
                }

                // 解析后的字符串
                let msgDesc = '';
                // 每步行为
                switch (item.route) {
                    case 's_roomInfo':
                        msgDesc = $t('game.log.replayNiuniu.roomInfo');
                        break;
                    case 's_startNewRound':
                        msgDesc = $t('game.log.replayNiuniu.startNewRound');
                        break;
                    case 's_startRobDealer':
                        msgDesc = $t('game.log.replayNiuniu.startRobDealer');
                        break;
                    case 's_robDealerMulti':
                        // return '玩家可抢庄倍数'
                        msgDesc = s_robDealerMulti(item.playerIndex, item.msg, playerBySeat);
                        break;
                    case 's_playerRobDealer':
                        // return '玩家抢庄'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playerRobDealer') + (item.msg.multi > 0 ? '【' + item.msg.multi + `${$t('game.log.replayNiuniu.times')}】` : `【${$t('game.log.replayNiuniu.notRobDealer')}】`) + (item.msg.isTrustee ? `【${$t('game.log.replayNiuniu.system')}】` : '');
                        break;
                    case 's_dealerChanged':
                        // return '定庄完成'
                        msgDesc = playerBySeat[item.msg.dealer].account_id + $t('game.log.replayNiuniu.dealerChanged');
                        break;
                    case 's_startAddAnte':
                        msgDesc = $t('game.log.replayNiuniu.startAddAnte');
                        break;
                    case 's_addAnteMulti':
                        // return '玩家可押注倍数'
                        msgDesc = s_addAnteMulti(item.playerIndex, item.msg, playerBySeat);
                        break;
                    case 's_playerAddAnte':
                        // return '玩家押注'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playerAddAnte') + (item.msg.multi > 0 ? '【' + item.msg.multi + `${$t('game.log.replayNiuniu.times')}】` : `【${$t('game.log.replayNiuniu.notAddAnte')}】`) + (item.msg.isTrustee ? `【${$t('game.log.replayNiuniu.system')}】` : '');
                        break;
                    case 's_addAnteFinish':
                        msgDesc = $t('game.log.replayNiuniu.addAnteFinish');
                        break;
                    case 's_initHandCards':
                        // return '发手牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.cards') + (s_initHandCards_cards(item.msg.cards)).join();
                        break;
                    case 's_startPlayCards':
                        msgDesc = $t('game.log.replayNiuniu.startPlayCards');
                        break;
                    case 's_playCards':
                        // return '选牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playCards') + (item.msg.selectedCards ? (s_initHandCards_cards(item.msg.selectedCards)).join() : `【${$t('game.log.replayNiuniu.notPlayCards')}】`);
                        break;
                    case 's_playCardsFinish':
                        msgDesc = $t('game.log.replayNiuniu.playCardsFinish');
                        break;
                    case 's_startOpenCard':
                        msgDesc = $t('game.log.replayNiuniu.startOpenCard');
                        break;
                    case 's_openCard':
                        // return '玩家摊牌'
                        msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playOpenCard');
                        break;
                    case 's_openCardFinish':
                        msgDesc = $t('game.log.replayNiuniu.openCardFinish');
                        break;
                    case 's_roundSettlement':
                        // return '牌局结算'
                        msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
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