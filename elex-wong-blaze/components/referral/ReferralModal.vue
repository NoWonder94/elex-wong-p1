<template>
  <div class="referral-modal" @click="closeModal">
    <div class="modal-portal" @click.stop>
      <i class="el-icon-close modal-close" @click="closeModal"></i>
      <div class="modal-body">
        <div class="title">
          {{ $tt("referral.invite_achievement_bonus") }}
        </div>
        <div class="desc">
          {{ $tt("referral.modal_desc") }}
        </div>
        <div class="table">
          <div class="table-row">
            <div class="table-item">
              {{ $tt("referral.cumulative_deposit_users") }}
            </div>
            <div class="table-item">{{ $tt("referral.bonus") }}</div>
          </div>
          <div class="table-row" v-for="(item, index) in list" :key="index">
            <div class="table-item">{{ item.accumulatedNums }}</div>
            <div class="table-item">{{ item.money }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReferralModal",
  props: ["list"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/web/referralModal.scss";
@import "@/assets/scss/mobile/referralModal.scss";

// add animation of zoom fade in
@keyframes zoomFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
