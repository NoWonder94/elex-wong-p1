<template>
  <div class="network">
    <el-tabs v-model="activeNetwork" stretch>
      <!-- <el-tab-pane label="User" name="user"> -->
      <div class="network-user-list-container">
        <!--
            <div class="network-user-list-filter-option">
              <div class="user-filter-label">
                Sort by
              </div>
              <div class="user-filter-option">
                <el-select
                class="user-filter-option-select"
                  v-model="selectedFilterOption"
                  :popper-append-to-body="false"
                >
                  <el-option
                    class="user-filter-option-selections"
                    v-for="item in filterOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            -->
        <div class="network-user-wrap">
          <div class="network-user-list-filter-search">
            <div class="user-filter-label">{{ $t("agent.user_id") }}</div>

            <el-input
              class="user-filter-input"
              v-model="userID"
              @input="onSearch"
              clearable
              :placeholder="$t('agent.search_by_user_id')"
            ></el-input>
          </div>
          <div class="network-user-list-filter-search">
            <div class="user-filter-label">{{ $t("agent.user_name") }}</div>

            <el-input
              class="user-filter-input"
              v-model="userName"
              @input="onSearch"
              clearable
              :placeholder="$t('agent.search_by_user_name')"
            ></el-input>
          </div>

          <div class="network-user-list-results-route">
            <div class="user-list-results">
              {{ $t("agent.result") }}: {{ userResultCount }}
            </div>
            <div
              v-if="isAbleToCreateUser"
              class="user-add-route-button border-box"
              @click="routeToAddUser"
            >
              <img class="icon-left" src="../../assets/img/addteam.svg" />
              <span>{{ $t("agent.add_user") }}</span>
              <img class="icon-right" src="../../assets/img/forward.svg" />
            </div>
          </div>
        </div>
        <!-- <div class="network-downline-container" v-if="downlineList.length > 0">
          <img src="../../assets/img/back.svg" @click="backToLastDownline" />
          <div
            class="downline-item"
            v-for="(item, index) in downlineList"
            :key="index"
            @click="checkDownline(item, index)"
          >
            /{{ item }}
          </div>
        </div> -->
        <div class="network-user-list-table web">
          <el-table
            show-summary
            :summary-method="getSummaries"
            border
            :data="userTable"
            :cell-class-name="tableCellClassName"
            @cell-click="handleCurrentChange"
            style="width: 100%"
            row-key="id"
            lazy
            :load="load"
            :tree-props="{
              children: 'children',
              hasChildren: 'hasChildren',
            }"
          >
            <el-table-column
              fixed
              prop="id"
              :label="$t('agent.user_id')"
              width="130"
            >
            </el-table-column>
            <el-table-column
              prop="account.name"
              :label="$t('agent.user_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.first_name"
              :label="$t('agent.first_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.last_name"
              :label="$t('agent.last_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="currency"
              :label="$t('agent.currency')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="role.name.en"
              :label="$t('agent.role')"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="balance" :label="$t('balance')" width="150">
            </el-table-column>
            <el-table-column
              :label="$t('agent.pending_commission')"
              prop="commission_pending"
              width="165"
            >
              <template slot-scope="scope">
                <p
                  :class="[
                    scope.row.commission_pending < 0 ? 'negative' : 'positive',
                  ]"
                >
                  {{ scope.row.commission_pending }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('agent.available_commission')"
              prop="commission"
              width="170"
            >
              <template slot-scope="scope">
                <p
                  :class="[scope.row.commission < 0 ? 'negative' : 'positive']"
                >
                  {{ scope.row.commission }}
                </p>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="commission_rate"
              :label="$t('agent.commission_rate')"
              width="140"
            >
            </el-table-column> -->
            <el-table-column
              prop="direct_user_num"
              :label="$t('agent.player_count')"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="direct_child_num"
              :label="$t('agent.agent_count')"
              width="110"
            >
            </el-table-column>
            <!-- <el-table-column :label="$t('agent.agent_count')" width="105">
              <template slot-scope="scope">
                <p
                  v-if="scope.row.direct_child_num > 0"
                  class="agent-direct-child"
                  @click="checkDownlineFromTable(scope)"
                >
                  {{ scope.row.direct_child_num }}
                </p>
                <p v-else>{{ scope.row.direct_child_num }}</p>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="account.reg_ip"
              :label="$t('agent.reg_ip')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.login_ip"
              :label="$t('agent.login_ip')"
              width="150"
            >
            </el-table-column>
            <el-table-column :label="$t('agent.status')" width="100">
              <template slot-scope="scope">
                <p
                  v-if="scope.row.account"
                  :class="
                    scope.row.account.status == 1
                      ? 'agent-active'
                      : 'agent-inactive'
                  "
                >
                  {{
                    scope.row.account.status == 1
                      ? $t("active")
                      : $t("inactive")
                  }}
                </p>
              </template>
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
        <div class="network-user-list-table mobile">
          <el-table
            show-summary
            :summary-method="getSummaries"
            border
            :data="userTable"
            :cell-class-name="tableCellClassName"
            @cell-click="handleCurrentChange"
            style="width: 100%"
            row-key="id"
            lazy
            :load="load"
            :tree-props="{
              children: 'children',
              hasChildren: 'hasChildren',
            }"
          >
            <el-table-column prop="id" :label="$t('agent.user_id')" width="130">
            </el-table-column>
            <el-table-column
              prop="account.name"
              :label="$t('agent.user_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.first_name"
              :label="$t('agent.first_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.last_name"
              :label="$t('agent.last_name')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="currency"
              :label="$t('agent.currency')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="role.name.en"
              :label="$t('agent.role')"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="balance" :label="$t('balance')" width="150">
            </el-table-column>
            <el-table-column
              :label="$t('agent.pending_commission')"
              prop="commission_pending"
              width="165"
            >
              <template slot-scope="scope">
                <p
                  :class="[
                    scope.row.commission_pending < 0 ? 'negative' : 'positive',
                  ]"
                >
                  {{ scope.row.commission_pending }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('agent.available_commission')"
              prop="commission"
              width="170"
            >
              <template slot-scope="scope">
                <p
                  :class="[scope.row.commission < 0 ? 'negative' : 'positive']"
                >
                  {{ scope.row.commission }}
                </p>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="commission_rate"
              :label="$t('agent.commission_rate')"
              width="140"
            >
            </el-table-column> -->
            <el-table-column
              prop="direct_user_num"
              :label="$t('agent.player_count')"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="direct_child_num"
              :label="$t('agent.agent_count')"
              width="110"
            >
            </el-table-column>
            <!-- <el-table-column :label="$t('agent.agent_count')" width="105">
              <template slot-scope="scope">
                <p
                  v-if="scope.row.direct_child_num > 0"
                  class="agent-direct-child"
                  @click="checkDownlineFromTable(scope)"
                >
                  {{ scope.row.direct_child_num }}
                </p>
                <p v-else>{{ scope.row.direct_child_num }}</p>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="account.reg_ip"
              :label="$t('agent.reg_ip')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="account.login_ip"
              :label="$t('agent.login_ip')"
              width="150"
            >
            </el-table-column>
            <el-table-column :label="$t('agent.status')" width="100">
              <template slot-scope="scope">
                <p
                  v-if="scope.row.account"
                  :class="
                    scope.row.account.status == 1
                      ? 'agent-active'
                      : 'agent-inactive'
                  "
                >
                  {{
                    scope.row.account.status == 1 ? $t("active") : $t("freeze")
                  }}
                </p>
              </template>
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

        <div class="network-user-list-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="50"
            :total="userResultCount"
            :current-page="currentPage"
            @current-change="onPageChange"
          >
          </el-pagination>
        </div>
      </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="Deleted Users" name="deletedUser"> </el-tab-pane> -->
    </el-tabs>

    <ActionModal v-show="showActionModal" @close-modal="closeModal">
      <div class="players-bottom-modal">
        <div
          v-if="isAbleToUpdateProxyStatus"
          class="players-bottom-modal-action"
          @click="handleEditModal"
        >
          {{
            curUserTableRow != null &&
            curUserTableRow.account &&
            curUserTableRow.account.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
          {{ $t("agent.title") }}
        </div>
        <div
          v-if="isAbleToUpdateProxyPwd"
          class="players-bottom-modal-action"
          @click="handleChangePwdModal"
        >
          {{ $t("agent.change_password") }}
        </div>

        <!-- v-if="isAbleToUpdateProxyPwd" -->
        <!-- <div class="players-bottom-modal-action" @click="getRoleList">
          {{ $t("agent.change_role") }}
        </div> -->
      </div>
    </ActionModal>

    <MiddleModal v-show="isMiddleModalShow" @close="closeEditModal">
      <div class="player-block-modal" v-if="curUserTableRow">
        <div class="player-block-title">
          {{ $t("agent.are_you_sure_want_to") }}
          {{
            curUserTableRow.account && curUserTableRow.account.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
          {{ $t("agent.this_player") }}?
        </div>
        <div class="player-block-item">
          <div class="player-block-item-title">{{ $t("agent.player_id") }}</div>
          <div class="player-block-item-value">
            {{ curUserTableRow.id }}
          </div>
        </div>
        <div class="player-block-button border" @click="closeEditModal">
          {{ $t("cancel") }}
        </div>
        <div class="player-block-button warning" @click="blockAgent">
          {{
            curUserTableRow.account && curUserTableRow.account.status == 0
              ? $t("agent.unblock")
              : $t("agent.block")
          }}
        </div>
      </div>
    </MiddleModal>

    <MiddleModal v-show="isChangePwdModalShow" @close="closeChangePwdModal">
      <div class="change-agent-pwd-modal" v-if="curUserTableRow">
        <div class="change-agent-pwd-title">
          {{ $t("agent.change_password") }}
        </div>
        <div class="change-agent-pwd-item">
          <div class="change-agent-pwd-item-title">
            {{ $t("agent.player_id") }}
          </div>
          <div class="change-agent-pwd-item-value">
            {{ curUserTableRow.id }}
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
        <div class="change-agent-pwd-button warning" @click="changeAgentPwd">
          {{ $t("submit") }}
        </div>
      </div>
    </MiddleModal>
    <MiddleModal v-show="isChangeRoleShow" @close="closeChangeRoleModal">
      <div class="change-agent-pwd-modal" v-if="curUserTableRow">
        <div class="change-agent-pwd-title">
          {{ $t("agent.change_role") }}
        </div>
        <div class="change-agent-pwd-item">
          <div class="change-agent-pwd-item-title">
            {{ $t("agent.player_id") }}
          </div>
          <div class="change-agent-pwd-item-value">
            {{ curUserTableRow.id }}
          </div>
        </div>
        <el-form
          class="change-agent-pwd-form-submition"
          ref="updateRoleForm"
          :model="updateRoleForm"
        >
          <el-form-item label="Role">
            <el-select
              v-model="updateRoleForm.role_id"
              :popper-append-to-body="false"
            >
              <el-option
                class="form-input-optionsList"
                v-for="role in roleList"
                :key="role.id"
                :label="role.name[lang]"
                :value="role.id"
              >
              </el-option>
            </el-select>
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
        <div class="change-agent-pwd-button warning" @click="changeAgentRole">
          {{ $t("submit") }}
        </div>
      </div>
    </MiddleModal>
  </div>
</template>

<script>
export default {
  name: "Network",
  data() {
    return {
      lang: "",
      isAbleToUpdateProxyStatus: true,
      isAbleToUpdateProxyPwd: false,
      isAbleToCreateUser: false,
      /* filter */
      activeNetwork: "user",
      filterOptions: [
        {
          value: "op1",
          label: "Option 1",
        },
      ],
      selectedFilterOption: "",
      userID: "",
      userName: "",
      /* data */
      userResultCount: 0,
      userTable: [],
      /* table summary */
      summary: {
        pendingCommission: 0,
        availableCommission: 0,
        balance: 0,
      },
      curUserTableRow: null,
      /* action Modal */
      showActionModal: false,
      isMiddleModalShow: false,
      isChangePwdModalShow: false,
      isChangeRoleShow: false,
      /* Update Columns when columns changed */
      tableColumns: 15,
      currentPage: 1,

      updatePwdForm: {
        proxy_id: "",
        pwd: "",
        remark: "",
      },
      updateRoleForm: {
        proxy_id: "",
        role_id: "",
        remark: "",
      },
      roleList: [],
      downlineList: [],
    };
  },
  mounted() {
    var authToken = localStorage.getItem("authToken");
    this.lang = localStorage.getItem("selected_language") ?? "en";
    if (!authToken) {
      return false;
    }
    this.init();
    let roleAccess = localStorage.getItem("roleAccess");
    if (roleAccess) {
      const roleJson = JSON.parse(roleAccess);
      this.isAbleToCreateUser = roleJson.access && roleJson.access.Proxy_create;
      this.isAbleToUpdateProxyPwd =
        roleJson.access && roleJson.access.Proxy_updatePwd;
      // this.isAbleToUpdateProxyStatus =true;
      this.isAbleToUpdateProxyStatus =
        roleJson.access && roleJson.access.Proxy_updateStatus;
    }
  },
  methods: {
    routeToAddUser() {
      this.$router.push({ path: "/addAgentPlayer", query: { to: "agent" } });
    },
    init() {
      this.$api
        .requestByPost("/Proxy/trees", {
          page: this.currentPage,
          proxy_id: this.userID,
          username: this.userName,
          sort: "asc",
        })
        .then((result) => {
          if (result.status == true) {
            this.userResultCount = result.data.count;
            this.userTable = this.setHasChildren(result.data.list);
            if (result.data.statistic) {
              this.summary.pendingCommission =
                result.data.statistic.commission_pendings;
              this.summary.availableCommission =
                result.data.statistic.commissions;
              this.summary.balance = result.data.statistic.balances;
            }
            // this.userTable[0].commission = -50;
            // this.userTable[0].commission_pending = -50;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    load(tree, treeNode, resolve) {
      this.$api
        .requestByPost("/Proxy/trees", {
          page: this.currentPage,
          proxy_id: tree.id,
          sort: "asc",
        })
        .then((result) => {
          if (result.status == true) {
            let list = this.setHasChildren(result.data.list);
            setTimeout(() => {
              resolve(list);
            }, 1000);
            if (result.data.statistic) {
              this.summary.pendingCommission +=
                result.data.statistic.commission_pendings;
              this.summary.availableCommission +=
                result.data.statistic.commissions;
              this.summary.balance += result.data.statistic.balances;
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    setHasChildren(list) {
      let temp = list;
      list.forEach((v, index) => {
        if (v.direct_child_num > 0) {
          temp[index]["hasChildren"] = true;
        }
      });
      return temp;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index == 0) {
          sums[index] = this.$t("sum");
        } else if (column.property == "commission_pending") {
          sums[index] = this.summary.pendingCommission;
        } else if (column.property == "commission") {
          sums[index] = this.summary.availableCommission;
        } else if (column.property == "balance") {
          sums[index] = this.summary.balance;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    onSearch(v) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.userTable = [];
        this.currentPage = 1;
        this.init();
      }, 500);
    },
    onPageChange(v) {
      this.currentPage = v;
      this.init();
    },

    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },

    handleCurrentChange(row, col, cell, event) {
      /* TODO */

      if (col.index + 1 == this.tableColumns) {
        return false;
      }
      this.$router.push({ path: "/agent/" + row.id });
    },

    handleOpenActionModal(scope) {
      this.curUserTableRow = scope.row;
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
    handleChangeRoleModal() {
      this.isChangeRoleShow = true;
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
    closeChangeRoleModal() {
      this.isChangeRoleShow = false;
      this.resetUpdatePwdForm();
    },
    resetUpdatePwdForm() {
      this.updatePwdForm = {
        proxy_id: "",
        pwd: "",
        remark: "",
      };
    },
    getRoleList() {
      setTimeout(() => {
        this.updateRoleForm.role_id = this.curUserTableRow.role.id;
        this.$api
          .requestByPost("/Proxy/roles", { proxy_id: this.curUserTableRow.id })
          .then((result) => {
            if (result.status == true) {
              this.roleList = result.data;
              this.handleChangeRoleModal();
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
      }, 50);
    },
    changeAgentPwd() {
      this.updatePwdForm.proxy_id = this.curUserTableRow.id;
      this.$api
        .requestByPost("/Proxy/updatePwd", this.updatePwdForm)
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
    changeAgentRole() {
      this.updateRoleForm.proxy_id = this.curUserTableRow.id;
      this.$api
        .requestByPost("/Proxy/updateRole", this.updateRoleForm)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.closeChangeRoleModal();
            this.closeModal();
            this.init();
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
    blockAgent() {
      var id = this.curUserTableRow.id;
      this.$api
        .requestByPost("/Proxy/updateStatus", {
          proxy_id: id,
          status:
            this.curUserTableRow.account &&
            this.curUserTableRow.account.status == 0
              ? 1
              : 0,
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
            this.init();
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

    //handledonwline
    checkDownlineFromTable(scope) {
      this.userID = scope.row.id;
      this.downlineList.push(this.userID);
      this.init();
    },
    checkDownline(id, index) {
      this.userID = id;
      var length = this.downlineList.length;
      for (let i = length - 1; i > index; i--) this.downlineList.pop();
      this.init();
    },
    backToLastDownline() {
      this.downlineList.pop();
      var length = this.downlineList.length;
      if (length > 0) {
        this.userID = this.downlineList[length - 1];
      } else {
        this.userID = "";
      }
      this.init();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "../../assets/scss/pc/network.scss";
@import "../../assets/scss/mobile/network.scss";
</style>
