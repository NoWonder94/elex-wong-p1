<template>
    <div class="page-layout">
        <div class="page-layout-header">
            <div class="header-main">
                <div class="back">
                    <a class="btn btn-light btn-sm" href="javascript:history.go(-1);">
                        <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                        {{ $t('back') }}
                    </a>
                </div>
                <div class="title">{{ $t($route.meta.title) }}</div>
                <div class="option"></div>
            </div>
        </div>
        <div class="page-layout-body">
            <div class="body-main">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <div class="page-content" v-loading="loading">
                            <div class="page-filter-option mb-0">
                                <el-form :inline="true" :model="filterOption">
                                    <el-form-item>
                                        <el-date-picker
                                                v-model="filterOption.login_time"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="datetimerange"
                                                align="left"
                                                @change="filterChange"
                                                :picker-options="GLOBAL.pickerOptions"
                                                :start-placeholder="$t('form.loginStartDate')"
                                                :end-placeholder="$t('form.loginEndDate')">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-date-picker
                                                v-model="filterOption.create_time"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="datetimerange"
                                                align="left"
                                                @change="filterChange"
                                                :picker-options="GLOBAL.pickerOptions"
                                                :start-placeholder="$t('form.regStartDate')"
                                                :end-placeholder="$t('form.regEndDate')">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('form.playerRole')" v-model="filterOption.role" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.playerRoleList')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('form.playerAccess')" v-model="filterOption.access" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.playerAccessList')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
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
                            <div class="page-container-inner pt-0">
                                <el-table style="width: 100%"
                                          :data="dataList"
                                          :default-sort="{prop: 'login_time', order: 'descending'}"
                                          @sort-change="filterOrderChange"
                                          :summary-method="getSummaries"
                                          show-summary>
                                    <!--<el-table-column label="ID" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']"></el-table-column>-->
                                    <el-table-column min-width="100" :label="$t('game.user.thLable.accountId')" show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.account_id, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="120" :label="$t('game.user.thLable.coinsHave')">
                                        <template slot-scope="scope">{{ scope.row.gold | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="120" :label="$t('game.user.thLable.gainGold')" prop="income_gold" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">{{ scope.row.income_gold > 0 ? '+' : '' }}{{ scope.row.income_gold | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.user.thLable.role')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.role==1">{{ $t('form.playerRoleList[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.role==2" type="warning">{{ $t('form.playerRoleList[1].label') }}</el-tag>
                                            <span v-else>----</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.user.thLable.access')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.access==1" type="success">{{ $t('form.playerAccessList[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.access==2" type="danger">{{ $t('form.playerAccessList[1].label') }}</el-tag>
                                            <span v-else>----</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="170" :label="$t('game.user.thLable.loginTime')" prop="login_time" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.login_time"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="170" :label="$t('game.user.thLable.createTime')" prop="create_time" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="170" :label="$t('game.user.thLable.detail')">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="dialogItemUpdate(scope)">{{ $t('action.edit') }}</el-button>
                                            <el-button size="mini" @click="dialogPlayerDetail(scope)">{{ $t('game.user.checkMoreDetails') }}</el-button>
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
        <item-detail :visible.sync="dialog.visible.detail" :data="dataDetail"></item-detail>
        <item-update :visible.sync="dialog.visible.update" :data="itemCache" @update="syncUpdateData"></item-update>
    </div>
</template>

<script>
    import ItemDetail from './ItemDetail.vue'
    import ItemUpdate from './ItemUpdate.vue'

    export default {
        components: {
            ItemDetail,
            ItemUpdate
        },
        data() {
            return {
                loading: true,
                filterOption: {
                    game_id: '',
                    role: '',
                    access: '',
                    create_time: '',
                    login_time: '',
                    keyword: '',
                    page: 1,
                    page_size: 10,
                    order: 4
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
                dataSumTotal: 0,
                dataDetail: {},
                itemCache: {},
                itemCacheIndex: null,
                dialog: {
                    visible: {
                        detail: false,
                        update: false
                    }
                },
            }
        },
        methods: {
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
            initUserList() {
                // 初始化筛选参数
                this.filterOption.role = '';
                this.filterOption.keyword = '';
                this.filterOption.order = 4;
                // 初始化数据
                this.dataCount.total = 0;
                this.dataList = [];
                // 获取数据
                this.clearFilterOption();
                this.getUserList();
            },
            clearFilterOption() {
                this.loading = true;
                this.filterOption.page = 1;
            },
            filterChange() {
                this.clearFilterOption();
                this.getUserList();
            },
            filterPageChange(page) {
                this.loading = true;
                this.filterOption.page = page;
                this.getUserList();
            },
            filterOrderChange(scope) {
                this.clearFilterOption();

                if (scope.prop == 'id') {
                    this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                } else if (scope.prop == 'create_time') {
                    this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                } else if (scope.prop == 'login_time') {
                    this.filterOption.order = scope.order == 'ascending' ? 3 : 4;
                } else if (scope.prop == 'income_gold') {
                    this.filterOption.order = scope.order == 'ascending' ? 5 : 6;
                }
                this.getUserList();
            },
            getUserList() {
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.create_time)) {
                    filterOptionCache.create_time[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.create_time[0]);
                    filterOptionCache.create_time[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.create_time[1]);
                }
                if (!_.isEmpty(filterOptionCache.login_time)) {
                    filterOptionCache.login_time[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.login_time[0]);
                    filterOptionCache.login_time[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.login_time[1]);
                }
                axios.get('/app/user/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.dataSumTotal = response.data.resp_data.sum_total;
                    this.loading = false;
                })
            },
            getSummaries() {
                let sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----'];
                sums[1] = this.$options.filters.numeral(this.dataSumTotal, '0,0.[0000]');
                return sums;
            },
            dialogPlayerDetail(scope) {
                // 详情数据
                this.dataDetail = scope.row;
                // 显示模态框
                this.dialog.visible.detail = true;
            },
            // 显示模态框（编辑）
            dialogItemUpdate(scope) {
                // 缓存数据
                this.itemCache = scope.row;
                // 缓存数据
                this.itemCacheIndex = scope.$index;
                // 显示模态框
                this.dialog.visible.update = true;
            },
            // 同步数据到列表
            syncUpdateData(data) {
                this.dataList[this.itemCacheIndex].role = data.role;
                this.dataList[this.itemCacheIndex].access = data.access;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .detail-container /deep/ label {
        color: $font-color-third;
    }

    .detail-container /deep/ .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
