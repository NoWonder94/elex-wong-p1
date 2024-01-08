<template>
  <div class="postlist">
    <div class="postlist-container" v-if="lists.list">
      <div class="postlist-title">
        {{ $t("types." + type) }}
      </div>
      <div class="postlist-amount">
        <div>
          {{ $t("collection") + ` ${lists.total_list} ` + $t("post") }}
        </div>
      </div>
      <div v-loading="isLoading">
        <div class="postlist-content" v-show="isShow">
          <div
            class="postlist-item"
            v-for="(list, index) in lists.list"
            :key="index"
          >
            <template>
              <Post
                :id="list.id"
                :title="list.title"
                :type="type"
                :description="list.description"
                :date="list.create_time_datetime.split(' ')[0]"
                :image="list.img"
                :link="''"
                :size="'small'"
                :is_top="list.is_top"
              />
            </template>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :page-size="lists.page_size"
          :total="lists.total_list"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
          class="web"
          v-if="lists.total_list > 0"
        ></el-pagination>
        <span class="mobile load-more" @click="handleMore">
          {{ loadMoreText }}
          <i class="el-icon-arrow-down"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "PostList",
  props: [
    "type",
    "lists",
    "currentPage",
    "isLoading",
    "isShow",
    "loadMoreText",
  ],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handlePageChange(val) {
      this.$emit("handlePageChange", val);
    },
    handleMore() {
      this.$emit("handleMore");
    },
  },
  components: { Post },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/postlist.scss";
@import "/assets/scss/mobile/postlist.scss";
</style>
