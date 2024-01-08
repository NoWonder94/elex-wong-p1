<template>
	<div class="admin" v-loading="loading">
		<div class="header-right">
            <div class="header-right-content">
                <div class="button-home">
                    <router-link to="/system/admin">
                        <i class="fas fa-user-friends">
                        </i>
                    </router-link>
                </div>
                <div class="title">
                    {{ $t('menu.title.admin') }}
                    <span class="subtitle">
                    </span>
                </div>
                <div class="action">
                    <el-form :inline="true" :model="searchForm">
                        <div class="action-search">
                            <div class="action-search-title">
                                {{ $t('search.title.search') }}:
                            </div>
                            <div class="action-search-input">
                                <el-form-item>
                                    <el-input v-model="filter" :placeholder="$t('placeholder.keyword')">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="action-search-result">
                            {{ $t('search.title.result') }}:
                            <span class="action-search-result-total">
                                {{ totalRows }}
                            </span>
                            {{ $t('search.title.data') }}
                        </div>
                        <div class="action-amount-per-page">
                        	<div class="action-amount-per-page-title">
                        		{{ $t('search.title.quantity') }}:
                        	</div>
                        	<div class="action-amount-per-page-select">
                        		<el-form-item>
                                    <el-select v-model="amountPerPage">
                                    	<el-option label="20" value="20">
                                        </el-option>
                                        <el-option label="50" value="50">
                                        </el-option>
                                        <el-option label="100" value="100">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                        	</div>
                        </div>
                        <div class="action-title">
                            {{ $t('search.title.action') }}:
                        </div>
                        <div class="action-list">
                            <div class="button-add" @click="showModal('addForm')" v-if="authority.indexOf(30) >= 0">
                                <img src="img/bole_mini/icon/button_add.png">
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="content">
        	<div class="table-template">
	        	<b-table :items="resultData" :fields="fields" :per-page="amountPerPage" :current-page="currentPage" :filter="filter" @filtered="onFiltered">
                    <template slot-scope="row" slot="date_create">
                        {{ new Date(row.item.date_create * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template slot-scope="row" slot="date_login">
                        {{ new Date(row.item.date_login * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template slot-scope="row" slot="status">
                        <div class="status">
                            <div class="status-active" v-if="row.item.status == 1">
                                {{ $t('status.active') }}
                            </div>
                            <div class="status-inactive" v-else>
                                {{ $t('status.inactive') }}
                            </div>
                        </div>
                    </template>
	            	<template slot-scope="row" slot="actions">
	                    <b-button class="edit" @click.stop="showModal('updateForm', row.item)" v-if="authority.indexOf(31) >= 0">
	                        {{ $t('button.edit') }}
	                    </b-button>
	                    <b-button class="delete" @click.stop="showModal(row.item)" v-if="authority.indexOf(32) >= 0">
	                        {{ $t('button.delete') }}
	                    </b-button>
	            	</template>
	            	<template slot-scope="row" slot="row-details">
                    	<b-card>
                        	<ul>
                            	<li v-for="(value, key) in row.item" :key="key">
                                	{{ key }}: {{ value }}
                            	</li>
                        	</ul>
                    	</b-card>
                	</template>
	            </b-table>
	        </div>
	        <div class="pagination-template">
	        	<b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="amountPerPage"/>
	        </div>
        </div>
        <item-detail :visible.sync="isDialogVisible" :formType="formType" :detail="detail" :adminGroupList="adminGroupList">
        </item-detail>
	</div>
</template>
<script>
    import ItemDetail from './ItemDetail.vue';
    const resultData = [];

	export default {
		name: 'Admin',
        components: {
            ItemDetail
        },
		data() {
			return {
                authority: [],
                loading: true,

                searchForm: {
                    view: 'showInfo',
                },

	          	fields: [
	          		{ key: 'name', label: '账户', sortable: true },
	          		{ key: 'admin_group_name', label: '管理员组', sortable: true },
                    { key: 'date_create', label: '创建时间', sortable: true },
                    { key: 'date_login', label: '登入时间', sortable: true },
                    { key: 'ip_login', label: '登入IP', sortable: true },
                    { key: 'count_login', label: '登入次数', sortable: true },
                    { key: 'status', label: '状态', sortable: true },
                    { key: 'actions', label: '操作' }
                ],
                resultData: [],
                totalRows: resultData.length,
                amountPerPage: 20,
                currentPage: 1,
                filter: null,
                
                isImgModalVisible: false,
                img: '',
                isDialogVisible: false,
                formType: '',
                detail: {},
                adminGroupList: [],
			}
		},
		mounted() {
            this.initMenuAuthority();
			this.init();
		},
		methods: {
            initMenuAuthority() {
                axios.get('/system/admin/initAuthority').then((response) => {
                    this.authority = response.data.resp_data.list;
                }).catch(error => {

                });
            },
			init() {
                axios.get('/system/admin/getList').then((response) => {
                    this.resultData = response.data.resp_data.list;
                    this.totalRows = response.data.resp_data.totalCount;
                    this.adminGroupList = response.data.resp_data.adminGroupList;
                    this.loading = false;
				}).catch(error => {
					this.$message.error(error.msg);
				});
			},
			onFiltered (filteredItems) {
      			this.totalRows = filteredItems.length;
      			this.currentPage = 1;
    		},
            showModal(formType, detail) {
                if (formType == 'addForm') {
                    this.detail = {};
                } else if (formType == 'updateForm') {
                    this.detail = detail;

                    
                } else if (formType == 'deleteForm') {
                    this.detail = detail;
                } else {
                    return false;
                }

                this.formType = formType;
                this.isDialogVisible = true;
            },
		}
	}
</script>
<style lang="scss" type="text/css">
	@import "../../../../../scss/bole_mini/Admin.scss";
</style>