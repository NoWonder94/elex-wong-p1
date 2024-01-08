<template>
  <div class="betHistory">
    <div class="level-content-title web">
      <ContentTitle :text="$t('betHistory.title')" />
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("betHistory.title") }}
    </div>
    <div class="betHistory-details">
      <div class="betHistory-filter">
        <div class="betHistory-filter-date">
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
        <div class="betHistory-filter-platform">
          <div class="filter-platform-title mobile">
            {{ $t("betHistory.gamePlatform") }}
          </div>
          <el-select
            v-model="platform"
            :placeholder="$t('betHistory.pickPlatform')"
            @change="getGameBets"
          >
            <el-option
              v-for="platformOption in gamePlatformListOptions"
              :key="platformOption.value"
              :label="platformOption.name"
              :value="platformOption.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <hr />

      <div class="betHistory-datetime-button-group">
        <div class="betHistory-datetime-button" @click="setDate('now')">
          {{ $t("dateFilter.today") }}
        </div>
        <div class="betHistory-datetime-button" @click="setDate('yesterday')">
          {{ $t("dateFilter.yesterday") }}
        </div>
        <div class="betHistory-datetime-button" @click="setDate('thisweek')">
          {{ $t("dateFilter.thisweek") }}
        </div>
        <div class="betHistory-datetime-button" @click="setDate('lastweek')">
          {{ $t("dateFilter.lastweek") }}
        </div>
        <div class="betHistory-datetime-button" @click="setDate('thismonth')">
          {{ $t("dateFilter.thismonth") }}
        </div>
        <div class="betHistory-datetime-button" @click="setDate('lastmonth')">
          {{ $t("dateFilter.lastmonth") }}
        </div>
      </div>

      <div class="betHistory-details-table web">
        <el-table :data="betLists" style="width: 100%" max-height="500">
          <el-table-column
            prop="platform_name"
            :label="$t('betHistory.gamePlatform')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="game_name"
            :label="$t('betHistory.gameName')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('betHistory.betAmount')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="win"
            :label="$t('betHistory.winAmount')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="integral"
            :label="$t('betHistory.getScore')"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            :label="$t('betHistory.gameTime')"
            :formatter="convertDate"
            width="180"
            align="center"
          >
          </el-table-column>
          <template slot="empty">
            <div class="betHistory-nodata" v-if="betLists.length == 0">
              <img src="../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>

      <div class="betHistory-details-table mobile">
        <el-table :data="betLists" style="width: 100%" max-height="500">
          <el-table-column
            prop="platform_name"
            :label="$t('betHistory.gamePlatform')"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="game_name"
            :label="$t('betHistory.gameName')"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('betHistory.betAmount')"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="win"
            :label="$t('betHistory.winAmount')"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="integral"
            :label="$t('betHistory.getScore')"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            :label="$t('betHistory.gameTime')"
            :formatter="convertDate"
            width="110"
            align="center"
          >
          </el-table-column>
          <template slot="empty">
            <div class="betHistory-nodata" v-if="betLists.length == 0">
              <img src="../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>

      <div class="betHistory-details-paginate" v-if="betLists.length != 0">
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
export default {
  name: "BetHistory",
  // head() {
  //   return {
  //     title: this.$t("betHistory.title"),
  //   };
  // },
  data() {
    return {
      isLoading: false,
      dateFrom: null,
      dateTo: null,
      pickerOptionsTo: {
        disabledDate: this.disabledDatesTo,
      },
      pickerOptionsFrom: {
        disabledDate: this.disabledDatesFrom,
      },
      totalList: 0,
      paginate: 1,
      betLists: [],
      platform: "",
      gamePlatformListOptions: [],
    };
  },
  mounted() {
    this.initGamePlatforms();
    this.getGameBets();
  },
  methods: {
    initGamePlatforms() {
      this.$api
        .requestByPost("Game/platforms")
        .then((result) => {
          if (result.status == true) {
            this.gamePlatformListOptions = result.data;
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
    getGameBets() {
      this.isLoading = true;
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      let params = {
        platform: this.platform,
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
        .requestByPost("Game/bets", params)
        .then((result) => {
          if (result.status == true) {
            this.betLists = [];
            this.betLists = result.data.list;
            this.totalList = result.data.count;
          } else {
            this.$notiflix.Notify.failure(
              result.msg != "" ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
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
      this.getGameBets();
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

    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return new Date(date * 1000).toLocaleDateString("en-GB");
    },

    handleCurrentChange(val) {
      this.paginate = val;
      this.getGameBets();
    },

    search() {
      this.getGameBets();
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/betHistory.scss";
@import "/assets/scss/mobile/betHistory.scss";
</style>
