webpackJsonp([16],{

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1005);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(704)("6ff927c6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f1f6794\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_3\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f1f6794\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js?{\"resources\":\"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\bole_backend_mini_3\\\\resources\\\\assets\\\\sass\\\\_variables.scss\"}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(240)(false);
// imports


// module
exports.push([module.i, "\n.file .header-right {\n  width: 100%;\n  height: 68px;\n}\n.file .header-right .header-right-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #FFF;\n    height: 100%;\n    -webkit-box-shadow: 0px 0px 8px black;\n            box-shadow: 0px 0px 8px black;\n}\n.file .header-right .header-right-content .button-home {\n      display: inline-block;\n      vertical-align: middle;\n}\n.file .header-right .header-right-content .button-home a i {\n        color: black;\n        font-size: 30px;\n        cursor: pointer;\n}\n.file .header-right .header-right-content .title {\n      margin-left: 10px;\n      display: inline-block;\n      color: black;\n      font-weight: bold;\n      line-height: 68px;\n}\n.file .header-right .header-right-content .action {\n      display: inline-block;\n      float: right;\n      color: black;\n      font-weight: bold;\n      line-height: 68px;\n}\n.file .header-right .header-right-content .action form {\n        height: 68px !important;\n}\n.file .header-right .header-right-content .action form .action-search {\n          margin-left: 10px;\n          display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-search .action-search-title {\n            display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-search .action-search-input {\n            display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-search-result {\n          margin-left: 10px;\n          display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-search-result .action-search-result-total {\n            color: red;\n}\n.file .header-right .header-right-content .action form .action-amount-per-page {\n          margin-left: 10px;\n          display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-amount-per-page .action-amount-per-page-title {\n            display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-amount-per-page .action-amount-per-page-select {\n            display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-title {\n          margin-left: 10px;\n          display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-list {\n          display: inline-block;\n}\n.file .header-right .header-right-content .action form .action-list .button-add {\n            display: inline-block;\n            height: 60px;\n            vertical-align: middle;\n}\n.file .header-right .header-right-content .action form .action-list .button-add img {\n              width: 20px;\n              height: 20px;\n              cursor: pointer;\n}\n.file .header-right .header-right-content .action .el-form-item {\n        margin-right: 0;\n        margin-bottom: 0;\n}\n.file .header-right .header-right-content .action .el-input {\n        line-height: 68px;\n}\n.file .header-right .header-right-content .action input {\n        width: 150px !important;\n        height: 25px !important;\n}\n.file .content {\n  padding: 20px;\n  overflow-y: scroll;\n  height: 614px;\n}\n.file .content .table-template {\n    padding-bottom: 30px;\n}\n.file .content .table-template table th, .file .content .table-template table td {\n      padding: 5px;\n      border: 1px solid black;\n}\n.file .content .table-template table th {\n      background-color: #263238;\n      color: #FFF;\n}\n.file .content .table-template table td {\n      background-color: #FFF;\n}\n.file .content .table-template table th:nth-child(1), .file .content .table-template table td:nth-child(1) {\n      width: 120px;\n      text-align: center;\n}\n.file .content .table-template table th:nth-child(2), .file .content .table-template table td:nth-child(2) {\n      width: 48px;\n      text-align: center;\n}\n.file .content .table-template table th:nth-child(3), .file .content .table-template table td:nth-child(3) {\n      width: auto;\n      text-align: center;\n}\n.file .content .table-template table th:nth-child(4), .file .content .table-template table td:nth-child(4) {\n      width: 50px;\n      text-align: center;\n}\n.file .content .table-template table th:nth-child(5), .file .content .table-template table td:nth-child(5) {\n      width: 100px;\n      text-align: center;\n}\n.file .content .table-template table th:nth-child(6), .file .content .table-template table td:nth-child(6) {\n      width: 100px;\n      text-align: center;\n}\n.file .content .table-template table th:last-child, .file .content .table-template table td:last-child {\n      width: 130px;\n      text-align: center;\n}\n.file .content .table-template table img {\n      width: 48px;\n      height: 50px;\n      vertical-align: middle;\n      cursor: pointer;\n}\n.file .content .table-template table .status {\n      position: relative;\n      top: -2px;\n      font-weight: bold;\n}\n.file .content .table-template table .status .status-active {\n        color: green;\n}\n.file .content .table-template table .status .status-inactive {\n        color: red;\n}\n.file .content .table-template table button {\n      padding-top: 5px;\n      padding-bottom: 5px;\n      width: 60px;\n      color: black;\n      cursor: pointer;\n      border: 1px solid black;\n}\n.file .content .table-template table .detail {\n      background-color: #00b050;\n}\n.file .content .table-template table .edit {\n      background-color: #66B1FF;\n}\n.file .content .table-template table .delete {\n      background-color: #ED4545;\n}\n.file .content .table-template .table {\n      width: 100%;\n}\n.file .content .pagination-template {\n    position: relative;\n}\n.file .content .pagination-template .pagination {\n      position: fixed;\n      bottom: 10px;\n      right: 25px;\n}\n.file .content .pagination-template .pagination .page-item {\n        margin-left: 2px;\n        margin-right: 2px;\n        display: inline-block;\n        background-color: #263238;\n        width: 30px;\n        height: 30px;\n        font-size: 16px;\n        text-align: center;\n        border: 1px solid black;\n}\n.file .content .pagination-template .pagination .page-item .page-link {\n          position: relative;\n          top: 6px;\n          color: #FFF;\n}\n.file .content .pagination-template .pagination .active {\n        background-color: #62A8EA;\n}\n.file .content .pagination-template .pagination .disabled {\n        cursor: no-drop;\n}\n.file .show-img-layout {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  z-index: 2;\n}\n.file .show-img-layout .close-img {\n    position: fixed;\n    top: 5px;\n    right: 5px;\n}\n.file .show-img-layout .close-img img {\n      width: 20px;\n      height: 20px;\n      cursor: pointer;\n}\n.file .show-img-layout .show-img {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n}\n.file .show-img-layout .show-img img {\n      cursor: default;\n}\n.file .modal-backdrop {\n  position: fixed;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.3);\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  z-index: 2;\n}\n.file .modal-backdrop .modal {\n    background-color: #FFF;\n    width: 400px;\n    -webkit-box-shadow: 2px 2px 20px 1px;\n            box-shadow: 2px 2px 20px 1px;\n    cursor: context-menu;\n}\n.file .modal-backdrop .modal .modal-header {\n      background-color: #67C23A;\n}\n.file .modal-backdrop .modal .modal-header .modal-header-title {\n        padding-top: 8px;\n        padding-bottom: 8px;\n        width: 100%;\n        color: #FFF;\n        font-weight: bold;\n        text-align: center;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content {\n      width: 400px;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content .part {\n        padding-top: 20px;\n        padding-bottom: 20px;\n        border-bottom: 1px solid black;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content .part .part-title {\n          padding-left: 34px;\n          font-size: 20px;\n          font-weight: bold;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content .part .part-form {\n          margin-top: 8px;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form .el-form-item {\n        margin-right: 0;\n        margin-bottom: 0;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form .el-form-item__label {\n        color: black !important;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form input {\n        width: 230px !important;\n        height: 25px !important;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form button {\n        height: 30px;\n        line-height: 0;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form .upload-layout a {\n        padding: 4px;\n        padding-left: 10px;\n        padding-right: 10px;\n        background-color: orange;\n        border-radius: 5px;\n        color: #FFF;\n}\n.file .modal-backdrop .modal .modal-body .modal-body-content form .upload-layout img {\n        margin-top: 6px;\n        width: 100px;\n        height: 100px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1006:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_upload_component_dist_vue_upload_component_part_js__ = __webpack_require__(1007);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_upload_component_dist_vue_upload_component_part_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_upload_component_dist_vue_upload_component_part_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var config = {
    headers: { "Content-Type": "multipart/form-data" }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Admin',
    components: {
        FileUpload: __WEBPACK_IMPORTED_MODULE_0_vue_upload_component_dist_vue_upload_component_part_js___default.a
    },
    data: function data() {
        return {
            authority: [],
            searchForm: {
                view: 'showInfo'
            },
            fields: [{ key: 'directory_name', label: '目录名称', sortable: true }, { key: 'file_format', label: '文件' }, { key: 'name', label: '名称', sortable: true }, { key: 'status', label: '状态', sortable: true }, { key: 'date_create', label: '创建时间', sortable: true }, { key: 'date_update', label: '登入时间', sortable: true }, { key: 'actions', label: '操作' }],
            resultData: [],
            totalRows: resultData.length,
            amountPerPage: 20,
            filter: null,
            currentPage: 1,
            isModalAddVisible: false,
            addForm: {
                file: {},
                name: '',
                directory_id: '',
                status: '1'
            },
            isModalUpdateVisible: false,
            updateForm: {
                id: 0,
                file: {},
                name: '',
                directory_id: '',
                status: '1'
            },
            directoryList: [],
            loading: true,
            //洗掉
            btnLoading: false,
            isModalAddLoading: false,
            isModalUpdateLoading: false,

            file: '',
            fileUpdate: ''
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

            axios.get('/resource/file/getList').then(function (response) {
                _this2.resultData = response.data.resp_data.list;
                _this2.totalRows = response.data.resp_data.totalCount;
                _this2.directoryList = response.data.resp_data.directoryList;
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
        /*
        showImgLayout(img_url) {
        var img = document.getElementById('showImg');
        img.src = img_url;
        img.style.display = "block";
        var imgLayout = document.getElementById('showImgLayout');
        imgLayout.style.display = "block";
        },
        closeImgLayout() {
        var imgLayout = document.getElementById('showImgLayout');
        imgLayout.style.display = "none";
        },
        */
        //显示图片
        //上传文件
        /*
        uploadFile(val) {
            this.file = val;
            console.log(this.file);
        },
        */
        handleFileAdd: function handleFileAdd() {
            this.fileAdd = this.$refs.fileAdd.files[0];
        },
        handleFileUpdate: function handleFileUpdate() {
            this.fileUpdate = this.$refs.fileUpdate.files[0];
        },

        //上传文件
        //弹窗 - 添加, 更新
        showModal: function showModal(form, data) {
            if (form == 'addForm') {
                this.isModalAddVisible = true;
            } else if (form == 'updateForm') {
                this.updateForm = data;
                this.updateForm.status = data.status.toString();
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

                /*
                if (this.file) {
                    this.addForm.file = this.file;
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.file'),
                        showClose: true
                    });
                     return false;
                }
                */

                if (this.addForm.directory_id == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.directory'),
                        showClose: true
                    });

                    return false;
                }

                this.isModalAddLoading = true;

                var formData = new FormData();
                formData.append('directory_id', this.addForm.directory_id);
                formData.append('file', this.fileAdd);
                formData.append('name', this.addForm.name);
                formData.append('status', this.addForm.status);

                axios.post('/resource/file/createData', formData, config).then(function (response) {
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

                /*
                if (this.file) {
                    this.updateForm.file = this.file;
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.file'),
                        showClose: true
                    });
                     return false;
                }
                */

                if (this.updateForm.directory_id == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.directory'),
                        showClose: true
                    });

                    return false;
                }

                this.isModalUpdateLoading = true;

                var _formData = new FormData();
                _formData.append('id', this.updateForm.id);
                _formData.append('directory_id', this.updateForm.directory_id);
                _formData.append('name', this.updateForm.name);
                _formData.append('status', this.updateForm.status);

                if (this.fileUpdate) {
                    _formData.append('file', this.fileUpdate);
                }

                axios.post('/resource/file/updateData', _formData, config).then(function (response) {
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

                axios.post('/resource/file/deleteData', { id: id }).then(function (response) {
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
        },

        //弹窗 - 删除
        /*
        navigate(url) {
            window.open(url, '_blank');
        },
        */
        download: function download(file) {
            window.location.href = file;
        }
    }
});

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Name: vue-upload-component
 * Version: 2.8.20
 * Author: LianYue
 */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueUploadComponent = factory());
}(this, (function () { 'use strict';

  /**
   * Creates a XHR request
   *
   * @param {Object} options
   */
  var createRequest = function createRequest(options) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', options.url);
    xhr.responseType = 'json';
    if (options.headers) {
      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }

    return xhr;
  };

  /**
   * Sends a XHR request with certain body
   *
   * @param {XMLHttpRequest} xhr
   * @param {Object} body
   */
  var sendRequest = function sendRequest(xhr, body) {
    return new Promise(function (resolve, reject) {
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response;
          try {
            response = JSON.parse(xhr.response);
          } catch (err) {
            response = xhr.response;
          }
          resolve(response);
        } else {
          reject(xhr.response);
        }
      };
      xhr.onerror = function () {
        return reject(xhr.response);
      };
      xhr.send(JSON.stringify(body));
    });
  };

  /**
   * Sends a XHR request with certain form data
   *
   * @param {XMLHttpRequest} xhr
   * @param {Object} data
   */
  var sendFormRequest = function sendFormRequest(xhr, data) {
    var body = new FormData();
    for (var name in data) {
      body.append(name, data[name]);
    }

    return new Promise(function (resolve, reject) {
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response;
          try {
            response = JSON.parse(xhr.response);
          } catch (err) {
            response = xhr.response;
          }
          resolve(response);
        } else {
          reject(xhr.response);
        }
      };
      xhr.onerror = function () {
        return reject(xhr.response);
      };
      xhr.send(body);
    });
  };

  /**
   * Creates and sends XHR request
   *
   * @param {Object} options
   *
   * @returns Promise
   */
  function request (options) {
    var xhr = createRequest(options);

    return sendRequest(xhr, options.body);
  }

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var ChunkUploadHandler = function () {
    /**
     * Constructor
     *
     * @param {File} file
     * @param {Object} options
     */
    function ChunkUploadHandler(file, options) {
      _classCallCheck(this, ChunkUploadHandler);

      this.file = file;
      this.options = options;
    }

    /**
     * Gets the max retries from options
     */


    _createClass(ChunkUploadHandler, [{
      key: 'createChunks',


      /**
       * Creates all the chunks in the initial state
       */
      value: function createChunks() {
        this.chunks = [];

        var start = 0;
        var end = this.chunkSize;
        while (start < this.fileSize) {
          this.chunks.push({
            blob: this.file.file.slice(start, end),
            startOffset: start,
            active: false,
            retries: this.maxRetries
          });
          start = end;
          end = start + this.chunkSize;
        }
      }

      /**
       * Updates the progress of the file with the handler's progress
       */

    }, {
      key: 'updateFileProgress',
      value: function updateFileProgress() {
        this.file.progress = this.progress;
      }

      /**
       * Paues the upload process
       * - Stops all active requests
       * - Sets the file not active
       */

    }, {
      key: 'pause',
      value: function pause() {
        this.file.active = false;
        this.stopChunks();
      }

      /**
       * Stops all the current chunks
       */

    }, {
      key: 'stopChunks',
      value: function stopChunks() {
        this.chunksUploading.forEach(function (chunk) {
          chunk.xhr.abort();
          chunk.active = false;
        });
      }

      /**
       * Resumes the file upload
       * - Sets the file active
       * - Starts the following chunks
       */

    }, {
      key: 'resume',
      value: function resume() {
        this.file.active = true;
        this.startChunking();
      }

      /**
       * Starts the file upload
       *
       * @returns Promise
       * - resolve  The file was uploaded
       * - reject   The file upload failed
       */

    }, {
      key: 'upload',
      value: function upload() {
        var _this = this;

        this.promise = new Promise(function (resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        });
        this.start();

        return this.promise;
      }

      /**
       * Start phase
       * Sends a request to the backend to initialise the chunks
       */

    }, {
      key: 'start',
      value: function start() {
        var _this2 = this;

        request({
          method: 'POST',
          headers: Object.assign({}, this.headers, {
            'Content-Type': 'application/json'
          }),
          url: this.action,
          body: Object.assign(this.startBody, {
            phase: 'start',
            mime_type: this.fileType,
            size: this.fileSize,
            name: this.fileName
          })
        }).then(function (res) {
          if (res.status !== 'success') {
            _this2.file.response = res;
            return _this2.reject('server');
          }

          _this2.sessionId = res.data.session_id;
          _this2.chunkSize = res.data.end_offset;

          _this2.createChunks();
          _this2.startChunking();
        }).catch(function (res) {
          _this2.file.response = res;
          _this2.reject('server');
        });
      }

      /**
       * Starts to upload chunks
       */

    }, {
      key: 'startChunking',
      value: function startChunking() {
        for (var i = 0; i < this.maxActiveChunks; i++) {
          this.uploadNextChunk();
        }
      }

      /**
       * Uploads the next chunk
       * - Won't do anything if the process is paused
       * - Will start finish phase if there are no more chunks to upload
       */

    }, {
      key: 'uploadNextChunk',
      value: function uploadNextChunk() {
        if (this.file.active) {
          if (this.hasChunksToUpload) {
            return this.uploadChunk(this.chunksToUpload[0]);
          }

          if (this.chunksUploading.length === 0) {
            return this.finish();
          }
        }
      }

      /**
       * Uploads a chunk
       * - Sends the chunk to the backend
       * - Sets the chunk as uploaded if everything went well
       * - Decreases the number of retries if anything went wrong
       * - Fails if there are no more retries
       *
       * @param {Object} chunk
       */

    }, {
      key: 'uploadChunk',
      value: function uploadChunk(chunk) {
        var _this3 = this;

        chunk.progress = 0;
        chunk.active = true;
        this.updateFileProgress();
        chunk.xhr = createRequest({
          method: 'POST',
          headers: this.headers,
          url: this.action
        });

        chunk.xhr.upload.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            chunk.progress = Math.round(evt.loaded / evt.total * 100);
          }
        }, false);

        sendFormRequest(chunk.xhr, Object.assign(this.uploadBody, {
          phase: 'upload',
          session_id: this.sessionId,
          start_offset: chunk.startOffset,
          chunk: chunk.blob
        })).then(function (res) {
          chunk.active = false;
          if (res.status === 'success') {
            chunk.uploaded = true;
          } else {
            if (chunk.retries-- <= 0) {
              _this3.stopChunks();
              return _this3.reject('upload');
            }
          }

          _this3.uploadNextChunk();
        }).catch(function () {
          chunk.active = false;
          if (chunk.retries-- <= 0) {
            _this3.stopChunks();
            return _this3.reject('upload');
          }

          _this3.uploadNextChunk();
        });
      }

      /**
       * Finish phase
       * Sends a request to the backend to finish the process
       */

    }, {
      key: 'finish',
      value: function finish() {
        var _this4 = this;

        this.updateFileProgress();

        request({
          method: 'POST',
          headers: Object.assign({}, this.headers, {
            'Content-Type': 'application/json'
          }),
          url: this.action,
          body: Object.assign(this.finishBody, {
            phase: 'finish',
            session_id: this.sessionId
          })
        }).then(function (res) {
          _this4.file.response = res;
          if (res.status !== 'success') {
            return _this4.reject('server');
          }

          _this4.resolve(res);
        }).catch(function (res) {
          _this4.file.response = res;
          _this4.reject('server');
        });
      }
    }, {
      key: 'maxRetries',
      get: function get() {
        return parseInt(this.options.maxRetries);
      }

      /**
       * Gets the max number of active chunks being uploaded at once from options
       */

    }, {
      key: 'maxActiveChunks',
      get: function get() {
        return parseInt(this.options.maxActive);
      }

      /**
       * Gets the file type
       */

    }, {
      key: 'fileType',
      get: function get() {
        return this.file.type;
      }

      /**
       * Gets the file size
       */

    }, {
      key: 'fileSize',
      get: function get() {
        return this.file.size;
      }

      /**
       * Gets the file name
       */

    }, {
      key: 'fileName',
      get: function get() {
        return this.file.name;
      }

      /**
       * Gets action (url) to upload the file
       */

    }, {
      key: 'action',
      get: function get() {
        return this.options.action || null;
      }

      /**
       * Gets the body to be merged when sending the request in start phase
       */

    }, {
      key: 'startBody',
      get: function get() {
        return this.options.startBody || {};
      }

      /**
       * Gets the body to be merged when sending the request in upload phase
       */

    }, {
      key: 'uploadBody',
      get: function get() {
        return this.options.uploadBody || {};
      }

      /**
       * Gets the body to be merged when sending the request in finish phase
       */

    }, {
      key: 'finishBody',
      get: function get() {
        return this.options.finishBody || {};
      }

      /**
       * Gets the headers of the requests from options
       */

    }, {
      key: 'headers',
      get: function get() {
        return this.options.headers || {};
      }

      /**
       * Whether it's ready to upload files or not
       */

    }, {
      key: 'readyToUpload',
      get: function get() {
        return !!this.chunks;
      }

      /**
       * Gets the progress of the chunk upload
       * - Gets all the completed chunks
       * - Gets the progress of all the chunks that are being uploaded
       */

    }, {
      key: 'progress',
      get: function get() {
        var _this5 = this;

        var completedProgress = this.chunksUploaded.length / this.chunks.length * 100;
        var uploadingProgress = this.chunksUploading.reduce(function (progress, chunk) {
          return progress + (chunk.progress | 0) / _this5.chunks.length;
        }, 0);

        return Math.min(completedProgress + uploadingProgress, 100);
      }

      /**
       * Gets all the chunks that are pending to be uploaded
       */

    }, {
      key: 'chunksToUpload',
      get: function get() {
        return this.chunks.filter(function (chunk) {
          return !chunk.active && !chunk.uploaded;
        });
      }

      /**
       * Whether there are chunks to upload or not
       */

    }, {
      key: 'hasChunksToUpload',
      get: function get() {
        return this.chunksToUpload.length > 0;
      }

      /**
       * Gets all the chunks that are uploading
       */

    }, {
      key: 'chunksUploading',
      get: function get() {
        return this.chunks.filter(function (chunk) {
          return !!chunk.xhr && !!chunk.active;
        });
      }

      /**
       * Gets all the chunks that have finished uploading
       */

    }, {
      key: 'chunksUploaded',
      get: function get() {
        return this.chunks.filter(function (chunk) {
          return !!chunk.uploaded;
        });
      }
    }]);

    return ChunkUploadHandler;
  }();

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    methods: {
      change: function change(e) {
        this.$parent.addInputFile(e.target);
        if (e.target.files) {
          e.target.value = '';
          if (e.target.files.length && !/safari/i.test(navigator.userAgent)) {
            e.target.type = '';
            e.target.type = 'file';
          }
        } else {
          // ie9 fix #219
          this.$destroy();
          // eslint-disable-next-line
          new this.constructor({
            parent: this.$parent,
            el: this.$el
          });
        }
      }
    }
  };

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { attrs: { "type": "file", "name": _vm.$parent.name, "id": _vm.$parent.inputId || _vm.$parent.name, "accept": _vm.$parent.accept, "capture": _vm.$parent.capture, "disabled": _vm.$parent.disabled, "webkitdirectory": _vm.$parent.directory && _vm.$parent.features.directory, "directory": _vm.$parent.directory && _vm.$parent.features.directory, "multiple": _vm.$parent.multiple && _vm.$parent.features.html5 }, on: { "change": _vm.change } });
  };
  var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var InputFile = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var CHUNK_DEFAULT_OPTIONS = {
    headers: {},
    action: '',
    minSize: 1048576,
    maxActive: 3,
    maxRetries: 5,

    handler: ChunkUploadHandler
  };

  var script$1 = {
    components: {
      InputFile: InputFile
    },
    props: {
      inputId: {
        type: String
      },

      name: {
        type: String,
        default: 'file'
      },

      accept: {
        type: String
      },

      capture: {},

      disabled: {},

      multiple: {
        type: Boolean
      },

      maximum: {
        type: Number,
        default: function _default() {
          return this.multiple ? 0 : 1;
        }
      },

      addIndex: {
        type: [Boolean, Number]
      },

      directory: {
        type: Boolean
      },

      postAction: {
        type: String
      },

      putAction: {
        type: String
      },

      customAction: {
        type: Function
      },

      headers: {
        type: Object,
        default: Object
      },

      data: {
        type: Object,
        default: Object
      },

      timeout: {
        type: Number,
        default: 0
      },

      drop: {
        default: false
      },

      dropDirectory: {
        type: Boolean,
        default: true
      },

      size: {
        type: Number,
        default: 0
      },

      extensions: {
        default: Array
      },

      value: {
        type: Array,
        default: Array
      },

      thread: {
        type: Number,
        default: 1
      },

      // Chunk upload enabled
      chunkEnabled: {
        type: Boolean,
        default: false
      },

      // Chunk upload properties
      chunk: {
        type: Object,
        default: function _default() {
          return CHUNK_DEFAULT_OPTIONS;
        }
      }
    },

    data: function data() {
      return {
        files: this.value,
        features: {
          html5: true,
          directory: false,
          drag: false
        },

        active: false,
        dropActive: false,

        uploading: 0,

        destroy: false
      };
    },


    /**
     * mounted
     * @return {[type]} [description]
     */
    mounted: function mounted() {
      var input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;

      // html5 特征
      if (window.FormData && input.files) {
        // 上传目录特征
        if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
          this.features.directory = true;
        }

        // 拖拽特征
        if (this.features.html5 && typeof input.ondrop !== 'undefined') {
          this.features.drop = true;
        }
      } else {
        this.features.html5 = false;
      }

      // files 定位缓存
      this.maps = {};
      if (this.files) {
        for (var i = 0; i < this.files.length; i++) {
          var file = this.files[i];
          this.maps[file.id] = file;
        }
      }

      this.$nextTick(function () {

        // 更新下父级
        if (this.$parent) {
          this.$parent.$forceUpdate();
        }

        // 拖拽渲染
        this.watchDrop(this.drop);
      });
    },


    /**
     * beforeDestroy
     * @return {[type]} [description]
     */
    beforeDestroy: function beforeDestroy() {
      // 已销毁
      this.destroy = true;

      // 设置成不激活
      this.active = false;
    },


    computed: {
      /**
       * uploading 正在上传的线程
       * @return {[type]} [description]
       */

      /**
       * uploaded 文件列表是否全部已上传
       * @return {[type]} [description]
       */
      uploaded: function uploaded() {
        var file = void 0;
        for (var i = 0; i < this.files.length; i++) {
          file = this.files[i];
          if (file.fileObject && !file.error && !file.success) {
            return false;
          }
        }
        return true;
      },
      chunkOptions: function chunkOptions() {
        return Object.assign(CHUNK_DEFAULT_OPTIONS, this.chunk);
      },
      className: function className() {
        return ['file-uploads', this.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4', this.features.directory && this.directory ? 'file-uploads-directory' : undefined, this.features.drop && this.drop ? 'file-uploads-drop' : undefined, this.disabled ? 'file-uploads-disabled' : undefined];
      }
    },

    watch: {
      active: function active(_active) {
        this.watchActive(_active);
      },
      dropActive: function dropActive() {
        if (this.$parent) {
          this.$parent.$forceUpdate();
        }
      },
      drop: function drop(value) {
        this.watchDrop(value);
      },
      value: function value(files) {
        if (this.files === files) {
          return;
        }
        this.files = files;

        var oldMaps = this.maps;

        // 重写 maps 缓存
        this.maps = {};
        for (var i = 0; i < this.files.length; i++) {
          var file = this.files[i];
          this.maps[file.id] = file;
        }

        // add, update
        for (var key in this.maps) {
          var newFile = this.maps[key];
          var oldFile = oldMaps[key];
          if (newFile !== oldFile) {
            this.emitFile(newFile, oldFile);
          }
        }

        // delete
        for (var _key in oldMaps) {
          if (!this.maps[_key]) {
            this.emitFile(undefined, oldMaps[_key]);
          }
        }
      }
    },

    methods: {

      // 清空
      clear: function clear() {
        if (this.files.length) {
          var files = this.files;
          this.files = [];

          // 定位
          this.maps = {};

          // 事件
          this.emitInput();
          for (var i = 0; i < files.length; i++) {
            this.emitFile(undefined, files[i]);
          }
        }
        return true;
      },


      // 选择
      get: function get(id) {
        if (!id) {
          return false;
        }

        if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
          return this.maps[id.id] || false;
        }

        return this.maps[id] || false;
      },


      // 添加
      add: function add(_files) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.addIndex;

        var files = _files;
        var isArray = files instanceof Array;

        // 不是数组整理成数组
        if (!isArray) {
          files = [files];
        }

        // 遍历规范对象
        var addFiles = [];
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (this.features.html5 && file instanceof Blob) {
            file = {
              file: file,
              size: file.size,
              name: file.webkitRelativePath || file.relativePath || file.name || 'unknown',
              type: file.type
            };
          }
          var fileObject = false;
          if (file.fileObject === false) ; else if (file.fileObject) {
            fileObject = true;
          } else if (typeof Element !== 'undefined' && file.el instanceof Element) {
            fileObject = true;
          } else if (typeof Blob !== 'undefined' && file.file instanceof Blob) {
            fileObject = true;
          }
          if (fileObject) {
            file = _extends({
              fileObject: true,
              size: -1,
              name: 'Filename',
              type: '',
              active: false,
              error: '',
              success: false,
              putAction: this.putAction,
              postAction: this.postAction,
              timeout: this.timeout
            }, file, {
              response: {},

              progress: '0.00', // 只读
              speed: 0 // 只读
              // xhr: false,                // 只读
              // iframe: false,             // 只读
            });

            file.data = _extends({}, this.data, file.data ? file.data : {});

            file.headers = _extends({}, this.headers, file.headers ? file.headers : {});
          }

          // 必须包含 id
          if (!file.id) {
            file.id = Math.random().toString(36).substr(2);
          }

          if (this.emitFilter(file, undefined)) {
            continue;
          }

          // 最大数量限制
          if (this.maximum > 1 && addFiles.length + this.files.length >= this.maximum) {
            break;
          }

          addFiles.push(file);

          // 最大数量限制
          if (this.maximum === 1) {
            break;
          }
        }

        // 没有文件
        if (!addFiles.length) {
          return false;
        }

        // 如果是 1 清空
        if (this.maximum === 1) {
          this.clear();
        }

        // 添加进去 files
        var newFiles = void 0;
        if (index === true || index === 0) {
          newFiles = addFiles.concat(this.files);
        } else if (index) {
          var _newFiles;

          newFiles = this.files.concat([]);
          (_newFiles = newFiles).splice.apply(_newFiles, [index, 0].concat(addFiles));
        } else {
          newFiles = this.files.concat(addFiles);
        }

        this.files = newFiles;

        // 定位
        for (var _i = 0; _i < addFiles.length; _i++) {
          var _file2 = addFiles[_i];
          this.maps[_file2.id] = _file2;
        }

        // 事件
        this.emitInput();
        for (var _i2 = 0; _i2 < addFiles.length; _i2++) {
          this.emitFile(addFiles[_i2], undefined);
        }

        return isArray ? addFiles : addFiles[0];
      },


      // 添加表单文件
      addInputFile: function addInputFile(el) {
        var files = [];
        if (el.files) {
          for (var i = 0; i < el.files.length; i++) {
            var file = el.files[i];
            files.push({
              size: file.size,
              name: file.webkitRelativePath || file.relativePath || file.name,
              type: file.type,
              file: file
            });
          }
        } else {
          var names = el.value.replace(/\\/g, '/').split('/');
          delete el.__vuex__;
          files.push({
            name: names[names.length - 1],
            el: el
          });
        }
        return this.add(files);
      },


      // 添加 DataTransfer
      addDataTransfer: function addDataTransfer(dataTransfer) {
        var _this = this;

        var files = [];
        if (dataTransfer.items && dataTransfer.items.length) {
          var items = [];
          for (var i = 0; i < dataTransfer.items.length; i++) {
            var item = dataTransfer.items[i];
            if (item.getAsEntry) {
              item = item.getAsEntry() || item.getAsFile();
            } else if (item.webkitGetAsEntry) {
              item = item.webkitGetAsEntry() || item.getAsFile();
            } else {
              item = item.getAsFile();
            }
            if (item) {
              items.push(item);
            }
          }

          return new Promise(function (resolve, reject) {
            var forEach = function forEach(i) {
              var item = items[i];
              // 结束 文件数量大于 最大数量
              if (!item || _this.maximum > 0 && files.length >= _this.maximum) {
                return resolve(_this.add(files));
              }
              _this.getEntry(item).then(function (results) {
                files.push.apply(files, _toConsumableArray(results));
                forEach(i + 1);
              });
            };
            forEach(0);
          });
        }

        if (dataTransfer.files.length) {
          for (var _i3 = 0; _i3 < dataTransfer.files.length; _i3++) {
            files.push(dataTransfer.files[_i3]);
            if (this.maximum > 0 && files.length >= this.maximum) {
              break;
            }
          }
          return Promise.resolve(this.add(files));
        }

        return Promise.resolve([]);
      },


      // 获得 entry
      getEntry: function getEntry(entry) {
        var _this2 = this;

        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return new Promise(function (resolve, reject) {
          if (entry.isFile) {
            entry.file(function (file) {
              resolve([{
                size: file.size,
                name: path + file.name,
                type: file.type,
                file: file
              }]);
            });
          } else if (entry.isDirectory && _this2.dropDirectory) {
            var files = [];
            var dirReader = entry.createReader();
            var readEntries = function readEntries() {
              dirReader.readEntries(function (entries) {
                var forEach = function forEach(i) {
                  if (!entries[i] && i === 0 || _this2.maximum > 0 && files.length >= _this2.maximum) {
                    return resolve(files);
                  }
                  if (!entries[i]) {
                    return readEntries();
                  }
                  _this2.getEntry(entries[i], path + entry.name + '/').then(function (results) {
                    files.push.apply(files, _toConsumableArray(results));
                    forEach(i + 1);
                  });
                };
                forEach(0);
              });
            };
            readEntries();
          } else {
            resolve([]);
          }
        });
      },
      replace: function replace(id1, id2) {
        var file1 = this.get(id1);
        var file2 = this.get(id2);
        if (!file1 || !file2 || file1 === file2) {
          return false;
        }
        var files = this.files.concat([]);
        var index1 = files.indexOf(file1);
        var index2 = files.indexOf(file2);
        if (index1 === -1 || index2 === -1) {
          return false;
        }
        files[index1] = file2;
        files[index2] = file1;
        this.files = files;
        this.emitInput();
        return true;
      },


      // 移除
      remove: function remove(id) {
        var file = this.get(id);
        if (file) {
          if (this.emitFilter(undefined, file)) {
            return false;
          }
          var files = this.files.concat([]);
          var index = files.indexOf(file);
          if (index === -1) {
            console.error('remove', file);
            return false;
          }
          files.splice(index, 1);
          this.files = files;

          // 定位
          delete this.maps[file.id];

          // 事件
          this.emitInput();
          this.emitFile(undefined, file);
        }
        return file;
      },


      // 更新
      update: function update(id, data) {
        var file = this.get(id);
        if (file) {
          var newFile = _extends({}, file, data);
          // 停用必须加上错误
          if (file.fileObject && file.active && !newFile.active && !newFile.error && !newFile.success) {
            newFile.error = 'abort';
          }

          if (this.emitFilter(newFile, file)) {
            return false;
          }

          var files = this.files.concat([]);
          var index = files.indexOf(file);
          if (index === -1) {
            console.error('update', file);
            return false;
          }
          files.splice(index, 1, newFile);
          this.files = files;

          // 删除  旧定位 写入 新定位 （已便支持修改id)
          delete this.maps[file.id];
          this.maps[newFile.id] = newFile;

          // 事件
          this.emitInput();
          this.emitFile(newFile, file);
          return newFile;
        }
        return false;
      },


      // 预处理 事件 过滤器
      emitFilter: function emitFilter(newFile, oldFile) {
        var isPrevent = false;
        this.$emit('input-filter', newFile, oldFile, function () {
          isPrevent = true;
          return isPrevent;
        });
        return isPrevent;
      },


      // 处理后 事件 分发
      emitFile: function emitFile(newFile, oldFile) {
        this.$emit('input-file', newFile, oldFile);
        if (newFile && newFile.fileObject && newFile.active && (!oldFile || !oldFile.active)) {
          this.uploading++;
          // 激活
          this.$nextTick(function () {
            var _this3 = this;

            setTimeout(function () {
              _this3.upload(newFile).then(function () {
                // eslint-disable-next-line
                newFile = _this3.get(newFile);
                if (newFile && newFile.fileObject) {
                  _this3.update(newFile, {
                    active: false,
                    success: !newFile.error
                  });
                }
              }).catch(function (e) {
                _this3.update(newFile, {
                  active: false,
                  success: false,
                  error: e.code || e.error || e.message || e
                });
              });
            }, parseInt(Math.random() * 50 + 50, 10));
          });
        } else if ((!newFile || !newFile.fileObject || !newFile.active) && oldFile && oldFile.fileObject && oldFile.active) {
          // 停止
          this.uploading--;
        }

        // 自动延续激活
        if (this.active && (Boolean(newFile) !== Boolean(oldFile) || newFile.active !== oldFile.active)) {
          this.watchActive(true);
        }
      },
      emitInput: function emitInput() {
        this.$emit('input', this.files);
      },


      // 上传
      upload: function upload(id) {
        var file = this.get(id);

        // 被删除
        if (!file) {
          return Promise.reject('not_exists');
        }

        // 不是文件对象
        if (!file.fileObject) {
          return Promise.reject('file_object');
        }

        // 有错误直接响应
        if (file.error) {
          return Promise.reject(file.error);
        }

        // 已完成直接响应
        if (file.success) {
          return Promise.resolve(file);
        }

        // 后缀
        var extensions = this.extensions;
        if (extensions && (extensions.length || typeof extensions.length === 'undefined')) {
          if ((typeof extensions === 'undefined' ? 'undefined' : _typeof(extensions)) !== 'object' || !(extensions instanceof RegExp)) {
            if (typeof extensions === 'string') {
              extensions = extensions.split(',').map(function (value) {
                return value.trim();
              }).filter(function (value) {
                return value;
              });
            }
            extensions = new RegExp('\\.(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i');
          }
          if (file.name.search(extensions) === -1) {
            return Promise.reject('extension');
          }
        }

        // 大小
        if (this.size > 0 && file.size >= 0 && file.size > this.size) {
          return Promise.reject('size');
        }

        if (this.customAction) {
          return this.customAction(file, this);
        }

        if (this.features.html5) {
          if (this.shouldUseChunkUpload(file)) {
            return this.uploadChunk(file);
          }
          if (file.putAction) {
            return this.uploadPut(file);
          }
          if (file.postAction) {
            return this.uploadHtml5(file);
          }
        }
        if (file.postAction) {
          return this.uploadHtml4(file);
        }
        return Promise.reject('No action configured');
      },


      /**
       * Whether this file should be uploaded using chunk upload or not
       *
       * @param Object file
       */
      shouldUseChunkUpload: function shouldUseChunkUpload(file) {
        return this.chunkEnabled && !!this.chunkOptions.handler && file.size > this.chunkOptions.minSize;
      },


      /**
       * Upload a file using Chunk method
       *
       * @param File file
       */
      uploadChunk: function uploadChunk(file) {
        var HandlerClass = this.chunkOptions.handler;
        file.chunk = new HandlerClass(file, this.chunkOptions);

        return file.chunk.upload();
      },
      uploadPut: function uploadPut(file) {
        var querys = [];
        var value = void 0;
        for (var key in file.data) {
          value = file.data[key];
          if (value !== null && value !== undefined) {
            querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          }
        }
        var queryString = querys.length ? (file.putAction.indexOf('?') === -1 ? '?' : '&') + querys.join('&') : '';
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', file.putAction + queryString);
        return this.uploadXhr(xhr, file, file.file);
      },
      uploadHtml5: function uploadHtml5(file) {
        var form = new window.FormData();
        var value = void 0;
        for (var key in file.data) {
          value = file.data[key];
          if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
            if (value instanceof File) {
              form.append(key, value, value.name);
            } else {
              form.append(key, JSON.stringify(value));
            }
          } else if (value !== null && value !== undefined) {
            form.append(key, value);
          }
        }
        form.append(this.name, file.file, file.file.filename || file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', file.postAction);
        return this.uploadXhr(xhr, file, form);
      },
      uploadXhr: function uploadXhr(xhr, _file, body) {
        var _this4 = this;

        var file = _file;
        var speedTime = 0;
        var speedLoaded = 0;

        // 进度条
        xhr.upload.onprogress = function (e) {
          // 还未开始上传 已删除 未激活
          file = _this4.get(file);
          if (!e.lengthComputable || !file || !file.fileObject || !file.active) {
            return;
          }

          // 进度 速度 每秒更新一次
          var speedTime2 = Math.round(Date.now() / 1000);
          if (speedTime2 === speedTime) {
            return;
          }
          speedTime = speedTime2;

          file = _this4.update(file, {
            progress: (e.loaded / e.total * 100).toFixed(2),
            speed: e.loaded - speedLoaded
          });
          speedLoaded = e.loaded;
        };

        // 检查激活状态
        var interval = setInterval(function () {
          file = _this4.get(file);
          if (file && file.fileObject && !file.success && !file.error && file.active) {
            return;
          }

          if (interval) {
            clearInterval(interval);
            interval = false;
          }

          try {
            xhr.abort();
            xhr.timeout = 1;
          } catch (e) {}
        }, 100);

        return new Promise(function (resolve, reject) {
          var complete = void 0;
          var fn = function fn(e) {
            // 已经处理过了
            if (complete) {
              return;
            }
            complete = true;
            if (interval) {
              clearInterval(interval);
              interval = false;
            }

            file = _this4.get(file);

            // 不存在直接响应
            if (!file) {
              return reject('not_exists');
            }

            // 不是文件对象
            if (!file.fileObject) {
              return reject('file_object');
            }

            // 有错误自动响应
            if (file.error) {
              return reject(file.error);
            }

            // 未激活
            if (!file.active) {
              return reject('abort');
            }

            // 已完成 直接相应
            if (file.success) {
              return resolve(file);
            }

            var data = {};

            switch (e.type) {
              case 'timeout':
              case 'abort':
                data.error = e.type;
                break;
              case 'error':
                if (!xhr.status) {
                  data.error = 'network';
                } else if (xhr.status >= 500) {
                  data.error = 'server';
                } else if (xhr.status >= 400) {
                  data.error = 'denied';
                }
                break;
              default:
                if (xhr.status >= 500) {
                  data.error = 'server';
                } else if (xhr.status >= 400) {
                  data.error = 'denied';
                } else {
                  data.progress = '100.00';
                }
            }

            if (xhr.responseText) {
              var contentType = xhr.getResponseHeader('Content-Type');
              if (contentType && contentType.indexOf('/json') !== -1) {
                data.response = JSON.parse(xhr.responseText);
              } else {
                data.response = xhr.responseText;
              }
            }

            // 更新
            file = _this4.update(file, data);

            // 相应错误
            if (file.error) {
              return reject(file.error);
            }

            // 响应
            return resolve(file);
          };

          // 事件
          xhr.onload = fn;
          xhr.onerror = fn;
          xhr.onabort = fn;
          xhr.ontimeout = fn;

          // 超时
          if (file.timeout) {
            xhr.timeout = file.timeout;
          }

          // headers
          for (var key in file.headers) {
            xhr.setRequestHeader(key, file.headers[key]);
          }

          // 更新 xhr
          file = _this4.update(file, { xhr: xhr });

          // 开始上传
          xhr.send(body);
        });
      },
      uploadHtml4: function uploadHtml4(_file) {
        var _this5 = this;

        var file = _file;
        var onKeydown = function onKeydown(e) {
          if (e.keyCode === 27) {
            e.preventDefault();
          }
        };

        var iframe = document.createElement('iframe');
        iframe.id = 'upload-iframe-' + file.id;
        iframe.name = 'upload-iframe-' + file.id;
        iframe.src = 'about:blank';
        iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;');

        var form = document.createElement('form');

        form.action = file.postAction;

        form.name = 'upload-form-' + file.id;

        form.setAttribute('method', 'POST');
        form.setAttribute('target', 'upload-iframe-' + file.id);
        form.setAttribute('enctype', 'multipart/form-data');

        var value = void 0;
        var input = void 0;
        for (var key in file.data) {
          value = file.data[key];
          if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
            value = JSON.stringify(value);
          }
          if (value !== null && value !== undefined) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          }
        }
        form.appendChild(file.el);

        document.body.appendChild(iframe).appendChild(form);

        var getResponseData = function getResponseData() {
          var doc = void 0;
          try {
            if (iframe.contentWindow) {
              doc = iframe.contentWindow.document;
            }
          } catch (err) {}
          if (!doc) {
            try {
              doc = iframe.contentDocument ? iframe.contentDocument : iframe.document;
            } catch (err) {
              doc = iframe.document;
            }
          }
          if (doc && doc.body) {
            return doc.body.innerHTML;
          }
          return null;
        };

        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            file = _this5.update(file, { iframe: iframe });

            // 不存在
            if (!file) {
              return reject('not_exists');
            }

            // 定时检查
            var interval = setInterval(function () {
              file = _this5.get(file);
              if (file && file.fileObject && !file.success && !file.error && file.active) {
                return;
              }

              if (interval) {
                clearInterval(interval);
                interval = false;
              }

              iframe.onabort({ type: file ? 'abort' : 'not_exists' });
            }, 100);

            var complete = void 0;
            var fn = function fn(e) {
              // 已经处理过了
              if (complete) {
                return;
              }
              complete = true;

              if (interval) {
                clearInterval(interval);
                interval = false;
              }

              // 关闭 esc 事件
              document.body.removeEventListener('keydown', onKeydown);

              file = _this5.get(file);

              // 不存在直接响应
              if (!file) {
                return reject('not_exists');
              }

              // 不是文件对象
              if (!file.fileObject) {
                return reject('file_object');
              }

              // 有错误自动响应
              if (file.error) {
                return reject(file.error);
              }

              // 未激活
              if (!file.active) {
                return reject('abort');
              }

              // 已完成 直接相应
              if (file.success) {
                return resolve(file);
              }

              var response = getResponseData();
              var data = {};
              switch (e.type) {
                case 'abort':
                  data.error = 'abort';
                  break;
                case 'error':
                  if (file.error) {
                    data.error = file.error;
                  } else if (response === null) {
                    data.error = 'network';
                  } else {
                    data.error = 'denied';
                  }
                  break;
                default:
                  if (file.error) {
                    data.error = file.error;
                  } else if (data === null) {
                    data.error = 'network';
                  } else {
                    data.progress = '100.00';
                  }
              }

              if (response !== null) {
                if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                  try {
                    response = JSON.parse(response);
                  } catch (err) {}
                }
                data.response = response;
              }

              // 更新
              file = _this5.update(file, data);

              if (file.error) {
                return reject(file.error);
              }

              // 响应
              return resolve(file);
            };

            // 添加事件
            iframe.onload = fn;
            iframe.onerror = fn;
            iframe.onabort = fn;

            // 禁止 esc 键
            document.body.addEventListener('keydown', onKeydown);

            // 提交
            form.submit();
          }, 50);
        }).then(function (res) {
          iframe.parentNode && iframe.parentNode.removeChild(iframe);
          return res;
        }).catch(function (res) {
          iframe.parentNode && iframe.parentNode.removeChild(iframe);
          return res;
        });
      },
      watchActive: function watchActive(active) {
        var file = void 0;
        var index = 0;
        while (file = this.files[index]) {
          index++;
          if (!file.fileObject) ; else if (active && !this.destroy) {
            if (this.uploading >= this.thread || this.uploading && !this.features.html5) {
              break;
            }
            if (!file.active && !file.error && !file.success) {
              this.update(file, { active: true });
            }
          } else {
            if (file.active) {
              this.update(file, { active: false });
            }
          }
        }
        if (this.uploading === 0) {
          this.active = false;
        }
      },
      watchDrop: function watchDrop(_el) {
        var el = _el;
        if (!this.features.drop) {
          return;
        }

        // 移除挂载
        if (this.dropElement) {
          try {
            document.removeEventListener('dragenter', this.onDragenter, false);
            document.removeEventListener('dragleave', this.onDragleave, false);
            document.removeEventListener('drop', this.onDocumentDrop, false);
            this.dropElement.removeEventListener('dragover', this.onDragover, false);
            this.dropElement.removeEventListener('drop', this.onDrop, false);
          } catch (e) {}
        }

        if (!el) {
          el = false;
        } else if (typeof el === 'string') {
          el = document.querySelector(el) || this.$root.$el.querySelector(el);
        } else if (el === true) {
          el = this.$parent.$el;
        }

        this.dropElement = el;

        if (this.dropElement) {
          document.addEventListener('dragenter', this.onDragenter, false);
          document.addEventListener('dragleave', this.onDragleave, false);
          document.addEventListener('drop', this.onDocumentDrop, false);
          this.dropElement.addEventListener('dragover', this.onDragover, false);
          this.dropElement.addEventListener('drop', this.onDrop, false);
        }
      },
      onDragenter: function onDragenter(e) {
        e.preventDefault();
        if (this.dropActive) {
          return;
        }
        if (!e.dataTransfer) {
          return;
        }
        var dt = e.dataTransfer;
        if (dt.files && dt.files.length) {
          this.dropActive = true;
        } else if (!dt.types) {
          this.dropActive = true;
        } else if (dt.types.indexOf && dt.types.indexOf('Files') !== -1) {
          this.dropActive = true;
        } else if (dt.types.contains && dt.types.contains('Files')) {
          this.dropActive = true;
        }
      },
      onDragleave: function onDragleave(e) {
        e.preventDefault();
        if (!this.dropActive) {
          return;
        }
        if (e.target.nodeName === 'HTML' || e.target === e.explicitOriginalTarget || !e.fromElement && (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
          this.dropActive = false;
        }
      },
      onDragover: function onDragover(e) {
        e.preventDefault();
      },
      onDocumentDrop: function onDocumentDrop() {
        this.dropActive = false;
      },
      onDrop: function onDrop(e) {
        e.preventDefault();
        this.addDataTransfer(e.dataTransfer);
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.className }, [_vm._t("default"), _vm._v(" "), _c('label', { attrs: { "for": _vm.inputId || _vm.name } }), _vm._v(" "), _c('input-file')], 2);
  };
  var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var FileUpload = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  var FileUpload$1 = /*#__PURE__*/Object.freeze({
    default: FileUpload
  });

  var require$$0 = ( FileUpload$1 && FileUpload ) || FileUpload$1;

  var src = require$$0;

  return src;

})));
//# sourceMappingURL=vue-upload-component.part.js.map


/***/ }),

/***/ 1008:
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
      staticClass: "file"
    },
    [
      _c("div", { staticClass: "header-right" }, [
        _c("div", { staticClass: "header-right-content" }, [
          _c(
            "div",
            { staticClass: "button-home" },
            [
              _c("router-link", { attrs: { to: "/system/file" } }, [
                _c("i", { staticClass: "fas fa-user-friends" })
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "title" }, [
            _vm._v(
              "\n                    " +
                _vm._s(_vm.$t("menu.title.file")) +
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
                    _vm.authority.indexOf(19) >= 0
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
                  key: "file_format",
                  fn: function(row) {
                    return [
                      row.item.file_format == "pdf"
                        ? _c("img", {
                            attrs: { src: "img/bole_mini/icon/icon_pdf.png" },
                            on: {
                              click: function($event) {
                                return _vm.download(row.item.file)
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      row.item.file_format == "rar"
                        ? _c("img", {
                            attrs: { src: "img/bole_mini/icon/icon_rar.png" },
                            on: {
                              click: function($event) {
                                return _vm.download(row.item.file)
                              }
                            }
                          })
                        : _vm._e()
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
                  key: "actions",
                  fn: function(row) {
                    return [
                      _vm.authority.indexOf(20) >= 0
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
                      _vm.authority.indexOf(21) >= 0
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
                                      label: _vm.$t("dialog.column.file")
                                    }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "upload-layout" },
                                      [
                                        _c("input", {
                                          ref: "fileAdd",
                                          attrs: {
                                            id: "fileAdd",
                                            type: "file"
                                          },
                                          on: {
                                            change: function($event) {
                                              return _vm.handleFileAdd()
                                            }
                                          }
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
                                      label: _vm.$t("dialog.column.directory")
                                    }
                                  },
                                  [
                                    _c(
                                      "el-select",
                                      {
                                        attrs: {
                                          placeholder: _vm.$t(
                                            "dialog.require.directory"
                                          )
                                        },
                                        model: {
                                          value: _vm.addForm.directory_id,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.addForm,
                                              "directory_id",
                                              $$v
                                            )
                                          },
                                          expression: "addForm.directory_id"
                                        }
                                      },
                                      _vm._l(_vm.directoryList, function(
                                        directory
                                      ) {
                                        return _c("el-option", {
                                          key: directory.id,
                                          attrs: {
                                            label: directory.name,
                                            value: directory.id
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
                                      label: _vm.$t("dialog.column.file")
                                    }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "upload-layout" },
                                      [
                                        _c("input", {
                                          ref: "fileUpdate",
                                          attrs: {
                                            id: "fileUpdate",
                                            type: "file"
                                          },
                                          on: {
                                            change: function($event) {
                                              return _vm.handleFileUpdate()
                                            }
                                          }
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
                                      label: _vm.$t("dialog.column.file")
                                    }
                                  },
                                  [
                                    _c(
                                      "el-select",
                                      {
                                        attrs: {
                                          placeholder: _vm.$t(
                                            "dialog.require.file"
                                          )
                                        },
                                        model: {
                                          value: _vm.updateForm.directory_id,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.updateForm,
                                              "directory_id",
                                              $$v
                                            )
                                          },
                                          expression: "updateForm.directory_id"
                                        }
                                      },
                                      _vm._l(_vm.directoryList, function(
                                        directory
                                      ) {
                                        return _c("el-option", {
                                          key: directory.id,
                                          attrs: {
                                            label: directory.name,
                                            value: directory.id
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
    require("vue-hot-reload-api")      .rerender("data-v-7f1f6794", module.exports)
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

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1004)
}
var normalizeComponent = __webpack_require__(13)
/* script */
var __vue_script__ = __webpack_require__(1006)
/* template */
var __vue_template__ = __webpack_require__(1008)
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
Component.options.__file = "resources/assets/js/pages/bole_mini/resource/file/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f1f6794", Component.options)
  } else {
    hotAPI.reload("data-v-7f1f6794", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});