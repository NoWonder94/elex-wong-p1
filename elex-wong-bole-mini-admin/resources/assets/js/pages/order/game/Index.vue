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
        <div class="page-layout-body" v-loading="loading">
            <div class="body-main">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <div class="page-content">
                            <div class="page-filter-option mb-0">
                                <el-form :inline="true" :model="filterOption">
                                    <el-form-item>
                                        <el-date-picker
                                                v-model="filterOption.datetime"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="datetimerange"
                                                align="left"
                                                @change="filterChange"
                                                :picker-options="GLOBAL.pickerOptions"
                                                :start-placeholder="$t('form.startDate')"
                                                :end-placeholder="$t('form.endDate')">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-small">
                                        <el-select :placeholder="$t('form.transferType')" v-model="filterOption.type" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.transferTypes')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-small">
                                        <el-select :placeholder="$t('form.gameOrderGameStatus')" v-model="filterOption.status" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.gameOrderGameStatusList')" :label="item.label" :value="item.value"></el-option>
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
                                          :default-sort="{prop: 'id', order: 'descending'}"
                                          @sort-change="filterOrderChange"
                                          :summary-method="getSummaries"
                                          show-summary>
                                    <el-table-column min-width="160" :label="$t('order.game.thLable.sn')" prop="sn"></el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.game.thLable.orgPlayerAccount')">
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.org_player_account, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.game.thLable.type')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.type==1">{{ $t('form.transferTypes[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.type==2" type="warning">{{ $t('form.transferTypes[1].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.game.thLable.status')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.gameOrderStatusList[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.status==2" type="success">{{ $t('form.gameOrderStatusList[1].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.status==3 && !Boolean(scope.row.error_cause)" type="danger">{{ $t('form.gameOrderStatusList[2].label') }}</el-tag>
                                            <el-tooltip placement="top" :content="scope.row.error_cause" v-else-if="scope.row.status==3 && Boolean(scope.row.error_cause)">
                                                <el-tag size="medium" type="danger">{{ $t('form.gameOrderStatusList[2].label') }}</el-tag>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('order.game.thLable.amount')">
                                        <template slot-scope="scope">{{ scope.row.amount | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('order.game.thLable.playerOldGold')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.player_old_gold === null">----</span>
                                            <span v-else>{{ scope.row.player_old_gold | numeral('0,0.[0000]') }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('order.game.thLable.playerOwnGold')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.player_own_gold === null">----</span>
                                            <span v-else>{{ scope.row.player_own_gold | numeral('0,0.[0000]') }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="160" :label="$t('order.game.thLable.created')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="160" :label="$t('order.game.thLable.updated')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.updated">
                                                <component-page-timestamp :timestamp="scope.row.updated"></component-page-timestamp>
                                            </span>
                                            <span v-else>----</span>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                filterOption: {
                    datetime: '',
                    type: '',
                    status: '',
                    keyword: '',
                    page: 1,
                    page_size: 10,
                    order: 2
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
                dataSumTotal: 0,
            }
        },
        created: function () {
            // 搜索关键词
            if (Boolean(this.$route.params.accountId)) {
                this.filterOption.keyword = this.$route.params.accountId;
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
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                this.clearFilterOption();
                this.getDataList();
            },
            getDataList() {
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                    filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
                }
                axios.get('/order/game/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.dataSumTotal = response.data.resp_data.sum_total;
                    this.loading = false;
                })
            },
            getSummaries() {
                let sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----'];
                sums[4] = this.$options.filters.numeral(this.dataSumTotal, '0,0.[0000]');
                return sums;
            }
        },
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
