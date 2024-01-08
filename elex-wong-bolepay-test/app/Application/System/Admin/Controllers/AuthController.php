<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AdminService;
use App\Application\System\Admin\Services\OperationLogService;
use App\Application\System\Admin\Services\AdminRoleService;
use App\Application\System\Admin\Services\AdminNavService;
use App\Services\System\VerifyService;
use PragmaRX\Google2FA\Google2FA;
use Redirect, Helper, Session, AppException, Request, Lang, SystemSetting;

abstract class AuthController extends BaseController {
    protected $adminRole;
    protected $adminNodes;
    protected $adminNode;

    public function __construct() {
        parent::__construct();

        //初始化帐号权限
        $admin_auth = Session::get('admin_auth');
        if (!$admin_auth) {
            $this->redirectLogin();
        }
        
        //获取最新帐号信息
        try {
            $admin = AdminService::instance()->auth($admin_auth['id'], $admin_auth['pwd'], $admin_auth['role_id'], $admin_auth['time']);
        } catch(AppException $e) {
            $this->setAdminAuth(null);
            $e->setUrl(Helper::url('Public/login'));
            throw $e;
        }
        
        $this->setAdminAuth($admin);

        if (!SystemSetting::checkAdminIp(CLIENT_IP)) {
            $this->setAdminAuth(null);
            $this->throwException(['common.whitelist_ip_error', CLIENT_IP], '', '', Helper::url('Public/login'));
        }
		
		$path = strtolower(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME);
		if(!IS_DEV_MODE && empty($admin['secret']) && !in_array($path, ['index/google', 'index/dogoogle'])) {
			Redirect::to(Helper::url('Index/google'))->send();
		}

        $admin_roles = AdminRoleService::instance()->getAdminRoles();

        if (!isset($admin_roles[$this->admin['role_id']])) {
            $this->throwException('common.auth_error');
        }
        $this->adminRole  = $admin_roles[$this->admin['role_id']];
        $this->adminNodes = AdminNavService::instance()->getNodeNavs();
        
        define('APP_CURRENT_ADMIN_IS_SUPER', $this->adminRole['is_super'] == 1);

        if (!isset($this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME])){
            $this->throwException('common.auth_error');
        }

        //获取当前操作的节点
        $this->adminNode = $this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME];
        
        //验证权限
        if (!in_array($this->adminNode['id'], $this->adminRole['nodes'])) {
            $this->throwException('common.auth_error');
        }
    }

    protected function redirectLogin() {
        $this->setAdminAuth(null);
        $this->setReturnUrl();

        if ($this->isAjax) {
            die(Helper::jsonEncode(['status' => false, 'login' => true]));
        } else {
            Redirect::to(Helper::url('Public/login'))->send();
        }
    }

    protected function checkSuperAdmin() {
        return $this->adminRole['id'] == 1;
    }

    protected function createLog() {
        $request = Request::all();
        unset($request['__RETURN_URL__']);
        $data = [
            'request' => $request
        ];
        OperationLogService::instance()->create($data);
    }

    protected function checkGoogleAndEmail($action) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ga = new Google2FA();
        $check_result = $ga->verifyKey($this->admin['secret'], Request::get('google_code'), 2);
        if (!$check_result) {
            $this->throwException('common.verify_google_error', 'google_code');
        }
        return true;
        //VerifyService::instance()->checkGoogleAndEmail($this->adminId, $action, $this->admin['email'], Request::get('email_code'), $this->admin['secret'], Request::get('google_code'));
    }

    protected function display($actionName = '', $controllerName = '') {
        $that = $this;
        Helper::setCheckAuthFunc(function($controller, $action) use($that) {
            $node = $that->adminNodes[$controller . '/' . $action];
            return in_array($node['id'], $that->adminRole['nodes']);
        });

        $this->share('is_search', Lang::get('admin.is_search'));
        $this->share('status_search', Lang::get('admin.status_search'));
        $this->share('status_txts', Lang::get('admin.status_txts'));
        
        if (!$this->isAjax) {
            $admin_navs = AdminNavService::instance()->getNavs();

            if (empty($admin_navs)) {
                $this->throwException('no menu!');
            }

            $this->share('_admin_navs', $admin_navs);
            
            //当前菜单导航
            $now_navs = []; 
            if ($this->adminNodes && isset($this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME])) {
                if ($this->adminNode['pnav_id'] > 0) {
                    $nav         = $admin_navs[$this->adminNode['pnav_id']];
                    $controllers = $nav['controllers']['nav_' . $this->adminNode['nav_id']]['controllers'];

                    $nowNavs[]  = $nav;
                    $nav        = $nav['nodes']['nav_' . $this->adminNode['nav_id']];
                    $nowNavs[]  = $nav;
                    $nowNode    = $nav['nodes']['node_' . $this->adminNode['id']];
                    unset($nowNavs[1]['nodes']);
                } else { 
                    $nav         = $admin_navs[$this->adminNode['nav_id']];
                    $controllers = $nav['controllers'];
                    $nowNavs[]  = $nav;
                    $nowNode    = $nav['nodes']['node_' . $this->adminNode['id']];
                }

                unset($nowNavs[0]['nodes'], $nav);
                $this->share('_now_navs', $nowNavs);
                if ($nowNode['is_show'] != 1 && isset($controllers[APP_CONTROLLER_NAME])) {
                    $this->share('_show_node', current($controllers[APP_CONTROLLER_NAME]));
                }

                $this->share('_now_node', array_merge($this->adminNode, $nowNode));
            } 

            $this->share('_admin_role', $this->adminRole);
        }
        return parent::display($actionName, $controllerName);
    }
}