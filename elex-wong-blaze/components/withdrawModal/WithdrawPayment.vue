<template>
  <div class="depositPayment-component">
    <div class="top">
      <div v-loading="isLoading"></div>
      <div class="form" v-if="!isLoading">
        <div class="form-title">
          {{ $tt("enter_detail") }}
        </div>
        <div class="form-input">
          <input type="text" v-model="form.money" placeholder=" " />
          <label>{{ $tt("amount") }}</label>
        </div>
        <div class="form-input">
          <select v-model="form.bank">
            <option
              v-for="item in bankList"
              :key="item.bankCode"
              :value="{ code: item.bankCode, name: item.bankName }"
            >
              {{ item.bankName }}
            </option>
          </select>
          <i class="el-icon-arrow-down"></i>
          <label :class="form.bank.code != '' ? 'select-active' : ''">{{
            $tt("acc_type")
          }}</label>
        </div>
        <div class="form-input">
          <input type="text" v-model="form.bankAccountName" placeholder=" " />
          <label>{{ $tt("acc_name") }}</label>
        </div>
        <div class="form-input">
          <input type="text" v-model="form.bankNumber" placeholder=" " />
          <label>{{ form.bank.code }}</label>
        </div>
        <!-- <div class="form-input">
          <input type="text" v-model="form.bankIFSC" placeholder=" " />
          <label>{{ $tt("bank_ifsc") }}</label>
        </div> -->
        <!-- <div class="form-input">
          <input type="text" v-model="form.email" placeholder=" " />
          <label>{{ $tt("email") }}</label>
        </div> -->
        <!-- <div class="form-input">
          <input type="text" v-model="form.phone" placeholder=" " />
          <label>{{ $tt("phone") }}</label>
        </div> -->
        <!-- <div class="form-radio">
          <div class="radio-label">{{ $tt("code_deduction") }}</div>
          <el-radio v-model="form.ifWithHold" :label="2">{{
            $tt("yes")
          }}</el-radio>
          <el-radio v-model="form.ifWithHold" :label="1">{{
            $tt("no")
          }}</el-radio>
        </div> -->
      </div>
    </div>
    <div class="depositPayment-button-container">
      <div class="return-button" @click="handlePrevious">
        {{ $tt("go_back") }}
      </div>
      <div class="confirm-button" @click="checkForm" v-if="!isBtnLoading">
        {{ $tt("confirm") }}
      </div>
      <div class="confirm-button" v-else>
        <i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WithdrawPayment",
  data() {
    return {
      isLoading: false,
      isBtnLoading: false,
      form: {
        money: "",
        bank: {
          code: "",
          name: "",
        },
        bankAccountName: "",
        bankNumber: "",
        bankIFSC: "",
        ifWithHold: 1,
        phone: "",
        email: "",
      },
      bankList: [],
    };
  },
  mounted() {
    this.getBankCode();
  },
  computed: {
    ...mapState(["withdrawMethodItem"]),
  },
  methods: {
    getBankCode() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/play/pay/getBankCodeList")
        .then((result) => {
          const { code, rows, msg } = result;
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

          this.bankList = rows;
          if (rows.length > 0) {
            this.form.bank = {
              code: rows[0].bankCode,
              name: rows[0].bankName,
            };
          }
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
    warning(message) {
      this.$notify({
        title: "Warning",
        message: message,
        type: "warning",
        duration: 2000,
      });
    },
    checkForm() {
      if (!this.form.money) {
        this.warning(this.$tt("validator.withdraw.amount"));
      } else if (isNaN(this.form.money)) {
        this.warning(this.$tt("validator.withdraw.amount_format"));
      } else if (!this.form.bank.code) {
        this.warning(this.$tt("validator.withdraw.bank"));
      } else if (!this.form.bankAccountName) {
        this.warning(this.$tt("validator.withdraw.bank_name"));
      } else if (!this.form.bankNumber) {
        this.warning(this.$tt("validator.withdraw.bank_number"));
      } else {
        this.submit();
      }
    },
    submit() {
      this.isBtnLoading = true;

      var data = {
        money: this.form.money,
        bankCode: this.form.bank.code,
        bankName: this.form.bank.name,
        bankAccountName: this.form.bankAccountName,
        bankNumber: this.form.bankNumber,
        bankIfsc: this.form.bankIFSC,
        ifWithHold: this.form.ifWithHold,
        channelCode: this.withdrawMethodItem,
        phone: this.form.phone,
        email: this.form.email,
      };

      this.$api
        .requestByPost("/hall/v2/play/pay/cashAuth", data)
        .then((result) => {
          const { code, data, msg } = result;
          this.isBtnLoading = false;
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
        });
    },
    handlePrevious() {
      this.$emit("to-previous", 1);
      this.$store.dispatch("updateWithdrawMethod", 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mobile/depositPayment.scss";
</style>
