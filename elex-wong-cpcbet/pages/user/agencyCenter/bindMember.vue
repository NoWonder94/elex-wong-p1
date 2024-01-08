<template>
  <div class="binding">
    <div class="binding-back back-title">
      <span @click="back">
        <i class="el-icon-back"></i>{{ $t("bindMember.title") }}</span
      >
    </div>
    <div class="binding-wrapping-mobile">
      <el-form ref="memberform" :model="memberform">
        <el-form-item :label="$t('bindMember.downlineId')" prop="accountId">
          <el-input
            v-model="memberform.accountId"
            :placeholder="$t('bindMember.plsEnterDownlineId')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bindMember.codeId')" prop="codeId">
          <el-input
            v-model="memberform.codeId"
            :placeholder="$t('bindMember.plsEnterDownlineCode')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="button">
          <el-button type="primary" @click="bindingMember" :loading="isLoading"
            >{{ $t("bindMember.bind") }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="binding-tips">
        <div class="binding-tips-title">
          <ContentTitle :text="$t('bindMember.tips')" />
        </div>
        <div class="binding-tips-content">
          1. {{ $t("bindMember.tips1") }}<br />
          2. {{ $t("bindMember.tips2") }}<br />
          3. {{ $t("bindMember.tips3") }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ContentTitle from "../../../components/ContentTitle.vue";
export default {
  name: "bind-member",
  head() {
    return {
      title: this.$t("bindMember.title"),
    };
  },
  data() {
    return {
      memberform: {
        accountId: "",
        codeId: "",
      },
      isLoading: false,
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back();
    },
    bindingMember() {
      this.isLoading = true;
      let params = {
        user_id: this.memberform.accountId,
        code: this.memberform.codeId,
      };

      if (params.user_id == "" || params.code == "") {
        this.$notiflix.Notify.failure(this.$t("message.empty"), {
          showOnlyTheLastOne: true,
        });
        this.isLoading = false;
        return false;
      } else {
        this.$api
          .requestByPost("/Proxy/bind", params)
          .then((result) => {
            if (result.status == true) {
              this.$notiflix.Notify.success(
                result.msg ? result.msg : this.$t("message.success"),
                {
                  showOnlyTheLastOne: true,
                }
              );
            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"),
                {
                  showOnlyTheLastOne: true,
                }
              );
            }
            this.$refs.memberform.resetFields();
            this.isLoading = false;
          })
          .catch((error) => {
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
            this.$refs.memberform.resetFields();
            this.isLoading = false;
          });
      }
    },
  },
  components: { ContentTitle },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/bindMember.scss";
@import "/assets/scss/mobile/bindMember.scss";
</style>
