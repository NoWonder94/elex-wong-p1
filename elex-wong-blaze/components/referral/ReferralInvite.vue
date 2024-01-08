<template>
  <div class="referral-invite">
    <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
    <div v-else>
      <div class="first-section">
        <div class="invite-partner">
          <div class="invite-partner-title">
            {{ $tt("referral.invite_partner") }}
          </div>
          <div class="invite-partner-text">
            {{ $tt("referral.invitation_url") }}
          </div>
          <el-input
            placeholder=" "
            v-model="fullCode"
            class="invite-partner-input"
          >
            <el-button
              slot="append"
              icon="el-icon-copy-document"
              @click="copyToClipBoard(fullCode)"
            ></el-button>
          </el-input>
          <div class="invite-partner-text">
            {{ $tt("referral.copy") }}
          </div>
          <el-input
            placeholder=" "
            v-model="referCode"
            class="invite-partner-input"
          >
            <el-button
              slot="append"
              icon="el-icon-copy-document"
              @click="copyToClipBoard(referCode)"
            ></el-button>
          </el-input>
        </div>
        <div class="first-section-right">
          <div class="statistics">
            <div class="statistics-item">
              <div class="statistics-title">
                {{ $tt("referral.guest_users") }}
              </div>
              <div class="statistics-num">{{ guestUsers }}</div>
            </div>
            <div class="statistics-item">
              <div class="statistics-title">
                {{ $tt("referral.deposited_users") }}
              </div>
              <div class="statistics-num">{{ depositedUsers }}</div>
            </div>
            <div class="statistics-item">
              <div class="statistics-title">
                {{ $tt("referral.bonus_today") }}
              </div>
              <div class="statistics-num">
                {{ currencyName }} {{ todayBonus }}
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-title">
                {{ $tt("referral.bonus_yesterday") }}
              </div>
              <div class="statistics-num">{{ currencyName }} {{ ytdBonus }}</div>
            </div>
          </div>
          <div class="target">
            <div class="target-title">
              {{ $tt("referral.monthly_goals") }}
            </div>
            <div class="target-image">
              <img src="../../assets/img/referral/download.png" />
            </div>
            <div class="target-text">
              <div class="amount">
                {{ currencyName }} 246
                <el-tooltip class="item" effect="dark" placement="bottom-start">
                  <div class="tooltip-slot" slot="content">
                    {{ $tt("referral.goals_tooltip") }}
                  </div>
                  <QuestionOutline class="tooltip-label" />
                </el-tooltip>
              </div>
              <div class="text">
                <span class="orange">5</span> {{ $tt("referral.goals_desc") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="second-section">
        <div class="section-title">
          {{ $tt("referral.awards_issued") }}
        </div>
        <div class="awards-row">
          <div class="awards-item">
            <div class="awards-title">
              {{ $tt("referral.invitation_bonus") }}
            </div>
            <div class="awards-image-text">
              <div class="awards-image">
                <img src="../../assets/img/referral/01.png" />
              </div>
              <div class="awards-text">
                <div class="amount">{{ currencyName }} {{ invitationBonusMoney }}</div>
                <div class="people">
                  {{ invitationBonusUser }} {{ $tt("referral.people_received") }}
                </div>
              </div>
            </div>
          </div>
          <div class="awards-item">
            <div class="awards-title">
              {{ $tt("referral.betting_commission") }}
            </div>
            <div class="awards-image-text">
              <div class="awards-image">
                <img src="../../assets/img/referral/02.png" />
              </div>
              <div class="awards-text">
                <div class="amount">{{ currencyName }} {{ bettingCommissionMoney }}</div>
                <div class="people">
                  {{ bettingCommissionUser }} {{ $tt("referral.people_received") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="third-section">
        <div class="section-title">
          {{ $tt("referral.how_invitation_bonus_work") }}
        </div>
        <div class="bonus-item">
          <div class="bonus-item-text">
            <div class="bonus-item-title">
              {{ $tt("referral.invitation_bonus") }}
            </div>
            <div class="bonus-item-desc">
              {{ $tt("referral.invitation_bonus_1") }}
              <span class="yellow">{{ currencyName }} 12</span>
              {{ $tt("referral.invitation_bonus_2") }}
              {{ $tt("referral.invitation_bonus_3") }}
            </div>
          </div>
          <div class="bonus-item-image">
            <img src="../../assets/img/referral/bonus_work.png" />
          </div>
        </div>
      </div>
      <div class="fourth-section">
        <div class="section-title">
          {{ $tt("referral.invite_achievement_bonus") }}
          <span class="tooltip-label" @click="handleModal">
            <QuestionOutline />
          </span>
        </div>
        <div class="section-desc">
          {{ $tt("referral.invite_achievement_bonus_desc") }}
        </div>
        <div class="swiper">
          <i id="leftButton" class="el-icon-arrow-left"></i>
          <div v-swiper:mySwiper="swiperOption" class="swiper" ref="mySwiper" v-if="rewardList.length > 0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in rewardList" :key="index" :data-num="item.accumulatedNums">
                <div class="reward-item">
                  <div class="reward-item-image">
                    <img :src="`/referral/${index + 1}.png`" />
                  </div>
                  <div class="reward-item-title">
                    {{ item.accumulatedNums }} {{ $tt("referral.agent_achievement") }}
                  </div>
                  <div class="reward-item-progress">
                    <div class="num">
                      <span class="red">
                        <span v-if="receiveRecord.includes(item.accumulatedNums)">{{ item.accumulatedNums }}</span>
                        <span v-else-if="index == receiveRecord.length">{{ rechargeNum }}</span>
                        <span v-else>0</span>
                        /</span> {{ item.accumulatedNums }}
                    </div>
                    <el-progress
                      :percentage="getPercentage(receiveRecord.includes(item.accumulatedNums)
                      ? item.accumulatedNums
                      : index == receiveRecord.length ? rechargeNum : 0,
                      item.accumulatedNums)"
                      color="#f12c4c"></el-progress>
                  </div>
                  <div class="reward-item-amount">
                    {{ currencyName }} {{ formatNumber(item.money) }}
                  </div>
                  <div class="reward-item-button" :class="{ 'button-disabled': receiveRecord.includes(item.accumulatedNums) }" :data-num="item.accumulatedNums">
                    {{ $tt("referral.receive") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <i id="rightButton" class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="fifth-section">
        <div class="section-title">
          {{ $tt("referral.how_to_get_commission") }}
          <el-tooltip class="item" effect="dark" placement="bottom-start">
            <div class="tooltip-slot" slot="content">
              {{ $tt("referral.commission_tooltip") }}
            </div>
            <QuestionOutline class="tooltip-label" />
          </el-tooltip>
        </div>
        <div class="section-desc">
          {{ $tt("referral.commission_desc") }}
        </div>
        <div class="commission-box">
          <div class="commission-row">
            <div class="commission-left">
              <div>{{ $tt("referral.commission_desc_1") }}</div>
              <div>
                {{ $tt("referral.commission_desc_2") }}
                <ul>
                  <li>
                    {{ $tt("referral.commission_desc_3") }} 1:
                    {{ $tt("referral.commission_desc_4") }}
                    <span class="yellow">30%</span>
                    {{ $tt("referral.commission_desc_5") }}
                  </li>
                  <li>
                    {{ $tt("referral.commission_desc_3") }} 2:
                    {{ $tt("referral.commission_desc_4") }}
                    <span class="yellow">15%</span>
                    {{ $tt("referral.commission_desc_5") }}
                  </li>
                  <li>
                    {{ $tt("referral.commission_desc_3") }} 3:
                    {{ $tt("referral.commission_desc_4") }}
                    <span class="yellow">5%</span>
                    {{ $tt("referral.commission_desc_5") }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="commission-right web">
              <img src="@/assets/img/referral/icon05.png" />
            </div>
          </div>
          <div class="commission-row">
            <div class="commission-item">
              <img src="@/assets/img/referral/icon06.png" />
            </div>
            <div class="commission-item">
              <div class="title">{{ $tt("referral.income_calculator") }}</div>
              <div class="amount">
                {{ currencyName }} {{ calculator.amount }}
                <el-tooltip class="item" effect="dark" placement="bottom-start">
                  <div class="tooltip-slot" slot="content">
                    {{ $tt("referral.income_calculator_tooltip") }}
                  </div>
                  <QuestionOutline class="tooltip-label" />
                </el-tooltip>
              </div>
              <div class="desc">
                {{ $tt("referral.income_calculator_desc_1") }}
                <span class="orange">{{ calculator.activeUsers }}</span>
                {{ $tt("referral.income_calculator_desc_2") }}
              </div>
              <el-slider
                v-model="calculatorSlider"
                :step="9"
                :show-tooltip="false"
              ></el-slider>
            </div>
          </div>
          <div class="mobile">
            <img src="@/assets/img/referral/icon05.png" />
          </div>
        </div>
      </div>
      <div class="sixth-section">
        <div class="sixth-section-item">
          <div class="sixth-section-title">{{ $tt("referral.leaderboard") }}</div>
          <div class="leaderboard">
            <div class="leaderboard-item" v-for="(item, index) in leaderboard" :key="index">
              <div class="top">{{ $tt("referral.top") }}{{ index + 1 }}</div>
              <div class="image">
                <img :src="`/referral/top${index + 1}.png`" />
              </div>
              <div class="username">{{ item.userInfo.name }}</div>
              <div class="amount">{{ currencyName }} {{ item.money }}</div>
            </div>
          </div>
        </div>
        <div class="sixth-section-item">
          <div class="sixth-section-title">
            {{ $tt("referral.who_won_prize") }}
          </div>
          <div class="won-prize">
            <div class="won-prize-item" v-for="item in winPrize" :key="item.id">
              <div class="username">{{ item.userId }}</div>
              <div class="desc">{{ $tt("referral.receive_invite_bonus") }}</div>
              <div class="amount">{{ currencyName }}{{ item.money }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="seventh-section">
        <img src="@/assets/img/referral/icon08.png" />
        <div class="text-box">
          <div>{{ $tt("referral.blogger_desc_1") }}</div>
          <div>
            {{ $tt("referral.blogger_desc_2") }}<br />
            <div class="url" @click="openUrl($config.telegram)">
              {{ $config.telegram }}
            </div>
          </div>
          <div>{{ $tt("referral.blogger_desc_3") }}</div>
        </div>
      </div>
    </div>
    <ReferralModal
      v-if="showModal"
      @close-modal="closeModal"
      :list="rewardList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import QuestionOutline from "@/assets/img/QuestionOutline.vue";

export default {
  name: "ReferralInvite",
  components: {
    QuestionOutline,
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      fullCode: "",
      referCode: "",
      userId: "",
      currencyName: "",
      guestUsers: 0,
      depositedUsers: 0,
      todayBonus: 0,
      ytdBonus: 0,
      invitationBonusMoney: 0,
      invitationBonusUser: 0,
      bettingCommissionMoney: 0,
      bettingCommissionUser: 0,
      calculatorSlider: 0,
      calculator: {
        amount: 0,
        activeUsers: 0,
      },
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        navigation: {
          nextEl: "#rightButton",
          prevEl: "#leftButton",
        },
        breakpointsInverse: true,
        breakpoints: {
          800: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1201: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
      rewardList: [],
      leaderboard: [],
      rechargeNum: 0,
      receiveRecord: [],
      winPrize: [],
    };
  },
  computed: {
    ...mapState(["user", "isLogin", "coinType", "walletList"]),
  },
  mounted() {
    // if (this.isLogin) {
      // this.getPromotionCode();
    // }
    setTimeout(() => {
      this.currencyName = JSON.parse(this.coinType).currencyName;
      this.userId = this.user.id;
    }, 2000);

    document.addEventListener("click", this.receiveClicked);
    this.getInvite();
  },
  beforeDestroy() {
    document.addEventListener("click", this.receiveClicked);
  },
  methods: {
    getInvite() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/referFriend/toInvite")
        .then((res) => {
          const { code, data, msg } = res;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          const { invitationUrl, invitationCode, guestUsers, depositedUsers, todayBonus, yesterdayBonus, invitationBonusMoney, invitationBonusUser, bettingCommissionMoney, bettingCommissionUser, configList, leaderboard, receiveRecord, winPrize, rechargeNum } = data;
          this.fullCode = invitationUrl;
          this.referCode = invitationCode;
          this.guestUsers = guestUsers;
          this.depositedUsers = depositedUsers;
          this.todayBonus = todayBonus;
          this.ytdBonus = yesterdayBonus;
          this.invitationBonusMoney = invitationBonusMoney;
          this.invitationBonusUser = invitationBonusUser;
          this.bettingCommissionMoney = bettingCommissionMoney;
          this.bettingCommissionUser = bettingCommissionUser;
          this.rewardList = configList;
          this.leaderboard = leaderboard;
          this.receiveRecord = receiveRecord;
          this.winPrize = winPrize;
          this.rechargeNum = rechargeNum;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
    receiveClicked(e) {
      if (e.target.innerText == this.$tt("referral.receive")) {
        if (!this.receiveRecord.includes(parseInt(e.target.dataset.num))) {
          if (this.timeout) clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.receiveAchievement(e.target.dataset.num);
          }, 300);
        }
      }
    },
    receiveAchievement(level) {
      // this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/referFriend/achievementReceive", { 'level': level })
        .then((res) => {
          const { code, data, msg } = res;
          // this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.$notify({
            title: "Success",
            message: msg,
            type: "success",
            duration: 2000,
          });
          this.getInvite();
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
    getPercentage(num, total) {
      return num / total * 100;
    },
    getPromotionCode() {
      this.loading = true;

      this.$api
        .requestByGet("/hall/v2/user/getPromotionCode", { userId: this.userId })
        .then((res) => {
          const { code, data, msg } = res;
          if (code == 200) {
            this.fullCode =
              window.location.hostname + "?type=referral&code=" + msg;
            this.referCode = msg;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
    copyToClipBoard(textToCopy) {
      this.$AdjustEvent.copyProxyQRCode();
      navigator.clipboard.writeText(textToCopy);
      this.$notify({
        title: "Successful",
        message: "Copied to clipboard.",
        type: "success",
        duration: 2000,
      });
    },
    handleModal() {
      this.showModal = true;
    },
    closeModal(e) {
      this.showModal = false;
      this.$emit("close");
    },
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    openUrl(url) {
      window.open(url);
    },
  },
  watch: {
    calculatorSlider(newValue, oldValue) {
      if (this.calculatorSlider == 0) {
        this.calculator.activeUsers = 0;
        this.calculator.amount = "0";
      } else if (this.calculatorSlider == 9) {
        this.calculator.activeUsers = 5;
        this.calculator.amount = "246";
      } else if (this.calculatorSlider == 18) {
        this.calculator.activeUsers = 20;
        this.calculator.amount = "1,254";
      } else if (this.calculatorSlider == 27) {
        this.calculator.activeUsers = 50;
        this.calculator.amount = "3,321";
      } else if (this.calculatorSlider == 36) {
        this.calculator.activeUsers = 100;
        this.calculator.amount = "6,592";
      } else if (this.calculatorSlider == 45) {
        this.calculator.activeUsers = 200;
        this.calculator.amount = "15,252";
      } else if (this.calculatorSlider == 54) {
        this.calculator.activeUsers = 500;
        this.calculator.amount = "33,948";
      } else if (this.calculatorSlider == 63) {
        this.calculator.activeUsers = 1000;
        this.calculator.amount = "72,816";
      } else if (this.calculatorSlider == 72) {
        this.calculator.activeUsers = 2000;
        this.calculator.amount = "167,280";
      } else if (this.calculatorSlider == 81) {
        this.calculator.activeUsers = 3000;
        this.calculator.amount = "226,320";
      } else if (this.calculatorSlider == 90) {
        this.calculator.activeUsers = 5000;
        this.calculator.amount = "415,740";
      } else if (this.calculatorSlider == 99) {
        this.calculator.activeUsers = 10000;
        this.calculator.amount = "980,556";
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/referralInvite.scss";
@import "/assets/scss/mobile/referralInvite.scss";

.tooltip-slot {
  width: 200px;
}
</style>
