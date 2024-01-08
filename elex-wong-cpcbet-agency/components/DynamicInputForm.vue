<template>
  <div>
    <div class="content-form-label">{{ formTitle }}</div>
    <div class="content-form-input">
      <div class="content-form-input-label">
        <div v-for="(v, k) in formArray[0]" :key="k">{{ getKeyLabel(k) }}</div>
      </div>
      <el-form-item
        v-for="(item, index) in formArray"
        :key="formTitle + '-' + index"
        class="content-form-grid"
      >
        <div v-for="(v, k, i) in item" :key="k + index + formTitle">
          <div v-if="v == null">∞</div>
          <div v-else-if="(index == 0 || index == '0') && i == 0">0</div>
          <el-input
            v-else
            :key="formTitle + k + index + 'input'"
            v-model="formArray[index][k]"
            type="number"
          ></el-input>
        </div>
        <div @click.prevent="removeItem(formKey, item)">
          <i class="el-icon-delete"></i>
        </div>
      </el-form-item>
    </div>
    <div class="content-form-add" v-if="isShowAddButton">
      <div class="content-form-add-button" @click="addProductItem(formKey)">
        <i class="el-icon-plus"></i>
        <div>{{ $t("add") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicInputForm",
  props: {
    formTitle: {
      type: String,
    },
    formType: {
      type: String,
    },
    formKey: {
      type: String,
    },
    formArray: {
      type: Array,
    },
    isShowAddButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },

  methods: {
    removeItem(id, item) {
      this.$emit("removeItem", id, item);
    },

    addProductItem(id) {
      this.$emit("addItem", id);
    },
    getKeyLabel(key) {
      let label = "";

      switch (key) {
        case "from":
        case "to":
          label = this.getFormLabel(key);
          break;
        case "percentage":
          if (this.formType == "turnOver")
            label = `% ${this.$t("form.turn_over")}`;
          else label = "%";
          break;
      }

      return label;
    },
    getFormLabel(key) {
      let label = "";
      switch (this.formType) {
        case "playerCount":
          label = `${this.$t(key)} (${this.$t("form.player_count")})`;
          break;
        case "turnOver":
          label = `${this.$t("form.bet_amount")} ${this.$t(key)}`;
          break;
        default:
          label = `${this.$t(key)} (${this.$t("form.all")})`;
      }
      return label;
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/commissionPlanComponentForm.scss";
@import "/assets/scss/mobile/commissionPlanComponentForm.scss";

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
