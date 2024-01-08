<template>
  <div class="main Media_Container_CN">
    <center>
      <div class="MediaDownload" style="background-color:white">
        <div>
          <table class="menu">
            <tr>
              <td style="font-weight:600;">{{ $i18n.t('downloads.file') }}</td>
              <td style="font-weight:600;">{{ $i18n.t('downloads.download') }}</td>
            </tr>
          </table>
        </div>
        <div>
          <div v-for="(item, index) in list" :key="index">
            <el-button
              class="btn"
              style="width:100%;height:4vw;text-align:left;border-top:none;border-radius:0;"
              @click="handleshow(item.id)"
            >
              <img :src="item.icon">
              {{ item.title }}
              <i
                :class="
                  item.id == activeId
                    ? 'el-icon-arrow-down'
                    : 'el-icon-arrow-right'
                "
              ></i>
            </el-button>
            <div v-if="item.media_resource">
              <el-collapse-transition>
                <div class="transition-box" v-if="item.id == activeId">
                  <table>
                    <tr style="cursor:pointer;" v-for="(media_item, index) in item.media_resource" :key="index" @click="download(media_item.download_url)">
                      <td><img style="width:1.7vw; height:2.3vw;" :src="media_item.file_type"></td>
                      <td>{{ media_item.name }}</td>
                      <td>
                        <a :href="media_item.download_url" download>
                          <img src="../../assets/commonImage/download.png">
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>
<script>
import Parallax from 'parallax-js';

export default {
  data() {
    return {
      activeId: '',
      list: []
    };
  },
  mounted() {
    /*
        var scene = document.getElementById('scene');

        var parallaxInstance = new Parallax(scene, {
            relativeInput: true
        });
        */

    this.init();
  },
  methods: {
    init() {
      this.list = this.$i18n.t('media_resource');
    },

    handleshow(id) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id == id) {
          if (this.list[i].media_resource) {
            if (id == this.activeId) {
              this.activeId = -1;
            } else {
              this.activeId = id;
            }
          } else {
            window.open(this.list[i].target_href, '_blank');
          }
          break;
        }
      }
    },
    download(val) {
        window.location.href = val;
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
[data-aos='zoom-in-responsive'] {
  transition-property: transform, opacity;
  @media screen and (max-width: 769px) {
    transform: scale(0.5);
    opacity: 0;
    &.aos-animate {
      transition-delay: 0.5s;
      opacity: 1;
      transform: scale(1);
    }
  }
  @media screen and (min-width: 769px) {
    transform: scale(0.5);
    opacity: 0;
    &.aos-animate {
      opacity: 1;
      transform: scale(1);
    }
  }
}

@media screen and (max-width: 769px) {
  .backgroundBanner {
    height: 67.9vw;

    #scene {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: visible;
      img {
        position: absolute !important;
        top: auto !important;
        left: auto !important;
        bottom: -5vw !important;
        right: 5vw !important;
        width: 33vw;
      }
    }

    div {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .background_animate {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: bottom;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-80%);
        color: white;
        font-weight: 600;
        font-size: 6vw;
      }
    }
  }

  .MediaDownload {
    width: 80%;
    margin: 0 auto;
    padding: 8vw 0 19vw 0;

    .btn {
      img {
        display: none;
      }
      i {
        font-weight: 900;
        font-size: 5vw;
        float: right;
        padding: 3vw;
      }
    }

    table {
      font-size: 3.8vw;
      color: #656565;
      width: 100%;
      tr {
        border-bottom: 1px solid #d0d0d0;
        td {
          padding: 4vw 2vw;
        }

        td:first-child {
          width: 20%;
          text-align: right;
        }

        td:nth-child(2) {
          width: 40%;
          text-align: left;
        }

        td:last-child {
          width: 40%;
          text-align: right;
          a {
            img {
              width: 20%;
            }
          }
        }

        td:hover {
          cursor: pointer;
        }
      }
      tr:last-child {
        border-bottom: transparent;
      }
    }

    table.menu {
      tr {
        border-bottom: 3px solid #d0d0d0;
        td:first-child {
          text-align: center;
        }
        td:last-child {
          text-align: right;
        }
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .backgroundBanner {
    height: 30vw;

    #scene {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      img {
        position: absolute !important;
        top: auto !important;
        left: auto !important;
        bottom: 5vw !important;
        right: 6.9vw;
        width: 20.9vw;
        height: 20.9vw;
        animation: motion 5s infinite ease;

        @keyframes motion {
          0% {
            bottom: 0px;
          }
          50% {
            bottom: 50px;
          }
          100% {
            bottom: 0px;
          }
        }
      }
    }
    div {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .background_animate {
        width: 100%;
        height: 100%;
        background-size: cover;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        animation: move 10s linear 1s infinite;
      }
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-50%);
        color: white;
        font-weight: 500;
        font-size: 4vw;
      }
    }

    @keyframes move {
      0% {
        transform: translateX(0) scale(1);
      }
      50% {
        transform: translateX(10vw) scale(1.3);
      }
      100% {
        transform: translateX(0) scale(1);
      }
    }
  }

  .MediaDownload {
    width: 56.3vw;
    margin: 0 auto;
    padding: 2.6vw 3vw 3.8vw 3vw;
    margin-top:6.6vw;
    margin-bottom:6.6vw;

    .btn {
      span {
        img {
          width: 1.7vw;
          transform: scale(1.5);
          transform-origin: left;
          margin-right: 2vw;
        }

        i {
          float: right;
          position: relative;
          top: 0.3vw;
          vertical-align: middle;
        }
      }
    }

    table {
      width: 100%;
      tr {
        border-bottom: 1px solid #d0d0d0;
        td {
          padding: 1.1vw 0;
          color: #656565;
          font-size: 0.9vw;
          font-weight: lighter;
        }

        td:first-child {
          width: 17%;
          text-align: right;
        }

        td:nth-child(2) {
          width: 63%;
          text-align: left;
          padding-left: 2%;
        }

        td:last-child {
          width: 25%;
          text-align: right;
          padding-right: 5.3%;
          a {
            img {
              width: 1.9vw;
            }
          }
        }
      }

      tr:last-child {
        //border-bottom:none;
      }
    }

    table.menu {
      font-size: 0.9vw;
      font-weight: bold;
      width: 100%;

      tr:first-child {
        border-bottom: 3px solid #d0d0d0;
      }

      td {
        padding-top: 1.3vw;
        padding-bottom: 1.3vw;
      }
      td:first-child {
        text-align: left;
        padding-left: 6.5vw;
      }
      td:last-child {
        text-align: right;
        padding-right: 3vw;
      }
    }
  }
}

.main {
  height: auto;
  padding-bottom: 0px;

  .backgroundBanner {
    position: relative;
  }
}
</style>
<style lang="scss">
.Media_Container_CN {
  @media screen and (max-width: 769px) {
    .el-button {
      background: #fff !important;
      border-color: #d0d0d0;
      border-top: transparent;
      border-left: transparent;
      border-right: transparent;
      padding: 1vw 0;

      span {
        position: relative;
        top: 3.5vw;
        font-size: 4vw;
        font-weight: 400;
      }
    }
  }
  @media screen and (min-width: 769px) {
    .el-button {
      background: #fff;
      border-color: #d0d0d0;
      border-left: transparent;
      border-right: transparent;
      padding: 1.2vw 3vw;
      span {
        font-size: 0.9vw;
        font-weight: lighter;
      }

      .el-icon-arrow-right:before {
        font-weight: 900;
      }
    }
  }
}
</style>
