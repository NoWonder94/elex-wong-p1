<template>
    <el-dialog :title="$t('system.setting.auth.memberDialog.title')" width="700px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="pb-3">
            <div v-if="!memberListCache.length">
                <component-page-loading status="nodata"></component-page-loading>
            </div>
            <div class="nub-list" v-if="memberListCache.length">
                <div class="nub-item" v-for="(item, index) in memberListCache" :key="index">
                    <div class="nub-icon icon-member">
                        <font-awesome-icon icon="user-tie"></font-awesome-icon>
                    </div>
                    <div class="nub-text">{{item.name}}</div>
                    <div class="nub-close" @click="tagCheckedDelete(item, index)">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-3">
            <el-input :placeholder="$t('system.setting.auth.memberDialog.emailKeyword')" v-model="filterOption.keyword" clearable>
                <el-button slot="append" icon="el-icon-search" @click="filterChange"></el-button>
            </el-input>
        </div>
        <table class="table table-borderless table-hover">
            <thead>
            <tr>
                <th>{{ $t('system.setting.auth.memberDialog.check') }}</th>
                <th>{{ $t('system.setting.auth.memberDialog.email') }}</th>
                <th>{{ $t('system.setting.auth.memberDialog.nickname') }}</th>
                <th>{{ $t('system.setting.auth.memberDialog.agent') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tableList" :key="index">
                <td>
                    <el-checkbox
                            v-model="item.checked"
                            @change="tableCheckedChange(item)">
                    </el-checkbox>
                </td>
                <td>
                    <div class="d-inline-block text-truncate" style="max-width: 150px;"
                         v-html="$options.filters.hsFilterKeyword(item.name, filterOption.keyword)">
                    </div>
                </td>
                <td>
                    <div class="d-inline-block text-truncate" style="max-width: 200px;"
                         v-html="$options.filters.hsFilterKeyword(item.user_email, filterOption.keyword)">
                    </div>
                </td>
                <td>
                    <div class="d-inline-block text-truncate" style="max-width: 200px;">
                        {{item.org_name}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="text-center">
            <component-page-loading :status="tableListStatus"></component-page-loading>
        </div>
        <div class="pt-2 text-right" v-if="dataCount.total">
            <el-pagination background layout="prev, pager, next"
                           :current-page="filterOption.page"
                           :page-size="filterOption.page_size"
                           :total="dataCount.total"
                           @current-change="filterPageChange">
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
            <el-button type="primary" @click="onSubmit">{{ $t('action.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "AuthMember",
        props: ['groupId', 'dataList', 'visible'],
        data() {
            return {
                dialogVisible: false,
                memberListCache: [],
                filterOption: {
                    keyword: '',
                    page: 1,
                    page_size: 5,
                },
                dataCount: {
                    total: 0,
                },
                tableListStatus: 'dle',
                tableList: []
            }
        },
        watch: {
            visible: function (n, o) {
                if (n) {
                    // 显示模态框
                    this.dialogVisible = n;
                    // 初始化选中数据
                    this.memberListCache = _.cloneDeep(this.dataList);
                } else {
                    // 初始化表格参数
                    this.clearFilterOption();
                }
            }
        },
        methods: {
            clearFilterOption() {
                this.tableListStatus = 'dle';
                this.filterOption.page = 1;
                this.dataCount.total = 0;
                this.tableList = [];
            },
            filterChange() {
                this.clearFilterOption();
                this.getMemberList();
            },
            filterPageChange(page) {
                this.clearFilterOption();
                this.filterOption.page = page;
                this.getMemberList();
            },
            getMemberList() {
                this.tableListStatus = 'loading';
                axios.get('/auth/group-member/search', {
                    params: this.filterOption
                }).then((response) => {
                    this.dataCount = response.data.resp_data.count;
                    this.tableList = response.data.resp_data.data;
                    this.tableListStatus = !this.tableList.length ? 'nodata' : 'dle';

                    // 初始化表格选中
                    for (let i in this.tableList) {
                        this.tableList[i].checked = false;
                        for (let j in this.memberListCache) {
                            if (this.memberListCache[j].id == this.tableList[i].id) {
                                this.tableList[i].checked = true;
                                break;
                            }
                        }
                    }
                })
            },
            onSubmit() {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/auth/group-member/saveList', {
                    group_id: this.groupId,
                    member_ids: _.map(this.memberListCache, 'id')
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        this.dialogVisible = false;
                        // 同步数据到父组件
                        this.$emit('update', response.data.resp_data);
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('messages.save-failed'),
                            showClose: true
                        });
                    }
                })
            },
            // 表格选择或取消用户选中状态
            tableCheckedChange(data) {
                if (data.checked) {
                    this.memberListCache.push(data);
                } else {
                    for (let i in this.memberListCache) {
                        if (this.memberListCache[i].id == data.id) {
                            this.memberListCache.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            // 标签删除已选用户
            tagCheckedDelete(data, index) {
                this.memberListCache.splice(index, 1);
                for (let i in this.tableList) {
                    if (this.tableList[i].id == data.id) {
                        this.tableList[i].checked = false;
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    >>> .el-dialog__body {
        min-height: 440px;
        padding-top: 15px;
    }

    .table thead {
        color: #909399;
    }

    .table th, .table td {
        padding: 12px 10px;
        vertical-align: middle;
        background-color: #ffffff;
        border-bottom: 1px solid #ebeef5;
    }

    .table td {
        transition: background-color .25s ease;
    }

    .table tr:hover > td {
        background-color: #f5f7fa;
    }
</style>
