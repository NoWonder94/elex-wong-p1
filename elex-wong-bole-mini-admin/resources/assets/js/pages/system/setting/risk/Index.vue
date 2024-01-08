<template>
    <div class="page-layout">
        <div class="page-layout-header">
            <div class="header-main">
                <div class="back">
                    <a class="btn btn-light btn-sm" href="javascript:history.go(-1);">
                        <font-awesome-icon icon="chevron-left">
                        </font-awesome-icon>
                        {{ $t('back') }}
                    </a>
                </div>
                <div class="title">
                    {{ $t($route.meta.title) }}
                </div>
                <div class="option">
                </div>
            </div>
        </div>
        <div class="page-layout-body">
            <div class="body-main">
                <div class="vuebar-element" v-bar>
                    <div>
                        <div class="page-content" v-loading="loading">
                            <div class="page-filter-option mb-0">
                                <el-form :inline="true" :model="filterOption">
                                    <el-form-item>
                                        <el-date-picker
                                            v-model="filterOption.datetime"
                                            value-format="timestamp"
                                            type="datetimerange"
                                            align="left"
                                            @change="filterChange"
                                            :picker-options="GLOBAL.pickerOptionsLimit"
                                            :start-placeholder="$t('system.setting.risk.placeholder.dateStart')"
                                            :end-placeholder="$t('system.setting.risk.placeholder.dateEnd')"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('system.setting.risk.placeholder.gameType')" v-model="filterOption.game_id" clearable @change="filterGameChange">
                                            <el-option v-for="item in gameList" :key="item.id" :label="$t('games.'+item.id)" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="filterOption.keyword" :placeholder="$t('system.setting.risk.placeholder.playerAccount')" clearable>
                                            <el-button icon="el-icon-search" slot="append" @click="filterChange">
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <!--
                                    <el-form-item>
                                        <el-input v-model="filterOption.ip" :placeholder="$t('system.setting.risk.placeholder.ip')" clearable>
                                            <el-button icon="el-icon-search" slot="append" @click="filterChange">
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    -->
                                </el-form>
                            </div>
                            <div class="list-space">
                            </div>
                            <div class="page-container-inner pt-0">
                                <el-table style="width: 100%"
                                    :data="dataList"
                                    :default-sort="{prop: 'win_percentage', order: 'descending'}"
                                    @sort-change="filterOrderChange"
                                >
                                    <!--
                                    <el-table-column min-width="150" :label="$t('system.setting.risk.table.date')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            {{ new Date(scope.row.create_time * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.gameType')">
                                        <template slot-scope="scope">
                                            {{ $t('games.'+scope.row.game_id) }}
                                        </template>
                                    </el-table-column>
                                    -->
                                    <el-table-column min-width="40" :label="$t('system.setting.risk.table.light')">
                                        <template slot-scope="scope">
                                            <div :id="'light-'+scope.row.account_id" style="height: 30px;width: 30px;">
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.playerAccount')">
                                        <template slot-scope="scope">
                                            {{ scope.row.account_id }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.totalBet')" prop="total_bet" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.bet_gold">
                                                {{ scope.row.bet_gold | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.totalProfit')" prop="total_profit" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.gain_gold">
                                                {{ scope.row.gain_gold | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.noBet')" prop="total_bet_no" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.bet_count">
                                                {{ scope.row.bet_count | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.winPercentage')" prop="win_percentage" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.win_count >= 0">
                                                {{ (scope.row.win_count) | numeral('0,0.[00]') }}%
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('system.setting.risk.table.totalTransferIn')" prop="transfer_in" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.deposits">
                                                {{ scope.row.deposits | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('system.setting.risk.table.totalTransferOut')" prop="transfer_out" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.withdraws">
                                                {{ scope.row.withdraws | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="80" :label="$t('system.setting.risk.table.transferDiff')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.transferDiff">
                                                {{ scope.row.transferDiff | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="80" :label="$t('system.setting.risk.table.profitTime')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.profitTime">
                                                {{ scope.row.profitTime }}s
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.profitDiff')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.averageRev">
                                                {{ scope.row.averageRev | numeral('0,0.[00]') }}
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.ipLogin')">
                                        <template slot-scope="scope">
                                            {{ scope.row.ip }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('system.setting.risk.table.action')">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="showDialog(scope)">
                                                {{ $t('system.setting.risk.table.actionDetail') }}
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="pt-4 text-right">
                                    <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                                        :current-page="filterOption.page"
                                        :page-size.sync="filterOption.page_size"
                                        :total="dataCount.total"
                                        @size-change="filterChange"
                                        @current-change="filterPageChange">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <item-detail :visible.sync="dialog.visible.detail" :data="dataItem" :option="filterOption">
        </item-detail>
    </div>
</template>
<script>
    import ItemDetail from './ItemDetail.vue'

    export default {
        components: {
            ItemDetail
        },
        data() {
            return {
                gameList: [],
                loading: true,
                filterOption: {
                    datetime: [],
                    game_id: '',
                    keyword: '',
                    ip: '',
                    page: 1,
                    page_size: 10,
                    order: 2
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
                dataItem: {},
                dataSumTotal: 0,
                dialog: {
                    visible: {
                        detail: false,
                    }
                },
            }
        },
        created: function () {
            // 搜索关键词
            if (Boolean(this.$route.params.accountId)) {
                this.filterOption.keyword = this.$route.params.accountId;
            }            
        },
        methods: {
            getColor() {
                var that = this;
                this.dataList.forEach(function(data) {
                    if (data.win_count > Math.floor(that.dataSumTotal * 1.15) && data.profitTime <= 50 && data.transferDiff > 350) {
                        document.getElementById("light-"+data.account_id).style.backgroundColor = "red";
                    } else if (data.win_count >  Math.floor(that.dataSumTotal * 1.1) && data.profitTime >= 50 && data.profitTime <= 70 && data.transferDiff > 0 && data.transferDiff < 500) {
                        document.getElementById("light-"+data.account_id).style.backgroundColor = "orange";
                    } else if (data.win_count >  Math.floor(that.dataSumTotal * 1.05) && data.profitTime >= 50 && data.profitTime <= 80 && data.transferDiff > 0 && data.transferDiff < 350) {
                        document.getElementById("light-"+data.account_id).style.backgroundColor = "yellow";
                    } 
                    // else {
                    //     document.getElementById("light-"+data.account_id).style.backgroundColor = "black";
                    // }
                });
            },
            // 获取游戏列表
            getGameList() {
                axios.get('/common/getGameList').then((response) => {
                    this.gameList = response.data.resp_data;
                })
            },
            // 获取玩家账号自动补全
            querySearchAsync(queryString, cb) {
                axios.get('/common/searchPlayer', {
                    params: {
                        keyword: queryString
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        cb(response.data.resp_data);
                    } else {
                        cb([]);
                    }
                })
            },
            clearFilterOption() {
                this.loading = true;
                this.filterOption.page = 1;
            },
            filterChange() {
                this.clearFilterOption();
                this.getDataList();
            },
            filterGameChange() {
                this.clearFilterOption();
                this.filterOption.scene_id = '';
                this.getDataList();
            },
            filterPageChange(page) {
                this.loading = true;
                this.filterOption.page = page;
                this.getDataList();
            },
            filterOrderChange(scope) {
                this.clearFilterOption();

                if (scope.prop == 'total_bet') {
                    this.filterOption.order = scope.order == 'ascending' ? 'total_bet_asc' : 'total_bet_desc';
                } else if (scope.prop == 'total_profit') {
                    this.filterOption.order = scope.order == 'ascending' ? 'total_profit_asc' : 'total_profit_desc';
                } else if (scope.prop == 'total_bet_no') {
                    this.filterOption.order = scope.order == 'ascending' ? 'total_bet_no_asc' : 'total_bet_no_desc';
                } else if (scope.prop == 'win_percentage') {
                    this.filterOption.order = scope.order == 'ascending' ? 'win_percentage_asc' : 'win_percentage_desc';
                } else if (scope.prop == 'transfer_in') {
                    this.filterOption.order = scope.order == 'ascending' ? 'transfer_in_asc' : 'transfer_in_desc';
                } else if (scope.prop == 'transfer_out') {
                    this.filterOption.order = scope.order == 'ascending' ? 'transfer_out_asc' : 'transfer_out_desc';
                }

                this.getDataList();
                
            },
            getDataList() {
                let filterOptionCache = _.cloneDeep(this.filterOption);

                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = Math.floor(filterOptionCache.datetime[0] / 1000);
                    filterOptionCache.datetime[1] = Math.floor(filterOptionCache.datetime[1] / 1000);
                }
                
                axios.get('/system/risk/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.loading = false;
                    if (response.data.resp_msg.code == 200) {
                        this.dataCount = response.data.resp_data.count;
                        this.dataList = response.data.resp_data.data;
                        this.dataSumTotal = response.data.resp_data.sum_total;
                    } else if (response.data.resp_msg.code == 43004) {
                        this.$message({
                            type: 'error',
                            message: this.$t('datePickerOptions.warning'),
                            showClose: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message,
                            showClose: true
                        });
                    }
                })
            },
            showDialog(scope) {
                this.dataItem = scope.row;
                this.dialog.visible.detail = true;
            }
        },
        mounted: function () {
            // 获取游戏列表
            this.getGameList();
            this.getDataList();
        },
        updated: function () {
            this.$nextTick(function () {
                if(this.dataList.length > 0) {
                    this.getColor();
                    }
                });
        }
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
