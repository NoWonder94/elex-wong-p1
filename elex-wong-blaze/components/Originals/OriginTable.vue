<template>
  <div class="game-view-table">
    <div class="game-view-table-navs">
      <div
        v-for="(item, index) in muenList"
        :key="index"
        :class="
          tableIndex == item.id ? 'game-tabs-navs-active' : 'game-tabs-navs'
        "
        @click="handleTabs(item.id)"
      >
        <div>{{ item.name }}</div>
      </div>
    </div>
    <!-- all bets -->
    <div v-if="tableIndex === 1" class="game-table-item">
      <div class="game-table-item-title">
        <div v-for="(item, index) in headeArr" :key="index" class="thead">
          {{ item }}
        </div>
      </div>
      <div class="no_data" v-if="isNodata">
        <!-- <img
          src="../../assets/image/home/empty.webp"
          alt=""
        > -->
        <p>{{ $tt("home.data") }}</p>
      </div>
      <div class="game-table-item-content">
        <div v-for="(item, index) in orderList" :key="index" class="tr">
          <div class="td">{{ item.id }}</div>
          <div class="td profit_font">{{ item.userName }}</div>
          <div class="td">{{ item.createTime | getTime }}</div>
          <div class="td">
            <div class="picetur">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div>{{ item.money | capitalize }}</div>
            </div>
          </div>
          <div class="td">{{ item.winRatio }}x</div>
          <div class="td">
            <div class="picetur">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div
                class="profit_font"
                :class="{ active: Number(item.winMoney) == 0 }"
              >
                <span v-if="Number(item.winMoney) == 0">{{
                  item.money | capitalize
                }}</span>
                <span v-else>{{ item.winMoney | capitalize }}</span>
              </div>
            </div>
            <div class="piceturh5">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div
                class="profit_font"
                :class="{ active: Number(item.winMoney) == 0 }"
              >
                <span v-if="Number(item.winMoney) == 0">{{
                  item.money | capitalizes
                }}</span>
                <span v-else>{{ item.winMoney | capitalizes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tableIndex === 0" class="game-table-item">
      <div class="game-table-item-title">
        <div v-for="(item, index) in headeArr" :key="index" class="thead">
          {{ item }}
        </div>
      </div>
      <div class="no_data" v-if="isNodata">
        <!-- <img
          src="../../assets/image/home/empty.webp"
          alt=""
        > -->
        <p>{{ $tt("home.data") }}</p>
      </div>
      <div class="game-table-item-content">
        <div v-for="(item, index) in orderList" :key="index" class="tr">
          <div class="td">{{ item.id }}</div>
          <div class="td profit_font">{{ item.userName }}</div>
          <div class="td">{{ item.createTime | getTime }}</div>
          <div class="td">
            <div class="picetur">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div class="profit_font">{{ item.money | capitalize }}</div>
            </div>
          </div>
          <div class="td">{{ item.winRatio }}x</div>
          <div class="td">
            <div class="picetur">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div
                class="profit_font"
                :class="{ active: Number(item.winMoney) == 0 }"
              >
                <span v-if="Number(item.winMoney) == 0">{{
                  item.money | capitalize
                }}</span>
                <span v-else>{{ item.winMoney | capitalize }}</span>
              </div>
            </div>
            <div class="piceturh5">
              <img
                v-for="(items, indexs) in icons"
                :key="indexs"
                v-if="item.currencyId == items.id"
                :src="items.currencyIcon"
                alt=""
              />
              <div
                class="profit_font"
                :class="{ active: Number(item.winMoney) == 0 }"
              >
                <span v-if="Number(item.winMoney) == 0">{{
                  item.money | capitalizes
                }}</span>
                <span v-else>{{ item.winMoney | capitalizes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: { orderList: { type: Array } },
  data() {
    let t = this;
    return {
      isNodata: false,
      tableIndex: 1,
      icons: [],
      muenList: [
        { name: t.$tt("Bet.AllBets"), id: 1 },
        { name: t.$tt("Bet.MyBets"), id: 0 },
      ],
      headeArr: [
        t.$tt("Bet.BetID"),
        t.$tt("Bet.Player"),
        t.$tt("Bet.Time"),
        t.$tt("Bet.Bet"),
        t.$tt("Bet.Payout"),
        t.$tt("Bet.Profit"),
      ],
      headeArr2: ["Player", "Time", "Bet", "Payout", "Profit"],
      bodyArr: [],
      imgurllist: [
        // { imgurl: require("../../assets/image/vip/BRL.png") },
        // { imgurl: require("../../assets/image/vip/MXN.png") },
        // { imgurl: require("../../assets/image/vip//COP.png") },
        // { imgurl: require("../../assets/image/vip/PEN.png") },
        // { imgurl: require("../../assets/image/vip/usd.png") },
        // { imgurl: require("../../assets/image/vip/GTQ.png") },
        // { imgurl: require("../../assets/image/vip/JB.png") },
        // { imgurl: require("../../assets/image/vip/CLP.png") },
        // {  imgurl:require('../../assets/image/vip/I')},
      ],
    };
  },

  components: {},
  watch: {
    orderList: {
      handler: function (val, oldval) {
        if (val.length == 0) {
          this.isNodata = true;
        } else {
          this.isNodata = false;
        }
        // console.log(val, 'val------------')
      },
      immediate: true, //关键
      deep: true,
    },
    "$i18n.locale"(newValue) {
      if (newValue) {
        (this.muenList = [
          { name: this.$tt("Bet.AllBets"), id: 1 },
          { name: this.$tt("Bet.MyBets"), id: 0 },
        ]),
          this.$forceUpdate();
      }
    },
  },
  computed: {},

  beforeMount() {},

  mounted() {
    this.icons = this.$store.state.coinList;
    // console.log(this.icons);
  },

  methods: {
    handleTabs(index) {
      this.tableIndex = index;
      this.$emit("changeTab", index);
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/common/css/font.scss";
// @import "@/common/css/color.scss";

@import "@/assets/scss/table-web.scss";
@import "@/assets/scss/table-mobile.scss";
</style>
