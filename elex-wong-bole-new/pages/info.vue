<template>
  <div class="info template">
    <div class="head">
      <div class="blinking-words title">
        {{ $t('news.title') }}
      </div>
      <div class="paragraph">
        {{ $t('news.info') }}
      </div>
    </div>
    <div class="body">
      <div class="innerbody">
        <!--web -->
        <div class="nav web">
          <ul>
            <li :class="['navlist', (item.id!=$t('infoType').length)?'border-right':'',(item.id==categoryId)?'active':'']" v-for="item in $t('infoType')" :key="item.id">
            <span class="click" @click="selectInfoType(item.id,item.name)">{{item.name}}</span>
           </li>
            <li :class="['navlist',(0==categoryId)?'active':'']">
              <span class="click" @click="selectInfoType(0,'all')">{{$t('news.all')}}</span>
            </li>
          </ul>
        </div>
        <!--web -->
        <!--mobile -->
        <el-select class="mobile" :value="activeIndex">
          <el-option
          v-for="item in $t('infoType')"
          :value="item.name"
          :key="item.id"
          :label="item.name"
          @click.native="selectInfoType(item.id,item.name)">
          </el-option>
          <el-option
            :label="$t('news.all')"
            @click.native="selectInfoType(0,'all')"
            value="all"
            >
          </el-option>
        </el-select>
        <!--mobile -->
        <div class="info-list" v-loading="isLoading">
          <div v-show="isShow">
            <template v-for="item in list">
              <Info-Card :key="item.id" :id="item.id" :img="item.img" :title="item.content.title" :describ="item.content.summary" :date="item.self_set_date?item.self_set_date:item.date_create" @event="navigateToPage"/>
            </template>
            <span v-if="totalCount==0">
              {{ this.t('message.noData') }}
            </span>
            <el-pagination
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="totalCount"
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
              class="web"
              v-if="totalCount>0"
            ></el-pagination>
          </div>

          <span
            class="mobile load-more"
            @click="handleMore"
          >
            {{ loadMoreText }}
            <i class="el-icon-arrow-down"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Info',
        head() {
            return {
                title: this.$t('navList.news'),
            }
        },
        data() {
          return{
            categoryId:0,
            infoName:'',
            list:[],
            pageSize:5,
            page:1,
            totalCount:5,
            currentPage:1,
            activeIndex:'all',
            isLoading:false,
            isShow:true,
            lang:'eng',
            loadMoreText:'',
          }
        },
        mounted(){
          this.initData();
        },
        methods: {
          initData(){
            this.isLoading = true;
            this.isShow = false;
            if (this.$i18n.locale == 'en') {
              $('#Info_Id').removeClass('Info_Container_CN');
              $('#Info_Id').addClass('Info_Container_EN');
              $('#Info_Id').removeClass('Info_Container_KR');
              this.lang = 'eng';
            } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh') {
              $('#Info_Id').removeClass('Info_Container_EN');
              $('#Info_Id').addClass('Info_Container_CN');
              $('#Info_Id').removeClass('Info_Container_KR');
              this.lang = 'chi';
            } else if (this.$i18n.locale == 'kr') {
              $('#Info_Id').removeClass('Info_Container_EN');
              $('#Info_Id').removeClass('Info_Container_CN');
              $('#Info_Id').addClass('Info_Container_KR');
              this.lang = 'kr';
            } else {
              $('#Info_Id').removeClass('Info_Container_CN');
              $('#Info_Id').addClass('Info_Container_EN');
              $('#Info_Id').removeClass('Info_Container_KR');
              this.lang = 'eng';
            }
            this.loadMoreText=this.$t('news.load_more');
            if(this.categoryId==4){
              this.$api.request(
              'Info/getList?pageSize=3'+
              '&lang='+this.lang+
              '&categoryId=0'+
              '&page=1'

              ).then(result => {
                if(result.status){
                  this.list = result.data.list;
                  this.totalCount = 3;
                }
                this.isLoading = false;
                this.isShow = true;
              }).catch(error => {
                  this.$message.error(error ? error : this.$t('error'));
              });
            }
            else{
              this.$api.request(
              'Info/getList?pageSize='+this.pageSize+
              '&lang='+this.lang+
              '&categoryId='+this.categoryId+
              '&page='+this.page

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
            }
          },
          navigateToPage(id){
            this.$router.push({path: '/post', query: {id:id}});
          },
          handleCurrentChange(val){
            this.page=val;
            this.initData();
          },
           selectInfoType(categoryId, infoName) {
            this.categoryId = categoryId;
            this.activeIndex = infoName;
            this.initData();
          },
          handleMore(){
            let totalPages = Math.ceil(this.totalCount / this.pageSize);
              if (this.currentPage < totalPages) {
                this.currentPage++;
                this.$api
                  .request(
                    'Info/getList?categoryId=' +
                      this.categoryId +
                      '&page=' +
                      this.currentPage +
                      '&pageSize=' +
                      this.pageSize +
                      '&lang=' +
                      this.lang
                  )
                  .then(result => {
                    if (result.status) {
                      let oriData = this.list;
                      let data = result.data.list;
                      let array = [];

                      for (var i = 0; i < oriData.length; i++) {
                        array.push(oriData[i]);
                      }

                      for (var i = 0; i < data.length; i++) {
                        array.push(data[i]);
                      }

                      this.list = array;
                    }

                    this.isLoading = false;
                    this.isShow = true;
                  })
                  .catch(error => {
                    this.$message.error(error.msg);
                  });
              }

              if (this.currentPage == totalPages) {
                this.loadMoreText = this.$t('news.reached_end');
              }
          }
        },
        watch: {
          '$i18n.locale'(val) {
            this.initData();
          }
        }
    }
</script>
<style lang="scss" type="text/css">
    @import '/assets/scss/web/info.scss';
    @import '/assets/scss/mobile/info.scss';
</style>
