<template>
  <div class="header">
    <div class="header-content">
      <div class="" v-for="header in headerContent">
        <!-- :href="'#' + header.routeToBlock" -->
        <div
          class="headerRouteText"
          @click.prevent="scrollTo(`${header.routeToBlock}`)"
        >
          {{ header.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      headerContent: [
        {
          title: "About us",
          routeToBlock: "about-us",
        },
        {
          title: "Services",
          routeToBlock: "services",
        },
        {
          title: "Contact",
          routeToBlock: "contact",
        },
      ],
    };
  },

  methods: {
    scrollTo(id) {
      const element = document.getElementById(id);
      if (element) {
        window.scroll({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/header.scss";
@import "/assets/scss/mobile/header.scss";
</style>
