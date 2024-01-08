<template>
    <div id="Support_Id" class="Support_CN">
        <div class="Support_Container">
            <div class="Support_Box">
                <h1 id="Support_title">
                    博乐支持
                </h1>
                <div id="Support_details">
                    <p>
                        亲爱的 客户 你好：
                        <br>
                        欢迎来到
                        <span id="red">
                            博乐游戏
                        </span>
                        的客户支持中心。
                        <br>
                        我们很荣幸地推出了技术支持中心，您可以通过它来跟踪自己的支持查询和要求
                    </p>
                    <p>
                        要申请获取自助门户的登录信息，请通过
                        <span id="red">
                            info@bolegaming.com
                        </span>
                        与我们的支持团队联系。
                    </p>
                </div>
                <div class="Feedback_Box">
                    <img src="../../assets/centre/mail.png">
                    <p id="report">
                        要报告故障或咨询一般问题，请通过info@bolegaming.com与我们的支持团队联系
                    </p>
                    <div id="red">
                        info@bolegaming.com
                    </div>
                    <el-button id="contact">
                        联系
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style lang="scss">
  .Support_Container {
    width:56.3vw;
    height:27.5vw;
    background-color:#fff;
    margin: 6.6vw 0vw 13.2vw 7.8vw;

    .Support_Box
    {
        padding:2.8vw 2.1vw;
    }

      h1 {
        margin-bottom:0;
        font-size:1.9vw;
        font-weight:bold;
      }

      #Support_details {
        margin-top:1vw;
        padding-left:0.7vw;
        width:28.5vw;
        height:10.5vw;
        float:left;

        p {
          font-size:0.9vw;
        }

        #red {
          color:red;
        }
      }

      .Feedback_Box {
        width:20.3vw;
        height:19.1vw;
        float:left;
        background-color:#F7F7F7;
        margin-left:2.6vw;

        img {
          margin:2.2vw 0vw 1.5vw 8.4vw;
          width: 3.4vw;
          height: 2.6vw;
        }

        #report {
          width:16.7vw;
          height:4.5vw;
          text-align:center;
          margin:0 auto;
          font-size:1vw;
        }

        #red {
          font-size:1.2vw;
          color:red;
          margin:1.5vw 0vw 0vw 3.2vw;
          font-weight:bold;
        }

        #contact {
          width:4.8vw;
          height:1.7vw;
          color:red;
          margin:1.1vw 0vw 0vw 7.7vw;
          padding:0;
          border:1px solid red;
          border-radius:0.3vw;
          font-size:0.8vw;
        }
      }
  }
</style>
