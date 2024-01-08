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
        'name'      => '会员管理',
        'nodes'     => [
            'index' => ['name' => '会员列表', 'no_log' => true, 'show_menu' => true, 'expand' => ['qrcode']],
            'add'   => ['name' => '添加会员'],
            'edit'  => ['name' => '编辑会员'],
            'delete'=> ['name' => '删除会员']
        ]
    ],
    'CallLog' => [
        'name'      => '通话记录',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true],
            'delete'=> ['name' => '删除记录', 'expand' => ['clear']]
        ]
    ],
    'SmsLog' => [
        'name'      => '短信记录',
        'nodes'     => [
            'index' => ['name' => '记录列表', 'no_log' => true, 'show_menu' => true],
            'delete'=> ['name' => '删除记录', 'expand' => ['clear']]
        ]
    ],
    'SmsTpl' => [
        'name'      => '短信模板',
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
            'index'     => ['name' => '查看配置', 'no_log' => true, 'show_menu' => true],
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
    'SiteAdminLog' => [
        'name'      => '操作日志',
        'nodes'     => [
            'index' => ['name' => '日志列表', 'no_log' => true, 'show_menu' => true],
            'show'  => ['name' => '查看日志', 'no_log' => true],
            'delete'=> ['name' => '删除日志', 'no_log' => true]
        ]
    ],
    'Cache' => [
        'name'      => '缓存管理',
        'nodes'     => [
            'index' => ['name' => '管理缓存', 'show_menu' => true,],
            'clear' => ['name' => '清除缓存', 'expand' => ['local']]
        ]
    ]
];