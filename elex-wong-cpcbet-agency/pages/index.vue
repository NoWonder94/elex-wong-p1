<template>
  <div class="index">
    <div class="index-player-amount-display">
      <img class="index-player-icon" src="../assets/img/team.svg" />
      <div class="index-player-amount">
        {{ $t("dashboard.all_player") }} -
        <span class="numberFont">{{ allPlayer }}</span>
      </div>
    </div>
    <div class="index-player-wrap">
      <div class="index-player-state-cards">
        <div class="index-player-state-card">
          <span class="state-card-label"
            >{{ $t("dashboard.direct_player") }}
          </span>
          <span class="state-card-value numberFont">{{ directPlayer }}</span>
        </div>
        <div class="index-player-state-card">
          <span class="state-card-label"
            >{{ $t("dashboard.commission") }}
          </span>
          <span
            :class="[
              'state-card-amount',
              'numberFont',
              commissionAmount < 0 ? 'negative' : '',
            ]"
          >
            {{ commissionAmount }}</span
          >
        </div>
        <div class="index-player-state-card">
          <span class="state-card-label"
            >{{ $t("dashboard.available_commission") }}
          </span>
          <span class="state-card-amount numberFont">{{
            availableCommissionAmount
          }}</span>
        </div>
      </div>

      <div class="index-player-filter">
        <div
          class="index-player-filter-button fill-box"
          @click="showDateFilter = true"
        >
          {{ $t("dashboard.filters") }}
        </div>
        <div
          v-if="isAbleToCreateUser"
          class="index-player-add-button border-box"
          @click="handleRoute()"
        >
          <img class="icon-left" src="../assets/img/addteam.svg" />
          <span class=""> {{ $t("dashboard.add_agent_or_player") }} </span>
          <img class="icon-right" src="../assets/img/forward.svg" />
        </div>
      </div>
    </div>

    <div class="index-player-statistic-list">
      <el-tabs v-model="activeStatistic" @tab-click="handleClick" stretch>
        <el-tab-pane label="Totals" name="total">
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("deposit") }}</div>
            <div class="total-value border-box numberFont">
              {{ totalDeposits }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.withdrawals") }}</div>
            <div class="total-value border-box numberFont">
              {{ totalWithdrawals }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.transfer_ins") }}</div>
            <div class="total-value border-box numberFont">
              {{ transfer_ins }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.transfer_outs") }}</div>
            <div class="total-value border-box numberFont">
              {{ transfer_outs }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("bets") }}</div>
            <div class="total-value border-box numberFont totalbets">
              {{ totalBets }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("wins") }}</div>
            <div class="total-value border-box numberFont totalwins">
              {{ totalWins }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.bonus") }}</div>
            <div class="total-value border-box numberFont">
              {{ bonus }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.rebate") }}</div>
            <div class="total-value border-box numberFont">
              {{ rebate }}
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.ggr") }}</div>
            <div class="total-value border-box numberFont totalggr">
              <span :class="[ggr < 0 ? 'negative' : '']">
                {{ ggr }}
              </span>
            </div>
          </div>
          <div class="index-player-statistic-total">
            <div class="total-label">{{ $t("dashboard.ngr") }}</div>
            <div class="total-value border-box numberFont totalggr">
              <span :class="[ngr < 0 ? 'negative' : '']">
                {{ ngr }}
              </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Top Players" name="topPlayer">
          <div
            v-if="topPlayersList.length > 0"
            class="index-player-statistic-topPlayers-cards"
          >
            <div
              class="topPlayers-card"
              v-for="(topPlayer, index) in topPlayersList"
              :key="index"
            >
              <div class="topPlayers-card-content">
                <div class="card-label">{{ $t("dashboard.user_id") }}</div>
                <div class="card-value">
                  {{ topPlayer.user_id }}
                </div>
              </div>
              <div class="topPlayers-card-content">
                <div class="card-label">{{ $t("dashboard.ngr") }}</div>
                <div class="card-value numberFont">
                  {{ topPlayer.game_profits }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Top Agents" name="topAgent">
          <div
            v-if="topAgentList.length > 0"
            class="index-player-statistic-topPlayers-cards"
          >
            <div
              class="topPlayers-card"
              v-for="(topAgent, index) in topAgentList"
              :key="index"
            >
              <div class="topPlayers-card-content">
                <div class="card-label">{{ $t("dashboard.user_id") }}</div>
                <div class="card-value">
                  {{ topAgent.proxy_id }}
                </div>
              </div>
              <div class="topPlayers-card-content">
                <div class="card-label">{{ $t("dashboard.commission") }}</div>
                <div class="card-value numberFont">
                  {{ topAgent.commissions }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <client-only>
      <div class="index-chart">
        <line-chart
          :chart-options="chartOptions"
          :chart-data="chartData"
        ></line-chart>
      </div>
    </client-only>
    <DateFilterModal v-show="showDateFilter" @close-modal="closeModal" />

    <!--
    <Loading :isLoading.sync="isLoading" />
    -->
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      isAbleToCreateUser: false,
      isLoading: true,
      allPlayer: 0,
      directPlayer: 0,
      commissionAmount: 0,
      availableCommissionAmount: 0,
      activeStatistic: "total",
      /* totals */
      totalDeposits: 0,
      totalWithdrawals: 0,
      transfer_ins: 0,
      transfer_outs: 0,
      totalBets: 0,
      totalWins: 0,
      ggr: 0,
      ngr: 0,
      rebate: 0,
      bonus: 0,
      /* top player */
      topPlayersList: [],
      temptopPlayersList: [
        { user_id: 20, game_profits: 20 },
        { user_id: 20, game_profits: 20 },
        { user_id: 20, game_profits: 20 },
      ],
      topAgentList: [],
      temptopAgentList: [
        { proxy_id: 20, commissions: 20 },
        { proxy_id: 20, commissions: 20 },
        { proxy_id: 20, commissions: 20 },
      ],
      /* date filter modal */
      showDateFilter: false,
      dateStart: null,
      dateEnd: null,
      chartList: [],
      chartData: {
        labels: [],
        datasets: [],
      },
      tempData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "July",
          "July",
          "July",
          "July",
          "July",
          "July",
        ],
        datasets: [
          {
            label: "",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.$t("dashboard.net_income_chart"),
            color: "#393D3F",
            font: {
              size: 18,
              family: "Arial, Helvetica, sans-serif",
            },
          },
          legend: {
            display: false,
          },
          customCanvasBackgroundColor: {
            color: "#FDFDFF",
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              borderColor: "#393D3F",
            },
            ticks: {
              color: "#393D3F",
              padding: 6,
            },
            linecolor: "#393D3F",
          },
          y: {
            ticks: {
              color: "#393D3F",
            },
            border: {
              color: "#393D3F",
            },
            grid: {
              // color: "#FFFFFF",
              borderColor: "#393D3F",
            },
          },
        },
      },
    };
  },
  mounted() {
    this.initialize();
    let roleAccess = localStorage.getItem("roleAccess");
    if (roleAccess) {
      const roleJson = JSON.parse(roleAccess);
      this.isAbleToCreateUser =
        roleJson.access &&
        (roleJson.access.Proxy_create || roleJson.access.User_create);
    }
  },
  methods: {
    getFirstDayOfMonth() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), 0, 1);
      return firstDay;
    },
    initialize() {
      var authToken = localStorage.getItem("authToken");
      if (!authToken) {
        return false;
      }
      let params = {
        start_date: Date.parse(this.dateStart) / 1000,
        end_date: Date.parse(this.dateEnd) / 1000,
      };

      this.$api
        .requestByPost("/Account/dashboard", params)
        .then((result) => {
          if (result.status == true) {
            if (result.data.statistic) {
              this.allPlayer = result.data.statistic.total_user_nums ?? 0;
              this.directPlayer = result.data.statistic.direct_user_num ?? 0;
              this.commissionAmount = result.data.statistic.commissions ?? 0;
              // this.commissionAmount = -50;
              this.availableCommissionAmount =
                result.data.statistic.ava_comm ?? 0;
              this.totalDeposits = result.data.statistic.deposits ?? 0;
              this.totalWithdrawals = result.data.statistic.withdraws ?? 0;
              this.transfer_ins = result.data.statistic.transfer_ins ?? 0;
              this.transfer_outs = result.data.statistic.transfer_outs ?? 0;
              this.totalBets = result.data.statistic.bets ?? 0;
              this.totalWins = result.data.statistic.wins ?? 0;
              this.ggr = result.data.statistic.gross_incomes ?? 0;
              // this.ggr = -10;
              this.ngr = result.data.statistic.net_incomes ?? 0;
              // this.ngr = -10;
              this.rebate = result.data.statistic.rebate ?? 0;
              this.bonus = result.data.statistic.bonuss ?? 0;
            }
            this.topPlayersList = result.data.users;
            this.topAgentList = result.data.proxys;
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });

      this.getChartData();
    },
    getChartData() {
      let params = {
        start_date: Date.parse(this.dateStart) / 1000,
        end_date: Date.parse(this.dateEnd) / 1000,
      };

      this.$api
        .requestByPost("/Account/commchart", params)
        .then((result) => {
          if (result.status == true) {
            if (result.data) {
              this.chartList = result.data;
              this.setChartData();
            }
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }

          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    setChartData() {
      let length = this.chartList.length;
      if (length <= 0) return;

      let xlabel = [];
      let xvalue = [];
      for (let i = 0; i < length; i++) {
        xlabel.push(this.chartList[i].day);
        xvalue.push(this.chartList[i].net_income);
      }

      let datasets = {
        label: "",
        borderColor: "#003161",
        backgroundColor: "#FDFDFF",
        fill: false,
        data: xvalue,
      };

      this.chartData.labels = xlabel;
      this.chartData.datasets = [datasets];
    },
    handleRoute() {
      this.$router.push({ path: "/addAgentPlayer", query: { to: "agent" } });
    },

    handleClick(tab, event) {},

    handleShowDateFilter() {
      this.showDateFilter = !this.showDateFilter;
    },
    resetDateZero(date) {
      if (date == null) {
        return null;
      }
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return date;
    },
    /* receive vmodel value from modal */
    closeModal(modalDateFrom, modalDateTo) {
      this.dateStart = this.resetDateZero(modalDateFrom);
      this.dateEnd = this.resetDateZero(modalDateTo);
      this.initialize();
      this.showDateFilter = false;
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/index.scss";
@import "/assets/scss/mobile/index.scss";
</style>
