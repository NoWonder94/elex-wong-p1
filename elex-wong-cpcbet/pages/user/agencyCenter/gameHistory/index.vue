<template>
  <div class="gameHistory">
    <div class="gameHistory-back web">
      <i class="el-icon-back back-icon" @click="back"></i>
      {{ $t("gameHistory.title") }}
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("gameHistory.title") }}
    </div>

    <div class="gameHistory-wrapping-mobile">
      <div class="gameHistory-title-label web">
        <ContentTitle :text="$t('gameHistory.commissionDetails')" />
      </div>

      <div class="gameHistory-filter-label">
        <div class="gameHistory-filter-date">
          <div class="filter-date-title">{{ $t("dateFilter.time") }}</div>
          <div class="filter-date-picker">
            <el-date-picker
              v-model="pickedDate"
              type="date"
              :placeholder="$t('dateFilter.pickDate')"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="getProxyPlatforms"
            ></el-date-picker>
          </div>
        </div>
        <hr class="lighter-divider mobile" />
        <div class="gameHistory-filter-input">
          <div class="filter-input-label">{{ $t("gameHistory.memberId") }}</div>
          <input
            v-model="userID"
            class="filter-input"
            type="text"
            :placeholder="$t('gameHistory.plsEnterMemberID')"
          />
          <div
            class="greenGradientButtonBg filter-input-submit"
            @click="getProxyPlatforms"
          >
            {{ $t("gameHistory.check") }}
          </div>
        </div>
      </div>

      <hr class="lighter-divider web" />

      <div class="gameHistory-bet-win-label">
        <div class="gameHistory-bet-amount">
          {{ $t("gameHistory.totalBet") }}: {{ totalBets }}
        </div>
        <div class="gameHistory-win-amount">
          {{ $t("gameHistory.totalWin") }}: {{ totalWins }}
        </div>
      </div>

      <hr class="lighter-divider web" />

      <div class="gameHistory-detail-card-list" v-if="platforms.length != 0">
        <div
          class="gameHistory-detail-card"
          v-for="(gamePlatform, index) in platforms"
          :key="index"
        >
          <div class="gameHistory-detail-card-label">
            <div class="gameHistory-platform-label">
              {{ gamePlatform.game_platform.name }}
            </div>
            <div
              class="gameHistory-more-label"
              @click="handleRoute(gamePlatform.game_platform.code)"
            >
              {{ $t("more") }}
            </div>
          </div>
          <hr class="lighter-divider" />
          <div class="gameHistory-detail-card-details">
            <div class="gameHistory-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.commission") }}
              </div>
              <div class="details-amount-amount">
                {{ gamePlatform.commissions }}
              </div>
            </div>

            <div class="gameHistory-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.betAmount") }}
              </div>
              <div class="details-amount-amount">{{ gamePlatform.bets }}</div>
            </div>

            <div class="gameHistory-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.winAmount") }}
              </div>
              <div class="details-amount-amount">{{ gamePlatform.wins }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="gameHistory-detail-nodata" v-else>
        <img src="../../../../assets/img/no_data.png" />
        <div>{{ $t("no_data") }}</div>
      </div>
    </div>

    <!--
      <div class="gameHistory-detail-paginate">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    -->
  </div>
</template>

<script>
import ContentTitle from "../../../../components/ContentTitle.vue";

export default {
  name: "GameHistory",
  components: { ContentTitle },
  head() {
    return {
      title: this.$t("gameHistory.title"),
    };
  },
  data() {
    return {
      userID: "",
      pickedDate: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      totalBets: 0,
      totalWins: 0,
      platforms: [],
    };
  },
  mounted() {
    this.getProxyPlatforms();
  },
  methods: {
    back() {
      this.$router.back();
    },

    getProxyPlatforms() {
      var unixtime = new Date();
      if (this.pickedDate != null) {
        unixtime = new Date(this.pickedDate);
      }
      unixtime.setHours(0);
      unixtime.setMinutes(0);
      unixtime.setSeconds(0);

      let params = { user_id: this.userID, date: Date.parse(unixtime) / 1000 };
      this.$api
        .requestByPost("/Proxy/platforms", params)
        .then((result) => {
          if (result.status == true) {
            this.totalBets = result.data.total_bets;
            this.totalWins = result.data.total_wins;
            this.platforms = result.data.platforms;
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    handleRoute(code) {
      var unixtime = new Date();
      if (this.pickedDate != null) {
        unixtime = new Date(this.pickedDate);
      }
      unixtime.setHours(0);
      unixtime.setMinutes(0);
      unixtime.setSeconds(0);

      this.$router.push({
        path: "/user/agencyCenter/gameHistory/" + code,
        query: {
          user_id: this.userID,
          date: Date.parse(unixtime) / 1000,
          page: 1,
        },
      });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/gameHistory.scss";
@import "/assets/scss/mobile/gameHistory.scss";
</style>
