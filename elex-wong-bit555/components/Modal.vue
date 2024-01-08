<template>
  <div class="modal" v-if="open">
    <div class="modal-container" v-click-outside="close">
      <div class="modal-close">
        <i class="fa-solid fa-xmark" @click="close"></i>
      </div>
      <div class="modal-sign-container" v-if="curPage == 'signup'">
        <div class="modal-title">
          <div>Bit555.io</div>
        </div>
        <el-form
          ref="signupform"
          :model="signupform"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item :label="$t('modal.name')">
            <el-input v-model="signupform.name" prop="name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.email')" prop="email">
            <el-input v-model="signupform.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.pwd')" prop="pwd">
            <el-input
              type="password"
              v-model="signupform.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.confirmpwd')" prop="confirmpwd">
            <el-input
              type="password"
              v-model="signupform.confirmpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signUp" :loading="isLoading">{{
              $t("modal.signup")
            }}</el-button>
          </el-form-item>
        </el-form>
        <div class="modal-footer">
          <div>
            {{ $t("modal.alreadymember") }}&ensp;<span
              @click="changePage('signin')"
              ><b>{{ $t("modal.signin") }}</b></span
            >
          </div>
        </div>
      </div>
      <div class="modal-sign-container" v-if="curPage == 'signin'">
        <div class="modal-title">
          <div>{{ $t("modal.signin") }}</div>
        </div>
        <el-form
          ref="signinform"
          :model="signinform"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item :label="$t('modal.email')" prop="email">
            <el-input v-model="signinform.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('modal.pwd')" prop="pwd">
            <el-input
              type="password"
              v-model="signinform.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signIn" :loading="isLoading">{{
              $t("modal.continue")
            }}</el-button>
          </el-form-item>
        </el-form>
        <div class="modal-footer">
          <div>
            {{ $t("modal.noaccount") }} &ensp;<span
              @click="changePage('signup')"
            >
              <b>{{ $t("modal.signup") }}</b></span
            >
          </div>
        </div>
      </div>
      <!-- <div class="modal-plan-container" v-if="curPage == 'plan'">
        <div class="modal-title">
          <div>Bit555.io</div>
        </div>
        <div class="modal-sub-title">
          {{ $t("modal.chosenews") }}
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
        <div class="modal-btn">
          <el-button @click="signUp" :loading="isLoading">
            {{ $t("modal.continue") }}
          </el-button>
        </div>
        <div class="modal-footer">
          <span @click="changePage('signup')">
            {{ $t("modal.differentplan") }}
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";

export default {
  name: "Modal",
  props: ["open"],
  watch: {
    open: function (v) {
      if (v == true) {
        setTimeout(() => {
          this.resetForm("signup");
        }, 1);
      }
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("error.pwdblank")));
      } else {
        if (this.signupform.confirmpwd !== "") {
          this.$refs.signupform.validateField("confirmpwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("error.pwdblank")));
      } else if (value !== this.signupform.pwd) {
        callback(new Error(this.$t("error.pwdnotmatch")));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      username: "",
      pwd: "",
      signupform: {
        email: "",
        name: "",
        pwd: "",
        confirmpwd: "",
      },
      signinform: {
        email: "",
        pwd: "",
      },
      rules: {
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmpwd: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
      signin: false,
      curPage: "signup",
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
      this.signin = false;
      this.curPage = "signup";
      document.documentElement.style.overflow = "auto";
      this.$emit("closePop");
    },
    changePage(page, reset = true) {
      if (reset) {
        this.resetForm(page, true);
      }
      this.curPage = page;
    },
    resetForm(page, toPage = false) {
      // reset sign up page when redirect to sign in page, or reset signup page
      if ((page == "signin" && toPage) || (page == "signup" && !toPage)) {
        //if redirect to sign in page
        if (toPage) this.signin = true;
        this.$refs.signupform.clearValidate();
        this.signupform.email = "";
        this.signupform.name = "";
        this.signupform.pwd = "";
        this.signupform.confirmpwd = "";
      }
      // reset sign in page when redirect to sign up page, or reset signin page
      else if ((page == "signin" && !toPage) || (page == "signup" && toPage)) {
        //if redirect to sign up page
        if (toPage) this.signin = false;
        this.$refs.signinform.clearValidate();
        this.signinform.email = "";
        this.signinform.pwd = "";
      }
    },
    signIn() {
      this.isLoading = true;
      if (this.signinform.email == "" || this.signinform.pwd == "") {
        this.$message.error(this.$t("error.fillinrequire"));
        this.isLoading = false;
        return;
      }
      let form = {
        email: this.signinform.email,
        pwd: this.signinform.pwd,
      };

      this.$api
        .requestByPost("User/login", form)
        .then((result) => {
          if (result.status == true) {
            if (result.data.email) {
              localStorage.setItem("authToken", result.token);
              this.$store.dispatch("updateUserInfo", result.data);
              this.$message.success(this.$t("message.loginsuccess"));
              this.resetForm("signin");
              this.close();
            } else {
              this.$message.error(this.$t("error.emailnotfound"));
            }
          } else {
            this.$message.error(result.msg);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
          this.isLoading = false;
        });
    },
    signUp() {
      this.isLoading = true;
      if (
        this.signupform.email == "" ||
        this.signupform.pwd == "" ||
        this.signupform.confirmpwd == "" ||
        this.signupform.pwd != this.signupform.confirmpwd
      ) {
        this.$message.error(this.$t("error.fillinrequire"));
        this.changePage("signup", false);
        this.isLoading = false;
        return;
      }

      let form = {
        email: this.signupform.email,
        pwd: this.signupform.pwd,
        name: this.signupform.name,
      };

      this.$api
        .requestByPost("User/reg", form)
        .then((result) => {
          if (result.status == true) {
            localStorage.setItem("authToken", result.token);
            this.$message.success(this.$t("message.registersuccess"));
            this.getUserDetail();
            this.close();
          } else {
            this.$message.error(result.msg);
            this.changePage("signup", false);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error.error"));
          this.isLoading = false;
        });
    },
    //validate sign up page before redirect to plan page
    signUpValidate() {
      if (
        this.signupform.email == "" ||
        this.signupform.pwd == "" ||
        this.signupform.confirmpwd == "" ||
        this.signupform.pwd != this.signupform.confirmpwd
      ) {
        this.$message.error(this.$t("error.fillinrequire"));
        this.isLoading = false;
        return;
      }
      this.changePage("plan");
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
    getBaseToken() {
      let form = {
        sid: "4BDF673929D64C5681E4D8904BFD8F81",
        client: "pc",
      };

      this.$api
        .requestByPost("App/getToken", form)
        .then((result) => {
          if (result.status == true) {
            if (result.token) {
              localStorage.setItem("baseToken", result.token);
            }
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/modal.scss";
@import "/assets/scss/mobile/modal.scss";
</style>
