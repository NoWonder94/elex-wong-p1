<?php
namespace App\Application\Www\Controllers;

use App\Application\Www\Services\SiteAdminService;
use App\Application\Www\Services\OperationLogService;
use App\Application\Www\Services\SiteAdminRoleService;
use Redirect, Helper, Session, AppException, SystemCache, Request, Tpl;

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
            $admin = SiteAdminService::instance()->auth($admin_auth['id'], $admin_auth['pwd'], $admin_auth['role_id'], $admin_auth['time']);
        } catch(AppException $e) {
            $this->setAdminAuth(null);
            $e->setUrl(Helper::url('Public/login'));
            throw $e;
        }
        $this->setAdminAuth($admin);

        $adminRoleService = SiteAdminRoleService::instance();
        $admin_roles = $adminRoleService->getAdminRoles();
        if (!isset($admin_roles[$this->admin['role_id']])) {
            $this->throwException('root::common.auth_error');
        }
        $this->adminRole  = $admin_roles[$this->admin['role_id']];
        $this->adminNodes = SystemCache::get('site_admin_node_navs');
		
		define('APP_CURRENT_ADMIN_IS_SUPER', $this->adminRole['is_super'] == 1);

        //获取当前操作的节点
        $this->adminNode = $this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME];

        //验证权限
        if (!in_array($this->adminNode['id'], $this->adminRole['nodes'])) {
            $this->throwException('root::common.auth_error');
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

    protected function createLog() {
        $request = Request::all();
        unset($request['__RETURN_URL__']);
        $data = [
            'request' => $request
        ];
        OperationLogService::instance()->create($data);
    }

    protected function display($actionName = '', $controllerName = '') {
		$that = $this;
		Tpl::setCheckAuthFunc(function($action, $controller) use($that) {
			$node = $that->adminNodes[$controller . '/' . $action];
			return in_array($node['id'], $that->adminRole['nodes']);
		});
		
        if (!$this->isAjax) {
            $admin_navs = SystemCache::get('site_admin_navs');
            $this->share('_admin_navs', $admin_navs);
            
            //当前菜单导航
            $now_navs = [];
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
            $this->share('_admin_role', $this->adminRole);
        }
        return parent::display($actionName, $controllerName);
    }
}