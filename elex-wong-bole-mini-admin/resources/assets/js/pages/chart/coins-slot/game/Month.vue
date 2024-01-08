<template>
    <div class="page-content" v-loading="loading">
        <div class="mt-2">
            <el-form :inline="true" :model="filterOption">
                <el-form-item>
                    <el-date-picker
                            v-model="filterOption.datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="month"
                            align="left"
                            @change="filterChange"
                            :placeholder="$t('form.month')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="el-form-item-medium">
                    <el-select :placeholder="$t('form.gameId')" v-model="filterOption.game_id" clearable @change="filterChange">
                        <el-option v-for="item in gameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="filterChange">{{ $t('form.search') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-space"></div>
        <el-table style="width: 100%"
                  :data="dataList"
                  :default-sort="{prop: 'timed', order: 'descending'}"
                  @sort-change="filterOrderChange">
            <el-table-column min-width="110" :label="$t('chart.game.thLable.month')" prop="timed" sortable="custom" :sort-orders="['ascending', 'descending']">
                <template slot-scope="scope">
                    <component-page-timestamp :timestamp="scope.row.timed" type="month"></component-page-timestamp>
                </template>
            </el-table-column>
            <el-table-column min-width="140" :label="$t('chart.game.thLable.game')">
                <template slot-scope="scope">
                    {{ $t('games.'+scope.row.game_id) }}
                </template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('chart.game.thLable.playerBet')">
                <template slot-scope="scope">{{ scope.row.bet_num | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('chart.game.thLable.platformGold')">
                <template slot-scope="scope">{{ scope.row.amount > 0 ? '+' : '' }}{{ scope.row.amount | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('chart.game.thLable.playerBetChild')">
                <template slot-scope="scope">{{ scope.row.tree_bet_num | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="160" :label="$t('chart.game.thLable.platformGoldChild')">
                <template slot-scope="scope">{{ scope.row.tree_amount > 0 ? '+' : '' }}{{ scope.row.tree_amount | numeral('0,0.[0000]') }}</template>
            </el-table-column>
        </el-table>
        <div class="pt-4 text-right">
            <el-pagination background layout="prev, pager, next"
                           :current-page="filterOption.page"
                           :page-size="filterOption.page_size"
                           :total="dataCount.total"
                           @current-change="filterPageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChartGameMonth",
        props: ['activeTime', 'activeName'],
        data() {
            return {
                gameList: [],
                loading: true,
                filterOption: {
                    datetime: '',
                    game_id: '',
                    page: 1,
                    page_size: 10,
                    order: 2
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
            }
        },
        watch: {
            activeTime: function (n, o) {
                // 初始化数据
                if (!this.dataList.length) {
                    // 获取游戏列表
                    this.getGameList();
                    // 获取列表数据
                    this.getDataList();
                }
            },
            activeName: function (n, o) {
                // 初始化数据
                if (!this.dataList.length) {
                    // 获取游戏列表
                    this.getGameList();
                    // 获取列表数据
                    this.getDataList();
                }
            }
        },
        methods: {
            // 获取游戏列表
            getGameList() {
                if (this.gameList.length || this.activeName != 'game' || this.activeTime != 'month') {
                    return false;
                }
                axios.get('/common/getGameList', {
                    params: {type: 3}
                }).then((response) => {
                    this.gameList = response.data.resp_data;
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
            filterPageChange(page) {
                this.loading = true;
                this.filterOption.page = page;
                this.getDataList();
            },
            filterOrderChange(scope) {
                this.clearFilterOption();
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                this.getDataList();
            },
            getDataList() {
                if (this.activeName != 'game' || this.activeTime != 'month') {
                    return false;
                }
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime);
                }
                axios.get('/chart/coins-slot/month/getGameList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.loading = false;
                })
            },
        }
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
