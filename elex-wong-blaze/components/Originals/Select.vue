<template>
  <div name="status" id="status" class="selectInfo" @click="changeStatus">
    <img
      v-if="isShowImg && selected.icon"
      :src="selected.icon"
      alt=""
      class="selectIcon"
    />
    {{ selected.name }}
    <div class="option-container" v-if="showOption">
      <div
        class="itemInfo"
        :class="{ active: item.id == select }"
        v-for="(item, index) in list"
        :key="index"
        @click.stop="changeSelect(item.id)"
      >
        <div class="leftInfo">
          <img :src="item.icon" v-if="isShowImg" class="icon" />
          <div>{{ item.name }}</div>
        </div>
        <div class="number">{{ item.gameNum }}</div>
      </div>
    </div>
    <div class="arrowInfo">
      <i class="el-icon-arrow-up" v-if="showOption"></i>
      <i class="el-icon-arrow-down" v-else></i>
    </div>
  </div>
</template>
<script>
// list 里面统一接收 icon name id 三个参数 selectid 币种详情页传过来的id
export default {
  props: ["list", "select", "isShowImg", "disabled", "selectid"],
  data() {
    return {
      showOption: false,
      selected: {},
    };
  },
  mounted() {
    this.changeSelect(this.select);
    document.addEventListener("click", (e) => {
      this.showOption = false;
    });
  },
  watch: {
    // select(id) {
    //   this.changeSelect(id);
    // },
    list(val) {
      // console.log("val", val);
      this.changeSelect(this.select);
    },
  },
  methods: {
    changeposition(value) {
      this.selected = value;
      this.$emit("update:select", value.id);
      this.$emit("chooseCoin", this.selected);
    },
    changeStatus() {
      if (this.disabled) return;
      let showOption = this.showOption;
      setTimeout(() => {
        this.showOption = !showOption;
      });
    },
    changeSelect(id) {
      this.showOption = false;
      if (this.list.length == 1) {
        this.selected = this.list[0];
      } else {
        const selected = this.list.find((item) => item.id == id);
        if (selected) {
          this.selected = selected;
        }
      }
      this.$emit("update:select", id);
      this.$emit("chooseCoin", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
.selectInfo {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 100%;
  background-color: #222328;
  border-radius: 22px;
  font-family: Montserrat-Medium;
  line-height: 50px;
  color: #6b727c;
  text-align: left;
  text-indent: 15px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #ffff;
  @media screen and (min-device-width: 160px) and (max-width: 899px) {
    text-indent: 27px;
    font-size: 15px !important;
    border-radius: 40px;
    height: 50px;
  }
  .selectIcon {
    width: 30px;
    height: 30px;
    margin-left: 15px;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 40px;
      height: 40px;
    }
  }

  .option-container {
    padding: 20px 0px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background-color: #17181b;
    border-radius: 8px;
    box-shadow: 0 0 8px black;
    // border: solid 1px #212f3b;
    z-index: 999;
    max-height: 200px;
    overflow-y: scroll;
    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      top: 50px;
      max-height: 500px;
    }
    .itemInfo {
      display: flex;
      transition: all 400ms;
      margin: 0 8px;
      padding-left: 5px;
      position: relative;
      line-height: 40px;
      color: #6b727c;
      border-radius: 20px;
      align-items: center;
      justify-content: space-between;
      @media screen and (min-device-width: 160px) and (max-width: 899px) {
        line-height: 40px;
        border-radius: 30px;
      }
      .leftInfo {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          // padding-left: 8px;
          @media screen and (min-device-width: 160px) and (max-width: 899px) {
            width: 30px;
            height: 30px;
          }
        }
      }
      .number {
        margin-right: 28px;
      }
      &:hover {
        background-color: #222328;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
      }
      &.active {
        border: 1px solid #cc2843;
        &::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          top: 15px;
          right: 10px;
          background-color: #cc2843;
          box-shadow: 0 0 0 4px rgba(91, 174, 28, 0.15);
        }
      }
    }
  }
  .arrowInfo {
    position: absolute;
    right: 10px;
  }
}
</style>
