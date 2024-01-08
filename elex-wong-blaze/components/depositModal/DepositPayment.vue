<template>
  <div class="depositPayment-component">
    <div class="top">
      <h3 class="form-title">{{ $tt("enter_info") }}</h3>
      <div class="form">
        <!-- <div class="form-input">
          <select v-model="form.bankCode">
            <option
              v-for="item in bankList"
              :key="item.bankCode"
              :value="item.bankCode"
            >
              {{ item.bankName }}
            </option>
          </select>
          <label :class="form.bankCode != '' ? 'select-active' : ''">{{
            $tt("bank_name")
          }}</label>
        </div> -->

        <div class="payment-hints-container" v-if="getMinMaxHints">
          <div class="">
            {{ $t("deposit_minmax_label") }} <br />
            ({{ $t("minimum") }}: {{ getMinMaxHints.minMoney
            }}{{ getCoin.currencyName }}, {{ $t("maximum") }}:
            {{ getMinMaxHints.maxMoney }}{{ getCoin.currencyName }})
          </div>
        </div>

        <div class="input-item">
          <div class="form-input">
            <input
              type="number"
              v-model="form.money"
              placeholder=""
              @input="handleInputAmount"
              ref="amountInput"
            />
            <label>{{ $tt("amount") }}</label>
          </div>
          <span class="error-text" v-if="errorMsg != ''">{{ errorMsg }}</span>
        </div>

        <div class="amount-buttons-row">
          <div class="amount-button" @click="handleSelectQuickAmount(120)">
            {{ $tt("120") }} {{ getCoin.currencyName }}
          </div>
          <div class="amount-button" @click="handleSelectQuickAmount(240)">
            {{ $tt("240") }} {{ getCoin.currencyName }}
          </div>
          <div class="amount-button" @click="handleSelectQuickAmount(600)">
            {{ $tt("600") }} {{ getCoin.currencyName }}
          </div>
        </div>
      </div>
    </div>
    <div class="depositPayment-button-container">
      <div class="return-button" @click="handlePrevious">
        {{ $tt("go_back") }}
      </div>
      <div
        class="confirm-button"
        :class="[isValid ? '' : 'inactive']"
        @click="handleSubmit"
        v-if="!loading"
      >
        {{ $tt("deposit") }}
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
  data() {
    return {
      form: {
        money: "",
        ifJoin: 0,
        channelCode: 0,
        bankCode: "",
        payType: "",
      },
      loading: false,
      isLoadingBank: false,
      bankList: [],
      errorMsg: "",
      isValid: false,
    };
  },

  mounted() {
    this.getBankCode();
  },

  computed: {
    ...mapState(["depositMethodItem"]),
    ...mapGetters(["getCoin"]),

    getMinMaxHints() {
      if (this.getCoin == null || this.depositMethodItem == null) {
        return null;
      }
      var list = JSON.parse(this.depositMethodItem.currencyParam);
      var map = {};
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        map[element.currencyId] = element;
      }
      return map[this.getCoin.currencyId];
    },
  },

  methods: {
    handlePrevious() {
      this.$emit("to-previous", 2);
      this.$store.dispatch("updateDepositMethod", null);
    },

    getBankCode() {
      this.isLoadingBank = true;

      this.$api
        .requestByPost("/hall/v2/play/pay/getBankCodeList")
        .then((result) => {
          const { code, rows, msg } = result;
          this.isLoadingBank = false;
          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.bankList = rows;
          if (rows.length > 0) {
            this.form.bankCode = rows[0].bankCode;
          }
          this.isLoadingBank = false;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });

          this.isLoadingBank = false;
        });
    },

    handleSubmit() {
      if (this.loading || !this.isValid) {
        return false;
      }

      this.loading = true;

      var data = {
        money: this.form.money,
        ifJoin: 0,
        channelCode: this.depositMethodItem.code,
        bankCode: this.form.bankCode,
        payType: "",
        adid: this.$AdjustEvent.getAdsID(),
      };

      this.$api
        .requestByPost("/hall/v2/play/pay/pay", data)
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

          this.$notify({
            title: "Success",
            message: msg,
            type: "success",
            duration: 2000,
          });
          this.$emit("success-close");
          this.openUrl(data);

          this.form = {
            money: "",
            ifJoin: 0,
            channelCode: 0,
            bankCode: "",
            payType: "",
          };
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

    openUrl(url) {
      // const newWindow = window.open(url, "Payment", "height=500,width=800");
      // var timer = setInterval(checkChild, 500);
      // const that = this;
      // function checkChild() {
      //   if (newWindow.closed) {
      //     that.$emit("success-close");
      //     clearInterval(timer);
      //   }
      // }

      // window.open(url, "Blaze", "_blank");
      // window.open(url, "_blank").focus();
      window.location.href = url;
    },

    handleInputAmount() {
      let valid = true;
      if (this.getMinMaxHints == null) {
        valid = false;
        return;
      }
      if (this.form.money < this.getMinMaxHints.minMoney) {
        this.errorMsg = this.$t("deposit_amount_min");
        valid = false;
      } else if (this.form.money > this.getMinMaxHints.maxMoney) {
        this.errorMsg = this.$t("deposit_amount_max");
        valid = false;
      } else {
        this.errorMsg = "";
      }

      this.isValid = valid;
    },

    handleSelectQuickAmount(v) {
      this.$refs.amountInput.focus();
      this.form.money = v;
      this.handleInputAmount();
    },
  },
};
</script>

<style lang="scss" type="type/css">
@import "@/assets/scss/mobile/depositPayment.scss";
</style>
