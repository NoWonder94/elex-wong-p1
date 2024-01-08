<template>
  <div class="deposit-modal" @click="closeModal">
    <div class="modal-portal" @click.stop>
      <i class="el-icon-close modal-close" @click="closeModal"></i>

      <div class="modal-body">
        <div class="transaction-state">
          <h2 :class="activeStep == 1 ? 'active-transaction-state' : ''">
            {{ $tt("withdrawal_type") }}
          </h2>
          <span></span>
          <h2 :class="activeStep == 2 ? 'active-transaction-state' : ''">
            {{ $tt("withdrawal_detail") }}
          </h2>
        </div>
        <div class="" v-if="activeStep == 1">
          <WithdrawMethodSelector
            @to-previous="changeActiveStep"
            @to-next="changeActiveStep"
          />
        </div>

        <div class="" v-if="activeStep == 2">
          <WithdrawPayment
            @to-previous="changeActiveStep"
            @success-close="closeModal"
          />
        </div>

        <div class="" v-if="activeStep == 3">
          <CoinWithdraw
            @to-previous="changeActiveStep"
            @success-close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WithdrawMethodSelector from "./MethodSelector.vue";
import WithdrawPayment from "./WithdrawPayment.vue";
import CoinWithdraw from "./CoinWithdraw.vue";

export default {
  name: "WithdrawModal",
  components: { WithdrawMethodSelector, WithdrawPayment, CoinWithdraw },
  data() {
    return {
      activeStep: 1,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
      this.activeStep = 1;
      this.$store.dispatch("updateWithdrawMethod", 0);
    },
    changeActiveStep(v) {
      this.activeStep = v;
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/web/depositModal.scss";
@import "@/assets/scss/mobile/depositModal.scss";

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
