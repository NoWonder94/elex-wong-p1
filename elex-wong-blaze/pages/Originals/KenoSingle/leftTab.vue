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

    <div v-if="tableIndex === 0" class="mobileContainer">
      <button class="betButton mobileBet" :class="{ isOpcity: !selectLength }">
        <span ref="loader" class="loader" v-show="isClickBet"></span>
        <div @click="handlebet" v-show="!isClickBet" v-if="selectLength">
          {{ $tt("Bet.Bet") }}
        </div>
        <div v-else>{{ $tt("Bet.Bet") }}</div>
      </button>
      <div class="mobilePick">
        <div class="actionBtn">
          <button class="autoPickBtn" @click="autoPickAction()">
            {{ $tt("Bet.AutoPick") }}
          </button>
          <button class="autoPickBtn" @click="clearTable">
            {{ $tt("Bet.ClearTable") }}
          </button>
        </div>
      </div>
      <div class="amount">
        <div class="header">
          <span>{{ $tt("Bet.Amount") }}</span>
          <span>{{ USDAmount.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
        </div>
        <div class="amountInput">
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
              <button class="min_btn">{{ $tt("WALLET.Min") }}</button>
              <div class="ui_slider">
                <el-slider
                  :show-tooltip="false"
                  :min="sliderMin"
                  :max="sliderMax"
                  @input="sliderCheng"
                  :step="0.000001"
                  v-model="moneyValue"
                ></el-slider>
              </div>
              <button class="max_btn">{{ $tt("WALLET.Max") }}</button>
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
          <span>{{ $tt("Bet.Risk") }}</span>
        </div>
        <div class="moblieInfo">
          <Commonselect
            :list="riskList"
            :select.sync="risk"
            @update:select="selectvalue"
            :isShowImg="false"
          ></Commonselect>
        </div>
      </div>
      <div class="normalPick">
        <div class="actionBtn">
          <button class="autoPickBtn" @click="autoPickAction()">
            {{ $tt("Bet.AutoPick") }}
          </button>
          <button class="autoPickBtn" @click="clearTable">
            {{ $tt("Bet.ClearTable") }}
          </button>
        </div>
      </div>
      <button class="betButton normalBet" :class="{ isOpcity: !selectLength }">
        <span ref="loader" class="loader" v-show="isClickBet"></span>
        <div
          v-show="!isClickBet"
          clickMusic="true"
          @click="handlebet"
          v-if="selectLength"
        >
          {{ $tt("Bet.Bet") }}
        </div>
        <div v-else>{{ $tt("Bet.Bet") }}</div>
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
      <div :class="isDisabled ? 'click-disable' : ''">
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.Amount") }}</span>
            <span>{{ AutoUSDAmount.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
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
                <button class="min_btn">{{ $tt("WALLET.Min") }}</button>
                <div class="ui_slider">
                  <el-slider
                    :show-tooltip="false"
                    :min="sliderMin"
                    :max="sliderMax"
                    @change="sliderCheng"
                    :step="0.000001"
                    v-model="moneyValue"
                  ></el-slider>
                </div>
                <button class="max_btn">{{ $tt("WALLET.Max") }}</button>
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
        <div class="switchw">
          <div class="switchw_top">{{ $tt("Bet.OnWin") }}</div>
          <div class="switchw_content">
            <div class="switchw_c_left">
              <div class="increase_switch">
                <div class="dot-wrap" @click="iswin = !iswin">
                  <div class="dot" :class="{ actived: iswin }"></div>
                </div>
                <div :class="iswin ? 'text' : 'activet'">
                  {{ $tt("Bet.Reset") }}
                </div>
                <div :class="iswin ? 'activet' : 'text'">
                  {{ $tt("Bet.IncreaseBy") }}
                </div>
              </div>
            </div>
            <div class="switchw_c_right">
              <input
                class="switchw_inpot"
                type="number"
                :class="{ active: iswin }"
                v-model="win"
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.StopOnWin") }}</span>
            <span>{{ WinUSDAmount.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
          </div>
          <div class="input">
            <img :src="coinImg" alt="" />
            <input type="number" class="input-item" v-model="stopWin" />
          </div>
        </div>
        <div class="switchw">
          <div class="switchw_top">{{ $tt("Bet.Onlose") }}</div>
          <div class="switchw_content">
            <div class="switchw_c_left">
              <div class="increase_switch">
                <div class="dot-wrap" @click="isclose = !isclose">
                  <div class="dot" :class="{ actived: isclose }"></div>
                </div>
                <div :class="isclose ? 'text' : 'activet'">
                  {{ $tt("Bet.Reset") }}
                </div>
                <div :class="isclose ? 'activet' : 'text'">
                  {{ $tt("Bet.IncreaseBy") }}
                </div>
              </div>
            </div>
            <div class="switchw_c_right">
              <input
                class="switchw_inpot"
                type="number"
                :class="{ active: isclose }"
                v-model="lose"
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div class="amount">
          <div class="header">
            <span>{{ $tt("Bet.StopOnLose") }}</span>
            <span>{{ LoseUSDAmount.toFixed(6) }} {{ $tt("Bet.USD") }}</span>
          </div>
          <div class="input">
            <img :src="coinImg" alt="" />
            <input type="number" class="input-item" v-model="stopLose" />
          </div>
        </div>
        <div class="actionBtn">
          <button class="autoPickBtn" @click="autoPickAction()">
            {{ $tt("Bet.AutoPick") }}
          </button>
          <button class="autoPickBtn" @click="clearTable">
            {{ $tt("Bet.ClearTable") }}
          </button>
        </div>
      </div>
      <div v-if="stopAuto" class="betButton" @click="autoPlay">
        {{ $tt("Bet.StartAutoBet") }}
      </div>
      <div v-if="!stopAuto" class="betButton" @click="stopPlay">
        {{ $tt("Bet.StopAutoBet") }}
      </div>
    </div>
  </div>
</template>
<script>
import { closeAutoGame, getAutoGame } from "@/api/api.js";
import { handle9Number } from "@/components/Originals/Utils/utils.js";
import Commonselect from "@/components/Originals/Select.vue";
import { mapGetters } from "vuex";
import aes from "@/utils/aes.js";
export default {
  props: {
    inputValueStart: {
      type: Number,
    },
    inputValueEnd: {
      type: Number,
    },
    gameName: {
      type: String,
    },
    isClickBet: {
      type: Boolean,
    },
    isWithdraw: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
    isAutoPick: {
      type: Boolean,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectLength: {
      type: Number,
      default: 0,
    },
  },
  name: "",
  data() {
    let t = this;
    return {
      isCanBet: false,
      automaticGame: "",
      playId: "",
      coinImg: require("./img/USDT.webp"),
      tableIndex: 0,
      baseMoney: "100.000000",
      iswin: false,
      isclose: false,
      isAuto: false,
      stopAuto: true,
      stopLose: 0,
      stopWin: 0,
      socket: null,
      lose: "",
      win: "",
      betNum: "∞",
      isSlider: false,
      moneyValue: 0,
      sliderMax: 10000,
      sliderMin: 0,
      muenlist: [t.$tt("Bet.Manual"), t.$tt("Bet.Auto")],
      muenlist1: [t.$tt("Bet.Manual")],
      USDexchangeRate: 1,
      riskList: [
        {
          id: 1,
          name: t.$tt("Bet.RiskLow"),
        },
        {
          id: 2,
          name: t.$tt("Bet.RiskClassic"),
        },
        {
          id: 3,
          name: t.$tt("Bet.RiskMedium"),
        },
        {
          id: 4,
          name: t.$tt("Bet.RiskHigh"),
        },
      ],
      risk: "1",
    };
  },
  components: { Commonselect },
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

  beforeMount() {},
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        this.muenlist = [this.$tt("Bet.Manual"), this.$tt("Bet.Auto")];
        this.$forceUpdate();
      }
    },
    getCoin: {
      handler(val, oldValue) {
        if (val.currencyId) {
          this.coinImg = val.icon;
          this.currencyId = val.currencyId;
          // let obj = this.BetSection(this.$route.query.playId, val.currencyId);
          // if (!oldValue) { //刷新页面得时候
          //   this.baseMoney = Number(obj.minValue).toFixed(6);
          // }
          // if (val && oldValue && val.currencyId != oldValue.currencyId) {
          //   this.baseMoney = Number(obj.minValue).toFixed(6);
          // }
          // if (obj) {
          //   this.betSection = obj;
          //   this.sliderMax = obj.maxValue;
          //   this.sliderMin = obj.minValue;
          // }
          this.baseMoney = Number(0.1).toFixed(6);
          this.sliderMax = 999999999;
          this.sliderMin = 0.1;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    document.addEventListener("click", (e) => {
      let box = document.querySelector(".fix_layer");
      if (box && !box.contains(e.target)) {
        this.isSlider = false;
      }
    });
  },
  mounted() {
    this.playId = this.$route.query.playId;
    this.automaticGame = this.$route.query.automaticGame;
    // this.getAutoGameProcess();
  },
  methods: {
    changeSilderVal() {
      // console.log("changeSilderVal");
      if (this.baseMoney < this.sliderMin) {
        this.baseMoney = this.sliderMin;
      } else if (this.baseMoney > this.sliderMax) {
        this.baseMoney = this.sliderMax;
      }
      this.moneyValue = Number(this.baseMoney);
      this.formatTooltip(this.baseMoney);
    },
    handleTabs(index) {
      if (this.isAuto) return;
      this.tableIndex = index;
    },
    showSlider() {
      this.isSlider = true;
    },
    autoPlay() {
      let _this = this;
      let socket = window.localStorage.getItem("socket");
      let sockets = socket;
      // console.log(sockets, "sockets----------");
      // console.log(
      //   JSON.parse(localStorage.getItem("userInfo")),
      //   'localStorage.getItem("userInfo")'
      // );
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      //下注前把之前的还原
      _this.list.forEach((item) => {
        if (item.type == 3) {
          item.type = 1;
        } else if (item.type == 2) {
          item.type = 0;
        }
      });
      this.$emit("update:isWithdraw", false);
      this.$emit("setRewardList");
      this.socket = new WebSocket(
        window.server.SERVER_SOCKET_SINGLE + `${sockets}/${this.playId}`
      );
      let selectList = _this.list.filter((item) => item.type == 1);
      // console.log(_this.list, "_this.list");
      // console.log(selectList, "_this.selectList");
      let selectStr = selectList.map((item) => item.index + 1).toString();
      // console.log(this.iswin, "this.iswin");
      // console.log(this.isclose, "this.isclose");
      const message = {
        contentType: 300,
        content: {
          content: { number: selectStr, level: this.risk },
          userId: id,
          currencyId: this.currencyId,
          playId: this.playId,
          betMoney: this.baseMoney,
          channelId: localStorage.getItem("channelId"),
          stopWin: this.stopWin == 0 ? -1 : this.stopWin,
          stopLoss: this.stopLose == 0 ? -1 : this.stopLose,
          quantity: this.betNum == "∞" ? -1 : this.betNum,
          winAmountPlus: this.iswin ? -1 : this.win || -1,
          lossAmountPlus: this.isclose ? -1 : this.lose || -1,
        },
      };
      this.socket.onopen = function () {
        _this.socket.send(JSON.stringify(message));
      };
      _this.socket.onmessage = function (res) {
        let info = JSON.parse(res.data);
        let { code, data, msg, contentType, content } = info;
        let contentData = content && JSON.parse(content);
        if (contentType == 567) {
          _this.betNum =
            contentData.quantity == -1 ? "∞" : contentData.quantity;
          _this.baseMoney = contentData.betMoney;
        } else {
          if (code == 200) {
            _this.isAuto = true;
            _this.stopAuto = false;
            data.type = "auto";
            _this.$emit("handResult", data);
          } else {
            _this.isAuto = false;
            _this.stopAuto = true;
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
    getAutoGameProcess() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      getAutoGame({
        userId: id,
        playId: this.playId,
      }).then((res) => {
        // console.log(res);
        let _this = this;
        if (res.code == 200 && res.data) {
          _this.isAuto = true;
          _this.tableIndex = 1;
          let sockets = window.localStorage.getItem("socket");
          this.socket = new WebSocket(
            window.server.SERVER_SOCKET_SINGLE + `${sockets}/${this.playId}`
          );
          this.socket.onmessage = function (res) {
            let info = JSON.parse(res.data);
            let { code, data, msg } = info;
            if (code == 200) {
              _this.stopAuto = false;
              data.type = "auto";
              data.isAutoProcess = true;
              _this.$emit("handResult", data);
            } else {
              _this.$message.warning({ message: msg });
            }
          };
        }
      });
    },
    selectvalue(val) {
      this.risk = val;
      this.$emit("riskChange", val);
    },
    autoPickAction() {
      this.$emit("handleAutoPick");
    },
    clearTable() {
      this.$emit("handleClearTable");
    },
    handlebet() {
      let reqData = {
        risk: this.risk,
        money: this.baseMoney,
      };
      this.$emit("handleBetButton", reqData);
    },
    handledivision(val) {
      if (val == "0.5") {
        // if (
        //   parseFloat(this.baseMoney) * parseFloat(val) >=
        //   this.betSection.minValue
        // ) {
        //   this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        // } else {
        //   this.baseMoney = this.betSection.minValue;
        // }

        if (parseFloat(this.baseMoney) * parseFloat(val) >= 0.1) {
          this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        } else {
          this.baseMoney = 0.1;
        }
      } else {
        // if (
        //   parseFloat(this.baseMoney) * parseFloat(val) <=
        //   this.betSection.maxValue
        // ) {
        //   this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        // } else {
        // this.baseMoney = this.betSection.maxValue;
        // }

        if (parseFloat(this.baseMoney) * parseFloat(val) <= 999999999) {
          this.baseMoney = parseFloat(this.baseMoney) * parseFloat(val);
        } else {
          this.baseMoney = 999999999;
        }
      }
    },
    sliderCheng(val) {
      if (val == 0) {
        this.baseMoney = "0.1";
        // this.baseMoney = this.betSection.minValue;
      } else {
        this.baseMoney = val;
      }
      this.baseMoney = handle9Number(this.baseMoney);

      // this.isSlider = true;
    },

    formatTooltip(val) {
      // console.log(this.baseMoney, "this.baseMoney");
      if (val == 0) {
        // this.baseMoney = handle9Number(this.betSection && this.betSection.minValue);
        this.baseMoney = "0.1";
      } else {
        this.baseMoney = handle9Number(val);
      }
    },
    handledBetNum(type) {
      this.betNum = type;
    },
  },
};
</script>
<style lang="scss" scoped>
.disabledOpercity {
  opacity: 0.5;
}
.game-view-left {
  width: 309px;
  padding: 10px;
  border-right: 1px solid #24262b;
  background-color: #17181b;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  height: 764px;
  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    width: 100%;
    border: none;
    height: auto;
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
    line-height: 44px;
    background: #17181b;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      font-size: 30px;
      width: 100%;
      line-height: 60px;
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
        background-image: linear-gradient(to top, #cc28434d, #cc284300 50%);
      }
    }
    .tabs-now {
      width: 50%;
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
  .normalPick {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: none;
    }
  }
  .mobilePick {
    display: none;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
      // padding-right: 23px;
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
  .actionBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      justify-content: space-around;
    }
    .autoPickBtn {
      &:active {
        transform: scale(0.95, 0.95);
      }
      width: 140px;
      height: 48px;
      line-height: 40px;
      background-color: #6b7180;
      color: white;
      cursor: pointer;
      border-radius: 22px;
      font-family: Montserrat-Bold;
      border: none;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 40vw;
        border-radius: 60px;
        line-height: 40px;
        font-size: 18px;
      }
    }
  }

  .betButton {
    &:active {
      transform: scale(0.95, 0.95);
    }
    text-align: center;
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
      width: 80vw;
      margin-top: 20px;
      line-height: 40px;
      font-size: 18px;
      border-radius: 60px;
    }
  }
  .mobileContainer {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      padding-right: 20px;
    }
  }
  .amountInput {
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
        align-items: center;
        border-radius: 0px 16px 16px 0px;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 68px;
          height: 30px;
          border-radius: 0px 40px 40px 0px;
        }
      }
    }
  }
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
        margin: 10px 20px;
        font-size: 16px;
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
          font-size: 23px;
          height: 80px;
          text-indent: 10px;
        }
      }

      .amount-end {
        width: 134px;
        height: 36px;
        margin-left: -118px;
        margin-top: 4px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
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
  .moblieInfo {
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      height: 80px;
    }
  }
  .isOpcity {
    opacity: 0.5;
  }
}
</style>
