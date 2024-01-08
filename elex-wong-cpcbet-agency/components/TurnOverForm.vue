<template>
  <div class="content-form">
    <el-form :model="turnOverForm" ref="turnOverForm">
      <div class="content-form-short" v-show="!showAllProductsRev">
        <!-- revenue share commission plan name -->
        <div class="form-input">
          <div class="input-title">{{ $t("form.commission_plan_name") }} *</div>
          <el-form-item prop="turnPlanName">
            <el-input
              v-model="turnOverForm.turnPlanName"
              :placeholder="$t('form.commission_plan_name')"
            ></el-input>
          </el-form-item>
        </div>
        <div class="content-form-dynamic-wrapper">
          <!--  revenue share products form -->
          <div class="content-form-dynamic">
            <DynamicInputForm
              :formTitle="'ranges for all products'"
              :formType="'turnOver'"
              :formKey="'turnOver'"
              :formArray="turnOverForm.turnCommissions"
              @removeItem="removeRevItem"
              @addItem="addRevItem"
            />
          </div>
        </div>
        <div class="content-form-allProducts">
          <div
            class="content-form-allProducts-label"
            @click="toggleShowHideList"
          >
            {{ $t("form.show_list") }} <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="content-form-long" v-show="showAllProductsRev">
        <div class="content-form-allProducts">
          <div
            class="content-form-allProducts-label"
            @click="toggleShowHideList"
            style="padding-bottom: 20px"
          >
            {{ $t("form.hide_list") }} <i class="el-icon-arrow-up"></i>
          </div>
        </div>
        <!-- loop each products  -->
        <div class="content-form-dynamic-wrapper-grid">
          <DynamicInputForm
            v-for="gameList in turnOverForm.turnProducts"
            :key="gameList.id"
            :formType="'turnOver'"
            :formKey="`${gameList.id}`"
            :formTitle="gameList.gameLabel"
            :formArray="gameList.gameArr"
            @removeItem="removeEachProductItem"
            @addItem="addRevProductsItem"
          />
        </div>
      </div>
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
  name: "TurnOverForm",
  data() {
    return {
      // toggle show hide more products
      showAllProductsRev: false,
      // turnover form
      turnOverForm: {
        turnPlanName: "",
        turnCommissions: [
          {
            from: 0,
            to: null,
            percentage: 1,
          },
        ],
        turnProducts: [],
      },
    };
  },

  methods: {
    // turnover form
    removeRevItem(id, item) {
      console.log(item);
      if (this.turnOverForm.turnCommissions.length > 1) {
        var index = this.turnOverForm.turnCommissions.indexOf(item);
        if (index !== -1) {
          if (index == this.turnOverForm.turnCommissions.length - 1) {
            var last =
              this.turnOverForm.turnCommissions[
                this.turnOverForm.turnCommissions.length - 2
              ];
            last.to = null;
          } else {
            if (index >= 1) {
              var prevColumn = this.turnOverForm.turnCommissions[index - 1];
              var nextColumn = this.turnOverForm.turnCommissions[index + 1];
              nextColumn.from = parseFloat(prevColumn.to);
            }
          }

          this.turnOverForm.turnCommissions.splice(index, 1);
        }
      }
    },

    addRevItem() {
      var last =
        this.turnOverForm.turnCommissions[
          this.turnOverForm.turnCommissions.length - 1
        ];
      last.to = parseInt(last.from) + 1;
      this.turnOverForm.turnCommissions.push({
        from: parseFloat(last.from) + 1,
        to: null,
        percentage: parseFloat(last.percentage) + 1,
      });
    },

    //toggle show each products form
    toggleShowHideList() {
      if (this.turnOverForm.turnPlanName == "") {
        this.$notiflix.Notify.failure(this.$t("commission_plan.valid_input"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      if (this.turnOverForm.turnPlanName.length < 4) {
        this.$notiflix.Notify.failure(this.$t("commission_plan.valid_length"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      this.showAllProductsRev = !this.showAllProductsRev;
      this.turnOverForm.turnProducts = [];
      let gameType = JSON.parse(localStorage.getItem("gameType"));
      if (this.showAllProductsRev == false) {
        gameType = [];
        return false;
      }
      var newList = this.turnOverForm.turnCommissions;

      for (let i = 0; i < gameType.length; i++) {
        const element = gameType[i];
        this.turnOverForm.turnProducts.push({
          id: element.id,
          gameLabel: element.name,
          gameArr: JSON.parse(JSON.stringify(newList)),
        });
      }
    },

    // add item in products
    addRevProductsItem(id) {
      var filterItem = _.find(this.turnOverForm.turnProducts, function (o) {
        return `${o.id}` == `${id}`;
      });
      if (filterItem == null) {
        return;
      }
      var last = filterItem.gameArr[filterItem.gameArr.length - 1];
      last.to = parseInt(last.from) + 1;
      filterItem.gameArr.push({
        from: parseFloat(last.from) + 1,
        to: null,
        percentage: parseFloat(last.percentage) + 1,
      });
    },

    // remove item in products
    removeEachProductItem(id, item) {
      var filterItem = _.filter(this.turnOverForm.turnProducts, function (o) {
        return `${o.id}` == `${id}`;
      });
      if (filterItem == null || filterItem.length == 0) {
        return;
      }
      var selectedItem = filterItem[0].gameArr;
      if (selectedItem.length > 1) {
        var index = selectedItem.indexOf(item);
        if (index !== -1) {
          if (index == selectedItem.length - 1) {
            var last = selectedItem[selectedItem.length - 2];
            last.to = null;
          } else {
            if (index >= 1) {
              var prevColumn = selectedItem[index - 1];
              var nextColumn = selectedItem[index + 1];
              nextColumn.from = parseFloat(prevColumn.to);
            }
          }

          selectedItem.splice(index, 1);
        }
      }
    },

    resetForm() {
      this.turnOverForm = {
        turnPlanName: "",
        turnCommissions: [
          {
            from: 0,
            to: null,
            percentage: 1,
          },
        ],
        turnProducts: [],
      };
      this.showAllProductsRev = false;
    },

    submitForm() {
      var body = {};
      if (this.showAllProductsRev) {
        var cates = {};
        for (
          let index = 0;
          index < this.turnOverForm.turnProducts.length;
          index++
        ) {
          const element = this.turnOverForm.turnProducts[index];
          cates[`${element.id}`] = element.gameArr;
        }
        body = {
          name: this.turnOverForm.turnPlanName,
          type: 3,
          rule: {
            all: this.turnOverForm.turnCommissions,
            products: cates,
          },
        };
      } else {
        body = {
          name: this.turnOverForm.turnPlanName,
          type: 3,
          rule: {
            all: this.turnOverForm.turnCommissions,
            products: [],
          },
        };
      }
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
