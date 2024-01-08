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
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('form.orgId')" v-model="filterOption.org_id" clearable @change="filterChange">
                                            <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <!--<el-form-item class="el-form-item-small">
                                        <el-select placeholder="类型" v-model="filterOption.type" clearable @change="filterChange">
                                            <el-option label="转入" value="1"></el-option>
                                            <el-option label="转出" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>-->
                                    <el-form-item class="el-form-item-small">
                                        <el-select :placeholder="$t('form.agencyOrderStatus')" v-model="filterOption.status" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.agencyOrderStatusList')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input :placeholder="$t('form.sn')" v-model="filterOption.keyword" clearable>
                                            <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" plain icon="el-icon-plus" @click="dialog.visible.create = true">{{ $t('action.create') }}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="list-space"></div>
                            <div class="page-container-inner pt-0">
                                <el-table style="width: 100%"
                                          :data="dataList"
                                          :default-sort="{prop: 'id', order: 'descending'}"
                                          @sort-change="filterOrderChange">
                                    <el-table-column min-width="160" :label="$t('order.agency.thLable.sn')">
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.sn, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.agency.thLable.orgName')" prop="sub_org_name"></el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.agency.thLable.type')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.type==1">{{ $t('form.transferTypes[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.type==2" type="warning">{{ $t('form.transferTypes[1].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.agency.thLable.status')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.agencyOrderStatusList[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.status==2" type="success">{{ $t('form.agencyOrderStatusList[1].label') }}</el-tag>
                                            <el-tag size="medium" v-else-if="scope.row.status==3 && !Boolean(scope.row.error_cause)" type="danger">{{ $t('form.agencyOrderStatusList[2].label') }}</el-tag>
                                            <el-tooltip placement="top" :content="scope.row.error_cause" v-else-if="scope.row.status==3 && Boolean(scope.row.error_cause)">
                                                <el-tag size="medium" type="danger">{{ $t('form.agencyOrderStatusList[2].label') }}</el-tag>
                                            </el-tooltip>
                                            <el-tag size="medium" v-else-if="scope.row.status==4" type="info">{{ $t('form.agencyOrderStatusList[3].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="90" :label="$t('order.agency.thLable.amount')">
                                        <template slot-scope="scope">{{ scope.row.type==1 ? '+' : '-' }}{{ scope.row.amount | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column min-width="160" :label="$t('order.agency.thLable.created')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="160" :label="$t('order.agency.thLable.updated')">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.updated">
                                                <component-page-timestamp :timestamp="scope.row.updated"></component-page-timestamp>
                                            </span>
                                            <span v-else>----</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="160" :label="$t('order.agency.thLable.operation')">
                                        <template slot-scope="scope">
                                            <el-popover class="ml-2" placement="top" width="160" v-model="scope.row.popover1Visible">
                                                <div class="pt-3 pb-3" v-html="$t('order.agency.askText', { type: scope.row.type==1 ? $t('form.transferTypes[0].label') : $t('form.transferTypes[1].label') })"></div>
                                                <div class="text-center">
                                                    <el-button size="mini" type="text" @click="scope.row.popover1Visible = false">{{ $t('action.cancel') }}</el-button>
                                                    <el-button size="mini" type="primary" @click="handleOrder(scope)">{{ $t('action.confirm') }}</el-button>
                                                </div>
                                                <el-button plain size="mini" slot="reference" :disabled="scope.row.status !=1 ">{{ $t('action.confirm') }}</el-button>
                                            </el-popover>
                                            <el-popover class="ml-2" placement="top" width="160" v-model="scope.row.popover2Visible">
                                                <div class="pt-3 pb-3">{{ $t('order.agency.cancelText') }}</div>
                                                <div class="text-center">
                                                    <el-button size="mini" type="text" @click="scope.row.popover2Visible = false">{{ $t('action.cancel') }}</el-button>
                                                    <el-button size="mini" type="primary" @click="cancelOrder(scope)">{{ $t('action.confirm') }}</el-button>
                                                </div>
                                                <el-button plain size="mini" slot="reference" :disabled="scope.row.status !=1 ">{{ $t('action.cancel') }}</el-button>
                                            </el-popover>
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
        <item-create :visible.sync="dialog.visible.create" :org-list="orgList" @create="initDataList"></item-create>
    </div>
</template>

<script>
    import ItemCreate from './ItemCreate.vue'

    export default {
        components: {
            ItemCreate
        },
        data() {
            return {
                orgList: [],
                loading: false,
                filterOption: {
                    datetime: '',
                    org_id: '',
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
                dialog: {
                    visible: {
                        create: false
                    }
                }
            }
        },
        methods: {
            // 获取子代理列表
            getOrgSubList() {
                axios.get('/common/getOrgSubList').then((response) => {
                    this.orgList = response.data.resp_data;
                })
            },
            initDataList() {
                // 初始化筛选参数
                this.filterOption.datetime = '';
                this.filterOption.org_id = '';
                this.filterOption.type = '';
                this.filterOption.status = '';
                this.filterOption.keyword = '';
                this.filterOption.order = 2;
                // 初始化数据
                this.dataCount.total = 0;
                this.dataList = [];
                // 获取数据
                this.clearFilterOption();
                this.getDataList();
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
                axios.get('/order/agency/getList', {
                    params: filterOptionCache
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.loading = false;
                })
            },
            // 处理订单
            handleOrder(scope) {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/order/agency/handle', {
                    id: scope.row.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('order.agency.messages.handle-succeeded'),
                            showClose: true
                        });
                    } else {
                        let message = this.$t('order.agency.messages.handle-failed');
                        switch (response.data.resp_msg.code) {
                            case 43100:
                                message = message + this.$t('error.43100');
                                break;
                            case 43301:
                                message = message + this.$t('error.43301');
                                break;
                            case 43300:
                                message = message + this.$t('error.43300');
                                break;
                            case 43801:
                                message = message + this.$t('error.43801', { type: scope.row.type == 1 ? $t('order.agency.type.you') : $t('order.agency.type.agent') });
                                break;
                            case 43802:
                                message = message + this.$t('error.43802', { type: scope.row.type == 1 ? $t('order.agency.type.you') : $t('order.agency.type.agent') });
                                break;
                        }
                        this.$message({
                            type: 'error',
                            message: message,
                            showClose: true
                        });
                    }
                    // 重新加载数据
                    this.getDataList();
                })
            },
            // 取消订单
            cancelOrder(scope) {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/order/agency/cancel', {
                    id: scope.row.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('order.agency.messages.cancel-succeeded'),
                            showClose: true
                        });
                    } else {
                        let message = this.$t('order.agency.messages.cancel-failed');
                        switch (response.data.resp_msg.code) {
                            case 43100:
                                message = message + this.$t('error.43100');
                                break;
                            case 43301:
                                message = message + this.$t('error.43301');
                                break;
                            case 43300:
                                message = message + this.$t('error.433001');
                                break;
                        }
                        this.$message({
                            type: 'error',
                            message: message,
                            showClose: true
                        });
                    }
                    // 重新加载数据
                    this.getDataList();
                })
            }
        },
        mounted: function () {
            // 初始化子代理列表
            this.getOrgSubList();
        }
    }
</script>

<style scoped>
    .page-content {
        min-height: 700px;
    }
</style>
