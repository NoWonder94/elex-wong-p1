<template>
  <div class="reg">
    <div class="reg-modal-overlay" @click="closeModal('close')">
      <div class="reg-modal" @click.stop>
        <div class="modal-image-container web">
          <img
            class="modal-image"
            src="~/assets/img/registerModalImage.svg"
            alt=""
          />
          <h1 class="modal-text">
            {{ $tt("sign_up_rewards") }}
          </h1>
        </div>
        <div class="reg-modal-container">
          <div class="header web">
            <i class="el-icon-close" @click="closeModal('close')"></i>
            <img class="logo" :src="getChannelInfo.logoSmall" alt="" />
          </div>
          <div class="header mobile">
            <i class="el-icon-close" @click="closeModal('close')"></i>
            <div class="btn">
              <div @click="closeModal('login')">{{ $tt("sign_in") }}</div>
              <div class="register">{{ $tt("register") }}</div>
            </div>
            <el-divider />
            <img class="logo" :src="getChannelInfo.logoSmall" alt="" />
          </div>
          <div class="body" v-if="registerItems != null">
            <div class="title">{{ $tt("register_at_blaze") }}</div>
            <div class="text-input" v-if="registerItems['6']">
              <input
                type="text"
                v-model="form.username"
                placeholder=" "
                @blur="validateFormInput"
              />
              <label>{{ $tt("username") }}</label>
            </div>
            <span
              class="error-input"
              v-if="validator.username != null && validator.username.length > 0"
            >
              {{ validator.username }}
            </span>

            <div class="text-input" v-if="registerItems['3']">
              <!-- <input
                type="number"
                v-model="form.phone"
                placeholder=" "
                @blur="validateFormInput"
              />
              <label>{{ $tt("home.phone") }}</label> -->

              <vue-tel-input
                v-model="form.phone"
                v-bind="option"
                @country-changed="countryChanged"
                @blur="validateFormInput"
              ></vue-tel-input>
              <div div class="country-code">+{{ form.countryCode }}</div>
            </div>
            <span class="error-input" v-if="validator.phone != null">
              {{ validator.phone }}
            </span>

            <div class="text-input" v-if="registerItems['1']">
              <input
                type="text"
                v-model="form.email"
                placeholder=" "
                @blur="validateFormInput"
              />
              <label>{{ $tt("email_address") }}</label>
            </div>
            <span
              class="error-input"
              v-if="validator.email != null && validator.email.length > 0"
            >
              {{ validator.email }}
            </span>

            <div class="pass-input" v-if="registerItems['2']">
              <div class="pass-hints" v-show="showPassHints">
                <div
                  :class="[
                    'hints-label',
                    form.password.length > 7 && form.password.length < 17
                      ? 'good'
                      : '',
                  ]"
                >
                  <i
                    :class="[
                      form.password.length > 7 && form.password.length < 17
                        ? 'el-icon-circle-check'
                        : 'el-icon-close',
                    ]"
                  ></i>
                  <span>{{ $tt("password_length") }}</span>
                </div>
                <div
                  :class="[
                    'hints-label',
                    /[a-z]/.test(form.password) && /[A-Z]/.test(form.password)
                      ? 'good'
                      : '',
                  ]"
                >
                  <i
                    :class="[
                      /[a-z]/.test(form.password) && /[A-Z]/.test(form.password)
                        ? 'el-icon-circle-check'
                        : 'el-icon-close',
                    ]"
                  ></i>
                  <span>{{ $tt("password_alphabet") }}</span>
                </div>
                <div
                  :class="[
                    'hints-label',
                    /\d/.test(form.password) ? 'good' : '',
                  ]"
                >
                  <i
                    :class="[
                      /\d/.test(form.password)
                        ? 'el-icon-circle-check'
                        : 'el-icon-close',
                    ]"
                    class=""
                  ></i>
                  <span>{{ $tt("password_number") }}</span>
                </div>
              </div>
              <div class="text-input">
                <div class="pass">
                  <input
                    v-if="showPassword"
                    type="text"
                    v-model="form.password"
                    placeholder=" "
                    @focus="showPassHints = true"
                    @blur="
                      (v) => {
                        showPassHints = false;
                        validateFormInput();
                      }
                    "
                  />
                  <input
                    v-else
                    type="password"
                    v-model="form.password"
                    placeholder=" "
                    @focus="showPassHints = true"
                    @blur="
                      (v) => {
                        showPassHints = false;
                        validateFormInput();
                      }
                    "
                  />
                  <label>{{ $tt("password") }}</label>
                  <i
                    class="fas"
                    :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                    @click="toggleShow()"
                  ></i>
                </div>
              </div>
            </div>
            <span
              class="error-input"
              v-if="validator.password != null && validator.password.length > 0"
            >
              {{ validator.password }}
            </span>

            <!-- <div class="text-input">
              <div class="dob-row">
                <el-select v-model="form.year" :popper-append-to-body="false">
                  <el-option
                    v-for="item in form.yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="form.month" :popper-append-to-body="false">
                  <el-option
                    v-for="item in form.monthList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="form.day" :popper-append-to-body="false">
                  <el-option
                    v-for="item in form.dayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <label class="select-active">Date Of Birth</label>
            </div> -->

            <!-- <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Date of Birth"
              prefix-icon="null"
            /> -->
            <div class="text-input" v-if="registerItems['4']">
              <input type="text" v-model="form.promote" placeholder=" " />
              <label>{{ $tt("code") }}</label>
            </div>

            <!-- wallet -->
            <div class="text-input">
              <div class="wallet-row">
                <select id="currencySelect" v-model="form.defaultCurrency" @change="handleWalletUnit">
                  <option
                    v-for="(item, index) in getUserCoinInfo"
                    :key="index"
                    :value="item.currencyName"
                    :data-key="JSON.stringify(item)"
                  >
                    {{ item.currencyName }}
                  </option>
                </select>
                <label :class="form.defaultCurrency != '' ? 'select-active' : ''">
                  {{ $t('default_currency') }}
                </label>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom-end"
                  popper-class="reg-tooltip"
                >
                  <div class="tooltip-slot" slot="content">
                    <div class="ul">
                      <li>{{ $tt("currency_tooltip.tooltip_1") }}</li>
                      <li>{{ $tt("currency_tooltip.tooltip_2") }}</li>
                      <li>{{ $tt("currency_tooltip.tooltip_3") }}</li>
                      <li>{{ $tt("currency_tooltip.tooltip_4") }}</li>
                    </div>
                  </div>
                  <QuestionOutline class="tooltip-label" />
                </el-tooltip>
              </div>
            </div>
            <span class="error-input" v-if="validator.defaultCurrency != null">
              {{ validator.defaultCurrency }}
            </span>
            <!-- wallet -->

            <div
              class="signBtn"
              :class="[isValid ? 'active' : 'inactive']"
              @click="register"
            >
              <span v-if="!loading">{{ $tt("get_started") }}</span>
              <span v-if="loading"><i class="el-icon-loading"></i></span>
              <img
                v-if="!loading"
                class="arrow"
                src="~/assets/img/arrow.svg"
                alt=""
              />
            </div>
          </div>
          <div class="footer">
            <div class="text">
              {{ $tt("sign_in_tnc_1") }}
              <el-link type="info" :underline="false">{{
                $tt("privacy_policy")
              }}</el-link>
              {{ $tt("and") }}
              <el-link type="info" :underline="false">{{
                $tt("term_of_service")
              }}</el-link>
              {{ $tt("apply") }}
            </div>
            <!-- <el-divider class="web">
              <p>{{ $tt("or") }}</p>
            </el-divider> -->
            <!-- <div class="row web">
              <div class="otherLogin web">
                <img src="~/assets/img/google.svg" alt="" />
              </div>
              <div class="otherLogin web">
                <img src="~/assets/img/steam.svg" alt="" />
              </div>
              <div class="otherLogin web">
                <img src="~/assets/img/twitch.svg" alt="" />
              </div>
            </div> -->
            <div class="text web">
              {{ $tt("have_account") }}
              <el-link
                class="text-terms"
                type="info"
                :underline="false"
                @click="closeModal('login')"
              >
                {{ $tt("sign_in") }}</el-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aes from "@/utils/aes.js";
import { mapGetters } from "vuex";
import QuestionOutline from "@/assets/img/QuestionOutline.vue";

export default {
  name: "Register",
  components: {
    QuestionOutline,
  },
  data() {
    return {
      value1: "",
      rules: "",
      form: {
        email: "",
        password: "",
        year: "1952",
        month: "jan",
        day: "01",
        yearList: [
          { value: "1952", label: "1952" },
          { value: "1953", label: "1953" },
        ],
        monthList: [
          { value: "jan", label: "Jan" },
          { value: "feb", label: "Feb" },
        ],
        dayList: [
          { value: "01", label: "01" },
          { value: "02", label: "02" },
        ],
        code: "",
        username: "",
        phone: "",
        countryCode: "",
        promote: "",
        defaultCurrency: "",
        proxyCode: "",
      },
      showPassword: false,
      loading: false,
      /* validator */
      validator: {
        username: "",
        email: "",
        password: "",
        defaultCurrency: null,
      },
      isValid: false,
      /* password hints */
      showPassHints: false,
      /* Map */
      registerItems: null,
      registerRequiredItems: null,
      /* tel input */
      option: {
        inputOptions: {
          placeholder: " ",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getChannelInfo", "getRegisterConfig", "getUserCoinInfo"]),
  },
  mounted() {
    this.form.code = this.code;
    /* get refer code */
    var urlCode = this.$nuxt.$route.query.code;
    var proxyCode = this.$nuxt.$route.query.proxyCode;
    if (urlCode) {
      this.form.promote = urlCode;
    }
    if (proxyCode) {
      this.form.proxyCode = proxyCode;
    }
    this.initForm();
  },
  methods: {
    initForm() {
      if (this.getRegisterConfig == null) {
        return false;
      }
      var regtype = this.getRegisterConfig;
      this.registerItems = {};
      this.registerRequiredItems = {};
      var items = regtype.registerItem.split(",");
      var requiredItems = regtype.requiredItem.split(",");
      for (let index = 0; index < 6; index++) {
        this.registerItems[`${index + 1}`] = items.includes(`${index + 1}`);
        this.registerRequiredItems[`${index + 1}`] = requiredItems.includes(
          `${index + 1}`
        );
      }
      // this.getUserIpCurrency();
    },
    closeModal(action) {
      this.$emit("close-modal", action);
      this.form = {
        email: "",
        password: "",
        username: "",
        phone: "",
        countryCode: "",
        promote: "",
        defaultCurrency: "",
        proxyCode: "",
      };
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    register() {
      if (this.loading || !this.isValid) {
        return false;
      }
      this.loading = true;

      this.$api
        .requestByPost("/hall/v2/user/registerUser", {
          name: this.form.username,
          email: this.form.email,
          password: this.form.password,
          promote: this.form.promote,
          phone: this.form.countryCode + this.form.phone,
          proxyCode: this.form.proxyCode,
          // currencyId: this.form.defaultCurrency,
        })
        .then((result) => {
          const { code, msg, data } = result;
          this.loading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          this.$notify({
            title: "Success",
            message: msg,
            type: "success",
            duration: 2000,
          });
          this.closeModal("register");
          const { token, socket } = data;
          if (token) {
            this.$AdjustEvent.registerSuccess();
            aes.dealKeys(token.key);
            this.$store.dispatch("updateIslogin", token.access_token);
            localStorage.setItem("socket", socket);
            window.initAppSocket && window.initAppSocket();
            this.$store.dispatch("getUserInfo");
            this.$store.dispatch("getWalletList");
            this.$store.dispatch("getUnreadEmailCount");
            this.$store.dispatch("getUnreadNoticeCount");
            this.closeModal("closeAll");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    validateFormInput() {
      let valid = true;
      let emailFormat = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
      let passwordFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,16}$/g;
      // check nickname required
      if (this.registerRequiredItems["6"]) {
        if (this.form.username.length == 0) {
          this.validator.username = this.$tt("validator.username.required");
          valid = false;
        } else if (this.form.username.length < 6) {
          this.validator.username = this.$tt("validator.username.min");
          valid = false;
        } else if (this.form.username.length > 12) {
          this.validator.username = this.$tt("validator.username.max");
          valid = false;
        } else {
          this.validator.username = "";
        }
      } else {
        this.validator.username = "";
      }
      // check phone
      if (this.registerRequiredItems["3"]) {
        if (this.form.phone.length == 0) {
          this.validator.phone = this.$tt("validator.profile.phone");
          valid = false;
        } else {
          this.validator.phone = "";
        }
      } else {
        this.validator.phone = "";
      }
      // check email required
      if (this.registerRequiredItems["1"]) {
        if (this.form.email.length == 0) {
          this.validator.email = this.$tt("validator.email.required");
          valid = false;
        } else if (!this.form.email.match(emailFormat)) {
          this.validator.email = this.$tt("validator.email.format");
          valid = false;
        } else {
          this.validator.email = "";
        }
      } else {
        this.validator.email = "";
      }

      // check password required
      if (this.registerRequiredItems["2"]) {
        if (this.form.password == null || this.form.password.length == 0) {
          this.validator.password = this.$tt("validator.password.required");
          valid = false;
        } else if (this.form.password.length < 8) {
          this.validator.password = this.$tt("validator.password.min");
          valid = false;
        } else if (this.form.password.length > 16) {
          this.validator.password = this.$tt("validator.password.max");
          valid = false;
        } else if (!this.form.password.match(passwordFormat)) {
          this.validator.password = this.$tt("validator.password.format");
          valid = false;
        } else {
          this.validator.password = "";
        }
      } else {
        this.validator.password = "";
      }

      // check default currency
      if (
        this.form.defaultCurrency == null ||
        this.form.defaultCurrency == ""
      ) {
        this.validator.defaultCurrency = this.$tt(
          "validator.defaultCurrency.required"
        );
        valid = false;
      } else {
        this.validator.defaultCurrency = "";
      }

      this.isValid = valid;
      this.$nextTick();
    },
    countryChanged(obj) {
      this.form.countryCode = obj.dialCode;
    },
    handleWalletUnit(e) {
      var selected = document.getElementById("currencySelect");
      var key = selected.options[selected.selectedIndex];
      var value = key.getAttribute("data-key");

      // this.form.defaultCurrency = e.currencyName;
      this.$store.dispatch("updateCoinType", value);
      this.validateFormInput();
    },
    // getUserIpCurrency() {
    //   this.$api
    //     .requestByPost("/hall/v2/user/getUserIpCurrency")
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       this.loading = false;
    //       this.$notify({
    //         title: "Warning",
    //         message: error,
    //         type: "warning",
    //         duration: 2000,
    //       });
    //     });
    // },
  },
  watch: {
    getRegisterConfig(newValue, oldValue) {
      this.initForm();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/register.scss";
@import "/assets/scss/mobile/register.scss";

.reg-tooltip {
  .tooltip-slot {
    width: 270px;
  }
}
</style>
