<template>
  <div class="card">
    <div class="card-heading">
      <div class="card-label">
        <div class="card-label-name">{{ propDataName }}</div>
        <div class="card-label-type">{{ translateType() }}</div>
      </div>
      <div class="card-option" v-if="propsDataIsShowOperate">
        <div
          class="fill-box card-option-operation"
          v-if="propsDataIsSelected == 0"
          @click="onSelectPlan"
        >
          {{ $t("form.select") }}
        </div>
        <div class="fill-box card-option-operation-selected" v-else>
          {{ $t("form.selected") }}
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-type" v-if="products.length > 0">
        <div class="card-content-item-title">{{ $t("form.products") }}</div>
        <div class="content-tab-item">
          <!-- vuetify -->
          <v-tabs show-arrows>
            <v-tab
              v-for="product in products"
              :key="product.name"
              :href="`#${product.name}`"
            >
              {{ product.name }}
            </v-tab>
            <v-tab-item
              v-for="product in products"
              :key="product.name"
              :value="product.name"
            >
              <div class="card-content-item-content">
                <div class="item-labels">
                  <div>{{ $t("from") }} ({{ translateType() }})</div>
                  <div>{{ $t("to") }} ({{ translateType() }})</div>
                  <div>% NGR</div>
                </div>
                <div
                  class="item-content"
                  v-for="(item, index) in product.items"
                  :key="index"
                >
                  <div>{{ item.from }}</div>
                  <div>{{ item.to != null ? item.to : "∞" }}</div>
                  <div>{{ item.rate }}</div>
                </div>
              </div>
            </v-tab-item>
          </v-tabs>
          <!-- vuetify -->
        </div>
      </div>

      <div class="card-content-type" v-else>
        <div class="card-content-item-title">{{ $t("form.all") }}</div>
        <div class="card-content-item-content" v-if="all.length > 0">
          <div class="item-labels">
            <div>{{ $t("from") }} ({{ translateType() }})</div>
            <div>{{ $t("to") }} ({{ translateType() }})</div>
            <div>% NGR</div>
          </div>
          <div class="item-content" v-for="(item, index) in all" :key="index">
            <div>
              {{ item.from }}
            </div>
            <div>
              {{ item.to != null ? item.to : "∞" }}
            </div>
            <div>
              {{ item.rate }}
            </div>
          </div>
        </div>
        <div class="card-content-item-content" v-else>
          <div class="item-content-noData">
            <img src="../assets/img/no_data.png" />
          </div>
        </div>
      </div>
      <div
        class="card-content-type"
        v-if="propDataConditions != null && propDataConditions.length > 0"
      >
        <div class="card-content-item-title">{{ $t("form.conditions") }}</div>
        <div class="card-content-item-content">
          <div class="item-labels">
            <div>{{ $t("form.condition") }}</div>
            <div>{{ $t("actions") }}</div>
            <div>{{ $t("form.amount_all") }}</div>
          </div>
          <div
            class="item-content"
            v-for="(dataCondition, index) in propDataConditions"
            :key="index"
          >
            <div>
              {{ dataCondition.condition }}
            </div>
            <div>
              {{ dataCondition.action }}
            </div>
            <div>
              {{ dataCondition.amount }}
            </div>
          </div>
        </div>
        <!-- <div class="card-content-item-content" v-else>
          <div class="item-content-noData">
            <img src="../assets/img/no_data.png" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommissionPlanCard",
  props: {
    propDataPlanId: {
      type: Number,
    },
    propDataComType: {
      type: Number,
    },
    propDataName: {
      type: String,
    },
    propDataProducts: {
      type: [Object, Array],
    },
    propDataConditions: {
      type: Array,
    },
    propsDataIsShowOperate: {
      type: Boolean,
      default: false,
    },
    propsDataIsSelected: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      products: [],
      all: [],
    };
  },

  mounted() {
    this.handleProducts();
    this.handleAll();
  },

  methods: {
    getTypeNameById(id) {
      let gameType = JSON.parse(localStorage.getItem("gameType"));
      if (gameType == null || gameType.length == 0) {
        return "";
      }
      var filterItem = _.filter(gameType, function (o) {
        return `${o.id}` == `${id}`;
      });
      if (filterItem == null || filterItem.length == 0) {
        return "";
      }
      return filterItem[0].name;
    },
    getProducts() {
      switch (this.propDataComType) {
        case 0:
          return this.propDataProducts.ranges.products;
        case 1:
          return this.propDataProducts.products;
        case 2:
          return {};
        case 3:
          return this.propDataProducts.products;
        default:
          break;
      }
    },
    getAll() {
      switch (this.propDataComType) {
        case 0:
          return this.propDataProducts.ranges.all;
        case 1:
          return this.propDataProducts.all;
        case 2:
          return this.propDataProducts;
        case 3:
          return this.propDataProducts.all;
        default:
          break;
      }
    },
    translateType() {
      switch (this.propDataComType) {
        case 0:
          return this.$t("form.player_count");
        case 1:
          return this.$t("form.revenue_share");
        case 2:
          return this.$t("form.net_deposit");
        case 3:
          return this.$t("form.turn_over");
        default:
          break;
      }
    },
    handleProducts() {
      this.products = [];
      var cates = this.getProducts();
      var that = this;
      Object.keys(cates).forEach((key, index) => {
        that.products.push({
          id: key,
          name: that.getTypeNameById(key),
          items: cates[key],
        });
      });
    },
    handleAll() {
      this.all = [];
      var range = this.getAll();
      this.all = range;
    },

    /* select */
    onSelectPlan() {
      this.$emit("onSelectPlan", this.propDataPlanId);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/commissionPlanCardComponent.scss";
@import "/assets/scss/mobile/commissionPlanCardComponent.scss";
</style>
