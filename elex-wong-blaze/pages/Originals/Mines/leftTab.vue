<template>
  <div class="game-view-left">
    <div class="normalTabs">
      <div class="tabs">
        <div
          v-for="(item, index) in automaticGame == 1 ? muenlist : muenlist1"
          :key="index"
          :class="tableIndex === index ? 'tabs-active' : 'tabs-now'"
          @click="handleTabs(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 0">
      <button class="betButton mobileBet" @click="handlebet" v-if="isInit">
        <span ref="loader" class="loader" v-if="isClickBet"></span>
        <div v-if="!isClickBet">{{ $t("Bet.Bet") }}</div>
      </button>
      <div class="mobileOperate">
        <button class="ui-button" v-if="!isInit">
          <div class="button-inner" @click="randomAction" v-if="isCanAutoPick">
            {{ $t("Bet.PickRandomly") }}
          </div>
          <div class="button-inner isOpcity" v-if="!isCanAutoPick">
            {{ $t("Bet.PickRandomly") }}
          </div>
        </button>
        <button
          class="betButton"
          v-if="!isInit"
          :class="{ isOpcity: !isCanCashOut }"
        >
          <div @click="Cashout" v-if="isCanCashOut">
            {{ $t("Bet.Cashout") }}&nbsp;&nbsp;{{ $t("Bet.Win") }}x{{
              winRatio
            }}
          </div>
          <div v-if="!isCanCashOut">{{ $t("Bet.Cashout") }}</div>
        </button>
      </div>
      <div class="amount">
        <div class="header">
          <div>{{ $t("Bet.Amount") }}</div>
          <span>{{ USDAmount.toFixed(6) }} {{ $t("Bet.USD") }}</span>
        </div>
        <div class="input" :class="{ amountDisabled: isMunualBetSuccess }">
          <img :src="coinImg" alt="" />
          <input
            type="number"
            v-model="baseMoney"
            class="input-item isMunualBetSuccess"
            @change="changeSilderVal"
          />
          <div class="amount-end">
            <button class="first-button" @click="handledivision('0.5')">
              /2
            </button>
            <button class="scend-button" @click="handledivision('2')">
              x2
            </button>
            <div class="fix_layer" v-show="isSlider">
              <button @click="sliderCheng(sliderMin)" class="min_btn">
                {{ $t("WALLET.Min") }}
              </button>
              <div class="ui_slider">
                <el-slider
                  :show-tooltip="false"
                  @input="sliderCheng"
                  :min="sliderMin"
                  :max="sliderMax"
                  :step="0.000001"
                  v-model="moneyValue"
                  :format-tooltip="formatTooltip"
                ></el-slider>
              </div>
              <button @click="sliderCheng(sliderMax)" class="max_btn">
                {{ $t("WALLET.Max") }}
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
          <span>{{ $t("Bet.Mines") }}</span>
        </div>
        <div
          class="moblieSelect"
          :class="{ amountDisabled: isMunualBetSuccess }"
        >
          <Commonselect
            :list="boomList"
            :select.sync="ray"
            @update:select="selectvalue"
            :isShowImg="false"
          ></Commonselect>
        </div>
      </div>
      <div class="amount" v-if="!isInit">
        <div class="header">
          <span>{{ $t("Bet.Gems") }}</span>
        </div>
        <div class="input">
          <input
            type="number"
            v-model="clickNum"
            class="input-item"
            style="margin-left: 10px"
            disabled
          />
        </div>
      </div>
      <div class="amount" v-if="!isShow">
        <div class="header">
          <span>{{ $t("Bet.CurrentGet") }}</span>
        </div>
        <div class="input">
          <input type="number" v-model="currentValue" class="input-item" />
        </div>
      </div>

      <div class="normalOperate">
        <button class="ui-button" v-if="!isInit">
          <div class="button-inner" @click="randomAction" v-if="isCanAutoPick">
            {{ $t("Bet.PickRandomly") }}
          </div>
          <div class="button-inner isOpcity" v-if="!isCanAutoPick">
            {{ $t("Bet.PickRandomly") }}
          </div>
        </button>
        <button
          class="betButton"
          v-if="!isInit"
          :class="{ isOpcity: !isCanCashOut }"
        >
          <div @click="Cashout" v-if="isCanCashOut">
            {{ $t("Bet.Cashout") }}&nbsp;&nbsp;{{ $t("Bet.Win") }}x{{
              winRatio
            }}
          </div>
          <div v-if="!isCanCashOut">{{ $t("Bet.Cashout") }}</div>
        </button>
      </div>

      <button class="betButton normalBet" v-if="isInit">
        <span ref="loader" class="loader" v-if="isClickBet"></span>
        <div v-if="!isClickBet" @click="handlebet" class="button-inner">
          {{ $t("Bet.Bet") }}
        </div>
      </button>
    </div>
    <div class="mobileTabs">
      <div class="tabs">
        <div
          v-for="(item, index) in automaticGame == 1 ? muenlist : muenlist1"
          :key="index"
          :class="tableIndex === index ? 'tabs-active' : 'tabs-now'"
          @click="handleTabs(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 1">
      <div class="autoContainer">
        <div :class="isDisabled ? 'click-disable' : ''">
          <div class="amount">
            <div class="header">
              <span>{{ $t("Bet.Amount") }}</span>
              <span>{{ AutoUSDAmount.toFixed(6) }} USD</span>
            </div>
            <div class="input">
              <img :src="coinImg" alt="" />
              <input
                type="number"
                v-model.trim="baseMoney"
                class="input-item"
                @change="changeSilderVal"
              />
              <div class="amount-end">
                <button class="first-button" @click="handledivision('0.5')">
                  /2
                </button>
                <button class="scend-button" @click="handledivision('2')">
                  x2
                </button>
                <div class="fix_layer" v-show="isSlider">
                  <button @click="sliderCheng(sliderMin)" class="min_btn">
                    {{ $t("WALLET.Min") }}
                  </button>
                  <div class="ui_slider">
                    <el-slider
                      :show-tooltip="false"
                      :min="sliderMin"
                      @change="sliderCheng"
                      :step="0.000001"
                      :max="sliderMax"
                      v-model="moneyValue"
                      :format-tooltip="formatTooltip"
                    ></el-slider>
                  </div>
                  <button @click="sliderCheng(sliderMax)" class="max_btn">
                    {{ $t("WALLET.Max") }}
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
              <span>{{ $t("Bet.NumberofBets") }}</span>
              <!-- <span>0.00000</span> -->
            </div>
            <div class="input">
              <img :src="coinImg" alt="" />
              <input v-model="betNum" type="text" class="input-item" />
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
          <div class="amount">
            <div class="header">
              <span> {{ $t("Bet.Mines") }}</span>
            </div>
            <div class="moblieSelect">
              <Commonselect
                :list="boomList"
                :select.sync="ray"
                :isShowImg="false"
                @update:select="selectvalue"
              ></Commonselect>
            </div>
          </div>
          <div class="switchw">
            <div class="switchw_top">{{ $t("Bet.OnWin") }}</div>
            <div class="switchw_content">
              <div class="switchw_c_left">
                <div class="increase_switch">
                  <div class="dot-wrap" @click="iswin = !iswin">
                    <div class="dot" :class="{ actived: iswin }"></div>
                  </div>
                  <div :class="iswin ? 'text' : 'activet'">
                    {{ $t("Bet.Reset") }}
                  </div>
                  <div :class="iswin ? 'activet' : 'text'">
                    {{ $t("Bet.IncreaseBy") }}
                  </div>
                </div>
              </div>
              <div class="switchw_c_right">
                <input
                  class="switchw_inpot"
                  type="number"
                  :class="{ active: iswin }"
                  v-model="win"
                  :disabled="iswin"
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="amount">
            <div class="header">
              <span>{{ $t("Bet.StopOnWin") }}</span>
              <span>{{ WinUSDAmount.toFixed(6) }} {{ $t("Bet.USD") }}</span>
            </div>
            <div class="input">
              <img :src="coinImg" alt="" />
              <input type="number" class="input-item" v-model="stopWin" />
            </div>
          </div>
          <div class="switchw">
            <div class="switchw_top">{{ $t("Bet.Onlose") }}</div>
            <div class="switchw_content">
              <div class="switchw_c_left">
                <div class="increase_switch">
                  <div class="dot-wrap" @click="isclose = !isclose">
                    <div class="dot" :class="{ actived: isclose }"></div>
                  </div>
                  <div :class="isclose ? 'text' : 'activet'">
                    {{ $t("Bet.Reset") }}
                  </div>
                  <div :class="isclose ? 'activet' : 'text'">
                    {{ $t("Bet.IncreaseBy") }}
                  </div>
                </div>
              </div>
              <div class="switchw_c_right">
                <input
                  class="switchw_inpot"
                  type="text "
                  :class="{ active: isclose }"
                  v-model="lose"
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="amount">
            <div class="header">
              <span>{{ $t("Bet.StopOnLose") }}</span>
              <span>{{ LoseUSDAmount.toFixed(6) }} {{ $t("Bet.USD") }}</span>
            </div>
            <div class="input">
              <img :src="coinImg" alt="" />
              <input type="number" class="input-item" v-model="stopLose" />
            </div>
          </div>
        </div>
        <div
          v-if="stopAuto"
          class="betButton"
          @click="autoPlay"
          :class="{ isOpcity: type4List.length == 0 }"
        >
          {{ $t("Bet.StartAutoBet") }}
        </div>
        <div v-if="!stopAuto" class="betButton" @click="stopPlay">
          {{ $t("Bet.StopAutoBet") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { handle9Number } from "@/components/Originals/Utils/utils.js";
import { minesConfig, closeAutoGame, getAutoGame } from "@/api/api.js";
import Commonselect from "@/components/Originals/Select.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    disabled: {
      type: Boolean,
    },
    isWithdraw: {
      type: Boolean,
    },
    inputValueStart: {
      type: Number,
    },

    inputValueEnd: {
      type: Number,
    },
    gameName: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
    },
    isInit: {
      type: Boolean,
    },
    isCanCashOut: {
      type: Boolean,
    },
    isCanAutoPick: {
      type: Boolean,
    },
    clickNum: {
      type: Number,
    },
    totalNum: {
      type: Number,
    },
    formData: {
      type: Object,
    },
    isMunualBetSuccess: {
      type: Boolean,
    },
    isClickBet: {
      type: Boolean,
    },
    winRatio: {
      type: Number,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  name: "",
  data() {
    let t = this;
    return {
      automaticGame: "", // 1开启2关闭
      type4List: [],
      coinImg: "",
      currencyId: "",
      tableIndex: 0,
      baseMoney: "100.000000",
      currentValue: 0.0,
      isShow: true,
      muenlist: [t.$t("Bet.Manual"), t.$t("Bet.Auto")],
      muenlist1: [t.$t("Bet.Manual")],
      boomList: [],
      rateInfo: "",
      nextRateInfo: "",
      minesConfigList: [],
      selectData: [],
      autoTemp: [],
      betNum: "∞",
      boomList: [],
      ray: "",
      iswin: false,
      isclose: false,
      isAuto: false,
      stopAuto: true,
      stopLose: 0,
      stopWin: 0,
      socket: null,
      lose: "",
      win: "",
      playId: "",
      isSlider: false,
      moneyValue: 0,
      sliderMin: 0,
      sliderMax: 10000,
      betSection: {},
      USDexchangeRate: 1,
    };
  },

  components: { Commonselect },
  created() {
    document.addEventListener("click", (e) => {
      let box = document.querySelector(".fix_layer");
      if (box && !box.contains(e.target)) {
        this.isSlider = false;
      }
    });
  },
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        this.muenlist = [this.$t("Bet.Manual"), this.$t("Bet.Auto")];
        this.$forceUpdate();
      }
    },
    getCoin: {
      handler(val, oldValue) {
        if (val.currencyId) {
          this.coinImg = val.currencyIcon;
          this.currencyId = val.currencyId;
          let obj = this.BetSection(this.$route.query.playId, val.currencyId);

          if (!oldValue) {
            //刷新页面得时候
            this.baseMoney = Number(obj.minValue).toFixed(6);
          }

          if (val && oldValue && val.currencyId != oldValue.currencyId) {
            this.baseMoney = Number(obj.minValue).toFixed(6);
          }

          if (obj) {
            this.betSection = obj;
            this.sliderMin = obj.minValue;
            this.sliderMax = obj.maxValue;
            this.changeSilderVal();
          }
        }
      },
      immediate: true,
      deep: true,
    },
    list: {
      handler(val) {
        if (val) {
          this.type4List = val.filter((item) => item.type == 4);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["getCoin"]),
    USDAmount() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.baseMoney) / this.USDexchangeRate
        );
      }
      return 0;
    },
    AutoUSDAmount() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.baseMoney) / this.USDexchangeRate
        );
      }
      return 0;
    },
    WinUSDAmount() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.stopWin) / this.USDexchangeRate
        );
      }
      return 0;
    },
    LoseUSDAmount() {
      if (this.getCoin) {
        return (
          (this.getCoin.exchangeRate * this.stopLose) / this.USDexchangeRate
        );
      }
      return 0;
    },
  },
  mounted() {
    this.playId = this.$route.query.playId;
    this.automaticGame = this.$route.query.automaticGame;
    this.initProcessData();
    this.getMinesConfig();
    this.boomList = Array(this.totalNum - 1)
      .fill("0")
      .map((_, index) => {
        return {
          id: index + 1,
          name: index + 1,
        };
      });
    this.ray = 5;
  },

  methods: {
    changeSilderVal() {
      if (this.baseMoney < this.sliderMin) {
        this.baseMoney = this.sliderMin;
      } else if (this.baseMoney > this.sliderMax) {
        this.baseMoney = this.sliderMax;
      }
      this.moneyValue = Number(this.baseMoney);
      this.baseMoney = handle9Number(this.baseMoney);
    },
    showSlider() {
      this.isSlider = true;
    },
    getMinesConfig() {
      // minesConfig({ channelId: localStorage.getItem("channelId") }).then(
      //   (res) => {
      //     this.minesConfigList = res.rows;
      //   }
      // );
    },
    initProcessData() {
      if (this.formData != undefined) {
        this.ray = JSON.parse(this.formData.content).ray;
        this.baseMoney = this.formData.money;
        this.currencyId = this.formData.currencyId;
      }
    },
    handleTabs(index) {
      if (!this.isInit) return;
      if (this.isAuto) return;
      this.$emit("update:isWithdraw", false);
      this.tableIndex = index;
      this.$emit("getTabIndex", index);
      this.$parent.init();
      if (index == 1) {
        this.$emit("setAutoList", this.autoTemp);
      } else {
        this.autoTemp = this.list.filter((item) => item.type == 4);
      }
    },

    handledivision(val) {
      if (val == "0.5") {
        if (
          parseFloat(this.baseMoney) * parseFloat(val) >=
          this.betSection.minValue
        ) {
          this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        } else {
          this.baseMoney = this.betSection.minValue;
        }
      } else {
        if (
          parseFloat(this.baseMoney) * parseFloat(val) <=
          this.betSection.maxValue
        ) {
          this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        } else {
          this.baseMoney = this.betSection.maxValue;
        }
      }
    },
    selectvalue(val) {
      this.ray = val;
      // console.log("boom num change", val);
      this.$emit("update:clickNum", this.totalNum - val);
      this.$emit("getBoomNum", val);
    },
    handlebet() {
      let reqData = {
        ray: this.ray,
        money: Number(this.baseMoney),
      };
      this.$emit("handleButton", reqData);
      this.$emit("update:disabled", false);
    },
    Cashout() {
      this.$emit("handleCashout");
    },
    randomAction() {
      this.$emit("handleRandom");
    },
    // -------- auto play----------

    handledBetNum(type) {
      this.betNum = type;
    },

    sliderCheng(val) {
      this.moneyValue = val;
      if (val == 0) {
        this.baseMoney = this.betSection.minValue;
      } else {
        this.baseMoney = val;
      }
      this.baseMoney = handle9Number(this.baseMoney);
    },

    formatTooltip(val) {
      if (val == 0) {
        this.baseMoney = handle9Number(
          this.betSection && this.betSection.minValue
        );
      } else {
        this.baseMoney = handle9Number(val);
      }
    },

    autoPlay() {
      let _this = this;
      this.$emit("update:isDisabled", true);
      let sockets = window.localStorage.getItem("socket");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      let selectList = this.list.filter((item) => item.type == 4);
      let selectStr = selectList.map((item) => item.index + 1).toString();
      if (selectList.length <= 0) return;
      this.socket = new WebSocket(
        window.server.SERVER_SOCKET_SINGLE + `${sockets}/${this.playId}`
      );
      const message = {
        contentType: 300,
        content: {
          content: { ray: this.ray },
          userId: id,
          currencyId: this.currencyId,
          playId: this.playId,
          betMoney: this.baseMoney,
          channelId: localStorage.getItem("channelId"),
          stopWin: this.stopWin === 0 ? -1 : this.stopWin,
          stopLoss: this.stopLose === 0 ? -1 : this.stopLose,
          quantity: this.betNum == "∞" ? -1 : this.betNum,
          winAmountPlus: this.iswin ? -1 : this.win || -1,
          lossAmountPlus: this.isclose ? -1 : this.lose || -1,
          number: selectStr,
        },
      };
      this.socket.onopen = function () {
        _this.isAuto = true;
        _this.stopAuto = false;
        _this.socket.send(JSON.stringify(message));
      };
      this.socket.onmessage = function (res) {
        let info = JSON.parse(res.data);
        let { code, data, msg, contentType, content } = info;
        let contentData = content && JSON.parse(content);
        if (contentType == 567) {
          _this.betNum =
            contentData.quantity == -1 ? "∞" : contentData.quantity;
          _this.baseMoney = contentData.betMoney;
        } else {
          if (code == 200) {
            data.type = "auto";
            _this.$emit("handResult", data);
          } else {
            _this.$message.warning({ message: msg });
          }
        }
      };
    },
    stopPlay() {
      this.socket.close();
      this.stopAuto = true;
      this.isAuto = false;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      closeAutoGame({ userId: id, playId: this.playId }).then((res) => {
        if (res.code === 200) {
          this.$emit("update:isDisabled", false);
          this.$message.success("success");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.disabled_btn {
  opacity: 0.3;
}
@keyframes shadowExpandX {
  0% {
    box-shadow: 2px 0, 2px 0;
    color: rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: -30px 0, 30px 0;
    color: rgba(255, 255, 255, 0.8);
  }
}
.game-view-left {
  width: 330px;
  padding: 10px;
  border-right: 1px solid #24262b;
  background-color: #17181b;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  box-sizing: border-box;
  height: 800px;
  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    width: 100%;
    height: 100%;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .tabs {
    width: 309px;
    height: 44px;
    line-height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    border-radius: 22px;
    background: #17181b;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 30px;
      width: 100%;
      line-height: 60px;
      height: 60px;
      border-radius: 30px;
    }
    .tabs-active {
      width: 50%;
      background: #222328;
      color: #f5f6f7;
      border-radius: 20px;
      text-align: center;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        border-bottom: 2px solid #cc2843;
        background: none;
        border-radius: 0px;
        line-height: 80px;
        font-size: 15px;
        background-image: linear-gradient(to top, #cc28434d, #7bc51400 50%);
      }
    }
    .tabs-now {
      width: 50%;
      height: 44px;
      line-height: 44px;
      color: #99a4b099;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 14px;
      }
    }
  }
  .normalBet {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: none;
    }
  }
  .mobileBet {
    display: none;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
    }
  }
  .normalTabs {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: none;
    }
  }
  .mobileTabs {
    display: none;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
      margin-top: 20px;
    }
  }
  .normalOperate {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: none;
    }
  }
  .mobileOperate {
    display: none;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
      text-align: center;
    }
  }
  .betButton {
    &:active {
      transform: scale(0.95, 0.95);
    }
    text-align: center;
    height: 62px;
    width: 100%;
    margin: 0px auto;
    margin-top: 20px;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #f5f6f7;
    background-image: conic-gradient(from 1turn, #cc2843, #f12c4c);

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 85%;
      margin-top: 20px;
      line-height: 40px;
      font-size: 18px;
      border-radius: 60px;
    }
  }

  .amount {
    width: auto;
    height: 70px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      height: 100%;
    }
    .header {
      height: 20px;
      margin: 0px 18px 6px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #99a4b099;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        margin: 10px 20px;
        font-size: 16px;
      }
    }
    .input {
      height: 44px;
      display: flex;
      align-items: center;
      border-radius: 22px;
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
          width: 40px;
          height: 40px;
        }
      }
      .input-item {
        width: 250px;
        height: 44px;
        font-size: 16px;
        font-weight: 700;
        border: none;
        outline: none;
        background-color: #222328;
        padding: 0px 8px;
        border-radius: 22px;
        color: #f5f6f7;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 100%;
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
          align-items: center;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 68px;
            height: 30px;
            border-radius: 0px 40px 40px 0px;
          }
        }
      }
    }
  }
  .ui-button {
    &:active {
      transform: scale(0.95, 0.95);
    }
    width: 310px;
    height: 62px;
    margin-top: 30px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: #f5f6f7;
    background-color: #6b7180;
    font-size: 500;
    font-size: 16px;
    font-family: "Montserrat-Medium";
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 85%;
      margin: auto;
      margin-top: 20px;
      line-height: 40px;
      font-size: 18px;
      justify-content: center;
      border-radius: 60px;
    }
  }
  .isOpcity {
    opacity: 0.5;
  }
  .amountDisabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}
.autoContainer {
  .amount {
    width: auto;
    height: 70px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      height: 100%;
    }
    .header {
      height: 20px;
      margin: 0px 18px 6px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #99a4b099;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        margin: 30px 20px;
        font-size: 25px;
      }
      .chance_text {
        margin-left: 15px;
        color: #92a2b4;
        font-size: 12px;
      }
    }

    .input {
      height: 44px;
      display: flex;
      border-radius: 20px;
      background-color: #222328;
      align-items: center;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        font-size: 22px;
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
        height: 44px;
        font-size: 14px;
        font-weight: 700;
        padding: 0px 22px;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: #222328;
        border-color: #43b309;
        border-radius: 20px;
        color: #f5f6f7;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          font-size: 23px;
          height: 80px;
          text-indent: 10px;
        }
      }

      .amount-end {
        width: 134px;
        height: 36px;
        margin-left: -120px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          margin-left: 170px;
          width: 210px;
        }
        .first-button {
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
          border-radius: 16px 0px 0px 16px;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            font-size: 23px;
            height: 60px;
            width: 68px;
            border-radius: 40px 0px 0px 40px;
          }
          &:hover {
            background-color: #3c404a;
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
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            font-size: 23px;
            height: 60px;
            width: 68px;
          }
          &:hover {
            background-color: #3c404a;
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
    }
  }
  .switchw {
    margin-top: 20px;
    width: 100%;
    height: 76px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      height: 100%;
    }
    .switchw_top {
      width: 100%;
      height: 22px;
      color: #99a4b099;
      text-align: left;
      box-sizing: border-box;
      padding-left: 20px;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        height: 40px;
      }
    }
    .switchw_content {
      margin-top: 10px;
      width: 100%;
      height: 44px;
      border-radius: 22px;
      box-sizing: border-box;
      background-color: #222328;
      display: flex;
      align-items: center;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        height: 80px;
      }
      > div {
        height: 44px;
        flex: 0 0 49%;
        width: 49%;
        box-sizing: border-box;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          height: 80px;
        }
      }
      .switchw_c_left {
        .increase_switch {
          order: -1;
          position: relative;

          margin-top: 4px;
          box-sizing: border-box;
          width: 90%;
          height: 36px;

          border-radius: 18px;
          background: #31343c;
          cursor: pointer;
          display: flex;
          flex-direction: column;

          justify-content: center;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            height: 80px;
            border-radius: 30px;
            margin-top: 0px;
          }
          .dot-wrap {
            position: absolute;
            width: 18px;
            height: 33px;
            border-radius: 10px;
            background: #43b309;
            left: 15px;
            top: 2px;
            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              height: 60px;
              width: 30px;
              border-radius: 30px;
              top: 10px;
            }
            .dot {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: #fff;
              position: absolute;
              left: 0;
              -webkit-transition: top 0.1s ease-in-out;
              transition: top 0.1s ease-in-out;
              top: 15px;
              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                height: 30px;
                width: 30px;
                border-radius: 30px;
                top: 0px;
              }
            }
            .actived {
              top: 0;
              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                top: 30px;
              }
            }
          }
          .text {
            margin-left: 30%;
            width: 60%;
            text-align: left;
            color: #99a4b0;
          }
          .activet {
            color: white;
            margin-left: 30%;
            text-align: left;
            width: 60%;
          }
        }
      }
      .switchw_c_right {
        margin-left: 2%;
        .switchw_inpot {
          display: inline-block;
          outline: none;
          width: 80%;
          height: 44px;
          box-sizing: border-box;
          background-color: #222328;
          border: none;
          font-size: 16px;
          color: #555b63;
          font-weight: 700;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            height: 80px;
          }
        }
        .active {
          color: #d5d9dc;
        }
        span {
          color: #43b309;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
