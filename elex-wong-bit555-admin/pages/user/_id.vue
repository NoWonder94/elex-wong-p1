<template>
    <div class="user-detail">
        <div class="detail-title">
            {{ $t('menu.user') + $t('page.detail') }}
        </div>
        <div v-if="isEdit">
            <div class="input-item">
                <div class="input-title">{{ $t('column.id') }}</div>
                <div class="input-value">
                    <el-input v-model="form.id" type="text" value="" disabled />
                </div>
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.avatar') }}</div>
            <div class="input-value">
                <Upload-Img :formImg.sync="formImg" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.name') }}</div>
            <div class="input-value">
                <el-input v-model="form.name" type="text" value="" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.email') }}</div>
            <div class="input-value">
                <el-input v-model="form.email" type="email" value="" />
            </div>
        </div>
        <div v-if="isEdit">
            <div class="input-item">
                <div class="input-title">{{ $t('column.old_password') }}</div>
                <div class="input-value">
                    <el-input v-model="form.old_password" type="password" value="" />
                </div>
            </div>
        </div>
        <div class="input-item">
            <div v-if="isEdit" class="input-title">{{ $t('column.new_password') }}</div>
            <div v-else class="input-title">{{ $t('column.password') }}</div>
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
        <div class="input-item">
            <div class="input-title">{{ $t('column.status') }}</div>
            <div class="input-value">
                <el-select v-model="form.status">
                    <el-option :label="$t('status.active')" value="1"></el-option>
                    <el-option :label="$t('status.disable')" value="0"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="isEdit">
            <div class="detail-part">
                <div class="detail-title">{{ $t('title.history') }}</div>
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
        </div>
        <div class="actions">
            <div v-if="!isEdit">
                <el-button @click="create">{{ $t('button.create') }}</el-button>
            </div>
            <div v-else>
                <el-button @click="update">{{ $t('button.update') }}</el-button>
            </div>
            <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'UserDetail',
        async asyncData({params}) {
            const id = params.id;
            return {id}
        },
        data() {
            return {
                form: {
                    id: '',
                    avatar: '',
                    name: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                    email: '',
                    status: "1",
                    login_time: '',
                    logout_time: '',
                    create_time: '',
                    update_time: '',
                },
                formImg: '',
                isEdit: false,
                isLoading: false,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                if(this.id > 0) {
                    this.isEdit = true;
                    this.isLoading = true;

                    this.$api.requestByPost('User/getDetail', {id: this.id}).then(result => {
                        if(result.status == true) {
                            this.form.id = this.id;
                            this.form.avatar = result.data.avatar;
                            this.form.name = result.data.name;
                            this.form.email = result.data.email;
                            this.form.status = result.data.status.toString();
                            this.form.login_time = result.data.login_time_datetime;
                            this.form.logout_time = result.data.logout_time_datetime;
                            this.form.create_time = result.data.create_time_datetime;
                            this.form.update_time = result.data.update_time_datetime;
                            this.formImg = result.data.avatar;
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
                }
            },
            create() {
                if(this.form.new_password != this.form.confirm_password) {
                    this.$notiflix.Notify.failure(this.$t('message.password'), {
                        showOnlyTheLastOne: true,
                    });
                    return false;
                }
                let form = {
                    avatar: this.form.avatar,
                    name: this.form.name,
                    pwd: this.form.new_password,
                    email: this.form.email,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('User/create', form).then(result => {
                    if(result.status == true){
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        this.$router.push({path: '/user/list'});
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
            update() {
                if(this.form.new_password != this.form.confirm_password) {
                    this.$notiflix.Notify.failure(this.$t('message.password'), {
                        showOnlyTheLastOne: true,
                    });
                    return false;
                }

                let form = {
                    id: this.id,
                    avatar: this.form.avatar,
                    name: this.form.name,
                    old_pwd: this.form.old_password,
                    new_pwd: this.form.new_password,
                    email: this.form.email,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('User/update', form).then(result => {
                    if(result.status == true){
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        this.$router.push({path: '/user/list'});
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
                this.$router.push({path: '/user/list'});
            },
        },
        watch: {
            formImg: function() {
                this.form.avatar = this.formImg;
            }
        }
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/userDetail.scss";
    @import "/assets/scss/mobile/userDetail.scss";
</style>
