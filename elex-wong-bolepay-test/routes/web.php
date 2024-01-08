<?php
$uri     = implode('/', $full_paths);
if (empty($uri)) {
    $uri = '/';
}
$as_name = implode('_', $full_paths);
if (empty($as_name)) {
    $as_name = '/';
}

@include strtolower(APP_HOST_TYPE) . '/' . strtolower(APP_CURRENT_NAMESPACE).'.php';
if (count($request_paths) > 0) {
    if (!defined('APP_CONTROLLER_NAME')) {
        if (count($request_paths) > 1) {
            //声明操作名称常量
            define('APP_ACTION_NAME', array_pop($request_paths));

            //声明控件器名称常量
            define('APP_CONTROLLER_NAME', ucfirst(array_pop($request_paths)));

            $controller = APP_CONTROLLER_NAME .'Controller';//取得控件器名称
            
            $controller_path = '';
            foreach($request_paths as $path){
                $controller_path .= ucfirst($path).'\\';
            }
            $app->any($uri, ['as' => $as_name, 'uses' => "{$controller_path}{$controller}@" . APP_ACTION_NAME]);
        } else {
            define('APP_CONTROLLER_NAME', ucfirst(array_pop($request_paths)));
            define('APP_ACTION_NAME', 'index');

            $controller = APP_CONTROLLER_NAME .'Controller';//取得控件器名称
            $app->any($uri, ['as'=>$as_name, 'uses' => "{$controller}@" . APP_ACTION_NAME]);
        }
    }
} else {
    //声明操作名称常量
    define('APP_ACTION_NAME', 'index');

    //声明控件器名称常量
    define('APP_CONTROLLER_NAME', 'Index');

    $app->any($uri, ['as' => $as_name, 'uses' => 'IndexController@index']);
}