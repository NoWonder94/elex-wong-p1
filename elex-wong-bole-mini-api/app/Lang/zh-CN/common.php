<?php

return [
    'not_service' => '找不到相关服务',
    'not_model'   => '找不到相关模块',
    'not_data'    => '找不到相关数据',

    'auth_error'        => '没有操作权限',
    'import_success'    => '导入成功',
    'create_success'    => '创建成功',
    'create_error'      => '创建失败',
    'update_success'    => '更新成功',
    'update_error'      => '更新失败',
    'delete_success'    => '删除成功',
    'delete_error'      => '删除失败',

    'levels' => [
        '0' => '所有代理',
        '1' => '一级代理',
        '2' => '二级代理',
        '3' => '三级代理',
        '4' => '四级代理'
    ], 

    'proxy_status' => [ 
        '0' => '关闭',
        '1' => '开启',
        '2' => '待审核', 
    ],

    'proxy_withdraw_status' => [ 
        '-2' => '付款失败', 
        '-1' => '拒绝',
        '0' => '待处理',
        '1' => '审核成功',
        '2' => '付款成功', 
    ], 

    'proxy_commission_status' => [ 
        '-1' => '拒绝',
        '0' => '待处理',
        '1' => '已派发',
    ],

    'error_token' => 'Token错误',
    'error_user_not_exist' => '用户不存在',
    'error_user_pwd_incorrect' => '用户密码错误',
    'error_user_email_exist' => '用户邮箱已存在',
    'error_user_name_exist' => '用户名称已存在',
    'error_login' => '请先登入',
];