<template>
  <div class="providers">
    <div class="providers-header">
      <div class="providers-header-left">
        <div class="title">
          <i class="el-icon-back" @click="handleUrl($router.go(-1))"></i>
          <div class="providers-header-title">{{ $tt("providers") }}</div>
        </div>
        <div class="search mobile">
          <i
            class="el-icon-search"
            @click="handleSearch"
            v-show="isSearch == false"
          ></i>
          <i
            class="el-icon-close"
            @click="handleSearch"
            v-show="isSearch == true"
          ></i>
        </div>
      </div>
      <div class="providers-header-right web">
        <div class="search">
          <el-input
            :placeholder="$tt('search')"
            prefix-icon="el-icon-search"
            v-model="search"
            @input="searchGame"
          >
          </el-input>
        </div>
        <div class="sort">
          <el-select
            v-model="sort"
            class="sort-select"
            :popper-append-to-body="false"
            placeholder=""
            @change="getSort"
          >
            <template #prefix>
              {{ $tt("sort_by_") }}
            </template>
            <el-option
              v-for="item in option"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="providers-header-search mobile">
        <div class="providers-header-search-item" v-if="isSearch == true">
          <div class="search">
            <el-input
              :placeholder="$tt('search')"
              prefix-icon="el-icon-search"
              v-model="search"
              @input="searchGame"
            >
            </el-input>
          </div>
        </div>
        <div class="providers-header-search-item" v-if="isSearch == false">
          <div class="sort">
            <el-select
              v-model="sort"
              class="sort-select"
              :popper-append-to-body="false"
              placeholder=""
              @change="getSort"
            >
              <template #prefix>
                {{ $tt("sort_by_") }}
              </template>
              <el-option
                v-for="item in option"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="providers-content">
      <div v-if="totalGame > 0">
        <div class="provider-list">
          <div class="provider-item" v-for="(item, index) in list" :key="index">
            <GameImage
              :img="item.img"
              :title="item.title"
              :desc="item.desc"
              :playId="item.playId"
              :isDemo="item.isDemo"
              @login="handleModal('login')"
              @deposit="handleModal('deposit')"
            />
          </div>
        </div>
        <div
          v-loading="isLoading"
          v-if="isLoading"
          style="padding: 50px 0"
        ></div>
        <div class="view-more">
          <el-progress
            :percentage="percentage"
            color="#F12C4C"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <div class="display">
            {{ $tt("displaying") }} {{ list.length }} {{ $tt("of") }}
            {{ totalGame }} {{ $tt("games_") }}
          </div>
          <div
            class="load-more"
            @click="loadMore"
            v-if="list.length != totalGame"
          >
            {{ $tt("load_more") }}
          </div>
        </div>
      </div>
      <div v-if="totalGame == 0 && !isLoading">
        {{ $tt("no_games_found") }}
      </div>
    </div>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>

<script>
export default {
  name: "ProvidersDetail",
  async asyncData({ params }) {
    const name = params.name;
    return { name };
  },
  data() {
    return {
      isLoading: false,
      search: "",
      sort: "popular",
      option: [
        { value: "popular", label: "Popular" },
        { value: "0", label: "A-Z" },
        { value: "1", label: "Z-A" },
      ],
      sortCheckedList: [],
      sortLength: 0,
      percentage: 0,
      isSearch: false,
      initialGame: 0,
      showGame: 0,
      totalGame: 0,
      gameList: [],
      list: [],
      id: 0,
      showModal: false,
      pageNum: 1,
      pageSize: 20,
      type: '',
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    getId() {
      this.isLoading = true;
      this.$api
        .requestByPost("/hall/v2/playHall/getManufacturerGameOverview")
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          for (var i in data) {
            if (data[i]["name"] == this.name) {
              this.id = data[i]["type"];
            }
          }

          this.getList();
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    getList() {
      this.isLoading = true;
      var data = {
        gameType: this.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        search: this.search,
      };
      if (this.sort != 'popular') {
        data["hotSort"] = this.sort; // 为空默认 0正序 1倒叙
      }
      this.$api
        .requestByPost("/hall/v2/playHall/getManufacturerGameList", data)
        .then((result) => {
          const { code, rows, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.gameList = rows;

          if (this.pageNum == 1) {
            this.totalGame = result.total;
          }

          for (var i = 0; i < this.gameList.length; i++) {
            this.list.push({
              img: this.gameList[i].imgPlay,
              title: this.gameList[i].gameName,
              desc: this.gameList[i].gameChannelName,
              playId: this.gameList[i].playId,
              isDemo: this.gameList[i].isDemo,
            });
          }
          this.percentage = (this.list.length / this.totalGame) * 100;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    loadMore() {
      if (this.list.length == this.totalGame) {
        return false;
      }
      this.pageNum++;
      this.getList();
    },
    handleSearch() {
      this.isSearch = !this.isSearch;
    },
    handleUrl(url) {
      window.newRouter(url);
    },
    getSort() {
      this.list = [];
      this.pageNum = 1;
      this.getList();
    },
    searchGame(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.list = [];
        this.pageNum = 1;
        this.getList();
      }, 700);
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/providers.scss";
@import "/assets/scss/mobile/providers.scss";
</style>
