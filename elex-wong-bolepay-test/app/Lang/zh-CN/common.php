<?php

return [
    'not_service' => '找不到相关服务',
    'not_model'   => '找不到相关模块',
    'not_data'    => '找不到相关数据',
    'db_not_table_name' => '未找到数据表名称',

    'auth_error'        => '没有操作权限',
    'whitelist_error'   => '请先添加该IP白名单再进行访问',
    'whitelist_ip_error'=> '请先添加 %s 到 IP白名单再进行访问',
    'import_success'    => '导入成功',
    'create_success'    => '创建成功',
    'create_error'      => '创建失败',
    'update_success'    => '更新成功',
    'update_error'      => '更新失败',
    'handler_success'    => '操作成功',
    'handler_error'      => '操作失败',
    'update_secret_success' => '绑定Google身份成功',
    'update_secret_error' => '绑定Google身份失败',
    'verify_google_error' => '验证Google身份失败',
    'delete_success'    => '删除成功',
    'delete_error'      => '删除失败',
    'verify_time_limit'  => '请于 %s 秒后刷新获取新的验证码',
    'verify_send_error'  => '发送验证码失败',
    'verify_email_error_0' => '邮箱验证码未找到，请重新获验证码进行校验',
    'verify_email_error_1' => '邮箱验证码错误，请重新获验证码进行校验',
    'verify_email_error_2' => '验证码接收邮箱不相符，请重新获验证码进行校验',
    'verify_email_error_3' => '验证码发送IP不相符，请重新获验证码进行校验',
    'update_money_error' => '更新帐户金额失败',
    'money_insufficient' => '帐户金额不足',
    'remark_required' => '请输入操作备注',
    'fee_calc_error' => '费用计算错误',
    'platform_insufficient' => '渠道 %s 余额额不足，当前余额 ￥%s',
    'update_platform_money_error' => '更新渠道余额失败',

    'dates' => [
        'day' => '天',
        'hour' => '小时',
        'minute' => '分',
        'second' => '秒',
    ],

    'bank_types' => [
        'Icbc' => '工商',
        'Citic' => '中信',
        'Cmbc' => '民生',
        'Ysf' => '云闪付',
    ],

    'bank_names' => [
        'Icbc' => '工商银行',
        'Citic' => '中信银行',
        'Cmbc' => '民生银行',
        'Ysf' => '云闪付',
    ],

    'bank' => [
        'bank_info'  => '银行：%s，收款人：%s，卡号：%s',
        'address_info'  => '银行：%s，收款人：%s，地址：%s',
        'address_info'  => '，开户支行:%s',
    ],

    'agent' => [
        'amount_error' => '金额错误',
        'money_insufficient' => '金额不足，当前余额 ￥%s',
        'remark_required' => '请输入操作备注',
        'admin_modify_money' => '管理员 %s 调整：%s',
        'update_frozen_money_error' => '更新冻结金额失败',
        'money_insufficient' => '更新提现金额失败',
    ],

    'channel' => [
        'alipay' => '支付宝扫码',
        'alipay_h5' => '支付宝H5',
        'alipay_bank' => '支付宝转帐',
        'wechat' => '微信扫码',
        'wechat_h5' => '微信H5',
        'wechat_bank' => '微信转帐',
        'union' => '银联扫码',
        'union_h5' => '银联H5',
        'ebank' => '网银转帐',
        'ysf' => '云闪付',
    ],

    'order' => [
        'no_exist' => '订单不存在',
        'money_insufficient' => '支付金额低于订单金额',
        'create_fee' => '成功创建订单 %s',
        'agent_create_fee' => '订单 %s 创建费',
        'proxy_create_fee' => '子代理商家成功创建订单 %s',
        'agent_service_fee' => '订单 %s 服务费',
        'proxy_service_fee' => '子代理商家订单 %s 成功结算',
        'finish_add_money' => '订单 %s 成功结算',
        'time_limie' => '订单只能在 %s 时间段内创建',
        'export_head' => '流水号,商家订单号,金额,支付金额,服务费,支付方式,付款时间,创建时间',
        'export_agent_head' => '流水号,商家订单号,代理/商家,金额,支付金额,服务费,支付方式,付款时间,创建时间',
        'expire_error' => '订单已超时',
    ],

    'withdraw' => [
        'freeze_money' => '代付订单 %s 成功创建，预扣帐户金额',
        'service_fee_deduct' => '代付订单 %s 处理成功，扣除手续费',
        'manage_money' => '管理员创建代付订单 %s 成功，扣除帐户金额',
        'cancel_refund' => '代付订单 %s 取消，退回帐户金额',
    ],

    'api_withdraw' => [
        'money_error' => '代付金额错误',
        'freeze_money' => 'API代付订单 %s 成功创建，预扣代付金额',
        'freeze_service_fee' => 'API代付订单 %s 成功创建，预扣代付手续费',
        'failed_service_fee' => 'API代付订单 %s 处理失败，退回手续费',
        'failed_money' => 'API代付订单 %s 处理失败，退回代付金额',
        'agent_service_fee' => 'API代付订单 %s 服务费',
		'export_agent_head' => '流水号,商家订单号,代理/商家,金额,服务费,代付渠道,付款时间,创建时间',
    ],
];