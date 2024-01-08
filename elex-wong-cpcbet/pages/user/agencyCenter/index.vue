<template>
  <div class="agency-center">
    <div class="agency-center-title web">
      {{ $t("agencyCenter.title") }}
    </div>

    <div class="web">
      <hr class="line" />
      <div class="level-section">
        <!-- <img
          src="../../../assets/img/vip1.png"
          class="level-section-vip-icon"
        /> -->

        <div class="level-container">
          <div>{{ $t("agencyCenter.recent_agent_level") }}</div>
          <div class="level-title">{{ level }}</div>
        </div>
      </div>
    </div>

    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("agencyCenter.title") }}
    </div>
    <div class="agency-center-wrapping-mobile">
      <Loading :isLoading.sync="isLoading" />

      <div class="mobile">
        <div class="level-section">
          <img
            src="../../../assets/img/vip1.png"
            class="level-section-vip-icon"
          />

          <div class="level-container">
            <div>{{ $t("agencyCenter.recent_agent_level") }}</div>
            <div class="level-title">{{ level }}</div>
          </div>
        </div>
      </div>

      <div class="description-section">
        <div
          class="description-card"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="card-total-number">{{ item.val }}</div>
          <div class="card-title">{{ $t("agencyCenter." + item.key) }}</div>
        </div>
      </div>

      <div class="icon-section">
        <div v-for="(icon, index) in icons" :key="index">
          <div class="icon-img" @click="handleRoute(icon.nav)">
            <img :src="icon.img" />
            <div class="icon-text">{{ icon.label }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "AgencyCenter",
  head() {
    return {
      title: this.$t("agencyCenter.title"),
    };
  },
  data() {
    return {
      isLoading: true,
      list: [],
      icons: [],
      level: "",
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.icons = [
        {
          label: this.$t("agencyCenter.icons.memberList"),
          nav: "/memberList",
          img: require("../../../assets/img/Mask Group 199.png"),
        },
        {
          label: this.$t("agencyCenter.icons.referral"),
          nav: "/referral",
          img: require("../../../assets/img/Mask Group 200.png"),
        },
        {
          label: this.$t("agencyCenter.icons.commissionReport"),
          nav: "/commissionReport",
          img: require("../../../assets/img/Mask Group 201.png"),
        },
        {
          label: this.$t("agencyCenter.icons.gameHistory"),
          nav: "/gameHistory",
          img: require("../../../assets/img/Mask Group 202.png"),
        },
        {
          label: this.$t("agencyCenter.icons.bindMember"),
          nav: "/bindMember",
          img: require("../../../assets/img/Mask Group 142.png"),
        },
        {
          label: this.$t("agencyCenter.icons.updownline"),
          nav: "/updownline",
          img: require("../../../assets/img/Mask Group 139.png"),
        },
        {
          label: this.$t("agencyCenter.icons.commissionPlan"),
          nav: "/commissionPlan",
          img: require("../../../assets/img/Mask Group 203.png"),
        },
        // {
        //   label: this.$t("agencyCenter.icons.support"),
        //   nav: "/",
        //   img: require("../../../assets/img/Mask Group 204.png"),
        // },
      ];
      this.$api
        .requestByPost("Proxy/statistic", null)
        .then((result) => {
          if (result.status == true) {
            this.list = result.data;
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
      this.$api
        .requestByPost("Proxy/level", null)
        .then((result) => {
          this.level = result.data.name;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
      this.isLoading = false;
    },
    handleRoute(link) {
      this.$router.push({ path: "/user/agencyCenter" + link });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/agencyCenter.scss";
@import "/assets/scss/mobile/agencyCenter.scss";
</style>
