<?php
$len = strlen($_SERVER['REQUEST_URI']);
$str = substr($_SERVER['REQUEST_URI'], $len - 1); 
if ($str == '/') {
    $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], 0, $len - 1);
} 

$paths = current(explode('?', $_SERVER['REQUEST_URI']));
if ($paths == '/') {
    $paths = [];
} else {
    $paths = explode('/', $paths);
}
if (count($paths) > 0 && empty($paths[0])) {
    array_shift($paths);
}
$uri     = implode('/', $paths);
if (empty($uri)) {
    $uri = '/';
}
$as_name = implode('_', $paths);
if (empty($as_name)) {
    $as_name = '/';
}

@include strtolower(APP_CURRENT_NAMESPACE).'.php';

foreach( $paths as $k=>$v){   
    if( empty($v) ){
        unset( $paths[$k] );
    }      
}

if (count($paths) > 0) {
    if (!defined('APP_CONTROLLER_NAME')) {
        if (count($paths) > 1) {
            //声明操作名称常量
            define('APP_ACTION_NAME', array_pop($paths));

            //声明控件器名称常量
            define('APP_CONTROLLER_NAME', ucfirst(array_pop($paths)));

            $controller = APP_CONTROLLER_NAME .'Controller';//取得控件器名称
            
            $controller_path = '';
            foreach($paths as $path){
                $controller_path .= ucfirst($path).'\\';
            }
            $app->any($uri, array('as'=>$as_name, 'uses'=>$controller_path.$controller.'@'.APP_ACTION_NAME));
        } else {
            define('APP_CONTROLLER_NAME', ucfirst(array_pop($paths)));
            define('APP_ACTION_NAME', 'index');

            $controller = APP_CONTROLLER_NAME .'Controller';//取得控件器名称
            $app->any($uri, array('as'=>$as_name, 'uses'=>$controller.'@'.APP_ACTION_NAME));
        }
    }
} else {
    //声明操作名称常量
    define('APP_ACTION_NAME', 'index');

    //声明控件器名称常量
    define('APP_CONTROLLER_NAME', 'Index');
    $app->any($uri, array('as'=>$as_name, 'uses'=>'IndexController@index'));
}