<template>
    <div class="container-content">
        <div class="container-content-title">{{ $t('agency.setting.info') }}</div>
        <component-page-loading :status="dataStatus" @reload="getData"></component-page-loading>
        <div v-if="dataStatus == 'dle'">
            <el-row :gutter="10">
                <el-col :lg="8">
                    <el-form label-width="140px" class="form-detail">
                        <el-form-item :label="org.name">
                            <el-tag size="mini" type="info">{{ org.id }}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :lg="8">
                    <el-form label-width="140px" class="form-detail">
                        <el-form-item :label="$t('agency.setting.rate')">
                            <span class="mr-2" v-if="Boolean(data.rate.rate)">{{ data.rate.rate | numeral('0.[00]') }}%</span>
                            <span class="mr-2" v-else>----</span>
                            <el-button size="mini" @click="dialogRate" v-if="!Boolean(data.rate.rate) && org.parent_id == rootOrgId">{{ $t('action.modify') }}</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :lg="8">
                    <el-form label-width="220px" class="form-detail">
                        <el-form-item :label="$t('agency.setting.rateNext')">
                            <span class="mr-2" v-if="Boolean(data.rate.rate_next)">{{ data.rate.rate_next | numeral('0.[00]') }}%</span>
                            <span class="mr-2" v-else>----</span>
                            <el-button size="mini" @click="dialogRate" v-if="Boolean(data.rate.rate) && org.parent_id == rootOrgId">{{ $t('action.modify') }}</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :lg="8">
                    <el-form label-width="140px" class="form-detail">
                        <el-form-item :label="$t('agency.setting.totalIn')">{{ data.coin.total_in | numeral('0,0.[0000]') }}</el-form-item>
                    </el-form>
                </el-col>
                <el-col :lg="8">
                    <el-form label-width="140px" class="form-detail">
                        <el-form-item :label="$t('agency.setting.totalCoin')">{{ Number(data.coin.game)+Number(data.coin.agency) | numeral('0,0.[0000]') }}</el-form-item>
                    </el-form>
                </el-col>
                <el-col :lg="8">
                    <el-form label-width="140px" class="form-detail">
                        <el-form-item :label="$t('agency.setting.currentCoin')">
                            <span class="mr-2">{{ data.coin.current | numeral('0,0.[0000]') }}</span>
                            <router-link :to="{name: 'order.my'}" v-if="org.id == rootOrgId">
                                <el-button size="mini">{{ $t('form.transferTypes[0].label') }}</el-button>
                            </router-link>
                            <router-link :to="{name: 'order.agency'}" v-else-if="org.parent_id == rootOrgId">
                                <el-button size="mini">{{ $t('form.transferTypes[0].label') }}</el-button>
                            </router-link>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <el-dialog :title="$t('agency.setting.rateDialog.title')" width="370px" :visible.sync="dialog.visible.rate">
            <div class="pr-4">
                <el-form :model="rateCache" label-width="80px">
                    <el-form-item :label="$t('agency.setting.rateDialog.rateNext')" :error="errorRateNext">
                        <el-input type="number" :step="0.01" :min="0.01" :max="100" v-model.number="rateCache.rate_next">
                            <template slot="append">
                                <font-awesome-icon icon="percent"></font-awesome-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{ $t('action.save') }}</el-button>
                        <el-button @click="dialog.visible.rate=false">{{ $t('action.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SettingIndex",
        props: ['org', 'rootOrgId'],
        data() {
            return {
                dataStatus: 'dle',
                data: {
                    rate: {},
                    coin: {}
                },
                rateCache: {
                    rate_next: 5,
                },
                dialog: {
                    visible: {
                        rate: false
                    }
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            }
        },
        computed: {
            errorRateNext: function () {
                if (this.msg.code == 42000 && this.msg.errors.rate_next) {
                    return this.msg.errors.rate_next[0];
                }
            },
        },
        watch: {
            org: {
                deep: true,
                handler(n, o) {
                    this.getData();
                }
            }
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            getData() {
                this.dataStatus = 'loading';
                axios.get('/agency/info/getDetail', {
                    params: {
                        org_id: this.org.id
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.data = response.data.resp_data;
                        this.dataStatus = 'dle';
                    } else {
                        this.dataStatus = 'error';
                    }
                })
            },
            // 显示模态框
            dialogRate() {
                // 初始化数据
                this.rateCache = _.cloneDeep(this.data.rate);
                // 显示模态框
                this.dialog.visible.rate = true;
            },
            // 保存数据
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/info/saveItemRate', this.rateCache).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        // 修改显示数据
                        this.data.rate = response.data.resp_data;
                        // 关闭模态框
                        this.dialog.visible.rate = false;
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .container-content {
        padding-bottom: 0;
        margin-bottom: -10px;
    }
</style>
