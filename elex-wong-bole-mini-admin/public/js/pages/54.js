webpackJsonp([54],{

/***/ 1644:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1645);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("3fb2ab86", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-639eb23d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-639eb23d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1645:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.header-aside .icon[data-v-639eb23d] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  width: 44px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 1.2rem;\n  cursor: pointer;\n  color: #909399;\n}\n.header-aside .icon[data-v-639eb23d]:hover {\n  color: #606266;\n}\n.role-container[data-v-639eb23d] {\n  padding: 15px;\n  font-size: 0.875rem;\n}\n.role-item[data-v-639eb23d] {\n  padding: 15px 0;\n}\n.role-item + .role-item[data-v-639eb23d] {\n  border-top: 1px solid #F2F6FC;\n}\n.role-item .item-group-name[data-v-639eb23d] {\n  color: #303133;\n}\n.role-item .item-group-desc[data-v-639eb23d] {\n  color: #909399;\n  padding-top: 5px;\n  font-size: 0.8rem;\n}\n.role-item .item-title[data-v-639eb23d] {\n  color: #303133;\n}\n", ""]);

// exports


/***/ }),

/***/ 1646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_Index_vue__ = __webpack_require__(1647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__group_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__policy_Index_vue__ = __webpack_require__(1652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__policy_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__policy_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__member_Index_vue__ = __webpack_require__(1657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__member_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__member_Index_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        AuthGroup: __WEBPACK_IMPORTED_MODULE_0__group_Index_vue___default.a,
        AuthPolicy: __WEBPACK_IMPORTED_MODULE_1__policy_Index_vue___default.a,
        AuthMember: __WEBPACK_IMPORTED_MODULE_2__member_Index_vue___default.a
    },
    data: function data() {
        return {
            group: {
                create: {
                    visible: false
                },
                data: {
                    id: 0,
                    name: '',
                    desc: ''
                }
            },
            groupMember: {
                dataListStatus: 'dle',
                dataList: []
            },
            groupPolicy: {
                dataListStatus: 'dle',
                dataList: []
            },
            dialog: {
                visible: {
                    member: false,
                    policy: false
                }
            }
        };
    },

    methods: {
        groupCreate: function groupCreate() {
            this.group.create.visible = true;
        },
        groupSelect: function groupSelect(data) {
            // 获取数据
            if (this.group.data.id != data.id) {
                this.getGroupMemberList(data.id);
                this.getGroupPolicyList(data.id);
            }
            // 缓存数据
            this.group.data.id = data.id;
            this.group.data.name = data.name;
            this.group.data.desc = data.desc;
        },

        // 获取权限组用户数据
        getGroupMemberList: function getGroupMemberList(groupId) {
            var _this = this;

            this.groupMember.dataListStatus = 'loading';
            axios.get('/auth/group-member/getList', {
                params: {
                    group_id: groupId
                }
            }).then(function (response) {
                _this.groupMember.dataList = response.data.resp_data;
                _this.groupMember.dataListStatus = !_this.groupMember.dataList.length ? 'nodata' : 'dle';
            });
        },

        // 同步用户数据到列表
        syncGroupMemberData: function syncGroupMemberData(data) {
            this.groupMember.dataList = data;
            this.groupMember.dataListStatus = !this.groupMember.dataList.length ? 'nodata' : 'dle';
        },

        // 获取权限组策略数据
        getGroupPolicyList: function getGroupPolicyList(groupId) {
            var _this2 = this;

            this.groupPolicy.dataListStatus = 'loading';
            axios.get('/auth/group-policy/getList', {
                params: {
                    group_id: groupId
                }
            }).then(function (response) {
                _this2.groupPolicy.dataList = response.data.resp_data;
                _this2.groupPolicy.dataListStatus = !_this2.groupPolicy.dataList.length ? 'nodata' : 'dle';
            });
        },

        // 同步策略数据到列表
        syncGroupPolicyData: function syncGroupPolicyData(data) {
            this.groupPolicy.dataList = data;
            this.groupPolicy.dataListStatus = !this.groupPolicy.dataList.length ? 'nodata' : 'dle';
        }
    }
});

/***/ }),

/***/ 1647:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1648)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1650)
/* template */
var __vue_template__ = __webpack_require__(1651)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-132f986d"
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
Component.options.__file = "resources/assets/js/pages/system/setting/auth/group/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-132f986d", Component.options)
  } else {
    hotAPI.reload("data-v-132f986d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1648:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1649);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("bb7f323c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-132f986d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-132f986d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_2\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1649:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.group-list-item[data-v-132f986d] {\n  position: relative;\n}\n.group-list-item[data-v-132f986d] {\n  font-size: 0.875rem;\n  cursor: pointer;\n  height: 36px;\n  line-height: 36px;\n}\n.group-list-item[data-v-132f986d]:hover {\n  background-color: #f5f7fa;\n}\n.group-list-item.active[data-v-132f986d] {\n  background-color: #f0f7ff;\n}\n.group-list-item .item-info[data-v-132f986d] {\n  position: relative;\n  padding-right: 50px;\n}\n.group-list-item .item-icon[data-v-132f986d] {\n  color: #c7daf1;\n  margin: 0 1px 0 15px;\n}\n.group-list-item .item-option[data-v-132f986d] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 50px;\n  opacity: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.group-list-item:hover .item-option[data-v-132f986d] {\n  opacity: 1;\n}\n.group-list-item .item-option .option-icon[data-v-132f986d] {\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  color: #909399;\n}\n.group-list-item .item-option .option-icon[data-v-132f986d]:hover {\n  color: #606266;\n}\n", ""]);

// exports


/***/ }),

/***/ 1650:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "AuthGroup",
    props: ['create'],
    data: function data() {
        return {
            current: {
                data: {},
                index: -1
            },
            groupListLoading: 'dle',
            groupList: [],
            dialog: {
                visible: {
                    create: false,
                    update: false,
                    destroy: false
                }
            },
            nodeCache: {
                data: {},
                index: -1
            },
            dataCreate: {
                name: '',
                desc: ''
            },
            dataUpdate: {
                id: 0,
                sort: 0,
                name: '',
                desc: ''
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
        errorDesc: function errorDesc() {
            if (this.msg.code == 42000 && this.msg.errors.desc) {
                return this.msg.errors.desc[0];
            }
        },
        errorSort: function errorSort() {
            if (this.msg.code == 42000 && this.msg.errors.sort) {
                return this.msg.errors.sort[0];
            }
        }
    },
    watch: {
        create: {
            deep: true,
            handler: function handler(n, o) {
                n.visible && this.dialogNodeOption('create');
            }
        }
    },
    methods: {
        getGroupList: function getGroupList() {
            var _this = this;

            this.groupListLoading = 'loading';
            axios.get('/auth/group/getList').then(function (response) {
                _this.groupList = response.data.resp_data;
                _this.groupListLoading = !_this.groupList.length ? 'nodata' : 'dle';
                // 初始化选中第一个节点
                if (_this.groupList.length) {
                    _this.selectNode(_this.groupList[0], 0);
                }
            });
        },

        // 点击选中节点
        selectNode: function selectNode(data, index) {
            this.current.data = data;
            this.current.index = index;
            this.$emit('click', data);
        },

        // 分发 option 操作选项
        dialogNodeOption: function dialogNodeOption(option, data, index) {
            switch (option) {
                case 'create':
                    this.initDataCreate();
                    this.dialog.visible.create = true;
                    break;
                case 'update':
                    this.nodeCache.data = data;
                    this.nodeCache.index = index;
                    this.initDataUpdate();
                    this.dialog.visible.update = true;
                    break;
                case 'destroy':
                    this.nodeCache.data = data;
                    this.nodeCache.index = index;
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

        // 初始化新增节点数据
        initDataCreate: function initDataCreate() {
            this.initMsg();
            this.dataCreate.name = '';
            this.dataCreate.desc = '';
        },

        // 编初始化辑节点数据
        initDataUpdate: function initDataUpdate() {
            this.initMsg();
            this.dataUpdate.id = this.nodeCache.data.id;
            this.dataUpdate.sort = this.nodeCache.data.sort;
            this.dataUpdate.name = this.nodeCache.data.name;
            this.dataUpdate.desc = this.nodeCache.data.desc;
        },

        // 新增节点
        treeNodeCreate: function treeNodeCreate() {
            var _this2 = this;

            this.initMsg();
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/auth/group/saveItem', this.dataCreate).then(function (response) {
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
                    // 添加节点到列表
                    _this2.groupList.push(response.data.resp_data);
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
            axios.post('/auth/group/saveItem', this.dataUpdate).then(function (response) {
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
                    // 同步数据到列表
                    _this3.treeNodeSyncData(response.data.resp_data);
                } else {
                    _this3.msg = response.data.resp_msg;
                }
            });
        },

        // 同步数据到列表，并排序
        treeNodeSyncData: function treeNodeSyncData(data) {
            // 同步数据
            Vue.set(this.groupList, this.nodeCache.index, data);
            // 列表排序
            this.groupList = _.orderBy(this.groupList, ['sort'], ['asc']);
            // 暴露到父级
            if (this.nodeCache.index == this.current.index) {
                this.selectNode(data, this.current.index);
            }
        },

        // 删除节点
        treeNodeDestroy: function treeNodeDestroy() {
            var _this4 = this;

            this.dialog.visible.destroy = false;
            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/auth/group/destroy', {
                id: this.nodeCache.data.id
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this4.$message({
                        type: 'success',
                        message: _this4.$t('messages.delete-succeeded'),
                        showClose: true
                    });
                    //  从列表删除节点数据
                    _this4.groupList.splice(_this4.nodeCache.index, 1);
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
        this.getGroupList();
    }
});

/***/ }),

/***/ 1651:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "group-container" },
    [
      !_vm.groupList.length
        ? _c(
            "div",
            { staticClass: "p-2" },
            [
              _c("component-page-loading", {
                attrs: { status: _vm.groupListLoading }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.groupList.length
        ? _c(
            "div",
            { staticClass: "group-list" },
            _vm._l(_vm.groupList, function(item, index) {
              return _c(
                "div",
                {
                  key: index,
                  staticClass: "group-list-item",
                  class: { active: index == _vm.current.index },
                  on: {
                    click: function($event) {
                      return _vm.selectNode(item, index)
                    }
                  }
                },
                [
                  _c("div", { staticClass: "item-info text-truncate" }, [
                    _c(
                      "span",
                      { staticClass: "item-icon" },
                      [
                        _c("font-awesome-icon", {
                          attrs: { "fixed-width": "", icon: "folder" }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(item.name))])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "item-option" }, [
                    _c(
                      "div",
                      {
                        staticClass: "option-icon",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.dialogNodeOption("update", item, index)
                          }
                        }
                      },
                      [_c("i", { staticClass: "el-icon-edit-outline" })]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "option-icon",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.dialogNodeOption("destroy", item, index)
                          }
                        }
                      },
                      [_c("i", { staticClass: "el-icon-delete" })]
                    )
                  ])
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.$t("system.setting.auth.createDialog.title"),
            width: "460px",
            visible: _vm.dialog.visible.create
          },
          on: {
            "update:visible": function($event) {
              return _vm.$set(_vm.dialog.visible, "create", $event)
            },
            close: function($event) {
              _vm.create.visible = false
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
                { attrs: { model: _vm.dataCreate, "label-width": "80px" } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: _vm.$t("system.setting.auth.createDialog.name"),
                        error: _vm.errorName,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
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
                    {
                      attrs: {
                        label: _vm.$t("system.setting.auth.createDialog.desc"),
                        error: _vm.errorDesc
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea", rows: 2 },
                        model: {
                          value: _vm.dataCreate.desc,
                          callback: function($$v) {
                            _vm.$set(_vm.dataCreate, "desc", $$v)
                          },
                          expression: "dataCreate.desc"
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
            title: _vm.$t("system.setting.auth.updateDialog.title"),
            width: "500px",
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
                        label: _vm.$t("system.setting.auth.updateDialog.sort"),
                        error: _vm.errorSort,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: {
                          placeholder: _vm.$t(
                            "system.setting.auth.updateDialog.sortPlaceholder"
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
                        label: _vm.$t("system.setting.auth.updateDialog.name"),
                        error: _vm.errorName,
                        required: ""
                      }
                    },
                    [
                      _c("el-input", {
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
                    {
                      attrs: {
                        label: _vm.$t("system.setting.auth.updateDialog.desc"),
                        error: _vm.errorDesc
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea", rows: 2 },
                        model: {
                          value: _vm.dataUpdate.desc,
                          callback: function($$v) {
                            _vm.$set(_vm.dataUpdate, "desc", $$v)
                          },
                          expression: "dataUpdate.desc"
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
            title: _vm.$t("system.setting.auth.destroyDialog.title"),
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
                _vm.$t("system.setting.auth.destroyDialog.askText", {
                  name: _vm.nodeCache.data.name
                })
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
                      _vm.dialog.visible.destroy = false
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
                  on: { click: _vm.treeNodeDestroy }
                },
                [_vm._v(_vm._s(_vm.$t("action.save")))]
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
    require("vue-hot-reload-api")      .rerender("data-v-132f986d", module.exports)
  }
}

/***/ }),

/***/ 1652:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1653)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1655)
/* template */
var __vue_template__ = __webpack_require__(1656)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f486c34c"
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
Component.options.__file = "resources/assets/js/pages/system/setting/auth/policy/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f486c34c", Component.options)
  } else {
    hotAPI.reload("data-v-f486c34c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1653:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1654);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("a69adc4c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f486c34c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f486c34c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1654:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n[data-v-f486c34c] .el-dialog__body {\n    padding: 20px;\n}\n[data-v-f486c34c] .el-transfer-panel {\n    width: 280px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1655:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "AuthPolicy",
    props: ['groupId', 'dataList', 'visible'],
    data: function data() {
        return {
            dialogVisible: false,
            policyListLoading: true,
            policyList: [],
            policyListCache: []
        };
    },

    watch: {
        visible: function visible(n, o) {
            if (n) {
                // 显示模态框
                this.dialogVisible = n;
                // 初始化选中数据
                this.policyListCache = _.map(this.dataList, 'id');
            }
        }
    },
    methods: {
        getDataList: function getDataList() {
            var _this = this;

            axios.get('/auth/policy/getList').then(function (response) {
                _this.policyList = response.data.resp_data;
                for (var index in _this.policyList) {
                    var id = _this.policyList[index].id;
                    _this.policyList[index].name = _this.$t('system.setting.menu.' + id + '.name');
                }
                _this.policyListLoading = false;
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/auth/group-policy/saveList', {
                group_id: this.groupId,
                policy_ids: this.policyListCache
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    _this2.dialogVisible = false;
                    // 同步数据到父组件
                    _this2.$emit('update', response.data.resp_data);
                } else {
                    _this2.$message({
                        type: 'error',
                        message: _this2.$t('messages.save-failed'),
                        showClose: true
                    });
                }
            });
        }
    },
    mounted: function mounted() {
        this.getDataList();
    }
});

/***/ }),

/***/ 1656:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("system.setting.auth.policyDialog.title"),
        width: "720px",
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
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.policyListLoading,
              expression: "policyListLoading"
            }
          ],
          staticClass: "flex-center"
        },
        [
          _c("el-transfer", {
            attrs: {
              titles: [
                _vm.$t("system.setting.auth.policyDialog.unselected"),
                _vm.$t("system.setting.auth.policyDialog.selected")
              ],
              data: _vm.policyList,
              props: { key: "id", label: "name" }
            },
            model: {
              value: _vm.policyListCache,
              callback: function($$v) {
                _vm.policyListCache = $$v
              },
              expression: "policyListCache"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dialog-footer",
          attrs: { slot: "footer" },
          slot: "footer"
        },
        [
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
          ),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v(_vm._s(_vm.$t("action.confirm")))]
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
    require("vue-hot-reload-api")      .rerender("data-v-f486c34c", module.exports)
  }
}

/***/ }),

/***/ 1657:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1658)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1660)
/* template */
var __vue_template__ = __webpack_require__(1661)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-90403c7c"
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
Component.options.__file = "resources/assets/js/pages/system/setting/auth/member/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-90403c7c", Component.options)
  } else {
    hotAPI.reload("data-v-90403c7c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1658:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1659);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("0b560a84", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90403c7c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90403c7c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1659:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n[data-v-90403c7c] .el-dialog__body {\n    min-height: 440px;\n    padding-top: 15px;\n}\n.table thead[data-v-90403c7c] {\n    color: #909399;\n}\n.table th[data-v-90403c7c], .table td[data-v-90403c7c] {\n    padding: 12px 10px;\n    vertical-align: middle;\n    background-color: #ffffff;\n    border-bottom: 1px solid #ebeef5;\n}\n.table td[data-v-90403c7c] {\n    -webkit-transition: background-color .25s ease;\n    transition: background-color .25s ease;\n}\n.table tr:hover > td[data-v-90403c7c] {\n    background-color: #f5f7fa;\n}\n", ""]);

// exports


/***/ }),

/***/ 1660:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "AuthMember",
    props: ['groupId', 'dataList', 'visible'],
    data: function data() {
        return {
            dialogVisible: false,
            memberListCache: [],
            filterOption: {
                keyword: '',
                page: 1,
                page_size: 5
            },
            dataCount: {
                total: 0
            },
            tableListStatus: 'dle',
            tableList: []
        };
    },

    watch: {
        visible: function visible(n, o) {
            if (n) {
                // 显示模态框
                this.dialogVisible = n;
                // 初始化选中数据
                this.memberListCache = _.cloneDeep(this.dataList);
            } else {
                // 初始化表格参数
                this.clearFilterOption();
            }
        }
    },
    methods: {
        clearFilterOption: function clearFilterOption() {
            this.tableListStatus = 'dle';
            this.filterOption.page = 1;
            this.dataCount.total = 0;
            this.tableList = [];
        },
        filterChange: function filterChange() {
            this.clearFilterOption();
            this.getMemberList();
        },
        filterPageChange: function filterPageChange(page) {
            this.clearFilterOption();
            this.filterOption.page = page;
            this.getMemberList();
        },
        getMemberList: function getMemberList() {
            var _this = this;

            this.tableListStatus = 'loading';
            axios.get('/auth/group-member/search', {
                params: this.filterOption
            }).then(function (response) {
                _this.dataCount = response.data.resp_data.count;
                _this.tableList = response.data.resp_data.data;
                _this.tableListStatus = !_this.tableList.length ? 'nodata' : 'dle';

                // 初始化表格选中
                for (var i in _this.tableList) {
                    _this.tableList[i].checked = false;
                    for (var j in _this.memberListCache) {
                        if (_this.memberListCache[j].id == _this.tableList[i].id) {
                            _this.tableList[i].checked = true;
                            break;
                        }
                    }
                }
            });
        },
        onSubmit: function onSubmit() {
            var _this2 = this;

            // loading 状态 start
            var loading = this.$loading();
            // 保存数据
            axios.post('/auth/group-member/saveList', {
                group_id: this.groupId,
                member_ids: _.map(this.memberListCache, 'id')
            }).then(function (response) {
                // loading 状态 close
                loading.close();
                // 逻辑处理
                if (response.data.resp_msg.code == 200) {
                    _this2.$message({
                        type: 'success',
                        message: _this2.$t('messages.save-succeeded'),
                        showClose: true
                    });
                    _this2.dialogVisible = false;
                    // 同步数据到父组件
                    _this2.$emit('update', response.data.resp_data);
                } else {
                    _this2.$message({
                        type: 'error',
                        message: _this2.$t('messages.save-failed'),
                        showClose: true
                    });
                }
            });
        },

        // 表格选择或取消用户选中状态
        tableCheckedChange: function tableCheckedChange(data) {
            if (data.checked) {
                this.memberListCache.push(data);
            } else {
                for (var i in this.memberListCache) {
                    if (this.memberListCache[i].id == data.id) {
                        this.memberListCache.splice(i, 1);
                        break;
                    }
                }
            }
        },

        // 标签删除已选用户
        tagCheckedDelete: function tagCheckedDelete(data, index) {
            this.memberListCache.splice(index, 1);
            for (var i in this.tableList) {
                if (this.tableList[i].id == data.id) {
                    this.tableList[i].checked = false;
                    break;
                }
            }
        }
    }
});

/***/ }),

/***/ 1661:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.$t("system.setting.auth.memberDialog.title"),
        width: "700px",
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
      _c("div", { staticClass: "pb-3" }, [
        !_vm.memberListCache.length
          ? _c(
              "div",
              [_c("component-page-loading", { attrs: { status: "nodata" } })],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.memberListCache.length
          ? _c(
              "div",
              { staticClass: "nub-list" },
              _vm._l(_vm.memberListCache, function(item, index) {
                return _c("div", { key: index, staticClass: "nub-item" }, [
                  _c(
                    "div",
                    { staticClass: "nub-icon icon-member" },
                    [_c("font-awesome-icon", { attrs: { icon: "user-tie" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "nub-text" }, [
                    _vm._v(_vm._s(item.name))
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "nub-close",
                      on: {
                        click: function($event) {
                          return _vm.tagCheckedDelete(item, index)
                        }
                      }
                    },
                    [_c("i", { staticClass: "el-icon-close" })]
                  )
                ])
              }),
              0
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "pb-3" },
        [
          _c(
            "el-input",
            {
              attrs: {
                placeholder: _vm.$t(
                  "system.setting.auth.memberDialog.emailKeyword"
                ),
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
      _c("table", { staticClass: "table table-borderless table-hover" }, [
        _c("thead", [
          _c("tr", [
            _c("th", [
              _vm._v(_vm._s(_vm.$t("system.setting.auth.memberDialog.check")))
            ]),
            _vm._v(" "),
            _c("th", [
              _vm._v(_vm._s(_vm.$t("system.setting.auth.memberDialog.email")))
            ]),
            _vm._v(" "),
            _c("th", [
              _vm._v(
                _vm._s(_vm.$t("system.setting.auth.memberDialog.nickname"))
              )
            ]),
            _vm._v(" "),
            _c("th", [
              _vm._v(_vm._s(_vm.$t("system.setting.auth.memberDialog.agent")))
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "tbody",
          _vm._l(_vm.tableList, function(item, index) {
            return _c("tr", { key: index }, [
              _c(
                "td",
                [
                  _c("el-checkbox", {
                    on: {
                      change: function($event) {
                        return _vm.tableCheckedChange(item)
                      }
                    },
                    model: {
                      value: item.checked,
                      callback: function($$v) {
                        _vm.$set(item, "checked", $$v)
                      },
                      expression: "item.checked"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("td", [
                _c("div", {
                  staticClass: "d-inline-block text-truncate",
                  staticStyle: { "max-width": "150px" },
                  domProps: {
                    innerHTML: _vm._s(
                      _vm.$options.filters.hsFilterKeyword(
                        item.name,
                        _vm.filterOption.keyword
                      )
                    )
                  }
                })
              ]),
              _vm._v(" "),
              _c("td", [
                _c("div", {
                  staticClass: "d-inline-block text-truncate",
                  staticStyle: { "max-width": "200px" },
                  domProps: {
                    innerHTML: _vm._s(
                      _vm.$options.filters.hsFilterKeyword(
                        item.user_email,
                        _vm.filterOption.keyword
                      )
                    )
                  }
                })
              ]),
              _vm._v(" "),
              _c("td", [
                _c(
                  "div",
                  {
                    staticClass: "d-inline-block text-truncate",
                    staticStyle: { "max-width": "200px" }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(item.org_name) +
                        "\n                "
                    )
                  ]
                )
              ])
            ])
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-center" },
        [
          _c("component-page-loading", {
            attrs: { status: _vm.tableListStatus }
          })
        ],
        1
      ),
      _vm._v(" "),
      _vm.dataCount.total
        ? _c(
            "div",
            { staticClass: "pt-2 text-right" },
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
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dialog-footer",
          attrs: { slot: "footer" },
          slot: "footer"
        },
        [
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
          ),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v(_vm._s(_vm.$t("action.confirm")))]
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
    require("vue-hot-reload-api")      .rerender("data-v-90403c7c", module.exports)
  }
}

/***/ }),

/***/ 1662:
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
        _c("div", { staticClass: "option" }, [
          _c(
            "div",
            {
              staticClass: "icon",
              attrs: { title: _vm.$t("system.setting.auth.addPolicyGroup") },
              on: {
                click: function($event) {
                  _vm.group.create.visible = true
                }
              }
            },
            [_c("i", { staticClass: "el-icon-plus" })]
          )
        ])
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
      _c("div", { staticClass: "body-aside" }, [
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
                _c("auth-group", {
                  attrs: { create: _vm.group.create },
                  on: { click: _vm.groupSelect }
                })
              ],
              1
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "body-main" }, [
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
                !_vm.group.data.id
                  ? _c(
                      "div",
                      { staticClass: "flex-center p-2" },
                      [
                        _c("component-page-loading", {
                          attrs: { status: "nodata" }
                        })
                      ],
                      1
                    )
                  : _c("div", { staticClass: "container" }, [
                      _c("div", { staticClass: "role-container" }, [
                        _c("div", { staticClass: "row role-item" }, [
                          _c("div", { staticClass: "col-2" }, [
                            _c("div", { staticClass: "item-title" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.$t("system.setting.auth.policyGroup")
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-10" }, [
                            _c("div", { staticClass: "item-group-name" }, [
                              _vm._v(_vm._s(_vm.group.data.name))
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "item-group-desc" }, [
                              _vm._v(_vm._s(_vm.group.data.desc))
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "row role-item" }, [
                          _c("div", { staticClass: "col-2" }, [
                            _c("div", { staticClass: "item-title" }, [
                              _vm._v(
                                _vm._s(_vm.$t("system.setting.auth.groupUser"))
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-8" },
                            [
                              _c("component-page-loading", {
                                attrs: {
                                  status: _vm.groupMember.dataListStatus
                                }
                              }),
                              _vm._v(" "),
                              _vm.groupMember.dataListStatus == "dle" &&
                              _vm.groupMember.dataList.length
                                ? _c(
                                    "div",
                                    { staticClass: "nub-list" },
                                    _vm._l(_vm.groupMember.dataList, function(
                                      item,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        { key: index, staticClass: "nub-item" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "nub-icon icon-user"
                                            },
                                            [
                                              _c("font-awesome-icon", {
                                                attrs: { icon: "user-tie" }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "nub-text" },
                                            [_vm._v(_vm._s(item.name))]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-2 text-right" }, [
                            _c(
                              "a",
                              {
                                staticClass: "role-item-option",
                                attrs: { href: "javascript:;" },
                                on: {
                                  click: function($event) {
                                    _vm.dialog.visible.member = true
                                  }
                                }
                              },
                              [_vm._v(_vm._s(_vm.$t("action.modify")))]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "row role-item" }, [
                          _c("div", { staticClass: "col-2" }, [
                            _c("div", { staticClass: "item-title" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.$t("system.setting.auth.groupPolicy")
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-8" },
                            [
                              _c("component-page-loading", {
                                attrs: {
                                  status: _vm.groupPolicy.dataListStatus
                                }
                              }),
                              _vm._v(" "),
                              _vm.groupPolicy.dataListStatus == "dle" &&
                              _vm.groupPolicy.dataList.length
                                ? _c(
                                    "div",
                                    { staticClass: "nub-list" },
                                    _vm._l(_vm.groupPolicy.dataList, function(
                                      item,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        { key: index, staticClass: "nub-item" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "nub-icon icon-user"
                                            },
                                            [
                                              _c("font-awesome-icon", {
                                                attrs: {
                                                  icon: "star",
                                                  size: "sm"
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "nub-text" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "system.setting.menu." +
                                                      item.id +
                                                      ".name"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-2 text-right" }, [
                            _c(
                              "a",
                              {
                                staticClass: "role-item-option",
                                attrs: { href: "javascript:;" },
                                on: {
                                  click: function($event) {
                                    _vm.dialog.visible.policy = true
                                  }
                                }
                              },
                              [_vm._v(_vm._s(_vm.$t("action.modify")))]
                            )
                          ])
                        ])
                      ])
                    ]),
                _vm._v(" "),
                _c("auth-member", {
                  attrs: {
                    visible: _vm.dialog.visible.member,
                    "data-list": _vm.groupMember.dataList,
                    "group-id": _vm.group.data.id
                  },
                  on: {
                    "update:visible": function($event) {
                      return _vm.$set(_vm.dialog.visible, "member", $event)
                    },
                    update: _vm.syncGroupMemberData
                  }
                }),
                _vm._v(" "),
                _c("auth-policy", {
                  attrs: {
                    visible: _vm.dialog.visible.policy,
                    "data-list": _vm.groupPolicy.dataList,
                    "group-id": _vm.group.data.id
                  },
                  on: {
                    "update:visible": function($event) {
                      return _vm.$set(_vm.dialog.visible, "policy", $event)
                    },
                    update: _vm.syncGroupPolicyData
                  }
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
    require("vue-hot-reload-api")      .rerender("data-v-639eb23d", module.exports)
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

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1644)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1646)
/* template */
var __vue_template__ = __webpack_require__(1662)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-639eb23d"
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
Component.options.__file = "resources/assets/js/pages/system/setting/auth/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-639eb23d", Component.options)
  } else {
    hotAPI.reload("data-v-639eb23d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});