webpackJsonp([33],{

/***/ 1423:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1424);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("bd29dab8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e70efb2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e70efb2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.game-list[data-v-3e70efb2] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin: -10px;\n}\n.game-list-item[data-v-3e70efb2] {\n  padding: 10px;\n  width: 240px;\n  position: relative;\n}\n.game-card[data-v-3e70efb2] {\n  overflow: hidden;\n  border-radius: 7px;\n  background-color: #fff;\n  border: 1px solid #F2F6FC;\n  -webkit-transition: .3s;\n  transition: .3s;\n  cursor: pointer;\n}\n.game-card[data-v-3e70efb2]:hover {\n  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n}\n.game-card-body[data-v-3e70efb2] {\n  padding: 20px;\n  color: #303133;\n}\n.game-card-body .card-img[data-v-3e70efb2] {\n  position: relative;\n  overflow: hidden;\n}\n.game-card-body .card-img .mask-layer[data-v-3e70efb2] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  color: #fff;\n}\n.game-card-body .mask-layer .icon[data-v-3e70efb2] {\n  font-size: 1.75rem;\n}\n.game-card-body .mask-layer .info[data-v-3e70efb2] {\n  font-size: 1.25rem;\n  margin-left: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1425:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            loading: true,
            shieldIds: [],
            dataList: []
        };
    },

    computed: {
        playList: function playList() {
            var data = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.dataList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    if (v.type == 1 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
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

            return data;
        },
        multiList: function multiList() {
            var data = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.dataList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var v = _step2.value;

                    if (v.type == 2 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
                    }
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

            return data;
        },
        slotList: function slotList() {
            var data = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.dataList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var v = _step3.value;

                    if (v.type == 3 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
                    }
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

            return data;
        }
    },
    methods: {
        getList: function getList() {
            var _this = this;

            axios.get('/game/getList').then(function (response) {
                _this.shieldIds = response.data.resp_data.shieldIds;
                _this.dataList = response.data.resp_data.gameList;
                _this.loading = false;
            });
        }
    },
    mounted: function mounted() {
        this.getList();
    }
});

/***/ }),

/***/ 1426:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-container" }, [
    _c("div", { staticClass: "page-container-inner" }, [
      _c("div", { staticClass: "app-option-container" }, [
        _c("h4", { staticClass: "container-title" }, [
          _vm._v(_vm._s(_vm.$t("title.game.index")))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "option-list" },
          [
            _c(
              "router-link",
              {
                staticClass: "option-list-item",
                attrs: { tag: "div", to: { name: "game.user" } }
              },
              [
                _c(
                  "div",
                  { staticClass: "icon icon-red" },
                  [
                    _c("font-awesome-icon", {
                      attrs: { "fixed-width": "", icon: "user" }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "name" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.user")))
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "option-list-item",
                attrs: { tag: "div", to: { name: "game.log" } }
              },
              [
                _c(
                  "div",
                  { staticClass: "icon icon-blue" },
                  [
                    _c("font-awesome-icon", {
                      attrs: { "fixed-width": "", icon: "list" }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "name" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.log")))
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "option-list-item",
                attrs: { tag: "div", to: { name: "game.login-log" } }
              },
              [
                _c(
                  "div",
                  { staticClass: "icon icon-green" },
                  [
                    _c("font-awesome-icon", {
                      attrs: { "fixed-width": "", icon: "clipboard" }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "name" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.login-log")))
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "option-list-item",
                attrs: { tag: "div", to: { name: "game.player-bet" } }
              },
              [
                _c(
                  "div",
                  { staticClass: "icon" },
                  [
                    _c("font-awesome-icon", {
                      attrs: { "fixed-width": "", icon: "coins" }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "name" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.player-bet")))
                ])
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
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
          ]
        },
        [
          _vm.playList.length > 0
            ? _c("div", { staticClass: "app-option-container mb-5" }, [
                _c("h4", { staticClass: "container-title" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.list-play")))
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "game-list" },
                  _vm._l(_vm.playList, function(item, index) {
                    return _c(
                      "router-link",
                      {
                        key: index,
                        staticClass: "game-list-item",
                        attrs: { tag: "div", to: { name: item.route } }
                      },
                      [
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
                                        _vm._v(
                                          _vm._s(_vm.$t("game.index.disabled"))
                                        )
                                      ])
                                    ]
                                  )
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "pt-3 text-truncate text-center",
                                attrs: { title: _vm.$t("games." + item.id) }
                              },
                              [_vm._v(_vm._s(_vm.$t("games." + item.id)))]
                            )
                          ])
                        ])
                      ]
                    )
                  }),
                  1
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.multiList.length > 0
            ? _c("div", { staticClass: "app-option-container mb-5" }, [
                _c("h4", { staticClass: "container-title" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.list-multi")))
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "game-list" },
                  _vm._l(_vm.multiList, function(item, index) {
                    return _c(
                      "router-link",
                      {
                        key: index,
                        staticClass: "game-list-item",
                        attrs: { tag: "div", to: { name: item.route } }
                      },
                      [
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
                                        _vm._v(
                                          _vm._s(_vm.$t("game.index.disabled"))
                                        )
                                      ])
                                    ]
                                  )
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "pt-3 text-truncate text-center",
                                attrs: { title: _vm.$t("games." + item.id) }
                              },
                              [_vm._v(_vm._s(_vm.$t("games." + item.id)))]
                            )
                          ])
                        ])
                      ]
                    )
                  }),
                  1
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.slotList.length > 0
            ? _c("div", { staticClass: "app-option-container mb-5" }, [
                _c("h4", { staticClass: "container-title" }, [
                  _vm._v(_vm._s(_vm.$t("title.game.list-slot")))
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "game-list" },
                  _vm._l(_vm.slotList, function(item, index) {
                    return _c(
                      "router-link",
                      {
                        key: index,
                        staticClass: "game-list-item",
                        attrs: { tag: "div", to: { name: item.route } }
                      },
                      [
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
                                        _vm._v(
                                          _vm._s(_vm.$t("game.index.disabled"))
                                        )
                                      ])
                                    ]
                                  )
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "pt-3 text-truncate text-center",
                                attrs: { title: _vm.$t("games." + item.id) }
                              },
                              [_vm._v(_vm._s(_vm.$t("games." + item.id)))]
                            )
                          ])
                        ])
                      ]
                    )
                  }),
                  1
                )
              ])
            : _vm._e()
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3e70efb2", module.exports)
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
  __webpack_require__(1423)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1425)
/* template */
var __vue_template__ = __webpack_require__(1426)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3e70efb2"
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
Component.options.__file = "resources/assets/js/pages/game/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e70efb2", Component.options)
  } else {
    hotAPI.reload("data-v-3e70efb2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});