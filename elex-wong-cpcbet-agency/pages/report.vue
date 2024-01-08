<template>
  <div class="report-request">
    <div class="report-filter-container">
      <!-- <div class="report-filter-label">
        Filter :
      </div> -->
      <el-form ref="transferlogform" :model="filter" class="report-form">
        <el-form-item>
          <el-input
            class="report-filter-input"
            v-model="filter.username"
            :placeholder="$t('transfer_log.username')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="report-filter-input"
            v-model="filter.parent"
            :placeholder="$t('report.parent')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="start_date">
          <el-date-picker
            v-model="filter.start_date"
            class="report-filter-date"
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
            class="report-filter-date"
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
          <el-button class="fill-box report-filter-button" @click="init">{{
            $t("report.submit")
          }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            class="border-box report-export-button"
            @click="csvExport"
            >{{ $t("report.export") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="report-request-table web">
      <el-table
        :data="agentReportList"
        border
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          fixed
          prop="proxy_id"
          :label="$t('report.proxy_id')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="proxy.name"
          :label="$t('report.name')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="parent.name"
          :label="$t('report.parent')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="role.name.en"
          :label="$t('report.role')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="currency"
          :label="$t('report.currency')"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="direct_user_num"
          :label="$t('report.direct_user_num')"
          width="155"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="child.name"
          :label="$t('report.direct_user')"
          width="100"
        >
        </el-table-column> -->
        <el-table-column
          prop="deposit"
          :label="$t('report.deposit')"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="withdraw"
          :label="$t('report.withdraw')"
          width="85"
        ></el-table-column>
        <el-table-column
          prop="transfer_in"
          :label="$t('report.transfer_in')"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="transfer_out"
          :label="$t('report.transfer_out')"
          width="105"
        >
        </el-table-column>
        <el-table-column prop="bet" :label="$t('report.bet')" width="80">
          <template slot-scope="scope">
            <p class="report-bet">
              {{ scope.row.bet }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="win" :label="$t('report.win')" width="80">
          <template slot-scope="scope">
            <p class="report-win">
              {{ scope.row.win }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="rebate" :label="$t('report.rebate')" width="80">
          <template slot-scope="scope">
            <p class="report-rebate">
              {{ scope.row.rebate }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="bonus" :label="$t('report.bonus')" width="80">
          <template slot-scope="scope">
            <p class="report-bonus">
              {{ scope.row.bonus }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="gross_income"
          :label="$t('report.gross_income')"
          width="120"
        >
          <template slot-scope="scope">
            <p
              :class="[
                'report-gross_income',
                scope.row.gross_income < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.gross_income }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="net_income"
          :label="$t('report.net_income')"
          width="100"
        >
          <template slot-scope="scope">
            <p
              :class="[
                'report-net_income',
                scope.row.net_income < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.net_income }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          prop="day"
          :formatter="convertDate"
          :label="$t('report.day')"
          width="180"
        >
        </el-table-column> -->
        <el-table-column
          fixed="right"
          prop="commission"
          :label="$t('report.commission')"
          width="110"
        >
          <template slot-scope="scope">
            <p class="report-commission">
              {{ scope.row.commission }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="report-request-table mobile">
      <el-table
        :data="agentReportList"
        border
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          prop="proxy_id"
          :label="$t('report.proxy_id')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="proxy.name"
          :label="$t('report.name')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="parent.name"
          :label="$t('report.parent')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="role.name.en"
          :label="$t('report.role')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="currency"
          :label="$t('report.currency')"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="direct_user_num"
          :label="$t('report.direct_user_num')"
          width="155"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="child.name"
          :label="$t('report.direct_user')"
          width="100"
        >
        </el-table-column> -->
        <el-table-column
          prop="deposit"
          :label="$t('report.deposit')"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="withdraw"
          :label="$t('report.withdraw')"
          width="85"
        ></el-table-column>
        <el-table-column
          prop="transfer_in"
          :label="$t('report.transfer_in')"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="transfer_out"
          :label="$t('report.transfer_out')"
          width="105"
        >
        </el-table-column>
        <el-table-column prop="bet" :label="$t('report.bet')" width="80">
          <template slot-scope="scope">
            <p class="report-bet">
              {{ scope.row.bet }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="win" :label="$t('report.win')" width="80">
          <template slot-scope="scope">
            <p class="report-win">
              {{ scope.row.win }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="rebate" :label="$t('report.rebate')" width="80">
          <template slot-scope="scope">
            <p class="report-rebate">
              {{ scope.row.rebate }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="bonus" :label="$t('report.bonus')" width="80">
          <template slot-scope="scope">
            <p class="report-bonus">
              {{ scope.row.bonus }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="gross_income"
          :label="$t('report.gross_income')"
          width="120"
        >
          <template slot-scope="scope">
            <p
              :class="[
                'report-gross_income',
                scope.row.gross_income < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.gross_income }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="net_income"
          :label="$t('report.net_income')"
          width="100"
        >
          <template slot-scope="scope">
            <p
              :class="[
                'report-net_income',
                scope.row.net_income < 0 ? 'negative' : '',
              ]"
            >
              {{ scope.row.net_income }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          prop="day"
          :formatter="convertDate"
          :label="$t('report.day')"
          width="180"
        >
        </el-table-column> -->
        <el-table-column
          prop="commission"
          :label="$t('report.commission')"
          width="110"
        >
          <template slot-scope="scope">
            <p class="report-commission">
              {{ scope.row.commission }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="report-request-table-pagination"
      v-if="agentReportList.length > 0"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="50"
        :total="agentReportCount"
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
      agentReportList: [],
      agentReportCount: 4,
      agentStatistic: {},
      currentPage: 1,
      filter: {
        start_date: "",
        end_date: "",
        username: "",
        parent: "",
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
        page: this.filter.page,
        parent: this.filter.parent,
      };

      this.$api
        .requestByPost("/Proxy/statistics", tempFilter)
        .then((result) => {
          if (result.status == true) {
            this.agentReportList = result.data.list;
            this.agentReportCount = result.data.count;
            this.agentStatistic = result.data.statistic;
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
        } else if (column.property == "direct_user_num") {
          sums[index] = this.agentStatistic.direct_user_nums;
        } else if (column.property == "bet") {
          sums[index] = this.agentStatistic.bets;
        } else if (column.property == "win") {
          sums[index] = this.agentStatistic.wins;
        } else if (column.property == "withdraw") {
          sums[index] = this.agentStatistic.withdraws;
        } else if (column.property == "deposit") {
          sums[index] = this.agentStatistic.deposits;
        } else if (column.property == "bonus") {
          sums[index] = this.agentStatistic.bonus;
        } else if (column.property == "gross_income") {
          sums[index] = this.agentStatistic.gross_incomes;
        } else if (column.property == "net_income") {
          sums[index] = this.agentStatistic.net_incomes;
        } else if (column.property == "commission") {
          sums[index] = this.agentStatistic.commissions;
        } else if (column.property == "transfer_in") {
          sums[index] = this.agentStatistic.transfer_ins;
        } else if (column.property == "transfer_out") {
          sums[index] = this.agentStatistic.transfer_outs;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    csvExport() {
      let arrData = [];
      if (this.agentReportList == null || this.agentReportList == []) {
        return;
      }
      this.agentReportList.forEach((e) => {
        arrData.push({
          id: e.proxy_id,
          username: e.proxy ? e.proxy.name : "",
          superior: e.parent ? e.parent.name : "",
          role: e.role ? e.role.name.en : "",
          currency: e.currency,
          direct_user: e.direct_user_num,
          deposit: e.deposit,
          withdraw: e.withdraw,
          transfer_in: e.transfer_in,
          transfer_out: e.transfer_out,
          bet: e.bet,
          win: e.win,
          rebate: e.rebate,
          bonus: e.bonus,
          gross_income: e.gross_income,
          net_income: e.net_income,
          commission: e.commission,
        });
      });
      if (this.agentStatistic) {
        arrData.push({
          id: "SUM",
          username: "",
          superior: "",
          role: "",
          currency: "",
          direct_user: this.agentStatistic.direct_user_nums,
          deposit: this.agentStatistic.deposits,
          withdraw: this.agentStatistic.withdraws,
          transfer_in: this.agentStatistic.transfer_ins,
          transfer_out: this.agentStatistic.transfer_outs,
          bet: this.agentStatistic.bets,
          win: this.agentStatistic.wins,
          rebate: "",
          bonus: this.agentStatistic.bonus,
          gross_income: this.agentStatistic.gross_incomes,
          net_income: this.agentStatistic.net_incomes,
          commission: this.agentStatistic.commissions,
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
      link.setAttribute("download", `proxy-report${current}.csv`);
      link.click();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "../assets/scss/pc/report.scss";
@import "../assets/scss/mobile/report.scss";
</style>
