<template>
	<div id="NavID" class="Nav_Container_CN">
	  <div class="mainContainer" id="mainContainerId">
	    <div
	      class="main"
	      id="menuId"
	      :class="{ MenuBackgroundActive: scrollActive || MenuOpenActicve }" style="background-color:rgba(0,0,0,0.8)"
	    >
	      <div class="navigationTobBarWeb">
	        <div class="Menu_container" :class="Active ? 'change' : ''" @click="handleMenuDisplay()">
	          <div class="bar1"></div>
	          <div class="bar2"></div>
	          <div class="bar3"></div>
	        </div>
	        <img
	          id="imgLogo"
	          src="../assets/img/bole_logo.png"
	          @click="$router.push({ path: 'index' })"
	        >
	        <div id="navigationListId" class="navigationList">
	          <div class="scrollContainer">
	            <ul>
	              <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/index')"
	                  class="hvr-underline-from-left"
	                  :class="active_path == '/index' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.index') }}</a>
	              </li>
	              <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/game')"
	                  class="hvr-underline-from-left"
	                  :class=" active_path == '/game' || active_path == '/gameDetail' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.game') }}</a>
	              </li>
	              <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/background')"
	                  class="hvr-underline-from-left"
	                  :class="active_path == '/background' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.background') }}</a>
	              </li>
	              <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/info')"
	                  class="hvr-underline-from-left"
	                  :class="active_path == '/info' || active_path == '/infoDetail' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.info') }}</a>
	              </li>
	              <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/recruitment')"
	                  class="hvr-underline-from-left"
	                  :class="active_path == '/recruitment' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.talent') }}</a>
	              </li>
	              <!-- <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/download_resource')"
	                  class="hvr-underline-from-left"
	                  :class=" active_path == '/download_resource' ? 'hover_active' : ''"
	                >{{ $i18n.t('menu.download') }}</a>
	              </li> -->

<!-- 	               <li @mouseover="showHover" @mouseout="showActive">
	                <a
	                  @click="handleRoute('/celebrity')"
	                  class="hvr-underline-from-left"
	                  :class="active_path == '/celebrity' ? 'hover_active' : ''"
	                >
	                  {{ $i18n.t('menu.celebrity') }}
	                </a>
	              </li> -->

                <!-- <li @mouseover="showHover" @mouseout="showActive">
                  <a
                    @click="handleRoute('/boleApp')"
                    class="hvr-underline-from-left"
                    :class="active_path == '/boleApp' ? 'hover_active' : ''"
                  >
                    {{ $i18n.t('menu.boleApp') }}
                  </a>
                </li> -->
                <!-- <li @mouseover="showHover" @mouseout="showActive">
                  <a
                    @click="handleRoute('/login')"
                    class="hvr-underline-from-left"
                    :class="active_path == '/login' ? 'hover_active' : ''"
                  >
                     {{ $i18n.t('menu.login') }} 客户中心
                  </a>
                </li> -->
	              <li id="contactUS">
	                <a @click="handleRoute('/contactUs')">{{ $i18n.t('contact_us.contact_us') }}</a>
	                <div class="social_icon_container">
	                  <div>
	                    <img
	                      src="../assets/socialmedia_icon/facebook.svg"
	                      @click="locationHref('https://www.facebook.com/bolegaming')"
	                    >
	                  </div>
	                  <div>
	                    <img
	                      src="../assets/socialmedia_icon/instagram.svg"
	                      @click="locationHref('https://www.instagram.com/bolegaming/')"
	                    >
	                  </div>
	                  <div>
	                    <img
	                      src="../assets/socialmedia_icon/twitter.svg"
	                      @click="locationHref('https://twitter.com/bolegaming')"
	                    >
	                  </div>
	                  <div>
	                    <img
	                      src="../assets/socialmedia_icon/youtube.svg"
	                      @click="locationHref('https://www.youtube.com/channel/UCXP9Vju7Eo9DhNWckhmANrQ')"
	                    >
	                  </div>
	                </div>
	              </li>
	            </ul>
	          </div>
	        </div>
	<!--         <label id="langBtnId" style="position:absolute;">
	          <div
	            style="width:100%;height:100%;position:absolute;border-radius:34px;z-index:2;"
	            @click="handleTranslate()"
	          ></div>
	          <label class="switch">
	            <input id="checkboxId" type="checkbox" checked>
	            <span class="slider round">
	              <label>中</label>
	              <label>Eng</label>
	            </span>
	          </label>
	        </label> -->
	        <el-dropdown @command="handleTranslate" style="position: absolute;
			right: 5%;
			top: 25%;
			color: white;
			z-index: 2;
			background: red;
			border-radius: 5px;
			padding: 0.5%;">
				<span class="el-dropdown-link">
					{{language}}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="EN">English</el-dropdown-item>
				<el-dropdown-item command="CN">中文</el-dropdown-item>
				<!--
				<el-dropdown-item command="KR">한국어</el-dropdown-item>
				-->
				</el-dropdown-menu>
			</el-dropdown>
	      </div>
	    </div>
	    <span
	      id="contact_US"
	      @click="$router.push({ path: '/contactUs' })"
	    >{{ $i18n.t('contact_us.contact_us') }}</span>
	    <!-- <div id="noscrollMask" @click="handleCloseMenu()" style="width:100%;height:100%;float:left;background-color:transparent;">
	    </div>-->
	  </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      Active: false,
      scrollActive: false,
      MenuOpenActicve: false,
      checkBoxCounter: false,
      active_path: '',
      language:''
    };
  },
  created() {
    this.active_path = this.$route.path;
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.init();
    this.defaultLanguage();

  },
  methods: {
    showHover() {
      this.active_path = '';
    },
    showActive() {
      this.active_path = this.$route.path;
    },
    handleScroll() {
      if (
        document.body.scrollTop <= 60 ||
        document.documentElement.scrollTop <= 60
      ) {
        this.scrollActive = false;
      }
      if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
      ) {
        this.scrollActive = true;
      }
    },
    handleMenuDisplay() {
      this.Active ? (this.Active = false) : (this.Active = true);
      var menu = document.getElementById('navigationListId');
      if (this.Active) {
        this.MenuOpenActicve = true;
        menu.style.height = (screen.height - 90).toString() + 'px';
        $('body').css('overflow-y', 'hidden');
      } else {
        menu.style.height = '0px';
        $('body').css('overflow-y', 'auto');
        setTimeout(this.handleMenuBackground, 600);
      }
    },

    handleMenuBackground() {
      if (!this.Active) {
        this.MenuOpenActicve = false;
      }
    },

    // handleTranslate() {
    //   if (this.checkBoxCounter) {
    //     this.$i18n.locale = 'zh-CN';
    //   } else {
    //     this.$i18n.locale = 'en';
    //   }
    // },

    defaultLanguage(){
    	if (this.$i18n.locale == 'en'){
			this.language = "English";
		} else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh' ){
			this.language = "中文";
		} else if (this.$i18n.locale == 'kr'){
			this.language = "한국어";
		}
    },

    handleTranslate(lang){

		switch (lang){
		case 'EN':
		this.$i18n.locale = 'en';
		this.language = 'English';
		break;

		case 'CN':
		this.$i18n.locale = 'zh-CN' || this.$i18n.locale == 'zh' ;
		this.language = '中文';
		break;

		case 'KR':
		this.$i18n.locale = 'kr';
		this.language = '한국어';
		break;
		}

    document.title = this.$i18n.t('index.title');
    localStorage.setItem('bole_lang', this.$i18n.locale);
    // console.log(this.$i18n.locale);
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

    init() {
      if (this.$i18n.locale == 'en') {
        $('#NavID').addClass('Nav_Container_EN');
        $('#NavID').removeClass('Nav_Container_CN');
        $('#NavID').removeClass('Nav_Container_KR');
      } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh'){
      	$('#NavID').removeClass('Nav_Container_EN');
        $('#NavID').addClass('Nav_Container_CN');
        $('#NavID').removeClass('Nav_Container_KR');
      } else {
      	$('#NavID').removeClass('Nav_Container_EN');
        $('#NavID').removeClass('Nav_Container_CN');
        $('#NavID').addClass('Nav_Container_KR');
      }
  	},
    locationHref(url) {
      if (window.app && typeof window.app.openurl == 'function') {
        window.app.openurl(url);
      } else {
        window.open(url);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.active_path = this.$route.path;
      if (this.Active) {
        this.handleMenuDisplay();
      }

      if (this.$route.name == 'ContactUs') {
        $('#contact_US').hide();
      } else {
        $('#contact_US').show();
      }

      if (this.$route.name == 'BoleApp') {
        $('#NavID').hide();
        $('#contact_US').show();
      } else {
        $('#NavID').show();
      }
    },

    '$i18n.locale'(val) {
    //   if (val == 'en') {
    //     this.checkBoxCounter = true;
    //     $('#checkboxId').prop('checked', false);
    //   } else if (val == 'zh-CN') {
    //     this.checkBoxCounter = false;
    //     $('#checkboxId').prop('checked', true);
  		// }
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
 @import "../styles/header.scss";

@media only screen and (min-width: 769px) {
 @import "../styles/pc/header.scss";
}

@media only screen and (max-width: 769px) {
 @import "../styles/mobile/header.scss";
}

</style>
