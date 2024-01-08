<template>
  <div class="bonusSelector-component">
    <div class="top">
      <h3 class="top-header">{{ $tt("choose_your_bonus") }}</h3>

      <div class="top-bonus-selector">
        <div
          class="selector-box"
          :class="{ 'checkBox-selected': checkNo }"
          @click="checkPicker(0)"
        >
          <div @click="checkPicker(0)">
            <el-checkbox v-model="checkNo"></el-checkbox>
            <span class="checkbox-text">{{ $tt("no_bonus") }}</span>
          </div>
        </div>

        <div
          class="selector-box"
          :class="{ 'checkBox-selected': checkdeposit }"
          @click="checkPicker(1)"
        >
          <div @click="checkPicker(1)">
            <el-checkbox v-model="checkdeposit"></el-checkbox>
            <span class="checkbox-text">{{ $tt("rewards_deposit_1") }}</span>
          </div>
        </div>

        <div class="depositBonus-terms-container" v-if="checkdeposit">
          <h4>{{ $tt("bonus_terms") }}</h4>
          <ul class="bonus-terms">
            <li class="bonus-term">
              {{ $tt("rewards_deposit_2") }}
            </li>
            <li class="bonus-term">
              {{ $tt("bonus_term_1") }}
            </li>
            <li class="bonus-term">
              {{ $tt("bonus_term_2") }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bonusSelector-button" @click="handleNext">
      {{ $tt("continue") }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BonusSelector",
  data() {
    return {
      checkNo: true,
      checkdeposit: false,
      selectedBonusType: 0,
      isLoading: false,
    };
  },

  computed: {
    ...mapState(["depositBonus", "coinType", "isLogin"]),
  },

  mounted() {
    if (this.isLogin) {
      this.init();
    }
  },

  methods: {
    init() {
      // this.selectedBonusType = this.depositBonus;
      this.checkPicker(this.depositBonus);
      this.getChannelActivity();
    },

    getChannelActivity() {
      this.isLoading = true;
      var currencyId = JSON.parse(this.coinType).currencyId;

      this.$api
        .requestByPost("/play/pay/getChannelActiviry", {
          currencyId: currencyId,
        })
        .then((result) => {
          const { code, data, msg } = result;
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

          this.url = this.verifyUrl(msg) == true ? msg : "";
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },

    checkPicker(v) {
      this.selectedBonusType = v;
      if (v == 0) {
        this.checkNo = true;
        this.checkdeposit = false;
        this.checkSelected = true;
      }

      if (v == 1) {
        this.checkNo = false;
        this.checkdeposit = true;
        this.checkSelected = true;
      }
    },

    handleNext() {
      if (this.checkNo != true && this.checkdeposit != true) {
        // console.log("cannot to next step");
      } else {
        this.$store.dispatch("updateDepositBonus", this.selectedBonusType);
        this.$emit("to-next", 2);
      }
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/mobile/bonusSelector.scss";
</style>
