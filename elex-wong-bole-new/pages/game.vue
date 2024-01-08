<template>
    <div class="game template">
        <div class="game-title">
            <div class="blinking-words">{{ $t('game.title') }}</div>
            <div class="game-title-subtitle">{{ $t('game.description') }}</div>
        </div>
        <div class="game-content">
            <div class="game-inner">
                 <!--web -->
                <div class="nav web">
                    <ul>
                        <li :class="['navlist', (item.id!=$t('gameType').length)?'border-right':'',(item.id==categoryId)?'active':'']" v-for="item in $t('gameType')" :key="item.id">
                        <span class="click" @click="selectGameType(item.id,item.name)">{{item.name}}</span>
                    </li>
                        <li :class="['navlist',(0==categoryId)?'active':'']">
                        <span class="click" @click="selectGameType(0,'all')">{{$t('news.all')}}</span>
                        </li>
                    </ul>
                </div>
                <!--web -->
                <!--mobile -->
                <el-select class="mobile" :value="activeIndex">
                    <el-option
                        v-for="item in $t('gameType')"
                        :value="item.name"
                        :key="item.id"
                        :label="item.name"
                        @click.native="selectGameType(item.id,item.name)">
                    </el-option>
                    <el-option
                        :label="$t('news.all')"
                        @click.native="selectGameType(0,'all')"
                        value="all"
                    >
                    </el-option>
                </el-select>
                <!--mobile -->

                <div class="gameListContainer" v-loading="isLoading">
                    <div style="display:contents;" v-show="isShow">
                        <div data-aos="fade-right" data-aos-offset="-100" data-aos-duration="500" data-aos-once="true" :data-aos-delay="((index + 3) * 100) % 300" class="gameItem" style="position:relative;" v-for="(item, index) in list" :key="index">
                            <template>
                                <Game-Card 
                                    :key="item.id" 
                                    :id="item.id" 
                                    :img="item.img" 
                                    :title="item.content.title" 
                                    :desc="item.content.description" 
                                    :cateID="item.game_category_id"
                                    :demoUrl="item.game_url"
                                    @demoClick="openDemo" 
                                    @infoClick="openInfo" 
                                />
                            </template>
                        </div>
                    </div>
                </div>

               
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Game',
        head() {
            return {
                title: this.$t('navList.game'),
            }
        },
        data() {
          return{
            categoryId:0,
            list:[],
            activeIndex:'all',
            isLoading:false,
            isShow:true,
            lang:'chi',
          }
        },
        mounted(){
            this.initData();
        },
       methods: {
            initData() {
                if (this.$i18n.locale == 'en') {
                    this.lang = 'eng';
                } else {
                    this.lang = 'chi';
                }
                this.getList();
            },
            getList() {
                this.isLoading = true;
                this.isShow = false;
                this.$api.request(
                `/Game/getList?gameCategoryId=${this.categoryId}&lang=${this.lang}`

                ).then(result => {
                    if(result.status){
                    this.list = result.data.list;
                    this.totalCount = result.data.totalCount;
                    }
                    this.isLoading = false;
                    this.isShow = true;
                }).catch(error => {
                    this.$message.error(error ? error : this.$t('error'));
                });
            },
             selectGameType(categoryId, infoName) {
                this.categoryId = categoryId;
                this.activeIndex = infoName;
                this.initData();
            },
            openDemo(url) {
                  window.open(url);
            },
            openInfo(id) {
                console.log(id);
            }
            
       }
    }
</script>
<style lang="scss" type="text/css">
    @import '/assets/scss/web/game.scss';
    @import '/assets/scss/mobile/game.scss';
</style>