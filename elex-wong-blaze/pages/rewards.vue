<template>
  <div class="rewards">
    <div class="rewards-section">
      <div class="mobile-header mobile">
        <div class="title">{{ $tt("_rewards") }}</div>
        <div class="desc">
          {{ $tt("rewards_desc") }}
        </div>
      </div>

      <div class="rewards-promo-container mobile">
        <div class="rewards-promo-title">{{ $tt("claim_promo_code") }}</div>

        <div class="rewards-code-container">
          <div class="text-input">
            <input type="text" v-model="promocode" placeholder=" " />
            <label>{{ $tt("enter_promo_code") }}</label>
          </div>
          <el-button>{{ $tt("claim") }}</el-button>
        </div>
      </div>

      <div class="web-header web">
        <div>
          <div class="title">{{ $tt("_rewards") }}</div>
          <div class="desc">
            {{ $tt("rewards_desc") }}
          </div>
        </div>
        <div class="btn" @click="dialogVisible = true">
          {{ $tt("claim_promo_code") }}
        </div>
      </div>

      <div class="rewards-content">
        <div class="rewards-subcontainer">
          <div class="rewards-subheader">
            <img
              class="rewards-subimage"
              src="~/assets/img/rewards_deposit.svg"
              alt=""
            />
            <div class="rewards-subtext">
              <div class="rewards-subtitle">
                {{ $tt("rewards_deposit_1") }}
              </div>
              <div class="rewards-subdesc">
                {{ $tt("rewards_deposit_2") }}
              </div>
            </div>
          </div>

          <div class="rewards-deposit-footer">
            <div class="rewards-deposit-countdown">
              <!-- {{ $tt("expires_in") }} {{ days }}d {{ hours }}h {{ minutes }}m
              {{ seconds }}s -->
            </div>
            <div class="rewards-deposit-btn" @click="handleModal('deposit')">
              {{ $tt("deposit") }}
            </div>
          </div>
        </div>

        <div class="rewards-subcontainer">
          <div class="rewards-subheader">
            <img
              class="rewards-subimage"
              src="~/assets/img/rewards_refer.svg"
              alt=""
            />
            <div class="rewards-subtext">
              <div class="rewards-subtitle">{{ $tt("refer_a_friend") }}</div>
              <div class="rewards-subdesc">
                {{ $tt("invite_friend_earn_money") }}
              </div>
            </div>
          </div>

          <div class="rewards-footer">
            <div class="rewards-refer-btn" @click="handleModal('refer')">
              {{ $tt("claim_now") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- calim promo code modal -->
    <el-dialog :visible.sync="dialogVisible" custom-class="promocode-dialog">
      <div class="dialog-content">
        <div class="name">
          <div class="dialog-title">{{ $tt("claim_promo_code") }}</div>
          <div class="dialog-input">
            <div class="input">
              <input type="text" v-model="promocode" placeholder=" " />
              <label>{{ $tt("enter_promo_code") }}</label>
            </div>
          </div>
        </div>
        <div class="dialog-button" @click="submit" v-if="!isBtnLoading">
          {{ $tt("claim") }}
        </div>
        <div class="dialog-button" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </el-dialog>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>

<script>
export default {
  name: "Rewards",
  meta: {
    auth: true,
  },
  data() {
    return {
      type: "",
      showModal: false,
      dialogVisible: false,
      isBtnLoading: false,
      promocode: "",
      countdownDate: new Date("2023-03-31T00:00:00").getTime(), // Set the target date
      countdownTimestamp: 1710387966, // Set the countdown end timestamp
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      countdownInterval: null, // Set a variable to hold the interval ID
    };
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
    submit() {
      this.dialogVisible = false;
    },
    handleRoute(url) {
      window.newRouter(url);
    },
  },
  mounted() {
    setInterval(() => {
      const now = new Date().getTime();
      // const distance = this.countdownDate - now;
      const countdownDate = new Date(this.countdownTimestamp * 1000);
      const distance = countdownDate - now;

      if (distance < 0) {
        // Stop the countdown if the remaining time is negative
        clearInterval(this.countdownInterval);
        return;
      }
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000); // Run the countdown function every second
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval); // Clear the interval when the component is unmounted
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/rewards.scss";
@import "/assets/scss/mobile/rewards.scss";
</style>
