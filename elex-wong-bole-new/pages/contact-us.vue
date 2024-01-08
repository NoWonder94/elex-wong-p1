<template>
  <div class="contact template">
    <div class="title">
      <span class="blinking-words">
        {{ this.$t("contact.title") }}
      </span>
    </div>
    <div class="sub-title">
      {{ this.$t("contact.subtitle") }}
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="form" :rules="rules">
        <span class="form-header">{{ this.$t("contact.form_header") }}</span>
        <v-row>
          <v-col cols="12" md="6">
            <div class="input-field">
              <el-form-item prop="name">
                <span class="input-field-text">{{
                  this.$t("contact.name")
                }}</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
            <div class="input-field">
              <el-form-item prop="contactNumber">
                <span class="input-field-text">{{
                  this.$t("contact.contact")
                }}</span>
                <el-input v-model="form.contactNumber"></el-input>
              </el-form-item>
            </div>
            <div class="input-field">
              <span class="input-field-text">{{
                this.$t("contact.location")
              }}</span>
              <br />
              <br />
              <el-form-item prop="location">
                <el-select
                  v-model="form.location"
                  :placeholder="this.$t('contact.choose')"
                >
                  <el-option
                    v-for="(item, index) in location"
                    :label="item.name"
                    :key="index"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="input-field">
              <el-form-item prop="email">
                <span class="input-field-text">{{
                  this.$t("contact.email")
                }}</span>
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </div>
            <div class="input-field">
              <el-form-item prop="company">
                <span class="input-field-text">{{
                  this.$t("contact.company")
                }}</span>
                <el-input v-model="form.company"></el-input>
              </el-form-item>
            </div>
            <div class="input-field">
              <span class="input-field-text">{{
                this.$t("contact.type")
              }}</span>
              <br />
              <br />
              <el-form-item prop="information">
                <el-select
                  v-model="form.information"
                  :placeholder="this.$t('contact.choose')"
                >
                  <el-option
                    v-for="item in information"
                    :label="item.label"
                    :key="item.id"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </v-col>
        </v-row>
        <div class="message">
          <div
            class="input-field"
            style="padding-left: 1px; padding-right: 1px"
          >
            <el-form-item prop="comment">
              <span class="input-field-text">{{
                this.$t("contact.message")
              }}</span>
              <el-input
                type="textarea"
                :rows="7"
                :placeholder="$i18n.t('contact.messageplace')"
                v-model="form.comment"
                resize="none"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <v-row>
          <v-col cols="12" md="12" class="bottom">
            <div class="radio-button">
              <el-checkbox v-model="form.accept">
                <span class="input-field-text">{{
                  this.$t("contact.accept")
                }}</span>
              </el-checkbox>
            </div>
            <div class="button">
              <el-button round @click="submitForm('form')">{{
                this.$t("contact.submit")
              }}</el-button>
            </div>
          </v-col>
        </v-row>
      </el-form>
    </div>
    <br />
  </div>
</template>
<script>
export default {
  name: "Contact",
  head() {
    return {
      title: this.$t("navList.contactUs"),
    };
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: this.$i18n.t("contact.name_required") },
        ],
        contactNumber: [
          {
            required: true,
            message: this.$i18n.t("contact.contact_required"),
          },
          {
            pattern: /\d/,
            message: this.$i18n.t("contact.contact_format"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$i18n.t("contact.email_required"),
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/,
            message: this.$i18n.t("contact.email_format"),
            trigger: "blur",
          },
        ],
        location: [
          {
            required: true,
            message: this.$i18n.t("contact.location_required"),
          },
        ],
        information: [
          {
            required: true,
            message: this.$i18n.t("contact.information_required"),
          },
        ],
        company: [
          {
            required: true,
            message: this.$i18n.t("contact.company_required"),
          },
        ],
        comment: [
          {
            required: true,
            message: this.$i18n.t("contact.comment_required"),
          },
        ],
      },
      form: {
        name: "",
        email: "",
        contactNumber: "",
        company: "",
        location: "",
        information: "",
        comment: "",
        accept: false,
      },
      location: [],
      information: [],
      data: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.location = this.$t("regions");
      this.information = this.$t("contact.information");
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        var domain = window.location.hostname;
        if (valid) {
          // axios
          //   .post("https://" + domain + "/mail.php", {
          //     data: this.form,
          //   })
          //   .then((response) => {
          //     this.$message.success("发送成功");
          //     this.$router.push({ path: "index" });
          //   })
          //   .catch((error) => {
          //     this.$message.error(error.message);
          //   });
          console.log(this.form);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/contactUs.scss";
@import "/assets/scss/mobile/contactUs.scss";
</style>