<template>
  <div class="allPlayerContainer">
    <div>
      <el-dialog
        :visible="true"
        @close="dialogClose"
        class="classplanA"
        :modal-append-to-body="false"
      >
        <div class="header">
          <div>All Player</div>
          <i @click="dialogClose" class="el-icon-close closeIcon"></i>
        </div>
        <div class="content">
          <div class="tableHeader">
            <div class="width1">Bet ID</div>
            <div class="width2">Player</div>
            <div class="width3">Payout</div>
            <div class="width4">Profit</div>
          </div>
          <div class="tableContainer">
            <div class="tableTr" v-for="(item, index) in listData" :key="index">
              <div class="width1">{{ item.expect }}</div>
              <div class="width2 player">{{ item.userId }}</div>
              <div class="width3">{{ item.winRatio }}X</div>
              <div class="width4 profit">
                <span class="suffix">{{ item.money | capitalizes }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["dialogShow", "listData"],
  data() {
    return {};
  },
  computed: {},
  beforeMount() {},
  destroyed() {},
  mounted() {
    let num = document.documentElement.clientWidth;
    if (num > 750) this.isin = "fadeon";
  },
  methods: {
    dialogClose() {
      this.$emit("update:dialogShow", false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.allPlayerContainer {
  ::v-deep .el-dialog {
    margin-top: 5vh !important;
    width: 464px;
    height: 90%;
    border-radius: 10px;
    background-color: $colorys1;

    @media screen and (min-device-width: 160px) and (max-width: 899px) {
      width: 95%;
      margin: 0 auto;
    }

    .el-icon-close {
      margin-top: 10px;
      font-size: 20px;
    }

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      height: 100%;
      width: 100%;
      background-color: $colorys2;
      box-sizing: border-box;
      // overflow: auto;
      border-radius: 15px;
      padding: 0;
      position: relative;

      .header {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border-radius: 15px 15px 0 0;
        background-color: $colorys1;
        line-height: 60px;
        text-align: left;
        padding: 0px 20px 20px 20px;
        color: white;
        font-size: 20px;
        font-weight: 700;
        position: relative;

        i {
          position: absolute;
          right: 30px;
          top: 15px;
          color: $colorys3;
          font-size: 24px;
          font-weight: 700;
          cursor: pointer;
        }

        div {
          color: white;
          font-weight: 600;
          font-size: 16px;
        }
      }

      .content {
        height: calc(100% - 60px);
        overflow-y: auto;
        .tableHeader {
          font-size: 14px;
          color: $colorys3;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }

        .width1 {
          width: 120px;
        }

        .width2 {
          width: 130px;
        }

        .width3 {
          width: 100px;
        }

        .width4 {
          width: 130px;
        }

        .tableContainer {
          padding: 0px 12px;
          text-align: center;
          margin-bottom: 10px;

          .tableTr {
            height: 56px;
            line-height: 56px;
            display: flex;

            &:nth-child(even) {
              background-color: #17181b;
              border-radius: 22px;
            }
          }

          .player {
            color: white;
            font-weight: 600;
          }

          .profit {
            color: #5da000;
            font-weight: 600;

            .suffix {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}
</style>
