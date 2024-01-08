<?php
namespace App\Application\Agent\Admin\Controllers;

use App\Application\Agent\Admin\Services\StatisticService;
use App\Services\System\VerifyService;
use Request;

class IndexController extends AuthController {
    public function index() {
        $this->share('statistic', StatisticService::instance()->agentData());
        $this->share('agent', $this->agent);

        if ($this->agent->type == 1) {
            return $this->display('proxy');
        } else {
            return $this->display('business');
        }
    }

    public function businesschart() {
        $data = StatisticService::instance()->businessChart();
    	return $this->successData($data);
    }

    public function proxychart() {
        $data = StatisticService::instance()->proxyChart();
        return $this->successData($data);
    }

    public function sendMailVerifyCode() {
        VerifyService::instance()->create($this->adminId, $this->agent->email, Request::get('action'));
        return $this->success();
    }
}