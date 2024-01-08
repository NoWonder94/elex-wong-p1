import Vue from 'vue';
import Router from 'vue-router';
//import Meta from 'vue-meta'

Vue.use(Router);
//Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/Base.vue'),
      children: [
        {
          path: '',
          redirect: '/index'
        },
        {
          path: 'index',
          name: 'Index',
          component: () => import('../views/Index.vue'),
          meta: {
            title: 'index',
            metaTags: [
              {
                name: 'description',
                content:
                  '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
              },
              {
                property: 'og:description',
                content:
                  '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
              }
            ]
          }
        },
        {
            path: 'game',
            name: 'Game',
            component: () => import('../views/Game.vue'),
            meta: {
                title: 'game',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                    }
                ]
            }
        },
        {
            path: 'gameDetail',
            name: 'GameDetail',
            component: () => import('../views/GameDetail.vue'),
            meta: {
                title: 'game',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                    }
                ]
            }
        },
        {
            path: 'info',
            alias: 'inquiry',
            name: 'Info',
            component: () => import('../views/Info.vue'),
            meta: {
                title: 'info',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
                    }
                ]
            }
        },
        // {
        //     path: 'download_resource',
        //     name: 'Download',
        //     component: () => import('../views/Download.vue'),
        //     meta: {
        //         title: 'resource',
        //         metaTags: [
        //             {
        //                 name: 'description',
        //                 content: '博乐经过多年的经营与发展，目前博乐集团，已经拥有了互联网娱乐，互联网金融，影视娱乐发行三大核心业务。欢迎与博乐合作，共享庞大的行业资源。'
        //             },
        //             {
        //                 property: 'og:description',
        //                 content: '博乐经过多年的经营与发展，目前博乐集团，已经拥有了互联网娱乐，互联网金融，影视娱乐发行三大核心业务。欢迎与博乐合作，共享庞大的行业资源。'
        //             }
        //         ]
        //     }
        // },
        {
          path: 'background',
          name: 'Background',
          component: () => import('../views/Background.vue'),
          meta: {
            title: 'background',
            metaTags: [
              {
                name: 'description',
                content:
                  '博乐是一家以网络游戏为发展起点，集研发，发行，投资为一体的综合性互动娱乐集团。因袭自身丰富的游戏开发，发行及投资经验，常年深耕积累起的广泛的人脉和深厚的行业资源，客户覆盖整个东南亚及日韩地区。'
              },
              {
                property: 'og:description',
                content:
                  '博乐是一家以网络游戏为发展起点，集研发，发行，投资为一体的综合性互动娱乐集团。因袭自身丰富的游戏开发，发行及投资经验，常年深耕积累起的广泛的人脉和深厚的行业资源，客户覆盖整个东南亚及日韩地区。'
              }
            ]
          }
        },
        {
          path: 'recruitment',
          name: 'Recruitment',
          component: () => import('../views/Recruitment.vue'),
          meta: {
            title: 'talent',
            metaTags: [
              {
                name: 'description',
                content:
                  '博乐游戏是一家由信仰 “不将就” 的人组成的公司。 来自8个国家的成员， 因热爱而聚在一起。我们年轻，心怀远大，满腹激情与活力。 我们酷爱一切精致，愿为美好喝彩，致力与世界分享品质科技。'
              },
              {
                property: 'og:description',
                content:
                  '博乐游戏是一家由信仰 “不将就” 的人组成的公司。 来自8个国家的成员， 因热爱而聚在一起。我们年轻，心怀远大，满腹激情与活力。 我们酷爱一切精致，愿为美好喝彩，致力与世界分享品质科技。'
              }
            ]
          }
        },
        {
          path: 'contactUs',
          name: 'ContactUs',
          component: () => import('../views/ContactUs.vue'),
          meta: {
            title: 'contactUs',
            metaTags: [
              {
                name: 'description',
                content:
                  '博乐游戏努力帮助客户发现具有独特价值的解决方案，因而成为他们首选的合作伙伴。有关游戏，活动，合作等事宜，欢迎咨询，我们将会第一时间与您取得联系。'
              },
              {
                property: 'og:description',
                content:
                  '博乐游戏努力帮助客户发现具有独特价值的解决方案，因而成为他们首选的合作伙伴。有关游戏，活动，合作等事宜，欢迎咨询，我们将会第一时间与您取得联系。'
              }
            ]
          }
        },
        {
          path: 'infoDetail',
          // alias: 'inquiry_details',
          name: 'InfoDetail',
          component: () => import('../views/InfoDetail.vue'),
          meta: {
            title: 'info',
            metaTags: [
              {
                name: 'description',
                content:
                  '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
              },
              {
                property: 'og:description',
                content:
                  '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
              }
            ]
          }
        },
        // {
        //   path: 'celebrity',
        //   name: 'Celebrity',
        //   component: () => import('../views/Celebrity.vue'),
        //   meta: {
        //     title: 'celebrity',
        //     metaTags: [
        //       {
        //         name: 'description',
        //         content:
        //           '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
        //       },
        //       {
        //         property: 'og:description',
        //         content:
        //           '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: 'boleApp',
        //   name: 'BoleApp',
        //   component: () => import('../views/BoleApp.vue'),
        //   meta: {
        //     title: 'boleApp',
        //     metaTags: [
        //       {
        //         name: 'description',
        //         content:
        //           '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
        //       },
        //       {
        //         property: 'og:description',
        //         content:
        //           '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
        //       }
        //     ]
        //   }
        // },
        //会员中心页面
        {
            path: 'login',
            name: 'Login',
            component: () => import('../views/Login.vue'),
            meta: {
                title: 'login',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    }
                ]
            }
        },
        {
            path: 'forgot',
            name: 'Forgot',
            component: () => import('../views/Forgot.vue'),
            meta: {
                title: 'forgot',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    }
                ]
            }
        },
        {
            path: '/member',
            name: '会员中心',
            component: () => import('../views/Member.vue'),
            meta: {
                title:'客户中心',
                metaTags: [
                    {
                        name: 'description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    },
                    {
                        property: 'og:description',
                        content: '博乐游戏提供麻将，棋牌，老虎机等不同的在线娱乐平台解决方案，致力于开发热门且创新的游戏，是全球领先的游戏开发商，为客户提供便利有效率的专业服务。'
                    }
                ]
            },
            children: [
                {
                    path: 'homepage',
                    name: '主页',
                    title: 'homepage',
                    component: () => import('../views/centre/Homepage.vue'),
                    meta: {
                        title: 'home'
                    }
                },
                {
                    path: 'media',
                    name: '媒体包',
                    title: 'media',
                    component: () => import('../views/centre/Media.vue'),
                    meta: {
                        title: 'media'
                    }
                },
                {
                    path: 'gamelibrary',
                    name: '游戏库',
                    title: 'gamelibrary',
                    component: () => import('../views/centre/Gamelibrary.vue'),
                    meta: {
                        title: 'library'
                    }
                },
                {
                    path: 'support',
                    name: '支持',
                    title: 'support',
                    component: () => import('../views/centre/Support.vue'),
                    meta: {
                        title: 'support'
                    }
                },
                {
                    path: 'change',
                    name: '账户资料更改',
                    title: 'change',
                    component: () => import('../views/centre/Change.vue'),
                    meta: {
                        title: 'change'
                    }
                },
                {
                    path: 'infoDetails',
                    //alias: 'inquiry_details',
                    name: 'InfoDetails',
                    component: () => import('../views/centre/InfoDetails.vue'),
                    meta: {
                        title: 'info',
                        metaTags: [
                            {
                                name: 'description',
                                content: '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
                            },
                            {
                                property: 'og:description',
                                content: '博乐游戏长期关注互联网于高科技，创新服务及品牌，新技术与资源等领域，时刻洞察，发觉新兴商机。'
                            }
                        ]
                    }
                },
                {
                    path: 'gameDetails',
                    name: 'GameDetail',
                    component: () => import('../views/centre/GameDetails.vue'),
                    meta: {
                        title: 'game',
                        metaTags: [
                            {
                                name: 'description',
                                content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                            },
                            {
                                property: 'og:description',
                                content: '博乐游戏™旗下拥有棋牌、麻将、老虎机等三大类特色游戏产品，使用全球第一的白鹭HTML5游戏引擎，完美兼容市场主流浏览器。'
                            }
                        ]
                    }
                },
            ]
        }
        //会员中心页面
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
});
