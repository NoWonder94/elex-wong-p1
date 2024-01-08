webpackJsonp([60],{

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1624);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("590e07fe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ea3420b4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ea3420b4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1624:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-ea3420b4] {\n    min-height: 700px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue__ = __webpack_require__(1626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ItemCreate: __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue___default.a
    },
    data: function data() {
        return {
            orgList: [],
            loading: false,
            filterOption: {
                datetime: '',
                org_id: '',
                type: '',
                status: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 2
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            dialog: {
                visible: {
                    create: false
                }
            }
        };
    },

    methods: {
        // 获取子代理列表
        getOrgSubList: function getOrgSubList() {
            var _this = this;

            axios.get('/common/getOrgSubList').then(function (response) {
                _this.orgList = response.data.resp_data;
            });
        },
        initDataList: function initDataList() {
            // 初始化筛选参数
            this.filterOption.datetime = '';
            this.filterOption.org_id = '';
            this.filterOption.type = '';
            this.filterOption.status = '';
            this.filterOption.keyword = '';
            this.filterOption.order = 2;
            // 初始化数据
            this.dataCount.total = 0;
            this.dataList = [];
            // 获取数据
            this.clearFilterOption();
            this.getDataList();
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
            this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            this.clearFilterOption();
            this.getDataList();
        },
        getDataList: function getDataList() {
            var _this2 = this;

            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/order/agency/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this2.dataCount = response.data.resp_data.count;
                _this2.dataList = response.data.resp_data.data;
                _this2.loading = false;
            });
        },

        // 处理订单
        handleOrder: function handleOrder(scope) {
            var _this3 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/order/agency/handle', {
                id: scope.row.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this3.$message({
                        type: 'success',
                        message: _this3.$t('order.agency.messages.handle-succeeded'),
                        showClose: true
                    });
                } else {
                    var message = _this3.$t('order.agency.messages.handle-failed');
                    switch (response.data.resp_msg.code) {
                        case 43100:
                            message = message + _this3.$t('error.43100');
                            break;
                        case 43301:
                            message = message + _this3.$t('error.43301');
                            break;
                        case 43300:
                            message = message + _this3.$t('error.43300');
                            break;
                        case 43801:
                            message = message + _this3.$t('error.43801', { type: scope.row.type == 1 ? $t('order.agency.type.you') : $t('order.agency.type.agent') });
                            break;
                        case 43802:
                            message = message + _this3.$t('error.43802', { type: scope.row.type == 1 ? $t('order.agency.type.you') : $t('order.agency.type.agent') });
                            break;
                    }
                    _this3.$message({
                        type: 'error',
                        message: message,
                        showClose: true
                    });
                }
                // 重新加载数据
                _this3.getDataList();
            });
        },

        // 取消订单
        cancelOrder: function cancelOrder(scope) {
            var _this4 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/order/agency/cancel', {
                id: scope.row.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this4.$message({
                        type: 'success',
                        message: _this4.$t('order.agency.messages.cancel-succeeded'),
                        showClose: true
                    });
                } else {
                    var message = _this4.$t('order.agency.messages.cancel-failed');
                    switch (response.data.resp_msg.code) {
                        case 43100:
                            message = message + _this4.$t('error.43100');
                            break;
                        case 43301:
                            message = message + _this4.$t('error.43301');
                            break;
                        case 43300:
                            message = message + _this4.$t('error.433001');
                            break;
                    }
                    _this4.$message({
                        type: 'error',
                        message: message,
                        showClose: true
                    });
                }
                // 重新加载数据
                _this4.getDataList();
            });
        }
    },
    mounted: function mounted() {
        // 初始化子代理列表
        this.getOrgSubList();
    }
});

/***/ }),

/***/ 1626:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1627)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1629)
/* template */
var __vue_template__ = __webpack_require__(1630)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cc272d6a"
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
Component.options.__file = "resources/assets/js/pages/order/agency/ItemCreate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc272d6a", Component.options)
  } else {
    hotAPI.reload("data-v-cc272d6a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1627:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1628);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("29a8119a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc272d6a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemCreate.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc272d6a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemCreate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1628:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.form-content .el-select[data-v-cc272d6a] {\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 1629:
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
    name: "ItemCreate",
    props: ['visible', 'orgList'],
    data: function data() {
        return {
            typeList: [{
                id: 1,
                name: this.$t('form.transferTypes[0].label')
            }, {
                id: 2,
                name: this.$t('form.transferTypes[1].label')
            }],
            dialogVisible: false,
            dataCache: {
                org_id: 0,
                type: 1,
                amount: ''
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorAgency: function errorAgency() {
            if (this.msg.code == 42000 && this.msg.errors.org_id) {
                return this.msg.errors.org_id[0];
            }
        },
        errorType: function errorType() {
            if (this.msg.code == 42000 && this.msg.errors.type) {
                return this.msg.errors.type[0];
            }
        },
        errorAmount: function errorAmount() {
            if (this.msg.code == 42000 && this.msg.errors.amount) {
                return this.msg.errors.amount[0];
            } else if (this.msg.code == 43801) {
                return this.$t('error.43801', { type: $t('order.agency.type.agent') });
            } else if (this.msg.code == 43802) {
                return this.$t('error.43802', { type: $t('order.agency.type.agent') });
            }
        }
    },
    watch: {
        visible: function visible(n, o) {
            // 变量赋值
            this.dialogVisible = n;
            // 初始化参数
            n && this.initData(this.org);
        }
    },
    methods: {
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },
        initData: function initData(org) {
            this.initMsg();
            this.dataCache.org_id = '';
            // this.dataCache.type = '';
            this.dataCache.amount = '';
        },
        onSubmit: function onSubmit() {
            var _this = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/order/agency/create', this.dataCache).then(function (response) {
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
                    // 广播事件到父组件
                    _this.$emit('create');
                } else if (_this.dataCache.type == 1 && [43801, 43802].indexOf(response.data.resp_msg.code) > -1) {
                    _this.$message({
                        type: 'error',
                        message: _this.$t('order.agency.messages.gold-inadequate'),
                        showClose: true
                    });
                } else {
                    _this.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1630:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("order.agency.dialog.title"),
        width: "460px",
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
            {
              staticClass: "form-content",
              attrs: { model: _vm.dataCache, "label-width": "120px" }
            },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: _vm.$t("order.agency.dialog.orgId"),
                    error: _vm.errorAgency,
                    required: ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dataCache.org_id,
                        callback: function($$v) {
                          _vm.$set(_vm.dataCache, "org_id", $$v)
                        },
                        expression: "dataCache.org_id"
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
                {
                  attrs: {
                    label: _vm.$t("order.agency.dialog.amount"),
                    error: _vm.errorAmount,
                    required: ""
                  }
                },
                [
                  _c("el-input", {
                    attrs: {
                      placeholder: _vm.$t(
                        "order.agency.dialog.amountPlaceholder"
                      )
                    },
                    model: {
                      value: _vm.dataCache.amount,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "amount", $$v)
                      },
                      expression: "dataCache.amount"
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
    require("vue-hot-reload-api")      .rerender("data-v-cc272d6a", module.exports)
  }
}

/***/ }),

/***/ 1631:
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
                                    "start-placeholder": _vm.$t(
                                      "form.startDate"
                                    ),
                                    "end-placeholder": _vm.$t("form.endDate")
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
                                      placeholder: _vm.$t("form.orgId"),
                                      clearable: ""
                                    },
                                    on: { change: _vm.filterChange },
                                    model: {
                                      value: _vm.filterOption.org_id,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.filterOption,
                                          "org_id",
                                          $$v
                                        )
                                      },
                                      expression: "filterOption.org_id"
                                    }
                                  },
                                  _vm._l(_vm.orgList, function(item) {
                                    return _c("el-option", {
                                      key: item.id,
                                      attrs: {
                                        label: item.name,
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
                              { staticClass: "el-form-item-small" },
                              [
                                _c(
                                  "el-select",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t(
                                        "form.agencyOrderStatus"
                                      ),
                                      clearable: ""
                                    },
                                    on: { change: _vm.filterChange },
                                    model: {
                                      value: _vm.filterOption.status,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.filterOption,
                                          "status",
                                          $$v
                                        )
                                      },
                                      expression: "filterOption.status"
                                    }
                                  },
                                  _vm._l(
                                    _vm.$t("form.agencyOrderStatusList"),
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
                                  "el-input",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t("form.sn"),
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
                            ),
                            _vm._v(" "),
                            _c(
                              "el-form-item",
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: {
                                      type: "primary",
                                      plain: "",
                                      icon: "el-icon-plus"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.dialog.visible.create = true
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("action.create")))]
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
                                prop: "id",
                                order: "descending"
                              }
                            },
                            on: { "sort-change": _vm.filterOrderChange }
                          },
                          [
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "160",
                                label: _vm.$t("order.agency.thLable.sn")
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
                                              scope.row.sn,
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
                                label: _vm.$t("order.agency.thLable.orgName"),
                                prop: "sub_org_name"
                              }
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "90",
                                label: _vm.$t("order.agency.thLable.type")
                              },
                              scopedSlots: _vm._u([
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
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "90",
                                label: _vm.$t("order.agency.thLable.status")
                              },
                              scopedSlots: _vm._u([
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
                                                    "form.agencyOrderStatusList[0].label"
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
                                                    "form.agencyOrderStatusList[1].label"
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
                                                    "form.agencyOrderStatusList[2].label"
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
                                                        "form.agencyOrderStatusList[2].label"
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        : scope.row.status == 4
                                        ? _c(
                                            "el-tag",
                                            {
                                              attrs: {
                                                size: "medium",
                                                type: "info"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.agencyOrderStatusList[3].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "90",
                                label: _vm.$t("order.agency.thLable.amount")
                              },
                              scopedSlots: _vm._u([
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
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "160",
                                label: _vm.$t("order.agency.thLable.created"),
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
                                        attrs: { timestamp: scope.row.created }
                                      })
                                    ]
                                  }
                                }
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "160",
                                label: _vm.$t("order.agency.thLable.updated")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.updated
                                        ? _c(
                                            "span",
                                            [
                                              _c("component-page-timestamp", {
                                                attrs: {
                                                  timestamp: scope.row.updated
                                                }
                                              })
                                            ],
                                            1
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
                                "min-width": "160",
                                label: _vm.$t("order.agency.thLable.operation")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      _c(
                                        "el-popover",
                                        {
                                          staticClass: "ml-2",
                                          attrs: {
                                            placement: "top",
                                            width: "160"
                                          },
                                          model: {
                                            value: scope.row.popover1Visible,
                                            callback: function($$v) {
                                              _vm.$set(
                                                scope.row,
                                                "popover1Visible",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "scope.row.popover1Visible"
                                          }
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "pt-3 pb-3",
                                            domProps: {
                                              innerHTML: _vm._s(
                                                _vm.$t("order.agency.askText", {
                                                  type:
                                                    scope.row.type == 1
                                                      ? _vm.$t(
                                                          "form.transferTypes[0].label"
                                                        )
                                                      : _vm.$t(
                                                          "form.transferTypes[1].label"
                                                        )
                                                })
                                              )
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "text-center" },
                                            [
                                              _c(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    size: "mini",
                                                    type: "text"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      scope.row.popover1Visible = false
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("action.cancel")
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    size: "mini",
                                                    type: "primary"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.handleOrder(
                                                        scope
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("action.confirm")
                                                    )
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-button",
                                            {
                                              attrs: {
                                                slot: "reference",
                                                plain: "",
                                                size: "mini",
                                                disabled: scope.row.status != 1
                                              },
                                              slot: "reference"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("action.confirm"))
                                              )
                                            ]
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-popover",
                                        {
                                          staticClass: "ml-2",
                                          attrs: {
                                            placement: "top",
                                            width: "160"
                                          },
                                          model: {
                                            value: scope.row.popover2Visible,
                                            callback: function($$v) {
                                              _vm.$set(
                                                scope.row,
                                                "popover2Visible",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "scope.row.popover2Visible"
                                          }
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "pt-3 pb-3" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "order.agency.cancelText"
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "text-center" },
                                            [
                                              _c(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    size: "mini",
                                                    type: "text"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      scope.row.popover2Visible = false
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("action.cancel")
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    size: "mini",
                                                    type: "primary"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.cancelOrder(
                                                        scope
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("action.confirm")
                                                    )
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "el-button",
                                            {
                                              attrs: {
                                                slot: "reference",
                                                plain: "",
                                                size: "mini",
                                                disabled: scope.row.status != 1
                                              },
                                              slot: "reference"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("action.cancel"))
                                              )
                                            ]
                                          )
                                        ],
                                        1
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
                  ]
                )
              ])
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("item-create", {
        attrs: { visible: _vm.dialog.visible.create, "org-list": _vm.orgList },
        on: {
          "update:visible": function($event) {
            return _vm.$set(_vm.dialog.visible, "create", $event)
          },
          create: _vm.initDataList
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
    require("vue-hot-reload-api")      .rerender("data-v-ea3420b4", module.exports)
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

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1623)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1625)
/* template */
var __vue_template__ = __webpack_require__(1631)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ea3420b4"
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
Component.options.__file = "resources/assets/js/pages/order/agency/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ea3420b4", Component.options)
  } else {
    hotAPI.reload("data-v-ea3420b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});