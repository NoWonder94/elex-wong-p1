<template>
  <div class="classic">
    <div v-if="tableIndex === 0" class="manualContiner">
      <div
        class="operateBtn bet"
        style="display: flex; flex-direction: column"
        @click="cashOut"
        v-if="status == 2 && isBet && isLogin && nowMoney > 0"
      >
        <div class="cashOutInfo">
          {{ currencyName }} {{ nowMoney }}
          <div class="cashoutText">{{ $tt("Bet.Cashout") }}</div>
        </div>
      </div>
      <div
        class="operateBtn bet loadingStyle"
        v-if="status == 2 && isBet && isLogin && nowMoney == 0"
      >
        <div>{{ $tt("Bet.Loading") }}</div>
      </div>
      <div class="operateBtn bet" v-if="status == 3 && isBet">
        <span>{{ $tt("Bet.WaitingNext") }}</span>
      </div>
      <div
        class="operateBtn bet"
        :class="{ disabled: disabled }"
        v-if="!isBet"
        @click="startGame"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="cashOutInfo" :class="{ singleBet: status != 2 }">
          {{ $tt("Bet.Bet") }}
        </div>
        <div class="cashoutText" v-if="status == 2">
          {{ $tt("Bet.NextRound") }}
        </div>
      </div>
      <!-- 点击bet后，在进入倒计时前，都可以取消下注，进入倒计时后就不能取消了 -->
      <div
        class="operateBtn bet loadingStyle"
        v-if="status == 1 && isBet"
        @click="cancelBet"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <!-- <div class="cashOutInfo">{{ $tt("Bet.Loading") }}</div> -->
        <div class="cashoutText">{{ $tt("Cancel") }}</div>
      </div>
      <div class="operateBtn bet loadingStyle" v-if="status == 4 && isBet">
        <div>{{ $tt("Bet.Loading") }}</div>
      </div>
      <div class="betInfo">
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.Amount") }}</span>
            <span>{{ USDBetMoney.toFixed(6) }} USD</span>
            <!-- <span>0.00000 USD</span> -->
          </div>
          <div class="amountInput">
            <img :src="coinImg" alt="" />
            <input
              type="number"
              pattern="\d*"
              v-model.trim="betMoney"
              class="input-item"
              @change="changeSilderVal"
            />
            <div class="amount-end">
              <button class="first-button" @click="handledivisionAmount('0.5')">
                /2
              </button>
              <button class="scend-button" @click="handledivisionAmount('2')">
                x2
              </button>
              <div class="fix_layer" v-show="isSlider">
                <button @click="sliderCheng(sliderMin)" class="min_btn">
                  {{ $tt("WALLET.Min") }}
                </button>
                <div class="ui_slider">
                  <el-slider
                    :show-tooltip="false"
                    :min="sliderMin"
                    :max="sliderMax"
                    :step="0.000001"
                    v-model="moneyValue"
                    @change="sliderCheng"
                    :format-tooltip="formatTooltip"
                  ></el-slider>
                </div>
                <button @click="sliderCheng(sliderMax)" class="max_btn">
                  {{ $tt("WALLET.Max") }}
                </button>
              </div>
              <div class="switch" @click.stop="showSlider">
                <i class="el-icon-arrow-up"></i>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.AutoCashout") }}</span>
            <span>
              {{ $tt("Bet.Chance")
              }}<span style="color: #f12c4c; margin-left: 10px"
                >{{ oddsChance }}%</span
              >
            </span>
          </div>
          <div class="amountInput">
            <!-- <img :src="coinImg" alt="" /> -->
            <input
              type="number"
              pattern="\d*"
              @change="setDefalute"
              v-model="odds"
              class="input-item mobileInput1"
              @blur="myFunction"
            />
            <div class="xIcon">X</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 1" class="advancedContainer">
      <div class="content">
        <div class="line1">
          <div
            class="amount operateBtn bet"
            @click="handleAdvanceAuto()"
            v-show="!isStop"
          >
            {{ $tt("Bet.Bet") }}
          </div>
          <div
            class="amount operateBtn1 bet"
            @click="stopAuto()"
            v-show="isStop"
          >
            {{ $tt("Bet.BetStop") }}
          </div>
        </div>
        <div :class="isDisabled ? 'click-disable' : ''">
          <div class="line1">
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.AutoCashout") }}</span>
                <span
                  >Chance
                  <span style="color: #f12c4c; margin-left: 10px">{{
                    oddsChance1
                  }}</span>
                </span>
                <!-- <span>Chance <span style="color: #5ddb1c">0.99</span> </span> -->
              </div>
              <div class="amountInput">
                <img :src="coinImg" alt="" />
                <input
                  type="number"
                  pattern="\d*"
                  v-model="odds1"
                  @change="setDefaluteAuto"
                  class="input-item mobileInput1"
                />
                <div class="xIcon">X</div>
              </div>
            </div>
          </div>
          <div class="line1">
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.Amount") }}</span>
                <!-- <span>0.00000</span> -->
                <!-- <span>{{ USDAmount.toFixed(6) }} {{$tt("Bet.USD")}}</span> -->
              </div>
              <div class="input">
                <img :src="coinImg" alt="" />
                <input
                  type="number"
                  pattern="\d*"
                  v-model.trim="betMoney"
                  class="input-item"
                  @blur="changeSilderVal"
                />
                <div class="amount-end">
                  <button
                    class="first-button"
                    @click="handledivisionAmount('0.5')"
                  >
                    /2
                  </button>
                  <button
                    class="scend-button"
                    @click="handledivisionAmount('2')"
                  >
                    x2
                  </button>
                  <div class="fix_layer" v-show="isSlider">
                    <button @click="sliderCheng(sliderMin)" class="min_btn">
                      {{ $tt("WALLET.Min") }}
                    </button>
                    <div class="ui_slider">
                      <el-slider
                        :show-tooltip="false"
                        :min="sliderMin"
                        :max="sliderMax"
                        :step="0.000001"
                        v-model="moneyValue"
                        @change="sliderCheng"
                        :format-tooltip="formatTooltip"
                      ></el-slider>
                    </div>
                    <button @click="sliderCheng(sliderMax)" class="max_btn">
                      {{ $tt("WALLET.Max") }}
                    </button>
                  </div>
                  <div class="switch" @click.stop="showSlider">
                    <i class="el-icon-arrow-up"></i>
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.NumberofBets") }}</span>
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input">
                <img :src="coinImg" alt="" />
                <input pattern="\d*" v-model="betsNumber" class="input-item" />
                <div class="amount-end">
                  <button class="first-button" @click="handledBetNum('∞')">
                    ∞
                  </button>
                  <button class="scend-button" @click="handledBetNum(10)">
                    10
                  </button>
                  <div class="switch" @click="handledBetNum(100)">100</div>
                </div>
              </div>
            </div>
          </div>
          <div class="line1">
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.OnWin") }}</span>
                <span>{{ USDOnWin.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input">
                <!-- <el-switch
                  v-model="switchWin"
                  active-color="#ff4949"
                  inactive-color="#43B309"
                  :active-text="Increase"
                  :inactive-text="Reaset"
                >
                </el-switch> -->
                <div class="i1m0gsbl">
                  <div class="els-switch">
                    <el-switch
                      v-model="switchWin"
                      active-color="#ff4949"
                      inactive-color="#43B309"
                    >
                    </el-switch>
                  </div>
                  <div
                    class="reset"
                    :class="{ resetindex: switchWin == false }"
                  >
                    {{ $tt("Bet.Reset") }}
                  </div>
                  <div
                    class="increse"
                    :class="{ increseindex: switchWin == true }"
                  >
                    {{ $tt("Bet.IncreaseBy") }}
                  </div>
                </div>
                <input
                  type="number"
                  pattern="\d*"
                  :disabled="!switchWin ? true : false"
                  v-model="onWin"
                  class="input-item"
                />
                <div style="font-weight: 700; color: #43b309">%</div>
              </div>
            </div>
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.Onlose") }}</span>
                <!-- <span>{{ USDOnLose.toFixed(6) }} {{$tt("Bet.USD")}}</span> -->
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input">
                <!-- <el-switch
                  v-model="switchLose"
                  active-color="#ff4949"
                  inactive-color="#43B309"
                  :active-text="Increase"
                  :inactive-text="Reaset"
                >
                </el-switch> -->
                <div class="i1m0gsbl">
                  <div class="els-switch">
                    <el-switch
                      v-model="switchLose"
                      active-color="#ff4949"
                      inactive-color="#43B309"
                    >
                    </el-switch>
                  </div>
                  <div
                    class="reset"
                    :class="{ resetindex: switchLose == false }"
                  >
                    {{ $tt("Bet.Reset") }}
                  </div>
                  <div
                    class="increse"
                    :class="{ increseindex: switchLose == true }"
                  >
                    {{ $tt("Bet.IncreaseBy") }}
                  </div>
                </div>
                <input
                  type="number"
                  pattern="\d*"
                  :disabled="!switchLose ? true : false"
                  v-model="onLose"
                  class="input-item"
                />
                <div style="font-weight: 700; color: #43b309">%</div>
              </div>
            </div>
          </div>
          <div class="line1">
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.StopOnWin") }}</span>
                <span>{{ USDStopWin.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
                <!-- <span>0 USD</span> -->
              </div>
              <div class="input">
                <img :src="coinImg" alt="" />
                <input
                  style="width: 100%"
                  type="number"
                  pattern="\d*"
                  v-model="stopWin"
                  class="input-item"
                />
              </div>
            </div>
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.StopOnLose") }}</span>
                <span>{{ USDStopLose.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
                <!-- <span>0 USD</span> -->
              </div>
              <div class="input">
                <img :src="coinImg" alt="" />
                <input
                  style="width: 100%"
                  type="number"
                  pattern="\d*"
                  v-model="stopLose"
                  class="input-item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <div class="tabContainer">
        <div
          v-for="(item, index) in automaticGame == 1 ? tablist : tablist1"
          :key="index"
          :class="tableIndex === index ? 'tabs-active' : 'tabs-now'"
          @click="handleTabs(index)"
        >
          {{ item }}
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { handle9Number } from "@/utils";
export default {
  name: "Classic",
  props: ["status", "isBet", "oddsNum", "isStop", "isStopMoney", "isDisabled"],
  data() {
    let t = this;
    return {
      automaticGame: "",
      disabled: false,
      tablist: [t.$tt("Bet.Manual"), t.$tt("Bet.Auto")],
      tablist1: [t.$tt("Bet.Manual")],
      tableIndex: 0,
      betMoney: (1).toFixed(6),
      odds: "1.98", //倍率
      odds1: "1.98", //倍率
      oddsChance: "",
      oddsChance1: "",
      coinImg: "3333",
      money: "",
      advanceAutoForm: {},
      switchWin: false,
      switchLose: false,
      betsNumber: "∞",
      onWin: 0,
      onLose: 0,
      stopWin: 0,
      stopLose: 0,
      playId: null,
      nowbetMoney: 0,
      isLogin: false,
      USDexchangeRate: 1,
      isSlider: false,
      moneyValue: 0,
      sliderMax: 10000,
      sliderMin: 0,
      isSlider: false,
      currencyName: "USD",
      Increase: t.$tt("Bet.IncreaseBy"),
      Reaset: t.$tt("Bet.Reset"),
    };
  },
  components: {},
  computed: {
    ...mapGetters(["getCoin", "getIsLogin"]),
    ...mapState(["user_coin"]),
    USDBetMoney() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.betMoney) / this.USDexchangeRate
        );
      }
      return 0;
    },
    USDStopWin() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.stopWin) / this.USDexchangeRate
        );
      }
      return 0;
    },
    USDStopLose() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.stopLose) / this.USDexchangeRate
        );
      }
      return 0;
    },
    nowMoney() {
      if (this.status == 2 && !this.isStopMoney) {
        return (this.oddsNum * this.nowbetMoney).toFixed(4);
      } else if (this.isStopMoney) {
        return 0;
      }
      return 0;
    },
  },
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        this.tablist = [this.$tt("Bet.Manual"), this.$tt("Bet.Auto")];
        (this.Increase = this.$tt("Bet.IncreaseBy")),
          (this.Reaset = this.$tt("Bet.Reset"));
        this.$forceUpdate();
      }
    },
    getCoin: {
      handler(val, oldValue) {
        this.coinImg = val.icon;
        if (val.currencyId) {
          this.currencyId = val.currencyId;
          this.coinImg = val.icon;
          if (val.currencyName) {
            this.currencyName = val.currencyName;
          }
          this.currencyId = val.currencyId;
          let obj = this.BetSection(this.$route.query.playId, val.currencyId);
          if (obj != undefined && obj != null) {
            if (val && oldValue && val.currencyId != oldValue.currencyId) {
              this.betMoney = obj.minValue;
            }
            if (!oldValue) {
              this.betMoney = obj.minValue;
            }
            if (obj) {
              this.betSection = obj;
              this.sliderMax = obj.maxValue;
              this.sliderMin = obj.minValue;
              this.changeSilderVal();
            }
          }
        }
      },
      immediate: true,
      deep: true,
    },
    // betMoney: {
    //   handler(val) {
    //     if (val) {
    //       this.changeSilderVal();
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    getIsLogin: {
      handler(val) {
        if (val) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
        // console.log(this.isLogin, 'this.isLogin')
      },
      immediate: true,
      deep: true,
    },
    user_coin: {
      handler(val) {
        let userMoney = 0;
        if (localStorage.getItem("userInfo")) {
          userMoney = val.money;
        }
        if (
          this.betMoney > Number(userMoney) &&
          localStorage.getItem("userInfo")
        ) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      immediate: true,
    },
    odds1: {
      handler(val) {
        this.oddsChance1 = val ? this.getFloat((1.0102 * 98) / val, 2) : 0;
      },
      immediate: true,
    },
    odds: {
      handler(val) {
        this.oddsChance = val ? this.getFloat((1.0102 * 98) / val, 2) : 0;
      },
      immediate: true,
    },
  },
  mounted() {
    this.automaticGame = this.$route.query.automaticGame;
    if (this.$route.query.playId) {
      this.playId = this.$route.query.playId;
    }
    this.channelId = localStorage.getItem("channelId");
    if (this.getCoin) {
      this.currencyId = this.getCoin.currencyId;
    }
  },
  created() {
    document.addEventListener("click", (e) => {
      let box = document.querySelector(".fix_layer");
      if (box && !box.contains(e.target)) {
        this.isSlider = false;
      }
    });
  },
  methods: {
    setDefalute() {
      if (!this.odds) {
        this.odds = "1.01";
      }
    },
    setDefaluteAuto() {
      if (!this.odds1) {
        this.odds1 = "1.01";
      }
    },
    myFunction() {
      if (this.odds < 1.01) {
        this.odds = 1.01;
      }
    },
    changeSilderVal() {
      if (this.betMoney < this.sliderMin) {
        this.betMoney = this.sliderMin;
      } else if (this.betMoney > this.sliderMax) {
        this.betMoney = this.sliderMax;
      }
      this.moneyValue = Number(this.betMoney);
      // console.log(this.moneyValue, 'this.moneyValue')
      this.betMoney = handle9Number(this.betMoney);
      // this.moneyValue = Number(this.betMoney) * 100000;
    },
    formatTooltip(val) {
      if (val == 0) {
        this.betMoney = handle9Number(
          this.betSection && this.betSection.minValue
        );
      } else {
        this.betMoney = handle9Number(val);
      }
    },
    sliderCheng(val) {
      this.moneyValue = val;
      if (val == 0) {
        this.betMoney = this.betSection.minValue;
      } else {
        this.betMoney = val;
      }
      this.betMoney = handle9Number(this.betMoney);
      // this.isSlider = true;
    },
    showSlider() {
      this.isSlider = true;
    },
    startGame() {
      if (this.disabled) {
        return;
      }
      // this.oddsNum = 0
      this.nowbetMoney = this.betMoney;
      let reqData = {
        odds: this.odds,
        betMoney: this.betMoney,
      };
      this.$emit("startGame", reqData);
    },
    cashOut() {
      this.$emit("cashOut");
    },
    cancelBet() {
      this.$emit("cancelBet");
    },
    handleAdvanceAuto() {
      let type = 0;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      let params = {
        channelId: Number(this.channelId),
        status: 0,
        currencyId: this.currencyId,
        userId: Number(id),
        lossAmountPlus: !this.switchLose ? -1 : Number(this.onLose) || -1,
        winAmountPlus: !this.switchWin ? -1 : Number(this.onWin) || -1,
        quantity: this.betsNumber == "∞" ? -1 : Number(this.betsNumber),
        money: this.betMoney,
        number: this.odds1.toString(),
        playId: Number(this.playId),
        stopWin: this.stopWin === 0 ? -1 : this.stopWin,
        stopLoss: this.stopLose === 0 ? -1 : this.stopLose,
        remark: type.toString(),
      };
      this.$emit("trenBetClick", params);
    },
    stopAuto() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";

      let params = {
        channelId: Number(this.channelId),
        userId: Number(id),
        playId: Number(this.playId),
      };
      this.$emit("stopAuto", params);
    },
    handleTabs(index) {
      this.tableIndex = index;
    },

    handledivision() {
      this.betMoney = Number(this.betMoney) / 2;
    },
    handlemultiplication() {
      this.betMoney = Number(this.betMoney) * 2;
    },

    handledivisionAmount(val) {
      // console.log(this.betSection);
      if (val == "0.5") {
        if (
          parseFloat(this.betMoney) * parseFloat(val) >=
          this.betSection.minValue
        ) {
          this.betMoney = parseFloat(this.betMoney) * parseFloat(val);
        } else {
          this.betMoney = this.betSection.minValue;
        }
      } else {
        if (
          parseFloat(this.betMoney) * parseFloat(val) <=
          this.betSection.maxValue
        ) {
          this.betMoney = parseFloat(this.betMoney) * parseFloat(val);
        } else {
          this.betMoney = this.betSection.maxValue;
        }
      }
    },
    handledBetNum(type) {
      this.betsNumber = type;
    },
    // handledivisionBetsUp() {
    //   if (this.betsNumber >= 0) {
    //     this.betsNumber = Number(this.betsNumber) + 1;
    //   }
    // },
    // handlemultiplicationBetsDown() {
    //   if (this.betsNumber > 1) {
    //     this.betsNumber = Number(this.betsNumber) - 1;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.disabled {
  opacity: 0.3;
}

::v-deep .el-switch__core  {
  width: 35px !important;
}

.els-switch {
  transform: rotateZ(90deg);
  position: absolute;
  width: 35px;
  height: 28px;
  left: 8px;
  top: 4px;

  @media screen and (min-device-width: 160px) and (max-width: 899px) {
      ::v-deep .el-switch__core {
      width: 40px !important;
      height: 22px;
    }

    top: 11px;
  }
}

.classic {
  width: 100%;

  .amount {
    width: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      margin-top: 0px;
    }

    .header {
      margin: 0px 18px 6px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #99a4b099;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 16px;
        margin: 30px 0px 0px 0px;
      }
    }
  }

  .amountInput {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: #222328;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 15px !important;
      margin: 10px 0px 0px 0px;
      height: 50px;
      border-radius: 50px;
    }

    img {
      width: 20px;
      height: 20px;
      margin-left: 20px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 20px;
        height: 20px;
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
        width: 100%;
        height: 50px;
        font-size: 15px;
        border-radius: 30px;
      }
    }

    .mobileInput1 {
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 573px;
        height: 50px;
        font-size: 15px;
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
      position: relative;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        // width: 50%;
        // margin-left: -50px;
        margin-right: 10px;
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
          font-size: 15px;
          height: 30px;
          width: 68px;
          font-size: 15px;
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
          font-size: 15px;
          height: 30px;
          width: 68px;
          font-size: 15px;
        }
      }

      .switch {
        width: 42px;
        height: 36px;
        margin: 0 auto;
        text-align: center;
        background-color: #31343c;
        color: #99a4b0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        cursor: pointer;
        font-family: "Montserrat-Medium";
        border-radius: 0px 16px 16px 0px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 68px;
          height: 30px;
          border-radius: 0px 40px 40px 0px;
        }
      }
    }

    .xIcon {
      color: #f12c4c;
      padding-right: 10px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 25px;
        padding-right: 20px;
      }
    }
  }

  .line1 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
      width: 95%;
    }
  }

  .input {
    width: 288px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: #222328;
    padding-left: 0 10px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 20px;
      margin: 30px 0px 0px 0px;
      height: 80px;
      border-radius: 50px;
      width: 100%;
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
  }

  .input-item {
    width: 110px;
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
      width: 238px;
    }
  }

  .amount-end {
    position: relative;
    width: 134px;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

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
        height: 60px;
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
        height: 60px;
        width: 68px;
      }
    }

    .fix_layer {
      position: absolute;
      right: 0;
      top: 44px;
      // z-index: 122;
      width: 200px;
      height: 40px;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-radius: 10px;
      background-color: #212328;
      overflow: hidden;
      box-shadow: 1px 0 7px rgba(0, 0, 0, 0.15);

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        min-width: 50px;
      }

      .min_btn {
        height: 100%;
        width: 40px;
        color: rgba(153, 164, 176, 0.8);
        flex: none;
        font-size: 14px;
        border: none;
        background-color: rgba(60, 64, 75, 0.5);
      }

      .ui_slider {
        flex: 1;
        height: 100%;
        display: flex;
        overflow: hidden;
        box-sizing: content-box;
        padding: 0 12px;
        cursor: pointer;

        .el-slider {
          width: 100%;
        }
      }
      .max_btn {
        height: 100%;
        width: 40px;
        color: rgba(153, 164, 176, 0.8);
        flex: none;
        font-size: 14px;
        border: none;
        background-color: rgba(60, 64, 75, 0.5);
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
        height: 60px;
        width: 68px;
        border-radius: 0px 40px 40px 0px;
      }
    }
  }

  .tabContainer {
    height: 60px;
    line-height: 60px;
    display: flex;
    color: rgba(153, 164, 176, 0.8);
    border-top: 1px solid rgba(153, 164, 176, 0.1);
    border-bottom: 1px solid rgba(153, 164, 176, 0.1);

    // border-radius: 22px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      margin-top: 30px;
      height: 70px;
      line-height: 70px;
      font-size: 28px;
    }

    cursor: pointer;
    margin-top: 15px;

    .tabs-now {
      width: 50%;
      color: #99a4b099;
    }

    .tabs-active {
      color: white;
      width: 50%;
      text-align: center;
      border-bottom: 2px solid #cc2843;
      background-image: linear-gradient(to top, #cc2843, #7bc51400 50%);
    }
  }

  .operateBtn {
    &:active {
      transform: scale(0.95, 0.95);
    }
    text-align: center;
    width: 310px;
    margin: 0px auto;
    margin-top: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #f5f6f7;
    background-image: conic-gradient(from 1turn, #cc2843, #f12c4c);

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 80vw;
      margin-top: 20px;
      line-height: 20px;
      font-size: 18px;
      border-radius: 60px;
    }
  }

  .loadingStyle {
    padding: 10px 0px;
    text-align: center;
    background-color: #f5ba1e;
    background-image: conic-gradient(from 1turn, #f2a215, #f5ba1e);
  }

  .cashOutInfo {
    line-height: 28px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      line-height: 33px;
    }
  }

  .cashoutText {
    cursor: pointer;
    line-height: 27px;
    margin-bottom: 5px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      line-height: 25px;
    }
  }

  .singleBet {
    line-height: 60px;
  }

  .operateBtn1 {
    width: 310px;
    margin: 10px auto;
    height: 62px;
    line-height: 60px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #f5f6f7;
    background-color: rgba(255, 69, 0, 1);
    background-image: conic-gradient(
      from 1turn,
      rgba(255, 69, 0, 1),
      rgba(255, 69, 0, 0.47)
    );

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 75%;
      border-radius: 60px;
      height: 100px;
      line-height: 100px;
      font-size: 30px;
    }
  }

  .manualContiner {
    position: relative;
    margin: 0 auto;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      position: relative;
      width: 100%;
      height: auto;
    }

    .betInfo {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 100%;
        display: block;
        padding: 0px 20px;
      }

      .header {
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 18px;
        }
      }
    }
  }

  .advancedContainer {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      height: auto;
      width: 100%;
    }

    .content {
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: flex;
        flex-direction: column-reverse;
        height: auto;
      }
    }

    .betInfo {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  }
}

.i1m0gsbl {
  --1waic39: #99a4b0;
  --1rtdyxb: #fff;
  --1yquyvq: #31343c;
  -webkit-order: -1;
  -ms-flex-order: -1;
  order: -1;
  position: relative;
  padding-left: 43px;
  margin-left: 10px;
  margin-right: 22px;
  width: 130px;
  height: 36px;
  border-radius: 18px;
  background: var(--1yquyvq);
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;

  .reset {
    color: var(--1waic39);
    padding: 0 0 4px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    height: 14px;
  }

  .increse {
    color: var(--1waic39);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    height: 14px;
  }

  .resetindex {
    color: teal;
  }

  .increseindex {
    color: teal;
  }

  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    height: 55px;
    width: 150px;
  }
}
</style>
