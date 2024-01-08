<template>
  <div class="email">
    <div class="header">
      <!-- <div class="title">Email</div> -->
      <i class="el-icon-close" @click="closeModal('close')"></i>
    </div>
    <div class="body">
      <div class="email-container">
        <div class="email-content">
          <div class="title">{{ getEmailDetails.name }}</div>
          <div class="text">{{ getEmailDetails.content }}</div>

          <div class="reward-column" v-if="getRewardsMoney != null">
            {{ $t("_rewards") }}
            :
            {{ getRewardsMoney[0].currency }} {{ getRewardsMoney[0].amount }}
          </div>
        </div>
        <div class="btn-position">
          <div class="backBtn" @click="changeIndex()">{{ $tt("back") }}</div>
          <div
            class="rewardBtn"
            v-if="getEmailDetails.rewardString != '' && type != 'notice'"
            :class="
              getEmailDetails.rewardStatus == 0 ? 'rewardBtn' : 'isNoReward'
            "
            @click="handleGetReward(getEmailDetails)"
          >
            <p v-if="!loading">
              {{
                getEmailDetails.rewardStatus == 0
                  ? $tt("referral.receive")
                  : $t("PROMOTION.Received")
              }}
            </p>
            <i v-else class="el-icon-loading"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Email",
  props: ["emailId", "title", "desc", "type"],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getEmailDetails"]),

    getRewardsMoney() {
      var rewardsString = this.getEmailDetails.rewardString;
      if (
        rewardsString != null &&
        rewardsString != "" &&
        rewardsString != "[]" &&
        rewardsString != undefined
      ) {
        return JSON.parse(rewardsString);
      }
      return null;
    },
  },
  mounted() {
    this.updateReadStatus();
  },
  methods: {
    changeIndex() {
      this.$store.dispatch("setEmailDetails", null);
      this.$emit("changeIndex", 0);
    },
    closeModal(action) {
      this.$store.dispatch("setEmailDetails", null);
      this.$emit("close-modal", action);
    },
    updateReadStatus() {
      this.$api
        .requestByPost(
          this.type == "notice"
            ? "/hall/v2/playUserNotice/updateReadStatus"
            : "/hall/v2/playUserEmail/updateReadStatus",
          {
            id: this.getEmailDetails.id,
          }
        )
        .then((result) => {
          this.loading = false;

          const { code, msg, data } = result;
          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          this.type == "notice"
            ? this.$store.dispatch("getUnreadNoticeCount")
            : this.$store.dispatch("getUnreadEmailCount");
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    handleGetReward(emailDetail) {
      this.loading = true;

      /* 0 未领取， 1 是已领取 */
      if (emailDetail.rewardStatus == 1) {
        this.loading = false;
        return false;
      }

      this.$api
        .requestByPost("/hall/v2/playUserEmail/updateRewardStatus", {
          id: emailDetail.id,
        })
        .then((result) => {
          this.loading = false;

          const { code, msg, data } = result;
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
          this.changeIndex();
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/email.scss";
@import "/assets/scss/mobile/email.scss";
</style>
