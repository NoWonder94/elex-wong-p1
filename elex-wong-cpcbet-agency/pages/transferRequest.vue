<template>
  <div class="transfer-request">
    <div class="transfer-request-header">
      <div class="header-item" @click="routeBack">
        <img src="../assets/img/back.svg" />
        {{ $t("transfer_log.title") }}
      </div>
    </div>
    <div class="transfer-request-body">
      <div class="transfer-log-filter-container">
        <!-- <div class="transfer-log-filter-label">
        Filter :
      </div> -->
        <el-form
          ref="transferlogform"
          :model="filter"
          class="transfer-log-form"
        >
          <el-form-item>
            <el-input
              class="transfer-log-filter-input"
              v-model="filter.account_id"
              :placeholder="$t('transfer_log.user_id')"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              class="transfer-log-filter-input"
              v-model="filter.username"
              :placeholder="$t('transfer_log.username')"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="start_date">
            <el-date-picker
              v-model="filter.start_date"
              class="transfer-log-filter-date"
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
              class="transfer-log-filter-date"
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
            <el-select
              class="transfer-log-filter-select"
              v-model="filter.order"
              placeholder="Order"
              clearable
            >
              <el-option
                v-for="item in orderList"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              class="transfer-log-filter-select"
              v-model="filter.sort"
              placeholder="Sort"
            >
              <el-option
                v-for="item in sortList"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="fill-box transfer-log-filter-button" @click="init"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="transfer-log-statistic">
        <div class="transfer-log-statistic-item">
          <div class="transfer-log-statistic-label">
            {{ $t("transfer_log.total_amount") }}
          </div>
          <div class="transfer-log-statistic-value">
            {{ statistic.moneys }}
          </div>
        </div>
        <!-- <div class="transfer-log-statistic-item">
        <div class="transfer-log-statistic-label">
          {{ $t("transfer_log.money_decs") }}
        </div>
        <div class="transfer-log-statistic-value">
          {{ statistic.money_decs }}
        </div>
      </div> -->
      </div>
      <div class="transfer-log-request-table">
        <el-table :data="fundsLogList" border style="width: 100%">
          <el-table-column
            prop="currency"
            :label="$t('transfer_log.currency')"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="account_id"
            :label="$t('transfer_log.user_id')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="account.name"
            :label="$t('transfer_log.username')"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="sn" :label="$t('transfer_log.sn')" width="240">
          </el-table-column>
          <el-table-column
            prop="money"
            :label="$t('transfer_log.money')"
            width="240"
          >
          </el-table-column>
          <el-table-column :label="$t('transfer_log.type')" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.type != null">
                {{ scope.row.type == 1 ? $t("agents") : $t("player") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            :formatter="convertDate"
            :label="$t('transfer_log.create_time')"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            :label="$t('transfer_log.remark')"
            width="200"
          >
          </el-table-column>
        </el-table>
      </div>
      <div
        class="transfer-log-request-table-pagination"
        v-if="fundsLogList.length > 0"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="50"
          :total="fundsLogCount"
          :current-page="filter.page"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
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
      fundsLogList: [],
      fundsLogCount: 4,
      currentPage: 1,
      orderList: [
        { key: "money", label: "Money" },
        { key: "time", label: "Time" },
      ],
      sortList: [
        { key: "asc", label: "Ascending" },
        { key: "desc", label: "Descending" },
      ],
      statistic: {
        moneys: 0,
      },
      filter: {
        account_id: "",
        username: "",
        start_date: "",
        end_date: "",
        page: 1,
        order: "",
        sort: "asc",
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
        account_id: this.filter.account_id,
        username: this.filter.username,
        start_date: Date.parse(this.filter.start_date) / 1000,
        end_date: Date.parse(this.filter.end_date) / 1000,
        page: this.filter.page,
        order: this.filter.order,
        sort: this.filter.sort,
      };

      this.$api
        .requestByPost("/Transfer/lists", tempFilter)
        .then((result) => {
          if (result.status == true) {
            this.fundsLogList = result.data.list;
            this.fundsLogCount = result.data.count;
            this.statistic = result.data.statistic;
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
@import "../assets/scss/pc/transferRequest.scss";
@import "../assets/scss/mobile/transferRequest.scss";
</style>
