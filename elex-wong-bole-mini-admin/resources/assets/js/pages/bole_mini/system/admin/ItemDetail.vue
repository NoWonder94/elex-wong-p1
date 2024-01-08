<template>
	<div class="admin-group-detail">
		<div class="modal-backdrop" v-show="isDialogVisible" @click="close">
	        <div class="modal" v-loading="isDialogLoading" @click.stop>
	            <div class="modal-header">
	                <slot name="header">
	                    <div class="modal-header-title">
	                        {{ title }}
	                    </div>
	                </slot>
	            </div>
	            <div class="modal-body">
	                <slot name="body">
	                    <div class="modal-body-content">
	                        <el-form :model="form" :rules="rules" :inline="true" label-width="120px">
                                <div class="part">
                                    <el-form-item :label="$t('dialog.column.name')" v-if="formType == 'addForm'">
                                        <el-input v-model="form.name" :placeholder="$t('dialog.require.name')">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('dialog.column.pwd')" v-if="formType == 'addForm'">
                                        <el-input v-model="form.pwd" type="password" :placeholder="$t('dialog.require.pwd')">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('dialog.column.adminGroup')">
                                        <el-select v-model="form.admin_group_id" :placeholder="$t('dialog.require.adminGroup')">
                                            <el-option v-for="adminGroup in adminGroupList" :key="adminGroup.id" :label="adminGroup.name" :value="adminGroup.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item :label="$t('dialog.column.status')">
                                        <el-select v-model="form.status" :placeholder="$t('dialog.require.status')">
                                            <el-option label="禁止" value="0">
                                            </el-option>
                                            <el-option label="开启" value="1">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <el-form-item style="margin-top:2px; margin-right:5px; float:right;">
                                    <el-button type="success" @click="handleForm()" :loading="isBtnLoading">
                                        {{ btnSubmit }}
                                    </el-button>
                                    <el-button type="danger" @click="close">
                                        {{ $t('button.cancel') }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
	                    </div>
	                </slot>
	            </div>
	            <div class="modal-footer">
	                <slot name="footer">
	                </slot>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
    const resultData = [];

	function resetForm() {
		return {
			name: '',
            pwd: '',
            admin_group_id: '',
            status: '1'
		}
	}

	export default {
		name: 'ItemDetail',
		props: ['visible', 'formType', 'detail', 'adminGroupList'],
		data() {
            return {
                title: '',
                btnSubmit: '',
                form: resetForm(),
                url: '',
                msgSuccess: '',
                msgError: '',
                isDialogVisible: false,
                isDialogLoading: false,
                isBtnLoading: false,

                rules: {
                    /*
                    domain_name: [
                        {
                            required: true,
                            message: this.$t('dialog.require.domainName'),
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 16,
                            message: '用户名为6到16个字母或数字或字符',
                            trigger: 'blur'
                        },
                    ]
                    */
                },
            }
        },
        methods: {
            initData(n) {
            	if (this.formType == 'addForm') {
            		this.title = this.$t('dialog.title.create');
            		this.btnSubmit = this.$t('button.create');
            		this.form = resetForm();
            		this.url = '/system/admin/createData';
            		this.msgSuccess = this.$t('message.success.create');
            		this.msgError = this.$t('message.error.create');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'updateForm') {
            		this.title = this.$t('dialog.title.update');
            		this.btnSubmit = this.$t('button.update');
            		this.form = this.detail;
                    this.form.status = this.detail.status.toString();
            		this.url = '/system/admin/updateData';
            		this.msgSuccess = this.$t('message.success.update');
            		this.msgError = this.$t('message.error.update');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'deleteForm') {
            		this.form = {};
                    this.form.id = this.detail.id;
            		this.url = '/system/admin/deleteData';
            		this.msgSuccess = this.$t('message.success.delete');
            		this.msgError = this.$t('message.error.delete');
            		this.confirmForm();
            	} else {
            		this.close();
            	}
            },
            handleForm() {
            	//validate

            	this.submitForm();
            },
            confirmForm() {
            	this.$confirm(this.$t('message.confirm.delete'), this.$t('message.tip'), {
                    type: 'warning',
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel')
                }).then(() => {
                	this.submitForm();
                },() => {
                	this.close();
                });
            },
        	submitForm() {
        		this.isBtnLoading = true;

        		axios.post(this.url, this.form).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : this.msgSuccess,
                            showClose: true,
                            onClose: function () {
                                window.location.reload();
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : this.msgError,
                            showClose: true,
                            onClose: function () {

                            }
                        });
                    }

                    this.isBtnLoading = false;
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : this.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function () {

                        }
                    });

                    this.isBtnLoading = false;
                });
        	},
        	close: function() {
                this.isDialogVisible = false;
                this.$emit('update:visible', false);
            },
        },
		watch: {
            visible: function(n, o) {
                n && this.initData(n);
            }
        },
	}
</script>
<style lang="scss" type="text/css">
	@import "../../../../../scss/bole_mini/AdminDetail.scss";
</style>