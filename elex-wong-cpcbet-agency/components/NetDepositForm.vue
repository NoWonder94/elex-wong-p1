<template>
  <div class="content-form">
    <el-form :model="netDepositForm" ref="netDepositForm">
      <div class="content-form-short" v-show="!showAllProductsRev">
        <!-- revenue share commission plan name -->
        <div class="form-input">
          <div class="input-title">{{ $t("form.commission_plan_name") }} *</div>
          <el-form-item prop="netPlanName">
            <el-input
              v-model="netDepositForm.netPlanName"
              :placeholder="$t('form.commission_plan_name')"
            ></el-input>
          </el-form-item>
        </div>
        <div class="content-form-dynamic-wrapper">
          <!--  revenue share products form -->
          <div class="content-form-dynamic">
            <DynamicInputForm
              :formTitle="'ranges for all products'"
              :formType="'netDeposit'"
              :formKey="'netDeposit'"
              :formArray="netDepositForm.netCommissions"
              @removeItem="removeRevItem"
              @addItem="addRevItem"
            />
          </div>
        </div>
        <!-- <div class="content-form-allProducts">
          <div
            class="content-form-allProducts-label"
            @click="toggleShowHideList"
          >
            Show List <i class="el-icon-arrow-down"></i>
          </div>
        </div> -->
      </div>
      <!-- <div class="content-form-long" v-show="showAllProductsRev">
        <div class="content-form-allProducts">
          <div
            class="content-form-allProducts-label"
            @click="toggleShowHideList"
            style="padding-bottom: 20px"
          >
            Hide List <i class="el-icon-arrow-up"></i>
          </div>
        </div> -->
      <!-- loop each products  -->
      <!-- <div class="content-form-dynamic-wrapper-grid">
          <DynamicInputForm
            v-for="gameList in netDepositForm.netProducts"
            :key="gameList.id"
            :formKey="`${gameList.id}`"
            :formTitle="gameList.gameLabel"
            :formArray="gameList.gameArr"
            @removeItem="removeEachProductItem"
            @addItem="addnetProductsItem"
          />
        </div>
      </div> -->
      <div class="content-form-submit">
        <div class="reset-button" @click="resetForm">{{ $t("reset") }}</div>
        <div class="submit-button fill-box" @click="submitForm">
          {{ $t("save") }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "NetDepositForm",
  data() {
    return {
      // toggle show hide more products
      showAllProductsRev: false,
      // net deposit form
      netDepositForm: {
        netPlanName: "",
        netCommissions: [
          {
            from: 0,
            to: null,
            percentage: 1,
          },
        ],
        netProducts: [],
      },
    };
  },

  methods: {
    // net deposit form
    removeRevItem(id, item) {
      console.log(item);
      if (this.netDepositForm.netCommissions.length > 1) {
        var index = this.netDepositForm.netCommissions.indexOf(item);
        if (index !== -1) {
          if (index == this.netDepositForm.netCommissions.length - 1) {
            var last =
              this.netDepositForm.netCommissions[
                this.netDepositForm.netCommissions.length - 2
              ];
            last.to = null;
          } else {
            if (index >= 1) {
              var prevColumn = this.netDepositForm.netCommissions[index - 1];
              var nextColumn = this.netDepositForm.netCommissions[index + 1];
              nextColumn.from = parseFloat(prevColumn.to);
            }
          }

          this.netDepositForm.netCommissions.splice(index, 1);
        }
      }
    },

    addRevItem() {
      var last =
        this.netDepositForm.netCommissions[
          this.netDepositForm.netCommissions.length - 1
        ];
      last.to = parseInt(last.from) + 1;
      this.netDepositForm.netCommissions.push({
        from: parseFloat(last.from) + 1,
        to: null,
        percentage: parseFloat(last.percentage) + 1,
      });
    },

    //toggle show each products form
    // toggleShowHideList() {
    //   if (this.netDepositForm.netPlanName == "") {
    //     this.$notiflix.Notify.failure(this.$t("commission_plan.valid_input"), {
    //       showOnlyTheLastOne: true,
    //     });
    //     return false;
    //   }

    //   if (this.netDepositForm.netPlanName.length < 4) {
    //     this.$notiflix.Notify.failure(this.$t("commission_plan.valid_length"), {
    //       showOnlyTheLastOne: true,
    //     });
    //     return false;
    //   }

    //   this.showAllProductsRev = !this.showAllProductsRev;
    //   this.netDepositForm.netProducts = [];
    //   let gameType = JSON.parse(localStorage.getItem("gameType"));
    //   if (this.showAllProductsRev == false) {
    //     gameType = [];
    //     return false;
    //   }
    //   var newList = this.netDepositForm.netCommissions;

    //   for (let i = 0; i < gameType.length; i++) {
    //     const element = gameType[i];
    //     this.netDepositForm.netProducts.push({
    //       id: element.id,
    //       gameLabel: element.name,
    //       gameArr: JSON.parse(JSON.stringify(newList)),
    //     });
    //   }
    // },

    // add item in products
    // addnetProductsItem(id) {
    //   var filterItem = _.find(this.netDepositForm.netProducts, function (o) {
    //     return `${o.id}` == `${id}`;
    //   });
    //   if (filterItem == null) {
    //     return;
    //   }
    //   var last = filterItem.gameArr[filterItem.gameArr.length - 1];
    //   last.to = parseInt(last.from) + 1;
    //   filterItem.gameArr.push({
    //     from: parseFloat(last.from) + 1,
    //     to: null,
    //     percentage: parseFloat(last.percentage) + 1,
    //   });
    // },

    // remove item in products
    // removeEachProductItem(id, item) {
    //   var filterItem = _.filter(this.netDepositForm.netProducts, function (o) {
    //     return `${o.id}` == `${id}`;
    //   });
    //   if (filterItem == null || filterItem.length == 0) {
    //     return;
    //   }
    //   var selectedItem = filterItem[0].gameArr;
    //   if (selectedItem.length > 1) {
    //     var index = selectedItem.indexOf(item);
    //     if (index !== -1) {
    //       if (index == selectedItem.length - 1) {
    //         var last = selectedItem[selectedItem.length - 2];
    //         last.to = null;
    //       } else {
    //         if (index >= 1) {
    //           var prevColumn = selectedItem[index - 1];
    //           var nextColumn = selectedItem[index + 1];
    //           nextColumn.from = parseFloat(prevColumn.to);
    //         }
    //       }

    //       selectedItem.splice(index, 1);
    //     }
    //   }
    // },

    resetForm() {
      this.netDepositForm = {
        netPlanName: "",
        netCommissions: [
          {
            from: 0,
            to: null,
            percentage: 1,
          },
        ],
        netProducts: [],
      };
      this.showAllProductsRev = false;
    },

    submitForm() {
      var body = {};
      // if (this.showAllProductsRev) {
      //   var cates = {};
      //   for (
      //     let index = 0;
      //     index < this.netDepositForm.netProducts.length;
      //     index++
      //   ) {
      //     const element = this.netDepositForm.netProducts[index];
      //     cates[`cate${element.id}`] = element.gameArr;
      //   }
      //   body = {
      //     name: this.netDepositForm.netPlanName,
      //     type: 1,
      //     ranges: {
      //       products: cates,
      //     },
      //   };
      // } else {
      // }

      body = {
        name: this.netDepositForm.netPlanName,
        type: 2,
        rule: this.netDepositForm.netCommissions,
      };
      console.log("body", body);
      body["rule"] = JSON.stringify(body["rule"]).replaceAll(
        "percentage",
        "rate"
      );
      this.$api
        .requestByPost("/CommissionPlan/create", body)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(this.$t("commission_created"), {
              showOnlyTheLastOne: true,
            });
            this.$router.back();
          } else {
            this.$notiflix.Notify.failure(
              result.msg ?? this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/pc/commissionPlanForm.scss";
@import "/assets/scss/mobile/commissionPlanForm.scss";
</style>
