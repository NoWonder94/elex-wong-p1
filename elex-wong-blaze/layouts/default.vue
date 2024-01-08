<template>
  <client-only>
    <div>
      <Header @is-collapsed="isShowCollapsed" />
      <section>
        <LeftBar :is-collapsed="isCollapsed" />
        <MobileLeftbar
          @handle-close="isShowMobileNav"
          :isShowMobileNav="isMobileNavShow"
        />
        <div class="page-container" id="top">
          <Nuxt v-if="!loading" />
          <Footer v-if="showFooter" />
        </div>
        <MobileNav
          @handle-mobileNav="isShowMobileNav"
          @handleSearch="isShowSearch"
        />
        <Search
          v-if="!loading"
          @handleClose="isShowSearch"
          navSearch="true"
          :isShowSearch="isSearchShow"
        />
        <Register
          v-if="showRegisterModal"
          @close-modal="showRegisterModal = false"
        />
      </section>
      <Maintainance v-if="isMaintainence" />
      <!-- <SplashComponents v-if="isShowSplash" /> -->
    </div>
  </client-only>
</template>
<script>
import aes from "@/utils/aes.js";
import MobileLeftbar from "../components/MobileLeftbar.vue";
import Register from "~/pages/register.vue";
import { hallBetSection, getChannelId } from "@/api/api";
import gtm from "@/utils/gtm.js";
import Cookie from "js-cookie";
import Maintainance from "../components/Maintainance.vue";
// import SplashComponents from "../components/SplashComponents.vue";

export default {
  scrollToTop: true,
  name: "Default",
  data() {
    return {
      headTitle: "",
      headFavicon: "",
      socket: null,
      gameArr: [
        {
          id: 90006,
          commit: "LIMB_ORDER",
        },
        {
          id: 90004,
          commit: "WHEEL_ORDER",
        },
        {
          id: 90005,
          commit: "Classic_Dice_ORDER",
        },
        {
          id: 90007,
          commit: "Ultimate_Dice_ORDER",
        },
        {
          id: 90003,
          commit: "KENO_SIGN_ORDER",
        },
        {
          id: 90008,
          commit: "Hash_Dice_ORDER",
        },
        {
          id: 90001,
          commit: "Mines_ORDER",
        },
        {
          id: 90010,
          commit: "Keno",
        },
      ],
      isCollapsed: false,
      showFooter: true,
      isMobileNavShow: false,
      isSearchShow: false,
      /* register */
      showRegisterModal: false,
      loading: true,

      /**Maintaince */
      isMaintainence: false,

      /** */
      isShowSplash: true,
    };
  },
  head() {
    return {
      title: this.headTitle,
      link: [
        {
          hid: "icon",
          rel: "icon",
          type: "image/x-icon",
          href: this.headFavicon,
        },
      ],
    };
  },
  components: { MobileLeftbar, Register, Maintainance },
  created() {
    this.isShowSplash = true;
  },
  async mounted() {
    var result = await this.initSiteSettings();
    if (result) {
      this.isShowFooter();
      this.init();
      this.getHallBetSection();
      window.newRouter = this.pushRoute;
      window.initAppSocket = this.initAppSocket;
      window.showMaintaince = this.toggleMaintainance;
      this.initAppSocket();
      this.loading = false;
      setTimeout(() => {
        this.isShowSplash = false;
      }, 2000);
    }
  },
  methods: {
    toggleMaintainance(v) {
      this.isMaintainence = v;
    },
    async initSiteSettings() {
      var result = await fetch(
        "https://blazezd.gersonsupport.cn/api/App/getHost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hostname: window.location.hostname,
          }),
        }
      )
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status == false) {
            return false;
          }
          var siteSettings = result.data;
          if (siteSettings) {
            this.$config.channel_id = siteSettings.channel_id;
            this.$config.endpoint_url = siteSettings.endpoint_url;
            this.$config.ws_url = siteSettings.ws_url;
            this.$config.encryption =
              siteSettings.encryption == 1 ? true : false;
            // init GTM
            var channelData = await getChannelId();
            if (channelData != null && channelData.data.info != null) {
              this.$store.commit("SET_CHANNEL_INFO", channelData.data.info);
              this.$store.commit("SET_CHANNEL_CONFIG", channelData.data.config);
              if (this.$config.gtm_id) {
                gtm(this.$config.gtm_id);
              }
              this.$config.site_name = this.headTitle =
                channelData.data.info.abbreviation;
              this.$config.display_url = channelData.data.info.name;
              this.headFavicon = channelData.data.info.logoMini;
              Cookie.set("logo_url", channelData.data.info.logoSmall);
              Cookie.set("mini_logo_url", channelData.data.info.logoMini);
            }
            return true;
          } else {
            return false;
          }
        });

      return result;
    },
    pushRoute(path) {
      this.$router.push(this.localePath(path));
    },
    getHallBetSection(id) {
      hallBetSection({ channelId: id }).then((res) => {
        if (res && res.code == 200) {
          localStorage.setItem("BetSection", JSON.stringify(res.rows));
        }
      });
    },
    initAppSocket() {
      // console.log("initAppSocket:", window.server.SERVER_SOCKET_HALL);
      let t = this;
      if (this.socket) {
        this.socket.close && this.socket.close();
      }
      this.socket = new this.$Socket({
        url: `${this.$config.ws_url}/hall/ws/`,
        heartMsg: null,
        isLogin: true,
      });
      let flag = true;
      let timer = null;
      this.socket.on("connect", () => {
        this.socket.send({ content: {}, contentType: 51 });
        // timer && clearInterval(timer)
        // timer = setInterval(()=>{
        //     if(!flag){
        //         this.$notify({
        //             title: this.$t("socket.reconnect01"),
        //             dangerouslyUseHTMLString: true,
        //             message: `<div class="network-tip"><p>${this.$t("socket.reconnect02")}</p>
        //             <button class="reconnectSocket" >${this.$t("socket.reconnect03")}</button></div>`,
        //             position: 'bottom-left',
        //             customClass:"tipsSocket"
        //         });
        //         let reconnectBtn = document.querySelector('.reconnectSocket')
        //         reconnectBtn && reconnectBtn.addEventListener('click',()=>{
        //             // console.log('retry')
        //             window.initAppSocket();
        //             window.initCrashSocket()
        //             window.initKenoSocket()
        //         })
        //     }else{
        //         flag = false;
        //     }
        // },10000)
      });
      this.socket.on("message", (data) => {
        flag = true;
        let _data = JSON.parse(data);
        let _content = JSON.parse(_data.content || "{}");
        // let yourMeeasge = {
        //     time: _content.createTime,
        //     msg: _content.message || null,
        //     contentType: _content.contentType,
        //     src: _content.sendAvatar,
        //     vipLevel: _content.vipLevel,
        //     username: _content.sendUser || _content.userName,

        //     // redBag
        //     currencyId: _content.currencyId || null,
        //     redMoney: _content.redMoney || null,
        //     redNum: _content.redNum || null,
        //     remainMoney: _content.remainMoney || null,
        //     remainNum: _content.remainNum || null,
        //     remark: _content.remark || null,
        //     userId: _content.userId || null,
        //     appointUserId: _content.appointUserId || null,
        //     redId: _content.id || null,
        //     redStatus: _content.status || undefined,
        //     redType: _content.type || null,
        // };
        if (
          Object.values(_content).length !== 0 &&
          _content.online &&
          _content.online !== undefined
        ) {
          this.$store.commit("CHAT_ONLIN", _content.online);
        }

        switch (_data.contentType) {
          case 1: //聊天文字
            if (_content.vipLevel < 2) {
              this.$message({ type: "warning", message: _data.msg });
            } else {
              this.$store.commit("CHAT_MSG", _content);
              // console.log(_content, 'yourMeeasge');
            }
            break;

          case 4: //红包消息
            this.$store.commit("CHAT_MSG", _content);
            break;
          case 17: //赔率大于3的消息
            this.$store.commit("CHAT_MSG", _content);
            break;
          case 19: //首充充值了
            this.$store.commit("FIRST_CHARGED", true);
            break;
          case 8:
            // eslint-disable-next-line no-case-declarations
            let noticeMes = JSON.parse(_data.content);

            this.$store.commit("Notice_Mes", noticeMes);
            break;
          case 9:
            let mailStatus = JSON.parse(_data.content);
            this.$store.commit("mail_status", mailStatus);
            break;
          case 12:
            break;
          case 51: //第一次未登录时获取默认的货币
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
              return;
            }
            if (JSON.parse(_data.content).wallet) {
              setTimeout(() => {
                const wallet = JSON.parse(_data.content).wallet;
                let coinsInfo = wallet[0];
                coinsInfo.icon = coinsInfo.currencyIcon;
                // t.$store.commit("USER_COIN_CHANGE", coinsInfo);
                t.$store.commit("GET_USER_COIN", wallet);
              }, 300);
            } else {
              // let datans = JSON.parse(_data.content);
              // let coinLists = t.$store.state.coinList;
              // t.$store.commit("WALL_TYPE", datan.type);
              // coinLists.forEach((element) => {
              //   if (element.id == datan.currencyId) {
              //     element["money"] = datans["money"];
              //   }
              // });
              // t.$store.commit("GET_USER_COIN", coinLists);
            }

            break;
          case 13:
            // eslint-disable-next-line no-case-declarations
            let data = JSON.parse(_data.content);
            t.$store.commit("GAME_ORDER", data);
            if (data.playId == 90010) {
              let objs = t.sendGameOrder(data);
              // console.log(objs, 11111111111111111111);
              t.$store.commit(objs.commit, objs.data);
            }
            break;
          case 14:
            // eslint-disable-next-line no-case-declarations
            let game = JSON.parse(_data.content);
            // eslint-disable-next-line no-case-declarations
            let obj = t.sendGameOrder(game);
            t.$store.commit(obj.commit, obj.data);
            break;
          case 50:
            // eslint-disable-next-line no-case-declarations

            let datan = JSON.parse(_data.content);
            // eslint-disable-next-line no-case-declarations
            let coinList = t.$store.state.coinList;
            let user_coin = t.$store.state.user_coin;
            t.$store.commit("WALL_TYPE", datan.type);
            coinList.forEach((element) => {
              if (element.currencyId == datan.currencyId) {
                element["money"] = datan["money"];
                if (datan["lockMoney"]) {
                  element["lockMoney"] = datan["lockMoney"];
                }
              }
            });
            if (user_coin != null && datan.currencyId == user_coin.currencyId) {
              user_coin["money"] = datan["money"];
              if (datan["lockMoney"]) {
                user_coin["lockMoney"] = datan["lockMoney"];
              }
            }
            t.$store.commit("GET_USER_COIN", coinList);
            t.$store.commit("USER_COIN_CHANGE", user_coin);
            break;
          case 995:
            let contentInfo = JSON.parse(_data.content);
            this.$message({
              message: contentInfo.msg,
              type: "warning",
            });
            let lang = localStorage.getItem("lang");
            localStorage.clear();
            localStorage.setItem("lang", lang);
            this.$store.commit("SET_USER_ISLOGIN", false);
            window.location.reload();
          case 999:
            let currentTime = _data.time;
            if (currentTime > this.getNextLoginTime && this.getNextLoginTime) {
              this.$store.commit("SET_LOGINSTATUS", true);
            } else {
              this.$store.commit("SET_LOGINSTATUS", false);
            }
          default:
            break;
        }
      });
      this.socket.on("close", () => {
        console.log("close");
      });
    },
    isShowCollapsed(v) {
      this.isCollapsed = v;
    },
    isShowMobileNav(v) {
      this.isMobileNavShow = v;
    },
    isShowSearch(v) {
      this.isSearchShow = v;
    },
    isShowFooter() {
      if (this.$route.path.includes("/profile/profileMenu")) {
        this.showFooter = false;
      } else if (this.$route.path.includes("/rules/rulesMenu")) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    },
    init() {
      // this.$store.dispatch("getChannelInfo");
      let authToken = localStorage.getItem("authToken");
      let lang =
        localStorage.getItem("selected_language") ?? navigator.language;
      let enc = localStorage.getItem("enc");
      if (this.$config.encryption && authToken && enc == null) {
        localStorage.clear();
        this.$store.dispatch("updateIslogin", null);
        this.$store.dispatch("updateUserInfo", null);
        window.initAppSocket && window.initAppSocket();
        aes.systemDefKey();
        window.location.reload();
      } else if (authToken) {
        this.$store.dispatch("updateIslogin", authToken);
        this.$store.dispatch("getWalletList");
        this.$store.dispatch("getUserInfo");
        this.$store.dispatch("getUnreadEmailCount");
        this.$store.dispatch("getUnreadNoticeCount");
      }
      this.$store.dispatch("getRegisterConfig");
      this.$store.dispatch("getSportChannel");
      // default lang
      if (localStorage.getItem("selected_language") == null) {
        this.$store.dispatch("setDefaultLang", this.$i18n.locale);
      } else {
        this.$store.dispatch("updateLanguage", lang);
      }
      this.watchUrlRoute();
    },
    watchUrlRoute() {
      var urlType = this.$nuxt.$route.query.type;
      if (urlType == "referral") {
        this.showRegisterModal = true;
      }
    },
    sendGameOrder(data) {
      let obj = {};
      this.gameArr.forEach((element) => {
        if (element.id == data.playId) {
          obj.commit = element.commit;
          obj.data = data;
        }
      });
      return obj;
    },
  },
  watch: {
    $route() {
      this.isShowFooter();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
