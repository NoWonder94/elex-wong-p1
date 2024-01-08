<template>
  <div class="post-details">
    <div class="post-details-container">
      <div class="post-details-grid">
        <div class="post-details-head">
          <div class="post-details-head-type">
            {{ $t("types." + this.type) }}
          </div>
          <div class="post-details-head-title">
            {{ content.title }}
          </div>
          <div class="post-details-head-writer">
            <div><img src="../assets/img/circle-logo.png" alt="Bit555" /></div>
            <div class="post-details-head-writer-body">
              <div><b>Bit555.io</b></div>
              <div
                class="post-details-head-date"
                v-if="content.create_time_datetime"
              >
                {{ content.create_time_datetime.split(" ")[0] | formatDate }}
              </div>
            </div>
          </div>
        </div>
        <div class="post-details-img-container">
          <img :src="content.img" />
          <!-- <div class="post-details-tags">Bit555-{{ content.tag }}</div> -->
        </div>
        <div class="post-details-content" v-html="content.description"></div>
      </div>
      <div class="post-details-others web">
        <div
          class="post-details-others-item"
          v-for="(item, index) in others"
          :key="index"
        >
          <template>
            <Post
              :title="item.title"
              :type="item.type"
              :description="item.description"
              :date="item.date"
              :image="item.image"
              :size="'small'"
            />
          </template>
        </div>
      </div>
      <div class="mobile">
        <div class="post-details-others">
          <div class="post-details-others-item">
            <template>
              <Post
                :title="others[0].title"
                :type="others[0].type"
                :description="others[0].description"
                :date="others[0].date"
                :image="others[0].image"
                :size="'small'"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Modal from "../components/Modal.vue";
export default {
  name: "PostDetails",
  head() {
    return {
      title: this.title ? this.title : this.$i18n.t("types." + this.type),
    };
  },
  data() {
    return {
      isLoading: true,
      id: 0,
      type: "",
      tempcontent: {
        id: 1,
        title: "Coming soon",
        type: "help",
        description:
          "This is Bit555.io, a brand new site by Bit555 that's just getting started. Things will be up and running here shortly, but you can <u>subscribe</u> in the meantime if you'd like to stay up to date and receive emails when new content is published!",
        create_time_datetime: "2022-06-14 03:05:10",
        img: require("../assets/img/help.png"),
        is_top: 0,
        link: "",
      },
      content: {},
      others: [
        {
          id: 1,
          title: "Coming soon",
          type: "help",
          description:
            "This is Bit555.io, a brand new site by Bit555 that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
          date: "May 26, 2022",
          image: require("/assets/img/help.png"),
          link: "",
        },
        {
          id: 2,
          title: "Coming soon",
          type: "help",
          description:
            "This is Bit555.io, a brand new site by Bit555 that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
          date: "May 26, 2022",
          image: require("/assets/img/help.png"),
          link: "",
        },
        {
          id: 3,
          title: "Coming soon",
          type: "help",
          description:
            "This is Bit555.io, a brand new site by Bit555 that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
          date: "May 26, 2022",
          image: require("/assets/img/help.png"),
          link: "",
        },
      ],
    };
  },
  computed: mapState(["isLogin"]),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      if (!this.id || this.id < 1 || this.type == "") {
        this.$router.push({ path: "/" });
      }

      //check which detail type to call the api
      if (this.type == "home") {
        this.getHomeDetail();
      } else if (this.type == "news") {
        this.getNewsDetail();
      } else if (this.type == "guides") {
        this.getGuidesDetail();
      } else if (this.type == "exchanges") {
        window.location.href = this.$globalParams.default.bit555_play_url;
      } else if (this.type == "price_tracker") {
        window.location.href = this.$globalParams.default.bit555_play_url;
      } else {
        this.content = this.tempcontent;
      }
    },
    getHomeDetail() {
      this.$api
        .requestByPost("Home/getDetail", { id: this.id })
        .then((result) => {
          if (result.status) {
            this.content = result.data;
            console.log(this.content.create_time_datetime.split(" ")[0]);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    getNewsDetail() {
      this.$api
        .requestByPost("News/getDetail", { id: this.id })
        .then((result) => {
          if (result.status) {
            this.content = result.data;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    getGuidesDetail() {
      this.$api
        .requestByPost("Guides/getDetail", { id: this.id })
        .then((result) => {
          if (result.status) {
            this.content = result.data;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    subcribe() {
      $nuxt.$emit("openPop");
    },
  },
  components: { Modal },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/postdetails.scss";
@import "/assets/scss/mobile/postdetails.scss";
</style>
