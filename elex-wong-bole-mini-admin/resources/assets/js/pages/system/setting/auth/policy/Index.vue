<template>
    <el-dialog :title="$t('system.setting.auth.policyDialog.title')" width="720px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="flex-center" v-loading="policyListLoading">
            <el-transfer
                    :titles="[$t('system.setting.auth.policyDialog.unselected'), $t('system.setting.auth.policyDialog.selected')]"
                    :data="policyList"
                    :props="{key: 'id', label: 'name'}"
                    v-model="policyListCache">
            </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
            <el-button type="primary" @click="onSubmit">{{ $t('action.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "AuthPolicy",
        props: ['groupId', 'dataList', 'visible'],
        data() {
            return {
                dialogVisible: false,
                policyListLoading: true,
                policyList: [],
                policyListCache: []
            };
        },
        watch: {
            visible: function (n, o) {
                if (n) {
                    // 显示模态框
                    this.dialogVisible = n;
                    // 初始化选中数据
                    this.policyListCache = _.map(this.dataList, 'id');
                }
            }
        },
        methods: {
            getDataList() {
                axios.get('/auth/policy/getList').then((response) => {
                    this.policyList = response.data.resp_data;
                    for(let index in this.policyList) {
                        let id = this.policyList[index].id;
                        this.policyList[index].name = this.$t(`system.setting.menu.${id}.name`);
                    }
                    this.policyListLoading = false;
                })
            },
            onSubmit() {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/auth/group-policy/saveList', {
                    group_id: this.groupId,
                    policy_ids: this.policyListCache
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
            }
        },
        mounted: function () {
            this.getDataList();
        }
    }
</script>

<style scoped>
    >>> .el-dialog__body {
        padding: 20px;
    }

    >>> .el-transfer-panel {
        width: 280px;
    }
</style>
