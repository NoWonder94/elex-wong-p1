<template>
  <div class="agentDetails">
    <div class="agentDetails-title">
      <span class="back-title" @click="back">
        <img class="back-title-icon" src="../../assets/img/back.svg" />
        <span class="back-title-label"> {{ agentName }} </span>
      </span>
      <div
        class="agentDetails-change-pwd border-box"
        v-if="isAgentSelf"
        @click="handleEditModal('change_pwd')"
      >
        <i class="el-icon-lock"></i>
        {{ $t("agent.change_password") }}
      </div>
    </div>

    <div class="agentDetails-content">
      <div class="agentDetails-divider"></div>
      <el-tabs v-model="activetab" stretch>
        <el-tab-pane :label="$t('agent_details.details')" name="details">
          <div class="agentDetails-details-container">
            <div class="agentDetails-details-container-header-label">
              <div class="agentDetails-details-container-label">
                {{ $t("agent_details.general_info") }}
              </div>
              <div
                class="agentDetails-details-edit border-box"
                v-if="isAgentSelf"
                @click="handleEditModal('personal_info')"
              >
                <i class="el-icon-edit"></i>
                {{ $t("edit") }}
              </div>
            </div>
            <div class="agentDetails-account-wrap">
              <div class="agentDetails-details-container-card">
                <!-- card content -->
                <!-- <div class="column-content">
                  <div class="details-container-card-label">Username</div>
                  <div class="details-container-card-value">
                    {{ agentData.details.username ?? "-" }}
                  </div>
                </div> -->

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.role") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.role ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent.user_name") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.username ?? "-" }}
                  </div>
                </div>
                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent.first_name") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.firstName ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent.last_name") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.lastName ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.gender") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.gender ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.country") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.country ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.mobile") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.mobile ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.email") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentData.details.email ?? "-" }}
                  </div>
                </div>

                <!-- <div class="column-content">
                  <div class="details-container-card-label">City</div>
                  <div class="details-container-card-value">
                    {{ agentData.details.city ?? "-" }}
                  </div>
                </div> -->

                <!-- <div class="column-content">
                  <div class="details-container-card-label">Address</div>
                  <div class="details-container-card-value">
                    {{ agentData.details.address ?? "-" }}
                  </div>
                </div> -->

                <!-- <div class="column-content">
                  <div class="details-container-card-label">Zip Code</div>
                  <div class="details-container-card-value">
                    {{ agentData.details.zipCode ?? "-" }}
                  </div>
                </div> -->

                <!-- <div class="column-content">
                  <div class="details-container-card-label">Agent ID</div>
                  <div class="details-container-card-value">
                    {{ agentData.details.agentId ?? "-" }}
                  </div>
                </div> -->
                <!--  -->
              </div>

              <div class="agentDetails-account-container-card">
                <!--  -->
                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.affiliate_id") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.affiliate_id ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.commission_plan") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ commission_plan ?? "-" }}
                  </div>
                </div>

                <!-- <div class="column-content">
                  <div class="details-container-card-label">Username</div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.username ?? "-" }}
                  </div>
                </div> -->

                <!-- <div class="column-content">
                  <div class="details-container-card-label">Email</div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.email ?? "-" }}
                  </div>
                </div> -->

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.status") }}
                  </div>
                  <div class="details-container-card-value">
                    <span
                      :class="[
                        agentAccountInfo.status == 'Active'
                          ? 'agent-status-active'
                          : 'agent-status-inactive',
                      ]"
                    >
                      {{ agentAccountInfo.status ?? "-" }}
                    </span>
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.role") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.role ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.currency") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.currency ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.last_login_date") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.last_login_date ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.registration_date") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.register_date ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.direct_players") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.direct_players ?? "-" }}
                  </div>
                </div>

                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.registration_ip") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.registration_ip ?? "-" }}
                  </div>
                </div>
                <div class="column-content">
                  <div class="details-container-card-label">
                    {{ $t("agent_details.login_ip") }}
                  </div>
                  <div class="details-container-card-value">
                    {{ agentAccountInfo.login_ip ?? "-" }}
                  </div>
                </div>

                <!--  -->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane
          v-if="!isAgentSelf && isAbleToUpdatePlan"
          :label="$t('agent_details.commission_plan')"
          name="commPlan"
        >
          <ProxyComPlan :proxyId="agentId" />
        </el-tab-pane> -->
        <el-tab-pane :label="$t('agent_details.players')" name="players">
          <div class="agentDetails-players-container">
            <div class="players-list-results">
              {{ $t("agent_details.result") }}: {{ agentPlayerCount }}
            </div>

            <div
              class="agentDetails-players-table"
              v-if="agentPlayerData.length > 0"
            >
              <el-table
                border
                show-summary
                :data="agentPlayerData"
                :summary-method="getSummaries"
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  :label="$t('agent.player_id')"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="first_name"
                  :label="$t('agent.first_name')"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="last_name"
                  :label="$t('agent.last_name')"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="currency"
                  :label="$t('agent_details.currency')"
                  width="90"
                >
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  :label="$t('deposit')"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="balance"
                  :label="$t('balance')"
                  width="150"
                >
                </el-table-column>
                <el-table-column prop="bet" :label="$t('bets')" width="150">
                </el-table-column>
                <el-table-column prop="win" :label="$t('wins')" width="150">
                </el-table-column>
                <el-table-column
                  prop="withdraw"
                  :label="$t('withdraw')"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  :label="$t('agent_details.mobile')"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="reg_time"
                  :label="$t('agent_details.registration_date')"
                  :formatter="convertDate"
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="reg_ip"
                  :label="$t('agent_details.ip_address')"
                  width="120"
                >
                </el-table-column>
                <!-- OPERATION -->
                <el-table-column label="Actions" width="120">
                  <template slot-scope="scope">
                    <el-button
                      class="agent-action-button"
                      @click="handleOpenActionModal(scope)"
                    >
                      {{ $t("actions") }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div
              class="agentDetails-players-table-pagination"
              v-if="agentPlayerData.length > 0"
            >
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="50"
                :total="agentPlayerCount"
                :current-page="playerCurrentPage"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Wallet" name="wallet">
          <div class="agentDetails-wallet-container">
            <div class="agentDetails-wallet-container-card">
              <div class="column-content">
                <div class="details-container-card-label">
                  {{ $t("agent.available_commission") }}
                </div>
                <div class="details-container-card-value numberFont">
                  <span>
                    {{ agentData.wallet.available_commission ?? "-" }}
                  </span>
                </div>
              </div>

              <div class="column-content">
                <div class="details-container-card-label">
                  {{ $t("agent.pending_commission") }}
                </div>
                <div class="details-container-card-value numberFont">
                  {{ agentData.wallet.pending_commission ?? "-" }}
                </div>
              </div>
            </div>

            <div class="agentDetails-wallet-gridcontainer-card">
              <!-- card content -->
              <div class="column-content">
                <div class="details-container-card-label">
                  {{ $t("agent.currency") }}
                </div>
                <div class="details-container-card-value">
                  {{ agentData.wallet.currency ?? "-" }}
                </div>
              </div>

              <div class="column-content">
                <div class="details-container-card-label">
                  {{ $t("agent_details.lock_balance") }}
                </div>
                <div class="details-container-card-value numberFont">
                  {{ agentData.wallet.lockBalance ?? "-" }}
                </div>
              </div>

              <div class="column-content">
                <div class="details-container-card-label">
                  {{ $t("agent_details.available_balance") }}
                </div>
                <div class="details-container-card-value numberFont">
                  {{ agentData.wallet.balance ?? "-" }}
                </div>
              </div>
              <!--  -->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <ActionModal v-show="showActionModal" @close-modal="closeActionModal">
      <div class="players-bottom-modal">
        <!-- <div
          v-if="isAbleToUpdateUserStatus"
          class="players-bottom-modal-action"
          @click="handleEditModal"
        >
          {{
            curPlayerTableRow != null && curPlayerTableRow.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
          {{ $t("agent.title") }}
        </div>
        <div
          v-if="isAbleToUpdateUserPwd"
          class="players-bottom-modal-action"
          @click="handleChangePwdModal"
        >
          {{ $t("agent.change_password") }}
        </div> -->
        <div class="players-bottom-modal-action" @click="transferToPlayer">
          {{ $t("players.transfer_money") }}
        </div>
      </div>
    </ActionModal>

    <MiddleModal v-show="isMiddleModalShow" @close="closeModal">
      <div class="agentDetails-form">
        <div v-if="curMiddleModal == 'personal_info'">
          <div class="agentDetails-form-label">
            {{ $t("agent_details.personal_info") }}
          </div>
          <el-form
            class="agentDetails-form-submition"
            ref="agentForm"
            :model="agentForm"
          >
            <el-form-item label="First Name">
              <el-input
                v-model="agentForm.first_name"
                :placeholder="$t('agent.first_name')"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="Middle Name">
              <el-input
                v-model="agentForm.middle_name"
                placeholder="Middle Name"
              ></el-input>
            </el-form-item> -->

            <el-form-item label="Last Name">
              <el-input
                v-model="agentForm.last_name"
                :placeholder="$t('agent.last_name')"
              ></el-input>
            </el-form-item>

            <el-form-item label="Gender">
              <el-select
                :popper-append-to-body="false"
                v-model="agentForm.gender"
                class="agentDetails-form-gender"
                :placeholder="$t('agent_details.gender')"
              >
                <el-option
                  class="agentDetails-form-gender-optionsList"
                  :label="$t('male')"
                  :value="1"
                >
                </el-option>
                <el-option
                  class="agentDetails-form-gender-optionsList"
                  :label="$t('female')"
                  :value="0"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--
            <el-form-item label="Mobile">
              <el-input v-model="agentForm.mobile" placeholder="Mobile Number">
                <el-select
                  class="agentDetails-form-mobileRegion"
                  slot="prepend"
                  placeholder="+86"
                  v-model="agentForm.code"
                  filterable
                  default-first-option
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="(countryCode, index) in countrys"
                    :key="index"
                    :label="'+' + countryCode.code"
                    :value="countryCode.code"
                    class="agentDetails-form-mobileRegion-optionsList"
                  >
                    <span style="float: left"> {{ countryCode.name }} </span>
                    <span style="float: right">
                      {{ "+" + countryCode.code }}
                    </span>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
            -->
            <!--
            <el-form-item label="Countries">
              <el-input
                v-model="agentForm.countries"
                placeholder="Countries"
              ></el-input>
            </el-form-item>
            -->
            <!--
            <el-form-item label="City">
              <el-input v-model="agentForm.city" placeholder="City"></el-input>
            </el-form-item>
            -->
            <!--
            <el-form-item label="Address">
              <el-input
                v-model="agentForm.address"
                placeholder="Address"
              ></el-input>
            </el-form-item>
            -->
            <!--
            <el-form-item label="Zip Code">
              <el-input
                v-model="agentForm.zip_code"
                placeholder="Zip Code"
              ></el-input>
            </el-form-item>
            -->
            <el-form-item>
              <el-button
                class="agentDetails-form-submit-button fill-box"
                @click="onProxyUpdateInfo"
                >{{ $t("submit") }}</el-button
              >
              <el-button @click="closeModal">{{ $t("cancel") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="curMiddleModal == 'change_pwd'">
          <div class="agentDetails-form-label">
            {{ $t("agent.change_password") }}
          </div>
          <el-form
            class="agentDetails-form-submition"
            ref="changePwdForm"
            :model="changePwdForm"
          >
            <el-form-item label="Current Password">
              <el-input
                v-model="changePwdForm.pwd"
                :placeholder="$t('agent_details.current_password')"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item label="New Password">
              <el-input
                v-model="changePwdForm.newPwd"
                :placeholder="$t('agent.new_password')"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item label="Confirm Password">
              <el-input
                v-model="changePwdForm.confirmPwd"
                :placeholder="$t('agent.confirm_password')"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="agentDetails-form-change-pwd-button fill-box"
                @click="onChangePwd"
                >{{ $t("agent_details.save") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </MiddleModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AgentDetails",
  data() {
    return {
      activetab: "details",
      agentId: this.$route.params.agentDetails,
      agentName: "",
      commission_rate: 0,
      commission_plan: "",
      playerCurrentPage: 1,
      agentData: {
        details: {
          username: "",
          firstName: "",
          lastName: null,
          gender: null,
          country: "",
          address: "",
          mobile: null,
          role: "",
          email: "",
          city: "",
          zipCode: "",
          agentId: "",
        },
        wallet: {
          available_commission: 0,
          pending_commission: 0,
          currency: "",
          balance: 0,
          lockBalance: 0,
        },
      },

      agentPlayerData: [],
      agentAccountInfo: {
        affiliate_id: "",
        username: "",
        email: "",
        status: "",
        role: "",
        currency: "",
        last_login_date: "",
        register_date: "",
        direct_players: 0,
        registration_ip: "",
        login_ip: "",
      },
      agentPlayerCount: 0,
      isAgentSelf: false,
      isAbleToUpdatePlan: false,
      isMiddleModalShow: false,
      curMiddleModal: "",
      /* form */
      agentForm: {
        first_name: "",
        last_name: "",
        gender: "",
        mobile: "",
        code: "",
        countries: "",
        city: "",
        address: "",
        zip_code: 0,
      },
      changePwdForm: {
        pwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      summary: {
        deposit: 0,
        balance: 0,
        bet: 0,
        win: 0,
        withdraw: 0,
      },
      showActionModal: false,
      curPlayerTableRow: null,
    };
  },
  computed: {
    ...mapState(["user", "countrys"]),
  },
  mounted() {
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      return false;
    }
    let agentSelfId = localStorage.getItem("agentId");
    if (this.agentId == agentSelfId) {
      this.isAgentSelf = true;
    }
    let roleAccess = localStorage.getItem("roleAccess");
    if (roleAccess) {
      const roleJson = JSON.parse(roleAccess);
      this.isAbleToUpdatePlan =
        roleJson.access && roleJson.access.Proxy_updateCommissionPlan;
      // if (
      //   roleJson.access != null &&
      //   roleJson.access.Proxy_updateCommissionPlan == true
      // ) {
      //   this.isAbleToUpdatePlan = true;
      // } else {
      //   this.isAbleToUpdatePlan = false;
      // }
    }
    this.getAgentInfo();
    this.getAgentPlayerList();
  },

  methods: {
    back() {
      this.$router.back();
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index == 0) {
          sums[index] = this.$t("sum");
        } else if (column.property == "deposit") {
          sums[index] = this.summary.deposit;
        } else if (column.property == "balance") {
          sums[index] = this.summary.balance;
        } else if (column.property == "bet") {
          sums[index] = this.summary.bet;
        } else if (column.property == "win") {
          sums[index] = this.summary.win;
        } else if (column.property == "withdraw") {
          sums[index] = this.summary.withdraw;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    getAgentPlayerList() {
      let params = {
        proxy_id: this.agentId,
        page: this.playerCurrentPage,
        order: "",
        sort: "desc",
      };

      this.$api
        .requestByPost("User/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.agentPlayerCount = result.data.count;
            this.agentPlayerData = result.data.list;
            /* table summary */
            this.summary.deposit = result.data.statistic.deposit;
            this.summary.balance = result.data.statistic.balance;
            this.summary.bet = result.data.statistic.bets;
            this.summary.win = result.data.statistic.wins;
            this.summary.withdraw = result.data.statistic.withdraws;
          } else {
            // this.$notiflix.Notify.failure(
            //   result.msg ? result.msg : this.$t("message.error"),
            //   {
            //     showOnlyTheLastOne: true,
            //   }
            // );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    getAgentInfo() {
      var lang = localStorage.getItem("selected_language") ?? "en";
      this.$api
        .requestByPost("/Proxy/get", {
          proxy_id: this.agentId,
        })
        .then((result) => {
          if (result.status == true) {
            this.commission_rate = result.data.commission_rate;
            this.commission_plan = result.data.commissionplan.name;
            this.agentData.details.username = result.data.account.name;
            this.agentData.details.role =
              result.data.role != null ? result.data.role.name[lang] : " - ";
            this.agentData.details.firstName = result.data.account.first_name;
            this.agentData.details.lastName = result.data.account.last_name;
            this.agentData.details.gender =
              result.data.account.gender == 1 ? "Male" : "Female";
            this.agentData.details.email =
              result.data.account.email != "" ? result.data.account.email : "-";
            this.agentData.details.country = result.data.account.country;
            this.agentData.details.city = "-";
            this.agentData.details.zipCode = "-";
            this.agentData.details.mobile =
              result.data.account.mobile != ""
                ? result.data.account.mobile
                : "-";
            this.agentData.details.address = "-";
            this.agentData.details.agentId = result.data.id;

            this.agentAccountInfo.affiliate_id = result.data.id;
            this.agentAccountInfo.username = "-";
            this.agentAccountInfo.email =
              result.data.account.email != "" ? result.data.account.email : "-";
            this.agentAccountInfo.status =
              result.data.account.status == 1 ? "Active" : "Inactive";

            this.agentAccountInfo.role =
              result.data.role != null ? result.data.role.name[lang] : " - ";
            this.agentAccountInfo.currency = result.data.currency.currency;
            this.agentAccountInfo.last_login_date =
              result.data.account.login_time;
            this.agentAccountInfo.last_login_date = this.formatDate(
              result.data.account.login_time
            );
            this.agentAccountInfo.register_date = this.formatDate(
              result.data.account.reg_time
            );
            this.agentAccountInfo.registration_ip = result.data.account.reg_ip;
            this.agentAccountInfo.login_ip = result.data.account.login_ip;
            this.agentAccountInfo.direct_players = result.data.direct_user_num;

            this.agentData.wallet.available_commission =
              result.data.currency.commission;
            this.agentData.wallet.pending_commission =
              result.data.currency.commission_pending;
            this.agentData.wallet.balance = result.data.currency.balance;
            this.agentData.wallet.lockBalance = result.data.currency.lock;
            this.agentData.wallet.currency = result.data.currency.currency;

            /* form */
            this.agentForm.first_name =
              result.data.account.first_name != ""
                ? result.data.account.first_name
                : "";
            this.agentForm.last_name =
              result.data.account.last_name != ""
                ? result.data.account.last_name
                : "";
            this.agentForm.mobile =
              result.data.account.mobile != ""
                ? result.data.account.mobile
                : "";
            this.agentForm.code = result.data.account.country;
            this.agentForm.gender =
              result.data.account.gender != "" ? result.data.account.gender : 1;
          } else {
            // this.$notiflix.Notify.failure(
            //   result.msg ? result.msg : this.$t("message.error"),
            //   {
            //     showOnlyTheLastOne: true,
            //   }
            // );
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    formatDate(date) {
      if (date == undefined) {
        return "";
      }
      return (
        new Date(date * 1000).toLocaleDateString("en-GB") +
        " " +
        new Date(date * 1000).toLocaleTimeString("en-GB")
      );
    },

    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return new Date(date * 1000).toLocaleDateString("en-GB");
    },

    handleCurrentChange(val) {
      this.playerGamePage = val;
      this.getAgentPlayerList();
    },

    onChangePwd() {
      this.$api
        .requestByPost("/Account/repwd", {
          code: this.changePwdForm.pwd,
          pwd: this.changePwdForm.newPwd,
          type: "oldpwd",
        })
        .then((result) => {
          if (result.status == true) {
            this.closeModal();
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.login"),
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
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    handleEditModal(type) {
      this.isMiddleModalShow = true;
      this.curMiddleModal = type;
    },

    onProxyUpdateInfo() {
      /* let agentSelfId = localStorage.getItem("agentId"); */
      /* proxy_id: agentSelfId, */

      let params = {
        first_name: this.agentForm.first_name,
        last_name: this.agentForm.last_name,
        birthday: "",
        gender: this.agentForm.gender,
        real_name: "",
        remark: "",
      };

      // console.log(params);
      // return false;

      this.$api
        .requestByPost("/Account/update", params)
        .then((result) => {
          if (result.status == true) {
            this.isMiddleModalShow = false;
            this.getAgentInfo();
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
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(error, {
            showOnlyTheLastOne: true,
          });
        });
    },

    closeModal() {
      this.isMiddleModalShow = false;
    },
    closeActionModal() {
      this.showActionModal = false;
    },

    handleOpenActionModal(scope) {
      this.curPlayerTableRow = scope.row;
      this.showActionModal = true;
    },
    transferToPlayer() {
      this.$router.push({
        path: "/transfer",
        query: { id: this.curPlayerTableRow.id, to: "player" },
      });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "../../assets/scss/pc/agentDetails.scss";
@import "../../assets/scss/mobile/agentDetails.scss";
</style>
