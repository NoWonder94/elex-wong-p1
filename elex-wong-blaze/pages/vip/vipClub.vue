<template>
  <div class="vipclub-page">
    <div class="vipclub-user-container">
      <div class="user-left-container">
        <div class="container-title">
          <div class="title-label">
            {{ $tt("vip_level") }} {{ userData.levelid }}
          </div>
          <el-tooltip class="item" effect="dark" placement="bottom-start">
            <div class="tooltip-slot" slot="content">{{ userVipToolTip }}</div>
            <QuestionOutline class="tooltip-label" />
          </el-tooltip>
        </div>

        <div class="container-level-image">
          <div class="container-level-bg">
            <div class="level-picture">
              <!-- <img src="@/assets/img/vip/0.png" alt="" /> -->
              <img :src="`/vip/${userData.levelid}.png`" alt="rank image" />
            </div>
          </div>
        </div>

        <div class="container-score-body">
          <div class="score-progress">
            <div class="score-tier">
              <div class="score-label">{{ $tt("deposit") }}</div>
              <div class="score-value">
                <span class="current-amount">
                  {{ exchangeCurrency }} {{ userData.cumDepositAmount }}
                </span>
                / {{ exchangeCurrency }} {{ userData.maxDeposit }}
              </div>
            </div>
            <div class="score-progress">
              <el-progress :percentage="depositPercetage"></el-progress>
            </div>
          </div>
        </div>

        <div class="container-score-body">
          <div class="score-progress">
            <div class="score-tier">
              <div class="score-label">{{ $tt("bet") }}</div>
              <div class="score-value">
                <span class="current-amount"
                  >{{ exchangeCurrency }} {{ userData.cumBetAmount }}
                </span>
                / {{ exchangeCurrency }} {{ userData.maxBet }}
              </div>
            </div>
            <div class="score-progress">
              <el-progress :percentage="betPercetage"></el-progress>
            </div>
          </div>
        </div>

        <div class="container-next-title">
          {{ $tt("upgrading_to") }}
          <span class="next-level">
            {{ $tt("home.VIP") }} {{ userData.nextLevel }}
          </span>
          {{ $tt("required") }}
        </div>

        <div class="container-require-condition">
          <div class="require-condition">
            <div class="condition-icon">
              <div class="condition-label">{{ $tt("bet") }}</div>
              <div class="condition-value">
                {{ exchangeCurrency }} {{ userData.maxBet }}
              </div>
            </div>
            <div class="condition-icon">
              <div class="condition-label">{{ $tt("deposit") }}</div>
              <div class="condition-value">
                {{ exchangeCurrency }} {{ userData.maxDeposit }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="user-right-container">
        <div class="container-title">
          <div class="title-label">
            {{ $tt("full_vip_bonus") }}
          </div>
        </div>

        <!-- <p style="color: white">{{ getBonusBox }}</p> -->

        <div class="level-list-container">
          <div class="level-list">
            <div
              class="level-box-item"
              v-for="(bonusBox, index) in getBonusBox"
              :key="index"
            >
              <div :class="['level-box-body', bonusBox.isOpen ? 'open' : '']">
                <div class="level-box-pic">
                  <img
                    src="@/assets/img/vip/opened.svg"
                    alt="vip treasure box"
                    v-if="bonusBox.isOpen"
                  />
                  <img
                    src="@/assets/img/vip/activeClosed.svg"
                    alt="vip treasure box"
                    v-else-if="bonusBox.active"
                  />
                  <img
                    src="@/assets/img/vip/closed.svg"
                    alt="vip treasure box"
                    v-else
                  />
                </div>
                <div class="level-box-price">
                  <div>{{ exchangeCurrency }} {{ bonusBox.bonus }}</div>
                </div>
                <div class="level-box-title">
                  <div>{{ $tt("lvl") }}-{{ bonusBox.vipLevel }}</div>
                </div>
              </div>
            </div>

            <!-- open -->
            <!-- <div class="level-box-item">
              <div class="level-box-body">
                <div class="level-box-pic">
                  <img
                    src="@/assets/img/vip/closed.svg"
                    alt="vip treasure box"
                  />
                </div>
                <div class="level-box-price">
                  <div>{{ $tt("brl") }} {{ $tt("5") }}</div>
                </div>
                <div class="level-box-title">
                  <div>{{ $tt("lvl") }}-{{ $tt("1") }}</div>
                </div>
              </div>
            </div>

            <div class="level-box-item">
              <div class="level-box-body open">
                <div class="level-box-pic">
                  <img
                    src="@/assets/img/vip/closed.svg"
                    alt="vip treasure box"
                  />
                </div>
                <div class="level-box-price">
                  <div>{{ $tt("brl") }} {{ $tt("10") }}</div>
                </div>
                <div class="level-box-title">
                  <div>{{ $tt("lvl") }}-{{ $tt("2") }}</div>
                </div>
              </div>
            </div>

            <div class="level-box-item mobile-hide">
              <div class="level-box-body open">
                <div class="level-box-pic">
                  <img
                    src="@/assets/img/vip/closed.svg"
                    alt="vip treasure box"
                  />
                </div>
                <div class="level-box-price">
                  <div>{{ $tt("brl") }} {{ $tt("20") }}</div>
                </div>
                <div class="level-box-title">
                  <div>{{ $tt("lvl") }}-{{ $tt("3") }}</div>
                </div>
              </div>
            </div>

            <div class="level-box-item mobile-hide">
              <div class="level-box-body open">
                <div class="level-box-pic">
                  <img
                    src="@/assets/img/vip/closed.svg"
                    alt="vip treasure box"
                  />
                </div>
                <div class="level-box-price">
                  <div>{{ $tt("brl") }} {{ $tt("50") }}</div>
                </div>
                <div class="level-box-title">
                  <div>{{ $tt("lvl") }}-{{ $tt("4") }}</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <div class="level-process-container">
          <el-progress
            :percentage="parseInt(exp)"
            :show-text="false"
          ></el-progress>
        </div>

        <div class="level-description-container">
          {{ $tt("vip_desc") }}
        </div>
        <div class="level-require-condition">
          <div class="require-condition">
            <div class="condition-icon">
              <div class="condition-label">
                {{ $tt("accumulated_bet_amount") }}
              </div>
              <div class="condition-value">
                {{ exchangeCurrency }} {{ userData.cumBetAmount }}
              </div>
            </div>
            <div class="condition-icon">
              <div class="condition-label">
                {{ $tt("cumulative_deposit_amount") }}
              </div>
              <div class="condition-value">
                {{ exchangeCurrency }}
                {{ userData.cumDepositAmount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vipclub-cashback-container">
      <div class="cashback-container">
        <div class="cashback-item">
          <img
            class="cashback-title"
            src="@/assets/img/vip/cashback.svg"
            alt=""
          />
        </div>

        <div class="cashback-item">
          <div class="item-details-card">
            <div class="card-image">
              <img src="@/assets/img/vip/fire.png" alt="" />
            </div>
            <div class="card-detail">
              <div class="detail-label">
                {{ $tt("original_games") }}
                <el-tooltip class="item" effect="dark" placement="bottom-start">
                  <div class="tooltip-slot" slot="content">
                    <p>{{ cashbackToopTip_1 }}</p>
                    <p>{{ cashbackToopTip_2 }}</p>
                  </div>
                  <QuestionOutline class="tooltip-label" />
                </el-tooltip>
              </div>
              <div class="detail-value">
                {{ cashbackData.origame }}{{ $tt("percentage") }}
              </div>
            </div>
          </div>

          <div class="item-details-card">
            <div class="card-image">
              <img src="@/assets/img/vip/fire.png" alt="" />
            </div>
            <div class="card-detail">
              <div class="detail-label">
                {{ $tt("slot") }}
              </div>
              <div class="detail-value">
                {{ cashbackData.slot }}{{ $tt("percentage") }}
              </div>
            </div>
          </div>
        </div>

        <div class="cashback-item">
          <div class="item-details-card">
            <div class="card-image">
              <img src="@/assets/img/vip/fire.png" alt="" />
            </div>
            <div class="card-detail">
              <div class="detail-label">{{ $tt("sports") }}</div>
              <div class="detail-value">
                {{ cashbackData.sports }}{{ $tt("percentage") }}
              </div>
            </div>
          </div>

          <div class="item-details-card">
            <div class="card-image">
              <img
                class="card-image-camera"
                src="@/assets/img/vip/camera.png"
                alt=""
              />
            </div>
            <div class="card-detail">
              <div class="detail-label">{{ $tt("live_casino") }}</div>
              <div class="detail-value">
                {{ cashbackData.livecasino }}{{ $tt("percentage") }}
              </div>
            </div>
          </div>
        </div>

        <div class="cashback-item">
          <div class="item-details-card">
            <div class="card-image">
              <img src="@/assets/img/vip/fire.png" alt="" />
            </div>
            <div class="card-detail">
              <div class="detail-label">{{ $tt("table_games") }}</div>
              <div class="detail-value">
                {{ cashbackData.desk }}{{ $tt("percentage") }}
              </div>
            </div>
          </div>

          <div class="bonus-btn">{{ $tt("bonus") }}</div>
        </div>
      </div>
    </div>

    <div class="vipclub-overview-container">
      <h2 class="overview-title">{{ $tt("how_to_get_the_cashback_bonus") }}</h2>

      <div class="overview-card-container">
        <div class="card-item">
          <div class="card-inner-wrap">
            <div class="card-item-img">
              <img
                src="@/assets/img/vip/description1.png"
                alt="description image"
              />
            </div>
            <div class="card-item-number">{{ $tt("0") }}{{ $tt("1") }}</div>
          </div>
          <div class="card-item-desc">
            <p>
              {{ $tt("vip_step1") }}
            </p>
          </div>
        </div>

        <div class="card-item">
          <div class="card-inner-wrap">
            <div class="card-item-img pic2">
              <img
                src="@/assets/img/vip/description2.png"
                alt="description image"
              />
            </div>
            <div class="card-item-number">{{ $tt("0") }}{{ $tt("2") }}</div>
          </div>
          <div class="card-item-desc">
            <p>
              {{ $tt("vip_step2") }}
            </p>
          </div>
        </div>

        <div class="card-item">
          <div style="position: absolute; top: 20px; right: 20px">
            <el-tooltip class="item" effect="dark" placement="bottom-start">
              <div class="tooltip-slot" slot="content">
                {{ cashbackBonusTooltip }}
              </div>
              <QuestionOutline class="tooltip-label" />
            </el-tooltip>
          </div>
          <div class="card-inner-wrap">
            <div class="card-item-img pic3">
              <img
                src="@/assets/img/vip/description3.png"
                alt="description image"
              />
            </div>
            <div class="card-item-number">{{ $tt("0") }}{{ $tt("3") }}</div>
          </div>
          <div class="card-item-desc">
            <p>
              {{ $tt("vip_step3") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vipclub-level-container" v-loading="viplistLoading">
      <h2 class="level-title">{{ $tt("all_vip_levels") }}</h2>
      <!-- swiper -->
      <div :key="swiperKey" v-swiper:mySwiper="swiperOption" class="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(vip, index) in vipList"
            :key="index"
          >
            <div class="level-card-container">
              <div class="level-image">
                <img :src="`/vip/${vip.vip}.png`" alt="rank image" />
              </div>
              <div class="level-body">
                <div class="level-label">
                  <h4>{{ $tt("home.VIP") }} - {{ vip.vip }}</h4>
                  <h5>{{ $tt("update_conditions") }}</h5>
                </div>

                <div class="level-rule-first">
                  <div class="level-rule-box">
                    <div class="box-item">
                      <h5>{{ $tt("total_deposit") }}</h5>
                      <h4>
                        {{ exchangeCurrency }}
                        {{ (vip.totalDeposits / exchangeRate).toFixed(2) }}
                      </h4>
                    </div>
                    <div class="box-item">
                      <h5>{{ $tt("total_bets") }}</h5>
                      <h4>
                        {{ exchangeCurrency }}
                        {{ (vip.totalBets / exchangeRate).toFixed(2) }}
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="level-rule-second">
                  <h4>{{ $tt("withdrawal_privileges") }}</h4>
                  <h6>{{ $tt("update_conditions") }}</h6>
                  <h6>
                    {{ $tt("maximum_unit_price") }} {{ exchangeCurrency }}
                    {{ (vip.maximumUnitPrice / exchangeRate).toFixed(2) }}
                  </h6>
                  <h6>
                    {{ $tt("withdrawal_fee") }} {{ vip.withdrawalFee
                    }}{{ $tt("percentage") }}
                  </h6>
                  <h6>
                    {{ $tt("free_withdrawal") }} {{ exchangeCurrency }}
                    {{ (vip.freeWithdrawalMth / exchangeRate).toFixed(2) }}
                    {{ $tt("month") }}
                  </h6>
                  <hr />
                </div>

                <div class="level-label">
                  <h4>{{ $tt("cashback") }}</h4>
                </div>

                <div class="level-rule-third">
                  <div class="rule-third-item">
                    <div class="rule-item">
                      <div>{{ $tt("original_games") }}</div>
                      <div>{{ $tt("slot") }}</div>
                    </div>
                    <div class="rule-item">
                      <div>
                        {{ vip.originalCashback }}{{ $tt("percentage") }}
                      </div>
                      <div>{{ vip.slotsCashback }}{{ $tt("percentage") }}</div>
                    </div>
                  </div>
                  <div class="rule-third-item">
                    <div class="rule-item">
                      <div>{{ $tt("live_casino") }}</div>
                      <div>{{ $tt("sports") }}</div>
                    </div>
                    <div class="rule-item">
                      <div>{{ vip.liveCashback }}{{ $tt("percentage") }}</div>
                      <div>{{ vip.sportsCashback }}{{ $tt("percentage") }}</div>
                    </div>
                  </div>
                  <div class="rule-third-item">
                    <div class="rule-item">
                      <div>{{ $tt("table_games") }}</div>
                    </div>
                    <div class="rule-item">
                      <div>{{ vip.deskCashback }}{{ $tt("percentage") }}</div>
                    </div>
                  </div>
                </div>

                <div v-show="userData.levelid == vip.vip" class="currentLevel">
                  {{ $tt("my") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- swiper -->
      <!-- swiper button -->
      <div class="swiper-nav-btn">
        <img
          id="leftButton"
          src="@/assets/img/vip/left.png"
          alt="button cursor"
        />
        <img
          id="rightButton"
          src="@/assets/img/vip/right.png"
          alt="button cursor"
        />
      </div>
      <!-- swiper button -->
    </div>

    <div class="vipclub-contact-container">
      <div class="contact-item">
        <div class="contact-title">{{ $tt("group_vip") }}</div>
      </div>
      <div class="contact-item">
        <div class="contact-desc">
          {{ $tt("join_vip") }}
        </div>
      </div>
      <div class="contact-item">
        <a
          href="https://t.me/official9blaze02"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: none; color: #ffffff"
        >
          <div class="contact-btn">{{ $tt("join_now") }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import QuestionOutline from "@/assets/img/QuestionOutline.vue";

export default {
  name: "VipClub",
  components: {
    QuestionOutline,
  },
  data() {
    return {
      swiperKey: "normal",
      userVipToolTip: this.$tt("userVipToolTip"),
      cashbackToopTip_1: this.$tt("cashbackToopTip_1"),
      cashbackToopTip_2: this.$tt("cashbackToopTip_2"),
      cashbackBonusTooltip: this.$tt("cashbackBonusTooltip"),
      /* swiper */
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
        allowTouchMove: true,
        initialSlide: 0,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: "#rightButton",
          prevEl: "#leftButton",
        },
        breakpointsInverse: true,
        breakpoints: {
          1025: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1201: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        },
      },
      /* swiper */
      /* get vip list */
      viplistLoading: false,
      vipList: [],
      /* user data */
      userData: {
        nextLevel: 1,
        levelid: 0,
        maxDeposit: 0,
        maxBet: 0,
        currentBet: 0,
        currentDeposit: 0,
        betPercent: 10,
        depositPercent: 10,

        cumBetAmount: 0,
        cumDepositAmount: 0,
      },
      /* cashback data */
      cashbackData: {
        origame: 0,
        slot: 0,
        sports: 0,
        livecasino: 0,
        desk: 0,
      },
      defaultLvl: 0,
      exp: 10,
      /**Exchange Rate */
      exchangeRate: 1,
      exchangeCurrency: "USD",
    };
  },
  mounted() {
    this.getVipList();
    this.getCurrentExchangeRate();
  },
  computed: {
    ...mapState(["isLogin", "user"]),
    ...mapGetters(["getCoin"]),

    depositPercetage() {
      if (
        this.userData.cumDepositAmount == 0 &&
        this.userData.maxDeposit == 0
      ) {
        return 0;
      }

      return parseInt(
        (this.userData.cumDepositAmount / this.userData.maxDeposit) * 100
      );
    },

    betPercetage() {
      if (this.userData.cumBetAmount == 0 && this.userData.maxBet == 0) {
        return 0;
      }
      return parseInt(
        (this.userData.cumBetAmount / this.userData.maxBet) * 100
      );
    },

    getBonusBox() {
      const bufferLength = window.innerWidth > 1200 ? 2 : 1;
      const maxLength = window.innerWidth > 1200 ? 5 : 3;
      this.exp = 10;
      let arr = [];
      var level = this.user ? this.user.vipLevel : this.defaultLvl;
      level = parseInt(level);
      var totalDifference = 0;

      var minLevel = level - bufferLength;
      if (minLevel < 0) {
        totalDifference = minLevel;
        minLevel = 0;
      }

      var maxLevel = level + bufferLength;
      if (maxLevel > this.vipList.length) {
        maxLevel = this.vipList.length;
      } else {
        maxLevel = maxLevel + Math.abs(totalDifference);
      }

      if (level >= this.vipList.length - bufferLength) {
        minLevel = this.vipList.length - maxLength;
      }

      var isStop = false;
      for (var i = 0; i < this.vipList.length; i++) {
        if (i >= minLevel && i <= maxLevel) {
          arr.push({
            vipLevel: this.vipList[i].vip,
            bonus: this.vipList[i].vipBonus,
            active: this.vipList[i].vip == parseInt(level) + 1,
            isOpen: parseInt(this.vipList[i].vip) <= parseInt(level),
          });

          if (!isStop && level != 0) {
            this.exp += 20;
            if (this.vipList[i].vip == parseInt(level) - 1) {
              if (level == this.vipList.length - 1) {
                this.exp = 100;
              }
              isStop = true;
            }
          }
        }
      }
      return arr;
    },
  },
  methods: {
    getVipList() {
      this.viplistLoading = true;
      this.$api
        .requestByPost("/hall/v2/playVip/vipList")
        .then((result) => {
          const { code, rows, msg } = result;
          if (code == 200) {
            this.vipList = rows;
            this.swiperKey = "update";

            if (this.user) {
              this.initVipData();
              const rank = parseInt(this.user.vipLevel) + 1;
              this.swiperOption.initialSlide = rank - 1;
              this.swiperKey = "reupdate";
            } else {
              /* assign user current to the list */
              const rank = 1;
              this.swiperOption.initialSlide = rank - 1;
              this.swiperKey = "reupdate";
            }
          } else {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.viplistLoading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });

          this.viplistLoading = false;
        });
    },

    initVipData() {
      if (this.user == null) {
        return;
      }
      const currentVip = this.vipList[parseInt(this.user.vipLevel)];
      if (currentVip == undefined || currentVip == null) {
        return;
      }
      const nextVip = this.vipList[parseInt(currentVip.vip) + 1];
      this.userData = {
        nextLevel: nextVip.vip,
        levelid: currentVip.vip,
        maxDeposit: (nextVip.totalDeposits / this.exchangeRate).toFixed(2),
        maxBet: (nextVip.totalBets / this.exchangeRate).toFixed(2),
        currentBet: 0,
        currentDeposit: 0,
        betPercent: 10,
        depositPercent: 10,
        cumBetAmount: (this.user.cumulativeBet / this.exchangeRate).toFixed(2),
        cumDepositAmount: (
          this.user.cumulativeRecharge / this.exchangeRate
        ).toFixed(2),
      };
      this.cashbackData = {
        origame: currentVip.originalCashback,
        slot: currentVip.slotsCashback,
        sports: currentVip.sportsCashback,
        livecasino: currentVip.liveCashback,
        desk: currentVip.deskCashback,
      };
      this.$nextTick();
    },
    getCurrentExchangeRate() {
      if (
        this.getCoin != null &&
        this.getCoin != {} &&
        this.getCoin.currencyId
      ) {
        this.exchangeRate = this.getCoin.exchangeRate;
        this.exchangeCurrency = this.getCoin.currencyName;
        return;
      }
      this.exchangeRate = 1;
      this.exchangeCurrency = "USD";
    },
  },
  watch: {
    getCoin(newValue, oldValue) {
      if (this.user && this.vipList && this.vipList.length > 0) {
        this.getCurrentExchangeRate();
        this.initVipData();
      }
    },
    user(n, o) {
      if (n && this.vipList && this.vipList.length > 0) {
        this.getCurrentExchangeRate();
        this.initVipData();
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "@/assets/scss/web/vipClub.scss";
@import "@/assets/scss/mobile/vipClub.scss";

.tooltip-slot {
  width: 200px;
}

.tooltip-label {
  font-size: 20px;
  color: $white;
  font-weight: bold;
  cursor: pointer;
}
</style>
