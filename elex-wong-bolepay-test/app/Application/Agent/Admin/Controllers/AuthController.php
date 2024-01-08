<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\AgentService;
use App\Application\Agent\Admin\Services\PaymentService;
use App\Application\Agent\Admin\Services\OperationLogService;
use App\Services\System\AgentNavService;
use App\Services\System\VerifyService;
use PragmaRX\Google2FA\Google2FA;
use Redirect, Helper, Session, AppException, Request, Lang;

abstract class AuthController extends BaseController {
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
            $admin_auth = AgentService::instance()->auth($admin_auth['id'], $admin_auth['pwd'], $admin_auth['time']);
        } catch(AppException $e) {
            $this->setAdminAuth(null);
            $e->setUrl(Helper::url('Public/login'));
            throw $e;
        }

        $this->setAgent($admin_auth['admin']);

        if (!$this->agent->checkAdminIp(CLIENT_IP)) {
            $this->setAdminAuth(null);
            $this->throwException(['common.whitelist_ip_error', CLIENT_IP], '', '', Helper::url('Public/login'));
        }
		
		$this->setAdminAuth($admin_auth['auth']);
		
		$path = strtolower(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME);
		if(!IS_DEV_MODE && empty($admin_auth['auth']['secret']) && !in_array($path, ['agent/google', 'agent/dogoogle'])) {
			Redirect::to(Helper::url('Agent/google'))->send();
		}

        $this->adminNodes = AgentNavService::instance()->getNodeNavs($this->agent->type);

        define('APP_CURRENT_AGENT_IS_SUPER', true);

        if (!isset($this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME])){
            $this->throwException('common.auth_error');
        }

        //获取当前操作的节点
        $this->adminNode = $this->adminNodes[APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME];
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
        //OperationLogService::instance()->create($data);
    }

    protected function checkGoogleAndEmail($action) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ga = new Google2FA();
        $check_result = $ga->verifyKey($this->agent->secret, Request::get('google_code'), 2);
        if (!$check_result) {
            $this->throwException('common.verify_google_error', 'google_code');
        }
        return true;

        //VerifyService::instance()->checkGoogleAndEmail($this->adminId, $action, $this->agent->email, Request::get('email_code'), $this->agent->secret, Request::get('google_code'));
    }

    protected function display($actionName = '', $controllerName = '') {
        $agent_admin_nodes = Lang::get('agent_admin_nodes');

        Helper::setCheckAuthFunc(function($controller, $action) use($agent_admin_nodes) {
            $controller = $agent_admin_nodes[$controller];
            if (isset($controller['agent_type']) && $controller['agent_type'] != APP_CURRENT_AGENT_TYPE) {
                return false;
            }
            return true;
        });

        if ($this->agent) {
            $this->share('_agent_type', $this->agent->type);
        }

        $this->share('is_search', Lang::get('admin.is_search'));
        $this->share('status_search', Lang::get('admin.status_search'));
        $this->share('status_txts', Lang::get('admin.status_txts'));
        
        if (!$this->isAjax && $this->agent) {
            $admin_navs = AgentNavService::instance()->getNavs($this->agent->type);

            if (empty($admin_navs)) {
                $this->throwException('no menu!');
            }

            $this->share('_admin_navs', $admin_navs);

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

            $payment_confirm_count = PaymentService::instance()->getConfirmCount($this->agent);
            $this->share('payment_confirm_count', $payment_confirm_count);
        }
        return parent::display($actionName, $controllerName);
    }
}