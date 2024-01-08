<template>
  <div class="transfer">
    <div class="transfer-header">
      <div class="transfer-header-wrap">
        <div class="header-transfer" @click="routeToDashboard">
          <img src="../assets/img/back.svg" />
          {{ $t("transfer.transfer_money") }}
        </div>
        <div class="header-transfer green" @click="transfer()">
          {{ $t("transfer.transfer") }}
        </div>
      </div>
    </div>
    <div class="transfer-body">
      <div class="transfer-title">{{ $t("deposit") }}</div>
      <div class="transfer-section">
        <div class="transfer-item">
          <div class="transfer-item-title">{{ $t("transfer.my_balance") }}</div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ myBalance }}
          </div>
        </div>
        <div class="transfer-item">
          <div class="transfer-item-title">
            {{ $t("transfer.my_lock_balance") }}
          </div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ myLockBalance }}
          </div>
        </div>
        <div class="transfer-item" v-if="transferTo == 'agent'">
          <div class="transfer-item-title">
            {{ $t("transfer.agent_balance") }}
          </div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ agentBalance }}
          </div>
        </div>
        <div class="transfer-item" v-else>
          <div class="transfer-item-title">
            {{ $t("transfer.player_balance") }}
          </div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ playerBalance }}
          </div>
        </div>
        <div class="transfer-item" v-if="transferTo == 'agent'">
          <div class="transfer-item-title">
            {{ $t("transfer.agent_lock_balance") }}
          </div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ agentLockBalance }}
          </div>
        </div>
        <div class="transfer-item" v-else>
          <div class="transfer-item-title">
            {{ $t("transfer.player_lock_balance") }}
          </div>
          <div class="transfer-item-amount numberFont">
            {{ currency }} {{ playerLockBalance }}
          </div>
        </div>
      </div>
      <div class="transfer-form">
        <el-form ref="form" :model="form">
          <div class="transfer-input" v-if="transferTo == 'agent'">
            <div class="input-title">{{ $t("transfer.agent") }}</div>
            <el-select
              @change="onAgentIdSelect"
              v-model="form.account"
              value-key="id"
              :placeholder="$t('transfer.agent_id')"
              :remote-method="onAgentChange"
              remote
              filterable
            >
              <!-- Todo: label change to username -->
              <el-option
                v-for="item in agentList"
                :key="item.id"
                :value="item"
                :label="
                  item.account && item.account.name
                    ? `${item.id}-${item.account.name}`
                    : item.id
                "
              ></el-option>
            </el-select>
          </div>
          <div class="transfer-input" v-else>
            <div class="input-title">{{ $t("transfer.player") }}</div>
            <el-select
              @change="onPlayerIdSelect"
              v-model="form.account"
              value-key="id"
              :placeholder="$t('transfer.player_id')"
              :remote-method="onPlayerChange"
              remote
              filterable
            >
              <!-- Todo: label change to username -->
              <el-option
                v-for="item in playerList"
                :key="item.id"
                :value="item"
                :label="item.name ? `${item.id}-${item.name}` : item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="transfer-input">
            <div class="input-title">{{ $t("transfer.amount") }}</div>
            <el-input v-model="form.amount" placeholder="0.00"></el-input>
          </div>
          <div class="transfer-input">
            <div class="input-title">
              {{ $t("transfer.reverse") }}
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('transfer.reverse_hints')"
                placement="right"
              >
                <i class="fa-solid fa-circle-question"></i>
              </el-tooltip>
            </div>
            <label class="switch">
              <input v-model="reverse" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="transfer-input">
            <el-input
              type="textarea"
              rows="8"
              :placeholder="$t('transfer.comment')"
              v-model="form.comment"
            ></el-input>
          </div>
        </el-form>
      </div>
      <div class="transfer-history">
        <div class="transfer-history-title">
          {{ $t("transfer_log.recent_tranfer_log") }}
        </div>
        <div class="transfer-log-request-table">
          <el-table :data="transferList" border style="width: 100%">
            <el-table-column
              prop="currency"
              :label="$t('transfer_log.currency')"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="account_id"
              :label="$t('transfer_log.user_id')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="account.name"
              :label="$t('transfer_log.username')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="sn"
              :label="$t('transfer_log.sn')"
              width="240"
            >
            </el-table-column>
            <el-table-column
              prop="money"
              :label="$t('transfer_log.money')"
              width="240"
            >
            </el-table-column>
            <el-table-column :label="$t('transfer_log.type')" width="100">
              <template slot-scope="scope">
                <p v-if="scope.row.type != null">
                  {{ scope.row.type == 1 ? $t("agents") : $t("player") }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              :formatter="convertDate"
              :label="$t('transfer_log.create_time')"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="remark"
              :label="$t('transfer_log.remark')"
              width="200"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transfer",
  data() {
    return {
      fundsLogListtemp: [
        {
          type: "Proxy transfer in",
          user_id: 100010009,
          currency: "PHP",
          balance: 100.57,
          related_key: "20221213113514363749906904",
          related_type: "transfer",
          create_time: 1670902514,
          remark: "test",
          increase: 100,
          decrease: 0,
        },
        {
          type: "Commission",
          user_id: 100010009,
          currency: "PHP",
          balance: 0.57,
          related_key: "100010009|0|1662307200",
          related_type: "proxy_currency_statistic_day",
          create_time: 1662341902,
          remark: "",
          increase: 0.57,
          decrease: 0,
        },
        {
          type: "Proxy transfer out",
          user_id: 100010009,
          currency: "PHP",
          balance: 0,
          related_key: "20220829173231201476001242",
          related_type: "transfer",
          create_time: 1661765551,
          remark: "test",
          increase: 0,
          decrease: 10000,
        },
        {
          type: "Deposit (Management)",
          user_id: 100010009,
          currency: "PHP",
          balance: 10000,
          related_key: "20220829173212534610001751",
          related_type: "user_deposit",
          create_time: 1661765532,
          remark: "test",
          increase: 10000,
          decrease: 0,
        },
      ],
      transferTo: "agent",
      currency: 0,
      myBalance: 0,
      myLockBalance: 0,
      agentBalance: 0,
      agentLockBalance: 0,
      playerBalance: 0,
      playerLockBalance: 0,
      form: {
        account: "",
        amount: "",
        comment: "",
      },
      agentList: [],
      playerList: [],
      playerName: "",
      agentName: "",
      myId: "",
      reverse: false,
      transferList: [],
    };
  },
  mounted() {
    this.init();
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      return false;
    }
    // if(id){
    //   this.
    // }
    this.getAccount();
    this.getTransferList();
  },
  methods: {
    init() {
      this.transferTo = this.$route.query.to;
    },
    routeToDashboard() {
      this.$router.back();
    },
    transfer() {
      if (this.reverse) this.transferFrom();
      else this.transferToAcc();
    },
    transferToAcc() {
      let form = {
        account_id: this.form.account.id,
        money: this.form.amount,
        remark: this.form.comment,
      };

      this.$api
        .requestByPost("/Transfer/submit", form)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            window.location.reload();
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
    transferFrom() {
      let form = {
        account_id: this.form.account.id,
        money: this.form.amount,
        remark: this.form.comment,
      };

      this.$api
        .requestByPost("/Transfer/reverse", form)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            window.location.reload();
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
    getAgentList() {
      this.$api
        .requestByPost("/Proxy/lists", { username: this.agentName })
        .then((result) => {
          if (result.status == true) {
            this.agentList = result.data.list;
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
    getPlayerList() {
      this.$api
        .requestByPost("/User/lists", {
          username: this.playerName,
        })
        .then((result) => {
          if (result.status == true) {
            this.playerList = result.data.list;
            let id = this.$route.query.id;
            if (id && id != "") {
              setTimeout(() => {
                this.form.account = this.playerList.find((obj) => obj.id == id);
                this.onPlayerIdSelect(this.form.account);
              }, 100);
            }
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
          this.$notiflix.Notify.failure(
            error ? error : this.$t("message.error"),
            {
              showOnlyTheLastOne: true,
            }
          );
        });
    },
    getAccount() {
      this.$api
        .requestByPost("/Account/get", {})
        .then((result) => {
          if (result.status == true) {
            this.myId = result.data.id;
            this.currency = result.data.currency.currency;
            this.myBalance = result.data.currency.balance;
            this.myLockBalance = result.data.currency.lock;
            this.getAgentList();
            this.getPlayerList();
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
    getTransferList() {
      let tempFilter = {
        page: 1,
        "page-size": 10,
        order: "time",
        sort: "desc",
      };

      this.$api
        .requestByPost("/Transfer/lists", tempFilter)
        .then((result) => {
          if (result.status == true) {
            if (result.data.list.length > 10) {
              let temp = result.data.list.slice(0, 10);
              this.transferList = temp;
            } else {
              this.transferList = result.data.list;
            }
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
    onAgentIdSelect(v) {
      this.$api
        .requestByPost("/Proxy/get", { proxy_id: v.id })
        .then((result) => {
          if (result.status == true) {
            this.agentBalance = result.data.currency.balance;
            this.agentLockBalance = result.data.currency.lock;
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
    onPlayerIdSelect(v) {
      this.$api
        .requestByPost("/User/get", { user_id: v.id })
        .then((result) => {
          if (result.status == true) {
            this.playerBalance = result.data.user_currency.balance;
            this.playerLockBalance = result.data.user_currency.lock;
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
    onPlayerChange(u) {
      this.playerName = u;
      this.getPlayerList();
    },
    onAgentChange(u) {
      this.agentName = u;
      this.getAgentList();
    },
    convertDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return (
        new Date(date * 1000).toLocaleDateString("en-GB") +
        " " +
        new Date(date * 1000).toLocaleTimeString("en-GB")
      );
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/transfer.scss";
@import "/assets/scss/mobile/transfer.scss";
</style>
