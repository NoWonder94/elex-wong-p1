<template>
  <div>
    <div class="gameTips">
      <el-dialog
        :modal-append-to-body="false"
        :visible="true"
        @close="dialogClose"
      >
        <div class="header">
          <div class="left">
            <i
              class="el-icon-arrow-left backIcon"
              v-if="!isQuestionList"
              @click="back"
            ></i>
            <span>{{ $t("gameTips.Help") }}</span>
          </div>
          <div>
            <i @click="dialogClose" class="el-icon-close closeIcon"></i>
          </div>
        </div>
        <div class="contentInfo">
          <div class="help-list" v-if="isQuestionList">
            <div @click="showWhatGame">
              <span>{{ $t("gameTips.title1") }}</span>
              <div class="el-icon-arrow-right icon1"></div>
            </div>
            <div @click="showCalculated">
              <span>{{ $t("gameTips.Fairness") }}</span>
              <div class="el-icon-arrow-right icon1"></div>
            </div>
          </div>
          <transition name="nav">
            <div class="ui-scrollview gbgzxuf" v-if="iswhatGameTips">
              <div class="item">
                <h2>{{ $t("minesTips.text1") }}</h2>
                <div class="content">
                  <p>
                    {{ $t("minesTips.text2") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $t("minesTips.text3") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $t("minesTips.text4") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $t("minesTips.text5") }}
                  </p>
                </div>
                <h2>{{ $t("minesTips.text6") }}</h2>
                <div class="content">
                  <p>
                    {{ $t("minesTips.text7") }}
                  </p>
                  <p>{{ $t("minesTips.text8") }}</p>
                  <p>
                    {{ $t("minesTips.text9") }}
                  </p>
                  <p>
                    {{ $t("minesTips.text10") }}
                  </p>
                  <p>
                    {{ $t("minesTips.text11") }}
                  </p>
                  <p>
                    {{ $t("minesTips.text12") }}
                  </p>
                </div>
                <h2>{{ $t("minesTips.text13") }}</h2>
                <div class="content">
                  <p>{{ $t("minesTips.text14") }}</p>
                </div>
              </div>
            </div>
          </transition>
          <transition name="nav">
            <div class="ui-scrollview gbgzxuf" v-if="isCalculated">
              <div class="item">
                <h2>{{ $t("minesTips.text15") }}</h2>
                <div class="content">
                  <p>
                    {{ $t("minesTips.text16") }}
                  </p>
                  <div class="code-area c6tnr2">
                    <pre
                      >{{ $t("minesTips.text17") }}
</pre
                    >
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["dialogGameTip", "playId"],
  data() {
    return {
      isin: true,
      list: [],
      isin: "fadeIn",
      isQuestionList: true,
      iswhatGameTips: false,
      isCalculated: false,
    };
  },
  computed: {},
  beforeMount() {},
  destroyed() {},
  mounted() {},
  methods: {
    dialogClose() {
      this.$emit("update:dialogGameTip", false);
    },
    showWhatGame() {
      this.isQuestionList = false;
      this.iswhatGameTips = true;
    },
    showCalculated() {
      this.isQuestionList = false;
      this.isCalculated = true;
    },
    back() {
      this.isQuestionList = true;
      this.iswhatGameTips = false;
      this.isCalculated = false;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
@import "./web.scss";
@import "./H5.scss";
.nav-leave {
  /* 定义 出场动画的 起始状态 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
.nav-leave-active {
  /* 定义 出场动画 过程 */
  transition: all 0.4s ease;
}
.nav-leave-to {
  /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
  transform: translate(600px);
}
/* 定义  入场动画 */
.nav-enter {
  /* 定义 入场动画 的起始状态 */
  transform: translateX(600px);
}
.nav-enter-active {
  /* 定义 入场动画 过程 */
  transition: all 0.4s ease;
}
.nav-enter-to {
  /* 定义 入场动画 过程 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
</style>
