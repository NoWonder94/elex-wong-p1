<template>
    <el-dialog class="dialog-bills" :title="$t('game.log.dialog.title')" width="500px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div v-loading="recordLoading">
            <el-table style="width: 100%"
                      v-if="recordData.bills && recordData.bills.length"
                      :data="recordData.bills">
                <el-table-column :label="$t('game.log.dialog.type')">
                    <template slot-scope="scope">
                        <span v-if="[10001,10002,10006].indexOf(data.game_id) > -1">{{ scope.row.type | hsMahjongBillsType(scope.row.info, recordData.seatIndex) }}</span>
                        <span v-else>{{ scope.row.type | hsMahjongBillsType }}</span>
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
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemBills",
        props: ['visible', 'data'],
        data() {
            return {
                dialogVisible: false,
                recordLoading: false,
                recordData: {
                    bills: [],
                    seatIndex: 0
                },
                recordDataLIst: []
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
        watch: {
            visible: function (n, o) {
                // 初始化参数
                n && this.initData(this.data);
                // 变量赋值
                this.dialogVisible = n;
            }
        },
        methods: {
            initData(data) {
                // 读取缓存数据
                let key = data.uid + '.' + data.report_id;
                if (this.recordDataLIst[key]) {
                    this.recordData = this.recordDataLIst[key];
                    return
                }
                // 获取玩家游戏明细
                this.getPlayerRecord(key, data);
            },
            getPlayerRecord(key, data) {
                this.recordLoading = true;
                axios.get('/app/log/getPlayerRecord', {
                    params: {
                        uid: data.uid,
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
    .dialog-bills >>> .el-dialog__body {
        padding-top: 0;
        min-height: 320px;
    }
</style>