<template>
  <div class="footerNew mobile">
    <div class="item">
      <div class="item-body">
        <div
          v-for="item in new_category"
          :key="item.id"
          @click="handleGameFilter(item.id, item.key)"
        >
          <div class="item-button-foot">
            <img
              v-show="curCategory != item.key"
              :src="item.inactive_icon"
              :alt="item"
            />
            <img
              v-show="curCategory == item.key"
              :src="item.active_icon"
              :alt="item"
            />
            <div :class="curCategory == item.key ? 'blinking-words' : ''">
              {{ item.category_name }}
            </div>
          </div>
          <!-- <img
            v-show="curCategory != item"
            :src="require('~/assets/img/bolebit/' + item + '_d.png')"
            :alt="item"
          />
          <img
            v-show="curCategory == item"
            :src="require('~/assets/img/bolebit/' + item + '_s.png')"
            :alt="item"
          />
          <div :class="curCategory == item ? 'blinking-words' : ''">
            {{ $t(`boleBitGame.${item}`) }}
          </div> -->
        </div>
      </div>
      <div id="float-icon-foot" class="float-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNew",
  data() {
    return {
      category: ["all", "slot", "fishing", "poker"],
      new_category: [],
      contact: [
        { name: "skype", link: "" },
        { name: "telegram", link: "" },
        { name: "mail", link: "" },
      ],
      supported_os: ["window", "html5", "apple", "android", "ios"],
      platforms: ["desk", "laptop", "tablet", "phone"],
      curCategory: "all",
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    setTimeout(() => {
      this.getGameCategory();
    }, 100);
  },
  methods: {
    handleGameFilter(id, type) {
      this.curCategory = type;
      let index = this.new_category.find((val) => val.key == type).sort_index;
      this.handleFloatButton(index);
      this.$emit("handleFilter", id, type);
    },
    getGameCategory() {
      this.$api
        .request(
          `https://bolebit.bolegaming.com/api/App/listCategory?lang=${this.lang}`
        )
        .then((result) => {
          if (result.status) {
            this.new_category = result.data;
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    handleFloatButton(index) {
      let width = 18;
      let left = width * (index - 1) + 5 + 3;
      document.getElementById("float-icon-foot").style.left = left + "vw";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/mobile/footerNew.scss";
</style>
