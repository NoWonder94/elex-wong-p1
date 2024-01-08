<template>
  <div class="login">
    <div class="login-block">
      <img class="login-block-branding-icon" src="../assets/img/bole-logo.png" alt="branding-logo">

      <div class="login-form" v-if="!isRegForm">
        <el-form
          :model="loginForm"
          status-icon
          :rules='loginRules'
          ref="loginForm"
          >
          <el-form-item label="账户" prop="name">
            <el-input
              v-model="loginForm.name"
              placeholder="账户名称"
              autocomplete="off"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model="loginForm.pwd"
              placeholder="密码"
              type="password"
              autocomplete="off"
              @change="loginRequest('loginForm')">
            </el-input>
          </el-form-item>

          <div class="login-form-submition-button">
            <el-button
              class="login-button fill-box"
              @click="loginRequest('loginForm')">
                登录
            </el-button>
            <el-button
              class="register-button border-box"
              @click="handleFormChange('registerForm')">
              注册
            </el-button>
          </div>
        </el-form>
      </div>

      <div class="login-form" v-if="isRegForm">
        <el-form
          :model="registerForm"
          :rules='regRules'
          ref="registerForm"
          status-icon
        >
          <el-form-item label="账户" prop="registerName">
            <el-input
              v-model="registerForm.registerName"
              autocomplete="off"
              placeholder="账户名称">
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="registerPwd">
            <el-input
              v-model="registerForm.registerPwd"
              type="password"
              placeholder="密码"
              autocomplete="off">
            </el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="registerConfirmPwd">
            <el-input
              v-model="registerForm.registerConfirmPwd"
              type="password"
              placeholder="确认密码"
              autocomplete="off">
            </el-input>
          </el-form-item>

          <div class="login-form-submition-button">
            <el-button
              class="login-button fill-box"
              @click="registerRequest('registerForm')">
                注册
            </el-button>
            <el-button
              class="register-button border-box"
              @click="handleFormChange('loginForm')">
                已有账号
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      var validateRepwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.registerForm.registerPwd) {
          callback(new Error('密码与确认密码不一致'));
        } else if (value < 6) {
          callback(new Error('密码长度最少6位'));
        } else {
          callback();
        }
      };
      return {
        isRegForm: false,
        /* login */
        loginForm: {
          name: '',
          pwd: '',
        },
        loginRules: {
          name: [
            { required: true, message: '请输入账户名', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少6位', trigger: 'blur' }
          ],
        },
        /* register */
        registerForm: {
          registerName: '',
          registerPwd: '',
          registerConfirmPwd: ''
        },
        regRules: {
          registerName: [
            { required: true, message: '请输入账户名', trigger: 'blur' },
          ],
          registerPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少6位', trigger: 'blur' }
          ],
          registerConfirmPwd: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: validateRepwd, trigger: 'blur' },
          ]
        },
      }
    },

    methods: {
      loginRequest(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid) {
            let params = {
              username: this.loginForm.name,
              pwd: this.loginForm.pwd,
            };

            this.$api
              .requestByPost("user/System/login", params)
              .then((result) => {
                if (result.status == true) {
                  /* Store Token */
                  localStorage.setItem("authToken", result.data.token);
                  /* notify */
                  this.$notiflix.Notify.success(
                    result.msg ? result.msg : this.$t("message.success"),{
                      showOnlyTheLastOne: true,
                    }
                  );
                  /* call user get */
                  this.getUser();
                  this.$router.push('/games/single');
                } else {
                  this.$notiflix.Notify.failure(
                    result.msg ? result.msg : this.$t("message.error"),
                    {
                      showOnlyTheLastOne: true,
                    }
                  );
                }

              })
              .catch((error) => {
                console.log(error);
                this.$notiflix.Notify.failure(this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
              });

          } else {
            this.$notiflix.Notify.failure("请输入正确信息", {
              showOnlyTheLastOne: true,
            });
          }
        });
      },

      registerRequest(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid) {
            let params = {
              username: this.registerForm.registerName,
              pwd: this.registerForm.registerPwd,
            };

            this.$api
              .requestByPost("user/System/reg", params)
              .then((result) => {
                if (result.status == true) {
                  /* close register form */
                  this.isRegForm = false;
                  this.$notiflix.Notify.success(
                    result.msg ? result.msg : "注册成功", {
                      showOnlyTheLastOne: true,
                    }
                  );
                } else {
                  this.$notiflix.Notify.failure(
                    result.msg ? result.msg : this.$t("message.error"), {
                      showOnlyTheLastOne: true,
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                this.$notiflix.Notify.failure(this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
              });

          } else {
            this.$notiflix.Notify.failure("请输入正确信息", {
              showOnlyTheLastOne: true,
            });
          }
        });
      },

      getUser() {
        this.$api
          .requestByPost("user/User/info")
          .then((result) => {
            if (result.status == true) {
              /* store update */
              this.$store.dispatch("updateUserInfo", result.data);

            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      handleFormChange(formName) {
        console.log(formName);
        if(formName == "registerForm") {
          this.isRegForm = true;
          this.resetForm("loginForm");
        } else {
          this.isRegForm = false;
          this.resetForm("registerForm");
        }
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style lang="scss" type="text/css">
  @import "/assets/scss/pc/login.scss";
</style>
