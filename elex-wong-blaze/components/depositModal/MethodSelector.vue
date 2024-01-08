<template>
  <div class="methodSelector-component">
    <div class="top">
      <div class="top-method-walletType">
        <!-- wallet dropdown -->
        <el-dropdown
          @command="handleWalletUnit"
          trigger="click"
          v-if="getCoin != null"
        >
          <div class="walletType-list">
            <div class="walletType-icon">
              <div class="currency-icon">
                <img :src="getCoin.currencyIcon" alt="" />
              </div>
              <div class="currency-name">
                {{ getCoin.currencyName }}
              </div>
              <i class="el-icon-arrow-down"></i>
            </div>

            <div class="walletType-amount">
              {{ $tt("WALLET.Balance") }}:
              {{ calcWalletAmount }}
              <!-- {{ selectedCoin.money + selectedCoin.lockMoney }} -->
            </div>
          </div>

          <el-dropdown-menu slot="dropdown" class="walletType-dropdown">
            <el-dropdown-item
              v-for="(item, index) in getUserCoinInfo"
              :key="index"
              :command="item"
              class="account-wallet"
            >
              <div class="unit">
                <div class="currency-icon">
                  <img :src="item.currencyIcon" alt="icon" />
                </div>
                {{ item.currencyName }}
              </div>

              <div class="money-amount">
                {{ parseFloat(item.money) + parseFloat(item.lockMoney) }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <h3 class="top-header">{{ $tt("choose_payment_method") }}</h3>

      <div class="top-method-selector" v-loading="loading">
        <div class="deposit-method-reminder" v-if="failed">
          {{ $tt("not_available_in_country") }}
        </div>

        <div class="deposit-method-list" v-if="paymentMethodLists.length > 0">
          <div
            class="deposit-method-list-item"
            v-for="item in paymentMethodLists"
            :key="item.id"
            @click="handleNext(item)"
          >
            <div class="deposit-label">
              {{ item.name }}
            </div>
            <div class="deposit-icon">
              <img :src="item.icon" alt="bank icon" v-if="item.icon != null" />
            </div>
          </div>
        </div>

        <!-- <div class="return-button" @click="handlePrevious">GO BACK</div> -->
      </div>
    </div>

    <!-- <div class="methodSelector-button" v-if="!failed" @click="handleNext">
      Continue
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "MethodSelector",
  data() {
    return {
      failed: false,
      paymentMethodLists: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getCoin", "getUserCoinInfo"]),
    ...mapState(["isLogin"]),
    calcWalletAmount() {
      var a =
        parseFloat(this.getCoin.money) + parseFloat(this.getCoin.lockMoney);

      if (a == "NaN") {
        return "0.00";
      } else {
        return a;
      }
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.isLogin) {
        this.getPaymentList();
      }
    },
    getPaymentList() {
      this.loading = true;

      this.$api
        .requestByPost("/hall/v2/play/pay/getList", { platformType: 2 })
        .then((res) => {
          const { code, msg, rows } = res;

          if (code == 200) {
            if (rows.length < 0) {
              this.failed = true;
            } else {
              this.paymentMethodLists = rows;
            }
          } else {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            this.failed = true;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
    handlePrevious() {
      this.$emit("to-previous", 1);
    },
    handleNext(item) {
      // if (this.checkNo != true && this.checkdeposit != true) {
      //   console.log("cannot to next step");
      // } else {
      //   this.$store.dispatch("updateDepositBonus", this.selectedBonusType);
      //   this.$emit("to-next", 3);
      // }
      if (`${item.code}` == "86") {
        // open ccpayment
        this.$emit("to-next", 4);
      } else {
        // open normal
        this.$emit("to-next", 3);
      }
      this.$store.dispatch("updateDepositMethod", item);
    },
    handleWalletUnit(e) {
      this.$store.dispatch("updateCoinType", JSON.stringify(e));
      this.getPaymentList();
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/mobile/methodSelector.scss";
</style>
