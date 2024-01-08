<template>
    <div class="member-container" v-loading="loading">
        <div class="flex-center text-aux p-5" v-if="!loading && !initDataStatus">
            <div v-if="org.id == rootOrgId || org.parent_id == rootOrgId">
                <span>{{ $t('agency.contacts.memberAskText') }}</span>
                <a href="javascript:;" @click="dialog.visible.create = true">{{ $t('action.create') }}</a>
            </div>
            <div class="font-size-third" v-else>{{ $t('messages.empty') }}</div>
        </div>
        <div class="member-filter" v-if="initDataStatus">
            <div class="member-filter-option">
                <el-form :inline="true" :model="filterOption">
                    <el-form-item class="el-form-item-medium">
                        <el-select :placeholder="$t('form.memberType')" v-model="filterOption.type" clearable @change="filterChange">
                            <el-option :key="index" v-for="(item, index) in $t('form.memberTypes')" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-form-item-medium">
                        <el-select :placeholder="$t('form.memberStatus')" v-model="filterOption.status" clearable @change="filterChange">
                            <el-option :key="index" v-for="(item, index) in $t('form.memberStatusList')" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input :placeholder="$t('form.memberKeyword')" v-model="filterOption.keyword" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="org.id == rootOrgId || org.parent_id == rootOrgId">
                        <el-button type="primary" plain icon="el-icon-plus" @click="dialog.visible.create = true">{{ $t('action.create') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="list-space"></div>
        </div>
        <div class="member-main" v-if="initDataStatus">
            <el-table style="width: 100%"
                      :data="dataList"
                      :default-sort="{prop: 'updated', order: 'descending'}"
                      @sort-change="filterOrderChange">
                <el-table-column min-width="70" label="ID" prop="id" sortable="custom" :sort-orders="['ascending', 'descending']"></el-table-column>
                <el-table-column min-width="100" :label="$t('agency.contacts.thLable.name')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="$options.filters.hsFilterKeyword(scope.row.name, filterOption.keyword)"></span>
                    </template>
                </el-table-column>
                <el-table-column min-width="160" :label="$t('agency.contacts.thLable.email')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="$options.filters.hsFilterKeyword(scope.row.user_email, filterOption.keyword)"></span>
                    </template>
                </el-table-column>
                <el-table-column min-width="120" :label="$t('agency.contacts.thLable.type')">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="danger" v-if="scope.row.type==2">{{ $t('form.memberTypes[1].label') }}</el-tag>
                        <el-tag size="medium" type="info" v-else>{{ $t('form.memberTypes[0].label') }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="90" :label="$t('agency.contacts.thLable.status')">
                    <template slot-scope="scope">
                        <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.memberStatusList[0].label') }}</el-tag>
                        <el-tag size="medium" v-else type="danger">{{ $t('form.memberStatusList[1].label') }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="160" :label="$t('agency.contacts.thLable.updated')" prop="updated" sortable="custom" :sort-orders="['ascending', 'descending']">
                    <template slot-scope="scope">
                        <component-page-timestamp :timestamp="scope.row.updated"></component-page-timestamp>
                    </template>
                </el-table-column>
                <el-table-column min-width="150" :label="$t('agency.contacts.thLable.operation')" v-if="org.id == rootOrgId || org.parent_id == rootOrgId">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="dialogItemUpdate(scope)">{{ $t('action.edit') }}</el-button>
                        <el-popover class="ml-2" placement="top" width="160" v-model="scope.row.popoverVisible">
                            <div class="pt-3 pb-3">{{ $t('agency.contacts.askText', { status: scope.row.status==2 ? $t('action.on') : $t('action.off') }) }}</div>
                            <div class="text-center">
                                <el-button size="mini" type="text" @click="scope.row.popoverVisible = false">{{ $t('action.cancel') }}</el-button>
                                <el-button size="mini" type="primary" @click="saveItemStatus(scope)">{{ $t('action.confirm') }}</el-button>
                            </div>
                            <el-button plain size="mini" type="primary" slot="reference" v-if="scope.row.status==2">{{ $t('action.on') }}</el-button>
                            <el-button plain size="mini" type="danger" slot="reference" v-else>{{ $t('action.off') }}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('agency.contacts.thLable.detail')" type="expand">
                    <template slot-scope="scope">
                        <div class="detail-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form label-width="120px">
                                        <el-form-item label="ID">
                                            <el-tag type="info" size="mini">{{ scope.row.id }}</el-tag>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.name')">
                                            <span>{{ scope.row.name }}</span>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.userEmail')">
                                            <el-tag type="info" size="mini">{{ scope.row.user_email }}</el-tag>
                                            <el-tag type="info" size="mini" class="d-none">{{ scope.row.user_id }}</el-tag>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="8">
                                    <el-form label-width="120px">
                                        <el-form-item :label="$t('agency.contacts.thLable.type')">
                                            <el-tag size="medium" type="danger" v-if="scope.row.type==2">{{ $t('form.memberTypes[0].label') }}</el-tag>
                                            <el-tag size="medium" type="info" v-else>{{ $t('form.memberTypes[1].label') }}</el-tag>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.tel')">
                                            <span>{{ scope.row.tel ? scope.row.tel : '----' }}</span>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.tele')">
                                            <span>{{ scope.row.tele ? scope.row.tele : '----' }}</span>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="8">
                                    <el-form label-width="120px">
                                        <el-form-item :label="$t('agency.contacts.thLable.status')">
                                            <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.memberStatusList[0].label') }}</el-tag>
                                            <el-tag size="medium" v-else type="danger">{{ $t('form.memberStatusList[1].label') }}</el-tag>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.created')">
                                            <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                        </el-form-item>
                                        <el-form-item :label="$t('agency.contacts.thLable.updated')">
                                            <component-page-timestamp :timestamp="scope.row.updated"></component-page-timestamp>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
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
        <item-create :visible.sync="dialog.visible.create" :org="org" @create="filterOrgChange"></item-create>
        <item-update :visible.sync="dialog.visible.update" :data="itemCache" @update="syncUpdateData"></item-update>
    </div>
</template>

<script>
    import ItemCreate from './ItemCreate.vue'
    import ItemUpdate from './ItemUpdate.vue'

    export default {
        name: 'MemberList',
        components: {
            ItemCreate,
            ItemUpdate
        },
        props: ['org', 'rootOrgId'],
        data() {
            return {
                initStatus: true,
                initDataStatus: false,
                loading: true,
                filterOption: {
                    org_id: 0,
                    type: '',
                    status: '',
                    keyword: '',
                    page: 1,
                    page_size: 10,
                    order: 4
                },
                dataCount: {
                    total: 0,
                },
                dataList: [],
                itemCache: {},
                itemCacheIndex: null,
                dialog: {
                    visible: {
                        create: false,
                        update: false
                    }
                }
            }
        },
        watch: {
            org: {
                deep: true,
                handler(n, o) {
                    this.filterOrgChange();
                }
            }
        },
        methods: {
            initData() {
                // org change 访问标记
                this.initStatus = true;
                // org change 标记数据是否存在
                this.initDataStatus = false;
                // 初始化筛选参数
                this.filterOption.type = '';
                this.filterOption.status = '';
                this.filterOption.keyword = '';
                this.filterOption.order = 4;
                // 初始化数据
                this.dataCount.total = 0;
                this.dataList = [];
            },
            filterOrgChange() {
                this.initData();

                this.clearFilterOption();
                this.filterOption.org_id = this.org.id;
                this.getMemberList();
            },
            clearFilterOption() {
                this.loading = true;
                this.filterOption.page = 1;
            },
            filterChange() {
                this.clearFilterOption();
                this.getMemberList();
            },
            filterPageChange(page) {
                this.loading = true;
                this.filterOption.page = page;
                this.getMemberList();
            },
            filterOrderChange(scope) {
                if (scope.prop == 'id') {
                    this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
                } else if (scope.prop == 'updated') {
                    this.filterOption.order = scope.order == 'ascending' ? 3 : 4;
                }
                if (!this.dataList.length) {
                    return false;
                }
                this.clearFilterOption();
                this.getMemberList();
            },
            getMemberList() {
                axios.get('/agency/member/getList', {
                    params: this.filterOption
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.dataList = response.data.resp_data.data;
                    this.loading = false;

                    // org change 访问标记
                    if (this.initStatus) {
                        this.initStatus = false;
                        if (this.dataList.length) {
                            this.initDataStatus = true;
                        }
                    }
                })
            },
            // 修改状态
            saveItemStatus(scope) {
                // 关闭提示框
                scope.row.popoverVisible = false;
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/member/saveItemStatus', {
                    id: scope.row.id,
                    status: scope.row.status == 1 ? 2 : 1
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        scope.row.status = response.data.resp_data.status;
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('messages.save-failed'),
                            showClose: true
                        });
                    }
                })
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
                this.dataList[this.itemCacheIndex].type = data.type;
                this.dataList[this.itemCacheIndex].name = data.name;
                this.dataList[this.itemCacheIndex].tel = data.tel;
                this.dataList[this.itemCacheIndex].tele = data.tele;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .member-container {
        min-height: 700px;
    }

    .member-filter-option {
        padding: 22px 20px 0 20px;
    }

    .member-filter-option .el-form-item {
        margin-bottom: 20px;
    }

    .member-main {
        padding: 0 20px 20px 20px;
    }

    .detail-container /deep/ label {
        color: $font-color-third;
    }

    .detail-container /deep/ .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
