<template>
    <div class="page-content" v-loading="loading">
        <div class="mt-2">
            <el-form :inline="true" :model="filterOption">
                <el-form-item>
                    <el-date-picker
                            v-model="filterOption.datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="daterange"
                            align="left"
                            @change="filterChange"
                            :start-placeholder="$t('form.startDate')"
                            :end-placeholder="$t('form.endDate')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="el-form-item-medium">
                    <el-select :placeholder="$t('form.gameId')" v-model="filterOption.game_id" clearable @change="filterGameChange">
                        <el-option v-for="item in gameList" :key="item.id" :label="$t('games.'+item.id)" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <component-page-game-scenes-option
                        :game-id="filterOption.game_id"
                        v-model="filterOption.scene_id"
                        @change="filterChange">
                </component-page-game-scenes-option>
                <el-form-item>
                    <el-autocomplete :placeholder="$t('form.accountId')" v-model="filterOption.keyword"
                                     :fetch-suggestions="querySearchAsync"
                                     @select="filterChange" clearable>
                        <template slot-scope="{ item }">
                            <div v-html="$options.filters.hsFilterKeyword(item.value, filterOption.keyword)"></div>
                        </template>
                        <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                    </el-autocomplete>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-space"></div>
        <el-table style="width: 100%"
                  :data="dataList"
                  :default-sort="{prop: 'id', order: 'descending'}"
                  @sort-change="filterOrderChange"
                  :summary-method="getSummaries"
                  show-summary>
            <el-table-column min-width="150" :label="$t('game.player-bet.thLable.day')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                <template slot-scope="scope">
                    <component-page-timestamp :timestamp="scope.row.timed" type="day"></component-page-timestamp>
                </template>
            </el-table-column>
            <el-table-column min-width="140" :label="$t('game.player-bet.thLable.gameId')">
                <template slot-scope="scope">
                    {{ $t('games.'+scope.row.game_id) }}
                </template>
            </el-table-column>
            <el-table-column min-width="120" :label="$t('game.player-bet.thLable.accountId')">
                <template slot-scope="scope">
                    <span v-html="$options.filters.hsFilterKeyword(scope.row.account_id, filterOption.keyword)"></span>
                </template>
            </el-table-column>
            <el-table-column min-width="90" :label="$t('game.player-bet.thLable.sceneId')">
                <template slot-scope="scope">
                    <component-page-game-scenes :game-id="scope.row.game_id" :scenes-id="scope.row.scene_id"></component-page-game-scenes>
                </template>
            </el-table-column>
            <el-table-column min-width="70" :label="$t('game.player-bet.thLable.number')">
                <template slot-scope="scope">
                    <span v-if="scope.row.number <= 0">----</span>
                    <span v-else>{{(scope.row.number) | numeral('0,0') }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="70" :label="$t('game.player-bet.thLable.betBase')">
                <template slot-scope="scope">
                    <span v-if="scope.row.bet_base <= 0">----</span>
                    <span v-else>{{(scope.row.bet_base) | numeral('0,0.[0000]') }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="70" :label="$t('game.player-bet.thLable.betNum')">
                <template slot-scope="scope">
                    <span v-if="scope.row.bet_num <= 0">----</span>
                    <span v-else>{{(scope.row.bet_num) | numeral('0,0.[0000]') }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.player-bet.thLable.gainGold')">
                <template slot-scope="scope">{{ scope.row.gain_gold > 0 ? '+' : '' }}{{ scope.row.gain_gold | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.player-bet.thLable.platformCommission')">
                <template slot-scope="scope">{{ scope.row.income_gold > 0 ? '+' : '' }}{{ scope.row.income_gold | numeral('0,0.[0000]') }}
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
</template>

<script>
    export default {
        name: "BetDay",
        props: ['activeName'],
        data() {
            return {
                gameList: [],
                loading: true,
                filterOption: {
                    datetime: [],
                    org_id: '',
                    game_id: '',
                    scene_id: '',
                    keyword: '',
                    page: 1,
                    page_size: 10,
                    order: 2
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
            }
        },
        watch: {
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
                if (this.gameList.length || this.activeName != 'bet-day') {
                    return false;
                }
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
            filterOrgChange(org) {
                this.loading = true;
                this.filterOption.org_id = Boolean(org) ? org.id : '';
                this.getDataList();
            },
            filterOrderChange(scope) {
                this.clearFilterOption();
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                this.getDataList();
            },
            getDataList() {
                if (this.activeName != 'bet-day') {
                    return false;
                }
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                    filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
                }
                axios.get('/app/player/bet-day/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.dataSumTotal = response.data.resp_data.sum_total;
                    this.loading = false;
                })
            },
            getSummaries() {
                let sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----'];
                sums[4] = this.$options.filters.numeral(this.dataSumTotal.number, '0,0');
                sums[5] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
                sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
                sums[7] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
                sums[8] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
                return sums;
            },
        },
        mounted: function () {
            // 获取游戏列表
            this.getGameList();
        }
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
