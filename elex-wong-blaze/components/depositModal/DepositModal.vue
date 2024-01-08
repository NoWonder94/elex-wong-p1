<template>
  <div class="deposit-modal" @click="closeModal">
    <div class="modal-portal" @click.stop>
      <i class="el-icon-close modal-close" @click="closeModal"></i>

      <div class="modal-body">
        <div class="transaction-state">
          <!--
          <h2 :class="activeStep == 1 ? 'active-transaction-state' : ''">
            Select Bonus
          </h2>
          <span></span>
           -->
          <h2 :class="activeStep == 2 ? 'active-transaction-state' : ''">
            {{ $tt("payment_type") }}
          </h2>
          <span></span>
          <h2 :class="activeStep == 3 ? 'active-transaction-state' : ''">
            {{ $tt("payment_detail") }}
          </h2>
        </div>
        <!--
        <div class="" v-if="activeStep == 1">
          <BonusSelector @to-next="changeActiveStep" />
        </div>
        -->
        <div class="" v-if="activeStep == 2">
          <MethodSelector
            @to-previous="changeActiveStep"
            @to-next="changeActiveStep"
          />
        </div>

        <div class="" v-if="activeStep == 3">
          <DepositPayment
            @to-previous="changeActiveStep"
            @success-close="closeModal"
          />
        </div>
        <div class="" v-if="activeStep == 4">
          <CCPayment
            @to-previous="changeActiveStep"
            @success-close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusSelector from "./BonusSelector.vue";
import DepositPayment from "./DepositPayment.vue";
import MethodSelector from "./MethodSelector.vue";
import CCPayment from "./CCPayment.vue";

export default {
  name: "DepositModal",
  components: { BonusSelector, MethodSelector, DepositPayment, CCPayment },

  data() {
    return {
      activeStep: 2,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
      this.activeStep = 2;
      this.$store.dispatch("updateDepositBonus", 0);
      this.$store.dispatch("updateDepositMethod", null);
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
