<template>
  <div class="bonuses-page">
    <div class="mobile-header mobile">
      <i class="el-icon-arrow-left" @click="back"></i>
      <div class="title">{{ $tt("bonuses") }}</div>
    </div>

    <div class="bonuses-content web">
      <div class="content-box">
        <div class="content-header">
          <h1 class="content-header-title">{{ $tt("your_blaze_bonuses") }}</h1>
        </div>
        <div
          style="width: 70%; margin: 0 auto; text-align: center"
          v-if="isLoading"
        >
          <span v-loading="isLoading"></span>
        </div>
        <div v-else class="content-body">
          <div class="content-item">
            <div class="item-icon">
              <img src="~/assets/img/bonuses/handout.svg" alt="svg icon" />
            </div>
            <div class="item-details">
              <div class="details-title">{{ $tt("account_balance") }}</div>

              <div class="details-amount">
                <span class="currency">
                  {{ currency }}
                </span>
                {{ balance_amount }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-icon">
              <img src="~/assets/img/bonuses/payment.svg" alt="svg icon" />
            </div>
            <div class="item-details">
              <div class="details-title">{{ $tt("bonus_money") }}</div>
              <div class="details-amount">
                <span class="currency">{{ currency }}</span>
                {{ bonus_amount }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-icon">
              <img src="~/assets/img/bonuses/money.svg" alt="svg icon" />
            </div>
            <div class="item-details">
              <div class="details-title">{{ $tt("total") }}</div>
              <div class="details-amount">
                <span class="currency">{{ currency }}</span>
                {{ total_amount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bonuses-content mobile">
      <div class="content-header">
        <h1>{{ $tt("your_blaze_bonuses") }}</h1>
      </div>

      <div class="content-body">
        <div class="content-item">
          <div class="item-icon">
            <img src="~/assets/img/bonuses/handout.svg" alt="svg icon" />
          </div>
          <div class="item-details">
            <div class="details-title">{{ $tt("account_balance") }}</div>
            <div class="details-amount">
              <span class="currency">{{ currency }}</span>
              {{ balance_amount }}
            </div>
          </div>
        </div>

        <div class="content-item">
          <div class="item-icon">
            <img src="~/assets/img/bonuses/payment.svg" alt="svg icon" />
          </div>
          <div class="item-details">
            <div class="details-title">{{ $tt("bonus_money") }}</div>
            <div class="details-amount">
              <span class="currency">{{ currency }}</span>
              {{ bonus_amount }}
            </div>
          </div>
        </div>

        <div class="content-item">
          <div class="item-icon">
            <img src="~/assets/img/bonuses/money.svg" alt="svg icon" />
          </div>
          <div class="item-details">
            <div class="details-title">{{ $tt("total") }}</div>
            <div class="details-amount">
              <span class="currency">{{ currency }}</span>
              {{ total_amount }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      style="width: 100%; margin: 0 auto; margin-top: 50px; text-align: center"
      v-if="isBonusLoading"
    >
      <span v-loading="isBonusLoading"></span>
    </div>
    <div class="content-activations" v-else>
      <div
        class="activations-record"
        v-if="activeBonus.length > 0 && totalList != 0"
      >
        <table>
          <tr>
            <th>{{ $tt("bonuses_table.balance") }}</th>
            <th>{{ $tt("bonuses_table.multiple") }}</th>
            <th>{{ $tt("bonuses_table.remain") }}</th>
            <th>{{ $tt("bonuses_table.status") }}</th>
            <th>{{ $tt("bonuses_table.end_date") }}</th>
          </tr>
          <tr v-for="(item, index) in activeBonus" :key="index">
            <td>{{ item.balance }}</td>
            <td>{{ item.waterMultiple }}</td>
            <td>
              {{ item.remainWater }}
            </td>
            <td>{{ getStatusFilter(item.status) }}</td>
            <td>{{ item.endDate | getReadAbleTime }}</td>
          </tr>
        </table>
        <div class="list-pagenation">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalList"
            :current-page="pageNum"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="activations-no-record" v-else>
        {{ $tt("no_bonuses_found") }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Bonuses",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
      isBonusLoading: false,
      currency: "",
      balance_amount: 0,
      bonus_amount: 0,
      total_amount: 0,
      activeBonus: [],
      totalList: 0,
      pageSize: 15,
      pageNum: 1,
    };
  },
  mounted() {
    if (localStorage.getItem("authToken") != null) {
      this.initWallet();
      this.initBonusList();
    }
  },
  computed: {
    ...mapGetters(["getCoin"]),
    ...mapState(["user"]),
  },
  filters: {
    getReadAbleTime(timeStamp) {
      // const milliseconds = timeStamp;
      // const date = new Date(milliseconds);
      // const readableTime = date.toLocaleString();
      return dayjs(parseInt(timeStamp)).format("YYYY/MM/DD HH:mm:ss");
    },
  },
  methods: {
    back() {
      this.$router.back();
    },

    initWallet() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/bonus/userWallet")
        .then((result) => {
          this.isLoading = false;
          const { code, data, msg } = result;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          if (this.getCoin != null) {
            this.currency = this.getCoin.currencyName;
          }

          this.balance_amount = data.account;
          this.bonus_amount = data.bonus;
          this.total_amount = data.total;
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },

    initBonusList() {
      this.isBonusLoading = true;

      this.$api
        .requestByPost("/hall/v2/bonus/getUserWalletList", {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((result) => {
          this.isBonusLoading = false;
          const { code, rows, msg, total } = result;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.activeBonus = rows;
          this.totalList = parseInt(total);
        })
        .catch((error) => {
          this.isBonusLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.initBonusList();
    },

    getStatusFilter(status) {
      switch (status) {
        case "0":
          return this.$t("bonuses_table_status.in_progress");
        case "1":
          return this.$t("bonuses_table_status.done");
        case "2":
          return this.$t("bonuses_table_status.expired");
        case "3":
          return this.$t("bonuses_table_status.pending");
        default:
          break;
      }
    },
  },
  watch: {
    getCoin(newValue, oldValue) {
      if (localStorage.getItem("authToken") != null) {
        this.pageNum = 1;
        this.initWallet();
        this.initBonusList();
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/bonuses.scss";
@import "/assets/scss/mobile/bonuses.scss";
</style>
