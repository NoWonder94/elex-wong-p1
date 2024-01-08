<template>
  <div class="classic">
    <div v-if="tableIndex === 0" class="advancedContainer">
      <div class="operateBtn">Cash Out</div>
      <div class="line1">
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.Bet") }}</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>base payout</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
      </div>
      <div class="line1">
        <div class="amount">
          <div class="header">
            <span>stop on win</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>stop on lose</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
      </div>
      <div class="line1">
        <div class="amount">
          <div class="header">
            <span>On Lose</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>On Win</span>
          </div>
          <div class="amountInput">
            <input type="text" v-model="money" class="input-item" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 1" class="manualContiner">
      <div class="operateBtn bet">Bet</div>
      <div class="betInfo">
        <div class="amount">
          <div class="header">
            <span>Amount</span>
            <span>0.00000 USD</span>
          </div>
          <div class="amountInput">
            <img :src="coinImg" alt="" />
            <input type="text" v-model="money" class="input-item" />
            <div class="amount-end">
              <button class="first-button" @click="handledivision">/2</button>
              <button class="scend-button" @click="handlemultiplication">
                x2
              </button>
              <div class="switch">
                <i class="el-icon-arrow-up"></i>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>Auto cash out</span>
            <span>Chance <span style="color: #5ddb1c">0.99</span> </span>
          </div>
          <div class="amountInput">
            <img :src="coinImg" alt="" />
            <input type="text" v-model="money" class="input-item" />
            <div class="xIcon">X</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabContainer">
      <div
        v-for="(item, index) in tablist"
        :key="index"
        :class="tableIndex === index ? 'tabs-active' : 'tabs-now'"
        @click="handleTabs(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "classic",
  props: [""],
  data() {
    return {
      tablist: ["Advanced", "Manual"],
      tableIndex: 1,
      money: "",
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleTabs(index) {
      this.tableIndex = index;
    },
    handledivision() {
      this.money = this.money / 2;
    },
    handlemultiplication() {
      this.money = this.money * 2;
    },
  },

  watch: {},
};
</script>
<style lang="scss" scoped>
.classic {
  width: 100%;
  .amount {
    width: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      // padding: 0px 10px;
    }
    .header {
      margin: 0px 18px 6px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #99a4b099;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 25px;
        margin: 30px 0px 0px 0px;
      }
    }
  }
  .amountInput {
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: #222328;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 20px;
      margin: 30px 0px 0px 0px;
      height: 80px;
      border-radius: 50px;
    }
    img {
      width: 20px;
      height: 20px;
      margin-left: 20px;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 40px;
        height: 40px;
      }
    }
    .input-item {
      width: 250px;
      font-size: 16px;
      font-weight: 700;
      padding: 0px 8px;
      box-sizing: border-box;
      text-indent: 10px;
      border: none;
      outline: none;
      background-color: #222328;
      border-radius: 22px;
      color: #f5f6f7;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 20px;
        height: 80px;
        border-radius: 30px;
      }
    }
    .amount-end {
      width: 134px;
      height: 40px;
      margin-left: -118px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        margin-left: 165px;
        width: 210px;
      }
      .first-button {
        &:active {
          transform: scale(0.95, 0.95);
        }
        width: 42px;
        height: 38px;
        border: none;
        background-color: #31343c;
        color: #99a4b0;
        cursor: pointer;
        font-family: "Montserrat-Medium";
        border-radius: 20px 0px 0px 20px;
        &:hover {
          background-color: #3c404a;
        }
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 23px;
          height: 57px;
          width: 68px;
          border-radius: 40px 0px 0px 40px;
        }
      }
      .scend-button {
        &:active {
          transform: scale(0.95, 0.95);
        }
        width: 42px;
        height: 36px;
        border: none;
        background-color: #31343c;
        color: #99a4b0;
        cursor: pointer;
        font-family: "Montserrat-Medium";
        &:hover {
          background-color: #3c404a;
        }
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 23px;
          height: 57px;
          width: 68px;
        }
      }
      .switch {
        width: 42px;
        height: 36px;
        background-color: #31343c;
        color: #99a4b0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        cursor: pointer;
        font-family: "Montserrat-Medium";
        border-radius: 0px 16px 16px 0px;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          height: 57px;
          width: 68px;
          border-radius: 0px 40px 40px 0px;
        }
      }
    }
    .xIcon {
      color: #43b309;
      padding-right: 10px;
    }
  }
  .tabContainer {
    height: 60px;
    line-height: 60px;
    display: flex;
    color: rgba(153, 164, 176, 0.8);
    // border:1px solid rgba(153,164,176,.6);
    cursor: pointer;
    margin-top: 15px;
    .tabs-now {
      width: 50%;
      color: #99a4b099;
    }
    .tabs-active {
      color: white;
      width: 50%;
      border-bottom: 2px solid #cc2843;
      background-image: linear-gradient(to top, #7bc5144d, #7bc51400 50%);
    }
  }
  .operateBtn {
    width: 310px;
    margin: 0 auto;
    height: 62px;
    line-height: 60px;
    border-radius: 30px;
    cursor: pointer;
    color: #f5f6f7;
    background-color: #cc2843;
    background-image: conic-gradient(from 1turn, #cc2843, #f12c4c);
    margin-top: 50px;
  }
  .manualContiner {
    margin: 0 auto;
    padding: 20px;
    .betInfo {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  }
  .advancedContainer {
    .line1 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
    }
  }
}
</style>
