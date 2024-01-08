<template>
  <div class="calculator py-3 px-4">
    <div class="pb-3 d-flex align-items-center fw-bold">
      <img src="../assets/img/financial_account.svg" class="title-icon" />
      {{$t("calculator.title")}}
    </div>
    <div class="d-flex border rounded card-shadow px-2 py-3 mb-3">
      <img src="../assets/img/idea.svg" class="idea-icon me-2" />
      <div class="interest-description pe-3">
        {{$t("calculator.hint")}}
      </div>
    </div>
    <form class="rounded card-shadow p-3">
      <div class="d-flex justify-content-between align-items-center py-2">
        <div class="">{{$t("calculator.amount")}}</div>
        <div class="input-box rounded">
          <input
            type="number"
            class="form-control text-center border-0"
            v-model="deposit_amount"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center py-2">
        <div class="">{{$t("calculator.method")}}</div>
        <div class="input-box rounded">
          <select
            class="form-select ms-auto border-0"
            aria-label="Default select example"
            aria-placeholder="Language"
            v-model="method_value"
            @change="changeMethod"
          >
            <option
              v-for="method in method_option"
              :key="method.id"
              :value="method.id"
            >
              {{ method.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center py-2">
        <div class="">{{$t("calculator.rate")}}</div>
        <div class="input-box rounded text-center py-1 green">
          {{ return_rate }}%
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center py-2">
        <div class="">{{$t("calculator.profit_term")}}({{method_value == 1 ? $t("calculator.day") : $t("calculator.week") }})</div>
        <div class="input-box rounded">
          <input
            @change="calculate"
            type="number"
            class="form-control text-center border-0"
            v-model="range_value"
          />
        </div>
      </div>
      <div>
        <input
          type="range"
          v-model="range_value"
          min="1"
          :max="method_value == 1 ? 365 : 50"
          class="progress"
          @change="calculate"
        />
      </div>
      <div class="text-center my-2 hint-text">
        {{$t('calculator.hint2')}}
      </div>

      <div class="d-flex pt-2">
        <div @click="reset" class="btn reset-btn rounded-pill col">{{$t('calculator.reset')}}</div>
        <div class="px-2"></div>
        <div @click="calculate" class="btn cal-btn rounded-pill col">{{$t('calculator.calculate')}}</div>
      </div>
    </form>
    <div class="card-shadow rounded p-3 my-2 text-center">
      <div class="principal-text">{{$t('calculator.profit_interest_total')}}</div>
      <div class="value-text fw-bold">${{ principal_interest }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
export default {
  name: "CompoundInterestCalculator",
  data() {
    return {
      deposit_amount: 100,
      method_option: [
        { id: 1, text: this.$t("calculator.with_day") },
        { id: 2,  text: this.$t("calculator.with_week") },
      ],
      method_value: 1,
      return_rate: 0,
      interest_cycle: 1,
      range_value: 1,
      principal_interest: 0,
    };
  },
  computed: {
    ...mapState([
      "isLogin",
      "connectedAddress",
      "walletAmount",
      "config",
      "account",
      "language",
    ]),
  },
  mounted () {
    this.init();
  },
  methods: {
  reset() {
    this.deposit_amount= 100;
    this.method_value= 1;
    this.return_rate= 0;
    this.interest_cycle= 1;
    this.range_value= 1;
    this.principal_interest= 0;
    this.init();
  },
  changeMethod() {
    this.range_value= 1;
    this.calculate();
  },
  init() {
    if (this.config != null) {
      this.return_rate = this.config.yesterday_profit_rate;
      this.calculate();
    }
    // this.$api
    //     .requestByPost("account/get", null)
    //     .then((result) => {
    //       if (result.status == true) {
    //         this.$store.dispatch("updateAccount", result.data);
    //         this.return_rate = result.data.daily_profit_rate;
    //         this.calculate();
    //       }
    //     })
    //     .catch((error) => {
    //       // this.$message.error(error);
    //     });
  },
  calculate() {
    let term = 0;
    if (this.method_value == 1) {
      term = this.range_value;
    } else {
      term =  this.range_value * 7;
    }
    const anwser = (Math.pow(1 + this.return_rate / 100, term) - 1) * this.deposit_amount;
    this.principal_interest = anwser;
  }
 },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/compound_interest_calculator.scss";
</style>
