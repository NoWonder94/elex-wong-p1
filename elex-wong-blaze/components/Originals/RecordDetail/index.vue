<template>
  <div>
    <div
      class="record_detail m-navba"
      :class="{
        fadeIn: isin == 'fadeIn',
        fadeout: isin == 'fadeout',
        fadeon: isin == 'fadeon',
      }"
    >
      <el-dialog
        :visible="true"
        :modal="false"
        @close="dialogClose"
        class="classplanA"
      >
        <div class="header">
          <span>Bet Slip</span>
          <i @click="dialogClose" class="el-icon-close"></i>
        </div>
        <div class="content">
          <!-- <div class="isWin">
          <img
            src="../../../assets/image/games/fly/win1.png"
            alt=""
          />
        </div> -->
          <div class="userInfo">
            <div class="maxUserId">
              Betting ID:{{ itemInfo.userId }}
              <img src="./img/fuzhi.png" alt="" />
            </div>
            <div class="userName">
              BY &nbsp<span class="name">{{ itemInfo.userName }}&nbsp</span> On
              <span class="time">{{ itemInfo.createTime }}</span>
            </div>

            <!-- <div class="time">{{ getTime(itemInfo.createTime) }}</div> -->
          </div>
          <div class="recordItem">
            <div class="amount item">
              <div class="top">
                <img src="./img/icon_amount.png" alt="" />
                <div>{{ $tt("Bet.Amount") }}</div>
              </div>
              <div class="bottom">
                {{ itemInfo.amount }}
                {{ currencyInfo && currencyInfo.currencyName }}
              </div>
            </div>
            <div class="amount item item2">
              <div class="top">
                <img src="./img/icon_payout.png" alt="" />
                <div>{{ $tt("Bet.Payout") }}</div>
              </div>
              <div class="bottom">{{ itemInfo.payout }}</div>
            </div>
            <div class="amount item item2">
              <div class="top">
                <img src="./img/icon_profit.png" alt="" />
                <div>{{ $tt("home.Profit") }}</div>
              </div>
              <div
                class="bottom profitc"
                :class="{ active: parseFloat(itemInfo.profit) > 0 }"
              >
                {{ itemInfo.profit }}
                {{ currencyInfo && currencyInfo.currencyName }}
              </div>
            </div>
          </div>
          <!--  <div class="recordGame">
            <div class="game_left">
              <div class="game_img">
                <img :src="gameMes.imgPlay" alt="" />
              </div>
              <div class="game_mes">
                <span class="game_name">{{ gameMes.gameName }}</span>
                <span class="game_from">BC original</span>
              </div>
            </div>
            <div class="game_right">
              <span @click="dialogClose"> Play Now</span>
            </div>
          </div>
          <div class="recordRes">
            <div class="resitem resitemL">
              <div>
                <img src="./img/icon_profit.png" alt="" />
                {{ $tt("Bet.Result") }}
              </div>
              <div class="res_mes">{{ itemInfo.result }}</div>
            </div>
            <div class="resitem resitemL">
              <div><img src="./img/icon_profit.png" alt="" /> Bet</div>
              <div class="res_mes">{{ itemInfo.bet }}</div>
            </div>
            <div class="resitem">
              <div><img src="./img/icon_profit.png" alt="" />Change</div>
              <div class="res_mes">{{ itemInfo.chance }}</div>
            </div>
          </div>
          <div class="recordSeed">
            <div class="seed_title">
              <h2>Server Seed</h2>
            </div>
            <div class="seed_content">
              <span>The seed hasn't been revealed yet.</span>
            </div>
          </div>
          <div class="recordSeed">
            <div class="seed_title">
              <h2>Server Seed</h2>
              <h2 class="seed_s">Seed Settings</h2>
            </div>

            <div class="seed_content seed_hash">
              <span>The seed hasn't been revealed yet.</span>
            </div>
          </div>
          <div class="record_bottom">
            <span>Verift</span>
          </div> -->
        </div>
      </el-dialog>
      <div class="record_content">
        <div class="header">
          <span>Bet Slip</span>
          <i @click="dialogClose" class="el-icon-close"></i>
        </div>
        <div class="content">
          <!-- <div class="isWin">
          <img
            src="../../../assets/image/games/fly/win1.png"
            alt=""
          />
        </div> -->
          <div class="userInfo">
            <div class="maxUserId">
              Betting ID:{{ itemInfo.userId }}
              <img src="./img/fuzhi.png" alt="" />
            </div>
            <div class="userName">
              BY &nbsp<span class="name">{{ itemInfo.userName }}&nbsp</span> On
              <span class="time">{{ itemInfo.createTime }}</span>
            </div>

            <!-- <div class="time">{{ getTime(itemInfo.createTime) }}</div> -->
          </div>
          <div class="recordItem">
            <div class="amount item">
              <div class="top">
                <img src="./img/icon_amount.png" alt="" />
                <div>{{ $tt("Bet.Amount") }}</div>
              </div>
              <div class="bottom">
                {{ itemInfo.amount }}
                {{ currencyInfo && currencyInfo.currencyName }}
              </div>
            </div>
            <div class="amount item item2">
              <div class="top">
                <img src="./img/icon_payout.png" alt="" />
                <div>{{ $tt("Bet.Payout") }}</div>
              </div>
              <div class="bottom">{{ itemInfo.payout }}</div>
            </div>
            <div class="amount item item2">
              <div class="top">
                <img src="./img/icon_profit.png" alt="" />
                <div>{{ $tt("home.Profit") }}</div>
              </div>
              <div
                class="bottom profitc"
                :class="{ active: parseFloat(itemInfo.profit) > 0 }"
              >
                {{ itemInfo.profit }}
                {{ currencyInfo && currencyInfo.currencyName }}
              </div>
            </div>
          </div>
          <!-- <div class="recordGame">
            <div class="game_left">
              <div class="game_img">
                <img :src="gameMes.imgPlay" alt="" />
              </div>
              <div class="game_mes">
                <span class="game_name">{{ gameMes.gameName }}</span>
                <span class="game_from">BC original</span>
              </div>
            </div>
            <div class="game_right">
              <span @click="dialogClose"> Play Now</span>
            </div>
          </div>
          <div class="recordRes">
            <div class="resitem resitemL">
              <div>
                <img src="./img/icon_profit.png" alt="" />
                {{ $tt("Bet.Result") }}
              </div>
              <div class="res_mes">{{ itemInfo.result }}</div>
            </div>
            <div class="resitem resitemL">
              <div><img src="./img/icon_profit.png" alt="" /> Bet</div>
              <div class="res_mes">{{ itemInfo.bet }}</div>
            </div>
            <div class="resitem">
              <div><img src="./img/icon_profit.png" alt="" />Change</div>
              <div class="res_mes">{{ itemInfo.chance }}</div>
            </div>
          </div>
          <div class="recordSeed">
            <div class="seed_title">
              <h2>Server Seed</h2>
            </div>
            <div class="seed_content">
              <span>The seed hasn't been revealed yet.</span>
            </div>
          </div>
          <div class="recordSeed">
            <div class="seed_title">
              <h2>Server Seed</h2>
              <h2 class="seed_s">Seed Settings</h2>
            </div>

            <div class="seed_content seed_hash">
              <span>The seed hasn't been revealed yet.</span>
            </div>
          </div>
          <div class="record_bottom">
            <span>Verift</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  props: ["itemInfo", "dialogShow", "type", "playId"],
  data() {
    return {
      currencyInfo: "",
      gameMes: {},
      isin: true,
      list: [],
      isin: "fadeIn",
      info_box: {
        result: ",",
        amount: "",
        payout: "",
        profit: "",
        bet: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserCoinInfo"]),
  },
  beforeMount() {},
  destroyed() {},
  mounted() {

    this.gameMes = this.itemInfo;

    this.currencyInfo = this.getUserCoinInfo.find(
      (item) => item.currencyId == this.itemInfo.currencyId
    );
    // console.log(this.itemInfo, '11111111111111111111');

    // let list = JSON.parse(sessionStorage.getItem("House_List"));
    // console.log(list);
    // this.gameMes = list.find((value) => value.playId == this.playId);
    // console.log(this.gameMes);
    let num = document.documentElement.clientWidth;
    if (num > 750) this.isin = "fadeon";
  },
  methods: {
    dialogClose() {
      let num = document.documentElement.clientWidth;
      if (num < 750) {
        this.isin = "fadeout";
        setTimeout(() => {
          this.isSignin = false;
          this.collapsed = false;
          this.$emit("update:dialogShow", false);
          this.loginFrom = {};
          this.isin = "fadeIn";
        }, 300);
      } else {
        this.isSignin = false;
        this.collapsed = false;
        this.$emit("update:dialogShow", false);
        this.loginFrom = {};
      }
    },
    getTime(time) {
      return timeTransForms(time);
    },
    imgFuc() {},
  },
  UpdateCommResult() {
    let gid = this.viewParams.playId;
    let info = this.viewParams.content;
    if (gid === MoudleId.ClassicDice) {
      if (info.type == 1) {
        this.info_box.bet.string = "<" + info.end;
      } else {
        this.info_box.bet.string = ">" + info.end;
      }
      this.info_box.result.string = this.viewParams.progress;
      this.info_box.chance.string = "";

      let _selectedNumCount = info.end - info.start;
      this.info_box.chance.string = _selectedNumCount + "%";
    } else if (gid === MoudleId.limboGame) {
      let payout = +info.odds;
      this.info_box.result.string = this.viewParams.progress;
      this.info_box.bet.string = ">=1.01";
      let val = (1.01 / payout) * 98.0198;
      this.info_box.chance.string = val.toFixed(2) + "%";
    } else if (gid === MoudleId.HashDice) {
      let payout = +info.odds;
      this.info_box.result.string = this.viewParams.progress;

      if (info.type == 1) {
        this.info_box.bet.string = ">" + info.start;
      } else {
        this.info_box.bet.string = "<" + info.end;
      }

      let val = ((0.980003 * 1.0102) / payout) * 100;
      this.info_box.chance.string = val.toFixed(2) + "%";
    }
  },
  watch: {
    // itemInfo() {
    // },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate(1000px, 0);
    transform: stranslate(1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0px, 0);
    transform: stranslate(0px, 0);
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
    -webkit-transform: translate(0px, 0);
    transform: stranslate(0px, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(1000px, 0);
    transform: stranslate(1000px, 0);
  }
}
.fadeIn {
  animation: fadeInRight 0.5s forwards;
}
.fadeout {
  animation: fadeOutRight 0.7s forwards;
}
@import "./recordWeb.scss";
@import "./recordH5.scss";
</style>
