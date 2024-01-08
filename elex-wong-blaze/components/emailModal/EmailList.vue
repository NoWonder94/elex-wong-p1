<template>
  <div class="email-list">
    <div class="header">
      <div class="title">
        {{ type == "notice" ? $t("notice_title") : $t("WALLET.Email") }}
      </div>
      <i class="el-icon-close" @click="closeModal('close')"></i>
    </div>
    <div class="body">
      <div v-loading="loading"></div>
      <div v-if="!loading">
        <div v-if="total < 1" class="nothing">
          {{ $tt("nothing_in") }}
          {{ type == "notice" ? $t("notice_title") : $t("WALLET.Email") }}
        </div>
        <div v-else v-for="(email, index) in emailList" :key="index">
          <!-- :style="
            index % 2 == 0
              ? 'background-color:#0f1923;margin-bottom:5px;border-radius: 10px;'
              : 'background-color:#1a242d;margin-bottom:5px;border-radius: 10px;'
          " -->
          <div class="email-container" @click="openEmail(email)">
            <el-badge is-dot :hidden="email.readStatus == 1" class="item">
              <div class="email-inner-container">
                <div class="title">{{ email.name }}</div>
                <div class="text-container">
                  <p class="text" :style="{ '-webkit-line-clamp': 2 }">
                    {{ email.content }}
                  </p>
                </div>
                <div class="date">{{ generatedate(email.createTime) }}</div>
                <div class="delete" @click="del = true">
                  <i class="el-icon-delete-solid"></i>
                </div>
              </div>
            </el-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EmailList",

  data() {
    return {
      loading: false,
      emailList: [],
      total: 0,
      del: false,
      propType: this.type,
    };
  },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    if (this.isLogin) {
      this.getEmailList();
    }
  },
  methods: {
    generatedate(timeStamp) {
      // const milliseconds = emailDate;
      // const date = new Date(milliseconds);
      // const readableTime = date.toLocaleString();
      // return new Date(date).toLocaleString();

      return dayjs(parseInt(timeStamp)).format("YYYY/MM/DD HH:mm:ss");
    },

    openEmail(email) {
      if (this.del == true) {
        this.$confirm("Do you want to delete?", "Delete", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.deleteEmail(email.id);
          })
          .catch(() => {
            this.del = false;
          });
      } else {
        this.$store.dispatch("setEmailDetails", email);
        this.$emit("openEmail", 1);
      }
    },
    closeModal(action) {
      this.$emit("close-modal", action);
    },
    getEmailList() {
      this.loading = true;
      this.$api
        .requestByPost(
          this.type == "notice"
            ? "/hall/v2/playUserNotice/webNoticeList"
            : "/hall/v2/playUserEmail/webEmailList",
          {}
        )
        .then((result) => {
          this.loading = false;

          const { code, msg, rows, total } = result;
          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          this.emailList = rows;
          this.total = total;
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    deleteEmail(id) {
      this.loading = true;
      this.$api
        .requestByPost(
          this.type == "notice"
            ? "/hall/v2/playUserNotice/deleMail"
            : "/hall/v2/playUserEmail/deleMail",
          { id: id }
        )
        .then((result) => {
          this.loading = false;

          const { code, msg, data } = result;
          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.getEmailList();
          this.del = false;
          this.$store.dispatch("getUnreadEmailCount");
          this.$store.dispatch("getUnreadNoticeCount");
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/emailList.scss";
@import "/assets/scss/mobile/emailList.scss";
</style>
