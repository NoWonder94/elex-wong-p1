webpackJsonp([49],{

/***/ 1298:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1299);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("e3dff758", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-35be42da\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-35be42da\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1299:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-container-inner[data-v-35be42da] {\n    position: relative;\n    border-radius: 0;\n}\n.page-chart-time[data-v-35be42da] {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    z-index: 11;\n}\n", ""]);

// exports


/***/ }),

/***/ 1300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coin_Index_vue__ = __webpack_require__(1301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coin_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coin_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agency_Index_vue__ = __webpack_require__(1306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agency_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__agency_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_Index_vue__ = __webpack_require__(1311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__game_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coin_Month_vue__ = __webpack_require__(1316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coin_Month_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__coin_Month_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agency_Month_vue__ = __webpack_require__(1321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agency_Month_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__agency_Month_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_Month_vue__ = __webpack_require__(1326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_Month_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__game_Month_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ChartCoin: __WEBPACK_IMPORTED_MODULE_0__coin_Index_vue___default.a,
        ChartAgency: __WEBPACK_IMPORTED_MODULE_1__agency_Index_vue___default.a,
        ChartGame: __WEBPACK_IMPORTED_MODULE_2__game_Index_vue___default.a,
        ChartCoinMonth: __WEBPACK_IMPORTED_MODULE_3__coin_Month_vue___default.a,
        ChartAgencyMonth: __WEBPACK_IMPORTED_MODULE_4__agency_Month_vue___default.a,
        ChartGameMonth: __WEBPACK_IMPORTED_MODULE_5__game_Month_vue___default.a
    },
    data: function data() {
        return {
            activeTime: 'day',
            activeName: 'name'
        };
    },

    mounted: function mounted() {
        this.$nextTick(function () {
            this.activeName = 'coin';
        });
    }
});

/***/ }),

/***/ 1301:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1302)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1304)
/* template */
var __vue_template__ = __webpack_require__(1305)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c479c4ba"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/coin/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c479c4ba", Component.options)
  } else {
    hotAPI.reload("data-v-c479c4ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1302:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1303);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("241fd553", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c479c4ba\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c479c4ba\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1303:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-c479c4ba] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1304:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartCoin",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            loading: true,
            filterOption: {
                datetime: [],
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataSumTotal: {}
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        },
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getDataList();
        },
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this = this;

            if (this.activeName != 'coin' || this.activeTime != 'day') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/chart/coins-multi/getCoinList', {
                params: filterOptionCache
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.dataList = response.data.resp_data.data;
                _this.dataSumTotal = response.data.resp_data.sum_total;
                _this.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [];
            sums.push('合计');
            sums.push(this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.amount, '0,0.[0000]'));
            sums.push(this.$options.filters.numeral(this.dataSumTotal.tree_bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.tree_amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.tree_amount, '0,0.[0000]'));
            return sums;
        }
    }
});

/***/ }),

/***/ 1305:
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
                [
                  _c(
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.coin.thLable.date"),
              prop: "timed",
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
              "min-width": "100",
              label: _vm.$t("chart.coin.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.coin.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.coin.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.coin.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-c479c4ba", module.exports)
  }
}

/***/ }),

/***/ 1306:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1307)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1309)
/* template */
var __vue_template__ = __webpack_require__(1310)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-87255f52"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/agency/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87255f52", Component.options)
  } else {
    hotAPI.reload("data-v-87255f52", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1307:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1308);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("d0011518", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87255f52\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87255f52\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1308:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-87255f52] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1309:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartAgency",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            orgList: [],
            loading: true,
            filterOption: {
                datetime: [],
                org_id: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataSumTotal: {}
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取总代列表
                this.getOrgSubList();
                // 获取列表数据
                this.getDataList();
            }
        },
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取总代列表
                this.getOrgSubList();
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取总代列表
        getOrgSubList: function getOrgSubList() {
            var _this = this;

            if (this.orgList.length || this.activeName != 'agency' || this.activeTime != 'day') {
                return false;
            }
            axios.get('/common/getOrgSubList').then(function (response) {
                _this.orgList = response.data.resp_data;
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
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'agency' || this.activeTime != 'day') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/chart/coins-multi/getAgencyList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.dataSumTotal = response.data.resp_data.sum_total;
                _this2.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [];
            sums.push('合计');
            sums.push('----');
            sums.push(this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.amount, '0,0.[0000]'));
            sums.push(this.$options.filters.numeral(this.dataSumTotal.tree_bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.tree_amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.tree_amount, '0,0.[0000]'));
            return sums;
        }
    }
});

/***/ }),

/***/ 1310:
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
                      attrs: { label: _vm.$t("form.orgId"), clearable: "" },
                      on: { change: _vm.filterChange },
                      model: {
                        value: _vm.filterOption.org_id,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "org_id", $$v)
                        },
                        expression: "filterOption.org_id"
                      }
                    },
                    _vm._l(_vm.orgList, function(item) {
                      return _c("el-option", {
                        key: item.id,
                        attrs: { label: item.name, value: item.id }
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
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.agency.thLable.date"),
              prop: "timed",
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
              "min-width": "100",
              label: _vm.$t("chart.agency.thLable.agency"),
              prop: "org_name"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "100",
              label: _vm.$t("chart.agency.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.agency.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.agency.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.agency.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-87255f52", module.exports)
  }
}

/***/ }),

/***/ 1311:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1312)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1314)
/* template */
var __vue_template__ = __webpack_require__(1315)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-06679478"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/game/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06679478", Component.options)
  } else {
    hotAPI.reload("data-v-06679478", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1312:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1313);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("65e56ef4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-06679478\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-06679478\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1313:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-06679478] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1314:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartGame",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: [],
                game_id: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dataSumTotal: {}
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取游戏列表
                this.getGameList();
                // 获取列表数据
                this.getDataList();
            }
        },
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

            if (this.gameList.length || this.activeName != 'game' || this.activeTime != 'day') {
                return false;
            }
            axios.get('/common/getGameList', {
                params: { type: 2 }
            }).then(function (response) {
                _this.gameList = response.data.resp_data;
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
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'game' || this.activeTime != 'day') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/chart/coins-multi/getGameList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.dataSumTotal = response.data.resp_data.sum_total;
                _this2.loading = false;
            });
        },
        getSummaries: function getSummaries() {
            var sums = [];
            sums.push('合计');
            sums.push('----');
            sums.push(this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.amount, '0,0.[0000]'));
            sums.push(this.$options.filters.numeral(this.dataSumTotal.tree_bet_num, '0,0.[0000]'));
            sums.push((this.dataSumTotal.tree_amount > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.tree_amount, '0,0.[0000]'));
            return sums;
        }
    }
});

/***/ }),

/***/ 1315:
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
                      on: { change: _vm.filterChange },
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
                        attrs: { label: item.name, value: item.id }
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
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" },
            "summary-method": _vm.getSummaries,
            "show-summary": ""
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.game.thLable.date"),
              prop: "timed",
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
              label: _vm.$t("chart.game.thLable.game")
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
              "min-width": "100",
              label: _vm.$t("chart.game.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.game.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.game.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.game.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-06679478", module.exports)
  }
}

/***/ }),

/***/ 1316:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1317)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1319)
/* template */
var __vue_template__ = __webpack_require__(1320)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ff28df5e"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/coin/Month.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff28df5e", Component.options)
  } else {
    hotAPI.reload("data-v-ff28df5e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1317:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1318);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("065f2e28", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ff28df5e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ff28df5e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1318:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-ff28df5e] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1319:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartCoinMonth",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            loading: true,
            filterOption: {
                datetime: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: []
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        },
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getDataList();
        },
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this = this;

            if (this.activeName != 'coin' || this.activeTime != 'month') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime);
            }
            axios.get('/chart/coins-multi/month/getCoinList', {
                params: filterOptionCache
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.dataList = response.data.resp_data.data;
                _this.loading = false;
            });
        }
    }
});

/***/ }),

/***/ 1320:
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
                [
                  _c(
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" }
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.coin.thLable.month"),
              prop: "timed",
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
              "min-width": "100",
              label: _vm.$t("chart.coin.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.coin.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.coin.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.coin.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-ff28df5e", module.exports)
  }
}

/***/ }),

/***/ 1321:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1322)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1324)
/* template */
var __vue_template__ = __webpack_require__(1325)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c1d479f6"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/agency/Month.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1d479f6", Component.options)
  } else {
    hotAPI.reload("data-v-c1d479f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1322:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1323);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("d7e6fc18", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c1d479f6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c1d479f6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1323:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-c1d479f6] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1324:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartAgencyMonth",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            orgList: [],
            loading: true,
            filterOption: {
                datetime: '',
                org_id: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: []
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取总代列表
                this.getOrgSubList();
                // 获取列表数据
                this.getDataList();
            }
        },
        activeName: function activeName(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取总代列表
                this.getOrgSubList();
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取总代列表
        getOrgSubList: function getOrgSubList() {
            var _this = this;

            if (this.orgList.length || this.activeName != 'agency' || this.activeTime != 'month') {
                return false;
            }
            axios.get('/common/getOrgSubList').then(function (response) {
                _this.orgList = response.data.resp_data;
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
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'agency' || this.activeTime != 'month') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime);
            }
            axios.get('/chart/coins-multi/month/getAgencyList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.loading = false;
            });
        }
    }
});

/***/ }),

/***/ 1325:
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
                      attrs: { label: _vm.$t("form.orgId"), clearable: "" },
                      on: { change: _vm.filterChange },
                      model: {
                        value: _vm.filterOption.org_id,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "org_id", $$v)
                        },
                        expression: "filterOption.org_id"
                      }
                    },
                    _vm._l(_vm.orgList, function(item) {
                      return _c("el-option", {
                        key: item.id,
                        attrs: { label: item.name, value: item.id }
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
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" }
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.agency.thLable.month"),
              prop: "timed",
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
              "min-width": "100",
              label: _vm.$t("chart.agency.thLable.agency"),
              prop: "org_name"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "100",
              label: _vm.$t("chart.agency.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.agency.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.agency.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.agency.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-c1d479f6", module.exports)
  }
}

/***/ }),

/***/ 1326:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1327)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1329)
/* template */
var __vue_template__ = __webpack_require__(1330)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4116af1c"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/game/Month.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4116af1c", Component.options)
  } else {
    hotAPI.reload("data-v-4116af1c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1327:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1328);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("4ff0f86c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4116af1c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4116af1c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Month.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1328:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-4116af1c] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1329:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ChartGameMonth",
    props: ['activeTime', 'activeName'],
    data: function data() {
        return {
            gameList: [],
            loading: true,
            filterOption: {
                datetime: '',
                game_id: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: []
        };
    },

    watch: {
        activeTime: function activeTime(n, o) {
            // 初始化数据
            if (!this.dataList.length) {
                // 获取游戏列表
                this.getGameList();
                // 获取列表数据
                this.getDataList();
            }
        },
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

            if (this.gameList.length || this.activeName != 'game' || this.activeTime != 'month') {
                return false;
            }
            axios.get('/common/getGameList', {
                params: { type: 2 }
            }).then(function (response) {
                _this.gameList = response.data.resp_data;
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
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getDataList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            this.clearFilterOption();
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            if (this.activeName != 'game' || this.activeTime != 'month') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime);
            }
            axios.get('/chart/coins-multi/month/getGameList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.loading = false;
            });
        }
    }
});

/***/ }),

/***/ 1330:
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
                      on: { change: _vm.filterChange },
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
                        attrs: { label: item.name, value: item.id }
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
                    "el-button",
                    {
                      attrs: { icon: "el-icon-search" },
                      on: { click: _vm.filterChange }
                    },
                    [_vm._v(_vm._s(_vm.$t("form.search")))]
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
            "default-sort": { prop: "timed", order: "descending" }
          },
          on: { "sort-change": _vm.filterOrderChange }
        },
        [
          _c("el-table-column", {
            attrs: {
              "min-width": "110",
              label: _vm.$t("chart.game.thLable.month"),
              prop: "timed",
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
              label: _vm.$t("chart.game.thLable.game")
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
              "min-width": "100",
              label: _vm.$t("chart.game.thLable.playerBet")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(_vm._f("numeral")(scope.row.bet_num, "0,0.[0000]"))
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
              label: _vm.$t("chart.game.thLable.platformGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.amount, "0,0.[0000]")
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
              label: _vm.$t("chart.game.thLable.playerBetChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.tree_bet_num, "0,0.[0000]")
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
              "min-width": "160",
              label: _vm.$t("chart.game.thLable.platformGoldChild")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(scope.row.tree_amount > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(scope.row.tree_amount, "0,0.[0000]")
                        )
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
              layout: "prev, pager, next",
              "current-page": _vm.filterOption.page,
              "page-size": _vm.filterOption.page_size,
              total: _vm.dataCount.total
            },
            on: { "current-change": _vm.filterPageChange }
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
    require("vue-hot-reload-api")      .rerender("data-v-4116af1c", module.exports)
  }
}

/***/ }),

/***/ 1331:
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
                { staticClass: "page-container-inner" },
                [
                  _c(
                    "div",
                    { staticClass: "page-chart-time" },
                    [
                      _c(
                        "el-radio-group",
                        {
                          attrs: { size: "small" },
                          model: {
                            value: _vm.activeTime,
                            callback: function($$v) {
                              _vm.activeTime = $$v
                            },
                            expression: "activeTime"
                          }
                        },
                        [
                          _c("el-radio-button", { attrs: { label: "day" } }, [
                            _vm._v(_vm._s(_vm.$t("chart.totalDay")))
                          ]),
                          _vm._v(" "),
                          _c("el-radio-button", { attrs: { label: "month" } }, [
                            _vm._v(_vm._s(_vm.$t("chart.totalMonth")))
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
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
                        { attrs: { label: _vm.$t("chart.use"), name: "coin" } },
                        [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "day",
                                  expression: "activeTime=='day'"
                                }
                              ]
                            },
                            [
                              _c("chart-coin", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "month",
                                  expression: "activeTime=='month'"
                                }
                              ]
                            },
                            [
                              _c("chart-coin-month", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        {
                          attrs: {
                            label: _vm.$t("chart.agent"),
                            name: "agency"
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "day",
                                  expression: "activeTime=='day'"
                                }
                              ]
                            },
                            [
                              _c("chart-agency", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "month",
                                  expression: "activeTime=='month'"
                                }
                              ]
                            },
                            [
                              _c("chart-agency-month", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        {
                          attrs: { label: _vm.$t("chart.games"), name: "game" }
                        },
                        [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "day",
                                  expression: "activeTime=='day'"
                                }
                              ]
                            },
                            [
                              _c("chart-game", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.activeTime == "month",
                                  expression: "activeTime=='month'"
                                }
                              ]
                            },
                            [
                              _c("chart-game-month", {
                                attrs: {
                                  activeTime: _vm.activeTime,
                                  activeName: _vm.activeName
                                }
                              })
                            ],
                            1
                          )
                        ]
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
    require("vue-hot-reload-api")      .rerender("data-v-35be42da", module.exports)
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

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1298)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1300)
/* template */
var __vue_template__ = __webpack_require__(1331)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-35be42da"
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
Component.options.__file = "resources/assets/js/pages/chart/coins-multi/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35be42da", Component.options)
  } else {
    hotAPI.reload("data-v-35be42da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});