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
                                        <el-select :placeholder="$t('form.transferType')" v-model="filterOption.type" clearable @change="filterChange">
                                            <el-option :label="$t('order.record.transferTypes[0].label')" value="1"></el-option>
                                            <!--<el-option :label="$t('order.record.transferTypes[1].label')"  value="2"></el-option>-->
                                            <el-option :label="$t('order.record.transferTypes[2].label')"  value="3"></el-option>
                                            <!--<el-option :label="$t('order.record.transferTypes[3].label')"  value="4"></el-option>-->
                                            <el-option :label="$t('order.record.transferTypes[4].label')"  value="5"></el-option>
                                            <el-option :label="$t('order.record.transferTypes[5].label')"  value="6"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="el-form-item-medium">
                                        <el-select :placeholder="$t('form.orderType')" v-model="filterOption.order_classify" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.orderTypes')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button icon="el-icon-search" @click="filterChange">{{ $t('form.search') }}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="list-space"></div>
                            <div class="page-container-inner pt-0">
                                <el-table style="width: 100%"
                                          :data="dataList"
                                          :default-sort="{prop: 'id', order: 'descending'}"
                                          @sort-change="filterOrderChange">
                                    <el-table-column :label="$t('order.record.thLable.time')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('order.record.thLable.type')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.type==1">{{ $t('order.record.transferTypes[0].label') }}</el-tag>
                                            <el-tag size="medium" type="info" v-else-if="scope.row.type==2">{{ $t('order.record.transferTypes[1].label') }}</el-tag>
                                            <el-tag size="medium" type="success" v-else-if="scope.row.type==3">{{ $t('order.record.transferTypes[2].label') }}</el-tag>
                                            <el-tag size="medium" type="danger" v-else-if="scope.row.type==4">{{ $t('order.record.transferTypes[3].label') }}</el-tag>
                                            <el-tag size="medium" type="success" v-else-if="scope.row.type==5">{{ $t('order.record.transferTypes[4].label') }}</el-tag>
                                            <el-tag size="medium" type="warning" v-else-if="scope.row.type==6">{{ $t('order.record.transferTypes[5].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('order.record.thLable.targetName')" prop="target_name">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.type <= 2">----</span>
                                            <span v-else-if="scope.row.type <= 4">{{ scope.row.target_name }}
                                                <!--<el-tag type="info" size="mini">{{ scope.row.target_id }}</el-tag>-->
                                            </span>
                                            <span v-else-if="scope.row.type <= 6">{{ scope.row.target_name }}
                                                <!--<el-tag type="info" size="mini">{{ scope.row.target_id }}</el-tag>-->
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('order.record.thLable.amount')">
                                        <template slot-scope="scope">{{ scope.row.amount > 0 ? '+' : '' }}{{ scope.row.amount | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column :label="$t('order.record.thLable.current')">
                                        <template slot-scope="scope">{{ scope.row.current | numeral('0,0.[0000]') }}</template>
                                    </el-table-column>
                                    <el-table-column :label="$t('order.record.thLable.orderType')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" v-if="scope.row.order_classify==1">{{ $t('form.orderTypes[0].label') }}</el-tag>
                                            <el-tag size="medium" type="warning" v-else-if="scope.row.order_classify==2">{{ $t('form.orderTypes[1].label') }}</el-tag>
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
                    datetime: [],
                    type: '',
                    order_classify: '',
                    page: 1,
                    page_size: 10,
                    order: 2
                },
                dataCount: {
                    total: 0,
                },
                dataList: []
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
                axios.get('/order/record/getList', {
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
