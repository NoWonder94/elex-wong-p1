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
            <span>{{ $tt("gameTips.Help") }}</span>
          </div>
          <div>
            <i @click="dialogClose" class="el-icon-close closeIcon"></i>
          </div>
        </div>
        <div class="contentInfo">
          <div class="help-list" v-if="isQuestionList">
            <div @click="showWhatGame">
              <span>{{ $tt("gameTips.title1") }}</span>
              <div class="el-icon-arrow-right icon1"></div>
            </div>
            <div @click="showCalculated">
              <span>{{ $tt("gameTips.Fairness") }}</span>
              <div class="el-icon-arrow-right icon1"></div>
            </div>
          </div>
          <transition name="nav">
            <div class="ui-scrollview gbgzxuf" v-if="iswhatGameTips">
              <div class="item">
                <h2>{{ $tt("crashTips.text1") }}</h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTips.text2") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTips.text3") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTips.text4") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTips.text5") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTips.text6") }}
                  </p>
                  <p></p>
                  <p>{{ $tt("crashTips.text7") }}</p>
                </div>
                <h2>{{ $tt("crashTips.text8") }}</h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTips.text9") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text10") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text11") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text12") }}
                  </p>
                </div>
              </div>
            </div>
          </transition>
          <transition name="nav">
            <div class="ui-scrollview gbgzxuf" v-if="isCalculated">
              <div id="crash-help-fair" class="item">
                <h2>{{ $tt("crashTips.text13") }}</h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTips.text14") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text15") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text16") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text17") }}
                  </p>
                </div>
                <h2>
                  {{ $tt("crashTips.text18")
                  }}<a
                    class="h2-link cl-primary"
                    href="https://bcgame-project.github.io/verify/crash.html"
                    target="_blank"
                    >{{ $tt("crashTips.text31") }}</a
                  >&nbsp;&nbsp;<a
                    class="h2-link cl-primary"
                    href="https://bcgame-project.github.io/verify/crash.html"
                    target="_blank"
                    >{{ $tt("crashTips.text32") }}</a
                  >
                </h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTips.text19") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text20") }}
                  </p>
                  <ol>
                    <li>
                      {{ $tt("crashTips.text21") }}
                    </li>
                    <li>
                      {{ $tt("crashTips.text22") }}
                    </li>
                    <li>
                      {{ $tt("crashTips.text23") }}
                      <p>
                        {{ $tt("crashTips.text33") }}
                      </p>
                      <p>{{ $tt("crashTips.text24") }}</p>
                    </li>
                    <li>
                      {{ $tt("crashTips.text25") }}
                      <p>{{ $tt("crashTips.text26") }}</p>
                    </li>
                  </ol>
                  <p>
                    {{ $tt("crashTips.text27") }}
                  </p>
                  <p>{{ $tt("crashTips.text28") }}</p>
                  <p>
                    {{ $tt("crashTips.text29") }}
                  </p>
                  <p>
                    {{ $tt("crashTips.text30") }}
                  </p>
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
