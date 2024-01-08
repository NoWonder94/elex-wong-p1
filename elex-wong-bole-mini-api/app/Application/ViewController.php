<?php

namespace App\Application;

use App\Events\RequestErrorEvent;
use View, Request, Lang, Config, Response, Event, Session, Storage, File, Helper;

abstract class ViewController extends BaseController {
    /**
     * 调用模板
     * @var string
     */
    protected $tpl = '';
    protected $theme = 'default';
    protected $isInitialize = true;

    /**
     * 是否压缩
     * @var boolean
     */
    protected $isCompress = true;

    /**
     * 是否缓存页面
     * @var boolean
     */
    protected $isPageCache = false;

    /**
     * 需要缓存页面的方法
     * @var array
     */
    protected $enablePageCacheAction = [];

    /**
     * 禁止缓存页面的方法
     * @var array
     */
    protected $disabledPageCacheAction = [];

    /**
     * 页面缓存路径
     * @var string
     */
    protected $pageCachePath = '';

    /**
     * 页面缓存时间
     * @var integer
     */
    protected $pageCacheTime = 60;

    protected $isAjax = false;

    /**
     * 初始化信息
     */
    public function __construct() {
        parent::__construct();

        $this->isAjax = Request::ajax();
        
        define('CLIENT_IP', Helper::getClientIp());

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
     * 获取相关配置信息
     * @return [type] [description]
     */
    protected function getConfig($code = null) {
        
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
        return "{$this->tpl}{$this->theme}.{$controllerName}.{$actionName}";
    }

    protected function share($key, $val) {
        View::share($key, $val);
    }

    protected function getIsCachePage() {
        if (in_array(APP_ACTION_NAME, $this->disabledPageCacheAction)) {
            return false;
        }

        if (in_array(APP_ACTION_NAME, $this->enablePageCacheAction)) {
            return true;
        }

        return $this->isPageCache;
    }

    /**
     * 获取页面缓存
     * @return [type] [description]
     */
    protected function getPageCacheContent() {
        $md5    = md5(Request::fullUrl());
        $name   = substr($md5, 6) . '.cache';
        $this->pageCachePath = 'pages/' . substr($md5, 0, 2) . '/' . substr($md5, 2, 2) . '/' . substr($md5, 4, 2) . '/' . $name;
        if (Storage::exists($this->pageCachePath)) {
            $contents = explode("\n", Storage::get($this->pageCachePath), 2);
            $cache_time = (int) $contents[0];
            if (UTC_TIME > $cache_time) {
                return false;
            }
            return $this->formatPageCache($contents[1]);
        }
        return false;
    }

    protected function formatPageCache($content) {
        return $content;
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
            ob_start("ob_gzhandler");
        }

        if ($controllerName === '') {
            $controllerName = APP_CONTROLLER_NAME;
        }

        if ($actionName === '') {
            $actionName = APP_ACTION_NAME;
        }
        
        $this->share('tpl_version', Config::get('app.tpl_version'));
        $this->share('site_name', Config::get('app.site_name'));

        error_reporting(E_ERROR);
        ini_set('display_errors', 'On');
        $controllerName = strtolower($controllerName);
        $actionName     = strtolower($actionName);
        $content = View::make($this->getDisplayPath($controllerName, $actionName));
        if ($this->getIsCachePage()) {
            $content = $content->render();
            Storage::put($this->pageCachePath, UTC_TIME + $this->pageCacheTime . "\n" . $content);
            $content = $this->formatPageCache($content);
        }
        return $content;
    }
}
