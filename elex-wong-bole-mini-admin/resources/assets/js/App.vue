<template>
    <div class="base">
        <div class="header">
            <div class="header-left">
                <div class="header-left-content">
                    <div class="logo">
                        <img src="/img/bole_mini/logo/logo_1.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="body-left" >
                <div class="body-left-content">
                    <div class="user-profile">
                        <div class="user-img">
                            <img src="/img/bole_mini/profile/user.png">
                            <i class="fas fa-edit" @click="showModal">
                            </i>
                        </div>
                        <div class="user-name">
                            {{ user.name }}
                        </div>
                    </div>
                    <div class="menu" v-show="!isMenuLoading">
                        <router-link to="/member" v-if="authority.indexOf(1) >= 0">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-user-friends icon-front">
                                    </i>
                                    {{ $t('menu.title.member') }}
                                </div>
                            </div>
                        </router-link>
                        <router-link to="/game" v-if="authority.indexOf(33) >= 0">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-gamepad icon-front">
                                    </i>
                                    {{ $t('menu.title.game') }}
                                </div>
                            </div>
                        </router-link>
                        <router-link to="/info" v-if="authority.indexOf(6) >= 0">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-comment-alt icon-front">
                                    </i>
                                    {{ $t('menu.title.info') }}
                                </div>
                            </div>
                        </router-link>
                        <router-link to="#" v-b-toggle.collapseResource v-if="authority.indexOf(11) >= 0">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-file icon-front">
                                    </i>
                                    {{ $t('menu.title.resource') }}
                                    <i class="fas fa-angle-right icon-back">
                                    </i>
                                </div>
                            </div>
                        </router-link>
                        <b-collapse id="collapseResource" accordion="accordion">
                            <router-link to="/resource/directory" v-if="authority.indexOf(12) >= 0">
                                <div class="navigation-item">
                                    <div class="navigation-item-title">
                                        {{ $t('menu.title.directory') }}
                                    </div>
                                </div>
                            </router-link>
                            <router-link to="/resource/file" v-if="authority.indexOf(17) >= 0">
                                <div class="navigation-item">
                                    <div class="navigation-item-title">
                                        {{ $t('menu.title.file') }}
                                    </div>
                                </div>
                            </router-link>
                        </b-collapse>
                        <router-link to="#" v-b-toggle.collapseSystem v-if="authority.indexOf(22) >= 0">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-cog icon-front">
                                    </i>
                                    {{ $t('menu.title.system') }}
                                    <i class="fas fa-angle-right icon-back">
                                    </i>
                                </div>
                            </div>
                        </router-link>
                        <b-collapse id="collapseSystem" accordion="accordion">
                            <router-link to="/system/adminGroup" v-if="authority.indexOf(23) >= 0">
                                <div class="navigation-item">
                                    <div class="navigation-item-title">
                                        {{ $t('menu.title.adminGroup') }}
                                    </div>
                                </div>
                            </router-link>
                            <router-link to="/system/admin" v-if="authority.indexOf(28) >= 0">
                                <div class="navigation-item">
                                    <div class="navigation-item-title">
                                        {{ $t('menu.title.admin') }}
                                    </div>
                                </div>
                            </router-link>
                        </b-collapse>
                        <!-- 换一下!!! -->
                        <a v-bind:href="uri.logout">
                            <div class="navigation-item">
                                <div class="navigation-item-title">
                                    <i class="fas fa-sign-out-alt icon-front">
                                    </i>
                                    {{ $t('menu.title.logout') }}
                                </div>
                            </div>
                        </a>
                        <!-- //换一下!!! -->
                    </div>
                    <div class="loading" v-show="isMenuLoading">
                        <img src="/img/bole_mini/icon/loading.gif">
                    </div>
                </div>
            </div>
            <div class="body-right">
                <div class="body-right-content">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" v-show="isModalUpdateVisible" @click="close">
            <div class="modal" v-loading="isModalUpdateLoading" @click.stop>
                <div class="modal-header">
                    <slot name="header">
                        <div class="modal-header-title">
                            {{ $t('dialog.title.edit') }}
                        </div>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div class="modal-body-content">
                            <el-form :model="updateForm" :inline="true" label-width="120px">
                                <div class="part">
                                    <el-form-item :label="$t('dialog.column.account')">
                                        <el-input v-model="updateForm.name" :placeholder="$t('dialog.require.account')">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('dialog.column.pwdNew')">
                                        <el-input v-model="updateForm.pwd" type="password" :placeholder="$t('dialog.require.pwdNew')">
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item style="margin-top:2px; margin-right:5px; float:right;">
                                    <el-button type="success" @click="submitForm()" :loading="btnLoading">
                                        {{ $t('button.update') }}
                                    </el-button>
                                    <el-button type="danger" @click="close">
                                        {{ $t('button.cancel') }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        computed: {
            //换一下!!!
            user: function () {
                var data = JSON.parse(this.$cookie.get('agency_user')).user;
                this.updateForm.name = data.name;

                return data;
            },
            uri: function () {
                return JSON.parse(this.$cookie.get('agency_user')).uri;
            }
            //换一下!!!
        },
        data() {
            return {
                authority: [],
                isModalUpdateVisible: false,
                updateForm: {
                    name: '',
                    pwd: ''
                },
                btnLoading: false,
                isModalUpdateLoading: false,
                isMenuLoading: true,
            }
        },
        created() {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
                if (to.meta.menuId !== undefined && this.authority.indexOf(to.meta.menuId) == -1) {
                    next({
                        name: 'error.403'
                    })
                }

                this.$Progress.start()
                next()
            })
            this.$router.afterEach((to, from) => {
                this.$Progress.finish()
            })
            this.$router.onError(() => {
                this.$Progress.fail()
            })
        },
        mounted() {
            this.initMenuAuthority();
        },
        methods: {
            initMenuAuthority() {
                axios.get('/system/admin/initAuthority').then((response) => {
                    this.authority = response.data.resp_data.list;
                    this.isMenuLoading = false;
                }).catch(error => {

                });
            },
            showModal() {
                this.isModalUpdateVisible = true;
            },
            close:function() {
                this.isModalUpdateVisible = false;
            },
            submitForm() {
                if (this.updateForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.account'),
                        showClose: true
                    });

                    return false;
                } else {
                    if (this.updateForm.name.length < 6) {
                        this.$message({
                            type: 'error',
                            message: this.$t('dialog.length.account'),
                            showClose: true
                        });

                        return false;
                    }
                }

                if (this.updateForm.pwd == '') {
                    this.$message({
                        type: 'error',
                        message: this.$t('dialog.require.pwd'),
                        showClose: true
                    });

                    return false;
                } else {
                    if (this.updateForm.pwd.length < 6) {
                        this.$message({
                            type: 'error',
                            message: this.$t('dialog.length.pwdNew'),
                            showClose: true
                        });

                        return false;
                    }
                }

                this.isModalUpdateLoading = true;
                
                axios.post('/system/admin/updatePersonalData', this.updateForm).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('message.success.update'),
                            showClose: true,
                            onClose: function () {
                                window.location.reload();
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message ? response.data.resp_msg.message : this.$t('message.error.update'),
                            showClose: true,
                            onClose: function () {
                                //window.location.reload();
                            }
                        });

                        this.isModalUpdateLoading = false;
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: response.data.resp_msg.message ? response.data.resp_msg.message : this.$t('message.error.unknown'),
                        showClose: true,
                        onClose: function () {
                            //window.location.reload();
                        }
                    });

                    this.isModalUpdateLoading = false;
                });
            }
        }
    }
</script>
<style lang="scss" type="text/css">
    @import "../scss/bole_mini/App.scss";
</style>