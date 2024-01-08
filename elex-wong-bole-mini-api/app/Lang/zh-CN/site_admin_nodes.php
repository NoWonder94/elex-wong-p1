<?php
return [
    'Index' => [
        'name'      => '概览',
        'nodes'     => [
            'index' => ['name' => '站点信息', 'no_log' => true, 'show_menu' => true, 'expand' => ['charts']],
            'repwd' => ['name' => '修改密码', 'expand' => ['dopwd']]
        ]
    ],
    'User' => [
        'name'      => '会员管理(客服)',
        'nodes'     => [
            'index' => ['name' => '会员列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加会员'],
            'edit'  => ['name' => '编辑会员'],
            'delete'=> ['name' => '删除会员'],
            'call'  => ['name' => '拨打电话', 'expand' => ['token', 'callremark']],
            'sms'   => ['name' => '发送短信', 'expand' => ['token']],
            'import'   => ['name' => '批量导入', 'expand' => ['doimport', 'bigimport']]
        ]
    ],
    'CallLog' => [
        'name'      => '通话记录(客服)',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true],
			'export'  => ['name' => '导出记录'],
        ]
    ],
    'SmsLog' => [
        'name'      => '短信记录(客服)',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true]
        ]
    ],
    'SmsTpl' => [
        'name'      => '短信模板(客服)',
        'nodes'     => [
            'index' => ['name' => '模板列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加模板'],
            'edit'  => ['name' => '编辑模板'],
            'delete'=> ['name' => '删除模板']
        ]
    ],
    'UserRecall' => [
        'name'      => '回访客户(客服)',
        'nodes'     => [
            'index' => ['name' => '会员列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加会员'],
            'edit'  => ['name' => '编辑会员'],
            'delete'=> ['name' => '删除会员'],
            'call'  => ['name' => '拨打电话', 'expand' => ['token', 'callremark']],
            'sms'   => ['name' => '发送短信', 'expand' => ['token']],
            'import'   => ['name' => '批量导入', 'expand' => ['doimport']]
        ]
    ],
	'SalesUser' => [
        'name'      => '会员管理(电销)',
        'nodes'     => [
            'index' => ['name' => '会员列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加会员'],
            'edit'  => ['name' => '编辑会员'],
            'delete'=> ['name' => '删除会员'],
            'call'  => ['name' => '拨打电话', 'expand' => ['token', 'callremark']],
            'sms'   => ['name' => '发送短信', 'expand' => ['token']],
            'import'   => ['name' => '批量导入', 'expand' => ['doimport', 'bigimport']]
        ]
    ],
	'SalesCallLog' => [
        'name'      => '通话记录(电销)',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true],
			'export'  => ['name' => '导出记录'],
        ]
    ],
    'SalesSmsLog' => [
        'name'      => '短信记录(电销)',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true]
        ]
    ],
    'SalesSmsTpl' => [
        'name'      => '短信模板(电销)',
        'nodes'     => [
            'index' => ['name' => '模板列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加模板'],
            'edit'  => ['name' => '编辑模板'],
            'delete'=> ['name' => '删除模板']
        ]
    ],
    'SystemConfig' => [
        'name'      => '系统配置',
        'nodes'     => [
            'index'     => ['name' => '系统配置', 'no_log' => true, 'show_menu' => true],
            'update'    => ['name' => '修改配置']
        ]
    ],
    'SiteAdminRole' => [
        'name'      => '权限组管理',
        'nodes'     => [
            'index' => ['name' => '权限组列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加权限组'],
            'edit'  => ['name' => '编辑权限组'],
            'delete'=> ['name' => '删除权限组']
        ]
    ],
    'SiteAdmin' => [
        'name'      => '管理员',
        'nodes'     => [
            'index' => ['name' => '管理员列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加管理员'],
            'edit'  => ['name' => '编辑管理员'],
            'delete'=> ['name' => '删除管理员']
        ]
    ],
    'OperationLog' => [
        'name'      => '操作日志',
        'nodes'     => [
            'index' => ['name' => '日志列表', 'no_log' => true, 'show_menu' => true],
            'show'  => ['name' => '查看日志', 'no_log' => true]
        ]
    ],
    'Cache' => [
        'name'      => '缓存管理',
        'nodes'     => [
            'index' => ['name' => '管理缓存', 'no_log' => true, 'show_menu' => true,],
            'clear' => ['name' => '清除缓存']
        ]
    ],
    'Proxy' => [
        'name'      => '代理管理',
        'nodes'     => [
            'index' => ['name' => '代理列表', 'no_log' => true, 'show_menu' => true,], 
            'edit'  => ['name' => '编辑代理'], 
            'option' => ['name' => '代理修改状态']
        ]
    ],
    'ProxyWithdraw' => [
        'name'      => '佣金提现',
        'nodes'     => [
            'index' => ['name' => '佣金提现', 'no_log' => true, 'show_menu' => true,], 
            'option'  => ['name' => '佣金修改状态'], 
        ]
    ],
    'Article' => [
        'name'      => '公告管理',
        'nodes'     => [
            'index' => ['name' => '公告列表', 'no_log' => true, 'show_menu' => true],
            'add'   => ['name' => '添加公告'],
            'edit'  => ['name' => '编辑公告'],
            'delete'=> ['name' => '删除公告']
        ]
    ],
    'ProxyCommission' => [
        'name'      => '佣金记录',
        'nodes'     => [
            'index' => ['name' => '佣金记录', 'no_log' => true, 'show_menu' => true,], 
            'option'  => ['name' => '佣金审核'], 
        ]
    ],
    'ProxyLevel' => [
        'name'      => '代理等级',
        'nodes'     => [
            'index' => ['name' => '代理等级列表', 'no_log' => true, 'show_menu' => true,], 
            'add'   => ['name' => '添加代理等级'],
            'edit'  => ['name' => '编辑代理等级'],
            'delete'=> ['name' => '删除代理等级']
        ]
    ],
    'ProxyLevelLog' => [
        'name'      => '代理等级日志',
        'nodes'     => [
            'index' => ['name' => '代理等级日志', 'no_log' => true, 'show_menu' => true,], 
        ]
    ],
    'UserTrade' => [
        'name'      => '会员交易记录',
        'nodes'     => [
            'index' => ['name' => '会员交易记录', 'no_log' => true, 'show_menu' => true,], 
        ]
    ],
];