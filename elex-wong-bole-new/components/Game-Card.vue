<template>
   <div class="card">
        <div class="image">
          <img :src="img" class="img">
        </div>
        <div class="card-content">
            <div class="card-content-title">
                {{title}}
            </div>
            <div class="card-content-desc">
              {{desc}}
            </div>
            <div class="card-content-info">
              <div class="card-content-info-cate">
                <img v-if="cateID == 1" src="../assets/img/game1.png" />
                <img v-if="cateID == 2" src="../assets/img/game2.png" />
                <img v-if="cateID == 3" src="../assets/img/game3.png" />
                <img v-if="cateID == 4" src="../assets/img/game4.png" />
                <img v-if="cateID == 5" src="../assets/img/game5.png" />
              </div>
              <div class="card-more-info" @click="infoClicked(id)">
                {{ $t('button.more') }}
              </div>
            </div>
            <div class="card-button" @click="demoClicked(demoUrl)">
              
            </div>
        </div>
   </div>
</template>

<script>
export default {
  props:['id','img','title','desc','cateID','infoClick', 'demoClick','demoUrl'],
  methods:{
    demoClicked(demoUrl){
      this.$emit('demoClick',demoUrl);
    },
    infoClicked(id) {
       this.$emit('infoClick',id);
    }

  }
}
</script>

<style lang="scss" type="text/css">
    @import '/assets/scss/web/game-card.scss';
    @import '/assets/scss/mobile/game-card.scss';
</style>
