<?php

if (count($request_paths) == 3 && strtolower($request_paths[0]) == 'pay') {
    switch($request_paths[1]) {
        case 'notify':
        case 'jsonnotify':
            //声明操作名称常量
            define('APP_ACTION_NAME', $request_paths[1]);
            //声明控件器名称常量
            define('APP_CONTROLLER_NAME', 'Pay');
            //声明控件器名称常量
            define('PAY_CHANNEL_ID', $request_paths[2]);

            $app->any($uri, array('as'=>$as_name, 'uses'=>'PayController@'.APP_ACTION_NAME));
            break;
    }
}

if (count($request_paths) == 3 && strtolower($request_paths[0]) == 'withdraw' && $request_paths[1] == 'notify') {
    //声明操作名称常量
    define('APP_ACTION_NAME', $request_paths[1]);
    //声明控件器名称常量
    define('APP_CONTROLLER_NAME', 'Withdraw');
    //声明控件器名称常量
    define('WITHDRAW_CHANNEL_ID', $request_paths[2]);

    $app->any($uri, array('as'=>$as_name, 'uses'=>'WithdrawController@'.APP_ACTION_NAME));
}