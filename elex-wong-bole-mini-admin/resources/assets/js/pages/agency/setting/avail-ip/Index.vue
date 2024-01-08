<template>
    <div class="container-content pt-5">
        <div class="container-content-title">{{ $t('agency.setting.avail-ip') }}
            <el-button size="mini" @click="dialogEdit" v-if="dataList.length && org.id == rootOrgId">{{ $t('action.edit') }}</el-button>
        </div>
        <component-page-loading :status="dataListStatus" @reload="getDataList"></component-page-loading>
        <div class="text-aux" v-if="dataListStatus == 'dle' && !dataList.length">
            <div v-if="org.id == rootOrgId || org.parent_id == rootOrgId">
                <span>{{ $t('agency.setting.availIPAskText') }}</span>
                <a href="javascript:;" @click="dialogEdit">{{ $t('agency.setting.availIPAdd') }}</a>
            </div>
            <div class="font-size-third" v-else>{{ $t('messages.empty') }}</div>
        </div>
        <el-form label-width="140px" v-if="dataListStatus == 'dle' && dataList.length" class="form-detail">
            <el-form-item :label="$t('agency.setting.IPLabel')">
                <span class="mr-3" v-for="(item, index) in dataList" :key="index"> {{ item.ip }}</span>
            </el-form-item>
        </el-form>
        <el-dialog :title="$t('agency.setting.updateIPDialog.title')" width="460px" :visible.sync="dialog.visible.update">
            <div class="pr-4" v-if="dataCache.dataList.length">
                <el-form :model="dataCache" label-width="120px" ref="availIp">
                    <el-form-item v-for="(item, index) in dataCache.dataList" :key="index" :label="$t('agency.setting.updateIPDialog.ip') + (index + 1)"
                                  :error="Boolean(msg.errors['ips.'+index ]) ? msg.errors['ips.'+index ][0] : ''">
                        <el-input v-model="item.ip">
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeDomain(index)"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{ $t('action.save') }}</el-button>
                        <el-button icon="el-icon-plus" @click="addDomain">{{ $t('action.create') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SettingAvailIp",
        props: ['org', 'rootOrgId'],
        data() {
            return {
                dataListStatus: 'dle',
                dataList: [],
                dataCache: {
                    dataList: []
                },
                dialog: {
                    visible: {
                        update: false
                    }
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            }
        },
        watch: {
            org: {
                deep: true,
                handler(n, o) {
                    this.initData();
                    this.getDataList();
                }
            }
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            initData() {
                this.dataList = [];
                this.dataCache.dataList = [];
            },
            getDataList() {
                this.dataListStatus = 'loading';
                axios.get('/agency/avail-ip/getListByOrg', {
                    params: {
                        org_id: this.org.id
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.dataList = response.data.resp_data;
                        this.dataListStatus = 'dle';
                    } else {
                        this.dataListStatus = 'error';
                    }
                })
            },
            // 显示模态框
            dialogEdit() {
                // 重置验证
                this.initMsg();
                // 初始化数据
                this.dataCache.dataList = _.cloneDeep(this.dataList);
                // 添加第一条数据
                if (!this.dataCache.dataList.length) {
                    this.addDomain();
                }
                // 显示模态框
                this.dialog.visible.update = true;
            },
            // 提交表单
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/avail-ip/saveListByOrg', {
                    org_id: this.org.id,
                    ips: _.map(this.dataCache.dataList, 'ip')
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.dataList = response.data.resp_data;
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        // 关闭模态框
                        this.dialog.visible.update = false;
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
            removeDomain(index) {
                this.dataCache.dataList.splice(index, 1);
                // 添加第一条数据
                if (!this.dataCache.dataList.length) {
                    this.addDomain();
                }
            },
            addDomain() {
                this.dataCache.dataList.push({ip: ''});
            }
        }
    }
</script>

<style scoped>

</style>
