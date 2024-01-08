<template>
    <div class="container-content pt-5">
        <div class="container-content-title">{{ $t('agency.setting.secret') }}
            <div v-if="org.id == rootOrgId && data.id">
                <el-popover placement="bottom" width="210" v-model="data.popoverVisible">
                    <div class="pt-3 pb-3">{{ $t('agency.setting.secretUpdateAskText', { status: data.status==2 ? $t('action.on') : $t('action.off') }) }}</div>
                    <div class="text-center">
                        <el-button size="mini" type="text" @click="data.popoverVisible = false">{{ $t('action.cancel') }}</el-button>
                        <el-button size="mini" type="primary" @click="saveItemStatus">{{ $t('action.confirm') }}</el-button>
                    </div>
                    <el-button plain size="mini" type="primary" slot="reference" v-if="data.status==2">{{ $t('action.on') }}</el-button>
                    <el-button plain size="mini" type="danger" slot="reference" v-else>{{ $t('action.off') }}</el-button>
                </el-popover>
                <el-button size="mini" @click="dialog.visible.update = true" class="ml-1">{{ $t('action.update') }}</el-button>
            </div>
        </div>
        <component-page-loading :status="dataStatus" @reload="getData"></component-page-loading>
        <div class="text-aux" v-if="dataStatus == 'dle' && !data.id">
            <div v-if="org.id == rootOrgId || org.parent_id == rootOrgId">
                <span>{{ $t('agency.setting.secretAskText') }}</span>
                <a href="javascript:;" @click="dialog.visible.create = true">{{ $t('agency.setting.secretAdd') }}</a>
            </div>
            <div class="font-size-third" v-else>{{ $t('messages.empty') }}</div>
        </div>
        <!--<div class="text-aux" v-if="dataStatus == 'dle' && !data.id && org.id == rootOrgId">
            <span>{{ $t('messages.empty') }}</span>
        </div>-->
        <el-form label-width="140px" v-if="dataStatus == 'dle' && data.id" class="form-detail">
            <el-form-item label="AccessKeyId">
                <div :title="data.status == 2 ? 'AccessKey '+$t('action.disabled') : ''" :class="{'line-through': data.status == 2}">{{ data.access_key_id }}</div>
            </el-form-item>
            <el-form-item label="AccessKeySecret">
                <div :title="data.status == 2 ? 'AccessKey '+$t('action.disabled') : ''" :class="{'line-through': data.status == 2}">{{ data.access_key_secret }}</div>
            </el-form-item>
        </el-form>
        <el-dialog :title="$t('agency.setting.createSecretDialog.title')" center width="400px" :visible.sync="dialog.visible.create">
            <div class="text-center" v-html="$t('agency.setting.createSecretDialog.askText')"></div>
            <div slot="footer">
                <el-button @click="dialog.visible.create = false">{{ $t('action.cancel') }}</el-button>
                <el-button type="primary" @click="accessKeyCreate">{{ $t('action.confirm') }}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('agency.setting.updateSecretDialog.title')" center width="400px" :visible.sync="dialog.visible.update">
            <div class="text-center" v-html="$t('agency.setting.updateSecretDialog.askText')"></div>
            <div class="text-center mt-1" v-html="$t('agency.setting.updateSecretDialog.text')"></div>
            <div slot="footer">
                <el-button @click="dialog.visible.update = false">{{ $t('action.cancel') }}</el-button>
                <el-button type="primary" @click="accessKeyUpdate">{{ $t('action.confirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SettingSecret",
        props: ['org', 'rootOrgId'],
        data() {
            return {
                dataStatus: 'dle',
                data: {},
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
                    this.initData();
                    this.getData();
                }
            }
        },
        methods: {
            initData() {
                this.data = {};
            },
            getData() {
                this.dataStatus = 'loading';
                axios.get('/agency/access-key/getDetail', {
                    params: {
                        org_id: this.org.id
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.data = response.data.resp_data;
                        this.$set(this.data, 'popoverVisible', false);
                        this.dataStatus = 'dle';
                    } else if (response.data.resp_msg.code == 43100) {
                        this.data = {};
                        this.dataStatus = 'dle';
                    } else {
                        this.dataStatus = 'error';
                    }
                })
            },
            // 创建访问密钥
            accessKeyCreate() {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/access-key/create', {
                    org_id: this.org.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.data = response.data.resp_data;
                        this.$set(this.data, 'popoverVisible', false);
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.create-succeeded'),
                            showClose: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('messages.create-failed'),
                            showClose: true
                        });
                    }
                    // 关闭提示框
                    this.dialog.visible.create = false;
                })
            },
            // 更新访问密钥
            accessKeyUpdate() {
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/access-key/update', {
                    org_id: this.org.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.data = response.data.resp_data;
                        this.$set(this.data, 'popoverVisible', false);
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.update-succeeded'),
                            showClose: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('messages.update-failed'),
                            showClose: true
                        });
                    }
                    // 关闭提示框
                    this.dialog.visible.update = false;
                })
            },
            // 修改状态
            saveItemStatus() {
                // 关闭提示框
                this.data.popoverVisible = false;
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/access-key/saveItemStatus', {
                    org_id: this.org.id,
                    status: this.data.status == 1 ? 2 : 1
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.data.status = response.data.resp_data.status;
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
        }
    }
</script>

<style scoped>
    .line-through {
        text-decoration: line-through
    }
</style>
