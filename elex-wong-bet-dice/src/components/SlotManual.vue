<template>
    <div class="manual">
        <form >
            <!--  Bets Amount -->
            <div class="manual-bet-amount">
                <div class="manual-bet-amount-label">
                    <span>{{ $i18n.t('betsAmount') }}</span>
                    <span>${{ currentToken.amount  }}</span>
                </div>
                <div class="manual-bet-amount-input">
                    <div class="bet-amount-input">
                        <input type="text" v-model="betData.amount" @change="$emit('updateAmount', '')">
                        <img class="bet-amount-icon" :src="currentToken.image" />
                    </div>
                    <div class="bet-amount-option">
                        <button @click="$emit('updateAmount', '1/2')">½</button>
                        <button @click="$emit('updateAmount', '2x')">2x</button>
                    </div>
                </div>
            </div>
  
            <!-- final button -->
            <button class="roll-dice-button" :disabled="betData.isPlay" @click="$emit('play', 'manual')">{{ $i18n.t('bet') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="betData.isPlay"></i></button>
            <!-- final button -->
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';

@Options({
  inject: ['betData'],
  computed: mapGetters('account', {
    currentToken: "currentToken"
  })
})
export default class SlotManual extends Vue {
  currentToken!: any;
  // eslint-disable-next-line no-unused-vars
  playResult(data:any) {
    
  }
}
</script>
<style src="@/assets/css/slotManual.css" scoped></style>