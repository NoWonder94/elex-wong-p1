<template>
  <div class="addAgentPlayer">
    <div class="addAgentPlayer-header">
      <div class="addAgentPlayer-header-wrap">
        <div class="header-item" @click="routeToDashboard">
          <img src="../assets/img/back.svg" />
          Add Agent / Player
        </div>
        <div class="header-item green" @click="register">Register</div>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="addAgentPlayer" @tab-click="handleClick" stretch>
        <el-tab-pane
          v-if="this.user.role && user.role.access.Proxy_create"
          label="Add Agent"
          name="agent"
        >
          <div class="content-form">
            <el-form
              :model="agentForm"
              ref="agentForm"
              :rules="agentFormRules"
              class="agentForm"
            >
              <el-form-item label="Username" prop="userName">
                <el-input
                  v-model="agentForm.userName"
                  placeholder="Username"
                ></el-input>
              </el-form-item>
              <el-form-item label="First Name" prop="firstName">
                <el-input
                  v-model="agentForm.firstName"
                  placeholder="First Name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="lastName">
                <el-input
                  v-model="agentForm.lastName"
                  placeholder="Last Name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="agentForm.email"
                  placeholder="Email"
                ></el-input>
              </el-form-item>
              <el-form-item label="Mobile" prop="mobile">
                <el-input
                  v-model="agentForm.mobile"
                  placeholder="Mobile Number"
                >
                  <el-select
                    class="form-input-select"
                    slot="prepend"
                    placeholder="+63"
                    v-model="agentForm.country"
                    filterable
                    default-first-option
                    :popper-append-to-body="false"
                  >
                    <el-option
                      class="form-input-optionsList"
                      v-for="(countryCode, index) in countrys"
                      :key="index"
                      :label="'+' + countryCode.code"
                      :value="countryCode.code"
                    >
                      <span style="float: left"> {{ countryCode.name }} </span>
                      <span style="float: right">
                        {{ "+" + countryCode.code }}
                      </span>
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="Role" prop="role">
                <el-select
                  class="form-input-select2"
                  v-model="agentForm.role_id"
                  default-first-option
                  :popper-append-to-body="false"
                >
                  <el-option
                    class="form-input-optionsList"
                    v-for="role in roleList"
                    :key="role.id"
                    :label="role.name"
                    :value="role.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="Commission Plan" prop="commissionPlanId">
                <el-select
                  class="form-input-select2"
                  v-model="agentForm.commission_plan_id"
                  default-first-option
                  :popper-append-to-body="false"
                >
                  <el-option
                    class="form-input-optionsList"
                    v-for="item in commission_plan"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
              <!-- <div class="form-input">
                <div class="input-title">Commission Rate *</div>
                <el-input
                  v-model="agentForm.rate"
                  placeholder="Rate"
                ></el-input>
              </div> -->
              <el-form-item label="New Password" prop="newPassword">
                <el-input
                  v-model="agentForm.newPassword"
                  placeholder="New Password"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="confirmPassword">
                <el-input
                  v-model="agentForm.confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.user.role && user.role.access.User_create"
          label="Add Player"
          name="player"
        >
          <div class="content-form">
            <el-form
              ref="playerForm"
              :rules="playerFormRules"
              :model="playerForm"
            >
              <el-form-item label="Username" prop="userName">
                <el-input
                  v-model="playerForm.userName"
                  placeholder="Username"
                ></el-input>
              </el-form-item>
              <el-form-item label="First Name" prop="firstName">
                <el-input
                  v-model="playerForm.firstName"
                  placeholder="First Name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="lastName">
                <el-input
                  v-model="playerForm.lastName"
                  placeholder="Last Name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="playerForm.email"
                  placeholder="Email"
                ></el-input>
              </el-form-item>
              <el-form-item label="Mobile" prop="mobile">
                <el-input
                  v-model="playerForm.mobile"
                  placeholder="Mobile Number"
                >
                  <el-select
                    class="form-input-select"
                    slot="prepend"
                    placeholder="+63"
                    v-model="playerForm.country"
                    filterable
                    default-first-option
                    :popper-append-to-body="false"
                  >
                    <el-option
                      class="form-input-optionsList"
                      v-for="(countryCode, index) in countrys"
                      :key="index"
                      :label="'+' + countryCode.code"
                      :value="countryCode.code"
                    >
                      <span style="float: left"> {{ countryCode.name }} </span>
                      <span style="float: right">
                        {{ "+" + countryCode.code }}
                      </span>
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="New Password" prop="newPassword">
                <el-input
                  v-model="playerForm.newPassword"
                  placeholder="New Password"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="confirmPassword">
                <el-input
                  v-model="playerForm.confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                ></el-input>
              </el-form-item>
              <!-- <div class="form-input">
                <div class="input-title">Username</div>
                <el-input
                  v-model="playerForm.userName"
                  placeholder="Username"
                ></el-input>
              </div>
              <div class="form-input">
                <div class="input-title">First Name</div>
                <el-input
                  v-model="playerForm.firstName"
                  placeholder="First Name"
                ></el-input>
              </div>
              <div class="form-input">
                <div class="input-title">Last Name</div>
                <el-input
                  v-model="playerForm.lastName"
                  placeholder="Last Name"
                ></el-input>
              </div>
              <div class="form-input">
                <div class="input-title">Email</div>
                <el-input
                  v-model="playerForm.email"
                  placeholder="Email"
                  type="email"
                ></el-input>
              </div>
              <div class="form-input">
                <div class="input-title">Mobile *</div>
                <el-input
                  v-model="playerForm.mobile"
                  placeholder="Mobile Number"
                >
                  <el-select
                    class="form-input-select"
                    slot="prepend"
                    placeholder="+86"
                    v-model="playerForm.country"
                    filterable
                    default-first-option
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="(countryCode, index) in countrys"
                      :key="index"
                      :label="'+' + countryCode.code"
                      :value="countryCode.code"
                      class="form-input-optionsList"
                    >
                      <span style="float: left"> {{ countryCode.name }} </span>
                      <span style="float: right">
                        {{ "+" + countryCode.code }}
                      </span>
                    </el-option>
                  </el-select>
                </el-input>
              </div>

              <div class="form-input">
                <div class="input-title">New Password *</div>
                <el-input
                  v-model="playerForm.newPassword"
                  placeholder="New Password"
                  type="password"
                ></el-input>
              </div>
              <div class="form-input">
                <div class="input-title">Confirm Password *</div>
                <el-input
                  v-model="playerForm.confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                ></el-input>
              </div> -->
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddAgentPlayer",
  data() {
    return {
      addAgentPlayer: "agent",
      /* agent form */
      agentForm: {
        country: 63,
        mobile: "",
        email: "",
        newPassword: "",
        // rate: "",
        role_id: "",
        confirmPassword: "",
        // commission_plan_id: "",
        firstName: "",
        lastName: "",
        userName: "",
      },
      agentFormRules: {
        userName: [
          { required: true, message: "UserName is required", trigger: "blur" },
        ],
        firstName: [
          {
            required: true,
            message: "First Name is required",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Last Name is required",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "Mobile is required",
            trigger: "blur",
          },
        ],
        role: [
          {
            required: true,
            message: "Role is required",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            type: "",
            required: true,
            message: "New Password is required",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Confirm Password is required",
            trigger: "blur",
          },
        ],
      },
      /* player form */
      playerForm: {
        country: 63,
        mobile: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        userName: "",
      },
      playerFormRules: {
        userName: [
          { required: true, message: "UserName is required", trigger: "blur" },
        ],
        firstName: [
          {
            required: true,
            message: "First Name is required",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Last Name is required",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "Mobile is required",
            trigger: "blur",
          },
        ],
        role: [
          {
            required: true,
            message: "Role is required",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            type: "",
            required: true,
            message: "New Password is required",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Confirm Password is required",
            trigger: "blur",
          },
        ],
      },
      roleList: [{ label: "Agent", value: "agent" }],
      parentList: [{ label: "Astrobet", value: "Astrobet" }],
      currencyList: [{ label: "PHP", value: "PHP" }],
      countries: [{ code: "63", name: "Philippines" }],
      roleList: [],
      commission_plan: [],
    };
  },
  computed: {
    ...mapState(["countrys", "user"]),
  },
  mounted() {
    this.getCommissionPlanList();
    this.checkAgentPlayer();
    this.getProxyRole();
    if (this.user.role && !this.user.role.access.Proxy_create) {
      this.addAgentPlayer = "player";
    }
  },
  methods: {
    getCommissionPlanList() {
      this.$api
        .requestByPost("/Proxy/commissionPlanList", {
          proxy_id: 0,
        })
        .then((result) => {
          if (result.status == true) {
            this.commission_plan = result.data;
          }
        });
    },
    checkAgentPlayer() {
      this.addAgentPlayer = this.$route.query.to;
    },
    routeToDashboard() {
      this.$router.back();
    },
    handleClick(tab, event) {},
    getProxyRole() {
      var lang = localStorage.getItem("selected_language") ?? "en";
      this.$api
        .requestByPost("/Proxy/roles", null)
        .then((res) => {
          if (res.status == true) {
            res.data.forEach((element) => {
              this.roleList.push({
                id: element.id,
                name: element.name[lang],
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    register() {
      let agentForm = {
        email: this.agentForm.email,
        country: this.agentForm.country,
        mobile: this.agentForm.mobile,
        pwd: this.agentForm.newPassword,
        rate: this.agentForm.rate,
        // commission_plan_id: this.agentForm.commission_plan_id,
        first_name: this.agentForm.firstName,
        last_name: this.agentForm.lastName,
        username: this.agentForm.userName,
        role_id: this.agentForm.role_id,
      };
      let playerForm = {
        email: this.playerForm.email,
        country: this.playerForm.country,
        mobile: this.playerForm.mobile,
        pwd: this.playerForm.newPassword,
        first_name: this.playerForm.firstName,
        last_name: this.playerForm.lastName,
        username: this.playerForm.userName,
      };

      this.addAgentPlayer == "agent"
        ? this.registerAgent(agentForm)
        : this.registerPlayer(playerForm);
    },
    registerAgent(agentForm) {
      if (agentForm.mobile == "") {
        this.$notiflix.Notify.failure("mobile number cannot be empty", {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      this.$api
        .requestByPost("/Proxy/create", agentForm)
        .then((result) => {
          if (result.status == true) {
            // window.location.reload();
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );

            this.agentForm = {
              country: 63,
              mobile: "",
              email: "",
              newPassword: "",
              confirmPassword: "",
              role_id: "",
              firstName: "",
              lastName: "",
              userName: "",
            };
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
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
    registerPlayer(playerForm) {
      if (playerForm.mobile == "") {
        this.$notiflix.Notify.failure("mobile number cannot be empty", {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      this.$api
        .requestByPost("/User/create", playerForm)
        .then((result) => {
          if (result.status == true) {
            // window.location.reload();
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.playerForm = {
              country: 63,
              mobile: "",
              email: "",
              newPassword: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              userName: "",
            };
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
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
@import "/assets/scss/pc/addAgentPlayer.scss";
@import "/assets/scss/mobile/addAgentPlayer.scss";
</style>
