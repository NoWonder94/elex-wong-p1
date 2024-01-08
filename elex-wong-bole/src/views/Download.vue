<template>
    <div class="main download_Container_CN">
        <div class="backgroundBanner" id="backgroundBannerId">
            <div>
                <div class="background_animate">
                </div>
                <div data-aos="zoom-in-responisve">
                    <span>
                        {{ $i18n.t('downloads.title') }}
                    </span>
                </div>
            </div>
            <div id="scene">
                <img data-depth="0.6" src="../assets/download/download_top_img.png">
            </div>
        </div>
        <center>
            <div class="resourceDownload">
                <div>
                    <table class="menu">
                        <tr>
                            <td>
                                {{ $i18n.t('downloads.file') }}
                            </td>
                            <td>
                                {{ $i18n.t('downloads.download') }}
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-loading="isLoading">
                    <div v-for="(item, index) in list" :key="index" v-show="isShow">
                        <el-button class="btn" @click="handleshow(item.id)">
                            <img :src="item.img">
                            {{ item.name }}
                            <i :class="item.id == activeId ? 'el-icon-arrow-down' : 'el-icon-arrow-right'">
                            </i>
                        </el-button>
                        <div v-if="item.content">
                            <el-collapse-transition>
                                <div class="transition-box" v-if="item.id == activeId">
                                    <table>
                                        <tr v-for="(download_item, index) in item.content" :key="index">
                                            <td>
                                                {{ download_item.file_format }}
                                            </td>
                                            <td>
                                                {{ download_item.name }}
                                            </td>
                                            <td>
                                                <a :href="download_item.file" download>
                                                    <img src="../assets/commonImage/download.png">
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
      //list: [],

        lang: 'eng',
        list: [],
        isLoading: false,
        isShow: true,
    };
  },
  mounted() {
    /*
        var scene = document.getElementById('scene');

        var parallaxInstance = new Parallax(scene, {
            relativeInput: true
        });
        */

    this.initData();

    //this.init();
  },
  methods: {
    initData() {
        this.isLoading = true;
        this.isShow = false;

        if (this.$i18n.locale == 'en') {
            this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh') {
            this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
            this.lang = 'kr';
        } else {
            this.lang = 'eng';
        }

        this.$api.request('/Resource/getList?lang=' + this.lang).then((result) => {
            if (result.status) {
                this.list = result.data.list;
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });
    },

    init() {
      this.list = this.$i18n.t('download_resource');
    },

    handleshow(id) {
        /*
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id == id) {
          if (this.list[i].download_resource) {
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
        */

        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                if (id == this.activeId) {
                    this.activeId = -1;
                } else {
                    this.activeId = id;
                }
            }
        }
    }
  },
    watch: {
        '$i18n.locale'(val) {
            this.initData();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/download.scss";

@media screen and (max-width: 769px) {
  @import "../styles/mobile/download.scss";
}
@media screen and (min-width: 769px) {
  @import "../styles/pc/download.scss";
}
</style>
