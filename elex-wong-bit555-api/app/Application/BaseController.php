<?php

namespace App\Application;
use Request, Validator, Helper, Time;

class BaseController {
    protected $info           = [];
    protected $token          = null;
    protected $isShowToken    = false;
    protected $loginStatus    = 0;

    public function __construct() {
        define('HTTP_HOST', $_SERVER['HTTP_HOST']);
        $clientIp = Request::header('CLIENT_IP');
        if (empty($clientIp)) {
            $clientIp = Helper::getClientIp();
        }
        define('CLIENT_IP', $clientIp);
        define('UTC_CURRENT_TIME', Time::getCurrentTime());
        define('DEFAULT_LANGUAGE', Config('lang.default_language'));
        define('DEFAULT_PAGE', Config('app.default_settings.page'));
        define('DEFAULT_PAGE_SIZE', Config('app.default_settings.page_size'));
    }

    protected function success($data = [], $msg = '') {
        $result         = [
            'status'    => true,
            'data'      => $data,
            'msg'       => $msg
        ];

        $this->output($result);
    }

    protected function error($data = [], $msg = '') {
        $result         = [
            'status'    => false,
            'data'      => $data,
            'msg'       => $msg
        ];

        $this->output($result);
    }

    private function output($result) {
        $result['loginStatus'] = $this->loginStatus;
        if ($this->isShowToken) {
            $result['token'] = Helper::encryptData($this->token);
        }

        die(json_encode($result));
    }

    protected function validate($rules) {
        $validator  = Validator::make(Request::all(), $rules);
        if ($validator->fails()) {
            //$error = (array)$validator->errors();
            die($validator->errors());
        }
    }
}