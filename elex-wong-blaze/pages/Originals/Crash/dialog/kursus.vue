<template>
  <div class="kursus" v-if="kursusDialog">
    <div class="kursusweb">
      <!-- <div class="header">
                <i class="el-icon-close"></i>
            </div> -->
      <div class="kurMain">
        <div class="centermain">
          <p class="title">{{ $tt("home.home_006") }}</p>
          <img src="../img/play.png" alt="" @click="handletips" />
          <div class="btn">
            <button @click="handletips">Play</button>
          </div>
        </div>
      </div>
      <div class="close">
        <span @click="handleClose">{{ $tt("home.home_005") }}</span>
      </div>
    </div>
    <div class="kursush5">
      <div class="kurMain">
        <div class="centermain">
          <p class="title">{{ $tt("home.home_006") }}</p>
          <img src="../img/play.png" alt="" @click="handletips" />
          <div class="btn">
            <button @click="handletips">Play</button>
          </div>
        </div>
      </div>
      <div class="close">
        <span @click="handleClose">{{ $tt("home.home_005") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kursusDialog: false,
    };
  },
  methods: {
    show() {
      this.kursusDialog = true;
    },
    handletips() {
      window.open("https://bit.ly/3Y02oJr", "_blank");
    },
    handleClose() {
      this.kursusDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 751px) and (max-width: 5120px) {
  .kursus {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.65);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .kursush5 {
      display: none;
    }

    .kursusweb {
      width: 400px;
      height: 450px;
      background-color: #1e2024;

      .kurMain {
        width: 100%;
        height: 400px;
        padding: 30px;
        box-sizing: border-box;

        .centermain {
          width: 100%;
          height: 100%;
          background-image: url("../img/game.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;

          .title {
            font-size: 35px;
            color: #97a4a6;
            padding: 15px 0px;
          }

          .btn {
            margin-top: 20px;

            button {
              padding: 10px 50px;
              color: #fff;
              font-size: 16px;
              border: none;
              border-radius: 15px;
              background-color: #00ff00;
              cursor: pointer;
            }
          }
        }
      }

      .close {
        color: #ffffff;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}

@media only screen and (min-width: 0px) and (max-width: 750px) {
  .kursus {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.65);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .kursusweb {
      display: none;
    }

    .kursush5 {
      width: 600px;
      height: 700px;
      background-color: #1e2024;

      .kurMain {
        width: 100%;
        height: 637px;
        padding: 30px;
        box-sizing: border-box;

        .centermain {
          width: 100%;
          height: 100%;
          background-image: url("../img/game.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;

          .title {
            font-size: 35px;
            color: #97a4a6;
            padding: 15px 0px;
          }

          .btn {
            margin-top: 20px;

            button {
              padding: 20px 90px;
              color: #fff;
              font-size: 24px;
              border: none;
              border-radius: 15px;
              background-color: #00ff00;
              cursor: pointer;
            }
          }
        }
      }

      .close {
        color: #ffffff;
        font-weight: 700;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
