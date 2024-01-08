<template>
  <div>
    <el-dialog
      :modal-append-to-body="false"
      :visible="true"
      @close="dialogClose"
      class="classplanA"
    >
      <div class="header">
        <span>Details</span>
        <i @click="dialogClose" class="el-icon-close"></i>
      </div>
      <div class="isWin">
        <img src="./img/win1.png" alt="" />
      </div>
      <div class="userInfo">
        <div class="userImg">
          <img :src="itemInfo.userAvatar || require('./img/01.png')" alt="" />
        </div>
        <div class="userName">{{ itemInfo.userName }}</div>
        <div class="maxUserId">{{ itemInfo.userId }}</div>
        <div class="time">{{ getTime(itemInfo.createTime) }}</div>
      </div>
      <div class="recordItem">
        <div class="amount item">
          <div class="top">
            <img src="./img/icon_Total_wagered.png" alt="" />
            <div>{{ $t("Bet.Amount") }}</div>
          </div>
          <div class="bottom">{{ itemInfo.money }}</div>
        </div>
        <div class="amount item">
          <div class="top">
            <img src="./img/icon_payout.png" alt="" />
            <div>{{ $t("Bet.Payout") }}</div>
          </div>
          <div class="bottom">{{ itemInfo.winRatio }}</div>
        </div>
        <div class="amount item">
          <div class="top">
            <img src="./img/icon_profit.png" alt="" />
            <div>Profit</div>
          </div>
          <div class="bottom">{{ itemInfo.winMoney }}</div>
        </div>
      </div>
      <div class="result">{{ $t("Bet.Result") }}</div>
      <div class="resultBox">
        <div class="resultItem"></div>
        <div class="resultItem">
          <!-- <img src="./img/winning.png" alt="" > -->
          <img v-for="(item, index) in list" :key="index" :src="item" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { timeTransForms } from "@/components/Originals/Utils/utils.js";
export default {
  name: "",
  props: ["itemInfo", "dialogShow"],
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  beforeMount() {},
  destroyed() {},
  mounted() {
    let position = JSON.parse(this.itemInfo.progress).number || [];
    this.list = Array(25).fill(require("./img/square1.png"));
    position.forEach(
      (index) => (this.list[index - 1] = require("./img/winning.png"))
    );
  },
  methods: {
    dialogClose() {
      this.$emit("update:dialogShow", false);
    },
    getTime(time) {
      return timeTransForms(time);
    },
    imgFuc() {},
  },

  watch: {
    itemInfo() {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
.classplanA {
  ::v-deep .el-dialog {
    margin-top: 8vh !important;
    height: 850px;
    width: 500px;
  }
}

::v-deep .el-icon-close {
  margin-top: 10px;
  font-size: 20px;
}
::v-deep .el-dialog {
  margin-top: 5vh !important;
  height: 854px;
  width: 400px;
  border-radius: 15px;
  background-color: #293b4a;
}
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  height: 900px;
  background-color: #121b23;
  box-sizing: border-box;
  padding: 0;
  // padding: 50px 60px 50px 50px;
  .header {
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    background-color: #293b4a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    color: white;
    font-size: 20px;
  }
  .isWin {
    margin-top: 20px;
    margin-left: 20px;
    text-align: left;
    img {
      width: 93px;
      height: 91px;
    }
  }
  .userInfo {
    width: 100%;
    margin-top: -50px;
    .userImg {
      img {
        width: 56px;
        height: 56px;
      }
    }
    .userName {
      color: white;
      font-size: 17px;
      line-height: 30px;
    }
    .maxUserId {
      color: #496275;
      font-size: 16px;
    }
    .time {
      color: #496275;
      font-size: 14px;
    }
  }
  .recordItem {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 135px;
      height: 70px;
      background-color: #1f2d38;
      border: 1.5px solid #374c5b;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 21px;
          height: 18px;
        }
        div {
          margin-left: 5px;
          color: #496275;
          font-size: 14px;
        }
      }
      .bottom {
        margin-top: 10px;
        color: #496275;
        font-size: 14px;
      }
    }
  }
  .result {
    margin: 0px 0px 15px 20px;
    text-align: left;
    color: white;
    font-size: 18px;
  }
  .resultBox {
    width: 460px;
    padding: 10px;
    margin: 0 auto;
    background-color: #0d161c;
    border: 2px solid #212f3b;
    .resultItem {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      img {
        margin: 5px;
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
    }
  }
}
</style>
