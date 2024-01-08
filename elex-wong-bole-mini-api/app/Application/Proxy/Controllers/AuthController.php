<?php
namespace App\Application\Proxy\Controllers;

use App\Application\Proxy\Services\ProxyService;
use App\Application\Proxy\Services\OperationLogService; 
use Redirect, Helper, Session, AppException, SystemCache, Request, Lang;

abstract class AuthController extends BaseController {
    protected $proxyRole;
    protected $proxyNodes;
    protected $proxyNode;

	public function __construct() {
		parent::__construct();

        //初始化帐号权限
        $proxy_auth = Session::get('proxy_auth');
        if (!$proxy_auth) {
            $this->redirectLogin();
        }
        
        //获取最新帐号信息
        try {
            $proxy = ProxyService::instance()->auth($proxy_auth['id'], $proxy_auth['pwd'], $proxy_auth['time']);
        } catch(AppException $e) {
            $this->setProxyAuth(null);
            $e->setUrl(Helper::url('Public/login'));
            throw $e;
        }
        $this->setProxyAuth($proxy); 
	}

    protected function redirectLogin() {
        $this->setProxyAuth(null);
        $this->setReturnUrl();
        if ($this->isAjax) {
            die(Helper::jsonEncode(['status' => false, 'login' => true]));
        } else {
            Redirect::to(Helper::url('Public/login'))->send();
        }
    } 

    protected function display($actionName = '', $controllerName = '') {
        if (!$this->isAjax) {  
            define('CURRENT_URL', strtolower(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME));
            $proxy_navs = Lang::get('root::proxy_nodes'); 
            $this->share('_proxy_navs', $proxy_navs);  
            $this->shareCurrentNodes(CURRENT_URL, $proxy_navs);
        }
        return parent::display($actionName, $controllerName);
    }

    protected function shareCurrentNodes($currentUrl, $navs){
        foreach ($navs as $_nav) {
            if (in_array($currentUrl, $_nav['urls'])) {
                $_now_navs[] = $_nav;
                if ($_nav['has_sub']) {
                    foreach ($_nav['nodes'] as $_snav) {
                        if (in_array($currentUrl, $_snav['urls'])) {  
                            if ($_snav['has_sub']) { 
                                $_now_navs[] = $_snav;
                                foreach ($_snav['nodes'] as $_tnav) {
                                    if (in_array($currentUrl, $_tnav['urls'])) { 
                                        $this->share('_now_node', $_tnav);
                                        $this->share('_now_navs', $_now_navs); 
                                    }
                                }
                            } else { 
                                $this->share('_now_node', $_snav);
                                $this->share('_now_navs', $_now_navs);
                            }
                        }
                    }
                } else {
                    $this->share('_now_node', $_nav);
                    $this->share('_now_navs', $_now_navs);
                }
            } 
        }
    }
}