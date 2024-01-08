<template>
  <div class="trenBall">
    <div v-if="tableIndex === 0" class="auto">
      <div class="betInfo">
        <div class="amount amountWith">
          <div class="header">
            <span>{{ $tt("Bet.Amount") }}</span>
            <!-- <span>0.00000 {{$tt('Bet.USD')}}</span> -->
            <span>{{ USDBetMoney.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
          </div>
          <div class="autoInput">
            <img :src="coinImg" alt="" />
            <input
              pattern="\d*"
              v-model.trim="betMoney"
              class="input-item-auto"
              @change="changeSilderVal"
            />
            <div class="amount-end-auto">
              <button class="first-button" @click="handledivisionAmount('0.5')">
                /2
              </button>
              <button class="scend-button" @click="handledivisionAmount('2')">
                x2
              </button>
              <div class="fix_layer" v-show="isSlider">
                <button class="">{{ $tt("WALLET.Min") }}</button>
                <div class="ui_slider">
                  <el-slider
                    :show-tooltip="false"
                    :min="sliderMin"
                    :max="sliderMax"
                    v-model="moneyValue"
                    @change="sliderCheng"
                    :step="0.000001"
                    :format-tooltip="formatTooltip"
                  ></el-slider>
                </div>
                <button class="">{{ $tt("WALLET.Max") }}</button>
              </div>
              <div class="switch" @click.stop="showSlider">
                <i class="el-icon-arrow-up"></i>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="betType">
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout") }}
              <span class="mobileText"> 1.96x {{ lessthan }}</span>
            </div>
            <div
              :class="trenBet[1] ? 'round1' : 'round circle1'"
              @click="betHits(1)"
            >
              <div class="circle">
                <div v-if="status1 == 1">
                  <div v-if="!trenBet[1]">
                    <div>{{ $tt("Bet.BetRed") }}</div>
                  </div>
                  <div v-else>{{ $tt("Bet.Betting") }}</div>
                </div>
                <div v-if="status1 == 2">
                  <div v-if="!trenBet[1]">
                    <div>{{ $tt("Bet.BetRed") }}</div>
                    <div class="nextRound">{{ $tt("Bet.NextRound") }}</div>
                  </div>
                  <div v-else>
                    <div>{{ $tt("Bet.Betting") }}</div>
                    <div class="nextRound" v-if="isNext(1)">cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout")
              }}<span class="mobileText"> 2x {{ equal }}</span>
            </div>
            <div
              :class="trenBet[2] ? 'round2' : 'round circle2'"
              @click="betHits(2)"
            >
              <div class="circle">
                <div v-if="status1 == 1">
                  <div v-if="!trenBet[2]">
                    <div>{{ $tt("Bet.BetGreen") }}</div>
                  </div>
                  <div v-else>{{ $tt("Bet.Betting") }}</div>
                </div>
                <div v-if="status1 == 2">
                  <div v-if="!trenBet[2]">
                    <div>{{ $tt("Bet.BetGreen") }}</div>
                    <div class="nextRound">{{ $tt("Bet.NextRound") }}</div>
                  </div>
                  <div v-else>
                    <div>{{ $tt("Bet.Betting") }}</div>
                    <div class="nextRound" v-if="isNext(2)">cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout") }}
              <span class="mobileText"> 10x {{ greaterthan }}</span>
            </div>
            <div
              :class="trenBet[3] ? 'round3' : 'round circle3'"
              @click="betHits(3)"
            >
              <div class="circle">
                <!-- <div v-if="status1 == 1">{{ $tt("Bet.BetMoon") }}</div>
                <div v-if="trenBet[3]">{{ $tt("Bet.Betting") }}</div>
                <div v-if="status1 == 2 && !trenBet[3]">
                  <div>{{ $tt("Bet.BetMoon") }}</div>
                  <div class="nextRound">{{ $tt("Bet.NextRound") }}</div>
                </div> -->

                <div v-if="status1 == 1">
                  <div v-if="!trenBet[3]">
                    <div>{{ $tt("Bet.BetMoon") }}</div>
                  </div>
                  <div v-else>{{ $tt("Bet.Betting") }}</div>
                </div>
                <div v-if="status1 == 2">
                  <div v-if="!trenBet[3]">
                    <div>{{ $tt("Bet.BetMoon") }}</div>
                    <div class="nextRound">{{ $tt("Bet.NextRound") }}</div>
                  </div>
                  <div v-else>
                    <div>{{ $tt("Bet.Betting") }}</div>
                    <div class="nextRound" v-if="isNext(3)">cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 1" class="manual">
      <div class="content">
        <div :class="isDisabled ? 'click-disable' : ''">
          <div class="line1">
            <div class="amount">
              <div class="header">
                <span>{{ $tt("Bet.Amount") }}</span>
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input">
                <img :src="coinImg" alt="" />
                <input
                  type="number"
                  pattern="\d*"
                  v-model.trim="betMoney"
                  class="input-item"
                  @change="changeSilderVal"
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
                    <button class="">{{ $tt("WALLET.Min") }}</button>
                    <div class="ui_slider">
                      <el-slider
                        :show-tooltip="false"
                        :min="sliderMin"
                        :max="sliderMax"
                        v-model="moneyValue"
                        :step="0.000001"
                        @change="sliderCheng"
                        :format-tooltip="formatTooltip"
                      ></el-slider>
                    </div>
                    <button class="">{{ $tt("WALLET.Max") }}</button>
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
                <input
                  type="number"
                  pattern="\d*"
                  v-model="betsNumber"
                  class="input-item"
                />
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
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input" style="padding: 0 10px">
                <el-switch
                  v-model="switchWin"
                  active-color="#ff4949"
                  inactive-color="#43B309"
                  :active-text="Increase"
                  :inactive-text="Reaset"
                >
                </el-switch>
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
                <!-- <span>0.00000</span> -->
              </div>
              <div class="input" style="padding: 0 10px">
                <el-switch
                  v-model="switchLose"
                  active-color="#ff4949"
                  inactive-color="#43B309"
                  :active-text="Increase"
                  :inactive-text="Reaset"
                >
                </el-switch>
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

        <div class="betType">
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout") }} <span class="mobileText"> 1.96x</span>
            </div>
            <div
              :class="trenBet[1] ? 'round1' : 'round circle1'"
              @click="trenBetClick(1)"
            >
              <div class="circle">
                <div>{{ $tt("Bet.BetRed") }}</div>
              </div>
            </div>
          </div>
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout") }}<span class="mobileText"> 2x</span>
            </div>
            <div
              :class="trenBet[2] ? 'round2' : 'round circle2'"
              @click="trenBetClick(2)"
            >
              <div class="circle">
                <div>{{ $tt("Bet.BetGreen") }}</div>
              </div>
            </div>
          </div>
          <div class="bet">
            <div class="text1">
              {{ $tt("Bet.Payout") }} <span class="mobileText"> 10x</span>
            </div>
            <div
              :class="trenBet[3] ? 'round3' : 'round circle3'"
              @click="trenBetClick(3)"
            >
              <div class="circle">
                <div>{{ $tt("Bet.BetMoon") }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="betType">
          <div class="bet">
            <div class="round circle4" @click="stopAuto()">
              <div class="circle">
                <div>{{ $tt("Bet.BetStop") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { handle9Number } from "@/utils";
export default {
  name: "trenBall",
  props: {
    status1: {
      type: Number,
    },
    isDisabled: {
      type: Boolean,
    },
    trenBet: {
      type: Array,
      default: function () {
        return [false, false, false, false];
      },
    },
    nextAutoBetList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    let t = this;
    return {
      lessthan: "(<2)",
      equal: "(≥2)",
      greaterthan: "(≥10)",
      automaticGame: "",
      // trenBet: [false,false,false,false],
      tablist: [t.$tt("Bet.Manual"), t.$tt("Bet.Auto")],
      tablist1: [t.$tt("Bet.Manual")],
      tableIndex: 0,
      money: "",
      betMoney: "1",
      isSlider2: false,
      coinImg: "",
      switchWin: false,
      switchLose: false,
      amount: 100,
      betsNumber: "∞",
      onWin: 0,
      onLose: 0,
      stopWin: 0,
      stopLose: 0,
      playId: null,
      USDexchangeRate: 1,
      isSlider: false,
      moneyValue: 0,
      sliderMax: 10000,
      sliderMin: 0,
      Increase: t.$tt("Bet.IncreaseBy"),
      Reaset: t.$tt("Bet.Reset"),
    };
  },
  computed: {
    ...mapGetters(["getCoin"]),
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
          (this.getCoin.exchangeRate * this.stopLosenLose) /
          this.USDexchangeRate
        );
      }
      return 0;
    },
  },
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        (this.Increase = this.$tt("Bet.IncreaseBy")),
          (this.Reaset = this.$tt("Bet.Reset"));
        (this.tablist = [this.$tt("Bet.Manual"), this.$tt("Bet.Auto")]),
          this.$forceUpdate();
      }
    },
    status1: {
      handler(val) {
        console.log("current game status:", val);
        // if (val == 1) {
        //   if(this.typeList && this.typeList.length){
        //     this.typeList.forEach((item) => {
        //       let reqData = {
        //         betMoney: this.betMoney,
        //         type: item,
        //       };
        //       setTimeout(()=>{

        //         this.$emit("betHits", reqData);
        //       },2000)

        //       console.log(
        //         "val  自动下注：",
        //         reqData
        //       );
        //     });
        //   }else{
        //     this.$emit('update:trenBet',[false, false, false, false])
        //   }
        // }

        // if (val == 2) {
        //   this.typeList = [];
        //   // this.trenBet = [false, false, false, false];
        // }
        // console.log("val   99999999999999999999999999999 >>>>>", val);
      },
    },
    getCoin: {
      handler(val, oldValue) {
        this.coinImg = val.icon;
        if (val.currencyId) {
          this.currencyId = val.currencyId;
          this.coinImg = val.icon;
          this.currencyId = val.currencyId;
          let obj = this.BetSection(this.$route.query.playId, val.currencyId);
          if (obj != null) {
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
    isNext(type) {
      return this.nextAutoBetList.find((item) => item.type == type);
    },
    changeSilderVal() {
      if (this.betMoney < this.sliderMin) {
        this.betMoney = this.sliderMin;
      } else if (this.betMoney > this.sliderMax) {
        this.betMoney = this.sliderMax;
      }
      this.moneyValue = Number(this.betMoney);
      this.betMoney = handle9Number(this.betMoney);
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
    handledBetNum(type) {
      this.betsNumber = type;
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

    handledivisionUp() {
      if (this.betMoney >= 0) {
        this.betMoney = Number(this.betMoney) + 1;
      }
    },

    handlemultiplicationDown() {
      if (this.betMoney > 1) {
        this.betMoney = Number(this.betMoney) - 1;
      }
    },

    handledivisionAmount(val) {
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

    betHits(type) {
      let reqData = {
        betMoney: this.betMoney,
        type,
      };
      this.$emit("betHits", reqData);
      this.$forceUpdate();
    },

    trenBetClick(type) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      let number = 1.96;
      if (type == 1) {
        number = 1.96;
      } else if (type == 1) {
        number = 2;
      } else {
        number = 10;
      }
      let params = {
        channelId: Number(this.channelId),
        status: 0,
        currencyId: this.currencyId,
        userId: Number(id),
        lossAmountPlus: !this.switchLose ? -1 : Number(this.onLose),
        winAmountPlus: !this.switchWin ? -1 : Number(this.onWin),
        quantity: this.betsNumber == "∞" ? -1 : Number(this.betsNumber),
        money: this.betMoney,
        number: number.toString(),
        playId: Number(this.playId),
        stopLoss: this.stopLose === 0 ? -1 : this.stopLose,
        stopWin: this.stopWin === 0 ? -1 : this.stopWin,
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
  },
};
</script>
<style lang="scss" scoped>
.trenBall {
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
        font-size: 28px;
        margin: 30px 0px 0px 0px;
      }
    }
  }

  .autoInput {
    // width: 730px;
    padding-right: 5px;
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

  .input-item-auto {
    width: 550px;
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
      font-size: 26px;
      height: 80px;
      border-radius: 30px;
      width: 400px;
    }
  }

  .amount-end-auto {
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
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
        font-size: 26px;
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
        font-size: 26px;
        height: 60px;
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
        height: 60px;
        width: 68px;
        border-radius: 0px 40px 40px 0px;
      }
    }
  }

  .input {
    width: 288px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: #222328;
    padding: 0 10px;

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

  .xIcon {
    color: #43b309;
    padding-right: 10px;
  }

  .tabContainer {
    height: 60px;
    line-height: 60px;
    display: flex;
    color: rgba(153, 164, 176, 0.8);
    border-top: 1px solid rgba(153, 164, 176, 0.1);
    border-bottom: 1px solid rgba(153, 164, 176, 0.1);
    margin-top: 25px;

    // border-radius: 22px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      margin-top: 30px;
      height: 70px;
      line-height: 70px;
    }

    cursor: pointer;
    margin-top: 15px;

    .tabs-now {
      width: 50%;
      color: #99a4b099;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 28px;
      }
    }

    .tabs-active {
      color: white;
      width: 50%;
      border-bottom: 2px solid #cc2843;
      text-align: center;
      background-image: linear-gradient(to top, #cc2843, #7bc51400 50%);

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 28px;
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

  .manual {
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

  .auto {
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 100%;
      height: auto;
    }

    .amountWith {
      padding: 0px 35px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        padding: 0px 16px;
      }
    }
  }

  .betType {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
      width: 100%;
    }

    .text1 {
      color: #6b727c;
      font-size: 16px;
      text-align: left;
      padding-left: 15px;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        margin-top: 20px;
        padding-left: 25px;
        font-size: 28px;
      }
    }

    .bet {
      cursor: pointer;

      &:active {
        transform: scale(0.95, 0.95);
      }

      .round {
        margin-top: 10px;
        width: 188px;
        border-radius: 22px;
        height: 48px;
        // line-height: 48px;
        font-size: 14px;
        background-color: #6b7180;
        color: white;
        // overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 95%;
          height: 77px;
          border-radius: 35px;
          font-family: "Montserrat-Bold";
          margin-top: 20px;
          margin: 20px auto 0px;
        }

        :before {
          content: "";
          position: absolute;
          left: 10px;
          top: 10px;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          border: solid 2px rgba(50, 57, 63, 0.5);

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            top: 15px;
            width: 35px;
            height: 35px;
          }
        }
      }

      .round1 {
        @extend .round;
        background-color: #ed6300;

        :before {
          display: none;
        }
      }

      .round2 {
        @extend .round;
        background-color: #43b309;

        :before {
          display: none;
        }
      }

      .round3 {
        @extend .round;
        background-color: #e2b40b;

        :before {
          display: none;
        }
      }

      .round1 {
        @extend .round;
        background-color: rgba(244, 10, 10, 0.68);

        :before {
          display: none;
        }
      }

      .betingInfo {
        margin-top: 10px;
        width: 188px;
        border-radius: 22px;
        height: 48px;
        font-size: 14px;
        background-color: #ed6300;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 95%;
          height: 77px;
          border-radius: 35px;
          font-family: "Montserrat-Bold";
          margin-top: 20px;
        }
      }

      .mobileText {
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          color: white;
        }
      }

      .circle1 {
        :before {
          background-color: #ed6300;
        }
      }

      .circle2 {
        :before {
          background-color: #43b309;
        }
      }

      .circle3 {
        :before {
          background-color: #e2b40b;
        }
      }

      .circle4 {
        :before {
          background-color: rgba(244, 10, 10, 0.68);
        }
      }

      .nextRound {
        margin-top: 10px;
      }
    }
  }
}

.circle {
  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    font-size: 28px;
  }
}
</style>
