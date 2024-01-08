<?php
return [
    'Index' => [
        'name'       => '主控台',
        'nodes'      => [
            'index'  => ['name' => '概览', 'no_log' => true, 'show_menu' => true, 'expand' => ['businesschart', 'proxychart', 'sendMailVerifyCode']],
        ]
    ],
    'Agent' => [
        'name'      => '资料管理',
        'nodes'     => [
            'index' => ['name' => '我的资料', 'no_log' => true, 'show_menu' => true],
            'edit'  => ['name' => '资料设定'],
            'google' => ['name' => 'Google验证', 'expand' => ['dogoogle']],
            'whitelist' => ['name' => '白名单', 'expand' => ['dowhitelist']],
            'appinfo'  => ['name' => '查看接口密匙'],
        ]
    ],
    'Business' => [
        'name'      => '商家管理',
        'agent_type'=> 1,
        'nodes'     => [
            'index' => ['name' => '商家列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加商家'],
            'edit'  => ['name' => '编辑费率'],
        ]
    ],
    'Proxy' => [
        'name'      => '代理管理',
        'agent_type'=> 1,
        'nodes'     => [
            'index' => ['name' => '代理列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加代理'],
            'edit'  => ['name' => '编辑费率'],
        ]
    ],
    'Order' => [
        'name'      => '交易订单',
        'nodes'     => [
            'index' => ['name' => '我的订单', 'no_log' => true, 'show_menu' => true],
            'under' => ['name' => '旗下订单', 'agent_type' => 1, 'no_log' => true, 'show_menu' => true],
            'notify'  => ['name' => '订单通知'],
            'export'  => ['name' => '订单导出'],
        ]
    ],
	 'ApiWithdraw' => [
        'name'      => 'API代付',
        'nodes'     => [
            'index' => ['name' => '我的API代付', 'no_log' => true, 'show_menu' => true],
            'under' => ['name' => '旗下API代付', 'agent_type' => 1, 'no_log' => true, 'show_menu' => true],
            'notify'  => ['name' => '代付通知']
        ]
    ],
    'Withdraw' => [
        'name'      => '代付管理',
        'nodes'     => [
            'index' => ['name' => '代付记录', 'no_log' => true, 'show_menu' => true],
            'add'  => ['name' => '添加代付'],
        ]
    ],
    'Bank' => [
        'name'      => '银行卡管理',
        'nodes'     => [
            'index' => ['name' => '银行卡列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加银行卡'],
            'edit'  => ['name' => '编辑银行卡'],
        ]
    ],
    'MoneyLog' => [
        'name'      => '资金记录',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true]
        ]
    ],
    'Payment' => [
        'name'      => '支付通道',
        'nodes'     => [
            'index' => ['name' => '通道列表', 'no_log' => true, 'show_menu' => true],
            'confirm'  => ['name' => '确认费率'],
        ]
    ],
    'Api' => [
        'name'      => 'API接入',
        'nodes'     => [
            'index' => ['name' => '接入文档', 'no_log' => true, 'show_menu' => true],
        ]
    ],
    'Notice' => [
        'name'      => '系统通知',
        'nodes'     => [
            'index' => ['name' => '通知列表', 'no_log' => true, 'show_menu' => true],
            'receive'  => ['name' => '接收通知'],
            'read'  => ['name' => '读取通知'],
        ]
    ],
];