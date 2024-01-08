<template>
  <div class="players">
    <!-- <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="Active Players" name="active_players">

      </el-tab-pane>
      <el-tab-pane label="Blocked-Players" name="blocked_players">

      </el-tab-pane>
    </el-tabs> -->

    <div class="players-active-container">
      <div class="players-flex">
        <div class="players-active-list-filter-search">
          <div class="players-filter-label">{{ $t("players.agent_id") }}</div>

          <el-input
            class="players-filter-input"
            v-model="myId"
            @input="onFilterPlayer"
            clearable
            :placeholder="$t('players.search_by_agent_id')"
          ></el-input>
        </div>
        <div class="players-active-list-filter-search">
          <div class="players-filter-label">{{ $t("players.username") }}</div>

          <el-input
            class="players-filter-input"
            v-model="playerName"
            @input="onFilterPlayer"
            clearable
            :placeholder="$t('players.search_by_player_name')"
          ></el-input>
        </div>

        <div class="network-user-list-results-route">
          <div class="user-list-results">
            {{ $t("agent.result") }}: {{ playerResultCount }}
          </div>
          <div
            v-if="isAbleToCreateUser"
            class="user-add-route-button border-box"
            @click="routeToAddUser"
          >
            <img class="icon-left" src="../assets/img/addteam.svg" />
            <span>{{ $t("agent.add_user") }}</span>
            <img class="icon-right" src="../assets/img/forward.svg" />
          </div>
        </div>
      </div>

      <div class="players-table" v-if="playerData.length > 0">
        <el-table
          border
          show-summary
          :data="playerData"
          :summary-method="getSummaries"
          style="width: 100%"
        >
          <!-- <el-table-column
            fixed
            prop="name"
            label="Player name"
            width="110">
          </el-table-column> -->
          <el-table-column
            prop="id"
            :label="$t('players.player_id')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('players.username')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="proxy.name"
            :label="$t('players.agent')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="currency"
            :label="$t('players.currency')"
            width="90"
          >
          </el-table-column>
          <el-table-column prop="deposit" :label="$t('deposit')" width="150">
          </el-table-column>
          <el-table-column prop="balance" :label="$t('balance')" width="150">
          </el-table-column>
          <el-table-column prop="bet" :label="$t('bets')" width="150">
            <template slot-scope="scope">
              <p class="player-bet">
                {{ scope.row.bet }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="win" :label="$t('wins')" width="150">
            <template slot-scope="scope">
              <p class="player-win">
                {{ scope.row.win }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="withdraw" :label="$t('withdraw')" width="150">
          </el-table-column>
          <el-table-column
            prop="transfer_in"
            :label="$t('transfer_in')"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="transfer_out"
            :label="$t('transfer_out')"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            :label="$t('players.mobile')"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="reg_time"
            :label="$t('players.registration_date')"
            :formatter="convertDate"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="reg_ip"
            :label="$t('players.ip_address')"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="login_ip"
            :label="$t('players.login_ip')"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="login_time"
            :formatter="convertDate"
            :label="$t('players.last_login_date')"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="first_name"
            :label="$t('players.first_name')"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="last_name"
            :label="$t('players.last_name')"
            width="100"
          >
          </el-table-column>
          <el-table-column :label="$t('agent.status')" width="100">
            <template slot-scope="scope">
              <p
                :class="
                  scope.row.status == 1 ? 'player-active' : 'player-inactive'
                "
              >
                {{ scope.row.status == 1 ? $t("active") : $t("freeze") }}
              </p>
            </template>
          </el-table-column>
          <!-- OPERATION -->
          <el-table-column
            label="Actions"
            width="120"
            v-if="isAbleToUpdateUserStatus || isAbleToUpdateUserPwd"
          >
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

      <div class="players-table-pagination" v-if="playerData.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="50"
          :total="playerResultCount"
          :current-page="playerGamePage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <ActionModal v-show="showActionModal" @close-modal="closeModal">
      <div class="players-bottom-modal">
        <div
          v-if="isAbleToUpdateUserStatus"
          class="players-bottom-modal-action"
          @click="handleEditModal"
        >
          {{
            curPlayerTableRow != null && curPlayerTableRow.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
          {{ $t("player") }}
        </div>
        <div
          v-if="isAbleToUpdateUserPwd"
          class="players-bottom-modal-action"
          @click="handleChangePwdModal"
        >
          {{ $t("agent.change_password") }}
        </div>
        <div
          v-if="isTransferUserShow"
          class="players-bottom-modal-action"
          @click="transferToPlayer"
        >
          {{ $t("players.transfer_money") }}
        </div>
      </div>
    </ActionModal>

    <MiddleModal v-show="isMiddleModalShow" @close="closeEditModal">
      <div class="player-block-modal" v-if="curPlayerTableRow">
        <div class="player-block-title">
          {{ $t("agent.are_you_sure_want_to") }}
          {{
            curPlayerTableRow.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
          {{ $t("agent.this_player") }}?
        </div>
        <div class="player-block-item">
          <div class="player-block-item-title">{{ $t("agent.player_id") }}</div>
          <div class="player-block-item-value">
            {{ curPlayerTableRow.id }}
          </div>
        </div>
        <div class="player-block-button border" @click="closeEditModal">
          {{ $t("cancel") }}
        </div>
        <div class="player-block-button warning" @click="blockPlayer">
          {{
            curPlayerTableRow.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
        </div>
      </div>
    </MiddleModal>

    <MiddleModal v-show="isChangePwdModalShow" @close="closeChangePwdModal">
      <div class="change-agent-pwd-modal" v-if="curPlayerTableRow">
        <div class="change-agent-pwd-title">
          {{ $t("agent.change_password") }}
        </div>
        <div class="change-agent-pwd-item">
          <div class="change-agent-pwd-item-title">
            {{ $t("agent.player_id") }}
          </div>
          <div class="change-agent-pwd-item-value">
            {{ curPlayerTableRow.id }}
          </div>
        </div>
        <el-form
          class="change-agent-pwd-form-submition"
          ref="updatePwdForm"
          :model="updatePwdForm"
        >
          <el-form-item label="New Password">
            <el-input
              v-model="updatePwdForm.pwd"
              :placeholder="$t('agent.new_password')"
            ></el-input>
          </el-form-item>

          <el-form-item label="Remark">
            <el-input
              v-model="updatePwdForm.remark"
              :placeholder="$t('agent.remark')"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          class="change-agent-pwd-button border"
          @click="closeChangePwdModal"
        >
          {{ $t("cancel") }}
        </div>
        <div class="change-agent-pwd-button warning" @click="changePlayerPwd">
          {{ $t("submit") }}
        </div>
      </div>
    </MiddleModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAbleToCreateUser: false,
      isAbleToUpdateUserStatus: false,
      isAbleToUpdateUserPwd: false,
      activeName: "active_players",
      playerId: "",
      playerName: "",
      playerResultCount: 0,
      playerGamePage: 1,
      playerData: [
        // {
        //   player_id: '647300853',
        //   name: 'Karcords',
        //   currency: 'PHP',
        //   balance: 0,
        //   registration_date: '2022-04-26 19:06:07',
        // },
        // {
        //   player_id: '531667536',
        //   name: 'Markled',
        //   currency: 'PHP',
        //   balance: 0,
        //   registration_date: '2022-04-26 19:06:07',
        // }
      ],
      curPlayerTableRow: null,
      /* table summary */
      summary: null,
      myId: "",
      showActionModal: false,
      /* action Modal */
      showActionModal: false,
      isMiddleModalShow: false,
      isChangePwdModalShow: false,
      isTransferUserShow: false,
      updatePwdForm: {
        user_id: "",
        pwd: "",
        remark: "",
      },
    };
  },
  mounted() {
    this.getAccount();
    let roleAccess = localStorage.getItem("roleAccess");
    if (roleAccess) {
      const roleJson = JSON.parse(roleAccess);
      this.isAbleToCreateUser = roleJson.access && roleJson.access.User_create;
      this.isAbleToUpdateUserPwd =
        roleJson.access && roleJson.access.User_updatePwd;
      this.isAbleToUpdateUserStatus =
        roleJson.access && roleJson.access.User_updateStatus;
      this.isTransferUserShow =
        roleJson.access && roleJson.access.Transfer_submit_user;
    }
  },
  methods: {
    routeToAddUser() {
      this.$router.push({ path: "/addAgentPlayer", query: { to: "player" } });
    },
    getAccount() {
      this.$api
        .requestByPost("/Account/get", {})
        .then((result) => {
          if (result.status == true) {
            this.getUserLists();
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
    getUserLists() {
      var authToken = localStorage.getItem("authToken");
      if (!authToken) {
        return false;
      }
      let params = {
        proxy_id: this.myId,
        page: this.playerGamePage,
        username: this.playerName,
        order: "",
        sort: "desc",
      };

      this.$api
        .requestByPost("User/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.playerResultCount = result.data.count;
            this.playerData = result.data.list;
            /* table summary */
            this.summary = result.data.statistic;
          } else {
            // this.$notiflix.Notify.failure(
            //   result.msg ? result.msg : this.$t("message.error"), {
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

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index == 0) {
          sums[index] = this.$t("sum");
        } else if (column.property == "deposit") {
          sums[index] = this.summary.deposits;
        } else if (column.property == "balance") {
          sums[index] = this.summary.balance;
        } else if (column.property == "bet") {
          sums[index] = this.summary.bets;
        } else if (column.property == "win") {
          sums[index] = this.summary.wins;
        } else if (column.property == "withdraw") {
          sums[index] = this.summary.withdraws;
        } else if (column.property == "transfer_in") {
          sums[index] = this.summary.transfer_in;
        } else if (column.property == "transfer_out") {
          sums[index] = this.summary.transfer_out;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    handleCurrentChange(val) {
      this.playerGamePage = val;
      this.getUserLists();
    },

    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return new Date(date * 1000).toLocaleString("en-GB", { timeZone: "UTC" });
    },

    onFilterPlayer() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.playerData = [];
        this.playerGamePage = 1;
        this.getUserLists();
      }, 500);
    },

    handleOpenActionModal(scope) {
      this.curPlayerTableRow = scope.row;
      this.showActionModal = true;
    },
    handleEditModal(type) {
      this.isMiddleModalShow = true;
      this.showActionModal = false;
    },
    handleChangePwdModal() {
      this.isChangePwdModalShow = true;
      this.showActionModal = false;
    },
    closeModal() {
      this.showActionModal = false;
    },
    closeEditModal() {
      this.isMiddleModalShow = false;
    },
    closeChangePwdModal() {
      this.isChangePwdModalShow = false;
      this.resetUpdatePwdForm();
    },
    resetUpdatePwdForm() {
      this.updatePwdForm = {
        user_id: "",
        pwd: "",
        remark: "",
      };
    },
    changePlayerPwd() {
      this.updatePwdForm.user_id = this.curPlayerTableRow.id;
      this.$api
        .requestByPost("/User/updatePwd", this.updatePwdForm)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.closeChangePwdModal();
            this.closeModal();
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
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    blockPlayer() {
      var id = this.curPlayerTableRow.id;
      this.$api
        .requestByPost("/User/updateStatus", {
          user_id: id,
          status: this.curPlayerTableRow.status == 0 ? 1 : 0,
        })
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.closeEditModal();
            this.closeModal();
            this.getUserLists();
          } else {
            this.closeEditModal();
            this.closeModal();
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
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

<style lang="scss">
@import "/assets/scss/pc/players.scss";
@import "/assets/scss/mobile/players.scss";
</style>
