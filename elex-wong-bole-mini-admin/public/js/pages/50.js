webpackJsonp([50],{

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1555);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("a850f3da", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-987009b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-987009b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.game-container[data-v-987009b0] {\n  padding: 20px;\n}\n[data-v-987009b0] .setting-card {\n  position: relative;\n  max-width: 700px;\n}\n[data-v-987009b0] .setting-card__header {\n  padding: 10px 0;\n  border-bottom: 1px solid #EBEEF5;\n  font-size: 1rem;\n  color: #303133;\n}\n[data-v-987009b0] .setting-card__body {\n  padding-top: 20px;\n}\n[data-v-987009b0] .input-item {\n  width: 240px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__First_vue__ = __webpack_require__(1557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__First_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__First_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Second_vue__ = __webpack_require__(1562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Second_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Second_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Third_vue__ = __webpack_require__(1567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Third_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Third_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Fourth_vue__ = __webpack_require__(1572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Fourth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Fourth_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        SettingFirst: __WEBPACK_IMPORTED_MODULE_0__First_vue___default.a,
        SettingSecond: __WEBPACK_IMPORTED_MODULE_1__Second_vue___default.a,
        SettingThird: __WEBPACK_IMPORTED_MODULE_2__Third_vue___default.a,
        SettingFourth: __WEBPACK_IMPORTED_MODULE_3__Fourth_vue___default.a
    },
    data: function data() {
        return {
            activeName: 'name'
        };
    },
    mounted: function mounted() {
        // 初始化选中选项卡
        this.activeName = 'first';
    }
});

/***/ }),

/***/ 1557:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1558)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1560)
/* template */
var __vue_template__ = __webpack_require__(1561)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2850f3f4"
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
Component.options.__file = "resources/assets/js/pages/game/mohjong/setting/First.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2850f3f4", Component.options)
  } else {
    hotAPI.reload("data-v-2850f3f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1559);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("0d3cb29d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2850f3f4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./First.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2850f3f4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./First.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1559:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1560:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingFirst",
    props: ['activeName'],
    data: function data() {
        return {
            scene_id: 1001,
            initDataStatus: false,
            loading: true,
            data: {
                bet_max: {
                    type: 1,
                    value: 0
                },
                pump: {
                    type: 'end',
                    value: 0
                },
                ip_limit: 0,
                options: {
                    TDH: 0,
                    HSZ: 0,
                    JXW: 0,
                    MQZZ: 0,
                    YJJD: 0
                }
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorBetMax: function errorBetMax() {
            if (this.msg.code == 42000 && this.msg.errors['bet_max.value']) {
                return this.msg.errors['bet_max.value'][0];
            }
        },
        errorPump: function errorPump() {
            if (this.msg.code == 42000 && this.msg.errors['pump.value']) {
                return this.msg.errors['pump.value'][0];
            }
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (n == 'first' && !this.initDataStatus) {
                // 获取数据
                this.getData();
                // 标记已初始化
                this.initDataStatus = true;
            }
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        getData: function getData() {
            var _this = this;

            axios.get('/app/game/mohjong/config/getItem', {
                params: {
                    scene_id: this.scene_id
                }
            }).then(function (response) {
                _this.data = response.data.resp_data;
                _this.loading = false;
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 制作数据
            var dataCache = _.cloneDeep(this.data);
            dataCache.scene_id = this.scene_id;
            // 保存数据
            axios.post('/app/game/mohjong/config/update', dataCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1561:
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
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("常规设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-form-item",
                  {
                    attrs: {
                      label: "封顶番数",
                      error: _vm.errorBetMax,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.bet_max.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.bet_max, "type", $$v)
                          },
                          expression: "data.bet_max.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: 1 } }, [
                          _vm._v("不封顶")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: 2 } }, [
                          _vm._v("自定义")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.bet_max.type == 2
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入番数"
                                },
                                model: {
                                  value: _vm.data.bet_max.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.bet_max,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.bet_max.value"
                                }
                              },
                              [
                                _c("template", { slot: "append" }, [
                                  _vm._v("番")
                                ])
                              ],
                              2
                            )
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
                  {
                    attrs: {
                      label: "抽水方式",
                      error: _vm.errorPump,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.pump.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.pump, "type", $$v)
                          },
                          expression: "data.pump.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: "end" } }, [
                          _vm._v("结算抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "percent" } }, [
                          _vm._v("实时抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "fixed" } }, [
                          _vm._v("固定抽水金币")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.pump.type == "end"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "percent"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "fixed"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入金币数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "coins" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
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
                  { attrs: { label: "IP限制" } },
                  [
                    _c("el-switch", {
                      attrs: { "inactive-value": 0, "active-value": 1 },
                      model: {
                        value: _vm.data.ip_limit,
                        callback: function($$v) {
                          _vm.$set(_vm.data, "ip_limit", $$v)
                        },
                        expression: "data.ip_limit"
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
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("对局设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-row",
                  [
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "天地胡" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.TDH,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "TDH", $$v)
                                },
                                expression: "data.options.TDH"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "换三张" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.HSZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "HSZ", $$v)
                                },
                                expression: "data.options.HSZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "夹心五" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.JXW,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "JXW", $$v)
                                },
                                expression: "data.options.JXW"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "门清中章" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.MQZZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "MQZZ", $$v)
                                },
                                expression: "data.options.MQZZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "幺九将对" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.YJJD,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "YJJD", $$v)
                                },
                                expression: "data.options.YJJD"
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
                  "el-form-item",
                  { staticClass: "pt-4" },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary" },
                        on: { click: _vm.onSubmit }
                      },
                      [_vm._v("立即保存")]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "ml-2",
                        attrs: { href: "javascript:history.go(-1);" }
                      },
                      [_c("el-button", [_vm._v("取消")])],
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
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2850f3f4", module.exports)
  }
}

/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1563)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1565)
/* template */
var __vue_template__ = __webpack_require__(1566)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-96da47e4"
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
Component.options.__file = "resources/assets/js/pages/game/mohjong/setting/Second.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-96da47e4", Component.options)
  } else {
    hotAPI.reload("data-v-96da47e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1564);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("42733baa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-96da47e4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Second.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-96da47e4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Second.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1564:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1565:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingSecond",
    props: ['activeName'],
    data: function data() {
        return {
            scene_id: 1002,
            initDataStatus: false,
            loading: true,
            data: {
                bet_max: {
                    type: 1,
                    value: 0
                },
                pump: {
                    type: 'end',
                    value: 0
                },
                ip_limit: 0,
                options: {
                    TDH: 0,
                    HSZ: 0,
                    JXW: 0,
                    MQZZ: 0,
                    YJJD: 0
                }
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorBetMax: function errorBetMax() {
            if (this.msg.code == 42000 && this.msg.errors['bet_max.value']) {
                return this.msg.errors['bet_max.value'][0];
            }
        },
        errorPump: function errorPump() {
            if (this.msg.code == 42000 && this.msg.errors['pump.value']) {
                return this.msg.errors['pump.value'][0];
            }
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (n == 'second' && !this.initDataStatus) {
                // 获取数据
                this.getData();
                // 标记已初始化
                this.initDataStatus = true;
            }
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        getData: function getData() {
            var _this = this;

            axios.get('/app/game/mohjong/config/getItem', {
                params: {
                    scene_id: this.scene_id
                }
            }).then(function (response) {
                _this.data = response.data.resp_data;
                _this.loading = false;
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 制作数据
            var dataCache = _.cloneDeep(this.data);
            dataCache.scene_id = this.scene_id;
            // 保存数据
            axios.post('/app/game/mohjong/config/update', dataCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1566:
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
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("常规设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-form-item",
                  {
                    attrs: {
                      label: "封顶番数",
                      error: _vm.errorBetMax,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.bet_max.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.bet_max, "type", $$v)
                          },
                          expression: "data.bet_max.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: 1 } }, [
                          _vm._v("不封顶")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: 2 } }, [
                          _vm._v("自定义")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.bet_max.type == 2
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入番数"
                                },
                                model: {
                                  value: _vm.data.bet_max.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.bet_max,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.bet_max.value"
                                }
                              },
                              [
                                _c("template", { slot: "append" }, [
                                  _vm._v("番")
                                ])
                              ],
                              2
                            )
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
                  {
                    attrs: {
                      label: "抽水方式",
                      error: _vm.errorPump,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.pump.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.pump, "type", $$v)
                          },
                          expression: "data.pump.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: "end" } }, [
                          _vm._v("结算抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "percent" } }, [
                          _vm._v("实时抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "fixed" } }, [
                          _vm._v("固定抽水金币")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.pump.type == "end"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "percent"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "fixed"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入金币数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "coins" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
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
                  { attrs: { label: "IP限制" } },
                  [
                    _c("el-switch", {
                      attrs: { "inactive-value": 0, "active-value": 1 },
                      model: {
                        value: _vm.data.ip_limit,
                        callback: function($$v) {
                          _vm.$set(_vm.data, "ip_limit", $$v)
                        },
                        expression: "data.ip_limit"
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
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("对局设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-row",
                  [
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "天地胡" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.TDH,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "TDH", $$v)
                                },
                                expression: "data.options.TDH"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "换三张" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.HSZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "HSZ", $$v)
                                },
                                expression: "data.options.HSZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "夹心五" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.JXW,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "JXW", $$v)
                                },
                                expression: "data.options.JXW"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "门清中章" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.MQZZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "MQZZ", $$v)
                                },
                                expression: "data.options.MQZZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "幺九将对" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.YJJD,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "YJJD", $$v)
                                },
                                expression: "data.options.YJJD"
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
                  "el-form-item",
                  { staticClass: "pt-4" },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary" },
                        on: { click: _vm.onSubmit }
                      },
                      [_vm._v("立即保存")]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "ml-2",
                        attrs: { href: "javascript:history.go(-1);" }
                      },
                      [_c("el-button", [_vm._v("取消")])],
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
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-96da47e4", module.exports)
  }
}

/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1568)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1570)
/* template */
var __vue_template__ = __webpack_require__(1571)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7df3f586"
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
Component.options.__file = "resources/assets/js/pages/game/mohjong/setting/Third.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7df3f586", Component.options)
  } else {
    hotAPI.reload("data-v-7df3f586", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1568:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1569);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("58fa5328", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7df3f586\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Third.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7df3f586\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Third.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1569:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1570:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingThird",
    props: ['activeName'],
    data: function data() {
        return {
            scene_id: 1003,
            initDataStatus: false,
            loading: true,
            data: {
                bet_max: {
                    type: 1,
                    value: 0
                },
                pump: {
                    type: 'end',
                    value: 0
                },
                ip_limit: 0,
                options: {
                    TDH: 0,
                    HSZ: 0,
                    JXW: 0,
                    MQZZ: 0,
                    YJJD: 0
                }
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorBetMax: function errorBetMax() {
            if (this.msg.code == 42000 && this.msg.errors['bet_max.value']) {
                return this.msg.errors['bet_max.value'][0];
            }
        },
        errorPump: function errorPump() {
            if (this.msg.code == 42000 && this.msg.errors['pump.value']) {
                return this.msg.errors['pump.value'][0];
            }
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (n == 'third' && !this.initDataStatus) {
                // 获取数据
                this.getData();
                // 标记已初始化
                this.initDataStatus = true;
            }
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        getData: function getData() {
            var _this = this;

            axios.get('/app/game/mohjong/config/getItem', {
                params: {
                    scene_id: this.scene_id
                }
            }).then(function (response) {
                _this.data = response.data.resp_data;
                _this.loading = false;
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 制作数据
            var dataCache = _.cloneDeep(this.data);
            dataCache.scene_id = this.scene_id;
            // 保存数据
            axios.post('/app/game/mohjong/config/update', dataCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1571:
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
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("常规设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-form-item",
                  {
                    attrs: {
                      label: "封顶番数",
                      error: _vm.errorBetMax,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.bet_max.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.bet_max, "type", $$v)
                          },
                          expression: "data.bet_max.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: 1 } }, [
                          _vm._v("不封顶")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: 2 } }, [
                          _vm._v("自定义")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.bet_max.type == 2
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入番数"
                                },
                                model: {
                                  value: _vm.data.bet_max.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.bet_max,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.bet_max.value"
                                }
                              },
                              [
                                _c("template", { slot: "append" }, [
                                  _vm._v("番")
                                ])
                              ],
                              2
                            )
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
                  {
                    attrs: {
                      label: "抽水方式",
                      error: _vm.errorPump,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.pump.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.pump, "type", $$v)
                          },
                          expression: "data.pump.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: "end" } }, [
                          _vm._v("结算抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "percent" } }, [
                          _vm._v("实时抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "fixed" } }, [
                          _vm._v("固定抽水金币")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.pump.type == "end"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "percent"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "fixed"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入金币数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "coins" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
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
                  { attrs: { label: "IP限制" } },
                  [
                    _c("el-switch", {
                      attrs: { "inactive-value": 0, "active-value": 1 },
                      model: {
                        value: _vm.data.ip_limit,
                        callback: function($$v) {
                          _vm.$set(_vm.data, "ip_limit", $$v)
                        },
                        expression: "data.ip_limit"
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
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("对局设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-row",
                  [
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "天地胡" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.TDH,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "TDH", $$v)
                                },
                                expression: "data.options.TDH"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "换三张" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.HSZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "HSZ", $$v)
                                },
                                expression: "data.options.HSZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "夹心五" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.JXW,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "JXW", $$v)
                                },
                                expression: "data.options.JXW"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "门清中章" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.MQZZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "MQZZ", $$v)
                                },
                                expression: "data.options.MQZZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "幺九将对" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.YJJD,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "YJJD", $$v)
                                },
                                expression: "data.options.YJJD"
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
                  "el-form-item",
                  { staticClass: "pt-4" },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary" },
                        on: { click: _vm.onSubmit }
                      },
                      [_vm._v("立即保存")]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "ml-2",
                        attrs: { href: "javascript:history.go(-1);" }
                      },
                      [_c("el-button", [_vm._v("取消")])],
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
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7df3f586", module.exports)
  }
}

/***/ }),

/***/ 1572:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1573)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1575)
/* template */
var __vue_template__ = __webpack_require__(1576)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0e81beb4"
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
Component.options.__file = "resources/assets/js/pages/game/mohjong/setting/Fourth.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e81beb4", Component.options)
  } else {
    hotAPI.reload("data-v-0e81beb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1574);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("367d85ae", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e81beb4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Fourth.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e81beb4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Fourth.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1575:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingFourth",
    props: ['activeName'],
    data: function data() {
        return {
            scene_id: 1004,
            initDataStatus: false,
            loading: true,
            data: {
                bet_max: {
                    type: 1,
                    value: 0
                },
                pump: {
                    type: 'end',
                    value: 0
                },
                ip_limit: 0,
                options: {
                    TDH: 0,
                    HSZ: 0,
                    JXW: 0,
                    MQZZ: 0,
                    YJJD: 0
                }
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorBetMax: function errorBetMax() {
            if (this.msg.code == 42000 && this.msg.errors['bet_max.value']) {
                return this.msg.errors['bet_max.value'][0];
            }
        },
        errorPump: function errorPump() {
            if (this.msg.code == 42000 && this.msg.errors['pump.value']) {
                return this.msg.errors['pump.value'][0];
            }
        }
    },
    watch: {
        activeName: function activeName(n, o) {
            // 初始化数据
            if (n == 'fourth' && !this.initDataStatus) {
                // 获取数据
                this.getData();
                // 标记已初始化
                this.initDataStatus = true;
            }
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        getData: function getData() {
            var _this = this;

            axios.get('/app/game/mohjong/config/getItem', {
                params: {
                    scene_id: this.scene_id
                }
            }).then(function (response) {
                _this.data = response.data.resp_data;
                _this.loading = false;
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 制作数据
            var dataCache = _.cloneDeep(this.data);
            dataCache.scene_id = this.scene_id;
            // 保存数据
            axios.post('/app/game/mohjong/config/update', dataCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1576:
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
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("常规设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-form-item",
                  {
                    attrs: {
                      label: "封顶番数",
                      error: _vm.errorBetMax,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.bet_max.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.bet_max, "type", $$v)
                          },
                          expression: "data.bet_max.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: 1 } }, [
                          _vm._v("不封顶")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: 2 } }, [
                          _vm._v("自定义")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.bet_max.type == 2
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入番数"
                                },
                                model: {
                                  value: _vm.data.bet_max.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.bet_max,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.bet_max.value"
                                }
                              },
                              [
                                _c("template", { slot: "append" }, [
                                  _vm._v("番")
                                ])
                              ],
                              2
                            )
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
                  {
                    attrs: {
                      label: "抽水方式",
                      error: _vm.errorPump,
                      required: ""
                    }
                  },
                  [
                    _c(
                      "el-radio-group",
                      {
                        model: {
                          value: _vm.data.pump.type,
                          callback: function($$v) {
                            _vm.$set(_vm.data.pump, "type", $$v)
                          },
                          expression: "data.pump.type"
                        }
                      },
                      [
                        _c("el-radio", { attrs: { label: "end" } }, [
                          _vm._v("结算抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "percent" } }, [
                          _vm._v("实时抽水百分比")
                        ]),
                        _vm._v(" "),
                        _c("el-radio", { attrs: { label: "fixed" } }, [
                          _vm._v("固定抽水金币")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.pump.type == "end"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "percent"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入百分数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "percent" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
                          ],
                          1
                        )
                      : _vm.data.pump.type == "fixed"
                      ? _c(
                          "div",
                          { staticClass: "input-item" },
                          [
                            _c(
                              "el-input",
                              {
                                attrs: {
                                  type: "number",
                                  placeholder: "请输入金币数"
                                },
                                model: {
                                  value: _vm.data.pump.value,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.data.pump,
                                      "value",
                                      _vm._n($$v)
                                    )
                                  },
                                  expression: "data.pump.value"
                                }
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "append" },
                                  [
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "coins" }
                                    })
                                  ],
                                  1
                                )
                              ],
                              2
                            )
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
                  { attrs: { label: "IP限制" } },
                  [
                    _c("el-switch", {
                      attrs: { "inactive-value": 0, "active-value": 1 },
                      model: {
                        value: _vm.data.ip_limit,
                        callback: function($$v) {
                          _vm.$set(_vm.data, "ip_limit", $$v)
                        },
                        expression: "data.ip_limit"
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
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "setting-card" }, [
        _c("div", { staticClass: "setting-card__header" }, [
          _vm._v("对局设置")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-card__body" },
          [
            _c(
              "el-form",
              { attrs: { model: _vm.data, "label-width": "80px" } },
              [
                _c(
                  "el-row",
                  [
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "天地胡" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.TDH,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "TDH", $$v)
                                },
                                expression: "data.options.TDH"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "换三张" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.HSZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "HSZ", $$v)
                                },
                                expression: "data.options.HSZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "夹心五" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.JXW,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "JXW", $$v)
                                },
                                expression: "data.options.JXW"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "门清中章" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.MQZZ,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "MQZZ", $$v)
                                },
                                expression: "data.options.MQZZ"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { xs: 12, sm: 8 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "幺九将对" } },
                          [
                            _c("el-switch", {
                              attrs: { "inactive-value": 0, "active-value": 1 },
                              model: {
                                value: _vm.data.options.YJJD,
                                callback: function($$v) {
                                  _vm.$set(_vm.data.options, "YJJD", $$v)
                                },
                                expression: "data.options.YJJD"
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
                  "el-form-item",
                  { staticClass: "pt-4" },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary" },
                        on: { click: _vm.onSubmit }
                      },
                      [_vm._v("立即保存")]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "ml-2",
                        attrs: { href: "javascript:history.go(-1);" }
                      },
                      [_c("el-button", [_vm._v("取消")])],
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
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0e81beb4", module.exports)
  }
}

/***/ }),

/***/ 1577:
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
                        { attrs: { label: "平民场", name: "first" } },
                        [
                          _c("setting-first", {
                            attrs: { activeName: _vm.activeName }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        { attrs: { label: "小资场", name: "second" } },
                        [
                          _c("setting-second", {
                            attrs: { activeName: _vm.activeName }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        { attrs: { label: "白领场", name: "third" } },
                        [
                          _c("setting-third", {
                            attrs: { activeName: _vm.activeName }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-tab-pane",
                        { attrs: { label: "富豪场", name: "fourth" } },
                        [
                          _c("setting-fourth", {
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
    require("vue-hot-reload-api")      .rerender("data-v-987009b0", module.exports)
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

/***/ 720:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1554)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1556)
/* template */
var __vue_template__ = __webpack_require__(1577)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-987009b0"
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
Component.options.__file = "resources/assets/js/pages/game/mohjong/setting/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-987009b0", Component.options)
  } else {
    hotAPI.reload("data-v-987009b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});