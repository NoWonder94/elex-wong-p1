<template>
  <div class="ccpayment-component">
    <div class="paymentinfo-stage" v-if="!isShowQrPage">
      <div class="top">
        <div class="ccpayment-title">{{ $tt("enter_info") }}</div>
        <div v-if="loading" v-loading="loading" style="margin: 50px 0"></div>
        <div class="ccpayment-coinList" v-if="!loading">
          <div
            class="ccpayment-coin-card"
            v-for="(item, index) in coinList"
            :key="index"
            @click="setCoin(item.token_id, item)"
            :class="selectedToken == item.token_id ? 'selected-coin' : ''"
          >
            <div class="coin-icon">
              <img :src="item.logo" alt="" />
            </div>
            <span class="coin-label">{{ item.crypto }}</span>
          </div>
        </div>

        <div class="payment-hints-container" v-if="getMinMaxHints">
          <div class="">
            {{ $t("deposit_minmax_label") }}
            ({{ $t("minimum") }}: {{ getMinMaxHints.minMoney
            }}{{ getCoin.currencyName }}, {{ $t("maximum") }}:
            {{ getMinMaxHints.maxMoney }}{{ getCoin.currencyName }})
          </div>
        </div>

        <div class="ccpayment-input-amount" v-if="selectedTokenItem != null">
          <div class="input-amount-logo">
            <img :src="getCoin.currencyIcon" alt="" />
            <p>{{ getCoin.currencyName }}</p>
          </div>
          <div class="input-amount-value">
            <el-input
              v-model="money"
              :placeholder="$tt('WALLET.Amount')"
              type="number"
              min="0"
              @input="handleInputAmount"
            ></el-input>
          </div>
        </div>
        <span class="error-text" v-if="errorMsg != ''">{{ errorMsg }}</span>

        <div class="ccpayment-title">{{ $tt("WALLET.ChooseNetwork") }}</div>
        <div class="ccpayment-coinList">
          <div
            class="ccpayment-coin-card"
            v-for="(item, index) in chainList"
            :key="index"
            :class="selectedChain == item.token_id ? 'selected-coin' : ''"
            @click="setChain(item.token_id, item)"
          >
            {{ item.network }}
          </div>
        </div>
      </div>

      <div class="depositPayment-button-container">
        <div class="return-button" @click="handlePrevious">
          {{ $tt("go_back") }}
        </div>
        <div
          class="confirm-button"
          :class="!isValid ? 'submit-inactive' : ''"
          @click="handleSubmit"
          v-if="!isSubmit"
        >
          {{ $tt("deposit") }}
        </div>
        <div class="confirm-button" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </div>

    <div class="payment-stage" v-if="isShowQrPage">
      <div class="payment-stage-top">
        <div class="payment-info-row">
          <div class="payment-qr">
            <!-- <vue-qr text="Hello world!" qid="testid"></vue-qr> -->
            <img
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${successAddress}`"
              alt="qrcode"
            />
          </div>
          <div class="payment-address-content">
            <div class="payment-amount">
              {{ $t("Transaction.Amount") }}: {{ successAmount }}
            </div>
            <div class="payment-address">
              {{ successAddress }}
            </div>
            <div
              class="copy-button"
              @click="copyToClipBoard('HDGSa87sdbaGAYUSdhiuas')"
            >
              {{ $t("copy") }}
            </div>
          </div>
        </div>
        <div class="payment-notice">
          {{
            $t("crypto_payment_notice", { coin: selectedChainCrypto.crypto })
          }}
        </div>
      </div>

      <div class="payment-stage-done" @click="handleCloseModal">Done</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CCPayment",
  data() {
    return {
      selectedToken: null,
      selectedTokenItem: null,
      selectedChain: null,
      selectedChainCrypto: null,
      chainList: [],
      coinList: [],
      money: null,
      loading: false,
      chainLoading: false,
      isSubmit: false,
      errorMsg: "",
      isValid: false,
      /* show QR */
      isShowQrPage: false,
      successAddress: "",
      successAmount: "",
    };
  },
  computed: {
    ...mapState(["depositMethodItem"]),
    ...mapGetters(["getCoin"]),
    // isvalid() {
    //   return (
    //     this.money != null && this.money != "" && this.selectedChain != null
    //   );
    // },

    getMinMaxHints() {
      var list = JSON.parse(this.depositMethodItem.currencyParam);
      var map = {};
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        map[element.currencyId] = element;
      }
      return map[this.getCoin.currencyId];
    },
  },
  mounted() {
    this.initAvailableCoinList();
  },
  methods: {
    setCoin(v, item) {
      this.selectedToken = v;
      this.selectedTokenItem = item;
      this.getCoinChain();
    },
    setChain(v, item) {
      this.selectedChain = v;
      this.selectedChainCrypto = item;
    },
    initAvailableCoinList() {
      this.loading = true;
      this.$api
        .requestByPost("/hall/v2/ccpayment/getCoin", {
          channelCode: this.depositMethodItem.code,
        })
        .then((res) => {
          const { code, data, msg } = res;
          this.loading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          if (data != null && data.length > 0) {
            this.coinList = data;
            this.setCoin(data[0].token_id, data[0]);
          }
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
    getCoinChain() {
      this.selectedChain = null;
      this.chainLoading = true;
      this.$api
        .requestByPost("/hall/v2/ccpayment/getCoinChain", {
          channelCode: this.depositMethodItem.code,
          token: this.selectedToken,
        })
        .then((res) => {
          const { code, data, msg } = res;
          this.chainLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          if (data != null && data.length > 0) {
            this.chainList = data;
            this.setChain(data[0].token_id, data[0]);
          }
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.chainLoading = false;
        });
    },
    handleSubmit() {
      this.isSubmit = true;
      if (!this.isValid) {
        this.isSubmit = false;
        return;
      }
      this.$api
        .requestByPost("/hall/v2/ccpayment/createOrder", {
          channelCode: this.depositMethodItem.code,
          tokenId: this.selectedChain,
          money: this.money,
          currName: this.selectedChainCrypto.crypto,
        })
        .then((res) => {
          const { code, data, msg } = res;
          this.isSubmit = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.$notify({
            title: "Success",
            message: msg,
            type: "success",
            duration: 2000,
          });
          this.openUrl(data);
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.isSubmit = false;
        });
    },
    handlePrevious() {
      this.$emit("to-previous", 2);
      this.$store.dispatch("updateDepositMethod", null);
    },

    handleInputAmount() {
      let valid = true;
      if (this.money == null && this.money == "") {
        valid = false;
        return;
      }

      if (this.selectedChain == null) {
        valid = false;
        return;
      }

      if (this.getMinMaxHints == null) {
        valid = false;
        return;
      }
      if (this.money < this.getMinMaxHints.minMoney) {
        this.errorMsg = this.$t("deposit_amount_min");
        valid = false;
      } else if (this.money > this.getMinMaxHints.maxMoney) {
        this.errorMsg = this.$t("deposit_amount_max");
        valid = false;
      } else {
        this.errorMsg = "";
      }

      this.isValid = valid;
    },

    openUrl(url) {
      // this.$emit("success-close");
      this.successAddress = url.address;
      this.successAmount = url.amount;
      this.isShowQrPage = true;
    },

    copyToClipBoard(textToCopy) {
      this.$AdjustEvent.copyProxyQRCode();
      navigator.clipboard.writeText(textToCopy);
      this.$notify({
        title: "Successful",
        message: "Copied to clipboard.",
        type: "success",
        duration: 2000,
      });
    },

    handleCloseModal() {
      this.$emit("success-close");
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/mobile/ccpayment.scss";
</style>
