<template>
  <div class="header-container">
    <div class="header-list-left header-web">
      <div class="header-child-menu-list">
        <div
          :class="['header-child-menu', $route.path == '/' ? 'selected' : '']"
          @click="openPage('/')"
        >
          <div class="header-child-menu-container">
            <div class="header-child-menu-icon">
              <Casino />
            </div>
            <div class="header-child-menu-title">{{ $tt("casino") }}</div>
          </div>
        </div>
        <div
          :class="[
            'header-child-menu',
            $route.path == '/sports' ? 'selected' : '',
          ]"
          @click="openPage('/sports')"
        >
          <div class="header-child-menu-container">
            <div class="header-child-menu-icon">
              <Sports />
            </div>
            <div class="header-child-menu-title">{{ $tt("_sports") }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-list-right-container" :style="getCollapseWidth">
      <div class="header-list-content">
        <div class="header-list-right">
          <div class="list-container">
            <div class="header-list-right-menu">
              <div
                class="header-list-hamburger-menu header-web"
                @click="toggleCollapse"
              >
                <Burger />
              </div>
              <nuxt-link :to="localePath('/')">
                <img
                  class="header-list-blaze-icon header-web"
                  :src="logo"
                  :style="mobileLogo"
                />
              </nuxt-link>
              <nuxt-link :to="localePath('/')">
                <img
                  class="header-list-blaze-icon header-mobile"
                  :src="logo"
                  :style="mobileLogo"
                  v-if="!isLogin"
                />
              </nuxt-link>
              <nuxt-link :to="localePath('/')">
                <img
                  class="header-list-blaze-login-icon header-mobile"
                  :src="miniLogo"
                  :style="mobileLogo"
                  v-if="isLogin"
                />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="header-list-right">
          <div class="list-container">
            <div class="header-list-right-menu" v-if="!isLogin">
              <button
                class="header-login header-button"
                @click="handleModal('login')"
              >
                {{ $tt("login") }}
              </button>
              <button
                class="header-register header-button"
                @click="handleModal('register')"
              >
                {{ $tt("register") }}
              </button>
            </div>

            <div class="header-list-right-menu" v-if="isLogin">
              <div class="header-account header-web">
                <div class="account">
                  <!-- VIP -->
                  <div class="account-item">
                    <div
                      class="user-rank-progress"
                      v-if="user != null"
                      @click="openPage('/vip/vipClub')"
                    >
                      <div class="rank-tier">
                        <div class="user-rank">{{ user.vipName }}</div>
                        <div class="user-level">{{ user.vipLevel }}</div>
                      </div>
                      <div class="rank-progress">
                        <el-progress
                          :percentage="
                            user.rechargeExp != null ? user.rechargeExp : 0
                          "
                          :show-text="false"
                        ></el-progress>
                      </div>
                    </div>
                  </div>

                  <!-- Notification and Menu -->
                  <div class="account-item">
                    <div class="header-user-noti">
                      <div @click="handleModal('emailList')">
                        <el-badge
                          :value="this.unreadEmailCount"
                          :hidden="this.unreadEmailCount == 0"
                          :max="99"
                          class="badge-item"
                        >
                          <Mail class="mail-icon" />
                        </el-badge>
                      </div>
                      <div @click="handleModal('noticeList')">
                        <el-badge
                          :value="this.unreadNoticeCount"
                          :hidden="this.unreadNoticeCount == 0"
                          :max="99"
                          class="badge-item"
                        >
                          <i class="el-icon-message-solid mail-icon"></i>
                        </el-badge>
                      </div>
                      <el-dropdown @command="handleCommand" trigger="click">
                        <i class="el-icon-user-solid user-icon"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="account">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/user.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("account") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="deposit">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/deposit.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("deposit") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="withdraw">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/withdraw.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("withdraw") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="refer">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/referafren.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("refer_a_friend") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="transaction">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/transaction.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("transactions") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="history">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/history.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("history") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="bonus">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/bonuses.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("bonuses") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="preferences">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/preferences.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("preferences") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="fairness">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/fairness.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("_fairness") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="support">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/livesupport.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("live_support") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="reward">
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/rewards.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("_rewards") }}
                          </el-dropdown-item>
                          <el-dropdown-item command="signout" divided>
                            <span class="dropdown-icon">
                              <img
                                src="@/assets/img/dropdown/signout.svg"
                                alt="icon"
                              />
                            </span>
                            {{ $tt("signout") }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>

                  <!-- wallet -->
                  <div class="account-item">
                    <el-dropdown
                      @command="handleWalletUnit"
                      trigger="click"
                      v-if="getCoin != null"
                    >
                      <div class="header-bonus">
                        <div class="header-bonus-wallet">
                          <div class="header-currency">
                            <span class="currency-unit">
                              {{ getCoin.currencyName }}
                            </span>
                            {{ calcWalletAmount }}
                            <!-- {{ selectedCoin.money + selectedCoin.lockMoney }} -->
                          </div>
                          <div class="currency-icon">
                            <img :src="getCoin.currencyIcon" alt="" />
                          </div>
                          <i
                            class="el-icon-arrow-down"
                            style="margin-left: 10px; padding-top: 5px"
                          ></i>
                        </div>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="(item, index) in getUserCoinInfo"
                          :key="index"
                          :command="item"
                          class="account-wallet"
                        >
                          <div class="unit">
                            <div class="currency-icon">
                              <img :src="item.currencyIcon" alt="icon" />
                            </div>
                            {{ item.currencyName }}
                          </div>

                          <div class="money-amount">
                            {{
                              parseFloat(item.money) +
                              parseFloat(item.lockMoney)
                            }}
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>

                  <!-- deposit button -->
                  <div class="account-item">
                    <button
                      class="header-deposit"
                      @click="handleModal('deposit')"
                    >
                      {{ $tt("deposit") }}
                      <!-- <i class="el-icon-s-finance"></i> -->
                    </button>
                  </div>
                </div>
              </div>

              <div class="header-account header-mobile">
                <div class="account">
                  <!-- wallet -->
                  <div class="account-item">
                    <el-dropdown
                      @command="handleWalletUnit"
                      trigger="click"
                      v-if="getCoin != null"
                    >
                      <div class="header-bonus">
                        <div class="header-bonus-wallet">
                          <div class="header-currency">
                            <span class="currency-unit">
                              {{ getCoin.currencyName }}
                            </span>

                            <div class="currency-amount">
                              {{ calcWalletAmount }}
                            </div>
                            <!-- {{ selectedCoin.money + selectedCoin.lockMoney }} -->
                          </div>
                          <div class="currency-icon">
                            <img :src="getCoin.currencyIcon" alt="" />
                          </div>
                          <i
                            class="el-icon-arrow-down"
                            style="margin-left: 10px"
                          ></i>
                        </div>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="(item, index) in getUserCoinInfo"
                          :key="index"
                          :command="item"
                          class="account-wallet"
                        >
                          <div class="unit">
                            <div class="currency-icon">
                              <img :src="item.currencyIcon" alt="icon" />
                            </div>
                            {{ item.currencyName }}
                          </div>

                          <div class="money-amount">
                            {{
                              parseFloat(item.money) +
                              parseFloat(item.lockMoney)
                            }}
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>

                  <!-- deposit button -->
                  <div class="account-item">
                    <button
                      class="header-deposit"
                      @click="handleModal('deposit')"
                    >
                      {{ $tt("deposit") }}
                    </button>
                  </div>

                  <!-- menu -->
                  <div class="account-item">
                    <div class="header-icons-item">
                      <i @click="toggleDropdown" class="el-icon-user-solid"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="toggleDropdown"
      class="dropdown-modal mobile"
      v-if="showDropdown"
    >
      <div class="dropdown-modal-container">
        <ul>
          <li @click="handleCommand('account')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/user.svg" alt="icon" />
            </span>
            {{ $tt("account") }}
          </li>
          <li @click="handleCommand('deposit')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/deposit.svg" alt="icon" />
            </span>
            {{ $tt("deposit") }}
          </li>
          <li @click="handleCommand('withdraw')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/withdraw.svg" alt="icon" />
            </span>
            {{ $tt("withdraw") }}
          </li>
          <li @click="handleCommand('refer')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/referafren.svg" alt="icon" />
            </span>
            {{ $tt("refer_a_friend") }}
          </li>
          <li @click="handleCommand('email')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/email.svg" alt="icon" />
            </span>
            {{ $tt("email") }}
          </li>
          <!-- <li @click="handleCommand('transaction')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/transaction.svg" alt="icon" />
            </span>
            Transactions
          </li> -->
          <li @click="handleCommand('history')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/history.svg" alt="icon" />
            </span>
            {{ $tt("history") }}
          </li>
          <li @click="handleCommand('bonus')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/bonuses.svg" alt="icon" />
            </span>
            {{ $tt("bonuses") }}
          </li>
          <li @click="handleCommand('preferences')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/preferences.svg" alt="icon" />
            </span>
            {{ $tt("preferences") }}
          </li>
          <li @click="handleCommand('fairness')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/fairness.svg" alt="icon" />
            </span>
            {{ $tt("_fairness") }}
          </li>
          <li @click="handleCommand('support')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/livesupport.svg" alt="icon" />
            </span>
            {{ $tt("live_support") }}
          </li>
          <li @click="handleCommand('reward')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/rewards.svg" alt="icon" />
            </span>
            {{ $tt("_rewards") }}
          </li>
          <li @click="handleCommand('signout')">
            <span class="dropdown-icon">
              <img src="@/assets/img/dropdown/signout.svg" alt="icon" />
            </span>
            {{ $tt("signout") }}
          </li>
        </ul>
      </div>
    </div>
    <VerifyEmail
      v-if="showVerifyEmailModal"
      @close-modal="fromVerifyEmailModal"
    />
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import VerifyEmail from "~/pages/verifyEmail.vue";
import Burger from "~/components/svg/Burger.vue";
import Sports from "~/components/svg/Sports.vue";
import Casino from "~/components/svg/Casino.vue";
import Mail from "~/components/svg/Mail.vue";
import DepositModal from "./depositModal/DepositModal.vue";

import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    Burger,
    Sports,
    Casino,
    Mail,
    VerifyEmail,
    DepositModal,
  },
  data() {
    return {
      type: "",
      showModal: false,
      showDropdown: false,
      isShowLeftBar: false,
      showVerifyEmailModal: false,
      notification: 0,
      curreny: "USD",
      amount: "0.00",
      /* user rank */
      rank_tier: "Unranked",
      level: "Level 1",
      rank_progress: parseInt(10),
      /* sports */
      sport: {},
    };
  },
  computed: {
    logo() {
      var cacheLogoUrl = Cookie.get("logo_url");
      if (cacheLogoUrl) {
        return cacheLogoUrl;
      }
      return this.getChannelInfo.logoSmall;
    },
    miniLogo() {
      var cacheLogoUrl = Cookie.get("mini_logo_url");
      if (cacheLogoUrl) {
        return cacheLogoUrl;
      }
      return this.getChannelInfo.logoMini;
    },
    ...mapGetters([
      "getCoin",
      "getUserCoinInfo",
      "getChannelInfo",
      "getSportChannel",
    ]),
    ...mapState([
      "isLogin",
      "user",
      "coinType",
      "walletList",
      "unreadEmailCount",
      "unreadNoticeCount",
    ]),

    calcWalletAmount() {
      if (this.getCoin == null || this.getCoin == {} || this.getCoin == "{}") {
        return "0.00";
      }

      var a =
        parseFloat(this.getCoin.money) + parseFloat(this.getCoin.lockMoney);

      if (a == "NaN") {
        return "0.00";
      } else {
        return a;
      }
    },
    getCollapseWidth() {
      if (this.isShowLeftBar) {
        return {
          marginLeft: "87px",
        };
      } else {
        return {
          marginLeft: "244px",
        };
      }
    },

    mobileLogo() {
      if (this.isMobileWidth) {
        return {
          marginLeft: "5px",
        };
      }
    },
  },
  methods: {
    handleCommand(e) {
      switch (e) {
        case "account":
          this.openPage("/profile/profileMenu?name=account");
          break;
        case "deposit":
          this.$AdjustEvent.openDeposit();
          this.handleModal("deposit");
          break;
        case "withdraw":
          this.$AdjustEvent.openWithdraw();
          this.handleModal("withdraw");
          break;
        case "refer":
          // this.openPage("/referral");
          this.handleModal("refer");
          break;
        case "transaction":
          this.openPage("/profile/transactions/deposits");
          break;
        case "history":
          this.openPage("/profile/profileMenu?name=history");
          break;
        case "bonus":
          this.openPage("/bonus/bonuses");
          break;
        case "preferences":
          this.openPage("/profile/preferences");
          break;
        case "fairness":
          this.openPage("/rules/rulesMenu");
          break;
        case "support":
          window.openChat && window.openChat();
          // LC_API.open_chat_window();
          // window.open(
          //   "https://vue.livehelp100service.com/chatwindow.aspx?siteId=65000839&planId=54e8c5fd-d2c7-4629-8e93-335f95e65988"
          // );
          break;
        case "reward":
          this.openPage("/rewards");
          break;
        case "signout":
          this.handleModal("signout");
          break;
        case "email":
          this.handleModal("emailList");
          break;
        default:
          break;
      }
    },
    openPage(route) {
      if (route == "/sports") {
        if (!this.isLogin) {
          this.type = "login";
          this.showModal = true;
          return false;
        }
        window.newRouter(
          "/games/" +
            this.getSportChannel.playId +
            "-" +
            this.getSportChannel.name.replace(/\s+/g, "-").toLowerCase()
        );
      } else {
        window.newRouter(route);
      }
    },
    fromVerifyEmailModal(s) {
      this.showVerifyEmailModal = false;
      switch (s) {
        case "openAccountSetting":
          this.handleCommand("account");
          break;
        default:
          this.showVerifyEmailModal = false;
          break;
      }
    },
    toggleCollapse() {
      this.isShowLeftBar = !this.isShowLeftBar;
      this.$emit("is-collapsed", this.isShowLeftBar);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
    handleWalletUnit(e) {
      this.$store.dispatch("updateCoinType", JSON.stringify(e));
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/header.scss";
@import "/assets/scss/mobile/header.scss";
</style>
