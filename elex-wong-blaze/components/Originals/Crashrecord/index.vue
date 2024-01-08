<template>
  <div class="crashrecord" v-if="crashrecord">
    <div class="recordWeb">
      <div class="headrs">
        <div class="logo">
          <i class="el-icon-close" @click="handleClose"></i>
        </div>
        <div class="headrd_tab">
          <div
            class="tabItem"
            v-for="(item, index) in tabList"
            :key="index"
            :class="tableIndex == index ? 'game-tabs-navs-active' : ''"
            @click="handleTabs(index)"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
      <div class="recordMain" v-if="tableIndex == 0">
        <div v-for="(item, index) in recordList" :key="index">
          <div class="mian">
            <div
              class="multiple"
              :style="{
                backgroundColor: grad[item.type].color,
              }"
            >
              <div class="multiple_right">{{ item.explode | number }}</div>
            </div>
            <div class="time">{{ item.createTime | createTime }}</div>
          </div>
        </div>
      </div>
      <div class="Chart" v-if="tableIndex == 1">
        <div class="Chart_tops" ref="ChartTops">
          <div
            class="chart_for"
            v-for="(item, index) in chartList"
            :key="index"
          >
            <div
              class="size"
              :style="{ backgroundColor: grad[items].color }"
              v-for="(items, indexs) in item.type"
              :key="indexs"
            ></div>
          </div>
        </div>
        <div class="Chart_middle">
          <div class="Small">
            <div class="Small_left Smalls_color"></div>
            <div class="Small_right">{{ small }}</div>
          </div>
          <div class="Small">
            <div class="Small_left centers_color"></div>
            <div class="Small_right">{{ center }}</div>
          </div>
          <div class="Small">
            <div class="Small_left larges_color"></div>
            <div class="Small_right">{{ large }}</div>
          </div>
        </div>
        <div class="Chart_button">
          <div class="Chart_button_left">
            <div class="button_ch">
              <div class="button_color"></div>
              <div class="button_color"></div>
            </div>
            <div class="button_ch">
              <div class="center_color"></div>
              <div class="large_color"></div>
            </div>
            <div class="button_ch">
              <div class="button_color">6</div>
            </div>
            <div class="button_ch">
              <div class="center_color">5</div>
              <div class="center_color">4</div>
              <div class="center_color">3</div>
              <div class="large_color">2</div>
            </div>
            <div class="button_ch">
              <div class="button_color">1</div>
            </div>
          </div>
          <div class="Chart_button_right">
            <div class="text">{{ $tt("Bet.bet_01") }}</div>
            <div class="explain">
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numsert">3</div>
                  <div class="peilv">3.56</div>
                </div>
                <div class="explain_ch">
                  <div class="numsertss">6</div>
                  <div class="peilvss">1.26</div>
                </div>
              </div>
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numserts">2</div>
                  <div class="peilvs">26.12</div>
                </div>
                <div class="explain_ch">
                  <div class="numsert">5</div>
                  <div class="peilv">5.68</div>
                </div>
              </div>
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numsertss">1</div>
                  <div class="peilvss">1.26</div>
                </div>
                <div class="explain_ch">
                  <div class="numsert">4</div>
                  <div class="peilv">2.89</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recordH5">
      <div class="headrs">
        <div class="logo">
          <i class="el-icon-close" @click="handleClose"></i>
        </div>
        <div class="headrd_tab">
          <div
            class="tabItem"
            v-for="(item, index) in tabList"
            :key="index"
            :class="tableIndex == index ? 'game-tabs-navs-active' : ''"
            @click="handleTabs(index)"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
      <div class="recordMain" v-if="tableIndex == 0">
        <div class="mian" v-for="(item, index) in recordList" :key="index">
          <div
            class="multiple"
            :style="{
              backgroundColor: grad[item.type].color,
            }"
          >
            <div class="multiple_right">{{ item.explode | number }}</div>
          </div>
          <div class="time">{{ item.createTime | createTime }}</div>
        </div>
      </div>
      <div class="Chart" v-if="tableIndex == 1">
        <div class="Chart_top" ref="ChartTopss">
          <div
            class="chart_for"
            v-for="(item, index) in chartList"
            :key="index"
          >
            <div
              class="size"
              :style="{ backgroundColor: grad[items].color }"
              v-for="(items, indexs) in item.type"
              :key="indexs"
            ></div>
          </div>
        </div>
        <div class="Chart_middle">
          <div class="Small">
            <div class="Small_left Smalls_color"></div>
            <div class="Small_right">{{ small }}</div>
          </div>
          <div class="Small">
            <div class="Small_left centers_color"></div>
            <div class="Small_right">{{ center }}</div>
          </div>
          <div class="Small">
            <div class="Small_left larges_color"></div>
            <div class="Small_right">{{ large }}</div>
          </div>
        </div>
        <div class="Chart_button">
          <div class="Chart_button_left">
            <div class="button_ch">
              <div class="button_color"></div>
              <div class="button_color"></div>
            </div>
            <div class="button_ch">
              <div class="center_color"></div>
              <div class="large_color"></div>
            </div>
            <div class="button_ch">
              <div class="button_color">6</div>
            </div>
            <div class="button_ch">
              <div class="center_color">5</div>
              <div class="center_color">4</div>
              <div class="center_color">3</div>
              <div class="large_color">2</div>
            </div>
            <div class="button_ch">
              <div class="button_color">1</div>
            </div>
          </div>
          <div class="Chart_button_right">
            <div class="text">{{ $tt("Bet.bet_01") }}</div>
            <div class="explain">
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numsert">3</div>
                  <div class="peilv">3.56</div>
                </div>
                <div class="explain_ch">
                  <div class="numsertss">6</div>
                  <div class="peilvss">1.26</div>
                </div>
              </div>
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numserts">2</div>
                  <div class="peilvs">26.12</div>
                </div>
                <div class="explain_ch">
                  <div class="numsert">5</div>
                  <div class="peilv">5.68</div>
                </div>
              </div>
              <div class="explain_sh">
                <div class="explain_ch">
                  <div class="numsertss">1</div>
                  <div class="peilvss">1.26</div>
                </div>
                <div class="explain_ch">
                  <div class="numsert">4</div>
                  <div class="peilv">2.89</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carshRecord } from "@/api/api.js";
import { time } from "@/utils/time.js";
export default {
  data() {
    return {
      small: "<2x",
      center: ">=2x",
      large: ">=10x",
      crashrecord: false,
      tableIndex: 1,
      recordList: [],
      chartList: [],
      tabList: [
        { text: this.$tt("Bet.bet_02") },
        { text: this.$tt("Bet.bet_03") },
      ],
      grad: [
        {
          color: "#43B309",
        },
        {
          color: "#ED6300",
        },
        {
          color: "#FECD5C",
        },
      ],
    };
  },
  filters: {
    createTime(val) {
      return time(val);
    },
  },
  watch: {
    chartList() {
      let width = document.documentElement.clientWidth;
      this.$nextTick(() => {
        // if (width > 751) {
        //     this.$refs.ChartTops.scrollLeft = 500
        // } else {
        //     this.$refs.ChartTopss.scrollLeft = 350
        // }
      });
    },
  },
  mounted() {},
  methods: {
    show() {
      this.crashrecord = true;
      this.carshRecord();
      // let height = document.getElementsByClassName("Chart_tops")
      // console.log(height);
      // console.log(height.offsetHeight);
      // console.log(height.scrollRight());
    },
    handleClose() {
      this.chartList = [];
      this.crashrecord = false;
    },
    handleTabs(val) {
      this.tableIndex = val;
    },
    carshRecord() {
      let obj = {
        pageNum: 1,
        pageSize: 50,
        channelId: localStorage.getItem("channelId"),
      };
      carshRecord(obj).then((res) => {
        if (res.code == 200) {
          this.recordList = res.rows;
          this.recordList.forEach((item) => {
            if (Number(item.explode) <= 2) {
              item.type = 1;
            } else if (Number(item.explode) > 2 && Number(item.explode) < 10) {
              item.type = 0;
            } else if (Number(item.explode) > 10) {
              item.type = 2;
            }
          });
          let data = [];
          let datas = [this.recordList[0].type];
          for (let i = 1; i <= this.recordList.length - 1; i++) {
            if (this.recordList[i].explode <= 2) {
              if (
                this.recordList[i].explode <= 2 &&
                this.recordList[i - 1].explode <= 2
              ) {
                datas.push(this.recordList[i].type);
                if (i == this.recordList.length - 1) {
                  datas.reverse();
                  data.unshift({ type: [...datas] });
                }
              } else {
                datas.reverse();
                data.unshift({ type: [...datas] });
                datas = [];
                datas.push(this.recordList[i].type);
                if (i == this.recordList.length - 1) {
                  data.unshift({ type: [...datas] });
                }
              }
            } else {
              if (
                this.recordList[i].explode > 2 &&
                this.recordList[i - 1].explode > 2
              ) {
                datas.push(this.recordList[i].type);
                if (i == this.recordList.length - 1) {
                  datas.reverse();
                  data.unshift({ type: [...datas] });
                }
              } else {
                datas.reverse();
                data.unshift({ type: [...datas] });
                datas = [];
                datas.push(this.recordList[i].type);
                if (i == this.recordList.length - 1) {
                  datas.reverse();
                  data.unshift({ type: [...datas] });
                }
              }
            }
          }
          this.chartList = data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/h5.scss";
@import "./style/web.scss";
</style>
