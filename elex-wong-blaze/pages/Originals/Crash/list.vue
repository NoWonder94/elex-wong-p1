<template>
  <div class="listContainer">
    <div class="tableHeader">
      <div class="width1 title1">{{ $tt("home.Player") }}</div>
      <div class="width2">{{ $tt("Bet.Cashout") }}</div>
      <div class="width3">{{ $tt("Bet.Amount") }}</div>
      <div class="width4 title4">{{ $tt("Bet.Profit") }}</div>
    </div>
    <div class="tableContent">
      <div
        class="tableTr"
        :class="moreType == 1 ? 'moreHeightInfo' : 'lessHeightInfo'"
      >
        <div class="tableItem" v-for="(item, index) in recordList" :key="index">
          <div class="width1 player">
            <img :src="item.userAvatar | imgchange" />
            <!-- <div class="text1">{{ item.nick }}</div> -->
            <div class="text1">{{ nameFormat(item.userName) }}</div>
          </div>
          <div
            class="width2 text2"
            :style="{ color: item.cashOut == 'bang' ? '#ED6300' : '' }"
          >
            {{ item.cashOut ? item.cashOut : $tt("Bet.Betting") }}
          </div>
          <div class="width3 amount">
            <img class="amount-image" :src="item.icon" alt="" />
            <div class="text1">{{ item.betMoney | capitalizes }}</div>
          </div>
          <div class="width4 text2 title4">
            <img v-if="item.winMony" :src="item.icon" alt="" />
            <span v-if="item.winMony" style="color: rgb(67, 179, 9)">{{
              item.winMony | capitalizes
            }}</span>
            <span v-if="!item.winMony">{{ $tt("Bet.Betting") }}</span>
          </div>
        </div>
      </div>
      <div class="bottomInfo">
        <div class="playerNum">
          <div class="littleCirle"></div>
          <div class="textInfo">
            {{ winList.length }}/{{ recordList.length }}
            {{ $tt("home.Player") }}
          </div>
        </div>
        <div class="showBtn">
          <div v-if="moreType == 2" @click="showDataInfo(1)">
            Show more <i class="el-icon-arrow-down"></i>
          </div>
          <div v-else @click="showDataInfo(2)">
            Show less<i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["normalList", "winList"],
  data() {
    return {
      recordList: [],
      moreType: 2, //默认显示得少
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    showDataInfo(data) {
      this.moreType = data;
    },
    imgchange(data) {
      // console.log(data, '--------------');
      if (data) {
        let avatarArr = "'01','02','03','04','05','06'";
        if (avatarArr.indexOf(data) >= 0) {
          data = require(`@/assets/img/mine/${data}.png`);
        }
        return data;
      } else {
        return require("@/assets/img/mine/01.png");
      }
    },
    nameFormat(name) {
      let templateName;
      if (name && name.length > 6) {
        templateName = name.substring(0, 6) + "...";
      } else {
        templateName = name;
      }
      return templateName;
    },
  },
  watch: {
    normalList(value) {
      // console.log("下注信息更新了", value);
      this.recordList = value;
    },
  },
};
</script>
<style lang="scss" scoped>
.listContainer {
  padding: 0px 10px;

  .tableHeader {
    height: 60px;
    line-height: 60px;
    color: rgba(153, 164, 176, 0.6);
    font-size: 14px;
    display: flex;
    align-items: center;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 15px;
    }
  }

  .tableContent {
    height: 880px;

    .moreHeightInfo {
      overflow-y: scroll;
    }

    .lessHeightInfo {
      overflow: hidden;
    }

    .tableTr {
      height: 750px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        height: 725px;
      }

      .tableItem {
        display: flex;
        align-items: center;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 15px;
        }

        .text1 {
          color: white;
          line-height: 48px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .text2 {
          color: rgba(153, 164, 176, 0.6);
        }

        .player {
          display: flex;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
            border-radius: 100%;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              width: 30px;
              height: 30px;
            }
          }

          div {
            margin-left: 5px;
          }
        }

        .amount {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px;
            height: 16px;
            border-radius: 100%;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              width: 30px;
              height: 30px;
            }
          }

          div {
            margin-left: 5px;
          }
        }
      }
    }
  }

  .title1 {
    text-align: left;
  }

  .title4 {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      border-radius: 100%;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 30px;
        height: 30px;
      }
    }
  }

  .width1 {
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 150px;
    }
  }

  .width2 {
    width: 100px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 140px;
    }
  }

  .width3 {
    width: 150px;

    img {
      width: 100%;
    }

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 180px;
    }
  }

  .width4 {
    width: 150px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 180px;
    }
  }

  .bottomInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .playerNum {
      display: flex;
      align-items: center;

      .littleCirle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: chartreuse;
      }

      .textInfo {
        color: rgba(153, 164, 176, 0.6);
        margin-left: 8px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 15px;
        }
      }
    }

    .showBtn {
      width: 130px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: #23272c;
      border-radius: 15px;
      color: rgba(153, 164, 176, 0.8);

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 150px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
      }

      i {
        margin-left: 10px;
      }
    }
  }
}
</style>
