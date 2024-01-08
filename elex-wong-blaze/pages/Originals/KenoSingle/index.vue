<template>
  <div class="KenoSingleContainer">
    <div class="KenoSingle">
      <div class="minesGameLeft">
        <leftTab
          @handleAutoPick="handleAutoPick"
          @handleClearTable="handleClearTable"
          @handleBetButton="handleBetButton"
          :list="list"
          :isWithdraw.sync="isWithdraw"
          :selectLength="selectLength"
          :isAutoPick="isAutoPick"
          :isClickBet="isClickBet"
          @handResult="handResult"
          @setRewardList="setRewardList"
          @riskChange="riskChange"
          :isDisabled.sync="isDisabled"
        ></leftTab>
      </div>
      <div
        class="rightContainer"
        id="rightContainerEl"
        :class="isDisabled ? 'click-disable' : ''"
      >
        <div class="topInfo">
          <GamenHeader
            :list="recordList"
            @lookHistory="getDetail"
            :playId="playId"
          ></GamenHeader>
          <div class="minesGameright">
            <div class="gameBox">
              <div class="resultList">
                <div
                  :class="reload ? 'resultItem reload' : 'resultItem'"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="chooseItem(index, 0)"
                >
                  <div
                    :style="{
                      backgroundColor: grad[item.type].color,
                      color: grad[item.type].textColor,
                      opacity: item.opacity || 1,
                    }"
                    :class="item.type == 3 ? 'item win' : 'item'"
                  >
                    <span :class="item.type == 3 ? 'number' : ''">{{
                      index + 1
                    }}</span>

                    <img
                      :src="grad[item.type].url"
                      alt=""
                      v-if="item.type == 3"
                      class="win-icon"
                    />
                  </div>
                  <!-- <span
                    class="numberItem"
                    :style="item.type == 2 ? 'color:red' : ''"
                    >{{ index + 1 }}</span
                  > -->
                </div>
              </div>
              <div class="reward-list" v-if="selectLength > 0">
                <div
                  class="item"
                  v-for="(item, index) in rewardList"
                  :key="index"
                >
                  <div
                    class="rate"
                    :class="item.isActive ? 'isHitsColor ' : 'normalRecordBg'"
                  >
                    {{ item.odds }}x
                  </div>
                  <div
                    class="hits"
                    :class="item.isActive ? 'isHitsColor ' : 'normalRecordBg'"
                  >
                    <div class="info">
                      {{ index }}*<img src="./img/hit.png" alt="" />
                    </div>
                    <div class="num">
                      {{ index }} {{ $tt("KenoSingle.Hits") }}
                    </div>
                    <div class="hitDetails">
                      <div class="box">
                        <div class="amount">{{ $tt("KenoSingle.Payout") }}</div>
                        <div class="amountNum twoText">
                          <span class="num1">{{ item.odds }}</span>
                          <span class="unit">X</span>
                        </div>
                      </div>
                      <div class="box">
                        <div class="amount">{{ t("Bet.WinAmount") }}</div>
                        <div class="amountNum">
                          <img :src="retuenSrc" alt="" />
                          {{ (item.odds * 100).toFixed(2) }}
                        </div>
                      </div>
                      <div class="box">
                        <div class="amount">{{ $tt("KenoSingle.Rate") }}</div>
                        <div class="amountNum twoText">
                          <span class="num1">{{ item.chance / 10000 }}</span>
                          <span class="unit">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="playProcess" v-if="selectLength <= 0">
                <div class="processTips">{{ $tt("Bet.SelectNumbers") }}</div>
                <div class="borderLine"></div>
              </div>
              <div class="houseEdge">
                <div class="HouseEdgeText">{{ $tt("Bet.HouseEdge") }} 1%</div>
              </div>
              <!-- <div class="bottomInfo"> -->
              <!-- <div class="tips" @click="showGameTips">?</div>
              </div> -->
              <div v-if="isWithdraw">
                <WinMoneyDialog
                  :winMoneyObj="winMoneyObj || {}"
                  :currencyId="currencyId"
                ></WinMoneyDialog>
              </div>
            </div>
            <div class="configDataBox">
              <div
                class="configData"
                v-for="(item, index) in hitData"
                :key="index"
                @click="showDetail(item)"
              >
                <div class="dataTop">{{ item.odds }}x</div>
                <div class="dataBottom">
                  <div class="firstText">
                    {{ item.hitsNum }} {{ $tt("KenoSingle.Hits") }}
                  </div>
                  <div class="secondText">{{ index }}x</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottomInfo">
          <div class="tips" @click="dialogGameTip = true">
            <img src="@/assets/img/help.svg" alt="" />
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
          @handleAutoPick="handleAutoPick"
          @handleClearTable="handleClearTable"
          @handleBetButton="handleBetButton"
          :list="list"
          :isWithdraw.sync="isWithdraw"
          :selectLength="selectLength"
          :isClickBet="isClickBet"
          @handResult="handResult"
          @setRewardList="setRewardList"
          @riskChange="riskChange"
          :isDisabled.sync="isDisabled"
        >
        </leftTab>
      </div>
      <div class="mobileTips">
        <div class="tips" @click="dialogGameTip = true">
          <img src="@/assets/img/help.svg" alt="" />
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
    <OriginTable
      :orderList="tableArr"
      @changeTab="changeTab"
      v-if="linkItem.indexOf('10010') >= 0"
    ></OriginTable>
    <div v-if="dialogShow">
      <recordDetail
        :itemInfo="itemInfo"
        :playId="playId"
        :dialogShow.sync="dialogShow"
      ></recordDetail>
    </div>
    <div v-if="dialogGameTip">
      <gameTips :dialogGameTip.sync="dialogGameTip"></gameTips>
    </div>
    <audio ref="audioSelect" preload="auto" :src="selectUrl"></audio>
    <audio ref="audioClear" :src="clearUrl"></audio>
    <audio ref="audioWin" :src="winUrl"></audio>
    <audio ref="audioPlay" :src="palyUrl"></audio>
  </div>
</template>

<script>
import // getUserOrderList,
// choosePicAction,
// singleAddGameOrder,
// kenoConfig,
"@/api/api.js";
import { mapGetters, mapState } from "vuex";
export default {
  name: "KenoSingle",
  props: [""],
  data() {
    return {
      isPlayGameMusic: true,
      isAutoPick: false,
      linkItem: "",
      isDisabled: false,
      userId: "",
      ray: 5,
      recordList: [],
      playId: "",
      itemInfo: {},
      dialogShow: false,
      dialogGameTip: false,
      list: [],
      isReady: false,
      num: 20,
      rateList: [],
      hitData: [],
      detailInfo: "",
      tableArr: [],
      reload: false,
      risk: 1,
      rewardList: [],
      currencyId: "",
      userInfo: "",
      listType: 1, //1为all 0是myBet
      isWithdraw: false,
      winMoneyObj: {},
      selectLength: 0,
      channelId: "",
      isClickBet: false,
      selectUrl: "/sound/select.mp3", //声音文件
      clearUrl: "/sound/clear.mp3",
      winUrl: "/sound/win.mp3",
      palyUrl: "/sound/play.mp3",
      grad: [
        {
          // 网格配置
          color: "#24262B",
          textColor: "#6b727c",
        },
        {
          color: "#650CFF", // start
          textColor: "white",
        },
        {
          color: "#101112",
          textColor: "red",
        },
        {
          color: "#390e71",
          textColor: "#693b1d",
          url: require("./img/win.svg"),
        },
      ],
    };
  },

  components: {
    OriginTable: () => import("@/components/Originals/OriginTable.vue"),
    leftTab: () => import("./leftTab.vue"),
    GamenHeader: () => import("@/components/Originals/GamenHeader.vue"),
    recordDetail: () => import("@/components/Originals/RecordDetail/index.vue"),
    WinMoneyDialog: () => import("@/components/Originals/WinMoneyDialog.vue"),
    gameTips: () => import("./gameTips/index.vue"),
  },

  computed: {
    ...mapGetters(["getGameId", "getIsLogin", "getCoin"]),
    ...mapState(["user_coin"]),
    order() {
      return this.$store.state.kenoSignOrder;
    },
    retuenSrc() {
      return this.user_coin.icon;
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
            this.tableArr = this.tableArr.splice(0, 10);
          }, 1800);
        }
      },
      immediate: true,
      deep: true,
    },
    getIsLogin: {
      handler(val) {
        if (val) {
          this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
          this.getRecordList();
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
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.kenoConfigData();
    this.getOrderList(this.listType);
    this.getRecordList();
    this.initList(); // list以1开始
    //-----------------------
  },

  methods: {
    playGameMusic(val) {
      this.isPlayGameMusic = val;
    },
    changeTab(data) {
      this.getOrderList(data);
    },
    initList() {
      this.list = Array(40)
        .fill({
          type: 0,
        })
        .map((item, index) => {
          return {
            ...item,
            index,
          };
        });
      this.rewardList = [];
      this.selectLength = 0;
    },
    //获取全部历史记录
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
      // getUserOrderList(reqData).then((res) => {
      //   let data = res.data.rows.slice(0, 10);
      //   let arr = [];
      //   data.forEach((e) => {
      //     let obj = {};
      //     obj = e;
      //     obj["money"] = this.FillZero(e["money"]);
      //     obj["winMoney"] = this.FillZero(e["winMoney"]);
      //     console.log(obj["money"]);
      //     arr.push(obj);
      //   });
      //   console.log(arr);
      //   this.tableArr = arr;
      // });
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
      // getUserOrderList(parmas).then((res) => {
      //   this.recordList = res.data.rows.reverse();
      // });
    },
    setRewardList() {
      this.rewardList.forEach((item) => {
        item.isActive = false;
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
    chooseItem(index, type) {
      if (type == 0) {
        this.isAutoPick = false;
      } else {
        this.isAutoPick = true;
      }
      let data = this.list[index];
      this.list.forEach((item) => {
        if (item.type == 3) {
          item.type = 1;
        } else if (item.type == 2) {
          item.type = 0;
        }
      });
      // 不超过10项
      let selectList = this.list.filter((item) => item.type == 1);

      !this.isAutoPick && (this.selectLength = selectList.length);
      // 判断是否是取消
      if (data.type == 1) {
        this.list[index] = {
          type: 0,
          index,
        };
        !this.isAutoPick && this.selectLength--;
      } else if (selectList.length < 10) {
        this.isPlayGameMusic && this.$refs.audioSelect.load();
        this.isPlayGameMusic && this.$refs.audioSelect.play();
        this.list[index] = {
          type: 1,
          index,
        };
        !this.isAutoPick && this.selectLength++;
      }
      // computed rewardList
      let afterSelectLength = this.list.filter((item) => item.type == 1).length;

      this.rewardList = this.rateList.filter((item) => {
        return item.level == this.risk && item.num == afterSelectLength;
      });

      this.rewardList.forEach((item) => {
        item.isActive = false;
      });
      this.$forceUpdate();
    },
    kenoConfigData() {
      kenoConfig({ channelId: this.channelId }).then((res) => {
        this.rateList = res.rows;
      });
    },
    showDetail(item) {
      this.detailInfo = item;
    },
    handleAutoPick() {
      this.selectLength = 0;
      this.initList();
      this.isWithdraw = false;
      let player = this.$refs.audioSelect;
      // player.load();
      let count = 0;
      let fn = () => {
        // this.$nextTick(()=>{
        //   player.play();
        // })
        this.selectBlock();
        count++;
        if (count < 10) {
          setTimeout(() => {
            fn();
          }, 120);
        } else {
          this.selectLength = 10;
          // console.log(this.selectLength, "this.selectLength");
        }
      };
      fn();
    },
    selectBlock() {
      let BlockList = this.list.filter((item) => item.type != 1);
      let indexArr = BlockList.map((item) => item.index);
      const index = parseInt(Math.random() * indexArr.length);
      const selectIndex = indexArr[index];
      // this.list[selectIndex] = {
      //   type: 1,
      //   index: selectIndex,
      //   url: require("../../../assets/image/kenoSingle/checked.png"),
      // }
      // 1 代表是点了autopick
      this.chooseItem(selectIndex, 1);
      this.$forceUpdate();
    },
    handleClearTable() {
      this.isPlayGameMusic && this.$refs.audioClear.load();
      this.isPlayGameMusic && this.$refs.audioClear.play();
      this.initList();
      this.isWithdraw = false;
    },
    riskChange(val) {
      this.risk = val;
      let selectList = this.list.filter((item) => item.type == 1);

      this.rewardList = this.rateList.filter((item) => {
        return item.level == this.risk && item.num == selectList.length;
      });
    },
    handleBetButton(params) {
      this.isDisabled = true;
      //下注之前把之前的状态还原
      this.isPlayGameMusic && this.$refs.audioSelect.load();
      this.isPlayGameMusic && this.$refs.audioSelect.play();
      this.list.forEach((item) => {
        if (item.type == 3) {
          item.type = 1;
        } else if (item.type == 2) {
          item.type = 0;
        }
      });
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
      this.isWithdraw = false;

      this.rewardList.forEach((item) => {
        item.isActive = false;
      });
      let selectList = this.list.filter((item) => item.type == 1);
      // console.log(selectList.length, "------------------------");
      let selectStr = selectList.map((item) => item.index + 1).toString();
      let reqData = {
        content: JSON.stringify({
          level: Number(params.risk),
          number: selectStr,
        }),
        currencyId: this.currencyId,
        money: params.money,
        playId: this.playId,
        channelId: this.channelId,
      };
      // singleAddGameOrder(reqData).then((res) => {
      //   this.isClickBet = false;
      //   if (res.code === 200 || res.data == "code_1058") {
      //     this.singleGameStart();
      //      this.isPlayGameMusic && this.$refs.audioPlay.load();
      //      this.isPlayGameMusic && this.$refs.audioPlay.play();
      //   } else {
      //     this.$message.warning({ message: res.msg });
      //   }
      // });
    },
    singleGameStart() {
      // choosePicAction({ playId: this.playId, channelId: this.channelId }).then(
      //   (res) => {
      //     const { data, code } = res;
      //     if (code === 200) {
      //       this.handResult(data);
      //       this.$forceUpdate();
      //     }
      //   }
      // );
    },
    handResult(data) {
      this.reload = true;
      this.isDisabled = false;
      this.getRecordList();
      setTimeout(() => {
        this.reload = false;
      }, 1000);
      let { number, winNumber, winMoney, winRatio, type, isAutoProcess } = data;
      if (type == "auto") {
        //下注前把之前的还原
        this.list.forEach((item) => {
          if (item.type == 3) {
            item.type = 1;
          } else if (item.type == 2) {
            item.type = 0;
          }
        });

        this.rewardList.forEach((item) => {
          item.isActive = false;
        });
        this.isWithdraw = false;
        if (isAutoProcess) {
          // 先获取到选中的对应的rate信息
          let selectList = this.list.filter((item) => item.type == 1);
          let selectLength = selectList.length;

          this.rewardList = this.rateList.filter((item) => {
            return item.level == this.risk && item.num == selectLength;
          });
        }
      }
      number = typeof number == "string" ? JSON.parse(number) : number;
      winNumber =
        typeof winNumber == "string" ? JSON.parse(winNumber) : winNumber;
      // console.log(winNumber.length, "winNumber");
      number.forEach((item) => {
        item--;
        this.list[item] = {
          type: 2,
          index: item,
        };
      });
      // 改变下面框框的颜色

      if (winNumber.length <= 0) {
        this.rewardList[0].isActive = true;
      }
      if (winNumber && winNumber.length) {
        winNumber.forEach((item) => {
          item--;
          this.list[item] = {
            type: 3,
            index: item,
          };
        });
        this.isWithdraw = true;
        this.isPlayGameMusic && this.$refs.audioWin.load();
        this.isPlayGameMusic && this.$refs.audioWin.play();
        setTimeout(() => {
          this.isWithdraw = false;
        }, 2000);
        this.winMoneyObj.winMoney = winMoney;
        this.winMoneyObj.winRatio = winRatio;
        // console.log(this.winMoneyObj, "winMoneyObj");
        this.rewardList[winNumber.length].isActive = true;
        this.$forceUpdate();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

@keyframes rotate-vert-center {
  0% {
    transform: rotateY(0);
  }

  100% {
    transform: rotateY(360deg);
  }
}

@keyframes turn {
  0% {
    transform: rotateY(0deg);
  }

  50% {
    transform: rotateY(90deg);
  }

  100% {
    transform: rotateY(0deg);
  }
}

.KenoSingleContainer {
  max-width: 1350px;
  margin: 0 auto;
  // margin: 20px auto 0px;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 60px;
  height: auto;

  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    padding: 0px;
  }

  .KenoSingle {
    display: flex;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      background-color: #17181b;
      display: block;
      width: 100%;
    }

    .minesGameLeft {
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: none;
      }
    }

    .rightContainer {
      width: calc(100% - 330px);

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        width: 100%;
      }

      border-top-right-radius: 22px;
      // border-bottom-right-radius: 22px;
      background-color: #17181b;

      .topInfo {
        height: 720px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          height: 100%;
        }

        .minesGameright {
          height: 100%;
          padding: 10px 30px 0px 30px;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            padding: 10px 46px;
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
              border: 1px solid #99a4b099;
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
            margin: 0 auto;
            position: relative;

            .resultList {
              display: grid;
              grid-template-columns: repeat(8, 1fr);
              grid-template-rows: repeat(5, 1fr);
              margin: 0 auto;
              column-gap: 1%;
              row-gap: 1%;

              .resultItem {
                padding: 38% 0;
                margin: 4% 4%;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease-in-out;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  padding: 48% 0;
                  margin: 4% 2%;
                }

                .item {
                  font-size: 16px;
                  border-radius: 5px;
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  z-index: 2;
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    // line-height: 70px;
                    font-size: 14px;
                  }
                }

                .item-img {
                  width: 70px;
                  height: 70px;
                }

                &:hover {
                  margin-top: 0;
                  transition: all 0.3s ease-in-out;
                }
              }

              .reload {
                animation: turn 1s linear forwards;
              }

              .numberItem {
                color: white;
                font-size: 18px;
                position: absolute;
                left: 7px;
                right: 0;
                top: 25px;
              }

              position: relative;

              .win-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                z-index: 2;
              }

              .number {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                z-index: 3;
                text-align: center;
                color: #693b1d;
              }

              .win {
                background-color: #380ba2;
                border: 4px solid #650cff;
                box-shadow: #4517b3 0 4px;
              }

              .light {
                width: 120px;
                height: 120px;
                top: -24px;
                left: -16px;
                animation: rotation 3s linear infinite;
                z-index: 1;
              }
            }

            .playProcess {
              // width: 887px;
              margin: 50px auto 0px;

              .processTips {
                color: #99a4b0;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 16px;
                background-color: #31343c;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  font-size: 15px;
                  margin-top: 80px;
                }
              }

              .borderLine {
                height: 5px;
                background-color: #cc2843;
                border-radius: 20px;
              }
            }

            .houseEdge {
              display: flex;
              flex-direction: row-reverse;

              .HouseEdgeText {
                background-color: #222429;
                line-height: 36px;
                text-align: center;
                color: rgba(153, 164, 176, 0.6);
                border-radius: 22px;
                margin-top: 15px;
                padding: 0px 20px;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  padding: 5px 20px;
                  font-size: 15px;
                  border-radius: 22px;
                  margin-top: 25px;
                }
              }
            }

            .reward-list {
              display: flex;
              color: #6b727c;
              position: relative;
              font-family: "Montserrat-Bold";
              margin-top: 15px;

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                margin-top: 35px;
              }

              .item {
                flex: 1;
                line-height: 27px;
                font-size: 16px;
                margin-left: 3px;

                .rate {
                  border-radius: 5px;
                  line-height: 40px;
                  width: 100%;
                  margin-top: 10px;
                }

                &:hover {
                  .hitDetails {
                    display: flex !important;
                  }
                }

                .hits {
                  width: 100%;
                  margin-top: 10px;
                  cursor: pointer;

                  .info {
                    opacity: 0.6;

                    img {
                      height: 14px;
                      width: 14px;
                      margin-left: 3px;
                    }
                  }

                  .hitDetails {
                    height: 70px;
                    position: absolute;
                    left: 0;
                    right: 0;
                    display: none;
                    bottom: 62px;
                    z-index: 5;
                    padding: 0px 12px;
                    background-color: #31343c;
                    justify-content: space-between;
                    align-items: center;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;

                    .box {
                      display: flex;
                      flex-direction: column;

                      .amount {
                        color: rgb(107, 114, 124);
                        font-size: 16px;
                        text-align: left;
                      }

                      .amountNum {
                        background-color: #24262b;
                        border-radius: 10px;
                        margin-top: 5px;
                        width: 180px;
                        height: 35px;
                        line-height: 35px;
                        color: rgb(107, 114, 124);
                        font-size: 16px;
                        display: flex;
                        align-items: center;

                        img {
                          margin-left: 10px;
                          margin-right: 5px;
                          width: 20px;
                          height: 20px;
                        }
                      }

                      .twoText {
                        justify-content: space-between;
                        padding: 0px 10px;

                        .unit {
                          color: #43b309;
                        }
                      }
                    }
                  }
                }

                .normalRecordBg {
                  background-color: #31343c;
                }
              }
            }
          }

          .configDataBox {
            cursor: pointer;
            display: flex;
            justify-content: space-around;

            .configData {
              margin-top: 20px;

              .dataTop {
                width: 60px;
                text-align: center;
                height: 30px;
                line-height: 30px;
                color: white;
                border-radius: 3px;
                border: 1px solid #2c3b49;
                background-color: #121b23;
              }

              .dataBottom {
                margin-top: 10px;
                border-radius: 3px;

                width: 60px;
                height: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #121b23;
                border: 1px solid #2c3b49;

                .firstText {
                  color: #2c3b49;
                  line-height: 22px;
                }

                .secondText {
                  color: white;
                }
              }
            }
          }
        }
      }

      .bottomInfo {
        height: 64px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        background-color: #17181b;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        border-bottom-right-radius: 22px !important;
        padding: 0px 20px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          display: none;
        }

        .tips {
          color: white;
          width: 20px;
          cursor: pointer;

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
    }

    .moblieInfo {
      display: none;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: block;
        padding: 15px;
        clear: both;
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

  .isHitsColor {
    background-color: #5b2cd7;
    color: white;
  }

  .bgInfo {
    background-color: red;
  }
}
</style>
