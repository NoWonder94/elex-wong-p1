<template>
  <div class="email-modal">
    <div class="email-modal-overlay" @click="closeModal('closeAll')">
      <div class="email-modal-body" @click.stop>
        <div class="" v-if="index == 0">
          <EmailList
            :type="type"
            @close-modal="closeModal"
            @openEmail="openEmail"
          />
        </div>
        <div class="" v-if="index == 1">
          <Email
            :type="type"
            :emailId="emailId"
            :title="title"
            :desc="desc"
            @close-modal="closeModal"
            @changeIndex="changeIndex"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmailList from "./EmailList.vue";
import Email from "./Email.vue";
export default {
  name: "EmailModal",
  components: { EmailList, Email },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      emailList: [],
      total: 0,
      index: 0, //0 : listing, 1： email
      emailId: "",
      title: "",
      desc: "",
    };
  },
  mounted() {
    this.changeIndex(0);
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
    openEmail(index, emailId, title, desc) {
      // this.emailId = emailId;
      // this.title = title;
      // this.desc = desc;
      this.changeIndex(index);
    },
    changeIndex(v) {
      this.index = v;
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/emailModal.scss";
@import "/assets/scss/mobile/emailModal.scss";

// add animation of zoom fade in
@keyframes zoomFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
