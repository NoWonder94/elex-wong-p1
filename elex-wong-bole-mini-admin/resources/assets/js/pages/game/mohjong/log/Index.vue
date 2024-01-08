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
                                                v-model="filterOption.datetime"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="datetimerange"
                                                align="left"
                                                @change="filterChange"
                                                :start-placeholder="$t('form.startDate')"
                                                :end-placeholder="$t('form.endDate')">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input :placeholder="$t('form.accountId')" v-model="filterOption.keyword" clearable>
                                            <el-select v-model="filterOption.keyword_type" slot="prepend" :placeholder="$t('form.select')" style="width: 110px">
                                                <el-option v-for="item in keywordTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                            <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="list-space"></div>
                            <div class="page-container-inner pt-0">
                                <el-table style="width: 100%"
                                          :data="dataList"
                                          :default-sort="{prop: 'id', order: 'descending'}"
                                          @sort-change="filterOrderChange">
                                    <el-table-column min-width="170" :label="$t('game.log.thLable.time')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.accountId')">
                                        <template slot-scope="scope">
                                            <span v-if="filterOption.keyword_type == 1" v-html="$options.filters.hsFilterKeyword(scope.row.account_id, filterOption.keyword)"></span>
                                            <span v-else>{{ scope.row.account_id }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.roomId')">
                                        <template slot-scope="scope">
                                            <span v-if="filterOption.keyword_type == 2" v-html="$options.filters.hsFilterKeyword(scope.row.room_id, filterOption.keyword)"></span>
                                            <span v-else>{{ scope.row.room_id }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.sceneId')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.scene_id==1001">{{ $t('form.mahjongScenes[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.scene_id==1002" type="success">{{ $t('form.mahjongScenes[1].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.scene_id==1003" type="warning">{{ $t('form.mahjongScenes[2].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.scene_id==1004" type="danger">{{ $t('form.mahjongScenes[3].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.gainGold')">
                                        <template slot-scope="scope">{{ scope.row.gain_gold > 0 ? '+' : '' }}{{ scope.row.gain_gold | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.platformCommission')">
                                        <template slot-scope="scope">{{ scope.row.income_gold > 0 ? '+' : '' }}{{ scope.row.income_gold | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100" :label="$t('game.log.thLable.ownGold')">
                                        <template slot-scope="scope">{{ scope.row.own_gold | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="100"  :label="$t('game.log.thLable.operation')">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="dialogPlayerBills(scope)">{{ $t('game.log.thLable.detail') }}</el-button>
                                        </template>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="dialog-bills" :title="$t('game.log.dialog.title')" width="500px" :visible.sync="dialog.visible.bills">
            <div v-loading="recordLoading">
                <el-table style="width: 100%"
                          :data="recordData.bills">
                    <el-table-column :label="$t('game.log.dialog.type')">
                        <template slot-scope="scope">{{ scope.row.type | hsMahjongBillsType(scope.row.info, recordData.seatIndex) }}</template>
                    </el-table-column>
                    <el-table-column :label="$t('game.log.dialog.gold')">
                        <template slot-scope="scope">{{ scope.row.info.gainGold > 0 ? '+' : '' }}{{ scope.row.info.gainGold | numeral('0,0.[0000]') }}</template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                dialog: {
                    visible: {
                        bills: false,
                    }
                },
                recordLoading: false,
                recordData: {
                    bills: [],
                    seatIndex: 0
                },
                recordDataLIst: []
            }
        },
        methods: {
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
                axios.get('/app/game/mohjong/log/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.loading = false;
                })
            },
            dialogPlayerBills(scope) {
                // 显示模态框
                this.dialog.visible.bills = true;
                // 读取缓存数据
                let key = scope.row.uid + '.' + scope.row.room_id;
                if (this.recordDataLIst[key]) {
                    this.recordData = this.recordDataLIst[key];
                    return
                }
                // 获取玩家游戏明细
                this.getPlayerRecord(key, scope.row);
            },
            getPlayerRecord(key, data) {
                this.recordLoading = true;
                axios.get('/app/game/mohjong/log/getPlayerRecord', {
                    params: {
                        uid: data.uid,
                        room_id: data.room_id,
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
    .page-content {
        min-height: 700px;
    }

    .dialog-bills >>> .el-dialog__body {
        padding-top: 0;
        min-height: 320px;
    }
</style>
