<?php

namespace App\Application\Proxy\Controllers;

use App\Application\ViewController;
use App\Application\SiteController;
use App\Services\SiteService;
use App\Libraries\ManageTemplateLibrarie;
use Request, Redirect, Session;

abstract class BaseController extends ViewController {
    use SiteController;

    /**
     * 代理信息
     * @var array
     */
    protected $proxy;

    /**
     * 代理编号
     * @var int
     */
    protected $proxyId = 0;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();

        $this->setSite();
        $this->share('site', $this->site->toArray());
    }

    protected function setProxyAuth($auth) {
        if ($auth) {
            $this->proxyId   = $auth['id'];
            $this->proxy     = $auth;
            define('APP_CURRENT_PROXY_ID', $this->proxyId);
            define('APP_CURRENT_PROXY_NAME', $auth['name']);
            Session::put('proxy_auth', $auth);
            $this->share('login_proxy', $auth);
        } else {
            Session::put('proxy_auth', null);
        }
        Session::save();
    }

    /**
     * 设置返回的链接
     * @param string $url 指定返回链接
     */
    protected function setReturnUrl($url = '') {
        if (empty($url)) {
            if ($this->isAjax) {
                $url = Request::server('HTTP_REFERER');
            } else {
                $url = Request::fullUrl();
            }
        }
        Session::put('return_url', $url);
        Session::save();
    }

    /**
     * 重定向
     * @param $url
     * @param bool $isReturn
     * @return mixed
     */
    protected function redirect($url, $isReturn = false) {
        $return_url = Session::get('return_url');
        if (!empty($return_url)) {
            $url = $return_url;
            Session::set('return_url', null);
            Session::save();
        }

        if ($isReturn) {
            return $url;
        }
        return Redirect::to($url);
    }

    protected function display($actionName = '', $controllerName = '') {
        $template = new ManageTemplateLibrarie();
        $template->init($this->tpl . $this->theme, APP_NAMESPACE_PATH . '/Views');
        return parent::display($actionName, $controllerName);
    }
}
