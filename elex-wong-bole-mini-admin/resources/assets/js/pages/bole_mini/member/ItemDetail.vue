<template>
	<div class="member-detail">
		<div class="modal-backdrop" v-show="isDialogVisible" @click="close">
	        <div class="modal" @click.stop>
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
	                        <el-form :model="form" :inline="true" label-width="200px">
                                <div class="part">
                                    <div class="part-title">
                                        {{ $t('dialog.subtitle.businessNo') }}
                                    </div>
                                    <div class="part-form">
                                        <el-form-item :label="$t('dialog.column.domainName')" v-if="formType == 'addForm'">
                                            <el-input v-model="form.domain_name" :placeholder="$t('dialog.require.domainName')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.companyName')">
                                            <el-input v-model="form.company_name" :placeholder="$t('dialog.require.companyName')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.currency')">
                                            <el-select v-model="form.currency_id" :placeholder="$t('dialog.require.currency')">
                                                <el-option v-for="currency in currencyList" :key="currency.id" :label="currency.name" :value="currency.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="part">
                                    <div class="part-title">
                                        {{ $t('dialog.subtitle.personInfo') }}
                                    </div>
                                    <div class="part-form">
                                        <el-form-item :label="$t('dialog.column.name')">
                                            <el-input v-model="form.customer_name" :placeholder="$t('dialog.require.name')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.email')">
                                            <el-input v-model="form.customer_email" type="email" :placeholder="$t('dialog.require.email')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.skype')">
                                            <el-input v-model="form.customer_skype" :placeholder="$t('dialog.require.skype')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.telegram')">
                                            <el-input v-model="form.customer_telegram" :placeholder="$t('dialog.require.telegram')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.wechat')">
                                            <el-input v-model="form.customer_weixin" :placeholder="$t('dialog.require.wechat')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.qq')">
                                            <el-input v-model="form.customer_qq" :placeholder="$t('dialog.require.qq')">
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="part">
                                    <div class="part-title">
                                        {{ $t('dialog.subtitle.financialPersonInfo') }}
                                    </div>
                                    <div class="part-form">
                                        <el-form-item :label="$t('dialog.column.name')">
                                            <el-input v-model="form.finance_name" :placeholder="$t('dialog.require.name')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.email')">
                                            <el-input v-model="form.finance_email" type="email" :placeholder="$t('dialog.require.email')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.skype')">
                                            <el-input v-model="form.finance_skype" :placeholder="$t('dialog.require.skype')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.telegram')">
                                            <el-input v-model="form.finance_telegram" :placeholder="$t('dialog.require.telegram')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.wechat')">
                                            <el-input v-model="form.finance_weixin" :placeholder="$t('dialog.require.wechat')">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('dialog.column.qq')">
                                            <el-input v-model="form.finance_qq" :placeholder="$t('dialog.require.qq')">
                                            </el-input>
                                        </el-form-item>
                                    </div>
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
			domain_name: '',
            company_name: '',
            currency_id: 1,
            customer_name: '',
            customer_email: '',
            customer_skype: '',
            customer_telegram: '',
            customer_weixin: '',
            customer_qq: '',
            finance_name: '',
            finance_email: '',
            finance_skype: '',
            finance_telegram: '',
            finance_weixin: '',
            finance_qq: ''
		}
	}

	export default {
		name: 'ItemDetail',
		props: ['visible', 'formType', 'detail', 'currencyList'],
		data() {
            return {
                title: '',
                btnSubmit: '',
                form: resetForm(),
                url: '',
                msgSuccess: '',
                msgError: '',
                isDialogVisible: false,
                isBtnLoading: false,
            }
        },
        methods: {
            initData(n) {
            	if (this.formType == 'addForm') {
            		this.title = this.$t('dialog.title.create');
            		this.btnSubmit = this.$t('button.create');
            		this.form = resetForm();
            		this.url = '/member/createData';
            		this.msgSuccess = this.$t('message.success.create');
            		this.msgError = this.$t('message.error.create');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'updateForm') {
            		this.title = this.$t('dialog.title.update');
            		this.btnSubmit = this.$t('button.update');
            		this.form = this.detail;
            		this.url = '/member/updateData';
            		this.msgSuccess = this.$t('message.success.update');
            		this.msgError = this.$t('message.error.update');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'deleteForm') {
            		this.form = {};
                    this.form.id = this.detail.id;
            		this.url = '/member/deleteData';
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
	@import "../../../../scss/bole_mini/MemberDetail.scss";
</style>