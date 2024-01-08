<template>
  <div class="content-form">
    <el-form :model="playerCountForm" ref="playerCountForm">
      <div class="content-form-short" v-show="!showAllProducts">
        <!-- commission plan name -->
        <div class="form-input">
          <div class="input-title">{{ $t("form.commission_plan_name") }} *</div>
          <el-form-item prop="planName">
            <el-input
              v-model="playerCountForm.planName"
              :placeholder="$t('form.commission_plan_name')"
            ></el-input>
          </el-form-item>
        </div>
        <div class="content-form-dynamic-wrapper">
          <!-- products form -->
          <div class="content-form-dynamic">
            <DynamicInputForm
              :formTitle="'ranges for all products'"
              :formArray="playerCountForm.commissions"
              :formType="'playerCount'"
              :formKey="`playerCount`"
              @removeItem="removeProductItem"
              @addItem="addProductItem"
            />
          </div>
          <!-- conditions form -->
          <div class="content-form-dynamic">
            <div class="content-form-label">{{ $t("form.condition") }}</div>
            <div class="content-form-input">
              <div class="content-form-input-label">
                <div>{{ $t("form.condition") }}</div>
                <div>{{ $t("actions") }}</div>
                <div>{{ $t("amount") }}</div>
              </div>
              <el-form-item
                v-for="(condition, index) in playerCountForm.conditions"
                :key="index"
                class="content-form-grid"
              >
                <el-select v-model="condition.condition">
                  <el-option
                    v-for="item in conditionsOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="condition.action">
                  <el-option
                    v-for="action in actionsOption"
                    :key="action.value"
                    :label="action.label"
                    :value="action.value"
                  >
                  </el-option>
                </el-select>
                <el-input v-model="condition.amount" type="number"></el-input>
                <div @click.prevent="removeConditionItem(condition)">
                  <i class="el-icon-delete"></i>
                </div>
              </el-form-item>
            </div>
            <div class="content-form-add">
              <div class="content-form-add-button" @click="addConditionItem">
                <i class="el-icon-plus"></i>
                <div>{{ $t("add") }}</div>
              </div>
            </div>
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
      <div class="content-form-long" v-show="showAllProducts">
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
            v-for="gameList in playerCountForm.products"
            :key="gameList.id"
            :formType="'playerCount'"
            :formKey="`${gameList.id}`"
            :formTitle="gameList.gameLabel"
            :formArray="gameList.gameArr"
            :isShowAddButton="false"
            @removeItem="removeEachProductItem"
          />
        </div>
      </div>
      <div class="content-form-submit">
        <div class="reset-button" @click="resetForm('playerCountForm')">
          {{ $t("reset") }}
        </div>
        <div class="submit-button fill-box" @click="submitForm">
          {{ $t("save") }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PlayerCountForm",
  data() {
    return {
      // toggle show hide more products
      showAllProducts: false,
      // products form
      playerCountForm: {
        planName: "",
        commissions: [
          {
            from: 0,
            to: null,
            percentage: 1,
          },
        ],
        conditions: [],
        products: [],
      },
      // conditions form options
      conditionsOption: [
        { value: "deposits", label: "Deposits" },
        { value: "GGR", label: "GGR" },
        { value: "Bet", label: "Bet" },
      ],
      actionsOption: [
        { value: "=", label: "=" },
        { value: "<", label: "<" },
        { value: "<=", label: "<=" },
        { value: ">", label: ">" },
        { value: ">=", label: ">=" },
      ],
    };
  },

  methods: {
    // products form
    removeProductItem(id, item) {
      if (this.playerCountForm.commissions.length > 1) {
        var index = this.playerCountForm.commissions.indexOf(item);
        if (index !== -1) {
          if (index == this.playerCountForm.commissions.length - 1) {
            var last =
              this.playerCountForm.commissions[
                this.playerCountForm.commissions.length - 2
              ];
            last.to = null;
          } else {
            if (index >= 1) {
              var prevColumn = this.playerCountForm.commissions[index - 1];
              var nextColumn = this.playerCountForm.commissions[index + 1];
              nextColumn.from = parseFloat(prevColumn.to);
            }
          }

          this.playerCountForm.commissions.splice(index, 1);
        }
      }
    },

    addProductItem() {
      if (this.playerCountForm.commissions.length == 0) {
        this.playerCountForm.commissions.push({
          from: 0,
          to: null,
          percentage: 1,
        });
        return;
      }
      var last =
        this.playerCountForm.commissions[
          this.playerCountForm.commissions.length - 1
        ];
      last.to = parseInt(last.from) + 1;
      this.playerCountForm.commissions.push({
        from: parseFloat(last.from) + 1,
        to: null,
        percentage: parseFloat(last.percentage) + 1,
      });
    },

    // conditions form
    removeConditionItem(item) {
      var index = this.playerCountForm.conditions.indexOf(item);
      if (index !== -1) {
        this.playerCountForm.conditions.splice(index, 1);
      }
    },

    addConditionItem() {
      this.playerCountForm.conditions.push({
        condition: "",
        action: "",
        amount: "",
      });
    },
    //toggle show each products form
    toggleShowHideList() {
      if (this.playerCountForm.planName == "") {
        this.$notiflix.Notify.failure(this.$t("commission_plan.valid_input"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      if (this.playerCountForm.planName.length < 4) {
        this.$notiflix.Notify.failure(this.$t("commission_plan.valid_length"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      this.showAllProducts = !this.showAllProducts;
      this.playerCountForm.products = [];
      let gameType = JSON.parse(localStorage.getItem("gameType"));
      if (this.showAllProducts == false) {
        gameType = [];
        return false;
      }
      var newList = this.playerCountForm.commissions;

      for (let i = 0; i < gameType.length; i++) {
        const element = gameType[i];
        this.playerCountForm.products.push({
          id: element.id,
          gameLabel: element.name,
          gameArr: JSON.parse(JSON.stringify(newList)),
        });
      }
    },
    // remove item in products
    removeEachProductItem(id, item) {
      var filterItem = _.filter(this.playerCountForm.products, function (o) {
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
    // reset form
    resetForm() {
      this.playerCountForm = {
        planName: "",
        commissions: [
          // {
          //   from: 0,
          //   to: 10,
          //   percentage: 25,
          // },
          // {
          //   from: 10,
          //   to: 40,
          //   percentage: 30,
          // },
          // {
          //   from: 40,
          //   to: null,
          //   percentage: 35,
          // },
        ],
        conditions: [
          {
            condition: "",
            action: "",
            amount: "",
          },
        ],
        products: [],
      };
      this.showAllProducts = false;
    },
    // submit form
    submitForm() {
      var body = {};
      if (this.showAllProducts) {
        var cates = {};
        for (
          let index = 0;
          index < this.playerCountForm.products.length;
          index++
        ) {
          const element = this.playerCountForm.products[index];
          cates[`${element.id}`] = element.gameArr;
        }
        body = {
          name: this.playerCountForm.planName,
          type: 0,
          rule: {
            ranges: {
              all: this.playerCountForm.commissions,
              products: cates,
            },
            conditions: this.playerCountForm.conditions,
          },
        };
      } else {
        body = {
          name: this.playerCountForm.planName,
          type: 0,
          rule: {
            ranges: {
              all: this.playerCountForm.commissions,
              products: [],
            },
            conditions: this.playerCountForm.conditions,
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

<style lang="scss" type="text/css">
@import "/assets/scss/pc/commissionPlanForm.scss";
@import "/assets/scss/mobile/commissionPlanForm.scss";
</style>
