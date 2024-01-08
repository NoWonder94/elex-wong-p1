webpackJsonp([55],{

/***/ 1499:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1500);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("4e5f08bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f7e2a34\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f7e2a34\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1500:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.game-container[data-v-7f7e2a34] {\n    padding: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bet_hour_Index_vue__ = __webpack_require__(1502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bet_hour_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bet_hour_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bet_day_Index_vue__ = __webpack_require__(1507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bet_day_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__bet_day_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bet_month_Index_vue__ = __webpack_require__(1512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bet_month_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__bet_month_Index_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        BetHour: __WEBPACK_IMPORTED_MODULE_0__bet_hour_Index_vue___default.a,
        BetDay: __WEBPACK_IMPORTED_MODULE_1__bet_day_Index_vue___default.a,
        BetMonth: __WEBPACK_IMPORTED_MODULE_2__bet_month_Index_vue___default.a
    },
    data: function data() {
        return {
            activeName: 'name'
        };
    },
    mounted: function mounted() {
        // 初始化选中选项卡
        this.$nextTick(function () {
            this.activeName = 'bet-hour';
        });
    }
});

/***/ }),

/***/ 1502:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1503)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1505)
/* template */
var __vue_template__ = __webpack_require__(1506)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1c2aa81e"
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
Component.options.__file = "resources/assets/js/pages/game/player/bet-hour/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c2aa81e", Component.options)
  } else {
    hotAPI.reload("data-v-1c2aa81e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1504);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("01d02a30", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c2aa81e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c2aa81e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-1c2aa81e] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1505:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BetHour",
    props: ['activeName'],
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: [],
                org_id: '',
                game_id: '',
                scene_id: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 2
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
            }
        };
    },

    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取游戏列表
                this.getGameList();
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'bet-hour') {
                return false;
            }
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
        filterOrgChange: function filterOrgChange(org) {
            this.loading = true;
            this.filterOption.org_id = Boolean(org) ? org.id : '';
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'bet-hour') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/player/bet-hour/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.dataSumTotal = response.data.resp_data.sum_total;
                _this2.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[4] = this.$options.filters.numeral(this.dataSumTotal.number, '0,0');
            sums[5] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
            sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[7] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[8] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        }
    }
});

/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
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
        { staticClass: "mt-2" },
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
                      "start-placeholder": _vm.$t("form.startDate"),
                      "end-placeholder": _vm.$t("form.endDate")
                    },
                    on: { change: _vm.filterChange },
                    model: {
                      value: _vm.filterOption.datetime,
                      callback: function($$v) {
                        _vm.$set(_vm.filterOption, "datetime", $$v)
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
                        placeholder: _vm.$t("form.gameId"),
                        clearable: ""
                      },
                      on: { change: _vm.filterGameChange },
                      model: {
                        value: _vm.filterOption.game_id,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "game_id", $$v)
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
              _c("component-page-game-scenes-option", {
                attrs: { "game-id": _vm.filterOption.game_id },
                on: { change: _vm.filterChange },
                model: {
                  value: _vm.filterOption.scene_id,
                  callback: function($$v) {
                    _vm.$set(_vm.filterOption, "scene_id", $$v)
                  },
                  expression: "filterOption.scene_id"
                }
              }),
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
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
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
        "el-table",
        {
          staticStyle: { width: "100%" },
          attrs: {
            data: _vm.dataList,
            "default-sort": { prop: "id", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "150",
              label: _vm.$t("game.player-bet.thLable.hour"),
              prop: "id",
              sortable: "custom",
              "sort-orders": ["ascending", "descending"]
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("component-page-timestamp", {
                      attrs: { timestamp: scope.row.timed, type: "hour" }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "140",
              label: _vm.$t("game.player-bet.thLable.gameId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("games." + scope.row.game_id)) +
                        "\n            "
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
              label: _vm.$t("game.player-bet.thLable.accountId")
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
              "min-width": "90",
              label: _vm.$t("game.player-bet.thLable.sceneId")
            },
            scopedSlots: _vm._u([
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
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.number")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.number <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(_vm._f("numeral")(scope.row.number, "0,0"))
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betBase")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_base <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.bet_base,
                                "0,0.[0000]"
                              )
                            )
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betNum")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_num <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(scope.row.bet_num, "0,0.[0000]")
                            )
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
              label: _vm.$t("game.player-bet.thLable.gainGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.gain_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.gain_gold, "0,0.[0000]")
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
              label: _vm.$t("game.player-bet.thLable.platformCommission")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.income_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.income_gold, "0,0.[0000]")
                        ) +
                        "\n            "
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1c2aa81e", module.exports)
  }
}

/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1508)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1510)
/* template */
var __vue_template__ = __webpack_require__(1511)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-42433145"
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
Component.options.__file = "resources/assets/js/pages/game/player/bet-day/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42433145", Component.options)
  } else {
    hotAPI.reload("data-v-42433145", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("4963f85c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42433145\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42433145\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-42433145] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1510:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BetDay",
    props: ['activeName'],
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: [],
                org_id: '',
                game_id: '',
                scene_id: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 2
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
            }
        };
    },

    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取游戏列表
                this.getGameList();
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'bet-day') {
                return false;
            }
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
        filterOrgChange: function filterOrgChange(org) {
            this.loading = true;
            this.filterOption.org_id = Boolean(org) ? org.id : '';
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'bet-day') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/player/bet-day/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.dataSumTotal = response.data.resp_data.sum_total;
                _this2.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[4] = this.$options.filters.numeral(this.dataSumTotal.number, '0,0');
            sums[5] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
            sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[7] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[8] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        }
    },
    mounted: function mounted() {
        // 获取游戏列表
        this.getGameList();
    }
});

/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
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
        { staticClass: "mt-2" },
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
                      type: "daterange",
                      align: "left",
                      "start-placeholder": _vm.$t("form.startDate"),
                      "end-placeholder": _vm.$t("form.endDate")
                    },
                    on: { change: _vm.filterChange },
                    model: {
                      value: _vm.filterOption.datetime,
                      callback: function($$v) {
                        _vm.$set(_vm.filterOption, "datetime", $$v)
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
                        placeholder: _vm.$t("form.gameId"),
                        clearable: ""
                      },
                      on: { change: _vm.filterGameChange },
                      model: {
                        value: _vm.filterOption.game_id,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "game_id", $$v)
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
              _c("component-page-game-scenes-option", {
                attrs: { "game-id": _vm.filterOption.game_id },
                on: { change: _vm.filterChange },
                model: {
                  value: _vm.filterOption.scene_id,
                  callback: function($$v) {
                    _vm.$set(_vm.filterOption, "scene_id", $$v)
                  },
                  expression: "filterOption.scene_id"
                }
              }),
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
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
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
        "el-table",
        {
          staticStyle: { width: "100%" },
          attrs: {
            data: _vm.dataList,
            "default-sort": { prop: "id", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "150",
              label: _vm.$t("game.player-bet.thLable.day"),
              prop: "id",
              sortable: "custom",
              "sort-orders": ["ascending", "descending"]
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("component-page-timestamp", {
                      attrs: { timestamp: scope.row.timed, type: "day" }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "140",
              label: _vm.$t("game.player-bet.thLable.gameId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("games." + scope.row.game_id)) +
                        "\n            "
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
              label: _vm.$t("game.player-bet.thLable.accountId")
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
              "min-width": "90",
              label: _vm.$t("game.player-bet.thLable.sceneId")
            },
            scopedSlots: _vm._u([
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
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.number")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.number <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(_vm._f("numeral")(scope.row.number, "0,0"))
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betBase")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_base <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.bet_base,
                                "0,0.[0000]"
                              )
                            )
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betNum")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_num <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(scope.row.bet_num, "0,0.[0000]")
                            )
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
              label: _vm.$t("game.player-bet.thLable.gainGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.gain_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.gain_gold, "0,0.[0000]")
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
              label: _vm.$t("game.player-bet.thLable.platformCommission")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.income_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.income_gold, "0,0.[0000]")
                        ) +
                        "\n            "
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42433145", module.exports)
  }
}

/***/ }),

/***/ 1512:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1513)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1515)
/* template */
var __vue_template__ = __webpack_require__(1516)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3d7fcfa9"
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
Component.options.__file = "resources/assets/js/pages/game/player/bet-month/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d7fcfa9", Component.options)
  } else {
    hotAPI.reload("data-v-3d7fcfa9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1514);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("eaee27fe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d7fcfa9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d7fcfa9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1514:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-3d7fcfa9] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1515:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BetMonth",
    props: ['activeName'],
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: [],
                org_id: '',
                game_id: '',
                scene_id: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 2
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
            }
        };
    },

    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取游戏列表
                this.getGameList();
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'bet-month') {
                return false;
            }
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
        filterOrgChange: function filterOrgChange(org) {
            this.loading = true;
            this.filterOption.org_id = Boolean(org) ? org.id : '';
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'bet-month') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime);
            }
            axios.get('/app/player/bet-month/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.dataSumTotal = response.data.resp_data.sum_total;
                _this2.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[4] = this.$options.filters.numeral(this.dataSumTotal.number, '0,0');
            sums[5] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
            sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[7] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[8] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        }
    },
    mounted: function mounted() {
        // 获取游戏列表
        this.getGameList();
    }
});

/***/ }),

/***/ 1516:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
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
        { staticClass: "mt-2" },
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
                      type: "month",
                      align: "left",
                      placeholder: _vm.$t("form.month")
                    },
                    on: { change: _vm.filterChange },
                    model: {
                      value: _vm.filterOption.datetime,
                      callback: function($$v) {
                        _vm.$set(_vm.filterOption, "datetime", $$v)
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
                        placeholder: _vm.$t("form.gameId"),
                        clearable: ""
                      },
                      on: { change: _vm.filterGameChange },
                      model: {
                        value: _vm.filterOption.game_id,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "game_id", $$v)
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
              _c("component-page-game-scenes-option", {
                attrs: { "game-id": _vm.filterOption.game_id },
                on: { change: _vm.filterChange },
                model: {
                  value: _vm.filterOption.scene_id,
                  callback: function($$v) {
                    _vm.$set(_vm.filterOption, "scene_id", $$v)
                  },
                  expression: "filterOption.scene_id"
                }
              }),
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
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
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
        "el-table",
        {
          staticStyle: { width: "100%" },
          attrs: {
            data: _vm.dataList,
            "default-sort": { prop: "id", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "150",
              label: _vm.$t("game.player-bet.thLable.month"),
              prop: "id",
              sortable: "custom",
              "sort-orders": ["ascending", "descending"]
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("component-page-timestamp", {
                      attrs: { timestamp: scope.row.timed, type: "month" }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "140",
              label: _vm.$t("game.player-bet.thLable.gameId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("games." + scope.row.game_id)) +
                        "\n            "
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
              label: _vm.$t("game.player-bet.thLable.accountId")
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
              "min-width": "90",
              label: _vm.$t("game.player-bet.thLable.sceneId")
            },
            scopedSlots: _vm._u([
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
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.number")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.number <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(_vm._f("numeral")(scope.row.number, "0,0"))
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betBase")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_base <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.bet_base,
                                "0,0.[0000]"
                              )
                            )
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
              "min-width": "70",
              label: _vm.$t("game.player-bet.thLable.betNum")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.bet_num <= 0
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(scope.row.bet_num, "0,0.[0000]")
                            )
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
              label: _vm.$t("game.player-bet.thLable.gainGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.gain_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.gain_gold, "0,0.[0000]")
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
              label: _vm.$t("game.player-bet.thLable.platformCommission")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.income_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.income_gold, "0,0.[0000]")
                        ) +
                        "\n            "
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d7fcfa9", module.exports)
  }
}

/***/ }),

/***/ 1517:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-layout" }, [
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
                { staticClass: "game-container" },
                [
                  _c(
                    "el-tabs",
                    {
                      attrs: { type: "card" },
                      model: {
                        value: _vm.activeName,
                        callback: function($$v) {
                          _vm.activeName = $$v
                        },
                        expression: "activeName"
                      }
                    },
                    [
                      _c(
                        "el-tab-pane",
                        {
                          attrs: {
                            label: _vm.$t("game.player-bet.betHour"),
                            name: "bet-hour"
                          }
                        },
                        [
                          _c("bet-hour", {
                            attrs: { activeName: _vm.activeName }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        {
                          attrs: {
                            label: _vm.$t("game.player-bet.betDay"),
                            name: "bet-day"
                          }
                        },
                        [
                          _c("bet-day", {
                            attrs: { activeName: _vm.activeName }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        {
                          attrs: {
                            label: _vm.$t("game.player-bet.betMonth"),
                            name: "bet-month"
                          }
                        },
                        [
                          _c("bet-month", {
                            attrs: { activeName: _vm.activeName }
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
            ])
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7f7e2a34", module.exports)
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

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1499)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1501)
/* template */
var __vue_template__ = __webpack_require__(1517)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7f7e2a34"
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
Component.options.__file = "resources/assets/js/pages/game/player/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f7e2a34", Component.options)
  } else {
    hotAPI.reload("data-v-7f7e2a34", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});