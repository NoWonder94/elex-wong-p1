<template>
  <div class="personal-info">
    <AccountHeader title="PERSONAL INFO" />
    <div class="personal-info-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/accountInfo')">
          <i class="el-icon-user-solid"></i>
          {{ $tt("accountInfo") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/personalInfo')">
          <i class="el-icon-tickets"></i>
          {{ $tt("personalInfo") }}
        </div>
      </div>
      <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
      <div v-else class="content-right">
        <div class="title">
          {{ $tt("personal_info") }}
        </div>
        <div class="content-list">
          <div class="right-item">
            <input type="text" v-model="firstName" placeholder=" " />
            <label>{{ $tt("first_name") }}</label>
          </div>
          <div class="right-item">
            <input type="text" v-model="lastName" placeholder=" " />
            <label>{{ $tt("last_name") }}</label>
          </div>
          <div class="right-item dob">
            <el-date-picker
              v-model="dob"
              type="date"
              placeholder=" "
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <label class="select-active">{{ $tt("dob") }}</label>
          </div>
          <div class="right-item">
            <input type="text" v-model="address" placeholder=" " />
            <label>{{ $tt("street_address") }}</label>
          </div>
        </div>
        <div class="mobile-list">
          <div class="right-item">
            <select v-model="country">
              <option
                v-for="item in countryList"
                :key="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
            <label :class="country != '' ? 'select-active' : ''">{{
              $tt("country")
            }}</label>
          </div>
          <div class="right-item">
            <input type="text" v-model="state" placeholder=" " />
            <label>{{ $tt("state") }}</label>
          </div>
          <div class="right-item">
            <input type="text" v-model="city" placeholder=" " />
            <label>{{ $tt("city") }}</label>
          </div>
          <div class="right-item">
            <input type="text" v-model="postalCode" placeholder=" " />
            <label>{{ $tt("postal_code") }}</label>
          </div>
        </div>
        <div class="save-button" @click="submit" v-if="!isBtnLoading">
          {{ $tt("save") }}
        </div>
        <div class="save-button" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countryList from "~/static/json/country.json";
import { mapState } from "vuex";
export default {
  name: "PersonalInfo",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
      isBtnLoading: false,
      firstName: "",
      lastName: "",
      dob: "",
      address: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      countryList: countryList,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.firstName = this.user.firstName ?? "";
      this.lastName = this.user.lastName ?? "";
      this.dob = this.user.birthDate ?? "";
      this.address = this.user.streetAddress ?? "";
      this.country = this.user.country ?? "";
      this.state = this.user.state ?? "";
      this.city = this.user.city ?? "";
      this.postalCode = this.user.postalCode ?? "";
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/profile/account" + url);
    },
    submit() {
      var data = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.dob,
        streetAddress: this.address,
        country: this.country,
        state: this.state,
        city: this.city,
        postalCode: this.postalCode,
      };
      this.isBtnLoading = true;

      this.$api
        .requestByPost("/hall/v2/user/updateUserInfo", data)
        .then((result) => {
          const { code, data, msg } = result;
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
@import "/assets/scss/web/personalInfo.scss";
@import "/assets/scss/mobile/personalInfo.scss";
</style>
