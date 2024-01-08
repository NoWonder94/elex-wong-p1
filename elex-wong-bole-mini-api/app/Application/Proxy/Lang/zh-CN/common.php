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
 
    'proxy' => [
        'not_exist' => '代理不存在',
        'pwd_error' => '密码错误',
        'old_pwd_error' => '原密码错误',
        'status_disabled' => '此代理已被禁止登录',  
        'status_uncheck' => '此代理暂未通过审核，请联系客服',  
        'name_required' => '账号不能为空',
        'pwd_required' => '密码不能为空',
        'status_not_change' => '代理状态未改变',
        'proxy_status' => '此代理状态不可修改',
        'proxy_withdraw_status' => '此代理佣金状态不可修改', 
        'bank_add_limited' => '银行卡最多添加5张', 
        'commission_low' => '佣金无法提款最低金额', 
        'effective_user_low' => '有效会员数量无法满足提款需求', 
        'bank_miss' => '未添加银行卡信息', 
    ],
    'site_user' => [
        'name_exist' => '账号已存在',
    ],
    'user' => [
        'import_file_required' => '请上传批量文件',
        'import_data_empty' => '没有找到要处理的数据',
        'import_data_max' => '一次最多只能处理1000条数据'
    ], 
];