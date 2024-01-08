<template>
  <div class="coinWithdraw-component">
    <div class="top">
      <div class="coinWithdraw-title">{{ $t("WALLET.ChooseNetwork") }}</div>
      <div
        v-if="chainLoading"
        v-loading="chainLoading"
        style="margin: 50px 0"
      ></div>

      <div class="coinWithdraw-networkList" v-if="!chainLoading">
        <div
          class="coinWithdraw-networkList-card"
          v-for="(item, index) in chainList"
          :key="index"
          @click="setChain(item)"
          :class="
            selectedChain.token_id == item.token_id ? 'selected-chain' : ''
          "
        >
          <span class="networkList-label">{{ item.network }}</span>
        </div>
      </div>

      <div class="coinWithdraw-form" v-if="chainData != null">
        <div class="coinWithdraw-form-item">
          <div class="form-item-label">
            <div>
              <img :src="getCoin.currencyIcon" alt="" />
              <span
                >{{ getCoin.currencyName }}
                {{ $t("WALLET.wallet_Address") }}</span
              >
            </div>
          </div>
          <div class="form-item-input">
            <div class="item-input">
              <el-input
                v-model="withdrawForm.address"
                :placeholder="$t('WALLET.wallet_Address')"
              ></el-input>
            </div>
            <!-- <div class="item-button" @click="pasteAddress">{{ $t('WALLET.paste') }}</div> -->
          </div>
        </div>

        <div class="coinWithdraw-form-item">
          <div class="form-item-label">
            <div class="wallet-amount">
              {{ $t("WALLET.Amount") }} ({{ $t("WALLET.Min") }}
              {{ chainData.min }} {{ getCoin.currencyName }})
            </div>
            <div class="wallet-price">${{ getCoin.money }}</div>
          </div>
          <div class="form-item-input">
            <div class="item-input">
              <el-input
                v-model="withdrawForm.amount"
                :placeholder="$t('WALLET.Amount')"
              ></el-input>
            </div>
            <div
              class="item-button"
              @click="withdrawForm.amount = getCoin.money"
            >
              {{ $t("WALLET.Max") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="coinWithdraw-button-container">
      <div class="return-button" @click="handlePrevious">
        {{ $tt("go_back") }}
      </div>
      <div
        class="confirm-button"
        :class="!isvalid ? 'submit-inactive' : ''"
        @click="handleSubmit"
        v-if="!isSubmit"
      >
        {{ $tt("confirm") }}
      </div>
      <div class="confirm-button" v-else>
        <i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CoinWithdraw",
  data() {
    return {
      chainList: [],
      selectedChain: null,
      chainLoading: false,
      chainData: null,
      withdrawForm: {
        address: "",
        amount: "",
      },
      isSubmit: false,
    };
  },
  computed: {
    ...mapState(["withdrawMethodItem"]),
    ...mapGetters(["getCoin"]),

    isvalid() {
      return (
        this.withdrawForm.address != "" &&
        this.withdrawForm.amount != "" &&
        this.selectedChain != null
      );
    },
  },
  mounted() {
    this.initCoin();
  },
  methods: {
    initCoin() {
      this.selectedChain = null;
      this.chainLoading = true;
      this.$api
        .requestByPost("/hall/v2/ccpayment/getCoin", {
          channelCode: this.withdrawMethodItem,
          token: this.selectedToken,
          currency: this.getCoin.currencyName,
        })
        .then((res) => {
          const { code, data, msg } = res;

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
            this.chainData = data[0];
            this.selectedToken = data[0].token_id;
            this.getCoinChain();
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
    getCoinChain() {
      this.selectedChain = null;
      this.$api
        .requestByPost("/hall/v2/ccpayment/getCoinChain", {
          channelCode: this.depositMethodItem,
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
            this.selectedChain = data[0];
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
    setChain(item) {
      this.selectedChain = item;
    },
    handleSubmit() {
      this.isSubmit = true;
      if (!this.isvalid) {
        this.isSubmit = false;
        return;
      }

      this.$api
        .requestByPost("/hall/v2/ccpayment/createPayoutOrder", {
          channelCode: this.withdrawMethodItem,
          money: this.withdrawForm.amount,
          address: this.withdrawForm.address,
          tokenId: this.selectedChain.token_id,
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

          this.$emit("success-close");
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
      this.$emit("to-previous", 1);
      this.$store.dispatch("updateWithdrawMethod", 0);
    },
    async pasteAddress() {
      var res = await navigator.clipboard.readText();
      this.withdrawForm.address = res;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mobile/coinWithdraw.scss";
</style>
