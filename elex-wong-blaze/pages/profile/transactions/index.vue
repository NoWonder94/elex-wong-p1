<template>
  <div class="transactions">
    <AccountHeader title="TRANSACTIONS" />
    <div class="transactions-content">
      <div class="content-left web">
        <!-- <div class="left-item selected" @click="handleUrl('/')">
          <img src="@/assets/img/transactions.svg" />
          {{ $tt("transactions") }}
        </div> -->
        <div class="left-item" @click="handleUrl('/deposits')">
          <img src="@/assets/img/deposits.svg" />
          {{ $tt("deposits") }}
        </div>
        <div class="left-item" @click="handleUrl('/withdrawals')">
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
          {{ $tt("transactions") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transactions",
  meta: {
    auth: true,
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/profile/transactions" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/transactions.scss";
@import "/assets/scss/mobile/transactions.scss";
</style>
