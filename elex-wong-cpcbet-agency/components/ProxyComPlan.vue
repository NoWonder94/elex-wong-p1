<template>
  <div class="proxyComPlan">
    <div class="proxyComPlan-plan-list">
      <div class="proxyComPlan-list-card">
        <CommissionPlanCard
          v-for="(item, index) in revenueList"
          :key="item.id"
          :propDataPlanId="item.id"
          :propDataComType="item.type"
          :propDataName="item.name"
          :propDataProducts="item.rule"
          :propDataConditions="item.rule.conditions"
          :propsDataIsShowOperate="true"
          :propsDataIsSelected="item.selected"
          @onSelectPlan="handleSelectPlan"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proxyId: {
      type: [Number, String],
    },
  },
  data() {
    return {
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
      if (this.proxyId == null) {
        return;
      }
      this.$api
        .requestByPost("/Proxy/commissionPlanList", {
          proxy_id: parseInt(this.proxyId),
        })
        .then((result) => {
          if (result.status == true) {
            this.revenueList = result.data;
          }
        });
    },

    handleSelectPlan(id) {
      console.log(id);

      this.$confirm(
        "Confirm select this commission plan, continue ?",
        "Reminder",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$api
            .requestByPost("/Proxy/updateCommissionPlan", {
              proxy_id: parseInt(this.proxyId),
              plan_id: id,
              remark: "",
            })
            .then((result) => {
              if (result.status == true) {
                this.$message({
                  type: "success",
                  message: "Update success",
                });
                this.init();
                // window.location.reload();
              }
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/proxyComPlan.scss";
@import "/assets/scss/mobile/proxyComPlan.scss";
</style>
