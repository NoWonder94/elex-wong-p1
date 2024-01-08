<template>
  <div class="suspension">
    <AccountHeader title="SUSPEND ACCOUNT" />
    <div class="suspension-content">
      <div class="content-left web">
        <div class="left-item selected" @click="handleUrl('suspension')">
          <i class="fas fa-ban"></i>
          {{ $tt("suspension") }}
        </div>
      </div>
      <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
      <div v-else class="content-right">
        <div class="title">
          {{ $tt("suspend_account") }}
        </div>
        <div class="desc">
          {{ $tt("suspend_detail") }}
        </div>
        <div class="input">
          <el-input v-model="duration">
            <div class="label" slot="prefix">{{ $tt("duration") }}</div>
          </el-input>
        </div>
        <div class="desc">
          {{ $tt("min_suspension") }}
          <span class="white">{{ $tt("one_day") }}</span>
        </div>
        <div class="confirm" @click="submit" v-if="!isBtnLoading">
          {{ $tt("confirm") }}
        </div>
        <div class="confirm" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Suspension",
  meta: {
    auth: true,
  },
  data() {
    return {
      duration: 1,
      userid: "",
      isLoading: false,
      isBtnLoading: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.userid = this.user.id;
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    handleUrl(url) {
      window.newRouter(url);
    },
    submit() {
      this.isBtnLoading = true;
      this.$api
        .requestByPost("/hall/v2/user/updateUserStatus", {
          userId: this.userid,
          dayNum: this.duration,
        })
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
          } else {
            this.$notify({
              title: "Successful",
              message: msg,
              type: "success",
              duration: 2000,
            });
            this.$store.dispatch("updateIslogin", null);

            window.newRouter("/");
          }
        })
        .catch((error) => {
          this.isBtnLoading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/suspension.scss";
@import "/assets/scss/mobile/suspension.scss";
</style>
