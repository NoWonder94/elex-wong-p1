<template>
  <div class="commissionPlan">
    <div class="commissionPlan-create-button" @click="routeToCreate">
      <i class="el-icon-plus"></i> {{ $t("commission.create") }}
    </div>
    <div class="commissionPlan-plan-title">{{ $t("commission.revenue") }}</div>

    <div class="commissionPlan-plan-filter">
      <div class="commissionPlan-plan-form">
        <!-- <div class="commissionPlan-plan-filter-label">Search:</div> -->
        <el-input
          class="commissionPlan-plan-filter-input"
          v-model="filterPlan"
          :placeholder="$t('commission.revenue_plan_name')"
          clearable
        ></el-input>
      </div>
      <div class="commissionPlan-plan-form">
        <!-- <div class="commissionPlan-plan-filter-label">Type:</div> -->
        <el-select
          class="commissionPlan-plan-filter-select"
          v-model="filterCommissionType"
          clearable
          :placeholder="$t('type')"
        >
          <el-option
            v-for="item in filterOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="commissionPlan-plan-form">
        <div class="commissionPlan-plan-form-submit fill-box" @click="init">
          {{ $t("search") }}
        </div>
        <div
          class="commissionPlan-plan-form-submit border-box"
          @click="resetFilter"
        >
          {{ $t("reset") }}
        </div>
      </div>
    </div>

    <div class="commissionPlan-plan-list">
      <div class="commissionPlan-list-card">
        <CommissionPlanCard
          v-for="(item, index) in revenueList"
          :key="item.id"
          :propDataComType="item.type"
          :propDataName="item.name"
          :propDataProducts="item.rule"
          :propDataConditions="item.rule.conditions"
        />
      </div>

      <!-- <Loading :isLoading="isLoading" :isFullScreen="false" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      // filter
      filterPlan: "",
      filterOption: [
        {
          value: 0,
          label: "Player Count",
        },
        { value: 1, label: "Revenue Share" },
        {
          value: 2,
          label: "Net Deposit",
        },
        {
          value: 3,
          label: "Turnover",
        },
      ],
      filterCommissionType: "",
      // data
      revenueList: [],
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.isLoading = true;
      this.$api
        .requestByPost("/CommissionPlan/lists", {
          name: this.filterPlan,
          type: this.filterCommissionType,
        })
        .then((result) => {
          if (result.status == true) {
            this.revenueList = result.data;
          }
        });
      this.isLoading = false;
    },

    resetFilter() {
      this.filterPlan = "";
      this.filterCommissionType = "";
      this.init();
    },

    routeToCreate() {
      this.$router.push({ path: "/commission/create" });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "../../assets/scss/pc/commissionPlan.scss";
@import "../../assets/scss/mobile/commissionPlan.scss";
</style>
