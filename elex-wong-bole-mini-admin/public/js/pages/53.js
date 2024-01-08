webpackJsonp([53],{

/***/ 1370:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1371);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("47fef83a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75d83173\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75d83173\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1371:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__org_Tree_vue__ = __webpack_require__(1373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__org_Tree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__org_Tree_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__member_Index_vue__ = __webpack_require__(1378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__member_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__member_Index_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        ContactsOrgTree: __WEBPACK_IMPORTED_MODULE_0__org_Tree_vue___default.a,
        ContactsMember: __WEBPACK_IMPORTED_MODULE_1__member_Index_vue___default.a
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

/***/ 1373:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1374)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1376)
/* template */
var __vue_template__ = __webpack_require__(1377)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-13831258"
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
Component.options.__file = "resources/assets/js/pages/agency/contacts/org/Tree.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13831258", Component.options)
  } else {
    hotAPI.reload("data-v-13831258", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1374:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1375);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("7c6934ad", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13831258\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tree.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13831258\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1375:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.org-tree-node[data-v-13831258] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 0.875rem;\n}\n.org-tree-node .node-info[data-v-13831258] {\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.org-tree-node .node-icon[data-v-13831258] {\n  color: #c7daf1;\n}\n.org-tree-node .node-option[data-v-13831258] {\n  display: none;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  text-align: center;\n  width: 60px;\n}\n.el-tree-node.is-current > .el-tree-node__content .org-tree-node .node-option[data-v-13831258],\n.el-tree-node__content:hover .node-option[data-v-13831258] {\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ 1376:
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
    name: "ContactsOrgTree",
    data: function data() {
        return {
            rootOrgId: 0,
            orgListLoading: 'dle',
            orgList: [],
            orgProps: {
                label: 'name',
                children: 'children'
            },
            nodeCache: {
                data: {},
                node: {}
            },
            nodePreCache: {
                node: {},
                nodeKey: 0
            },
            dialog: {
                visible: {
                    create: false,
                    update: false,
                    destroy: false
                }
            },
            dataCreate: {
                name: '',
                parent_id: 0,
                parent_name: 0
            },
            dataUpdate: {
                id: 0,
                sort: 0,
                name: ''
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorName: function errorName() {
            if (this.msg.code == 42000 && this.msg.errors.name) {
                return this.msg.errors.name[0];
            }
        },
        errorSort: function errorSort() {
            if (this.msg.code == 42000 && this.msg.errors.sort) {
                return this.msg.errors.sort[0];
            }
        }
    },
    methods: {
        getOrgList: function getOrgList() {
            var _this = this;

            this.orgListLoading = 'loading';
            axios.get('/agency/org/getList').then(function (response) {
                _this.orgList = response.data.resp_data;
                _this.orgListLoading = !_this.orgList.length ? 'nodata' : 'dle';
                // 初始化选中根节点
                _this.$nextTick(function () {
                    this.rootOrgId = this.orgList[0].id;
                    this.$refs.treeOrg.setCurrentKey(this.orgList[0].id);
                    this.selectNode(this.orgList[0]);
                });
            });
        },

        // 点击选中 tree 节点
        selectNode: function selectNode(data) {
            this.$emit('click', data);
        },

        // 打开 option 弹窗扩展处理
        nodeOptionSelectNode: function nodeOptionSelectNode(data, node) {
            // 缓存触发选中节点数据
            this.nodeCache.data = data;
            // 缓存触发选中节点
            this.nodeCache.node = node;
        },

        // 隐藏 option 弹窗扩展处理
        nodeOptionVisibleChange: function nodeOptionVisibleChange(visible) {
            if (visible) {
                // 缓存当前选中节点
                this.nodePreCache.node = this.$refs.treeOrg.getCurrentNode();
                // 缓存当前选中节点 key
                this.nodePreCache.nodeKey = this.$refs.treeOrg.getCurrentKey();
                // 修改当前选中节点
                this.$refs.treeOrg.setCurrentKey(this.nodeCache.node.key);
            } else {
                // 还原之前选中节点
                this.$refs.treeOrg.setCurrentKey(this.nodePreCache.nodeKey);
            }
        },

        // 分发 option 操作选项
        dialogNodeOption: function dialogNodeOption(option) {
            switch (option) {
                case 'create':
                    this.initDataCreate();
                    this.dialog.visible.create = true;
                    break;
                case 'update':
                    this.initDataUpdate();
                    this.dialog.visible.update = true;
                    break;
                case 'destroy':
                    this.dialog.visible.destroy = true;
                    break;
            }
        },

        // 初始化参数
        initMsg: function initMsg() {
            this.msg.code = 200;
            this.msg.message = '';
            this.msg.errors = {};
        },

        // 初始化新增子节点数据
        initDataCreate: function initDataCreate() {
            this.initMsg();
            this.dataCreate.name = '';
            this.dataCreate.parent_id = this.nodeCache.data.id;
            this.dataCreate.parent_name = this.nodeCache.data.name;
        },

        // 编初始化辑节点数据
        initDataUpdate: function initDataUpdate() {
            this.initMsg();
            this.dataUpdate.id = this.nodeCache.data.id;
            this.dataUpdate.sort = this.nodeCache.data.sort;
            this.dataUpdate.name = this.nodeCache.data.name;
        },

        // 新增子节点
        treeNodeCreate: function treeNodeCreate() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/org/saveItem', this.dataCreate).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    _this2.dialog.visible.create = false;
                    // 添加节点到 tree 组件
                    _this2.$refs.treeOrg.append(response.data.resp_data, _this2.nodeCache.node);
                } else {
                    _this2.msg = response.data.resp_msg;
                }
            });
        },

        // 编辑节点
        treeNodeUpdate: function treeNodeUpdate() {
            var _this3 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/org/saveItem', this.dataUpdate).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this3.$message({
                        type: 'success',
                        message: _this3.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    _this3.dialog.visible.update = false;
                    // 同步数据到 tree 节点
                    _this3.treeNodeSyncData(response.data.resp_data);
                } else {
                    _this3.msg = response.data.resp_msg;
                }
            });
        },

        // 同步数据到 tree 节点，并排序
        treeNodeSyncData: function treeNodeSyncData(data) {
            // 更新当前节点
            this.nodeCache.data.name = data.name;
            // 是否重新排序
            if (this.nodeCache.data.sort == data.sort) {
                return;
            }
            this.nodeCache.data.sort = data.sort;

            // 缓存父级节点
            var parent = this.$refs.treeOrg.getNode(this.nodeCache.node.parent.key);
            // 缓存所有同级数据
            var parentDataChildren = _.cloneDeep(parent.data.children);

            // 同级数据排序
            parentDataChildren.sort(function (a, b) {
                if (a.sort < b.sort) {
                    return -1;
                } else if (a.sort > b.sort) {
                    return 1;
                } else {
                    return 0;
                }
            });
            // 更新同级数据到 tree
            for (var i in parentDataChildren) {
                this.$refs.treeOrg.remove(parentDataChildren[i].id);
                this.$refs.treeOrg.append(parentDataChildren[i], parent);
            }
        },

        // 删除节点
        treeNodeDestroy: function treeNodeDestroy() {
            var _this4 = this;

            this.dialog.visible.destroy = false;
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/org/destroy', {
                id: this.nodeCache.data.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this4.$message({
                        type: 'success',
                        message: _this4.$t('messages.delete-succeeded'),
                        showClose: true,
                        onClose: function onClose() {
                            window.location.reload();
                        }
                    });
                    //  从 tree 组件删除节点
                    // this.$refs.treeOrg.remove(this.nodeCache.node)
                } else if (response.data.resp_msg.code == 43221) {
                    _this4.$message({
                        type: 'warning',
                        message: _this4.$t('messages.delete-agent-failed'),
                        showClose: true
                    });
                } else {
                    _this4.$message({
                        type: 'error',
                        message: _this4.$t('messages.delete-failed'),
                        showClose: true
                    });
                }
            });
        }
    },
    mounted: function mounted() {
        this.getOrgList();
    }
});

/***/ }),

/***/ 1377:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "tree-conteiner" },
    [
      !_vm.orgList.length
        ? _c(
            "div",
            { staticClass: "p-2" },
            [
              _c("component-page-loading", {
                attrs: { status: _vm.orgListLoading }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.orgList.length
        ? _c("el-tree", {
            ref: "treeOrg",
            attrs: {
              "highlight-current": "",
              "node-key": "id",
              indent: 18,
              data: _vm.orgList,
              props: _vm.orgProps,
              "default-expanded-keys": [_vm.orgList[0].id],
              "expand-on-click-node": false
            },
            on: { "current-change": _vm.selectNode },
            scopedSlots: _vm._u(
              [
                {
                  key: "default",
                  fn: function(ref) {
                    var node = ref.node
                    var data = ref.data
                    return _c(
                      "div",
                      { staticClass: "org-tree-node" },
                      [
                        _c(
                          "div",
                          { staticClass: "node-info" },
                          [
                            _c("font-awesome-icon", {
                              staticClass: "node-icon",
                              attrs: { icon: "folder" }
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(data.name))])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.rootOrgId == data.id ||
                        _vm.rootOrgId == data.parent_id
                          ? _c(
                              "el-dropdown",
                              {
                                staticClass: "node-option",
                                attrs: {
                                  size: "small",
                                  trigger: "click",
                                  placement: "bottom"
                                },
                                on: {
                                  command: _vm.dialogNodeOption,
                                  "visible-change": _vm.nodeOptionVisibleChange
                                }
                              },
                              [
                                _c("i", {
                                  staticClass: "el-icon-more",
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.nodeOptionSelectNode(
                                        data,
                                        node
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "el-dropdown-menu",
                                  {
                                    attrs: { slot: "dropdown" },
                                    slot: "dropdown"
                                  },
                                  [
                                    _c(
                                      "el-dropdown-item",
                                      { attrs: { command: "update" } },
                                      [_vm._v(_vm._s(_vm.$t("action.edit")))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-dropdown-item",
                                      {
                                        attrs: {
                                          command: "destroy",
                                          disabled: Boolean(data.children)
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.$t("action.delete")))]
                                    ),
                                    _vm._v(" "),
                                    _vm.rootOrgId == data.id
                                      ? _c(
                                          "el-dropdown-item",
                                          { attrs: { command: "create" } },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$t("action.create") +
                                                  _vm.$t("agency.child")
                                              )
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "el-dropdown-item",
                                      { attrs: { disabled: "" } },
                                      [_vm._v("ID : " + _vm._s(data.id))]
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
                    )
                  }
                }
              ],
              null,
              false,
              3929635050
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.contacts.createDialog.title"),
            width: "460px",
            visible: _vm.dialog.visible.create
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "create", $event)
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
                { attrs: { model: _vm.dataCreate, "label-width": "120px" } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: _vm.$t("agency.contacts.createDialog.parentName")
                      }
                    },
                    [
                      _c("span", { staticClass: "mr-2" }, [
                        _vm._v(_vm._s(_vm.dataCreate.parent_name))
                      ]),
                      _vm._v(" "),
                      _c("el-tag", { attrs: { type: "info", size: "mini" } }, [
                        _vm._v(_vm._s(_vm.dataCreate.parent_id))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: _vm.$t("agency.contacts.createDialog.name"),
                        error: _vm.errorName,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: {
                          placeholder: _vm.$t(
                            "agency.contacts.createDialog.nameplaceholder"
                          )
                        },
                        model: {
                          value: _vm.dataCreate.name,
                          callback: function($$v) {
                            _vm.$set(_vm.dataCreate, "name", $$v)
                          },
                          expression: "dataCreate.name"
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
                          attrs: { type: "primary" },
                          on: { click: _vm.treeNodeCreate }
                        },
                        [_vm._v(_vm._s(_vm.$t("action.confirm")))]
                      ),
                      _vm._v(" "),
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.contacts.updateDialog.title"),
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
          _c(
            "div",
            { staticClass: "pr-5" },
            [
              _c(
                "el-form",
                { attrs: { model: _vm.dataUpdate, "label-width": "80px" } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: _vm.$t("agency.contacts.updateDialog.sort"),
                        error: _vm.errorSort,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: {
                          placeholder: _vm.$t(
                            "agency.contacts.updateDialog.sortPlaceholder"
                          )
                        },
                        model: {
                          value: _vm.dataUpdate.sort,
                          callback: function($$v) {
                            _vm.$set(_vm.dataUpdate, "sort", $$v)
                          },
                          expression: "dataUpdate.sort"
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
                        label: _vm.$t("agency.contacts.updateDialog.name"),
                        error: _vm.errorName,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: {
                          placeholder: _vm.$t(
                            "agency.contacts.updateDialog.nameplaceholder"
                          )
                        },
                        model: {
                          value: _vm.dataUpdate.name,
                          callback: function($$v) {
                            _vm.$set(_vm.dataUpdate, "name", $$v)
                          },
                          expression: "dataUpdate.name"
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
                          attrs: { type: "primary" },
                          on: { click: _vm.treeNodeUpdate }
                        },
                        [_vm._v(_vm._s(_vm.$t("action.confirm")))]
                      ),
                      _vm._v(" "),
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("agency.contacts.destroyDialog.title"),
            center: "",
            width: "400px",
            visible: _vm.dialog.visible.destroy
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "destroy", $event)
            }
          }
        },
        [
          _c("div", {
            staticClass: "text-center",
            domProps: {
              innerHTML: _vm._s(
                _vm.$t("agency.contacts.destroyDialog.askText", {
                  name: _vm.nodeCache.data.name
                })
              )
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "text-center mt-2" }, [
            _vm._v(_vm._s(_vm.$t("agency.contacts.destroyDialog.desc")))
          ]),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.treeNodeDestroy }
                },
                [_vm._v(_vm._s(_vm.$t("action.confirm")))]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.dialog.visible.destroy = false
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.$t("action.cancel")))]
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
    require("vue-hot-reload-api")      .rerender("data-v-13831258", module.exports)
  }
}

/***/ }),

/***/ 1378:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1379)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1381)
/* template */
var __vue_template__ = __webpack_require__(1392)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0248f9cc"
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
Component.options.__file = "resources/assets/js/pages/agency/contacts/member/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0248f9cc", Component.options)
  } else {
    hotAPI.reload("data-v-0248f9cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1379:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1380);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("6c8c4d1b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0248f9cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0248f9cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1380:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.member-container[data-v-0248f9cc] {\n  min-height: 700px;\n}\n.member-filter-option[data-v-0248f9cc] {\n  padding: 22px 20px 0 20px;\n}\n.member-filter-option .el-form-item[data-v-0248f9cc] {\n  margin-bottom: 20px;\n}\n.member-main[data-v-0248f9cc] {\n  padding: 0 20px 20px 20px;\n}\n.detail-container[data-v-0248f9cc] label {\n  color: #909399;\n}\n.detail-container[data-v-0248f9cc] .el-form-item {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue__ = __webpack_require__(1382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue__ = __webpack_require__(1387);
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
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'MemberList',
    components: {
        ItemCreate: __WEBPACK_IMPORTED_MODULE_0__ItemCreate_vue___default.a,
        ItemUpdate: __WEBPACK_IMPORTED_MODULE_1__ItemUpdate_vue___default.a
    },
    props: ['org', 'rootOrgId'],
    data: function data() {
        return {
            initStatus: true,
            initDataStatus: false,
            loading: true,
            filterOption: {
                org_id: 0,
                type: '',
                status: '',
                keyword: '',
                page: 1,
                page_size: 10,
                order: 4
            },
            dataCount: {
                total: 0
            },
            dataList: [],
            itemCache: {},
            itemCacheIndex: null,
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
                this.filterOrgChange();
            }
        }
    },
    methods: {
        initData: function initData() {
            // org change 访问标记
            this.initStatus = true;
            // org change 标记数据是否存在
            this.initDataStatus = false;
            // 初始化筛选参数
            this.filterOption.type = '';
            this.filterOption.status = '';
            this.filterOption.keyword = '';
            this.filterOption.order = 4;
            // 初始化数据
            this.dataCount.total = 0;
            this.dataList = [];
        },
        filterOrgChange: function filterOrgChange() {
            this.initData();

            this.clearFilterOption();
            this.filterOption.org_id = this.org.id;
            this.getMemberList();
        },
        clearFilterOption: function clearFilterOption() {
            this.loading = true;
            this.filterOption.page = 1;
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getMemberList();
        },
        filterPageChange: function filterPageChange(page) {
            this.loading = true;
            this.filterOption.page = page;
            this.getMemberList();
        },
        filterOrderChange: function filterOrderChange(scope) {
            if (scope.prop == 'id') {
                this.filterOption.order = scope.order == 'ascending' ? 1 : 2;
            } else if (scope.prop == 'updated') {
                this.filterOption.order = scope.order == 'ascending' ? 3 : 4;
            }
            if (!this.dataList.length) {
                return false;
            }
            this.clearFilterOption();
            this.getMemberList();
        },
        getMemberList: function getMemberList() {
            var _this = this;

            axios.get('/agency/member/getList', {
                params: this.filterOption
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.dataList = response.data.resp_data.data;
                _this.loading = false;

                // org change 访问标记
                if (_this.initStatus) {
                    _this.initStatus = false;
                    if (_this.dataList.length) {
                        _this.initDataStatus = true;
                    }
                }
            });
        },

        // 修改状态
        saveItemStatus: function saveItemStatus(scope) {
            var _this2 = this;

            // 关闭提示框
            scope.row.popoverVisible = false;
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/member/saveItemStatus', {
                id: scope.row.id,
                status: scope.row.status == 1 ? 2 : 1
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    scope.row.status = response.data.resp_data.status;
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                } else {
                    _this2.$message({
                        type: 'error',
                        message: _this2.$t('messages.save-failed'),
                        showClose: true
                    });
                }
            });
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
            this.dataList[this.itemCacheIndex].type = data.type;
            this.dataList[this.itemCacheIndex].name = data.name;
            this.dataList[this.itemCacheIndex].tel = data.tel;
            this.dataList[this.itemCacheIndex].tele = data.tele;
        }
    }
});

/***/ }),

/***/ 1382:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1383)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1385)
/* template */
var __vue_template__ = __webpack_require__(1386)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cc907236"
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
Component.options.__file = "resources/assets/js/pages/agency/contacts/member/ItemCreate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc907236", Component.options)
  } else {
    hotAPI.reload("data-v-cc907236", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1383:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1384);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("46e356a8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc907236\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemCreate.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc907236\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemCreate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1384:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n[data-v-cc907236] .el-dialog__body {\n    padding-top: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1385:
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
    name: "ItemCreate",
    props: ['visible', 'org'],
    data: function data() {
        return {
            typeList: [{
                id: 2,
                name: this.$t('form.memberTypes[1].label')
            }, {
                id: 1,
                name: this.$t('form.memberTypes[0].label')
            }],
            dialogVisible: false,
            dataCache: {
                org_id: 0,
                org_name: '',
                email: '',
                password: '',
                type: '',
                name: '',
                tel: '',
                tele: ''
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorNewEmail: function errorNewEmail() {
            if (this.msg.code == 42000 && this.msg.errors.email) {
                return this.msg.errors.email[0];
            } else if (this.msg.code == 43202) {
                return this.msg.message;
            }
        },
        errorNewPassword: function errorNewPassword() {
            if (this.msg.code == 42000 && this.msg.errors.password) {
                return this.msg.errors.password[0];
            }
        },
        errorType: function errorType() {
            if (this.msg.code == 42000 && this.msg.errors.type) {
                return this.msg.errors.type[0];
            }
        },
        errorName: function errorName() {
            if (this.msg.code == 42000 && this.msg.errors.name) {
                return this.msg.errors.name[0];
            }
        },
        errorTel: function errorTel() {
            if (this.msg.code == 42000 && this.msg.errors.tel) {
                return this.msg.errors.tel[0];
            }
        },
        errorTele: function errorTele() {
            if (this.msg.code == 42000 && this.msg.errors.tele) {
                return this.msg.errors.tele[0];
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
            this.dataCache.org_id = org.id;
            this.dataCache.org_name = org.name;
            this.dataCache.email = '';
            this.dataCache.password = '';
            this.dataCache.type = '';
            this.dataCache.name = '';
            this.dataCache.tel = '';
            this.dataCache.tele = '';
        },
        onSubmit: function onSubmit() {
            var _this = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/member/saveItem', this.dataCache).then(function (response) {
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
                } else {
                    _this.msg = response.data.resp_msg;
                }
            });
        }
    }
});

/***/ }),

/***/ 1386:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("agency.contacts.memberCreateDialog.title"),
        width: "640px",
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
            { attrs: { model: _vm.dataCache, "label-width": "120px" } },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: _vm.$t("agency.contacts.memberCreateDialog.orgName")
                  }
                },
                [
                  _c("span", { staticClass: "mr-2" }, [
                    _vm._v(_vm._s(_vm.dataCache.org_name))
                  ]),
                  _vm._v(" "),
                  _c("el-tag", { attrs: { type: "info", size: "mini" } }, [
                    _vm._v(_vm._s(_vm.dataCache.org_id))
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: _vm.$t("agency.contacts.memberCreateDialog.email"),
                    error: _vm.errorNewEmail,
                    required: ""
                  }
                },
                [
                  _c("el-input", {
                    attrs: {
                      placeholder: _vm.$t(
                        "agency.contacts.memberCreateDialog.emailPlaceholder"
                      )
                    },
                    model: {
                      value: _vm.dataCache.email,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "email", $$v)
                      },
                      expression: "dataCache.email"
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
                    label: _vm.$t("agency.contacts.memberCreateDialog.pwd"),
                    error: _vm.errorNewPassword,
                    required: ""
                  }
                },
                [
                  _c("el-input", {
                    attrs: {
                      placeholder: _vm.$t(
                        "agency.contacts.memberCreateDialog.pwdPlaceholder"
                      )
                    },
                    model: {
                      value: _vm.dataCache.password,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "password", $$v)
                      },
                      expression: "dataCache.password"
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
                    label: _vm.$t("agency.contacts.memberCreateDialog.type"),
                    error: _vm.errorType,
                    required: ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dataCache.type,
                        callback: function($$v) {
                          _vm.$set(_vm.dataCache, "type", $$v)
                        },
                        expression: "dataCache.type"
                      }
                    },
                    _vm._l(_vm.typeList, function(item) {
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
                    label: _vm.$t("agency.contacts.memberCreateDialog.name"),
                    error: _vm.errorName,
                    required: ""
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.name,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "name", $$v)
                      },
                      expression: "dataCache.name"
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
                    label: _vm.$t("agency.contacts.memberCreateDialog.tel"),
                    error: _vm.errorTel
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.tel,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "tel", $$v)
                      },
                      expression: "dataCache.tel"
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
                    label: _vm.$t("agency.contacts.memberCreateDialog.tele"),
                    error: _vm.errorTele
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.tele,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "tele", $$v)
                      },
                      expression: "dataCache.tele"
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
    require("vue-hot-reload-api")      .rerender("data-v-cc907236", module.exports)
  }
}

/***/ }),

/***/ 1387:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1388)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1390)
/* template */
var __vue_template__ = __webpack_require__(1391)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3677b032"
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
Component.options.__file = "resources/assets/js/pages/agency/contacts/member/ItemUpdate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3677b032", Component.options)
  } else {
    hotAPI.reload("data-v-3677b032", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1388:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1389);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("0ceb3cfe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3677b032\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemUpdate.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3677b032\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ItemUpdate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1389:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1390:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ItemUpdate",
    props: ['visible', 'data'],
    data: function data() {
        return {
            typeList: [{
                id: 2,
                name: this.$t('form.memberTypes[1].label')
            }, {
                id: 1,
                name: this.$t('form.memberTypes[0].label')
            }],
            dialogVisible: false,
            dataCache: {
                id: 0,
                type: 1,
                name: '',
                tel: '',
                tele: '',
                user_id: 0,
                password: ''
            },
            msg: {
                code: 200,
                message: '',
                errors: {}
            }
        };
    },

    computed: {
        errorType: function errorType() {
            if (this.msg.code == 42000 && this.msg.errors.type) {
                return this.msg.errors.type[0];
            }
        },
        errorName: function errorName() {
            if (this.msg.code == 42000 && this.msg.errors.name) {
                return this.msg.errors.name[0];
            }
        },
        errorTel: function errorTel() {
            if (this.msg.code == 42000 && this.msg.errors.tel) {
                return this.msg.errors.tel[0];
            }
        },
        errorTele: function errorTele() {
            if (this.msg.code == 42000 && this.msg.errors.tele) {
                return this.msg.errors.tele[0];
            }
        },
        errorPassword: function errorPassword() {
            if (this.msg.code == 42000 && this.msg.errors.password) {
                return this.msg.errors.password[0];
            }
        }
    },
    watch: {
        visible: function visible(n, o) {
            // 变量赋值
            this.dialogVisible = n;
            // 初始化参数
            // n && this.initData(this.data);
            n && this.$nextTick(function () {
                this.initData(this.data);
            });
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
            this.dataCache.id = data.id;
            this.dataCache.type = data.type;
            this.dataCache.name = data.name;
            this.dataCache.tel = data.tel;
            this.dataCache.tele = data.tele;
            this.dataCache.user_id = data.user_id;
            this.dataCache.password = '';
        },
        onSubmit: function onSubmit() {
            var _this = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/agency/member/saveItem', this.dataCache).then(function (response) {
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

/***/ 1391:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("agency.contacts.memberUpdateDialog.title"),
        width: "540px",
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
            { attrs: { model: _vm.dataCache, "label-width": "120px" } },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: _vm.$t("agency.contacts.memberUpdateDialog.type"),
                    error: _vm.errorType,
                    required: ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dataCache.type,
                        callback: function($$v) {
                          _vm.$set(_vm.dataCache, "type", $$v)
                        },
                        expression: "dataCache.type"
                      }
                    },
                    _vm._l(_vm.typeList, function(item) {
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
                    label: _vm.$t("agency.contacts.memberUpdateDialog.name"),
                    error: _vm.errorName,
                    required: ""
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.name,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "name", $$v)
                      },
                      expression: "dataCache.name"
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
                    label: _vm.$t("agency.contacts.memberUpdateDialog.tel"),
                    error: _vm.errorTel
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.tel,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "tel", $$v)
                      },
                      expression: "dataCache.tel"
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
                    label: _vm.$t("agency.contacts.memberUpdateDialog.tele"),
                    error: _vm.errorTele
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.dataCache.tele,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "tele", $$v)
                      },
                      expression: "dataCache.tele"
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
                    placeholder: _vm.$t(
                      "agency.contacts.memberUpdateDialog.pwd"
                    ),
                    error: _vm.errorPassword
                  }
                },
                [
                  _c("el-input", {
                    attrs: {
                      placeholder: _vm.$t(
                        "agency.contacts.memberUpdateDialog.pwdPlaceholder"
                      )
                    },
                    model: {
                      value: _vm.dataCache.password,
                      callback: function($$v) {
                        _vm.$set(_vm.dataCache, "password", $$v)
                      },
                      expression: "dataCache.password"
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
    require("vue-hot-reload-api")      .rerender("data-v-3677b032", module.exports)
  }
}

/***/ }),

/***/ 1392:
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
      staticClass: "member-container"
    },
    [
      !_vm.loading && !_vm.initDataStatus
        ? _c("div", { staticClass: "flex-center text-aux p-5" }, [
            _vm.org.id == _vm.rootOrgId || _vm.org.parent_id == _vm.rootOrgId
              ? _c("div", [
                  _c("span", [
                    _vm._v(_vm._s(_vm.$t("agency.contacts.memberAskText")))
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
                    [_vm._v(_vm._s(_vm.$t("action.create")))]
                  )
                ])
              : _c("div", { staticClass: "font-size-third" }, [
                  _vm._v(_vm._s(_vm.$t("messages.empty")))
                ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.initDataStatus
        ? _c("div", { staticClass: "member-filter" }, [
            _c(
              "div",
              { staticClass: "member-filter-option" },
              [
                _c(
                  "el-form",
                  { attrs: { inline: true, model: _vm.filterOption } },
                  [
                    _c(
                      "el-form-item",
                      { staticClass: "el-form-item-medium" },
                      [
                        _c(
                          "el-select",
                          {
                            attrs: {
                              placeholder: _vm.$t("form.memberType"),
                              clearable: ""
                            },
                            on: { change: _vm.filterChange },
                            model: {
                              value: _vm.filterOption.type,
                              callback: function($$v) {
                                _vm.$set(_vm.filterOption, "type", $$v)
                              },
                              expression: "filterOption.type"
                            }
                          },
                          _vm._l(_vm.$t("form.memberTypes"), function(
                            item,
                            index
                          ) {
                            return _c("el-option", {
                              key: index,
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
                      { staticClass: "el-form-item-medium" },
                      [
                        _c(
                          "el-select",
                          {
                            attrs: {
                              placeholder: _vm.$t("form.memberStatus"),
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
                          _vm._l(_vm.$t("form.memberStatusList"), function(
                            item,
                            index
                          ) {
                            return _c("el-option", {
                              key: index,
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
                      [
                        _c(
                          "el-input",
                          {
                            attrs: {
                              placeholder: _vm.$t("form.memberKeyword"),
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
                    ),
                    _vm._v(" "),
                    _vm.org.id == _vm.rootOrgId ||
                    _vm.org.parent_id == _vm.rootOrgId
                      ? _c(
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
                      : _vm._e()
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "list-space" })
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.initDataStatus
        ? _c(
            "div",
            { staticClass: "member-main" },
            [
              _c(
                "el-table",
                {
                  staticStyle: { width: "100%" },
                  attrs: {
                    data: _vm.dataList,
                    "default-sort": { prop: "updated", order: "descending" }
                  },
                  on: { "sort-change": _vm.filterOrderChange }
                },
                [
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "70",
                      label: "ID",
                      prop: "id",
                      sortable: "custom",
                      "sort-orders": ["ascending", "descending"]
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "100",
                      label: _vm.$t("agency.contacts.thLable.name"),
                      "show-overflow-tooltip": ""
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c("span", {
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.$options.filters.hsFilterKeyword(
                                      scope.row.name,
                                      _vm.filterOption.keyword
                                    )
                                  )
                                }
                              })
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      2533731960
                    )
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "160",
                      label: _vm.$t("agency.contacts.thLable.email"),
                      "show-overflow-tooltip": ""
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c("span", {
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.$options.filters.hsFilterKeyword(
                                      scope.row.user_email,
                                      _vm.filterOption.keyword
                                    )
                                  )
                                }
                              })
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      2188404893
                    )
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "120",
                      label: _vm.$t("agency.contacts.thLable.type")
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.type == 2
                                ? _c(
                                    "el-tag",
                                    {
                                      attrs: { size: "medium", type: "danger" }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t("form.memberTypes[1].label")
                                        )
                                      )
                                    ]
                                  )
                                : _c(
                                    "el-tag",
                                    { attrs: { size: "medium", type: "info" } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t("form.memberTypes[0].label")
                                        )
                                      )
                                    ]
                                  )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      568761570
                    )
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "90",
                      label: _vm.$t("agency.contacts.thLable.status")
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.status == 1
                                ? _c("el-tag", { attrs: { size: "medium" } }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("form.memberStatusList[0].label")
                                      )
                                    )
                                  ])
                                : _c(
                                    "el-tag",
                                    {
                                      attrs: { size: "medium", type: "danger" }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t(
                                            "form.memberStatusList[1].label"
                                          )
                                        )
                                      )
                                    ]
                                  )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      1406237933
                    )
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      "min-width": "160",
                      label: _vm.$t("agency.contacts.thLable.updated"),
                      prop: "updated",
                      sortable: "custom",
                      "sort-orders": ["ascending", "descending"]
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c("component-page-timestamp", {
                                attrs: { timestamp: scope.row.updated }
                              })
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      3759309664
                    )
                  }),
                  _vm._v(" "),
                  _vm.org.id == _vm.rootOrgId ||
                  _vm.org.parent_id == _vm.rootOrgId
                    ? _c("el-table-column", {
                        attrs: {
                          "min-width": "150",
                          label: _vm.$t("agency.contacts.thLable.operation")
                        },
                        scopedSlots: _vm._u(
                          [
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
                                    "el-popover",
                                    {
                                      staticClass: "ml-2",
                                      attrs: { placement: "top", width: "160" },
                                      model: {
                                        value: scope.row.popoverVisible,
                                        callback: function($$v) {
                                          _vm.$set(
                                            scope.row,
                                            "popoverVisible",
                                            $$v
                                          )
                                        },
                                        expression: "scope.row.popoverVisible"
                                      }
                                    },
                                    [
                                      _c("div", { staticClass: "pt-3 pb-3" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm.$t("agency.contacts.askText", {
                                              status:
                                                scope.row.status == 2
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
                                              attrs: {
                                                size: "mini",
                                                type: "text"
                                              },
                                              on: {
                                                click: function($event) {
                                                  scope.row.popoverVisible = false
                                                }
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("action.cancel"))
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
                                                  return _vm.saveItemStatus(
                                                    scope
                                                  )
                                                }
                                              }
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
                                      scope.row.status == 2
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
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("action.on"))
                                              )
                                            ]
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
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("action.off"))
                                              )
                                            ]
                                          )
                                    ],
                                    1
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3347562648
                        )
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      label: _vm.$t("agency.contacts.thLable.detail"),
                      type: "expand"
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c(
                                "div",
                                { staticClass: "detail-container" },
                                [
                                  _c(
                                    "el-row",
                                    [
                                      _c(
                                        "el-col",
                                        { attrs: { span: 8 } },
                                        [
                                          _c(
                                            "el-form",
                                            {
                                              attrs: { "label-width": "120px" }
                                            },
                                            [
                                              _c(
                                                "el-form-item",
                                                { attrs: { label: "ID" } },
                                                [
                                                  _c(
                                                    "el-tag",
                                                    {
                                                      attrs: {
                                                        type: "info",
                                                        size: "mini"
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(scope.row.id)
                                                      )
                                                    ]
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
                                                      "agency.contacts.thLable.name"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(scope.row.name)
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
                                                      "agency.contacts.thLable.userEmail"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "el-tag",
                                                    {
                                                      attrs: {
                                                        type: "info",
                                                        size: "mini"
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          scope.row.user_email
                                                        )
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "el-tag",
                                                    {
                                                      staticClass: "d-none",
                                                      attrs: {
                                                        type: "info",
                                                        size: "mini"
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          scope.row.user_id
                                                        )
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
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-col",
                                        { attrs: { span: 8 } },
                                        [
                                          _c(
                                            "el-form",
                                            {
                                              attrs: { "label-width": "120px" }
                                            },
                                            [
                                              _c(
                                                "el-form-item",
                                                {
                                                  attrs: {
                                                    label: _vm.$t(
                                                      "agency.contacts.thLable.type"
                                                    )
                                                  }
                                                },
                                                [
                                                  scope.row.type == 2
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
                                                                "form.memberTypes[0].label"
                                                              )
                                                            )
                                                          )
                                                        ]
                                                      )
                                                    : _c(
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
                                                                "form.memberTypes[1].label"
                                                              )
                                                            )
                                                          )
                                                        ]
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
                                                      "agency.contacts.thLable.tel"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        scope.row.tel
                                                          ? scope.row.tel
                                                          : "----"
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
                                                      "agency.contacts.thLable.tele"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        scope.row.tele
                                                          ? scope.row.tele
                                                          : "----"
                                                      )
                                                    )
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
                                        { attrs: { span: 8 } },
                                        [
                                          _c(
                                            "el-form",
                                            {
                                              attrs: { "label-width": "120px" }
                                            },
                                            [
                                              _c(
                                                "el-form-item",
                                                {
                                                  attrs: {
                                                    label: _vm.$t(
                                                      "agency.contacts.thLable.status"
                                                    )
                                                  }
                                                },
                                                [
                                                  scope.row.status == 1
                                                    ? _c(
                                                        "el-tag",
                                                        {
                                                          attrs: {
                                                            size: "medium"
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.$t(
                                                                "form.memberStatusList[0].label"
                                                              )
                                                            )
                                                          )
                                                        ]
                                                      )
                                                    : _c(
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
                                                                "form.memberStatusList[1].label"
                                                              )
                                                            )
                                                          )
                                                        ]
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
                                                      "agency.contacts.thLable.created"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "component-page-timestamp",
                                                    {
                                                      attrs: {
                                                        timestamp:
                                                          scope.row.created
                                                      }
                                                    }
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
                                                      "agency.contacts.thLable.updated"
                                                    )
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "component-page-timestamp",
                                                    {
                                                      attrs: {
                                                        timestamp:
                                                          scope.row.updated
                                                      }
                                                    }
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
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      2062293234
                    )
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
        : _vm._e(),
      _vm._v(" "),
      _c("item-create", {
        attrs: { visible: _vm.dialog.visible.create, org: _vm.org },
        on: {
          "update:visible": function($event) {
            return _vm.$set(_vm.dialog.visible, "create", $event)
          },
          create: _vm.filterOrgChange
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
    require("vue-hot-reload-api")      .rerender("data-v-0248f9cc", module.exports)
  }
}

/***/ }),

/***/ 1393:
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
                [_c("contacts-org-tree", { on: { click: _vm.orgSelect } })],
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
            _c(
              "div",
              [
                _c("contacts-member", {
                  attrs: { org: _vm.org, "root-org-id": _vm.rootOrgId }
                })
              ],
              1
            )
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
    require("vue-hot-reload-api")      .rerender("data-v-75d83173", module.exports)
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

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1370)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1372)
/* template */
var __vue_template__ = __webpack_require__(1393)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-75d83173"
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
Component.options.__file = "resources/assets/js/pages/agency/contacts/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75d83173", Component.options)
  } else {
    hotAPI.reload("data-v-75d83173", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});