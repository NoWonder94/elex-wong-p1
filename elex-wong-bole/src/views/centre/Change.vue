<template>
    <div id="Change_Id" class="Change_CN">
        <div class="Change_Container">
            <el-card shadow="never">
                <el-form ref="AccountForm" status-icon :model="AccountForm" :rules="rules">
                    <h1>
                        账户管理
                    </h1>
                    <div style="height:100%;">
                        <p id="Title">
                            商户号
                        </p>
                        <el-form-item prop="Cdomain">
                            <p id="Subtitle">
                                站点域名(必填)
                            </p>
                            <el-input v-model="AccountForm.Cdomain" style="margin-right:1.6vw">
                            </el-input>
                            <slot id="label">
                                域名不可更改
                            </slot>
                        </el-form-item>
                        <el-form-item prop="Cname">
                            <p id="Subtitle">
                                公司名称(必填)
                            </p>
                            <el-input v-model="AccountForm.Cname">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="height:100%;">
                        <p id="Title">
                            接入负责人信息
                        </p>
                        <el-form-item prop="LName">
                            <p id="Subtitle">
                                姓名
                            </p>
                            <el-input v-model="AccountForm.LName">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="LEmail">
                            <p id="Subtitle">
                                电子邮箱
                            </p>
                            <el-input v-model="AccountForm.LEmail">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="LSkype">
                            <p id="Subtitle">
                                Skype
                            </p>
                            <el-input v-model="AccountForm.LSkype">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="LTelegram">
                            <p id="Subtitle">
                                Telegram
                            </p>
                            <el-input v-model="AccountForm.LTelegram">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="LWechat">
                            <p id="Subtitle">
                                微信
                            </p>
                            <el-input v-model="AccountForm.LWechat">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="LQQ">
                            <p id="Subtitle">
                                QQ
                            </p>
                            <el-input v-model="AccountForm.LQQ">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="height:100%;">
                        <p id="Title">
                            财务负责人信息
                        </p>
                        <el-form-item prop="FName">
                            <p id="Subtitle">
                                姓名
                            </p>
                            <el-input v-model="AccountForm.FName">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="FEmail">
                            <p id="Subtitle">
                                电子邮箱
                            </p>
                            <el-input v-model="AccountForm.FEmail">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="FSkype">
                            <p id="Subtitle">
                                Skype
                            </p>
                            <el-input v-model="AccountForm.FSkype">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="FTelegram">
                            <p id="Subtitle">
                                Telegram
                            </p>
                            <el-input v-model="AccountForm.FTelegram">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="FWechat">
                            <p id="Subtitle">
                                微信
                            </p>
                            <el-input v-model="AccountForm.FWechat">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="FQQ">
                            <p id="Subtitle">
                                QQ
                            </p>
                            <el-input v-model="AccountForm.FQQ">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="height:100%;">
                        <p id="Title">
                            修改密码
                        </p>
                        <el-form-item prop="oldPassword">
                            <p id="Subtitle">
                                当前密码
                            </p>
                            <el-input type="password" v-model="AccountForm.oldPassword">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="newPassword">
                            <p id="Subtitle">
                                新密码
                            </p>
                            <el-input type="password" v-model="AccountForm.newPassword">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="ConFPassword">
                            <p id="Subtitle">
                                确认新密码
                            </p>
                            <el-input type="password" v-model="AccountForm.ConFnewPassword">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-button id="update">
                            更新个人资料
                        </el-button>
                    </div>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return{
      AccountForm: {
        Cdomain:'',
        Cname:''
      },
      rules: {
        Cdomain: [
          {
            required:true,
            message:"please insert Domain Name"
          }
        ],
        Cname: [
          {
            required:true,
            message:"please insert Company Name"
          }
        ]
      },
    }
  }
  };
</script>

<style lang="scss">
  .Change_Container {
    width:56.3vw;
    background-color:#fff;
    margin: 6.6vw 0vw 7.1vw 7.8vw;
    padding: 2.8vw 0vw 4.5vw 2.1vw;

    .el-card {
      border:0px;
      padding:0;
    }

    .el-card__body {
      padding:0;
    }

    .el-form-item__error
    {
        margin-top:0.2vw;
        margin-left:7.2vw;
    }

    .el-form {

      .el-input {
        width:30.6vw;
        height:2.2vw;
        float:left;

        .el-input__inner {
          color:#000000;
        }
      }

        h1 {
            font-size: 1.9vw;
            font-weight: bold;
        }

        p {
            width:6.6vw;
            height:1.2vw;
        }

        #Title {
            margin-top:1.5vw;
            margin-left:0.7vw;
            float:none;
            width:8.8vw;
            height:1.9vw;
            font-size:1.2vw;
            font-weight:500;
        }

      #Subtitle {
        font-size:0.8vw;
        float:left;
        margin-left:0.7vw;
      }

      #update {
        width:7.1vw;
        height:1.7vw;
        padding:0;
        margin-top:3vw;
        color:red;
        border-color:red;
        border-radius:0.3vw;
        font-size:0.8vw;
      }
    }
  }
</style>
