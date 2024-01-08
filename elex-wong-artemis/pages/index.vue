<template>
  <div class="index pb-5">

    <carousel :per-page="1" :mouse-drag="true" :adjustableHeight="false" :paginationPadding="5" :paginationSize="5"
      paginationPosition="bottom-overlay" :loop="true" :autoplay="true" :autoplayTimeout="5000">
      <slide>
        <div class="header">
          <div class="header-text text-center pt-3">
            <lottie-animation path="lottie/crypto-bitcoin.json" :loop="true" :autoPlay="true"
              class="header-animation" />
            <div class="header-text-value mt-1">
              <img src="../assets/img/Bank transactions.svg" />
              {{ $t("home.total_value_locked") }}
            </div>
            <!-- <div class="total-value">
              <b><ScrollDigit :digits="config != null ? config.total_lock_amount : 0"></ScrollDigit></b>
            </div> -->
            <div class="total-value">
              <b>
                <AnimatedValue title="total-locked-number" :number="totalLocked" />
              </b>
            </div>
          </div>
        </div>
      </slide>
      <slide v-for="(item, index) in banners" :key="index">
        <div class="slide-container">
          <img class="vault-buy-bot-bg" :src="item" />
        </div>
      </slide>

    </carousel>

    <div class="container">
      <div class="address row card-shadow text-center fw-bold mx-1 mb-2 py-3">
        <!-- <div class="d-flex flex-column px-3 flex-grow-1 border-end">
          <div class="grey address-title">
            <img src="../assets/img/Bank transactions.svg" />
            {{ $t("home.total_value_locked") }}
          </div>
          <div>
            <AnimatedValue title="total-locked-number" :number="totalLocked" />
          </div>
        </div> -->
        <!-- <div class="px-4">
          <hr class="line-break" />
        </div> -->
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex flex-column px-3 flex-grow-1 border-end">
            <div class="grey address-title">
              <img src="../assets/img/Progress graph.svg" />
              {{ $t("home.hr24_new_address") }}
            </div>
            <div>
              <AnimatedValue title="hr24-add-number" :number="hr24Address"></AnimatedValue>
            </div>
          </div>
          <div class="d-flex flex-column px-3 flex-grow-1">
            <div class="grey address-title">
              <img src="../assets/img/Money growth.svg" />
              {{ $t("home.total_address_num") }}
            </div>
            <div>
              <AnimatedValue title="total-add-number" :number="totalAddress"></AnimatedValue>
            </div>
          </div>
        </div>
      </div>
      <div class="rate card-shadow fw-bold mx-1 mb-2">
        <div class="row">
          <div class="col ms-3">
            <div class="grey">{{ $t("home.remaing_balance_quota") }}</div>
            <div class="blue amount">
              <!-- <ScrollDigit :digits="config != null ? config.remaining_deposit_amount : 0"></ScrollDigit> -->
              <AnimatedValue title="remaining-number" :number="remaining"></AnimatedValue>
            </div>
          </div>
          <div class="col me-3">
            <div class="grey blue text-end">
              {{ $t("home.estimated_opening_time") }}
            </div>
            <div class="ending text-center">
              <div class="grey-box">{{ end.hour }}</div>
              :
              <div class="grey-box">{{ end.min }}</div>
              :
              <div class="grey-box">{{ end.sec }}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col ms-3">
            <div class="grey">{{ $t("home.ytd_profit_rate") }}</div>
            <div class="amount number-text">{{ ytdReturn }}%</div>
          </div>
          <div class="col me-3">
            <div class="grey text-end">{{ $t("home.week_profilt_rate") }}</div>
            <div class="text-end amount number-text">{{ weekReturn }}%</div>
          </div>
        </div>
        <div class="row">
          <div class="col fund-title">
            <img src="../assets/img/money.svg" />
            <div class="grey">{{ $t("home.fund_used_rate") }}</div>
          </div>
          <div class="col">
            <div class="grey text-end">{{ usedFund }}%</div>
          </div>
        </div>
        <div class="mt-2 pb-3">
          <b-progress :value="usedFund" :max="100" class="mb-3"></b-progress>
          <!-- <div class="progress-bar">
          </div> -->
        </div>
      </div>
      <div class="introduction row card-shadow mx-1 mb-3 py-3 px-2">
        <div v-for="(item, index) in cyptoList" :key="item.id">
          <div :class="[
            'd-flex',
            'flex-row',
            'justify-content-between',
            'align-items-center',
            'py-3',
            index != cyptoList.length - 1 ? 'dash_border_bottom' : '',
          ]">
            <div class="d-flex">
              <img :src="
                'https://s2.coinmarketcap.com/static/img/coins/128x128/' +
                item.id +
                '.png'
              " alt="" class="bit-logo me-3" />
              <div class="d-flex flex-column justify-content-between">
                <div class="bit-name">{{ item.name }}</div>
                <div class="fw-bold bit-symbol">{{ item.symbol }}</div>
              </div>
            </div>
            <div class="d-flex flex-column align-items-end">
              <!-- <b>$<AnimatedValue :title="'cryto-'+index" :number="item.quote.USD.price.toFixed(4)"/></b> -->
              <AnimatedValue prefix="$" :title="'cryto-'+index" :number="item.quote.USD.price.toFixed(4)" />
              <div style="font-size: 12px; font-weight: bold" :class="[
                item.quote.USD.percent_change_1h < 0 ? 'red' : 'green',
              ]">
                {{
                item.quote.USD.percent_change_1h > 0
                ? "+ " +
                parseFloat(item.quote.USD.percent_change_1h.toFixed(4))
                : "- " +
                parseFloat(
                (item.quote.USD.percent_change_1h * -1).toFixed(4)
                )
                }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction row card-shadow mx-1 mb-3">
        <div @click="routeToIntroduction" class="
            d-flex
            justify-content-between
            align-items-center
            blue-background
            py-3
          ">
          <div class="title">
            <img src="../assets/img/Artemis_icon.png" />
            {{ $t("home.artemis_introduction") }}
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="d-flex px-3 pt-3">
          <div class="icon">
            <img src="../assets/img/Graph.svg" />
          </div>
          <div class="d-flex flex-column px-2">
            <div class="fw-bold">{{ $t("home.intro1_title") }}</div>
            <div class="grey">
              {{ $t("home.intro1_desc") }}
            </div>
          </div>
        </div>
        <div class="d-flex px-3 py-3">
          <div class="icon">
            <img src="../assets/img/Business analytics.svg" />
          </div>
          <div class="d-flex flex-column px-2">
            <div class="fw-bold">{{ $t("home.intro2_title") }}</div>
            <div class="grey">
              {{ $t("home.intro2_desc") }}
            </div>
          </div>
        </div>
        <div class="d-flex px-3 pb-3">
          <div class="icon">
            <img src="../assets/img/Send money.svg" />
          </div>
          <div class="d-flex flex-column px-2">
            <div class="fw-bold">{{ $t("home.intro3_title") }}</div>
            <div class="grey">{{ $t("home.intro3_desc") }}</div>
          </div>
        </div>
      </div>
      <div class="contracts mb-4">
        <div class="d-flex align-items-center pb-1">
          <img class="ms-1 me-2" src="../assets/img/resources-16.png" />
          <div class="fw-bold">{{ $t("home.open_source_contract") }}</div>
        </div>
        <div class="card-shadow row mx-1 p-2">
          <div class="
              d-flex
              justify-content-between
              align-items-center
              py-2
              contract-item
            " v-for="item in contracts" :key="item.id">
            <div class="grey">{{ item.display_contract }}</div>
            <div class="view" @click="openContract(item.contract)">
              {{ $t("utils.view") }}
            </div>
          </div>
        </div>
      </div>
      <div class="partners mb-3">
        <div class="d-flex align-items-center">
          <img class="ms-1 me-2" src="../assets/img/01_partner.png" />
          <div class="fw-bold">{{ $t("home.strategic_partner") }}</div>
        </div>
        <div class="row row-cols-3 m-1 partner">
          <div class="col" v-for="(item, index) in partnerList" :key="index" @click="openUrl(item.url)">
            <div class="white">
              <img :src="item.img" />
            </div>
          </div>
        </div>
      </div>
      <div class="contact text-center">
        <div class="d-flex align-items-center pb-1">
          <img class="ms-1 me-2" src="../assets/img/chat.png" />
          <div class="fw-bold">{{ $t("home.contact_us") }}</div>
        </div>
        <div class="card-shadow mx-1 row px-2 py-4">
          <div class="d-flex justify-content-around align-items-center">
            <div class="
                d-flex
                flex-column
                align-items-center
                contact-img
                flex-grow-1
              ">
              <div class="contact-img border-end pb-1" role="button" @click="openUrl(config.facebook)">
                <img src="../assets/img/facebook.png" />
              </div>
              <div class="grey">Facebook</div>
            </div>
            <div class="
                d-flex
                flex-column
                align-items-center
                contact-img
                flex-grow-1
              ">
              <div class="contact-img border-end pb-1" role="button" @click="openUrl(config.telegram)">
                <img src="../assets/img/telegram.png" />
              </div>
              <div class="grey">Telegram</div>
            </div>
            <div class="
                d-flex
                flex-column
                align-items-center
                contact-img
                flex-grow-1
              ">
              <div class="contact-img pb-1" role="button" @click="openUrl(config.twitter)">
                <img src="../assets/img/twitter.png" />
              </div>
              <div class="grey">Twitter</div>
            </div>
          </div>
          <div class="email">
            <div class="email-add text-center fw-bold">
              {{ config != null ? config.email : "" }}
            </div>
            <div class="copy" role="button" v-clipboard:copy="config != null ? config.email : ''"
              v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{ $t("utils.copy") }}
            </div>
          </div>
          <div class="grey text-center pt-2">
            {{ $t("home.company_email") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      totalLocked: '',
      hr24Address: '',
      totalAddress: '',
      remaining: '',
      ytdReturn: 0,
      weekReturn: 0,
      usedFund: 0,
      end: {
        hour: "00",
        min: "00",
        sec: "00",
      },
      message: "Support@Artemis.com",
      contracts: [],
      partnerList: [
        {
          img: require("../assets/img/1.png"),
          url: "https://www.tokenpocket.pro/",
        },
        { img: require("../assets/img/2.png"), url: "https://www.huobi.com/" },
        {
          img: require("../assets/img/3.png"),
          url: "https://www.binance.com/",
        },
        { img: require("../assets/img/4.png"), url: "https://mdex.com/#/" },
        {
          img: require("../assets/img/5.png"),
          url: "https://www.coinbase.com/",
        },
        {
          img: require("../assets/img/6.png"),
          url: "https://www.coingecko.com/",
        },
        {
          img: require("../assets/img/7.png"),
          url: "https://www.investing.com/",
        },
        { img: require("../assets/img/8.png"), url: "https://coinsniper.net/" },
        {
          img: require("../assets/img/9.png"),
          url: "https://coinmarketcap.com/",
        },
      ],
      banners: [
        // require('../assets/img/banner0.png'),
        require('../assets/img/banner1.png'),
        require('../assets/img/banner2.png'),
        require('../assets/img/banner3.png'),
        require('../assets/img/banner4.png'),
      ],
      cyptoList: [],
      timer1: null,
      timer2: null,
    };
  },
  computed: {
    ...mapState([
      "isLogin",
      "connectedAddress",
      "walletAmount",
      "config",
      "account",
    ]),
  },
  mounted() {
    this.getInitConfig();
    this.init();
    this.updateConfig();
    this.generateTime();
    this.getCrytoList();
  },
  methods: {
    routeToIntroduction() {
      this.$router.push({ path: this.localePath("/introduction") });
    },
    openUrl(url) {
      if (url != "" && url != null) {
        window.open(url);
      }
    },
    openContract(contract) {
      const url = 'https://bscscan.com/address/'; // 正式
      // const url = "https://testnet.bscscan.com/address/"; // 测试
      window.open(url + contract);
    },
    shortAddress(a) {
      if (a == null || a == "") {
        return "";
      }
      return a.slice(0, 10) + "******" + a.substr(a.length - 10);
    },
    updateConfig() {
      if (this.config == null) {
        this.getInitConfig();
        return;
      }
      this.contracts = [];
      this.contracts.push({
        id: 1,
        contract: this.config.contract_deposit,
        display_contract: this.shortAddress(this.config.contract_deposit),
      });
      this.contracts.push({
        id: 2,
        contract: this.config.contract_withdraw,
        display_contract: this.shortAddress(this.config.contract_withdraw),
      });
      this.totalLocked = this.config.total_lock_amount;
      this.hr24Address = this.config.hour24_address_num;
      this.totalAddress = this.config.total_address_num;
      this.remaining = this.config.remaining_deposit_amount;
      this.ytdReturn = this.config.yesterday_profit_rate;
      this.weekReturn = this.config.daily7_profit_rate;
      this.usedFund = this.config.fund_use_rate;
    },
    generateTime() {
      let unix_timestamp =
        this.config != null ? this.config.estimated_opening_time / 1000 : 0;
      var date = new Date(unix_timestamp * 1000).getTime();
      var now = Date.now() / 1000;
      var sec_num = date - now;

      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      this.end.hour = parseInt(hours);
      this.end.min = parseInt(minutes);
      this.end.sec = parseInt(seconds);
    },

    init() {
      const that = this;
      const timer = setInterval(function () {
        if (that.end.min == 0 && that.end.sec == 0) {
          clearInterval(timer);
          return;
        }
        if (that.end.sec == 0) {
          that.end.min -= 1;
          that.end.sec = 60;
        }
        var sec = that.end.sec - 1;
        that.end.sec = sec < 10 ? "0" + sec : sec;
      }, 1000);

      this.timer1 = setInterval(function () {
        that.getInitConfig();
      }, 5000);

      this.timer2 = setInterval(function () {
        that.getCrytoList();
      }, 30000);
    },
    getCrytoList() {
      this.$api
        .requestByPost("system/coins", null)
        .then((result) => {
          if (result.status == true) {
            this.cyptoList = result.data;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    getInitConfig() {
      const that = this;
      this.$api
        .requestByPost("system/init", null)
        .then((result) => {
          if (result.status == true) {
            that.$store.dispatch("updateInitConfig", result.data);
            that.updateConfig();
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    onCopy: function (e) {
      this.$message.success(this.$t("message.copy_successful"));
    },
    onError: function (e) {
      this.$message.success(this.$t("message.copy_failed"));
    },
  },
  beforeDestroy() {
    if (this.timer1 != null) {
      clearInterval(this.timer1);
    }
    if (this.timer2 != null) {
      clearInterval(this.timer2);
    }
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/index.scss";
</style>
