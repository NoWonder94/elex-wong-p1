<template>
  <div class="wallet">
    <div class="wallet-row">
      <div class="wallet-withdrawal-row">
        <div class="wallet-title">{{ $t("wallet.main_wallets") }}</div>
      </div>
      <div class="wallet-section">
        <div class="wallet-item">
          <div class="wallet-item-title">{{ $t("wallet.lock_balance") }}</div>
          <div class="wallet-item-amount numberFont">
            {{ currency }} {{ lock_balance }}
          </div>
        </div>
        <div class="wallet-item">
          <div class="wallet-item-title">{{ $t("balance") }}</div>
          <div class="wallet-item-amount numberFont">
            {{ currency }} {{ balance }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="wallet-row"
      v-if="isAbleToTransferAgent || isAbleToTransferPlayer"
    >
      <div class="wallet-title">{{ $t("wallet.transfer_money") }}</div>
      <div class="transfer-section">
        <div
          class="transfer-item"
          v-if="isAbleToTransferAgent"
          @click="routeTo('agent')"
        >
          <div class="transfer-div">
            <div class="transfer-img">
              <img src="../assets/img/agent.svg" />
            </div>
            <div class="transfer-text">
              <div class="transfer-item-title">
                {{ $t("wallet.transfer_to") }}
              </div>
              <div class="transfer-item-desc">{{ $t("agent.title") }}</div>
            </div>
          </div>
          <div class="transfer-icon">
            <img src="../assets/img/forward.svg" />
          </div>
        </div>
        <div
          class="transfer-item"
          v-if="isAbleToTransferPlayer"
          @click="routeTo('player')"
        >
          <div class="transfer-div">
            <div class="transfer-img">
              <img src="../assets/img/player.svg" />
            </div>
            <div class="transfer-text">
              <div class="transfer-item-title">
                {{ $t("wallet.transfer_to") }}
              </div>
              <div class="transfer-item-desc">{{ $t("player") }}</div>
            </div>
          </div>
          <div class="transfer-icon">
            <img src="../assets/img/forward.svg" />
          </div>
        </div>
      </div>
      <div
        class="transfer_request wallet-withdrawal-button border-box"
        @click="handleRouteToTransferRequest()"
      >
        <i class="el-icon-s-order wallet-withdrawal-icon-left"></i>
        <span class=""> {{ $t("transfer_log.title") }} </span>
        <div class="wallet-withdrawal-icon-right">
          <img src="../assets/img/forward.svg" />
        </div>
      </div>
    </div>
    <!-- <div class="wallet-more">
      <div class="wallet-title">{{ $t("withdraw") }}</div>
      <div
        class="wallet-withdrawal-button border-box"
        @click="handleRouteToWithdraw()"
      >
        <div class="wallet-withdrawal-icon-left">
          <img src="../assets/img/withdraw.svg" />
        </div>
        <span class=""> {{ $t("withdraw") }} </span>
        <div class="wallet-withdrawal-icon-right">
          <img src="../assets/img/forward.svg" />
        </div>
      </div>

      <div
        class="wallet-withdrawal-button border-box"
        @click="handleRouteToWithdrawRequest()"
      >
        <i class="el-icon-s-order wallet-withdrawal-icon-left"></i>
        <span class=""> {{ $t("wallet.withdraw_history") }} </span>
        <div class="wallet-withdrawal-icon-right">
          <img src="../assets/img/forward.svg" />
        </div>
      </div>
    </div>
    <div class="wallet-more">
      <div class="wallet-title">{{ $t("deposit") }}</div>
      <div
        class="wallet-withdrawal-button border-box"
        @click="handleRouteToDeposit()"
      >
        <div class="wallet-withdrawal-icon-left">
          <img src="../assets/img/withdraw.svg" />
        </div>
        <span class=""> {{ $t("deposit") }} </span>
        <div class="wallet-withdrawal-icon-right">
          <img src="../assets/img/forward.svg" />
        </div>
      </div>

      <div
        class="wallet-withdrawal-button border-box"
        @click="handleRouteToDepositRequest()"
      >
        <i class="el-icon-s-order wallet-withdrawal-icon-left"></i>
        <span class=""> {{ $t("wallet.deposit_history") }} </span>
        <div class="wallet-withdrawal-icon-right">
          <img src="../assets/img/forward.svg" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Wallet",
  transition: "slide",
  data() {
    return {
      isAbleToTransferAgent: false,
      isAbleToTransferPlayer: false,
      currency: "",
      lock_balance: 0,
      balance: 0,
    };
  },
  mounted() {
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      return false;
    }
    this.getUser();
    let roleAccess = localStorage.getItem("roleAccess");
    if (roleAccess) {
      const roleJson = JSON.parse(roleAccess);
      this.isAbleToTransferAgent =
        roleJson.access && roleJson.access.Transfer_submit_proxy;
      this.isAbleToTransferPlayer =
        roleJson.access && roleJson.access.Transfer_submit_user;
    }
  },
  methods: {
    routeTo(path) {
      this.$router.push({ path: "/transfer", query: { to: path } });
    },
    handleRouteToWithdraw() {
      this.$router.push("/withdraw");
    },
    handleRouteToWithdrawRequest() {
      this.$router.push("/withdrawRequest");
    },
    handleRouteToDeposit() {
      this.$router.push("/deposit");
    },
    handleRouteToDepositRequest() {
      this.$router.push("/depositRequest");
    },
    handleRouteToTransferRequest() {
      this.$router.push("/transferRequest");
    },
    getUser() {
      var authToken = localStorage.getItem("authToken");
      if (!authToken) {
        return false;
      }
      this.$api
        .requestByPost("/Account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
            if (result.data.currency) {
              this.currency = result.data.currency.currency;
              this.balance = result.data.currency.balance;
              this.lock_balance = result.data.currency.lock;
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/wallet.scss";
@import "/assets/scss/mobile/wallet.scss";
</style>
