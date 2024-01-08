<template>
  <div id="test" class="promotion-container">
    <div class="promotion_header" @click="$router.back(-1)">
      <svg
        class="arrow-back"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
        ></path>
      </svg>
      <div class="promotion_header_title">
        <h2>{{ $tt("promotions") }}</h2>
      </div>
    </div>
    <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
    <div v-else>
      <div
        v-if="promotions_list.length > 0 && totalList != 0"
        class="promotion-content"
      >
        <Promotion-Card
          v-for="promotion in promotions_list"
          :key="promotion.id"
          :id="promotion.id"
          :img="promotion.resource"
          :title="promotion.activityTitle"
          :subtitle="promotion.activityContent"
          @event="navigatePage"
        />

        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalList"
            :current-page="pageNum"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div v-else class="no-found">
        {{ $tt("no_results_found") }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  scrollToTop: true,
  name: "Promotion",
  data() {
    return {
      isLoading: false,
      promotions_list: [],
      pageNum: 1,
      pageSize: 5,
      totalList: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.isLoading = true;
      this.$api
        .requestByPost("/hall/v2/playActivity/list", {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((result) => {
          const { code, rows, msg, total } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.promotions_list = rows;
          this.totalList = parseInt(total);
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    navigatePage(id) {
      window.newRouter("/promotion/" + id);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
      document.querySelector(".promotion-container").parentNode.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      var currentScrollY = document.getElementById("#test");
      // console.log(currentScrollY);
      if (currentScrollY) {
        currentScrollY.scrollTop = 0;
        // window.scroll(0, 0); // reset the scroll position to the top left of the document.
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/promotion.scss";
@import "/assets/scss/mobile/promotion.scss";
</style>
