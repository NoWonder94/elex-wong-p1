<template>
  <div class="referral">
    <div class="referral-title">
      {{ $tt("referral.referral_title") }}
    </div>
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"
          ><img src="../assets/img/referral/invite.png" />
          {{ $tt("referral.referral_invite") }}
        </span>
        <ReferralInvite v-if="showInvite" />
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"
          ><img src="../assets/img/referral/statistics.png" />
          {{ $tt("referral.referral_statistics") }}
        </span>
        <ReferralStatistics v-if="showStatistics" />
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"
          ><img src="../assets/img/referral/forms.png" />
          {{ $tt("referral.referral_forms") }}
        </span>
        <ReferralForms v-if="showForms" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Referral",
  meta: {
    auth: true,
  },
  data() {
    return {
      active: "first",
      showInvite: true,
      showStatistics: false,
      showForms: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      this.showInvite = false;
      this.showStatistics = false;
      this.showForms = false;

      switch (tab.name) {
        case "first":
          this.showInvite = true;
          break;
        case "second":
          this.showStatistics = true;
          break;
        case "third":
          this.showForms = true;
          break;
        default:
          this.showInvite = true;
          break;
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/referral.scss";
@import "/assets/scss/mobile/referral.scss";
</style>
