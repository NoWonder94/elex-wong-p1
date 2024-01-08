<template>
    <div class="default">
      <client-only>
        <div class="home-container" v-if="isLogin">
          <el-container class="home-container-content">
            <el-aside width="200px" class="left-container">
              <el-menu
                :default-active="$route.path"
                :unique-opened="true"
                :router="true"
                >
                <div class="user-info">
                  <div class="user-icon-block">
                    <i class="user-icon el-icon-user-solid"></i>
                  </div>

                  <div class="user">
                    <span class="user-name">{{ user.xUsername }}</span>
                    <div class="user-balance">￥{{ user.coin }}</div>
                  </div>
                </div>

                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-s-grid front-icon"></i>
                    <span class="title-label"> 游戏 </span>
                  </template>
                  <el-menu-item index="/games/single">单一钱包</el-menu-item>
                  <el-menu-item index="/games/transfer">转账钱包</el-menu-item>
                </el-submenu>

                <el-menu-item index="/wallet">
                  <template slot="title">
                    <i class="el-icon-s-finance front-icon"></i>
                    <span class="title-label"> 钱包 </span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/history">
                  <template slot="title">
                    <i class="el-icon-s-order front-icon"></i>
                    <span class="title-label"> 消耗列表 </span>
                  </template>
                </el-menu-item>

                <el-menu-item @click="logout">登出</el-menu-item>
              </el-menu>
            </el-aside>

            <el-container class="right-container">
              <Nuxt />
            </el-container>
          </el-container>
        </div>

        <div v-else>
          <Nuxt />
        </div>
      </client-only>
    </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {
    name: 'Default',
    data() {
      return {

      }
    },

    computed: mapState(['isLogin', 'user']),

    mounted () {
      this.init();
    },

    methods: {
      init() {
        var authToken = localStorage.getItem("authToken");
        if (!authToken) {
          this.getToken();
        } else {
          this.getUser();
        }
      },

      getToken() {
        this.$api
          .requestByPost("api/App/token?client=pc")
          .then((result) => {
            if (result.status == true) {
              if (result.data.token) {
                localStorage.setItem("baseToken", result.data.token);
              }
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
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      getUser() {
        this.$api
          .requestByPost("user/User/info")
          .then((result) => {
            if (result.status == true) {
              /* store update */
              this.$store.dispatch("updateUserInfo", result.data);

            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      logout() {
        this.$store.dispatch("updateUserInfo", {});
        localStorage.removeItem('authToken');
        this.$router.push('/login');
      }

    },
  }
</script>
<style lang="scss" type="text/css">
  @import "/assets/scss/pc/default.scss";
  @import "/assets/scss/mobile/default.scss";
</style>
