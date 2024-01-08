<?php

return [
    'get_auth_error'    => '获取权限信息失败',
    'auth_error'        => '没有操作权限',
    'create_success'    => '创建成功',
    'create_error'      => '创建失败',
    'update_success'    => '更新成功',
    'update_error'      => '更新失败',
    'not_data'          => '找不到相关数据',
    'delete_success'    => '删除成功',
    'delete_error'      => '删除失败',

    'admin' => [
    	'not_exist' => '管理员不存在',
    	'pwd_error' => '密码错误',
        'old_pwd_error' => '原密码错误',
    	'status_disabled' => '该管理员已被禁止登录',
        'role_not_exist' => '管理员员组不存在',
        'role_status_disabled' => '该管理员员组已被禁用',
        'name_required' => '账号不能为空',
        'pwd_required' => '密码不能为空',
    ],

    'proxy' => [
        'not_exist' => '代理不存在',
        'pwd_error' => '密码错误',
        'old_pwd_error' => '原密码错误',
        'status_disabled' => '该代理已被禁止登录',  
        'name_required' => '账号不能为空',
        'pwd_required' => '密码不能为空',
        'status_not_change' => '代理状态未改变',
        'proxy_status' => '此代理状态不可修改',
        'proxy_withdraw_status' => '此代理提现状态不可修改', 
        'proxy_commission_status' => '此代理佣金状态不可修改', 
        'bank_add_limited' => '银行卡最多添加5张', 
        'commission_low' => '佣金不足100无法提款', 
        'bank_miss' => '未添加银行卡信息', 
        'commission_status_error' => '佣金状态错误', 
        'auto_reject' => '有佣金记录被拒绝', 
    ],

    'proxy_level' => [
        'exists' => '代理等级名称已存在',
        'name_required' => '代理等级名称不能为空',  
        'commission_rate_required' => '佣金比率不能为空',
        'commission_rate_error' => '佣金比率必须大于0，小于1',
        'profit_required' => '需要达到的利润不能为空',
        'profit_error' => '参数格式错误（如：0-300或者300）',
        'effective_user_required' => '有效会员不能为空',
        'effective_user_error' => '参数格式错误（如：0-10或者10）',
    ],

    'site_user' => [
        'name_exist' => '账号已存在',
    ],
    'user' => [
        'import_file_required' => '请上传批量文件',
        'import_data_empty' => '没有找到要处理的数据',
        'import_data_max' => '一次最多只能处理1000条数据'
    ],
	'user_not_exist' => '会员不存在',
	'call_log_fields' => [
		'account_name' => '用户名', 
		'real_name' => '姓名', 
		'auth_mobile' => '手机号码', 
		'creator' => '拨打人', 
		'create_time' => '拨打时间', 
		'end_time' => '结束时间', 
		'duration' => '通话时长', 
		'status' => '状态', 
		'remark' => '备注', 
		'record' => '语音记录' 
	]
];