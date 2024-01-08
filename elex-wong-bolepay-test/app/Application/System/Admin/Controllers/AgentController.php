<?php
namespace App\Application\System\Admin\Controllers;

use App\Services\Agent\PaymentService as AgentPaymentService;
use App\Services\Agent\WithdrawPlatformService as AgentWithdrawPlatformService;
use App\Services\System\PaymentService;
use App\Services\System\WithdrawPlatformService;
use Request,Helper;

trait AgentController {
    public function index() {
        return $this->authIndex();
    }

    protected function detailDataShare($id = 0, $data = []) {
        if ($data && $data->parent_id > 0) {
            $agent = $this->getService()->getById($data->parent_id);
            $this->share('payments', AgentPaymentService::instance()->getPayments($agent));
            $this->share('withdrawplatform', AgentWithdrawPlatformService::instance()->getPayments($agent));
        } else {

            $this->share('payments', PaymentService::instance()->getCacheByCode('payments'));
            $this->share('withdrawplatform', WithdrawPlatformService::instance()->getCacheByCode('withdraw_platforms'));
        }

        if ($id > 0) {
            $this->share('agent_withdrawplatforms', AgentWithdrawPlatformService::instance()->getPaymentsById($id));
            $this->share('agent_payments', AgentPaymentService::instance()->getPaymentsById($id));
        }
    }

    public function add() {
        return $this->authAdd();
    }

    public function edit() {
        return $this->authEdit();
    }

    public function toggle() {
        return $this->authToggle();
    }

    public function money() {
		//其他选项加款权限验证
		if(Request::get('type') == 'other' && Request::get('amount') > 0){
			$node = $this->adminNodes[APP_CONTROLLER_NAME . '/plus'];
			if (!in_array($node['id'], $this->adminRole['nodes'])) {
				$this->throwException('common.auth_error');
			}
		}
        $this->checkGoogleAndEmail('agentmoney');
        $this->getService()->moneyModify(Request::all());
        $html = $this->ajaxListItem(['id' => Request::get('id')]);
        $this->createLog();
        return $this->successData($html);
    }

    public function payments() {
        $proxy_id = (int)Request::get('proxy_id');
        if ($proxy_id == 0) {
            $payments = PaymentService::instance()->getCacheByCode('payments');
        } else {
            $is_return_enables = (int)Request::get('is_return_enables');
            if ($is_return_enables == 1) {
                $payments  = AgentPaymentService::instance()->getEnablePayments($proxy_id);
                $this->share('payments', $payments);
                $html = $this->display('payments_enable', 'agent')->render();
                return $this->successData($html);
            }
            $agent = $this->getService()->getById($proxy_id);
            $payments  = AgentPaymentService::instance()->getPayments($agent);
        }
        $this->share('payments', $payments);
        $html = $this->display('payments_ajax', 'agent')->render();
        return $this->successData($html);
    }
    
    public function withdrawplatform() {
        $proxy_id = (int)Request::get('proxy_id');
        if ($proxy_id == 0) {
            $payments = WithdrawPlatformService::instance()->getCacheByCode('withdraw_platforms');
        } else {
            $is_return_enables = (int)Request::get('is_return_enables');
            if ($is_return_enables == 1) {
                $payments  = AgentWithdrawPlatformService::instance()->getEnablePayments($proxy_id);
                $this->share('withdrawplatform', $payments);
                $html = $this->display('withdrawplatform_enable', 'agent')->render();
                return $this->successData($html);
            }
            $agent = $this->getService()->getById($proxy_id);
            $payments  = AgentWithdrawPlatformService::instance()->getPayments($agent);
        }
        $this->share('withdrawplatform', $payments);
        $html = $this->display('withdrawplatform_ajax', 'agent')->render();
        return $this->successData($html);
    }
}