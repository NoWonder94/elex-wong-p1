<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="content-section">
        <div class="inside-content-section">
          <div class="logo-and-social-account-section">
            <nuxt-link to="/">
              <img
                class="website-logo"
                :src="getChannelInfo.logoSmall"
                alt=""
              />
            </nuxt-link>
            <div class="social-media-account-list">
              <a
                v-for="(item, index) in socialList"
                :key="index"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <component
                  class="social-link"
                  v-bind:is="item.component"
                ></component>
              </a>
            </div>
          </div>
          <div class="link-containers">
            <div class="link-section">
              <h4>{{ $tt("helpful_link") }}</h4>
              <div class="link-child-menu-list">
                <!-- <div
                  class="child-menu-title"
                  @click="openPage('/Originals/Crash?playId=90009')"
                >
                  Crash
                </div> -->
                <!-- <div class="child-menu-title" @click="openPage('/')">
                  {{ $tt("_double") }}
                </div> -->
                <!-- <div class="child-menu-title" @click="openPage('/')">
                  {{ $tt("blaze_mirror") }}
                </div> -->
                <div
                  class="child-menu-title"
                  @click="openPage('/info/paymentMethods')"
                >
                  {{ $tt("payment_methods") }}
                </div>
                <div class="child-menu-title" @click="openPage('/rules/Crash')">
                  {{ $tt("_fairness") }}
                </div>
                <div class="child-menu-title" @click="openPage('/vip/vipClub')">
                  {{ $tt("vip_club") }}
                </div>
              </div>
            </div>
            <div class="link-section">
              <h4>{{ $tt("abount_us") }}</h4>
              <div class="link-child-menu-list">
                <div
                  class="child-menu-title"
                  @click="openPage('/info/TermsOfService')"
                >
                  {{ $tt("term_of_service") }}
                </div>
                <div
                  class="child-menu-title"
                  @click="openPage('/info/privacyPolicy')"
                >
                  {{ $tt("privacy_policy") }}
                </div>
                <div
                  class="child-menu-title"
                  @click="openPage('/info/bonusTerms')"
                >
                  {{ $tt("bonus_terms") }}
                </div>
                <div
                  class="child-menu-title"
                  @click="openPage('/info/welcomeBonus')"
                >
                  {{ $tt("welcome_bonus") }}
                </div>
                <div
                  class="child-menu-title"
                  @click="openPage('/info/responsibleGambling')"
                >
                  {{ $tt("responsible_gambling") }}
                </div>
                <!-- <div class="child-menu-title" @click="openPage('/')">
                  {{ $tt("faq") }}
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="content-section web-payment">
          <div class="icons-list">
            <div v-for="(icon, index) in icons" :key="index">
              <a v-if="icon.url != ''" :href="icon.url" target="_blank">
                <img
                  class="social-link"
                  :src="require(`@/assets/img/footerIcon/${icon.image}`)"
                />
              </a>
              <img
                v-else
                class="social-link"
                :src="require(`@/assets/img/footerIcon/${icon.image}`)"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="content-section">
          <div class="company-info-section">
            <a
              class="company-logo"
              href="https://licensing.gaming-curacao.com/validator/?lh=a7c899cdb221b6143db521fa37cf0474&rlh=8246e35ec01e754acf1b7529f3a3ef41"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="~/assets/img/gc.png" alt="" />
            </a>
            <div class="company-info-container">
              <div class="company-info">
                <p>
                  {{ $tt("company_info") }}
                  <a class="business-number" target="_blank" href="">
                    {{ $tt("business_number") }}</a
                  >
                  {{ $tt("company_address") }}
                </p>
                <p>
                  {{ $tt("warning") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="content-section web-copyright">
          <div class="copy-right">
            <div class="copyright-text">
              <p>{{ $tt("copyright") }}</p>
            </div>
            <div class="languages-list">
              <el-select
                v-model="selectedLanguage"
                style="width: 50px; margin-top: -5px"
                @change="setLanguage"
              >
                <el-option
                  v-for="language in languages"
                  :key="language.value"
                  :label="language.value"
                  :value="language.code"
                >
                  <div style="float: left; margin-top: 5px">
                    <img
                      class="dropdown-flag"
                      :src="`https://flagcdn.com/96x72/${language.flag}.png`"
                      alt=""
                    />
                  </div>
                  <div
                    style="
                      float: right;
                      margin-left: 20px;
                      color: #8492a6;
                      font-size: 13px;
                    "
                  >
                    {{ language.value }}
                  </div>
                </el-option>
              </el-select>
              <i class="fas fa-caret-down"></i>
            </div>
          </div>
          <p style="text-align: center; margin-top: 10px">v1.0.19</p>
        </div>
        <div class="content-section web-emails">
          <div class="emails-contact">
            <div class="emails-contact-row">
              <p class="emails-contact-type">{{ $tt("support") }}</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="$config.telegram"
                style="text-decoration: none; color: #ffffff"
              >
                <span>{{ $tt("support_email") }}</span>
              </a>
              <!-- <span class="emails-contact-separator">|</span> -->
            </div>
            <!-- <div class="emails-contact-row">
              <p class="emails-contact-type">{{ $tt("partners") }}</p>
              <span>{{ $tt("partners_email") }}</span>
              <span class="emails-contact-separator">|</span>
            </div>
            <div class="emails-contact-row">
              <p class="emails-contact-type">{{ $tt("legal") }}</p>
              <span>{{ $tt("legal_email") }}</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Twitter from "~/components/svg/Twitter.vue";
import Instagram from "~/components/svg/Instagram.vue";
import Facebook from "~/components/svg/Facebook.vue";
import Telegram from "~/components/svg/Telegram.vue";
import Email from "~/components/svg/Email.vue";
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  components: {
    Twitter,
    Instagram,
    Facebook,
    Telegram,
    Email,
  },
  data() {
    return {
      visibleLanguage: false,
      selectedLanguage: "en",
      languages: [
        { code: "pt", value: "Portuguese", flag: "pt" },
        { code: "es", value: "Spanish", flag: "es" },
        { code: "en", value: "English", flag: "gb" },
        // { code: "cn", value: "简体中文", flag: "google.svg" },
        // { code: "de", value: "German", flag: "google.svg" },
        // { code: "pl", value: "Polish", flag: "google.svg" },
        // { code: "fi", value: "Finnish", flag: "google.svg" },
        // { code: "no", value: "Norwegian", flag: "google.svg" },
        // { code: "it", value: "Italian", flag: "google.svg" },
        // { code: "jp", value: "Japanese", flag: "google.svg" },
        // { code: "fr", value: "French", flag: "google.svg" },
        // { code: "ru", value: "Russian", flag: "google.svg" },
        // { code: "el", value: "Greek", flag: "google.svg" },
        // { code: "sk", value: "Slovak", flag: "google.svg" },
        // { code: "hu", value: "Hungarian", flag: "google.svg" },
        // { code: "ro", value: "Romanian", flag: "google.svg" },
      ],
      icons: [
        { image: "visa.png", url: "" },
        { image: "master.png", url: "" },
        { image: "pix.svg", url: "" },
        { image: "btc.svg", url: "" },
        { image: "eth.svg", url: "" },
        { image: "doge.svg", url: "" },
        { image: "usdt.svg", url: "" },
        { image: "begamble.png", url: "" },
        { image: "eighteen.png", url: "" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getLanguage", "getChannelInfo", "getSocialConfig"]),
    socialList() {
      let arr = [];
      if (this.getSocialConfig != null && this.getSocialConfig.length > 0) {
        this.getSocialConfig.forEach((item) => {
          if (item.name == "facebook") {
            arr.push({
              component: Facebook,
              image: "facebook.png",
              url: item.jumpAddress,
            });
          } else if (item.name == "twitter") {
            arr.push({
              component: Twitter,
              image: "twitter.png",
              url: item.jumpAddress,
            });
          } else if (item.name == "instagram") {
            arr.push({
              component: Instagram,
              image: "instagram.png",
              url: item.jumpAddress,
            });
          } else if (item.name == "telegram") {
            arr.push({
              component: Telegram,
              image: "telegram.png",
              url: item.jumpAddress,
            });
          } else if (item.name == "email") {
            arr.push({
              component: Email,
              image: "email.png",
              url: "mailto:" + item.jumpAddress,
            });
          }
        });
      }
      return arr;
    },
  },
  mounted() {
    this.selectedLanguage = this.getLanguage;
  },
  methods: {
    openPage(route) {
      window.newRouter(route);
    },
    setLanguage(v) {
      this.$store.dispatch("updateLanguage", v);
    },
  },

  watch: {
    getLanguage(newValue, oldValue) {
      this.$forceUpdate();
      this.selectedLanguage = newValue;
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/footer.scss";
@import "/assets/scss/mobile/footer.scss";
</style>
