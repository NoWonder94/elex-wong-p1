<?php

return [
    'update_pwd' => '修改密码',
    'logout' => '退出',
    'all' => '全部',
    'ip' => 'IP',
    'sn' => '流水号',
    'system' => '系统内置',
    'remark' => '备注',
    'total' => '总计',
    'handler' => '操作',
    'click_toggle' => '点击切换',
    'submit' => '提交',
    'search' => '搜索',
    'status' => '状态',
    'add' => '添加',
    'edit' => '编辑',
    'refresh' => '刷新',
    'export' => '导出',
    'import' => '导入',
    'delete' => '删除',
    'handler' => '操作',
    'create_time' => '创建时间',
    'update_time' => '更新时间',
    'admin_name' => '管理员',
    'upload_image' => '上传图片',
    'login_time' => '登录时间',
    'login_ip' => '登录IP',
    'login_count' => '登录次数',
    'name' => '名称',
    'sort' => '排序',
    'qq' => 'QQ',
    'mobile' => '手机',
    'email' => '邮箱',
    'sn' => '流水号',
    'title' => '标题',
    'content' => '内容',
    'ip_error' => 'IP %s 格式不正确',
    'send_success' => '发送成功',
    'google_use_bind' => 'Google验证已经绑定',
    'please_enter' => '请输入',
    'confirm_delete' => '你确定要删除该数据吗？',
    'pager' => [
        'total'  => '%d 条记录，共 %d 页',
        'prev'   => '上一页',
        'next'   => '下一页',
        'nodata' => '暂无数据',
        'goto'   => '转到',
    ],
    'success_tip' => '成功提示',
    'error_tip' => '错误提示',
    'jump_tip' => '系统将在 <span id="wait">%s</span> 秒后自动跳转，',
    'jump_click' => '点击直接跳转',
    'agent_business' => '代理/商家',

    'verify' => [
        'send_code' => '发送验证码',
        'email_code' => '邮箱验证码',
        'email_code_tip' => '如果未收到请尝试检查垃圾邮件',
        'please_enter_email_code' => '请输入正确的邮箱验证码',
        'google_code' => 'Google验证码',
        'please_enter_google_code' => '请输入正确的Google验证码',
    ],

    'is_search' => [
        '2' => '是',
        '1' => '否'
    ],

    'status_txts' => [
        '1' => '启用',
        '0' => '禁用'
    ],

    'status_search' => [
        '2' => '启用',
        '1' => '禁用'
    ],

    'login1' => '登 录',
    
    'login' => [
        'name'   => '请输入管理员帐号',
        'pwd'    => '请输入管理员密码',
        'google' => '未绑定Google身份验证，请保留为空',
        'error'  => '登录发生错误，请重新登录'
    ],

    'google' => [
        'title' => '管理员身份绑定',
        'step_1' => '1、下载Google身份验证器',
        'step_2' => '2、使用Google身份验证器扫以下二维码',
        'step_3' => '3、Google验证码',
        'tip' => '请输入Google身份验证器上的动态验证码'
    ],

    'agent' => [
        'name' => '帐号',
        'real_name' => '名称',
        'pwd' => '密码',
        'pwd_tip' => '不修改保留为空',
        'parent' => '父级',
        'type' => '类型',
        'types' => [
            '1' => '代理',
            '2' => '商家',
        ],
        'money' => '余额',
        'withdraw_money' => '已提现金额',
        'frozen_money' => '冻结金额',
        'total_money' => '总金额',
        'parent' => '所属代理',
        'app_id' => 'APP ID',
        'app_secret' => 'APP SECRET',
        'money_modify' => '调整余额',
        'money_modify_title' => '余额调整',
        'fee_setting' => '费用设置',
        'payment_name' => '通道名称',
        'base_rate' => '代理服务费率%',
        'add_rate' => '加收服务费率%',
        'base_create_fee' => '代理创建费(元)',
        'add_create_fee' => '加收创建费(元)',
        'finish_type' => '结算类型',
        'payments' => '通道设置',
        'finish_types' => [
            '1' => 'D+0',
            '2' => 'D+1',
            '3' => 'T+1'
        ],
        'finish_type_desc' => [
            '1' => '立即结算',
            '2' => '次日结算',
            '3' => '次工作日结算'
        ],
        'admin_ips' => '后台白名单',
        'admin_ips_tip' => '只有指定的IP才能访问后台；多个IP以 , 分隔；为空则不限制；最多可设置50个IP',
        'api_ips' => 'API白名单',
        'api_ips_tip' => '只有指定的IP才能调用API接口；多个IP以 , 分隔；为空则不限制；最多可设置50个IP',
        'validators' => [
            'name.required'	  => '请输入帐号',
            'name.min'		  => '帐号最少需要6个字符',
            'name.max'		  => '帐号最多32个字符',
            'name.regex'	  => '帐号由字母、数字、下划线组成，首字必须为字母',
            'name.unique'     => '帐号已被使用',
            'pwd.required'    => '请输入密码',
            'pwd.min'	      => '密码最少需要6个字符',
            'pwd.max'         => '密码最多32个字符',
            'mobile.required' => '请输入手机号',
            'mobile.regex'    => '手机号格式错误',
            'email.required'  => '请输入邮箱',
            'email.email'     => '邮箱格式错误',
            'finish_type.required' => '请设置结算类型',
            'finish_type.in' => '结算类型错误',
            'service_type.required' => '请设置费率扣除方式',
            'service_type.in' => '费率扣除方式错误',
            'rate.error' => '服务费率设置错误',
            'create_fee.error' => '创建费设置错误',
        ]
    ],

    'channel' => [
        'alipay' => '支付宝扫码',
        'alipay_h5' => '支付宝H5',
        'wechat' => '微信扫码',
        'wechat_h5' => '微信H5',
        'union' => '银联扫码',
        'union_h5' => '银联H5',
        'ebank' => '网银转帐',
        'ysf' => '云闪付',
    ],

    'payment_types' => [
        'bb' => '跑分',
        'apple' => '苹果',
        'kim' => '红包',
        'sep' => '话费',
        'pdd' => 'PDD',
        'tianc' => '天成',
        'bank' => '银行卡'
    ],

    'payment' => [
        'name' => '名称',
        'code' => '支付代码',
        //'tip' => '服务费率:按订单金额百分比收取费用；创建费:生成订单成功即收取费用',
        'tip' => '服务费率:按订单金额百分比收取费用',
        'rate' => '服务费率%',
        'create_fee' => '创建费(元)',
        'day_money' => '每日限额',
        'min_money' => '最小金额',
        'max_money' => '最大金额',
        'money_tip' => '0为不限制',
        'channel' => 'Channel',
        'channel_id' => 'Channel Id',
        'desc' => '说明',
        'data' => '相关参数',
        'validators' => [
            'rate.error' => '费率设置错误',
        ],
        'switch_set' => '切量设置',
        'switch_rule' => '切量规则',
        'money_range' => '金额范围',
        'to'    => '转至',
    ],

    'order' => [
        'status' => '付款状态',
        'notify_status' => '通知状态',
        'send_notify' => '通知',
        'send_finish' => '结算',
        'business' => '商家',
        'money' => '金额',
        'pay_money' => '支付金额',
        'total_money' => '订单总金额',
        'total_pay_money' => '实付总金额',
        'create_fee' => '创建费',
        'service_fee' => '服务费',
        'create_fee_increase' => '创建费收入',
        'service_fee_increase' => '服务费收入',
        'create_fee_decrease' => '创建费支出',
        'service_fee_decrease' => '服务费支出',
        'payment' => '通道',
        'payment1' => '支付方式',
        'trade_no' => '商家订单号',
        'order_remark' => '订单备注',
        'order_status' => '订单状态',
        'payer' => '付款人',
        'pay_time' => '付款时间',
        'show_child_order' => '显示子级订单',
        'finish_status' => '结算状态',
        'finish_status_arr' => [
            '1' => '未结算',
            '2' => '已结算'
        ],
        'finish_time' => '结算时间',
        'transaction_remark' => '银行交易备注',
        'finish_next_time' => '结算执行时间',
        'notify_url' => ' 通知链接',
        'notify_status_str' => [
            1 => '失败',
            2 => '待通知',
            3 => '成功',
        ],
        'status_str' => [
            1 => '失败',
            2 => '待支付',
            3 => '成功',
        ],
        'order_status_str' => [
            1 => '失败',
            2 => '',
            3 => '成功',
        ]
    ],

    'withdraw' => [
        'bank' => '收款银行',
        'money' => '代付金额',
        'operation_time' => '处理时间',
        'really_money' => '实付金额',
        'service_fee' => '手续费',
        'service_fee_type' => '扣除手续费方式',
        'service_fee_types' => [
            1 => '从代付金额',
            2 => '从帐户余额',
        ],
        'status' => [
            '1' => '取消',
            '2' => '处理中',
            '3' => '审核中',
            '4' => '成功',
        ]
    ],

    'moneylog' => [
        'increase' => '收入',
        'decrease' => '支出',
        'balance' => '更新后金额',
        'remark' => '详情',
    ],
    
    'api_withdraw' => [
		'data_error' => '找不到该数据',
		'status_error' => '状态错误',
		'status' => [
            '1' => '取消',
            '3' => '成功'
        ]
	],

    'agent_bank_types' => [
        '支付宝',
        '工商银行',
        '建设银行',
        '中国银行',
        '招商银行',
        '农业银行',
        '交通银行',
        '兴业银行',
        '民生银行',
        '光大银行',
        '平安银行',
        '中信银行',
        '广发银行',
        '邮政储蓄',
        '华夏银行',
        '浦发银行',
        '农村信用社',
	'浙江网商银行',
        '北京银行'
    ],
    'address_status' => ['禁用','正常']
];