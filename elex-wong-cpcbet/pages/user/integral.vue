<template>
  <div class="integral">
    <div class="level-content-title web">
      <ContentTitle :text="$t('integral.title')" />
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("integral.title") }}
    </div>
    <div class="integral-balance">
      <div class="integral-title">
        {{ $t("integral.balance") }}: &ensp; {{ integralBalance }}
      </div>
      <div class="integral-button green-box" @click="openModal">
        {{ $t("integral.exchange") }}
      </div>
    </div>
    <div class="integral-list-details">
      <div class="integral-subtitle">
        {{ $t("integral.history") }}
      </div>
      <div class="integral-filter">
        <div class="integral-filter-date">
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
        <div class="integral-filter-platform">
          <div class="filter-platform-title mobile">
            {{ $t("integral.type") }}
          </div>
          <el-select
            v-model="type"
            :placeholder="$t('integral.pickPlatform')"
            @change="initIntegralList"
          >
            <el-option
              v-for="typeOptions in typeOptions"
              :key="typeOptions.id"
              :label="typeOptions.label"
              :value="typeOptions.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <hr />

      <div class="integral-details-table">
        <el-table :data="integralList" style="width: 100%" max-height="500">
          <el-table-column
            prop="sn"
            :label="$t('integral.sn')"
            width="230"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="type_str"
            :label="$t('integral.type')"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="integral"
            :label="$t('integral.integral')"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="money"
            :label="$t('integral.money')"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            :label="$t('integral.id')"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            :label="$t('integral.status')"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <p
                :class="[
                  scope.row.status == 1
                    ? 'integral-status-success'
                    : 'integral-status-fail',
                ]"
              >
                {{ scope.row.status_str }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            :label="$t('integral.create_time')"
            :formatter="convertDate"
            width="150"
            align="center"
          >
          </el-table-column>
          <template slot="empty">
            <div class="integral-nodata" v-if="betLists.length == 0">
              <img src="../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>

      <div class="integral-details-paginate" v-if="integralList.length != 0">
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
    <div class="integral-exchange-popup" v-if="isOpenActionModal">
      <div class="integral-exchange-popup-wrap">
        <div class="integral-popup-title">
          {{ $t("integral.pls_enter_exchange_amount") }}
        </div>
        <div class="integral-popup-label">
          {{ $t("integral.available_balance") }}: {{ integralBalance }}
        </div>
        <el-form ref="exchangeForm" :model="exchangeForm" class="integral-form">
          <el-form-item>
            <el-input
              class="integral-popup-input"
              v-model="exchangeForm.amount"
              :placeholder="$t('integral.amount')"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="integral-popup-button greenGradientButtonBg"
              @click="exchangeBalance"
              ><div v-if="isLoading"><i class="el-icon-loading"></i></div>
              <div v-else>{{ $t("integral.confirm") }}</div></el-button
            >
            <el-button class="cancel-button" @click="closeModal">
              {{ $t("integral.cancel") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Integral",
  // head() {
  //   return {
  //     title: this.$t("integral.title"),
  //   };
  // },
  data() {
    return {
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
      type: 0,
      typeOptions: [
        { id: 0, label: this.$t("integral.all") },
        { id: 1, label: this.$t("integral.bet") },
        { id: 2, label: this.$t("integral.exchange") },
        { id: 3, label: this.$t("integral.adjust") },
      ],

      integralBalance: 0,
      integralList: [],
      integralListtemp: [
        {
          sn: "20230118155833122371006619",
          type: 2,
          integral: 7.03,
          money: 1.4,
          status: 1,
          create_time: 1674028713,
          id: "1120",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155825486722007307",
          type: 2,
          integral: 100,
          money: 20,
          status: 1,
          create_time: 1674028705,
          id: "1119",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155712481850005836",
          type: 2,
          integral: 10,
          money: 2,
          status: 1,
          create_time: 1674028632,
          id: "1118",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155613408752006675",
          type: 2,
          integral: 10,
          money: 2,
          status: 1,
          create_time: 1674028573,
          id: "1117",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155559963807009233",
          type: 2,
          integral: 10,
          money: 2,
          status: 1,
          create_time: 1674028559,
          id: "1116",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155548533209007607",
          type: 2,
          integral: 10,
          money: 2,
          status: 1,
          create_time: 1674028548,
          id: "1115",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155538179025008619",
          type: 2,
          integral: 10,
          money: 2,
          status: 1,
          create_time: 1674028538,
          id: "1114",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155336735983004836",
          type: 2,
          integral: 1000,
          money: 200,
          status: 1,
          create_time: 1674028416,
          id: "1113",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          sn: "20230118155317720033003245",
          type: 2,
          integral: 100,
          money: 20,
          status: 1,
          create_time: 1674028397,
          id: "1112",
          status_str: "success",
          type_str: "exchange",
          platform_name: null,
        },
        {
          create_time: 1674028205,
          type: 1,
          money: 0,
          integral: 420,
          sn: "202301181551188723205490",
          status: 1,
          id: "1111",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1674013810,
          type: 1,
          money: 0,
          integral: 5.6,
          sn: "202301181151351491421745",
          status: 1,
          id: "1088",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1674013803,
          type: 1,
          money: 0,
          integral: 9.8,
          sn: "202301181151051203106216",
          status: 1,
          id: "1087",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1674013759,
          type: 1,
          money: 0,
          integral: 18.2,
          sn: "20230118115035889951601",
          status: 1,
          id: "1086",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1674008550,
          type: 1,
          money: 0,
          integral: 3.08,
          sn: "202301181024037031180097",
          status: 1,
          id: "1085",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937917,
          type: 1,
          money: 0,
          integral: 5.6,
          sn: "202301171446379909403511",
          status: 1,
          id: "1054",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937906,
          type: 1,
          money: 0,
          integral: 15.4,
          sn: "202301171446079618953080",
          status: 1,
          id: "1053",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937850,
          type: 1,
          money: 0,
          integral: 2.8,
          sn: "202301171445379335241662",
          status: 1,
          id: "1052",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937846,
          type: 1,
          money: 0,
          integral: 15.4,
          sn: "202301171445078967314921",
          status: 1,
          id: "1051",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937148,
          type: 1,
          money: 0,
          integral: 14,
          sn: "202301171433472113129745",
          status: 1,
          id: "1039",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
        {
          create_time: 1673937136,
          type: 1,
          money: 0,
          integral: 28,
          sn: "202301171433171842681281",
          status: 1,
          id: "1038",
          status_str: "success",
          type_str: "bet",
          platform_name: null,
        },
      ],
      integralCount: 0,
      exchangeForm: {
        amount: 0,
      },
      isLoading: false,
      isOpenActionModal: false,
    };
  },
  mounted() {
    this.getBalance();
    this.initIntegralList();
  },
  methods: {
    getBalance() {
      this.$api
        .requestByPost("Integral/balance")
        .then((result) => {
          if (result.status == true) {
            this.integralBalance = result.data;
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
    initIntegralList() {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      let params = {
        type: this.type,
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
        .requestByPost("Integral/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.integralList = result.data.list;
            this.integralCount = result.data.count;
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
    exchangeBalance() {
      this.isLoading = true;
      this.$api
        .requestByPost("Integral/exchange", this.exchangeForm)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.getBalance();
            this.initIntegralList();
            this.getUser();
            this.closeModal();
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
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
      this.initIntegralList();
    },

    search() {
      this.getGameBets();
    },
    back() {
      this.$router.back();
    },

    openModal() {
      this.isOpenActionModal = true;
    },
    closeModal() {
      this.isOpenActionModal = false;
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          this.$store.dispatch("updateUserInfo", result.data);
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/integral.scss";
@import "/assets/scss/mobile/integral.scss";
</style>
