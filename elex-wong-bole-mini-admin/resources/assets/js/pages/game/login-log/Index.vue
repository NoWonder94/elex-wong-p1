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
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('form.gameId')" v-model="filterOption.game_id" clearable @change="filterChange">
                                            <el-option v-for="item in gameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                                          @sort-change="filterOrderChange">
                                    <el-table-column min-width="170" :label="$t('game.login-log.thLable.time')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.login-log.thLable.orgName')" prop="org_name"></el-table-column>
                                    <el-table-column min-width="160" :label="$t('game.login-log.thLable.gameId')">
                                        <template slot-scope="scope">{{ scope.row.game_id > 0 ? scope.row.game_name : $t('gameLobby') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.login-log.thLable.accountId')">
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.account_id, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="170" :label="$t('game.login-log.thLable.address')"  show-overflow-tooltip>
                                        <template slot-scope="scope">{{ scope.row.country }} {{ scope.row.province }} {{ scope.row.city }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="120" :label="$t('game.login-log.thLable.ip')" prop="ip"></el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.login-log.thLable.devices')" prop="devices"></el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.login-log.thLable.browser')" prop="browser"></el-table-column>
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
                gameList: [],
                loading: true,
                filterOption: {
                    datetime: [],
                    game_id: '',
                    keyword: '',
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
        created: function () {
            // 搜索关键词
            if (Boolean(this.$route.params.accountId)) {
                this.filterOption.keyword = this.$route.params.accountId;
            }
        },
        methods: {
            // 获取游戏列表
            getGameList() {
                axios.get('/common/getGameList').then((response) => {
                    this.gameList = response.data.resp_data;
                    this.gameList.unshift({
                        id: -1,
                        name: this.$t('gameLobby')
                    });
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
                let filterOptionCache = _.cloneDeep(this.filterOption);
                if (!_.isEmpty(filterOptionCache.datetime)) {
                    filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                    filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
                }
                axios.get('/app/login-log/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.loading = false;
                })
            },
        },
        mounted: function () {
            // 获取游戏列表
            this.getGameList();
        }
    }
</script>

<style scoped>

</style>
