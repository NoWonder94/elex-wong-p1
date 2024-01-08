<template>
	<div class="directory" v-loading="loading">
		<div class="header-right">
            <div class="header-right-content">
                <div class="button-home">
                    <router-link to="/resource/directory">
                        <i class="fas fa-user-friends">
                        </i>
                    </router-link>
                </div>
                <div class="title">
                    {{ $t('menu.title.directory') }}
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
                            <div class="button-add" @click="showModal('addForm')" v-if="authority.indexOf(14) >= 0">
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
                    <template slot-scope="row" slot="img">
                        <img :src="row.item.img" @click="showImgLayout(row.item.img)">
                    </template>
                    <template slot-scope="row" slot="date_create">
                        {{ new Date(row.item.date_create * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template slot-scope="row" slot="date_update">
                        {{ new Date(row.item.date_update * 1000) | morph-date('YYYY-MM-DD HH:mm:ss') }}
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
	                    <b-button class="edit" @click.stop="showModal('updateForm', row.item)" v-if="authority.indexOf(15) >= 0">
	                        {{ $t('button.edit') }}
	                    </b-button>
	                    <b-button class="delete" @click.stop="showModal('deleteForm', row.item)" v-if="authority.indexOf(16) >= 0">
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
        <img-modal :visible.sync="isImgModalVisible" :img="img">
        </img-modal>
        <item-detail :visible.sync="isDialogVisible" :formType="formType" :detail="detail">
        </item-detail>
	</div>
</template>
<script>
    import ImgModal from '../../00_Base/ImgModal.vue';
    import ItemDetail from './ItemDetail.vue';
    const resultData = [];

	export default {
		name: 'Directory',
        components: {
            ImgModal,
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
	          		{ key: 'img', label: '图片' },
                    { key: 'chinese', label: '名称', sortable: true },
                    { key: 'sort', label: '排列', sortable: true },
                    { key: 'status', label: '状态', sortable: true },
                    { key: 'date_create', label: '创建时间', sortable: true },
                    { key: 'date_update', label: '更新时间', sortable: true },
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
                infoCategoryList: [],
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
                axios.get('/resource/directory/getList').then((response) => {
                    this.resultData = response.data.resp_data.list;
                    this.totalRows = response.data.resp_data.totalCount;
                    this.loading = false;
				}).catch(error => {
					this.$message.error(error.msg);
				});
			},
			onFiltered (filteredItems) {
      			this.totalRows = filteredItems.length;
      			this.currentPage = 1;
    		},
            showImgModal(img) {
                this.img = img;
                this.isImgModalVisible = true;
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
	@import "../../../../../scss/bole_mini/Directory.scss";
</style>