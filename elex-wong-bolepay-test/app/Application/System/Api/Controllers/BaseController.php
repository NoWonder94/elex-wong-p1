<?php
namespace App\Application\System\Api\Controllers;

use Request, Helper, SystemSetting;

abstract class BaseController extends \App\Application\ApiController {

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
        if (!SystemSetting::checkApiIp(CLIENT_IP)) {
            $this->throwException('common.whitelist_error');
        }

        $sign = Request::get('sign');
        if (empty($sign) || strlen($sign) != 32) {
            return false;
        }

        $data = Request::all();
        unset($data['sign']);
		
		$sign1 = Helper::getSystemSign($data);
        if ($sign != $sign1) {
            return false;
        }

        Request::replace($data);

        return true;
    }
}