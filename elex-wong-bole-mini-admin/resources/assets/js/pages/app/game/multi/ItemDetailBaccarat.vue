<template>
    <el-dialog class="dialog-detail-rbwar" :title="$t('game.log.detailBaccarat.title')" width="500px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="p-3" v-loading="recordLoading">
                    <div class="pl-1" v-if="recordData.gameInfo">
                        <div class="pb-4">
                            【{{ recordData.gameInfo[0].isRoundWin ? $t('game.log.detailBaccarat.earn') : $t('game.log.detailBaccarat.loss') }}】{{$t('game.log.detailBaccarat.dealer')}}：
                            <span v-for="(item, index) in recordData.gameInfo[0].handCards" :key="index">
                                {{ index > 0 ? ',' : '' }}{{ item | hsPokerCardToColor }}
                            </span>
                            {{ recordData.gameInfo[0].isAddCard ? '【'+$t('game.log.detailBaccarat.addCard')+'】' : ''}}
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[1].isRoundWin ? $t('game.log.detailBaccarat.earn') : $t('game.log.detailBaccarat.loss') }}】{{$t('game.log.detailBaccarat.play')}}：
                            <span v-for="(item, index) in recordData.gameInfo[1].handCards" :key="index">
                                {{ index > 0 ? ',' : '' }}{{ item | hsPokerCardToColor }}
                            </span>
                            {{ recordData.gameInfo[1].isAddCard ? '【'+$t('game.log.detailBaccarat.addCard')+'】' : ''}}
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[3].isRoundWin ? $t('game.log.detailBaccarat.yes') : $t('game.log.detailBaccarat.no') }}】{{$t('game.log.detailBaccarat.draw')}}
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[2].isRoundWin ? $t('game.log.detailBaccarat.yes') : $t('game.log.detailBaccarat.no') }}】{{$t('game.log.detailBaccarat.dealerPair')}}
                        </div>
                        <div class="pb-4">
                            【{{ recordData.gameInfo[4].isRoundWin ? $t('game.log.detailBaccarat.yes') : $t('game.log.detailBaccarat.no') }}】{{$t('game.log.detailBaccarat.playPair')}}
                        </div>
                    </div>
                    <div class="list-space"></div>
                    <div class="pt-4 pl-1">
                        <span class="pr-4">【{{$t('game.log.detailBaccarat.dealer')}}】{{ $t('game.log.detailBaccarat.betNum') }}：{{ playerBillsTotal.dealer | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">【{{$t('game.log.detailBaccarat.play')}}】{{ $t('game.log.detailBaccarat.betNum') }}：{{ playerBillsTotal.play | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">【{{$t('game.log.detailBaccarat.draw')}}】{{ $t('game.log.detailBaccarat.betNum') }}：{{ playerBillsTotal.draw | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-1">
                        <span class="pr-4">【{{$t('game.log.detailBaccarat.dealerPair')}}】{{ $t('game.log.detailBaccarat.betNum') }}：{{ playerBillsTotal.dealerPair | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">【{{$t('game.log.detailBaccarat.playPair')}}】{{ $t('game.log.detailBaccarat.betNum') }}：{{ playerBillsTotal.playPair | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2">
                        <span class="pr-4">{{ $t('game.log.detailBaccarat.betNumTotal') }}：{{ data.bet_num | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">{{ $t('game.log.detailBaccarat.betNumValid') }}：{{ data.bet_num_valid | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2">
                        <span class="pr-4">{{ $t('game.log.detailBaccarat.gainGold') }}：{{ data.gain_gold > 0 ? '+' : '' }}{{ data.gain_gold | numeral('0,0.[0000]') }}</span>
                        <span class="pr-4">{{ $t('game.log.detailBaccarat.platformGold') }}：{{ data.income_gold > 0 ? '+' : '' }}{{ data.income_gold | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="pt-4 pl-2 pb-4">
                        <span class="pr-4" v-if="data.ext">
                            {{ $t('game.log.detailBaccarat.initGold') }}：
                            <span v-if="typeof(data.ext.init_gold) == 'undefined'">----</span>
                            <span v-else>{{ data.ext.init_gold | numeral('0,0.[0000]') }}</span>
                        </span>
                        <span class="pr-4">{{ $t('game.log.detailBaccarat.ownGold') }}：{{ data.own_gold | numeral('0,0.[0000]') }}</span>
                    </div>
                    <div class="list-space"></div>
                    <el-table style="width: 100%"
                              v-if="data.details && data.details.bills && data.details.bills.length"
                              :data="data.details.bills">
                        <el-table-column :label="$t('game.log.detailBaccarat.type')">
                            <template slot-scope="scope">
                                {{ scope.row.type == 7 ? $t('game.log.detailBaccarat.settlement') : $t('game.log.detailBaccarat.betNum') }}
                                <span v-if="scope.row.info.betCamp==0">【{{$t('game.log.detailBaccarat.dealer')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==1">【{{$t('game.log.detailBaccarat.play')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==2">【{{$t('game.log.detailBaccarat.dealerPair')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==3">【{{$t('game.log.detailBaccarat.draw')}}】</span>
                                <span v-else-if="scope.row.info.betCamp==4">【{{$t('game.log.detailBaccarat.playPair')}}】</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('game.log.detailBaccarat.gainGold')">
                            <template slot-scope="scope">{{ scope.row.info.gainGold > 0 ? '+' : '' }}{{ scope.row.info.gainGold | numeral('0,0.[0000]') }}</template>
                        </el-table-column>
                        <el-table-column :label="$t('game.log.detailBaccarat.playerGold')">
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
                    dealer: 0,
                    play: 0,
                    dealerPair: 0,
                    draw: 0,
                    playPair: 0,
                    total: 0,
                };
                if (this.data.details && this.data.details.bills && this.data.details.bills.length) {
                    for (let i in this.data.details.bills) {
                        if (this.data.details.bills[i].type == 8) {
                            let gainGold = Math.abs(this.data.details.bills[i].info.gainGold);
                            switch (this.data.details.bills[i].info.betCamp) {
                                case 0:
                                    betNum.dealer += gainGold;
                                    break;
                                case 1:
                                    betNum.play += gainGold;
                                    break;
                                case 2:
                                    betNum.dealerPair += gainGold;
                                    break;
                                case 3:
                                    betNum.draw += gainGold;
                                    break;
                                case 4:
                                    betNum.playPair += gainGold;
                                    break;
                            }
                            betNum.total += gainGold;
                        }
                    }
                }
                return betNum;
            },
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
                axios.get('/game/record/multi/getRecordDetails', {
                    params: {
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
                    }  else {
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