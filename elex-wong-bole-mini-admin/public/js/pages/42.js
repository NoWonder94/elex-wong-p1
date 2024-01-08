webpackJsonp([42],{

/***/ 1167:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1168);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("3cf07c63", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ff4dc2b2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ff4dc2b2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1168:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.game-container[data-v-ff4dc2b2] {\n    padding: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__play_Index_vue__ = __webpack_require__(1170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__play_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__play_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multi_Index_vue__ = __webpack_require__(1200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multi_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__multi_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slot_Index_vue__ = __webpack_require__(1210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slot_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__slot_Index_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        LogPlay: __WEBPACK_IMPORTED_MODULE_0__play_Index_vue___default.a,
        LogMulti: __WEBPACK_IMPORTED_MODULE_1__multi_Index_vue___default.a,
        LogSlot: __WEBPACK_IMPORTED_MODULE_2__slot_Index_vue___default.a
    },
    data: function data() {
        return {
            activeName: 'name'
        };
    },
    mounted: function mounted() {
        // 初始化选中选项卡
        this.$nextTick(function () {
            this.activeName = 'log-play';
        });
    }
});

/***/ }),

/***/ 1170:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1171)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1173)
/* template */
var __vue_template__ = __webpack_require__(1199)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72d476f2"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72d476f2", Component.options)
  } else {
    hotAPI.reload("data-v-72d476f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1171:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1172);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("6215946e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72d476f2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72d476f2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-72d476f2] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemBills_vue__ = __webpack_require__(1174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemBills_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemBills_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemPlaybackMahjong_vue__ = __webpack_require__(1179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemPlaybackMahjong_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ItemPlaybackMahjong_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemPlaybackNiuniu_vue__ = __webpack_require__(1184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemPlaybackNiuniu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ItemPlaybackNiuniu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemPlaybackZjh_vue__ = __webpack_require__(1189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemPlaybackZjh_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ItemPlaybackZjh_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemPlaybackDzmj_vue__ = __webpack_require__(1194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemPlaybackDzmj_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ItemPlaybackDzmj_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ItemBills: __WEBPACK_IMPORTED_MODULE_0__ItemBills_vue___default.a,
        ItemPlaybackMahjong: __WEBPACK_IMPORTED_MODULE_1__ItemPlaybackMahjong_vue___default.a,
        ItemPlaybackNiuniu: __WEBPACK_IMPORTED_MODULE_2__ItemPlaybackNiuniu_vue___default.a,
        ItemPlaybackZjh: __WEBPACK_IMPORTED_MODULE_3__ItemPlaybackZjh_vue___default.a,
        ItemPlaybackDzmj: __WEBPACK_IMPORTED_MODULE_4__ItemPlaybackDzmj_vue___default.a
    },
    name: "LogPlay",
    props: ['activeName'],
    data: function data() {
        return {
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
                org_id: '',
                game_id: '',
                scene_id: '',
                status: '',
                user_type: '',
                keyword: '',
                keyword_type: 1,
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
            },
            dialog: {
                visible: {
                    bills: false,
                    playbackMahjong: false,
                    playbackNiuniu: false,
                    playbackZjh: false,
                    playbackDzmj: false
                }
            },
            initStautsCache: false
        };
    },

    computed: {
        initStatus: function initStatus() {
            if (this.activeName == 'log-play') {
                this.initStautsCache = true;
            }
            return this.initStautsCache;
        }
    },
    created: function created() {
        // 代理ID
        if (Boolean(this.$route.params.orgId)) {
            this.filterOption.org_id = this.$route.params.orgId;
        }
        // 搜索关键词
        if (Boolean(this.$route.params.accountId)) {
            this.filterOption.keyword = this.$route.params.accountId;
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 获取游戏列表
            this.getGameList();
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'log-play') {
                return false;
            }
            axios.get('/common/getGameList', {
                params: { type: 1 }
            }).then(function (response) {
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

            if (this.activeName != 'log-play') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/log/getList', {
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
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[8] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
            sums[9] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[10] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[11] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        },

        // 金币明细
        dialogPlayerBills: function dialogPlayerBills(scope) {
            this.dataItem = scope.row;
            // 显示模态框
            this.dialog.visible.bills = true;
        },

        // 游戏回放【麻将】（血流、血战）
        dialogPlaybackMahjong: function dialogPlaybackMahjong(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.playbackMahjong = true;
        },

        // 游戏回放【牛牛】【三公】
        dialogPlaybackNiuniu: function dialogPlaybackNiuniu(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.playbackNiuniu = true;
        },

        // 游戏回放【炸金花】
        dialogPlaybackZjh: function dialogPlaybackZjh(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.playbackZjh = true;
        },

        // 游戏回放【大众麻将】
        dialogPlaybackDzmj: function dialogPlaybackDzmj(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.playbackDzmj = true;
        }
    }
});

/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1175)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1177)
/* template */
var __vue_template__ = __webpack_require__(1178)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-654dc499"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/ItemBills.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-654dc499", Component.options)
  } else {
    hotAPI.reload("data-v-654dc499", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1176);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("522902a6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-654dc499\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemBills.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-654dc499\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemBills.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1176:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.dialog-bills[data-v-654dc499] .el-dialog__body {\n    padding-top: 0;\n    min-height: 320px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1177:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemBills",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {
                bills: [],
                seatIndex: 0
            },
            recordDataLIst: []
        };
    },

    computed: {
        playerBillsTotal: function playerBillsTotal() {
            var total = 0;
            for (var i in this.recordData.bills) {
                total += this.recordData.bills[i].info.gainGold + this.recordData.bills[i].info.pumpGold;
            }
            return total;
        }
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
            // 读取缓存数据
            var key = data.uid + '.' + data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取玩家游戏明细
            this.getPlayerRecord(key, data);
        },
        getPlayerRecord: function getPlayerRecord(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getPlayerRecord', {
                params: {
                    uid: data.uid,
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 1178:
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
        title: _vm.$t("game.log.dialog.title"),
        width: "500px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
        }
      }
    },
    [
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
          ]
        },
        [
          _vm.recordData.bills && _vm.recordData.bills.length
            ? _c(
                "el-table",
                {
                  staticStyle: { width: "100%" },
                  attrs: { data: _vm.recordData.bills }
                },
                [
                  _c("el-table-column", {
                    attrs: { label: _vm.$t("game.log.dialog.type") },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            [10001, 10002, 10006].indexOf(_vm.data.game_id) > -1
                              ? _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("hsMahjongBillsType")(
                                        scope.row.type,
                                        scope.row.info,
                                        _vm.recordData.seatIndex
                                      )
                                    )
                                  )
                                ])
                              : _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("hsMahjongBillsType")(
                                        scope.row.type
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
                    attrs: { label: _vm.$t("game.log.dialog.gold") },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _vm._v(
                              _vm._s(
                                scope.row.info.gainGold +
                                  scope.row.info.pumpGold >
                                0
                                  ? "+"
                                  : ""
                              ) +
                                _vm._s(
                                  _vm._f("numeral")(
                                    scope.row.info.gainGold +
                                      scope.row.info.pumpGold,
                                    "0,0.[0000]"
                                  )
                                )
                            )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "pt-4 pl-2" }, [
            _c("span", { staticClass: "pr-4" }, [
              _vm._v(
                _vm._s(_vm.$t("game.log.dialog.total")) +
                  "：" +
                  _vm._s(_vm.playerBillsTotal > 0 ? "+" : "") +
                  _vm._s(_vm._f("numeral")(_vm.playerBillsTotal, "0,0.[0000]"))
              )
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "pr-4" }, [
              _vm._v(
                _vm._s(_vm.$t("game.log.dialog.gainGold")) +
                  "：" +
                  _vm._s(_vm.data.gain_gold > 0 ? "+" : "") +
                  _vm._s(_vm._f("numeral")(_vm.data.gain_gold, "0,0.[0000]"))
              )
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "pr-4" }, [
              _vm._v(
                _vm._s(_vm.$t("game.log.dialog.platformCommission")) +
                  "：" +
                  _vm._s(_vm.data.income_gold > 0 ? "+" : "") +
                  _vm._s(_vm._f("numeral")(_vm.data.income_gold, "0,0.[0000]"))
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "pt-4 pl-2" }, [
            _vm.data.ext
              ? _c("span", { staticClass: "pr-4" }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.$t("game.log.dialog.initGold")) +
                      "：\n                "
                  ),
                  typeof _vm.data.ext.init_gold == "undefined"
                    ? _c("span", [_vm._v("----")])
                    : _c("span", [
                        _vm._v(
                          _vm._s(
                            _vm._f("numeral")(
                              _vm.data.ext.init_gold,
                              "0,0.[0000]"
                            )
                          )
                        )
                      ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("span", { staticClass: "pr-4" }, [
              _vm._v(
                _vm._s(_vm.$t("game.log.dialog.ownGold")) +
                  "：" +
                  _vm._s(_vm._f("numeral")(_vm.data.own_gold, "0,0.[0000]"))
              )
            ])
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-654dc499", module.exports)
  }
}

/***/ }),

/***/ 1179:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1180)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1182)
/* template */
var __vue_template__ = __webpack_require__(1183)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1a653204"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/ItemPlaybackMahjong.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a653204", Component.options)
  } else {
    hotAPI.reload("data-v-1a653204", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1180:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1181);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("d2bb18e8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a653204\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackMahjong.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a653204\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackMahjong.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n[data-v-1a653204] .el-dialog__body {\n  padding: 0;\n  overflow: auto;\n  height: 540px;\n}\n.detail-container[data-v-1a653204] {\n  min-height: 540px;\n}\n.detail-content[data-v-1a653204] {\n  padding: 15px 20px 30px;\n}\n.detail-container .el-form-item[data-v-1a653204] {\n  margin-bottom: 0;\n}\n.detail-container[data-v-1a653204] label {\n  color: #909399;\n}\n.icon-coins[data-v-1a653204] {\n  color: #FFA500;\n}\n.action-list-item[data-v-1a653204] {\n  padding: 7px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1182:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemPlaybackMahjong",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {
                data: [],
                player: {}
            },
            recordDataLIst: [],
            routeActive: ['s_startNewRound', 's_initHandCards', 's_playerSelectHSZ', 's_HSZCardExchanged', 's_playerSelectColor', 's_playerColorSelected', 's_playCard', 's_newCard', 's_hangupTask', 's_playerGangCard', 's_playerPengCard', 's_playerHu', 's_syncGold', 's_passTask', 's_trustee', 's_roundSettlement', 's_playerOffline', 's_playerReconnect']
        };
    },

    computed: {
        playersByPlayback: function playersByPlayback() {
            var players = [];
            if (this.recordData.data.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.recordData.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;

                        if (v.route == 's_roomInfo') {
                            players = v.msg.players;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return players;
        },
        playerBySeat: function playerBySeat() {
            var playerBySeat = { 1: {}, 2: {}, 3: {}, 4: {} };
            if (this.recordData.data.length > 0) {
                var players = this.playersByPlayback;
                var dbPlayer = this.recordData.player;
                for (var seat in players) {
                    if (typeof dbPlayer[players[seat].uid] != 'undefined') {
                        players[seat].account_id = '<span class="text-primary-custom">' + dbPlayer[players[seat].uid].account_id + '</span>';
                    } else {
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].uid + '</span>';
                    }
                    playerBySeat[seat] = players[seat];
                }
            }
            return playerBySeat;
        }
    },
    filters: {
        mahjongPlayback: function mahjongPlayback(item, playerBySeat, $filters, $t) {
            // 数字转麻将牌【单张】
            function cardToColor(card) {
                if (10 < card && card < 20) {
                    return card % 10 + $t('game.log.replayMahjong.dot');
                } else if (20 < card && card < 30) {
                    return card % 10 + $t('game.log.replayMahjong.bamboo');
                } else if (30 < card && card < 40) {
                    return card % 10 + $t('game.log.replayMahjong.character');
                }
            }

            // 数字转麻将牌【手牌】
            function s_initHandCards_cards(cards) {
                var colors = [];
                for (var card in cards) {
                    if (cards[card] > 1) {
                        for (var j = 0; j < cards[card]; j++) {
                            colors.push(cardToColor(card));
                        }
                    } else {
                        colors.push(cardToColor(card));
                    }
                }
                return colors;
            }

            // 数字转麻将牌【换三张】
            function s_HSZCardExchanged_cards(cards) {
                var colors = [];
                for (var i in cards) {
                    colors.push(cardToColor(cards[i]));
                }
                return colors;
            }

            // 换牌方向【换三张】
            function s_HSZCardExchanged_type(type) {
                switch (type) {
                    case 0:
                        return $t('game.log.replayMahjong.clockwise');
                    case 1:
                        return $t('game.log.replayMahjong.counterclockwise');
                    case 2:
                        return $t('game.log.replayMahjong.opposite');
                }
            }

            // 【玩家定缺牌】
            function s_playerColorSelected(msg, playerBySeat) {
                var playerColors = [];
                for (var seat in msg.players) {
                    var color = '';
                    switch (msg.players[seat]) {
                        case 1:
                            color = $t('game.log.replayMahjong.dot');
                            break;
                        case 2:
                            color = $t('game.log.replayMahjong.bamboo');
                            break;
                        case 3:
                            color = $t('game.log.replayMahjong.character');
                            break;
                    }
                    playerColors.push(playerBySeat[seat].account_id + ($t('game.log.replayMahjong.exclude') + '\u3010') + color + '】');
                }
                return $t('game.log.replayMahjong.playerExcludeds') + playerColors.join();
            }

            // 【挂起任务】
            function s_hangupTask(playerIndex, msg, playerBySeat) {
                var hangupTasks = [];
                for (var type in msg.task) {
                    switch (type) {
                        case '1':
                            hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayMahjong.win') + '\u3010') + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】');
                            break;
                        case '2':
                            var gangArray = msg.task[type].gangArray;
                            for (var i in gangArray) {
                                hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayMahjong.kong') + '\u3010') + cardToColor(gangArray[i].card) + '】【' + playerBySeat[gangArray[i].from].account_id + '】');
                            }
                            break;
                        case '3':
                            hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayMahjong.pong') + '\u3010') + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】');
                            break;
                    }
                }
                return $t('game.log.replayMahjong.playerOperate') + hangupTasks.join();
            }

            // 【杠牌】
            function s_playerGangCard(msg, playerBySeat) {
                var windy = msg.gang == 1 ? $t('game.log.replayMahjong.windy-b') : $t('game.log.replayMahjong.windy-s');
                var raining = $t('game.log.replayMahjong.raining');
                var infoString = playerBySeat[msg.playerIndex].account_id + ($t('game.log.replayMahjong.kong') + '\u3010') + cardToColor(msg.card) + '】【' + ([1, 3].indexOf(msg.gang) >= 0 ? windy : raining) + '】：';
                var players = [];
                for (var i in msg.targets) {
                    players.push(playerBySeat[msg.targets[i]].account_id);
                }
                return infoString + players.join();
            }

            // 【胡牌】
            function s_playerHu(msg, playerBySeat) {
                var infoString = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayMahjong.win') + '\u3010') + cardToColor(item.msg.card) + '】';
                if (item.msg.gsh) {
                    infoString += '\u3010' + $t('game.log.replayMahjong.kongWin') + '\u3011';
                }
                if (item.msg.isZM) {
                    infoString += '\u3010' + $t('game.log.replayMahjong.ownDraw') + '\u3011';
                }
                return infoString + '：' + playerBySeat[item.msg.from].account_id;
            }

            // 【金币飘分】
            function s_syncGold(msg, playerBySeat, $filters) {
                var playerGolds = [];
                for (var seat in msg) {
                    var billType = $t('game.log.replayMahjong.billType')[msg[seat].type];
                    playerGolds.push(playerBySeat[seat].account_id + billType + '【' + $filters.numeral(msg[seat].info.gainGold + msg[seat].info.pumpGold, '0,0.[0000]') + ($t('game.log.replayMahjong.coins') + '\u3011'));
                }
                return playerGolds.join();
            }

            // 【牌局结算】
            function s_roundSettlement(playerIndex, msg, playerBySeat, $filters) {
                var totalGold = 0,
                    gainGold = 0,
                    pumpGold = 0;
                var initGold = 0,
                    ownGold = 0;

                var billsCoins = [];
                var bills = msg.players[playerIndex].bills;
                for (var i in bills) {
                    var itemString = playerBySeat[playerIndex].account_id;
                    if (typeof bills[i].info.card != 'undefined') {
                        itemString += '【' + cardToColor(bills[i].info.card) + '】';
                    }
                    itemString += '【' + $filters.hsMahjongBillsType(bills[i].type, bills[i].info, playerIndex) + '】' + '【' + playerBySeat[bills[i].info.from].account_id + '】' + (bills[i].info.gainGold + bills[i].info.pumpGold) + $t('game.log.replayMahjong.coins');
                    // 离开
                    if (bills[i].info.isLeave) {
                        itemString += '【' + $t('game.log.replayMahjong.isLeave') + '】';
                    }
                    billsCoins.push(itemString);
                }
                // 金币盈亏
                gainGold = $filters.numeral(msg.players[playerIndex].gainGold, '0,0.[0000]');
                pumpGold = $filters.numeral(msg.players[playerIndex].pumpGold, '0,0.[0000]');
                totalGold = $filters.numeral(msg.players[playerIndex].gainGold + msg.players[playerIndex].pumpGold, '0,0.[0000]');
                // 玩家金币
                initGold = $filters.numeral(playerBySeat[playerIndex].gold, '0,0.[0000]');
                ownGold = $filters.numeral(msg.players[playerIndex].ownGold, '0,0.[0000]');

                return $t('game.log.replayMahjong.settlement') + '<p>' + billsCoins.join('<p/><p>') + '<p/>' + '<p class="text-warning-custom">' + $t('game.log.replayMahjong.total') + totalGold + $t('game.log.replayMahjong.gainGold') + gainGold + $t('game.log.replayMahjong.pumpGold') + pumpGold + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayMahjong.initGold') + initGold + $t('game.log.replayMahjong.ownGold') + ownGold + '</p>';
            }

            // 解析后的字符串
            var msgDesc = '';
            // 每步行为
            item.route = item.route instanceof Object ? item.route.route : item.route;
            switch (item.route) {
                case 's_roomInfo':
                    msgDesc = $t('game.log.replayMahjong.roomInfo');
                    break;
                case 's_startNewRound':
                    // return '开始游戏'
                    msgDesc = $t('game.log.replayMahjong.startNewRound') + '（' + playerBySeat[item.msg.dealer].account_id + '）';
                    break;
                case 's_initHandCards':
                    // return '发手牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.cards') + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_playerSelectHSZ':
                    // return '玩家选择换三张'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.cardExchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                    break;
                case 's_HSZCardExchanged':
                    // return '交换牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ' ' + s_HSZCardExchanged_type(item.msg.type) + $t('game.log.replayMahjong.exchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                    break;
                case 's_roomHSZFinished':
                    msgDesc = $t('game.log.replayMahjong.doneExcluded');
                    break;
                case 's_playerSelectColor':
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerSelectColor');
                    break;
                case 's_playerColorSelected':
                    // return '玩家定缺牌'
                    msgDesc = s_playerColorSelected(item.msg, playerBySeat);
                    break;
                case 's_curPlay':
                    msgDesc = $t('game.log.replayMahjong.curPlayer');
                    break;
                case 's_playCard':
                    // return '玩家打牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayMahjong.discard') + '\u3010') + cardToColor(item.msg.card) + '】';
                    break;
                case 's_newCard':
                    // return '玩家摸牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayMahjong.draw') + '\u3010') + cardToColor(item.msg.card) + '】';
                    break;
                case 's_hangupTask':
                    // return '挂起任务（胡杠碰）'
                    msgDesc = s_hangupTask(item.playerIndex, item.msg, playerBySeat);
                    // 最后加入【过】选项
                    if (!item.msg.hidePass) {
                        msgDesc = msgDesc + ',' + playerBySeat[item.playerIndex].account_id + ('\u3010' + $t('game.log.replayMahjong.pass') + '\u3011');
                    }
                    break;
                case 's_playerGangCard':
                    // return '玩家杠牌'
                    msgDesc = s_playerGangCard(item.msg, playerBySeat);
                    break;
                case 's_playerPengCard':
                    // return '金币飘分'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayMahjong.pong') + '\u3010') + cardToColor(item.msg.card) + '】：' + playerBySeat[item.msg.from].account_id;
                    break;
                case 's_playerHu':
                    // return '玩家胡牌'
                    msgDesc = s_playerHu(item.msg, playerBySeat);
                    break;
                case 's_syncGold':
                    // return '金币飘分'
                    msgDesc = s_syncGold(item.msg, playerBySeat, $filters);
                    break;
                case 's_passTask':
                    // return '点击跳过'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ('\u3010' + $t('game.log.replayMahjong.pass') + '\u3011');
                    break;
                case 's_trustee':
                    // return '玩家托管、取消托管'
                    msgDesc = playerBySeat[item.playerIndex].account_id + (item.msg.isTrustee ? '\u3010' + $t('game.log.replayMahjong.AIControl') + '\u3011' : '\u3010' + $t('game.log.replayMahjong.cancelAIControl') + '\u3011');
                    break;
                case 's_roundSettlement':
                    // return '牌局结算'
                    msgDesc = s_roundSettlement(item.playerIndex, item.msg, playerBySeat, $filters);
                    break;
                case 's_playerOffline':
                    // return '离线
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerOffline');
                    break;
                case 's_playerReconnect':
                    // return '重连
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerReconnect');
                    break;
            }
            if (item.isTrustee) {
                msgDesc += '\u3010' + $t('game.log.replayMahjong.system') + '\u3011';
            }
            return msgDesc;
        }
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.uid + '.' + data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取游戏详情
            this.getDetailMahjong(key, data);
        },
        getDetailMahjong: function getDetailMahjong(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getPlayback', {
                params: {
                    operator_id: data.operator_id,
                    account_id: data.account_id,
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                    _this.dialogVisible = false;
                }
            });
        }
    }
});

/***/ }),

/***/ 1183:
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
        width: "690px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
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
                !_vm.recordLoading
                  ? _c("div", [
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        [
                          _vm.recordData.data.length > 0
                            ? _c(
                                "el-row",
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.gameName"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.game_name))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.roomId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.room_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.reportId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.report_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.startDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[0]
                                                      .timestamp
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.endDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[
                                                      _vm.recordData.data
                                                        .length - 1
                                                    ].timestamp
                                                }
                                              })
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
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.betBase"
                                                )
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    _vm.data.bet_base,
                                                    "0,0.[0000]"
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.seat1"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[1]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[1].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.seat2"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[2]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[2].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.seat3"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[3]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[3].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayMahjong.seat4"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[4]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[4].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
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
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "list-space" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        _vm._l(_vm.recordData.data, function(item, index) {
                          return _vm.routeActive.indexOf(item.route) >= 0
                            ? _c(
                                "div",
                                { key: index, staticClass: "action-list-item" },
                                [
                                  _vm._v("\n                            【"),
                                  _c("component-page-timestamp", {
                                    attrs: { timestamp: item.timestamp }
                                  }),
                                  _vm._v("】\n                            "),
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.$options.filters.mahjongPlayback(
                                          item,
                                          _vm.playerBySeat,
                                          _vm.$options.filters,
                                          _vm.t
                                        )
                                      )
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        })
                      )
                    ])
                  : _vm._e()
              ]
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
    require("vue-hot-reload-api")      .rerender("data-v-1a653204", module.exports)
  }
}

/***/ }),

/***/ 1184:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1185)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1187)
/* template */
var __vue_template__ = __webpack_require__(1188)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0c1f1c84"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/ItemPlaybackNiuniu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c1f1c84", Component.options)
  } else {
    hotAPI.reload("data-v-0c1f1c84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1185:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1186);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("0f43623a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0c1f1c84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackNiuniu.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0c1f1c84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackNiuniu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n[data-v-0c1f1c84] .el-dialog__body {\n  padding: 0;\n  overflow: auto;\n  height: 540px;\n}\n.detail-container[data-v-0c1f1c84] {\n  min-height: 540px;\n}\n.detail-content[data-v-0c1f1c84] {\n  padding: 15px 20px 30px;\n}\n.detail-container .el-form-item[data-v-0c1f1c84] {\n  margin-bottom: 0;\n}\n.detail-container[data-v-0c1f1c84] label {\n  color: #909399;\n}\n.icon-coins[data-v-0c1f1c84] {\n  color: #FFA500;\n}\n.action-list-item[data-v-0c1f1c84] {\n  padding: 7px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1187:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemPlaybackNiuniu",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {
                data: [],
                player: {}
            },
            recordDataLIst: [],
            routeExcept: ['s_roomInfo']
        };
    },

    computed: {
        playersByPlayback: function playersByPlayback() {
            var players = [];
            if (this.recordData.data.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.recordData.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;

                        if (v.route == 's_roomInfo') {
                            players = v.msg.players;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return players;
        },
        playerBySeat: function playerBySeat() {
            var playerBySeat = { 1: {}, 2: {}, 3: {}, 4: {} };
            if (this.recordData.data.length > 0) {
                var players = this.playersByPlayback;
                var dbPlayer = this.recordData.player;
                for (var seat in players) {
                    if (typeof dbPlayer[players[seat].uid] != 'undefined') {
                        players[seat].account_id = '<span class="text-primary-custom">' + dbPlayer[players[seat].uid].account_id + '</span>';
                    } else {
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].uid + '</span>';
                    }
                    // 数据替换
                    playerBySeat[seat] = players[seat];
                }
            }
            return playerBySeat;
        }
    },
    filters: {
        mahjongPlayback: function mahjongPlayback(item, playerBySeat, $filters, $t) {
            // 数字转麻将牌【单张】
            function cardToColor(card) {
                var numbers = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K' };
                if (100 < card && card < 200) {
                    return $t('game.log.replayNiuniu.blackhead') + numbers[card % 100];
                } else if (200 < card && card < 300) {
                    return $t('game.log.replayNiuniu.redHeart') + numbers[card % 100];
                } else if (300 < card && card < 400) {
                    return $t('game.log.replayNiuniu.plum') + numbers[card % 100];
                } else if (400 < card && card < 500) {
                    return $t('game.log.replayNiuniu.square') + numbers[card % 100];
                }
            }

            // 数字转扑克【手牌】
            function s_initHandCards_cards(cards) {
                var colors = [];
                for (var i in cards) {
                    colors.push(cardToColor(cards[i]));
                }
                return colors;
            }

            // 【玩家可抢庄倍数】
            function s_robDealerMulti(playerIndex, msg, playerBySeat) {
                var multiArray = [];
                for (var i in msg) {
                    if (msg[i] && i > 0) {
                        multiArray.push('【' + i + ($t('game.log.replayNiuniu.times') + '\u3011'));
                    }
                }
                return playerBySeat[playerIndex].account_id + $t('game.log.replayNiuniu.robDealerMulti') + multiArray.join();
            }

            // 【玩家可押注倍数】
            function s_addAnteMulti(playerIndex, msg, playerBySeat) {
                var multiArray = [];
                for (var i in msg) {
                    if (msg[i] && i > 0) {
                        multiArray.push('【' + i + ($t('game.log.replayNiuniu.times') + '\u3011'));
                    }
                }
                return playerBySeat[playerIndex].account_id + $t('game.log.replayNiuniu.addAnteMulti') + multiArray.join();
            }

            // 【牌局结算】
            function s_roundSettlement(msg, playerBySeat, $filters) {
                var totalGold = 0,
                    gainGold = 0,
                    pumpGold = 0;
                var initGold = 0,
                    ownGold = 0;

                var playerCoins = [];
                for (var seat in msg) {
                    if (isNaN(seat)) {
                        continue;
                    }
                    // 金币盈亏
                    gainGold = $filters.numeral(msg[seat].gainGold, '0,0.[0000]');
                    pumpGold = $filters.numeral(msg[seat].pumpGold, '0,0.[0000]');
                    totalGold = $filters.numeral(msg[seat].gainGold + msg[seat].pumpGold, '0,0.[0000]');
                    // 玩家金币
                    initGold = $filters.numeral(playerBySeat[seat].gold, '0,0.[0000]');
                    ownGold = $filters.numeral(msg[seat].ownGold, '0,0.[0000]');

                    playerCoins.push('<p class="mt-3">' + $t('game.log.replayNiuniu.player') + playerBySeat[seat].account_id + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayNiuniu.total') + totalGold + $t('game.log.replayNiuniu.gainGold') + gainGold + $t('game.log.replayNiuniu.pumpGold') + pumpGold + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayNiuniu.initGold') + initGold + $t('game.log.replayNiuniu.ownGold') + ownGold + '</p>');
                }
                return $t('game.log.replayNiuniu.settlement') + playerCoins.join('');
            }

            // 解析后的字符串
            var msgDesc = '';
            // 每步行为
            switch (item.route) {
                case 's_roomInfo':
                    msgDesc = $t('game.log.replayNiuniu.roomInfo');
                    break;
                case 's_startNewRound':
                    msgDesc = $t('game.log.replayNiuniu.startNewRound');
                    break;
                case 's_startRobDealer':
                    msgDesc = $t('game.log.replayNiuniu.startRobDealer');
                    break;
                case 's_robDealerMulti':
                    // return '玩家可抢庄倍数'
                    msgDesc = s_robDealerMulti(item.playerIndex, item.msg, playerBySeat);
                    break;
                case 's_playerRobDealer':
                    // return '玩家抢庄'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playerRobDealer') + (item.msg.multi > 0 ? '【' + item.msg.multi + ($t('game.log.replayNiuniu.times') + '\u3011') : '\u3010' + $t('game.log.replayNiuniu.notRobDealer') + '\u3011') + (item.msg.isTrustee ? '\u3010' + $t('game.log.replayNiuniu.system') + '\u3011' : '');
                    break;
                case 's_dealerChanged':
                    // return '定庄完成'
                    msgDesc = playerBySeat[item.msg.dealer].account_id + $t('game.log.replayNiuniu.dealerChanged');
                    break;
                case 's_startAddAnte':
                    msgDesc = $t('game.log.replayNiuniu.startAddAnte');
                    break;
                case 's_addAnteMulti':
                    // return '玩家可押注倍数'
                    msgDesc = s_addAnteMulti(item.playerIndex, item.msg, playerBySeat);
                    break;
                case 's_playerAddAnte':
                    // return '玩家押注'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playerAddAnte') + (item.msg.multi > 0 ? '【' + item.msg.multi + ($t('game.log.replayNiuniu.times') + '\u3011') : '\u3010' + $t('game.log.replayNiuniu.notAddAnte') + '\u3011') + (item.msg.isTrustee ? '\u3010' + $t('game.log.replayNiuniu.system') + '\u3011' : '');
                    break;
                case 's_addAnteFinish':
                    msgDesc = $t('game.log.replayNiuniu.addAnteFinish');
                    break;
                case 's_initHandCards':
                    // return '发手牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.cards') + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_startPlayCards':
                    msgDesc = $t('game.log.replayNiuniu.startPlayCards');
                    break;
                case 's_playCards':
                    // return '选牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playCards') + (item.msg.selectedCards ? s_initHandCards_cards(item.msg.selectedCards).join() : '\u3010' + $t('game.log.replayNiuniu.notPlayCards') + '\u3011');
                    break;
                case 's_playCardsFinish':
                    msgDesc = $t('game.log.replayNiuniu.playCardsFinish');
                    break;
                case 's_startOpenCard':
                    msgDesc = $t('game.log.replayNiuniu.startOpenCard');
                    break;
                case 's_openCard':
                    // return '玩家摊牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayNiuniu.playOpenCard');
                    break;
                case 's_openCardFinish':
                    msgDesc = $t('game.log.replayNiuniu.openCardFinish');
                    break;
                case 's_roundSettlement':
                    // return '牌局结算'
                    msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
                    break;
                case 's_playerOffline':
                    // return '离线
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerOffline');
                    break;
                case 's_playerReconnect':
                    // return '重连
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayMahjong.playerReconnect');
                    break;
            }
            if (item.isTrustee) {
                msgDesc += '\u3010' + $t('game.log.replayMahjong.system') + '\u3011';
            }
            return msgDesc;
        }
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.uid + '.' + data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取游戏详情
            this.getDetailMahjong(key, data);
        },
        getDetailMahjong: function getDetailMahjong(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getPlayback', {
                params: {
                    operator_id: data.operator_id,
                    account_id: data.account_id,
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                    _this.dialogVisible = false;
                }
            });
        }
    }
});

/***/ }),

/***/ 1188:
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
        title: _vm.$t("game.log.replayNiuniu.title"),
        width: "690px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
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
                !_vm.recordLoading
                  ? _c("div", [
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        [
                          _vm.recordData.data.length > 0
                            ? _c(
                                "el-row",
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.gameName"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.game_name))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.roomId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.room_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.reportId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.report_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.startDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[0]
                                                      .timestamp
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.endDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[
                                                      _vm.recordData.data
                                                        .length - 1
                                                    ].timestamp
                                                }
                                              })
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
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.betBase"
                                                )
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    _vm.data.bet_base,
                                                    "0,0.[0000]"
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.seat1"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[1]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[1].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.seat2"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[2]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[2].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.seat3"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[3]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[3].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayNiuniu.seat4"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[4]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[4].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
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
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "list-space" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        _vm._l(_vm.recordData.data, function(item, index) {
                          return _vm.routeExcept.indexOf(item.route) < 0
                            ? _c(
                                "div",
                                { key: index, staticClass: "action-list-item" },
                                [
                                  _vm._v("\n                            【"),
                                  _c("component-page-timestamp", {
                                    attrs: { timestamp: item.timestamp }
                                  }),
                                  _vm._v("】\n                            "),
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.$options.filters.mahjongPlayback(
                                          item,
                                          _vm.playerBySeat,
                                          _vm.$options.filters,
                                          _vm.t
                                        )
                                      )
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        })
                      )
                    ])
                  : _vm._e()
              ]
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
    require("vue-hot-reload-api")      .rerender("data-v-0c1f1c84", module.exports)
  }
}

/***/ }),

/***/ 1189:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1190)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1192)
/* template */
var __vue_template__ = __webpack_require__(1193)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3ae08a2a"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/ItemPlaybackZjh.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ae08a2a", Component.options)
  } else {
    hotAPI.reload("data-v-3ae08a2a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1190:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1191);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("dd4a9612", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ae08a2a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackZjh.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ae08a2a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackZjh.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1191:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n[data-v-3ae08a2a] .el-dialog__body {\n  padding: 0;\n  overflow: auto;\n  height: 540px;\n}\n.detail-container[data-v-3ae08a2a] {\n  min-height: 540px;\n}\n.detail-content[data-v-3ae08a2a] {\n  padding: 15px 20px 30px;\n}\n.detail-container .el-form-item[data-v-3ae08a2a] {\n  margin-bottom: 0;\n}\n.detail-container[data-v-3ae08a2a] label {\n  color: #909399;\n}\n.icon-coins[data-v-3ae08a2a] {\n  color: #FFA500;\n}\n.action-list-item[data-v-3ae08a2a] {\n  padding: 7px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1192:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemPlaybackZjh",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {
                data: [],
                player: {}
            },
            recordDataLIst: [],
            routeExcept: ['s_roomInfo', 's_curPlay', 's_notifyCardsForTest', 's_operation']
        };
    },

    computed: {
        playersByPlayback: function playersByPlayback() {
            var players = [];
            if (this.recordData.data.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.recordData.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;

                        if (v.route == 's_roomInfo') {
                            players = v.msg.players;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return players;
        },
        playerBySeat: function playerBySeat() {
            var playerBySeat = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
            if (this.recordData.data.length > 0) {
                var players = this.playersByPlayback;
                var dbPlayer = this.recordData.player;
                for (var seat in players) {
                    if (typeof dbPlayer[players[seat].uid] != 'undefined') {
                        players[seat].account_id = '<span class="text-primary-custom">' + dbPlayer[players[seat].uid].account_id + '</span>';
                    } else {
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].uid + '</span>';
                    }
                    // 数据替换
                    playerBySeat[seat] = players[seat];
                }
            }
            return playerBySeat;
        }
    },
    filters: {
        mahjongPlayback: function mahjongPlayback(item, playerBySeat, $filters, $t) {
            // 数字转麻将牌【单张】
            function cardToColor(card) {
                var numbers = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K' };
                if (100 < card && card < 200) {
                    return $t('game.log.replayZjh.blackhead') + numbers[card % 100];
                } else if (200 < card && card < 300) {
                    return $t('game.log.replayZjh.redHeart') + numbers[card % 100];
                } else if (300 < card && card < 400) {
                    return $t('game.log.replayZjh.plum') + numbers[card % 100];
                } else if (400 < card && card < 500) {
                    return $t('game.log.replayZjh.square') + numbers[card % 100];
                }
            }

            // 数字转扑克【手牌】
            function s_initHandCards_cards(cards) {
                var colors = [];
                for (var i in cards.value) {
                    if (cards.type == 2) {
                        colors.push(cardToColor(i));
                    } else {
                        colors.push('*');
                    }
                }
                return colors;
            }

            // 【牌局结算】
            function s_roundSettlement(msg, playerBySeat, $filters) {
                var totalGold = 0,
                    gainGold = 0,
                    pumpGold = 0;
                var initGold = 0,
                    ownGold = 0;

                var playerCoins = [];
                for (var seat in msg) {
                    if (isNaN(seat)) {
                        continue;
                    }
                    // 金币盈亏
                    gainGold = $filters.numeral(msg[seat].gainGold, '0,0.[0000]');
                    pumpGold = $filters.numeral(msg[seat].pumpGold, '0,0.[0000]');
                    totalGold = $filters.numeral(msg[seat].gainGold + msg[seat].pumpGold, '0,0.[0000]');
                    // 玩家金币
                    initGold = $filters.numeral(playerBySeat[seat].gold, '0,0.[0000]');
                    ownGold = $filters.numeral(msg[seat].ownGold, '0,0.[0000]');

                    playerCoins.push('<p class="mt-3">' + $t('game.log.replayZjh.player') + playerBySeat[seat].account_id + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayZjh.total') + totalGold + $t('game.log.replayZjh.gainGold') + gainGold + $t('game.log.replayZjh.pumpGold') + pumpGold + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayZjh.initGold') + initGold + $t('game.log.replayZjh.ownGold') + ownGold + '</p>');
                }
                return $t('game.log.replayZjh.settlement') + playerCoins.join('');
            }

            // 解析后的字符串
            var msgDesc = '';
            // 每步行为
            switch (item.route) {
                case 's_roomInfo':
                    // 房间信息（游戏、玩家信息）
                    msgDesc = $t('game.log.replayZjh.roomInfo');
                    break;
                case 's_startNewRound':
                    // 开始游戏
                    msgDesc = $t('game.log.replayZjh.startNewRound');
                    break;
                case 's_playerHandCard':
                    // 玩家手牌
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.cards') + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_addBet':
                    // 1 跟注   2 加注  3比牌   4 底分
                    msgDesc = playerBySeat[item.playerIndex].account_id + '【' + $t('game.log.replayZjh.addBet' + item.msg.type) + '】' + item.msg.addBet + $t('game.log.replayZjh.coins');
                    break;
                case 's_curPlay':
                    // 切换到下一家
                    msgDesc = $t('game.log.replayZjh.curPlay') + playerBySeat[item.playerIndex].account_id;
                    break;
                case 's_operation':
                    // 玩家操作
                    msgDesc = $t('game.log.replayZjh.operation');
                    break;
                case 's_abandonCard':
                    // 玩家弃牌
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.abandonCard');
                    break;
                case 's_lookCard':
                    // 玩家看牌
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.lookCard') + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_compareCardResult':
                    // 比牌结果
                    msgDesc = $t('game.log.replayZjh.compareCardResult') + playerBySeat[item.msg.sourceIndex].account_id + $t('game.log.replayZjh.compareCard') + playerBySeat[item.msg.targetIndex].account_id + '，' + playerBySeat[item.msg.winIndex].account_id + '【' + $t('game.log.replayZjh.win') + '】' + playerBySeat[item.msg.FailIndex].account_id + '【' + $t('game.log.replayZjh.lose') + '】';
                    break;
                case 's_notify':
                    // 孤注一掷通知
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.notify');
                    break;
                case 's_guZhuYiZhi':
                    // 孤注一掷
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.guZhuYiZhi') + '【' + (item.msg.result == 1 ? $t('game.log.replayZjh.succeed') : $t('game.log.replayZjh.failed')) + '】';
                    break;
                case 's_roundMaxTurn':
                    // 最大轮数上限
                    msgDesc = $t('game.log.replayZjh.roundMaxTurn') + playerBySeat[item.playerIndex].account_id + '【' + (item.msg.result == 1 ? $t('game.log.replayZjh.succeed') : $t('game.log.replayZjh.failed')) + '】' + '，' + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_timeOutProject':
                    // 超时保护
                    msgDesc = playerBySeat[item.playerIndex].account_id + '【' + (item.msg.project == 1 ? $t('game.log.replayZjh.on') : $t('game.log.replayZjh.off')) + '】' + $t('game.log.replayZjh.timeOutProject');
                    break;
                case 's_roundSettlement':
                    // return '牌局结算'
                    msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
                    break;
                case 's_playerOffline':
                    // return '离线
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.playerOffline');
                    break;
                case 's_playerReconnect':
                    // return '重连
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayZjh.playerReconnect');
                    break;
            }
            if (item.isTrustee) {
                msgDesc += '\u3010' + $t('game.log.replayZjh.system') + '\u3011';
            }
            return msgDesc;
        }
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.uid + '.' + data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取游戏详情
            this.getDetailMahjong(key, data);
        },
        getDetailMahjong: function getDetailMahjong(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getPlayback', {
                params: {
                    operator_id: data.operator_id,
                    account_id: data.account_id,
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                    _this.dialogVisible = false;
                }
            });
        }
    }
});

/***/ }),

/***/ 1193:
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
        title: _vm.$t("game.log.replayZjh.title"),
        width: "690px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
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
                !_vm.recordLoading
                  ? _c("div", [
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        [
                          _vm.recordData.data.length > 0
                            ? _c(
                                "el-row",
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.gameName"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.game_name))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.roomId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.room_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.reportId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.report_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.startDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[0]
                                                      .timestamp
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.endDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[
                                                      _vm.recordData.data
                                                        .length - 1
                                                    ].timestamp
                                                }
                                              })
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
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayZjh.betBase"
                                                )
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    _vm.data.bet_base,
                                                    "0,0.[0000]"
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _vm._l(
                                            _vm.playersByPlayback,
                                            function(item, index) {
                                              return _c(
                                                "el-form-item",
                                                {
                                                  key: index,
                                                  attrs: {
                                                    label: _vm.$t(
                                                      "game.log.replayZjh.seat" +
                                                        index
                                                    )
                                                  }
                                                },
                                                [
                                                  _c("span", {
                                                    domProps: {
                                                      innerHTML: _vm._s(
                                                        _vm.playerBySeat[index]
                                                          .account_id
                                                      )
                                                    }
                                                  }),
                                                  _vm._v(
                                                    "\n                                        (" +
                                                      _vm._s(
                                                        _vm._f("numeral")(
                                                          _vm.playerBySeat[
                                                            index
                                                          ].gold,
                                                          "0,0.[0000]"
                                                        )
                                                      ) +
                                                      "\n                                        "
                                                  ),
                                                  _c("font-awesome-icon", {
                                                    staticClass: "icon-coins",
                                                    attrs: { icon: "coins" }
                                                  }),
                                                  _vm._v(
                                                    "\n                                        )\n                                    "
                                                  )
                                                ],
                                                1
                                              )
                                            }
                                          )
                                        ],
                                        2
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "list-space" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        _vm._l(_vm.recordData.data, function(item, index) {
                          return _vm.routeExcept.indexOf(item.route) < 0
                            ? _c(
                                "div",
                                { key: index, staticClass: "action-list-item" },
                                [
                                  _vm._v(
                                    "\n                            【\n                            "
                                  ),
                                  _c("component-page-timestamp", {
                                    attrs: { timestamp: item.timestamp }
                                  }),
                                  _vm._v(
                                    "\n                            】\n                            "
                                  ),
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.$options.filters.mahjongPlayback(
                                          item,
                                          _vm.playerBySeat,
                                          _vm.$options.filters,
                                          _vm.t
                                        )
                                      )
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        })
                      )
                    ])
                  : _vm._e()
              ]
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
    require("vue-hot-reload-api")      .rerender("data-v-3ae08a2a", module.exports)
  }
}

/***/ }),

/***/ 1194:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1195)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1197)
/* template */
var __vue_template__ = __webpack_require__(1198)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e420c69e"
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
Component.options.__file = "resources/assets/js/pages/game/log/play/ItemPlaybackDzmj.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e420c69e", Component.options)
  } else {
    hotAPI.reload("data-v-e420c69e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1195:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1196);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("fda6a4a0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e420c69e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackDzmj.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e420c69e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\xampp\\\\htdocs\\\\hs_agency\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemPlaybackDzmj.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1196:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n[data-v-e420c69e] .el-dialog__body {\n  padding: 0;\n  overflow: auto;\n  height: 540px;\n}\n.detail-container[data-v-e420c69e] {\n  min-height: 540px;\n}\n.detail-content[data-v-e420c69e] {\n  padding: 15px 20px 30px;\n}\n.detail-container .el-form-item[data-v-e420c69e] {\n  margin-bottom: 0;\n}\n.detail-container[data-v-e420c69e] label {\n  color: #909399;\n}\n.icon-coins[data-v-e420c69e] {\n  color: #FFA500;\n}\n.action-list-item[data-v-e420c69e] {\n  padding: 7px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1197:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemPlaybackDzmj",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {
                data: [],
                player: {}
            },
            recordDataLIst: [],
            routeActive: ['s_startNewRound', 's_initHandCards', 's_playerSelectHSZ', 's_HSZCardExchanged', 's_playerSelectColor', 's_playerColorSelected', 's_playCard', 's_newCard', 's_hangupTask', 's_playerGangCard', 's_playerPengCard', 's_playerHu', 's_syncGold', 's_passTask', 's_trustee', 's_roundSettlement', 's_playerOffline', 's_playerReconnect', 's_playerChiCard', 's_playerBaoTing', 's_playHua']
        };
    },

    computed: {
        playersByPlayback: function playersByPlayback() {
            var players = [];
            if (this.recordData.data.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.recordData.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;

                        if (v.route == 's_roomInfo') {
                            players = v.msg.players;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return players;
        },
        playerBySeat: function playerBySeat() {
            var playerBySeat = { 1: {}, 2: {}, 3: {}, 4: {} };
            if (this.recordData.data.length > 0) {
                var players = this.playersByPlayback;
                var dbPlayer = this.recordData.player;
                for (var seat in players) {
                    if (typeof dbPlayer[players[seat].uid] != 'undefined') {
                        players[seat].account_id = '<span class="text-primary-custom">' + dbPlayer[players[seat].uid].account_id + '</span>';
                    } else {
                        players[seat].account_id = '<span class="text-primary-custom">' + players[seat].uid + '</span>';
                    }
                    playerBySeat[seat] = players[seat];
                }
            }
            return playerBySeat;
        }
    },
    filters: {
        mahjongPlayback: function mahjongPlayback(item, playerBySeat, $filters, $t) {
            // 数字转麻将牌【单张】
            function cardToColor(card) {
                if (10 < card && card < 20) {
                    return card % 10 + $t('game.log.replayDzmj.dot');
                } else if (20 < card && card < 30) {
                    return card % 10 + $t('game.log.replayDzmj.bamboo');
                } else if (30 < card && card < 40) {
                    return card % 10 + $t('game.log.replayDzmj.character');
                } else if (40 < card && card < 50) {
                    return $t('game.log.replayDzmj.zi')[card % 10 - 1];
                } else if (50 < card && card < 60) {
                    return $t('game.log.replayDzmj.hua')[card % 10 - 1];
                }
            }

            // 番型转换
            function makeRoundPattern(patterns) {
                var data = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = patterns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var pattern = _step2.value;

                        data.push($t('game.log.replayDzmj.patternList')[pattern]);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return data.join();
            }

            // 数字转麻将牌【手牌】
            function s_initHandCards_cards(cards) {
                var colors = [];
                for (var card in cards) {
                    if (cards[card] > 1) {
                        for (var j = 0; j < cards[card]; j++) {
                            colors.push(cardToColor(card));
                        }
                    } else {
                        colors.push(cardToColor(card));
                    }
                }
                return colors;
            }

            // 数字转麻将牌【换三张】
            function s_HSZCardExchanged_cards(cards) {
                var colors = [];
                for (var i in cards) {
                    colors.push(cardToColor(cards[i]));
                }
                return colors;
            }

            // 换牌方向【换三张】
            function s_HSZCardExchanged_type(type) {
                switch (type) {
                    case 0:
                        return $t('game.log.replayDzmj.clockwise');
                    case 1:
                        return $t('game.log.replayDzmj.counterclockwise');
                    case 2:
                        return $t('game.log.replayDzmj.opposite');
                }
            }

            // 【玩家定缺牌】
            function s_playerColorSelected(msg, playerBySeat) {
                var playerColors = [];
                for (var seat in msg.players) {
                    var color = '';
                    switch (msg.players[seat]) {
                        case 1:
                            color = $t('game.log.replayDzmj.dot');
                            break;
                        case 2:
                            color = $t('game.log.replayDzmj.bamboo');
                            break;
                        case 3:
                            color = $t('game.log.replayDzmj.character');
                            break;
                    }
                    playerColors.push(playerBySeat[seat].account_id + ($t('game.log.replayDzmj.exclude') + '\u3010') + color + '】');
                }
                return $t('game.log.replayDzmj.playerExcludes') + playerColors.join();
            }

            // 【挂起任务】
            function s_hangupTask(playerIndex, msg, playerBySeat) {
                var hangupTasks = [];
                for (var type in msg.task) {
                    switch (type) {
                        case '1':
                            hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayDzmj.win') + '\u3010') + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】');
                            break;
                        case '2':
                            var gangArray = msg.task[type].gangArray;
                            for (var i in gangArray) {
                                hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayDzmj.kong') + '\u3010') + cardToColor(gangArray[i].card) + '】【' + playerBySeat[gangArray[i].from].account_id + '】');
                            }
                            break;
                        case '3':
                            hangupTasks.push(playerBySeat[playerIndex].account_id + ($t('game.log.replayDzmj.pong') + '\u3010') + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】');
                            break;
                        case '4':
                            var maxCards = msg.task[type].maxCards;
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = maxCards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var card = _step3.value;

                                    hangupTasks.push(playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.playerChiCard') + '【' + cardToColor(msg.task[type].card) + '】【' + playerBySeat[msg.task[type].from].account_id + '】' + '【' + cardToColor(card - 2) + cardToColor(card - 1) + cardToColor(card) + '】');
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                            break;
                        case '5':
                            var tings = msg.task[type].tings;
                            for (var _i in tings) {
                                for (var j in tings[_i].tings) {
                                    hangupTasks.push(playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.playerChiCard') + '【' + cardToColor(tings[_i].out) + '】' + $t('game.log.replayDzmj.playerTingCard') + '【' + cardToColor(tings[_i].tings[j].card) + '】' + tings[_i].tings[j].fan + $t('game.log.replayDzmj.unitMultiple') + '【' + makeRoundPattern(tings[_i].tings[j].pattern) + '】');
                                }
                            }
                            break;
                    }
                }
                return $t('game.log.replayDzmj.playerOperate') + hangupTasks.join();
            }

            // 【杠牌】
            function s_playerGangCard(msg, playerBySeat) {
                var windy = msg.gang == 1 ? $t('game.log.replayDzmj.windy-b') : $t('game.log.replayDzmj.windy-s');
                var raining = $t('game.log.replayDzmj.raining');
                var infoString = playerBySeat[msg.playerIndex].account_id + ($t('game.log.replayDzmj.kong') + '\u3010') + cardToColor(msg.card) + '】【' + ([1, 3].indexOf(msg.gang) >= 0 ? windy : raining) + '】：';
                var players = [];
                for (var i in msg.targets) {
                    players.push(playerBySeat[msg.targets[i]].account_id);
                }
                return infoString + players.join();
            }

            // 【胡牌】
            function s_playerHu(msg, playerBySeat) {
                var infoString = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayDzmj.win') + '\u3010') + cardToColor(item.msg.card) + '】';
                if (item.msg.gsh) {
                    infoString += '\u3010' + $t('game.log.replayDzmj.kongWin') + '\u3011';
                }
                if (item.msg.isZM) {
                    infoString += '\u3010' + $t('game.log.replayDzmj.ownDraw') + '\u3011';
                }
                return infoString + '：' + playerBySeat[item.msg.from].account_id;
            }

            // 【金币飘分】
            function s_syncGold(msg, playerBySeat, $filters) {
                var playerGolds = [];
                for (var seat in msg) {
                    var billType = $t('game.log.replayDzmj.billType')[msg[seat].type];
                    playerGolds.push(playerBySeat[seat].account_id + billType + '【' + $filters.numeral(msg[seat].info.gainGold + msg[seat].info.pumpGold, '0,0.[0000]') + ($t('game.log.replayDzmj.coins') + '\u3011'));
                }
                return playerGolds.join();
            }

            // 【吃牌】
            function s_playerChiCard(chiCards, playerBySeat) {
                var data = [];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = chiCards[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var v = _step4.value;

                        data.push(playerBySeat[v.playerIndex].account_id + '【' + cardToColor(v.selectCard) + '】' + $t('game.log.replayDzmj.playerChiCard') + playerBySeat[v.from].account_id + '【' + cardToColor(v.card) + '】');
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return data.join();
            }

            // 【补花】
            function s_playHua(playerIndex, msg, playerBySeat) {
                var huaInfo = [];
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = msg.huaInfo[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var v = _step5.value;

                        huaInfo.push(playerBySeat[playerIndex].account_id + $t('game.log.replayDzmj.playHua', {
                            cards: cardToColor(v.cards[0]),
                            newCards: cardToColor(v.newCards[0])
                        }));
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return huaInfo.join();
            }

            // 【牌局结算】
            function s_roundSettlement(msg, playerBySeat, $filters) {
                var dataPlayerList = [];
                for (var seat in msg.players) {
                    var totalGold = 0,
                        gainGold = 0,
                        pumpGold = 0;
                    var initGold = 0,
                        ownGold = 0;
                    var handCards = '',
                        chiCards = '',
                        huaCards = '',
                        huCards = '',
                        pengCards = '',
                        gangCards = '';
                    var roundPattern = '',
                        roundPatternScoreArray = '',
                        roundPatternScore = '';
                    // 玩家手牌

                    handCards = '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.cards') + s_initHandCards_cards(msg.players[seat].handCards).join() + '</p>';
                    // 赢家数据
                    if (seat == msg.winPlayer) {
                        // 吃牌
                        chiCards = !msg.players[seat].chiCards.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.playerChiCard') + '：' + s_HSZCardExchanged_cards(_.map(msg.players[seat].chiCards, 'card')).join() + '</p>';
                        // 花牌
                        huaCards = !msg.players[seat].huaCards.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.huaCard') + '：' + s_HSZCardExchanged_cards(msg.players[seat].huaCards).join() + '</p>';
                        // 胡牌
                        huCards = !msg.players[seat].huCards.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.win') + '：' + s_HSZCardExchanged_cards(msg.players[seat].huCards).join() + '</p>';
                        // 碰牌
                        pengCards = !msg.players[seat].pengCards.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.pong') + '：' + s_HSZCardExchanged_cards(msg.players[seat].pengCards).join() + '</p>';
                        // 杠牌
                        gangCards = !msg.players[seat].gangCards.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.kong') + '：' + s_HSZCardExchanged_cards(_.map(msg.players[seat].gangCards, 'card')).join() + '</p>';
                        // 番型
                        roundPattern = !msg.players[seat].roundPattern.length ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.roundPattern') + makeRoundPattern(msg.players[seat].roundPattern) + '</p>';
                        // 总倍数
                        roundPatternScore = !msg.players[seat].roundPatternScore ? '' : '<p>' + playerBySeat[seat].account_id + $t('game.log.replayDzmj.roundPatternScore') + msg.players[seat].roundPatternScore + $t('game.log.replayDzmj.unitMultiple') + '</p>';
                    }
                    // 金币盈亏
                    gainGold = $filters.numeral(msg.players[seat].gainGold, '0,0.[0000]');
                    pumpGold = $filters.numeral(msg.players[seat].pumpGold, '0,0.[0000]');
                    totalGold = $filters.numeral(msg.players[seat].gainGold + msg.players[seat].pumpGold, '0,0.[0000]');
                    // 玩家金币
                    initGold = $filters.numeral(playerBySeat[seat].gold, '0,0.[0000]');
                    ownGold = $filters.numeral(msg.players[seat].ownGold, '0,0.[0000]');
                    // 制作一个玩家数据
                    dataPlayerList.push(handCards + chiCards + huaCards + huCards + pengCards + gangCards + roundPattern + roundPatternScoreArray + roundPatternScore + '<p class="text-warning-custom">' + $t('game.log.replayDzmj.total') + totalGold + $t('game.log.replayDzmj.gainGold') + gainGold + $t('game.log.replayDzmj.pumpGold') + pumpGold + '</p>' + '<p class="text-warning-custom">' + $t('game.log.replayDzmj.initGold') + initGold + $t('game.log.replayDzmj.ownGold') + ownGold + '</p>');
                }

                return $t('game.log.replayDzmj.settlement') + '<div class="mt-3">' + dataPlayerList.join('<div/><div class="mt-3">') + '<div/>';
            }

            // 解析后的字符串
            var msgDesc = '';
            // 每步行为
            item.route = item.route instanceof Object ? item.route.route : item.route;
            switch (item.route) {
                case 's_roomInfo':
                    msgDesc = $t('game.log.replayDzmj.roomInfo');
                    break;
                case 's_startNewRound':
                    // return '开始游戏'
                    msgDesc = $t('game.log.replayDzmj.startNewRound') + '（' + playerBySeat[item.msg.dealer].account_id + '）';
                    break;
                case 's_initHandCards':
                    // return '发手牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.cards') + s_initHandCards_cards(item.msg.cards).join();
                    break;
                case 's_playerSelectHSZ':
                    // return '玩家选择换三张'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.cardExchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                    break;
                case 's_HSZCardExchanged':
                    // return '交换牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ' ' + s_HSZCardExchanged_type(item.msg.type) + $t('game.log.replayDzmj.exchanged') + s_HSZCardExchanged_cards(item.msg.cards).join();
                    break;
                case 's_roomHSZFinished':
                    msgDesc = $t('game.log.replayDzmj.doneExcluded');
                    break;
                case 's_playerSelectColor':
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerSelectColor');
                    break;
                case 's_playerColorSelected':
                    // return '玩家定缺牌'
                    msgDesc = s_playerColorSelected(item.msg, playerBySeat);
                    break;
                case 's_curPlay':
                    msgDesc = $t('game.log.replayDzmj.curPlayer');
                    break;
                case 's_playCard':
                    // return '玩家打牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayDzmj.discard') + '\u3010') + cardToColor(item.msg.card) + '】';
                    break;
                case 's_newCard':
                    // return '玩家摸牌'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayDzmj.draw') + '\u3010') + cardToColor(item.msg.card) + '】';
                    break;
                case 's_hangupTask':
                    // return '挂起任务（胡杠碰）'
                    msgDesc = s_hangupTask(item.playerIndex, item.msg, playerBySeat);
                    // 最后加入【过】选项
                    if (!item.msg.hidePass) {
                        msgDesc = msgDesc + ',' + playerBySeat[item.playerIndex].account_id + ('\u3010' + $t('game.log.replayDzmj.pass') + '\u3011');
                    }
                    break;
                case 's_playerGangCard':
                    // return '玩家杠牌'
                    msgDesc = s_playerGangCard(item.msg, playerBySeat);
                    break;
                case 's_playerPengCard':
                    // return '金币飘分'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ($t('game.log.replayDzmj.pong') + '\u3010') + cardToColor(item.msg.card) + '】：' + playerBySeat[item.msg.from].account_id;
                    break;
                case 's_playerHu':
                    // return '玩家胡牌'
                    msgDesc = s_playerHu(item.msg, playerBySeat);
                    break;
                case 's_syncGold':
                    // return '金币飘分'
                    msgDesc = s_syncGold(item.msg, playerBySeat, $filters);
                    break;
                case 's_passTask':
                    // return '点击跳过'
                    msgDesc = playerBySeat[item.playerIndex].account_id + ('\u3010' + $t('game.log.replayDzmj.pass') + '\u3011');
                    break;
                case 's_trustee':
                    // return '玩家托管、取消托管'
                    msgDesc = playerBySeat[item.playerIndex].account_id + (item.msg.isTrustee ? '\u3010' + $t('game.log.replayDzmj.AIControl') + '\u3011' : '\u3010' + $t('game.log.replayDzmj.cancelAIControl') + '\u3011');
                    break;
                case 's_roundSettlement':
                    // return '牌局结算'
                    msgDesc = s_roundSettlement(item.msg, playerBySeat, $filters);
                    break;
                case 's_playerOffline':
                    // return '离线'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerOffline');
                    break;
                case 's_playerReconnect':
                    // return '重连'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerReconnect');
                    break;
                case 's_playerChiCard':
                    // return '吃牌'
                    msgDesc = s_playerChiCard([item.msg], playerBySeat);
                    break;
                case 's_playerBaoTing':
                    // return '报听'
                    msgDesc = playerBySeat[item.playerIndex].account_id + $t('game.log.replayDzmj.playerBaoTing');
                    break;
                case 's_playHua':
                    // return '补花'
                    msgDesc = s_playHua(item.playerIndex, item.msg, playerBySeat);
                    break;
            }
            if (item.isTrustee) {
                msgDesc += '\u3010' + $t('game.log.replayDzmj.system') + '\u3011';
            }
            return msgDesc;
        }
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.uid + '.' + data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取游戏详情
            this.getDetailMahjong(key, data);
        },
        getDetailMahjong: function getDetailMahjong(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getPlayback', {
                params: {
                    operator_id: data.operator_id,
                    account_id: data.account_id,
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                    _this.dialogVisible = false;
                }
            });
        }
    }
});

/***/ }),

/***/ 1198:
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
        title: _vm.$t("game.log.replayDzmj.title"),
        width: "690px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
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
                !_vm.recordLoading
                  ? _c("div", [
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        [
                          _vm.recordData.data.length > 0
                            ? _c(
                                "el-row",
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.gameName"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.game_name))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.roomId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.room_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.reportId"
                                                )
                                              }
                                            },
                                            [_vm._v(_vm._s(_vm.data.report_id))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.startDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[0]
                                                      .timestamp
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.endDate"
                                                )
                                              }
                                            },
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp:
                                                    _vm.recordData.data[
                                                      _vm.recordData.data
                                                        .length - 1
                                                    ].timestamp
                                                }
                                              })
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
                                    "el-col",
                                    { attrs: { span: 12 } },
                                    [
                                      _c(
                                        "el-form",
                                        { attrs: { "label-width": "80px" } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.betBase"
                                                )
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("numeral")(
                                                    _vm.data.bet_base,
                                                    "0,0.[0000]"
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.seat1"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[1]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[1].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.seat2"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[2]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[2].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.seat3"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[3]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[3].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: _vm.$t(
                                                  "game.log.replayDzmj.seat4"
                                                )
                                              }
                                            },
                                            [
                                              _c("span", {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    _vm.playerBySeat[4]
                                                      .account_id
                                                  )
                                                }
                                              }),
                                              _vm._v(
                                                "\n                                        (" +
                                                  _vm._s(
                                                    _vm._f("numeral")(
                                                      _vm.playerBySeat[4].gold,
                                                      "0,0.[0000]"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              ),
                                              _c("font-awesome-icon", {
                                                staticClass: "icon-coins",
                                                attrs: { icon: "coins" }
                                              }),
                                              _vm._v(
                                                "\n                                        )\n                                    "
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
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "list-space" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "detail-content" },
                        _vm._l(_vm.recordData.data, function(item, index) {
                          return _vm.routeActive.indexOf(item.route) >= 0
                            ? _c(
                                "div",
                                { key: index, staticClass: "action-list-item" },
                                [
                                  _vm._v(
                                    "\n                            【\n                            "
                                  ),
                                  _c("component-page-timestamp", {
                                    attrs: { timestamp: item.timestamp }
                                  }),
                                  _vm._v(
                                    "\n                            】\n                            "
                                  ),
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.$options.filters.mahjongPlayback(
                                          item,
                                          _vm.playerBySeat,
                                          _vm.$options.filters,
                                          _vm.t
                                        )
                                      )
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        })
                      )
                    ])
                  : _vm._e()
              ]
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
    require("vue-hot-reload-api")      .rerender("data-v-e420c69e", module.exports)
  }
}

/***/ }),

/***/ 1199:
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
      staticClass: "page-content pt-2"
    },
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
                  "picker-options": _vm.GLOBAL.pickerOptionsLimit,
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
          _vm.initStatus
            ? _c(
                "el-form-item",
                [
                  _c("component-page-org-tree-option", {
                    attrs: { "current-org-id": _vm.$route.params.orgId },
                    on: { click: _vm.filterOrgChange }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-form-item",
            { staticClass: "el-form-item-medium" },
            [
              _c(
                "el-select",
                {
                  attrs: { placeholder: _vm.$t("form.gameId"), clearable: "" },
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
                    attrs: { label: _vm.$t("games." + item.id), value: item.id }
                  })
                })
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
            { staticClass: "el-form-item-small" },
            [
              _c(
                "el-select",
                {
                  attrs: {
                    placeholder: _vm.$t("form.logStatus"),
                    clearable: ""
                  },
                  on: { change: _vm.filterChange },
                  model: {
                    value: _vm.filterOption.status,
                    callback: function($$v) {
                      _vm.$set(_vm.filterOption, "status", $$v)
                    },
                    expression: "filterOption.status"
                  }
                },
                _vm._l(_vm.$t("form.logStatusList"), function(item, index) {
                  return _c("el-option", {
                    key: index,
                    attrs: { label: item.label, value: item.value }
                  })
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _vm.filterOption.keyword_type == 1
                ? _c(
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
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.filterOption.keyword_type == 2
                ? _c(
                    "el-input",
                    {
                      attrs: {
                        placeholder: _vm.$t("form.roomId"),
                        clearable: ""
                      },
                      model: {
                        value: _vm.filterOption.keyword,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
                      })
                    ],
                    1
                  )
                : _vm._e()
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
              label: _vm.$t("game.log.thLable.time"),
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
                      attrs: { timestamp: scope.row.create_time }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.orgName"),
              prop: "org_name"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "150",
              label: _vm.$t("game.log.thLable.leaveTime")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    typeof scope.row.ext.leave_time == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c("component-page-timestamp", {
                          attrs: { timestamp: scope.row.ext.leave_time }
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
              label: _vm.$t("game.log.thLable.gameId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.$t("games." + scope.row.game_id)) +
                        "\n                "
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
              label: _vm.$t("game.log.thLable.accountId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 1
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.account_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.account_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.roomId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 2
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.room_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.room_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "90",
              label: _vm.$t("game.log.thLable.sceneId")
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
              "min-width": "50",
              label: _vm.$t("game.log.thLable.role")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    typeof scope.row.ext.dealer == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c(
                          "span",
                          {
                            class: [
                              scope.row.ext.dealer == 1
                                ? "text-warning-custom"
                                : "text-primary-custom"
                            ]
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(
                                  scope.row.ext.dealer == 1
                                    ? _vm.$t("form.role[0].label")
                                    : _vm.$t("form.role[1].label")
                                ) +
                                "\n                    "
                            )
                          ]
                        )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.betBase")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.bet_base, "0,0.[0000]")
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
              "min-width": "70",
              label: _vm.$t("game.log.thLable.betNum")
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
              label: _vm.$t("game.log.thLable.gainGold")
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
              label: _vm.$t("game.log.thLable.platformCommission")
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
              label: _vm.$t("game.log.thLable.status")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.status == 1
                      ? _c("el-tag", { attrs: { size: "medium" } }, [
                          _vm._v(_vm._s(_vm.$t("form.logStatusList[0].label")))
                        ])
                      : scope.row.status == 2
                        ? _c(
                            "el-tag",
                            { attrs: { size: "medium", type: "warning" } },
                            [
                              _vm._v(
                                _vm._s(_vm.$t("form.logStatusList[1].label"))
                              )
                            ]
                          )
                        : scope.row.status == 3
                          ? _c(
                              "el-tag",
                              { attrs: { size: "medium", type: "danger" } },
                              [
                                _vm._v(
                                  _vm._s(_vm.$t("form.logStatusList[2].label"))
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
              label: _vm.$t("game.log.thLable.initGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    typeof scope.row.ext.init_gold == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.ext.init_gold,
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
              "min-width": "100",
              label: _vm.$t("game.log.thLable.ownGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.own_gold, "0,0.[0000]")
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
              "min-width": "140",
              label: _vm.$t("game.log.thLable.operation")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    [10001, 10002, 10003, 10004, 10005, 10006].indexOf(
                      scope.row.game_id
                    ) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogPlayerBills(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.detail")) +
                                "\n                    "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    [10001, 10002].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogPlaybackMahjong(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.replay")) +
                                "\n                    "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    [10003, 10004].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogPlaybackNiuniu(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.replay")) +
                                "\n                    "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    [10005].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogPlaybackZjh(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.replay")) +
                                "\n                    "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    [10006].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogPlaybackDzmj(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.replay")) +
                                "\n                    "
                            )
                          ]
                        )
                      : _vm._e()
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
                _vm.$set(_vm.filterOption, "page_size", $event)
              },
              "size-change": _vm.filterChange,
              "current-change": _vm.filterPageChange
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("item-bills", {
        attrs: { visible: _vm.dialog.visible.bills, data: _vm.dataItem },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "bills", $event)
          }
        }
      }),
      _vm._v(" "),
      _c("item-playback-mahjong", {
        attrs: {
          visible: _vm.dialog.visible.playbackMahjong,
          data: _vm.dataItem
        },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "playbackMahjong", $event)
          }
        }
      }),
      _vm._v(" "),
      _c("item-playback-niuniu", {
        attrs: {
          visible: _vm.dialog.visible.playbackNiuniu,
          data: _vm.dataItem
        },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "playbackNiuniu", $event)
          }
        }
      }),
      _vm._v(" "),
      _c("item-playback-zjh", {
        attrs: { visible: _vm.dialog.visible.playbackZjh, data: _vm.dataItem },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "playbackZjh", $event)
          }
        }
      }),
      _vm._v(" "),
      _c("item-playback-dzmj", {
        attrs: { visible: _vm.dialog.visible.playbackDzmj, data: _vm.dataItem },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "playbackDzmj", $event)
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
    require("vue-hot-reload-api")      .rerender("data-v-72d476f2", module.exports)
  }
}

/***/ }),

/***/ 1200:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1201)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1203)
/* template */
var __vue_template__ = __webpack_require__(1209)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1fffcb91"
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
Component.options.__file = "resources/assets/js/pages/game/log/multi/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fffcb91", Component.options)
  } else {
    hotAPI.reload("data-v-1fffcb91", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1202);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("71a8ed16", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1fffcb91\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1fffcb91\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1202:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-1fffcb91] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetailRbwar_vue__ = __webpack_require__(1204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetailRbwar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemDetailRbwar_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ItemDetailRbwar: __WEBPACK_IMPORTED_MODULE_0__ItemDetailRbwar_vue___default.a
    },
    name: "LogMulti",
    props: ['activeName'],
    data: function data() {
        return {
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
                org_id: '',
                game_id: '',
                scene_id: '',
                status: '',
                user_type: '',
                keyword: '',
                keyword_type: 1,
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
            },
            dialog: {
                visible: {
                    detailRbwar: false
                }
            },
            initStautsCache: false
        };
    },

    computed: {
        initStatus: function initStatus() {
            if (this.activeName == 'log-multi') {
                this.initStautsCache = true;
            }
            return this.initStautsCache;
        }
    },
    created: function created() {
        // 代理ID
        if (Boolean(this.$route.params.orgId)) {
            this.filterOption.org_id = this.$route.params.orgId;
        }
        // 搜索关键词
        if (Boolean(this.$route.params.accountId)) {
            this.filterOption.keyword = this.$route.params.accountId;
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 获取游戏列表
            this.getGameList();
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'log-multi') {
                return false;
            }
            axios.get('/common/getGameList', {
                params: { type: 2 }
            }).then(function (response) {
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

            if (this.activeName != 'log-multi') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/log/multi/getList', {
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
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_base, '0,0.[0000]');
            sums[7] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[8] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[9] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        },

        // 游戏详情【红黑大战】
        dialogDetailRbwar: function dialogDetailRbwar(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.detailRbwar = true;
        }
    }
});

/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1205)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1207)
/* template */
var __vue_template__ = __webpack_require__(1208)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-68219e5a"
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
Component.options.__file = "resources/assets/js/pages/game/log/multi/ItemDetailRbwar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68219e5a", Component.options)
  } else {
    hotAPI.reload("data-v-68219e5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1205:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1206);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("f58119ba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68219e5a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetailRbwar.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68219e5a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetailRbwar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1206:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.dialog-detail-rbwar[data-v-68219e5a] .el-dialog__body {\n    padding: 0;\n    height: 470px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1207:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemDetailRbwar",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {},
            recordDataLIst: []
        };
    },

    computed: {
        playerBillsTotal: function playerBillsTotal() {
            var betNum = {
                red: 0,
                black: 0,
                special: 0,
                total: 0
            };
            if (this.data.details && this.data.details.bills && this.data.details.bills.length) {
                for (var i in this.data.details.bills) {
                    if (this.data.details.bills[i].type == 8) {
                        var gainGold = Math.abs(this.data.details.bills[i].info.gainGold);
                        switch (this.data.details.bills[i].info.betCamp) {
                            case '1':
                                betNum.red += gainGold;
                                break;
                            case '2':
                                betNum.black += gainGold;
                                break;
                            case '3':
                                betNum.special += gainGold;
                                break;
                        }
                        betNum.total += gainGold;
                    }
                }
            }
            return betNum;
        }
    },
    filters: {
        pokerRoundPattern: function pokerRoundPattern(type, $t) {
            switch (type) {
                case 0:
                    return $t('game.log.detailRbwar.scattered');
                    break;
                case 1:
                    return $t('game.log.detailRbwar.pair');
                    break;
                case 2:
                    return $t('game.log.detailRbwar.straight');
                    break;
                case 3:
                    return $t('game.log.detailRbwar.goldFlower');
                    break;
                case 4:
                    return $t('game.log.detailRbwar.straightGold');
                    break;
                case 5:
                    return $t('game.log.detailRbwar.leopard');
                    break;
                default:
                    return $t('game.log.detailRbwar.scattered');
            }
        }
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取游戏详情
            this.getRecordDetails(key, data);
        },
        getRecordDetails: function getRecordDetails(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/getRecordDetails', {
                params: {
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 1208:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      staticClass: "dialog-detail-rbwar",
      attrs: {
        title: _vm.$t("game.log.detailRbwar.title"),
        width: "500px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
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
                staticClass: "p-3"
              },
              [
                _vm.recordData.gameInfo
                  ? _c("div", { staticClass: "pl-1" }, [
                      _c(
                        "div",
                        { staticClass: "pb-4" },
                        [
                          _vm._v(
                            "\n                        【" +
                              _vm._s(
                                _vm.recordData.gameInfo[1].isRoundWin
                                  ? _vm.$t("game.log.detailRbwar.earn")
                                  : _vm.$t("game.log.detailRbwar.loss")
                              ) +
                              "】" +
                              _vm._s(_vm.$t("game.log.detailRbwar.red")) +
                              "：\n                        "
                          ),
                          _vm._l(_vm.recordData.gameInfo[1].handCards, function(
                            item,
                            index
                          ) {
                            return _c("span", { key: index }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(index > 0 ? "," : "") +
                                  _vm._s(_vm._f("hsPokerCardToColor")(item)) +
                                  "\n                        "
                              )
                            ])
                          }),
                          _vm._v(
                            "\n                        【" +
                              _vm._s(
                                _vm._f("pokerRoundPattern")(
                                  _vm.recordData.gameInfo[1].roundPattern,
                                  _vm.t
                                )
                              ) +
                              "】\n                    "
                          )
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "pb-4" },
                        [
                          _vm._v(
                            "\n                        【" +
                              _vm._s(
                                _vm.recordData.gameInfo[2].isRoundWin
                                  ? _vm.$t("game.log.detailRbwar.earn")
                                  : _vm.$t("game.log.detailRbwar.loss")
                              ) +
                              "】" +
                              _vm._s(_vm.$t("game.log.detailRbwar.black")) +
                              "：\n                        "
                          ),
                          _vm._l(_vm.recordData.gameInfo[2].handCards, function(
                            item,
                            index
                          ) {
                            return _c("span", { key: index }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(index > 0 ? "," : "") +
                                  _vm._s(_vm._f("hsPokerCardToColor")(item)) +
                                  "\n                        "
                              )
                            ])
                          }),
                          _vm._v(
                            "\n                        【" +
                              _vm._s(
                                _vm._f("pokerRoundPattern")(
                                  _vm.recordData.gameInfo[2].roundPattern,
                                  _vm.t
                                )
                              ) +
                              "】\n                    "
                          )
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "pb-4" }, [
                        _vm._v(
                          "\n                        【" +
                            _vm._s(
                              _vm.recordData.gameInfo[3].luckyWin
                                ? _vm.$t("game.log.detailRbwar.yes")
                                : _vm.$t("game.log.detailRbwar.no")
                            ) +
                            "】" +
                            _vm._s(_vm.$t("game.log.detailRbwar.special")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      !_vm.recordData.gameInfo[1].isRoundWin &&
                      !_vm.recordData.gameInfo[2].isRoundWin
                        ? _c(
                            "div",
                            { staticClass: "pb-4 text-danger-custom" },
                            [
                              _vm._v(
                                "\n                        【" +
                                  _vm._s(
                                    _vm.$t("game.log.detailRbwar.takesAll")
                                  ) +
                                  "】\n                    "
                              )
                            ]
                          )
                        : _vm._e()
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "list-space" }),
                _vm._v(" "),
                _c("div", { staticClass: "pt-4 pl-1" }, [
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      "【" +
                        _vm._s(_vm.$t("game.log.detailRbwar.red")) +
                        "】" +
                        _vm._s(_vm.$t("game.log.detailRbwar.betNum")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(
                            _vm.playerBillsTotal.red,
                            "0,0.[0000]"
                          )
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      "【" +
                        _vm._s(_vm.$t("game.log.detailRbwar.black")) +
                        "】" +
                        _vm._s(_vm.$t("game.log.detailRbwar.betNum")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(
                            _vm.playerBillsTotal.black,
                            "0,0.[0000]"
                          )
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      "【" +
                        _vm._s(_vm.$t("game.log.detailRbwar.special")) +
                        "】" +
                        _vm._s(_vm.$t("game.log.detailRbwar.betNum")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(
                            _vm.playerBillsTotal.special,
                            "0,0.[0000]"
                          )
                        )
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "pt-4 pl-2" }, [
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      _vm._s(_vm.$t("game.log.detailRbwar.betNumTotal")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(_vm.data.bet_num, "0,0.[0000]")
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      _vm._s(_vm.$t("game.log.detailRbwar.gainGold")) +
                        "：" +
                        _vm._s(_vm.data.gain_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(_vm.data.gain_gold, "0,0.[0000]")
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      _vm._s(
                        _vm.$t("game.log.detailRbwar.platformMultiCommission")
                      ) +
                        "：" +
                        _vm._s(_vm.data.income_gold > 0 ? "+" : "") +
                        _vm._s(
                          _vm._f("numeral")(_vm.data.income_gold, "0,0.[0000]")
                        )
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "pt-4 pl-2 pb-4" }, [
                  _vm.data.ext
                    ? _c("span", { staticClass: "pr-4" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("game.log.detailRbwar.initGold")) +
                            "：\n                        "
                        ),
                        typeof _vm.data.ext.init_gold == "undefined"
                          ? _c("span", [_vm._v("----")])
                          : _c("span", [
                              _vm._v(
                                _vm._s(
                                  _vm._f("numeral")(
                                    _vm.data.ext.init_gold,
                                    "0,0.[0000]"
                                  )
                                )
                              )
                            ])
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("span", { staticClass: "pr-4" }, [
                    _vm._v(
                      _vm._s(_vm.$t("game.log.detailRbwar.ownGold")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(_vm.data.own_gold, "0,0.[0000]")
                        )
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "list-space" }),
                _vm._v(" "),
                _vm.data.details &&
                _vm.data.details.bills &&
                _vm.data.details.bills.length
                  ? _c(
                      "el-table",
                      {
                        staticStyle: { width: "100%" },
                        attrs: { data: _vm.data.details.bills }
                      },
                      [
                        _c("el-table-column", {
                          attrs: { label: _vm.$t("game.log.detailRbwar.type") },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        scope.row.type == 7
                                          ? _vm.$t(
                                              "game.log.detailRbwar.settlement"
                                            )
                                          : _vm.$t(
                                              "game.log.detailRbwar.betNum"
                                            )
                                      ) +
                                      "\n                            "
                                  ),
                                  scope.row.info.betCamp == 1
                                    ? _c("span", [
                                        _vm._v(
                                          "【" +
                                            _vm._s(
                                              _vm.$t("game.log.detailRbwar.red")
                                            ) +
                                            "】"
                                        )
                                      ])
                                    : scope.row.info.betCamp == 2
                                      ? _c("span", [
                                          _vm._v(
                                            "【" +
                                              _vm._s(
                                                _vm.$t(
                                                  "game.log.detailRbwar.black"
                                                )
                                              ) +
                                              "】"
                                          )
                                        ])
                                      : scope.row.info.betCamp == 3
                                        ? _c("span", [
                                            _vm._v(
                                              "【" +
                                                _vm._s(
                                                  _vm.$t(
                                                    "game.log.detailRbwar.special"
                                                  )
                                                ) +
                                                "】"
                                            )
                                          ])
                                        : _vm._e()
                                ]
                              }
                            }
                          ])
                        }),
                        _vm._v(" "),
                        _c("el-table-column", {
                          attrs: {
                            label: _vm.$t("game.log.detailRbwar.gainGold")
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _vm._v(
                                    _vm._s(
                                      scope.row.info.gainGold > 0 ? "+" : ""
                                    ) +
                                      _vm._s(
                                        _vm._f("numeral")(
                                          scope.row.info.gainGold,
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
                            label: _vm.$t("game.log.detailRbwar.playerGold")
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("numeral")(
                                        scope.row.info.ownGold,
                                        "0,0.[0000]"
                                      )
                                    )
                                  )
                                ]
                              }
                            }
                          ])
                        })
                      ],
                      1
                    )
                  : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-68219e5a", module.exports)
  }
}

/***/ }),

/***/ 1209:
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
      staticClass: "page-content pt-2"
    },
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
                  "picker-options": _vm.GLOBAL.pickerOptionsLimit,
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
          _vm.initStatus
            ? _c(
                "el-form-item",
                [
                  _c("component-page-org-tree-option", {
                    attrs: { "current-org-id": _vm.$route.params.orgId },
                    on: { click: _vm.filterOrgChange }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-form-item",
            { staticClass: "el-form-item-medium" },
            [
              _c(
                "el-select",
                {
                  attrs: { placeholder: _vm.$t("form.gameId"), clearable: "" },
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
                    attrs: { label: _vm.$t("games." + item.id), value: item.id }
                  })
                })
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
            { staticClass: "el-form-item-small" },
            [
              _c(
                "el-select",
                {
                  attrs: {
                    placeholder: _vm.$t("form.logStatus"),
                    clearable: ""
                  },
                  on: { change: _vm.filterChange },
                  model: {
                    value: _vm.filterOption.status,
                    callback: function($$v) {
                      _vm.$set(_vm.filterOption, "status", $$v)
                    },
                    expression: "filterOption.status"
                  }
                },
                _vm._l(_vm.$t("form.logStatusList"), function(item, index) {
                  return _c("el-option", {
                    key: index,
                    attrs: { label: item.label, value: item.value }
                  })
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _vm.filterOption.keyword_type == 1
                ? _c(
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
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.filterOption.keyword_type == 2
                ? _c(
                    "el-input",
                    {
                      attrs: {
                        placeholder: _vm.$t("form.roomId"),
                        clearable: ""
                      },
                      model: {
                        value: _vm.filterOption.keyword,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
                      })
                    ],
                    1
                  )
                : _vm._e()
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
              label: _vm.$t("game.log.thLable.time"),
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
                      attrs: { timestamp: scope.row.create_time }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.orgName"),
              prop: "org_name"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "100",
              label: _vm.$t("game.log.thLable.gameId")
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
              label: _vm.$t("game.log.thLable.accountId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 1
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.account_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.account_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.roomId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 2
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.room_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.room_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "90",
              label: _vm.$t("game.log.thLable.sceneId")
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
              "min-width": "80",
              label: _vm.$t("game.log.thLable.betBase")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.bet_base, "0,0.[0000]")
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
              "min-width": "70",
              label: _vm.$t("game.log.thLable.betNum")
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
              label: _vm.$t("game.log.thLable.gainGold")
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
              label: _vm.$t("game.log.thLable.platformMultiCommission")
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
              label: _vm.$t("game.log.thLable.status")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.status == 1
                      ? _c("el-tag", { attrs: { size: "medium" } }, [
                          _vm._v(_vm._s(_vm.$t("form.logStatusList[0].label")))
                        ])
                      : scope.row.status == 2
                        ? _c(
                            "el-tag",
                            { attrs: { size: "medium", type: "warning" } },
                            [
                              _vm._v(
                                _vm._s(_vm.$t("form.logStatusList[1].label"))
                              )
                            ]
                          )
                        : scope.row.status == 3
                          ? _c(
                              "el-tag",
                              { attrs: { size: "medium", type: "danger" } },
                              [
                                _vm._v(
                                  _vm._s(_vm.$t("form.logStatusList[2].label"))
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
              label: _vm.$t("game.log.thLable.initGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    typeof scope.row.ext.init_gold == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.ext.init_gold,
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
              "min-width": "100",
              label: _vm.$t("game.log.thLable.ownGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.own_gold, "0,0.[0000]")
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
              "min-width": "140",
              label: _vm.$t("game.log.thLable.operation")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    [10008].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogDetailRbwar(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.details")) +
                                "\n                "
                            )
                          ]
                        )
                      : _vm._e()
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
                _vm.$set(_vm.filterOption, "page_size", $event)
              },
              "size-change": _vm.filterChange,
              "current-change": _vm.filterPageChange
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("item-detail-rbwar", {
        attrs: { visible: _vm.dialog.visible.detailRbwar, data: _vm.dataItem },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "detailRbwar", $event)
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
    require("vue-hot-reload-api")      .rerender("data-v-1fffcb91", module.exports)
  }
}

/***/ }),

/***/ 1210:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1211)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1213)
/* template */
var __vue_template__ = __webpack_require__(1219)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c8a53d88"
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
Component.options.__file = "resources/assets/js/pages/game/log/slot/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c8a53d88", Component.options)
  } else {
    hotAPI.reload("data-v-c8a53d88", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1211:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1212);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("0208b122", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c8a53d88\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c8a53d88\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1212:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-c8a53d88] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue__ = __webpack_require__(1214);
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



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ItemDetail: __WEBPACK_IMPORTED_MODULE_0__ItemDetail_vue___default.a
    },
    name: "LogSlot",
    props: ['activeName'],
    data: function data() {
        return {
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
                org_id: '',
                game_id: '',
                scene_id: '',
                spin_type: '',
                keyword: '',
                keyword_type: 1,
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
                gain_gold: 0,
                income_gold: 0
            },
            dialog: {
                visible: {
                    detail: false
                }
            },
            initStautsCache: false
        };
    },

    computed: {
        initStatus: function initStatus() {
            if (this.activeName == 'log-slot') {
                this.initStautsCache = true;
            }
            return this.initStautsCache;
        }
    },
    created: function created() {
        // 代理ID
        if (Boolean(this.$route.params.orgId)) {
            this.filterOption.org_id = this.$route.params.orgId;
        }
        // 搜索关键词
        if (Boolean(this.$route.params.accountId)) {
            this.filterOption.keyword = this.$route.params.accountId;
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 获取游戏列表
            this.getGameList();
            // 初始化数据
            if (!this.dataList.length) {
                // 获取列表数据
                this.getDataList();
            }
        }
    },
    methods: {
        // 获取游戏列表
        getGameList: function getGameList() {
            var _this = this;

            if (this.gameList.length || this.activeName != 'log-slot') {
                return false;
            }
            axios.get('/common/getGameList', {
                params: { type: 3 }
            }).then(function (response) {
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

            if (this.activeName != 'log-slot') {
                return false;
            }
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/log/slot/getList', {
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
        getSummaries: function getSummaries() {
            var sums = [this.$t('form.summaryText'), '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----', '----'];
            sums[6] = this.$options.filters.numeral(this.dataSumTotal.bet_num, '0,0.[0000]');
            sums[7] = (this.dataSumTotal.gain_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.gain_gold, '0,0.[0000]');
            sums[8] = (this.dataSumTotal.income_gold > 0 ? '+' : '') + this.$options.filters.numeral(this.dataSumTotal.income_gold, '0,0.[0000]');
            return sums;
        },

        // 游戏详情【红黑大战】
        dialogDetail: function dialogDetail(scope) {
            this.dataItem = scope.row;
            // // 显示模态框
            this.dialog.visible.detail = true;
        },

        // 导出数据
        exportCsv: function exportCsv() {
            var _this3 = this;

            this.loading = true;
            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            filterOptionCache.page = 1;
            filterOptionCache.page_size = 1;
            filterOptionCache.type = 3;
            axios.get('/app/log/slot/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this3.loading = false;
                if (response.data.resp_msg.code == 200) {
                    if (response.data.resp_data.count.total > 100000) {
                        _this3.$message({
                            type: 'error',
                            message: _this3.$t('messages.export-failed-exceed'),
                            showClose: true
                        });
                    } else {
                        filterOptionCache.page_size = response.data.resp_data.count.total;
                        window.open('/export/game/record?' + Object.keys(filterOptionCache).map(function (key) {
                            return encodeURIComponent(key) + "=" + encodeURIComponent(filterOptionCache[key]);
                        }).join("&"));
                    }
                } else {
                    _this3.$message({
                        type: 'error',
                        message: _this3.$t('messages.export-failed'),
                        showClose: true
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 1214:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1215)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1217)
/* template */
var __vue_template__ = __webpack_require__(1218)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-31b94a4a"
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
Component.options.__file = "resources/assets/js/pages/game/log/slot/ItemDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31b94a4a", Component.options)
  } else {
    hotAPI.reload("data-v-31b94a4a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1215:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1216);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(450)("c2d28358", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31b94a4a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31b94a4a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(208)(false);
// imports


// module
exports.push([module.i, "\n.dialog-detail-rbwar[data-v-31b94a4a] .el-dialog__body {\n    /*padding: 0;*/\n    /*height: 470px;*/\n}\n.iframe-container[data-v-31b94a4a] {\n    border: 0 none;\n    width: 100%;\n    height: 293px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1217:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemDetail",
    props: ['visible', 'data'],
    data: function data() {
        return {
            dialogVisible: false,
            recordLoading: false,
            recordData: {},
            recordDataLIst: [],
            base64String: ''
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
        t: function t() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.$t.apply(this, params);
        },
        initData: function initData(data) {
            // 读取缓存数据
            var key = data.report_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                this.initIframeLink(this.recordData);
                return;
            }
            // 获取游戏详情
            this.getRecordDetails(key, data);
        },
        getRecordDetails: function getRecordDetails(key, data) {
            var _this = this;

            this.recordLoading = true;
            axios.get('/app/log/slot/getRecordDetails', {
                params: {
                    report_id: data.report_id
                }
            }).then(function (response) {
                _this.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this.recordDataLIst[key] = response.data.resp_data;
                    _this.recordData = response.data.resp_data;
                    _this.initIframeLink(_this.recordData);
                } else {
                    _this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message,
                        showClose: true
                    });
                }
            });
        },
        initIframeLink: function initIframeLink(recordData) {
            this.$nextTick(function () {
                // Base64处理数据
                this.base64String = Base64.encode(JSON.stringify({
                    sceneId: this.data.scene_id,
                    data: recordData
                }));
            });
        }
    }
});

/***/ }),

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      staticClass: "dialog-detail-rbwar",
      attrs: {
        title: _vm.$t("game.log.detailSlot.title"),
        width: "560px",
        visible: _vm.dialogVisible
      },
      on: {
        "update:visible": function($event) {
          _vm.dialogVisible = $event
        },
        close: function($event) {
          _vm.$emit("update:visible", false)
        }
      }
    },
    [
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
          staticStyle: { "min-height": "300px" }
        },
        [
          Boolean(_vm.base64String)
            ? _c("iframe", {
                ref: "iframeResults",
                staticClass: "iframe-container",
                attrs: {
                  src: "/ges/slot/index.html?base64String=" + _vm.base64String
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-row",
            { staticClass: "mt-3", attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { span: 12 } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.$t("game.log.detailSlot.freeGame")) +
                    "：" +
                    _vm._s(
                      _vm.data.spin_type == 1
                        ? _vm.$t("game.log.detailSlot.yes")
                        : _vm.$t("game.log.detailSlot.no")
                    ) +
                    "\n            "
                )
              ]),
              _vm._v(" "),
              _c("el-col", { attrs: { span: 12 } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.$t("game.log.detailSlot.freeGameTrigger")) +
                    "：" +
                    _vm._s(
                      _vm.data.sactter == 1
                        ? _vm.$t("game.log.detailSlot.yes")
                        : _vm.$t("game.log.detailSlot.no")
                    ) +
                    "\n            "
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _vm.recordData.uid
            ? _c(
                "el-row",
                { staticClass: "mt-3", attrs: { gutter: 20 } },
                [
                  _c("el-col", { attrs: { span: 12 } }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("game.log.detailSlot.freeMulti")) +
                        "：" +
                        _vm._s(_vm.recordData.spinRes.freeMul) +
                        "\n            "
                    )
                  ]),
                  _vm._v(" "),
                  _c("el-col", { attrs: { span: 12 } }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("game.log.detailSlot.freeGameTimes")) +
                        "：" +
                        _vm._s(_vm.data.free_game_times) +
                        "\n            "
                    )
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "list-space mt-3" }),
          _vm._v(" "),
          _vm.recordData.uid
            ? _c(
                "el-row",
                { staticClass: "mt-3", attrs: { gutter: 20 } },
                [
                  _c("el-col", { attrs: { span: 12 } }, [
                    _vm._v(
                      _vm._s(_vm.$t("game.log.detailSlot.betNumTotal")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(_vm.data.bet_num, "0,0.[0000]")
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("el-col", { attrs: { span: 12 } }, [
                    _vm._v(
                      _vm._s(_vm.$t("game.log.detailSlot.totalWin")) +
                        "：" +
                        _vm._s(
                          _vm._f("numeral")(
                            _vm.recordData.spinRes.winGold,
                            "0,0.[0000]"
                          )
                        )
                    )
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-row",
            { staticClass: "mt-3", attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { span: 12 } }, [
                _vm._v(
                  _vm._s(_vm.$t("game.log.detailSlot.gainGold")) +
                    "：" +
                    _vm._s(_vm.data.gain_gold > 0 ? "+" : "") +
                    _vm._s(_vm._f("numeral")(_vm.data.gain_gold, "0,0.[0000]"))
                )
              ]),
              _vm._v(" "),
              _c("el-col", { attrs: { span: 12 } }, [
                _vm._v(
                  _vm._s(_vm.$t("game.log.detailSlot.platformGold")) +
                    "：" +
                    _vm._s(_vm.data.income_gold > 0 ? "+" : "") +
                    _vm._s(
                      _vm._f("numeral")(_vm.data.income_gold, "0,0.[0000]")
                    )
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-row",
            { staticClass: "mt-3", attrs: { gutter: 20 } },
            [
              _vm.data.ext
                ? _c("el-col", { attrs: { span: 12 } }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("game.log.detailSlot.initGold")) +
                        "：\n                "
                    ),
                    typeof _vm.data.ext.init_gold == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                _vm.data.ext.init_gold,
                                "0,0.[0000]"
                              )
                            )
                          )
                        ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("el-col", { attrs: { span: 12 } }, [
                _vm._v(
                  _vm._s(_vm.$t("game.log.detailSlot.ownGold")) +
                    "：" +
                    _vm._s(_vm._f("numeral")(_vm.data.own_gold, "0,0.[0000]"))
                )
              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-31b94a4a", module.exports)
  }
}

/***/ }),

/***/ 1219:
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
      staticClass: "page-content pt-2"
    },
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
                  "picker-options": _vm.GLOBAL.pickerOptionsLimit,
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
          _vm.initStatus
            ? _c(
                "el-form-item",
                [
                  _c("component-page-org-tree-option", {
                    attrs: { "current-org-id": _vm.$route.params.orgId },
                    on: { click: _vm.filterOrgChange }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-form-item",
            { staticClass: "el-form-item-medium" },
            [
              _c(
                "el-select",
                {
                  attrs: { placeholder: _vm.$t("form.sceneId"), clearable: "" },
                  on: { change: _vm.filterChange },
                  model: {
                    value: _vm.filterOption.scene_id,
                    callback: function($$v) {
                      _vm.$set(_vm.filterOption, "scene_id", $$v)
                    },
                    expression: "filterOption.scene_id"
                  }
                },
                _vm._l(_vm.$t("form.slotScenes"), function(item, index) {
                  return _c("el-option", {
                    key: index,
                    attrs: { label: item.label, value: item.value }
                  })
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { staticClass: "el-form-item-small" },
            [
              _c(
                "el-select",
                {
                  attrs: {
                    placeholder: _vm.$t("form.spinType"),
                    clearable: ""
                  },
                  on: { change: _vm.filterChange },
                  model: {
                    value: _vm.filterOption.spin_type,
                    callback: function($$v) {
                      _vm.$set(_vm.filterOption, "spin_type", $$v)
                    },
                    expression: "filterOption.spin_type"
                  }
                },
                _vm._l(_vm.$t("form.freeGame"), function(item, index) {
                  return _c("el-option", {
                    key: index,
                    attrs: { label: item.label, value: item.value }
                  })
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _vm.filterOption.keyword_type == 1
                ? _c(
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
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.filterOption.keyword_type == 2
                ? _c(
                    "el-input",
                    {
                      attrs: {
                        placeholder: _vm.$t("form.roomId"),
                        clearable: ""
                      },
                      model: {
                        value: _vm.filterOption.keyword,
                        callback: function($$v) {
                          _vm.$set(_vm.filterOption, "keyword", $$v)
                        },
                        expression: "filterOption.keyword"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            placeholder: _vm.$t("form.select")
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.filterOption.keyword_type,
                            callback: function($$v) {
                              _vm.$set(_vm.filterOption, "keyword_type", $$v)
                            },
                            expression: "filterOption.keyword_type"
                          }
                        },
                        _vm._l(_vm.keywordTypeList, function(item) {
                          return _c("el-option", {
                            key: item.id,
                            attrs: { label: item.name, value: item.id }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.filterChange },
                        slot: "append"
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
            "el-form-item",
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "danger",
                    plain: "",
                    icon: "el-icon-download"
                  },
                  on: { click: _vm.exportCsv }
                },
                [_vm._v(_vm._s(_vm.$t("form.export")))]
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
              label: _vm.$t("game.log.thLable.time"),
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
                      attrs: { timestamp: scope.row.create_time }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.orgName"),
              prop: "org_name"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "100",
              label: _vm.$t("game.log.thLable.gameId")
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
              label: _vm.$t("game.log.thLable.accountId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 1
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.account_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.account_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "80",
              label: _vm.$t("game.log.thLable.roomId")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm.filterOption.keyword_type == 2
                      ? _c("span", {
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$options.filters.hsFilterKeyword(
                                scope.row.room_id,
                                _vm.filterOption.keyword
                              )
                            )
                          }
                        })
                      : _c("span", [_vm._v(_vm._s(scope.row.room_id))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "120",
              label: _vm.$t("game.log.thLable.sceneId")
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
              label: _vm.$t("game.log.thLable.betNum")
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
              label: _vm.$t("game.log.thLable.gainGold")
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
              label: _vm.$t("game.log.thLable.platformGold")
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
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              "min-width": "100",
              label: _vm.$t("game.log.thLable.spinType")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.spin_type == 1
                      ? _c(
                          "el-tag",
                          { attrs: { size: "medium", type: "warning" } },
                          [_vm._v(_vm._s(_vm.$t("form.freeGame[0].label")))]
                        )
                      : _c("el-tag", { attrs: { size: "medium" } }, [
                          _vm._v(_vm._s(_vm.$t("form.freeGame[1].label")))
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
              label: _vm.$t("game.log.thLable.initGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    typeof scope.row.ext.init_gold == "undefined"
                      ? _c("span", [_vm._v("----")])
                      : _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeral")(
                                scope.row.ext.init_gold,
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
              "min-width": "100",
              label: _vm.$t("game.log.thLable.ownGold")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      _vm._s(
                        _vm._f("numeral")(scope.row.own_gold, "0,0.[0000]")
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
              "min-width": "140",
              label: _vm.$t("game.log.thLable.operation")
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    [10007].indexOf(scope.row.game_id) > -1
                      ? _c(
                          "el-button",
                          {
                            staticClass: "ml-0",
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.dialogDetail(scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.$t("game.log.thLable.details")) +
                                "\n                "
                            )
                          ]
                        )
                      : _vm._e()
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
                _vm.$set(_vm.filterOption, "page_size", $event)
              },
              "size-change": _vm.filterChange,
              "current-change": _vm.filterPageChange
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("item-detail", {
        attrs: { visible: _vm.dialog.visible.detail, data: _vm.dataItem },
        on: {
          "update:visible": function($event) {
            _vm.$set(_vm.dialog.visible, "detail", $event)
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
    require("vue-hot-reload-api")      .rerender("data-v-c8a53d88", module.exports)
  }
}

/***/ }),

/***/ 1220:
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
                            label: _vm.$t("game.log.classify.play"),
                            name: "log-play"
                          }
                        },
                        [
                          _c("log-play", {
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
                            label: _vm.$t("game.log.classify.multi"),
                            name: "log-multi"
                          }
                        },
                        [
                          _c("log-multi", {
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
                            label: _vm.$t("game.log.classify.slot"),
                            name: "log-slot"
                          }
                        },
                        [
                          _c("log-slot", {
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
    require("vue-hot-reload-api")      .rerender("data-v-ff4dc2b2", module.exports)
  }
}

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1167)
}
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(1169)
/* template */
var __vue_template__ = __webpack_require__(1220)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ff4dc2b2"
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
Component.options.__file = "resources/assets/js/pages/game/log/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff4dc2b2", Component.options)
  } else {
    hotAPI.reload("data-v-ff4dc2b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 356:
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

/***/ 450:
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

var listToStyles = __webpack_require__(356)

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


/***/ })

});