<template>
    <div id="Login_Id" class="Login_CN">
        <el-row class="Container_login">
            <el-col>
                <el-card class="formBox" shadow="never">
                    <p id="title">
                        会员登录
                    </p>
                    <el-form ref="loginForm" status-icon :model="loginForm" :rules="rules">
                        <el-form-item prop="username">
                            <p id="username">
                                用户名或电子邮件地址
                            </p>
                            <el-input v-model="loginForm.username">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <p id="password">
                                密码
                            </p>
                            <el-input type="password" v-model="loginForm.password">
                            </el-input>
                        </el-form-item>
                        <el-checkbox label="remember">
                            记住我的登录信息
                        </el-checkbox>
                        <el-button type="button" id="login" @click="login()">
                            登录
                        </el-button>
                        <br>
                        <el-button type="text" id="forgot" @click="resetPw()">
                            忘记密码？
                        </el-button>
                        <el-button type="button" id="receive" @click="resetPw()">
                            找回密码
                        </el-button>
                    </el-form>
                </el-card>
            </el-col>
            <!--
            <img src="../assets/member/img_01.png">
            -->
            <video id="video" class="login-video" autoplay loop muted>
                <source src="https://www.bolegaming.com/video/TMAC.mp4" type="video/mp4">
            </video>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {
                            required:true,
                            message:"请输入用户名！"
                        }
                    ],
                    password: [
                        {
                            required:true,
                            message:"请输入密码！"
                        }
                    ]
                },
            }
        },
        mounted() {
            document.getElementById('video').play();
        },
        methods: {
            login() {
                this.$router.push({
                    path: "member/homepage"
                });
            },
            resetPw() {
                this.$router.push({
                    path: "forgot"
                });
            },
        },
        watch: {
            $route(to, from) {
                document.getElementById('video').play();
            }
        }
    };
</script>
<style lang="scss">
  @media only screen and (min-width:769px) {
    @import "../styles/pc/login.scss";
  }

  @media only screen and (max-width:769px) {
    @import "../styles/pc/login.scss";
  }
</style>
