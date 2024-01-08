webpackJsonp([52],{

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1395);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("2342d398", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c1cac6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c1cac6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.setting-container[data-v-58c1cac6] {\n  min-height: 700px;\n  padding: 20px;\n}\n[data-v-58c1cac6] .container-content {\n  padding: 20px;\n}\n[data-v-58c1cac6] .container-content-title {\n  margin-bottom: 20px;\n  border-bottom: 1px solid #EBEEF5;\n  padding-bottom: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  color: #303133;\n}\n[data-v-58c1cac6] .form-detail .el-form-item {\n  margin-bottom: 10px;\n}\n[data-v-58c1cac6] .form-detail .el-form-item__label {\n  color: #909399;\n}\n", ""]);

// exports


/***/ }),

/***/ 1396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__info_Index_vue__ = __webpack_require__(1397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__info_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__info_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_Index_vue__ = __webpack_require__(1402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__game_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secret_Index_vue__ = __webpack_require__(1407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secret_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__secret_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__avail_ip_Index__ = __webpack_require__(1412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__avail_ip_Index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__avail_ip_Index__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        SettingInfo: __WEBPACK_IMPORTED_MODULE_0__info_Index_vue___default.a,
        SettingGame: __WEBPACK_IMPORTED_MODULE_1__game_Index_vue___default.a,
        SettingSecret: __WEBPACK_IMPORTED_MODULE_2__secret_Index_vue___default.a,
        SettingAvailIp: __WEBPACK_IMPORTED_MODULE_3__avail_ip_Index___default.a
    },
    data: function data() {
        return {
            rootOrgId: 0,
            org: {
                id: 0,
                name: '',
                parent_id: 0
            }
        };
    },

    methods: {
        orgSelect: function orgSelect(data) {
            if (!this.rootOrgId) {
                this.rootOrgId = data.id;
            }
            this.org.id = data.id;
            this.org.name = data.name;
            this.org.parent_id = data.parent_id;
        }
    }
});

/***/ }),

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1398)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1400)
/* template */
var __vue_template__ = __webpack_require__(1401)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-575c4f2d"
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
Component.options.__file = "resources/assets/js/pages/agency/setting/info/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-575c4f2d", Component.options)
  } else {
    hotAPI.reload("data-v-575c4f2d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1398:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1399);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("72e78b46", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-575c4f2d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-575c4f2d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1399:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.container-content[data-v-575c4f2d] {\n    padding-bottom: 0;\n    margin-bottom: -10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1400:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingIndex",
    props: ['org', 'rootOrgId'],
    data: function data() {
        return {
            dataStatus: 'dle',
            data: {
                rate: {},
                coin: {}
            },
            rateCache: {
                rate_next: 5
            },
            dialog: {
                visible: {
                    rate: false
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
        errorRateNext: function errorRateNext() {
            if (this.msg.code == 42000 && this.msg.errors.rate_next) {
                return this.msg.errors.rate_next[0];
            }
        }
    },
    watch: {
        org: {
            deep: true,
            handler: function handler(n, o) {
                this.getData();
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

            this.dataStatus = 'loading';
            axios.get('/agency/info/getDetail', {
                params: {
                    org_id: this.org.id
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.data = response.data.resp_data;
                    _this.dataStatus = 'dle';
                } else {
                    _this.dataStatus = 'error';
                }
            });
        },

        // 显示模态框
        dialogRate: function dialogRate() {
            // 初始化数据
            this.rateCache = _.cloneDeep(this.data.rate);
            // 显示模态框
            this.dialog.visible.rate = true;
        },

        // 保存数据
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/info/saveItemRate', this.rateCache).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    // 修改显示数据
                    _this2.data.rate = response.data.resp_data;
                    // 关闭模态框
                    _this2.dialog.visible.rate = false;
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1401:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-content" },
    [
      _c("div", { staticClass: "container-content-title" }, [
        _vm._v(_vm._s(_vm.$t("agency.setting.info")))
      ]),
      _vm._v(" "),
      _c("component-page-loading", {
        attrs: { status: _vm.dataStatus },
        on: { reload: _vm.getData }
      }),
      _vm._v(" "),
      _vm.dataStatus == "dle"
        ? _c(
            "div",
            [
              _c(
                "el-row",
                { attrs: { gutter: 10 } },
                [
                  _c(
                    "el-col",
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "140px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: _vm.org.name } },
                            [
                              _c(
                                "el-tag",
                                { attrs: { size: "mini", type: "info" } },
                                [_vm._v(_vm._s(_vm.org.id))]
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
                    "el-col",
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "140px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: _vm.$t("agency.setting.rate") } },
                            [
                              Boolean(_vm.data.rate.rate)
                                ? _c("span", { staticClass: "mr-2" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("numeral")(
                                          _vm.data.rate.rate,
                                          "0.[00]"
                                        )
                                      ) + "%"
                                    )
                                  ])
                                : _c("span", { staticClass: "mr-2" }, [
                                    _vm._v("----")
                                  ]),
                              _vm._v(" "),
                              !Boolean(_vm.data.rate.rate) &&
                              _vm.org.parent_id == _vm.rootOrgId
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: { size: "mini" },
                                      on: { click: _vm.dialogRate }
                                    },
                                    [_vm._v(_vm._s(_vm.$t("action.modify")))]
                                  )
                                : _vm._e()
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
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "220px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: _vm.$t("agency.setting.rateNext")
                              }
                            },
                            [
                              Boolean(_vm.data.rate.rate_next)
                                ? _c("span", { staticClass: "mr-2" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("numeral")(
                                          _vm.data.rate.rate_next,
                                          "0.[00]"
                                        )
                                      ) + "%"
                                    )
                                  ])
                                : _c("span", { staticClass: "mr-2" }, [
                                    _vm._v("----")
                                  ]),
                              _vm._v(" "),
                              Boolean(_vm.data.rate.rate) &&
                              _vm.org.parent_id == _vm.rootOrgId
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: { size: "mini" },
                                      on: { click: _vm.dialogRate }
                                    },
                                    [_vm._v(_vm._s(_vm.$t("action.modify")))]
                                  )
                                : _vm._e()
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
                "el-row",
                { attrs: { gutter: 10 } },
                [
                  _c(
                    "el-col",
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "140px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: { label: _vm.$t("agency.setting.totalIn") }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm._f("numeral")(
                                    _vm.data.coin.total_in,
                                    "0,0.[0000]"
                                  )
                                )
                              )
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
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "140px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: _vm.$t("agency.setting.totalCoin")
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm._f("numeral")(
                                    Number(_vm.data.coin.game) +
                                      Number(_vm.data.coin.agency),
                                    "0,0.[0000]"
                                  )
                                )
                              )
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
                    { attrs: { lg: 8 } },
                    [
                      _c(
                        "el-form",
                        {
                          staticClass: "form-detail",
                          attrs: { "label-width": "140px" }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: _vm.$t("agency.setting.currentCoin")
                              }
                            },
                            [
                              _c("span", { staticClass: "mr-2" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeral")(
                                      _vm.data.coin.current,
                                      "0,0.[0000]"
                                    )
                                  )
                                )
                              ]),
                              _vm._v(" "),
                              _vm.org.id == _vm.rootOrgId
                                ? _c(
                                    "router-link",
                                    { attrs: { to: { name: "order.my" } } },
                                    [
                                      _c(
                                        "el-button",
                                        { attrs: { size: "mini" } },
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
                                    ],
                                    1
                                  )
                                : _vm.org.parent_id == _vm.rootOrgId
                                ? _c(
                                    "router-link",
                                    { attrs: { to: { name: "order.agency" } } },
                                    [
                                      _c(
                                        "el-button",
                                        { attrs: { size: "mini" } },
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
                                    ],
                                    1
                                  )
                                : _vm._e()
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
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.setting.rateDialog.title"),
            width: "370px",
            visible: _vm.dialog.visible.rate
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "rate", $event)
            }
          }
        },
        [
          _c(
            "div",
            { staticClass: "pr-4" },
            [
              _c(
                "el-form",
                { attrs: { model: _vm.rateCache, "label-width": "80px" } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: _vm.$t("agency.setting.rateDialog.rateNext"),
                        error: _vm.errorRateNext
                      }
                    },
                    [
                      _c(
                        "el-input",
                        {
                          attrs: {
                            type: "number",
                            step: 0.01,
                            min: 0.01,
                            max: 100
                          },
                          model: {
                            value: _vm.rateCache.rate_next,
                            callback: function($$v) {
                              _vm.$set(_vm.rateCache, "rate_next", _vm._n($$v))
                            },
                            expression: "rateCache.rate_next"
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
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: { click: _vm.onSubmit }
                        },
                        [_vm._v(_vm._s(_vm.$t("action.save")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          on: {
                            click: function($event) {
                              _vm.dialog.visible.rate = false
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
    require("vue-hot-reload-api")      .rerender("data-v-575c4f2d", module.exports)
  }
}

/***/ }),

/***/ 1402:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1403)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1405)
/* template */
var __vue_template__ = __webpack_require__(1406)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-48341d1e"
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
Component.options.__file = "resources/assets/js/pages/agency/setting/game/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48341d1e", Component.options)
  } else {
    hotAPI.reload("data-v-48341d1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1403:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1404);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("5de126d2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48341d1e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48341d1e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1404:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.game-list[data-v-48341d1e] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: row;\n                flex-direction: row;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        margin: -10px;\n}\n.game-list-item[data-v-48341d1e] {\n        padding: 10px;\n        width: 200px;\n        position: relative;\n}\n.game-card[data-v-48341d1e] {\n        overflow: hidden;\n        border-radius: 7px;\n        background-color: #fff;\n        -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, .1);\n                box-shadow: 0 0 1px 0 rgba(0, 0, 0, .1);\n}\n/*\n    .game-card:hover {\n        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);\n    }\n*/\n.game-card-body[data-v-48341d1e] {\n        padding: 15px;\n}\n.game-card-body .card-img[data-v-48341d1e] {\n        position: relative;\n        overflow: hidden;\n        width: 100%;\n}\n.game-card-body .card-img .mask-layer[data-v-48341d1e] {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, .4);\n        color: #fff;\n}\n.game-card-body .mask-layer .icon[data-v-48341d1e] {\n        font-size: 1.75rem;\n}\n.game-card-body .mask-layer .info[data-v-48341d1e] {\n        font-size: 1.25rem;\n        margin-left: 10px;\n}\n.game-card-body .card-info[data-v-48341d1e] {\n        padding-top: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1405:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingGame",
    props: ['org', 'rootOrgId'],
    data: function data() {
        return {
            dataListStatus: 'dle',
            shieldIds: [],
            dataList: []
        };
    },

    watch: {
        org: {
            deep: true,
            handler: function handler(n, o) {
                this.initData();
                this.getDataList();
            }
        }
    },
    methods: {
        initData: function initData() {
            this.shieldIds = [];
            this.dataList = [];
        },
        getDataList: function getDataList() {
            var _this = this;

            this.dataListStatus = 'loading';
            axios.get('/agency/game/getList', {
                params: {
                    orgId: this.org.id
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.shieldIds = response.data.resp_data.shieldIds;
                    _this.dataList = response.data.resp_data.gameList;
                    _this.dataListStatus = !_this.dataList.length ? 'nodata' : 'dle';
                } else {
                    _this.dataListStatus = 'error';
                }
            });
        }
    }
});

/***/ }),

/***/ 1406:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-content pt-5" },
    [
      _c("div", { staticClass: "container-content-title" }, [
        _vm._v(_vm._s(_vm.$t("agency.setting.game")))
      ]),
      _vm._v(" "),
      _c("component-page-loading", {
        attrs: { status: _vm.dataListStatus },
        on: { reload: _vm.getDataList }
      }),
      _vm._v(" "),
      _vm.dataListStatus == "dle" && _vm.dataList.length
        ? _c(
            "div",
            { staticClass: "game-list" },
            _vm._l(_vm.dataList, function(item, index) {
              return _vm.shieldIds.indexOf(item.id) == -1
                ? _c("div", { key: index, staticClass: "game-list-item" }, [
                    _c("div", { staticClass: "game-card" }, [
                      _c("div", { staticClass: "game-card-body" }, [
                        _c("div", { staticClass: "card-img" }, [
                          _c("img", {
                            staticClass: "img-fluid",
                            attrs: { src: item.icon }
                          }),
                          _vm._v(" "),
                          item.status == 2
                            ? _c(
                                "div",
                                { staticClass: "mask-layer flex-center" },
                                [
                                  _c("i", {
                                    staticClass: "icon el-icon-warning"
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "info" }, [
                                    _vm._v(_vm._s(_vm.$t("action.disabled")))
                                  ])
                                ]
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "card-info text-truncate text-center",
                            attrs: { title: _vm.$t("games." + item.id) }
                          },
                          [_vm._v(_vm._s(_vm.$t("games." + item.id)))]
                        )
                      ])
                    ])
                  ])
                : _vm._e()
            }),
            0
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-48341d1e", module.exports)
  }
}

/***/ }),

/***/ 1407:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1408)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1410)
/* template */
var __vue_template__ = __webpack_require__(1411)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fc6424a2"
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
Component.options.__file = "resources/assets/js/pages/agency/setting/secret/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fc6424a2", Component.options)
  } else {
    hotAPI.reload("data-v-fc6424a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1408:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1409);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("eec7a2a4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc6424a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc6424a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1409:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.line-through[data-v-fc6424a2] {\n    text-decoration: line-through\n}\n", ""]);

// exports


/***/ }),

/***/ 1410:
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
    name: "SettingSecret",
    props: ['org', 'rootOrgId'],
    data: function data() {
        return {
            dataStatus: 'dle',
            data: {},
            dialog: {
                visible: {
                    create: false,
                    update: false
                }
            }
        };
    },

    watch: {
        org: {
            deep: true,
            handler: function handler(n, o) {
                this.initData();
                this.getData();
            }
        }
    },
    methods: {
        initData: function initData() {
            this.data = {};
        },
        getData: function getData() {
            var _this = this;

            this.dataStatus = 'loading';
            axios.get('/agency/access-key/getDetail', {
                params: {
                    org_id: this.org.id
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.data = response.data.resp_data;
                    _this.$set(_this.data, 'popoverVisible', false);
                    _this.dataStatus = 'dle';
                } else if (response.data.resp_msg.code == 43100) {
                    _this.data = {};
                    _this.dataStatus = 'dle';
                } else {
                    _this.dataStatus = 'error';
                }
            });
        },

        // 创建访问密钥
        accessKeyCreate: function accessKeyCreate() {
            var _this2 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/access-key/create', {
                org_id: this.org.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.data = response.data.resp_data;
                    _this2.$set(_this2.data, 'popoverVisible', false);
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.create-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.$message({
                        type: 'error',
                        message: _this2.$t('messages.create-failed'),
                        showClose: true
                    });
                }
                // 关闭提示框
                _this2.dialog.visible.create = false;
            });
        },

        // 更新访问密钥
        accessKeyUpdate: function accessKeyUpdate() {
            var _this3 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/access-key/update', {
                org_id: this.org.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this3.data = response.data.resp_data;
                    _this3.$set(_this3.data, 'popoverVisible', false);
                    _this3.$message({
                        type: 'success',
                        message: _this3.$t('messages.update-succeeded'),
                        showClose: true
                    });
                } else {
                    _this3.$message({
                        type: 'error',
                        message: _this3.$t('messages.update-failed'),
                        showClose: true
                    });
                }
                // 关闭提示框
                _this3.dialog.visible.update = false;
            });
        },

        // 修改状态
        saveItemStatus: function saveItemStatus() {
            var _this4 = this;

            // 关闭提示框
            this.data.popoverVisible = false;
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/access-key/saveItemStatus', {
                org_id: this.org.id,
                status: this.data.status == 1 ? 2 : 1
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this4.data.status = response.data.resp_data.status;
                    _this4.$message({
                        type: 'success',
                        message: _this4.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this4.$message({
                        type: 'error',
                        message: _this4.$t('messages.save-failed'),
                        showClose: true
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 1411:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-content pt-5" },
    [
      _c("div", { staticClass: "container-content-title" }, [
        _vm._v(_vm._s(_vm.$t("agency.setting.secret")) + "\n        "),
        _vm.org.id == _vm.rootOrgId && _vm.data.id
          ? _c(
              "div",
              [
                _c(
                  "el-popover",
                  {
                    attrs: { placement: "bottom", width: "210" },
                    model: {
                      value: _vm.data.popoverVisible,
                      callback: function($$v) {
                        _vm.$set(_vm.data, "popoverVisible", $$v)
                      },
                      expression: "data.popoverVisible"
                    }
                  },
                  [
                    _c("div", { staticClass: "pt-3 pb-3" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$t("agency.setting.secretUpdateAskText", {
                            status:
                              _vm.data.status == 2
                                ? _vm.$t("action.on")
                                : _vm.$t("action.off")
                          })
                        )
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "text-center" },
                      [
                        _c(
                          "el-button",
                          {
                            attrs: { size: "mini", type: "text" },
                            on: {
                              click: function($event) {
                                _vm.data.popoverVisible = false
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.$t("action.cancel")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { size: "mini", type: "primary" },
                            on: { click: _vm.saveItemStatus }
                          },
                          [_vm._v(_vm._s(_vm.$t("action.confirm")))]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.data.status == 2
                      ? _c(
                          "el-button",
                          {
                            attrs: {
                              slot: "reference",
                              plain: "",
                              size: "mini",
                              type: "primary"
                            },
                            slot: "reference"
                          },
                          [_vm._v(_vm._s(_vm.$t("action.on")))]
                        )
                      : _c(
                          "el-button",
                          {
                            attrs: {
                              slot: "reference",
                              plain: "",
                              size: "mini",
                              type: "danger"
                            },
                            slot: "reference"
                          },
                          [_vm._v(_vm._s(_vm.$t("action.off")))]
                        )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-button",
                  {
                    staticClass: "ml-1",
                    attrs: { size: "mini" },
                    on: {
                      click: function($event) {
                        _vm.dialog.visible.update = true
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("action.update")))]
                )
              ],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("component-page-loading", {
        attrs: { status: _vm.dataStatus },
        on: { reload: _vm.getData }
      }),
      _vm._v(" "),
      _vm.dataStatus == "dle" && !_vm.data.id
        ? _c("div", { staticClass: "text-aux" }, [
            _vm.org.id == _vm.rootOrgId || _vm.org.parent_id == _vm.rootOrgId
              ? _c("div", [
                  _c("span", [
                    _vm._v(_vm._s(_vm.$t("agency.setting.secretAskText")))
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      attrs: { href: "javascript:;" },
                      on: {
                        click: function($event) {
                          _vm.dialog.visible.create = true
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.$t("agency.setting.secretAdd")))]
                  )
                ])
              : _c("div", { staticClass: "font-size-third" }, [
                  _vm._v(_vm._s(_vm.$t("messages.empty")))
                ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.dataStatus == "dle" && _vm.data.id
        ? _c(
            "el-form",
            { staticClass: "form-detail", attrs: { "label-width": "140px" } },
            [
              _c("el-form-item", { attrs: { label: "AccessKeyId" } }, [
                _c(
                  "div",
                  {
                    class: { "line-through": _vm.data.status == 2 },
                    attrs: {
                      title:
                        _vm.data.status == 2
                          ? "AccessKey " + _vm.$t("action.disabled")
                          : ""
                    }
                  },
                  [_vm._v(_vm._s(_vm.data.access_key_id))]
                )
              ]),
              _vm._v(" "),
              _c("el-form-item", { attrs: { label: "AccessKeySecret" } }, [
                _c(
                  "div",
                  {
                    class: { "line-through": _vm.data.status == 2 },
                    attrs: {
                      title:
                        _vm.data.status == 2
                          ? "AccessKey " + _vm.$t("action.disabled")
                          : ""
                    }
                  },
                  [_vm._v(_vm._s(_vm.data.access_key_secret))]
                )
              ])
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.setting.createSecretDialog.title"),
            center: "",
            width: "400px",
            visible: _vm.dialog.visible.create
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "create", $event)
            }
          }
        },
        [
          _c("div", {
            staticClass: "text-center",
            domProps: {
              innerHTML: _vm._s(
                _vm.$t("agency.setting.createSecretDialog.askText")
              )
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.dialog.visible.create = false
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.$t("action.cancel")))]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.accessKeyCreate }
                },
                [_vm._v(_vm._s(_vm.$t("action.confirm")))]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.setting.updateSecretDialog.title"),
            center: "",
            width: "400px",
            visible: _vm.dialog.visible.update
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "update", $event)
            }
          }
        },
        [
          _c("div", {
            staticClass: "text-center",
            domProps: {
              innerHTML: _vm._s(
                _vm.$t("agency.setting.updateSecretDialog.askText")
              )
            }
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "text-center mt-1",
            domProps: {
              innerHTML: _vm._s(
                _vm.$t("agency.setting.updateSecretDialog.text")
              )
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.dialog.visible.update = false
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.$t("action.cancel")))]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.accessKeyUpdate }
                },
                [_vm._v(_vm._s(_vm.$t("action.confirm")))]
              )
            ],
            1
          )
        ]
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
    require("vue-hot-reload-api")      .rerender("data-v-fc6424a2", module.exports)
  }
}

/***/ }),

/***/ 1412:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1413)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1415)
/* template */
var __vue_template__ = __webpack_require__(1416)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-787f2e84"
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
Component.options.__file = "resources/assets/js/pages/agency/setting/avail-ip/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-787f2e84", Component.options)
  } else {
    hotAPI.reload("data-v-787f2e84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1413:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1414);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("62c031f2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-787f2e84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-787f2e84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1414:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1415:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SettingAvailIp",
    props: ['org', 'rootOrgId'],
    data: function data() {
        return {
            dataListStatus: 'dle',
            dataList: [],
            dataCache: {
                dataList: []
            },
            dialog: {
                visible: {
                    update: false
                }
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    watch: {
        org: {
            deep: true,
            handler: function handler(n, o) {
                this.initData();
                this.getDataList();
            }
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        initData: function initData() {
            this.dataList = [];
            this.dataCache.dataList = [];
        },
        getDataList: function getDataList() {
            var _this = this;

            this.dataListStatus = 'loading';
            axios.get('/agency/avail-ip/getListByOrg', {
                params: {
                    org_id: this.org.id
                }
            }).then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.dataList = response.data.resp_data;
                    _this.dataListStatus = 'dle';
                } else {
                    _this.dataListStatus = 'error';
                }
            });
        },

        // 显示模态框
        dialogEdit: function dialogEdit() {
            // 重置验证
            this.initMsg();
            // 初始化数据
            this.dataCache.dataList = _.cloneDeep(this.dataList);
            // 添加第一条数据
            if (!this.dataCache.dataList.length) {
                this.addDomain();
            }
            // 显示模态框
            this.dialog.visible.update = true;
        },

        // 提交表单
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/avail-ip/saveListByOrg', {
                org_id: this.org.id,
                ips: _.map(this.dataCache.dataList, 'ip')
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.dataList = response.data.resp_data;
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    // 关闭模态框
                    _this2.dialog.visible.update = false;
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        },
        removeDomain: function removeDomain(index) {
            this.dataCache.dataList.splice(index, 1);
            // 添加第一条数据
            if (!this.dataCache.dataList.length) {
                this.addDomain();
            }
        },
        addDomain: function addDomain() {
            this.dataCache.dataList.push({ ip: '' });
        }
    }
});

/***/ }),

/***/ 1416:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-content pt-5" },
    [
      _c(
        "div",
        { staticClass: "container-content-title" },
        [
          _vm._v(_vm._s(_vm.$t("agency.setting.avail-ip")) + "\n        "),
          _vm.dataList.length && _vm.org.id == _vm.rootOrgId
            ? _c(
                "el-button",
                { attrs: { size: "mini" }, on: { click: _vm.dialogEdit } },
                [_vm._v(_vm._s(_vm.$t("action.edit")))]
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("component-page-loading", {
        attrs: { status: _vm.dataListStatus },
        on: { reload: _vm.getDataList }
      }),
      _vm._v(" "),
      _vm.dataListStatus == "dle" && !_vm.dataList.length
        ? _c("div", { staticClass: "text-aux" }, [
            _vm.org.id == _vm.rootOrgId || _vm.org.parent_id == _vm.rootOrgId
              ? _c("div", [
                  _c("span", [
                    _vm._v(_vm._s(_vm.$t("agency.setting.availIPAskText")))
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      attrs: { href: "javascript:;" },
                      on: { click: _vm.dialogEdit }
                    },
                    [_vm._v(_vm._s(_vm.$t("agency.setting.availIPAdd")))]
                  )
                ])
              : _c("div", { staticClass: "font-size-third" }, [
                  _vm._v(_vm._s(_vm.$t("messages.empty")))
                ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.dataListStatus == "dle" && _vm.dataList.length
        ? _c(
            "el-form",
            { staticClass: "form-detail", attrs: { "label-width": "140px" } },
            [
              _c(
                "el-form-item",
                { attrs: { label: _vm.$t("agency.setting.IPLabel") } },
                _vm._l(_vm.dataList, function(item, index) {
                  return _c("span", { key: index, staticClass: "mr-3" }, [
                    _vm._v(" " + _vm._s(item.ip))
                  ])
                }),
                0
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.setting.updateIPDialog.title"),
            width: "460px",
            visible: _vm.dialog.visible.update
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "update", $event)
            }
          }
        },
        [
          _vm.dataCache.dataList.length
            ? _c(
                "div",
                { staticClass: "pr-4" },
                [
                  _c(
                    "el-form",
                    {
                      ref: "availIp",
                      attrs: { model: _vm.dataCache, "label-width": "120px" }
                    },
                    [
                      _vm._l(_vm.dataCache.dataList, function(item, index) {
                        return _c(
                          "el-form-item",
                          {
                            key: index,
                            attrs: {
                              label:
                                _vm.$t("agency.setting.updateIPDialog.ip") +
                                (index + 1),
                              error: Boolean(_vm.msg.errors["ips." + index])
                                ? _vm.msg.errors["ips." + index][0]
                                : ""
                            }
                          },
                          [
                            _c(
                              "el-input",
                              {
                                model: {
                                  value: item.ip,
                                  callback: function($$v) {
                                    _vm.$set(item, "ip", $$v)
                                  },
                                  expression: "item.ip"
                                }
                              },
                              [
                                _c("el-button", {
                                  attrs: {
                                    slot: "append",
                                    icon: "el-icon-close"
                                  },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      return _vm.removeDomain(index)
                                    }
                                  },
                                  slot: "append"
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      }),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary" },
                              on: { click: _vm.onSubmit }
                            },
                            [_vm._v(_vm._s(_vm.$t("action.save")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { icon: "el-icon-plus" },
                              on: { click: _vm.addDomain }
                            },
                            [_vm._v(_vm._s(_vm.$t("action.create")))]
                          )
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
        ]
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
    require("vue-hot-reload-api")      .rerender("data-v-787f2e84", module.exports)
  }
}

/***/ }),

/***/ 1417:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-layout" }, [
    _c("div", { staticClass: "page-layout-header" }, [
      _c("div", { staticClass: "header-aside" }, [
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
          _vm._v(_vm._s(_vm.$t(_vm.$route.meta.titleSide)))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "option" })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "header-main" }, [
        _c("div", { staticClass: "title" }, [
          _vm._v(_vm._s(_vm.$t(_vm.$route.meta.title)))
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "page-layout-body" }, [
      _c(
        "div",
        {
          staticClass: "body-aside pb-1",
          staticStyle: { "padding-right": "1px" }
        },
        [
          _c(
            "div",
            {
              directives: [{ name: "bar", rawName: "v-bar" }],
              staticClass: "vuebar-element"
            },
            [
              _c(
                "div",
                [
                  _c("component-page-org-tree", {
                    attrs: { "current-root": "" },
                    on: { click: _vm.orgSelect }
                  })
                ],
                1
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "body-main pb-1" }, [
        _c(
          "div",
          {
            directives: [{ name: "bar", rawName: "v-bar" }],
            staticClass: "vuebar-element"
          },
          [
            _c("div", [
              _c("div", { staticClass: "setting-container" }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.org.id == 1,
                        expression: "org.id == 1"
                      }
                    ],
                    staticClass: "text-center p-2"
                  },
                  [
                    _c("component-page-loading", {
                      attrs: { status: "nodata" }
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
                        value: _vm.org.id > 1,
                        expression: "org.id > 1"
                      }
                    ]
                  },
                  [
                    _c("setting-info", {
                      attrs: { org: _vm.org, "root-org-id": _vm.rootOrgId }
                    }),
                    _vm._v(" "),
                    _c("setting-avail-ip", {
                      attrs: { org: _vm.org, "root-org-id": _vm.rootOrgId }
                    }),
                    _vm._v(" "),
                    _c("setting-secret", {
                      attrs: { org: _vm.org, "root-org-id": _vm.rootOrgId }
                    }),
                    _vm._v(" "),
                    _c("setting-game", {
                      attrs: { org: _vm.org, "root-org-id": _vm.rootOrgId }
                    })
                  ],
                  1
                )
              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-58c1cac6", module.exports)
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

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1394)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1396)
/* template */
var __vue_template__ = __webpack_require__(1417)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-58c1cac6"
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
Component.options.__file = "resources/assets/js/pages/agency/setting/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58c1cac6", Component.options)
  } else {
    hotAPI.reload("data-v-58c1cac6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});