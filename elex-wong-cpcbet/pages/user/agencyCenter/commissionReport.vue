<template>
  <div class="commission-report">
    <div class="commission-report-overview-container">
      <div class="commission-report-back back-title">
        <span @click="back">
          <i class="el-icon-back"></i>{{ $t("commissionReport.title") }}
        </span>
      </div>
      <div class="commission-report-overview">
        <div class="commission-title">
          <ContentTitle :text="$t('commissionReport.commissionOverview')" />
        </div>
        <div
          class="commission-report-overview-exist"
          v-if="overview.length != 0"
        >
          <div
            class="commission-report-overview-card"
            v-for="(item, index) in overviewList"
            :key="index"
          >
            <div class="card-total-number">{{ item.value }}</div>
            <div class="card-title">{{ item.key }}</div>
          </div>
        </div>
        <div class="commission-report-nodata" v-if="overview.length == 0">
          <img src="../../../assets/img/no_data.png" />
          <div>{{ $t("no_data") }}</div>
        </div>
      </div>
    </div>

    <div class="commission-report-details">
      <div class="commission-title">
        <ContentTitle :text="$t('commissionReport.commissionDetails')" />
      </div>

      <div class="commission-report-filter">
        <div class="commission-report-filter-date">
          <div class="filter-date-title">{{ $t("dateFilter.time") }}</div>
          <div class="filter-date-picker">
            <el-date-picker
              v-model="dateFrom"
              type="date"
              :placeholder="$t('dateFilter.pickDate')"
              :picker-options="pickerOptionsFrom"
            />
            {{ $t("dateFilter.to") }}
            <el-date-picker
              v-model="dateTo"
              type="date"
              :placeholder="$t('dateFilter.pickDate')"
              :picker-options="pickerOptionsTo"
            />
          </div>
        </div>
        <hr class="mobile" />
        <div class="commission-report-filter-user">
          <div class="filter-user-title">
            {{ $t("commissionReport.memberAccount") }}
          </div>
          <div class="filter-user-input">
            <el-input
              v-model="userId"
              :placeholder="$t('commissionReport.plsEnterMemberid')"
            />
          </div>
          <div class="filter-button greenGradientButtonBg" @click="search">
            {{ $t("search") }}
          </div>
        </div>
      </div>

      <hr class="web" />

      <div class="commission-report-datetime-button-group">
        <div class="commission-report-datetime-button" @click="setDate('now')">
          {{ $t("dateFilter.today") }}
        </div>
        <div
          class="commission-report-datetime-button"
          @click="setDate('yesterday')"
        >
          {{ $t("dateFilter.yesterday") }}
        </div>
        <div
          class="commission-report-datetime-button"
          @click="setDate('thisweek')"
        >
          {{ $t("dateFilter.thisweek") }}
        </div>
        <div
          class="commission-report-datetime-button"
          @click="setDate('lastweek')"
        >
          {{ $t("dateFilter.lastweek") }}
        </div>
        <div
          class="commission-report-datetime-button"
          @click="setDate('thismonth')"
        >
          {{ $t("dateFilter.thismonth") }}
        </div>
        <div
          class="commission-report-datetime-button"
          @click="setDate('lastmonth')"
        >
          {{ $t("dateFilter.lastmonth") }}
        </div>
      </div>

      <div class="commission-report-details-table web">
        <el-table :data="reportDetails" style="width: 100%">
          <el-table-column
            prop="user_id"
            :label="$t('commissionReport.userAccount')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="day"
            :label="$t('commissionReport.commissionDate')"
            :formatter="convertDate"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="win"
            :label="$t('commissionReport.win')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('commissionReport.bet')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deposit"
            :label="$t('commissionReport.deposit')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commission_money"
            :label="$t('commissionReport.commissionMoney')"
            width="180"
            align="center"
          >
          </el-table-column>

          <template slot="empty">
            <div
              class="commission-report-nodata commission-table-nodata"
              v-if="reportDetails.length == 0"
            >
              <img src="../../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>
      <div class="commission-report-details-table mobile">
        <el-table :data="reportDetails" style="width: 100%">
          <el-table-column
            prop="user_id"
            :label="$t('commissionReport.userAccount')"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="day"
            :label="$t('commissionReport.commissionDate')"
            :formatter="convertDate"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="win"
            :label="$t('commissionReport.win')"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('commissionReport.bet')"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deposit"
            :label="$t('commissionReport.deposit')"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commission_money"
            :label="$t('commissionReport.commissionMoney')"
            width="120"
            align="center"
          >
          </el-table-column>

          <template slot="empty">
            <div
              class="commission-report-nodata commission-table-nodata"
              v-if="reportDetails.length == 0"
            >
              <img src="../../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>

      <div
        class="commission-report-details-paginate"
        v-if="reportDetails.length != 0"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="totalList"
          :current-page="paginate"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../../components/ContentTitle.vue";
export default {
  name: "CommissionReport",
  head() {
    return {
      title: this.$t("commissionReport.title"),
    };
  },
  mounted() {},
  data() {
    return {
      overview: {},
      overviewList: [],
      dateFrom: null,
      dateTo: null,
      userId: "",
      reportDetails: [],
      pickerOptionsTo: {
        disabledDate: this.disabledDatesTo,
      },
      pickerOptionsFrom: {
        disabledDate: this.disabledDatesFrom,
      },
      totalList: 0,
      paginate: 1,
    };
  },
  mounted() {
    this.getProxylists();
  },
  methods: {
    getProxylists() {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      let params = {
        user_id: this.userId,
        begin_time:
          this.dateFrom != null
            ? Date.parse(this.dateFrom) / 1000
            : Date.parse(today) / 1000,
        end_time:
          this.dateTo != null
            ? Date.parse(this.dateTo) / 1000
            : Date.parse(today) / 1000,
        page: this.paginate,
      };

      this.$api
        .requestByPost("Proxy/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.overviewList = [];
            this.reportDetails = [];
            this.overview = result.data.statistic;
            Object.keys(this.overview)
              .filter((e) => !e.includes("diamond"))
              .forEach((key) => {
                this.overviewList.push({
                  key: key,
                  value: this.overview[key],
                });
              });

            this.reportDetails = result.data.list;
            this.totalList = result.data.count;
          } else {
            this.$notiflix.Notify.failure(
              result.msg != "" ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    setDate(type) {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      var temp = new Date();
      temp.setHours(0);
      temp.setMinutes(0);
      temp.setSeconds(0);

      switch (type) {
        case "now":
          temp.setDate(temp.getDate());
          this.dateFrom = today;
          this.dateTo = today;
          break;
        case "yesterday":
          temp.setDate(temp.getDate() - 1);
          this.dateFrom = temp;
          this.dateTo = today;
          break;
        case "thisweek":
          temp.setDate(temp.getDate() - temp.getDay() + 1);
          this.dateFrom = temp;
          this.dateTo = today;
          break;
        case "lastweek":
          temp.setDate(temp.getDate() - temp.getDay() + 1 - 7);
          today.setDate(today.getDate() - today.getDay());
          this.dateFrom = temp;
          this.dateTo = today;
          break;
        case "thismonth":
          this.dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
          this.dateTo = today;
          break;
        case "lastmonth":
          this.dateFrom = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          );
          this.dateTo = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
      }

      this.paginate = 1;
      this.getProxylists();
    },

    disabledDatesTo(date) {
      if (this.dateFrom) {
        return this.dateFrom > date;
      }
      return false;
    },

    disabledDatesFrom(date) {
      if (this.dateTo) {
        return this.dateTo < date;
      }
      return false;
    },

    handleCurrentChange(val) {
      this.paginate = val;
      this.getProxylists();
    },

    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return new Date(date * 1000).toLocaleDateString("en-GB");
    },

    back() {
      this.$router.back();
    },

    search() {
      this.getProxylists();
    },
  },
  components: { ContentTitle },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/commissionReport.scss";
@import "/assets/scss/mobile/commissionReport.scss";
</style>
