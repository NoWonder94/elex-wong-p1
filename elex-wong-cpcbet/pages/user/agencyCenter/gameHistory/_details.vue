<template>
  <div class="gameHistoryDetails">
    <div class="gameHistoryDetails-back web">
      <i class="el-icon-back back-icon" @click="back"></i>
      {{ platformName }}
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ platformName }}
    </div>
    <div class="gameHistoryDetails-wrapping-mobile">
      <div class="gameHistoryDetails-detail-card-list" v-if="list.length != 0">
        <div
          class="gameHistoryDetails-detail-card"
          v-for="(game, index) in list"
          :key="index"
        >
          <div class="gameHistoryDetails-detail-card-label">
            <div class="gameHistoryDetails-platform-label">
              <ContentTitle :text="game.game.name" />
            </div>
          </div>

          <hr class="lighter-divider" />

          <div class="gameHistoryDetails-detail-card-details">
            <div class="gameHistoryDetails-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.title") }}
              </div>
              <div class="details-amount-amount">{{ game.commission }}</div>
            </div>
            <div class="gameHistoryDetails-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.betAmount") }}
              </div>
              <div class="details-amount-amount">{{ game.bet }}</div>
            </div>
            <div class="gameHistoryDetails-detail-card-details-amount">
              <div class="details-amount-label">
                {{ $t("gameHistory.winAmount") }}
              </div>
              <div class="details-amount-amount">{{ game.win }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="gameHistoryDetails-detail-paginate" v-if="list.length != 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="totalList"
          :current-page="infoPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../../../components/ContentTitle.vue";

export default {
  name: "GameDetailsPage",
  head() {
    return {
      title: this.$t("gameHistory.title"),
    };
  },
  components: { ContentTitle },
  data() {
    return {
      platformName: this.$route.params.details,
      userID: this.$route.query.user_id,
      infoDate: this.$route.query.date,
      infoPage: this.$route.query.page,
      totalList: 0,
      list: [],
    };
  },
  mounted() {
    this.getPlatformDetails();
  },
  methods: {
    back() {
      this.$router.back();
    },

    getPlatformDetails() {
      let params = {
        user_id: this.userID,
        date: this.infoDate,
        platform: this.platformName,
        page: this.infoPage,
      };

      this.$api
        .requestByPost("/Proxy/games", params)
        .then((result) => {
          if (result.status == true) {
            this.list = result.data.list;
            this.totalList = result.data.count;
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

    handleCurrentChange(val) {
      this.infoPage = val;
      this.getPlatformDetails();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/gameHistoryDetails.scss";
@import "/assets/scss/mobile/gameHistoryDetails.scss";
</style>
