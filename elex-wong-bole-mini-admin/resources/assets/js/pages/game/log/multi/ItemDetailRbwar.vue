<template>
    <el-dialog class="dialog-detail-rbwar" :title="$t('game.log.detailRbwar.title')" width="500px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="p-3" v-loading="recordLoading">
                    <div class="pl-1" v-if="recordData.gameInfo">
                        <div class="pb-4">
                            【{{ recordData.gameInfo[1].isRoundWin ? $t('game.log.detailRbwar.earn') : $t('game.log.detailRbwar.loss') }}】{{$t('game.log.detailRbwar.red')}}：
                            <span v-for="(item, index) in recordData.gameInfo[1].handCards" :key="index">
                                {{ index > 0 ? ',' : '' }}{{ item | hsPokerCardToColor }}
                            </span>
                            【{{ recordData.gameInfo[1].roundPattern | pokerRoundPattern(t) }}】
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[2].isRoundWin ? $t('game.log.detailRbwar.earn') : $t('game.log.detailRbwar.loss') }}】{{$t('game.log.detailRbwar.black')}}：
                            <span v-for="(item, index) in recordData.gameInfo[2].handCards" :key="index">
                                {{ index > 0 ? ',' : '' }}{{ item | hsPokerCardToColor }}
                            </span>
                            【{{ recordData.gameInfo[2].roundPattern | pokerRoundPattern(t) }}】
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[3].luckyWin ? $t('game.log.detailRbwar.yes') : $t('game.log.detailRbwar.no') }}】{{$t('game.log.detailRbwar.special')}}
                        </div>
                        <div class="pb-4 text-danger-custom" v-if="! recordData.gameInfo[1].isRoundWin && ! recordData.gameInfo[2].isRoundWin">
                            【{{$t('game.log.detailRbwar.takesAll')}}】
                        </div>
                    </div>
                    <div class="list-space"></div>
                    <div class="pt-4 pl-1">
                        <span class="pr-4">【{{$t('game.log.detailRbwar.red')}}】{{ $t('game.log.detailRbwar.betNum') }}：{{ playerBillsTotal.red | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">【{{$t('game.log.detailRbwar.black')}}】{{ $t('game.log.detailRbwar.betNum') }}：{{ playerBillsTotal.black | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">【{{$t('game.log.detailRbwar.special')}}】{{ $t('game.log.detailRbwar.betNum') }}：{{ playerBillsTotal.special | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2">
                        <span class="pr-4">{{ $t('game.log.detailRbwar.betNumTotal') }}：{{ data.bet_num | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">{{ $t('game.log.detailRbwar.betNumValid') }}：{{ data.bet_num_valid | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2">
                        <span class="pr-4">{{ $t('game.log.detailRbwar.gainGold') }}：{{ data.gain_gold > 0 ? '+' : '' }}{{ data.gain_gold | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">{{ $t('game.log.detailRbwar.platformGold') }}：{{ data.income_gold > 0 ? '+' : '' }}{{ data.income_gold | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2 pb-4">
                        <span class="pr-4" v-if="data.ext">
                            {{ $t('game.log.detailRbwar.initGold') }}：
                            <span v-if="typeof(data.ext.init_gold) == 'undefined'">----</span>
                            <span v-else>{{ data.ext.init_gold | numeral('0,0.[0000]') }}</span>
                        </span>
                        <span class="pr-4">{{ $t('game.log.detailRbwar.ownGold') }}：{{ data.own_gold | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="list-space"></div>
                    <el-table style="width: 100%"
                              v-if="data.details && data.details.bills && data.details.bills.length"
                              :data="data.details.bills">
                        <el-table-column :label="$t('game.log.detailRbwar.type')">
                            <template slot-scope="scope">
                                {{ scope.row.type == 7 ? $t('game.log.detailRbwar.settlement') : $t('game.log.detailRbwar.betNum') }}
                                <span v-if="scope.row.info.betCamp==1">【{{$t('game.log.detailRbwar.red')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==2">【{{$t('game.log.detailRbwar.black')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==3">【{{$t('game.log.detailRbwar.special')}}】</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('game.log.detailRbwar.gainGold')">
                            <template slot-scope="scope">{{ scope.row.info.gainGold > 0 ? '+' : '' }}{{ scope.row.info.gainGold | numeral('0,0.[0000]') }}</template>
                        </el-table-column>
                        <el-table-column :label="$t('game.log.detailRbwar.playerGold')">
                            <template slot-scope="scope">{{ scope.row.info.ownGold | numeral('0,0.[0000]') }}</template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemDetailRbwar",
        props: ['visible', 'data'],
        data() {
            return {
                dialogVisible: false,
                recordLoading: false,
                recordData: {},
                recordDataLIst: []
            }
        },
        computed: {
            playerBillsTotal: function () {
                let betNum = {
                    red: 0,
                    black: 0,
                    special: 0,
                    total: 0,
                };
                if (this.data.details && this.data.details.bills && this.data.details.bills.length) {
                    for (let i in this.data.details.bills) {
                        if (this.data.details.bills[i].type == 8) {
                            let gainGold = Math.abs(this.data.details.bills[i].info.gainGold);
                            switch (this.data.details.bills[i].info.betCamp) {
                                case '1':
                                    betNum.red += gainGold;
                                    break;
                                case '2':
                                    betNum.black += gainGold;
                                    break;
                                case '3':
                                    betNum.special += gainGold;
                                    break;
                            }
                            betNum.total += gainGold;
                        }
                    }
                }
                return betNum;
            },
        },
        filters: {
            pokerRoundPattern: function (type, $t) {
                switch (type) {
                    case 0:
                        return $t('game.log.detailRbwar.scattered');
                        break;
                    case 1:
                        return $t('game.log.detailRbwar.pair');
                        break;
                    case 2:
                        return $t('game.log.detailRbwar.straight');
                        break;
                    case 3:
                        return $t('game.log.detailRbwar.goldFlower');
                        break;
                    case 4:
                        return $t('game.log.detailRbwar.straightGold');
                        break;
                    case 5:
                        return $t('game.log.detailRbwar.leopard');
                        break;
                    default:
                        return $t('game.log.detailRbwar.scattered');
                }
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
                let key = data.report_id;
                if (this.recordDataLIst[key]) {
                    this.recordData = this.recordDataLIst[key];
                    return
                }
                // 获取游戏详情
                this.getRecordDetails(key, data);
            },
            getRecordDetails(key, data) {
                this.recordLoading = true;
                axios.get('/app/log/multi/getRecordDetails', {
                    params: {
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
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .dialog-detail-rbwar >>> .el-dialog__body {
        padding: 0;
        height: 470px;
    }
</style>