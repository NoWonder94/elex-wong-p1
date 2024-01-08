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
                                        <el-select :placeholder="$t('form.memberType')" v-model="filterOption.type" clearable @change="filterChange">
                                            <el-option :key="index" v-for="(item, index) in $t('form.memberTypes')" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input :placeholder="$t('form.memberKeyword')" v-model="filterOption.keyword" clearable>
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
                                    <el-table-column :label="$t('system.log.signin.thLable.created')" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']">
                                        <template slot-scope="scope">
                                            <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('system.log.signin.thLable.email')">
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.email, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('system.log.signin.thLable.name')">
                                        <template slot-scope="scope">
                                            <span v-html="$options.filters.hsFilterKeyword(scope.row.name, filterOption.keyword)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('system.log.signin.thLable.type')">
                                        <template slot-scope="scope">
                                            <el-tag size="medium" type="danger" v-if="scope.row.type==2">{{ $t('form.memberTypes[1].label') }}</el-tag>
                                            <el-tag size="medium" v-else>{{ $t('form.memberTypes[0].label') }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="ip"
                                            :label="$t('system.log.signin.thLable.ip')">
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
                    keyword: '',
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
                axios.get('/log/member/signin/getList', {
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
