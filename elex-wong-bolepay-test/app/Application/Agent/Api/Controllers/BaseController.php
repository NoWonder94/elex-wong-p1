<?php
namespace App\Application\Agent\Api\Controllers;

use App\Application\Agent\BaseController as AgentBaseController;
use App\Services\System\AgentService;
use Request;

abstract class BaseController extends \App\Application\ApiController {
    use AgentBaseController;

    public function __construct() {
        parent::__construct();

        if (!$this->checkAuth()) {
            $this->error('Illegal request');
        }
    }

    /**
     * 检测请求
     * @return boolean 检测状态
     */
    protected function checkAuth() {
        $app_id = Request::get('app_id');
        if (empty($app_id) || strlen($app_id) != 32) {
            return false;
        }

        $sign = strtolower(Request::get('sign'));
        if (empty($sign) || strlen($sign) != 32) {
            return false;
        }

        $agentService = AgentService::instance();

        $agent = $agentService->getByAppId($app_id);
        if (!$agent) {
            return false;
        }

        if ($agent->status != 1) {
            $this->error('agent status disable');
        }

        if (!$agent->checkApiIp(CLIENT_IP)) {
            $this->throwException('common.whitelist_error');
        }

        $this->setAgent($agent);

        $data = $_POST;
        unset($data['sign'], $data['app_secret']);
		
		$sign1 = $agentService->getSign($this->agent, $data);

        if ($sign != $sign1) {
            $this->error('sign error');
        }

        unset($data['app_id']);
        Request::replace($data);

        return true;
    }
}