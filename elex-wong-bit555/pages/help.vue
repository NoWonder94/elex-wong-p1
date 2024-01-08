<template>
  <div class="help">
    <PostList
      :type="type"
      :lists="list"
      :isLoading="isLoading"
      :isShow="isShow"
      :loadMoreText="loadMoreText"
      :currentPage="currentPage"
    />
  </div>
</template>
<script>
import Post from "../components/Post.vue";
export default {
  name: "Help",
  head() {
    return {
      title: this.title ? this.title : this.$i18n.t("types.help"),
    };
  },
  data() {
    return {
      isLoading: false,
      isShow: true,
      type: "help",
      list: {
        list: [
          {
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
        ],
        total_list: 1,
        total_page: 1,
        page: 1,
        page_size: 15,
      },
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {},
  },
};
</script>
<style lang="scss" type="text/css">
// @import "/assets/scss/pc/help.scss";
// @import "/assets/scss/mobile/help.scss";
</style>
