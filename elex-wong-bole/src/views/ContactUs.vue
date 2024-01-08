<template>
  <div id="contactUs_Id" class="contactUs_CN">
    <div class="Banner_Top">
      <div>
        <div class="background_animate"></div>
        <div data-aos="zoom-in-responsive">
          <span class="wrap">
            <span>{{ $i18n.t('contact_us.title') }}</span>
            <span class="d-none d-sm-none d-md-block">{{ $i18n.t('contact_us.sub_title') }}</span>
          </span>
        </div>
      </div>
      <div id="scene">
        <img data-depth="0.6" src="../assets/contact/contact_top_img.png">
      </div>
    </div>
    <div class="content">
      <span
        class="content_title d-inline-block d-sm-inline-block d-md-none"
      >{{ $i18n.t('contact_us.sub_title') }}</span>
      <div class="innerContent">
        <el-form ref="form" class="row" :model="form" :rules="rules" style="margin:0">
          <div class="col-md-8 contentLeft">
            <div class="col-md-12" style="text-align:left;">
              <span class="Leave_comment">{{ $i18n.t('contact_us.leave_comment') }}</span>
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <el-form-item prop="name">
                      <span>{{ $i18n.t('contact_us.name') }}</span>
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col-md-6">
                    <el-form-item prop="email">
                      <span>{{ $i18n.t('contact_us.email') }}</span>
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <el-form-item prop="contactNumber">
                      <span>{{ $i18n.t('contact_us.contact') }}</span>
                      <el-input v-model="form.contactNumber"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col-md-6">
                    <el-form-item prop="company">
                      <span>{{ $i18n.t('contact_us.company') }}</span>
                      <el-input v-model="form.company"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <el-form-item prop="location">
                      <span>{{ $i18n.t('contact_us.where_you_live') }}</span>

                      <el-select
                        v-model="form.location"
                        :placeholder="$i18n.t('contact_us.please_select')"
                        style="width:100%;"
                      >
                        <el-option
                          v-for="(item, index) in location"
                          :label="item.name"
                          :key="index"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="col-md-6">
                    <el-form-item prop="information">
                      <span>{{ $i18n.t('contact_us.categorize_of_inquiry') }}</span>

                      <el-select
                        v-model="form.information"
                        value-key="id"
                        :placeholder="$i18n.t('contact_us.please_select')"
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in information"
                          :label="item.label"
                          :key="item.id"
                          :value="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12" style="position:ralative;">
                  <el-form-item prop="comment">
                    <span>{{ $i18n.t('contact_us.write_comment') }}</span>
                    <el-input
                      type="textarea"
                      :rows="7"
                      :placeholder="$i18n.t('contact_us.comment')"
                      v-model="form.comment"
                      resize="none"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 agree_option" style="word-break:beak-word;">
                  <el-checkbox v-model="form.checked" style="white-space:normal;display:flex;">
                    <span>{{ $i18n.t('contact_us.receive_Info') }}</span>
                  </el-checkbox>
                </div>
                <div class="col-md-4 send">
                  <a
                    href="javascript:void(0)"
                    @click="send('form')"
                  >{{ $i18n.t('contact_us.send') }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 contentRight">
            <div class="col-md-9 col-9 col-sd" style="margin:0 auto;color:white;">
              <div class="row">
                <i></i>
                <a href="mailto:Info@bolegaming.com" target="_top">Info@bolegaming.com</a>
              </div>
              <!--
              <div class="row">
                <i></i>
                <a
                  href="https://wpa.qq.com/msgrd?v=3&uin=2354679497&site=qq&menu=yes"
                  target="_blank"
                >2354679497</a>
              </div>
              -->
              <div class="row">
                <i></i>
                <a href="skype:live:bolegaming?chat">BoleGaming</a>
              </div>
              <div class="row">
                <i></i>
                <a href="https://t.me/bolegaming" target="_blank">BoleGaming</a>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Parallax from 'parallax-js';
import axios from 'axios';
export default {
  data() {
    return {
      checked: false,
      form: {
        name: '',
        email: '',
        contactNumber: '',
        company: '',
        location: '',
        information: '',
        comment: '',
        checked: false
      },
      location: [],
      information: [],
      rules: {
        name: [
          { required: true, message: this.$i18n.t('contact_us.name_required') }
        ],
        contactNumber: [
          {
            required: true,
            message: this.$i18n.t('contact_us.contact_required')
          },
          {
            pattern: /\d/,
            message: this.$i18n.t('contact_us.contact_format'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$i18n.t('contact_us.email_required')
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/,
            message: this.$i18n.t('contact_us.email_format'),
            trigger: 'blur'
          }
        ],
        location: [
          {
            required: true,
            message: this.$i18n.t('contact_us.location_required')
          }
        ],
        information: [
          {
            required: true,
            message: this.$i18n.t('contact_us.information_required')
          }
        ],
        company: [
          {
            required: true,
            message: this.$i18n.t('contact_us.company_required')
          }
        ],
        comment: [
          {
            required: true,
            message: this.$i18n.t('contact_us.comment_required')
          }
        ]
      },
      data: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.$i18n.locale == 'en') {
        $('#contactUs_Id').removeClass('contactUs_CN');
        $('#contactUs_Id').addClass('contactUs_EN');
        $('#contactUs_Id').removeClass('contactUs_KR');
      } else if (this.$i18n.locale == 'zh-CN') {
        $('#contactUs_Id').removeClass('contactUs_EN');
        $('#contactUs_Id').addClass('contactUs_CN');
        $('#contactUs_Id').removeClass('contactUs_KR');
      } else {
        $('#contactUs_Id').removeClass('contactUs_EN');
        $('#contactUs_Id').removeClass('contactUs_CN');
        $('#contactUs_Id').addClass('contactUs_KR');
      }

      this.data = this.$i18n.t('basic_Info');
      this.location = this.$i18n.t('regions');
      this.information = this.$i18n.t('contact_us.information');
      /*
            var scene = document.getElementById('scene');

            var parallaxInstance = new Parallax(scene, {
                relativeInput: true
            });
            */
    },
    send(formName) {
      this.$refs[formName].validate(valid => {
        var domain = window.location.hostname;
        if (valid) {
          axios
            .post('https://' + domain + '/mail.php', {
              data: this.form
            })
            .then(response => {
              this.$message.success('发送成功');
              this.$router.push({ path: 'index' });
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>

@import "../styles/contact.scss";

@media screen and (max-width: 767px) {
  @import "../styles/mobile/contact.scss";
}

@media screen and (min-width: 767px) {
  @import "../styles/pc/contact.scss"
}

</style>
