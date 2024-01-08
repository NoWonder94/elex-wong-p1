<template>
    <div class="admin-page">
        <div class="left-panel">
            <div class="left-panel-content">
                <div class="logo">
                    <img src="../assets/img/logo.png" />
                </div>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="Blog" name="1">
                        <div class="nav-item">
                            <nuxt-link to="/home/list">
                                <i class="fa-solid fa-home"></i>
                                <span class="title">
                                    {{ $t('menu.home') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div class="nav-item">
                            <nuxt-link to="/news/list">
                                <i class="fa-solid fa-newspaper"></i>
                                <span class="title">
                                    {{ $t('menu.news') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div class="nav-item">
                            <nuxt-link to="/event/list">
                                <i class="fa-solid fa-calendar"></i>
                                <span class="title">
                                    {{ $t('menu.event') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div class="nav-item">
                            <nuxt-link to="/user/list">
                                <i class="fa-solid fa-user"></i>
                                <span class="title">
                                    {{ $t('menu.user') }}
                                </span>
                            </nuxt-link>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="Crypto" name="2">
                        <div class="nav-item">
                            <nuxt-link to="/crypto/home/list">
                                <i class="fa-solid fa-home"></i>
                                <span class="title">
                                    {{ $t('menu.home') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div class="nav-item">
                            <nuxt-link to="/crypto/news/list">
                                <i class="fa-solid fa-newspaper"></i>
                                <span class="title">
                                    {{ $t('menu.news') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <!-- <div class="nav-item">
                            <nuxt-link to="/crypto/exclusive/list">
                                <i class="fa-solid fa-bullhorn"></i>
                                <span class="title">
                                    {{ $t('menu.exclusive') }}
                                </span>
                            </nuxt-link>
                        </div> -->
                        <!-- <div class="nav-item">
                            <nuxt-link to="/crypto/video/list">
                                <i class="fa-solid fa-video-camera"></i>
                                <span class="title">
                                    {{ $t('menu.video') }}
                                </span>
                            </nuxt-link>
                        </div> -->
                        <div class="nav-item">
                            <nuxt-link to="/crypto/guide/list">
                                <i class="fa-solid fa-file"></i>
                                <span class="title">
                                    {{ $t('menu.guide') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div class="nav-item">
                            <nuxt-link to="/crypto/exchange/list">
                                <i class="fa-solid fa-file-text"></i>
                                <span class="title">
                                    {{ $t('menu.exchange') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <!-- <div class="nav-item">
                            <nuxt-link to="/crypto/marketCap/list">
                                <i class="fa-solid fa-line-chart"></i>
                                <span class="title">
                                    {{ $t('menu.marketCap') }}
                                </span>
                            </nuxt-link>
                        </div> -->
                        <div class="nav-item">
                            <nuxt-link to="/crypto/priceTracker/list">
                                <i class="fa-solid fa-credit-card"></i>
                                <span class="title">
                                    {{ $t('menu.priceTracker') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <!-- <div class="nav-item">
                            <nuxt-link to="/crypto/podcast/list">
                                <i class="fa-solid fa-podcast"></i>
                                <span class="title">
                                    {{ $t('menu.podcast') }}
                                </span>
                            </nuxt-link>
                        </div> -->
                    </el-collapse-item>
                </el-collapse>
                <div class="nav-item">
                    <nuxt-link to="/admin/list">
                        <i class="fa-solid fa-user-circle"></i>
                        <span class="title">
                            {{ $t('menu.admin') }}
                        </span>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="right-panel">
            <div class="right-panel-header">
                <div class="right-panel-header-left">
                    <i class="fa-solid fa-bars"></i>
                    {{ title }}
                </div>
                <div class="right-panel-header-right">
                    <el-dropdown @command="handleCommand">
                        <span>
                            <i class="fa-solid fa-user-circle"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="detail">
                                {{ $t('menu.detail') }}
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                {{ $t('menu.logout') }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="right-panel-body">
                <Nuxt />
            </div>
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'AdminPage',
        props: ['AdminPage'],
        data() {
            return {
                title: '',
                isLoading: false,
                activeNames: ['1'],
            }
        },
        mounted () {
            this.getRouteName();
        },
        methods: {
            handleCommand(command) {
                if(command == 'detail') {
                    this.$router.push({path: '/admin/account'});
                } else {
                    this.logout();
                }
            },
            logout() {
                this.$confirm(this.$t('message.logout'), {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                }).then(() => {
                    this.isLoading = true;
                    this.$api.requestByPost('Admin/logout').then(result => {
                        if(result.status) {
                            localStorage.removeItem('authToken');
                            this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                                showOnlyTheLastOne: true,
                            });
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        } else {
                            this.$notiflix.Notify.failure(result.msg ? result.msg : this.$t('message.error'), {
                                showOnlyTheLastOne: true,
                            });
                        }
                    }).catch(error => {
                        this.$notiflix.Notify.failure(this.$t('message.error'), {
                            showOnlyTheLastOne: true,
                        })
                    });
                }).catch(() => {
                    //cancel
                })
            },
            getRouteName() {
                if(this.$route.path) {
                    var path = this.$route.path.split('/');
                    this.title = this.$t('menu.' + path[path.length - 2]);
                }
            }
        },
        watch: {
            '$route'(to, from) {
                this.getRouteName();
            }
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/adminPage.scss";
    @import "/assets/scss/mobile/adminPage.scss";
</style>
