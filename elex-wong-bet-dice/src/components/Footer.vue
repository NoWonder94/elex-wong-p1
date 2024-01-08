<template>
    <footer>
        <div class="row footer-nav-list">
            <div class="col-sm-2 footer-nav" @click="nav('')">
                <div class="footer-nav-logo">
                    <img :class="[dice?'none':'']" src="../assets/img/dice_1.png">
                    <img :class="[dice?'':'none']" src="../assets/img/dice_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('games.dice') }}
                </div>
            </div>
            <div class="col-sm-2 footer-nav" @click="nav('races')">
                <div class="footer-nav-logo">
                    <img :class="[races?'none':'']" src="../assets/img/race_1.png">
                    <img :class="[races?'':'none']" src="../assets/img/race_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('race') }}
                </div>
            </div>
            <!--<div class="col-sm-2 footer-nav" @click="nav('slot')">
                <div class="footer-nav-logo">
                    <img  :class="[slot?'none':'']" src="../assets/img/slot_1.png">
                    <img  :class="[slot?'':'none']" src="../assets/img/slot_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('games.slot') }}
                </div>
            </div>-->
            <div class="col-sm-2 footer-nav" @click="nav('referral')">
                <div class="footer-nav-logo">
                    <img :class="[referral?'none':'']" src="../assets/img/referral_1.png">
                    <img :class="[referral?'':'none']" src="../assets/img/referral_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('referral') }}
                </div>
            </div>
            <div class="col-sm-2 footer-nav" @click="nav('dividend')">
                <div class="footer-nav-logo">
                    <img :class="[dividend?'none':'']" src="../assets/img/dividend_1.png">
                    <img :class="[dividend?'':'none']" src="../assets/img/dividend_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('dividend') }}
                </div>
            </div>
            <div class="col-sm-2 footer-nav" @click="nav('riskyFarmer')">
                <div class="footer-nav-logo">
                    <img :class="[risky?'none':'']" src="../assets/img/risk_1.png">
                    <img :class="[risky?'':'none']" src="../assets/img/risk_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('risky') }}
                </div>
            </div>
            <!--
            <div class="col-sm-2 footer-nav" @click="nav('games')">
                <div class="footer-nav-logo">
                    <img :class="[Games?'none':'']" src="../assets/img/game_1.png">
                    <img :class="[Games?'':'none']" src="../assets/img/game_2.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('game') }}
                </div>
            </div>
            -->
            <!-- <div class="col-sm-2 footer-nav" @click="showSettingLayout()">
                <div class="footer-nav-logo">
                    <img src="../assets/img/setting.png">
                </div>
                <div class="footer-nav-name">
                    {{ $i18n.t('settings') }}
                </div>
                <div id="settingLayout" class="footer-setting-list">
                    <div class="setting-item" @click="toggle('sound')">
                        <img src="../assets/img/sounds.png">
                        {{ $i18n.t('sounds') }}
                    </div>
                    <div class="setting-item" @click="toggle('animation')">
                        <img src="../assets/img/toggle.png">
                        {{ $i18n.t('animation') }}
                    </div>
                    <div class="setting-item" @click="toggle('max bet')">
                        <img src="../assets/img/fire.png">
                        {{ $i18n.t('maxBet') }}
                    </div>
                </div>
            </div> -->
           
        </div>
    </footer>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import jQuery from 'jquery';

export default class Footer extends Vue {

    dice:boolean=true;
    slot:boolean=false;
    races:boolean=false;
    referral:boolean=false;
    dividend:boolean=false;
    risky:boolean=false;
    Games:boolean=false;
    currpage:any;

    
    mounted(){
        this.dice=false;
        this.slot=false;
        this.races=false;
        this.referral=false;
        this.dividend=false;
        this.risky=false;
        this.Games=false;
        var item=localStorage.getItem('routeNow')
        switch(item)
        {
            case 'Races': this.races=true;break;
            case 'SlotGame': this.slot=true;break;
            case 'Referral': this.referral=true;break;
            case 'Dividend': this.dividend=true;break;
            case 'RiskyFarmer': this.risky=true;break;
            case 'Games': this.Games=true;break;
            default:this.dice=true;break;
        }
    }

    nav(page:any) {

        this.dice=false;
        this.slot=false;
        this.races=false;
        this.referral=false;
        this.dividend=false;
        this.risky=false;
        this.Games=false;

        if (page == 'chats') {
            window.open('https://t.me/crazydiceapp');
            
        } else {
            this.$router.push({path: '/' + page});
            switch(page)
            {
                case 'races': this.races=true;break;
                case 'slot': this.slot=true;break;
                case 'referral': this.referral=true;break;
                case 'dividend': this.dividend=true;break;
                case 'riskyFarmer': this.risky=true;break;
                case 'games': this.Games=true;break;
                default:this.dice=true;break;
            }
        }
    }

    toggle(func: any) {
        alert(func);
    }

    showSettingLayout() {
        var isOpen = jQuery("#settingLayout").hasClass("open");
        if (isOpen == false) {
            jQuery('#settingLayout').show();
            jQuery("#settingLayout").addClass("open");
        } else {
            jQuery('#settingLayout').hide();
            jQuery("#settingLayout").removeClass("open");
        }
    }
}
</script>
<style src="@/assets/css/footer.css" scoped>
</style>