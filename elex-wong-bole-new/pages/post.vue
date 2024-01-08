<template>
  <div class="post template">
    <div class="post-template" v-loading="isLoading">
      <div v-show="isShow">
        <div class="post-container-web">
          <div class="post-content">
            <div class="post-date">
              {{ date }}
            </div>
            <div class="post-title">
              {{ title }}
            </div>
            <div class="post-desc" v-html="desc"></div>
            <div class="post-sub-container">
              <p>{{ this.$t("post.category") }}{{ category }}</p>
              <p>
                {{ this.$t("post.share") }}
                <ShareNetwork
                  v-for="network in networks"
                  :network="network.network"
                  :key="network.network"
                  :style="{
                    marginRight: '5px',
                  }"
                  :url="sharing.url"
                  :title="sharing.title"
                  :description="sharing.description"
                  :quote="sharing.quote"
                  :hashtags="sharing.hashtags"
                  :twitterUser="sharing.twitterUser"
                >
                  <i
                    :class="network.icon"
                    :style="{
                      color: network.color,
                    }"
                  ></i>
                </ShareNetwork>
              </p>
            </div>
          </div>
          <img class="post-img" :src="imgSrc" />
        </div>
        <div class="post-container-mobile">
          <div class="post-date">
            {{ date }}
          </div>
          <img class="post-img" :src="imgSrc" />
          <div class="post-content">
            <div class="post-title">
              {{ title }}
            </div>
            <div class="post-desc" v-html="desc"></div>
            <div class="post-sub-container">
              <div class="post-sub-container-content">
                <p>{{ this.$t("post.category") }}{{ category }}</p>
              </div>
              <div class="post-sub-container-content">
                <p>{{ this.$t("post.share") }}</p>
                <ShareNetwork
                  v-for="network in networks"
                  :network="network.network"
                  :key="network.network"
                  :style="{
                    marginRight: '0.5vw',
                  }"
                  :url="sharing.url"
                  :title="sharing.title"
                  :description="sharing.description"
                  :quote="sharing.quote"
                  :hashtags="sharing.hashtags"
                  :twitterUser="sharing.twitterUser"
                >
                  <i
                    :class="network.icon"
                    :style="{
                      color: network.color,
                    }"
                  ></i>
                </ShareNetwork>
              </div>
            </div>
          </div>
        </div>
        <div class="post-divider"></div>
        <div class="post-page-container">
          <div class="post-button-container" v-if="prevID != ''">
            <div class="post-button" @click="navigateToPage(prevID)">
              <div class="post-button-text">
                {{ $t("post.prev") }}
              </div>
              <div class="post-button-icon">
                <img src="../assets/img/up_black.png" />
              </div>
            </div>
            <p>
              {{ prevTopic }}
            </p>
          </div>
          <div class="post-button-container" v-if="nextID != ''">
            <div class="post-button" @click="navigateToPage(nextID)">
              <div class="post-button-text">
                {{ $t("post.next") }}
              </div>
              <div class="post-button-icon">
                <img src="../assets/img/down_black.png" />
              </div>
            </div>
            <p>
              {{ nextTopic }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Post",
  head() {
    return {
      title: this.title ? this.title : "post",
    };
  },
  data() {
    return {
      id: "0",
      title: "",
      desc: "",
      date: "",
      imgSrc: "",
      category: "",
      share: "",
      nextID: "",
      nextTopic: "",
      prevID: "",
      prevTopic: "",
      isLoading: true,
      isShow: false,

      sharing: {
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: "",
        twitterUser: "",
      },
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-square",
          color: "#1877f2",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter-square",
          color: "#1da1f2",
        },
      ],
    };
  },
  mounted() {
    this.getPostDetail();
  },
  methods: {
    getPostDetail() {
      this.isLoading = true;
      this.isShow = false;

      this.share = "";
      this.id = this.$route.query.id;
      if (!this.id || this.id < 1) {
        this.$router.push({
          path: this.localePath("/"),
        });
      }

      this.$api
        .request("Info/getDetail?id=" + this.id + "&lang=chi")
        .then(({ data }) => {
          this.title = data.content.title;
          this.desc = data.content.description;
          this.date = data.date_create;
          this.imgSrc = data.img;
          this.category = data.info_category_name;
          this.nextID = data.next.id;
          this.nextTopic = data.next.name;
          this.prevID = data.prev.id;
          this.prevTopic = data.prev.name;
          this.isLoading = false;
          this.isShow = true;

          //TODO:get domain name
          this.sharing.url = window.location.hostname + "/post?id=" + this.id;
          this.sharing.title = this.title;
          this.sharing.description = data.content.summary;
        })
        .catch((error) => {
          this.isLoading = false;
          this.isShow = true;
          this.$message.error(error ? error : this.$t("error"));
          this.$router.push({ path: this.localePath("/info") });
        });
    },
    navigateToPage(id) {
      this.$router.push({
        path: this.localePath("/post"),
        query: { id },
      });
    },
  },
  watch: {
    $route(to, from) {
      this.getPostDetail();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/post.scss";
@import "/assets/scss/mobile/post.scss";
</style>
