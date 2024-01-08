<template>
  <div class="preferences">
    <AccountHeader title="PREFERENCES" />
    <div class="content">
      <div class="title">
        {{ $tt("preferences") }}
      </div>
      <div v-loading="isLoading"></div>
      <div class="preferences-list" v-if="!isLoading">
        <div class="preferences-item">
          <div class="text">
            {{ $tt("receive_transaction_email_notifications") }}
          </div>
          <div class="switch">
            <el-switch
              v-model="updates"
              :active-color="activeColor"
              :inactive-color="inactiveColor"
              @change="updatePref"
            ></el-switch>
          </div>
        </div>
        <div class="preferences-item">
          <div class="text">
            {{ $tt("Receive_marketing_communications") }}
          </div>
          <div class="switch">
            <el-switch
              v-model="marketing"
              :active-color="activeColor"
              :inactive-color="inactiveColor"
              @change="updatePref"
            ></el-switch>
          </div>
        </div>
        <div class="preferences-item">
          <div class="text">
            {{ $tt("Receive_SMS_communications") }}
          </div>
          <div class="switch">
            <el-switch
              v-model="sms"
              :active-color="activeColor"
              :inactive-color="inactiveColor"
              @change="updatePref"
            ></el-switch>
          </div>
        </div>
        <div class="preferences-item">
          <div class="text">
            {{ $tt("show_level_up_rewards") }}
          </div>
          <div class="switch">
            <el-switch
              v-model="rewards"
              :active-color="activeColor"
              :inactive-color="inactiveColor"
              @change="updatePref"
            ></el-switch>
          </div>
        </div>
        <div class="preferences-item">
          <div class="text">
            {{ $tt("receive_general_email_notifications") }}
          </div>
          <div class="switch">
            <el-switch
              v-model="email"
              :active-color="activeColor"
              :inactive-color="inactiveColor"
              @change="updatePref"
            ></el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Preferences",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
      activeColor: "#F12C4C",
      inactiveColor: "#1A242D",
      updates: true,
      marketing: true,
      sms: true,
      rewards: true,
      email: true,
      id: 0,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.getPreferences();
    }, 2000);
  },
  methods: {
    getPreferences() {
      this.id = this.user.id;
      this.isLoading = true;

      this.$api
        .requestByGet("/hall/v2/user/getPreferences", { userId: this.id })
        .then((result) => {
          const { code, data, msg } = result;
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

          const {
            depositWithdrawal,
            marketingComm,
            smsComm,
            levelReward,
            eMail,
          } = data;
          this.updates = depositWithdrawal == 1 ? true : false;
          this.marketing = marketingComm == 1 ? true : false;
          this.sms = smsComm == 1 ? true : false;
          this.rewards = levelReward == 1 ? true : false;
          this.email = eMail == 1 ? true : false;
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    updatePref() {
      var data = {
        depositWithdrawal: this.updates == true ? "1" : "0",
        marketingComm: this.marketing == true ? "1" : "0",
        smsComm: this.sms == true ? "1" : "0",
        levelReward: this.rewards == true ? "1" : "0",
        eMail: this.email == true ? "1" : "0",
      };

      this.$api
        .requestByPost("/hall/v2/user/preferences", data)
        .then((result) => {
          const { code, data, msg } = result;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
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
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/preferences.scss";
@import "/assets/scss/mobile/preferences.scss";
</style>
