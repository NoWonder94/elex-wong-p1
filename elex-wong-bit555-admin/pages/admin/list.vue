<template>
    <div class="admin-list">
        <div class="search-row">
            <div class="search-input">
                <el-input v-model="searchField.name" type="text" value="" :placeholder="$t('column.name')" />
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
                <el-table-column prop="name" :label="$t('column.name')" header-align="center"></el-table-column>
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
                <el-table-column prop="create_time_datetime" :label="$t('column.create_time')" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="update_time_datetime" :label="$t('column.update_time')" width="100" header-align="center" align="center"></el-table-column>
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
        name: 'AdminList',
        data() {
            return {
                searchField: {
                    name: '',
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
                this.$api.requestByPost('Admin/getList', this.searchField).then(result => {
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
                this.$router.push({path: '/admin/add'});
            },
            handlePagination(page) {
                this.searchField.page = page;
                this.init();
            },
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/adminList.scss";
    @import "/assets/scss/mobile/adminList.scss";
</style>
