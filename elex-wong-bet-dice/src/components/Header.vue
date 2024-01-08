<template>
  <header>
    <div class="header-logo">
      <img class="drawerlogo" src="../assets/img/Group_9408.png"  @click="openMenu()"/>
      <img class="titlelogo" src="../assets/img/logo1.png"  @click="nav('')"/>
    </div>
    <div class="header-action" @click="nav('chats')">
      <img  class="chat-logo" src="../assets/img/telegram.png" />
      <div class="header-chats" >
        {{ $i18n.t('chats') }}
      </div>
    </div>
    <div class="header-action" @click="showWallets" style="margin-right: 10px;">
      <img  class="login-logo" src="../assets/img/wallet.png" />
      <div class="header-login" >
        {{ address == 'Login' ? $i18n.t('login') : address }}
      </div>
    </div>
    <Drawer :direction="'left'" :exist="true" ref="LeftDrawer" >
      <template v-slot:content>
        <div class="drawer">
          <div class="drawerheader">
            <img class="drawerlogo2" src="../assets/img/logo2.png"/>
            <img class="drawerclose" src="../assets/img/close.png" @click="openMenu()"/>
          </div>
          <hr class="hr1">
          <div class="drawerlog flex languagetext" v-show="login" @click="showWallets">
            <img  src="../assets/img/wallet1.png"/>
            <div >{{ address == 'Login' ? $i18n.t('login1') : address }}</div>
          </div>
          <div class="drawerlog flex languagetext" v-show="logout">
            <img  src="../assets/img/log_out.png"/>
            <div>{{$i18n.t('logout')}}</div>
          </div>
          <hr class="hr1">
          <div class="drawerlog flex">
            <img  src="../assets/img/Language.png"/>
            <div>{{$i18n.t('language')}}</div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('english')">
            {{ $i18n.t('lang.english') }}
            </div>
            <div  v-show="english" ><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('chinese')">
              {{ $i18n.t('lang.chinese') }}
            </div>
            <div v-show="chinese" ><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('japanese')">
              {{ $i18n.t('lang.japanese') }}
            </div>
            <div v-show="japanese"><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('korean')">
              {{ $i18n.t('lang.korean') }}
            </div>
            <div v-show="korean"><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('spanish')">
              {{ $i18n.t('lang.spanish') }}
            </div>
            <div v-show="spanish"><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('french')">
              {{ $i18n.t('lang.french') }}
            </div>
            <div v-show="french" ><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
          <div class="drawerlan">
            <div class="languagetext" @click="translateLanguage('german')">
              {{ $i18n.t('lang.german') }}
            </div>
            <div v-show="german"><img  src="../assets/img/correct.png"/></div>
          </div>
          <hr>
        </div>
      </template>
    </Drawer>
  </header>
  <div class="wallet-adapter-modal" id="walletAdapterModal">
    <div class="wallet-adapter-modal-container">
      <div class="wallet-adapter-modal-wrapper">
        <h1 class="wallet-adapter-modal-title">{{ $i18n.t('login1') }}</h1>
        <button class="wallet-adapter-modal-button-close" @click="hideWallets">
            <svg width="14" height="14">
              <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
            </svg>
        </button>
        <ul class="wallet-adapter-modal-list">
          <template v-for="(item, index) in wallets" :key="index">
          <li v-if="index < 7 || (index > 6 && expandedWallets)">
            <button class="wallet-adapter-button" type="button" @click="connectWallet(item)">
              <template v-if="item.status">
                {{ item.wallet.name }}
              </template>
              <template v-else>
                <a :href="item.url" target="_blank" v-if="item.url">Install {{ item.wallet.name }} {{ item.wallet.name.indexOf('Extension') == -1 ? 'Extension' : '' }}</a>
                <a :href="item.wallet.url" target="_blank" v-else>Install {{ item.wallet.name }}</a>
              </template>
              <i className="wallet-adapter-button-icon">
                <img :src="item.wallet.icon" :alt="`${item.wallet.name} icon`">
              </i>
            </button>
          </li>
          </template>
          <li>
            <button class="wallet-adapter-button wallet-adapter-modal-collapse-button" 
            :class="{ 'wallet-adapter-modal-collapse-button-active': expandedWallets }" 
            @click="expandedWallets = !expandedWallets"
            type="button"> 
              {{ $i18n.t('moreWallet') }}
              <i className="wallet-adapter-button-icon">
                <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg">
                  <path d="m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z" />
                </svg>
              </i>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="wallet-adapter-modal-overlay" @mousedown="hideWallets"/>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { reactive } from 'vue';
import { useStore, mapGetters } from "vuex";
import jQuery from "jquery";
import { WALLETS } from "@/defines";
import Drawer from'./Drawer.vue';

@Options({
  computed: mapGetters("account", {
    address: "walletAddress"
  }),
  components: {
    Drawer
  }
})
export default class Header extends Vue {
  address!: string;
  lang!: string;

  english:boolean=false;
  chinese:boolean=false;
  japanese:boolean=false;
  korean:boolean=false;
  spanish:boolean=false;
  french:boolean=false;
  german:boolean=false;
  login:boolean=false;
  logout:boolean=false;

  data() {
    return {
      lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'english',
    }
  }

  mounted(){
    this.showLangLayout(this.lang);
    this.login=true;

  }

  store = useStore();
  wallets = reactive(WALLETS);
  expandedWallets = false;
  
  connectWallet(provider:any) {
    if (!provider.status) {
      return;
    }
    this.store.dispatch("account/setWallet", provider.wallet.adapter);
    this.hideWallets();
  }

  nav(page:any) {
    if (page == 'chats') {
        window.open('https://t.me/crazydiceapp');
    } else {
        this.$router.push({path: '/' + page});
    }

  }

  signin(type:any) {
    this.logout=true;
    this.login=false;
    alert(type);
  }

  signout() {
    alert('signout');
    this.logout=false;
    this.login=true;
  }

  showLangLayout(lang:any) {
    
    this.english=false;
    this.chinese=false;
    this.japanese=false;
    this.korean=false;
    this.spanish=false;
    this.french=false;
    this.german=false;
    switch(lang)
    {
      case 'english': this.english=true;break;
      case 'chinese': this.chinese=true;break;
      case 'japanese':this.japanese=true;break;
      case 'korean': this.korean=true;break;
      case 'spanish': this.spanish=true;break;
      case 'french': this.french=true;break;
      case 'german': this.german=true;break;
    }
  }

  translateLanguage(lang:any) {
    localStorage.setItem('lang', lang);
    this.lang = lang;
    this.$i18n.locale = lang;
    this.showLangLayout(lang);
  }

  showLoginLayout() {
    const leftDrawer=this.$refs.LeftDrawer as refInterface
    leftDrawer.close();
    var isOpen = jQuery("#loginLayout").hasClass("open");
    if (isOpen == false) {
      jQuery("#loginLayout").show();
      jQuery("#loginLayout").addClass("open");
    } else {
      jQuery("#loginLayout").hide();
      jQuery("#loginLayout").removeClass("open");
    }
  }

  openMenu(){
    const leftDrawer=this.$refs.LeftDrawer as refInterface
    
    if(leftDrawer.active){
      leftDrawer.close();					
    }else{
      leftDrawer.open();
    }
  }

  showWallets() {
    const leftDrawer=this.$refs.LeftDrawer as refInterface
    leftDrawer.close();
    jQuery('#walletAdapterModal').show().css('opacity', 1);

    for (const index in this.wallets) {
      const item = this.wallets[index];
      item.wallet.adapter.ready().then((status:boolean) => {
        this.wallets[index].status = status;
      });
    }
  }

  hideWallets() {
    jQuery('#walletAdapterModal').hide().css('opacity', 0);
  }
}

interface refInterface extends Vue{
  close():void;
  open():void;
  active:number;
}
</script>
<style src="@/assets/css/header.css" scoped>
</style>