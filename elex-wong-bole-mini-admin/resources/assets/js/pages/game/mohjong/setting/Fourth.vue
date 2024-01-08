<template>
    <div class="page-content" v-loading="loading">
        <div class="setting-card">
            <div class="setting-card__header">常规设置</div>
            <div class="setting-card__body">
                <el-form :model="data" label-width="80px">
                    <el-form-item label="封顶番数" :error="errorBetMax" required>
                        <el-radio-group v-model="data.bet_max.type">
                            <el-radio :label="1">不封顶</el-radio>
                            <el-radio :label="2">自定义</el-radio>
                        </el-radio-group>
                        <div class="input-item" v-if="data.bet_max.type == 2">
                            <el-input type="number" v-model.number="data.bet_max.value" placeholder="请输入番数">
                                <template slot="append">番</template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="抽水方式" :error="errorPump" required>
                        <el-radio-group v-model="data.pump.type">
                            <el-radio :label="'end'">结算抽水百分比</el-radio>
                            <el-radio :label="'percent'">实时抽水百分比</el-radio>
                            <el-radio :label="'fixed'">固定抽水金币</el-radio>
                        </el-radio-group>
                        <div class="input-item" v-if="data.pump.type == 'end'">
                            <el-input type="number" v-model.number="data.pump.value" placeholder="请输入百分数">
                                <template slot="append">
                                    <font-awesome-icon icon="percent"></font-awesome-icon>
                                </template>
                            </el-input>
                        </div>
                        <div class="input-item" v-else-if="data.pump.type == 'percent'">
                            <el-input type="number" v-model.number="data.pump.value" placeholder="请输入百分数">
                                <template slot="append">
                                    <font-awesome-icon icon="percent"></font-awesome-icon>
                                </template>
                            </el-input>
                        </div>
                        <div class="input-item" v-else-if="data.pump.type == 'fixed'">
                            <el-input type="number" v-model.number="data.pump.value" placeholder="请输入金币数">
                                <template slot="append">
                                    <font-awesome-icon icon="coins"></font-awesome-icon>
                                </template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="IP限制">
                        <el-switch :inactive-value="0" :active-value="1" v-model="data.ip_limit"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="setting-card">
            <div class="setting-card__header">对局设置</div>
            <div class="setting-card__body">
                <el-form :model="data" label-width="80px">
                    <el-row>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="天地胡">
                                <el-switch :inactive-value="0" :active-value="1" v-model="data.options.TDH"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="换三张">
                                <el-switch :inactive-value="0" :active-value="1" v-model="data.options.HSZ"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="夹心五">
                                <el-switch :inactive-value="0" :active-value="1" v-model="data.options.JXW"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="门清中章">
                                <el-switch :inactive-value="0" :active-value="1" v-model="data.options.MQZZ"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="幺九将对">
                                <el-switch :inactive-value="0" :active-value="1" v-model="data.options.YJJD"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="pt-4">
                        <el-button type="primary" @click="onSubmit">立即保存</el-button>
                        <a class="ml-2" href="javascript:history.go(-1);">
                            <el-button>取消</el-button>
                        </a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingFourth",
        props: ['activeName'],
        data() {
            return {
                scene_id: 1004,
                initDataStatus: false,
                loading: true,
                data: {
                    bet_max: {
                        type: 1,
                        value: 0
                    },
                    pump: {
                        type: 'end',
                        value: 0
                    },
                    ip_limit: 0,
                    options: {
                        TDH: 0,
                        HSZ: 0,
                        JXW: 0,
                        MQZZ: 0,
                        YJJD: 0
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
            errorBetMax: function () {
                if (this.msg.code == 42000 && this.msg.errors['bet_max.value']) {
                    return this.msg.errors['bet_max.value'][0];
                }
            },
            errorPump: function () {
                if (this.msg.code == 42000 && this.msg.errors['pump.value']) {
                    return this.msg.errors['pump.value'][0];
                }
            }
        },
        watch: {
            activeName: function (n, o) {
                // 初始化数据
                if (n == 'fourth' && !this.initDataStatus) {
                    // 获取数据
                    this.getData();
                    // 标记已初始化
                    this.initDataStatus = true;
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
                axios.get('/app/game/mohjong/config/getItem', {
                    params: {
                        scene_id: this.scene_id
                    }
                }).then((response) => {
                    this.data = response.data.resp_data;
                    this.loading = false;
                })
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 制作数据
                let dataCache = _.cloneDeep(this.data);
                dataCache.scene_id = this.scene_id;
                // 保存数据
                axios.post('/app/game/mohjong/config/update', dataCache).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
