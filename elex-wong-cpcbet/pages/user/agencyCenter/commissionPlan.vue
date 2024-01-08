<template>
  <div class="commission-plan">
    <div class="commission-plan-back back-title">
      <span @click="back">
        <i class="el-icon-back back-icon"> </i>
        {{ $t("commissionPlan.title") }}
      </span>
    </div>

    <div class="commission-plan-table-part">
      <div
        class="commission-plan-table"
        v-for="platform in commissionPlanPlatforms"
        :key="platform.name"
      >
        <div class="commission-plan-table-title">
          <ContentTitle :text="platform.name" />
        </div>

        <div class="commission-plan-table-content web">
          <el-table :data="platform.schemes" style="width: 100%">
            <el-table-column
              prop="name"
              :label="$t('commissionPlan.name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="max_money"
              :label="$t('commissionPlan.maxMoney')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="min_amount"
              :label="$t('commissionPlan.minAmount')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="rebate_ratio"
              :label="$t('commissionPlan.rebateRatio')"
              width="150"
            >
            </el-table-column>

            <template slot="empty">
              <div
                class="commission-plan-table-nodata"
                v-if="commissionPlanPlatforms.length == 0"
              >
                <img src="../../../assets/img/no_data.png" />
                <div>{{ $t("no_data") }}</div>
              </div>
            </template>
          </el-table>
        </div>
        <div class="commission-plan-table-content mobile">
          <el-table :data="platform.schemes" style="width: 100%">
            <el-table-column prop="name" :label="$t('commissionPlan.name')">
            </el-table-column>
            <el-table-column
              prop="max_money"
              :label="$t('commissionPlan.maxMoney')"
            >
            </el-table-column>
            <el-table-column
              prop="min_amount"
              :label="$t('commissionPlan.minAmount')"
            >
            </el-table-column>
            <el-table-column
              prop="rebate_ratio"
              :label="$t('commissionPlan.rebateRatio')"
            >
            </el-table-column>

            <template slot="empty">
              <div
                class="commission-plan-table-nodata"
                v-if="commissionPlanPlatforms.length == 0"
              >
                <img src="../../../assets/img/no_data.png" />
                <div>{{ $t("no_data") }}</div>
              </div>
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../../components/ContentTitle.vue";

export default {
  name: "CommissionPlan",
  components: { ContentTitle },
  head() {
    return {
      title: this.$t("commissionPlan.title"),
    };
  },
  data() {
    return {
      commissionPlanPlatforms: [],
    };
  },

  mounted() {
    this.getProxyLevel();
  },

  methods: {
    back() {
      this.$router.back();
    },

    getProxyLevel() {
      this.$api
        .requestByPost("/Proxy/level", null)
        .then((result) => {
          if (result.status == true) {
            this.commissionPlanPlatforms = result.data.scheme.platforms;

            // result.data.scheme.platforms.forEach(element => {
            // let schemes = [];
            //   element.schemes.forEach(e => {
            //     schemes.push(e);
            //     schemes.push(e);
            //   });
            // this.commissionPlanPlatforms.push({
            //   name: element.name,
            //   schemes: schemes,
            // })
            // });
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
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/commissionPlan.scss";
@import "/assets/scss/mobile/commissionPlan.scss";
</style>
