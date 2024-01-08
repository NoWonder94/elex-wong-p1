<template>
  <div class="modal2" v-if="open && user">
    <div class="modal-container" v-click-outside="close">
      <div class="modal-close">
        <i class="fa-solid fa-xmark" @click="close"></i>
      </div>
      <div class="modal-user-main" v-if="curPage == 'main'">
        <div class="modal-user-head">
          <i class="fa-solid fa-circle-user"></i>
          <div>{{ $t("usermodal.youraccount") }}</div>
        </div>
        <div class="modal-borderbox">
          <div class="modal-box-content">
            <div class="modal-label">
              <div class="modal-main-label">{{ user.name }}</div>
              <div class="modal-sub-label">{{ user.email }}</div>
            </div>
            <div class="modal-box-btn" @click="changePage('accSettings')">
              {{ $t("usermodal.edit") }}
            </div>
          </div>
          <div class="modal-box-content">
            <div class="modal-label">
              <div class="modal-main-label">
                {{ $t("usermodal.newsletters") }}
              </div>
              <div class="modal-sub-label">
                {{ $t("usermodal.updateemail") }}
              </div>
            </div>
            <div class="modal-box-btn" @click="changePage('emailPrefer')">
              {{ $t("usermodal.manage") }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-btn" @click="signout">
            {{ $t("usermodal.signout") }}
          </div>
          <div
            class="modal-footer-btn"
            @click="openLink('mailto:noreply@blog.bit555.com')"
          >
            {{ $t("usermodal.contactsp") }}
          </div>
        </div>
      </div>
      <div class="modal-account-setting" v-if="curPage == 'accSettings'">
        <div class="modal-back" @click="changePage('main')">
          <i class="fa-solid fa-angle-left"></i> {{ $t("usermodal.back") }}
        </div>
        <div class="modal-user-head">
          <div>{{ $t("usermodal.accountsetting") }}</div>
        </div>
        <div class="modal-user-content">
          <div class="modal-input-box">
            <div class="modal-input-box-label">{{ $t("modal.name") }}</div>
            <el-input :placeholder="name" v-model="name"></el-input>
          </div>
          <div class="modal-input-box">
            <div class="modal-input-box-label">{{ $t("modal.email") }}</div>
            <el-input :placeholder="email" v-model="email"></el-input>
          </div>
        </div>
        <div class="modal-btn">
          <el-button @click="save" :loading="isLoading">
            {{ $t("usermodal.save") }}
          </el-button>
        </div>
      </div>
      <div class="modal-email-preferences" v-if="curPage == 'emailPrefer'">
        <div class="modal-back" @click="changePage('main')">
          <i class="fa-solid fa-angle-left"></i>{{ $t("usermodal.back") }}
        </div>
        <div class="modal-user-head">
          <div>{{ $t("usermodal.emailprefer") }}</div>
        </div>
        <div class="modal-borderbox">
          <div
            class="modal-radio-input"
            v-for="(plan, index) in plans"
            :key="index"
          >
            <div>
              {{ plan.type }}
            </div>
            <div>
              <el-switch
                v-model="plan.value"
                active-color="#000000"
                inactive-color="#E9E9E9"
              />
            </div>
          </div>
        </div>
        <div class="modal-unsubscribe-btn" @click="unsubscribeAll">
          {{ $t("usermodal.unsubscribeAllEmail") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "Modal2",
  props: ["open"],
  computed: mapState(["user"]),
  watch: {
    open: function (v) {
      // console.log(v);
    },
    user: function (v) {
      this.name = this.user.name;
      this.email = this.user.email;
    },
  },
  data() {
    return {
      isLoading: false,
      curPage: "main",
      name: "",
      email: "",
      plans: [
        {
          type: "Bit555.io",
          value: true,
        },
        {
          type: "test",
          value: true,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    close() {
      this.curPage = "main";
      document.documentElement.style.overflow = "auto";
      this.$emit("closePop");
    },
    changePage(page) {
      this.curPage = page;
    },
    save() {},
    unsubscribeAll() {},
    openLink(link) {
      window.open(link);
    },
    signout() {
      this.isLoading = true;
      this.$api
        .requestByPost("User/logout")
        .then((result) => {
          localStorage.removeItem("authToken");
          this.$store.dispatch("updateUserInfo", "");
          this.$message.success(this.$t("message.logoutsuccess"));
          this.close();
          this.isLoading = false;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
          this.isLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/modal2.scss";
@import "/assets/scss/mobile/modal2.scss";
</style>
