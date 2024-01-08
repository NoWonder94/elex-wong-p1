webpackJsonp([58],{

/***/ 1667:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1668);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("0c50a2bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-279d8ab8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-279d8ab8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1668:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-279d8ab8] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue__ = __webpack_require__(1670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ItemDetail: __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue___default.a
    },
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: [],
                game_id: '',
                keyword: '',
                ip: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataItem: {},
            dataSumTotal: 0,
            dialog: {
                visible: {
                    detail: false
                }
            }
        };
    },

    created: function created() {
        // 搜索关键词
        if (Boolean(this.$route.params.accountId)) {
            this.filterOption.keyword = this.$route.params.accountId;
        }
    },
    methods: {
        getColor: function getColor() {
            var that = this;
            this.dataList.forEach(function (data) {
                if (data.win_count > Math.floor(that.dataSumTotal * 1.15) && data.profitTime <= 50 && data.transferDiff > 350) {
                    document.getElementById("light-" + data.account_id).style.backgroundColor = "red";
                } else if (data.win_count > Math.floor(that.dataSumTotal * 1.1) && data.profitTime >= 50 && data.profitTime <= 70 && data.transferDiff > 0 && data.transferDiff < 500) {
                    document.getElementById("light-" + data.account_id).style.backgroundColor = "orange";
                } else if (data.win_count > Math.floor(that.dataSumTotal * 1.05) && data.profitTime >= 50 && data.profitTime <= 80 && data.transferDiff > 0 && data.transferDiff < 350) {
                    document.getElementById("light-" + data.account_id).style.backgroundColor = "yellow";
                }
                // else {
                //     document.getElementById("light-"+data.account_id).style.backgroundColor = "black";
                // }
            });
        },

        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            axios.get('/common/getGameList').then(function (response) {
                _this.gameList = response.data.resp_data;
            });
        },

        // 获取玩家账号自动补全
        querySearchAsync: function querySearchAsync(queryString, cb) {
            axios.get('/common/searchPlayer', {
                params: {
                    keyword: queryString
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    cb(response.data.resp_data);
                } else {
                    cb([]);
                }
            });
        },
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getDataList();
        },
        filterGameChange: function filterGameChange() {
            this.clearFilterOption();
            this.filterOption.scene_id = '';
            this.getDataList();
        },
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();

            if (scope.prop == 'total_bet') {
                this.filterOption.order = scope.order == 'ascending' ? 'total_bet_asc' : 'total_bet_desc';
            } else if (scope.prop == 'total_profit') {
                this.filterOption.order = scope.order == 'ascending' ? 'total_profit_asc' : 'total_profit_desc';
            } else if (scope.prop == 'total_bet_no') {
                this.filterOption.order = scope.order == 'ascending' ? 'total_bet_no_asc' : 'total_bet_no_desc';
            } else if (scope.prop == 'win_percentage') {
                this.filterOption.order = scope.order == 'ascending' ? 'win_percentage_asc' : 'win_percentage_desc';
            } else if (scope.prop == 'transfer_in') {
                this.filterOption.order = scope.order == 'ascending' ? 'transfer_in_asc' : 'transfer_in_desc';
            } else if (scope.prop == 'transfer_out') {
                this.filterOption.order = scope.order == 'ascending' ? 'transfer_out_asc' : 'transfer_out_desc';
            }

            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            var filterOptionCache = _.cloneDeep(this.filterOption);

            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = Math.floor(filterOptionCache.datetime[0] / 1000);
                filterOptionCache.datetime[1] = Math.floor(filterOptionCache.datetime[1] / 1000);
            }

            axios.get('/system/risk/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.loading = false;
                if (response.data.resp_msg.code == 200) {
                    _this2.dataCount = response.data.resp_data.count;
                    _this2.dataList = response.data.resp_data.data;
                    _this2.dataSumTotal = response.data.resp_data.sum_total;
                } else if (response.data.resp_msg.code == 43004) {
                    _this2.$message({
                        type: 'error',
                        message: _this2.$t('datePickerOptions.warning'),
                        showClose: true
                    });
                } else {
                    _this2.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                }
            });
        },
        showDialog: function showDialog(scope) {
            this.dataItem = scope.row;
            this.dialog.visible.detail = true;
        }
    },
    mounted: function mounted() {
        // 获取游戏列表
        this.getGameList();
        this.getDataList();
    },
    updated: function updated() {
        this.$nextTick(function () {
            if (this.dataList.length > 0) {
                this.getColor();
            }
        });
    }
});

/***/ }),

/***/ 1670:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1671)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1673)
/* template */
var __vue_template__ = __webpack_require__(1674)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8fa5dc3c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/system/setting/risk/ItemDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8fa5dc3c", Component.options)
  } else {
    hotAPI.reload("data-v-8fa5dc3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1671:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1672);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("1ba0e487", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8fa5dc3c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8fa5dc3c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1672:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "RiskDetail",
    props: ['visible', 'data', 'option'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            gameList: [],
            keywordTypeList: [{
                id: 1,
                name: this.$t('form.accountId')
            }, {
                id: 2,
                name: this.$t('form.roomId')
            }],
            loading: true,
            filterOption: {
                datetime: [],
                game_id: '',
                keyword: '',
                ip: '',
                page: 1,
                page_size: 10,
                order: 1
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataItem: {},
            dataSumTotal: {
                bet_base: 0,
                gain_gold: 0,
                income_gold: 0
            },
            dialog: {
                visible: {
                    detail: false
                }
            }
        };
    },

    methods: {
        getDataList: function getDataList(data) {
            var _this = this;

            this.recordLoading = true;
            this.filterOption.keyword = data.account_id;
            this.filterOption.datetime = this.option.datetime;
            this.filterOption.game_id = this.option.game_id;
            var filterOptionCache = _.cloneDeep(this.filterOption);

            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = Math.floor(filterOptionCache.datetime[0] / 1000);
                filterOptionCache.datetime[1] = Math.floor(filterOptionCache.datetime[1] / 1000);
            }

            axios.get('/system/risk/getDetail', {
                params: filterOptionCache
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.dataCount = response.data.resp_data.count;
                    _this.dataList = response.data.resp_data.data;
                    _this.dataSumTotal = response.data.resp_data.sum_total;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                }
            });
        },
        filterPageChange: function filterPageChange(page) {
            this.recordLoading = true;
            this.filterOption.page = page;
            this.getDataList(this.data);
        },
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 2 : 1;
            this.getDataList(this.data);
        }
    },
    watch: {
        visible: function visible(n, o) {
            // 初始化参数

            n && this.getDataList(this.data);
            // 变量赋值
            this.dialogVisible = n;

            this.clearFilterOption();
        }
    }
    // mounted() {
    //     console.log(this.option);
    //     console.log('a');
    // }
});

/***/ }),

/***/ 1674:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      staticClass: "dialog-playback",
      attrs: {
        title: _vm.$t("game.log.replayMahjong.title"),
        width: "1100px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          return _vm.$emit("update:visible", false)
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [{ name: "bar", rawName: "v-bar" }],
          staticClass: "vuebar-element"
        },
        [
          _c("div", [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.recordLoading,
                    expression: "recordLoading"
                  }
                ],
                staticClass: "detail-container"
              },
              [
                _c(
                  "el-table",
                  {
                    staticStyle: { width: "100%" },
                    attrs: {
                      data: _vm.dataList,
                      "default-sort": { prop: "id", order: "descending" }
                    },
                    on: { "sort-change": _vm.filterOrderChange }
                  },
                  [
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "150",
                        label: _vm.$t("system.setting.risk.table.date"),
                        prop: "id",
                        sortable: "custom",
                        "sort-orders": ["ascending", "descending"]
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm._f("morph-date")(
                                      new Date(scope.row.create_time * 1000),
                                      "YYYY-MM-DD HH:mm:ss"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.gameType")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.game_id
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.$t("games." + scope.row.game_id)
                                        ) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.roomId")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.source_id
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(scope.row.source_id) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.sceneType")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.cost_type
                                ? _c("span", [
                                    scope.row.cost_type == 1
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    转出\n                                "
                                          )
                                        ])
                                      : scope.row.cost_type == 2
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    转入\n                                "
                                          )
                                        ])
                                      : scope.row.cost_type == 3
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    游戏消耗\n                                "
                                          )
                                        ])
                                      : scope.row.cost_type == 4
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    抽水\n                                "
                                          )
                                        ])
                                      : _c("p", [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(scope.row.cost_type) +
                                              "\n                                "
                                          )
                                        ])
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.status")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.status
                                ? _c("span", [
                                    scope.row.status == 1
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    发起\n                                "
                                          )
                                        ])
                                      : scope.row.status == 2
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    成功\n                                "
                                          )
                                        ])
                                      : scope.row.status == 3
                                      ? _c("p", [
                                          _vm._v(
                                            "\n                                    失败\n                                "
                                          )
                                        ])
                                      : _c("p", [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(scope.row.status) +
                                              "\n                                "
                                          )
                                        ])
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.profit")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.gain_gold != null
                                ? _c("span", [
                                    _vm._v(
                                      "\n                               " +
                                        _vm._s(
                                          _vm._f("numeral")(
                                            scope.row.gain_gold,
                                            "0,0.[00]"
                                          )
                                        ) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.moneyStart")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.own_gold != null
                                ? _c("span", [
                                    _vm._v(
                                      "\n                               " +
                                        _vm._s(
                                          _vm._f("numeral")(
                                            scope.row.own_gold -
                                              scope.row.gain_gold,
                                            "0,0.[00]"
                                          )
                                        ) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.moneyEnd")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.own_gold != null
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm._f("numeral")(
                                            scope.row.own_gold,
                                            "0,0.[00]"
                                          )
                                        ) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.ipLogin")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.ip
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(scope.row.ip) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: {
                        "min-width": "100",
                        label: _vm.$t("system.setting.risk.table.device")
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.devices
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(scope.row.devices) +
                                        "\n                            "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(
                                      "\n                                --\n                            "
                                    )
                                  ])
                            ]
                          }
                        }
                      ])
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "pt-4 text-right" },
                  [
                    _c("el-pagination", {
                      attrs: {
                        background: "",
                        layout: "total, sizes, prev, pager, next, jumper",
                        "current-page": _vm.filterOption.page,
                        "page-size": _vm.filterOption.page_size,
                        total: _vm.dataCount.total
                      },
                      on: {
                        "update:pageSize": function($event) {
                          return _vm.$set(_vm.filterOption, "page_size", $event)
                        },
                        "update:page-size": function($event) {
                          return _vm.$set(_vm.filterOption, "page_size", $event)
                        },
                        "size-change": _vm.clearFilterOption,
                        "current-change": _vm.filterPageChange
                      }
                    })
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8fa5dc3c", module.exports)
  }
}

/***/ }),

/***/ 1675:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page-layout" },
    [
      _c("div", { staticClass: "page-layout-header" }, [
        _c("div", { staticClass: "header-main" }, [
          _c("div", { staticClass: "back" }, [
            _c(
              "a",
              {
                staticClass: "btn btn-light btn-sm",
                attrs: { href: "javascript:history.go(-1);" }
              },
              [
                _c("font-awesome-icon", { attrs: { icon: "chevron-left" } }),
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.$t("back")) +
                    "\n                "
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "title" }, [
            _vm._v(
              "\n                " +
                _vm._s(_vm.$t(_vm.$route.meta.title)) +
                "\n            "
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "option" })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "page-layout-body" }, [
        _c("div", { staticClass: "body-main" }, [
          _c(
            "div",
            {
              directives: [{ name: "bar", rawName: "v-bar" }],
              staticClass: "vuebar-element"
            },
            [
              _c("div", [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "loading",
                        rawName: "v-loading",
                        value: _vm.loading,
                        expression: "loading"
                      }
                    ],
                    staticClass: "page-content"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "page-filter-option mb-0" },
                      [
                        _c(
                          "el-form",
                          { attrs: { inline: true, model: _vm.filterOption } },
                          [
                            _c(
                              "el-form-item",
                              [
                                _c("el-date-picker", {
                                  attrs: {
                                    "value-format": "timestamp",
                                    type: "datetimerange",
                                    align: "left",
                                    "picker-options":
                                      _vm.GLOBAL.pickerOptionsLimit,
                                    "start-placeholder": _vm.$t(
                                      "system.setting.risk.placeholder.dateStart"
                                    ),
                                    "end-placeholder": _vm.$t(
                                      "system.setting.risk.placeholder.dateEnd"
                                    )
                                  },
                                  on: { change: _vm.filterChange },
                                  model: {
                                    value: _vm.filterOption.datetime,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.filterOption,
                                        "datetime",
                                        $$v
                                      )
                                    },
                                    expression: "filterOption.datetime"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "el-form-item",
                              { staticClass: "el-form-item-medium" },
                              [
                                _c(
                                  "el-select",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t(
                                        "system.setting.risk.placeholder.gameType"
                                      ),
                                      clearable: ""
                                    },
                                    on: { change: _vm.filterGameChange },
                                    model: {
                                      value: _vm.filterOption.game_id,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.filterOption,
                                          "game_id",
                                          $$v
                                        )
                                      },
                                      expression: "filterOption.game_id"
                                    }
                                  },
                                  _vm._l(_vm.gameList, function(item) {
                                    return _c("el-option", {
                                      key: item.id,
                                      attrs: {
                                        label: _vm.$t("games." + item.id),
                                        value: item.id
                                      }
                                    })
                                  }),
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "el-form-item",
                              [
                                _c(
                                  "el-input",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t(
                                        "system.setting.risk.placeholder.playerAccount"
                                      ),
                                      clearable: ""
                                    },
                                    model: {
                                      value: _vm.filterOption.keyword,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.filterOption,
                                          "keyword",
                                          $$v
                                        )
                                      },
                                      expression: "filterOption.keyword"
                                    }
                                  },
                                  [
                                    _c("el-button", {
                                      attrs: {
                                        slot: "append",
                                        icon: "el-icon-search"
                                      },
                                      on: { click: _vm.filterChange },
                                      slot: "append"
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "list-space" }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "page-container-inner pt-0" },
                      [
                        _c(
                          "el-table",
                          {
                            staticStyle: { width: "100%" },
                            attrs: {
                              data: _vm.dataList,
                              "default-sort": {
                                prop: "win_percentage",
                                order: "descending"
                              }
                            },
                            on: { "sort-change": _vm.filterOrderChange }
                          },
                          [
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "40",
                                label: _vm.$t("system.setting.risk.table.light")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("div", {
                                        staticStyle: {
                                          height: "30px",
                                          width: "30px"
                                        },
                                        attrs: {
                                          id: "light-" + scope.row.account_id
                                        }
                                      })
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.playerAccount"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(scope.row.account_id) +
                                          "\n                                    "
                                      )
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.totalBet"
                                ),
                                prop: "total_bet",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.bet_gold
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.bet_gold,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.totalProfit"
                                ),
                                prop: "total_profit",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.gain_gold
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.gain_gold,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.noBet"
                                ),
                                prop: "total_bet_no",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.bet_count
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.bet_count,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.winPercentage"
                                ),
                                prop: "win_percentage",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.win_count >= 0
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.win_count,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "%\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "90",
                                label: _vm.$t(
                                  "system.setting.risk.table.totalTransferIn"
                                ),
                                prop: "transfer_in",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.deposits
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.deposits,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "90",
                                label: _vm.$t(
                                  "system.setting.risk.table.totalTransferOut"
                                ),
                                prop: "transfer_out",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.withdraws
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.withdraws,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "80",
                                label: _vm.$t(
                                  "system.setting.risk.table.transferDiff"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.transferDiff
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.transferDiff,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            0\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "80",
                                label: _vm.$t(
                                  "system.setting.risk.table.profitTime"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.profitTime
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(scope.row.profitTime) +
                                                "s\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            0\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.profitDiff"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.averageRev
                                        ? _c("span", [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    scope.row.averageRev,
                                                    "0,0.[00]"
                                                  )
                                                ) +
                                                "\n                                        "
                                            )
                                          ])
                                        : _c("span", [
                                            _vm._v(
                                              "\n                                            --\n                                        "
                                            )
                                          ])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.ipLogin"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(scope.row.ip) +
                                          "\n                                    "
                                      )
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "system.setting.risk.table.action"
                                )
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c(
                                        "el-button",
                                        {
                                          attrs: { size: "mini" },
                                          on: {
                                            click: function($event) {
                                              return _vm.showDialog(scope)
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm.$t(
                                                  "system.setting.risk.table.actionDetail"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      )
                                    ]
                                  }
                                }
                              ])
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "pt-4 text-right" },
                          [
                            _c("el-pagination", {
                              attrs: {
                                background: "",
                                layout:
                                  "total, sizes, prev, pager, next, jumper",
                                "current-page": _vm.filterOption.page,
                                "page-size": _vm.filterOption.page_size,
                                total: _vm.dataCount.total
                              },
                              on: {
                                "update:pageSize": function($event) {
                                  return _vm.$set(
                                    _vm.filterOption,
                                    "page_size",
                                    $event
                                  )
                                },
                                "update:page-size": function($event) {
                                  return _vm.$set(
                                    _vm.filterOption,
                                    "page_size",
                                    $event
                                  )
                                },
                                "size-change": _vm.filterChange,
                                "current-change": _vm.filterPageChange
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                )
              ])
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("item-detail", {
        attrs: {
          visible: _vm.dialog.visible.detail,
          data: _vm.dataItem,
          option: _vm.filterOption
        },
        on: {
          "update:visible": function($event) {
            return _vm.$set(_vm.dialog.visible, "detail", $event)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-279d8ab8", module.exports)
  }
}

/***/ }),

/***/ 567:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(567)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1667)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1669)
/* template */
var __vue_template__ = __webpack_require__(1675)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-279d8ab8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/system/setting/risk/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-279d8ab8", Component.options)
  } else {
    hotAPI.reload("data-v-279d8ab8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});