<template>
    <div id="Game_id" class="Game_Container_CN">
        <div class="Banner_Top">
            <div>
                <div class="background_animate">
                </div>
                <div data-aos="zoom-in-responsive">
                    <span v-html="$i18n.t('game.title')">
                    </span>
                </div>
            </div>
            <div id="scene">
                <img data-depth="0.6" src="../assets/game/game_top_img.png">
            </div>
        </div>
        <div class="content">
            <center>
                <el-menu class="menu_web" :default-active="activeIndex" mode="horizontal">
                    <el-menu-item index="majiong" @click="selectGameType(1)">
                        <div style="display:inline-block; width:1vw; overflow:hidden;">
                            <i class='icon-categoryicon1'>
                            </i>
                        </div>
                        {{ $i18n.t('game.mahjong') }}
                    </el-menu-item>
                    <el-menu-item index="puko" @click="selectGameType(2)">
                        <div style="display:inline-block; width:1.5vw; overflow:hidden;">
                            <i class='icon-categoryicon2' style="">
                            </i>
                        </div>
                        {{ $i18n.t('game.card_games') }}
                    </el-menu-item>
                    <el-menu-item index="other" @click="selectGameType(3)">
                        <div style="display:inline-block; width:1.5vw; overflow:hidden;">
                            <i class='icon-categoryicon3' style="">
                            </i>
                        </div>
                        {{ $i18n.t('game.board_games') }}
                    </el-menu-item>
                    <el-menu-item index="laohuji" @click="selectGameType(4)">
                        <div style="display:inline-block; width:1.7vw; overflow:hidden;">
                            <img src="../assets/icon/category_04.svg" style="position:relative;top:-0.2vw;width:1.7vw;">
                        </div>
                        {{ $i18n.t('game.slot_games') }}
                    </el-menu-item>
                    <el-menu-item index="street" @click="selectGameType(5)">
                        <div style="display:inline-block; width:1.5vw; overflow:hidden;">
                            <i class='icon-categoryicon5' style="">
                            </i>
                        </div>
                        {{ $i18n.t('game.arcade') }}
                    </el-menu-item>
                    <el-menu-item index="all" @click="selectGameType(0)">
                        {{ $i18n.t('game.all') }}
                    </el-menu-item>
                </el-menu>
                <el-select class="menu_wap" :value="activeIndex" placeholder="选着类型">
                    <el-option v-for="item in $t('gameType')" :value="item.name" :key="item.id" :label="item.name" @click.native="selectGameType(item.id, item.name)">
                    </el-option>
                    <el-option :label="$i18n.t('game.all')" value="all" @click.native="selectGameType(0, 'all')">
                    </el-option>

                    <!--
                    <el-option :label="$i18n.t('game.mahjong')" value="majiong" @click.native="selectGameType(1)">
                    </el-option>
                    <el-option :label="$i18n.t('game.card_games')" value="card_games" @click.native="selectGameType(2)">
                    </el-option>
                    <el-option :label="$i18n.t('game.board_games')" value="board_games" @click.native="selectGameType(3)">
                    </el-option>
                    <el-option :label="$i18n.t('game.slot_games')" value="slot_games" @click.native="selectGameType(4)">
                    </el-option>
                    <el-option :label="$i18n.t('game.arcade')" value="arcade" @click.native="selectGameType(5)">
                    </el-option>
                    <el-option :label="$i18n.t('game.all')" value="all" @click.native="selectGameType(0)">
                    </el-option>
                    -->
                </el-select>
                <div class="gameListContainer" v-loading="isLoading">
                    <div style="display:contents;" v-show="isShow">
                        <div class="nodata" style="text-align:center" v-if="list.length == 0">
                            <span>
                                {{ $i18n.t('game.coming_soon') }}
                            </span>
                        </div>
                        <div data-aos="fade-right" data-aos-offset="-100" data-aos-duration="500" data-aos-once="true" :data-aos-delay="((index + 3) * 100) % 300" class="gameItem" style="position:relative;" v-for="(item, index) in list" :key="index" v-else>
                            <div :class="{ hoverEffect: item.status == 1, comingsoon: item.status == 2}" style="position:relative; z-index:1;">
                                <img class="gameImage imageBorder" :src="item.img">
                                <div class="coming" v-if="item.status == 2">
                                    <img class="gameImage" src="https://bolegaming.oss-cn-hongkong.aliyuncs.com/static/image/game/comingsoon/comingsoon01.png">
                                </div>
                            </div>
                            <div style="background-color:white">
                                <div class="row">
                                    <div class="title col-sd-12 col-md-12 col-12">
                                        <span>
                                            {{ item.content.title }}
                                        </span>
                                        <div class="imgDiv">
                                          <img :src="require('../assets/game/game' + item.game_category_id + '.png')">
                                        </div>
                                    </div>
                                    <div class="gameContent col-sd-12 col-md-12 text-truncate">
                                        <span>
                                            {{ item.content.summary }}
                                        </span>
                                    </div>
                                    <span class="status hvr-sweep-to-right" :class="item.status == 2 ? 'unavailable' : ''">
                                        <span v-if="item.status == 1" @click="navigateToPage(item.id, item.status)">
                                            {{ $t('button.more') }}
                                        </span>
                                        <span v-if="item.status == 2" @click="$message($t('message.comingSoon'))">
                                            {{ $t('button.comingSoon') }}
                                        </span>
                                    </span>
                                    <div class="play-button" @click="goto(item.game_url)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
  </div>
</template>

<script>
import game from '~/root/game_Item_order.json';
import Parallax from 'parallax-js';
export default {
  /*
  metaInfo: {
    meta: [
      { property: 'og:url', content: 'https://www.bolegaming.com/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '博乐游戏 BoleGaming' },
      { property: 'og:description', content: '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。' },
      { property: 'og:image', content: 'https://www.bolegaming.com/static/bole.png' },
    ]
  },
  */
  data() {
    return {
      activeIndex: 'all',
      game: {},
      gameList: {},

        gameCategoryId: 0,
        lang: 'eng',
        list: [],
        isLoading: false,
        isShow: true,
    };
  },
  mounted() {
    this.initData();

    this.init();
    /*
    var scene = document.getElementById('scene');

    var parallaxInstance = new Parallax(scene, {
        relativeInput: true
    });
    */
  },
  methods: {
    initData() {
        this.isLoading = true;
        this.isShow = false;

        if (this.$i18n.locale == 'en') {
            $('#Game_id').removeClass('Game_Container_CN');
            $('#Game_id').addClass('Game_Container_EN');
            $('#Game_id').removeClass('Game_Container_KR');
            this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN'){
            $('#Game_id').removeClass('Game_Container_EN');
            $('#Game_id').addClass('Game_Container_CN');
            $('#Game_id').removeClass('Game_Container_KR');
            this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
            $('#Game_id').removeClass('Game_Container_EN');
            $('#Game_id').removeClass('Game_Container_CN');
            $('#Game_id').addClass('Game_Container_KR');
            this.lang = 'kr';
        } else {
            $('#Game_id').removeClass('Game_Container_EN');
            $('#Game_id').removeClass('Game_Container_CN');
            $('#Game_id').addClass('Game_Container_KR');
            this.lang = 'eng';
        }

        this.$api.request('/Game/getList?gameCategoryId=' + this.gameCategoryId + '&lang=' + this.lang).then((result) => {
            if (result.status) {
                this.list = result.data.list;
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });
    },
    selectGameType(gameCategoryId, gameName) {
        this.gameCategoryId = gameCategoryId;
        this.activeIndex = gameName;
        // this.activeIndex = gameCategoryId;
        this.initData();
    },
    navigateToPage(gameId, status) {
        if (status == 2) {
            this.$message(this.$t('message.comingSoon'));
            return false;
        }

        this.$router.push({
            path: 'gameDetail',
            query: {
                id: gameId
            }
        });
    },

    init() {
      this.game = this.$i18n.t('Game');
      // this.handleGameList('majiong');

      if (this.$i18n.locale == 'en') {
        $('#Game_id').removeClass('Game_Container_CN');
        $('#Game_id').addClass('Game_Container_EN');
        $('#Game_id').removeClass('Game_Container_KR');
      } else if (this.$i18n.locale == 'zh-CN'){
        $('#Game_id').removeClass('Game_Container_EN');
        $('#Game_id').addClass('Game_Container_CN');
        $('#Game_id').removeClass('Game_Container_KR');
      } else {
        $('#Game_id').removeClass('Game_Container_EN');
        $('#Game_id').removeClass('Game_Container_CN');
        $('#Game_id').addClass('Game_Container_KR');
      }
    },

    // handleGameList(x) {
    //   switch (x) {
    //     case 'majiong':
    //       this.gameList = this.game.majiong;
    //       this.activeIndex = x;
    //       break;

    //     case 'card_games':
    //       this.gameList = this.game.card_games;
    //       this.activeIndex = x;
    //       break;

    //     case 'slot_games':
    //       this.gameList = this.game.slot_games;
    //       this.activeIndex = x;
    //       break;

    //     case 'board_games':
    //       this.gameList = this.game.board_games;
    //       this.activeIndex = x;
    //       break;

    //     case 'arcade':
    //       this.gameList = this.game.arcade;
    //       this.activeIndex = x;
    //       break;

    //     case 'all':
    //       this.gameList = this.$utils.sorting_data(
    //         Object.values(this.game),game
    //       );

    //       this.activeIndex = x;
    //       break;
    //   }
    //   this.initData();
    // },

    handleHref(x, id) {
      if (x == 'false') {
        this.$message.info(this.$i18n.t('game.status_false'));
      } else {
        this.$router.push({ path: 'gameDetail', query: { id: id } });
      }
    },

    goto(link){
      window.open(link);
    }
  },

    watch: {
        '$i18n.locale'(val) {
            this.initData();
        }
  }
};
</script>
<style>
    .el-loading-mask
    {
        background-color:#F7F7F7 !important;
    }
</style>
<style lang="scss" scoped>
@import "../styles/game.scss";

@media only screen and (max-width: 769px) {
  @import "../styles/mobile/game.scss";
}

@media only screen and (min-width: 769px) {
  @import "../styles/pc/game.scss";
}

</style>
