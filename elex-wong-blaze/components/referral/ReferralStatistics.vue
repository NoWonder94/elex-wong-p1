<template>
  <div class="referral-statistics">
    <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
    <div v-else>
      <div class="referral-statistics-box">
        <div class="referral-statistics-title">
          {{ $tt("referral.profit_today") }}
        </div>
        <div class="referral-statistics-item">
          <div class="referral-statistics-item-left">
            <vc-donut
              :sections="sections"
              :background="background"
              :size="200"
              :thickness="25"
            >
              <div
                class="legend-item"
                v-for="(item, index) in sections"
                :key="index"
              >
                <div
                  class="legend-item-color"
                  :style="'background-color:' + item.color"
                ></div>
                <div class="legend-item-title">{{ item.title }}</div>
              </div>
            </vc-donut>
            <div class="amount">{{ currencyName }} {{ todayProfit }}</div>
            <div class="desc">{{ $tt("referral.profit_today") }}</div>
          </div>
          <div class="referral-statistics-item-right">
            <div class="right-upper">
              <div class="right-upper-item">
                <div class="right-upper-item-amount">
                  {{ currencyName }} {{ bettingCommission }}
                </div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.betting_commission") }}
                </div>
              </div>
              <div class="right-upper-item">
                <div class="right-upper-item-amount">
                  {{ currencyName }} {{ invitationBonus }}
                </div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.invitation_bonus") }}
                </div>
              </div>
            </div>
            <div class="right-below">
              <div>{{ $tt("referral.profit_desc_1") }}</div>
              <div>
                {{ $tt("referral.betting_commission") }}: <br />
                {{ $tt("referral.profit_desc_2") }}
              </div>
              <div>
                {{ $tt("referral.invitation_bonus") }}: <br />
                {{ $tt("referral.profit_desc_3") }}
                <span class="yellow">{{ currencyName }} 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="referral-statistics-box">
        <div class="referral-statistics-title">
          {{ $tt("referral.total_profit") }}
        </div>
        <div class="referral-statistics-item">
          <div class="referral-statistics-item-left">
            <img src="@/assets/img/referral/statisticsbox.png" />
            <div class="amount">{{ currencyName }} {{ totalProfit }}</div>
            <div class="desc">{{ $tt("referral.total_profit") }}</div>
          </div>
          <div class="referral-statistics-item-right">
            <div class="right-upper profit-upper">
              <div class="right-upper-item">
                <div class="right-upper-item-amount">
                  {{ currencyName }} {{ totalInvitationBonus }}
                </div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.invitation_bonus") }}
                </div>
              </div>
              <div class="right-upper-item">
                <div class="right-upper-item-amount">
                  {{ currencyName }} {{ totalBettingCommission }}
                </div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.betting_commission") }}
                </div>
              </div>
              <div class="right-upper-item">
                <div class="right-upper-item-amount">
                  {{ currencyName }} {{ inviteAchievementBonus }}
                </div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.invite_achievement_bonus") }}
                </div>
              </div>
              <div class="right-upper-item">
                <div class="right-upper-item-amount">{{ depositedUsers }}</div>
                <div class="right-upper-item-desc">
                  {{ $tt("referral.deposited_users") }}
                </div>
              </div>
            </div>
            <div class="right-below">
              <div>{{ $tt("referral.total_profit_desc_1") }}</div>
              <div>{{ $tt("referral.total_profit_desc_2") }}</div>
              <div>{{ $tt("referral.total_profit_desc_3") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ReferralStatistics",
  data() {
    return {
      isLoading: false,
      currencyName: "",
      bettingCommission: 0,
      invitationBonus: 0,
      todayProfit: 0,
      totalInvitationBonus: 0,
      totalBettingCommission: 0,
      inviteAchievementBonus: 0,
      depositedUsers: 0,
      totalProfit: 0,
      sections: [
        {
          value: 50,
          color: "#F22C4D",
          title: this.$tt("referral.invitation_bonus"),
        },
        {
          value: 50,
          color: "#531E30",
          title: this.$tt("referral.betting_commission"),
        },
      ],
      background: "#1A242D",
    };
  },
  mounted() {
    this.currencyName = JSON.parse(this.coinType).currencyName;
    this.background = window.innerWidth > 1200 ? "#1A242D" : "#252F38";
    this.getStatistics();
  },
  computed: {
    ...mapState(["coinType"]),
  },
  methods: {
    getStatistics() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/referFriend/statistics")
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

          const { profitToday, totalProfit } = data;
          const { bonus, commission } = profitToday;
          this.invitationBonus = bonus;
          this.bettingCommission = commission;
          this.todayProfit = this.bettingCommission + this.invitationBonus;
          if (this.bettingCommission != 0 && this.invitationBonus != 0) {
            this.sections[0].value = (this.invitationBonus / this.todayProfit) * 100;
            this.sections[1].value = (this.bettingCommission / this.todayProfit) * 100;
          }

          this.totalInvitationBonus = totalProfit.bonus;
          this.totalBettingCommission = totalProfit.commission;
          this.inviteAchievementBonus = totalProfit.achievement;
          this.depositedUsers = totalProfit.depositedUsers;
          this.totalProfit = this.totalInvitationBonus + this.totalBettingCommission + this.inviteAchievementBonus + this.depositedUsers;
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
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/referralStatistics.scss";
@import "/assets/scss/mobile/referralStatistics.scss";
</style>
