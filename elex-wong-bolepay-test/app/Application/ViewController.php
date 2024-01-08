<?php

namespace App\Application;

use App\Events\RequestErrorEvent;
use View, Request, Config, Response, Event, Session;

abstract class ViewController extends BaseController {
    protected $theme = 'default';
    protected $isInitialize = true;

    /**
     * 是否压缩
     * @var boolean
     */
    protected $isCompress = true;

    protected $isAjax = false;

    protected $pageSize = 0;

    /**
     * 初始化信息
     */
    public function __construct() {
        parent::__construct();

        $this->isAjax = Request::ajax();

        $controller = $this;
        Event::listen(RequestErrorEvent::class, function($event) use ($controller) {
            $error  = $event->getError();
            $url    = isset($error['url']) ? $error['url'] : '';
            $field  = isset($error['field']) ? ['field' => $error['field']] : '';
            $response = $controller->error($error['msg'], $url, $field);
            if (Request::ajax()) {
                $response = $response->getContent();
            } else {
                $response = $response->render();
            }
            Session::save();
            die($response);
        });
        
        if ($this->isInitialize) {
            $this->_initialize();
        }
    }

    protected function _initialize() {
        
    }

    /**
     * 输出错误信息
     * @param  string $msg  提示信息
     * @param  string $url  跳转链接
     * @param  array  $data 相关参数
     * @return void
     */
    protected function error($msg = '', $url = '', $data = array()) {
        return $this->_output(false, $msg, $url, $data);
    }

    /**
     * 输出成功信息
     * @param  string $msg  提示信息
     * @param  string $url  跳转链接
     * @param  array  $data 相关参数
     * @return void
     */
    protected function success($msg = '', $url = '', $data = array()) {
        return $this->_output(true, $msg, $url, $data);
    }

    protected function successData($data = []) {
        return $this->_output(true, '', '', $data);
    }

    private function _output($status, $msg = '', $url = '', $data = array()) {
        if (Request::ajax()) {
            $info = [];
            $info['status'] = $status;
            $info['msg']    = $msg;
            $info['url']    = $url;
            $info['data']   = $data;
            return Response::json($info);
        }else {
            View::share('msg', $msg);
            View::share('url', $url);
            View::share('data', $data);
            if ($status) {
                return $this->display('success', '_layouts');
            } else {
                return $this->display('error', '_layouts');
            }
        }
    }

    /**
     * 获取模板路径
     * @param  string $controllerName 控制器名称
     * @param  string $actionName     方法名称
     * @return string                 模板路径
     */
    protected function getDisplayPath($controllerName, $actionName) {
        return "{$this->theme}.{$controllerName}.{$actionName}";
    }

    protected function share($key, $val) {
        View::share($key, $val);
    }

    protected function getTemplateLibrarie() {
        return null;
    }

    /**
     * 显示页面
     * @param  string $actionName     控制器名称
     * @param  string $controllerName 方法名称
     * @return string                 页面内容
     */
    protected function display($actionName = '', $controllerName = '') {
        if ($this->isCompress) {
            //ob_start("ob_gzhandler");
        }

        if ($controllerName === '') {
            $controllerName = APP_CONTROLLER_NAME;
        }

        if ($actionName === '') {
            $actionName = APP_ACTION_NAME;
        }

        $this->share('is_ajax_request', $this->isAjax);
        
        $this->share('tpl_version', Config::get('app.tpl_version'));

        $this->share('site_name', Config::get('app.'.strtolower(APP_CURRENT_NAMESPACE).'_site_name'));

        error_reporting(E_ERROR);
        ini_set('display_errors', 'On');
        $controllerName = strtolower($controllerName);
        $actionName     = strtolower($actionName);
        return View::make($this->getDisplayPath($controllerName, $actionName));
    }
}
