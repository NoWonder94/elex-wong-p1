<template>
    <el-dialog class="dialog-playback" :title="$t('game.log.replayMahjong.title')" width="1100px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="vuebar-element" v-bar>
            <div>
                <div class="detail-container" v-loading="recordLoading">
                    <el-table style="width: 100%"
                        :data="dataList"
                        :default-sort="{prop: 'id', order: 'descending'}"
                        @sort-change="filterOrderChange"
                    >
                        <el-table-column min-width="150" :label="$t('system.setting.risk.table.date')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']" >
                            <template slot-scope="scope">
                                {{ new Date(scope.row.create_time * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.gameType')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.game_id">
                                    {{ $t('games.'+scope.row.game_id) }}
                                </span>
                                <span v-else>
                                    --
                                </span>                            
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.roomId')">                          
                            <template slot-scope="scope">
                                <span v-if="scope.row.source_id">
                                    {{ scope.row.source_id }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>  
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.sceneType')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cost_type">
                                    <p v-if="scope.row.cost_type == 1">
                                        转出
                                    </p>
                                    <p v-else-if="scope.row.cost_type == 2">
                                        转入
                                    </p>
                                    <p v-else-if="scope.row.cost_type == 3">
                                        游戏消耗
                                    </p>
                                    <p v-else-if="scope.row.cost_type == 4">
                                        抽水
                                    </p>
                                    <p v-else>
                                        {{ scope.row.cost_type }}
                                    </p>
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>                   
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.status')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status">
                                    <p v-if="scope.row.status == 1">
                                        发起
                                    </p>
                                    <p v-else-if="scope.row.status == 2">
                                        成功
                                    </p>
                                    <p v-else-if="scope.row.status == 3">
                                        失败
                                    </p>
                                    <p v-else>
                                        {{ scope.row.status }}
                                    </p>
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.profit')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.gain_gold != null">
                                   {{scope.row.gain_gold | numeral('0,0.[00]') }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.moneyStart')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.own_gold != null">
                                   {{ scope.row.own_gold - scope.row.gain_gold | numeral('0,0.[00]') }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.moneyEnd')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.own_gold != null">
                                    {{ scope.row.own_gold | numeral('0,0.[00]') }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.ipLogin')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.ip">
                                    {{ scope.row.ip }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" :label="$t('system.setting.risk.table.device')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.devices">
                                    {{ scope.row.devices }}
                                </span> 
                                <span v-else>
                                    --
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pt-4 text-right">
                        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                            :current-page="filterOption.page"
                            :page-size.sync="filterOption.page_size"
                            :total="dataCount.total"
                            @size-change="clearFilterOption"
                            @current-change="filterPageChange">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "RiskDetail",
        props: ['visible', 'data','option'],
        data() {
            return {
                dialogVisible: false,
                recordLoading: false,
                gameList: [],
                keywordTypeList: [{
                    id: 1,
                    name: this.$t('form.accountId')
                }, {
                    id: 2,
                    name: this.$t('form.roomId')
                }],
                loading: true,
                filterOption: {
                    datetime: [],
                    game_id: '',
                    keyword : '',
                    ip: '',
                    page: 1,
                    page_size: 10,
                    order: 1
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
                dataItem: {},
                dataSumTotal: {
                    bet_base: 0,
                    gain_gold: 0,
                    income_gold: 0
                },
                dialog: {
                    visible: {
                        detail: false,
                    }
                },
            }
        },
        methods: {
            getDataList(data) {
                this.recordLoading = true;
                this.filterOption.keyword = data.account_id;
                this.filterOption.datetime = this.option.datetime;
                this.filterOption.game_id = this.option.game_id;
                let filterOptionCache = _.cloneDeep(this.filterOption);

                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = Math.floor(filterOptionCache.datetime[0] / 1000);
                    filterOptionCache.datetime[1] = Math.floor(filterOptionCache.datetime[1] / 1000);
                }

                axios.get('/system/risk/getDetail', {
                    params: filterOptionCache,
                }).then((response) => {
                    this.recordLoading = false;
                    if (response.data.resp_msg.code == 200) {
                        this.dataCount = response.data.resp_data.count;
                        this.dataList = response.data.resp_data.data;
                        this.dataSumTotal = response.data.resp_data.sum_total;
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message,
                            showClose: true
                        });
                    }
                })
            },
            filterPageChange(page) {
                this.recordLoading = true;
                this.filterOption.page = page;
                this.getDataList(this.data);
            },
            clearFilterOption() {
                this.loading = true;
                this.filterOption.page = 1;
            },
            filterOrderChange(scope) {
                this.clearFilterOption();
                this.filterOption.order = scope.order == 'ascending' ? 2 : 1;
                this.getDataList(this.data);
            }
        },
        watch: {
            visible: function (n, o) {
                // 初始化参数
                
                n && this.getDataList(this.data);
                // 变量赋值
                this.dialogVisible = n;
                
                this.clearFilterOption();
            }
        },
        // mounted() {
        //     console.log(this.option);
        //     console.log('a');
        // }
    }
</script>
<style lang="scss" scoped>
</style>