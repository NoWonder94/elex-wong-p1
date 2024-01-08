<template>
    <div class="user-list">
        <div class="search-row">
            <div class="search-input">
                <el-input v-model="searchField.email" type="text" value="" :placeholder="$t('column.email')" />
                <el-select v-model="searchField.status">
                    <el-option :label="$t('status.all')" value=""></el-option>
                    <el-option :label="$t('status.active')" value="1"></el-option>
                    <el-option :label="$t('status.disable')" value="2"></el-option>
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
                <el-table-column prop="name" :label="$t('column.name')" width="200" header-align="center"></el-table-column>
                <el-table-column prop="email" :label="$t('column.email')" header-align="center"></el-table-column>
                <el-table-column prop="status" :label="$t('column.status')" width="90" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <span class="status-active" v-if="scope.row.status == 1">
                            {{ $t('status.active') }}
                        </span>
                        <span class="status-disable" v-if="scope.row.status == 0">
                            {{ $t('status.disable') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="login_time_datetime" :label="$t('column.login_time')" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="logout_time_datetime" :label="$t('column.logout_time')" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="update_time_datetime" :label="$t('column.update_time')" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column :label="$t('column.actions')" width="190" header-align="center" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <el-button class="edit-button" size="mini" @click="edit(scope.row.id)">
                            <i class="fa-solid fa-pen-to-square"></i>
                            {{ $t('button.edit') }}
                        </el-button>
                        <el-button class="delete-button" size="mini" @click="remove(scope.row.id)">
                            <i class="fa-solid fa-trash"></i>
                            {{ $t('button.delete') }}
                        </el-button>
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
            >
            </el-pagination>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'UserList',
        data() {
            return {
                searchField: {
                    email: '',
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
                this.$api.requestByPost('User/getList', this.searchField).then(result => {
                    if(result.status == true) {
                        this.data = result.data;
                        this.totalData = result.data.total_list;
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
            search() {
                this.searchField.page = 1;
                this.init();
            },
            create() {
                this.$router.push({path: '/user/add'});
            },
            edit(id) {
                this.$router.push({path: '/user/' + id});
            },
            remove(id) {
                this.$confirm(this.$t('message.delete') + id + '?', {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                }).then(() => {
                    this.isLoading = true;
                    this.$api.requestByPost('User/delete', {id: id}).then(result => {
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
                }).catch(() => {});
            },
            handlePagination(page) {
                this.searchField.page = page;
                this.init();
            },
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/userList.scss";
    @import "/assets/scss/mobile/userList.scss";
</style>
