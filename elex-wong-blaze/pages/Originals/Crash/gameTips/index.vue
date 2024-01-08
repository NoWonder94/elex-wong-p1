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
            <div @click="showTrenball">
              <span>{{ $tt("crashTipsTren.text101") }}</span>
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
          <transition name="nav">
            <div class="ui-scrollview gbgzxuf" v-if="isTrenball">
              <div class="item">
                <h2>{{ $tt("crashTipsTren.text102") }}</h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTipsTren.text103") }}
                  </p>
                  <p></p>
                  <h2>
                    {{ $tt("crashTipsTren.text104") }}
                  </h2>
                  <p></p>
                  <p>
                    {{ $tt("crashTipsTren.text105") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTipsTren.text106") }}
                  </p>
                  <p></p>
                  <p>
                    {{ $tt("crashTipsTren.text107") }}
                  </p>
                  <p></p>
                  <p>{{ $tt("crashTipsTren.text108") }}</p>
                </div>
                <h2>{{ $tt("crashTipsTren.text109") }}</h2>
                <div class="help-content">
                  <p>
                    {{ $tt("crashTipsTren.text110") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text111") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text112") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text113") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text114") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text115") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text116") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text117") }}
                  </p>
                  <h2>
                    {{ $tt("crashTipsTren.text118") }}
                  </h2>
                  <p>
                    {{ $tt("crashTipsTren.text119") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text120") }}
                  </p>
                  <p>
                    {{ $tt("crashTipsTren.text121") }}
                  </p>

                  <div class="table">
                    <p></p>
                    <p class="width2">
                      {{ $tt("crashTipsTren.text122") }}
                    </p>
                    <p class="width3">
                      {{ $tt("crashTipsTren.text123") }}
                    </p>
                    <p class="width4">
                      {{ $tt("crashTipsTren.text124") }}
                    </p>
                  </div>
                  <div class="tbody">
                    <div class="tr1 trColor">
                      <div class="width1">
                        {{ $tt("crashTipsTren.text125") }}
                      </div>
                      <div class="width2">&lt; 2</div>
                      <div class="width3">>= 2</div>
                      <div class="width4">>= 10</div>
                    </div>
                    <div class="tr1">
                      <div class="width1">
                        {{ $tt("crashTipsTren.text126") }}
                      </div>
                      <div class="width2">1.96</div>
                      <div class="width3">2</div>
                      <div class="width4">10</div>
                    </div>
                    <div class="tr1 trColor">
                      <div class="width1">
                        {{ $tt("crashTipsTren.text127") }}
                      </div>
                      <div class="width2">50.50%</div>
                      <div class="width3">49.5%</div>
                      <div class="width4">9.9%</div>
                    </div>
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
      isTrenball: false,
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
      this.isTrenball = false;
    },
    showCalculated() {
      this.isQuestionList = false;
      this.isCalculated = true;
      this.isTrenball = false;
    },
    showTrenball() {
      this.isQuestionList = false;
      this.iswhatGameTips = false;
      this.isTrenball = true;
    },
    back() {
      this.isQuestionList = true;
      this.iswhatGameTips = false;
      this.isCalculated = false;
      this.isTrenball = false;
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
