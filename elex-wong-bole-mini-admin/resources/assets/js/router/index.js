import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    saveScrollPosition: true,
    routes: [
        {
            name: 'Member',
            path: '/member',
            component: resolve => require(['@/pages/bole_mini/member/Index.vue'], resolve).default,
            meta: {
                menuId: 1,
                code: 'member',
                title: 'menu.title.member',
                main: true
            }
        },
        {
            name: 'Game',
            path: '/game',
            component: resolve => require(['@/pages/bole_mini/game/Index.vue'], resolve).default,
            meta: {
                //menuId: 6,
                code: 'game',
                title: 'menu.title.game',
                main: true
            }
        },
        {
            name: 'Info',
            path: '/info',
            component: resolve => require(['@/pages/bole_mini/info/Index.vue'], resolve).default,
            meta: {
                menuId: 6,
                code: 'info',
                title: 'menu.title.info',
                main: true
            }
        },
        {
            name: 'Directory',
            path: '/resource/directory',
            component: resolve => require(['@/pages/bole_mini/resource/directory/Index.vue'], resolve).default,
            meta: {
                menuId: 12,
                code: 'directory',
                title: 'menu.title.directory',
                main: true
            }
        },
        {
            name: 'File',
            path: '/resource/file',
            component: resolve => require(['@/pages/bole_mini/resource/file/Index.vue'], resolve).default,
            meta: {
                menuId: 17,
                code: 'file',
                title: 'menu.title.file',
                main: true
            }
        },
        {
            name: 'AdminGroup',
            path: '/system/adminGroup',
            component: resolve => require(['@/pages/bole_mini/system/admin_group/Index.vue'], resolve).default,
            meta: {
                menuId: 23,
                code: 'adminGroup',
                title: 'menu.title.adminGroup',
                main: true
            }
        },
        {
            name: 'Admin',
            path: '/system/admin',
            component: resolve => require(['@/pages/bole_mini/system/admin/Index.vue'], resolve).default,
            meta: {
                menuId: 28,
                code: 'admin',
                title: 'menu.title.admin',
                main: true
            }
        },
        {
            name: 'error.402',
            path: '/error/402',
            component: resolve => require(['@/pages/errors/402.vue'], resolve).default,
            meta: {
                title: 'title.error.402',
                main: false,
            }
        },
        {
            name: 'error.403',
            path: '/error/403',
            component: resolve => require(['@/pages/errors/403.vue'], resolve).default,
            meta: {
                title: 'title.error.403',
                main: false,
            }
        },
        {
            name: 'error.404',
            path: '/error/404',
            component: resolve => require(['@/pages/errors/404.vue'], resolve).default,
            meta: {
                title: 'title.error.404',
                main: false,
            }
        },
        {
            path: "*",
            redirect: "/error/404"
        }
    ]
});
