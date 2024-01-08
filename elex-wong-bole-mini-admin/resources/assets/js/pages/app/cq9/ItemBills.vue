<template>
    <div class="bills-container">
        <component-page-loading :status="dataStatus" :errorMsg="msg.message"
                                @reload="getData"></component-page-loading>
        <div class="bills-container-inner" v-if="dataStatus == 'dle' && recordData.bills.length">
            <el-table style="width: 100%"
                      :data="recordData.bills">
                <el-table-column :label="$t('game.log.dialog.type')">
                    <template slot-scope="scope">
                        <span v-if="[10001,10002].indexOf(data.game_id) > -1">{{ scope.row.type | hsMahjongBillsType(scope.row.info, recordData.seatIndex) }}</span>
                        <span v-if="[10003,10004].indexOf(data.game_id) > -1">{{ $t('game.log.dialog.settlement') }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('game.log.dialog.gold')">
                    <template slot-scope="scope">{{ (scope.row.info.gainGold + scope.row.info.pumpGold) > 0 ? '+' : '' }}{{ (scope.row.info.gainGold + scope.row.info.pumpGold) | numeral('0,0.[0000]') }}</template>
                </el-table-column>
            </el-table>
            <div class="pt-4 pl-2">
                <span class="pr-4">{{ $t('game.log.dialog.total') }}：{{ playerBillsTotal > 0 ? '+' : '' }}{{ playerBillsTotal | numeral('0,0.[0000]') }}</span>
                <span class="pr-4">{{ $t('game.log.dialog.gainGold') }}：{{ data.gain_gold > 0 ? '+' : '' }}{{ data.gain_gold | numeral('0,0.[0000]') }}</span>
                <span class="pr-4">{{ $t('game.log.dialog.platformCommission') }}：{{ data.income_gold > 0 ? '+' : '' }}{{ data.income_gold | numeral('0,0.[0000]') }}</span>
            </div>
            <div class="pt-4 pl-2">
                <span class="pr-4" v-if="data.ext">
                    {{ $t('game.log.dialog.initGold') }}：
                    <span v-if="typeof(data.ext.init_gold) == 'undefined'">----</span>
                    <span v-else>{{ data.ext.init_gold | numeral('0,0.[0000]') }}</span>
                </span>
                <span class="pr-4">{{ $t('game.log.dialog.ownGold') }}：{{ data.own_gold | numeral('0,0.[0000]') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ItemBills",
        props: ['data'],
        data() {
            return {
                dataStatus: 'dle',
                recordData: {
                    bills: [],
                    seatIndex: 0
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                },
            }
        },
        computed: {
            playerBillsTotal: function () {
                let total = 0;
                for (let i in this.recordData.bills) {
                    total += (this.recordData.bills[i].info.gainGold + this.recordData.bills[i].info.pumpGold);
                }
                return total;
            },
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            getData() {
                this.initMsg();
                this.dataStatus = 'loading';
                axios.get('/cq9/detail/getPlayerRecord').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        for (let i in response.data.resp_data.bills) {
                            if (response.data.resp_data.bills[i].info.isLeave) {
                                response.data.resp_data.bills.splice(i, 1);
                            }
                        }
                        this.recordData = response.data.resp_data;
                        this.dataStatus = !this.recordData.bills.length ? 'nodata' : 'dle';
                    } else {
                        this.msg = response.data.resp_msg;
                        this.dataStatus = 'error-msg';
                    }
                })
            },
        },
        mounted: function () {
            // 获取玩家游戏明细
            this.getData();
        }
    }
</script>

<style scoped>

</style>