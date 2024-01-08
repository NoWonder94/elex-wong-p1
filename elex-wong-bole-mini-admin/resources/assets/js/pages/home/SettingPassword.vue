<template>
    <div class="form-container pt-3">
        <el-row>
            <el-col :md="18" :lg="12" :xl="8">
                <el-form :model="data" label-width="150px">
                    <el-form-item :label="$t('home.currPwd')" :error="errorPasswordCurrent" required>
                        <el-input type="password" v-model="data.password_current"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('home.newPwd')" :error="errorPassword" required>
                        <el-input type="password" v-model="data.password"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('home.rePwd')" :error="errorPasswordConfirmation" required>
                        <el-input type="password" v-model="data.password_confirmation"></el-input>
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
        name: "SettingPassword",
        data() {
            return {
                data: {
                    password_current: '',
                    password: '',
                    password_confirmation: ''
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            };
        },
        computed: {
            errorPasswordCurrent: function () {
                if (this.msg.code == 42000 && this.msg.errors.password_current) {
                    return this.msg.errors.password_current[0];
                } else if (this.msg.code == 43002) {
                    return this.msg.message;
                }
            },
            errorPassword: function () {
                if (this.msg.code == 42000 && this.msg.errors.password) {
                    return this.msg.errors.password[0];
                }
            },
            errorPasswordConfirmation: function () {
                if (this.msg.code == 42000 && this.msg.errors.password_confirmation) {
                    return this.msg.errors.password_confirmation[0];
                }
            }
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/user/home/updatePassword', this.data).then((response) => {
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
