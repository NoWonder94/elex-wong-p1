<template>
    <div class="user-account">
        <div class="account-part">
            <div class="account-title">
                {{ $t('title.basic_info') }}
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.id') }}</div>
                <div class="input-value">
                    <el-input v-model="form.id" type="text" value="" disabled />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.name') }}</div>
                <div class="input-value">
                    <el-input v-model="form.name" type="text" value="" />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.status') }}</div>
                <div class="input-value">
                    <el-select v-model="form.status">
                        <el-option :label="$t('status.active')" value="1"></el-option>
                        <el-option :label="$t('status.disable')" value="0"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="account-part">
            <div class="account-title">
                {{ $t('title.account_security') }}
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.old_password') }}</div>
                <div class="input-value">
                    <el-input v-model="form.old_password" type="password" value="" />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.new_password') }}</div>
                <div class="input-value">
                    <el-input v-model="form.new_password" type="password" value="" />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.confirm_password') }}</div>
                <div class="input-value">
                    <el-input v-model="form.confirm_password" type="password" value="" />
                </div>
            </div>
        </div>
        <div class="account-part">
            <div class="account-title">
                {{ $t('title.history') }}
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.login_time') }}</div>
                <div class="input-value">
                    <el-input v-model="form.login_time" type="text" value="" disabled />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.logout_time') }}</div>
                <div class="input-value">
                    <el-input v-model="form.logout_time" type="text" value="" disabled />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.create_time') }}</div>
                <div class="input-value">
                    <el-input v-model="form.create_time" type="text" value="" disabled />
                </div>
            </div>
            <div class="input-item">
                <div class="input-title">{{ $t('column.update_time') }}</div>
                <div class="input-value">
                    <el-input v-model="form.update_time" type="text" value="" disabled />
                </div>
            </div>
        </div>
        <div class="actions">
            <el-button @click="update">{{ $t('button.update') }}</el-button>
            <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'UserAccount',
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    status: '1',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                    login_time: '',
                    logout_time: '',
                    create_time: '',
                    update_time: '',
                },
                isLoading: false,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                this.isLoading = true;
                this.$api.requestByPost('Admin/getDetail').then(result => {
                    if(result.status == true) {
                        this.form.id = result.data.id;
                        this.form.name = result.data.name;
                        this.form.status = result.data.status.toString();
                        this.form.login_time = result.data.login_time_datetime;
                        this.form.logout_time = result.data.logout_time_datetime;
                        this.form.create_time = result.data.create_time_datetime;
                        this.form.update_time = result.data.update_time_datetime;
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
                })
            },
            update() {
                if(this.form.new_password != this.form.confirm_password) {
                    this.$notiflix.Notify.failure(this.$t('message.password'), {
                        showOnlyTheLastOne: true,
                    });
                    return false;
                }
                let form = {
                    name: this.form.name,
                    pwd: this.form.old_password,
                    confirm_pwd: this.form.new_password,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('Admin/update', form).then(result => {
                    if(result.status == true) {
                        this.$notiflix.Notify.success(this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
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
            cancel() {
                this.$router.push({path: '/home/list'});
            },
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/adminAccount.scss";
    @import "/assets/scss/mobile/adminAccount.scss";
</style>
