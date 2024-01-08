webpackJsonp([57],{

/***/ 1422:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1423);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("26ce306a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c3a736c4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c3a736c4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.detail-container[data-v-c3a736c4] label {\n  color: #909399;\n}\n.detail-container[data-v-c3a736c4] .el-form-item {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue__ = __webpack_require__(1425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue__ = __webpack_require__(1430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ItemDetail: __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue___default.a,
        ItemUpdate: __WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue___default.a
    },
    data: function data() {
        return {
            loading: true,
            filterOption: {
                game_id: '',
                role: '',
                access: '',
                create_time: '',
                login_time: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 4
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataSumTotal: 0,
            dataDetail: {},
            itemCache: {},
            itemCacheIndex: null,
            dialog: {
                visible: {
                    detail: false,
                    update: false
                }
            }
        };
    },

    methods: {
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
        initUserList: function initUserList() {
            // 初始化筛选参数
            this.filterOption.role = '';
            this.filterOption.keyword = '';
            this.filterOption.order = 4;
            // 初始化数据
            this.dataCount.total = 0;
            this.dataList = [];
            // 获取数据
            this.clearFilterOption();
            this.getUserList();
        },
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getUserList();
        },
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getUserList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();

            if (scope.prop == 'id') {
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            } else if (scope.prop == 'create_time') {
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            } else if (scope.prop == 'login_time') {
                this.filterOption.order = scope.order == 'ascending' ? 3 : 4;
            } else if (scope.prop == 'income_gold') {
                this.filterOption.order = scope.order == 'ascending' ? 5 : 6;
            }
            this.getUserList();
        },
        getUserList: function getUserList() {
            var _this = this;

            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.create_time)) {
                filterOptionCache.create_time[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.create_time[0]);
                filterOptionCache.create_time[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.create_time[1]);
            }
            if (!_.isEmpty(filterOptionCache.login_time)) {
                filterOptionCache.login_time[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.login_time[0]);
                filterOptionCache.login_time[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.login_time[1]);
            }
            axios.get('/app/user/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.dataList = response.data.resp_data.data;
                _this.dataSumTotal = response.data.resp_data.sum_total;
                _this.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----'];
            sums[1] = this.$options.filters.numeral(this.dataSumTotal, '0,0.[0000]');
            return sums;
        },
        dialogPlayerDetail: function dialogPlayerDetail(scope) {
            // 详情数据
            this.dataDetail = scope.row;
            // 显示模态框
            this.dialog.visible.detail = true;
        },

        // 显示模态框（编辑）
        dialogItemUpdate: function dialogItemUpdate(scope) {
            // 缓存数据
            this.itemCache = scope.row;
            // 缓存数据
            this.itemCacheIndex = scope.$index;
            // 显示模态框
            this.dialog.visible.update = true;
        },

        // 同步数据到列表
        syncUpdateData: function syncUpdateData(data) {
            this.dataList[this.itemCacheIndex].role = data.role;
            this.dataList[this.itemCacheIndex].access = data.access;
        }
    }
});

/***/ }),

/***/ 1425:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1426)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1428)
/* template */
var __vue_template__ = __webpack_require__(1429)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a741d7b0"
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
Component.options.__file = "resources/assets/js/pages/game/user/ItemDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a741d7b0", Component.options)
  } else {
    hotAPI.reload("data-v-a741d7b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1426:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1427);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("fe6fc9d8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a741d7b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a741d7b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1427:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n[data-v-a741d7b0] .el-dialog__body {\n  padding: 0;\n  overflow: auto;\n  height: 700px;\n}\n.detail-container[data-v-a741d7b0] {\n  padding: 15px 20px 30px;\n}\n.detail-container[data-v-a741d7b0] label {\n  color: #909399;\n}\n.detail-container[data-v-a741d7b0] .el-form-item {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n.more-container + .more-container[data-v-a741d7b0] {\n  margin-top: 40px;\n}\n.more-container-title[data-v-a741d7b0] {\n  margin-bottom: 20px;\n  border-bottom: 1px solid #EBEEF5;\n  padding-bottom: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  color: #303133;\n  font-size: 1rem;\n}\n", ""]);

// exports


/***/ }),

/***/ 1428:
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
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemDetail",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            dataDetail: {},
            playerLoginStatus: 'dle',
            playerLogin: [],
            playerLoginList: [],
            playerOrderStatus: 'dle',
            playerOrder: [],
            playerOrderList: [],
            playerGameStatus: 'dle',
            playerGame: [],
            playerGameList: []
        };
    },

    watch: {
        visible: function visible(n, o) {
            // 初始化参数
            n && this.initData(this.data);
            // 变量赋值
            this.dialogVisible = n;
        }
    },
    methods: {
        initData: function initData(data) {
            this.dataDetail = _.cloneDeep(data);
            // 缓存key
            var key = data.id;
            // 登录记录
            if (this.playerLoginList[key]) {
                this.playerLogin = this.playerLoginList[key];
                this.playerLoginStatus = !this.playerLogin.length ? 'nodata' : 'dle';
            } else {
                this.getLoginList(key, data);
            }
            // 玩家订单
            if (this.playerOrderList[key]) {
                this.playerOrder = this.playerOrderList[key];
                this.playerOrderStatus = !this.playerOrder.length ? 'nodata' : 'dle';
            } else {
                this.getOrderList(key, data);
            }
            // 游戏记录
            if (this.playerGameList[key]) {
                this.playerGame = this.playerGameList[key];
                this.playerGameStatus = !this.playerGame.length ? 'nodata' : 'dle';
            } else {
                this.getGameList(key, data);
            }
        },

        // 获取登录记录
        getLoginList: function getLoginList(key, data) {
            var _this = this;

            this.playerLoginStatus = 'loading';
            axios.get('/app/login-log/getList', {
                params: {
                    keyword: data.account_id,
                    page: 1,
                    page_size: 10,
                    order: 2
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.playerLoginList[key] = response.data.resp_data.data;
                    _this.playerLogin = response.data.resp_data.data;
                    _this.playerLoginStatus = !_this.playerLogin.length ? 'nodata' : 'dle';
                } else {
                    _this.playerLoginStatus = 'error';
                }
            });
        },

        // 获取玩家订单
        getOrderList: function getOrderList(key, data) {
            var _this2 = this;

            this.playerOrderStatus = 'loading';
            axios.get('/order/game/getList', {
                params: {
                    keyword: data.account_id,
                    page: 1,
                    page_size: 10,
                    order: 2
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this2.playerOrderList[key] = response.data.resp_data.data;
                    _this2.playerOrder = response.data.resp_data.data;
                    _this2.playerOrderStatus = !_this2.playerOrder.length ? 'nodata' : 'dle';
                } else {
                    _this2.playerOrderStatus = 'error';
                }
            });
        },

        // 获取游戏记录
        getGameList: function getGameList(key, data) {
            var _this3 = this;

            this.playerGameStatus = 'loading';
            axios.get('/app/log/getList', {
                params: {
                    keyword: data.account_id,
                    keyword_type: 1,
                    page: 1,
                    page_size: 10,
                    order: 2
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this3.playerGameList[key] = response.data.resp_data.data;
                    _this3.playerGame = response.data.resp_data.data;
                    _this3.playerGameStatus = !_this3.playerGame.length ? 'nodata' : 'dle';
                } else {
                    _this3.playerGameStatus = 'error';
                }
            });
        }
    }
});

/***/ }),

/***/ 1429:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      staticClass: "dialog-bills",
      attrs: {
        title: _vm.$t("game.user.dialog.title"),
        width: "960px",
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
            _c("div", { staticClass: "detail-container" }, [
              _c(
                "div",
                { staticClass: "more-container" },
                [
                  _c("div", { staticClass: "more-container-title" }, [
                    _vm._v(_vm._s(_vm.$t("game.user.dialog.info")))
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    [
                      _c(
                        "el-col",
                        { attrs: { span: 12 } },
                        [
                          _c(
                            "el-form",
                            { attrs: { "label-width": "100px" } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.accountId")
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.dataDetail.account_id))
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.coinsHave")
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("numeral")(
                                          _vm.dataDetail.gold,
                                          "0,0.[0000]"
                                        )
                                      )
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.gainGold")
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.dataDetail.income_gold > 0
                                          ? "+"
                                          : ""
                                      ) +
                                        _vm._s(
                                          _vm._f("numeral")(
                                            _vm.dataDetail.income_gold,
                                            "0,0.[0000]"
                                          )
                                        )
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t(
                                      "game.user.thLable.loginCount"
                                    )
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.dataDetail.login_count))
                                  ])
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 12 } },
                        [
                          _c(
                            "el-form",
                            { attrs: { "label-width": "100px" } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.createIp")
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.dataDetail.create_ip))
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t(
                                      "game.user.thLable.createTime"
                                    )
                                  }
                                },
                                [
                                  _vm.dataDetail.create_time
                                    ? _c(
                                        "span",
                                        [
                                          _c("component-page-timestamp", {
                                            attrs: {
                                              timestamp:
                                                _vm.dataDetail.create_time
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _c("span", [_vm._v("----")])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.loginIp")
                                  }
                                },
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.dataDetail.login_ip))
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: _vm.$t("game.user.thLable.loginTime")
                                  }
                                },
                                [
                                  _vm.dataDetail.login_time
                                    ? _c(
                                        "span",
                                        [
                                          _c("component-page-timestamp", {
                                            attrs: {
                                              timestamp:
                                                _vm.dataDetail.login_time
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _c("span", [_vm._v("----")])
                                ]
                              )
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
              _c(
                "div",
                { staticClass: "more-container" },
                [
                  _c(
                    "div",
                    { staticClass: "more-container-title" },
                    [
                      _vm._v(
                        _vm._s(_vm.$t("game.user.dialog.login-log")) +
                          "\n                        "
                      ),
                      _c(
                        "router-link",
                        {
                          attrs: {
                            to: {
                              name: "game.login-log.account",
                              params: { accountId: _vm.dataDetail.account_id }
                            },
                            target: "_blank"
                          }
                        },
                        [
                          _c("small", [
                            _vm._v(_vm._s(_vm.$t("action.more"))),
                            _c("i", { staticClass: "el-icon-d-arrow-right" })
                          ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("component-page-loading", {
                    attrs: { status: _vm.playerLoginStatus },
                    on: { reload: _vm.getLoginList }
                  }),
                  _vm._v(" "),
                  _vm.playerLoginStatus == "dle" && _vm.playerLogin.length
                    ? _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.playerLogin }
                        },
                        [
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "170",
                              label: _vm.$t("game.user.thLable.time")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-timestamp", {
                                        attrs: {
                                          timestamp: scope.row.create_time
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              93907835
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "160",
                              label: _vm.$t("game.user.thLable.gameId")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          scope.row.game_id > 0
                                            ? scope.row.game_name
                                            : _vm.$t("gameLobby")
                                        )
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              398049881
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "170",
                              label: _vm.$t("game.user.thLable.address"),
                              "show-overflow-tooltip": ""
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(scope.row.country) +
                                          " " +
                                          _vm._s(scope.row.province) +
                                          " " +
                                          _vm._s(scope.row.city)
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              3434673992
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "120",
                              label: _vm.$t("game.user.thLable.ip"),
                              prop: "ip"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.devices"),
                              prop: "devices"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.browser"),
                              prop: "browser"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "more-container" },
                [
                  _c(
                    "div",
                    { staticClass: "more-container-title" },
                    [
                      _vm._v(
                        _vm._s(_vm.$t("game.user.dialog.order-log")) +
                          "\n                        "
                      ),
                      _c(
                        "router-link",
                        {
                          attrs: {
                            to: {
                              name: "order.game.account",
                              params: { accountId: _vm.dataDetail.account_id }
                            },
                            target: "_blank"
                          }
                        },
                        [
                          _c("small", [
                            _vm._v(_vm._s(_vm.$t("action.more"))),
                            _c("i", { staticClass: "el-icon-d-arrow-right" })
                          ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("component-page-loading", {
                    attrs: { status: _vm.playerOrderStatus },
                    on: { reload: _vm.getOrderList }
                  }),
                  _vm._v(" "),
                  _vm.playerOrderStatus == "dle" && _vm.playerOrder.length
                    ? _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.playerOrder }
                        },
                        [
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "160",
                              label: _vm.$t("game.user.thLable.time")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-timestamp", {
                                        attrs: { timestamp: scope.row.created }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              3459467445
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "90",
                              label: _vm.$t("game.user.thLable.type")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.type == 1
                                        ? _c(
                                            "el-tag",
                                            { attrs: { size: "medium" } },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.transferTypes[0].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.type == 2
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "warning"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.transferTypes[1].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              579137861
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "90",
                              label: _vm.$t("game.user.thLable.amount")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          scope.row.type == 1 ? "+" : "-"
                                        ) +
                                          _vm._s(
                                            _vm._f("numeral")(
                                              scope.row.amount,
                                              "0,0.[0000]"
                                            )
                                          )
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              3566733568
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "90",
                              label: _vm.$t("game.user.thLable.status")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.status == 1
                                        ? _c(
                                            "el-tag",
                                            { attrs: { size: "medium" } },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.gameOrderStatusList[0].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.status == 2
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "success"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.gameOrderStatusList[1].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.status == 3 &&
                                          !Boolean(scope.row.error_cause)
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "danger"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.gameOrderStatusList[2].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.status == 3 &&
                                          Boolean(scope.row.error_cause)
                                        ? _c(
                                            "el-tooltip",
                                            {
                                              attrs: {
                                                placement: "top",
                                                content: scope.row.error_cause
                                              }
                                            },
                                            [
                                              _c(
                                                "el-tag",
                                                {
                                                  attrs: {
                                                    size: "medium",
                                                    type: "danger"
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t(
                                                        "form.gameOrderStatusList[2].label"
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              1143942625
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "160",
                              label: _vm.$t("game.user.thLable.sn"),
                              prop: "sn"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "more-container" },
                [
                  _c(
                    "div",
                    { staticClass: "more-container-title" },
                    [
                      _vm._v(
                        _vm._s(_vm.$t("game.user.dialog.game-log")) +
                          "\n                        "
                      ),
                      _c(
                        "router-link",
                        {
                          attrs: {
                            to: {
                              name: "game.log.account",
                              params: { accountId: _vm.dataDetail.account_id }
                            },
                            target: "_blank"
                          }
                        },
                        [
                          _c("small", [
                            _vm._v(_vm._s(_vm.$t("action.more"))),
                            _c("i", { staticClass: "el-icon-d-arrow-right" })
                          ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("component-page-loading", {
                    attrs: { status: _vm.playerGameStatus },
                    on: { reload: _vm.getGameList }
                  }),
                  _vm._v(" "),
                  _vm.playerGameStatus == "dle" && _vm.playerGame.length
                    ? _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.playerGame }
                        },
                        [
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "170",
                              label: _vm.$t("game.user.thLable.time")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-timestamp", {
                                        attrs: {
                                          timestamp: scope.row.create_time
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              93907835
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "160",
                              label: _vm.$t("game.user.thLable.gameId")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(
                                            _vm.$t("games." + scope.row.game_id)
                                          ) +
                                          "\n                            "
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              4158595752
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.roomId"),
                              prop: "room_id"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.sceneId")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-game-scenes", {
                                        attrs: {
                                          "game-id": scope.row.game_id,
                                          "scenes-id": scope.row.scene_id
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              2586043102
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "70",
                              label: _vm.$t("game.user.thLable.betBase"),
                              prop: "bet_base"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.gainGold")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          scope.row.gain_gold > 0 ? "+" : ""
                                        ) +
                                          _vm._s(
                                            _vm._f("numeral")(
                                              scope.row.gain_gold,
                                              "0,0.[0000]"
                                            )
                                          )
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              3548534118
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t(
                                "game.user.thLable.platformCommission"
                              )
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          scope.row.income_gold > 0 ? "+" : ""
                                        ) +
                                          _vm._s(
                                            _vm._f("numeral")(
                                              scope.row.income_gold,
                                              "0,0.[0000]"
                                            )
                                          ) +
                                          "\n                            "
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              1305417727
                            )
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              "min-width": "100",
                              label: _vm.$t("game.user.thLable.ownGold")
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("numeral")(
                                            scope.row.own_gold,
                                            "0,0.[0000]"
                                          )
                                        )
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              2737004233
                            )
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ])
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
    require("vue-hot-reload-api")      .rerender("data-v-a741d7b0", module.exports)
  }
}

/***/ }),

/***/ 1430:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1431)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1433)
/* template */
var __vue_template__ = __webpack_require__(1434)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4eff8ec0"
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
Component.options.__file = "resources/assets/js/pages/game/user/ItemUpdate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4eff8ec0", Component.options)
  } else {
    hotAPI.reload("data-v-4eff8ec0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1431:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1432);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("436e3858", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4eff8ec0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemUpdate.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4eff8ec0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemUpdate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1433:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemUpdate",
    props: ['visible', 'data'],
    data: function data() {
        return {
            playerRoleList: [{
                label: this.$t('form.playerRoleList[0].label'),
                value: 1
            }, {
                label: this.$t('form.playerRoleList[1].label'),
                value: 2
            }],
            playerAccessList: [{
                label: this.$t('form.playerAccessList[0].label'),
                value: 1
            }, {
                label: this.$t('form.playerAccessList[1].label'),
                value: 2
            }],
            dialogVisible: false,
            dataCache: {
                operator_id: null,
                account_id: null,
                role: null,
                access: null,
                isKick: 0
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    watch: {
        visible: function visible(n, o) {
            // 初始化参数
            n && this.initData(this.data);
            // 变量赋值
            this.dialogVisible = n;
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        initData: function initData(data) {
            this.initMsg();
            this.dataCache.operator_id = data.operator_id;
            this.dataCache.account_id = data.account_id;
            this.dataCache.role = data.role;
            this.dataCache.access = data.access;
            this.dataCache.isKick = 0;
        },
        onSubmit: function onSubmit() {
            var _this = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/app/user/save', this.dataCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: _this.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    _this.dialogVisible = false;
                    // 同步数据到父组件
                    _this.$emit('update', _this.dataCache);
                } else {
                    _this.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1434:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("game.user.dialogUpdate.title"),
        width: "440px",
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
        { staticClass: "pr-5" },
        [
          _c(
            "el-form",
            { attrs: { model: _vm.dataCache, "label-width": "80px" } },
            [
              _c(
                "el-form-item",
                {
                  attrs: { label: _vm.$t("game.user.dialogUpdate.accountId") }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.dataCache.account_id) +
                      "\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: _vm.$t("game.user.dialogUpdate.role"),
                    error: Boolean(_vm.msg.errors["role"])
                      ? _vm.msg.errors["role"][0]
                      : ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dataCache.role,
                        callback: function($$v) {
                          _vm.$set(_vm.dataCache, "role", $$v)
                        },
                        expression: "dataCache.role"
                      }
                    },
                    _vm._l(_vm.playerRoleList, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
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
                {
                  attrs: {
                    label: _vm.$t("game.user.dialogUpdate.access"),
                    error: Boolean(_vm.msg.errors["access"])
                      ? _vm.msg.errors["access"][0]
                      : ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dataCache.access,
                        callback: function($$v) {
                          _vm.$set(_vm.dataCache, "access", $$v)
                        },
                        expression: "dataCache.access"
                      }
                    },
                    _vm._l(_vm.playerAccessList, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _vm.dataCache.access == 2
                    ? _c(
                        "el-checkbox",
                        {
                          attrs: { "false-label": "0", "true-label": "1" },
                          model: {
                            value: _vm.dataCache.isKick,
                            callback: function($$v) {
                              _vm.$set(_vm.dataCache, "isKick", $$v)
                            },
                            expression: "dataCache.isKick"
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("game.user.dialogUpdate.isKick"))
                          )
                        ]
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
                    [_vm._v(_vm._s(_vm.$t("action.save")))]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogVisible = false
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.$t("action.cancel")))]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
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
    require("vue-hot-reload-api")      .rerender("data-v-4eff8ec0", module.exports)
  }
}

/***/ }),

/***/ 1435:
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
            _vm._v(_vm._s(_vm.$t(_vm.$route.meta.title)))
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
                                    "value-format": "yyyy-MM-dd HH:mm:ss",
                                    type: "datetimerange",
                                    align: "left",
                                    "picker-options": _vm.GLOBAL.pickerOptions,
                                    "start-placeholder": _vm.$t(
                                      "form.loginStartDate"
                                    ),
                                    "end-placeholder": _vm.$t(
                                      "form.loginEndDate"
                                    )
                                  },
                                  on: { change: _vm.filterChange },
                                  model: {
                                    value: _vm.filterOption.login_time,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.filterOption,
                                        "login_time",
                                        $$v
                                      )
                                    },
                                    expression: "filterOption.login_time"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "el-form-item",
                              [
                                _c("el-date-picker", {
                                  attrs: {
                                    "value-format": "yyyy-MM-dd HH:mm:ss",
                                    type: "datetimerange",
                                    align: "left",
                                    "picker-options": _vm.GLOBAL.pickerOptions,
                                    "start-placeholder": _vm.$t(
                                      "form.regStartDate"
                                    ),
                                    "end-placeholder": _vm.$t("form.regEndDate")
                                  },
                                  on: { change: _vm.filterChange },
                                  model: {
                                    value: _vm.filterOption.create_time,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.filterOption,
                                        "create_time",
                                        $$v
                                      )
                                    },
                                    expression: "filterOption.create_time"
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
                                      placeholder: _vm.$t("form.playerRole"),
                                      clearable: ""
                                    },
                                    on: { change: _vm.filterChange },
                                    model: {
                                      value: _vm.filterOption.role,
                                      callback: function($$v) {
                                        _vm.$set(_vm.filterOption, "role", $$v)
                                      },
                                      expression: "filterOption.role"
                                    }
                                  },
                                  _vm._l(
                                    _vm.$t("form.playerRoleList"),
                                    function(item, index) {
                                      return _c("el-option", {
                                        key: index,
                                        attrs: {
                                          label: item.label,
                                          value: item.value
                                        }
                                      })
                                    }
                                  ),
                                  1
                                )
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
                                      placeholder: _vm.$t("form.playerAccess"),
                                      clearable: ""
                                    },
                                    on: { change: _vm.filterChange },
                                    model: {
                                      value: _vm.filterOption.access,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.filterOption,
                                          "access",
                                          $$v
                                        )
                                      },
                                      expression: "filterOption.access"
                                    }
                                  },
                                  _vm._l(
                                    _vm.$t("form.playerAccessList"),
                                    function(item, index) {
                                      return _c("el-option", {
                                        key: index,
                                        attrs: {
                                          label: item.label,
                                          value: item.value
                                        }
                                      })
                                    }
                                  ),
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
                                  "el-autocomplete",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t("form.accountId"),
                                      "fetch-suggestions": _vm.querySearchAsync,
                                      clearable: ""
                                    },
                                    on: { select: _vm.filterChange },
                                    scopedSlots: _vm._u([
                                      {
                                        key: "default",
                                        fn: function(ref) {
                                          var item = ref.item
                                          return [
                                            _c("div", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  _vm.$options.filters.hsFilterKeyword(
                                                    item.value,
                                                    _vm.filterOption.keyword
                                                  )
                                                )
                                              }
                                            })
                                          ]
                                        }
                                      }
                                    ]),
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
                                    _vm._v(" "),
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
                                prop: "login_time",
                                order: "descending"
                              },
                              "summary-method": _vm.getSummaries,
                              "show-summary": ""
                            },
                            on: { "sort-change": _vm.filterOrderChange }
                          },
                          [
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t("game.user.thLable.accountId"),
                                "show-overflow-tooltip": ""
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(
                                            _vm.$options.filters.hsFilterKeyword(
                                              scope.row.account_id,
                                              _vm.filterOption.keyword
                                            )
                                          )
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
                                "min-width": "120",
                                label: _vm.$t("game.user.thLable.coinsHave")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("numeral")(
                                            scope.row.gold,
                                            "0,0.[0000]"
                                          )
                                        )
                                      )
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "120",
                                label: _vm.$t("game.user.thLable.gainGold"),
                                prop: "income_gold",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _vm._v(
                                        _vm._s(
                                          scope.row.income_gold > 0 ? "+" : ""
                                        ) +
                                          _vm._s(
                                            _vm._f("numeral")(
                                              scope.row.income_gold,
                                              "0,0.[0000]"
                                            )
                                          )
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
                                label: _vm.$t("game.user.thLable.role")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.role == 1
                                        ? _c(
                                            "el-tag",
                                            { attrs: { size: "medium" } },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.playerRoleList[0].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.role == 2
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "warning"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.playerRoleList[1].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : _c("span", [_vm._v("----")])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t("game.user.thLable.access")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.access == 1
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "success"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.playerAccessList[0].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.access == 2
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "danger"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.playerAccessList[1].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : _c("span", [_vm._v("----")])
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "170",
                                label: _vm.$t("game.user.thLable.loginTime"),
                                prop: "login_time",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-timestamp", {
                                        attrs: {
                                          timestamp: scope.row.login_time
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
                                "min-width": "170",
                                label: _vm.$t("game.user.thLable.createTime"),
                                prop: "create_time",
                                sortable: "custom",
                                "sort-orders": ["ascending", "descending"]
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c("component-page-timestamp", {
                                        attrs: {
                                          timestamp: scope.row.create_time
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
                                "min-width": "170",
                                label: _vm.$t("game.user.thLable.detail")
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
                                              return _vm.dialogItemUpdate(scope)
                                            }
                                          }
                                        },
                                        [_vm._v(_vm._s(_vm.$t("action.edit")))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-button",
                                        {
                                          attrs: { size: "mini" },
                                          on: {
                                            click: function($event) {
                                              return _vm.dialogPlayerDetail(
                                                scope
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "game.user.checkMoreDetails"
                                              )
                                            )
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
        attrs: { visible: _vm.dialog.visible.detail, data: _vm.dataDetail },
        on: {
          "update:visible": function($event) {
            return _vm.$set(_vm.dialog.visible, "detail", $event)
          }
        }
      }),
      _vm._v(" "),
      _c("item-update", {
        attrs: { visible: _vm.dialog.visible.update, data: _vm.itemCache },
        on: {
          "update:visible": function($event) {
            return _vm.$set(_vm.dialog.visible, "update", $event)
          },
          update: _vm.syncUpdateData
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
    require("vue-hot-reload-api")      .rerender("data-v-c3a736c4", module.exports)
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

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1422)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1424)
/* template */
var __vue_template__ = __webpack_require__(1435)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c3a736c4"
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
Component.options.__file = "resources/assets/js/pages/game/user/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c3a736c4", Component.options)
  } else {
    hotAPI.reload("data-v-c3a736c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});