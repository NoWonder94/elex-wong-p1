<template>
  <div class="guides">
    <PostList
      :type="type"
      :lists="list"
      :isLoading="isLoading"
      :isShow="isShow"
      :loadMoreText="loadMoreText"
      :currentPage="currentPage"
      @handlePageChange="handlePageChange"
      @handleMore="handleMore"
    />
  </div>
</template>
<script>
import Post from "../components/Post.vue";
import PostList from "../components/PostList.vue";
export default {
  name: "Guides",
  head() {
    return {
      title: this.title ? this.title : this.$i18n.t("types.guides"),
    };
  },
  data() {
    return {
      isLoading: false,
      isShow: true,
      type: "guides",
      templist: [
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
      list: [],
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
      this.loadMoreText = this.$t("load_more");
      this.$api
        .requestByPost("Guides/getList", {
          page: this.currentPage,
          page_size: this.pageSize,
        })
        .then((result) => {
          if (result.status == true) {
            this.list = result.data;
          } else {
            this.$message.error(result.msg);
          }
          this.isLoading = false;
          this.isShow = true;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.initialize();
    },
    handleMore() {
      let totalPages = Math.ceil(this.list.total_list / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.$api
          .requestByPost("Guides/getList", {
            page: this.currentPage,
            page_size: this.pageSize,
          })
          .then((result) => {
            if (result.status) {
              let oriData = this.list.list;
              let data = result.data.list;
              let array = [];

              for (var i = 0; i < oriData.length; i++) {
                array.push(oriData[i]);
              }

              for (var i = 0; i < data.length; i++) {
                array.push(data[i]);
              }
              this.list = result.data;
              this.list.list = array;
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
  components: { PostList },
};
</script>
<style lang="scss" type="text/css">
// @import "/assets/scss/pc/guides.scss";
// @import "/assets/scss/mobile/guides.scss";
</style>
