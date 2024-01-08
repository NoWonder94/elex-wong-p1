<template>
    <div class="card">
      <div class="card-wrap" @click="click(id)">
        <div class="image">
          <img :src="img" class="img">
        </div>
        <div class="card-body">
          <div class="card-title">
            {{title}}
          </div>
          <div class="card-descib web">
            {{describ}}
          </div>

          <div class="card-foot">
            <div class="date web">
              {{date}}
            </div>
            <div class="card-more">
              {{ $t('button.more') }}
            </div>
          </div>
        </div>
      </div>

      <hr class="card-line">
    </div>
</template>

<script>
export default {
  props:['img','title','describ','date','id'],
  methods:{
    click(id){
      this.$emit('event',id);
    }
  }
}
</script>

<style lang="scss" type="text/css">
    @import '/assets/scss/web/info-card.scss';
    @import '/assets/scss/mobile/info-card.scss';
</style>
