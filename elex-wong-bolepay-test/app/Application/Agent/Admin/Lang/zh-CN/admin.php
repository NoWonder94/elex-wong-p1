<?php

return [
    'bank' => [
        'bank' => '开户行',
        'bank_no' => '卡号',
        'address' => '数字币地址',
        'no_address' => '卡号 / 数字币地址',
        'bank_address' => '开户支行',
        'payee' => '收款人',
        'validators' => [
            'bank.required'	  => '请选择开户行',
            'bank.in'	  => '开户行不存在',
            'bank_no.required'    => '请输入卡号',
            'payee.required' => '请输入收款人',
        ]
    ],

    'withdraw' => [
        'bank_empty' => '请先添加银行',
        'bank_error' => '收款银行不存在',
        'money_error' => '当前帐户金额不足25000元，无法申请代付',
		'agent_money_error' => '当前帐户金额不足1000元，无法申请代付',
        'money_tip' => '代付限额25000 - 49990，当前帐户余额 %s 元',
		'agent_money_tip' => '代付限额1000 - 49990，当前帐户余额 %s 元',
        'validators' => [
            'bank_id.required' => '请选择收款银行',
            'money.required' => '请输入代付金额',
            'money.numeric' => '代付金额错误',
            'money.min' => '代付金额不能低于25000元',
            'money.max' => '代付金额大于49990元',
            'money.max1' => '代付金额大于当前帐户余额',
            'service_fee_type.required' => '请选择扣除手续费方式',
            'service_fee_type.in' => '扣除手续费方式类型错误',
        ],
		'validators_1' => [
            'bank_id.required' => '请选择收款银行',
            'money.required' => '请输入代付金额',
            'money.numeric' => '代付金额错误',
            'money.min' => '代付金额不能低于1000元',
            'money.max' => '代付金额大于49999元',
            'money.max1' => '代付金额大于当前帐户余额',
            'service_fee_type.required' => '请选择扣除手续费方式',
            'service_fee_type.in' => '扣除手续费方式类型错误',
        ]
    ],

    'agent' => [
        'index' => '我的资料',
        'edit' => '资料设定',
        'whitelist' => '白名单',
        'withdraw' => '取款',
        'balance' => '余额',
        'pay_time' => '存款时间',
        'create_time' => '记录时间',
        'remark' => '交易备注',
        'order_log' => '关联订单',
        'status' => '关联状态',
        'related_status' => [
            2 => '已关联',
            1 => '未关联',
        ],
        //'payment_tip' => '服务费率=<a href="%1$s" target="_blank">基础服务费率</a>+加收服务费率，按订单金额百分比收取费用；创建费=<a href="%1$s" target="_blank">基础创建费</a>+加收创建费，生成订单成功即收取费用',
        'payment_tip' => '服务费率=<a href="%1$s" target="_blank">基础服务费率</a>+加收服务费率，按订单金额百分比收取费用',
    ],

    'show_notice' => '查看系统通知',
    'notice' => [
        'receiver_time' => '通知时间'
    ]
];