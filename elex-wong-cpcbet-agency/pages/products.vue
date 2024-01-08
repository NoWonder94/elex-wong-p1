<template>
  <div class="report-request">
    <!-- <div class="report-filter-container">
      <div class="report-filter-label">
        Filter :
      </div>
      <el-form ref="transferlogform" :model="filter" class="report-form">
        <el-form-item>
          <el-input
            class="report-filter-input"
            v-model="filter.username"
            :placeholder="$t('transfer_log.username')"
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
          <el-button class="fill-box report-filter-button" @click="init"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div> -->
    <div class="report-request-table">
      <el-table :data="agentReportList" border style="width: 100%">
        <el-table-column
          prop="game_type"
          :label="$t('products.game_type')"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="name" :label="$t('products.name')" width="200">
        </el-table-column>
        <el-table-column
          prop="user_num"
          :label="$t('products.user_num')"
          width="155"
        >
        </el-table-column>
        <el-table-column prop="bets" :label="$t('products.bets')" width="110">
        </el-table-column>
        <el-table-column
          prop="bonus_bets"
          :label="$t('products.bonus_bets')"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="bonus_wins"
          :label="$t('products.bonus_wins')"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="wins" :label="$t('products.wins')" width="110">
        </el-table-column>
        <el-table-column
          prop="game_profits"
          :label="$t('products.game_profits')"
          width="110"
        >
        </el-table-column>
        <el-table-column prop="ggr" :label="$t('products.ggr')" width="110">
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
      fundsLogListtemp: [
        {
          type: "Proxy transfer in",
          user_id: 100010009,
          currency: "PHP",
          balance: 100.57,
          related_key: "20221213113514363749906904",
          related_type: "transfer",
          create_time: 1670902514,
          remark: "test",
          increase: 100,
          decrease: 0,
        },
        {
          type: "Commission",
          user_id: 100010009,
          currency: "PHP",
          balance: 0.57,
          related_key: "100010009|0|1662307200",
          related_type: "proxy_currency_statistic_day",
          create_time: 1662341902,
          remark: "",
          increase: 0.57,
          decrease: 0,
        },
        {
          type: "Proxy transfer out",
          user_id: 100010009,
          currency: "PHP",
          balance: 0,
          related_key: "20220829173231201476001242",
          related_type: "transfer",
          create_time: 1661765551,
          remark: "test",
          increase: 0,
          decrease: 10000,
        },
        {
          type: "Deposit (Management)",
          user_id: 100010009,
          currency: "PHP",
          balance: 10000,
          related_key: "20220829173212534610001751",
          related_type: "user_deposit",
          create_time: 1661765532,
          remark: "test",
          increase: 10000,
          decrease: 0,
        },
      ],
      agentReportList: [],
      agentReportCount: 4,
      currentPage: 1,
      filter: {
        start_date: "",
        end_date: "",
        username: "",
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
      };

      this.$api
        .requestByPost("/Account/products")
        .then((result) => {
          if (result.status == true) {
            this.agentReportList = result.data;
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
  },
};
</script>

<style lang="scss" type="text/css">
@import "../assets/scss/pc/report.scss";
@import "../assets/scss/mobile/report.scss";
</style>
