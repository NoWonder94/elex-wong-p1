webpackJsonp([15],{

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1001);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("7ea9cba2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dfa815aa\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_3\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dfa815aa\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_3\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.directory .header-right {\n  width: 100%;\n  height: 68px;\n}\n.directory .header-right .header-right-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #FFF;\n    height: 100%;\n    -webkit-box-shadow: 0px 0px 8px black;\n            box-shadow: 0px 0px 8px black;\n}\n.directory .header-right .header-right-content .button-home {\n      display: inline-block;\n      vertical-align: middle;\n}\n.directory .header-right .header-right-content .button-home a i {\n        color: black;\n        font-size: 30px;\n        cursor: pointer;\n}\n.directory .header-right .header-right-content .title {\n      margin-left: 10px;\n      display: inline-block;\n      color: black;\n      font-weight: bold;\n      line-height: 68px;\n}\n.directory .header-right .header-right-content .action {\n      display: inline-block;\n      float: right;\n      color: black;\n      font-weight: bold;\n      line-height: 68px;\n}\n.directory .header-right .header-right-content .action form {\n        height: 68px !important;\n}\n.directory .header-right .header-right-content .action form .action-search {\n          margin-left: 10px;\n          display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-search .action-search-title {\n            display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-search .action-search-input {\n            display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-search-result {\n          margin-left: 10px;\n          display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-search-result .action-search-result-total {\n            color: red;\n}\n.directory .header-right .header-right-content .action form .action-amount-per-page {\n          margin-left: 10px;\n          display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-amount-per-page .action-amount-per-page-title {\n            display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-amount-per-page .action-amount-per-page-select {\n            display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-title {\n          margin-left: 10px;\n          display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-list {\n          display: inline-block;\n}\n.directory .header-right .header-right-content .action form .action-list .button-add {\n            display: inline-block;\n            height: 60px;\n            vertical-align: middle;\n}\n.directory .header-right .header-right-content .action form .action-list .button-add img {\n              width: 20px;\n              height: 20px;\n              cursor: pointer;\n}\n.directory .header-right .header-right-content .action .el-form-item {\n        margin-right: 0;\n        margin-bottom: 0;\n}\n.directory .header-right .header-right-content .action .el-input {\n        line-height: 68px;\n}\n.directory .header-right .header-right-content .action input {\n        width: 150px !important;\n        height: 25px !important;\n}\n.directory .content {\n  padding: 20px;\n  overflow-y: scroll;\n  height: 614px;\n}\n.directory .content .table-template {\n    padding-bottom: 30px;\n}\n.directory .content .table-template table th, .directory .content .table-template table td {\n      padding: 5px;\n      border: 1px solid black;\n}\n.directory .content .table-template table th {\n      background-color: #263238;\n      color: #FFF;\n}\n.directory .content .table-template table td {\n      background-color: #FFF;\n}\n.directory .content .table-template table th:first-child, .directory .content .table-template table td:first-child {\n      padding: 0;\n      width: 65px;\n      text-align: center;\n}\n.directory .content .table-template table th:nth-child(2), .directory .content .table-template table td:nth-child(2) {\n      text-align: center;\n}\n.directory .content .table-template table th:nth-child(3), .directory .content .table-template table td:nth-child(3) {\n      width: 60px;\n      text-align: center;\n}\n.directory .content .table-template table th:nth-child(4), .directory .content .table-template table td:nth-child(4) {\n      width: 60px;\n      text-align: center;\n}\n.directory .content .table-template table th:nth-child(5), .directory .content .table-template table td:nth-child(5) {\n      width: 140px;\n      text-align: center;\n}\n.directory .content .table-template table th:nth-child(6), .directory .content .table-template table td:nth-child(6) {\n      width: 140px;\n      text-align: center;\n}\n.directory .content .table-template table th:last-child, .directory .content .table-template table td:last-child {\n      width: 130px;\n      text-align: center;\n}\n.directory .content .table-template table img {\n      width: 130px;\n      height: 60px;\n      vertical-align: middle;\n      cursor: pointer;\n}\n.directory .content .table-template table .status {\n      position: relative;\n      top: -2px;\n      font-weight: bold;\n}\n.directory .content .table-template table .status .status-active {\n        color: green;\n}\n.directory .content .table-template table .status .status-inactive {\n        color: red;\n}\n.directory .content .table-template table button {\n      padding-top: 5px;\n      padding-bottom: 5px;\n      width: 60px;\n      color: black;\n      cursor: pointer;\n      border: 1px solid black;\n}\n.directory .content .table-template table .detail {\n      background-color: #00b050;\n}\n.directory .content .table-template table .edit {\n      background-color: #66B1FF;\n}\n.directory .content .table-template table .delete {\n      background-color: #ED4545;\n}\n.directory .content .table-template .table {\n      width: 100%;\n}\n.directory .content .pagination-template {\n    position: relative;\n}\n.directory .content .pagination-template .pagination {\n      position: fixed;\n      bottom: 10px;\n      right: 25px;\n}\n.directory .content .pagination-template .pagination .page-item {\n        margin-left: 2px;\n        margin-right: 2px;\n        display: inline-block;\n        background-color: #263238;\n        width: 30px;\n        height: 30px;\n        font-size: 16px;\n        text-align: center;\n        border: 1px solid black;\n}\n.directory .content .pagination-template .pagination .page-item .page-link {\n          position: relative;\n          top: 6px;\n          color: #FFF;\n}\n.directory .content .pagination-template .pagination .active {\n        background-color: #62A8EA;\n}\n.directory .content .pagination-template .pagination .disabled {\n        cursor: no-drop;\n}\n.directory .show-img-layout {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  z-index: 2;\n}\n.directory .show-img-layout .close-img {\n    position: fixed;\n    top: 5px;\n    right: 5px;\n}\n.directory .show-img-layout .close-img img {\n      width: 20px;\n      height: 20px;\n      cursor: pointer;\n}\n.directory .show-img-layout .show-img {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n}\n.directory .show-img-layout .show-img img {\n      cursor: default;\n}\n.directory .modal-backdrop {\n  position: fixed;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.3);\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  z-index: 2;\n}\n.directory .modal-backdrop .modal {\n    background-color: #FFF;\n    width: 400px;\n    -webkit-box-shadow: 2px 2px 20px 1px;\n            box-shadow: 2px 2px 20px 1px;\n    cursor: context-menu;\n}\n.directory .modal-backdrop .modal .modal-header {\n      background-color: #67C23A;\n}\n.directory .modal-backdrop .modal .modal-header .modal-header-title {\n        padding-top: 8px;\n        padding-bottom: 8px;\n        width: 100%;\n        color: #FFF;\n        font-weight: bold;\n        text-align: center;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content {\n      width: 400px;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content .part {\n        padding-top: 20px;\n        padding-bottom: 20px;\n        border-bottom: 1px solid black;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content .part .part-title {\n          padding-left: 34px;\n          font-size: 20px;\n          font-weight: bold;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content .part .part-form {\n          margin-top: 8px;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form .el-form-item {\n        margin-right: 0;\n        margin-bottom: 0;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form .el-form-item__label {\n        color: black !important;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form input {\n        width: 230px !important;\n        height: 25px !important;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form button {\n        height: 30px;\n        line-height: 0;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form .upload-layout a {\n        padding: 4px;\n        padding-left: 10px;\n        padding-right: 10px;\n        background-color: orange;\n        border-radius: 5px;\n        color: #FFF;\n}\n.directory .modal-backdrop .modal .modal-body .modal-body-content form .upload-layout img {\n        margin-top: 6px;\n        width: 100px;\n        height: 100px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1002:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var resultData = [];

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Directory',
    components: {
        'my-upload': __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload___default.a
    },
    data: function data() {
        return {
            authority: [],
            searchForm: {
                view: 'showInfo'
            },
            fields: [{ key: 'img', label: '图片' }, { key: 'name', label: '名称', sortable: true }, { key: 'sort', label: '排列', sortable: true }, { key: 'status', label: '状态', sortable: true }, { key: 'date_create', label: '创建时间', sortable: true }, { key: 'date_update', label: '更新时间', sortable: true }, { key: 'actions', label: '操作' }],
            resultData: [],
            totalRows: resultData.length,
            amountPerPage: 20,
            filter: null,
            currentPage: 1,
            isModalAddVisible: false,
            addForm: {
                name: '',
                img: '',
                sort: 0,
                status: '1'
            },
            isModalUpdateVisible: false,
            updateForm: {
                id: 0,
                name: '',
                img: '',
                sort: 0,
                status: '1'
            },
            adminGroupList: [],
            loading: true,
            //洗掉
            btnLoading: false,
            isModalAddLoading: false,
            isModalUpdateLoading: false,

            isUploadImgShow: false,
            imgData: '',
            isUploadedImgShow: false
        };
    },
    mounted: function mounted() {
        this.initMenuAuthority();
        this.init();
    },

    methods: {
        initMenuAuthority: function initMenuAuthority() {
            var _this = this;

            axios.get('/system/admin/initAuthority').then(function (response) {
                _this.authority = response.data.resp_data.list;
            }).catch(function (error) {});
        },
        init: function init() {
            var _this2 = this;

            axios.get('/resource/directory/getList').then(function (response) {
                _this2.resultData = response.data.resp_data.list;
                _this2.totalRows = response.data.resp_data.totalCount;
                _this2.adminGroupList = response.data.resp_data.adminGroupList;
                _this2.loading = false;
            }).catch(function (error) {
                _this2.$message.error(error.msg);
            });
        },
        onFiltered: function onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        //显示图片
        showImgLayout: function showImgLayout(img_url) {
            var img = document.getElementById('showImg');
            img.src = img_url;
            img.style.display = "block";

            var imgLayout = document.getElementById('showImgLayout');
            imgLayout.style.display = "block";
        },
        closeImgLayout: function closeImgLayout() {
            var imgLayout = document.getElementById('showImgLayout');
            imgLayout.style.display = "none";
        },

        //显示图片
        //上传图片
        showUploadImg: function showUploadImg() {
            this.isUploadImgShow = !this.isUploadImgShow;
        },
        cropSuccess: function cropSuccess(imgData, field) {
            this.imgData = imgData;
            this.isUploadedImgShow = true;
        },
        cropUploadSuccess: function cropUploadSuccess(jsonData, field) {},
        cropUploadFail: function cropUploadFail(status, field) {},

        //上传图片
        //弹窗 - 添加, 更新
        showModal: function showModal(form, data) {
            if (form == 'addForm') {
                this.isModalAddVisible = true;
                this.isUploadedImgShow = false;
                this.imgData = '';
            } else if (form == 'updateForm') {
                this.updateForm = data;
                this.updateForm.status = data.status.toString();
                this.imgData = this.updateForm.img;
                this.isUploadedImgShow = true;
                this.isModalUpdateVisible = true;
            }
        },

        close: function close() {
            this.isModalAddVisible = false;
            this.isModalUpdateVisible = false;
        },
        verifyEmail: function verifyEmail(email) {
            var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return format.test(email);
        },
        submitForm: function submitForm(form) {
            var _this3 = this;

            if (form == 'addForm') {
                if (this.addForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.name'),
                        showClose: true
                    });

                    return false;
                }

                if (this.imgData) {
                    this.addForm.img = this.imgData;
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.img'),
                        showClose: true
                    });

                    return false;
                }

                this.isModalAddLoading = true;

                axios.post('/resource/directory/createData', this.addForm).then(function (response) {
                    if (response.data.resp_msg.code == 200) {
                        _this3.$message({
                            type: 'success',
                            message: _this3.$t('message.success.create'),
                            showClose: true,
                            onClose: function onClose() {
                                window.location.reload();
                            }
                        });
                    } else {
                        _this3.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : _this3.$t('message.error.create'),
                            showClose: true,
                            onClose: function onClose() {
                                //window.location.reload();  
                            }
                        });

                        _this3.isModalAddLoading = false;
                    }
                }).catch(function (error) {
                    _this3.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : _this3.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function onClose() {
                            //window.location.reload();
                        }
                    });

                    _this3.isModalAddLoading = false;
                });
            } else if (form == 'updateForm') {
                if (this.updateForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.name'),
                        showClose: true
                    });

                    return false;
                }

                if (this.imgData) {
                    this.updateForm.img = this.imgData;
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.img'),
                        showClose: true
                    });

                    return false;
                }

                this.isModalUpdateLoading = true;

                axios.post('/resource/directory/updateData', this.updateForm).then(function (response) {
                    if (response.data.resp_msg.code == 200) {
                        _this3.$message({
                            type: 'success',
                            message: _this3.$t('message.success.update'),
                            showClose: true,
                            onClose: function onClose() {
                                window.location.reload();
                            }
                        });
                    } else {
                        _this3.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : _this3.$t('message.error.update'),
                            showClose: true,
                            onClose: function onClose() {
                                //window.location.reload();
                            }
                        });

                        _this3.isModalUpdateLoading = false;
                    }
                }).catch(function (error) {
                    _this3.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : _this3.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function onClose() {
                            //window.location.reload();
                        }
                    });

                    _this3.isModalUpdateLoading = false;
                });
            }
        },

        //弹窗 - 添加, 更新
        //弹窗 - 删除
        deleteGame: function deleteGame(id) {
            var _this4 = this;

            this.$confirm(this.$t('message.confirm.delete'), this.$t('message.tip'), {
                type: 'warning',
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel')
            }).then(function () {
                _this4.loading = true;

                axios.post('/resource/directory/deleteData', { id: id }).then(function (response) {
                    if (response.data.resp_msg.code == 200) {
                        _this4.$message({
                            type: 'success',
                            message: _this4.$t('message.success.delete'),
                            showClose: true,
                            onClose: function onClose() {
                                window.location.reload();
                            }
                        });
                    } else {
                        _this4.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : _this4.$t('message.error.delete'),
                            showClose: true,
                            onClose: function onClose() {
                                //window.location.reload();
                            }
                        });

                        _this4.loading = false;
                    }
                }).catch(function (error) {
                    _this4.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : _this4.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function onClose() {
                            //window.location.reload();
                        }
                    });

                    _this4.loading = false;
                });
            });
        }
    }
});

/***/ }),

/***/ 1003:
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
      staticClass: "directory"
    },
    [
      _c("div", { staticClass: "header-right" }, [
        _c("div", { staticClass: "header-right-content" }, [
          _c(
            "div",
            { staticClass: "button-home" },
            [
              _c("router-link", { attrs: { to: "/resource/directory" } }, [
                _c("i", { staticClass: "fas fa-user-friends" })
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "title" }, [
            _vm._v(
              "\n                    " +
                _vm._s(_vm.$t("menu.title.directory")) +
                "\n                    "
            ),
            _c("span", { staticClass: "subtitle" })
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "action" },
            [
              _c(
                "el-form",
                { attrs: { inline: true, model: _vm.searchForm } },
                [
                  _c("div", { staticClass: "action-search" }, [
                    _c("div", { staticClass: "action-search-title" }, [
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.$t("search.title.search")) +
                          ":\n                            "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "action-search-input" },
                      [
                        _c(
                          "el-form-item",
                          [
                            _c("el-input", {
                              attrs: {
                                placeholder: _vm.$t("placeholder.keyword")
                              },
                              model: {
                                value: _vm.filter,
                                callback: function($$v) {
                                  _vm.filter = $$v
                                },
                                expression: "filter"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "action-search-result" }, [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.$t("search.title.result")) +
                        ":\n                            "
                    ),
                    _c("span", { staticClass: "action-search-result-total" }, [
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.totalRows) +
                          "\n                            "
                      )
                    ]),
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.$t("search.title.data")) +
                        "\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "action-amount-per-page" }, [
                    _c("div", { staticClass: "action-amount-per-page-title" }, [
                      _vm._v(
                        "\n                        \t\t" +
                          _vm._s(_vm.$t("search.title.quantity")) +
                          ":\n                        \t"
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "action-amount-per-page-select" },
                      [
                        _c(
                          "el-form-item",
                          [
                            _c(
                              "el-select",
                              {
                                model: {
                                  value: _vm.amountPerPage,
                                  callback: function($$v) {
                                    _vm.amountPerPage = $$v
                                  },
                                  expression: "amountPerPage"
                                }
                              },
                              [
                                _c("el-option", {
                                  attrs: { label: "20", value: "20" }
                                }),
                                _vm._v(" "),
                                _c("el-option", {
                                  attrs: { label: "50", value: "50" }
                                }),
                                _vm._v(" "),
                                _c("el-option", {
                                  attrs: { label: "100", value: "100" }
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
                  _c("div", { staticClass: "action-title" }, [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.$t("search.title.action")) +
                        ":\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "action-list" }, [
                    _vm.authority.indexOf(14) >= 0
                      ? _c(
                          "div",
                          {
                            staticClass: "button-add",
                            on: {
                              click: function($event) {
                                return _vm.showModal("addForm")
                              }
                            }
                          },
                          [
                            _c("img", {
                              attrs: {
                                src: "img/bole_mini/icon/button_add.png"
                              }
                            })
                          ]
                        )
                      : _vm._e()
                  ])
                ]
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c(
          "div",
          { staticClass: "table-template" },
          [
            _c("b-table", {
              attrs: {
                items: _vm.resultData,
                fields: _vm.fields,
                "per-page": _vm.amountPerPage,
                "current-page": _vm.currentPage,
                filter: _vm.filter
              },
              on: { filtered: _vm.onFiltered },
              scopedSlots: _vm._u([
                {
                  key: "img",
                  fn: function(row) {
                    return [
                      _c("img", {
                        attrs: { src: row.item.img },
                        on: {
                          click: function($event) {
                            return _vm.showImgLayout(row.item.img)
                          }
                        }
                      })
                    ]
                  }
                },
                {
                  key: "date_create",
                  fn: function(row) {
                    return [
                      _vm._v(
                        "\n                        " +
                          _vm._s(
                            _vm._f("morph-date")(
                              new Date(row.item.date_create * 1000),
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          ) +
                          "\n                    "
                      )
                    ]
                  }
                },
                {
                  key: "date_update",
                  fn: function(row) {
                    return [
                      _vm._v(
                        "\n                        " +
                          _vm._s(
                            _vm._f("morph-date")(
                              new Date(row.item.date_update * 1000),
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          ) +
                          "\n                    "
                      )
                    ]
                  }
                },
                {
                  key: "status",
                  fn: function(row) {
                    return [
                      _c("div", { staticClass: "status" }, [
                        row.item.status == 1
                          ? _c("div", { staticClass: "status-active" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.$t("status.active")) +
                                  "\n                            "
                              )
                            ])
                          : _c("div", { staticClass: "status-inactive" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.$t("status.inactive")) +
                                  "\n                            "
                              )
                            ])
                      ])
                    ]
                  }
                },
                {
                  key: "actions",
                  fn: function(row) {
                    return [
                      _vm.authority.indexOf(15) >= 0
                        ? _c(
                            "b-button",
                            {
                              staticClass: "edit",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.showModal("updateForm", row.item)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n\t                        " +
                                  _vm._s(_vm.$t("button.edit")) +
                                  "\n\t                    "
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.authority.indexOf(16) >= 0
                        ? _c(
                            "b-button",
                            {
                              staticClass: "delete",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.deleteGame(row.item.id)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n\t                        " +
                                  _vm._s(_vm.$t("button.delete")) +
                                  "\n\t                    "
                              )
                            ]
                          )
                        : _vm._e()
                    ]
                  }
                },
                {
                  key: "row-details",
                  fn: function(row) {
                    return [
                      _c("b-card", [
                        _c(
                          "ul",
                          _vm._l(row.item, function(value, key) {
                            return _c("li", { key: key }, [
                              _vm._v(
                                "\n                                \t" +
                                  _vm._s(key) +
                                  ": " +
                                  _vm._s(value) +
                                  "\n                            \t"
                              )
                            ])
                          }),
                          0
                        )
                      ])
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
          { staticClass: "pagination-template" },
          [
            _c("b-pagination", {
              attrs: {
                "total-rows": _vm.totalRows,
                "per-page": _vm.amountPerPage
              },
              model: {
                value: _vm.currentPage,
                callback: function($$v) {
                  _vm.currentPage = $$v
                },
                expression: "currentPage"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "show-img-layout",
          attrs: { id: "showImgLayout" },
          on: {
            click: function($event) {
              return _vm.closeImgLayout()
            }
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "close-img",
              on: {
                click: function($event) {
                  return _vm.closeImgLayout()
                }
              }
            },
            [
              _c("img", {
                attrs: { src: "img/bole_mini/icon/button_close.png" }
              })
            ]
          ),
          _vm._v(" "),
          _vm._m(0)
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isModalAddVisible,
              expression: "isModalAddVisible"
            }
          ],
          staticClass: "modal-backdrop",
          on: { click: _vm.close }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isModalAddLoading,
                  expression: "isModalAddLoading"
                }
              ],
              staticClass: "modal",
              on: {
                click: function($event) {
                  $event.stopPropagation()
                }
              }
            },
            [
              _c(
                "div",
                { staticClass: "modal-header" },
                [
                  _vm._t("header", [
                    _c("div", { staticClass: "modal-header-title" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.$t("dialog.title.create")) +
                          "\n                        "
                      )
                    ])
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal-body" },
                [
                  _vm._t("body", [
                    _c(
                      "div",
                      { staticClass: "modal-body-content" },
                      [
                        _c(
                          "el-form",
                          {
                            attrs: {
                              model: _vm.addForm,
                              inline: true,
                              "label-width": "120px"
                            }
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "part" },
                              [
                                _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: _vm.$t("dialog.column.img")
                                    }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "upload-layout" },
                                      [
                                        _c(
                                          "a",
                                          { on: { click: _vm.showUploadImg } },
                                          [
                                            _vm._v(
                                              "\n                                                " +
                                                _vm._s(
                                                  _vm.$t("button.uploadImg")
                                                ) +
                                                "\n                                            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("br"),
                                        _vm._v(" "),
                                        _c("img", {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: _vm.isUploadedImgShow,
                                              expression: "isUploadedImgShow"
                                            }
                                          ],
                                          attrs: { src: _vm.imgData }
                                        })
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: _vm.$t("dialog.column.name")
                                    }
                                  },
                                  [
                                    _c("el-input", {
                                      attrs: {
                                        placeholder: _vm.$t(
                                          "dialog.require.name"
                                        )
                                      },
                                      model: {
                                        value: _vm.addForm.name,
                                        callback: function($$v) {
                                          _vm.$set(_vm.addForm, "name", $$v)
                                        },
                                        expression: "addForm.name"
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
                                      label: _vm.$t("dialog.column.sort")
                                    }
                                  },
                                  [
                                    _c("el-input", {
                                      attrs: {
                                        placeholder: _vm.$t(
                                          "dialog.require.sort"
                                        )
                                      },
                                      model: {
                                        value: _vm.addForm.sort,
                                        callback: function($$v) {
                                          _vm.$set(_vm.addForm, "sort", $$v)
                                        },
                                        expression: "addForm.sort"
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
                                      label: _vm.$t("dialog.column.status")
                                    }
                                  },
                                  [
                                    _c(
                                      "el-select",
                                      {
                                        attrs: {
                                          placeholder: _vm.$t(
                                            "dialog.require.status"
                                          )
                                        },
                                        model: {
                                          value: _vm.addForm.status,
                                          callback: function($$v) {
                                            _vm.$set(_vm.addForm, "status", $$v)
                                          },
                                          expression: "addForm.status"
                                        }
                                      },
                                      [
                                        _c("el-option", {
                                          attrs: { label: "禁止", value: "0" }
                                        }),
                                        _vm._v(" "),
                                        _c("el-option", {
                                          attrs: { label: "开启", value: "1" }
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
                              {
                                staticStyle: {
                                  "margin-top": "2px",
                                  "margin-right": "5px",
                                  float: "right"
                                }
                              },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: {
                                      type: "success",
                                      loading: _vm.btnLoading
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.submitForm("addForm")
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(_vm.$t("button.create")) +
                                        "\n                                    "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-button",
                                  {
                                    attrs: { type: "danger" },
                                    on: { click: _vm.close }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(_vm.$t("button.cancel")) +
                                        "\n                                    "
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
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [_vm._t("footer")], 2)
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isModalUpdateVisible,
              expression: "isModalUpdateVisible"
            }
          ],
          staticClass: "modal-backdrop",
          on: { click: _vm.close }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isModalUpdateLoading,
                  expression: "isModalUpdateLoading"
                }
              ],
              staticClass: "modal",
              on: {
                click: function($event) {
                  $event.stopPropagation()
                }
              }
            },
            [
              _c(
                "div",
                { staticClass: "modal-header" },
                [
                  _vm._t("header", [
                    _c("div", { staticClass: "modal-header-title" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.$t("dialog.title.edit")) +
                          "\n                        "
                      )
                    ])
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal-body" },
                [
                  _vm._t("body", [
                    _c(
                      "div",
                      { staticClass: "modal-body-content" },
                      [
                        _c(
                          "el-form",
                          {
                            attrs: {
                              model: _vm.updateForm,
                              inline: true,
                              "label-width": "120px"
                            }
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "part" },
                              [
                                _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: _vm.$t("dialog.column.img")
                                    }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "upload-layout" },
                                      [
                                        _c(
                                          "a",
                                          { on: { click: _vm.showUploadImg } },
                                          [
                                            _vm._v(
                                              "\n                                                " +
                                                _vm._s(
                                                  _vm.$t("button.uploadImg")
                                                ) +
                                                "\n                                            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("br"),
                                        _vm._v(" "),
                                        _c("img", {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: _vm.isUploadedImgShow,
                                              expression: "isUploadedImgShow"
                                            }
                                          ],
                                          attrs: { src: _vm.imgData }
                                        })
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: _vm.$t("dialog.column.name")
                                    }
                                  },
                                  [
                                    _c("el-input", {
                                      attrs: {
                                        placeholder: _vm.$t(
                                          "dialog.require.name"
                                        )
                                      },
                                      model: {
                                        value: _vm.updateForm.name,
                                        callback: function($$v) {
                                          _vm.$set(_vm.updateForm, "name", $$v)
                                        },
                                        expression: "updateForm.name"
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
                                      label: _vm.$t("dialog.column.sort")
                                    }
                                  },
                                  [
                                    _c("el-input", {
                                      attrs: {
                                        placeholder: _vm.$t(
                                          "dialog.require.sort"
                                        )
                                      },
                                      model: {
                                        value: _vm.updateForm.sort,
                                        callback: function($$v) {
                                          _vm.$set(_vm.updateForm, "sort", $$v)
                                        },
                                        expression: "updateForm.sort"
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
                                      label: _vm.$t("dialog.column.status")
                                    }
                                  },
                                  [
                                    _c(
                                      "el-select",
                                      {
                                        attrs: {
                                          placeholder: _vm.$t(
                                            "dialog.require.status"
                                          )
                                        },
                                        model: {
                                          value: _vm.updateForm.status,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.updateForm,
                                              "status",
                                              $$v
                                            )
                                          },
                                          expression: "updateForm.status"
                                        }
                                      },
                                      [
                                        _c("el-option", {
                                          attrs: { label: "禁止", value: "0" }
                                        }),
                                        _vm._v(" "),
                                        _c("el-option", {
                                          attrs: { label: "开启", value: "1" }
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
                              {
                                staticStyle: {
                                  "margin-top": "2px",
                                  "margin-right": "5px",
                                  float: "right"
                                }
                              },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: {
                                      type: "success",
                                      loading: _vm.btnLoading
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.submitForm("updateForm")
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(_vm.$t("button.update")) +
                                        "\n                                    "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-button",
                                  {
                                    attrs: { type: "danger" },
                                    on: { click: _vm.close }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(_vm.$t("button.cancel")) +
                                        "\n                                    "
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
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [_vm._t("footer")], 2)
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        [
          _c("my-upload", {
            attrs: {
              field: "img",
              "img-format": "png",
              width: 300,
              height: 300
            },
            on: {
              "crop-success": _vm.cropSuccess,
              "crop-upload-success": _vm.cropUploadSuccess,
              "crop-upload-fail": _vm.cropUploadFail
            },
            model: {
              value: _vm.isUploadImgShow,
              callback: function($$v) {
                _vm.isUploadImgShow = $$v
              },
              expression: "isUploadImgShow"
            }
          })
        ],
        1
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "show-img" }, [
      _c("img", { attrs: { id: "showImg" } })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-dfa815aa", module.exports)
  }
}

/***/ }),

/***/ 564:
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

var listToStyles = __webpack_require__(564)

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

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1000)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1002)
/* template */
var __vue_template__ = __webpack_require__(1003)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "resources/assets/js/pages/bole_mini/resource/directory/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dfa815aa", Component.options)
  } else {
    hotAPI.reload("data-v-dfa815aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(716)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(718)
/* template */
var __vue_template__ = __webpack_require__(723)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "node_modules/vue-image-crop-upload/upload-2.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25292217", Component.options)
  } else {
    hotAPI.reload("data-v-25292217", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(717);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("176e60c6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../css-loader/index.js!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25292217\",\"scoped\":false,\"hasInlineConfig\":true}!../vue-loader/lib/selector.js?type=styles&index=0!./upload-2.vue", function() {
     var newContent = require("!!../css-loader/index.js!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25292217\",\"scoped\":false,\"hasInlineConfig\":true}!../vue-loader/lib/selector.js?type=styles&index=0!./upload-2.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n@-webkit-keyframes vicp_progress {\n0% {\r\n    background-position-y: 0;\n}\n100% {\r\n    background-position-y: 40px;\n}\n}\n@keyframes vicp_progress {\n0% {\r\n    background-position-y: 0;\n}\n100% {\r\n    background-position-y: 40px;\n}\n}\n@-webkit-keyframes vicp {\n0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0) translatey(-60px);\r\n            transform: scale(0) translatey(-60px);\n}\n100% {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1) translatey(0);\r\n            transform: scale(1) translatey(0);\n}\n}\n@keyframes vicp {\n0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0) translatey(-60px);\r\n            transform: scale(0) translatey(-60px);\n}\n100% {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1) translatey(0);\r\n            transform: scale(1) translatey(0);\n}\n}\n.vue-image-crop-upload {\r\n  position: fixed;\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  z-index: 10000;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.65);\r\n  -webkit-tap-highlight-color: transparent;\r\n  -moz-tap-highlight-color: transparent;\n}\n.vue-image-crop-upload .vicp-wrap {\r\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n    position: fixed;\r\n    display: block;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    z-index: 10000;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    margin: auto;\r\n    width: 600px;\r\n    height: 330px;\r\n    padding: 25px;\r\n    background-color: #fff;\r\n    border-radius: 2px;\r\n    -webkit-animation: vicp 0.12s ease-in;\r\n            animation: vicp 0.12s ease-in;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close {\r\n      position: absolute;\r\n      right: -30px;\r\n      top: -30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4 {\r\n        position: relative;\r\n        display: block;\r\n        width: 30px;\r\n        height: 30px;\r\n        cursor: pointer;\r\n        -webkit-transition: -webkit-transform 0.18s;\r\n        transition: -webkit-transform 0.18s;\r\n        transition: transform 0.18s;\r\n        transition: transform 0.18s, -webkit-transform 0.18s;\r\n        -webkit-transform: rotate(0);\r\n                transform: rotate(0);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after, .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::before {\r\n          -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n          content: '';\r\n          position: absolute;\r\n          top: 12px;\r\n          left: 4px;\r\n          width: 20px;\r\n          height: 3px;\r\n          -webkit-transform: rotate(45deg);\r\n                  transform: rotate(45deg);\r\n          background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after {\r\n          -webkit-transform: rotate(-45deg);\r\n                  transform: rotate(-45deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:hover {\r\n          -webkit-transform: rotate(90deg);\r\n                  transform: rotate(90deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {\r\n      position: relative;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      padding: 35px;\r\n      height: 170px;\r\n      background-color: rgba(0, 0, 0, 0.03);\r\n      text-align: center;\r\n      border: 1px dashed rgba(0, 0, 0, 0.08);\r\n      overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 {\r\n        display: block;\r\n        margin: 0 auto 6px;\r\n        width: 42px;\r\n        height: 42px;\r\n        overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-arrow {\r\n          display: block;\r\n          margin: 0 auto;\r\n          width: 0;\r\n          height: 0;\r\n          border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);\r\n          border-left: 14.7px solid transparent;\r\n          border-right: 14.7px solid transparent;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-body {\r\n          display: block;\r\n          width: 12.6px;\r\n          height: 14.7px;\r\n          margin: 0 auto;\r\n          background-color: rgba(0, 0, 0, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-bottom {\r\n          -webkit-box-sizing: border-box;\r\n                  box-sizing: border-box;\r\n          display: block;\r\n          height: 12.6px;\r\n          border: 6px solid rgba(0, 0, 0, 0.3);\r\n          border-top: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-hint {\r\n        display: block;\r\n        padding: 15px;\r\n        font-size: 14px;\r\n        color: #666;\r\n        line-height: 30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-no-supported-hint {\r\n        display: block;\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        padding: 30px;\r\n        width: 100%;\r\n        height: 60px;\r\n        line-height: 30px;\r\n        background-color: #eee;\r\n        text-align: center;\r\n        color: #666;\r\n        font-size: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area:hover {\r\n        cursor: pointer;\r\n        border-color: rgba(0, 0, 0, 0.1);\r\n        background-color: rgba(0, 0, 0, 0.05);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop {\r\n      overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left {\r\n        float: left;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container {\r\n          position: relative;\r\n          display: block;\r\n          width: 240px;\r\n          height: 180px;\r\n          background-color: #e5e5e0;\r\n          overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img {\r\n            position: absolute;\r\n            display: block;\r\n            cursor: move;\r\n            -webkit-user-select: none;\r\n               -moz-user-select: none;\r\n                -ms-user-select: none;\r\n                    user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade {\r\n            -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n            position: absolute;\r\n            background-color: rgba(241, 242, 243, 0.8);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-1 {\r\n              top: 0;\r\n              left: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-2 {\r\n              bottom: 0;\r\n              right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate {\r\n          position: relative;\r\n          width: 240px;\r\n          height: 18px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i {\r\n            display: block;\r\n            width: 18px;\r\n            height: 18px;\r\n            border-radius: 100%;\r\n            line-height: 18px;\r\n            text-align: center;\r\n            font-size: 12px;\r\n            font-weight: bold;\r\n            background-color: rgba(0, 0, 0, 0.08);\r\n            color: #fff;\r\n            overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:hover {\r\n              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n              cursor: pointer;\r\n              background-color: rgba(0, 0, 0, 0.14);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:first-child {\r\n              float: left;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:last-child {\r\n              float: right;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range {\r\n          position: relative;\r\n          margin: 30px 0 10px 0;\r\n          width: 240px;\r\n          height: 18px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5,\r\n          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {\r\n            position: absolute;\r\n            top: 0;\r\n            width: 18px;\r\n            height: 18px;\r\n            border-radius: 100%;\r\n            background-color: rgba(0, 0, 0, 0.08);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5:hover,\r\n            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:hover {\r\n              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n              cursor: pointer;\r\n              background-color: rgba(0, 0, 0, 0.14);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5 {\r\n            left: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5::before {\r\n              position: absolute;\r\n              content: '';\r\n              display: block;\r\n              left: 3px;\r\n              top: 8px;\r\n              width: 12px;\r\n              height: 2px;\r\n              background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {\r\n            right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::before {\r\n              position: absolute;\r\n              content: '';\r\n              display: block;\r\n              left: 3px;\r\n              top: 8px;\r\n              width: 12px;\r\n              height: 2px;\r\n              background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::after {\r\n              position: absolute;\r\n              content: '';\r\n              display: block;\r\n              top: 3px;\r\n              left: 8px;\r\n              width: 2px;\r\n              height: 12px;\r\n              background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range] {\r\n            display: block;\r\n            padding-top: 5px;\r\n            margin: 0 auto;\r\n            width: 180px;\r\n            height: 8px;\r\n            vertical-align: top;\r\n            background: transparent;\r\n            -webkit-appearance: none;\r\n               -moz-appearance: none;\r\n                    appearance: none;\r\n            cursor: pointer;\r\n            /* 滑块\r\n\t\t\t\t\t\t\t ---------------------------------------------------------------*/\r\n            /* 轨道\r\n\t\t\t\t\t\t\t ---------------------------------------------------------------*/\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus {\r\n              outline: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-thumb {\r\n              -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n                      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n              -webkit-appearance: none;\r\n                      appearance: none;\r\n              margin-top: -3px;\r\n              width: 12px;\r\n              height: 12px;\r\n              background-color: #61c091;\r\n              border-radius: 100%;\r\n              border: none;\r\n              -webkit-transition: 0.2s;\r\n              transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-thumb {\r\n              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n              -moz-appearance: none;\r\n                   appearance: none;\r\n              width: 12px;\r\n              height: 12px;\r\n              background-color: #61c091;\r\n              border-radius: 100%;\r\n              border: none;\r\n              -webkit-transition: 0.2s;\r\n              transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-thumb {\r\n              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\r\n              appearance: none;\r\n              width: 12px;\r\n              height: 12px;\r\n              background-color: #61c091;\r\n              border: none;\r\n              border-radius: 100%;\r\n              -webkit-transition: 0.2s;\r\n              transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-moz-range-thumb {\r\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n              width: 14px;\r\n              height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-ms-thumb {\r\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n              width: 14px;\r\n              height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-webkit-slider-thumb {\r\n              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\r\n              margin-top: -4px;\r\n              width: 14px;\r\n              height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-runnable-track {\r\n              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n              width: 100%;\r\n              height: 6px;\r\n              cursor: pointer;\r\n              border-radius: 2px;\r\n              border: none;\r\n              background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-track {\r\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n              width: 100%;\r\n              height: 6px;\r\n              cursor: pointer;\r\n              border-radius: 2px;\r\n              border: none;\r\n              background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-track {\r\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\r\n              width: 100%;\r\n              cursor: pointer;\r\n              background: transparent;\r\n              border-color: transparent;\r\n              color: transparent;\r\n              height: 6px;\r\n              border-radius: 2px;\r\n              border: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-lower {\r\n              background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-upper {\r\n              background-color: rgba(68, 170, 119, 0.15);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-webkit-slider-runnable-track {\r\n              background-color: rgba(68, 170, 119, 0.5);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-moz-range-track {\r\n              background-color: rgba(68, 170, 119, 0.5);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-lower {\r\n              background-color: rgba(68, 170, 119, 0.45);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-upper {\r\n              background-color: rgba(68, 170, 119, 0.25);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {\r\n        float: right;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview {\r\n          height: 150px;\r\n          overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item {\r\n            position: relative;\r\n            padding: 5px;\r\n            width: 100px;\r\n            height: 100px;\r\n            float: left;\r\n            margin-right: 16px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span {\r\n              position: absolute;\r\n              bottom: -30px;\r\n              width: 100%;\r\n              font-size: 14px;\r\n              color: #bbb;\r\n              display: block;\r\n              text-align: center;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item img {\r\n              position: absolute;\r\n              display: block;\r\n              top: 0;\r\n              bottom: 0;\r\n              left: 0;\r\n              right: 0;\r\n              margin: auto;\r\n              padding: 3px;\r\n              background-color: #fff;\r\n              border: 1px solid rgba(0, 0, 0, 0.15);\r\n              overflow: hidden;\r\n              -webkit-user-select: none;\r\n                 -moz-user-select: none;\r\n                  -ms-user-select: none;\r\n                      user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle {\r\n              margin-right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle img {\r\n                border-radius: 100%;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {\r\n      position: relative;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      padding: 35px;\r\n      height: 170px;\r\n      background-color: rgba(0, 0, 0, 0.03);\r\n      text-align: center;\r\n      border: 1px dashed #ddd;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading {\r\n        display: block;\r\n        padding: 15px;\r\n        font-size: 16px;\r\n        color: #999;\r\n        line-height: 30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap {\r\n        margin-top: 12px;\r\n        background-color: rgba(0, 0, 0, 0.08);\r\n        border-radius: 3px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress {\r\n          position: relative;\r\n          display: block;\r\n          height: 5px;\r\n          border-radius: 3px;\r\n          background-color: #4a7;\r\n          -webkit-box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);\r\n                  box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);\r\n          -webkit-transition: width 0.15s linear;\r\n          transition: width 0.15s linear;\r\n          background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);\r\n          background-size: 40px 40px;\r\n          -webkit-animation: vicp_progress 0.5s linear infinite;\r\n                  animation: vicp_progress 0.5s linear infinite;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress::after {\r\n            content: '';\r\n            position: absolute;\r\n            display: block;\r\n            top: -3px;\r\n            right: -3px;\r\n            width: 9px;\r\n            height: 9px;\r\n            border: 1px solid rgba(245, 246, 247, 0.7);\r\n            -webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);\r\n                    box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);\r\n            border-radius: 100%;\r\n            background-color: #4a7;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error,\r\n      .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success {\r\n        height: 100px;\r\n        line-height: 100px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate {\r\n      position: absolute;\r\n      right: 20px;\r\n      bottom: 20px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate a {\r\n        position: relative;\r\n        float: left;\r\n        display: block;\r\n        margin-left: 10px;\r\n        width: 100px;\r\n        height: 36px;\r\n        line-height: 36px;\r\n        text-align: center;\r\n        cursor: pointer;\r\n        font-size: 14px;\r\n        color: #4a7;\r\n        border-radius: 2px;\r\n        overflow: hidden;\r\n        -webkit-user-select: none;\r\n           -moz-user-select: none;\r\n            -ms-user-select: none;\r\n                user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {\r\n          background-color: rgba(0, 0, 0, 0.03);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-error,\r\n    .vue-image-crop-upload .vicp-wrap .vicp-success {\r\n      display: block;\r\n      font-size: 14px;\r\n      line-height: 24px;\r\n      height: 24px;\r\n      color: #d10;\r\n      text-align: center;\r\n      vertical-align: top;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-success {\r\n      color: #4a7;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon3 {\r\n      position: relative;\r\n      display: inline-block;\r\n      width: 20px;\r\n      height: 20px;\r\n      top: 4px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon3::after {\r\n        position: absolute;\r\n        top: 3px;\r\n        left: 6px;\r\n        width: 6px;\r\n        height: 10px;\r\n        border-width: 0 2px 2px 0;\r\n        border-color: #4a7;\r\n        border-style: solid;\r\n        -webkit-transform: rotate(45deg);\r\n                transform: rotate(45deg);\r\n        content: '';\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2 {\r\n      position: relative;\r\n      display: inline-block;\r\n      width: 20px;\r\n      height: 20px;\r\n      top: 4px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2::after, .vue-image-crop-upload .vicp-wrap .vicp-icon2::before {\r\n        content: '';\r\n        position: absolute;\r\n        top: 9px;\r\n        left: 4px;\r\n        width: 13px;\r\n        height: 2px;\r\n        background-color: #d10;\r\n        -webkit-transform: rotate(45deg);\r\n                transform: rotate(45deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2::after {\r\n        -webkit-transform: rotate(-45deg);\r\n                transform: rotate(-45deg);\n}\n.e-ripple {\r\n  position: absolute;\r\n  border-radius: 100%;\r\n  background-color: rgba(0, 0, 0, 0.15);\r\n  background-clip: padding-box;\r\n  pointer-events: none;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n  opacity: 1;\n}\n.e-ripple.z-active {\r\n    opacity: 0;\r\n    -webkit-transform: scale(2);\r\n            transform: scale(2);\r\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\n}\r\n\r\n", ""]);

// exports


/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_language_js__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mimes_js__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_data2blob_js__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_effectRipple_js__ = __webpack_require__(722);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };






/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		// 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		field: {
			type: String,
			'default': 'avatar'
		},
		// 原名key，类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		ki: {
			'default': 0
		},
		// 显示该控件与否
		value: {
			'default': true
		},
		// 上传地址
		url: {
			type: String,
			'default': ''
		},
		// 其他要上传文件附带的数据，对象格式
		params: {
			type: Object,
			'default': null
		},
		//Add custom headers
		headers: {
			type: Object,
			'default': null
		},
		// 剪裁图片的宽
		width: {
			type: Number,
			default: 200
		},
		// 剪裁图片的高
		height: {
			type: Number,
			default: 200
		},
		// 不显示旋转功能
		noRotate: {
			type: Boolean,
			default: true
		},
		// 不预览圆形图片
		noCircle: {
			type: Boolean,
			default: false
		},
		// 不预览方形图片
		noSquare: {
			type: Boolean,
			default: false
		},
		// 单文件大小限制
		maxSize: {
			type: Number,
			'default': 10240
		},
		// 语言类型
		langType: {
			type: String,
			'default': 'zh'
		},
		// 语言包
		langExt: {
			type: Object,
			'default': null
		},
		// 图片上传格式
		imgFormat: {
			type: String,
			'default': 'png'
		},
		// 图片背景 jpg情况下生效
		imgBgc: {
			type: String,
			'default': '#fff'
		},
		// 是否支持跨域
		withCredentials: {
			type: Boolean,
			'default': false
		},
		method: {
			type: String,
			'default': 'POST'
		}
	},
	data: function data() {
		var that = this,
		    imgFormat = that.imgFormat,
		    langType = that.langType,
		    langExt = that.langExt,
		    width = that.width,
		    height = that.height,
		    isSupported = true,
		    allowImgFormat = ['jpg', 'png'],
		    tempImgFormat = allowImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat,
		    lang = __WEBPACK_IMPORTED_MODULE_0__utils_language_js__["a" /* default */][langType] ? __WEBPACK_IMPORTED_MODULE_0__utils_language_js__["a" /* default */][langType] : __WEBPACK_IMPORTED_MODULE_0__utils_language_js__["a" /* default */]['en'],
		    mime = __WEBPACK_IMPORTED_MODULE_1__utils_mimes_js__["a" /* default */][tempImgFormat];
		// 规范图片格式
		that.imgFormat = tempImgFormat;

		if (langExt) {
			Object.assign(lang, langExt);
		}
		if (typeof FormData != 'function') {
			isSupported = false;
		}
		return {
			// 图片的mime
			mime: mime,

			// 语言包
			lang: lang,

			// 浏览器是否支持该控件
			isSupported: isSupported,
			// 浏览器是否支持触屏事件
			isSupportTouch: document.hasOwnProperty("ontouchstart"),

			// 步骤
			step: 1, //1选择文件 2剪裁 3上传

			// 上传状态及进度
			loading: 0, //0未开始 1正在 2成功 3错误
			progress: 0,

			// 是否有错误及错误信息
			hasError: false,
			errorMsg: '',

			// 需求图宽高比
			ratio: width / height,

			// 原图地址、生成图片地址
			sourceImg: null,
			sourceImgUrl: '',
			createImgUrl: '',

			// 原图片拖动事件初始值
			sourceImgMouseDown: {
				on: false,
				mX: 0, //鼠标按下的坐标
				mY: 0,
				x: 0, //scale原图坐标
				y: 0
			},

			// 生成图片预览的容器大小
			previewContainer: {
				width: 100,
				height: 100
			},

			// 原图容器宽高
			sourceImgContainer: { // sic
				width: 240,
				height: 184 // 如果生成图比例与此一致会出现bug，先改成特殊的格式吧，哈哈哈
			},

			// 原图展示属性
			scale: {
				zoomAddOn: false, //按钮缩放事件开启
				zoomSubOn: false, //按钮缩放事件开启
				range: 1, //最大100

				x: 0,
				y: 0,
				width: 0,
				height: 0,
				maxWidth: 0,
				maxHeight: 0,
				minWidth: 0, //最宽
				minHeight: 0,
				naturalWidth: 0, //原宽
				naturalHeight: 0
			}
		};
	},

	computed: {
		// 进度条样式
		progressStyle: function progressStyle() {
			var progress = this.progress;

			return {
				width: progress + '%'
			};
		},

		// 原图样式
		sourceImgStyle: function sourceImgStyle() {
			var scale = this.scale,
			    sourceImgMasking = this.sourceImgMasking,
			    top = scale.y + sourceImgMasking.y + 'px',
			    left = scale.x + sourceImgMasking.x + 'px';

			return {
				top: top,
				left: left,
				width: scale.width + 'px',
				height: scale.height + 'px' // 兼容 Opera
			};
		},

		// 原图蒙版属性
		sourceImgMasking: function sourceImgMasking() {
			var width = this.width,
			    height = this.height,
			    ratio = this.ratio,
			    sourceImgContainer = this.sourceImgContainer,
			    sic = sourceImgContainer,
			    sicRatio = sic.width / sic.height,
			    x = 0,
			    y = 0,
			    w = sic.width,
			    h = sic.height,
			    scale = 1;

			if (ratio < sicRatio) {
				scale = sic.height / height;
				w = sic.height * ratio;
				x = (sic.width - w) / 2;
			}
			if (ratio > sicRatio) {
				scale = sic.width / width;
				h = sic.width / ratio;
				y = (sic.height - h) / 2;
			}
			return {
				scale: scale, // 蒙版相对需求宽高的缩放
				x: x,
				y: y,
				width: w,
				height: h
			};
		},

		// 原图遮罩样式
		sourceImgShadeStyle: function sourceImgShadeStyle() {
			var sourceImgMasking = this.sourceImgMasking,
			    sourceImgContainer = this.sourceImgContainer,
			    sic = sourceImgContainer,
			    sim = sourceImgMasking,
			    w = sim.width == sic.width ? sim.width : (sic.width - sim.width) / 2,
			    h = sim.height == sic.height ? sim.height : (sic.height - sim.height) / 2;

			return {
				width: w + 'px',
				height: h + 'px'
			};
		},
		previewStyle: function previewStyle() {
			var width = this.width,
			    height = this.height,
			    ratio = this.ratio,
			    previewContainer = this.previewContainer,
			    pc = previewContainer,
			    w = pc.width,
			    h = pc.height,
			    pcRatio = w / h;

			if (ratio < pcRatio) {
				w = pc.height * ratio;
			}
			if (ratio > pcRatio) {
				h = pc.width / ratio;
			}
			return {
				width: w + 'px',
				height: h + 'px'
			};
		}
	},
	watch: {
		value: function value(newValue) {
			if (newValue && this.loading != 1) {
				this.reset();
			}
		}
	},
	methods: {
		// 点击波纹效果
		ripple: function ripple(e) {
			Object(__WEBPACK_IMPORTED_MODULE_3__utils_effectRipple_js__["a" /* default */])(e);
		},

		// 关闭控件
		off: function off() {
			var _this = this;

			setTimeout(function () {
				_this.$emit('input', false);
				if (_this.step == 3 && _this.loading == 2) {
					_this.setStep(1);
				}
			}, 200);
		},

		// 设置步骤
		setStep: function setStep(no) {
			var _this2 = this;

			// 延时是为了显示动画效果呢，哈哈哈
			setTimeout(function () {
				_this2.step = no;
			}, 200);
		},


		/* 图片选择区域函数绑定
   ---------------------------------------------------------------*/
		preventDefault: function preventDefault(e) {
			e.preventDefault();
			return false;
		},
		handleClick: function handleClick(e) {
			if (this.loading !== 1) {
				if (e.target !== this.$refs.fileinput) {
					e.preventDefault();
					if (document.activeElement !== this.$refs) {
						this.$refs.fileinput.click();
					}
				}
			}
		},
		handleChange: function handleChange(e) {
			e.preventDefault();
			if (this.loading !== 1) {
				var files = e.target.files || e.dataTransfer.files;
				this.reset();
				if (this.checkFile(files[0])) {
					this.setSourceImg(files[0]);
				}
			}
		},

		/* ---------------------------------------------------------------*/

		// 检测选择的文件是否合适
		checkFile: function checkFile(file) {
			var that = this,
			    lang = that.lang,
			    maxSize = that.maxSize;
			// 仅限图片
			if (file.type.indexOf('image') === -1) {
				that.hasError = true;
				that.errorMsg = lang.error.onlyImg;
				return false;
			}

			// 超出大小
			if (file.size / 1024 > maxSize) {
				that.hasError = true;
				that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
				return false;
			}
			return true;
		},

		// 重置控件
		reset: function reset() {
			var that = this;
			that.loading = 0;
			that.hasError = false;
			that.errorMsg = '';
			that.progress = 0;
		},

		// 设置图片源
		setSourceImg: function setSourceImg(file) {
			this.$emit('src-file-set', file.name, file.type, file.size);
			var that = this,
			    fr = new FileReader();
			fr.onload = function (e) {
				that.sourceImgUrl = fr.result;
				that.startCrop();
			};
			fr.readAsDataURL(file);
		},

		// 剪裁前准备工作
		startCrop: function startCrop() {
			var that = this,
			    width = that.width,
			    height = that.height,
			    ratio = that.ratio,
			    scale = that.scale,
			    sourceImgUrl = that.sourceImgUrl,
			    sourceImgMasking = that.sourceImgMasking,
			    lang = that.lang,
			    sim = sourceImgMasking,
			    img = new Image();

			img.src = sourceImgUrl;
			img.onload = function () {
				var nWidth = img.naturalWidth,
				    nHeight = img.naturalHeight,
				    nRatio = nWidth / nHeight,
				    w = sim.width,
				    h = sim.height,
				    x = 0,
				    y = 0;
				// 图片像素不达标
				if (nWidth < width || nHeight < height) {
					that.hasError = true;
					that.errorMsg = lang.error.lowestPx + width + '*' + height;
					return false;
				}
				if (ratio > nRatio) {
					h = w / nRatio;
					y = (sim.height - h) / 2;
				}
				if (ratio < nRatio) {
					w = h * nRatio;
					x = (sim.width - w) / 2;
				}
				scale.range = 0;
				scale.x = x;
				scale.y = y;
				scale.width = w;
				scale.height = h;
				scale.minWidth = w;
				scale.minHeight = h;
				scale.maxWidth = nWidth * sim.scale;
				scale.maxHeight = nHeight * sim.scale;
				scale.naturalWidth = nWidth;
				scale.naturalHeight = nHeight;
				that.sourceImg = img;
				that.createImg();
				that.setStep(2);
			};
		},

		// 鼠标按下图片准备移动
		imgStartMove: function imgStartMove(e) {
			e.preventDefault();
			// 支持触摸事件，则鼠标事件无效
			if (this.isSupportTouch && !e.targetTouches) {
				return false;
			}
			var et = e.targetTouches ? e.targetTouches[0] : e,
			    sourceImgMouseDown = this.sourceImgMouseDown,
			    scale = this.scale,
			    simd = sourceImgMouseDown;

			simd.mX = et.screenX;
			simd.mY = et.screenY;
			simd.x = scale.x;
			simd.y = scale.y;
			simd.on = true;
		},

		// 鼠标按下状态下移动，图片移动
		imgMove: function imgMove(e) {
			e.preventDefault();
			// 支持触摸事件，则鼠标事件无效
			if (this.isSupportTouch && !e.targetTouches) {
				return false;
			}
			var et = e.targetTouches ? e.targetTouches[0] : e,
			    _sourceImgMouseDown = this.sourceImgMouseDown,
			    on = _sourceImgMouseDown.on,
			    mX = _sourceImgMouseDown.mX,
			    mY = _sourceImgMouseDown.mY,
			    x = _sourceImgMouseDown.x,
			    y = _sourceImgMouseDown.y,
			    scale = this.scale,
			    sourceImgMasking = this.sourceImgMasking,
			    sim = sourceImgMasking,
			    nX = et.screenX,
			    nY = et.screenY,
			    dX = nX - mX,
			    dY = nY - mY,
			    rX = x + dX,
			    rY = y + dY;

			if (!on) return;
			if (rX > 0) {
				rX = 0;
			}
			if (rY > 0) {
				rY = 0;
			}
			if (rX < sim.width - scale.width) {
				rX = sim.width - scale.width;
			}
			if (rY < sim.height - scale.height) {
				rY = sim.height - scale.height;
			}
			scale.x = rX;
			scale.y = rY;
		},

		// 顺时针旋转图片
		rotateImg: function rotateImg(e) {
			var sourceImg = this.sourceImg,
			    _scale = this.scale,
			    naturalWidth = _scale.naturalWidth,
			    naturalHeight = _scale.naturalHeight,
			    width = naturalHeight,
			    height = naturalWidth,
			    canvas = this.$refs.canvas,
			    ctx = canvas.getContext('2d');

			canvas.width = width;
			canvas.height = height;
			ctx.clearRect(0, 0, width, height);

			ctx.fillStyle = 'rgba(0,0,0,0)';
			ctx.fillRect(0, 0, width, height);

			ctx.translate(width, 0);
			ctx.rotate(Math.PI * 90 / 180);

			ctx.drawImage(sourceImg, 0, 0, naturalWidth, naturalHeight);
			var imgUrl = canvas.toDataURL(__WEBPACK_IMPORTED_MODULE_1__utils_mimes_js__["a" /* default */]['png']);

			this.sourceImgUrl = imgUrl;
			this.startCrop();
		},


		// 按钮按下开始放大
		startZoomAdd: function startZoomAdd(e) {
			var that = this,
			    scale = that.scale;

			scale.zoomAddOn = true;

			function zoom() {
				if (scale.zoomAddOn) {
					var range = scale.range >= 100 ? 100 : ++scale.range;
					that.zoomImg(range);
					setTimeout(function () {
						zoom();
					}, 60);
				}
			}
			zoom();
		},

		// 按钮松开或移开取消放大
		endZoomAdd: function endZoomAdd(e) {
			this.scale.zoomAddOn = false;
		},

		// 按钮按下开始缩小
		startZoomSub: function startZoomSub(e) {
			var that = this,
			    scale = that.scale;

			scale.zoomSubOn = true;

			function zoom() {
				if (scale.zoomSubOn) {
					var range = scale.range <= 0 ? 0 : --scale.range;
					that.zoomImg(range);
					setTimeout(function () {
						zoom();
					}, 60);
				}
			}
			zoom();
		},

		// 按钮松开或移开取消缩小
		endZoomSub: function endZoomSub(e) {
			var scale = this.scale;

			scale.zoomSubOn = false;
		},
		zoomChange: function zoomChange(e) {
			this.zoomImg(e.target.value);
		},

		// 缩放原图
		zoomImg: function zoomImg(newRange) {
			var that = this,
			    sourceImgMasking = this.sourceImgMasking,
			    sourceImgMouseDown = this.sourceImgMouseDown,
			    scale = this.scale,
			    maxWidth = scale.maxWidth,
			    maxHeight = scale.maxHeight,
			    minWidth = scale.minWidth,
			    minHeight = scale.minHeight,
			    width = scale.width,
			    height = scale.height,
			    x = scale.x,
			    y = scale.y,
			    range = scale.range,
			    sim = sourceImgMasking,
			    sWidth = sim.width,
			    sHeight = sim.height,
			    nWidth = minWidth + (maxWidth - minWidth) * newRange / 100,
			    nHeight = minHeight + (maxHeight - minHeight) * newRange / 100,
			    nX = sWidth / 2 - nWidth / width * (sWidth / 2 - x),
			    nY = sHeight / 2 - nHeight / height * (sHeight / 2 - y);

			// 判断新坐标是否超过蒙版限制
			if (nX > 0) {
				nX = 0;
			}
			if (nY > 0) {
				nY = 0;
			}
			if (nX < sWidth - nWidth) {
				nX = sWidth - nWidth;
			}
			if (nY < sHeight - nHeight) {
				nY = sHeight - nHeight;
			}

			// 赋值处理
			scale.x = nX;
			scale.y = nY;
			scale.width = nWidth;
			scale.height = nHeight;
			scale.range = newRange;
			setTimeout(function () {
				if (scale.range == newRange) {
					that.createImg();
				}
			}, 300);
		},

		// 生成需求图片
		createImg: function createImg(e) {
			var that = this,
			    imgFormat = that.imgFormat,
			    imgBgc = that.imgBgc,
			    mime = that.mime,
			    sourceImg = that.sourceImg,
			    _that$scale = that.scale,
			    x = _that$scale.x,
			    y = _that$scale.y,
			    width = _that$scale.width,
			    height = _that$scale.height,
			    scale = that.sourceImgMasking.scale,
			    canvas = that.$refs.canvas,
			    ctx = canvas.getContext('2d');

			if (e) {
				// 取消鼠标按下移动状态
				that.sourceImgMouseDown.on = false;
			}
			canvas.width = that.width;
			canvas.height = that.height;
			ctx.clearRect(0, 0, that.width, that.height);

			if (imgFormat == 'png') {
				ctx.fillStyle = 'rgba(0,0,0,0)';
			} else {
				// 如果jpg 为透明区域设置背景，默认白色
				ctx.fillStyle = imgBgc;
			}
			ctx.fillRect(0, 0, that.width, that.height);

			ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale);
			that.createImgUrl = canvas.toDataURL(mime);
		},
		prepareUpload: function prepareUpload() {
			var url = this.url,
			    createImgUrl = this.createImgUrl,
			    field = this.field,
			    ki = this.ki;

			this.$emit('crop-success', createImgUrl, field, ki);
			if (typeof url == 'string' && url) {
				this.upload();
			} else {
				this.off();
			}
		},

		// 上传图片
		upload: function upload() {
			var that = this,
			    lang = this.lang,
			    imgFormat = this.imgFormat,
			    mime = this.mime,
			    url = this.url,
			    params = this.params,
			    headers = this.headers,
			    field = this.field,
			    ki = this.ki,
			    createImgUrl = this.createImgUrl,
			    withCredentials = this.withCredentials,
			    method = this.method,
			    fmData = new FormData();

			fmData.append(field, Object(__WEBPACK_IMPORTED_MODULE_2__utils_data2blob_js__["a" /* default */])(createImgUrl, mime), field + '.' + imgFormat);

			// 添加其他参数
			if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == 'object' && params) {
				Object.keys(params).forEach(function (k) {
					fmData.append(k, params[k]);
				});
			}

			// 监听进度回调
			var uploadProgress = function uploadProgress(event) {
				if (event.lengthComputable) {
					that.progress = 100 * Math.round(event.loaded) / event.total;
				}
			};

			// 上传文件
			that.reset();
			that.loading = 1;
			that.setStep(3);
			new Promise(function (resolve, reject) {
				var client = new XMLHttpRequest();
				client.open(method, url, true);
				client.withCredentials = withCredentials;
				client.onreadystatechange = function () {
					if (this.readyState !== 4) {
						return;
					}
					if (this.status === 200 || this.status === 201) {
						resolve(JSON.parse(this.responseText));
					} else {
						reject(this.status);
					}
				};
				client.upload.addEventListener("progress", uploadProgress, false); //监听进度
				// 设置header
				if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) == 'object' && headers) {
					Object.keys(headers).forEach(function (k) {
						client.setRequestHeader(k, headers[k]);
					});
				}
				client.send(fmData);
			}).then(
			// 上传成功
			function (resData) {
				if (that.value) {
					that.loading = 2;
					that.$emit('crop-upload-success', resData, field, ki);
				}
			},
			// 上传失败
			function (sts) {
				if (that.value) {
					that.loading = 3;
					that.hasError = true;
					that.errorMsg = lang.fail;
					that.$emit('crop-upload-fail', sts, field, ki);
				}
			});
		}
	},
	created: function created() {
		var _this3 = this;

		// 绑定按键esc隐藏此插件事件
		document.addEventListener('keyup', function (e) {
			if (_this3.value && (e.key == 'Escape' || e.keyCode == 27)) {
				_this3.off();
			}
		});
	}
});

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	zh: {
		hint: '点击，或拖动图片至此处',
		loading: '正在上传……',
		noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
		success: '上传成功',
		fail: '图片上传失败',
		preview: '头像预览',
		btn: {
			off: '取消',
			close: '关闭',
			back: '上一步',
			save: '保存'
		},
		error: {
			onlyImg: '仅限图片格式',
			outOfSize: '单文件大小不能超过 ',
			lowestPx: '图片最低像素为（宽*高）：'
		}
	},
	'zh-tw': {
		hint: '點擊，或拖動圖片至此處',
		loading: '正在上傳……',
		noSupported: '瀏覽器不支持該功能，請使用IE10以上或其他現代瀏覽器！',
		success: '上傳成功',
		fail: '圖片上傳失敗',
		preview: '頭像預覽',
		btn: {
			off: '取消',
			close: '關閉',
			back: '上一步',
			save: '保存'
		},
		error: {
			onlyImg: '僅限圖片格式',
			outOfSize: '單文件大小不能超過 ',
			lowestPx: '圖片最低像素為（寬*高）：'
		}
	},
	en: {
		hint: 'Click or drag the file here to upload',
		loading: 'Uploading…',
		noSupported: 'Browser is not supported, please use IE10+ or other browsers',
		success: 'Upload success',
		fail: 'Upload failed',
		preview: 'Preview',
		btn: {
			off: 'Cancel',
			close: 'Close',
			back: 'Back',
			save: 'Save'
		},
		error: {
			onlyImg: 'Image only',
			outOfSize: 'Image exceeds size limit: ',
			lowestPx: 'Image\'s size is too low. Expected at least: '
		}
	},
	ro: {
		hint: 'Atinge sau trage fișierul aici',
		loading: 'Se încarcă',
		noSupported: 'Browser-ul tău nu suportă acest feature. Te rugăm încearcă cu alt browser.',
		success: 'S-a încărcat cu succes',
		fail: 'A apărut o problemă la încărcare',
		preview: 'Previzualizează',

		btn: {
			off: 'Anulează',
			close: 'Închide',
			back: 'Înapoi',
			save: 'Salvează'
		},

		error: {
			onlyImg: 'Doar imagini',
			outOfSize: 'Imaginea depășește limita de: ',
			loewstPx: 'Imaginea este prea mică; Minim: '
		}
	},
	ru: {
		hint: 'Нажмите, или перетащите файл в это окно',
		loading: 'Загружаю……',
		noSupported: 'Ваш браузер не поддерживается, пожалуйста, используйте IE10 + или другие браузеры',
		success: 'Загрузка выполнена успешно',
		fail: 'Ошибка загрузки',
		preview: 'Предпросмотр',
		btn: {
			off: 'Отменить',
			close: 'Закрыть',
			back: 'Назад',
			save: 'Сохранить'
		},
		error: {
			onlyImg: 'Только изображения',
			outOfSize: 'Изображение превышает предельный размер: ',
			lowestPx: 'Минимальный размер изображения: '
		}
	},
	'pt-br': {
		hint: 'Clique ou arraste o arquivo aqui para carregar',
		loading: 'Carregando…',
		noSupported: 'Browser não suportado, use o IE10+ ou outro browser',
		success: 'Sucesso ao carregar imagem',
		fail: 'Falha ao carregar imagem',
		preview: 'Pré-visualizar',
		btn: {
			off: 'Cancelar',
			close: 'Fechar',
			back: 'Voltar',
			save: 'Salvar'
		},
		error: {
			onlyImg: 'Apenas imagens',
			outOfSize: 'A imagem excede o limite de tamanho: ',
			lowestPx: 'O tamanho da imagem é muito pequeno. Tamanho mínimo: '
		}
	},
	fr: {
		hint: 'Cliquez ou glissez le fichier ici.',
		loading: 'Téléchargement…',
		noSupported: 'Votre navigateur n\'est pas supporté. Utilisez IE10 + ou un autre navigateur s\'il vous plaît.',
		success: 'Téléchargement réussit',
		fail: 'Téléchargement echoué',
		preview: 'Aperçu',
		btn: {
			off: 'Annuler',
			close: 'Fermer',
			back: 'Retour',
			save: 'Enregistrer'
		},
		error: {
			onlyImg: 'Image uniquement',
			outOfSize: 'L\'image sélectionnée dépasse la taille maximum: ',
			lowestPx: 'L\'image sélectionnée est trop petite. Dimensions attendues: '
		}
	},
	nl: {
		hint: 'Klik hier of sleep een afbeelding in dit vlak',
		loading: 'Uploaden…',
		noSupported: 'Je browser wordt helaas niet ondersteund. Gebruik IE10+ of een andere browser.',
		success: 'Upload succesvol',
		fail: 'Upload mislukt',
		preview: 'Voorbeeld',
		btn: {
			off: 'Annuleren',
			close: 'Sluiten',
			back: 'Terug',
			save: 'Opslaan'
		},
		error: {
			onlyImg: 'Alleen afbeeldingen',
			outOfSize: 'De afbeelding is groter dan: ',
			lowestPx: 'De afbeelding is te klein! Minimale afmetingen: '
		}
	},
	tr: {
		hint: 'Tıkla veya yüklemek istediğini buraya sürükle',
		loading: 'Yükleniyor…',
		noSupported: 'Tarayıcı desteklenmiyor, lütfen IE10+ veya farklı tarayıcı kullanın',
		success: 'Yükleme başarılı',
		fail: 'Yüklemede hata oluştu',
		preview: 'Önizle',
		btn: {
			off: 'İptal',
			close: 'Kapat',
			back: 'Geri',
			save: 'Kaydet'
		},
		error: {
			onlyImg: 'Sadece resim',
			outOfSize: 'Resim yükleme limitini aşıyor: ',
			lowestPx: 'Resmin boyutu çok küçük. En az olması gereken: '
		}
	},
	'es-MX': {
		hint: 'Selecciona o arrastra una imagen',
		loading: 'Subiendo...',
		noSupported: 'Tu navegador no es soportado, por favor usa IE10+ u otros navegadores más recientes',
		success: 'Subido exitosamente',
		fail: 'Sucedió un error',
		preview: 'Vista previa',
		btn: {
			off: 'Cancelar',
			close: 'Cerrar',
			back: 'Atrás',
			save: 'Guardar'
		},
		error: {
			onlyImg: 'Únicamente imágenes',
			outOfSize: 'La imagen excede el tamaño maximo:',
			lowestPx: 'La imagen es demasiado pequeña. Se espera por lo menos:'
		}
	},
	de: {
		hint: 'Klick hier oder zieh eine Datei hier rein zum Hochladen',
		loading: 'Hochladen…',
		noSupported: 'Browser wird nicht unterstützt, bitte verwende IE10+ oder andere Browser',
		success: 'Upload erfolgreich',
		fail: 'Upload fehlgeschlagen',
		preview: 'Vorschau',
		btn: {
			off: 'Abbrechen',
			close: 'Schließen',
			back: 'Zurück',
			save: 'Speichern'
		},
		error: {
			onlyImg: 'Nur Bilder',
			outOfSize: 'Das Bild ist zu groß: ',
			lowestPx: 'Das Bild ist zu klein. Mindestens: '
		}
	},
	ja: {
		hint: 'クリック・ドラッグしてファイルをアップロード',
		loading: 'アップロード中...',
		noSupported: 'このブラウザは対応されていません。IE10+かその他の主要ブラウザをお使いください。',
		success: 'アップロード成功',
		fail: 'アップロード失敗',
		preview: 'プレビュー',
		btn: {
			off: 'キャンセル',
			close: '閉じる',
			back: '戻る',
			save: '保存'
		},
		error: {
			onlyImg: '画像のみ',
			outOfSize: '画像サイズが上限を超えています。上限: ',
			lowestPx: '画像が小さすぎます。最小サイズ: '
		}
	},
	ua: {
		hint: 'Натисніть, або перетягніть файл в це вікно',
		loading: 'Завантажую……',
		noSupported: 'Ваш браузер не підтримується, будь ласка скористайтесь IE10 + або іншими браузерами',
		success: 'Завантаження виконано успішно',
		fail: 'Помилка завантаження',
		preview: 'Попередній перегляд',
		btn: {
			off: 'Відмінити',
			close: 'Закрити',
			back: 'Назад',
			save: 'Зберегти'
		},
		error: {
			onlyImg: 'Тільки зображення',
			outOfSize: 'Зображення перевищує граничний розмір: ',
			lowestPx: 'Мінімальний розмір зображення: '
		}
	},
	it: {
		hint: 'Clicca o trascina qui il file per caricarlo',
		loading: 'Caricamento del file…',
		noSupported: 'Browser non supportato, per favore usa IE10+ o un altro browser',
		success: 'Caricamento completato',
		fail: 'Caricamento fallito',
		preview: 'Anteprima',
		btn: {
			off: 'Annulla',
			close: 'Chiudi',
			back: 'Indietro',
			save: 'Salva'
		},
		error: {
			onlyImg: 'Sono accettate solo immagini',
			outOfSize: 'L\'immagine eccede i limiti di dimensione: ',
			lowestPx: 'L\'immagine è troppo piccola. Il requisito minimo è: '
		}
	},
	ar: {
		hint: 'اضغط أو اسحب الملف هنا للتحميل',
		loading: 'جاري التحميل...',
		noSupported: 'المتصفح غير مدعوم ، يرجى استخدام IE10 + أو متصفح أخر',
		success: 'تم التحميل بنجاح',
		fail: 'فشل التحميل',
		preview: 'معاينه',
		btn: {
			off: 'إلغاء',
			close: 'إغلاق',
			back: 'رجوع',
			save: 'حفظ'
		},
		error: {
			onlyImg: 'صور فقط',
			outOfSize: 'تتجاوز الصوره الحجم المحدد: ',
			lowestPx: 'حجم الصورة صغير جدا. من المتوقع على الأقل: '
		}
	},
	ug: {
		hint: 'مەزكۇر دائىرىنى چىكىپ رەسىم تاللاڭ ياكى رەسىمنى سۆرەپ ئەكىرىڭ',
		loading: 'يوللىنىۋاتىدۇ...',
		noSupported: 'تور كۆرگۈچ بۇ ئىقتىدارنى قوللىمايدۇ ، يۇقىرى نەشىردىكى تور كۆرگۈچنى ئىشلىتىڭ',
		success: 'غەلبىلىك بولدى',
		fail: 'مەغلۇب بولدى',
		preview: 'ئۈنۈم رەسىم',
		btn: {
			off: 'بولدى قىلىش',
			close: 'تاقاش',
			back: 'ئالدىنقى قەدەم',
			save: 'ساقلاش'
		},
		error: {
			onlyImg: 'پەقەت رەسىم فورماتىنىلا قوللايدۇ',
			outOfSize: 'رەسىم چوڭ - كىچىكلىكى چەكتىن ئىشىپ كەتتى',
			lowestPx: 'رەسىمنىڭ ئەڭ كىچىك ئۆلچىمى :'
		}
	},
	th: {
		hint: 'คลิ๊กหรือลากรูปมาที่นี่',
		loading: 'กำลังอัพโหลด…',
		noSupported: 'เบราเซอร์ไม่รองรับ, กรุณาใช้ IE เวอร์ชั่น 10 ขึ้นไป หรือใช้เบราเซอร์ตัวอื่น',
		success: 'อัพโหลดสำเร็จ',
		fail: 'อัพโหลดล้มเหลว',
		preview: 'ตัวอย่าง',
		btn: {
			off: 'ยกเลิก',
			close: 'ปิด',
			back: 'กลับ',
			save: 'บันทึก'
		},
		error: {
			onlyImg: 'ไฟล์ภาพเท่านั้น',
			outOfSize: 'ไฟล์ใหญ่เกินกำหนด: ',
			lowestPx: 'ไฟล์เล็กเกินไป. อย่างน้อยต้องมีขนาด: '
		}
	},
	mm: {
		hint: 'ဖိုင်ကို ဤနေရာတွင် နှိပ်၍ (သို့) ဆွဲထည့်၍ တင်ပါ',
		loading: 'တင်နေသည်…',
		noSupported: 'ဤဘရောက်ဇာကို အထောက်အပံ့ မပေးပါ၊ ကျေးဇူးပြု၍ IE10+ သို့မဟုတ် အခြား ဘရောက်ဇာ ကို အသုံးပြုပါ',
		success: 'ဖိုင်တင်နေမှု မပြီးမြောက်ပါ',
		fail: 'ဖိုင်တင်နေမှု မအောင်မြင်ပါ',
		preview: 'အစမ်းကြည့်',
		btn: {
			off: 'မလုပ်တော့ပါ',
			close: 'ပိတ်မည်',
			back: 'နောက်သို့',
			save: 'သိမ်းမည်'
		},
		error: {
			onlyImg: 'ဓာတ်ပုံ သီးသန့်သာ',
			outOfSize: 'ဓာတ်ပုံဆိုဒ် ကြီးလွန်းသည် ။ အများဆုံး ဆိုဒ် : ',
			lowestPx: 'ဓာတ်ပုံဆိုဒ် သေးလွန်းသည်။ အနည်းဆုံး ဆိုဒ် : '
		}
	},
	se: {
		hint: 'Klicka eller dra en fil hit för att ladda upp den',
		loading: 'Laddar upp…',
		noSupported: 'Din webbläsare stöds inte, vänligen använd IE10+ eller andra webbläsare',
		success: 'Uppladdning lyckades',
		fail: 'Uppladdning misslyckades',
		preview: 'Förhandsgranska',
		btn: {
			off: 'Avbryt',
			close: 'Stäng',
			back: 'Tillbaka',
			save: 'Spara'
		},
		error: {
			onlyImg: 'Endast bilder',
			outOfSize: 'Bilden är större än max-gränsen: ',
			lowestPx: 'Bilden är för liten. Minimum är: '
		}
	}
});


/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'psd': 'image/photoshop'
});


/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
/* harmony default export */ __webpack_exports__["a"] = (function(data, mime) {
	data = data.split(',')[1];
	data = window.atob(data);
	var ia = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		ia[i] = data.charCodeAt(i);
	};
	// canvas.toDataURL 返回的默认格式就是 image/png
	return new Blob([ia], {
		type: mime
	});
});;


/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 点击波纹效果
 *
 * @param  {[event]} e        [description]
 * @param  {[Object]} arg_opts [description]
 * @return {[bollean]}          [description]
 */
/* harmony default export */ __webpack_exports__["a"] = (function(e, arg_opts) {
	var opts = Object.assign({
			ele: e.target, // 波纹作用元素
			type: 'hit', // hit点击位置扩散　center中心点扩展
			bgc: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
		}, arg_opts),
		target = opts.ele;
	if (target) {
		var rect = target.getBoundingClientRect(),
			ripple = target.querySelector('.e-ripple');
		if (!ripple) {
			ripple = document.createElement('span');
			ripple.className = 'e-ripple';
			ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
			target.appendChild(ripple);
		} else {
			ripple.className = 'e-ripple';
		}
		switch (opts.type) {
			case 'center':
				ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px';
				ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px';
				break;
			default:
				ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px';
				ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px';
		}
		ripple.style.backgroundColor = opts.bgc;
		ripple.className = 'e-ripple z-active';
		return false;
	}
});;


/***/ }),

/***/ 723:
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
          name: "show",
          rawName: "v-show",
          value: _vm.value,
          expression: "value"
        }
      ],
      staticClass: "vue-image-crop-upload"
    },
    [
      _c("div", { staticClass: "vicp-wrap" }, [
        _c("div", { staticClass: "vicp-close", on: { click: _vm.off } }, [
          _c("i", { staticClass: "vicp-icon4" })
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.step == 1,
                expression: "step == 1"
              }
            ],
            staticClass: "vicp-step1"
          },
          [
            _c(
              "div",
              {
                staticClass: "vicp-drop-area",
                on: {
                  dragleave: _vm.preventDefault,
                  dragover: _vm.preventDefault,
                  dragenter: _vm.preventDefault,
                  click: _vm.handleClick,
                  drop: _vm.handleChange
                }
              },
              [
                _c(
                  "i",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading != 1,
                        expression: "loading != 1"
                      }
                    ],
                    staticClass: "vicp-icon1"
                  },
                  [
                    _c("i", { staticClass: "vicp-icon1-arrow" }),
                    _vm._v(" "),
                    _c("i", { staticClass: "vicp-icon1-body" }),
                    _vm._v(" "),
                    _c("i", { staticClass: "vicp-icon1-bottom" })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading !== 1,
                        expression: "loading !== 1"
                      }
                    ],
                    staticClass: "vicp-hint"
                  },
                  [_vm._v(_vm._s(_vm.lang.hint))]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.isSupported,
                        expression: "!isSupported"
                      }
                    ],
                    staticClass: "vicp-no-supported-hint"
                  },
                  [_vm._v(_vm._s(_vm.lang.noSupported))]
                ),
                _vm._v(" "),
                _vm.step == 1
                  ? _c("input", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: false,
                          expression: "false"
                        }
                      ],
                      ref: "fileinput",
                      attrs: { type: "file" },
                      on: { change: _vm.handleChange }
                    })
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.hasError,
                    expression: "hasError"
                  }
                ],
                staticClass: "vicp-error"
              },
              [
                _c("i", { staticClass: "vicp-icon2" }),
                _vm._v(" " + _vm._s(_vm.errorMsg) + "\r\n\t\t\t")
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vicp-operate" }, [
              _c("a", { on: { click: _vm.off, mousedown: _vm.ripple } }, [
                _vm._v(_vm._s(_vm.lang.btn.off))
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _vm.step == 2
          ? _c("div", { staticClass: "vicp-step2" }, [
              _c("div", { staticClass: "vicp-crop" }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: true,
                        expression: "true"
                      }
                    ],
                    staticClass: "vicp-crop-left"
                  },
                  [
                    _c("div", { staticClass: "vicp-img-container" }, [
                      _c("img", {
                        ref: "img",
                        staticClass: "vicp-img",
                        style: _vm.sourceImgStyle,
                        attrs: { src: _vm.sourceImgUrl, draggable: "false" },
                        on: {
                          drag: _vm.preventDefault,
                          dragstart: _vm.preventDefault,
                          dragend: _vm.preventDefault,
                          dragleave: _vm.preventDefault,
                          dragover: _vm.preventDefault,
                          dragenter: _vm.preventDefault,
                          drop: _vm.preventDefault,
                          touchstart: _vm.imgStartMove,
                          touchmove: _vm.imgMove,
                          touchend: _vm.createImg,
                          touchcancel: _vm.createImg,
                          mousedown: _vm.imgStartMove,
                          mousemove: _vm.imgMove,
                          mouseup: _vm.createImg,
                          mouseout: _vm.createImg
                        }
                      }),
                      _vm._v(" "),
                      _c("div", {
                        staticClass: "vicp-img-shade vicp-img-shade-1",
                        style: _vm.sourceImgShadeStyle
                      }),
                      _vm._v(" "),
                      _c("div", {
                        staticClass: "vicp-img-shade vicp-img-shade-2",
                        style: _vm.sourceImgShadeStyle
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "vicp-range" }, [
                      _c("input", {
                        attrs: {
                          type: "range",
                          step: "1",
                          min: "0",
                          max: "100"
                        },
                        domProps: { value: _vm.scale.range },
                        on: { mousemove: _vm.zoomChange }
                      }),
                      _vm._v(" "),
                      _c("i", {
                        staticClass: "vicp-icon5",
                        on: {
                          mousedown: _vm.startZoomSub,
                          mouseout: _vm.endZoomSub,
                          mouseup: _vm.endZoomSub
                        }
                      }),
                      _vm._v(" "),
                      _c("i", {
                        staticClass: "vicp-icon6",
                        on: {
                          mousedown: _vm.startZoomAdd,
                          mouseout: _vm.endZoomAdd,
                          mouseup: _vm.endZoomAdd
                        }
                      })
                    ]),
                    _vm._v(" "),
                    !_vm.noRotate
                      ? _c("div", { staticClass: "vicp-rotate" }, [
                          _c("i", { on: { click: _vm.rotateImg } }, [
                            _vm._v("↻")
                          ])
                        ])
                      : _vm._e()
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: true,
                        expression: "true"
                      }
                    ],
                    staticClass: "vicp-crop-right"
                  },
                  [
                    _c("div", { staticClass: "vicp-preview" }, [
                      !_vm.noSquare
                        ? _c("div", { staticClass: "vicp-preview-item" }, [
                            _c("img", {
                              style: _vm.previewStyle,
                              attrs: { src: _vm.createImgUrl }
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(_vm.lang.preview))])
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.noCircle
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "vicp-preview-item vicp-preview-item-circle"
                            },
                            [
                              _c("img", {
                                style: _vm.previewStyle,
                                attrs: { src: _vm.createImgUrl }
                              }),
                              _vm._v(" "),
                              _c("span", [_vm._v(_vm._s(_vm.lang.preview))])
                            ]
                          )
                        : _vm._e()
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vicp-operate" }, [
                _c(
                  "a",
                  {
                    on: {
                      click: function($event) {
                        return _vm.setStep(1)
                      },
                      mousedown: _vm.ripple
                    }
                  },
                  [_vm._v(_vm._s(_vm.lang.btn.back))]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "vicp-operate-btn",
                    on: { click: _vm.prepareUpload, mousedown: _vm.ripple }
                  },
                  [_vm._v(_vm._s(_vm.lang.btn.save))]
                )
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.step == 3
          ? _c("div", { staticClass: "vicp-step3" }, [
              _c("div", { staticClass: "vicp-upload" }, [
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading === 1,
                        expression: "loading === 1"
                      }
                    ],
                    staticClass: "vicp-loading"
                  },
                  [_vm._v(_vm._s(_vm.lang.loading))]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vicp-progress-wrap" }, [
                  _c("span", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading === 1,
                        expression: "loading === 1"
                      }
                    ],
                    staticClass: "vicp-progress",
                    style: _vm.progressStyle
                  })
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.hasError,
                        expression: "hasError"
                      }
                    ],
                    staticClass: "vicp-error"
                  },
                  [
                    _c("i", { staticClass: "vicp-icon2" }),
                    _vm._v(" " + _vm._s(_vm.errorMsg) + "\r\n\t\t\t\t")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading === 2,
                        expression: "loading === 2"
                      }
                    ],
                    staticClass: "vicp-success"
                  },
                  [
                    _c("i", { staticClass: "vicp-icon3" }),
                    _vm._v(" " + _vm._s(_vm.lang.success) + "\r\n\t\t\t\t")
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vicp-operate" }, [
                _c(
                  "a",
                  {
                    on: {
                      click: function($event) {
                        return _vm.setStep(2)
                      },
                      mousedown: _vm.ripple
                    }
                  },
                  [_vm._v(_vm._s(_vm.lang.btn.back))]
                ),
                _vm._v(" "),
                _c("a", { on: { click: _vm.off, mousedown: _vm.ripple } }, [
                  _vm._v(_vm._s(_vm.lang.btn.close))
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("canvas", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: false,
              expression: "false"
            }
          ],
          ref: "canvas",
          attrs: { width: _vm.width, height: _vm.height }
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-25292217", module.exports)
  }
}

/***/ })

});