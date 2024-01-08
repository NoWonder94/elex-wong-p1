<template>
  <div class="verification">
    <div class="verification-title">Verification</div>
    <div class="verification-image-container">
      <img src="../../assets/img/safety.png" alt="" />
    </div>

    <el-form ref="memberform" :model="memberform">
      <el-form-item :label="'User account'" prop="account">
        <el-input v-model="account" placeholder="Sample23456"></el-input>
      </el-form-item>
      <el-form-item :label="'Username'" prop="username">
        <el-input v-model="username" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item :label="'Phone'" prop="phone">
        <el-input v-model="phone" placeholder="请完成认证"></el-input>
      </el-form-item>
      <el-form-item prop="button">
        <el-button type="primary" @click="bindingMember" :loading="isLoading"
          >点击此处完成实名认证
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Verification",
  mounted() {},
  data() {
    return {
      account: "",
      username: "",
      phone: "",
      isLoading: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/verification.scss";
</style>
