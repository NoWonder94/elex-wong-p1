<template>
    <div class="gamewrap">
        <div class="games">
            <div class="gamelogin">
                <div><img src="../assets/img/profile_icon.png"></div>
                <button :class="[login?'none':'','registerbutton']" @click="openpop('register',true)">{{ $i18n.t('register') }}</button>
                <button :class="[login?'':'none','userbutton']">{{ $i18n.t('username') }}</button>
                <button :class="[login?'none':'','logbutton']" @click="openpop('login',true)">{{ $i18n.t('login') }}</button>
                <button :class="[login?'':'none','logbutton']" @click="logout()">{{ $i18n.t('logout') }}</button>
            </div>
            <div v-show="login" class="usercash">
                <div class="usertitle">{{ $i18n.t('currentcash') }}</div>
                <div><input class="input" type="text" v-model="cash"/></div>
                <div>
                    <button class="depbutton" @click="openpop('deposit',true)">{{ $i18n.t('deposit') }}</button>
                    <button class="withbutton" @click="openpop('withdraw',true)">{{ $i18n.t('withdraw') }}</button>
                </div>
            </div>
            <div class="bets-box">
                <div class="bets-box-header">
                    <span class="bets-box-header-icon">  </span>
                    <span>{{ $i18n.t('gameList') }}</span>
                    <span class="bets-box-header-icon">  </span>
                </div>
                <div class="bets-box-content" style="padding:0; padding-bottom:15px;">
                    <div class="gamelist">
                        <div class="gamebox" v-for="item2 in game " :key="item2">
                            <div><img :src="'assets/images/game_icon/'+item2.name+'.png'"/> </div>
                            <div class="gameboxtitle">{{item2.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bets-box">
                <div class="bets-box-header">
                    <span class="bets-box-header-icon">  </span>
                    <span>{{ $i18n.t('liveBet') }}</span>
                    <router-link to="/slotBets" style="color:#fff;">{{ $i18n.t('more') }}</router-link>
                </div>
                <div class="bets-box-content" style="padding:0;">
                    <table class="table borderless" style="margin:0;">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">{{ $i18n.t('betID') }}</th>
                                <th scope="col">{{ $i18n.t('payer') }}</th>
                                <th scope="col">{{ $i18n.t('bets') }}</th>
                                <th class="text-right" scope="col">{{ $i18n.t('profit') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :class="[transaction.data.win > 0 ? 'tr-win' : 'tr-lose']" v-for="transaction in allTransactionList" :key="transaction.signature">
                                <td><a target="_blank" :href="utilsCommon.getExplorerTxUrl(transaction.signature)">{{ utilsCommon.formatSignature(transaction.signature) }}</a></td>
                                <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(transaction.payer)">{{ utilsCommon.formatAddressByStr(transaction.payer) }}</a></td>
                                <td>{{ utilsCommon.lamportToAmount(transaction.data.amount) }}</td>
                                <td class="text-right">
                                    <span v-if="transaction.data.win > 0">+{{ utilsCommon.lamportToAmount(transaction.data.win) }}</span>
                                    <span v-else>-{{ utilsCommon.lamportToAmount(transaction.data.amount) }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-show="registerpop" class="pop">
            <div class='popwrap'>
                <div class="popbox">
                    <div class="popheader">
                        <div>{{ $i18n.t('register') }}</div>
                        <img src="../assets/img/close.png" @click="openpop('register',false)"/>
                    </div>
                    <div>
                        <div class="poptitle">{{ $i18n.t('username') }}</div>
                        <div><input class="input" type="text" v-model="username"/></div>
                    </div>    
                    <div>
                        <div class="poptitle">{{ $i18n.t('password') }}</div>
                        <div><input class="input" type="password" v-model="password"/></div>
                    </div>    
                    <div>
                        <div class="poptitle">{{ $i18n.t('comfirmpwd') }}</div>
                        <div><input class="input" type="password" v-model="comfirmpassword"/></div>
                    </div>
                    <button class="confirmBtn" @click="loginfunc()">{{ $i18n.t('confirm') }}</button>    
                </div>
            </div>
        </div>
        <div v-show='loginpop' class="pop">
            <div class='popwrap'>
                <div class="popbox">
                    <div class="popheader">
                        <div>{{ $i18n.t('login') }}</div>
                        <img src="../assets/img/close.png" @click="openpop('login',false)"/>
                    </div>
                    <div>
                        <div class="poptitle">{{ $i18n.t('username') }}</div>
                        <div><input class="input" type="text" v-model="username"/></div>
                    </div>    
                    <div>
                        <div class="poptitle">{{ $i18n.t('password') }}</div>
                        <div><input class="input" type="password" v-model="password"/></div>
                    </div>    
                    <button class="confirmBtn" @click="loginfunc()">{{ $i18n.t('login') }}</button>
                    <div class="popfooter">
                        <div class="poptitle">{{ $i18n.t('forgetpwd') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show='depositpop' class="pop">
            <div class='popwrap'>
                <div class="popbox">
                    <div class="popheader">
                        <div>{{ $i18n.t('deposit') }}</div>
                        <img src="../assets/img/close.png" @click="openpop('deposit',false)"/>
                    </div>
                    <div>
                        <div class="poptitle">{{ $i18n.t('amount') }}</div>
                        <div><input class="input" type="number" v-model="username"/></div>
                    </div>        
                    <button class="confirmBtn">{{ $i18n.t('confirm') }}</button> 
                </div>
            </div>
        </div>
        <div v-show='withdrawpop' class="pop">
            <div class='popwrap'>
                <div class="popbox">
                    <div class="popheader">
                        <div>{{ $i18n.t('withdraw') }}</div>
                        <img src="../assets/img/close.png" @click="openpop('withdraw',false)"/>
                    </div>
                    <div>
                        <div class="poptitle">{{ $i18n.t('currentcash') }}</div>
                        <div><input class="input" type="number" v-model="username"/></div>
                    </div>        
                    <div>
                        <div class="poptitle">{{ $i18n.t('withamount') }}</div>
                        <div><input class="input" type="number" v-model="username"/></div>
                    </div>        
                    <button class="confirmBtn">{{ $i18n.t('confirm') }}</button> 
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue} from 'vue-class-component';

export default class Games extends Vue {
   
    login:boolean=false;
    cash:Number=0;
    username:string='';
    password:string='';
    comfirmpassword:string='';
    norowitem:Number=3;
    game:any=[
        {id:0,name:'fruit',title:"Fruit Rush"},
        {id:1,name:'rainbow',title:"Rainbow Crystal"},
        {id:2,name:'gemminer',title:"Gem Miner"},
        {id:3,name:'hockey',title:"Hockey"},
        {id:4,name:'vampire',title:"Vampire"},

    ];
    gamelist:any=[];
    registerpop:boolean=false;
    loginpop:boolean=false;
    depositpop:boolean=false;
    withdrawpop:boolean=false;
    allTransactionList:any = [];

    mounted(){
    }


    
    openpop(type:any,value:any){
        switch(type)
        {
            case 'register':this.registerpop=value; break;
            case 'login':this.loginpop=value; break;
            case 'deposit':this.depositpop=value; break;
            case 'withdraw':this.withdrawpop=value; break;
        }
    }

    logout(){
        this.login=false;
    }

    loginfunc(){
        this.login=true;
        this.registerpop=false;
        this.loginpop=false;

    }

}
</script>

<style src="@/assets/css/games.css" scoped>

</style>

