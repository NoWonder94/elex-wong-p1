<?php
return [
    'Index' => [
        'name'      => '概览', 
        'has_sub'   => false,
        'icon'      => 'tachometer',
        'url'       => 'Index/index',//菜单链接
        'urls'      => ['index/index'],//判断菜单是否打开
        'info'      => ['index/index' => '站点信息'],
    ],
    'MyResults' => [
        'name'      => '我的业绩',
        'has_sub'   => true,
        'icon'      => 'users',
        'urls'      => ['user/index', 'proxywithdraw/index', 'proxycommission/index', 'usertrade/index', 'usergamebet/index'],//判断菜单是否打开
        'nodes'     => [ 
            // 三级菜单demo
            // [
            //     'name'      => '会员列表',
            //     'has_sub'   => true,
            //     'icon'      => '', 
            //     'urls'      => ['user/index'],//判断菜单是否打开
            //     'nodes'     => [ 
            //         [
            //             'name'      => '会员列表', 
            //             'icon'      => '',
            //             'url'       => 'User/index',//菜单链接
            //             'urls'      => ['user/index'],//判断菜单是否打开
            //             'info'      => ['user/index' => '会员列表'], 
            //         ],
            //         [
            //             'name'      => '提现记录', 
            //             'icon'      => '',
            //             'url'       => 'ProxyWithdraw/index',
            //             'urls'      => ['proxywithdraw/index'],
            //             'info'      => ['proxywithdraw/index' => '会员列表'],
            //         ],
            //         [
            //             'name'      => '佣金记录', 
            //             'icon'      => '',
            //             'url'       => 'ProxyCommissio/index',
            //             'urls'      => ['proxycommissio/index'],
            //             'info'      => ['proxycommissio/index' => '佣金记录'],  
            //         ],
            //     ]
            // ],
            [
                'name'      => '我的会员',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'User/index',
                'urls'      => ['user/index'],
                'info'      => ['user/index' => '我的会员'],
            ],
            [
                'name'      => '提现记录',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'ProxyWithdraw/index',
                'urls'      => ['proxywithdraw/index'],
                'info'      => ['proxywithdraw/index' => '提现记录'],
            ],
            [
                'name'      => '佣金记录',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'ProxyCommission/index',
                'urls'      => ['proxycommission/index'],
                'info'      => ['proxycommission/index' => '佣金记录'],  
            ],
            [
                'name'      => '会员交易记录',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'UserTrade/index',
                'urls'      => ['usertrade/index'],
                'info'      => ['usertrade/index' => '交易记录'],  
            ],
            [
                'name'      => '会员投注记录',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'UserGameBet/index',
                'urls'      => ['usergamebet/index'],
                'info'      => ['usergamebet/index' => '交易记录'],  
            ],
        ]
    ],
    'SystemConfig' => [
        'name'      => '个人中心',
        'has_sub'   => true,
        'icon'      => 'cogs',
        'urls'      => ['proxy/edit', 'proxy/apply', 'proxybank/index', 'proxybank/add'],
        'nodes'     => [ 
            [
                'name'      => '我的信息',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'Proxy/edit',
                'urls'      => ['proxy/edit'],
                'info'      => ['proxy/edit' => '我的信息'], 
            ],
            [
                'name'      => '银行卡绑定',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'ProxyBank/index',
                'urls'      => ['proxybank/index', 'proxybank/add'],
                'info'      => ['proxybank/index' => '银行卡绑定', 'proxybank/add' => '银行卡添加'],
            ], 
            [
                'name'      => '申请提现',
                'has_sub'   => false,
                'icon'      => '',
                'url'       => 'Proxy/apply',
                'urls'      => ['proxy/apply'],
                'info'      => ['proxy/apply' => '申请提现'],
            ], 
        ]
    ], 
];