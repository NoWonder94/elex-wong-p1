<template>
  <div class="boleBitSideMenu web">
    <div class="item">
      <div class="title">
        <img src="../../assets/img/bolebit/cate.png" />
        <div>{{ $t(`boleBitGame.category`) }}</div>
      </div>
      <div class="item-body">
        <div
          v-for="item in new_category"
          :key="item.id"
          @click="handleGameFilter(item.id, item.key)"
        >
          <div class="item-button">
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
        </div>
        <div id="float-icon" class="float-icon"></div>
      </div>
    </div>
    <!-- <div class="item">
      <div class="title">
        <img src="../../assets/img/bolebit/chat.png" />
        <div>Contact us</div>
      </div>
      <div class="item-body">
        <div
          v-for="item in contact"
          :key="item.name"
          class="item-button"
          @click="openlink(item.link)"
        >
          <img
            :src="require('~/assets/img/bolebit/' + item.name + '.png')"
            :alt="item"
          />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div> -->
    <div class="sidefooter">
      <div class="item2">
        <div class="title">{{ $t(`boleBitGame.supported_os`) }}</div>
        <div class="item-group">
          <img
            v-for="item in supported_os"
            :key="item"
            :src="require('~/assets/img/bolebit/' + item + '.png')"
            :alt="item"
            class="group1"
          />
        </div>
      </div>
      <div class="item2">
        <div class="title">{{ $t(`boleBitGame.supported_platform`) }}</div>
        <div class="item-group">
          <img
            v-for="item in platforms"
            :key="item"
            :src="require('~/assets/img/bolebit/' + item + '.png')"
            :alt="item"
            class="group2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoleBitSideMenu",
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
    openlink(link) {
      console.log(link);
    },
    getGameCategory() {
      // `https://bolebit.bolegaming.com/api/App/listCategory?lang=${this.lang}`
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
      let height = document
        .querySelector(".item-button")
        .getBoundingClientRect().height;
      document.getElementById("float-icon").style.height = height + "px";
      let top = height * (index - 1);
      document.getElementById("float-icon").style.top = top + "px";
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/bolebit/boleBitSideMenu.scss";
</style>
