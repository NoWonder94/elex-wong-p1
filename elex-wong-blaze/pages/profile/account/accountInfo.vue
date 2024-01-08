<template>
  <div class="account-info">
    <AccountHeader title="ACCOUNT INFO" />
    <div class="account-info-content">
      <div class="content-left web">
        <div class="left-item selected" @click="handleUrl('/accountInfo')">
          <i class="el-icon-user-solid"></i>
          {{ $tt("accountInfo") }}
        </div>
        <div class="left-item" @click="handleUrl('/personalInfo')">
          <i class="el-icon-tickets"></i>
          {{ $tt("personalInfo") }}
        </div>
      </div>
      <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
      <div v-else class="content-right">
        <div class="title">{{ $tt("account_info") }}</div>
        <div class="content-list">
          <div class="right-item">
            <el-input v-model="name" :disabled="true">
              <div class="label" slot="prefix">{{ $tt("username") }}</div>
              <div class="edit" slot="suffix" @click="edit('name')">
                {{ $tt("edit") }}
              </div>
            </el-input>
          </div>
          <div class="right-item">
            <el-input v-model="email" :disabled="true">
              <div class="label" slot="prefix">{{ $tt("email_address") }}</div>
              <div class="verification" slot="suffix">
                <img src="@/assets/img/verification.svg" />
              </div>
              <div class="edit" slot="suffix" @click="edit('email')">
                {{ $tt("edit") }}
              </div>
            </el-input>
          </div>
          <div class="right-item">
            <el-input v-model="password" :disabled="true">
              <div class="label" slot="prefix">
                {{ $tt("current_password") }}
              </div>
              <div class="edit" slot="suffix" @click="edit('password')">
                {{ $tt("edit") }}
              </div>
            </el-input>
          </div>
          <div class="right-item phone-input">
            <vue-tel-input
              v-model="phone"
              :disabled="true"
              v-bind="option"
              :defaultCountry="code"
            ></vue-tel-input>
            <div class="input-right">
              <div class="verification" slot="suffix">
                <img src="@/assets/img/verification.svg" />
              </div>
              <div class="edit" slot="suffix" @click="edit('phone')">
                {{ $tt("edit") }}
              </div>
            </div>
          </div>
          <div class="right-item">
            <el-input v-model="getCurrencyName" :disabled="true">
              <div class="label" slot="prefix">
                {{ $tt("default_currency") }}
              </div>
              <div class="tooltip" slot="suffix">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom-end"
                  popper-class="info-tooltip"
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
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- edit modal -->
    <el-dialog :visible.sync="dialogVisible" custom-class="account-dialog">
      <div class="dialog-content">
        <div class="name" v-if="type == 'name'">
          <div class="dialog-title">{{ $tt("edit_username") }}</div>
          <div class="dialog-input">
            <div class="input">
              <input type="text" v-model="chgName.name" placeholder=" " />
              <label> {{ $tt("username") }}</label>
            </div>
          </div>
        </div>
        <div class="chgEmail" v-if="type == 'email'">
          <div class="dialog-title">{{ $tt("edit_email") }}</div>
          <div class="dialog-input">
            <div class="input">
              <input type="text" v-model="chgEmail.email" placeholder=" " />
              <label> {{ $tt("email_address") }}</label>
            </div>
            <!-- <div class="input">
              <input
                type="password"
                v-model="chgEmail.password"
                placeholder=" "
              />
              <label>{{ $tt("current_password") }}</label>
            </div> -->
          </div>
        </div>
        <div class="password" v-if="type == 'password'">
          <div class="dialog-title">{{ $tt("edit_password") }}</div>
          <div class="dialog-input">
            <div class="input">
              <input
                v-if="showCurrentPassword"
                type="text"
                v-model="chgPassword.currentPassword"
                placeholder=" "
              />
              <input
                v-else
                type="password"
                v-model="chgPassword.currentPassword"
                placeholder=" "
              />
              <label>{{ $tt("current_password") }}</label>
              <i
                class="fas"
                :class="showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'"
                @click="toggleShow('currentPassword')"
              ></i>
            </div>
            <div class="input">
              <input
                v-if="showNewPassword"
                type="text"
                v-model="chgPassword.newPassword"
                placeholder=" "
              />
              <input
                v-else
                type="password"
                v-model="chgPassword.newPassword"
                placeholder=" "
              />
              <label>{{ $tt("new_password") }}</label>
              <i
                class="fas"
                :class="showNewPassword ? 'fa-eye-slash' : 'fa-eye'"
                @click="toggleShow('newPassword')"
              ></i>
            </div>
            <div class="input">
              <input
                v-if="showConfirmPassword"
                type="text"
                v-model="chgPassword.confirmPassword"
                placeholder=" "
              />
              <input
                v-else
                type="password"
                v-model="chgPassword.confirmPassword"
                placeholder=" "
              />
              <label>{{ $tt("repeat_new_password") }}</label>
              <i
                class="fas"
                :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
                @click="toggleShow('confirmPassword')"
              ></i>
            </div>
          </div>
        </div>
        <div class="phone" v-if="type == 'phone'">
          <div class="dialog-title">{{ $tt("edit_phone_number") }}</div>
          <div class="dialog-input">
            <div class="input">
              <vue-tel-input
                v-model="chgPhone.phone"
                v-bind="option"
                @country-changed="countryChanged"
              ></vue-tel-input>
              <div div class="country-code">+{{ chgPhone.code }}</div>
            </div>
          </div>
        </div>
        <div class="dialog-button" @click="confirm" v-if="!isBtnLoading">
          {{ $tt("save") }}
        </div>
        <div class="dialog-button" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import QuestionOutline from "@/assets/img/QuestionOutline.vue";
export default {
  name: "AccountInfo",
  components: {
    QuestionOutline,
  },
  meta: {
    auth: true,
  },
  data() {
    return {
      option: {
        inputOptions: {
          placeholder: " ",
        },
      },
      name: "",
      email: "",
      password: "***********",
      phone: "",
      type: "",
      dialogVisible: false,
      chgName: {
        name: "",
      },
      chgEmail: {
        email: "",
        password: "",
      },
      chgPassword: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      chgPhone: {
        code: "",
        phone: "",
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      isBtnLoading: false,
      data: {},
      code: "",
      defaultCurren: null,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.name = this.user.name;
      this.email = this.user.email;
      if (this.user.phone != null) {
        this.phone = "+" + this.user.phone;
        this.code = this.user.phone.split(" ")[0];
      }
      this.defaultCurren = this.user.defaultCurrency;
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/profile/account" + url);
    },
    edit(type) {
      this.type = type;
      this.dialogVisible = true;
    },
    toggleShow(type) {
      switch (type) {
        case "currentPassword":
          this.showCurrentPassword = !this.showCurrentPassword;
          break;
        case "newPassword":
          this.showNewPassword = !this.showNewPassword;
          break;
        case "confirmPassword":
          this.showConfirmPassword = !this.showConfirmPassword;
          break;
        default:
          break;
      }
    },
    confirm() {
      if (this.type == "password") {
        this.changePassword();
      } else {
        this.checkInput();
      }
    },
    changePassword() {
      if (this.chgPassword.confirmPassword === this.chgPassword.newPassword) {
        this.$api
          .requestByPost("/hall/v2/user/updatePassword", {
            userName: this.user.userName,
            oldPassword: this.chgPassword.currentPassword,
            newPassword: this.chgPassword.newPassword,
          })
          .then((result) => {
            this.loading = false;
            const { code, msg, data } = result;
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

            this.chgPassword.currentPassword = "";
            this.chgPassword.newPassword = "";
            this.chgPassword.confirmPassword = "";
            this.dialogVisible = false;
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
      } else {
        this.$notify({
          title: "Warning",
          message: this.$tt("validator.password.password_not_same"),
          type: "warning",
          duration: 2000,
        });
      }
    },
    warning(message) {
      this.$notify({
        title: "Warning",
        message: message,
        type: "warning",
        duration: 2000,
      });
    },
    checkInput() {
      switch (this.type) {
        case "name":
          if (this.chgName.name == "") {
            this.warning(this.$tt("validator.profile.name"));
            return false;
          }
          this.data = {
            name: this.chgName.name,
          };
          break;
        case "email":
          if (this.chgEmail.email == "") {
            this.warning(this.$tt("validator.profile.email"));
            return false;
          }
          this.data = {
            email: this.chgEmail.email,
          };
          break;
        case "phone":
          if (this.chgPhone.phone == "") {
            this.warning(this.$tt("validator.profile.phone"));
            return false;
          }
          this.data = {
            phone: this.chgPhone.code + " " + this.chgPhone.phone,
          };
          break;
        default:
          break;
      }
      this.changeInfo();
    },
    changeInfo() {
      this.isBtnLoading = true;
      this.$api
        .requestByPost("/hall/v2/user/updateUserInfo", this.data)
        .then((result) => {
          const { code, msg, data } = result;
          this.isBtnLoading = false;
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

          this.$store.dispatch("getUserInfo");
          if (this.type == "name") {
            this.name = this.chgName.name;
            this.chgName.name = "";
          } else if (this.type == "email") {
            this.email = this.chgEmail.email;
            this.chgEmail.email = "";
          } else if (this.type == "phone") {
            this.phone = "+" + this.chgPhone.code + " " + this.chgPhone.phone;
            this.chgPhone.phone = "";
          }
          this.dialogVisible = false;
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
    countryChanged(obj) {
      this.chgPhone.code = obj.dialCode;
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["getUserCoinInfo"]),

    getCurrencyName() {
      // this.user.defaultCurrency = "1001";
      if (
        this.user == null ||
        this.user.defaultCurrency == null ||
        this.getUserCoinInfo == null
      ) {
        return "-";
      }
      var map = {};
      for (let index = 0; index < this.getUserCoinInfo.length; index++) {
        const element = this.getUserCoinInfo[index];
        map[element.currencyId] = element;
      }
      if (map[this.user.defaultCurrency]) {
        return map[this.user.defaultCurrency].currencyName;
      }
      return "-";
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/accountInfo.scss";
@import "/assets/scss/mobile/accountInfo.scss";

.info-tooltip {
  .tooltip-slot {
    width: 270px;
  }
}
</style>
