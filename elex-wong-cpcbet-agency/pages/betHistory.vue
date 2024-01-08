<template>
  <div class="betHistory">
    <div class="betHistory-filter-container">
      <!-- <div class="betHistory-filter-label">
        Filter :
      </div> -->
      <el-form ref="transferlogform" :model="filter" class="betHistory-form">
        <el-form-item>
          <el-input
            class="betHistory-filter-input"
            v-model="filter.username"
            :placeholder="$t('transfer_log.username')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="betHistory-filter-input"
            v-model="filter.user_id"
            :placeholder="$t('transfer_log.user_id')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="start_date">
          <el-date-picker
            v-model="filter.start_date"
            class="betHistory-filter-date"
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
            class="betHistory-filter-date"
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
            class="betHistory-filter-select"
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
            class="betHistory-filter-select"
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
          <el-button class="fill-box betHistory-filter-button" @click="init"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="betHistory-request-table">
      <el-table :data="betHistoryList" border style="width: 100%">
        <el-table-column
          prop="game_platform_code"
          :label="$t('betHistory.game_platform_code')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="user_id"
          :label="$t('betHistory.user_id')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="currency"
          :label="$t('betHistory.currency')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="game_id"
          :label="$t('betHistory.game_id')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="game.name.en"
          :label="$t('betHistory.game')"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="game_platform.name.en"
          :label="$t('betHistory.game_platform')"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="user.name"
          :label="$t('betHistory.user')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="balance"
          :label="$t('betHistory.balance')"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="bet" :label="$t('betHistory.bet')" width="80">
          <template slot-scope="scope">
            <p class="betHistory-bet">
              {{ scope.row.bet }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="win" :label="$t('betHistory.win')" width="80">
          <template slot-scope="scope">
            <p class="betHistory-win">
              {{ scope.row.win }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="integral"
          :label="$t('betHistory.integral')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          :formatter="convertDate"
          :label="$t('betHistory.create_time')"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
    <div
      class="betHistory-request-table-pagination"
      v-if="betHistoryList.length > 0"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="50"
        :total="betHistoryCount"
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
      betHistoryListtemp: [
        {
          game_platform_code: "Fc", //游戏平台代码
          user_id: 100010008,
          currency: "PHP",
          game_id: 723,
          create_time: 1673929421,
          balance: 9470, //余额
          bet: 12, //投注金额
          win: 0, //赢取金额
          integral: 1.68, //积分
          user: {
            //玩家信息
            id: 100010008,
            name: "test9999",
            balance: 0,
          },
          game: {
            //游戏信息
            id: 723,
            name: {
              cn: "大过年",
              en: "CHINESE NEW YEAR",
              es: "",
              id: "",
              ph: "",
              pt: "",
              th: "",
              vn: "Cuối Năm",
            },
          },
          game_platform: {
            //游戏平台信息
            code: "Fc",
            name: {
              cn: "",
              en: "FC",
              es: "",
              id: "",
              ph: "",
              pt: "",
              th: "",
              vn: "",
            },
            is_seamless: 1,
          },
        },
      ],
      betHistoryList: [],
      betHistoryCount: 4,
      currentPage: 1,
      filter: {
        start_date: "",
        end_date: "",
        username: "",
        user_id: "",
        page: 1,
        order: "",
        sort: "asc",
      },
      orderList: [
        { key: "bet", label: "Bet" },
        { key: "time", label: "Time" },
        { key: "win", label: "Win Amount" },
      ],
      sortList: [
        { key: "asc", label: "Ascending" },
        { key: "desc", label: "Descending" },
      ],
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
        order: this.filter.order,
        sort: this.filter.sort,
        user_id: this.filter.user_id,
      };

      this.$api
        .requestByPost("/GameBet/lists", tempFilter)
        .then((result) => {
          if (result.status == true) {
            this.betHistoryList = result.data.list;
            this.betHistoryCount = result.data.count;
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
@import "../assets/scss/pc/betHistory.scss";
@import "../assets/scss/mobile/betHistory.scss";
</style>
