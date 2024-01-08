<template>
  <div class="index">
    <div class="logo-container">
      <div class="logo-content">
        <img src="../assets/img/logo.png" alt="Bit555" />
        <div>{{ $t("index.latestCrypto") }}</div>
      </div>
    </div>
    <div class="index-container" v-loading="isLoading">
      <div class="index-content" v-if="contents.list" v-show="isShow">
        <!-- toplist start-->
        <div
          class="index-content-item grid-1"
          v-for="(content, index) in contents.list.top_list"
        >
          <template>
            <Post
              :id="content.id"
              :title="content.title"
              :type="'home'"
              :description="content.description"
              :date="content.create_time_datetime.split(' ')[0]"
              :image="content.img"
              :is_top="content.is_top"
              :link="''"
              :size="'big'"
            />
          </template>
        </div>
        <!-- toplist end-->
        <!-- middlelist start-->
        <div
          class="index-content-item grid-2"
          v-for="(content, index) in contents.list.middle_list"
        >
          <template>
            <Post
              :id="content.id"
              :title="content.title"
              :type="'home'"
              :description="content.description"
              :date="content.create_time_datetime.split(' ')[0]"
              :image="content.img"
              :is_top="content.is_top"
              :link="''"
              :size="'middle'"
            />
          </template>
        </div>
        <!-- middlelist end-->
        <!-- bottomlist start-->
        <div
          class="index-content-item grid-3"
          v-for="(content, index) in contents.list.bottom_list"
        >
          <template>
            <Post
              :id="content.id"
              :title="content.title"
              :type="'home'"
              :description="content.description"
              :date="content.create_time_datetime.split(' ')[0]"
              :image="content.img"
              :is_top="content.is_top"
              :link="''"
              :size="'small'"
            />
          </template>
        </div>
        <!-- bottomlist end-->
      </div>
      <el-pagination
        layout="prev, pager, next"
        :page-size="contents.page_size"
        :total="contents.total_list"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
        class="web"
        v-if="contents.total_list > 0"
      ></el-pagination>
      <span class="mobile load-more" @click="handleMore">
        {{ loadMoreText }}
        <i class="el-icon-arrow-down"></i>
      </span>
    </div>
  </div>
</template>
<script>
import Post from "../components/Post.vue";
export default {
  name: "Index",
  head() {
    return {
      title: this.title ? this.title : this.$i18n.t("types.crypto"),
    };
  },
  data() {
    return {
      isLoading: false,
      isShow: true,
      tempcontents: [
        {
          id: 1,
          title: "Livestream to earn 20 USDT",
          type: "event",
          description:
            "1. Livestream broadcast playing one of the BIT Original games on either Youtube, Facebook, or any other video platforms to get 20 BITD. 2. Requires a minimum time of 10 minutes livestream broadcast.",
          date: "May 26, 2022",
          image: require("/assets/img/1.png"),
          link: "",
        },
        {
          id: 2,
          title: "VIP Transfer Program",
          type: "event",
          description:
            "Players are required to provide a video record of their current platform’s membership and VIP concessions. (Username, membership rank, email verified, and wagers shown in USD must all be clearly visible in the video.)",
          date: "May 26, 2022",
          image: require("/assets/img/2.png"),
          link: "",
        },
        {
          id: 3,
          title: "What exactly is 'Risk-Free' ?",
          type: "event",
          description:
            "If you are a new player, you can place your first sports bet with zero risk on your side. For example, you place your first sports bet, and you have lost. In this case, we will give the stake that you just lost in terms of BITD. It is like ‘losing’ without actually losing. You will receive what you have lost back in terms of BITD.",
          date: "May 26, 2022",
          image: require("/assets/img/3.png"),
          link: "",
        },
        {
          id: 4,
          title: "First Deposit Bonus",
          type: "event",
          description:
            "The most exciting part of playing at a crypto casino is the bonuses on offer! Bit555.io, the leading crypto gambling platform in the world offers you, our loyal players. Make a 1st deposit today and get a extra 15% BITD at Bit555.io crypto casino! Bet now to get BITD in your wallet!",
          date: "May 26, 2022",
          image: require("/assets/img/4.png"),
          link: "",
        },
        {
          id: 5,
          title: "Coming soon",
          type: "help",
          description:
            "This is Bit555.io, a brand new site by Bit555 that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
          date: "May 26, 2022",
          image: require("/assets/img/help.png"),
          link: "",
        },
      ],
      contents: [],
      currentPage: 1,
      pageSize: 6,
      loadMoreText: "",
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.isLoading = true;
      this.isShow = false;
      var token = localStorage.getItem("baseToken");
      var time = 1;
      if (!token) time = 500;
      setTimeout(() => {
        this.loadMoreText = this.$t("load_more");
        this.$api
          .requestByPost("Home/getList", {
            page: this.currentPage,
            page_size: this.pageSize,
          })
          .then((result) => {
            if (result.status == true) {
              this.contents = result.data;
            } else {
              this.$message.error(result.msg);
            }
            this.isLoading = false;
            this.isShow = true;
          })
          .catch((error) => {
            this.$message.error(error ? error : this.$t("error"));
          });
      }, time);
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.initialize();
    },
    handleMore() {
      let totalPages = Math.ceil(this.contents.total_list / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.$api
          .requestByPost("Home/getList", {
            page: this.currentPage,
            page_size: this.pageSize,
          })
          .then((result) => {
            if (result.status) {
              let oriData = this.contents.list.bottom_list;
              let data = result.data.list.bottom_list;
              let array = [];

              for (var i = 0; i < oriData.length; i++) {
                array.push(oriData[i]);
              }

              for (var i = 0; i < data.length; i++) {
                array.push(data[i]);
              }
              this.contents = result.data;
              this.contents.list.bottom_list = array;
            }

            this.isLoading = false;
            this.isShow = true;
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }

      if (this.currentPage == totalPages) {
        this.loadMoreText = this.$t("reached_end");
      }
    },
  },
  components: { Post },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/index.scss";
@import "/assets/scss/mobile/index.scss";
</style>
