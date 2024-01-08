<template>
    <div id="Forgot_Id" class="Forgot_CN">
        <el-row class="Container_forgot">
            <el-col>
                <el-card class="formBox" shadow="never">
                    <p id="title">
                        找回密码
                    </p>
                    <el-form ref="forgotForm" status-icon :model="forgotForm" :rules="rules" label-width="0px" size="medium">
                        <el-form-item prop="account">
                            <p id="email">
                                请输入手机号或邮箱
                            </p>
                            <el-input v-model="forgotForm.account">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <p id="newPw">
                                请输入新密码
                            </p>
                            <el-input type="password" v-model="forgotForm.pwd">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-form-item prop="verify_code">
                                <p id="verifyCode">
                                    请输入验证码
                                </p>
                                <el-input v-model="forgotForm.verify_code">
                                    <el-button id="Text" slot="append" :loading="sendLoading" :disabled="disabled" @click.native="sendVerifyCode">
                                        {{btnText}}
                                    </el-button>
                                </el-input>
                            </el-form-item>
                            <div id="captcha">
                                <div class="text" v-show="showAliscTips">
                                    安全组件加载中
                                </div>
                                <div class="loading-box" v-show="showAliscLoading">
                                    <div class="loading">
                                        <div class="loading-dot"></div>
                                        <div class="loading-dot"></div>
                                        <div class="loading-dot"></div>
                                        <div class="loading-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="flex flex-between" id="submit">
                                <el-button type="primary" class="submitBtn" @click="submitForm('forgotForm')" :loading="btnLoading">
                                    提交
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <!--
            <img class="banner1" src="../assets/member/img_01.png">
            -->
            <video id="video" class="login-video" autoplay loop muted>
                <source src="/static/video/TMAC.mp4" type="video/mp4">
            </video>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'Forgot',
        data() {
            let checkAccount = (rule, value, callback) => {
                let reg = /^1[34578]\d{9}$/;
                let reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

                if (!reg.test(value) && !reg1.test(value)) {
                    callback(new Error('请输入正确的手机号码或者邮箱'));
                }

                callback();
            };

            return {
                forgotForm: {
                    account: '',
                    verify_code: '',
                    pwd: '',
                    alisc: {
                        sid: '',
                        geetest_challenge: '',
                        geetest_seccode: '',
                        geetest_validate: ''
                    },
                    type: 'repwd'
                },
                rules: {
                    account: [
                        {
                            required: true,
                            message: this.$t('forgot.user_info_require'),
                            trigger: 'blur'
                        },
                        {
                            validator: checkAccount,
                            trigger: 'blur'
                        }
                    ],
                    verify_code: [
                        {
                            required: true,
                            message: this.$t('forgot.verifycode_require'),
                            trigger: 'blur'
                        },
                        {
                            len: 4,
                            message: '验证码长度为 4 个字符',
                            trigger: 'blur'
                        }
                    ],
                    pwd: [
                        {
                            required: true,
                            message: this.$t('forgot.password_require'),
                            trigger: 'blur'
                        },
                        {
                            pattern: /^[a-zA-Z0-9_]{6,12}$/,
                            message: '密码长度6到12位，特殊符号只能包含下划线，不能包含其他特殊符号',
                            trigger: 'blur'
                        }
                    ]
                },
                btnLoading: false,
                sendLoading: false,
                btnText: '获取验证码',
                time: 60,
                disabled: false,
                showAliscTips: true,
                showAliscLoading: false,
                captchaObj: {}
            };
        },
        mounted() {
            document.getElementById('video').play();
        },
        watch: {
            $route(to, from) {
                document.getElementById('video').play();
            }
        }
    };

    /*
    export default {
      name: 'Reg',
      data() {
        let checkAccount = (rule, value, callback) => {
          let reg = /^1[34578]\d{9}$/;
          let reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if (!reg.test(value) && !reg1.test(value)) {
            callback(new Error('请输入正确的手机号码或者邮箱'));
          }
          callback();
        };

        return {
          forgotForm: {
            account: '',
            verify_code: '',
            pwd: '',
            alisc: {
              sid: '',
              geetest_challenge: '',
              geetest_seccode: '',
              geetest_validate: ''
            },
            type: 'repwd'
          },
          rules: {
            account: [
              {
                required: true,
                message: this.$t('forgot.user_info_require'),
                trigger: 'blur'
              },
              { validator: checkAccount, trigger: 'blur' }
            ],
            verify_code: [
              {
                required: true,
                message: this.$t('forgot.verifycode_require'),
                trigger: 'blur'
              },
              { len: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
            ],
            pwd: [
              {
                required: true,
                message: this.$t('forgot.password_require'),
                trigger: 'blur'
              },
              {
                pattern: /^[a-zA-Z0-9_]{6,12}$/,
                message:
                  '密码长度6到12位，特殊符号只能包含下划线，不能包含其他特殊符号',
                trigger: 'blur'
              }
            ]
          },
          btnLoading: false,
          sendLoading: false,
          btnText: '获取验证码',
          time: 60,
          disabled: false,

          showAliscTips: true,
          showAliscLoading: false,
          captchaObj: {}
        };
      },
        mounted() {
            this.initCaptcha();
        },
      methods: {
        initCaptcha() {
          this.$api
            .request('VerifyCode/alisc', {})
            .then(({ data }) => {
              this.showAliscTips = false;
              this.showAliscLoading = true;

              this.forgotForm.alisc.sid = data.sid;
              initGeetest(
                {
                  gt: data.gt,
                  challenge: data.challenge,
                  offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                  new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

                  product: 'float',
                  width: '100%'
                },
                captchaObj => {
                  this.captchaObj = captchaObj;
                  captchaObj.appendTo('#captcha');
                  captchaObj
                    .onReady(() => {
                      this.showAliscLoading = false;
                    })
                    .onSuccess(() => {
                      let result = captchaObj.getValidate();
                      this.forgotForm.alisc.geetest_challenge =
                        result.geetest_challenge;
                      this.forgotForm.alisc.geetest_seccode = result.geetest_seccode;
                      this.forgotForm.alisc.geetest_validate =
                        result.geetest_validate;
                    })
                    .onError(() => {
                      this.$message.error('出错啦，请稍后进行重试');
                    });
                }
              );
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        },
        submitForm(formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.btnLoading = true;
              this.$api
                .repwd(this.forgotForm)
                .then(({ data, msg, status }) => {
                  if (status) {
                    this.$message.success('找回密码成功');
                    setTimeout(() => {
                      this.$router.push({ path: '/login' });
                    }, 1000);
                  } else {
                    this.$message.error(msg);
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                  this.btnLoading = false;
                });
            } else {
              return false;
            }
          });
        },
        sendVerifyCode() {
          if (this.forgotForm.account == '') {
            this.$message.error('请输入手机号/邮箱');
            return false;
          }

          if (this.forgotForm.alisc.geetest_validate == '') {
            this.$message.error('请通过智能验证');
            return false;
          }

          this.sendLoading = true;
          this.$api
            .request('VerifyCode/send', this.forgotForm)
            .then(({ status, msg }) => {
              this.sendLoading = false;
              if (status) {
                this.$message.success('发送成功');
                this.setTime();
              }
            })
            .catch(error => {
              this.captchaObj.reset();
              this.$message.error(error.message);
              this.sendLoading = false;
            });
        },
        setTime() {
          if (this.time == 0) {
            this.disabled = false;
            this.btnText = '获取验证码';
            this.time = 60;
          } else {
            this.disabled = true;
            this.btnText = '重新发送(' + this.time + ')';
            this.time--;
            setTimeout(() => {
              this.setTime();
            }, 1000);
          }
        }
      }
    };
    */
</script>
<style lang="scss">
    @media only screen and (min-width:769px) {
        #Forgot_Id {
            position:relative;
            background-color:black;
        }

        .Container_forgot {
            padding-top:11.2vw;
            padding-left:17.1vw;
            padding-bottom:11.9vw;
            background-color:black;
            width:100%;
            height:100%;

            .el-button--medium {
                padding:0.5vw 1vw;
                border-radius:4px;
                font-size:0.7vw;
            }

            .el-form-item--medium .el-form-item__content {
                font-size:0.7vw;
                line-height:1.9vw;
            }

            .el-col {
                width:29%;
            }

            .el-card__body {
                padding:0px;
            }

            .el-input--medium {
                .el-input__inner {
                    height:2.2vw;
                    line-height:1.9vw;
                    border-radius:0;
                }

                .el-form-item__content {
                    line-height:1.9vw;
                }
            }

            .el-form-item {
                margin:0px;
            }

            .el-form-item__error {
                padding:0 0 0 3vw;
                font-size:0.6vw;
                line-height:1;
            }

            .formBox {
                padding-left:3.1vw;
                padding-right:3.1vw;
                background-color:white;
                width:24vw;
                height:27.8vw;
                border:1px solid black;
                border-radius:0;

                p {
                    margin:0;
                }

                #title {
                    padding-top:1.1vw;
                    font-size:1.9vw;
                    font-weight:bold;
                }

                #email {
                    padding-top:1.4vw;
                    font-size:0.8vw;
                }

                #newPw {
                    padding-top:0.2vw;
                    font-size:0.8vw;
                }

                #verifyCode {
                    padding-top:0.2vw;
                    font-size:0.8vw;
                }

                #Text {
                    background-color:red;
                    width:6.6vw;
                    height:2.2vw;
                    border-radius:0;
                    color:#fff;
                    font-size:0.8vw;
                }

                #captcha {
                    padding-top:1.9vw;
                    text-align:center;
                }

                #submit {
                    padding-top:1.9vw;
                }

                .submitBtn {
                    float:right;
                    background-color:#fff;
                    width:5.9vw;
                    height:2vw;
                    border-color:red;
                    color:red;
                    font-size:0.8vw;
                }
            }

            .banner1 {
                float:left;
                width:41.7vw;
                height:27.8vw;
            }

            .login-video
            {
                width:41.7vw;
                height:27.8vw;
            }
        }
    }

    @media only screen and (max-width:769px) {
        #Forgot_Id {
            position:relative;
            background-color:black;   
        }

        .Container_forgot {
            width:100%;
            height:100%;
            background-color:white;
            border:1px solid black;
        }
    }
</style>