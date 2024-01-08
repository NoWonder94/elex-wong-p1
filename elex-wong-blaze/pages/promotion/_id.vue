<template>
  <div class="promotionDetail">
    <div class="promotion_header" @click="$router.back(-1)">
      <svg
        class="arrow-back"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
        ></path>
      </svg>
      <div class="promotion_header_title">
        <h2>{{ $tt("promotions") }}</h2>
      </div>
    </div>

    <div class="promotion-container" v-if="promoData != null">
      <div class="promotion-banner">
        <img :src="promoData.resource" alt="" />
      </div>

      <div class="promotion-content">
        <h1 class="promotion-content-title">{{ promoData.activityTitle }}</h1>

        <div class="promotion-date">
          <table>
            <tr>
              <td>{{ $t("Transaction.start") }}</td>
              <td style="padding-left: 10px; font-weight: bold">
                <time>{{ generatedate(promoData.activityStartTime) }}</time>
              </td>
            </tr>
            <tr>
              <td>{{ $t("Transaction.end") }}</td>
              <td style="padding-left: 10px; font-weight: bold">
                <time>{{ generatedate(promoData.activityEndTime) }}</time>
              </td>
            </tr>
          </table>
        </div>

        <p v-html="promoData.activityContent"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromotionDetail",
  async asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  data() {
    return {
      pageid: this.$route.params.id,
      promoData: null,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.isLoading = true;
      this.$api
        .requestByPost("/hall/v2/playActivity/activityDetail", {
          activityId: this.pageid,
        })
        .then((result) => {
          const { code, data, msg } = result;
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

          this.promoData = data;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },

    generatedate(timeStamp) {
      return dayjs(parseInt(timeStamp)).format("YYYY/MM/DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/promotionDetail.scss";
@import "/assets/scss/mobile/promotionDetail.scss";
</style>
