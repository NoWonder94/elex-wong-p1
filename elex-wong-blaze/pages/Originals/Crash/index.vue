<template>
  <div class="crash">
    <div class="game-view">
      <div class="content">
        <div class="gameLeft">
          <div class="mobileStyle">
            <!-- <div class="tabsInfo">
              <div
                v-for="(item, index) in muenList"
                :key="index"
                class="tabItem"
                :class="
                  tableIndex == index
                    ? 'game-tabs-navs-active'
                    : 'game-tabs-navs-inactive'
                "
                @click="handleTabs(index)"
              >
                {{ item }}
              </div>
            </div> -->
            <!-- <div class="mobileStyle_left" @click="handleRecord">
              <i class="el-icon-s-grid"></i>
              <span class="trend">{{ $tt("Bet.trend") }}</span>
            </div> -->
            <!-- <div class="moblileTrends">
              <img src="./img/trends.svg" alt="" />
              <span>Trends</span>
            </div> -->
          </div>
          <div class="contentInfo">
            <!-- <div class="stars"> </div> -->
            <div class="crashRecord">
              <div class="bankRoll">
                <div class="top">
                  <div class="text1">{{ $tt("vip.Bankroll") }}</div>
                  <div class="text2">{{ getCoin.currencyName }}</div>
                </div>
                <div class="bottom">
                  <!-- <img class="coin-icon" :src="getCoin.currencyIcon" /> -->
                  <span>{{ targetAmount.toFixed(2) }}</span>
                </div>
              </div>
              <div class="recordInfo">
                <div
                  class="box"
                  v-for="(item, index) in recordList"
                  :key="index"
                  @click="showAllPlayer(item)"
                >
                  <div
                    :style="{
                      backgroundColor: grad[item.type].color,
                    }"
                    class="cicrle"
                  ></div>
                  <div class="rightInfo">
                    <div class="num">{{ item.expect }}</div>
                    <div class="hits" :style="{ color: grad[item.type].color }">
                      {{ item.explode }}
                      <span class="hit-unit">X</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="mobileStyle_left" @click="handleRecord">
                <i class="el-icon-s-data"></i>
              </div> -->
              <!-- <div class="trends">
                <img src="./img/trends.svg" alt="" />
                <span>Trends</span>
              </div> -->
            </div>
            <!-- <div class="catdh">
              <div class="rainbow">
                <div class="sprite"></div>
              </div>
              <ul class="stars">
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
                <li><i></i></li>
              </ul>
              <div class="cat">
                <div class="tail">
                  <div class="sprite"></div>
                </div>
                <div class="feet">
                  <div class="sprite"></div>
                </div>
                <div class="poptart"></div>
                <div class="head"></div>
              </div>
            </div> -->
            <!-- <canvas id='canvas' class="canvasback"></canvas> -->
            <div class="canvas-container">
              <!-- <div class="first">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="second">
                  <ul>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="third">
                  <ul>
                    <li></li>
                    <li></li>
                    <li class="floating-1"></li>
                    <li class="floating-1"></li>
                    <li class="floating-2"></li>
                    <li class="floating-2"></li>
                  </ul>
                </div>
                <div class="fourth">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li class="floating"></li>
                    <li class="floating"></li>
                    <li class="floating"></li>
                    <li class="floating"></li>
                  </ul>
                  <span class="smile"></span>
                  <span class="eyes"></span>
                  <span class="cheeks"></span>
                </div>
                <div class=random-stars-container>
                  <span class="random-stars"></span>
                  <span class="random-stars"></span>
                  <span class="random-stars"></span>
                  <span class="random-stars"></span>
                </div> -->
              <canvas
                ref="canvas"
                :width="width"
                :height="height"
                class="cavasInfo"
              ></canvas>
              <div v-if="showWinMoney">
                <WinMoneyDialog :winMoneyObj="winMoneyObj"></WinMoneyDialog>
              </div>
              <!-- <div class="overTen" v-if="isShowRunning">3333</div> -->
              <div class="houseEdge">{{ $tt("Bet.HouseEdge") }} 1%</div>
              <div class="grandBg">
                <img src="./img/grand_bg_slice.png" alt="" />
              </div>
            </div>

            <div class="betContainer">
              <div v-if="tableIndex === 0">
                <Classic
                  @startGame="startGame"
                  @trenBetClick="trenBetClick"
                  @stopAuto="stopAuto"
                  :status="status"
                  :isBet="isBet"
                  :oddsNum="oddsNum"
                  @cashOut="cashOut"
                  @cancelBet="cancelBet"
                  :isStop="isStop"
                  :isStopMoney="isStopMoney"
                  :nowMoney="nowMoney"
                  :isDisabled="isDisabled"
                  ref="classic"
                ></Classic>
              </div>
              <div v-if="tableIndex === 1">
                <TrenBall
                  ref="trenBall"
                  @trenBetClick="trenBetClick"
                  @stopAuto="stopAuto"
                  @betHits="betHits"
                  :trenBet.sync="trenBet"
                  :status1="status1"
                  :isDisabled="isDisabled"
                  :nextAutoBetList="nextAutoBetList"
                >
                </TrenBall>
              </div>
            </div>
            <div class="bottomInfo">
              <div class="tips" @click="openDialogInfo">
                <img src="@/assets/img/help.svg" alt="" />
              </div>
              <div class="musicContorl">
                <img
                  src="@/assets/img/bgMusicClose.svg"
                  alt=""
                  @click="playGameMusic(false)"
                  v-if="isPlayGameMusic"
                />
                <img
                  src="@/assets/img/bgMusicOpen.svg"
                  alt=""
                  @click="playGameMusic(true)"
                  v-if="!isPlayGameMusic"
                />
              </div>

              <div class="musicContorl">
                <img
                  src="@/assets/img/gameMusicOpen.svg"
                  alt=""
                  @click="playBgMusic(false)"
                  v-if="isPlayBgMusic"
                />
                <img
                  src="@/assets/img/gameMusicClose.svg"
                  alt=""
                  @click="playBgMusic(true)"
                  v-if="!isPlayBgMusic"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="gameRight">
          <div class="title">
            <div class="allBets">{{ $tt("Bet.AllBets") }}</div>
            <!-- <div>
              <el-switch
                @change="changeList"
                v-model="isTren"
                inactive-color="#31343C"
                active-color="#13CE66"
              >
              </el-switch>
            </div> -->
          </div>
          <div class="listInfo">
            <div v-if="isTren">
              <RGlist
                :type2List="type2List"
                :type1List="type1List"
                :winList1="winList1"
                :winList2="winList2"
              ></RGlist>
            </div>
            <div v-else>
              <List :normalList="normalList" :winList="winList"></List>
            </div>
          </div>
        </div>
      </div>
      <div v-if="linkItem.indexOf('10010') >= 0">
        <OriginTable :orderList="tableArr" @changeTab="changeTab"></OriginTable>
      </div>
    </div>
    <div v-if="dialogShow">
      <AllPlayer :dialogShow.sync="dialogShow" :listData="listData"></AllPlayer>
    </div>
    <div v-if="dialogGameTip">
      <gameTips :dialogGameTip.sync="dialogGameTip"></gameTips>
      <gameTipsBallTren
        :dialogGameTip.sync="dialogGameTip"
        v-if="tableIndex == 1"
      ></gameTipsBallTren>
    </div>
    <!-- <Login ref="loginDialog" /> -->
    <Crashrecord ref="Crashrecord" />
    <kursus ref="kursus" />
    <audio ref="audioSelect" preload="auto" :src="selectUrl"></audio>
    <audio ref="audioClear" :src="clearUrl"></audio>
    <audio ref="audioWin" :src="winUrl"></audio>
    <audio ref="carshBg" :src="carshBgUrl"></audio>
    <!-- loop="loop" -->
    <audio ref="boom" :src="boomUrl"></audio>
    <audio ref="fly" :src="flyUrl"></audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  carshRecord,
  allPlayerList,
  orderList,
  saveExplodeAutoBet,
  stopExplodeAutoBet,
  getByPlayIdJackpot,
  getByHallId,
} from "@/api/api.js";

export default {
  name: "",
  components: {
    OriginTable: () => import("@/components/Originals/OriginTable.vue"),
    // OriginLeftTabs: () => import("@/components/common/OriginLeftTabs.vue"),
    Classic: () => import("./classic.vue"),
    TrenBall: () => import("./ballTren.vue"),
    List: () => import("./list.vue"),
    RGlist: () => import("./Rlist.vue"),
    WinMoneyDialog: () => import("@/components/Originals/WinMoneyDialog.vue"),
    AllPlayer: () => import("./AllPlayer.vue"),
    // Login: () => import("@/views/Login"),
    gameTips: () => import("./gameTips/index.vue"),
    gameTipsBallTren: () => import("./gameTipsBallTren/index.vue"),
    Crashrecord: () => import("@/components/Originals/Crashrecord/index.vue"),
    kursus: () => import("./dialog/kursus.vue"),
  },
  props: [""],
  data() {
    let t = this;
    return {
      isShowRunning: false,
      isPlayBgMusic: true,
      isPlayGameMusic: true,
      bangExplode: "", //爆炸结果
      server: "BCWin",
      servers: "BCWIN",
      linkItem: "",
      type: "",
      isDisabled: false, //点击自动下注后锁定
      isStop: false,
      status: 3, //1 未开始,2 进行中, 3 : cash out 游戏未结束 4 倒计时开始
      status1: 2, //1 未开始,2 进行中
      isBet: false, //是否点过下注
      currencyId: "", // 货币id
      selectUrl: "/sound/select.mp3", //声音文件
      clearUrl: "/sound/clear.mp3",
      winUrl: "/sound/win.mp3",
      carshBgUrl: "/sound/crashBg.mp3",
      boomUrl: "/sound/crash_boom.mp3",
      flyUrl: "/sound/crash_fly.mp3",
      ctx: "",
      trenBet: [false, false, false, false],
      dialogGameTip: false,
      width: 1000,
      height: 400,
      startX: 50,
      startY: 250,
      nowX: 50,
      nowY: 250,
      beforeX: 50,
      beforeY: 250,
      speed: 20,
      grd: "",
      timer: "",
      websocketTimer: "",
      startTime: 0,
      gameValue: 1,
      xMax: 10000,
      yMax: 1.5,
      points: [],
      tableArr: [],
      text_list: [],
      padding: 50,
      nextAutoBetList: [],
      game_status: {
        status: 0,
        time: 0,
      },
      multiple: "100",
      winAmount: 123.75,
      socket: null,
      is_new: true,
      muenList: [],
      tableIndex: "",
      isTren: false,
      userInfo: "",
      userLogin: false,
      winMoneyObj: {},
      showWinMoney: false,
      normalList: [],
      type2List: [], //Shiba vs doge list
      type1List: [],
      recordList: [],
      winList: [],
      winList1: [],
      winList2: [],
      betInfo: "",
      grad: [
        {
          color: "#43B309",
        },
        {
          color: "#ED6300",
        },
        {
          color: "#FECD5C",
        },
      ],
      dialogShow: false,
      listData: [],
      oddsNum: 0,
      playId: "",
      jackpot: "",
      jbJackpot: "",
      UsdRate: 1,
      isStopMoney: false,
      nowMoney: 0,
      currentTime: "",
      reconnectionTime: "",
      reconnection: false,
      pageType: 1,
      dialogtip: 0,
    };
  },

  computed: {
    ...mapGetters(["getCoin", "getUserCoinInfo"]),
    targetAmount() {
      if (this.getCoin.currencyId == "2001") {
        return this.jbJackpot || 0;
      } else {
        if (this.getCoin.exchangeRate && this.UsdRate) {
          return (this.UsdRate * this.jackpot) / this.getCoin.exchangeRate;
        }
        return 0;
      }
    },
  },
  created() {},
  beforeDestroy() {
    clearTimeout(this.timer);
    clearTimeout(this.websocketTimer);
    this.socket.close();
  },
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        this.muenList = [this.$tt("Bet.Classic"), this.$tt("Bet.Trenball")];
        this.$forceUpdate();
      }
    },
    getCoin: {
      handler(val) {
        // console.log(val, 'val11111111111');
        this.currencyId = val.currencyId;
      },
      immediate: true,
      deep: true,
    },
    $route: {
      handler: function (val, oldVal) {
        this.tableIndex = val.query.playId == "90020" ? 1 : 0;
        this.isTren = val.query.playId == "90020" ? true : false;
      },
      // 深度观察监听
      deep: true,
    },
  },

  mounted() {
    this.showtip();
    this.getMenuList();
    this.$nextTick(() => {
      // document.querySelector('.mainContainer').scrollTo(0, 0)
    });
    this.linkItem = localStorage.getItem("linkItem") || "";
    this.playId = this.$route.query.playId;
    this.tableIndex = this.playId == "90020" ? 1 : 0;
    this.isTren = this.playId == "90020" ? true : false;
    // console.log("getCoin", this.getCoin);
    if (this.getCoin) {
      this.currencyId = this.getCoin.currencyId;
    }
    this.getOrderList(1);
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.grd = this.ctx.createLinearGradient(0, this.height, this.width, 0);
    this.grd.addColorStop(0, "#ffffff");
    this.grd.addColorStop(1, "#7322FF");
    window.initCrashSocket = this.initCrashSocket;
    this.initCrashSocket();
    this.getCarshRecord();
    this.getByPlayIdJackpot();
    this.userLoginStatus();
    this.$refs.carshBg.play();
    // this.setStatus()
    /* loop audio */
    this.loopAudio();
  },
  methods: {
    showtip() {
      let server = "BCWIN";
      if (server == "IDN") {
        let crash = localStorage.getItem("crash");
        if (crash == null || crash == undefined) {
          localStorage.setItem("crash", 1);
        } else {
          localStorage.setItem("crash", 2);
        }
        var num = localStorage.getItem("crash");
        if (num == 1) {
          setTimeout(() => {
            this.$refs.kursus.show();
            localStorage.setItem("crash", 2);
          }, 1000);
          // this.$nextTick( () => {
          //   this.$refs.kursus.show()
          //   localStorage.setItem("crash",2)
          // })
        }
      }
    },
    //查询游戏记录
    handleRecord() {
      this.$refs.Crashrecord.show();
    },
    getMenuList() {
      this.muenList = [];
      getByHallId({ channelId: localStorage.getItem("channelId") }).then(
        (res) => {
          if (res.code == 200) {
            res.data.hallGame.forEach((item) => {
              if (item.playId == 90009) {
                this.muenList.push(this.$tt("Bet.Classic"));
              }
              setTimeout(() => {
                if (item.playId == 90020) {
                  this.muenList.push(this.$tt("Bet.Trenball"));
                }
              }, 200);
            });
          }
        }
      );
    },
    playBgMusic(val) {
      this.isPlayBgMusic = val;
      val ? this.$refs.carshBg.play() : this.$refs.carshBg.pause();
    },
    playGameMusic(val) {
      this.isPlayGameMusic = val;
    },
    /* loop audio */
    loopAudio() {
      const audio = this.$refs.carshBg;
      audio.currentTime = 0;
      audio.play();
      audio.addEventListener("ended", () => {
        this.loopAudio();
      });
    },
    getByPlayIdJackpot() {
      getByPlayIdJackpot({
        channelId: localStorage.getItem("channelId"),
        playId: this.playId,
      }).then((res) => {
        if (res.code == 200) {
          this.jackpot = res.data.jackpot;
          this.jbJackpot = res.data.jbJackpot;
        }
      });
    },
    userLoginStatus() {
      //用户登录状态的监听
      if (!this.userLogin) {
        if (JSON.parse(localStorage.getItem("userInfo"))) {
          this.socket.close();
          this.initCrashSocket();
        } else {
          this.websocketTimer = setTimeout(() => {
            this.userLoginStatus();
          }, 3000);
        }
      }
    },
    initCrashSocket() {
      if (this.socket) this.socket.close();
      if (this.userInfo) this.userLogin = true;
      this.socket = new this.$Socket({
        // url: "wss://ws.bcwin.xyz/explode/ws/",
        url: `${this.$config.ws_url}/explode/ws/`,
      });
      this.socket.on("connect", () => {
        this.socket.send({ contentType: 105 });
      });
      this.socket.on("message", (data) => {
        let _data = JSON.parse(data);
        let _content = JSON.parse(_data.content || "{}");
        // console.log("__status__",_data.contentType)

        switch (_data.contentType) {
          case 100: //下注成功
            // this.sendAnswer();
            // const { type } = _content;
            // this.trenBet[type] = type;
            // this.isBet = false
            // if (this.game_status.status == 1) {
            //   this.status = 3;
            // } else {
            //   this.status = 1;
            // }
            // console.log('下注成功', data)
            this.status1 = 1;
            if (_data.status != 1 && _data.msg == "code_1036") {
              this.$message.error({
                message: "Sorry, you have insufficient balance",
              });
              this.isBet = false;
              this.trenBet = [false, false, false, false];
            } else {
              // this.isBet = true;
            }
            // if (_data.status == 1) {
            // console.log(_content, '_content');
            let currencyItem = this.getUserCoinInfo.find(
              (item) => item.currencyId == _content.currencyId
            );
            // console.log(this.$store.state.user_coin,"this.$store.state.user_coin_change")

            let obj = {
              ..._content,
              icon:
                currencyItem == null
                  ? _content.currencyIcon
                  : currencyItem.icon,
            };

            // this.normalList.push(obj);
            // console.log('下注成功11111', _content.type)
            if ((_content.type == 0 || !_content.type) && _data.status == 1) {
              this.normalList.push(obj);
              // console.log(obj, 'obj');
            } else if (_content.type == 2 || _content.type == 3) {
              this.type2List.push(obj);
            } else if (_content.type == 1) {
              this.type1List.push(obj);
            }
            // }
            break;
          case 101: // cash out
            this.setText(_data.content);
            // this.sendAnswer();
            // console.log(_content,"111111111111111111");
            this.winMoneyObj.winMoney = _content.winMoney;
            this.winMoneyObj.winRatio = _content.explode;

            let content = JSON.parse(_data.content);
            this.getOrderList(1);
            if (this.userInfo && this.userInfo.id == content.userId) {
              if (this.tableIndex == 0) {
                // console.log("我的游戏结束：》》》", _data.content);
                this.isStopMoney = true;
                this.showWinMoney = true;
                this.isBet = false;
                this.isPlayGameMusic &&
                  this.$refs.audioWin &&
                  this.$refs.audioWin.play();
                setTimeout(() => {
                  this.showWinMoney = false;
                }, 2000);
              } else {
                this.trenBet[content.type] = false;
              }
            }

            this.changeNormalList(_content);

            // this.status = 3;

            break;
          case 102: // 爆炸了
            this.isShowRunning = false;
            if (this.isPlayGameMusic && this.$refs && this.$refs.boom) {
              this.$refs.boom.play();
            }
            this.status1 = 2;
            this.game_status.status = 2;
            this.game_status.time = 10;
            this.trenBallStatus = 2;
            this.resetData();
            this.is_new = false;
            // this.status = 3;
            // this.isBet = false;
            this.isStopMoney = false;
            this.nowMoney = 0;
            this.oddsNum = 0;
            this.bangExplode = _content.explode;
            // this.trenBet = [false, false, false, false];
            // console.log(_content);
            this.changeNormalListBang(_content);
            // this.recordList.push({explode:_content.expect, escapeRatio:_content.explode})
            this.getCarshRecord();
            this.$refs.Crashrecord.carshRecord();
            break;
          case 103: //最新下注信息
            // this.normalList = [];

            this.status1 = 1;
            this.status = 4;
            this.normalList = [];
            this.type1List = [];
            this.type2List = [];
            this.winList = [];
            this.winList1 = [];
            this.winList2 = [];
            if (this.betInfo) {
              this.startBet(0, this.betInfo);
              this.betInfo = null;
              this.isBet = true;
            } else {
              this.isBet = false;
            }
            // console.log('nextAutoBetList',this.nextAutoBetList)
            this.trenBet = [false, false, false, false];
            if (this.nextAutoBetList && this.nextAutoBetList.length) {
              this.nextAutoBetList.forEach((item) => {
                // console.log('auto bet',item)
                this.betHits(item);
              });
              this.nextAutoBetList = [];
            }
            if (this.is_new === true) {
              this.setStatus(0, _content.betTime);
              this.is_new = false;
              // this.getCarshRecord();
              // this.status = 3;
            } else {
              this.game_status.status = 0;
              this.trenBallStatus = 0;
              this.game_status.time = _content.betTime;
            }
            break;
          case 104: //爆炸倒计时
            this.gameValue = 1;
            // this.game_status.status = 1;
            this.game_status.status = 0;
            this.game_status.time = 0;
            this.trenBallStatus = 1;
            this.resetData();
            this.startTime = _data.time;
            this.is_new = false;
            this.status = 2;
            this.status1 = 2;
            // this.trenBet = [false, false, false, false]
            break;
          case 105: //中途加入
            if (this.is_new === true && _content.newOdds) {
              this.startTime =
                _content.createTime + (_content.betTime + 0.5) * 1000;
              this.currentTime =
                _content.createTime + (_content.betTime + 0.5) * 1000 + 0.5;
              this.reconnectionTime = _data.time;
              //先执行补线操作
              this.reconnectionReDraw();
              this.currentTime = _data.time;
              this.setStatus(
                1,
                (_data.time - _content.createTime) / 1000 -
                  _content.betTime -
                  0.5
              );
              this.is_new = false;
            } else {
              this.game_status.status = 0;
              this.trenBallStatus = 0;
              this.game_status.time =
                _content.betTime - (_data.time - _content.createTime) / 1000;
              this.setStatus(
                0,
                _content.betTime - (_data.time - _content.createTime) / 1000
              );
              // console.log(_content.betTime - ((_data.time - _content.createTime) / 1000), 'time1111111111');
              // console.log(this.game_status.time, 'this.game_status.time');
            }
            this.reconnection = true;
            break;
          case 107: // trenball 玩法 结果
            let contentInfo = JSON.parse(_data.content);
            this.winMoneyObj.winMoney = contentInfo.winMoney;
            this.winMoneyObj.winRatio = contentInfo.explode;
            if (this.userInfo && this.userInfo.id == contentInfo.userId) {
              // console.log( "contentInfo 107107107107107107107107 107 >>>>>>>", contentInfo);
              this.trenBet[contentInfo.type] = false;
              if (contentInfo.winMoney > 0) {
                this.showWinMoney = true;
                setTimeout(() => {
                  this.showWinMoney = false;
                }, 2000);
              }
            }
            this.changeTrenballList(contentInfo);
            break;
          case 106: // 赔率同步
            this.currentTime = _data.time;
            if (this.is_new === true && this.reconnection) {
              this.startTime = _content.time;
              this.setStatus(1, 0);
              this.is_new = false;
            } else {
              this.game_status.status = 1;
              this.game_status.time = 0;
            }
            break;
          case 333:
            this.$refs.classic.betsNumber =
              _content.quantity == -1 ? "∞" : _content.quantity;
            this.$refs.classic.betMoney = Number(_content.betMoney);
            this.$refs.trenBall.betsNumber =
              _content.quantity == -1 ? "∞" : _content.quantity;
            this.$refs.trenBall.betMoney = Number(_content.betMoney);
            break;
          default:
            break;
        }
      });
      this.socket.on("close", (data) => {
        clearTimeout(this.timer);
        clearTimeout(this.websocketTimer);
        this.setStatus(0, 0);
      });

      this.socket.on("error", (data) => {
        clearTimeout(this.timer);
        clearTimeout(this.websocketTimer);
        this.setStatus(0, 0);
      });
    },
    openDialogInfo() {
      this.dialogGameTip = true;
    },
    trenBetClick(params) {
      this.isPlayGameMusic &&
        this.$refs.audioSelect &&
        this.$refs.audioSelect.play();
      // if (this.game_status.status == 0) {
      saveExplodeAutoBet(params).then((res) => {
        if (res.code == 200) {
          this.isStop = true;
          this.isDisabled = true;
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.isStop = true;
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
      // }
    },
    stopAuto(params) {
      this.isPlayGameMusic &&
        this.$refs.audioClear &&
        this.$refs.audioClear.play();
      this.isDisabled = false;
      stopExplodeAutoBet(params).then((res) => {
        this.isStop = false;
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },
    // sendAnswer() {
    //   this.socket.send({ contentType: 997, content: { userId: "88191816" } });
    // },
    changeTab(data) {
      //记录最后一次点击的标签分页
      this.pageType = data;
      this.getOrderList(data);
    },
    getOrderList(type) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo ? userInfo.id : "";
      var parmas;
      if (type == 1) {
        //全部
        parmas = {
          channelId: localStorage.getItem("channelId"),
          type: type,
          pageNum: 1,
          pageSize: 10,
        };
      } else {
        // 自己
        parmas = {
          channelId: localStorage.getItem("channelId"),
          type: type,
          pageNum: 1,
          pageSize: 10,
          userId: id,
        };
      }
      orderList(parmas).then((res) => {
        let data = res.rows.slice(0, 10);
        let arr = [];
        data.forEach((e) => {
          let obj = {};
          obj = e;

          obj["money"] = this.FillZero(e["money"]);
          obj["winMoney"] = this.FillZero(e["winMoney"]);
          arr.push(obj);
        });
        //判断必须等于最后一次的分页标签才更新列表
        if (this.pageType == type) {
          this.tableArr = arr;
        }
      });
    },
    // classic 手动
    startGame(params) {
      this.isBet = true;
      this.isStopMoney = false;
      this.isPlayGameMusic &&
        this.$refs.audioSelect &&
        this.$refs.audioSelect.play();
      // this.startBet(0, params);
      // console.log("this.game_status.status", this.game_status.status);
      if (this.game_status.status == 1) {
        // 游戏进行中
        let token = window.localStorage.getItem("authToken");
        this.status = 1;
        if (token) {
          // this.startBet(0, params);
          this.betInfo = params;
        } else {
          this.$emit("showLogin");
          return;
        }
      } else if (this.game_status.status == 0) {
        //游戏未开始
        let token = window.localStorage.getItem("authToken");
        if (token) {
          this.startBet(0, params);
        } else {
          this.$emit("showLogin");
          return;
        }
        // this.isBet = true;
      } else {
        this.isBet = false;
      }
    },
    startBet(type, params) {
      this.socket.send({
        contentType: 100,
        content: {
          betMoney: params.betMoney,
          userId: this.userInfo.id,
          odds: params.odds,
          type: type,
          nick: this.userInfo.name,
          currencyId: this.currencyId,
        },
      });
      if (this.game_status.status == 0 || this.betInfo) {
        this.status = 4;
      } else {
        this.status = 1;
      }
      // this.isBet = true;
    },
    cashOut() {
      let token = window.localStorage.getItem("authToken");

      if (token) {
        this.socket.send({
          contentType: 101,
          content: {
            userId: this.userInfo.id,
            nick: this.userInfo.name,
          },
        });
        this.isBet = false;
      } else {
        this.$emit("showLogin");
      }
    },
    cancelBet() {
      this.isBet = false;
      this.status = 2;
      this.betInfo = null;
    },
    // trenball 手动
    betHits(params) {
      let token = window.localStorage.getItem("authToken");
      if (!token || !this.userInfo) {
        return this.$emit("showLogin");
      }
      // console.log("bet click, status:",this.status1)
      if (this.status1 == 1) {
        if (this.trenBet[params.type]) return;
        this.trenBet[params.type] = true;
        this.isPlayGameMusic &&
          this.$refs.audioSelect &&
          this.$refs.audioSelect.play();

        this.socket.send({
          contentType: 100,
          content: {
            betMoney: params.betMoney,
            userId: this.userInfo.id,
            nick: this.userInfo.name,
            currencyId: this.currencyId,
            type: params.type,
          },
        });
      } else {
        const hasBet = this.nextAutoBetList.findIndex(
          (item) => item.type == params.type
        );
        if (hasBet >= 0) {
          // console.log('cancel bet:',params)
          this.trenBet[params.type] = false;
          this.nextAutoBetList.splice(hasBet, 1);
        } else if (!this.trenBet[params.type]) {
          // console.log('next will bet:',params)
          this.trenBet[params.type] = true;
          this.nextAutoBetList.push(params);
        }
      }
    },
    // cash out 后改变normalList的值
    changeNormalList(content) {
      // console.log(content, 'content');
      this.winList = [];
      this.normalList = this.normalList.map((item) => {
        if (item.userId == content.userId) {
          item.cashOut = content.explode + "x";
          item.winMony = content.winMoney;
        }
        return item;
      });

      this.normalList.forEach((item) => {
        if (item.winMony) {
          this.winList.push(item);
        }
      });
      // console.log(this.normalList);

      this.$forceUpdate();
    },
    // 107 Trenball改变后
    changeTrenballList(content) {
      this.winList1 = [];
      this.winList2 = [];

      if (content.type == 2 || content.type == 3) {
        this.type2List = this.type2List.map((item) => {
          if (item.userId == content.userId) {
            if (content.winMoney) {
              item["isWin"] = 1; //1 win 2 lose
              this.winList2.push(item);
            } else {
              item["isWin"] = 2;
            }
            item.betMoney = content.winMoney;
          }
          return item;
        });
      } else if (content.type == 1) {
        this.type1List = this.type1List.map((item) => {
          if (item.userId == content.userId && content.winMoney) {
            item["isWin"] = 1;
            this.winList1.push(item);
          } else {
            item["isWin"] = 2;
          }
          item.betMoney = content.winMoney;
          return item;
        });
      }
      this.$forceUpdate();
    },
    // bang 后改变normalList的值
    changeNormalListBang(content) {
      // console.log(this.normalList);
      this.normalList = this.normalList.map((item) => {
        if (item.expect == content.expect && !item.cashOut) {
          item.cashOut = "bang";
          item.winMony = content.winMoney;
        }
        return item;
      });
      // console.log(this.normalList);
      this.$forceUpdate();
    },
    getRTableList(content) {
      this.RTableList.push(content);
    },
    setStatus(status, time) {
      //  status  ====  0-waiting start  1-started  2-end
      this.game_status.status = status;
      this.game_status.time = time;
      if (this.game_status.status === 1) {
        // let t = this.currentTime - this.startTime;
        // console.log(this.currentTime, 'this.currentTime');
        // console.log(this.startTime, 'this.startTime');
        // for (let i = 0; i < t; i = i + this.speed) {
        //   this.gameValue =
        //     1 + i / 20000 + Math.pow(Math.max((i / 1000 - 10) / 15, 0), 5);
        //   // new (1 + t / 10000 + Math.pow(Math.max(t / 20000, 0), (2.5 + t / 30000)))
        //   console.log(this.gameValue, 'this.gameValue111111111111');
        //   this.points.push([i, this.gameValue]);
        // }
      }
      this.reDraw();
    },
    setText(obj) {
      let objStr = JSON.parse(obj);
      let text = {
        // text: obj.nick + " @" + this.gameValue.toFixed(2),
        text: objStr.userName + " @" + this.gameValue.toFixed(2),
        opacity: 0.7,
        x: 0,
        y: 0,
      };
      this.text_list.push(text);
    },
    reDraw() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.closePath();
      if (this.game_status.status === 0) {
        // console.log( this.game_status.time, ' this.game_status.time--------');
        this.game_status.time = (
          (this.game_status.time * 1000 - 20) /
          1000
        ).toFixed(2);
        if (this.game_status.time <= 0) {
          this.game_status.time = 0;
        }
        this.drawAxis();
        this.drawStartText();
      } else if (this.game_status.status === 1) {
        this.drawAxis();
        this.drawLine();
        this.drawNameText();
        this.drawValueText();
        this.currentTime = this.currentTime + this.speed;
      } else {
        this.game_status.time = (
          (this.game_status.time * 1000 - 20) /
          1000
        ).toFixed(2);
        if (this.game_status.time > 0) {
          this.drawAxis();
          this.drawEndText();
        } else {
          this.game_status.status = 0;
          this.game_status.time = 5;
          this.startTime = new Date().getTime();
        }
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.reDraw();
      }, this.speed);
    },

    reconnectionReDraw() {
      // console.log("补线");
      this.drawAxis();
      this.drawLine();
      this.currentTime = this.currentTime + this.speed;
      while (this.currentTime < this.reconnectionTime) {
        this.reconnectionReDraw();
      }
    },

    resetData() {
      this.nowX = 50;
      this.nowY = 250;
      this.beforeX = 50;
      this.beforeY = 250;
      this.xMax = 10000;
      this.yMax = 1.5;
      this.points = [];
      this.text_list = [];
    },
    drawAxis() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "rgba(255, 255, 255, .4)";

      //y
      this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
      this.ctx.lineTo(this.padding + 0.5, this.padding + 0.5);
      this.ctx.stroke();

      // x
      this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
      this.ctx.lineTo(
        this.width - this.padding + 0.5,
        this.height - this.padding + 0.5
      );
      this.ctx.stroke();

      this.ctx.closePath();
      let xNum,
        baseN = 2,
        maxX = 10,
        baseM = baseN * maxX * 1000,
        minN = 2;
      if (this.xMax <= 10000) {
        xNum = 5;
      } else {
        for (let i = 0; i < 10; i++) {
          if (this.xMax > baseM) {
            baseM = Math.round(baseM / minN) * maxX;
            baseN = Math.round(baseM / maxX / 1000);
            i--;
          } else {
            xNum = this.xMax / (baseN * 1000);
            i = 11;
          }
        }
      }

      let yNum,
        baseY = 0.1,
        maxY = 6,
        baseT = baseY * maxY + 1,
        minY = 2;
      if (this.yMax <= 1.5) {
        yNum = 5;
      } else {
        for (let i = 0; i < 10; i++) {
          if (this.yMax > baseT) {
            baseT = ((baseT - 1) / minY) * maxY + 1;
            baseY = (baseT - 1) / maxY;
            i--;
          } else {
            yNum = (this.yMax - 1) / baseY;
            i = 11;
          }
        }
      }

      // point
      let yLength = Math.floor((this.height - this.padding * 2) / yNum);
      let xLength = Math.floor((this.width - this.padding * 2) / xNum);
      this.ctx.beginPath();
      this.ctx.font = "12px Montserrat-Medium";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "rgba(255, 255, 255, .4)";
      this.ctx.strokeStyle = "rgba(255, 255, 255, .4)";

      for (let i = 0; i < xNum; i++) {
        let xLen = xLength * i;
        this.ctx.fillText(
          Math.round(this.xMax / xNum / 1000) * i,
          this.padding + xLen,
          this.height - this.padding + 15
        );
      }

      for (let i = 0; i < yNum - 1; i++) {
        let y = (
          ((1 + baseY + (i * 100 * (baseY * 100)) / 10000) * 1000) /
          1000
        ).toFixed(1);
        let ylen = yLength * (i + 1);
        this.ctx.fillText(
          y,
          this.padding - 20,
          this.height - this.padding - ylen + 5
        );
      }

      this.ctx.closePath();
    },
    drawLine() {
      this.ctx.beginPath();
      let t = this.currentTime - this.startTime;
      this.gameValue =
        1 + t / 20000 + Math.pow(Math.max((t / 1000 - 10) / 15, 0), 5);
      this.xMax = t < this.xMax ? this.xMax : t;
      this.yMax = this.gameValue < this.yMax ? this.yMax : this.gameValue;
      // console.log(this.points);
      for (let i = 0; i < this.points.length; i++) {
        if (i === 0) {
          this.beforeX =
            ((this.width - this.padding * 2) / this.xMax) * this.points[i][0] +
            this.padding;
          this.beforeY =
            this.height -
            this.padding * 2 -
            ((this.height - this.padding * 2) / (this.yMax - 1)) *
              (this.points[i][1] - 1) +
            this.padding;
        } else {
          this.beforeX =
            ((this.width - this.padding * 2) / this.xMax) *
              this.points[i - 1][0] +
            this.padding;
          this.beforeY =
            this.height -
            this.padding * 2 -
            ((this.height - this.padding * 2) / (this.yMax - 1)) *
              (this.points[i - 1][1] - 1) +
            this.padding;
        }
        let newX =
          ((this.width - this.padding * 2) / this.xMax) * this.points[i][0] +
          this.padding;
        let newY =
          this.height -
          this.padding * 2 -
          ((this.height - this.padding * 2) / (this.yMax - 1)) *
            (this.points[i][1] - 1) +
          this.padding;
        this.ctx.lineTo(this.beforeX, this.beforeY);
        const cX = (this.beforeX + newX) / 2;
        const cY = (this.beforeY + newY) / 2;
        this.ctx.quadraticCurveTo(newX, newY, cX, cY);
      }
      this.nowX =
        ((this.width - this.padding * 2) / this.xMax) * t + this.padding;
      this.nowY =
        this.height -
        this.padding * 2 -
        ((this.height - this.padding * 2) / (this.yMax - 1)) *
          (this.gameValue - 1) +
        this.padding;
      this.ctx.strokeStyle = this.grd;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      this.ctx.closePath();
      this.points.push([t, this.gameValue]);
    },
    drawNameText() {
      let speedX = 0.1;
      let speedY = 0.4;
      if (this.xMax > 10000) {
        speedX = 0.3;
        speedY = 1.2;
      }
      this.ctx.beginPath();
      this.ctx.font = "12px Montserrat-Medium";
      for (let i = 0; i < this.text_list.length; i++) {
        if (this.text_list[i].opacity === 0) {
          this.text_list.splice(i, 1);
          i--;
        } else {
          this.text_list[i].opacity = this.text_list[i].opacity - 0.006;
          if (this.text_list[i].x === 0) {
            this.text_list[i].x = this.nowX - speedX;
            this.text_list[i].y = this.nowY + speedY;
          } else {
            this.text_list[i].x = this.text_list[i].x - speedX;
            this.text_list[i].y = this.text_list[i].y + speedY;
          }
          this.ctx.fillStyle =
            "rgba(255, 255, 255, " + this.text_list[i].opacity + ")";
          this.ctx.fillText(
            this.text_list[i].text,
            this.text_list[i].x,
            this.text_list[i].y
          );
        }
      }
      this.ctx.closePath();
    },
    drawStartText() {
      this.ctx.beginPath();
      this.ctx.font = "46px Montserrat-Bold";
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillText(
        "Start in " + this.game_status.time + " s",
        (this.width - this.padding) / 2,
        (this.height - this.padding) / 2
      );
      this.ctx.closePath();
      // this.isPlayGameMusic && this.$refs.fly && this.$refs.fly.load();
      this.isPlayGameMusic && this.$refs.fly && this.$refs.fly.play();
    },

    drawValueText() {
      // console.log(this.gameValue, 'gamevalue');
      this.ctx.beginPath();
      this.ctx.font = "32px Montserrat-Bold";
      this.ctx.fillStyle = "#ffffff";

      this.oddsNum = this.gameValue.toFixed(2);

      this.ctx.fillText(
        this.gameValue.toFixed(2) + "x",
        (this.width - this.padding) / 2,
        (this.height - this.padding) / 2
      );
      if (this.gameValue.toFixed(2) >= 2) {
        this.isShowRunning = true;
      }
      this.ctx.closePath();
    },
    drawEndText() {
      this.ctx.beginPath();
      this.ctx.font = "42px Montserrat-Bold";
      this.ctx.fillStyle = "#eb5d0f";
      this.ctx.fillText(
        "Bang @" + this.bangExplode + " x",
        (this.width - this.padding) / 2,
        (this.height - this.padding) / 2
      );
      this.ctx.closePath();
    },
    handleButton() {},
    handleTabs(val) {
      this.tableIndex = val;
      this.isBet = false;
      if (val === 0) {
        this.isTren = false;
      } else {
        this.isTren = true;
      }
    },
    changeList(val) {
      this.isTren = val;
      if (val) {
        this.tableIndex = 1;
      } else {
        this.tableIndex = 0;
      }
    },
    getCarshRecord() {
      let pageSize;
      let num = document.documentElement.clientWidth;
      if (num < 750) {
        pageSize = 3;
      } else {
        pageSize = 6;
      }
      let params = {
        pageNum: 1,
        pageSize,
        channelId: localStorage.getItem("channelId"),
      };
      carshRecord(params).then((res) => {
        if (res.code == 200) {
          this.recordList = res.rows.reverse();
          this.recordList.forEach((item) => {
            if (Number(item.explode) <= 2) {
              item.type = 1;
            } else if (Number(item.explode) > 2 && Number(item.explode) < 10) {
              item.type = 0;
            } else if (Number(item.explode) > 10) {
              item.type = 2;
            }
          });
          this.$forceUpdate();
        }
      });
    },
    showAllPlayer(item) {
      this.dialogShow = true;
      let params = {
        channelId: localStorage.getItem("channelId"),
        expect: item.expect,
        // userId: this.userInfo.user.id,
      };
      allPlayerList(params).then((res) => {
        if (res.code == 200) {
          this.listData = res.rows;
          this.dialogShow = true;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "./style/head.scss";
@import "./style/colorful.scss";
@import "./style/backcolor.scss";
@import "./style/cat.scss";

a {
  text-decoration: none;
}

a img {
  display: block;
  border: none;
}

li {
  list-style: none;
}

#canvas {
  background: #000;
  display: block;
}

@media screen and (min-device-width: 160px) and (max-width: 899px) {
  ::v-deep .input-item {
    font-size: 26px;
  }
}

.crash {
  position: relative;
  background-color: #24262b;
  padding: 0px 20px;

  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    padding: 0px;
  }

  .reconnectSocket {
    width: 100px;
    background-color: #58ae14;
  }

  .game-view {
    // @media screen and (min-device-width: 2000px) and (max-width: 5000px) {
    //   max-width: 1268px;
    // }
    // max-width: 1268px;
    position: relative;
    height: auto;
    display: flex;
    margin: 0px auto;
    padding-top: 20px;
    flex-direction: column;
    justify-content: center;

    .content {
      position: relative;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;

      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        display: block;
      }

      .gameLeft {
        position: relative;
        // width: 650px;
        margin-left: 40px;
        width: 60%;
        max-width: 750px;
        min-width: 350px;
        padding-bottom: 30px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          max-width: 95%;
          width: 95%;
          height: auto;
          margin: 0 auto;
        }

        .mobileStyle {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .moblileTrends {
          display: none;
          margin-right: 100px;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            display: block;
          }

          img {
            width: 22px;
            height: 22px;
          }

          span {
            font-size: 16px;
            color: #818a95;
            margin-left: 10px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              font-size: 24px;
            }
          }
        }

        .tabsInfo {
          width: 180px;
          height: 36px;
          line-height: 36px;
          background-color: #2d3037;
          color: rgba(153, 164, 176, 0.8);
          display: flex;
          align-items: center;
          border-radius: 22px;
          cursor: pointer;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 300px;
            height: 60px;
            line-height: 60px;
            border-radius: 35px;
          }

          .tabItem {
            min-width: 90px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              min-width: 150px;
              font-size: 26px;
            }
          }

          .game-tabs-navs-active {
            color: #f5f6f7;
            font-size: 14px;
            background-image: linear-gradient(to left, #f12c4c, #cc2843);
            font-stretch: normal;
            border-radius: 22px;
            font-weight: 700px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Montserrat-Bold;
            cursor: pointer;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              height: 60px;
              width: 150px;
              border-radius: 35px;
              font-size: 26px;
            }
          }

          .game-tabs-navs-inactive {
            color: #f5f6f7;
            font-size: 14px;
            background-image: linear-gradient(to left, #f12c4c, #cc2843);
            font-stretch: normal;
            border-radius: 22px;
            font-weight: 700px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Montserrat-Bold;
            cursor: pointer;
          }
        }

        .mobileStyle_left {
          margin-left: 10px;
          font-size: 24px;
          color: #687079;
          cursor: pointer;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            margin-left: 10px;
            font-size: 25px;
            color: #687079;
            cursor: pointer;
          }

          .trend {
            font-size: 14px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              font-size: 26px;
            }
          }
        }

        .contentInfo {
          position: relative;
          background-color: #17181b;
          height: 1000px;
          margin-top: 17px;
          // padding-bottom: 30px;
          border-radius: 22px;
          // border-top-right-radius: 22px;
          // border-top-left-radius: 22px;
          height: auto;

          .crashRecord {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            padding: 20px 20px 0px 20px;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              height: 80px;
              flex-direction: row;
              justify-content: space-evenly;
              align-items: center;
              // padding: 20px 5px;
              padding-top: 20px;
            }

            .bankRoll {
              position: relative;
              padding: 5px 10px;
              font-size: 15px;
              background-color: #222328;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: "Montserrat-Bold";

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                width: 35%;
                height: 100%;
                padding: 0px 10px;
                padding-bottom: 10px;
                // height: 70px;
                overflow: hidden;
              }

              .top {
                display: flex;
                justify-content: center;
                align-items: center;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  padding: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .text1 {
                  font-size: 14px;
                  font-weight: 500;
                  color: #58ae14;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    font-size: 13px;
                  }
                }

                .text2 {
                  font-size: 13px;
                  font-weight: 500;
                  color: #818a95;
                  margin-left: 5px;
                }
              }

              .bottom {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 2px;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  font-size: 13px;
                }

                img {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    width: 20px;
                    height: 20px;
                  }
                }

                span {
                  font-size: 14px;
                  font-weight: 500;
                  color: white;
                  margin-left: 5px;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    font-size: 15px;
                  }
                }
              }
            }

            .recordInfo {
              background-color: #222328;
              border-radius: 4px;
              width: 500px;
              height: 100%;
              display: flex;
              align-items: center;
              margin-left: 20px;
              justify-content: space-between;
              padding: 0px 10px;

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                width: 80%;
                height: 100%;
                // margin-left: 5px;
                border-radius: 4px;
                font-size: 22px;
                overflow: hidden;
                overflow-x: auto;
              }

              .box {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 3px;
                box-sizing: border-box;

                @media screen and (min-device-width: 160px) and (max-width: 899px) {
                  margin-left: 5px;
                }

                .cicrle {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  // background-color: #58ae14;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    width: 8px;
                    height: 8px;
                  }
                }

                .rightInfo {
                  margin-left: 5px;
                  text-align: left;
                  font-size: 15px;

                  @media screen and (min-device-width: 160px) and (max-width: 899px) {
                    margin-left: 5px;
                  }

                  .num {
                    color: rgba(153, 164, 176, 0.5);
                    font-size: 12px;

                    @media screen and (min-device-width: 160px) and (max-width: 899px) {
                      font-size: 13px;
                    }
                  }

                  .hits {
                    // color: #58ae14;
                    margin-top: 5px;

                    .hit-unit {
                      font-size: 12px;
                    }

                    @media screen and (min-device-width: 160px) and (max-width: 899px) {
                      font-size: 13px;
                    }
                  }
                }
              }
            }

            .trends {
              margin-left: 10px;
              display: flex;
              align-items: center;

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                display: none;
              }

              img {
                width: 22px;
                height: 22px;
              }

              span {
                font-size: 16px;
                color: #818a95;
                margin-left: 10px;
              }
            }
          }

          .canvas-container {
            // z-index: 200;
            position: relative;
            top: 0;
            left: 0;
            right: 0;

            canvas {
              width: 100%;
              height: 300;
            }

            .overTen {
              color: white;
              position: absolute;
              top: 10%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .houseEdge {
              background-color: #222429;
              line-height: 36px;
              text-align: center;
              color: rgba(153, 164, 176, 0.6);
              border-radius: 22px;
              float: right;
              margin-top: 15px;
              padding: 0px 20px;
              margin-right: 20px;

              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                padding: 5px 20px;
                font-size: 15px;
                border-radius: 22px;
                margin-top: 25px;
              }
            }

            .grandBg {
              img {
                width: 100%;
                height: 36px;
              }
            }
          }

          .betContainer {
            position: relative;
            width: 100%;

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              // width: 90vw;
              margin: 0 auto;
            }
          }

          .bottomInfo {
            height: 64px;
            // border-top: 1px solid rgba(255, 255, 255, 0.1);
            background-color: #17181b;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            // border-bottom-left-radius: 22px;
            // border-bottom-right-radius: 22px;
            padding: 0px 20px;
            gap: 15px;

            // @media screen and (min-device-width: 160px) and (max-width: 899px) {
            //   height: 80px;
            // }

            .tips {
              color: white;
              width: 25px;
              cursor: pointer;

              // @media screen and (min-device-width: 160px) and (max-width: 899px) {
              //   padding: 0px 10px;
              // }

              img {
                width: 25px;
                height: 25px;

                // @media screen and (min-device-width: 160px) and (max-width: 899px) {
                //   width: 25px;
                //   height: 25px;
                // }
              }
            }

            .musicContorl {
              // margin-right: 25px;

              img {
                cursor: pointer;
                width: 25px;
                height: 25px;

                // @media screen and (min-device-width: 160px) and (max-width: 899px) {
                //   width: 25px;
                //   height: 25px;
                // }
              }
            }
          }
        }
      }

      .gameRight {
        position: relative;
        // width: 440px;
        width: 38%;
        max-width: 450px;
        margin-left: 10px;
        margin-right: 6px;

        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          max-width: 95%;
          width: 95%;
          height: auto;
          margin: 0 auto;
        }

        .title {
          display: flex;
          align-items: center;
          padding-right: 15px;
          padding-top: 15px;
          justify-content: space-between;

          .allBets {
            color: white;
            font-size: 28px;
            font-family: "Montserrat-Bold";

            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              font-size: 25px;
            }
          }

          ::v-deep .el-switch__core {
            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              height: 40px;
              width: 90px !important;
              border-radius: 35px;
            }
          }

          ::v-deep .el-switch__core:after {
            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              width: 35px;
              height: 35px;
            }
          }

          ::v-deep .el-switch__core::after {
            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              margin-left: 0px;
            }
          }

          ::v-deep .el-switch.is-checked .el-switch__core::after {
            @media screen and (min-device-width: 160px) and (max-width: 899px) {
              left: 58%;
            }
          }
        }

        .listInfo {
          position: relative;
          width: 100%;
          height: 868px;
          border-radius: 22px;
          background-color: #1e2024;
          margin-top: 17px;
          padding: 0px 10px;

          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            padding: 0px 0px;
          }
        }
      }
    }
  }
}
</style>
