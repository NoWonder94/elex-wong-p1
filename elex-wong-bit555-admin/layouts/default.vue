<template>
    <client-only>
        <div class="default">
            <section class="default-section" style="display:none">
                <div v-if="isShowLogin">
                    <LoginPage :isShowLogin.sync="isShowLogin" />
                </div>
                <div v-else>
                    <AdminPage :isShowLogin.sync="isShowLogin" />
                </div>
            </section>
            <Loading :isLoading.sync="isLoading" />
        </div>
    </client-only>
</template>
<script>
    export default {
        name: 'Default',
        data() {
            return {
                form: {
                    name: '',
                    pwd: '',
                },
                isLoading: false,
                isShowLogin: true,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                var authToken = localStorage.getItem('authToken');
                if(!authToken) {
                    this.getToken();
                } else {
                    this.getAdminDetail();
                }
            },
            getToken() {
                let form = {
                    sid: '12345678912345678912345678912345',
                    client: 'pc',
                };
                this.isLoading = true;
                this.$api.requestByPost('App/getToken', form).then(result => {
                    if(result.status) {
                        if(result.token) {
                            localStorage.setItem('authToken', result.token);
                            $('.default-section').show();
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
            getAdminDetail() {
                this.isLoading = true;
                this.$api.requestByPost('Admin/getDetail').then(result => {
                    if(result.status) {
                        if (result.loginStatus == 1) {
                            this.isShowLogin = false;
                            $('.default-section').show();
                        }
                    } else {
                        if(result.loginStatus == -1) {
                            localStorage.removeItem('authToken');
                            this.getToken();
                        } else {
                            this.$notiflix.Notify.failure(result.msg ? result.msg : this.$t('message.error'), {
                                showOnlyTheLastOne: true,
                            });
                        }
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
</style>
