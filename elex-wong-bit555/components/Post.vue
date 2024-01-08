<template>
  <div class="post">
    <div
      :class="[
        'post-container',
        size == 'big'
          ? 'post-big'
          : size == 'middle'
          ? 'post-middle'
          : 'post-small',
      ]"
      @click="openPost(id, link)"
    >
      <div class="post-img-container">
        <img :src="image" />
      </div>
      <div class="post-content">
        <div class="post-type">{{ $t("types." + type) }}</div>
        <div class="post-title">
          <img
            :src="type == 'event' ? hotImg : type == 'news' ? pinImg : ''"
            v-if="is_top == 1 && type != 'home'"
          />
          {{ title }}
        </div>
        <div class="post-description" v-html="description"></div>
        <div class="post-date">{{ date | formatDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: [
    "id",
    "title",
    "date",
    "type",
    "description",
    "image",
    "size",
    "link",
    "is_top",
  ],
  data() {
    return {
      isLoading: true,
      hotImg: require("../assets/img/hot.png"),
      pinImg: require("../assets/img/pin.png"),
    };
  },
  mounted() {},
  methods: {
    openPost(id, link) {
      if (link) {
        window.open(link);
      } else {
        this.$router.push({
          path: "/postDetails",
          query: { id: id, type: this.type },
        });
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/post.scss";
@import "/assets/scss/mobile/post.scss";
</style>
