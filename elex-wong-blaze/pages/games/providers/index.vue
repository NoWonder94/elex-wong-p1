<template>
  <div class="providers">
    <div class="providers-header">
      <div class="providers-header-left">
        <div class="title">
          <i class="el-icon-back" @click="handleUrl('/')"></i>
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
            placeholder="Search"
            prefix-icon="el-icon-search"
            v-model="search"
            @input="searchProvider"
          >
          </el-input>
        </div>
        <div class="sort">
          <el-select
            v-model="sort"
            class="sort-select"
            :popper-append-to-body="false"
            placeholder=""
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
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="search"
              @input="searchProvider"
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
    <div class="providers-content" v-loading="isLoading">
      <div v-if="providerList.length > 0">
        <div class="provider-list">
          <div
            class="provider-item"
            v-for="(item, index) in providerList"
            :key="index"
          >
            <div class="provider-box" @click="handleProviderUrl(item.name)">
              <div v-if="item.logo == null || item.logo == ''" class="title">{{ item.name }}</div>
              <div v-else class="image">
                <img :src="item.logo">
              </div>
              <div class="total">{{ item.num }} {{ $tt("games") }}</div>
            </div>
          </div>
        </div>
        <div class="view-more">
          <el-progress
            :percentage="percentage"
            color="#F12C4C"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <div class="display">
            {{ $tt("displaying") }} {{ showGame }} {{ $tt("of") }}
            {{ totalGame }}
            {{ $tt("games_") }}
          </div>
        </div>
      </div>
      <div v-else>
        {{ $tt("no_providers_found") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Providers",
  data() {
    return {
      isLoading: false,
      search: "",
      sort: "popular",
      option: [
        { value: "popular", label: "Popular" },
        { value: "asc", label: "A-Z" },
        { value: "desc", label: "Z-A" },
      ],
      sortCheckedList: [],
      sortLength: 0,
      percentage: 0,
      isSearch: false,
      initialGame: 0,
      showGame: 0,
      totalGame: 0,
      list: [],
      providerList: [],
      filterList: [],
    };
  },
  mounted() {
    this.getProvider();
  },
  methods: {
    getProvider() {
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

          this.providerList = this.filterList = data;
          this.totalGame = this.providerList.length;
          this.initialGame = this.showGame =
            this.totalGame > 30 ? 30 : this.totalGame;
          this.percentage = (this.showGame / this.totalGame) * 100;
        })
        .catch((error) => {
          this.isLoading = false;

          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    handleSearch() {
      this.isSearch = !this.isSearch;
    },
    handleUrl(url) {
      window.newRouter(url);
    },
    handleProviderUrl(url) {
      window.newRouter("/games/providers/" + url);
    },
    searchProvider(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getList(value);
      }, 1000);
    },
    getList(value) {
      this.providerList = [];
      if (value == "") {
        this.getProvider();
      } else {
        for (var i = 0; i < this.filterList.length; i++) {
          if (this.filterList[i]["name"].toLowerCase().includes(value)) {
            this.providerList.push(this.filterList[i]);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/providers.scss";
@import "/assets/scss/mobile/providers.scss";
</style>
