<template>
  <div class="container-fluid totalBalance">
    <div class="col totalBalance-content">
      <div class="totalBalance-title fw-bold">
        {{ $t("total_balance.total_assets") }}
      </div>
      <div class="card-shadow totalBalance-heading p-3">
        <div class="totalBalance-heading-head">
          <div class="totalBalance-heading-item">
            <div class="grey-label-font fw-bold">
              {{ $t("total_balance.total_assets") }}<span>(USDT)</span>
            </div>
            <div class="totalBalance-heading-head-value">
              {{ totalAssets }}
            </div>
          </div>
          <div class="vertical-break my-1"></div>
          <div class="totalBalance-heading-item">
            <div class="grey-label-font fw-bold">
              {{ $t("total_balance.pending_assets") }}<span>(USDT)</span>
            </div>
            <div class="totalBalance-heading-head-value">
              {{ profitToday }}
            </div>
          </div>
        </div>
        <hr class="line-break" />
        <div class="totalBalance-heading-overall d-flex flex-column gap-3">
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("total_balance.wallet_in") }}
            </div>
            <div class="totalBalance-heading-overall-value">
              {{ walletDeposit }}<span class="price-unit"> USDT</span>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font">
              {{ $t("total_balance.profit_in") }}
            </div>
            <div class="totalBalance-heading-overall-value">
              {{ earningsDeposit }}<span class="price-unit"> USDT</span>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="grey-label-font fw-bold">
              {{ $t("total_balance.withdraw") }}
            </div>
            <div class="totalBalance-heading-overall-value">
              {{ WithdrawAmount }}<span class="price-unit"> USDT</span>
            </div>
          </div>
        </div>
      </div>
      <div class="total-balance-list card card-shadow pb-3 mt-3">
        <div class="total-balance-list-header blue-background">
          {{ $t("total_balance.list_header") }}
        </div>
        <div class="pt-3">
          <div class="mx-2" v-for="(item, index) in list" :key="index">
            <div class="total-balance-list-row">
              <div class="total-balance-list-row-type">
                {{ item.type }}
              </div>
              <div class="total-balance-list-row-amount-date">
                <div :class="['total-balance-list-row-amount',item.amount < 0 ? 'warning-amount ' : 'green-amount']">
                  {{item.amount > 0 ? '+ ' : ''}}{{item.amount}}<span class="price-unit"> USDT</span></div>
                <div class="total-balance-list-row-date">{{timeToDate(item.create_time)}}</div>
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
  name: "TotalBalance",
  data() {
    return {
      totalAssets: 0,
      openPosition: 0,
      walletDeposit: 0,
      earningsDeposit: 0,
      WithdrawAmount: 0,
      profitToday: 0,
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
            this.totalAssets = result.data.balance;
            this.openPosition = result.data.wait_settle;
            this.walletDeposit = result.data.deposit;
            this.earningsDeposit = result.data.total_profit;
            this.WithdrawAmount = result.data.withdraw;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
      this.$api
        .requestByPost("Funds/lists", {
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

      this.$api
        .requestByPost("account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateAccount", result.data);
            this.profitToday = result.data.today_profit;
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
@import "/assets/scss/totalBalance.scss";
</style>
