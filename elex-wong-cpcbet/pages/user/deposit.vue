<template>
  <div class="deposit">
    <div class="deposit-mobile mobile">
      <div class="back-title">
        <i class="el-icon-back" @click="handleRoute('profile')"></i>
        {{ $t("deposit.title") }}
      </div>
    </div>
    <div class="deposit-section">
      <div class="deposit-section1">
        <div class="title web">
          {{ $t("deposit.title") }}
        </div>
        <div class="currency">
          <div class="currency-title">
            {{ $t("deposit.currency") }}
          </div>
          <el-select v-model="currency" @change="onSelectCurrency">
            <el-option
              v-for="(item, index) in currencyList"
              :key="index"
              :value="item.code"
              :label="item.code"
              >{{ item.code }}</el-option
            >
          </el-select>
        </div>
      </div>

      <div class="deposit-section2">
        <div class="deposit-left">
          <div class="payment">
            <div class="payment-title">
              {{ $t("deposit.paymentMethod") }}
            </div>
            <div class="payment-subtitle">
              {{ $t("deposit.selectPaymentMethod") }}
            </div>
            <el-select
              v-model="paymentMethod"
              :no-data-text="$t('no_data')"
              @change="onSelectPaymentMethod"
              placeholder="Select Payment Method"
            >
              <el-option
                v-for="(item, index) in paymentMethods"
                :key="index"
                :value="index"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
          <div
            v-if="paymentMethod != null && paymentChannels.length > 0"
            class="payment"
          >
            <div class="payment-title">
              {{ $t("deposit.paymentChannel") }}
            </div>
            <el-select
              v-model="paymentChannel"
              :no-data-text="$t('no_data')"
              placeholder="Select Payment Channel"
              popper-class="payment-select"
            >
              <el-option
                v-for="(item, index) in paymentChannels"
                :key="index"
                :value="item.code"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>

          <!-- self deposit  -->
          <div v-if="payBank != null" class="payment">
            <div class="payment-title">
              {{ $t("deposit.depositTo") }}
            </div>
            <div class="self-payment">
              <div class="self-payment-label">
                {{ $t("deposit.bankName") }}
                <span class="self-payment-item">{{ payBank.name }}</span>
              </div>
              <div class="self-payment-label">
                {{ $t("deposit.accountNumber") }}
                <span class="self-payment-item">{{ payBank.account }}</span>
              </div>
              <div class="self-payment-label">
                {{ $t("deposit.accountName") }}
                <span class="self-payment-item">{{ payBank.payee }}</span>
              </div>

              <div
                v-clipboard:copy="payBank.account"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                class="self-payment-copy greenGradientButtonBg"
              >
                {{ $t("deposit.copyAccount") }}
              </div>
            </div>
          </div>
        </div>
        <div class="deposit-right">
          <div v-if="paymentMethod != null" class="amount">
            <div class="amount-title">
              {{ $t("deposit.depositAmount") }}
            </div>
            <div class="amount-input">
              <el-input v-model="paymentAmount"></el-input>
            </div>
            <div v-if="paymentMethod != null" class="amount-selection">
              <div
                class="selection-box"
                v-for="(item, index) in paymentSetting.money_fixed"
                :key="index"
                @click="handleAmount(item)"
              >
                <span class="amount-selected" v-if="paymentAmount == item">
                  <img src="../../assets/img/check.svg" />
                </span>
                <img v-else src="../../assets/img/tick2.png" />
                {{ shortenLargeNumber(item) }}
              </div>
            </div>
            <div
              v-if="paymentMethod != null && isUploadReceipt"
              class="receipt-upload-section"
            >
              <div class="amount-title">
                {{ $t("deposit.uploadReceipt") }}
              </div>
              <div class="receipt-upload-content">
                <input type="file" @change="submitFile" ref="file" hidden />
                <div
                  @click="selectFile"
                  class="receipt-button greenGradientButtonBg"
                >
                  {{ $t("deposit.uploadReceipt") }}
                </div>
                <div class="receipt-upload-preview">
                  <span v-if="imageUpload == null">
                    {{ $t("deposit.noFileChosen") }}</span
                  >
                  <span v-else> {{ imageUpload.name }} </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="paymentMethod != null" class="submit">
            <div class="button greenGradientButtonBg" @click="handleSubmit">
              <div v-if="isLoading"><i class="el-icon-loading"></i></div>
              <div v-else>
                {{ $t("deposit.submit") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="submitSuccessPop" class="deposit-order-pop">
      <!-- <div class="deposit-order-pop-container-wrap"> -->
      <div class="deposit-order-pop-container">
        <div class="deposit-title">{{ $t("deposit.paymentMethod") }}</div>
        <i class="el-icon-close" @click="handleClose"></i>
        <div class="deposit-payment">
          <div class="deposit-payment-label">
            {{ $t("deposit.address") }}
            <div class="deposit-payment-item">
              {{ payReceipt.pay_address }}
            </div>
            <div
              v-clipboard:copy="payReceipt.pay_address"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="address-copy"
            >
              Copy
            </div>
          </div>
          <div class="deposit-payment-label">
            {{ $t("deposit.amount") }}
            <div class="deposit-payment-item">{{ payReceipt.pay_amount }}</div>
            <div
              v-clipboard:copy="payReceipt.pay_amount.toString()"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="address-copy"
            >
              Copy
            </div>
          </div>
          <div class="deposit-payment-label">
            {{ $t("deposit.pay_currency") }}
            <div class="deposit-payment-item currency-item">
              {{ payReceipt.pay_currency }}
            </div>
          </div>
        </div>
        <div class="deposit-payment-confirm green-box" @click="handleClose">
          Confirm
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Deposit",
  // head() {
  //   return {
  //     title: this.$t("deposit.title"),
  //   };
  // },
  data() {
    return {
      paymentMethod: null,
      paymentChannel: null,
      currency: null,
      paymentMethods: [],
      paymentChannels: [],
      paymentSetting: null,
      paymentAmount: 0,
      paymentId: -1,
      payBank: null,
      isUploadReceipt: false,
      imageUpload: null,
      imgUrl: "",
      submitSuccessPop: false,
      payReceipt: {},
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["currencyList"]),
  },
  mounted() {
    this.getPaymentMethod();
    this.initCurrency();
  },
  methods: {
    initCurrency() {
      var selected_currency = localStorage.getItem("selected_currency");
      this.currency = selected_currency;
    },
    shortenLargeNumber(num, digits) {
      var units = ["k", "M", "G", "T", "P", "E", "Z", "Y"],
        decimal;

      for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (num <= -decimal || num >= decimal) {
          return +(num / decimal).toFixed(digits) + units[i];
        }
      }

      return num;
    },
    onSelectCurrency() {
      this.$store.dispatch("updateCurrency", this.currency);
      this.getPaymentMethod();
      window.location.reload();
    },
    onSelectPaymentMethod() {
      this.paymentId = this.paymentMethods[this.paymentMethod].id;
      this.paymentChannels = this.paymentMethods[this.paymentMethod].pay_type;
      this.paymentSetting = this.paymentMethods[this.paymentMethod].setting;
      this.payBank = this.paymentMethods[this.paymentMethod].pay_bank;
      this.isUploadReceipt = this.paymentMethods[this.paymentMethod].is_receipt;
    },
    handleAmount(amount) {
      this.paymentAmount = amount;
    },
    handleSubmit() {
      this.isLoading = true;
      if (this.isUploadReceipt == true && this.imgUrl == "") {
        this.$notiflix.Notify.failure("Please Upload Receipt", {
          showOnlyTheLastOne: true,
        });
        return false;
      }
      let form = {
        payment_id: this.paymentId,
        pay_type: this.paymentChannel,
        money: this.paymentAmount,
        receipt: this.imgUrl,
      };

      this.$api
        .requestByPost("/Deposit/submit", form)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );

            if (result.data != null) {
              if (result.data.pay_currency) {
                this.submitSuccessPop = true;
                this.payReceipt = result.data;
              } else {
                window.open(result.data);
              }
            }
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    reset() {
      this.paymentMethod = null;
      this.paymentChannel = null;
      this.paymentMethods = [];
      this.paymentChannels = [];
      this.paymentSetting = null;
      this.paymentAmount = 0;
      this.paymentId = -1;
    },
    getPaymentMethod() {
      this.reset();
      this.$api
        .requestByPost("/Deposit/payments", null)
        .then((result) => {
          if (result.status == true) {
            this.paymentMethods = result.data;
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }

          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    handleRoute(url) {
      this.$router.push({ path: "/user/" + url });
    },
    onCopy: function (e) {
      // alert(this.$t("message.onCopy") + e.text);
      this.$notiflix.Notify.success(this.$t("message.onCopy") + e.text, {
        showOnlyTheLastOne: true,
      });
    },
    onError: function (e) {
      // alert(this.$t("message.copyFailed"));
      this.$notiflix.Notify.failure(this.$t("message.copyFailed"), {
        showOnlyTheLastOne: true,
      });
    },
    selectFile() {
      this.$refs.file.click();
    },
    async submitFile() {
      this.imageUpload = this.$refs.file.files[0];

      var result = await this.$api.requestByPost("Resource/image", null);
      if (result.status == true) {
        let imageResultUrl = result.data.image_url;
        this.signUrl = result.data.sign_url;
        if (this.signUrl) {
          var buffer = await this.imageUpload.arrayBuffer();
          var image = new Uint8Array(buffer);
          axios
            .put(this.signUrl, this.imageUpload, {
              headers: {
                "Content-Type": this.imageUpload.type,
                Accept: "*/*",
              },
            })
            .then((result) => {
              if (result.status == 200) {
                this.imgUrl = imageResultUrl;
                this.$notiflix.Notify.success("Upload Successful", {
                  showOnlyTheLastOne: true,
                });
              }
            });
        }
      }
    },
    handleClose() {
      this.submitSuccessPop = false;
      this.payReceipt = {};
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/deposit.scss";
@import "/assets/scss/mobile/deposit.scss";
</style>
