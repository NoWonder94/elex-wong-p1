webpackJsonp([72],{

/***/ 1546:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1547);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("4ff33aa9", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8678a72c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8678a72c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1547:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.page-content[data-v-8678a72c] {\n    min-height: 700px;\n}\n.dialog-bills[data-v-8678a72c] .el-dialog__body {\n    padding-top: 0;\n    min-height: 320px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1548:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
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
            dialog: {
                visible: {
                    bills: false
                }
            },
            recordLoading: false,
            recordData: {
                bills: [],
                seatIndex: 0
            },
            recordDataLIst: []
        };
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

            var filterOptionCache = _.cloneDeep(this.filterOption);
            if (!_.isEmpty(filterOptionCache.datetime)) {
                filterOptionCache.datetime[0] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[0]);
                filterOptionCache.datetime[1] = this.$helper.makeDatetimeToTimestamp(filterOptionCache.datetime[1]);
            }
            axios.get('/app/game/mahjong/log/getList', {
                params: filterOptionCache
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.dataList = response.data.resp_data.data;
                _this.loading = false;
            });
        },
        dialogPlayerBills: function dialogPlayerBills(scope) {
            // 显示模态框
            this.dialog.visible.bills = true;
            // 读取缓存数据
            var key = scope.row.uid + '.' + scope.row.room_id;
            if (this.recordDataLIst[key]) {
                this.recordData = this.recordDataLIst[key];
                return;
            }
            // 获取玩家游戏明细
            this.getPlayerRecord(key, scope.row);
        },
        getPlayerRecord: function getPlayerRecord(key, data) {
            var _this2 = this;

            this.recordLoading = true;
            axios.get('/app/game/mahjong/log/getPlayerRecord', {
                params: {
                    uid: data.uid,
                    room_id: data.room_id
                }
            }).then(function (response) {
                _this2.recordLoading = false;
                if (response.data.resp_msg.code == 200) {
                    _this2.recordDataLIst[key] = response.data.resp_data;
                    _this2.recordData = response.data.resp_data;
                } else {
                    _this2.$message({
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

/***/ 1549:
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
                              [
                                _c(
                                  "el-input",
                                  {
                                    attrs: {
                                      placeholder: _vm.$t("form.accountId"),
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
                                            _vm.$set(
                                              _vm.filterOption,
                                              "keyword_type",
                                              $$v
                                            )
                                          },
                                          expression:
                                            "filterOption.keyword_type"
                                        }
                                      },
                                      _vm._l(_vm.keywordTypeList, function(
                                        item
                                      ) {
                                        return _c("el-option", {
                                          key: item.id,
                                          attrs: {
                                            label: item.name,
                                            value: item.id
                                          }
                                        })
                                      }),
                                      1
                                    ),
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
                                prop: "id",
                                order: "descending"
                              }
                            },
                            on: { "sort-change": _vm.filterOrderChange }
                          },
                          [
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "170",
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
                                        : _c("span", [
                                            _vm._v(_vm._s(scope.row.account_id))
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
                                        : _c("span", [
                                            _vm._v(_vm._s(scope.row.room_id))
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
                                label: _vm.$t("game.log.thLable.sceneId")
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.scene_id == 1001
                                        ? _c(
                                            "el-tag",
                                            { attrs: { size: "medium" } },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "form.mahjongScenes[0].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.scene_id == 1002
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
                                                    "form.mahjongScenes[1].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.scene_id == 1003
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
                                                    "form.mahjongScenes[2].label"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : scope.row.scene_id == 1004
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
                                                    "form.mahjongScenes[3].label"
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
                                "min-width": "100",
                                label: _vm.$t("game.log.thLable.gainGold")
                              },
                              scopedSlots: _vm._u([
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
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t(
                                  "game.log.thLable.platformCommission"
                                )
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
                                label: _vm.$t("game.log.thLable.ownGold")
                              },
                              scopedSlots: _vm._u([
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
                              ])
                            }),
                            _vm._v(" "),
                            _c("el-table-column", {
                              attrs: {
                                "min-width": "100",
                                label: _vm.$t("game.log.thLable.operation")
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
                                              return _vm.dialogPlayerBills(
                                                scope
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t("game.log.thLable.detail")
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
      _c(
        "el-dialog",
        {
          staticClass: "dialog-bills",
          attrs: {
            title: _vm.$t("game.log.dialog.title"),
            width: "500px",
            visible: _vm.dialog.visible.bills
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "bills", $event)
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
              _c(
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
                            _vm._v(
                              _vm._s(
                                _vm._f("hsMahjongBillsType")(
                                  scope.row.type,
                                  scope.row.info,
                                  _vm.recordData.seatIndex
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
                    attrs: { label: _vm.$t("game.log.dialog.gold") },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _vm._v(
                              _vm._s(scope.row.info.gainGold > 0 ? "+" : "") +
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
                  })
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
    require("vue-hot-reload-api")      .rerender("data-v-8678a72c", module.exports)
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

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1546)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1548)
/* template */
var __vue_template__ = __webpack_require__(1549)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8678a72c"
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
Component.options.__file = "resources/assets/js/pages/game/mahjong/log/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8678a72c", Component.options)
  } else {
    hotAPI.reload("data-v-8678a72c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});