<template>
  <div class="container-fluid totalIncome">
    <div class="col totalIncome-content">
      <div class="totalIncome-title fw-bold">
        {{ $t("total_income.total_profit") }}
      </div>
      <div class="card-shadow totalIncome-heading p-3">
        <div class="totalIncome-heading-head">
          <div class="totalIncome-heading-item">
            <div class="grey-label-font fw-bold">
              {{ $t("total_income.total_profit") }}<span>(USDT)</span>
            </div>
            <div class="totalIncome-heading-head-value">
              {{ totalIncomeValue }}
            </div>
          </div>
        </div>
        <hr class="line-break" />
        <div class="totalIncome-heading-overall d-flex flex-column gap-3">
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("total_income.invest_profit") }}
            </div>
            <div class="totalIncome-heading-overall-value">
              {{ investmentProfit }}<span class="price-unit"> USDT</span>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("total_income.proxy_profit") }}
            </div>
            <div class="totalIncome-heading-overall-value">
              {{ agencyProfit }}<span class="price-unit"> USDT</span>
            </div>
          </div>
        </div>
      </div>
      <div class="total-income-list card card-shadow pb-3 mt-3">
        <div class="total-income-list-header blue-background">
          {{ $t("total_income.list_header") }}
        </div>
        <div class="pt-3">
          <div class="mx-2" v-for="(item, index) in list" :key="index">
            <div class="total-income-list-row">
              <div class="total-income-list-row-type">
                {{ item.type }}
              </div>
              <div class="total-income-list-row-amount-date">
                <div :class="['total-income-list-row-amount',item.amount < 0 ? 'warning-amount ' : 'green-amount']">
                  {{item.amount > 0 ? '+ ' : ''}}{{item.amount}}<span class="price-unit"> USDT</span></div>
                <div class="total-income-list-row-date">{{timeToDate(item.create_time)}}</div>
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
  name: "TotalIncome",
  data() {
    return {
      totalIncomeValue: 0,
      investmentProfit: 0,
      agencyProfit: 0,
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
      return dayjs.unix(d).format('YYYY-MM-DD HH:MM:ss');
    },
    shortAddress(a) {
      if (a == null || a == "") {
        return "";
      }
      return a.slice(0, 4) + '...' + a.substr(a.length - 4);
    },
    init() {
      if (!this.isLogin) {
        return;
      }
      this.$api
        .requestByPost("Funds/statistic", null)
        .then((result) => {
          if (result.status == true) {
            this.totalIncomeValue = result.data.total_profit;
            this.investmentProfit = result.data.wait_settle;
            this.agencyProfit = result.data.agent_profit;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
      this.$api
        .requestByPost("Funds/profits", {
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
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/totalIncome.scss";
</style>
