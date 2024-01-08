<template>
  <div class="bonus">
    <div class="level-content-title web">
      <ContentTitle :text="$t('bonus.title')" />
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("bonus.title") }}
    </div>
    <div class="bonus-details">
      <el-tabs v-model="activetab" stretch>
        <el-tab-pane
          :label="$t('bonus.bonus_wait_receive')"
          name="bonus_wait_receive"
        >
          <div
            class="bonus-details-table web"
            v-for="item in bonus_wait_receive"
            :key="item.id"
          >
            <div class="bonus-table-title">{{ item.name }}</div>
            <el-table :data="item.list" style="width: 100%" max-height="500">
              <el-table-column prop="id" label="id" width="180" align="center">
              </el-table-column>
              <el-table-column
                prop="bonus"
                :label="$t('bonus.title')"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="bet"
                :label="$t('bonus.bet')"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                :label="$t('bonus.actions')"
                width="230"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    class="agent-action-button"
                    @click="handleOpenActionModal(scope, item.id)"
                  >
                    {{ $t("bonus.claim") }}
                  </el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="bonus-nodata" v-if="item.list.length == 0">
                  <img src="../../assets/img/no_data.png" />
                  <div>{{ $t("no_data") }}</div>
                </div>
              </template>
            </el-table>
          </div>
          <div
            class="bonus-details-table mobile"
            v-for="item in bonus_wait_receive"
            :key="item.id"
          >
            <div class="bonus-table-title">{{ item.name }}</div>
            <el-table :data="item.list" style="width: 100%" max-height="500">
              <el-table-column prop="id" label="id" width="60" align="center">
              </el-table-column>
              <el-table-column
                prop="bonus"
                :label="$t('bonus.title')"
                width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="bet"
                :label="$t('bonus.bet')"
                width="140"
                align="center"
              >
              </el-table-column>
              <el-table-column
                :label="$t('bonus.actions')"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    class="bonus-action-button"
                    @click="handleOpenActionModal(scope, item.id)"
                  >
                    {{ $t("bonus.claim") }}
                  </el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="bonus-nodata" v-if="item.list.length == 0">
                  <img src="../../assets/img/no_data.png" />
                  <div>{{ $t("no_data") }}</div>
                </div>
              </template>
            </el-table>
          </div>
          <div
            v-if="bonus_wait_receive && bonus_wait_receive.length <= 0"
            style="text-align: center"
          >
            <div class="bonus-nodata">
              <img src="../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('bonus.bonus_received')" name="bonus_received">
          <div class="bonus-filter">
            <div class="bonus-filter-date">
              <div class="filter-date-title">{{ $t("dateFilter.time") }}</div>
              <div class="filter-date-picker">
                <el-date-picker
                  v-model="bonus_received_filter.dateFrom"
                  type="date"
                  :placeholder="$t('dateFilter.pickDate')"
                  :picker-options="pickerOptionsFrom"
                />
                {{ $t("dateFilter.to") }}
                <el-date-picker
                  v-model="bonus_received_filter.dateTo"
                  type="date"
                  :placeholder="$t('dateFilter.pickDate')"
                  :picker-options="pickerOptionsTo"
                />
              </div>
            </div>
            <div class="bonus-search" @click="initBonusReceived">
              {{ $t("search") }}
            </div>
          </div>
          <hr />
          <div class="bonus-datetime-button-group">
            <div class="bonus-datetime-button" @click="setDate('now')">
              {{ $t("dateFilter.today") }}
            </div>
            <div class="bonus-datetime-button" @click="setDate('yesterday')">
              {{ $t("dateFilter.yesterday") }}
            </div>
            <div class="bonus-datetime-button" @click="setDate('thisweek')">
              {{ $t("dateFilter.thisweek") }}
            </div>
            <div class="bonus-datetime-button" @click="setDate('lastweek')">
              {{ $t("dateFilter.lastweek") }}
            </div>
            <div class="bonus-datetime-button" @click="setDate('thismonth')">
              {{ $t("dateFilter.thismonth") }}
            </div>
            <div class="bonus-datetime-button" @click="setDate('lastmonth')">
              {{ $t("dateFilter.lastmonth") }}
            </div>
          </div>

          <div class="bonus-details-table">
            <el-table
              :data="bonus_received"
              style="width: 100%"
              max-height="500"
            >
              <el-table-column
                prop="sn"
                :label="$t('bonus.sn')"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="money"
                :label="$t('bonus.money')"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="bet_money"
                :label="$t('bonus.bet_money')"
                width="110"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="already_money"
                :label="$t('bonus.already_money')"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="template.name"
                :label="$t('bonus.template')"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column
                :label="$t('bonus.status')"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == 1" class="bonus-status-success">
                    {{ $t("bonus.success") }}
                  </p>
                  <p v-else class="bonus-status-fail">{{ $t("bonus.fail") }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="status_str"
                :label="$t('bonus.remark')"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="receive_time"
                :label="$t('bonus.receive_time')"
                :formatter="convertDate"
                width="180"
                align="center"
              >
              </el-table-column>
              <template slot="empty">
                <div class="bonus-nodata" v-if="bonus_received.length == 0">
                  <img src="../../assets/img/no_data.png" />
                  <div>{{ $t("no_data") }}</div>
                </div>
              </template>
            </el-table>
          </div>

          <div class="bonus-details-paginate" v-if="bonus_received.length != 0">
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bonus-popup" v-show="isActionPopup">
      <div class="bonus-popup-wrap" v-if="curBonusRow">
        <div class="bonus-popup-title">
          {{ $t("bonus.confirm_receive_bonus") }}
        </div>
        <div class="bonus-popup-label">
          {{ $t("bonus.title") }}: {{ getCurBonusTemplateName() }}
        </div>
        <div class="bonus-popup-label">Id: {{ curBonusRow.id }}</div>
        <div class="bonus-popup-term"><el-checkbox v-model="term_checked"></el-checkbox>  {{$t('bonus.by_click_accepting')}} <nuxt-link to="/events/1" target="_blank">{{$t('bonus.term_condition')}}</nuxt-link></div>
        <div class="bonus-button-group">
          <el-button class="greenGradientButtonBg" @click="receiveBonus">
            <div v-if="isLoading"><i class="el-icon-loading"></i></div>
            <div v-else>{{ $t("bonus.confirm") }}</div>
          </el-button>
          <el-button class="cancel-button" @click="closeModal">
            {{ $t("bonus.cancel") }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bonus",
  // head() {
  //   return {
  //     title: this.$t("betHistory.title"),
  //   };
  // },
  data() {
    return {
      isLoading: false,
      activetab: "bonus_wait_receive",
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
      bonus_wait_receive: [],
      bonus_wait_receive_temp: [
        {
          id: 2, //奖金模板ID
          name: "Day First Deposit", //奖金名称
          list: [
            //奖金列表
            {
              id: 15, //奖金ID
              bonus: 12.4, //可得奖金
              bet: 2124, //需要达到的投注金额
            },
            {
              id: 16,
              bonus: 12.4,
              bet: 2124,
            },
            {
              id: 17,
              bonus: 12.4,
              bet: 2124,
            },
            {
              id: 18,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 19,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 20,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 21,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 22,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 23,
              bonus: 5.2,
              bet: 1052,
            },
            {
              id: 24,
              bonus: 5.2,
              bet: 1052,
            },
          ],
        },
        {
          id: 3, //奖金模板ID
          name: "Day Second Deposit", //奖金名称
          list: [
            //奖金列表
            {
              id: 15, //奖金ID
              bonus: 12.4, //可得奖金
              bet: 2124, //需要达到的投注金额
            },
            {
              id: 16,
              bonus: 12.4,
              bet: 2124,
            },
            {
              id: 17,
              bonus: 12.4,
              bet: 2124,
            },
            {
              id: 18,
              bonus: 5.2,
              bet: 1052,
            },
          ],
        },
      ],
      bonus_received: [],
      bonus_received_count: 0,
      bonus_received_temp: [
        {
          sn: "20220323155430935872009816", //流水号
          money: 20, //奖金金额
          bet_money: 200, //要求投注金额
          already_money: 0, //已投注金额
          receive_time: 1648022070, //领取时间
          status: 1, //投注状态
          status_str: "未完成", //投注状态描述
          template: {
            //模板
            id: 4,
            name: "en5", //奖金名称
          },
        },
      ],
      bonus_received_filter: {
        dateFrom: null,
        dateTo: null,
        paginate: 1,
      },
      term_checked:false,
      isActionPopup: false,
      curBonusRow: null,
      curBonusTemplateId: 0,
    };
  },
  mounted() {
    this.initBonusWaitReceive();
    this.initBonusReceived();
  },
  methods: {
    initBonusWaitReceive() {
      this.$api
        .requestByPost("Bonus/waitreceive")
        .then((result) => {
          if (result.status == true) {
            this.bonus_wait_receive = result.data;
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
    initBonusReceived() {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);

      let params = {
        begin_time:
          this.bonus_received_filter.dateFrom != null
            ? Date.parse(this.bonus_received_filter.dateFrom) / 1000
            : Date.parse(today) / 1000,
        end_time:
          this.bonus_received_filter.dateTo != null
            ? Date.parse(this.bonus_received_filter.dateTo) / 1000
            : Date.parse(today) / 1000,
        status: 0,
        page: this.bonus_received_filter.paginate,
      };

      this.$api
        .requestByPost("Bonus/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.bonus_received = result.data.list;
            this.bonus_received_count = result.data.count;
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
          this.bonus_received_filter.dateFrom = today;
          this.bonus_received_filter.dateTo = today;
          break;
        case "yesterday":
          temp.setDate(temp.getDate() - 1);
          this.bonus_received_filter.dateFrom = temp;
          this.bonus_received_filter.dateTo = today;
          break;
        case "thisweek":
          temp.setDate(temp.getDate() - temp.getDay() + 1);
          this.bonus_received_filter.dateFrom = temp;
          this.bonus_received_filter.dateTo = today;
          break;
        case "lastweek":
          temp.setDate(temp.getDate() - temp.getDay() + 1 - 7);
          today.setDate(today.getDate() - today.getDay());
          this.bonus_received_filter.dateFrom = temp;
          this.bonus_received_filter.dateTo = today;
          break;
        case "thismonth":
          this.bonus_received_filter.dateFrom = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          );
          this.bonus_received_filter.dateTo = today;
          break;
        case "lastmonth":
          this.bonus_received_filter.dateFrom = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          );
          this.bonus_received_filter.dateTo = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          );
          break;
      }

      this.paginate = 1;
      this.initBonusReceived();
    },

    disabledDatesTo(date) {
      if (this.bonus_received_filter.dateFrom) {
        return this.bonus_received_filter.dateFrom > date;
      }
      return false;
    },

    disabledDatesFrom(date) {
      if (this.bonus_received_filter.dateTo) {
        return this.bonus_received_filter.dateTo < date;
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
    },

    search() {
      // this.getGameBets();
    },
    back() {
      this.$router.back();
    },

    handleOpenActionModal(scope, bonusTemplateid) {
      this.isActionPopup = true;
      this.curBonusRow = scope.row;
      this.curBonusTemplateId = bonusTemplateid;
    },

    getCurBonusTemplateName() {
      if (this.bonus_wait_receive && this.bonus_wait_receive.length > 0) {
        let temp = this.bonus_wait_receive.find(
          (item) => item.id == this.curBonusTemplateId
        );
        if (temp) return temp.name;
        else return "";
      } else return "";
    },

    receiveBonus() {
      if(!this.term_checked){
        this.$notiflix.Notify.failure(
              this.$t("bonus.please_accept_term"),
              {
                showOnlyTheLastOne: true,
              }
            );
        return;
      }
      let params = {
        id: this.curBonusRow.id,
        template_id: this.curBonusTemplateId,
      };
      this.isLoading = true;
      this.$api
        .requestByPost("Bonus/receive", params)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
          } else {
            this.$notiflix.Notify.failure(
              result.msg != "" ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }

          this.isLoading = false;
          this.initBonusWaitReceive();
          this.closeModal();
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    closeModal() {
      this.isActionPopup = false;
    },
    routeToTermNCondition(){
      this.$router.push({ path: "/events/1" });
    }
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/bonus.scss";
@import "/assets/scss/mobile/bonus.scss";
</style>

