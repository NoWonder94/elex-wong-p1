<template>
  <div class="user">
    <div class="user-title web">
      {{ $t("user.userProfile") }}
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("user.userProfile") }}
    </div>
    <div class="user-wrapping-mobile" v-if="user">
      <div class="user-profile-image-container">
        <div class="user-profile-image" v-if="user.avatar != ''">
          <img :src="user.avatar" />
        </div>
        <div class="user-profile-image" v-else>
          <img src="../../assets/img/default_pic2.png" />
        </div>
        <div class="user-upload-btn">
          <input type="file" @change="submitFile" ref="file" hidden />
          <button @click="selectFile">
            <img src="../../assets/img/camera.svg" />
          </button>
        </div>
      </div>
      <div class="user-profile-form">
        <el-form ref="profileform">
          <el-form-item :label="$t('user.nickName')" prop="name">
            <el-input
              v-model="name"
              :placeholder="$t('user.plsEnterName')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.dateOfBirth')" prop="birthday">
            <el-date-picker
              type="date"
              :placeholder="$t('dateFilter.pickDate')"
              v-model="birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('user.gender')" prop="gender">
            <el-radio-group v-model="gender" class="radioImg">
              <el-radio-button label="1">
                <div>
                  <img
                    height="50"
                    width="50"
                    src="../../assets/img/male.svg"
                    key="1"
                  />
                </div>
                <div>{{ $t("user.male") }}</div>
              </el-radio-button>
              <el-radio-button label="0">
                <div>
                  <img
                    height="50"
                    width="50"
                    src="../../assets/img/female.svg"
                    key="0"
                  />
                </div>
                <div>{{ $t("user.female") }}</div>
              </el-radio-button>
              <el-radio-button label="-1">
                <div>
                  <img
                    height="50"
                    width="50"
                    src="../../assets/img/keepsecret.svg"
                    key="-1"
                  />
                </div>
                <div>{{ $t("user.keepSecret") }}</div>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="button">
            <el-button
              type="primary"
              @click="updateUserProfile"
              :loading="isLoading"
              >{{ $t("user.updateProfile") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  // head() {
  //   return {
  //     title: this.$t("user.userProfile"),
  //   };
  // },
  data() {
    return {
      isLoading: false,
      imageUpload: null,
      signUrl: null,
      imageUrl: null,
      name: "",
      birthday: "",
      gender: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    setTimeout(() => {
      this.name = this.user.nick_name;
      this.birthday = this.user.live_data.birthday;
      this.gender = this.user.gender;
    }, 500);
  },
  methods: {
    selectFile() {
      this.$refs.file.click();
    },
    async submitFile() {
      this.imageUpload = this.$refs.file.files[0];
      var result = await this.$api.requestByPost("Resource/image", null);
      if (result.status == true) {
        this.imageUrl = result.data.image_url;
        this.signUrl = result.data.sign_url;
        if (this.signUrl) {
          var buffer = await this.imageUpload.arrayBuffer();
          var image = new Uint8Array(buffer);
          axios
            .put(this.signUrl, this.imageUpload, {
              headers: {
                "Content-Type": this.imageUpload.type,
                Accept: "*/*",
              },
            })
            .then((result) => {
              if (result.status == 200) {
                this.updateUserProfileAvatar();
              }
            });
        }
      }
    },
    updateUserProfileAvatar() {
      let params = { avatar: this.imageUrl };
      this.$api
        .requestByPost("User/update", params)
        .then((result) => {
          if (result.status == true) {
            this.getUser();
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    updateUserProfile() {
      let params = {
        nick_name: this.name,
        birthday: parseInt(this.birthday / 1000),
        gender: this.gender,
      };
      this.$api
        .requestByPost("User/update", params)
        .then((result) => {
          if (result.status == true) {
            this.getUser();
            this.$notiflix.Notify.success(this.$t("message.success"), {
              showOnlyTheLastOne: true,
            });
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result == false) {
            return;
          }
          this.$store.dispatch("updateUserInfo", result.data);
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/user.scss";
@import "/assets/scss/mobile/user.scss";
</style>
