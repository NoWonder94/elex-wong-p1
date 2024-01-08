<template>
    <div class="crypto-home-detail">
        <div class="detail-title">
            {{ $t('menu.home') + $t('page.detail') }}
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
            <div class="input-title">{{ $t('column.img') }}</div>
            <div class="input-value">
                <UploadImg :formImg.sync="formImg" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.title') }}</div>
            <div class="input-value">
                <el-input v-model="form.title" type="text" value="" />
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.desc') }}</div>
            <div class="input-value">
                <vue-editor id="editor" v-model="form.description"></vue-editor>
            </div>
        </div>
        <div class="input-item">
            <div class="input-title">{{ $t('column.is_top') }}</div>
            <div class="input-value">
                <el-select v-model="form.is_top">
                    <el-option :label="$t('status.bottom')" value="0"></el-option>
                    <el-option :label="$t('status.middle')" value="1"></el-option>
                    <el-option :label="$t('status.top')" value="2"></el-option>
                </el-select>
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
        name: 'HomeDetail',
        async asyncData({params}) {
            const id = params.id;
            return {id}
        },
        data() {
            return {
                form: {
                    id: '',
                    img: '',
                    title: '',
                    description: '',
                    is_top: '0',
                    status: '1',
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
                    this.isLoading = true

                    this.$api.requestByPost('Crypto/Home/getDetail', {id: this.id}).then(result => {
                        if(result.status == true) {
                            this.form.id = this.id;
                            this.form.img = result.data.img;
                            this.form.title = result.data.title;
                            this.form.description = result.data.description;
                            this.form.is_top = result.data.is_top.toString();
                            this.form.status = result.data.status.toString();
                            this.form.create_time = result.data.create_time_datetime;
                            this.form.update_time = result.data.update_time_datetime;
                            this.formImg = result.data.img;
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
                let form = {
                    img: this.form.img,
                    title: this.form.title,
                    description: this.form.description,
                    is_top: this.form.is_top,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('Crypto/Home/create', form).then(result => {
                    if(result.status == true) {
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        this.$router.push({path: '/crypto/home/list'});
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
                let form = {
                    id: this.id,
                    img: this.form.img,
                    title: this.form.title,
                    description: this.form.description,
                    is_top: this.form.is_top,
                    status: this.form.status,
                };
                this.isLoading = true;
                this.$api.requestByPost('Crypto/Home/update', form).then(result => {
                    if(result.status == true) {
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                        this.$router.push({path: '/crypto/home/list'});
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
                this.$router.push({path: '/crypto/home/list'});
            },
        },
        watch: {
            formImg: function() {
                this.form.img = this.formImg;
            }
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/crypto/homeDetail.scss";
    @import "/assets/scss/mobile/crypto/homeDetail.scss";
</style>
