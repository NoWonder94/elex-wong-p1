<template>
  <div class="game_all">
    <div class="game-recent">
      <div class="jackpot-enter">
        <div class="title">
          <span class="tit">{{ $tt("vip.Bankroll") }}</span
          ><span class="bi">{{ getCoin.currencyName }}</span>
        </div>
        <div class="c1lwazez">
          <img class="coin-icon" :src="getCoin.currencyIcon" />
          <div class="amount">
            <!-- <span class="locale hidden">$</span> -->
            <span class="amount-str">{{ targetAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="list"
        class="recent-list-wrap"
        :class="{ active: list.length == 0 }"
      >
        <div class="empty-item" v-if="list.length == 0">
          <p>{{ $tt("Bet.ResultTips") }}</p>
        </div>
        <div class="empty-item" v-else>
          <div class="history_list">
            <div
              v-for="(item, index) in list"
              @click="lookHistory(item)"
              class="history_item"
              :key="index"
              :class="{ hactive: item.winMoney !== 0 && item.status == 1 }"
            >
              {{ item.winRatio }}x
            </div>
          </div>
        </div>
      </div>

      <!-- classicDice -->
      <div
        v-if="diceList"
        class="recent-list-wrap"
        :class="{ active: !diceList }"
      >
        <p v-if="!diceList">{{ $tt("Bet.ResultTips") }}</p>
        <div class="empty-item" v-else>
          <div class="history_list">
            <div
              v-for="(item, index) in diceList"
              @click="lookHistory(item)"
              class="history_item"
              :key="index"
              :class="{ hactive: item.winMoney !== 0 && item.status == 1 }"
            >
              {{ item.progress }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-recentn">
      <div class="jackpot-enter">
        <div class="title">
          <span class="tit">{{ $tt("vip.Bankroll") }}</span
          ><span class="bi">{{ getCoin.currencyName }}</span>
        </div>
        <div class="c1lwazez">
          <img class="coin-icon" :src="getCoin.currencyIcon" />
          <div class="amount">
            <!-- <span class="locale hidden">$</span> -->
            <span class="amount-str">{{ targetAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div v-if="list" class="recent-list-wrap" :class="{ active: !list }">
        <p v-if="!list">{{ $tt("Bet.ResultTips") }}</p>
        <div class="empty-item" v-else>
          <div class="history_list">
            <div
              v-for="(item, index) in list"
              @click="lookHistory(item)"
              class="history_item"
              :key="index"
              :class="{ hactive: item.winMoney !== 0 && item.status == 1 }"
            >
              {{ item.winRatio }}x
            </div>
          </div>
        </div>
      </div>

      <!-- classicDice -->
      <div
        v-if="diceList"
        class="recent-list-wrap"
        :class="{ active: !diceList }"
      >
        <p v-if="!diceList">{{ $tt("Bet.ResultTips") }}</p>
        <div class="empty-item" v-else>
          <div class="history_list">
            <div
              v-for="(item, index) in diceList"
              @click="lookHistory(item)"
              class="history_item"
              :key="index"
              :class="{ hactive: item.winMoney !== 0 && item.status == 1 }"
            >
              {{ item.progress }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getByPlayIdJackpot } from "@/api/api.js";
export default {
  props: { list: { type: Array }, diceList: { type: Array } },
  data() {
    return {
      showOption: false,
      selected: {},
      selectedName: "",
      search: "",
      isActive: false,
      ishistory: false,
      jackpot: "",
      jbJackpot: "",
      UsdRate: 1,
      timer: null,
    };
  },
  mounted() {
    this.playId = this.$route.query.playId;
    this.getByPlayIdJackpot();
    this.timer = setInterval(() => {
      this.getByPlayIdJackpot();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        this.list = newVal;
      },
      deep: true,
    },
    diceList: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.diceList = newVal;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["getCoin"]),
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
  methods: {
    lookHistory(data) {
      this.$emit("lookHistory", data);
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
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
.game_all {
  width: 100%;
  @media screen and (min-width: 750px) and (max-width: 2560px) {
    .game-recentn {
      display: none;
    }
    .game-recent {
      width: 100%;
      height: 70px;
      padding: 10px 20px;
      box-sizing: border-box;
      background-color: #17181b;
      border-top-right-radius: 22px;
      position: relative;
      // z-index: 99;
      // @media screen and (min-device-width: 160px) and (max-width: 899px) {
      //   height: 85px;
      // }
      // @media screen and (min-device-width: 160px) and (max-width: 750px) {
      //   display: none;
      //   padding: 15px;
      // }
      .jackpot-enter {
        float: left;
        width: 160px;
        height: 100%;
        border-radius: 20px;
        background-color: rgba(49, 52, 60, 0.4);
        padding: 5px 0px;
        color: #f5f6f7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          height: 70px;
          width: 250px;
          border-radius: 30px;
          line-height: 25px;
          font-size: 25px;
        }
        .tit {
          font-size: 14px;
          font-weight: 500;
          color: #58ae14;
        }
        .bi {
          font-size: 13px;
          font-weight: 500;
          color: #818a95;
          margin-left: 5px;
        }
        .c1lwazez {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 2px;
          font-size: 14px;
          img {
            width: 18px;
            height: 18px;
            margin-right: 3px;
          }
        }
      }
      .recent-list-wrap {
        cursor: pointer;
        float: left;
        width: calc(99% - 170px);
        margin-left: 1%;
        // height: 44px;
        border-radius: 20px;
        text-align: center;
        height: 100%;
        overflow: hidden;
        // line-height: 44px;
        //background-color: rgba(122, 128, 140, 0.15);
        color: rgba(153, 164, 176, 0.6);
        overflow: hidden;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 400px;
          word-wrap: break-word;
          overflow: hidden;
        }
        .empty-item {
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          color: rgba(153, 164, 176, 0.6);
          // background-color: rgba(122, 128, 140, 0.15);
          .history_list {
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            .history_item {
              &:active {
                transform: scale(0.95, 0.95);
              }
              cursor: pointer;
              width: 69px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              color: white;
              background-color: #26272c;
              margin-right: 10px;
              border-radius: 20px;
              flex-shrink: 0;
              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                width: 120px;
                height: 60px;
                line-height: 60px;
                border-radius: 30px;
              }
            }
            .hactive {
              background-color: #43b309;
            }
          }
        }
      }
      .active {
        background-color: rgba(122, 128, 140, 0.15);
        .empty-item {
          justify-content: center;
        }
      }
    }
  }
}

.game_all {
  @media screen and (min-device-width: 0px) and (max-width: 750px) {
    .game-recent {
      display: none;
    }
    .game-recentn {
      width: 100%;
      height: 70px;
      padding: 10px 20px;
      box-sizing: border-box;
      background-color: #17181b;
      border-top-right-radius: 22px;
      position: relative;
      // z-index: 99;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 20px;
      }
      .jackpot-enter {
        float: left;
        width: 160px;
        height: 40px;
        border-radius: 20px;
        background-color: rgba(49, 52, 60, 0.4);
        padding: 5px 0px;
        color: #f5f6f7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 50%;
          height: 100%;
          border-radius: 10px;
          line-height: 25px;
          font-size: 12px;
        }
        .tit {
          font-weight: 500;
          color: #58ae14;
          font-size: 13px;
        }
        .bi {
          font-size: 13px;
          font-weight: 500;
          color: #818a95;
          margin-left: 5px;
        }
        .c1lwazez {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 2px;
          font-size: 14px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 3px;
          }
        }
      }
      .recent-list-wrap {
        cursor: pointer;
        float: left;
        width: calc(99% - 170px);
        margin-left: 1%;
        height: 50px;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        // line-height: 44px;
        //background-color: rgba(122, 128, 140, 0.15);
        color: rgba(153, 164, 176, 0.6);
        @media screen and (min-device-width: 160px) and (max-width: 899px) {
          width: 425px;
          word-wrap: break-word;
          overflow: hidden;
        }
        .empty-item {
          .history_list {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            z-index: 99;
            overflow: hidden;
            font-size: 15px;
            .history_item {
              &:active {
                transform: scale(0.95, 0.95);
              }
              cursor: pointer;
              width: 90px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              color: white;
              background-color: #26272c;
              margin-right: 10px;
              border-radius: 22px;
              flex-shrink: 0;
              @media screen and (min-device-width: 160px) and (max-width: 899px) {
                width: 90px;
                height: 50px;
                line-height: 50px;
                border-radius: 40px;
              }
            }
            .hactive {
              background-color: #43b309;
            }
          }
        }
      }
      .active {
        background-color: rgba(122, 128, 140, 0.15);
      }
    }
  }
}
</style>
