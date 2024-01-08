webpackJsonp([69],{

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1583);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("da955340", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c21535a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c21535a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1583:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.game-container[data-v-1c21535a] {\n  padding: 20px;\n}\n.el-row[data-v-1c21535a], .el-col[data-v-1c21535a] {\n  margin-bottom: 20px;\n}\n.grid-content[data-v-1c21535a] {\n  font-size: 0.875rem;\n  color: #606266;\n}\n.grid-content-title[data-v-1c21535a] {\n  font-size: 1rem;\n}\n.grid-content-item[data-v-1c21535a] {\n  min-width: 150px;\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ 1584:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            loading: {
                gameStatus: false
            },
            error: {
                gameStatus: false
            },
            gameStatus: {
                amount_playing: [],
                amount_robot: []
            }
        };
    },

    methods: {
        getGameStatus: function getGameStatus() {
            var _this = this;

            this.error.gameStatus = false;
            this.loading.gameStatus = true;
            axios.get('/app/game/niuniu/index/getGameStatus').then(function (response) {
                if (response.data.resp_msg.code == 200) {
                    _this.gameStatus = response.data.resp_data;
                } else {
                    _this.error.gameStatus = true;
                }
                _this.loading.gameStatus = false;
            });
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        this.getGameStatus();
        // 定时更新在线人数
        this.intervalId = setInterval(function () {
            if (!_this2.loading.gameStatus) {
                _this2.getGameStatus();
            }
        }, 10000);
    },
    beforeDestroy: function beforeDestroy() {
        clearInterval(this.intervalId);
    }
});

/***/ }),

/***/ 1585:
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
              _c("div", { staticClass: "game-container" }, [
                _c("div", { staticClass: "app-option-container" }, [
                  _c("h4", { staticClass: "container-title" }, [
                    _vm._v(_vm._s(_vm.$t("game.niuniu.index.gameStatus")))
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: _vm.loading.gameStatus,
                          expression: "loading.gameStatus"
                        }
                      ]
                    },
                    [
                      _vm.error.gameStatus
                        ? _c(
                            "div",
                            { staticClass: "text-danger-custom flex-center" },
                            [
                              _c("i", { staticClass: "el-icon-error" }),
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.$t("messages.loading-failed")) +
                                  " \n                                    "
                              ),
                              _c(
                                "a",
                                {
                                  attrs: { href: "javascript:;" },
                                  on: { click: _vm.getGameStatus }
                                },
                                [_vm._v(_vm._s(_vm.$t("refresh")))]
                              )
                            ]
                          )
                        : _c(
                            "el-row",
                            { attrs: { gutter: 20 } },
                            [
                              _c(
                                "el-col",
                                { attrs: { lg: 12 } },
                                [
                                  _c(
                                    "el-card",
                                    {
                                      staticClass: "grid-content",
                                      attrs: { shadow: "never" }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "grid-content-title",
                                          attrs: { slot: "header" },
                                          slot: "header"
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "game.niuniu.index.onlineTotalPlayer"
                                              )
                                            )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[0].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1001],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[1].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1002],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[2].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1003],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[3].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1004],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[4].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1005],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[5].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_playing[1006],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                { attrs: { lg: 12 } },
                                [
                                  _c(
                                    "el-card",
                                    {
                                      staticClass: "grid-content",
                                      attrs: { shadow: "never" }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "grid-content-title",
                                          attrs: { slot: "header" },
                                          slot: "header"
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "game.niuniu.index.AIQuantity"
                                              )
                                            )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[0].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1001],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[1].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1002],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[2].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1003],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[3].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1004],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[4].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1005],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "grid-content-item" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.$t(
                                                "form.niuniuScenes[5].label"
                                              )
                                            ) +
                                              "：" +
                                              _vm._s(
                                                _vm._f("numeral")(
                                                  _vm.gameStatus
                                                    .amount_robot[1006],
                                                  "0,0.[0000]"
                                                )
                                              )
                                          )
                                        ]
                                      )
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
                ])
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
    require("vue-hot-reload-api")      .rerender("data-v-1c21535a", module.exports)
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

/***/ 722:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1582)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1584)
/* template */
var __vue_template__ = __webpack_require__(1585)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1c21535a"
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
Component.options.__file = "resources/assets/js/pages/game/niuniu/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c21535a", Component.options)
  } else {
    hotAPI.reload("data-v-1c21535a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});