<?php
return [
    'Index' => [
        'name'       => '主控台',
        'nodes'      => [
            'index'  => ['name' => '概览', 'no_log' => true, 'show_menu' => true, 'expand' => ['charts', 'sendMailVerifyCode']],
            'repwd'  => ['name' => '修改密码', 'expand' => ['dopwd']],
            'google' => ['name' => 'Google验证', 'expand' => ['dogoogle']],
        ]
    ],
    'Proxy' => [
        'name'      => '代理管理',
        'nodes'     => [
            'index' => ['name' => '代理列表', 'no_log' => true, 'show_menu' => true, 'expand' => ['search']],
            'add'   => ['name' => '添加代理', 'expand' => ['payments','withdrawplatform']],
            'edit'  => ['name' => '编辑代理'],
            'money' => ['name' => '调整余额'],
            'contact'  => ['name' => '查看联系方式'],
			'plus' => ['name' => '其他加款'],
        ]
    ],
    'Business' => [
        'name'      => '商家管理',
        'nodes'     => [
            'index' => ['name' => '商家列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加商家', 'expand' => ['payments','withdrawplatform']],
            'edit'  => ['name' => '编辑商家'],
            'money' => ['name' => '调整余额'],
            'contact'  => ['name' => '查看联系方式'],
			'plus' => ['name' => '其他加款'],
        ]
    ],
    'Order' => [
        'name'      => '订单管理',
        'nodes'     => [
            'index' => ['name' => '订单列表', 'no_log' => true, 'show_menu' => true],
            'edit'  => ['name' => '编辑订单'],
            'notify' => ['name' => '订单通知'],
            'finish' => ['name' => '订单结算'],
            'export'  => ['name' => '订单导出'],
        ]
    ],
    'Withdraw' => [
        'name'      => '代付管理',
        'nodes'     => [
            'index' => ['name' => '代付列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加代付'],
            'edit'  => ['name' => '编辑代付'],
            'platforms' => ['name' => '三方渠道'],
            'gotothree' => ['name' => '转至三方'],
        ]
    ],
    'MoneyLog' => [
        'name'      => '资金记录',
        'nodes'     => [
            'index' => ['name' => '代理/商家资金记录', 'no_log' => true, 'show_menu' => true],
            'modify' => ['name' => '资金调整记录', 'no_log' => true, 'show_menu' => true],
        ]
    ],
    'PaymentPlatform' => [
        'name'      => '支付渠道',
        'nodes'     => [
            'index' => ['name' => '渠道列表', 'no_log' => true, 'show_menu' => true],
            'withdraw' => ['name' => '代付计算', 'no_log' => true, 'show_menu' => true],
			'update' => ['name' => '修改余额'],
        ]
    ],
    'Bank' => [
        'name'      => '银行卡管理',
        'nodes'     => [
            'index' => ['name' => '银行卡列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加银行卡'],
            'edit'  => ['name' => '编辑银行卡'],
            'soft'  => ['name' => '操作监听程序'],
        ]
    ],
    'BankLog' => [
        'name'      => '银行记录',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true],
            'balance'  => ['name' => '查看余额'],
        ]
    ],
    'Payment' => [
        'name'      => '支付方式',
        'nodes'     => [
            'index' => ['name' => '支付方式列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加支付方式'],
            'edit'  => ['name' => '编辑支付方式'],
        ]
    ],
    'Admin' => [
        'name'      => '管理员',
        'nodes'     => [
            'index'  => ['name' => '管理员列表', 'no_log' => true, 'show_menu' => true],
            'add'    => ['name' => '添加管理员'],
            'edit'   => ['name' => '编辑管理员'],
            'delete' => ['name' => '删除管理员']
        ]
    ],
    'AdminRole' => [
        'name'      => '权限组',
        'nodes'     => [
            'index' => ['name' => '权限组列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加权限组'],
            'edit'  => ['name' => '编辑权限组'],
            'delete'=> ['name' => '删除权限组']
        ]
    ],
    'SystemWhite' => [
        'name'      => '系统IP名单',
        'nodes'     => [
            'index' => ['name' => 'IP名单管理', 'no_log' => true, 'show_menu' => true],
            'edit'  => ['name' => '编辑IP名单'],
        ]
    ],
    'OperationLog' => [
        'name'      => '操作日志',
        'nodes'     => [
            'index' => ['name' => '日志列表', 'no_log' => true, 'show_menu' => true],
            'show'  => ['name' => '查看日志', 'no_log' => true]
        ]
    ],
    'Notice' => [
        'name'      => '系统通知',
        'nodes'     => [
            'index' => ['name' => '通知列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加通知'],
            'edit'  => ['name' => '编辑通知'],
            'delete'=> ['name' => '删除通知']
        ]
    ],
    'Cache' => [
        'name'      => '缓存管理',
        'nodes'     => [
            'index' => ['name' => '管理缓存', 'no_log' => true, 'show_menu' => true,],
            'clear' => ['name' => '清除缓存']
        ]
    ],
    'Statistics' => [
        'name'      => '数据统计',
        'nodes'     => [
            'index' => ['name' => '代理统计', 'no_log' => true, 'show_menu' => true,],
            'platform' => ['name' => '渠道统计', 'no_log' => true, 'show_menu' => true,],
        ]
    ],
    'WithdrawPlatform' => [
        'name'      => '代付渠道',
        'nodes'     => [
            'index' => ['name' => '列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加'],
            'edit'  => ['name' => '编辑'],
        ]
    ],

    'ApiWithdraw' => [
        'name'      => 'API代付',
        'nodes'     => [
            'index' => ['name' => '代付列表', 'no_log' => true, 'show_menu' => true],
            'edit'  => ['name' => '编辑代付'],
            'notify' => ['name' => '代付通知'],
            'finish' => ['name' => '代付结算'],
            'export'  => ['name' => '代付导出'],
        ]
    ],
    
    
    'Address' => [
        'name'      => '支付地址',
        'nodes'     => [
            'index' => ['name' => '列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加'],
            'edit'  => ['name' => '编辑'],
        ]
    ],
    
     'AddressLog' => [
        'name'      => '地址记录',
        'nodes'     => [
            'index' => ['name' => '列表', 'no_log' => true, 'show_menu' => true]
        ]
    ],

];