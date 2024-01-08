<template>
    <div class="page-content pt-2" v-loading="loading">
        <el-form :inline="true" :model="filterOption">
            <el-form-item>
                <el-date-picker
                        v-model="filterOption.datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        align="left"
                        @change="filterChange"
                        :picker-options="GLOBAL.pickerOptionsLimit"
                        :start-placeholder="$t('form.startDate')"
                        :end-placeholder="$t('form.endDate')">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="initStatus">
                <component-page-org-tree-option :current-org-id="$route.params.orgId" @click="filterOrgChange"></component-page-org-tree-option>
            </el-form-item>
            <!--<el-form-item>
                <el-input :placeholder="$t('form.exOrgId')" v-model="filterOption.ex_org_id" clearable @change="filterChange"></el-input>
            </el-form-item>-->
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
            <el-form-item class="el-form-item-small">
                <el-select :placeholder="$t('form.logStatus')" v-model="filterOption.status" clearable @change="filterChange">
                    <el-option :key="index" v-for="(item, index) in $t('form.logStatusList')" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-autocomplete :placeholder="$t('form.accountId')" v-model="filterOption.keyword"
                                 :fetch-suggestions="querySearchAsync"
                                 @select="filterChange" clearable
                                 v-if="filterOption.keyword_type == 1">
                    <el-select v-model="filterOption.keyword_type" slot="prepend" :placeholder="$t('form.select')" style="width: 110px">
                        <el-option v-for="item in keywordTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <template slot-scope="{ item }">
                        <div v-html="$options.filters.hsFilterKeyword(item.value, filterOption.keyword)"></div>
                    </template>
                    <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                </el-autocomplete>
                <el-input :placeholder="$t('form.roomId')" v-model="filterOption.keyword" clearable
                          v-if="filterOption.keyword_type == 2">
                    <el-select v-model="filterOption.keyword_type" slot="prepend" :placeholder="$t('form.select')" style="width: 110px">
                        <el-option v-for="item in keywordTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="list-space"></div>
        <el-table style="width: 100%"
                  :data="dataList"
                  :default-sort="{prop: 'id', order: 'descending'}"
                  @sort-change="filterOrderChange"
                  :summary-method="getSummaries"
                  show-summary>
            <el-table-column min-width="150" :label="$t('game.log.thLable.time')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                <template slot-scope="scope">
                    <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                </template>
            </el-table-column>
            <el-table-column min-width="80" :label="$t('game.log.thLable.orgName')" prop="org_name"></el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.gameId')">
                <template slot-scope="scope">
                    {{ $t('games.'+scope.row.game_id) }}
                </template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.accountId')">
                <template slot-scope="scope">
                    <span v-if="filterOption.keyword_type == 1" v-html="$options.filters.hsFilterKeyword(scope.row.account_id, filterOption.keyword)"></span>
                    <span v-else>{{ scope.row.account_id }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="80" :label="$t('game.log.thLable.roomId')">
                <template slot-scope="scope">
                    <span v-if="filterOption.keyword_type == 2" v-html="$options.filters.hsFilterKeyword(scope.row.room_id, filterOption.keyword)"></span>
                    <span v-else>{{ scope.row.room_id }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="90" :label="$t('game.log.thLable.sceneId')">
                <template slot-scope="scope">
                    <component-page-game-scenes :game-id="scope.row.game_id" :scenes-id="scope.row.scene_id"></component-page-game-scenes>
                </template>
            </el-table-column>
            <el-table-column min-width="80" :label="$t('game.log.thLable.betBase')">
                <template slot-scope="scope">{{(scope.row.bet_base) | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="70" :label="$t('game.log.thLable.betNum')">
                <template slot-scope="scope">{{(scope.row.bet_num) | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.betNumValid')">
                <template slot-scope="scope">{{(scope.row.bet_num_valid) | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.gainGold')">
                <template slot-scope="scope">{{ scope.row.gain_gold > 0 ? '+' : '' }}{{ scope.row.gain_gold | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.platformMultiCommission')">
                <template slot-scope="scope">{{ scope.row.income_gold > 0 ? '+' : '' }}{{ scope.row.income_gold | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.status')">
                <template slot-scope="scope">
                    <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.logStatusList[0].label') }}</el-tag>
                    <el-tag size="medium" v-else-if="scope.row.status==2" type="warning">{{ $t('form.logStatusList[1].label') }}</el-tag>
                    <el-tag size="medium" v-else-if="scope.row.status==3" type="danger">{{ $t('form.logStatusList[2].label') }}</el-tag>
                    <span v-else>----</span>
                </template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.initGold')">
                <template slot-scope="scope">
                    <span v-if="typeof(scope.row.ext.init_gold) == 'undefined'">----</span>
                    <span v-else>{{ scope.row.ext.init_gold | numeral('0,0.[0000]') }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="100" :label="$t('game.log.thLable.ownGold')">
                <template slot-scope="scope">{{ scope.row.own_gold | numeral('0,0.[0000]') }}</template>
            </el-table-column>
            <el-table-column min-width="140" :label="$t('game.log.thLable.operation')">
                <template slot-scope="scope">
                    <el-button class="ml-0" size="mini" @click="dialogDetailRbwar(scope)"
                               v-if="[10008].indexOf(scope.row.game_id) > -1">{{ $t('game.log.thLable.details') }}
                    </el-button>
                    <el-button class="ml-0" size="mini" @click="dialogDetailBaccarat(scope)"
                               v-if="[10010].indexOf(scope.row.game_id) > -1">{{ $t('game.log.thLable.details') }}
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
        <item-detail-rbwar :visible.sync="dialog.visible.detailRbwar" :data="dataItem"></item-detail-rbwar>
        <item-detail-baccarat :visible.sync="dialog.visible.detailBaccarat" :data="dataItem"></item-detail-baccarat>
    </div>
</template>

<script>
    import ItemDetailRbwar from './ItemDetailRbwar.vue'
    import ItemDetailBaccarat from './ItemDetailBaccarat.vue'

    export default {
        components: {
            ItemDetailRbwar,
            ItemDetailBaccarat,
        },
        name: "LogMulti",
        props: ['activeName'],
        data() {
            return {
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
                    org_id: '',
                    game_id: '',
                    scene_id: '',
                    status: '',
                    user_type: '',
                    keyword: '',
                    keyword_type: 1,
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
                dialog: {
                    visible: {
                        detailRbwar: false,
                        detailBaccarat: false,
                    }
                },
                initStautsCache: false
            }
        },
        computed: {
            initStatus: function () {
                if (this.activeName == 'log-multi') {
                    this.initStautsCache = true;
                }
                return this.initStautsCache;
            }
        },
        created: function () {
            // 代理ID
            if (Boolean(this.$route.params.orgId)) {
                this.filterOption.org_id = this.$route.params.orgId;
            }
            // 搜索关键词
            if (Boolean(this.$route.params.accountId)) {
                this.filterOption.keyword = this.$route.params.accountId;
            }
        },
        watch: {
            activeName: function (n, o) {
                // 获取游戏列表
                this.getGameList();
                // 初始化数据
                if (!this.dataList.length) {
                    // 获取列表数据
                    this.getDataList();
                }
            }
        },
        methods: {
            // 获取游戏列表
            getGameList() {
                if (this.gameList.length || this.activeName != 'log-multi') {
                    return false;
                }
                axios.get('/common/getGameList', {
                    params: {type: 2}
                }).then((response) => {
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
                if (this.activeName != 'log-multi') {
                    return false;
                }
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                    filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
                }
                axios.get('/app/log/multi/getList', {
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
            getSummaries() {
                let sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----'];
                sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
                sums[7] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
                sums[8] = this.$options.filters.numeral(this.dataSumTotal.bet_num_valid, '0,0.[0000]');
                sums[9] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
                sums[10] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
                return sums;
            },
            // 游戏详情【红黑大战】
            dialogDetailRbwar(scope) {
                this.dataItem = scope.row;
                // // 显示模态框
                this.dialog.visible.detailRbwar = true;
            },
            // 游戏详情【百家乐】
            dialogDetailBaccarat(scope) {
                this.dataItem = scope.row;
                // // 显示模态框
                this.dialog.visible.detailBaccarat = true;
            },
        },
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
