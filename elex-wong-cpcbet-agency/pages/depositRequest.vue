<template>
  <div class="deposit-request">
    <div class="deposit-request-header">
      <div class="header-item" @click="routeBack">
        <img src="../assets/img/back.svg" />
        {{ $t("deposit_history.title") }}
      </div>
    </div>

    <div class="deposit-request-body">
      <div class="deposit-request-table">
        <el-table :data="depositList" border style="width: 100%">
          <el-table-column
            prop="sn"
            :label="$t('deposit_history.id')"
            width="250"
          >
          </el-table-column>
          <el-table-column prop="money" :label="$t('amount')" width="150">
          </el-table-column>
          <!-- <el-table-column prop="bank_info" :label="$t('account')" width="150">
        </el-table-column> -->
          <el-table-column
            prop="status_str"
            :label="$t('deposit_history.status')"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            :formatter="convertDate"
            :label="$t('deposit_history.create_time')"
          >
          </el-table-column>
        </el-table>
      </div>
      <div
        class="deposit-request-table-pagination"
        v-if="depositList.length > 0"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="50"
          :total="depositCount"
          :current-page="currentPage"
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
      depositList: [],
      depositCount: 0,
      currentPage: 1,
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
      this.$api
        .requestByPost("/Deposit/lists", {
          page: this.currentPage,
        })
        .then((result) => {
          if (result.status == true) {
            this.depositList = result.data.list;
            this.depositCount = result.data.count;
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
      this.currentPage = v;
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
  },
};
</script>

<style lang="scss" type="text/css">
@import "../assets/scss/pc/depositRequest.scss";
@import "../assets/scss/mobile/depositRequest.scss";
</style>
