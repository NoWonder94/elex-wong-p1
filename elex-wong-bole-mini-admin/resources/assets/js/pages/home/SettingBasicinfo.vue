<template>
    <div class="form-container pt-3" v-loading="loading">
        <el-row>
            <el-col :md="18" :lg="12" :xl="8">
                <el-form :model="data" label-width="80px">
                    <el-form-item :label="$t('home.email')" :error="errorEmail" required>
                        <el-input v-model="data.email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('home.nickname')" :error="errorNickname">
                        <el-input v-model="data.nickname"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{ $t('action.modify') }}</el-button>
                        <a class="ml-2" href="javascript:history.go(-1);">
                            <el-button>{{ $t('action.cancel') }}</el-button>
                        </a>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "SettingBasicinfo",
        data() {
            return {
                loading: true,
                data: {
                    email: '',
                    nickname: ''
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            };
        },
        computed: {
            errorEmail: function () {
                if (this.msg.code == 42000 && this.msg.errors.email) {
                    return this.msg.errors.email[0];
                } else if (this.msg.code == 43202) {
                    return this.msg.message;
                }
            },
            errorNickname: function () {
                if (this.msg.code == 42000 && this.msg.errors.nickname) {
                    return this.msg.errors.nickname[0];
                }
            }
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            getUserInfo() {
                axios.get('/user/home/getItem').then((response) => {
                    this.data = response.data.resp_data;
                    this.loading = false;
                })
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/user/home/update', this.data).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true,
                            onClose: function () {
                                window.location.reload();
                            }
                        });
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            }
        },
        mounted: function () {
            this.getUserInfo();
        }
    }
</script>

<style scoped>

</style>
