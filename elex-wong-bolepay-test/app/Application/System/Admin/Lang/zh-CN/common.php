<?php

return [
    'get_auth_error'    => '获取权限信息失败',
    'auth_error'        => '没有操作权限',
    'site_title' => '博乐支付管理系统',
    'site_name'  => '博乐支付',

    'admin' => [
    	'not_exist' => '管理员不存在',
    	'pwd_error' => '密码错误',
    	'status_disabled' => '该管理员已被禁止登录',
        'role_not_exist' => '管理员员组不存在',
        'role_status_disabled' => '该管理员员组已被禁用',
    ],

    'bank' => [
        'soft_time' => '程序处理中，请在%d秒后再进行操作',
    ],

    'order' => [
        'bank_log_sn_required' => '请输入银行流水号',
        'bank_log_sn_empty' => '未找到相关银行记录',
        'bank_log_sn_use' => '此银行记录已匹配其他订单',
        'pay_money_required' => '请输入正确的支付金额',
        'pay_time_required' => '请选择支付时间',
        'hash_required' => '请输入交易hash',
        'from_address_required' => '请输入付款地址',
        'address_log_empty' => '未找到相关交易记录',
        'address_log_use' => '交易记录已匹配其他订单',
    ],
    'address' => [
        'status_error' => '锁定状态不能更改',
        'address_error' => '非ERC20网络地址',
    ],
];