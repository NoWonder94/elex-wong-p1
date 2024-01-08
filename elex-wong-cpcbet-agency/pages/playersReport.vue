<template>
  <div class="playersReport">
    <div class="playersReport-filter-container">
      <!-- <div class="playersReport-filter-label">
        Filter :
      </div> -->
      <el-form ref="transferlogform" :model="filter" class="playersReport-form">
        <el-form-item>
          <el-input
            class="playersReport-filter-input"
            v-model="filter.username"
            :placeholder="$t('playersReport.user')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="playersReport-filter-input"
            v-model="filter.proxy"
            :placeholder="$t('playersReport.proxy')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="start_date">
          <el-date-picker
            v-model="filter.start_date"
            class="playersReport-filter-date"
            type="date"
            placeholder="Start Date"
            :picker-options="{
              disabledDate: (time) => disabledStartDate(time),
            }"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="end_date">
          <el-date-picker
            v-model="filter.end_date"
            class="playersReport-filter-date"
            type="date"
            placeholder="End Date"
            :picker-options="{
              disabledDate: (time) => disabledEndDate(time),
            }"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="fill-box playersReport-filter-button" @click="init"
            >Submit</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="border-box playersReport-export-button"
            @click="csvExport"
            >{{ $t("report.export") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="playersReport-request-table">
      <el-table
        :data="playerReportList"
        border
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          prop="user_id"
          :label="$t('playersReport.user_id')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="user.name"
          :label="$t('playersReport.user')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="proxy.name"
          :label="$t('playersReport.proxy')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="role.name.en"
          :label="$t('playersReport.proxy_role')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="currency"
          :label="$t('playersReport.currency')"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="deposit"
          :label="$t('playersReport.deposit')"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="withdraw"
          :label="$t('playersReport.withdraw')"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="transfer_in"
          :label="$t('playersReport.transfer_in')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="transfer_out"
          :label="$t('playersReport.transfer_out')"
          width="110"
        >
        </el-table-column>
        <el-table-column prop="bet" :label="$t('playersReport.bet')" width="80">
          <template slot-scope="scope">
            <p class="playersReport-bet">
              {{ scope.row.bet }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="win" :label="$t('playersReport.win')" width="80">
          <template slot-scope="scope">
            <p class="playersReport-win">
              {{ scope.row.win }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="ggr" :label="$t('playersReport.ggr')" width="80">
          <template slot-scope="scope">
            <p
              :class="[
                'playersReport-ggr',
                scope.row.ggr < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.ggr }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="ngr" :label="$t('playersReport.ngr')" width="80">
          <template slot-scope="scope">
            <p
              :class="[
                'playersReport-ngr',
                scope.row.ngr < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.ngr }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="bonus"
          :label="$t('playersReport.bonus')"
          width="80"
        >
          <template slot-scope="scope">
            <p class="playersReport-bonus">
              {{ scope.row.bonus }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="commission"
          :label="$t('playersReport.commission')"
          width="110"
        >
          <template slot-scope="scope">
            <p class="playersReport-commission">
              {{ scope.row.commission }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="day"
          :formatter="convertDate"
          :label="$t('playersReport.day')"
          width="180"
        >
        </el-table-column> -->
      </el-table>
    </div>
    <div
      class="playersReport-request-table-pagination"
      v-if="playerReportList.length > 0"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="50"
        :total="playerReportCount"
        :current-page="filter.page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerReportListtemp: [
        {
          user_id: 100010008,
          proxy_id: 100010007,
          day: 1673798400,
          currency: "PHP",
          deposit: 0, //总存款
          transfer_in: 0, //总转入
          withdraw: 20, //总取款
          transfer_out: 0, //总转出
          bet: 0, //总投注
          win: 0, //总赢取金额
          bonus: 0, //总奖金
          proxy: {
            //代理信息
            id: 100010007,
            name: "test888",
            balance: 0,
          },
          user: {
            //玩家信息
            id: 100010008,
            name: "test9999",
            balance: 0,
          },
        },
      ],
      playerReportList: [],
      playerReportCount: 4,
      playerStatistic: {},
      currentPage: 1,
      filter: {
        start_date: "",
        end_date: "",
        username: "",
        proxy: "",
        page: 1,
      },
      filter_rule: {
        start_date: {},
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    routeBack() {
      this.$router.back();
    },

    init() {
      let tempFilter = {
        start_date: Date.parse(this.filter.start_date) / 1000,
        end_date: Date.parse(this.filter.end_date) / 1000,
        username: this.filter.username,
        proxy: this.filter.proxy,
        page: this.filter.page,
      };

      this.$api
        .requestByPost("/User/statistics", tempFilter)
        .then((result) => {
          if (result.status == true) {
            this.playerReportList = result.data.list;
            // this.playerReportList[0].ggr = -50;
            // this.playerReportList[0].ngr = -50;
            this.playerReportCount = result.data.count;
            this.playerStatistic = result.data.statistic;
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
    },

    handleCurrentChange(v) {
      this.filter.page = v;
      this.init();
    },

    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return (
        new Date(date * 1000).toLocaleDateString("en-GB") +
        " " +
        new Date(date * 1000).toLocaleTimeString("en-GB")
      );
    },

    disabledEndDate(date) {
      let startDate = this.filter.start_date;
      if (startDate) {
        return date.getTime() < startDate;
      }
    },
    disabledStartDate(date) {
      let endDate = this.filter.end_date;
      if (endDate) {
        return date.getTime() > endDate;
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index == 0) {
          sums[index] = "SUM";
        } else if (column.property == "bet") {
          sums[index] = this.playerStatistic.bets;
        } else if (column.property == "win") {
          sums[index] = this.playerStatistic.wins;
        } else if (column.property == "withdraw") {
          sums[index] = this.playerStatistic.withdraws;
        } else if (column.property == "deposit") {
          sums[index] = this.playerStatistic.deposits;
        } else if (column.property == "bonus") {
          sums[index] = this.playerStatistic.bonus;
        } else if (column.property == "transfer_in") {
          sums[index] = this.playerStatistic.transfer_ins;
        } else if (column.property == "transfer_out") {
          sums[index] = this.playerStatistic.transfer_outs;
        } else if (column.property == "ggr") {
          sums[index] = this.playerStatistic.ggrs;
        } else if (column.property == "ngr") {
          sums[index] = this.playerStatistic.ngrs;
        } else if (column.property == "commission") {
          sums[index] = this.playerStatistic.commissions;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    csvExport() {
      let arrData = [];
      if (this.playerReportList == null || this.playerReportList == []) {
        return;
      }
      this.playerReportList.forEach((e) => {
        arrData.push({
          player_id: e.user_id,
          player_username: e.user ? e.user.name : "",
          agent_username: e.proxy ? e.proxy.name : "",
          agent_role: e.role ? e.role.name.en : "",
          currency: e.currency,
          deposit: e.deposit,
          withdraw: e.withdraw,
          transfer_in: e.transfer_in,
          transfer_out: e.transfer_out,
          bet: e.bet,
          win: e.win,
          ggr: e.ggr,
          ngr: e.ngr,
          bonus: e.bonus,
          commission: e.commission,
        });
      });
      if (this.playerStatistic) {
        arrData.push({
          player_id: "SUM",
          player_username: "",
          agent_username: "",
          agent_role: "",
          currency: "",
          deposit: this.playerStatistic.deposits,
          withdraw: this.playerStatistic.withdraws,
          transfer_in: this.playerStatistic.transfer_ins,
          transfer_out: this.playerStatistic.transfer_outs,
          bet: this.playerStatistic.bets,
          win: this.playerStatistic.wins,
          ggr: this.playerStatistic.ggrs,
          ngr: this.playerStatistic.ngrs,
          bonus: this.playerStatistic.bonus,
          commission: this.playerStatistic.commissions,
        });
      }

      if (arrData.length == 0) {
        return;
      }
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(","),
        ...arrData.map((item) => Object.values(item).join(",")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);

      var now = new Date();
      var dd = String(now.getDate()).padStart(2, "0");
      var mm = String(now.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = now.getFullYear();

      var current = `${yyyy}_${mm}_${dd}`;
      link.setAttribute("download", `player-report${current}.csv`);
      link.click();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "../assets/scss/pc/playersReport.scss";
@import "../assets/scss/mobile/playersReport.scss";
</style>
