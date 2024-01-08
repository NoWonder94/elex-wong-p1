<template>
  <div class="minesGameContainer" ref="gameView">
    <div class="minesGame">
      <div class="minesGameLeft">
        <leftTab
          @handleCashout="handleCashout"
          :isInit.sync="isInit"
          :inputValueStart="multiple"
          :inputValueEnd="winAmount"
          @handleButton="startGame"
          @handleRandom="handleRandom"
          :clickNum.sync="clickNum"
          :totalNum="totalNum"
          :disabled.sync="disabled"
          :isCanCashOut.sync="isCanCashOut"
          :formData="formData"
          :list="list"
          :isWithdraw.sync="isWithdraw"
          :isCanAutoPick="isCanAutoPick"
          @getTabIndex="getTabIndex"
          :autoBetNumList="autoBetNumList"
          @setAutoList="setAutoList"
          @handResult="handResult"
          @getBoomNum="getBoomNum"
          :isMunualBetSuccess.sync="isMunualBetSuccess"
          :isClickBet="isClickBet"
          :isDisabled.sync="isDisabled"
          :winRatio="winRatio"
        >
        </leftTab>
      </div>
      <div class="rightContainer">
        <GamenHeader
          :list="recordList"
          @lookHistory="getDetail"
          :playId="playId"
        ></GamenHeader>
        <div class="minesGameRight" :class="isDisabled ? 'click-disable' : ''">
          <div class="recordListBox"></div>
          <div class="gameBox">
            <div class="resultList">
              <div
                class="resultItem"
                v-for="(item, index) in list"
                :key="index"
                @click="chooseItem(item)"
              >
                <div
                  :style="{
                    backgroundColor: grad[item.type].color,
                    opacity: item.opacity || 1,
                  }"
                  class="item"
                >
                  <img
                    :src="grad[item.type].url"
                    alt=""
                    v-if="item.type > 1 && item.type != 4"
                  />
                </div>
              </div>
            </div>
            <div v-if="isWithdraw" style="z-index: 99">
              <WinMoneyDialog
                :winMoneyObj="winMoneyObj || {}"
                :currencyId="currencyId"
              ></WinMoneyDialog>
            </div>
          </div>
          <div class="tipsInfo">
            <div
              class="flip"
              v-if="list.filter((item) => item.type != 1).length == 0"
            >
              {{ $t("Bet.Flip") }}
            </div>
            <div class="houseEdge">{{ $t("Bet.HouseEdge") }} 1%</div>
          </div>
        </div>
        <div class="bottomInfo">
          <div class="tips" @click="showGameTips">
            <img src="@/assets/img/help.svg" alt="" />
          </div>
          <div class="musicContorl">
            <img
              src="@/assets/img/bgMusicClose.svg"
              alt=""
              @click="playBgMusic(false)"
              v-if="isPlayBgMusic"
            />
            <img
              src="@/assets/img/bgMusicOpen.svg"
              alt=""
              @click="playBgMusic(true)"
              v-if="!isPlayBgMusic"
            />
          </div>
          <div class="musicContorl">
            <img
              src="@/assets/img/gameMusicClose.svg"
              alt=""
              @click="playGameMusic(false)"
              v-if="isPlayGameMusic"
            />
            <img
              src="@/assets/img/gameMusicOpen.svg"
              alt=""
              @click="playGameMusic(true)"
              v-if="!isPlayGameMusic"
            />
          </div>
        </div>
      </div>
      <div class="moblieInfo">
        <leftTab
          @handleCashout="handleCashout"
          :isInit.sync="isInit"
          :inputValueStart="multiple"
          :inputValueEnd="winAmount"
          @handleButton="startGame"
          @handleRandom="handleRandom"
          :clickNum.sync="clickNum"
          :totalNum="totalNum"
          :disabled.sync="disabled"
          :isCanCashOut.sync="isCanCashOut"
          :isCanAutoPick="isCanAutoPick"
          :formData="formData"
          :list="list"
          :isWithdraw.sync="isWithdraw"
          @getTabIndex="getTabIndex"
          :autoBetNumList="autoBetNumList"
          @setAutoList="setAutoList"
          @handResult="handResult"
          @getBoomNum="getBoomNum"
          :isMunualBetSuccess.sync="isMunualBetSuccess"
          :isClickBet="isClickBet"
          :winRatio="winRatio"
        ></leftTab>
      </div>
      <div class="mobileTips">
        <div class="tips" @click="showGameTips">
          <img src="@/assets/img/help.svg" alt="" />
        </div>
        <div class="musicContorl">
          <img
            src="@/assets/img/bgMusicClose.svg"
            alt=""
            @click="playBgMusic(false)"
            v-if="isPlayBgMusic"
          />
          <img
            src="@/assets/img/bgMusicOpen.svg"
            alt=""
            @click="playBgMusic(true)"
            v-if="!isPlayBgMusic"
          />
        </div>
        <div class="musicContorl">
          <img
            src="@/assets/img/gameMusicClose.svg"
            alt=""
            @click="playGameMusic(false)"
            v-if="isPlayGameMusic"
          />
          <img
            src="@/assets/img/gameMusicOpen.svg"
            alt=""
            @click="playGameMusic(true)"
            v-if="!isPlayGameMusic"
          />
        </div>
      </div>
    </div>
    <div class="bottomTable" v-if="linkItem.indexOf('10010') >= 0">
      <OriginTable :orderList="tableArr" @changeTab="changeTab"></OriginTable>
    </div>
    <div v-if="dialogShow">
      <recordDetail
        :itemInfo="itemInfo"
        :dialogShow.sync="dialogShow"
        :playId="playId"
      ></recordDetail>
    </div>
    <div v-if="dialogGameTip">
      <gameTips :dialogGameTip.sync="dialogGameTip"></gameTips>
    </div>
    <audio ref="audioSelect" :src="selectUrl"></audio>
    <audio ref="audioWin" :src="winUrl"></audio>
    <audio ref="audioDiamond" :src="diamondUrl"></audio>
    <audio ref="audioBoom" :src="boomUrl"></audio>
    <audio ref="minesBg" :src="minesBgUrl" loop="loop"></audio>
  </div>
</template>

<script>
import {
  getUserOrderList,
  doBetAction,
  choosePicAction,
  minesCashOut,
  minesProcess,
} from "@/api/api.js";
import { mapGetters } from "vuex";
export default {
  name: "Mines",
  props: [""],
  data() {
    return {
      isPlayBgMusic: true,
      isPlayGameMusic: true,
      linkItem: "",
      isDisabled: false,
      isClickBet: false,
      screenWidth: null,
      totalNum: 25,
      userId: "",
      recordList: [],
      playId: "",
      itemInfo: {},
      dialogShow: false,
      dialogGameTip: false,
      list: [],
      isReady: false,
      clickNum: null,
      tableArr: [],
      multiple: 0,
      winAmount: 0,
      isInit: true, // 是否是初始状态
      disabled: true, // 是否可以点方块
      canRequest: false,
      isMunualBetSuccess: false, //是否手动下注成功(成功后手动的金额和炸弹就不能输了)
      isWithdraw: false,
      winMoneyObj: {}, // 提现金额
      formData: null,
      coinInfo: "",
      listType: 1, //1为all 0是myBet
      tabIndex: "",
      boomNum: 5, // 炸弹数量
      autoBetNumList: [], //自动下注点的按钮位置
      isCanCashOut: false, //能否点cashout按钮
      isCanAutoPick: true, //能否点randomPick按钮
      channelId: "",
      currencyId: "",
      playId: "",
      selectUrl: "/sound/select.mp3", //声音文件
      winUrl: "/sound/win.mp3",
      diamondUrl: "/sound/sound_gems.mp3",
      boomUrl: "/sound/boom.mp3",
      minesBgUrl: "/sound/minesBg.mp3",
      grad: [
        {
          // 网格配置
          color: "000",
        },
        {
          color: "#212328", // start
        },
        {
          color: "#390e71",
          url: require("./img/jewel.png"), //
        },
        {
          color: "#212328",
          url: require("./img/bomb1.png"),
        },
        {
          color: "#390e71",
        },
      ],
      winRatio: 0,
    };
  },

  components: {
    // recordDetail: () => import("./recordDetail.vue"),
    OriginTable: () => import("@/components/Originals/OriginTable.vue"),
    leftTab: () => import("./leftTab.vue"),
    GamenHeader: () => import("@/components/Originals/GamenHeader.vue"),
    WinMoneyDialog: () => import("@/components/Originals/WinMoneyDialog.vue"),
    recordDetail: () => import("@/components/Originals/RecordDetail/index.vue"),
    gameTips: () => import("./gameTips/index.vue"),
  },
  computed: {
    ...mapGetters(["getCoin"]),
    order() {
      return this.$store.state.minesOrder;
    },
  },
  watch: {
    getCoin: {
      handler(val) {
        this.currencyId = val.currencyId;
      },
      immediate: true,
      deep: true,
    },
    order: {
      handler(old) {
        let obj = JSON.stringify(old);
        obj = JSON.parse(obj);
        if (obj["money"]) {
          obj["money"] = this.FillZero(obj["money"]);
          obj["winMoney"] = this.FillZero(obj["winMoney"]);
          setTimeout(() => {
            if (this.listType == 0) {
              let userInfo = JSON.parse(localStorage.getItem("userInfo"));
              if (obj.userId == userInfo.id) {
                this.tableArr.unshift(obj);
              }
            } else {
              this.tableArr.unshift(obj);
            }
            var arrs = [];
            this.tableArr = this.tableArr.splice(0, 10);
          }, 1200);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.linkItem = localStorage.getItem("linkItem") || "";
    this.playId = this.$route.query.playId;
    this.channelId = localStorage.getItem("channelId");
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
    this.init(); // list 以0开始
    this.getOrderList(this.listType); // 第一次获取全部记录
    this.getRecordList(); // 第一次获取历史记录
    this.minesProcessInfo();
    this.$refs.minesBg.play();
  },
  methods: {
    playBgMusic(val) {
      this.isPlayBgMusic = val;
      val ? this.$refs.minesBg.play() : this.$refs.minesBg.pause();
    },
    playGameMusic(val) {
      this.isPlayGameMusic = val;
    },
    showGameTips() {
      this.dialogGameTip = true;
    },
    init() {
      this.list = Array(25)
        .fill("xx")
        .map((item, index) => {
          return { type: 1, index };
        });
      // this.startGame();
    },
    showDefault(array) {
      this.list = Array(25)
        .fill("xx")
        .map((item, index) => {
          let fill = array.indexOf(index + 1) >= 0;
          return {
            type: fill ? 4 : 1,
            index,
          };
        });
    },
    setAutoList(list) {
      let _this = this;
      list.forEach((item) => {
        _this.$set(this.list, item.index, {
          type: 4,
          index: item.index,
        });
      });
    },
    getBoomNum(num) {
      this.boomNum = num;
    },
    minesProcessInfo() {
      minesProcess().then((res) => {
        if (res.code == 200) {
          let array = res.data.number;
          if (array.length > 0) {
            array.forEach(
              (index) =>
                (this.list[index] = {
                  type: 2,
                })
            );
            this.isInit = false;
            this.disabled = false;
            this.isCanCashOut = true;
            this.isCanAutoPick = true;
            this.isMunualBetSuccess = true;
            this.formData = res.data.order;
          }
        }
      });
    },
    changeTab(data) {
      this.getOrderList(data);
    },
    getTabIndex(data) {
      this.tabIndex = data;
    },
    getOrderList(type) {
      let id = this.userInfo ? this.userInfo.id : "";
      let parmas = {
        channelId: this.channelId,
        playId: this.playId,
        type: type,
        pageNum: 0,
        pageSize: 20,
      };
      let reqData;
      if (type == 0) {
        reqData = {
          ...parmas,
          userId: id,
        };
      } else {
        reqData = parmas;
      }
      getUserOrderList(reqData).then((res) => {
        let data = res.data.rows.slice(0, 10);
        let arr = [];
        data.forEach((e) => {
          let obj = {};
          obj = e;
          obj["money"] = this.FillZero(e["money"]);
          obj["winMoney"] = this.FillZero(e["winMoney"]);

          arr.push(obj);
        });
        this.tableArr = arr;
      });
    },
    // 获取头部自己的历史记录
    getRecordList() {
      let id = this.userInfo ? this.userInfo.id : "";
      let parmas = {
        channelId: this.channelId,
        playId: this.playId,
        type: 0,
        pageNum: 0,
        pageSize: 8,
        userId: id,
      };
      getUserOrderList(parmas).then((res) => {
        this.recordList = res.data.rows.reverse();
      });
    },
    getDetail(item) {
      const { money, winRatio, winMoney } = item;
      item.amount = money;
      item.payout = winRatio;
      item.profit = this.amend(winMoney, money, "-");
      this.itemInfo = item;
      this.dialogShow = true;
    },
    chooseItem(item) {
      this.isPlayGameMusic && this.$refs.audioSelect.load();
      this.isPlayGameMusic && this.$refs.audioSelect.play();
      if (this.tabIndex == 1) {
        if (this.list[index].type == 4) {
          this.$set(this.list, index, {
            type: 1,
            index,
          });
          return;
        }
        const selectList = this.list.filter((item) => item.type == 4);
        if (selectList.length >= this.totalNum - this.boomNum) return;
        this.$set(this.list, index, {
          type: 4,
          index,
        });
        return;
      } else {
        if (this.disabled) return;
        let reqData = {
          playId: this.playId,
          number: item.index + 1,
          // number: item + 1,
          channelId: this.channelId,
        };
        this.isCanCashOut = true; // 能否点cahhout按钮
        this.clickNum--;
        // 点击过后就不能再请求了
        if (item.type == 2) {
          this.canRequest = false;
        } else {
          this.canRequest = true;
        }
        if (this.canRequest) {
          choosePicAction(reqData).then((res) => {
            const { code, data, msg } = res;
            if (code == 200) {
              this.isCanAutoPick = true;
              this.winRatio = data.winRatio;
              this.isPlayGameMusic && this.$refs.audioDiamond.play();
              this.handResult(data);
            } else {
              this.$message.warning({ message: msg });
            }
          });
        }
      }
    },
    handResult(data) {
      const { win, number, type, winMoney, winRatio, ray } = data;
      let array = number.map((item) => Number(item));
      if (type == "auto") {
        this.getRecordList();
        let rayArr = ray.map((item) => Number(item));
        this.setBetResult(array, rayArr);
        if (win) {
          this.isWithdraw = true;
          this.isPlayGameMusic && this.$refs.audioWin.play();
          this.winMoneyObj.winMoney = winMoney;
          this.winMoneyObj.winRatio = winRatio;
        } else {
          this.isPlayGameMusic && this.$refs.audioWin.load();
        }
        setTimeout(() => {
          this.isWithdraw = false;
          this.showDefault(array);
        }, 2000);
      } else {
        if (win) {
          array.forEach((index) =>
            this.$set(this.list, index - 1, {
              type: 2,
              url: require("./img/winning.png"),
              index,
            })
          );
        } else {
          // 点到炸弹了
          this.isMunualBetSuccess = false;
          this.isCanCashOut = false;
          this.isPlayGameMusic && this.$refs.audioBoom.play();
          this.setBetResult(array, [array[array.length - 1]]);
          this.getRecordList();
        }
      }
    },
    /**
     * 自动下注结果展示
     * @param {*} arr number 选中列表，ray：错误列表
     */
    setBetResult(number, rayArr) {
      let winList = number.filter((item) => rayArr.indexOf(item) <= 0);
      // let zuanNum = orgLength - 1; //已知钻石数量
      let zhaNum = rayArr.length; // 炸弹数量
      while (zhaNum < this.boomNum) {
        // 从list中随机找一个点
        let num = Math.ceil(Math.random() * 25);
        // 如果这个点不在win和ray数组里，可以作为炸弹
        if (winList.indexOf(num) < 0 && rayArr.indexOf(num) < 0) {
          rayArr.push(num);
          zhaNum++;
        }
      }
      // 填充所有
      for (var i = 0; i < this.list.length; i++) {
        if (~rayArr.indexOf(i + 1)) {
          this.list[i] = {
            opacity: 0.3,
            type: 3,
          };
        } else {
          this.list[i] = {
            opacity: 0.3,
            type: 2,
          };
        }
      }
      // fill opacity
      let orgLength = number.length;
      for (var i = 0; i < orgLength; i++) {
        this.list[number[i] - 1].opacity = 1;
      }
      const that = this;
      this.disabled = true;
      this.isInit = true; //回到初始状态
      that.$forceUpdate();
    },

    //点下注 如果返回data: "code_1058" 重新调一下开始游戏的接口
    startGame(params) {
      this.isWithdraw = false;
      this.isPlayGameMusic && this.$refs.audioSelect.load();
      this.isPlayGameMusic && this.$refs.audioSelect.play();
      this.money = params.money;
      let reqData = {
        playId: this.playId,
        content: JSON.stringify({ ray: params.ray }),
        currencyId: this.currencyId,
        money: params.money,
        channelId: this.channelId,
      };
      //测试代码
      // this.isInit = false;
      let token = window.localStorage.getItem("authToken");
      if (!token) {
        this.$emit("showLogin");
        return;
      }

      if (parseFloat(params.money) > parseFloat(this.getCoin.money)) {
        this.$notify({
          title: "Error",
          message: "Insufficient balance",
          position: "bottom-left",
        });
        return;
      }

      this.isClickBet = true;
      doBetAction(reqData).then((res) => {
        this.isClickBet = false;
        if (res.code == 200 || res.data == "code_1058") {
          this.init();
          this.isInit = false;
          this.isMunualBetSuccess = true;
          this.disabled = false;
          this.isWithdraw = false;
          this.clickNum = this.totalNum - this.boomNum;
        } else {
          this.$message.warning({ message: res.msg });
        }
      });
    },
    // 随机抽取
    handleRandom() {
      // 取出数组里所有的索引，已经点过了的返回-1
      // this.$refs.audioSelect.load();
      this.isPlayGameMusic && this.$refs.audioSelect.load();
      this.isPlayGameMusic && this.$refs.audioSelect.play();
      const blokList = this.list.map((item, index) => {
        if (item.type == 1) {
          return index;
        } else {
          return -1;
        }
      });
      const list = blokList.filter((item) => item != -1);
      const index = parseInt(Math.random() * list.length); //0 ~ xx 之间的随机数作为索引
      const randomIndex = list[index];
      const randomItem = this.list[randomIndex];
      this.chooseItem(randomItem);
    },
    //提现
    handleCashout() {
      minesCashOut({ channelId: this.channelId }).then((res) => {
        if (res.code === 200) {
          if (res.data.win == true) {
            this.winMoneyObj.winMoney = res.data.winMoney;
            this.winMoneyObj.winRatio = this.amend(
              res.data.winMoney,
              this.money,
              "/"
            );
            this.isWithdraw = true;
            this.isPlayGameMusic && this.$refs.audioWin.play();
            this.isInit = true;
            this.isCanCashOut = false;
            this.disabled = true;
            this.isMunualBetSuccess = false;
            this.getRecordList();
          } else {
            this.$message.warning({ message: res.msg });
          }
        } else {
          this.$message.warning({ message: res.msg });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

.minesGameContainer {
  max-width: 1350px;
  margin: 20px auto;
  width: 100%;
  padding: 0px 60px;
  box-sizing: border-box;

  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    padding: 0px;
  }

  .minesGame {
    display: flex;
    justify-content: space-between;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      display: block;
    }

    .minesGameLeft {
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: none;
      }
    }

    .topRecord {
      background-color: #17181b;
    }

    .rightContainer {
      width: calc(100% - 330px);

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 100%;
      }

      .minesGameRight {
        background: url("./img/minesBg.png") no-repeat center center;
        width: 100%;
        height: 665px;
        background-size: 100% 100%;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          height: 100%;
        }
        .recordListBox {
          flex-direction: row-reverse;
          display: flex;
          padding-top: 30px;
          margin-right: 50px;

          .recordItem {
            cursor: pointer;
            width: 80px;
            height: 40px;
            line-height: 40px;
            background-color: #121b23;
            border: 1px solid #17212a;
            border-radius: 4px;
            color: white;
            font-size: 14px;
            margin-left: 5px;
          }

          .win {
            border: 2px solid #56d117;
          }
        }

        .gameBox {
          width: 55%;
          padding: 10px;
          margin: 60px auto 0px;
          background-color: #111214;
          position: relative;
          border-radius: 10px;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 70%;
          }

          .resultList {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(5, 1fr);
            margin: 0 auto;

            .resultItem {
              padding: 45% 0;
              margin: 4% 5%;
              position: relative;
              border-radius: 5px;

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                padding: 45% 0;
                margin: 4% 5%;
              }

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              z-index: 2;
            }

            .isOk {
              transition: all 0.3s ease-in-out;

              &:hover {
                // animation: itemHover 1.1s infinite linear;
                margin-top: 0;
                transition: all 0.3s ease-in-out;
              }
            }

            .light {
              width: 120px;
              height: 120px;
              top: -32px;
              left: -25px;
              animation: rotation 3s linear infinite;
              z-index: 1;
            }
          }
        }

        .tipsInfo {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-sizing: border-box;
            padding: 0px 15px;
            margin-top: 10px;
          }

          .flip {
            color: white;
            margin-right: 162px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              font-size: 15px;
              margin-right: 20px;
            }
          }

          .houseEdge {
            background-color: #222429;
            line-height: 36px;
            text-align: center;
            color: rgba(153, 164, 176, 0.6);
            border-radius: 22px;
            // float: right;
            margin-top: 15px;
            padding: 0px 20px;
            margin-right: 50px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              font-size: 15px;
              border-radius: 22px;
              margin-right: 10px;
              margin-top: 0;
            }
          }
        }

        .inCome {
          margin-top: 20px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;

          img {
            width: 50px;
            height: 45px;
          }

          div {
            color: #fad400;
            font-size: 25px;
          }
        }
      }

      .bottomInfo {
        clear: both;
        height: 64px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        background-color: #17181b;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        border-bottom-right-radius: 22px;
        padding: 0px 20px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          display: none;
        }

        .tips {
          color: white;
          cursor: pointer;
          width: 20px;

          img {
            width: 20px;
            height: 20px;
          }
        }

        .musicContorl {
          margin-right: 20px;

          img {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
      }

      .tips {
        width: 985px;
        height: 50px;
        line-height: 50px;
        border-top-right-radius: 12px;
        display: flex;
        background-color: #17181b;
        justify-content: space-between;
        align-items: center;

        .leftAmount {
          width: 162px;
        }

        .rightTips {
          width: 617px;
          height: 40px;
          line-height: 40px;
          margin-right: 30px;

          .tipText {
            background-color: #26272c;
            color: #6b727c;
            font-size: 16px;
            border-radius: 25px;
            font-family: Montserrat-Bold;
          }
        }
      }
    }

    .moblieInfo {
      display: none;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: block;
        // padding: 0px 15px;
      }
    }

    .mobileTips {
      display: none;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        height: 80px;
        border-bottom-left-radius: 35px;
        border-bottom-right-radius: 35px;
        padding: 0px 30px;
        background-color: #17181b;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .tips {
        width: 35px;
        color: white;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .musicContorl {
        margin-right: 20px;

        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>
