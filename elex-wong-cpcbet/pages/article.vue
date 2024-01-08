<template>
  <div class="article">
    <div class="article-title" v-if="articleTitle != null">
      <h2>{{ articleTitle }}</h2>
    </div>
    <div class="article-image">
      <img :src="articleImage" alt="" v-if="articleImage != null" />
    </div>
    <div class="article-content" v-if="articleContent != null">
      <div v-html="articleContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  head() {
    return {
      title: this.articleTitle + " - " + this.$t("cpcbet"),
    };
  },
  data() {
    return {
      articleId: this.$route.query,
      articleContent: "",
      articleBrief: "",
      articleImage: "",
      articleTitle: "",
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$api
        .requestByPost("Article/get", { id: this.articleId.articleId })
        .then((result) => {
          if (result.status == true) {
            this.articleTitle = result.data.title;
            this.articleImage = result.data.image;
            this.articleBrief = result.data.brief;
            this.articleContent = result.data.content;
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              { showOnlyTheLastOne: true }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.articleId) {
        this.articleId = to.query;
      }

      this.getArticle();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/article.scss";
@import "/assets/scss/mobile/article.scss";
</style>
