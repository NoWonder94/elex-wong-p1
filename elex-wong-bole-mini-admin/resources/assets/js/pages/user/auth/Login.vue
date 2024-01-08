<template>
	<el-container class="login">
		<el-header class="login-header">
        </el-header>
        <el-main class="login-body">
        	<center>
				<div class="title">
					<img src="/img/bole_mini/logo/logo_1.png">
				</div>
				<div class="form">
					<el-form :model="loginForm" :inline="true" label-width="60px">
		                <el-form-item :label="$t('dialog.column.account')">
		                    <el-input v-model="loginForm.name" :placeholder="$t('dialog.require.account')">
		                    </el-input>
		                </el-form-item>
		                <br>
		                <el-form-item :label="$t('dialog.column.pwd')">
		                    <el-input v-model="loginForm.pwd" type="password" :placeholder="$t('dialog.require.pwd')">
		                    </el-input>
		                </el-form-item>
		                <br>
		                <el-form-item style="float:right;">
		                    <el-button type="success" @click="submitForm()" :loading="btnLoading">
		                        {{ $t('button.login') }}
		                    </el-button>
		                </el-form-item>
		            </el-form>
				</div>
			</center>
        </el-main>
    </el-container>
</template>
<script>
	export default {
		name: 'Login',
		data() {
			return {
				loginForm: {
					name: '',
					pwd: ''
				},
				btnLoading: false
			}
		},
		methods: {
			submitForm() {
				if (this.loginForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.account'),
                        showClose: true
                    });

                    return false;
                } else {
                	if (this.loginForm.name.length < 6) {
                		this.$message({
	                        type: 'error',
	                        message: this.$t('dialog.length.account'),
	                        showClose: true
	                    });

	                    return false;
                	}
                }

                if (this.loginForm.pwd == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.pwd'),
                        showClose: true
                    });

                    return false;
                } else {
                	if (this.loginForm.pwd.length < 6) {
                		this.$message({
	                        type: 'error',
	                        message: this.$t('dialog.length.pwd'),
	                        showClose: true
	                    });

	                    return false;
                	}
                }

				axios.post('/system/admin/signIn', this.loginForm).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                       	window.location.reload();
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : this.$t('message.error.unknown'),
                            showClose: true,
                            onClose: function () {

                            }
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : this.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function () {

                        }
                    });
                });
			}
		}
	}
</script>
<style lang="scss" type="text/css">
    @import "../../../../scss/bole_mini/Login.scss";
</style>