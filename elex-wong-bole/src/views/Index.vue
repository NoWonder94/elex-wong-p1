<template>
    <div id="Index_id" class="Index_Main Index_Container_CN">

<!--         <div class="topBannerWeb">
            <div id="topBannerTemplate" class="topBannerTemplate">
                <div class="topBannerLayout">
                    <div class="topBanner">
                        <div id="firstBanner" class="firstBanner">
                            <div class="index indexShow animated fadeIn">
                                <div class="real animated fadeIn1 zoomeffect">
                                </div>
                                <div class="title-layout">
                                    <div class="bg-year animated fadeInDown1">
                                    </div>
                                    <div class="bg-title animated fadeInDown2">
                                    </div>
                                </div>
                                <img class="real_name_background animated fadeIn2 fadeInMobile" src="../assets/pc/light.png">
                                <div class="real_name animated fadeInLeft1">
                                </div>
                                <div class="slogan">
                                    <div>
                                        <center class="animated fadeIn3">
                                            <p id="choice" class="hide">
                                                ＂{{ $t('index.t-mac-choice1') }}＂
                                            </p>
                                            <p class="right">
                                                "{{ $t('index.t-mac-choice2') }}"
                                            </p>
                                        </center>
                                        <span class="animated fadeIn4">
                                            - {{ $t('index.t-mac-name') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="gradient animated fadeIn3" style="position:absolute;">
                                    <img src="../assets/home/hot/gradient.png" style="width:100%;">
                                    <div class="scroll">
                                        <p>
                                            Scroll
                                        </p>
                                        <div class="scrolldown">
                                            <div class="line">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="secondBanner" class="secondBanner">
                            <div class="hotGames">
                                <div id="scene1">
                                    <div class="mahjong" style="position:absolute; width:67%;"  data-depth="0.9">
                                        <img src="../assets/home/hot/img1.png" style="position:absolute; top:15.3vw; left:12vw; width:15%;">
                                        <img src="../assets/home/hot/img2.png" style="position:absolute; top:27vw; left:25.5vw; width:8%;">
                                        <img src="../assets/home/hot/img3.png" style="position:absolute; top:35.5vw; left:19vw; width:8%;">
                                        <img src="../assets/home/hot/img4.png" style="position:absolute; top:15vw; left:75vw; width:15%; ">
                                        <img src="../assets/home/hot/img5.png" style="position:absolute; top:32vw; left:74vw; width:12%;">
                                    </div>
                                </div>
                                <div class="ribbon">
                                    <p>
                                        热门游戏
                                    </p>
                                </div>
                                <div class="gameTitle">
                                    <p>
                                        博乐游戏拥有棋牌、麻将、老虎机自主创新研发实力，致力于提供优质的游戏体验！
                                    </p>
                                </div>
                                <div class="gameList">
                                    <th>
                                        <td class="firstRow">
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/dezhou.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/dazhong.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/zjh.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/redblack.png">
                                            </a>
                                        </td>
                                    </th>
                                    <tr>
                                        <td class="secondRow">
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/blnn.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/sg.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/21.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/lh.png">
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="thirdRow">
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/xzdd.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/xlch.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/bjl.png">
                                            </a>
                                            <a @click="handleRoute('/game')">
                                                <img class="hover" src="../assets/bannerIcon/badugi.png">
                                            </a>
                                        </td>
                                    </tr>
                                </div>
                                <div class="gameListwap">
                                    <th>
                                      <td>
                                        <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="200" src="../assets/bannerIcon/dezhou.png"></a>
                                        <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="300" src="../assets/bannerIcon/dazhong.png"></a>
                                        <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="400" src="../assets/bannerIcon/zjh.png"></a>
                                      </td>
                                    </th>
                                    <tr>
                                        <td>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="500" src="../assets/bannerIcon/redblack.png"></a>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="600" src="../assets/bannerIcon/blnn.png"></a>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="700" src="../assets/bannerIcon/sg.png"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="800" src="../assets/bannerIcon/21.png"></a>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="900" src="../assets/bannerIcon/lh.png"></a>
                                          <a @click="handleRoute('/game')"><img class="hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="1000" src="../assets/bannerIcon/bjl.png"></a>
                                        </td>
                                    </tr>

                                  <div class="animated fadeIn4 fadeInMobile1">
                                    <a @click="handleRoute('/game')" class="active_path == '/game' ? 'hover_active' : ''" >
                                    <div class="highlight hvr-sweep-to-right shadow"><div class="align">更多游戏</div></div>
                                    <i class="bole-icon-rightarrowheads arrow"></i>
                                    </a>
                                  </div>
                                </div>
                                <div class="gradient" style="position:absolute; bottom:0; z-index:10;">
                                    <img src="../assets/home/hot/gradient.png" style="width:100%;">
                                    <div class="scroll">
                                        <p>
                                            Scroll
                                        </p>
                                        <div class="scrolldown">
                                            <div class="line">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="secondBannerFake" class="secondBannerFake">
                <div class="hotGames">
                    <div id="scene2">
                        <div class="mahjong" style="position:absolute; width:67%;"  data-depth="0.9">
                            <img src="../assets/home/hot/img1.png" style="position:absolute; top:15.3vw; left:12vw; width:15%;">
                            <img src="../assets/home/hot/img2.png" style="position:absolute; top:27vw; left:25.5vw; width:8%;">
                            <img src="../assets/home/hot/img3.png" style="position:absolute; top:35.5vw; left:19vw; width:8%;">
                            <img src="../assets/home/hot/img4.png" style="position:absolute; top:15vw; left:75vw; width:15%; ">
                            <img src="../assets/home/hot/img5.png" style="position:absolute; top:32vw; left:74vw; width:12%;">
                        </div>
                    </div>
                    <div class="ribbon">
                        <p>
                            热门游戏
                        </p>
                    </div>
                    <div class="gameTitle">
                        <p>
                            博乐游戏拥有棋牌、麻将、老虎机自主创新研发实力，致力于提供优质的游戏体验！
                        </p>
                    </div>
                    <div class="gameList">
                        <th>
                            <td>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/dezhou.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/dazhong.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/zjh.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/redblack.png">
                                </a>
                            </td>
                        </th>
                        <tr>
                            <td>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/blnn.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/sg.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/21.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/lh.png">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/xzdd.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/xlch.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/bjl.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/badugi.png">
                                </a>
                            </td>
                        </tr>
                    </div>
                    <div class="gameListwap">
                        <th>
                            <td data-aos="fade-right" data-aos-once="true"  data-aos-offset="200">
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/dezhou.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/dazhong.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/zjh.png">
                                </a>
                            </td>
                        </th>
                        <tr>
                            <td data-aos="fade-right" data-aos-once="true" data-aos-offset="250">
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/redblack.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/blnn.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/sg.png">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td data-aos="fade-right" data-aos-once="true" data-aos-offset="300">
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/21.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/lh.png">
                                </a>
                                <a @click="handleRoute('/game')">
                                    <img class="hover" src="../assets/bannerIcon/bjl.png">
                                </a>
                            </td>
                        </tr>
                        <div class="animated fadeIn4 fadeInMobile1">
                            <a @click="handleRoute('/game')" class="active_path == '/game' ? 'hover_active' : ''">
                                <div class="highlight hvr-sweep-to-right shadow">
                                    <div class="align">
                                        更多游戏
                                    </div>
                                </div>
                                <i class="bole-icon-rightarrowheads arrow">
                                </i>
                            </a>
                        </div>
                    </div>
                    <div class="gradient" style="position:absolute; bottom:0; z-index:10;">
                        <img src="../assets/home/hot/gradient.png" style="width:100%;">
                        <div class="scroll">
                            <p>
                                Scroll
                            </p>
                            <div class="scrolldown">
                                <div class="line">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="topBannerWap">
            <div id="banner1" class="banner1">
              <div class="index indexShow animated fadeIn">
                <div class="real animated fadeIn1 zoomeffect"></div>
                <div class="title-layout">
                  <div class="bg-year animated fadeInDown1"></div>
                  <div class="bg-title animated fadeInDown2"></div>
                </div>

                <img class="real_name_background animated fadeIn2 fadeInMobile" src="../assets/pc/light.png">
                <div class="real_name animated fadeInLeft1"></div>

                <div class="slogan">
                  <div>
                    <center class="animated fadeIn3">
                      <p id="choice" class="hide">＂{{ $t('index.t-mac-choice1') }}＂</p>
                      <p class="right">"{{ $t('index.t-mac-choice2') }}"</p>
                    </center>
                    <span class="animated fadeIn4">- {{ $t('index.t-mac-name') }}</span>
                  </div>
                </div>
                <div class="gradient" style="position:absolute;">
                  <img src="../assets/home/hot/gradient.png" style="width:100%;">
                  <div class="scroll">
                    <p>Scroll</p>
                    <div class="scrolldown">
                      <div class="line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="banner2" class="banner2">
                <div class="hotGames">
                  <div id="scene">
                    <div class="mahjong" style="position:absolute; width:67%;"  data-depth="0.9">
                      <img src="../assets/home/hot/img1.png" style="position:absolute; top:15.3vw; left:12vw; width:15%;">
                      <img src="../assets/home/hot/img2.png" style="position:absolute; top:27vw; left:25.5vw; width:8%;">
                      <img src="../assets/home/hot/img3.png" style="position:absolute; top:35.5vw; left:19vw; width:8%;">
                      <img src="../assets/home/hot/img4.png" style="position:absolute; top:15vw; left:75vw; width:15%; ">
                      <img src="../assets/home/hot/img5.png" style="position:absolute; top:32vw; left:74vw; width:12%;">
                    </div>
                  </div>
                  <div class="ribbon">
                    <p>热门游戏</p>
                  </div>
                  <div class="gameTitle">
                    <p>博乐游戏拥有棋牌、麻将、老虎机自主创新研发实力，致力于提供优质的游戏体验！</p>
                  </div>
                  <div class="gameListwap">
                    <th>
                      <td class="firstwap" data-aos="fade-right" data-aos-once="true"  data-aos-offset="200">
                        <img src="../assets/bannerIcon/dezhou.png">
                        <img src="../assets/bannerIcon/dazhong.png">
                        <img src="../assets/bannerIcon/zjh.png">
                      </td>
                    </th>
                    <tr>
                        <td class="secondwap" data-aos="fade-right" data-aos-once="true"  data-aos-offset="200">
                          <img src="../assets/bannerIcon/redblack.png">
                          <img src="../assets/bannerIcon/blnn.png">
                          <img src="../assets/bannerIcon/sg.png">
                        </td>
                    </tr>
                    <tr>
                        <td class="thirdwap" data-aos="fade-right" data-aos-once="true"  data-aos-offset="200">
                          <img src="../assets/bannerIcon/21.png">
                          <img src="../assets/bannerIcon/lh.png">
                          <img src="../assets/bannerIcon/bjl.png">
                        </td>
                    </tr>

                  <div class="animated fadeIn4 fadeInMobile1">
                    <a @click="handleRoute('/game')" class="active_path == '/game' ? 'hover_active' : ''" >
                    <div class="highlight hvr-sweep-to-right shadow"><div class="align">更多游戏</div></div>
                    <i class="bole-icon-rightarrowheads arrow"></i>
                    </a>
                  </div>
                  </div>
                  <div class="gradient" style="position:absolute; bottom:0; z-index:10;">
                    <img src="../assets/home/hot/gradient.png" style="width:100%;">
                    <div class="scroll">
                      <p>Scroll</p>
                      <div class="scrolldown">
                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div> -->

    <div class="Banner_Top_Container">
        <div id="scene" data-aos="zoom-in-up" data-aos-duration="500">
            <div class="layer_bottom" data-depth="-0.2">
                <img class="bg" src="../assets/home/topbg.png">
            </div>
            <div class="layer_3" data-depth="0.3">
                <img src="../assets/home/topbtn_08.png">
                <img src="../assets/home/topbtn_09.png">
            </div>
            <div class="layer_2" data-depth="0.6">
                <img src="../assets/home/topbtn_05.png">
                <img src="../assets/home/topbtn_06.png">
                <img src="../assets/home/topbtn_07.png">
            </div>
            <div class="layer_1" data-depth="0.9">
                <img src="../assets/home/top_01.png">
                <img src="../assets/home/topbtn_02.png">
                <img src="../assets/home/topbtn_03.png">
                <img src="../assets/home/topbtn_01.png">
            </div>
        </div>
        <div class="title_container">
            <div class="inner_container">
                <span class="title">{{$t('index.title')}}</span>
                <span class="title2"><span>{{$t('index.introduce_1')}}</span> <span>{{$t('index.introduce_2')}}</span></span>
                <div class="item">
                    <div>
                       <img src="../assets/home/item_01.png"><br>
                       <span>{{$t('index.Mahjong')}}</span>
                    </div>
                    <div>
                        <img src="../assets/home/item_02.png"><br>
                        <span>{{$t('index.Card_Games')}}</span>
                    </div>
                    <div>
                        <img src="../assets/home/item_03.png"><br>
                        <span>{{$t('index.Slot_Games')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll_effect">
            <span>Scroll <i class="el-icon-arrow-down" ></i></span>
            <br>
            <span></span>
        </div>
    </div>
    <div class="lastest_Info" data-0="opacity:1;" data-200="opacity:0;">
      <center>
        <!-- <h2 class="title">{{ $t('index.video_title') }}</h2>
        <iframe
          id="frameId"
          src="https://www.youtube.com/embed/4oXm1LTcymQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <h2 class="title">{{ $t('index.latest_Info') }}</h2>
        <!-- <div class="banner"></div> -->
        <div class="Info">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiperSlide v-for="item in list" v-bind:key="item.id" style="width:360px;">
              <div
                class="Info_container"
                @click="navigateToPage(item.id)" :key="item.id"
              >
                <img :src="item.img">
                <div class="Info_details" style="width:100%;">
                  <p class="subject_title">{{ item.content.title }}</p>
                  <div class="subject_content">{{ item.content.summary }}</div>
                  <span
                    class="btn_more_details"
                    @click="$router.push({path: '/infoDetail', query: { id: item.id }})"
                  >{{ $t('index.more') }}</span>
                </div>
              </div>
            </swiperSlide>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          </swiper>
          <i @click="swiperPrev()" class="el-icon-arrow-left"></i>
          <i @click="swiperNext()" class="el-icon-arrow-right"></i>
        </div>
        <!-- <iframe
          id="frameId"
          src="https://www.youtube.com/embed/gJsNp0OtWYQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
      </center>
    </div>
    <div class="authority">
      <div class="declare" data-aos="fade-left" data-aos-offset="150">
        <span class="title">{{ $t('index.itech_verify') }}</span>
        <hr>
        <p v-html="$t('index.itech_descript')"></p>
        <p>{{ $t('index.itech_descript2') }}</p>
        <span class="more">
          <a
            href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf"
            target="_blank"
          >{{ $t('index.more') }} >></a>
        </span>
      </div>
      <div class="pic" data-aos="fade-up" data-aos-offset="150"></div>
    </div>
    <div class="authority_mobile">
      <span class="title" data-aos="fade-up" data-aos-offset="0">
        {{ $t('index.itech_verify') }}
        <hr>
      </span>

      <div data-aos="fade-up" data-aos-offset="0">
        <div class="pic">
          <img src="../assets/home/img_itechlabs.png">
        </div>
        <div class="declare">
          <p v-html="$t('index.itech_descript_mobile')"></p>
        </div>
      </div>
      <div class="btn_container" data-aos="fade-up" data-aos-offset="0">
        <a
          href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf"
          target="_blank"
        >
          <span>{{ $t('index.more') }}</span>
        </a>
      </div>
    </div>
    <div id="cooperation_id" class="cooperationInfo" style="min-height:200px;position:relative;">
      <div>
        <p>{{ $t('index.strength_title') }}</p>
        <img src="../assets/home/bottom_01.png" width="30%;">
        <p>{{ $t('index.strength') }}</p>
      </div>
      <div>
        <p>{{ $t('index.anti_cheating_title') }}</p>
        <img src="../assets/home/bottom_02.png" width="30%;">
        <p>{{ $t('index.anti_cheating') }}</p>
      </div>
      <div>
        <p>{{ $t('index.ultra_stable_title') }}</p>
        <img src="../assets/home/bottom_03.png" width="30%;">
        <p>{{ $t('index.ultra_stable') }}</p>
      </div>
      <div>
        <p>{{ $t('index.HTML5_engine_title') }}</p>
        <img src="../assets/home/bottom_04.png" width="30%;">
        <p>{{ $t('index.HTML5_engine') }}</p>
      </div>
      <div>
        <p>{{ $t('index.Java_title') }}</p>
        <img src="../assets/home/bottom_05.png" width="30%;">
        <p>{{ $t('index.Java') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Info_Order from '~/root/Info_Item_order.json';
import 'aos/dist/aos.css';
import Parallax from 'parallax-js'
import AOS from 'aos';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpointsInverse: true,
        breakpoints: {
          100: {
            slidesPerView: 1.2,
            spaceBetween: 15,
            centeredSlides: true
          },

          700: {
            slidesPerView: 4,
            spaceBetween: 5,
            centeredSlides: false
          },

          900: {
            slidesPerView: 4,
            spaceBetween: 10,
            centeredSlides: false
          },

          1350: {
            slidesPerView: 4,
            spaceBetween: 10,
            centeredSlides: false
          }
        }
      },
      InfoInquiry: {},
      current_pointer: 1,

      isRevealed: undefined,
      isAnimating: undefined,
      step: 0,
      modify: '',
      modify2: '',
      active: '',
      pageSize: 50,
      noscroll: undefined,
      lang: 'eng',
      list: [],
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  components: {
    swiper,
    swiperSlide
  },
  created() {
    document.title = this.$t('index.title');
  },
  mounted() {
    $(document).ready(function() {
        $(this).scrollTop(0);
        var isRowEffectDone = false;

        $(window).scroll(function() {
            var windowHeight = $(window).scrollTop();

            if (windowHeight < 1) {
                $('.topBannerTemplate').show();
                $('.secondBannerFake').hide();
            } else {
                $('.firstRow').removeClass('animated slideInLeftMod1').show();
                $('.secondRow').removeClass('animated slideInLeftMod2').show();
                $('.thirdRow').removeClass('animated slideInLeftMod3').show();
                $('.topBannerTemplate').hide();
                $('.secondBannerFake').show();
                isRowEffectDone = true;
            }

            var wapTopBannerScroll = 1 - (windowHeight / 600);
            $('.banner1').css('opacity', wapTopBannerScroll);
            $('.banner1').css('transform', 'scale(' + wapTopBannerScroll + ')');
            $('.banner1').css('transform-origin', '50% 100%');
        });

        $('#topBannerTemplate').scroll(function() {
            var topBannerScroll = $('#topBannerTemplate').scrollTop();

            if (topBannerScroll <= 300) {
                var firstBannerOpacity = 1 - (topBannerScroll / 300);
                $('.firstBanner').css('opacity', firstBannerOpacity);
                $('.secondBanner').css('opacity', 0);
            } else {
                $('.firstBanner').css('opacity', 0);
                var secondBannerOpacity = (topBannerScroll / 300) - 1;
                $('.secondBanner').css('opacity', secondBannerOpacity);

                if (secondBannerOpacity >= 0.2 && isRowEffectDone == false) {
                    $('.firstRow').addClass('animated slideInLeftMod1').show();
                    $('.secondRow').addClass('animated slideInLeftMod2').show();
                    $('.thirdRow').addClass('animated slideInLeftMod3').show();
                    isRowEffectDone = true;

                    setTimeout(function() {
                        $('html, body').scrollTop(1);
                    }, 1000);
                }
            }

            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                $('html, body').animate({
                    scrollTop: 1
                }, 0);
            }
        });
    });

    clearInterval(this.interval_id);
    this.init();
    this.hide();
  },
  destroyed() {
    clearInterval(this.interval_id);
  },
  methods: {
    init() {
        if (this.$i18n.locale == 'en') {
            $('#Index_id').removeClass('Index_Container_CN');
            $('#Index_id').addClass('Index_Container_EN');
            $('#Index_id').removeClass('Index_Container_KR');
            this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh') {
            $('#Index_id').removeClass('Index_Container_EN');
            $('#Index_id').addClass('Index_Container_CN');
            $('#Index_id').removeClass('Index_Container_KR');
            this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
            $('#Index_id').removeClass('Index_Container_EN');
            $('#Index_id').removeClass('Index_Container_CN');
            $('#Index_id').addClass('Index_Container_KR');
            this.lang = 'kr'
        } else {
            $('#Index_id').removeClass('Index_Container_CN');
            $('#Index_id').addClass('Index_Container_EN');
            $('#Index_id').removeClass('Index_Container_KR');
            this.lang = 'eng';
        }

        this.$api.request('/Info/getList?pageSize=' + this.pageSize + '&lang=' + this.lang).then((result) => {
            if (result.status) {
                this.list = result.data.list;
                this.totalCount = result.data.totalCount;
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });



        // this.InfoInquiry = this.$utils.sorting_data_bydate(
        //     Object.values(this.$t('Info')).slice(0, 3)
        // );

        this.resizeMethods();
        window.addEventListener('resize', this.resizeMethods, false);

        var scene1 = document.getElementById('scene1');
        var parallaxInstance = new Parallax(scene1, {
            relativeInput: true
        });

        var scene2 = document.getElementById('scene2');
        var parallaxInstance = new Parallax(scene2, {
            relativeInput: true
        });
    },
    navigateToPage(infoId) {
        this.$router.push({
            path: 'infoDetail',
            query: {
                id: infoId
            }
        });
    },
    hide() {
      if (this.$i18n.locale == 'en') {
        $('#choice').addClass('hide');
      } else  if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh'){
        $('#choice').removeClass('hide');
      } else  if (this.$i18n.locale == 'kr'){
        $('#choice').removeClass('hide');
      } else {
        $('#choice').addClass('hide');
      }
    },

    resizeMethods() {
      if (window.innerWidth <= 768 && !this.active_coroseul) {
        this.handlecoroseul();
      } else if (window.innerWidth > 768 && this.active_coroseul) {
        this.active_coroseul = false;
        clearInterval(this.interval_id);
        $('#cooperation_id div').css('opacity', '1');
        return;
      }
    },

    handleRoute(path) {
      if (path == this.$route.path) {
        if (this.Active) {
          this.handleMenuDisplay();
        }
      } else {
        this.$router.push({ path: path });
      }
    },

    swiperPrev() {
      this.swiper.slidePrev();
    },

    swiperNext() {
      this.swiper.slideNext();
    },

    handlecoroseul() {
      this.active_coroseul = true;
      $('#cooperation_id div').css('opacity', '0');
      $('#cooperation_id div:first-child').css('opacity', '1');
      this.interval_id = setInterval(() => {
        $('#cooperation_id div:nth-child(' + this.current_pointer + ')').css(
          'opacity',
          '0'
        );
        if (this.current_pointer == 5) {
          this.current_pointer = 1;
        } else {
          this.current_pointer += 1;
        }
        $('#cooperation_id div:nth-child(' + this.current_pointer + ')').css(
          'opacity',
          '1'
        );
      }, 5000);
    }
  },

  watch: {
    '$i18n.locale'(val) {
      this.lang = val;
      this.init();
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

@media only Screen and (max-width: 769px) {
  @import "../styles/mobile/index.scss";
}

@media only Screen and (min-width: 769px) {
  @import "../styles/pc/index.scss"
}

</style>
