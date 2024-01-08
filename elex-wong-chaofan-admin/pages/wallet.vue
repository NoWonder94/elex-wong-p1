<template>
  <div class="wallet">

    <div class="wallet-topup">
      <div class="wallet-topup-label"> 钱包充值 </div>
      <div class="wallet-topup-form">
        <span class="wallet-topup-form-label"> 金额：</span>
        <el-input-number
          v-model="amountTopup"
          :min='1'
          placeholder="请输入金额">
        </el-input-number>
        <div
          class="wallet-topup-submit fill-box"
          @click="handleTopup">
          <i class="el-icon-loading" v-if="submitLoading"></i>
          <span v-else> 充值 </span>
        </div>
      </div>
    </div>

    <hr />


    <div class="wallet-transfer">
      <LottieLoading v-if="isLoading" />
      <div class="wallet-transfer-container"  v-else>
        <div class="wallet-transfer-label"> 金额转账 </div>
        <div class="wallet-transfer-platforms">
          <div class="platforms">
            <div
              class="platforms-item-cards"
              :span="6"
              v-for="platformCoin in platformCoinLists"
              :key="platformCoin.id"
              >
              <el-card shadow="always">
                <div class="card-title"> {{ platformCoin.title }} </div>
                <div class="card-value"> {{ platformCoin.gold }} </div>
              </el-card>
            </div>
          </div>

          <el-form
            class="wallet-transfer-form"
            label-position="left"
            ref="transferForm"
            :model="transferForm"
            label-width="80px">

            <el-form-item label="转账类型">
              <el-radio-group
                v-model="transferForm.type"
                >
                <el-radio border :label="1">钱包转账到平台</el-radio>
                <el-radio border :label="2">平台转账到钱包</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="币种"
              prop="platform"
              :rules="[
                { required: true, message: '币种选择不能为空'},
              ]"
            >
              <el-select
                class="wallet-transfer-form-select"
                placeholder="请选择币种"
                v-model="transferForm.platform"
                :popper-append-to-body="false">
                <el-option
                  v-for="platform in  platformCoinLists"
                  :key="platform.id"
                  :label="platform.title"
                  :value="platform.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="转账金额"
              prop="amount"
              :rules="[
                { required: true, message: '转账金额不能为空'},
                { type: 'number', message: '转账金额必须为数字值'}
              ]"
            >
              <el-input
                class="wallet-transfer-form-amount"
                v-model.number="transferForm.amount"
                placeholder="请输入金额">
              </el-input>
            </el-form-item>

            <el-form-item>
              <div
                class="wallet-transfer-form-button fill-box"
                @click="handleTransfer('transferForm')">
                <i class="el-icon-loading" v-if="submitLoading"></i>
                <span v-else> 提交 </span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        amountTopup: undefined,
        platformCoinLists: [],
        transferForm: {
          type: 1,
          platform: '',
          amount: '',
        },
        isLoading: false,
        submitLoading: false,
      }
    },

    mounted () {
      this.getAllCoin();
    },

    methods: {
      handleTopup() {
        if(this.amountTopup == undefined || this.amountTopup < 0) {
          this.$notiflix.Notify.failure(
            "请输入正确金额",
            {
              showOnlyTheLastOne: true,
            }
          );
          return false;
        }
        this.submitLoading = true;
        this.$api
          .requestByPost("user/User/deposit", {amount: this.amountTopup})
          .then((result) => {
            if (result.status == true) {
              this.amountTopup = undefined;
              this.$store.dispatch("getUserApi", null);
              this.submitLoading = false;
            }
            this.submitLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      getAllCoin() {
        this.isLoading = true;
        this.$api
          .requestByGet("user/Game/getAllCoin")
          .then((result) => {
            if (result.status == true) {
              this.platformCoinLists = result.data;
              this.isLoading = false;
            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
            }

            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      handleTransfer(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.submitLoading = true;

            let params = {
              amount: this.transferForm.amount,
              server_id: this.transferForm.platform,
              type: this.transferForm.type == 1 ? 'in' : 'out'
            };

            this.$api
              .requestByPost("user/Game/coininout", params)
              .then((result) => {
                if (result.status == true) {
                  this.$notiflix.Notify.success(
                    result.msg ? result.msg : "转账成功", { showOnlyTheLastOne: true,
                    });
                  this.$store.dispatch("getUserApi", null);
                  this.$refs[formName].resetFields();
                  this.getAllCoin();

                } else {
                  this.$notiflix.Notify.failure(
                    result.msg.resp_msg.message ? result.msg.resp_msg.message : this.$t("message.error"), {
                      showOnlyTheLastOne: true,
                    });
                }
                this.submitLoading = false;
              })
              .catch((error) => {
                console.log(error);
                this.$notiflix.Notify.failure(this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
              });
          } else {
            this.$notiflix.Notify.failure("请输入正确信息", {
              showOnlyTheLastOne: true,
            });
          }
        })
      }
    },
  }
</script>

<style lang="scss" type='text/css'>
  @import "/assets/scss/pc/wallet.scss";
</style>
