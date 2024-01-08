
<template>
    <div class="wrap-select">
       <div class="list-options">
            <div class="init child" @click="openDrop">
                <span><img class="select-img" :src="currentToken.image" /></span>
                <span class="name">{{ currentToken.show }}</span>
                <span>{{ currentToken.amount }}</span>
            </div>
            <div class="options">
                <div :class="[name == tokenType ? 'item selected child' : 'item child']" v-for="(token, name) in walletTokens" :key="name" @click="selected(name)">
                <span><img :src="token.image"/></span>
                <span class="name">{{ token.show }}</span>
                <span>{{ token.amount }}</span>
                </div>
            </div>
       </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore, mapGetters } from "vuex";
import { Common } from '@/utils';
import jQuery from 'jquery';

@Options({
  computed: {
    ...mapGetters("account", {
        walletTokens: "walletTokens",
        tokenType: "tokenType",
        currentToken: "currentToken"
    })
  }
})

export default class CoinBar extends Vue {
    walletTokens!: any;
    currentToken!: any;
    tokenType!: any;
    utilsCommon:any = Common;
    store = useStore();

    openDrop(){
        jQuery(".options").css('display', 'block');
        jQuery(".list-options div.item").css('display', 'flex');
    }

    selected(name:string){
        this.store.dispatch("account/setTokenType", name);
        jQuery(".options").css('display', 'none');
        jQuery(".list-options div.item").hide();
    }
}
</script>

<style src="@/assets/css/coinBar.css" scoped></style>