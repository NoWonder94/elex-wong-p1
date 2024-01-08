<template>
	<div class="directory-detail">
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
	                        <el-form :model="form" :rules="rules" :inline="true" label-width="120px">
                                <div class="part">
                                    <el-form-item :label="$t('dialog.column.img')">
                                        <div class="upload-layout">
                                            <a @click="showUploadImg">
                                                {{ $t('button.uploadImg') }}
                                            </a>
                                            <br>
                                            <img :src="imgData" v-show="isImgDataShow">
                                        </div>
                                    </el-form-item>
                                    <!--
                                    <el-form-item :label="$t('dialog.column.name')">
                                        <el-input v-model="form.name" :placeholder="$t('dialog.require.name')">
                                        </el-input>
                                    </el-form-item>
                                    -->
                                    <el-form-item :label="$t('dialog.column.sort')">
                                        <el-input v-model="form.sort" :placeholder="$t('dialog.require.sort')">
                                        </el-input>
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
                                <div class="part">
                                    <el-tabs v-model="tabName">
                                        <el-tab-pane label="中文" name="chinese">
                                            <el-form-item :label="$t('dialog.column.name')">
                                                <el-input v-model="form.chinese" :placeholder="$t('dialog.require.name')">
                                                </el-input>
                                            </el-form-item>
                                        </el-tab-pane>
                                        <el-tab-pane label="英文" name="english">
                                            <el-form-item :label="$t('dialog.column.name')">
                                                <el-input v-model="form.english" :placeholder="$t('dialog.require.name')">
                                                </el-input>
                                            </el-form-item>
                                        </el-tab-pane>
                                        <el-tab-pane label="韩文" name="korean">
                                            <el-form-item :label="$t('dialog.column.name')">
                                                <el-input v-model="form.korean" :placeholder="$t('dialog.require.name')">
                                                </el-input>
                                            </el-form-item>
                                        </el-tab-pane>
                                    </el-tabs>
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
        <div>
            <img-upload v-model="isImgUploadShow" field="img" img-format="png" :width="300" :height="300" @crop-success="cropImgSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail">
            </img-upload>
        </div>
	</div>
</template>
<script>
    import imgUpload from 'vue-image-crop-upload';
    const resultData = [];

	function resetForm() {
		return {
			chinese: '',
            english: '',
            korean: '',
            img: '',
            sort: 0,
            status: '1'
		}
	}

	export default {
		name: 'ItemDetail',
		props: ['visible', 'formType', 'detail'],
        components: {
            'img-upload': imgUpload
        },
		data() {
            return {
                title: '',
                btnSubmit: '',
                form: resetForm(),
                imgData: '',
                isImgDataShow: false,
                isImgUploadShow: false,
                url: '',
                msgSuccess: '',
                msgError: '',
                isDialogVisible: false,
                isBtnLoading: false,

                tabName: 'chinese',
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
                    this.imgData = '';
                    this.isImgDataShow = false;
            		this.url = '/resource/directory/createData';
            		this.msgSuccess = this.$t('message.success.create');
            		this.msgError = this.$t('message.error.create');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'updateForm') {
            		this.title = this.$t('dialog.title.update');
            		this.btnSubmit = this.$t('button.update');
            		this.form = this.detail;
                    this.form.status = this.detail.status.toString();
                    this.imgData = this.detail.img;
                    this.isImgDataShow = true;
            		this.url = '/resource/directory/updateData';
            		this.msgSuccess = this.$t('message.success.update');
            		this.msgError = this.$t('message.error.update');
            		this.isDialogVisible = n;
            	} else if (this.formType == 'deleteForm') {
            		this.form = {};
                    this.form.id = this.detail.id;
                    this.imgData = '';
                    this.isImgDataShow = false;
            		this.url = '/resource/directory/deleteData';
            		this.msgSuccess = this.$t('message.success.delete');
            		this.msgError = this.$t('message.error.delete');
            		this.confirmForm();
            	} else {
            		this.close();
            	}
            },
            showUploadImg() {
                this.isImgUploadShow = !this.isImgUploadShow;
            },
            cropImgSuccess(imgData, field) {
                this.form.img = imgData;
                this.imgData = imgData;
                this.isImgDataShow = true;
            },
            cropUploadSuccess(jsonData, field) {

            },
            cropUploadFail(status, field) {

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
	@import "../../../../../scss/bole_mini/DirectoryDetail.scss";
</style>