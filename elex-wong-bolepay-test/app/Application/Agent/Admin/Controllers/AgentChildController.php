<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Services\Agent\PaymentService;
use App\Services\Agent\WithdrawPlatformService;
use Request;

trait AgentChildController {
    public function index() {
        return $this->authIndex();
    }

    protected function detailDataShare($id = 0, $data = []) {
        $parent_payments  = PaymentService::instance()->getPayments($this->agent);
        $this->share('parent_payments', $parent_payments);
        
        $parent_withdrawplatform  = WithdrawPlatformService::instance()->getPayments($this->agent);
        $this->share('withdrawplatform', $parent_withdrawplatform);

        if ($id > 0) {
            $this->share('agent_payments', PaymentService::instance()->getPaymentsById($id));
            $this->share('agent_withdrawplatforms', WithdrawPlatformService::instance()->getPaymentsById($id));
        }

        $allow_finish_types = $this->agent->getFinishTypes();
        $this->share('allow_finish_types', array_flip($allow_finish_types));
    }

    public function add() {
        return $this->authAdd('add');
    }

    public function edit() {
        return $this->authEdit('edit');
    }

    public function toggle() {
        return $this->authToggle();
    }
}