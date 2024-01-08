<template>
  <div class="profile">
    <div class="header">
      <!-- <div class="profile-header-title pt-5">{{$t('profile.connected_hint')}}</div> -->
    </div>
    <div class="p-3">
      <div class="user-profile-card card-shadow p-3">
        <div class="text-center">
          <div class="card-label-font">{{$t('profile.my_assets')}}<span>(USDT)</span></div>
          <div class="user-assets-value card-value-font">
            <AnimatedValue title="userCurrentAssets" :number="userCurrentAssets" />
          </div>
        </div>
        <hr class="line-break" />
        <div class="d-flex justify-content-around align-items-stretch">
          <div class="text-center">
            <div class="card-label-font">{{$t('profile.today_profit')}}<span>(USDT)</span></div>
            <div class="text-center user-rewards-value card-value-font">
              <AnimatedValue title="reward_today" :number="reward_today" />
            </div>
          </div>
          <div class="vertical-break my-1"></div>
          <div class="text-center">
            <div class="card-label-font">{{$t('profile.cummulative_profit')}}<span>(USDT)</span></div>
            <div class="text-center user-rewards-value card-value-font">
              <AnimatedValue title="cummulate_profit" :number="cummulate_profit" />
            </div>
          </div>
        </div>
        <hr class="line-break" />
        <div class="d-flex justify-content-between align-items-center">
          <div class="card-label-font">
            {{ $t("profile.invite_link") }}
          </div>
          <div class="copy-link" role="button" v-clipboard:copy="invitationLink" v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            {{ $t("profile.copy_link") }}
          </div>
        </div>
        <hr class="line-break" />
        <div class="border-box rounded-pill my-2" role="button">
          <div class="user-profile-check-team d-flex justify-content-center align-items-center gap-2 py-2"
            @click="routeToCommunityProfit">
            <img class="button-content-svg" src="../assets/img/EmployeeSalary.svg" alt="" />
            <div class="fw-bold">{{$t('profile.team_profit_list')}}</div>
          </div>
        </div>
      </div>

      <div class="pt-4 pb-2 fw-bold profile-community-title">
        {{ this.$t("profile.my_community") }}
      </div>

      <div class="profile-community card-shadow p-3">
        <div class="text-center">
          <div class="d-flex justify-content-center align-items-center">
            <div class="card-label-font">{{$t('profile.community_hold')}}<span>(USDT)</span></div>
            <!-- <img class="profile-community-forward" src="../assets/img/forward.svg" /> -->
          </div>
          <div class="profile-community-value card-value-font">
            {{community_hold_value}}
            <!-- <AnimatedValue title="community_hold_value" :number="community_hold_value" /> -->
          </div>
        </div>
        <hr class="line-break" />
        <div class="d-flex justify-content-around align-items-stretch">
          <div class="text-center">
            <div class="card-label-font">{{$t('profile.direct_num')}}</div>
            <div class="profile-community-value card-value-font">
              {{ direct_members_value }}
            </div>
          </div>
          <div class="vertical-break my-1"></div>
          <div class="text-center">
            <div class="card-label-font">{{$t('profile.direct_hold')}}<span>(USDT)</span></div>
            <div class="profile-community-value card-value-font">
              {{members_hold_value}}
              <!-- <AnimatedValue title="members_hold_value" :number="members_hold_value" /> -->
            </div>
          </div>
        </div>
      </div>

      <div class="list-container card card-shadow pb-3 mt-3">
        <div class="list-header blue-background py-2 px-3">
          <div>{{$t('profile.direct_list')}}</div>
        </div>
        <div class="px-3 pt-3 list-row-content">
          <div v-for="(item, index) in communityList" :key="item.id">
            <div class="d-flex justify-content-between">
              <div class="text-start">
                <div class="card-value-font list-item-label">
                  {{ shortAddress(item.address) }}
                </div>
                <div class="card-label-font list-item-value">
                  {{$t('profile.direct_num')}}:{{ item.total_account_num }}
                </div>
              </div>
              <div class="text-end">
                <div class="card-value-font list-item-label">
                  {{ item.balance }}<span class="price-unit"> USDT</span>
                </div>
                <div class="card-label-font list-item-value">
                  {{ timeToDate(item.create_time) }}
                </div>
              </div>
            </div>
            <hr class="line-break" v-if="index != communityList.length - 1" />
          </div>
          <div class="d-flex flex-column pt-4" v-if="communityList.length == 0">
            <img class="nodata" :src="communityData" alt="" />
            <span class="text-center nodata-label">{{
            $t("utils.nodata")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      userCurrentAssets: '',
      reward_today: '',
      cummulate_profit: '',
      direct_members_value: '',
      members_hold_value: '',
      community_hold_value: '',
      communityData: require("../assets/img/no_data.png"),
      invitationID: "",
      invitationLink: "",
      communityList: [],
      hasData: false,
      initInterval: null,
    };
  },
  mounted() {
    if (this.isLogin) {
      this.getAgentInfo();
      this.getAgentList();
      this.getStats();
      this.getAccountInfo();
    }

    const that = this;
    this.initInterval = setInterval(() => {
      if (!that.isLogin) {
        if (that.hasData) {
          that.resetData();
        }
        return;
      }
      that.getAgentInfo();
      that.getAgentList();
      that.getStats();
      that.getAccountInfo();
      that.hasData = true;
    }, 5000);
  },
  computed: {
    ...mapState(["isLogin", "connectedAddress"]),
  },
  methods: {
    resetData() {
      this.userCurrentAssets = '';
      this.reward_today = '';
      this.cummulate_profit = '';
      this.direct_members_value = '';
      this.members_hold_value = '';
      this.community_hold_value = '';
      this.invitationID = "";
      this.invitationLink = "";
      this.communityList = [];
      this.hasData = false;
    },
    timeToDate(d) {
      return dayjs.unix(d).format('YYYY-MM-DD HH:MM:ss');
    },
    shortAddress(a) {
      if (a == null || a == "") {
        return "";
      }
      return a.slice(0, 4) + "..." + a.substr(a.length - 4);
    },
    getAccountInfo() {
      this.$api
        .requestByPost("account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateAccount", result.data);
            this.reward_today = result.data.today_profit;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    getAgentInfo() {
      this.$api
        .requestByPost("Agent/info", null)
        .then((result) => {
          if (result.status == true) {
            this.invitationID = result.data.share_code;
            this.invitationLink =
              window.location.hostname + "?invite_code=" + this.invitationID;
            this.direct_members_value = result.data.address_num;
            this.members_hold_value = result.data.direct_amount;
            this.community_hold_value = result.data.total_amount;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    getAgentList() {
      this.$api
        .requestByPost("Agent/lists", null)
        .then((result) => {
          if (result.status == true) {
            this.communityList = result.data.list;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    getStats() {
      this.$api
        .requestByPost("Funds/statistic", null)
        .then((result) => {
          if (result.status == true) {
            this.userCurrentAssets = result.data.balance;
            // this.reward_today = result.data.today_profit;
            this.cummulate_profit = result.data.total_profit;
          }
        })
        .catch((error) => {
          // this.$message.error(error);
        });
    },
    onCopy: function (e) {
      if (!this.isLogin) {
        this.$message.error(this.$t("message.connect_request"));

        return;
      }
      this.$message.success(e.text + this.$t("message.copy_successful"));
    },
    onError: function (e) {
      this.$message.error(this.$t("message.copy_failed"));
    },
    routeToCommunityProfit() {
      this.$router.push({ path: this.localePath("/community-profit") });
    },
  },
  beforeDestroy() {
    if (this.initInterval != null) {
      clearInterval(this.initInterval);
    }
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/profile.scss";
</style>
