<template>
    <div class="admin-detail">
        <div class="detail-title">
            {{ $t('menu.admin') + $t('page.detail') }}
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.name') }}</div>
            <div class="input-value">
                <el-input v-model="form.name" type="text" value="" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.password') }}</div>
            <div class="input-value">
                <el-input v-model="form.password" type="password" value="" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.confirm_password') }}</div>
            <div class="input-value">
                <el-input v-model="form.confirm_password" type="password" value="" />
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
        <div class="actions">
            <el-button @click="create">{{ $t('button.create') }}</el-button>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'AdminDetail',
        data() {
            return {
                form: {
                    name: '',
                    password: '',
                    confirm_password: '',
                    status: '1',
                },
                isLoading: false,
            }
        },
        methods: {
            create() {
                let form = {
                    name: this.form.name,
                    pwd: this.form.password,
                    confirm_pwd: this.form.confirm_password,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('Admin/create', form).then(result => {
                    if(result.status == true) {
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        this.$router.push({path: '/admin/list'});
                    } else{
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
                this.$router.push({path: '/admin/list'});
            }
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/adminDetail.scss";
    @import "/assets/scss/mobile/adminDetail.scss";
</style>
