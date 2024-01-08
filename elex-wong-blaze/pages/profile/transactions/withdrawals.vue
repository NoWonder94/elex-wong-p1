<template>
  <div class="withdrawals">
    <AccountHeader title="WITHDRAWALS" />
    <div class="withdrawals-content">
      <div class="content-left web">
        <!-- <div class="left-item" @click="handleUrl('/')">
          <img src="@/assets/img/transactions.svg" />
          {{ $tt("transactions") }}
        </div> -->
        <div class="left-item" @click="handleUrl('/deposits')">
          <img src="@/assets/img/deposits.svg" />
          {{ $tt("deposits") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/withdrawals')">
          <img src="@/assets/img/withdrawals.svg" />
          {{ $tt("withdrawals") }}
        </div>
        <!-- <div class="left-item" @click="handleUrl('/')">
          <i class="el-icon-warning-outline"></i>
          {{ $tt("referralStatistics") }}
        </div> -->
      </div>
      <div class="content-right">
        <div class="title">
          {{ $tt("withdrawals") }}
        </div>
        <div v-loading="isLoading" v-if="isLoading"></div>
        <div class="withdrawals-list" v-else>
          <table v-if="list.length > 0">
            <tr>
              <th>{{ $tt("orderId") }}</th>
              <th>{{ $tt("amount") }}</th>
              <th>{{ $tt("status.title") }}</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.orderId }}</td>
              <td>{{ item.money }}</td>
              <td>{{ getStatus(item.status) }}</td>
            </tr>
          </table>
          <div v-else>
            {{ $tt("no_transactions") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Withdrawals",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.isLoading = true;
      this.$api
        .requestByPost("/hall/v2/playGoldRecord/getUserGoldList", { type: 9 })
        .then((result) => {
          const { code, rows, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.list = rows;
        })
        .catch((error) => {
          this.isLoading = false;

          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    handleUrl(url) {
      window.newRouter("/profile/transactions" + url);
    },
    getStatus(id) {
      if (id == 3) {
        return this.$tt("status.success");
      } else if (id == 4) {
        return this.$tt("status.failed");
      } else if (id == 0) {
        return this.$tt("status.unapproved");
      } else if (id == 1) {
        return this.$tt("status.agree");
      } else if (id == 2) {
        return this.$tt("status.not_agree");
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/withdrawals.scss";
@import "/assets/scss/mobile/withdrawals.scss";
</style>
