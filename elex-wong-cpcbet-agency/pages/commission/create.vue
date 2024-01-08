<template>
  <div class="createCommission-plan">
    <div class="createCommission-plan-return" @click="$router.back()">
      <i class="el-icon-back"></i> {{ $t("return") }}
    </div>
    <div class="createCommission-plan-title">
      {{ $t("commission_create.create_new_commission_plan") }}
    </div>
    <div class="createCommission-plan-content">
      <el-tabs v-model="activeCommisionTab" @tab-click="handleClick" stretch>
        <el-tab-pane
          :label="$t('commission_create.player_count')"
          name="player_count"
        >
          <PlayerCountForm />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('commission_create.revenue_share')"
          name="revenue_share"
        >
          <RevenueShareForm />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('commission_create.net_deposit')"
          name="net_deposit"
        >
          <NetDepositForm />
        </el-tab-pane>
        <el-tab-pane :label="$t('commission_create.turnover')" name="turn_over">
          <TurnOverForm />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitForm: {
        ranges: {
          all: [],
          product: {},
        },
      },
      // tab controller
      activeCommisionTab: "player_count",
    };
  },

  methods: {
    // handleCateClick(cateId) {
    //   if (cateId == 'all') {
    //     this.submitForm.ranges.all = [];
    //   } else {
    //     this.submitForm.ranges.product['cate'+cateId] = [];
    //   }
    // },
    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss" type="text/css">
@import "../../assets/scss/pc/createCommisionPlan.scss";
@import "../../assets/scss/mobile/createCommissionPlan.scss";
</style>
