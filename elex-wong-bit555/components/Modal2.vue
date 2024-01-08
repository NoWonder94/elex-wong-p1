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
          <!-- <div class="modal-box-content">
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
          </div> -->
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
        <el-form
          ref="updateform"
          :model="updateform"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item :label="$t('modal.name')">
            <el-input v-model="updateform.name" prop="name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.email')" prop="email">
            <el-input v-model="updateform.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.oldpwd')" prop="oldpwd">
            <el-input
              type="password"
              v-model="updateform.oldpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.newpwd')" prop="pwd">
            <el-input
              type="password"
              v-model="updateform.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.confirmpwd')" prop="confirmpwd">
            <el-input
              type="password"
              v-model="updateform.confirmpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save" :loading="isLoading">{{
              $t("usermodal.save")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="modal-email-preferences" v-if="curPage == 'emailPrefer'">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Modal2",
  props: ["open"],
  computed: mapState(["user"]),
  watch: {
    open: function (v) {
      // console.log(v);
    },
    user: function (v) {
      this.updateform.name = v.name;
      this.updateform.email = v.email;
    },
    curPage: function (v) {
      if (v == "accSettings") {
        this.updateform.name = this.user.name;
        this.updateform.email = this.user.email;
      }
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t("error.pwdlength")));
      } else if (this.updateform.confirmpwd !== "") {
        this.$refs.updateform.validateField("confirmpwd");
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t("error.pwdlength")));
      } else if (this.updateform.pwd !== "" && value !== this.updateform.pwd) {
        callback(new Error(this.$t("error.pwdnotmatch")));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      curPage: "main",
      updateform: {
        email: "",
        name: "",
        oldpwd: "",
        pwd: "",
        confirmpwd: "",
      },
      rules: {
        pwd: [{ min: 6, validator: validatePass, trigger: "blur" }],
        confirmpwd: [{ min: 6, validator: validatePass2, trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
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
    save() {
      this.isLoading = true;
      if (
        (this.updateform.pwd !== "" || this.updateform.confirmpwd !== "") &&
        this.updateform.oldpwd == ""
      ) {
        this.$message.error(this.$t("error.oldpwdisrequire"));
        this.isLoading = false;
        return;
      } else if (
        (this.updateform.pwd.length < 6 && this.updateform.pwd.length > 0) ||
        (this.updateform.confirmpwd.length > 0 &&
          this.updateform.confirmpwd.length < 6)
      ) {
        this.$message.error(this.$t("error.pwdlength"));
        this.isLoading = false;
        return;
      }
      this.isLoading = false;

      let form = {
        email: this.updateform.email,
        pwd: this.updateform.pwd,
        old_pwd: this.updateform.oldpwd,
        name: this.updateform.name,
      };

      this.$api
        .requestByPost("User/update", form)
        .then((result) => {
          if (result.status == true) {
            this.getUserDetail();
            this.close();
          } else {
            this.$message.error(result.msg);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error.error"));
          this.isLoading = false;
        });
    },
    unsubscribeAll() {},
    openLink(link) {
      window.open(link);
    },
    getUserDetail() {
      this.$api
        .requestByPost("User/getDetail")
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
          } else {
            localStorage.setItem("authToken", "");
            this.$message.error(result.msg);
            getBaseToken();
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
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
