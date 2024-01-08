<template>
  <div class="Rlist">
    <div class="titleInfo">
      <div class="shiba">
        <img src="./img/trenball_red.png" alt="" />
        <div class="shibaText">{{ $tt("Bet.RedShiba") }}</div>
      </div>
      <div class="VS">
        <img src="./img/knife.png" alt="" />
        <div>VS</div>
      </div>
      <div class="doge">
        <img src="./img/trenball_green.png" alt="" />
        <div>{{ $tt("Bet.GreenDoge") }}</div>
      </div>
    </div>
    <div class="borderLine">
      <div class="borderInfo leftBorderColor">
        <div class="text1">
          {{ $tt("home.Player") }}
          <span class="num">{{ type1List.length }}</span>
        </div>
        <div class="text1">
          <span>{{ $tt("Bet.BattlesWon") }} </span>
          <span class="num">{{ winList1.length }}</span>
        </div>
      </div>
      <div class="borderInfo rightBorderColor">
        <div class="text1">
          <span>{{ $tt("home.Player") }}</span>
          <span class="num">{{ type2List.length }}</span>
        </div>
        <div class="text1">
          {{ $tt("Bet.BattlesWon") }}
          <span class="num">{{ winList2.length }}</span>
        </div>
      </div>
    </div>
    <div class="head-wrap">
      <div class="tableHead padding1">
        <span>{{ $tt("home.Player") }}</span>
        <span>{{ $tt("Bet.Bet") }}</span>
      </div>
      <div class="tableHead padding2">
        <span class="padding3">{{ $tt("home.Player") }}</span>
        <span class="betRigth">{{ $tt("Bet.Bet") }}</span>
      </div>
    </div>
    <div class="tableContainer">
      <div class="shibaTable">
        <div class="trItem" v-for="(item, index) in type1List" :key="index">
          <div class="content textLeft">
            <img :src="item.img | imgchange" alt="" />
            <div
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ item.nick }}
            </div>
          </div>
          <div class="content textRight">
            <img :src="item.icon" alt="" />
            <div v-if="!item.isWin">{{ item.betMoney | capitalize }}</div>
            <div v-if="item.isWin == 1" style="color: rgb(67, 179, 9)">
              {{ item.betMoney | capitalize }}
            </div>
            <div v-if="item.isWin == 2" style="color: rgb(237, 99, 0)">
              {{ item.betMoney | capitalize }}
            </div>
          </div>
        </div>
      </div>
      <div class="dogeTable">
        <div class="trItem" v-for="(item, index) in type2List" :key="index">
          <div class="content textLeft">
            <div class="circle" v-if="item.type == 3"></div>
            <img :src="item.img | imgchange" alt="" />
            <div
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ item.nick }}
            </div>
          </div>
          <div class="content width2 textRight">
            <img :src="item.icon" alt="" />
            <div v-if="!item.isWin">{{ item.betMoney | capitalize }}</div>
            <div v-if="item.isWin == 1" style="color: rgb(67, 179, 9)">
              {{ item.betMoney | capitalize }}
            </div>
            <div v-if="item.isWin == 2" style="color: rgb(237, 99, 0)">
              {{ item.betMoney | capitalize }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["type1List", "type2List", "winList1", "winList2"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style lang="scss" scoped>
.Rlist {
  .textLeft {
    text-align: left;
  }
  .textRight {
    text-align: right;
  }
  .titleInfo {
    margin: 0 auto;
    width: 417px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 80%;
      font-size: 26px;
    }
    .shiba {
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 2px solid #ed6300;
        border-color: #ed6300;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 80px;
          height: 80px;
        }
      }
      .shibaText {
        font-weight: 700;
        font-size: 16px;
        color: #ed6300;
        margin-top: 10px;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 26px;
        }
      }
    }
    .VS {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        width: 70px;
        height: 36px;
        border-radius: 100%;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 100px;
          height: 60px;
        }
      }
      > div {
        color: white;
        font-weight: 700;
        font-size: 16px;
        margin-top: 26px;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 28px;
        }
      }
    }
    .doge {
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 2px solid #7bc514;
        border-color: #7bc514;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 80px;
          height: 80px;
        }
      }
      div {
        color: #7bc514;
        font-weight: 700;
        font-size: 16px;
        margin-top: 10px;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 26px;
        }
      }
    }
  }
  .borderLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 5px 0px;
    font-size: 12px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      padding: 0px 10px;
      font-size: 24px;
      margin: 10px 0px;
    }
    .borderInfo {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 10px;
      border-radius: 3px;
      width: 50%;
      justify-content: space-between;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 44%;
        padding: 10px 0px;
      }
    }
    .leftBorderColor {
      border-top: 2px solid #ed6300;
      background-image: linear-gradient(
        to bottom,
        rgba(237, 99, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
    }
    .num {
      color: #43b309;
      padding-top: 10px;
    }
    .text1 {
      color: rgba(95, 105, 117, 0.8);
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 26px;
        display: flex;
        flex-direction: column;
        padding-top: 20px;
      }
    }
    .rightBorderColor {
      margin-left: 10rem;
      border-top: 2px solid #43b309;
      background-image: linear-gradient(
        to bottom,
        rgba(93, 160, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
    }
  }
  .head-wrap {
    font-size: 14px;
    color: rgba(95, 105, 117, 0.8);
    border-bottom: 1px solid rgba(95, 105, 117, 0.2);
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      margin-top: 20px;
      font-size: 26px;
    }
    .tableHead {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .padding1 {
      padding-left: 15px;
      width: 45%;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        padding-left: 25px;
      }
    }
    .padding2 {
      width: 50%;
    }
    .betRigth {
      padding-right: 20px;
    }
    .padding3 {
      padding-left: 10px;
    }
  }
  .tableContainer {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding-right: 10px;
    width: 100%;
    .shibaTable {
      width: 49%;
    }
    .dogeTable {
      width: 49%;
    }
    .trItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 47px;
      line-height: 47px;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        height: 60px;
        line-height: 60px;
        font-size: 24px;
      }
      .content {
        display: flex;
        align-items: center;
        overflow: hidden;
        padding-left: 15px;
        // width: 140px;
        position: relative;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          // width: 172px;
        }
        .circle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: #e2b40b;
          top: 4px;
          left: 0px;
          border-radius: 100%;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 10px;
            height: 10px;
          }
        }
        img {
          width: 22px;
          height: 22px;
          border-radius: 100%;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 30px;
            height: 30px;
          }
        }
        div {
          color: white;
          font-weight: 600;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
