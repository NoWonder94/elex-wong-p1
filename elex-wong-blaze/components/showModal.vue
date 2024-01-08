<template>
  <div class="show-modal">
    <Login v-show="showLoginModal" @close-modal="fromLoginModal" />
    <ForgotPwd v-show="showForgotModal" @close-modal="fromForgotPassModal" />
    <Register v-if="showRegisterModal" @close-modal="fromRegModal" />
    <CancelReg v-show="showCancelModal" @close-modal="fromCancelModal" />
    <Refer v-if="showReferModal" @close-modal="fromReferModal" />
    <HowReferWorks
      v-show="showHowReferWorksModal"
      @close-modal="fromHowReferworksModal"
    />
    <SignOut v-show="showSignoutModal" @close-modal="fromSignoutModal" />
    <DepositModal v-if="showDepositModal" @close-modal="closeDepositModal" />
    <WithdrawModal v-if="showWithdrawModal" @close-modal="closeWithdrawModal" />
    <EmailModal
      type="email"
      v-if="showEmailModal"
      @close-modal="closeEmailModal"
    />
    <EmailModal
      type="notice"
      v-if="showNoticeModal"
      @close-modal="closeNoticeModal"
    />
  </div>
</template>

<script>
import aes from "@/utils/aes.js";
import Login from "~/pages/login.vue";
import ForgotPwd from "~/pages/forgotPwd.vue";
import Register from "~/pages/register.vue";
import CancelReg from "~/pages/cancelReg.vue";
import Refer from "~/pages/refer.vue";
import HowReferWorks from "~/pages/howReferWorks.vue";
import SignOut from "~/pages/signOut.vue";
import EmailModal from "~/components/emailModal/EmailModal.vue";
import DepositModal from "~/components/depositModal/DepositModal.vue";
import WithdrawModal from "~/components/withdrawModal/WithdrawModal.vue";

export default {
  name: "showModal",
  components: {
    Login,
    ForgotPwd,
    Register,
    CancelReg,
    Refer,
    HowReferWorks,
    SignOut,
    EmailModal,
    DepositModal,
    WithdrawModal,
  },
  props: ["type"],
  data() {
    return {
      showLoginModal: false,
      showForgotModal: false,
      showRegisterModal: false,
      showCancelModal: false,
      showReferModal: false,
      showHowReferWorksModal: false,
      showSignoutModal: false,
      showDepositModal: false,
      showWithdrawModal: false,
      showEmailModal: false,
      showNoticeModal: false,
    };
  },
  mounted() {
    $(".mobile-nav-innner-container").hide();
    switch (this.type) {
      case "login":
        this.showLoginModal = true;
        break;
      case "register":
        this.showRegisterModal = true;
        break;
      case "refer":
        this.showReferModal = true;
        break;
      case "signout":
        this.showSignoutModal = true;
        break;
      case "deposit":
        this.showDepositModal = true;
        $(".mobile-nav-container").hide();
        break;
      case "withdraw":
        this.showWithdrawModal = true;
        $(".mobile-nav-container").hide();
        break;
      case "emailList":
        this.showEmailModal = true;
        $(".mobile-nav-container").hide();
        break;
      case "noticeList":
        this.showNoticeModal = true;
        break;
      default:
        break;
    }
  },
  methods: {
    closeEmailModal(e) {
      this.showEmailModal = false;
      this.$emit("close");
      if (window.innerWidth < 1201) {
        $(".mobile-nav-container").show();
        $(".mobile-nav-innner-container").show();
      }
    },
    closeNoticeModal(e) {
      this.showNoticeModal = false;
      this.$emit("close");
      if (window.innerWidth < 1201) {
        $(".mobile-nav-container").show();
        $(".mobile-nav-innner-container").show();
      }
    },
    fromLoginModal(s) {
      this.showLoginModal = false;
      switch (s) {
        case "forgotPwd":
          this.showForgotModal = true;
          break;
        case "reg":
          this.showRegisterModal = true;
          break;
        default:
          this.showLoginModal = false;
          break;
      }
      this.checkClose();
    },
    fromRegModal(s) {
      this.showRegisterModal = false;
      switch (s) {
        case "close":
          window.innerWidth > 1201
            ? (this.showCancelModal = true)
            : (this.showCancelModal = false);
          break;
        case "login":
          this.showLoginModal = true;
          break;
        default:
          this.showRegisterModal = false;
          break;
      }
      this.checkClose();
    },
    fromForgotPassModal(s) {
      this.showForgotModal = false;
      switch (s) {
        case "login":
          this.showLoginModal = true;
          break;
        case "reg":
          this.showRegisterModal = true;
          break;
        default:
          this.showForgotModal = false;
          break;
      }
      this.checkClose();
    },
    fromCancelModal(s) {
      this.showCancelModal = false;
      switch (s) {
        case "continue":
          this.showRegisterModal = true;
          break;
        default:
          this.showCancelModal = false;
          break;
      }
      this.checkClose();
    },
    fromReferModal(s) {
      this.showReferModal = false;
      switch (s) {
        case "how":
          this.showHowReferWorksModal = true;
          break;
        default:
          this.showReferModal = false;
          break;
      }
      this.checkClose();
    },
    fromHowReferworksModal(s) {
      this.showHowReferWorksModal = false;
      switch (s) {
        case "back":
          this.showReferModal = true;
          break;
        default:
          this.showHowReferWorksModal = false;
          break;
      }
      this.checkClose();
    },
    fromSignoutModal(s) {
      this.showSignoutModal = false;
      switch (s) {
        case "logout":
          this.logout();
          break;
        default:
          this.showSignoutModal = false;
          break;
      }
      this.checkClose();
    },
    logout() {
      this.$notify({
        title: "Successful",
        message: "Logout Successful.",
        type: "success",
        duration: 2000,
      });
      let lang = localStorage.getItem("selected_language");
      localStorage.clear();
      localStorage.setItem("selected_language", lang);
      this.$store.dispatch("updateLanguage", lang);
      this.$store.dispatch("updateIslogin", null);
      this.$store.dispatch("updateUserInfo", null);
      window.initAppSocket && window.initAppSocket();
      aes.systemDefKey();
      window.location.reload();
    },
    closeDepositModal() {
      this.showDepositModal = false;
      this.$emit("close");
      if (window.innerWidth < 1201) {
        $(".mobile-nav-container").show();
        $(".mobile-nav-innner-container").show();
      }
    },
    closeWithdrawModal() {
      this.showWithdrawModal = false;
      this.$emit("close");
      if (window.innerWidth < 1201) {
        $(".mobile-nav-container").show();
        $(".mobile-nav-innner-container").show();
      }
    },
    checkClose() {
      if (
        this.showLoginModal == false &&
        this.showForgotModal == false &&
        this.showRegisterModal == false &&
        this.showCancelModal == false &&
        this.showReferModal == false &&
        this.showHowReferWorksModal == false &&
        this.showSignoutModal == false
      ) {
        this.$emit("close");
        window.innerWidth > 1201
          ? $(".mobile-nav-innner-container").hide()
          : $(".mobile-nav-innner-container").show();

        // this.width = window.innerWidth;
        // if (this.width < 1200) {
        //   $(".mobile-nav-innner-container").show();
        // }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
