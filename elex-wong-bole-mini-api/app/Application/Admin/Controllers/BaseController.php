<?php

namespace App\Application\Admin\Controllers;

use App\Application\ViewController;
use App\Libraries\ManageTemplateLibrarie;
use Request, Redirect, Session;

abstract class BaseController extends ViewController {

    protected $site;

    /**
     * 管理员信息
     * @var array
     */
    protected $admin;

    /**
     * 管理员编号
     * @var int
     */
    protected $adminId = 0;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
    }

    protected function setAdminAuth($auth) {
        if ($auth) {
            $this->adminId   = $auth['id'];
            $this->admin     = $auth;
            define('APP_CURRENT_ADMIN_ID', $this->adminId);
            Session::put('admin_auth', $auth);
            $this->share('login_admin', $auth);
        } else {
            Session::put('admin_auth', null);
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
        $template->init($this->tpl . $this->theme, APP_APPLICATION_PATH . '/Views');
        /*$menu = Lang::get('menu');
        $this->share('navs_top',['navs_first' => BOSSJOB_CONTROLLER_NAME, 'navs_second' => BOSSJOB_ACTION_NAME]);
        $this->share('menu', $menu);*/
        return parent::display($actionName, $controllerName);
    }
    
}
