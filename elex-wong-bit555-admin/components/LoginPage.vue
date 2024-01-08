<template>
    <div class="login-page">
        <div class="login-content">
            <div class="login-logo">
                <img src="../assets/img/logo.png" />
            </div>
            <div class="login-form">
                <div class="login-form-title">
                    {{ $t('title.admin_panel_login') }}
                </div>
                <el-form @submit="login">
                    <div class="login-item">
                        <div class="login-title">
                            {{ $t('column.username') }}
                        </div>
                        <div class="login-input">
                            <el-input v-model="form.name" type="text" value="" placeholder="" />
                        </div>
                    </div>
                    <div class="login-item">
                        <div class="login-title">
                            {{ $t('column.password') }}
                        </div>
                        <div class="login-input">
                            <el-input v-model="form.pwd" type="password" value="" placeholder="" />
                        </div>
                    </div>
                    <div class="login-item button">
                        <el-button type="submit" @click="login">
                            {{ $t('button.login') }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <LoginBg />
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'LoginPage',
        props: ['LoginPage'],
        data() {
            return {
                form: {
                    name: '',
                    pwd: '',
                },
                isLoading: false,
            }
        },
        methods: {
            login() {
                this.isLoading = true;
                this.$api.requestByPost('Admin/login', this.form).then(result => {
                    if(result.status) {
                        if(result.token) {
                            localStorage.setItem('authToken', result.token);
                            if(result.loginStatus == 1) {
                                this.$emit('update:isShowLogin', false);
                                $('.default-section').show();
                                this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                                    showOnlyTheLastOne: true,
                                })
                            }
                        }
                    } else {
                        this.$notiflix.Notify.failure(result.msg ? result.msg : this.$t('message.error'), {
                            showOnlyTheLastOne: true,
                        });
                    }

                    this.isLoading = false;
                }).catch(error => {
                    this.$notiflix.Notify.failure(this.$t('message.error'), {
                        showOnlyTheLastOne: true,
                    });
                });
            },
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/loginPage.scss";
    @import "/assets/scss/mobile/loginPage.scss";
</style>
