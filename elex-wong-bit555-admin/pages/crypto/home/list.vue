<template>
    <div class="crypto-home-list">
        <div class="search-row">
            <div class="search-input">
                <el-input v-model="searchField.title" type="text" value="" :placeholder="$t('column.title')" />
                <el-select v-model="searchField.status">
                    <el-option :label="$t('status.all')" value=""></el-option>
                    <el-option :label="$t('status.active')" value="1"></el-option>
                    <el-option :label="$t('status.disable')" value="0"></el-option>
                </el-select>
                <el-button @click="search">
                    {{ $t('button.search') }}
                </el-button>
            </div>
            <div class="create-button">
                <el-button @click="create">
                    <i class="fa-solid fa-plus"></i>
                </el-button>
            </div>
        </div>
        <div class="content">
            <el-table :data="data" stripe :empty-text="this.$t('message.empty')">
                <el-table-column prop="id" :label="$t('column.id')" width="80" header-align="center" align="center"></el-table-column>
                <el-table-column prop="img" :label="$t('column.img')" width="100" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <div class="img" @click="handleImage(scope.row.img)">
                            <img :src="scope.row.img" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" :label="$t('column.title')" header-align="center" align="center"></el-table-column>
                <el-table-column prop="is_top" :label="$t('column.is_top')" width="120" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <span v-if="scope.row.is_top == 0">{{ $t('status.bottom') }}</span>
                        <span class="middle" v-if="scope.row.is_top == 1">{{ $t('status.middle') }}</span>
                        <span class="top" v-if="scope.row.is_top == 2">{{ $t('status.top') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" :label="$t('column.status')" width="120" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <span class="status-active" v-if="scope.row.status == 1">
                            {{ $t('status.active') }}
                        </span>
                        <span class="status-disable" v-if="scope.row.status == 0">
                            {{ $t('status.disable') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time_datetime" :label="$t('column.update_time')" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column :label="$t('column.actions')" width="180" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <el-button class="notify-button" size="mini" @click="notify(scope.row.id)">
                            <i class="fa-solid fa-bell"></i>
                            {{ $t('button.notify') }}
                        </el-button>
                        <div class="buttons">
                            <el-button class="edit-button" size="mini" @click="edit(scope.row.id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                                {{ $t('button.edit') }}
                            </el-button>
                            <el-button class="delete-button" size="mini" @click="remove(scope.row.id)">
                                <i class="fa-solid fa-trash"></i>
                                {{ $t('button.delete') }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="searchField.page_size"
                :total="totalData"
                @current-change="handlePagination"
            ></el-pagination>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'HomeList',
        data() {
            return {
                searchField: {
                    title: '',
                    status: '',
                    page: 1,
                    page_size: 20,
                },
                totalData: 0,
                data: [],
                isLoading: false,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                this.isLoading = true;
                this.$api.requestByPost('Crypto/Home/getList', this.searchField).then(result => {
                    if(result.status == true) {
                        this.data = result.data.list;
                        this.totalData = result.data.total_list;
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
            search() {
                this.searchField.page = 1;
                this.init();
            },
            create() {
                this.$router.push({path: '/crypto/home/add'});
            },
            notify(id) {
                this.$confirm(this.$t('message.notify'), {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                }).then(() => {
                    let form = {
                        table_name: 'crypto_home',
                        table_id: id,
                    };
                    this.isLoading = true;
                    this.$api.requestByPost('System/notifyAll', form).then(result => {
                        if(result.status == true) {
                            this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                                showOnlyTheLastOne: true,
                            });
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
                }).catch(() => {});
            },
            edit(id) {
                this.$router.push({path: '/crypto/home/' + id});
            },
            remove(id) {
                this.$confirm(this.$t('message.delete') + id + '?', {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                }).then(() => {
                    // confirm
                    this.isLoading = true;
                    this.$api.requestByPost('Crypto/Home/delete', {id: id}).then(result => {
                        if(result.status == true) {
                            this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                                showOnlyTheLastOne: true,
                            });
                            window.location.reload();
                        }
                    }).catch(error => {
                        this.$notiflix.Notify.failure(this.$t('message.error'), {
                            showOnlyTheLastOne: true,
                        });
                    });
                }).catch(() => {
                    // cancel
                });
            },
            handleImage(img) {
                window.open(img);
            },
            handlePagination(page) {
                this.searchField.page = page;
                this.init();
            }
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/crypto/homeList.scss";
    @import "/assets/scss/mobile/crypto/homeList.scss";
</style>
