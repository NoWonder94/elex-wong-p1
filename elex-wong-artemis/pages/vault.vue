<template>
  <div class="container-fluid vault pb-3">
    <div class="col vault-content">
      <div class="card-shadow vault-content-header d-flex justify-content-between">
        <div class="">
          <div class="vault-content-header-title">
            {{ $t("vault.personal_holding") }}
          </div>
          <div class="vault-content-header-value">
            <AnimatedValue title="personal-hold" :number="account != null ? account.balance : ''" />
          </div>
        </div>
        <div class="vault-flexEnd">
          <div class="vault-content-header-title apy-info" @click="isInfoModalShow = true">
            <div>APY</div>
            <div><i class="el-icon-info apy-info-icon"></i></div>
          </div>
          <div class="vault-content-header-value text-green">
            <span class="text-green">
              <AnimatedValue postfix="%" title="personal-apy"
                :number="account != null ? account.year_profit_rate : ''" />
            </span>
          </div>
        </div>
      </div>

      <div class="card-shadow vault-buy-bot mt-3">
        <img class="vault-buy-bot-bg" src="../assets/img/sbanner03-bg-02.png" />
        <!-- 未买火箭 -->
        <div v-if="!isBotBought">
          <div class="vault-buy-bot-content">
            <div class="vault-buy-bot-banner-intro">
              <div class="banner-intro-img rotate-img">
                <img src="../assets/img/rocket_default.png" alt="" />
              </div>
              <div class="banner-intro-content">
                <div class="banner-intro-title fs-4">
                  {{ $t("vault.bot_intro_title") }}
                </div>
                <div class="banner-intro-description mt-3 fs-6">
                  {{ $t("vault.bot_intro_desc1") }}
                </div>
                <div class="banner-intro-description fs-6">
                  {{ $t("vault.bot_intro_desc2") }}
                  <span class="text-green">27%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="m-3 pb-4">
            <div class="vault-buy-bot-button fill-box p-2" @click="openBuyBotModal">
              {{ $t("vault.buy") }}
            </div>
          </div>
        </div>
        <!-- 未买火箭 -->
        <!-- 已买火箭 -->
        <div v-if="isBotBought">
          <div class="vault-buy-bot-content">
            <div class="vault-buy-bot-banner-intro">
              <img v-if="todayIsCheckin" class="banner-intro-img" src="../assets/img/rocket.png" alt="" />
              <img v-else class="banner-intro-img" src="../assets/img/rocket_default.png" alt="" />
              <div class="banner-intro-content">
                <div class="vault-boosting-text">
                  {{
                  todayIsCheckin
                  ? $t("vault.boosting")
                  : $t("vault.boosting_rest")
                  }}
                </div>
                <div class="loader">
                  <div v-if="todayIsCheckin" class="loaderBar"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="vault-buy-bot-status py-2">
            <div class="text-center vault-buy-bot-status-container">
              <div class="bot-status-label">
                {{ $t("vault.bot_modal_title") }}
              </div>
              <div class="bot-status-value fw-bold">
                {{ robotActiveStatus }}
              </div>
            </div>

            <hr class="vertical-break align-items-stretch" />

            <div class="text-center vault-buy-bot-status-container">
              <div class="lottie-bg">
              </div>
              <div class="bot-status-label">
                {{ $t("vault.bot_modal_profit") }}
              </div>
              <div class="bot-status-value text-green">
                <!-- <span class="fw-bold">${{ arbitrageCurrentValue }}</span> -->
                <span class="fw-bold">{{ arbitrageExtra }}</span>
              </div>
            </div>
          </div>
          <div v-if="!todayIsCheckin" class="mx-3 mt-1 pb-4">
            <div :class="['vault-buy-bot-button', 'fill-box', 'p-2']" @click="checkIn">
              {{ $t("vault.checkin") }}
            </div>
          </div>
        </div>
        <!-- 已买火箭 -->
      </div>

      <div class="card-shadow vault-deposit-withdraw mt-3">
        <div class="vault-deposit-withdraw-labelTitle">
          <img class="vault-img" src="../assets/img/ustd_coin.png" alt="" />
          <div class="vault-usdt-header">USDT</div>
        </div>
        <hr />
        <div class="deposit-withdrawal-header">
          <b-tabs content-class="mt-3" fill>
            <b-tab :title="$t('vault.deposit')" active>
              <div class="deposit-card-container">
                <div class="vault-card-container-formInput">
                  <div class="vault-card-container-input-label">
                    {{ $t("vault.deposit_amount") }}
                  </div>
                  <input class="vault-card-container-input" type="text" :placeholder="
                    isLogin
                      ? $t('vault.amount_hint')
                      : $t('vault.amount_request_hint')
                  " v-model="deposit_amount_value" />
                </div>
                <div class="vault-card-container-formInput">
                  <div class="vault-card-container-input-label">
                    {{ $t("vault.avaiable_usdt") }}
                  </div>
                  <div class="vault-card-container-amount-available">
                    <AnimatedValue title="account-wallet-balance" :number="walletAmount" />
                  </div>
                </div>
                <div class="vault-card-container-connect" v-if="!isLogin">
                  {{ $t("vault.connect_request") }}
                </div>
                <div class="fill-box vault-card-container-submit" v-else @click="deposit">
                  {{ $t("vault.deposit") }}
                </div>
              </div>
            </b-tab>
            <b-tab :title="$t('vault.withdraw')">
              <div class="Withdrawal-card-container">
                <div class="vault-card-container-formInput">
                  <div class="vault-card-container-input-label">
                    {{ $t("vault.withdraw_amount") }}
                  </div>
                  <input class="vault-card-container-input" type="text" :placeholder="
                    isLogin
                      ? $t('vault.amount_hint')
                      : $t('vault.amount_request_hint')
                  " v-model="withdraw_amount_value" />
                </div>

                <div class="vault-card-container-formInput">
                  <div class="vault-card-container-input-label">
                    {{ $t("vault.avaiable_usdt") }}
                  </div>
                  <div class="vault-card-container-amount-available">
                    <AnimatedValue title="account-balance" :number="account != null ? account.balance : ''" />
                  </div>
                </div>
                <div class="vault-card-container-connect" v-if="!isLogin">
                  {{ $t("vault.connect_request") }}
                </div>
                <div class="fill-box vault-card-container-submit" v-else @click="withdraw">
                  {{ $t("vault.withdraw") }}
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>

      <div class="card-shadow vault-deposit-withdraw mt-3">
        <div class="deposit-withdrawal-header">
          <b-tabs content-class="mt-3" fill>
            <b-tab :title="$t('vault.my_profit')" active>
              <div class="expected-return-container">
                <div class="total-container-header-navigate">
                  <div class="total-container-header border-box" @click="routeToBalance">
                    <div class="total-container-header-block">
                      <div class="total-container-header-title">
                        {{ $t("vault.total_balance") }}
                        <img src="../assets/img/forward.svg" />
                      </div>
                      <div class="total-container-header-value">
                        {{ account != null ? account.balance : 0 }}
                      </div>
                    </div>
                  </div>
                  <div class="total-container-header border-box" @click="routeToIncome">
                    <div class="total-container-header-block">
                      <div class="total-container-header-title">
                        {{ $t("vault.total_income") }}
                        <img src="../assets/img/forward.svg" />
                      </div>
                      <div class="total-container-header-value">
                        {{ account != null ? account.total_profit : 0 }}
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="line-break" />
                <div class="expected-return-listing">
                  <div class="expected-return-list" v-for="item in my_income_list" :key="item.id">
                    <div class="expected-return-list-title">
                      {{ item.type }}
                    </div>
                    <div class="expected-return-list-value">
                      {{ item.amount }}<span class="price-unit"> USDT</span>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab :title="$t('vault.expected_profit')">
              <div class="expected-return-container">
                <div class="expected-return-header">
                  {{ $t("vault.expected_profit_hint1") }}
                  <b>{{ account != null ? account.balance : 0 }}</b>,
                  {{ $t("vault.expected_profit_hint2") }}
                </div>
                <hr />
                <div class="expected-return-list" v-for="item in return_list" :key="item.id">
                  <div class="expected-return-list-title">
                    {{ item.label }}
                  </div>
                  <div class="expected-return-list-value">
                    {{ item.amount }}<span class="price-unit"> USDT</span>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
        <div class="
            calculator-container
            border-box
            d-flex
            justify-content-center
            align-items-center
            rounded-pill
            gap-2
            py-1
            mt-2
          " @click="routeToCalculator">
          <img class="calculator-icon" src="../assets/img/financial_account.svg" alt="" />
          <span class="calculator-title"> {{ $t("vault.calculator") }} </span>
        </div>
      </div>

      <div class="list-container card card-shadow pb-3 mt-3">
        <div class="list-header blue-background py-2 px-3">
          <div>{{ $t("vault.defiProfit") }}</div>
        </div>
        <div class="">
          <div>
            <img src="../assets/img/pancakeswap.png" class="pancake-img" />
          </div>
          <div class="text-center fw-bold pt-3">
            {{ $t("vault.defiProfitDescribe1")
            }}<span class="text-green">{{
            $t("vault.defiProfitDescribe2")
            }}</span>{{ $t("vault.defiProfitDescribe3") }}
          </div>
        </div>
      </div>
      <div class="list-container card card-shadow pb-3 mt-3">
        <div class="
            list-header
            blue-background
            py-2
            px-3
            d-flex
            align-items-center
          ">
          <img src="../assets/img/coinmarket_logo.png" class="coinmarket-img me-1" />
          <div>{{ $t("vault.coinMarketCapProfit") }}</div>
        </div>
        <div class="">
          <div>
            <img src="../assets/img/coinmarket_content.jpg" class="pancake-img" />
          </div>
        </div>
      </div>
      <div class="card card-shadow pb-3 mt-3">
        <div class="blue-background py-2 px-3">
          <div>{{ $t("vault.normalPeopleDifficult") }}</div>
        </div>
        <div class="px-3 pt-2">
          <div v-for="(item, index) in normalPeopleDifficultJoinReason" :key="index" class="py-2">
            <div class="fw-bold">{{ item.title }}</div>
            <div class="reason-content-text">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <MiddleModal v-show="isInfoModalShow" @close="closeModal" :max-height="'max-height: 90vw;'">
      <div class="vault-apy-info">
        <div class="vault-apy-info-heading">
          {{ $t("vault.history_avg_profit") }}
        </div>
        <div class="vault-apy-info-content">
          <div class="d-flex justify-content-between pt-2">
            <div class="vault-apy-info-content-label">
              {{ $t("vault.day_profit") }}
            </div>
            <div class="vault-apy-info-content-value text-green">
              {{ account != null ? account.daily_profit_rate : 0 }}%
            </div>
          </div>
          <div class="d-flex justify-content-between pt-2">
            <div class="vault-apy-info-content-label">
              {{ $t("vault.week_profit") }}
            </div>
            <div class="vault-apy-info-content-value text-green">
              {{ account != null ? account.week_profit_rate : 0 }}%
            </div>
          </div>
          <div class="d-flex justify-content-between pt-2">
            <div class="vault-apy-info-content-label">
              {{ $t("vault.cagr") }}
            </div>
            <div class="vault-apy-info-content-value">
              {{ account != null ? account.year_profit_rate : 0 }}%
            </div>
          </div>
          <div class="d-flex justify-content-between pt-2">
            <div class="vault-apy-info-content-label">
              {{ $t("vault.term") }}
            </div>
            <div class="text-blue">{{ $t("vault.withdraw_anytime") }}</div>
          </div>
          <div class="d-flex justify-content-between pt-2">
            <div class="vault-apy-info-content-label">
              {{ $t("vault.my_holding") }}
            </div>
            <div class="vault-apy-info-content-value">
              {{ account != null ? account.balance : 0 }}
            </div>
          </div>
        </div>
        <hr />
        <p class="vault-apy-info-terms">
          {{ $t("vault.hint1") }}
        </p>
        <p class="vault-apy-info-terms">
          {{ $t("vault.hint2") }}
        </p>
      </div>
    </MiddleModal>

    <MiddleModal v-show="isBuyBotModalShow" @close="closeBuyBotModal" :max-height="'max-height: 140vw;'">
      <div class="vault-buy-bot-info p-3">
        <div class="vault-buy-bot-info-title">
          {{ $t("vault.bot_modal_title") }}
        </div>

        <div class="vault-buy-bot-img">
          <img src="../assets/img/rocket.png" alt="" />
        </div>

        <div class="
            vault-buy-bot-price-info
            d-flex
            justify-content-evenly
            align-items-stretch
          ">
          <div class="text-center">
            <div class="vault-buy-bot-price-info-label">
              {{ $t("vault.bot_modal_price") }}
            </div>
            <div class="vault-buy-bot-price-info-value fw-bold">
              ${{ robotTotalValue }}
            </div>
          </div>

          <div class="vertical-break my-1"></div>

          <div class="text-center">
            <div class="vault-buy-bot-price-info-label">
              {{ $t("vault.bot_modal_profit") }}
            </div>
            <div class="vault-buy-bot-price-info-value fw-bold text-green">
              {{ arbitrageExtra }}
            </div>
          </div>
        </div>

        <hr class="line-break" />

        <div class="vault-buy-bot-info-intro">
          <div class="d-flex align-items-center px-3 pb-3">
            <div class="buy-bot-info-intro-icon">
              <img src="../assets/img/Refund.svg" />
            </div>
            <div class="d-flex flex-column px-2">
              <div class="fw-bold">
                {{ $t("vault.bot_modal_intro1_title") }}
              </div>
              <div class="grey">
                {{ $t("vault.bot_modal_intro1_desc") }}
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center px-3 pb-3">
            <div class="buy-bot-info-intro-icon">
              <img src="../assets/img/business_solutions.svg" />
            </div>
            <div class="d-flex flex-column px-2">
              <div class="fw-bold">
                {{ $t("vault.bot_modal_intro2_title") }}
              </div>
              <div class="grey">{{ $t("vault.bot_modal_intro2_desc") }}</div>
            </div>
          </div>
          <div class="d-flex align-items-center px-3 pb-3">
            <div class="buy-bot-info-intro-icon">
              <img src="../assets/img/piggy_bank.svg" />
            </div>
            <div class="d-flex flex-column px-2">
              <div class="fw-bold">
                {{ $t("vault.bot_modal_intro3_title") }}
              </div>
              <div class="grey">{{ $t("vault.bot_modal_intro3_desc") }}</div>
            </div>
          </div>
        </div>

        <hr class="line-break" />

        <div class="fill-box p-2 mx-3 mt-3 text-center rounded-pill" @click="buyBot">
          {{ $t("vault.buy") }}
        </div>
      </div>
    </MiddleModal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import MiddleModal from "../components/MiddleModal.vue";
export default {
  name: "Vault",
  data() {
    return {
      referral_id_value: "",
      deposit_amount_value: "",
      withdraw_amount_value: "",
      my_income_list: [],
      return_list: [],
      isInfoModalShow: false,
      /* robot modal content */
      isBuyBotModalShow: false,
      robotTotalValue: 0,
      /* bot bought */
      isBotBought: false,
      robotActiveStatus: this.$t("vault.activated"),
      arbitrageCurrentValue: 0,
      arbitrageExtra: "0%",
      robotAddress: "",
      getWalletInterval: null,
      todayIsCheckin: false,
      normalPeopleDifficultJoinReason: this.$t(
        "vault.normalPeopleDifficultJoinReason"
      ),
    };
  },
  computed: {
    ...mapState(["isLogin", "walletAmount", "config", "account", "language"]),
  },
  mounted() {
    this.initConfig();
  },
  methods: {
    routeToBalance() {
      if (!this.isLogin) {
        // this.$message.error(this.$t("message.connect_request"));
        return;
      }
      this.$router.push({ path: this.localePath("/total-balance") });
    },
    routeToIncome() {
      if (!this.isLogin) {
        // this.$message.error(this.$t("message.connect_request"));
        return;
      }
      this.$router.push({ path: this.localePath("/total-income") });
    },
    routeToCalculator() {
      this.$router.push({
        path: this.localePath("/compound-interest-calculator"),
      });
    },
    initConfig() {
      this.$api
        .requestByPost("system/init", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateInitConfig", result.data);
            if (this.isLogin) {
              this.getWalletBalance();
              this.getAccountInfo();
            }
            this.getWalletInterval = setInterval(() => {
              if (!this.isLogin) {
                return;
              }
              this.getAccountInfo();
              this.getWalletBalance();
            }, 5000);
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    generateReturnList(balance, rate) {
      const dayLists = [
        {
          label: 7 + this.$t("utils.day"),
          day: 7,
        },
        {
          label: 30 + this.$t("utils.day"),
          day: 30,
        },
        {
          label: 3 + this.$t("utils.month"),
          day: 90,
        },
        {
          label: 6 + this.$t("utils.month"),
          day: 180,
        },
        {
          label: 12 + this.$t("utils.month"),
          day: 360,
        },
      ];
      this.return_list = [];
      dayLists.forEach((e) => {
        // 比如7天，就是（(1 + 当日收益率 / 100 ）的 7 次方)  - 1) * 余额
        const anwser = (Math.pow(1 + rate / 100, e.day) - 1) * balance;
        this.return_list.push({
          id: e.day,
          label: e.label,
          amount: anwser.toFixed(4),
        });
      });
    },
    getAccountInfo() {
      this.$api
        .requestByPost("account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateAccount", result.data);
            this.arbitrageExtra =
              result.data.robot_daily_profit_rates.min +
              "~" +
              result.data.robot_daily_profit_rates.max +
              "%";
            this.robotTotalValue = result.data.robot_price;
            this.robotAddress = result.data.robot_address;
            this.isBotBought = result.data.is_robot;
            this.todayIsCheckin = result.data.is_checkin;
            this.generateReturnList(
              result.data.balance,
              result.data.daily_profit_rate
            );
            this.my_income_list = [];
            this.my_income_list.push({
              id: 1,
              type: this.$t("profile.today_profit"),
              amount: result.data.today_profit,
            });
            this.my_income_list.push({
              id: 2,
              type: this.$t("vault.ytd_reward"),
              amount: result.data.yesterday_profit,
            });
            this.my_income_list.push({
              id: 3,
              type: this.$t("vault.lt_week_reward"),
              amount: result.data.last_week_profit,
            });
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    async getWalletBalance() {
      try {
        const contract = new this.$web3.eth.Contract(
          abis.usdt,
          this.config.contract_usdt
        ); // contract_usdt
        const amount = await contract.methods
          .balanceOf(ethereum.selectedAddress)
          .call();
        this.$store.dispatch(
          "updateWalletAmount",
          parseFloat(this.$web3.utils.fromWei(amount, "ether")).toFixed(4)
        );
      } catch (error) {
        // this.$message.error(error);
      }
    },
    async allowance() {
      const contract = new this.$web3.eth.Contract(
        abis.usdt,
        this.config.contract_usdt
      ); // contract_usdt
      const amount = await contract.methods
        .allowance(ethereum.selectedAddress, this.config.contract_deposit)
        .call(); //contract_deposit
      return amount;
    },
    async approve() {
      //999999999999999999999000000000000000000
      const that = this;
      const contract = new this.$web3.eth.Contract(
        abis.usdt,
        this.config.contract_usdt
      ); // contract_usdt
      const amount = this.$web3.utils.toWei("999999999999999999999", "ether");
      contract.methods
        .approve(this.config.contract_deposit, amount)
        .send({ from: ethereum.selectedAddress }) // contracts.deposit
        .then(function (result) {
          that.getWalletBalance();
        });
    },
    async withdraw() {
      if (this.withdraw_amount_value == 0) {
        // this.$message.error(this.$t("message.largerzero"));
        return;
      }
      const that = this;
      this.$api
        .requestByPost("account/withdraw", {
          amount: this.withdraw_amount_value,
        })
        .then((result) => {
          that.withdraw_amount_value = "";
          if (result.status == true) {
            // that.$message.success(that.$t("message.withdraw_success"));
            that.getWalletBalance();
            that.getAccountInfo();
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    async deposit() {
      const allowanceAmount = await this.allowance();

      if (allowanceAmount == 0) {
        // this.$message.error(this.$t('message.permission'));

        this.approve();
        return;
      }

      if (this.deposit_amount_value == 0) {
        // this.$message.error(this.$t("message.largerzero"));
        return;
      }

      const that = this;
      const contract = new this.$web3.eth.Contract(
        abis.deposit,
        this.config.contract_deposit
      ); // contracts.deposit
      const amount = this.$web3.utils.toWei(this.deposit_amount_value, "ether");
      contract.methods
        .deposit(amount)
        .send({ from: ethereum.selectedAddress })
        .then(function (result) {
          that.deposit_amount_value = "";
          if (result.status == true) {
            // that.$message.success(that.$t("message.deposit_success"));
          }
          that.getWalletBalance();
          that.getAccountInfo();
        });
    },
    buyBot() {
      if (!this.isLogin) {
        // this.$message.error(this.$t("message.connect_request"));
        return;
      }
      if (this.isBotBought) {
        // this.$message.error(this.$t("message.purchased"));
        return;
      }
      if (this.config == null) {
        // this.$message.error(this.$t("message.try_again"));
        return;
      }
      if (this.robotAddress == "") {
        // this.$message.error(this.$t("message.try_again"));
        return;
      }
      const contract = new this.$web3.eth.Contract(
        abis.usdt,
        this.config.contract_usdt
      );
      const amount = this.$web3.utils.toWei(
        this.robotTotalValue.toString(),
        "ether"
      );
      const that = this;
      contract.methods
        .transfer(this.robotAddress, amount)
        .send({ from: ethereum.selectedAddress })
        .then(function (result) {
          that.closeBuyBotModal();
          if (result.status == true) {
            // that.$message.success(this.$t("robot.buy_success"));
            that.getAccountInfo();
            that.initConfig();
          } else {
            // that.$message.error(this.$t("robot.buy_failed"));
          }
        });
    },
    checkIn() {
      this.$api
        .requestByPost("account/checkin", null)
        .then((result) => {
          if (result.status == true) {
            this.getAccountInfo();
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    closeModal() {
      this.isInfoModalShow = false;
    },
    openBuyBotModal() {
      if (this.isLogin) {
        this.isBuyBotModalShow = true;
      } else {
        // this.$message.error(this.$t("message.connect_request"));
      }
    },
    closeBuyBotModal() {
      this.isBuyBotModalShow = false;
    },
  },
  beforeDestroy() {
    if (this.getWalletInterval != null) {
      clearInterval(this.getWalletInterval);
    }
  },
  components: { LottieAnimation, MiddleModal },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/vault.scss";
</style>
