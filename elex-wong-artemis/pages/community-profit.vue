<template>
  <div class="container-fluid totalIncome">
    <div class="totalIncome-content">
      <HeaderTitle :icon="icon" :title="headerTitle" />
      <div class="card-shadow totalIncome-heading p-3 mx-3">
        <div class="totalIncome-heading-head">
          <div class="totalIncome-heading-item">
            <div class="grey-label-font fw-bold">
              {{ $t("community_profit.community_hold") }}
            </div>
            <div class="totalIncome-heading-head-value fw-bold">
              {{ teamHold }}
            </div>
          </div>
        </div>
        <hr class="line-break" />
        <div class="d-flex">
          <div class=""></div>
        </div>
        <div class="totalIncome-heading-overall d-flex flex-column gap-3">
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("community_profit.team_num") }}
            </div>
            <div class="totalIncome-heading-overall-value fw-bold">
              {{ teamNum }}
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("community_profit.invite_num") }}
            </div>
            <div class="totalIncome-heading-overall-value fw-bold">
              {{ inviteNum }}
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("community_profit.active") }}
            </div>
            <div class="totalIncome-heading-overall-value fw-bold">
              {{ active }}
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("community_profit.inactive") }}
            </div>
            <div class="totalIncome-heading-overall-value fw-bold">
              {{ inactive }}
            </div>
          </div>
        </div>
      </div>
      <div class="total-income-list card card-shadow pb-3 mt-3 mx-3">
        <div class="total-income-list-header blue-background">
          {{ $t("community_profit.title") }}
        </div>
        <div class="pt-3">
          <div class="mx-2" v-for="(item, index) in list" :key="index">
            <div class="total-income-list-row">
              <div class="total-income-list-row-type">
                {{ item.type }}
              </div>
              <div class="total-income-list-row-amount-date">
                <div :class="[
                  'total-income-list-row-amount',
                  item.amount < 0 ? 'warning-amount ' : 'green-amount',
                ]">
                  {{ item.amount > 0 ? "+ " : "" }}{{ item.amount }}
                </div>
                <div class="total-income-list-row-date">
                  {{ timeToDate(item.create_time) }}
                </div>
              </div>
            </div>
            <hr v-if="index != list.length - 1" class="line-break" />
          </div>
          <div class="d-flex flex-column pt-4" v-if="list.length == 0">
            <img class="nodata" :src="noDataImg" alt="" />
            <span class="text-center nodata-label">{{
            $t("utils.nodata")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommunityProfit",
  data() {
    return {
      headerTitle: this.$t("community_profit.title"),
      icon: require("../assets/img/EmployeeSalary.svg"),
      teamHold: 0,
      teamProfit: 0,
      teamNum: 0,
      inviteNum: 0,
      active: 0,
      inactive: 0,
      list: [],
      currentPage: 1,
      noDataImg: require("../assets/img/no_data.png"),
    };
  },
  computed: {
    ...mapState(["isLogin", "connectedAddress", "langs"]),
  },
  mounted() {
    this.init();
  },
  methods: {
    timeToDate(d) {
      return (
        new Date(d * 1000).toLocaleTimeString("en-US") +
        "     " +
        new Date(d * 1000).toLocaleDateString("en-US")
      );
    },
    shortAddress(a) {
      if (a == null || a == "") {
        return "";
      }
      return a.slice(0, 4) + "..." + a.substr(a.length - 4);
    },
    init() {
      if (!this.isLogin) {
        return;
      }
      this.$api
        .requestByPost("Agent/info", null)
        .then((result) => {
          if (result.status == true) {
            this.teamHold = result.data.total_amount;
            this.teamNum = result.data.total_address_num;
            this.inviteNum = result.data.address_num;
            this.active = result.data.robot_num;
            this.inactive = result.data.no_robot_num;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
      this.$api
        .requestByPost("Agent/profits", {
          page: this.currentPage,
        })
        .then((result) => {
          if (result.status == true) {
            this.list = result.data.list;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
      // this.$api
      //   .requestByPost("Funds/statistic", null)
      //   .then((result) => {
      //     if (result.status == true) {
      //     }
      //   })
      //   .catch((error) => {
      //     // this.$message.error(error);
      //   });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/communityProfit.scss";
</style>
